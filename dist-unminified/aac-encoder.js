(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AACEncoder"] = factory();
	else
		root["AACEncoder"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/encoder.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL2dsb2JhbC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL0FBQ0VuY29kZXIvKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzP2NkMDAiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./node_modules/webpack/buildin/global.js\n");

/***/ }),

/***/ "./src/encoder.js":
/*!************************!*\
  !*** ./src/encoder.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(global) {var _excluded = [\"encoderPath\"];\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\n\nvar AudioContext = global.AudioContext || global.webkitAudioContext; // Constructor\n\nvar AACRecorder = function AACRecorder(init) {\n  if (typeof init === \"undefined\") {\n    throw TypeError(\"Failed to construct 'AACRecorder': 1 argument required, but only 0 present.\");\n  }\n\n  if (_typeof(init) !== \"object\") {\n    throw TypeError(\"Failed to construct 'AACRecorder': The provided value is not of type 'AACRecorderInit'\");\n  }\n\n  if (typeof init.error === \"undefined\") {\n    throw TypeError(\"Failed to construct 'AACRecorder': Failed to read the 'error' property from 'AACRecorderInit': Required member is undefined.\");\n  }\n\n  if (typeof init.error !== \"function\") {\n    throw TypeError(\"Failed to construct 'AACRecorder': Failed to read the 'error' property from 'AACRecorderInit': The given value is not a function\");\n  }\n\n  if (!init.output) {\n    throw TypeError(\"Failed to construct 'AACRecorder': Failed to read the 'output' property from 'AACRecorderInit': Required member is undefined.\");\n  }\n\n  if (typeof init.output !== \"function\") {\n    throw TypeError(\"Failed to construct 'AACRecorder': Failed to read the 'output' property from 'AACRecorderInit': The given value is not a function\");\n  }\n\n  this.init = init;\n  this.state = \"unconfigured\";\n  this.audioContext = new AudioContext();\n};\n\nAACRecorder.prototype.configure = function (config) {\n  var _this = this;\n\n  if (typeof config === \"undefined\") {\n    throw TypeError(\"Failed to execute 'configure' on 'AACRecorder': 1 argument required, but only 0 present.\");\n  }\n\n  if (_typeof(config) !== \"object\") {\n    throw TypeError(\"Failed to execute 'configure' on 'AACRecorder': The provided value is not of type 'AACRecorderConfig'\");\n  }\n\n  this.config = Object.assign({\n    codec: \"aac\",\n    bitrate: 64000,\n    encoderPath: \"encoderWorker.min.js\",\n    sampleRate: 48000,\n    numberOfChannels: 1\n  }, config);\n  this.encoder = new global.Worker(this.config.encoderPath);\n  var startTime;\n  return new Promise(function (resolve) {\n    var callback = function callback(_ref) {\n      var data = _ref.data;\n\n      switch (data[\"message\"]) {\n        case \"ready\":\n          _this.state = \"configured\";\n          resolve();\n          break;\n\n        case \"aac\":\n          var now = Date.now();\n          var metadata;\n\n          if (!startTime) {\n            startTime = now;\n            var _this$config = _this.config,\n                codec = _this$config.codec,\n                numberOfChannels = _this$config.numberOfChannels,\n                sampleRate = _this$config.sampleRate;\n            var sampleRateIndex = getSampleRateIndex(sampleRate);\n            description = new Uint8Array(2);\n            description[0] = (0x02 << 3) + ((sampleRateIndex & 0x0f) >> 1);\n            description[1] = ((sampleRateIndex & 0x01) << 7) + ((numberOfChannels & 0x0f) << 3);\n            metadata = {\n              decoderConfig: {\n                codec: codec,\n                description: description,\n                numberOfChannels: numberOfChannels,\n                sampleRate: sampleRate\n              }\n            };\n          }\n\n          _this.init.output(new EncodedAudioChunk({\n            type: \"key\",\n            timestamp: (now - startTime) * 1000,\n            duration: data[\"duration\"] * 1000,\n            data: data[\"aac\"]\n          }), metadata);\n\n          break;\n\n        case \"error\":\n          _this.init.error(new Error(data[\"error\"]));\n\n        case \"done\":\n          _this.encoder.removeEventListener(\"message\", callback);\n\n          _this.reset();\n\n          break;\n      }\n    };\n\n    _this.encoder.addEventListener(\"message\", callback); // exclude encoderPath\n\n\n    var _this$config2 = _this.config,\n        encoderPath = _this$config2.encoderPath,\n        config = _objectWithoutProperties(_this$config2, _excluded);\n\n    _this.encoder.postMessage(Object.assign({\n      command: \"init\",\n      originalSampleRate: _this.audioContext.sampleRate\n    }, config));\n  });\n};\n\nAACRecorder.prototype.encode = function (audioData) {\n  if (this.encoder) {\n    var buffers = [];\n\n    for (var index = 0; index < audioData.numberOfChannels; index++) {\n      var input = new Float32Array(audioData.numberOfFrames);\n      audioData.copyTo(input, {\n        planeIndex: index,\n        frameOffset: 0,\n        frameCount: audioData.numberOfFrames,\n        format: audioData.format\n      });\n      buffers.push(input);\n    }\n\n    this.encoder.postMessage({\n      command: \"encode\",\n      buffers: buffers\n    }, buffers.map(function (b) {\n      return b.buffer;\n    }));\n  }\n};\n\nAACRecorder.prototype.flush = function () {\n  if (this.encoder) {\n    this.encoder.postMessage({\n      command: \"flush\"\n    });\n  }\n};\n\nAACRecorder.prototype.reset = function () {\n  this.state = \"unconfigured\";\n\n  if (this.encoder) {\n    this.encoder.postMessage({\n      command: \"done\"\n    });\n  }\n};\n\nAACRecorder.prototype.close = function () {\n  this.state = \"closed\";\n\n  if (this.encoder) {\n    this.encoder.postMessage({\n      command: \"done\"\n    });\n    this.encoder.postMessage({\n      command: \"close\"\n    });\n  }\n};\n\nfunction getSampleRateIndex(sampleRate) {\n  var index = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000].indexOf(sampleRate);\n  return index < 0 ? 0x0f : index;\n}\n\nmodule.exports = AACRecorder;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZW5jb2Rlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL0FBQ0VuY29kZXIvLi9zcmMvZW5jb2Rlci5qcz8yNjI3Il0sInNvdXJjZXNDb250ZW50IjpbInZhciBBdWRpb0NvbnRleHQgPSBnbG9iYWwuQXVkaW9Db250ZXh0IHx8IGdsb2JhbC53ZWJraXRBdWRpb0NvbnRleHQ7XG5cbi8vIENvbnN0cnVjdG9yXG52YXIgQUFDUmVjb3JkZXIgPSBmdW5jdGlvbiAoaW5pdCkge1xuICBpZiAodHlwZW9mIGluaXQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICBcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ0FBQ1JlY29yZGVyJzogMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LlwiXG4gICAgKTtcbiAgfVxuICBpZiAodHlwZW9mIGluaXQgIT09IFwib2JqZWN0XCIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICBcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ0FBQ1JlY29yZGVyJzogVGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBvZiB0eXBlICdBQUNSZWNvcmRlckluaXQnXCJcbiAgICApO1xuICB9XG4gIGlmICh0eXBlb2YgaW5pdC5lcnJvciA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHRocm93IFR5cGVFcnJvcihcbiAgICAgIFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnQUFDUmVjb3JkZXInOiBGYWlsZWQgdG8gcmVhZCB0aGUgJ2Vycm9yJyBwcm9wZXJ0eSBmcm9tICdBQUNSZWNvcmRlckluaXQnOiBSZXF1aXJlZCBtZW1iZXIgaXMgdW5kZWZpbmVkLlwiXG4gICAgKTtcbiAgfVxuICBpZiAodHlwZW9mIGluaXQuZXJyb3IgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIHRocm93IFR5cGVFcnJvcihcbiAgICAgIFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnQUFDUmVjb3JkZXInOiBGYWlsZWQgdG8gcmVhZCB0aGUgJ2Vycm9yJyBwcm9wZXJ0eSBmcm9tICdBQUNSZWNvcmRlckluaXQnOiBUaGUgZ2l2ZW4gdmFsdWUgaXMgbm90IGEgZnVuY3Rpb25cIlxuICAgICk7XG4gIH1cbiAgaWYgKCFpbml0Lm91dHB1dCkge1xuICAgIHRocm93IFR5cGVFcnJvcihcbiAgICAgIFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnQUFDUmVjb3JkZXInOiBGYWlsZWQgdG8gcmVhZCB0aGUgJ291dHB1dCcgcHJvcGVydHkgZnJvbSAnQUFDUmVjb3JkZXJJbml0JzogUmVxdWlyZWQgbWVtYmVyIGlzIHVuZGVmaW5lZC5cIlxuICAgICk7XG4gIH1cbiAgaWYgKHR5cGVvZiBpbml0Lm91dHB1dCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFxuICAgICAgXCJGYWlsZWQgdG8gY29uc3RydWN0ICdBQUNSZWNvcmRlcic6IEZhaWxlZCB0byByZWFkIHRoZSAnb3V0cHV0JyBwcm9wZXJ0eSBmcm9tICdBQUNSZWNvcmRlckluaXQnOiBUaGUgZ2l2ZW4gdmFsdWUgaXMgbm90IGEgZnVuY3Rpb25cIlxuICAgICk7XG4gIH1cbiAgdGhpcy5pbml0ID0gaW5pdDtcbiAgdGhpcy5zdGF0ZSA9IFwidW5jb25maWd1cmVkXCI7XG4gIHRoaXMuYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xufTtcblxuQUFDUmVjb3JkZXIucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICBcIkZhaWxlZCB0byBleGVjdXRlICdjb25maWd1cmUnIG9uICdBQUNSZWNvcmRlcic6IDEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC5cIlxuICAgICk7XG4gIH1cbiAgaWYgKHR5cGVvZiBjb25maWcgIT09IFwib2JqZWN0XCIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICBcIkZhaWxlZCB0byBleGVjdXRlICdjb25maWd1cmUnIG9uICdBQUNSZWNvcmRlcic6IFRoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3Qgb2YgdHlwZSAnQUFDUmVjb3JkZXJDb25maWcnXCJcbiAgICApO1xuICB9XG4gIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbihcbiAgICB7XG4gICAgICBjb2RlYzogXCJhYWNcIixcbiAgICAgIGJpdHJhdGU6IDY0MDAwLFxuICAgICAgZW5jb2RlclBhdGg6IFwiZW5jb2Rlcldvcmtlci5taW4uanNcIixcbiAgICAgIHNhbXBsZVJhdGU6IDQ4MDAwLFxuICAgICAgbnVtYmVyT2ZDaGFubmVsczogMSxcbiAgICB9LFxuICAgIGNvbmZpZ1xuICApO1xuXG4gIHRoaXMuZW5jb2RlciA9IG5ldyBnbG9iYWwuV29ya2VyKHRoaXMuY29uZmlnLmVuY29kZXJQYXRoKTtcblxuICB2YXIgc3RhcnRUaW1lO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHZhciBjYWxsYmFjayA9ICh7IGRhdGEgfSkgPT4ge1xuICAgICAgc3dpdGNoIChkYXRhW1wibWVzc2FnZVwiXSkge1xuICAgICAgICBjYXNlIFwicmVhZHlcIjpcbiAgICAgICAgICB0aGlzLnN0YXRlID0gXCJjb25maWd1cmVkXCI7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJhYWNcIjpcbiAgICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgIGxldCBtZXRhZGF0YTtcbiAgICAgICAgICBpZiAoIXN0YXJ0VGltZSkge1xuICAgICAgICAgICAgc3RhcnRUaW1lID0gbm93O1xuICAgICAgICAgICAgY29uc3QgeyBjb2RlYywgbnVtYmVyT2ZDaGFubmVscywgc2FtcGxlUmF0ZSB9ID0gdGhpcy5jb25maWc7XG4gICAgICAgICAgICBjb25zdCBzYW1wbGVSYXRlSW5kZXggPSBnZXRTYW1wbGVSYXRlSW5kZXgoc2FtcGxlUmF0ZSk7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbiA9IG5ldyBVaW50OEFycmF5KDIpO1xuICAgICAgICAgICAgZGVzY3JpcHRpb25bMF0gPSAoMHgwMiA8PCAzKSArICgoc2FtcGxlUmF0ZUluZGV4ICYgMHgwZikgPj4gMSk7XG4gICAgICAgICAgICBkZXNjcmlwdGlvblsxXSA9XG4gICAgICAgICAgICAgICgoc2FtcGxlUmF0ZUluZGV4ICYgMHgwMSkgPDwgNykgK1xuICAgICAgICAgICAgICAoKG51bWJlck9mQ2hhbm5lbHMgJiAweDBmKSA8PCAzKTtcbiAgICAgICAgICAgIG1ldGFkYXRhID0ge1xuICAgICAgICAgICAgICBkZWNvZGVyQ29uZmlnOiB7XG4gICAgICAgICAgICAgICAgY29kZWMsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFubmVscyxcbiAgICAgICAgICAgICAgICBzYW1wbGVSYXRlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5pbml0Lm91dHB1dChcbiAgICAgICAgICAgIG5ldyBFbmNvZGVkQXVkaW9DaHVuayh7XG4gICAgICAgICAgICAgIHR5cGU6IFwia2V5XCIsXG4gICAgICAgICAgICAgIHRpbWVzdGFtcDogKG5vdyAtIHN0YXJ0VGltZSkgKiAxMDAwLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogZGF0YVtcImR1cmF0aW9uXCJdICogMTAwMCxcbiAgICAgICAgICAgICAgZGF0YTogZGF0YVtcImFhY1wiXSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWV0YWRhdGFcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgXCJlcnJvclwiOlxuICAgICAgICAgIHRoaXMuaW5pdC5lcnJvcihuZXcgRXJyb3IoZGF0YVtcImVycm9yXCJdKSk7XG5cbiAgICAgICAgY2FzZSBcImRvbmVcIjpcbiAgICAgICAgICB0aGlzLmVuY29kZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgY2FsbGJhY2spO1xuICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5lbmNvZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGNhbGxiYWNrKTtcblxuICAgIC8vIGV4Y2x1ZGUgZW5jb2RlclBhdGhcbiAgICBjb25zdCB7IGVuY29kZXJQYXRoLCAuLi5jb25maWcgfSA9IHRoaXMuY29uZmlnO1xuXG4gICAgdGhpcy5lbmNvZGVyLnBvc3RNZXNzYWdlKFxuICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAge1xuICAgICAgICAgIGNvbW1hbmQ6IFwiaW5pdFwiLFxuICAgICAgICAgIG9yaWdpbmFsU2FtcGxlUmF0ZTogdGhpcy5hdWRpb0NvbnRleHQuc2FtcGxlUmF0ZSxcbiAgICAgICAgfSxcbiAgICAgICAgY29uZmlnXG4gICAgICApXG4gICAgKTtcbiAgfSk7XG59O1xuXG5BQUNSZWNvcmRlci5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24gKGF1ZGlvRGF0YSkge1xuICBpZiAodGhpcy5lbmNvZGVyKSB7XG4gICAgY29uc3QgYnVmZmVycyA9IFtdO1xuXG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGF1ZGlvRGF0YS5udW1iZXJPZkNoYW5uZWxzOyBpbmRleCsrKSB7XG4gICAgICBjb25zdCBpbnB1dCA9IG5ldyBGbG9hdDMyQXJyYXkoYXVkaW9EYXRhLm51bWJlck9mRnJhbWVzKTtcblxuICAgICAgYXVkaW9EYXRhLmNvcHlUbyhpbnB1dCwge1xuICAgICAgICBwbGFuZUluZGV4OiBpbmRleCxcbiAgICAgICAgZnJhbWVPZmZzZXQ6IDAsXG4gICAgICAgIGZyYW1lQ291bnQ6IGF1ZGlvRGF0YS5udW1iZXJPZkZyYW1lcyxcbiAgICAgICAgZm9ybWF0OiBhdWRpb0RhdGEuZm9ybWF0LFxuICAgICAgfSk7XG5cbiAgICAgIGJ1ZmZlcnMucHVzaChpbnB1dCk7XG4gICAgfVxuXG4gICAgdGhpcy5lbmNvZGVyLnBvc3RNZXNzYWdlKFxuICAgICAge1xuICAgICAgICBjb21tYW5kOiBcImVuY29kZVwiLFxuICAgICAgICBidWZmZXJzLFxuICAgICAgfSxcbiAgICAgIGJ1ZmZlcnMubWFwKChiKSA9PiBiLmJ1ZmZlcilcbiAgICApO1xuICB9XG59O1xuXG5BQUNSZWNvcmRlci5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmVuY29kZXIpIHtcbiAgICB0aGlzLmVuY29kZXIucG9zdE1lc3NhZ2UoeyBjb21tYW5kOiBcImZsdXNoXCIgfSk7XG4gIH1cbn07XG5cbkFBQ1JlY29yZGVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5zdGF0ZSA9IFwidW5jb25maWd1cmVkXCI7XG4gIGlmICh0aGlzLmVuY29kZXIpIHtcbiAgICB0aGlzLmVuY29kZXIucG9zdE1lc3NhZ2UoeyBjb21tYW5kOiBcImRvbmVcIiB9KTtcbiAgfVxufTtcblxuQUFDUmVjb3JkZXIucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnN0YXRlID0gXCJjbG9zZWRcIjtcbiAgaWYgKHRoaXMuZW5jb2Rlcikge1xuICAgIHRoaXMuZW5jb2Rlci5wb3N0TWVzc2FnZSh7IGNvbW1hbmQ6IFwiZG9uZVwiIH0pO1xuICAgIHRoaXMuZW5jb2Rlci5wb3N0TWVzc2FnZSh7IGNvbW1hbmQ6IFwiY2xvc2VcIiB9KTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZ2V0U2FtcGxlUmF0ZUluZGV4KHNhbXBsZVJhdGUpIHtcbiAgY29uc3QgaW5kZXggPSBbXG4gICAgOTYwMDAsIDg4MjAwLCA2NDAwMCwgNDgwMDAsIDQ0MTAwLCAzMjAwMCwgMjQwMDAsIDIyMDUwLCAxNjAwMCwgMTIwMDAsIDExMDI1LFxuICAgIDgwMDAsXG4gIF0uaW5kZXhPZihzYW1wbGVSYXRlKTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IDB4MGYgOiBpbmRleDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBQUNSZWNvcmRlcjtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBVUE7QUFFQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBREE7QUFRQTtBQUNBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBNUNBO0FBOENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUZBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRkE7QUFJQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/encoder.js\n");

/***/ })

/******/ });
});