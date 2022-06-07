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

const AACENC_ENCODE_EOF = 128;

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
      numberOfChannels: 1,
    },
    config
  );

  this._aacEncOpen = Module._aacEncOpen;
  this._aacEncoder_SetParam = Module._aacEncoder_SetParam;
  this._aacEncInfo = Module._aacEncInfo;
  this._aacEncEncode = Module._aacEncEncode;

  this._free = Module._free;
  this._malloc = Module._malloc;
  this.HEAPU8 = Module.HEAPU8;
  this.HEAP16 = Module.HEAP16;
  this.HEAP32 = Module.HEAP32;

  this.initCodec();
};

AACEncoder.prototype.initCodec = function () {
  const aot = 2;
  const afterburner = 1;
  const { numberOfChannels, biterate, sampleRate } =
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
  const frameLength = this.HEAP32[(infoPointer >> 2) + 4];

  this.encoderBufferLength = numberOfChannels * frameLength;
  this.encoderBufferPointer = this._malloc(this.encoderBufferLength * 2); // 2 bytes per sample
  this.encoderBuffer = this.HEAP16.subarray(
    this.encoderBufferPointer >> 1,
    (this.encoderBufferPointer >> 1) + this.encoderBufferLength
  );

  const encoderOutputMaxLength = 20480;

  this.encoderOutputPointer = this._malloc(encoderOutputMaxLength);
  this.encoderOutputBuffer = this.HEAPU8.subarray(
    this.encoderOutputPointer,
    this.encoderOutputPointer + encoderOutputMaxLength
  );

  this.inBufDescPointer = this.createInBufDesc(
    this.encoderBufferPointer,
    this.encoderBufferLength * 2
  );
  this.outBufDecPointer = this.createOutBufDesc(
    this.encoderOutputPointer,
    encoderOutputMaxLength
  );
  this.inArgsPointer = this._malloc(8);
  this.HEAP32[this.inArgsPointer >> 2] = this.encoderBufferLength;
  this.outArgsPointer = this._malloc(16);

  this.encoderBufferIndex = 0;
};

AACEncoder.prototype.pcmArrayBuffer = function (buffers) {
  const numberOfChannels = buffers.length;

  for (var i = 0; i < buffers[0].length; i++) {
    for (var channel = 0; channel < numberOfChannels; channel++) {
      var x = buffers[channel][i] * 0x7fff;
      this.interleavedBuffers[i * numberOfChannels + channel] =
        x < 0 ? Math.max(x, -0x8000) : Math.min(x, 0x7fff);
    }
  }

  return this.interleavedBuffers;
};

AACEncoder.prototype.encode = function (buffers) {
  if (!this.interleavedBuffers) {
    this.interleavedBuffers = new Int16Array(
      buffers[0].length * buffers.length
    );
  }

  var samples = this.pcmArrayBuffer(buffers);
  var sampleIndex = 0;
  var outputBuffers = [];

  while (sampleIndex < samples.length) {
    var lengthToCopy = Math.min(
      this.encoderBufferLength - this.encoderBufferIndex,
      samples.length - sampleIndex
    );
    this.encoderBuffer.set(
      samples.subarray(sampleIndex, sampleIndex + lengthToCopy),
      this.encoderBufferIndex
    );
    sampleIndex += lengthToCopy;
    this.encoderBufferIndex += lengthToCopy;

    if (this.encoderBufferIndex === this.encoderBufferLength) {
      this.encoderBufferIndex = 0;
      const ret = this._aacEncEncode(
        this._handle,
        this.inBufDescPointer,
        this.outBufDecPointer,
        this.inArgsPointer,
        this.outArgsPointer
      );
      if (ret !== AACENC_OK) {
        if (ret === AACENC_ENCODE_EOF) {
          break;
        }
        throw new Error(`Encoding failed: ${ret}`);
      }
      const numOutBytes = this.HEAP32[this.outArgsPointer >> 2];
      if (numOutBytes === 0) {
        continue;
      }
      const outputBuffer = new Uint8Array(numOutBytes);
      outputBuffer.set(this.encoderOutputBuffer.subarray(0, numOutBytes));
      outputBuffers.push(outputBuffer);
    }
  }

  return outputBuffers;
};

AACEncoder.prototype.destroy = function () {
  if (this.encoder) {
    this._free(this.inArgsPointer);
    this._free(this.outArgsPointer);
    this.freeBufDesc(this.inBufDescPointer);
    this.freeBufDesc(this.outBufDecPointer);
    this._free(this.encoderBufferPointer);
    delete this.encoderBufferPointer;
    this._free(this.encoderOutputPointer);
    delete this.encoderOutputPointer;
  }
};

AACEncoder.prototype.flush = function () {
  const buffers = [];
  this.encoderBufferIndex = 0;

  while (true) {
    const ret = this._aacEncEncode(
      this._handle,
      this.inBufDescPointer,
      this.outBufDecPointer,
      this.inArgsPointer,
      this.outArgsPointer
    );
    if (ret !== AACENC_OK) {
      break;
    }
    const numOutBytes = this.HEAP32[this.outArgsPointer >> 2];
    if (numOutBytes === 0) {
      this.setBufDescSize(this.inBufDescPointer, 0);
      // numInSamples set to -1
      this.HEAP32[this.inArgsPointer >> 2] = -1;
      continue;
    }
    var buffer = new Uint8Array(numOutBytes);
    buffer.set(this.encoderOutputBuffer.subarray(0, numOutBytes));
    buffers.push(buffer);
  }

  return buffers;
};

AACEncoder.prototype.createInBufDesc = function (bufferPointer, length) {
  const bufPtr = this._malloc(4);
  const identifierPtr = this._malloc(4);
  const sizePtr = this._malloc(4);
  const elemSizePtr = this._malloc(4);

  this.HEAP32[bufPtr >> 2] = bufferPointer;
  this.HEAP32[identifierPtr >> 2] = IN_AUDIO_DATA;
  this.HEAP32[sizePtr >> 2] = length;
  this.HEAP32[elemSizePtr >> 2] = 2;

  // init AACENC_BufDesc struct
  const bufDescPointer = this._malloc(20);
  let basePointer = bufDescPointer >> 2;
  this.HEAP32[basePointer++] = 1;
  this.HEAP32[basePointer++] = bufPtr;
  this.HEAP32[basePointer++] = identifierPtr;
  this.HEAP32[basePointer++] = sizePtr;
  this.HEAP32[basePointer++] = elemSizePtr;

  return bufDescPointer;
};

AACEncoder.prototype.setBufDescSize = function (bufDescPointer, size) {
  const sizePtr = this.HEAP32[(bufDescPointer >> 2) + 3];
  this.HEAP32[sizePtr >> 2] = size;
};

AACEncoder.prototype.createOutBufDesc = function (bufferPointer, length) {
  const bufPtr = this._malloc(4);
  const identifierPtr = this._malloc(4);
  const sizePtr = this._malloc(4);
  const elemSizePtr = this._malloc(4);

  this.HEAP32[bufPtr >> 2] = bufferPointer;
  this.HEAP32[identifierPtr >> 2] = OUT_BITSTREAM_DATA;
  this.HEAP32[sizePtr >> 2] = length;
  this.HEAP32[elemSizePtr >> 2] = 1;

  // init AACENC_BufDesc struct
  const bufDescPointer = this._malloc(20);
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
        encoder.flush();
        encoder.destroy();
        encoder = null;
        postMessage({ message: "done" });
        break;

      case "flush":
        encoder.flush().forEach((data) => postAACDataGlobal(data));;
        postMessage({ message: "flushed" });

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
