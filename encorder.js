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
      maxFramesPerPage: 40,
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

        case "page":
          this.init.output(data["page"]);
          break;

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
    this.encoder.postMessage({
      command: "encode",
      buffers: [audioData],
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
