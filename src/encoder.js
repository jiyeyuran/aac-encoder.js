var AudioContext = global.AudioContext || global.webkitAudioContext;

// Constructor
var AACRecorder = function (init) {
  if (typeof init === "undefined") {
    throw TypeError(
      "Failed to construct 'AACRecorder': 1 argument required, but only 0 present."
    );
  }
  if (typeof init !== "object") {
    throw TypeError(
      "Failed to construct 'AACRecorder': The provided value is not of type 'AACRecorderInit'"
    );
  }
  if (typeof init.error === "undefined") {
    throw TypeError(
      "Failed to construct 'AACRecorder': Failed to read the 'error' property from 'AACRecorderInit': Required member is undefined."
    );
  }
  if (typeof init.error !== "function") {
    throw TypeError(
      "Failed to construct 'AACRecorder': Failed to read the 'error' property from 'AACRecorderInit': The given value is not a function"
    );
  }
  if (!init.output) {
    throw TypeError(
      "Failed to construct 'AACRecorder': Failed to read the 'output' property from 'AACRecorderInit': Required member is undefined."
    );
  }
  if (typeof init.output !== "function") {
    throw TypeError(
      "Failed to construct 'AACRecorder': Failed to read the 'output' property from 'AACRecorderInit': The given value is not a function"
    );
  }
  this.init = init;
  this.state = "unconfigured";
  this.audioContext = new AudioContext();
};

AACRecorder.prototype.configure = function (config) {
  if (typeof config === "undefined") {
    throw TypeError(
      "Failed to execute 'configure' on 'AACRecorder': 1 argument required, but only 0 present."
    );
  }
  if (typeof config !== "object") {
    throw TypeError(
      "Failed to execute 'configure' on 'AACRecorder': The provided value is not of type 'AACRecorderConfig'"
    );
  }
  this.config = Object.assign(
    {
      codec: "aac",
      bitrate: 64000,
      encoderPath: "encoderWorker.min.js",
      sampleRate: 48000,
      numberOfChannels: 1,
    },
    config
  );

  this.encoder = new global.Worker(this.config.encoderPath);

  var startTime;

  return new Promise((resolve) => {
    var callback = ({ data }) => {
      switch (data["message"]) {
        case "ready":
          this.state = "configured";
          resolve();
          break;

        case "aac":
          const now = Date.now();
          let metadata;
          if (!startTime) {
            startTime = now;
            const { codec, numberOfChannels, sampleRate } = this.config;
            const sampleRateIndex = getSampleRateIndex(sampleRate);
            description = new Uint8Array(2);
            description[0] = (0x02 << 3) + ((sampleRateIndex & 0x0f) >> 1);
            description[1] =
              ((sampleRateIndex & 0x01) << 7) +
              ((numberOfChannels & 0x0f) << 3);
            metadata = {
              decoderConfig: {
                codec,
                description,
                numberOfChannels,
                sampleRate,
              },
            };
          }
          this.init.output(
            new EncodedAudioChunk({
              type: "key",
              timestamp: (now - startTime) * 1000,
              duration: data["duration"] * 1000,
              data: data["aac"],
            }),
            metadata
          );
          break;

        case "error":
          this.init.error(new Error(data["error"]));

        case "done":
          this.encoder.removeEventListener("message", callback);
          this.reset();
          break;
      }
    };

    this.encoder.addEventListener("message", callback);

    // exclude encoderPath
    const { encoderPath, ...config } = this.config;

    this.encoder.postMessage(
      Object.assign(
        {
          command: "init",
          originalSampleRate: this.audioContext.sampleRate,
        },
        config
      )
    );
  });
};

AACRecorder.prototype.encode = function (audioData) {
  if (this.encoder) {
    const buffers = [];

    for (let index = 0; index < audioData.numberOfChannels; index++) {
      const input = new Float32Array(audioData.numberOfFrames);

      audioData.copyTo(input, {
        planeIndex: index,
        frameOffset: 0,
        frameCount: audioData.numberOfFrames,
        format: audioData.format,
      });

      buffers.push(input);
    }

    this.encoder.postMessage(
      {
        command: "encode",
        buffers,
      },
      buffers.map((b) => b.buffer)
    );
  }
};

AACRecorder.prototype.flush = function () {
  if (this.encoder) {
    this.encoder.postMessage({ command: "flush" });
  }
};

AACRecorder.prototype.reset = function () {
  this.state = "unconfigured";
  if (this.encoder) {
    this.encoder.postMessage({ command: "done" });
  }
};

AACRecorder.prototype.close = function () {
  this.state = "closed";
  if (this.encoder) {
    this.encoder.postMessage({ command: "done" });
    this.encoder.postMessage({ command: "close" });
  }
};

function getSampleRateIndex(sampleRate) {
  const index = [
    96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025,
    8000,
  ].indexOf(sampleRate);
  return index < 0 ? 0x0f : index;
}

module.exports = AACRecorder;
