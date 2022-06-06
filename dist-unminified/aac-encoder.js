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

eval("/* WEBPACK VAR INJECTION */(function(global) {var _excluded = [\"encoderPath\"];\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\n\nvar AudioContext = global.AudioContext || global.webkitAudioContext; // Constructor\n\nvar AACRecorder = function AACRecorder(init) {\n  if (typeof init === \"undefined\") {\n    throw TypeError(\"Failed to construct 'AACRecorder': 1 argument required, but only 0 present.\");\n  }\n\n  if (_typeof(init) !== \"object\") {\n    throw TypeError(\"Failed to construct 'AACRecorder': The provided value is not of type 'AACRecorderInit'\");\n  }\n\n  if (typeof init.error === \"undefined\") {\n    throw TypeError(\"Failed to construct 'AACRecorder': Failed to read the 'error' property from 'AACRecorderInit': Required member is undefined.\");\n  }\n\n  if (typeof init.error !== \"function\") {\n    throw TypeError(\"Failed to construct 'AACRecorder': Failed to read the 'error' property from 'AACRecorderInit': The given value is not a function\");\n  }\n\n  if (!init.output) {\n    throw TypeError(\"Failed to construct 'AACRecorder': Failed to read the 'output' property from 'AACRecorderInit': Required member is undefined.\");\n  }\n\n  if (typeof init.output !== \"function\") {\n    throw TypeError(\"Failed to construct 'AACRecorder': Failed to read the 'output' property from 'AACRecorderInit': The given value is not a function\");\n  }\n\n  this.init = init;\n  this.state = \"unconfigured\";\n  this.audioContext = new AudioContext();\n};\n\nAACRecorder.prototype.configure = function (config) {\n  var _this = this;\n\n  if (typeof config === \"undefined\") {\n    throw TypeError(\"Failed to execute 'configure' on 'AACRecorder': 1 argument required, but only 0 present.\");\n  }\n\n  if (_typeof(config) !== \"object\") {\n    throw TypeError(\"Failed to execute 'configure' on 'AACRecorder': The provided value is not of type 'AACRecorderConfig'\");\n  }\n\n  this.config = Object.assign({\n    bitrate: 64000,\n    encoderFrameSize: 20,\n    encoderPath: \"encoderWorker.min.js\",\n    sampleRate: 48000,\n    maxFramesPerPage: 40,\n    numberOfChannels: 1,\n    resampleQuality: 3\n  }, config);\n  return new Promise(function (resolve) {\n    var callback = function callback(_ref) {\n      var data = _ref.data;\n\n      switch (data[\"message\"]) {\n        case \"ready\":\n          _this.state = \"configured\";\n          resolve();\n          break;\n\n        case \"aac\":\n          _this.init.output(data[\"aac\"]);\n\n          break;\n\n        case \"error\":\n          _this.init.error(new Error(data[\"error\"]));\n\n        case \"done\":\n          _this.encoder.removeEventListener(\"message\", callback);\n\n          _this.reset();\n\n          break;\n      }\n    };\n\n    _this.encoder.addEventListener(\"message\", callback); // exclude encoderPath\n\n\n    var _this$config = _this.config,\n        encoderPath = _this$config.encoderPath,\n        config = _objectWithoutProperties(_this$config, _excluded);\n\n    _this.encoder.postMessage(Object.assign({\n      command: \"init\",\n      originalSampleRate: _this.audioContext.sampleRate\n    }, config));\n  });\n};\n\nAACRecorder.prototype.encode = function (audioData) {\n  if (this.encoder) {\n    var buffers = [];\n\n    for (var index = 0; index < audioData.numberOfChannels; index++) {\n      var buffer = new Float32Array(audioData.numberOfFrames);\n      audioData.copyTo(buffer, {\n        planeIndex: index,\n        frameOffset: 0,\n        frameCount: audioData.numberOfFrames,\n        format: audioData.format\n      });\n      var output = new DataView(new ArrayBuffer(audioData.numberOfFrames * 2));\n\n      for (var i = 0; i < buffer.length; i++) {\n        var s = Math.max(-1, Math.min(1, input[i]));\n        output.setInt16(i, s < 0 ? s * 0x8000 : s * 0x7fff, true);\n      }\n\n      buffers.push(output.buffer);\n    }\n\n    this.encoder.postMessage({\n      command: \"encode\",\n      buffers: buffers\n    });\n  }\n};\n\nAACRecorder.prototype.flush = function () {\n  if (this.encoder) {\n    this.encoder.postMessage({\n      command: \"flush\"\n    });\n  }\n};\n\nAACRecorder.prototype.reset = function () {\n  this.state = \"unconfigured\";\n\n  if (this.encoder) {\n    this.encoder.postMessage({\n      command: \"close\"\n    });\n  }\n};\n\nAACRecorder.prototype.close = function () {\n  this.state = \"closed\";\n\n  if (this.encoder) {\n    this.encoder.postMessage({\n      command: \"done\"\n    });\n  }\n};\n\nmodule.exports = AACRecorder;\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZW5jb2Rlci5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL0FBQ0VuY29kZXIvLi9zcmMvZW5jb2Rlci5qcz8yNjI3Il0sInNvdXJjZXNDb250ZW50IjpbInZhciBBdWRpb0NvbnRleHQgPSBnbG9iYWwuQXVkaW9Db250ZXh0IHx8IGdsb2JhbC53ZWJraXRBdWRpb0NvbnRleHQ7XG5cbi8vIENvbnN0cnVjdG9yXG52YXIgQUFDUmVjb3JkZXIgPSBmdW5jdGlvbiAoaW5pdCkge1xuICBpZiAodHlwZW9mIGluaXQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICBcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ0FBQ1JlY29yZGVyJzogMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgMCBwcmVzZW50LlwiXG4gICAgKTtcbiAgfVxuICBpZiAodHlwZW9mIGluaXQgIT09IFwib2JqZWN0XCIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICBcIkZhaWxlZCB0byBjb25zdHJ1Y3QgJ0FBQ1JlY29yZGVyJzogVGhlIHByb3ZpZGVkIHZhbHVlIGlzIG5vdCBvZiB0eXBlICdBQUNSZWNvcmRlckluaXQnXCJcbiAgICApO1xuICB9XG4gIGlmICh0eXBlb2YgaW5pdC5lcnJvciA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHRocm93IFR5cGVFcnJvcihcbiAgICAgIFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnQUFDUmVjb3JkZXInOiBGYWlsZWQgdG8gcmVhZCB0aGUgJ2Vycm9yJyBwcm9wZXJ0eSBmcm9tICdBQUNSZWNvcmRlckluaXQnOiBSZXF1aXJlZCBtZW1iZXIgaXMgdW5kZWZpbmVkLlwiXG4gICAgKTtcbiAgfVxuICBpZiAodHlwZW9mIGluaXQuZXJyb3IgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIHRocm93IFR5cGVFcnJvcihcbiAgICAgIFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnQUFDUmVjb3JkZXInOiBGYWlsZWQgdG8gcmVhZCB0aGUgJ2Vycm9yJyBwcm9wZXJ0eSBmcm9tICdBQUNSZWNvcmRlckluaXQnOiBUaGUgZ2l2ZW4gdmFsdWUgaXMgbm90IGEgZnVuY3Rpb25cIlxuICAgICk7XG4gIH1cbiAgaWYgKCFpbml0Lm91dHB1dCkge1xuICAgIHRocm93IFR5cGVFcnJvcihcbiAgICAgIFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnQUFDUmVjb3JkZXInOiBGYWlsZWQgdG8gcmVhZCB0aGUgJ291dHB1dCcgcHJvcGVydHkgZnJvbSAnQUFDUmVjb3JkZXJJbml0JzogUmVxdWlyZWQgbWVtYmVyIGlzIHVuZGVmaW5lZC5cIlxuICAgICk7XG4gIH1cbiAgaWYgKHR5cGVvZiBpbml0Lm91dHB1dCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFxuICAgICAgXCJGYWlsZWQgdG8gY29uc3RydWN0ICdBQUNSZWNvcmRlcic6IEZhaWxlZCB0byByZWFkIHRoZSAnb3V0cHV0JyBwcm9wZXJ0eSBmcm9tICdBQUNSZWNvcmRlckluaXQnOiBUaGUgZ2l2ZW4gdmFsdWUgaXMgbm90IGEgZnVuY3Rpb25cIlxuICAgICk7XG4gIH1cbiAgdGhpcy5pbml0ID0gaW5pdDtcbiAgdGhpcy5zdGF0ZSA9IFwidW5jb25maWd1cmVkXCI7XG4gIHRoaXMuYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xufTtcblxuQUFDUmVjb3JkZXIucHJvdG90eXBlLmNvbmZpZ3VyZSA9IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICBcIkZhaWxlZCB0byBleGVjdXRlICdjb25maWd1cmUnIG9uICdBQUNSZWNvcmRlcic6IDEgYXJndW1lbnQgcmVxdWlyZWQsIGJ1dCBvbmx5IDAgcHJlc2VudC5cIlxuICAgICk7XG4gIH1cbiAgaWYgKHR5cGVvZiBjb25maWcgIT09IFwib2JqZWN0XCIpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXG4gICAgICBcIkZhaWxlZCB0byBleGVjdXRlICdjb25maWd1cmUnIG9uICdBQUNSZWNvcmRlcic6IFRoZSBwcm92aWRlZCB2YWx1ZSBpcyBub3Qgb2YgdHlwZSAnQUFDUmVjb3JkZXJDb25maWcnXCJcbiAgICApO1xuICB9XG4gIHRoaXMuY29uZmlnID0gT2JqZWN0LmFzc2lnbihcbiAgICB7XG4gICAgICBiaXRyYXRlOiA2NDAwMCxcbiAgICAgIGVuY29kZXJGcmFtZVNpemU6IDIwLFxuICAgICAgZW5jb2RlclBhdGg6IFwiZW5jb2Rlcldvcmtlci5taW4uanNcIixcbiAgICAgIHNhbXBsZVJhdGU6IDQ4MDAwLFxuICAgICAgbWF4RnJhbWVzUGVyUGFnZTogNDAsXG4gICAgICBudW1iZXJPZkNoYW5uZWxzOiAxLFxuICAgICAgcmVzYW1wbGVRdWFsaXR5OiAzLFxuICAgIH0sXG4gICAgY29uZmlnXG4gICk7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgdmFyIGNhbGxiYWNrID0gKHsgZGF0YSB9KSA9PiB7XG4gICAgICBzd2l0Y2ggKGRhdGFbXCJtZXNzYWdlXCJdKSB7XG4gICAgICAgIGNhc2UgXCJyZWFkeVwiOlxuICAgICAgICAgIHRoaXMuc3RhdGUgPSBcImNvbmZpZ3VyZWRcIjtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcImFhY1wiOlxuICAgICAgICAgIHRoaXMuaW5pdC5vdXRwdXQoZGF0YVtcImFhY1wiXSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcImVycm9yXCI6XG4gICAgICAgICAgdGhpcy5pbml0LmVycm9yKG5ldyBFcnJvcihkYXRhW1wiZXJyb3JcIl0pKTtcblxuICAgICAgICBjYXNlIFwiZG9uZVwiOlxuICAgICAgICAgIHRoaXMuZW5jb2Rlci5yZW1vdmVFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBjYWxsYmFjayk7XG4gICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmVuY29kZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgY2FsbGJhY2spO1xuXG4gICAgLy8gZXhjbHVkZSBlbmNvZGVyUGF0aFxuICAgIGNvbnN0IHsgZW5jb2RlclBhdGgsIC4uLmNvbmZpZyB9ID0gdGhpcy5jb25maWc7XG5cbiAgICB0aGlzLmVuY29kZXIucG9zdE1lc3NhZ2UoXG4gICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICB7XG4gICAgICAgICAgY29tbWFuZDogXCJpbml0XCIsXG4gICAgICAgICAgb3JpZ2luYWxTYW1wbGVSYXRlOiB0aGlzLmF1ZGlvQ29udGV4dC5zYW1wbGVSYXRlLFxuICAgICAgICB9LFxuICAgICAgICBjb25maWdcbiAgICAgIClcbiAgICApO1xuICB9KTtcbn07XG5cbkFBQ1JlY29yZGVyLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbiAoYXVkaW9EYXRhKSB7XG4gIGlmICh0aGlzLmVuY29kZXIpIHtcbiAgICBjb25zdCBidWZmZXJzID0gW107XG5cbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXVkaW9EYXRhLm51bWJlck9mQ2hhbm5lbHM7IGluZGV4KyspIHtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBGbG9hdDMyQXJyYXkoYXVkaW9EYXRhLm51bWJlck9mRnJhbWVzKTtcblxuICAgICAgYXVkaW9EYXRhLmNvcHlUbyhidWZmZXIsIHtcbiAgICAgICAgcGxhbmVJbmRleDogaW5kZXgsXG4gICAgICAgIGZyYW1lT2Zmc2V0OiAwLFxuICAgICAgICBmcmFtZUNvdW50OiBhdWRpb0RhdGEubnVtYmVyT2ZGcmFtZXMsXG4gICAgICAgIGZvcm1hdDogYXVkaW9EYXRhLmZvcm1hdCxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBvdXRwdXQgPSBuZXcgRGF0YVZpZXcoXG4gICAgICAgIG5ldyBBcnJheUJ1ZmZlcihhdWRpb0RhdGEubnVtYmVyT2ZGcmFtZXMgKiAyKVxuICAgICAgKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgcyA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBpbnB1dFtpXSkpO1xuICAgICAgICBvdXRwdXQuc2V0SW50MTYoaSwgcyA8IDAgPyBzICogMHg4MDAwIDogcyAqIDB4N2ZmZiwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGJ1ZmZlcnMucHVzaChvdXRwdXQuYnVmZmVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmVuY29kZXIucG9zdE1lc3NhZ2Uoe1xuICAgICAgY29tbWFuZDogXCJlbmNvZGVcIixcbiAgICAgIGJ1ZmZlcnMsXG4gICAgfSk7XG4gIH1cbn07XG5cbkFBQ1JlY29yZGVyLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuZW5jb2Rlcikge1xuICAgIHRoaXMuZW5jb2Rlci5wb3N0TWVzc2FnZSh7IGNvbW1hbmQ6IFwiZmx1c2hcIiB9KTtcbiAgfVxufTtcblxuQUFDUmVjb3JkZXIucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnN0YXRlID0gXCJ1bmNvbmZpZ3VyZWRcIjtcblxuICBpZiAodGhpcy5lbmNvZGVyKSB7XG4gICAgdGhpcy5lbmNvZGVyLnBvc3RNZXNzYWdlKHsgY29tbWFuZDogXCJjbG9zZVwiIH0pO1xuICB9XG59O1xuXG5BQUNSZWNvcmRlci5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuc3RhdGUgPSBcImNsb3NlZFwiO1xuICBpZiAodGhpcy5lbmNvZGVyKSB7XG4gICAgdGhpcy5lbmNvZGVyLnBvc3RNZXNzYWdlKHsgY29tbWFuZDogXCJkb25lXCIgfSk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQUFDUmVjb3JkZXI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUEE7QUFZQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFoQkE7QUFrQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBRkE7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFPQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/encoder.js\n");

/***/ })

/******/ });
});