"use strict";

// aac encoder params
const AACENC_AOT = 256;
const AACENC_SAMPLERATE = 259;
const AACENC_CHANNELMODE = 262;
const AACENC_CHANNELORDER = 263;
const AACENC_BITRATE = 257;
const AACENC_TRANSMUX = 768;
const AACENC_AFTERBURNER = 512;

const TT_MP4_ADTS = 2;
const AACENC_OK = 0;

const AACEncorder = function (config, Module) {
  if (!Module) {
    throw new Error(
      "Module with exports required to initialize an encoder instance"
    );
  }

  this.config = Object.assign(
    {
      bitrate: 64000,
      sampleRate: 48000, // Desired encoding sample rate. Audio will be resampled
      encoderFrameSize: 20, // Specified in ms.
      maxFramesPerPage: 40, // Tradeoff latency with overhead
      numberOfChannels: 1,
      originalSampleRate: 44100,
      resampleQuality: 3, // Value between 0 and 10 inclusive. 10 being highest quality.
    },
    config
  );

  this._aacEncOpen = Module._aacEncOpen;
  this._aacEncoder_SetParam = Module._aacEncoder_SetParam;
  this._aacEncInfo = Module._aacEncInfo;
  this._aacEncEncode = Module._aacEncEncode;

  this._speex_resampler_process_interleaved_float =
    Module._speex_resampler_process_interleaved_float;
  this._speex_resampler_init = Module._speex_resampler_init;
  this._speex_resampler_destroy = Module._speex_resampler_destroy;

  this._free = Module._free;
  this._malloc = Module._malloc;
  this.getValue = Module.getValue;
  this.HEAPU8 = Module.HEAPU8;
  this.HEAP16 = Module.HEAP16;
  this.HEAP32 = Module.HEAP32;
  this.HEAPF32 = Module.HEAPF32;

  this.pageIndex = 0;
  this.segmentData = new Uint8Array(65025); // Maximum length of oggOpus data
  this.segmentDataIndex = 0;
  this.segmentTable = new Uint8Array(255); // Maximum data segments
  this.segmentTableIndex = 0;
  this.framesInPage = 0;

  this.initCodec();
  this.initResampler();

  if (this.config.numberOfChannels === 1) {
    this.interleave = function (buffers) {
      return buffers[0];
    };
  }
};

AACEncorder.prototype.initCodec = function () {
  const aot = 2;
  const afterburner = 1;
  const { numberOfChannels, biterate, sampleRate } = this.config;

  this._handle = this._malloc(4);
  this._aacEncOpen(this._handle, 0, numberOfChannels);
  this._aacEncoder_SetParam(this._handle, AACENC_AOT, aot);
  this._aacEncoder_SetParam(this._handle, AACENC_SAMPLERATE, sampleRate);
  this._aacEncoder_SetParam(this._handle, AACENC_CHANNELMODE, numberOfChannels);
  this._aacEncoder_SetParam(this._handle, AACENC_CHANNELORDER, 1);
  this._aacEncoder_SetParam(this._handle, AACENC_BITRATE, biterate);
  this._aacEncoder_SetParam(this._handle, AACENC_TRANSMUX, TT_MP4_ADTS);
  this._aacEncoder_SetParam(this._handle, AACENC_AFTERBURNER, afterburner);

  this._aacEncEncode(this._handle, null, null, null, null);

  var info = this._malloc(4);

  this._aacEncInfo(this._handle, info);
  var frameLength = this.getValue(info + 20, "i32");

  this._free(info);
};

AACEncorder.prototype.initResampler = function () {
  const {
    numberOfChannels,
    biterate,
    sampleRate,
    originalSampleRate,
    resampleQuality,
    encoderFrameSize,
  } = this.config;

  var errLocation = this._malloc(4);
  this.resampler = this._speex_resampler_init(
    numberOfChannels,
    originalSampleRate,
    sampleRate,
    resampleQuality,
    errLocation
  );
  this._free(errLocation);

  this.resampleBufferIndex = 0;
  this.resampleSamplesPerChannel =
    (originalSampleRate * encoderFrameSize) / 1000;
  this.resampleSamplesPerChannelPointer = this._malloc(4);
  this.HEAP32[this.resampleSamplesPerChannelPointer >> 2] =
    this.resampleSamplesPerChannel;

  this.resampleBufferLength = this.resampleSamplesPerChannel * numberOfChannels;
  this.resampleBufferPointer = this._malloc(this.resampleBufferLength * 4); // 4 bytes per sample
  this.resampleBuffer = this.HEAP32.subarray(
    this.resampleBufferPointer >> 2,
    (this.resampleBufferPointer >> 2) + this.resampleBufferLength
  );
};

AACEncorder.prototype.interleave = function (buffers) {
  for (var i = 0; i < this.bufferLength; i++) {
    for (var channel = 0; channel < this.config.numberOfChannels; channel++) {
      this.interleavedBuffers[i * this.config.numberOfChannels + channel] =
        buffers[channel][i];
    }
  }

  return this.interleavedBuffers;
};

