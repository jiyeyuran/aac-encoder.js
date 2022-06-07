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

const IN_AUDIO_DATA = 0;
const OUT_BITSTREAM_DATA = 3;

const AACEncoder = function (config, Module) {
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
      numberOfChannels: 1,
      originalSampleRate: 48000,
      resampleQuality: 3, // Value between 0 and 10 inclusive. 10 being highest quality.
    },
    config
  );

  this._aacEncOpen = Module._aacEncOpen;
  this._aacEncoder_SetParam = Module._aacEncoder_SetParam;
  this._aacEncInfo = Module._aacEncInfo;
  this._aacEncEncode = Module._aacEncEncode;

  this._speex_resampler_process_interleaved_int =
    Module._speex_resampler_process_interleaved_int;
  this._speex_resampler_init = Module._speex_resampler_init;
  this._speex_resampler_destroy = Module._speex_resampler_destroy;

  this._free = Module._free;
  this._malloc = Module._malloc;
  this.HEAPU8 = Module.HEAPU8;
  this.HEAP16 = Module.HEAP16;
  this.HEAP32 = Module.HEAP32;

  this.initCodec();
  this.initResampler();
};

AACEncoder.prototype.initCodec = function () {
  const aot = 2;
  const afterburner = 1;
  const { numberOfChannels, biterate, sampleRate, encoderFrameSize } =
    this.config;
  let ret;

  const handlePointer = this._malloc(4);
  ret = this._aacEncOpen(handlePointer, 0, numberOfChannels);
  if (ret !== AACENC_OK) {
    throw new Error("Unable to open encoder");
  }
  this._handle = this.HEAP32[handlePointer >> 2];

  ret = this._aacEncoder_SetParam(this._handle, AACENC_AOT, aot);
  if (ret !== AACENC_OK) {
    throw new Error(`Unable to set the AOT: ${aot}`);
  }
  ret = this._aacEncoder_SetParam(this._handle, AACENC_SAMPLERATE, sampleRate);
  if (ret !== AACENC_OK) {
    throw new Error(`Unable to set the sample rate: ${sampleRate}`);
  }
  ret = this._aacEncoder_SetParam(
    this._handle,
    AACENC_CHANNELMODE,
    numberOfChannels
  );
  if (ret !== AACENC_OK) {
    throw new Error(`Unable to set the channel mode: ${numberOfChannels}`);
  }
  ret = this._aacEncoder_SetParam(this._handle, AACENC_CHANNELORDER, 1);
  if (ret !== AACENC_OK) {
    throw new Error(`Unable to set the channel order: 1`);
  }
  ret = this._aacEncoder_SetParam(this._handle, AACENC_BITRATE, biterate);
  if (ret !== AACENC_OK) {
    throw new Error(`Unable to set the bitrate: ${biterate}`);
  }
  ret = this._aacEncoder_SetParam(this._handle, AACENC_TRANSMUX, TT_MP4_ADTS);
  if (ret !== AACENC_OK) {
    throw new Error(`Unable to set the ADTS transmux: ${TT_MP4_ADTS}`);
  }
  ret = this._aacEncoder_SetParam(
    this._handle,
    AACENC_AFTERBURNER,
    afterburner
  );
  if (ret !== AACENC_OK) {
    throw new Error(`Unable to set the afterburner mode: ${afterburner}`);
  }
  ret = this._aacEncEncode(this._handle, null, null, null, null);
  if (ret !== AACENC_OK) {
    throw new Error("Unable to initialize the encoder");
  }

  var infoPointer = this._malloc(96);
  ret = this._aacEncInfo(this._handle, infoPointer);
  if (ret !== AACENC_OK) {
    throw new Error("Unable to get the encoder info");
  }
  var frameLength = this.HEAP32[(infoPointer >> 2) + 4];

  this.encoderSamplesPerChannel = (sampleRate * encoderFrameSize) / 1000;
  this.encoderSamplesPerChannelPointer = this._malloc(4);
  this.HEAP32[this.encoderSamplesPerChannelPointer >> 2] =
    this.encoderSamplesPerChannel;

  this.encoderBufferLength = this.encoderSamplesPerChannel * numberOfChannels;
  this.encoderBufferPointer = this._malloc(this.encoderBufferLength * 2); // 2 bytes per sample
  this.encoderBuffer = this.HEAP16.subarray(
    this.encoderBufferPointer >> 1,
    (this.encoderBufferPointer >> 1) + this.encoderBufferLength
  );

  this.encoderOutputMaxLength = numberOfChannels * 2 * frameLength;
  this.encoderOutputPointer = this._malloc(this.encoderOutputMaxLength);
  this.encoderOutputBuffer = this.HEAPU8.subarray(
    this.encoderOutputPointer,
    this.encoderOutputPointer + this.encoderOutputMaxLength
  );

  this.inBufDescPointer = this.createBufDesc(
    IN_AUDIO_DATA,
    this.encoderBufferPointer,
    this.encoderBufferLength
  );
  this.outBufDecPointer = this.createBufDesc(
    OUT_BITSTREAM_DATA,
    this.encoderOutputPointer,
    this.encoderOutputMaxLength
  );
  this.inArgsPointer = this._malloc(8);
  this.HEAP32[this.inArgsPointer >> 2] = this.encoderBufferLength;
  this.outArgsPointer = this._malloc(16);
};

