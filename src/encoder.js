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
      bitrate: 64000,
      encoderFrameSize: 20,
      encoderPath: "encoderWorker.min.js",
      sampleRate: 48000,
      numberOfChannels: 1,
      resampleQuality: 3,
    },
    config
  );

  return new Promise((resolve) => {
    var callback = ({ data }) => {
      switch (data["message"]) {
        case "ready":
          this.state = "configured";
          resolve();
          break;

        case "aac":
          this.init.output(data["aac"]);
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
      const buffer = new Float32Array(audioData.numberOfFrames);

      audioData.copyTo(buffer, {
        planeIndex: index,
        frameOffset: 0,
        frameCount: audioData.numberOfFrames,
        format: audioData.format,
      });

      const output = new DataView(
        new ArrayBuffer(audioData.numberOfFrames * 2)
      );

      for (let i = 0; i < buffer.length; i++) {
        const s = Math.max(-1, Math.min(1, input[i]));
        output.setInt16(i, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      }

      buffers.push(output.buffer);
    }

    this.encoder.postMessage({
      command: "encode",
      buffers,
    });
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
    this.encoder.postMessage({ command: "close" });
  }
};

AACRecorder.prototype.close = function () {
  this.state = "closed";
  if (this.encoder) {
    this.encoder.postMessage({ command: "done" });
  }
};

module.exports = AACRecorder;