AACEncorder.prototype.encode = function (buffers) {
  // Determine bufferLength dynamically
  if (!this.bufferLength) {
    this.bufferLength = buffers[0].length;
    this.interleavedBuffers = new Float32Array(
      this.bufferLength * this.config.numberOfChannels
    );
  }

  var samples = this.interleave(buffers);
  var sampleIndex = 0;
  var exportPages = [];

  while (sampleIndex < samples.length) {
    var lengthToCopy = Math.min(
      this.resampleBufferLength - this.resampleBufferIndex,
      samples.length - sampleIndex
    );
    this.resampleBuffer.set(
      samples.subarray(sampleIndex, sampleIndex + lengthToCopy),
      this.resampleBufferIndex
    );
    sampleIndex += lengthToCopy;
    this.resampleBufferIndex += lengthToCopy;

    if (this.resampleBufferIndex === this.resampleBufferLength) {
      this._speex_resampler_process_interleaved_float(
        this.resampler,
        this.resampleBufferPointer,
        this.resampleSamplesPerChannelPointer,
        this.encoderBufferPointer,
        this.encoderSamplesPerChannelPointer
      );
      var packetLength = this._opus_encode_float(
        this.encoder,
        this.encoderBufferPointer,
        this.encoderSamplesPerChannel,
        this.encoderOutputPointer,
        this.encoderOutputMaxLength
      );
      exportPages = exportPages.concat(this.segmentPacket(packetLength));
      this.resampleBufferIndex = 0;

      this.framesInPage++;
      if (this.framesInPage >= this.config.maxFramesPerPage) {
        exportPages.push(this.generatePage());
      }
    }
  }

  return exportPages;
};

AACEncorder.prototype.destroy = function () {
  if (this.encoder) {
    this._free(this.encoderSamplesPerChannelPointer);
    delete this.encoderSamplesPerChannelPointer;

    this._free(this.encoderBufferPointer);
    delete this.encoderBufferPointer;

    this._free(this.encoderOutputPointer);
    delete this.encoderOutputPointer;

    this._free(this.resampleSamplesPerChannelPointer);
    delete this.resampleSamplesPerChannelPointer;

    this._free(this.resampleBufferPointer);
    delete this.resampleBufferPointer;

    this._speex_resampler_destroy(this.resampler);
    delete this.resampler;
  }
};

AACEncorder.prototype.flush = function () {
  var exportPage;
  if (this.framesInPage) {
    exportPage = this.generatePage();
  }
  // discard any pending data in resample buffer (only a few ms worth)
  this.resampleBufferIndex = 0;
  return exportPage;
};

AACEncorder.prototype.encodeFinalFrame = function () {
  var exportPages = [];

  // Encode the data remaining in the resample buffer.
  if (this.resampleBufferIndex > 0) {
    const dataToFill =
      (this.resampleBufferLength - this.resampleBufferIndex) /
      this.config.numberOfChannels;
    const numBuffers = Math.ceil(dataToFill / this.bufferLength);

    for (var i = 0; i < numBuffers; i++) {
      var finalFrameBuffers = [];
      for (var j = 0; j < this.config.numberOfChannels; j++) {
        finalFrameBuffers.push(new Float32Array(this.bufferLength));
      }
      exportPages = exportPages.concat(this.encode(finalFrameBuffers));
    }
  }

  this.headerType += 4;
  exportPages.push(this.generatePage());
  return exportPages;
};

AACEncorder.prototype.generatePage = function () {
  // return exportPage;
};

AACEncorder.prototype.segmentPacket = function (packetLength) {
  var packetIndex = 0;
  var exportPages = [];

  while (packetLength >= 0) {
    if (this.segmentTableIndex === 255) {
      exportPages.push(this.generatePage());
      this.headerType = 1;
    }

    var segmentLength = Math.min(packetLength, 255);
    this.segmentTable[this.segmentTableIndex++] = segmentLength;
    this.segmentData.set(
      this.encoderOutputBuffer.subarray(
        packetIndex,
        packetIndex + segmentLength
      ),
      this.segmentDataIndex
    );
    this.segmentDataIndex += segmentLength;
    packetIndex += segmentLength;
    packetLength -= 255;
  }

  this.granulePosition += 48 * this.config.encoderFrameSize;
  if (this.segmentTableIndex === 255) {
    exportPages.push(this.generatePage());
    this.headerType = 0;
  }

  return exportPages;
};

var encoder;
var postPageGlobal = (pageData) => {
  if (pageData) {
    postMessage(pageData, [pageData.page.buffer]);
  }
};

onmessage = ({ data }) => {
  if (encoder) {
    switch (data["command"]) {
      case "encode":
        encoder
          .encode(data["buffers"])
          .forEach((pageData) => postPageGlobal(pageData));
        break;

      case "done":
        encoder
          .encodeFinalFrame()
          .forEach((pageData) => postPageGlobal(pageData));
        encoder.destroy();
        encoder = null;
        postMessage({ message: "done" });
        break;

      case "flush":
        postPageGlobal(encoder.flush());
        postMessage({ message: "flushed" });
        break;

      default:
      // Ignore any unknown commands and continue recieving commands
    }
  }

  switch (data["command"]) {
    case "close":
      close();
      break;

    case "init":
      encoder = new AACEncorder(data, Module);
      postMessage({ message: "ready" });
      break;

    default:
    // Ignore any unknown commands and continue recieving commands
  }
};

// Exports for unit testing.
var module = module || {};
module.exports = {
  Module: Module,
  AACEncorder: AACEncorder,
};