AACEncoder.prototype.initResampler = function () {
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
  this.resampleBufferPointer = this._malloc(this.resampleBufferLength * 2); // 2 bytes per sample
  this.resampleBuffer = this.HEAP16.subarray(
    this.resampleBufferPointer >> 1,
    (this.resampleBufferPointer >> 1) + this.resampleBufferLength
  );
};

AACEncoder.prototype.interleave = function (buffers) {
  if (buffers.length === 1) {
    return buffers[0];
  }
  for (var i = 0; i < this.bufferLength; i++) {
    for (var channel = 0; channel < this.config.numberOfChannels; channel++) {
      this.interleavedBuffers[i * this.config.numberOfChannels + channel] =
        buffers[channel][i];
    }
  }

  return this.interleavedBuffers;
};

AACEncoder.prototype.encode = function (buffers) {
  // Determine bufferLength dynamically
  if (!this.bufferLength) {
    this.bufferLength = buffers[0].length;
    this.interleavedBuffers = new Int16Array(
      this.bufferLength * this.config.numberOfChannels
    );
  }

  var samples = this.interleave(buffers);
  var sampleIndex = 0;
  var buffers = [];

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
      this._speex_resampler_process_interleaved_int(
        this.resampler,
        this.resampleBufferPointer,
        this.resampleSamplesPerChannelPointer,
        this.encoderBufferPointer,
        this.encoderSamplesPerChannelPointer
      );

      this.resampleBufferIndex = 0;

      const ret = this._aacEncEncode(
        this._handle,
        this.inBufDescPointer,
        this.outBufDecPointer,
        this.inArgsPointer,
        this.outArgsPointer
      );
      if (ret !== AACENC_OK) {
        throw new Error(`Encoding failed: ${ret}`);
      }
      const numOutBytes = this.HEAP32[this.outArgsPointer >> 2];
      console.log('numOutBytes', numOutBytes);
      var outBuffer = new Uint8Array(numOutBytes);
      outBuffer.set(this.encoderOutputBuffer.subarray(0, numOutBytes));

      buffers.push(outBuffer);
    }
  }

  return buffers;
};

AACEncoder.prototype.destroy = function () {
  if (this.encoder) {
    this._free(this.encoderSamplesPerChannelPointer);
    delete this.encoderSamplesPerChannelPointer;

    this._free(this.inArgsPointer);
    this._free(this.outArgsPointer);
    this.freeBufDesc(this.inBufDescPointer);
    this.freeBufDesc(this.outBufDecPointer);

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

AACEncoder.prototype.flush = function () {
  // discard any pending data in resample buffer (only a few ms worth)
  this.resampleBufferIndex = 0;
};

AACEncoder.prototype.createBufDesc = function (
  identifier,
  bufferPointer,
  length
) {
  const bufPtr = this._malloc(20);
  const identifierPtr = this._malloc(4);
  const sizePtr = this._malloc(4);
  const elemSizePtr = this._malloc(4);

  this.HEAP32[bufPtr >> 2] = bufferPointer;
  this.HEAP32[identifierPtr >> 2] = identifier;
  this.HEAP32[sizePtr >> 2] = length;
  this.HEAP32[elemSizePtr >> 2] = 2;

  // init AACENC_BufDesc struct
  const bufDescPointer = this._malloc(4);
  let basePointer = bufDescPointer >> 2;
  this.HEAP32[basePointer++] = 1;
  this.HEAP32[basePointer++] = bufPtr;
  this.HEAP32[basePointer++] = identifierPtr;
  this.HEAP32[basePointer++] = sizePtr;
  this.HEAP32[basePointer++] = elemSizePtr;

  return bufDescPointer;
};

AACEncoder.prototype.freeBufDesc = function (bufDescPointer) {
  this._free(this.HEAP32[(bufDescPointer >> 2) + 1]);
  this._free(this.HEAP32[(bufDescPointer >> 2) + 2]);
  this._free(this.HEAP32[(bufDescPointer >> 2) + 3]);
  this._free(this.HEAP32[(bufDescPointer >> 2) + 4]);
  this._free(bufDescPointer);
};

var encoder;
var postAACDataGlobal = (data) => {
  if (data) {
    postMessage({ message: "aac", aac: data }, [data.buffer]);
  }
};

onmessage = ({ data }) => {
  if (encoder) {
    switch (data["command"]) {
      case "encode":
        encoder
          .encode(data["buffers"])
          .forEach((data) => postAACDataGlobal(data));
        break;

      case "done":
        encoder.destroy();
        encoder = null;
        postMessage({ message: "done" });
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
      encoder = new AACEncoder(data, Module);
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
  AACEncoder: AACEncoder,
};
