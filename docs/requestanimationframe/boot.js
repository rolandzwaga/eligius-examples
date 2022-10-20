"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __export = (target, all) => {
    for (var name2 in all)
      __defProp(target, name2, { get: all[name2], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key2 of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key2) && key2 !== except)
          __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));

  // node_modules/ts-is-present/lib/index.js
  var require_lib = __commonJS({
    "node_modules/ts-is-present/lib/index.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.hasValueAtKey = exports2.hasPresentKey = exports2.isFilled = exports2.isDefined = exports2.isPresent = void 0;
      function isPresent(t) {
        return t !== void 0 && t !== null;
      }
      exports2.isPresent = isPresent;
      function isDefined2(t) {
        return t !== void 0;
      }
      exports2.isDefined = isDefined2;
      function isFilled(t) {
        return t !== null;
      }
      exports2.isFilled = isFilled;
      function hasPresentKey(k) {
        return function(a) {
          return a[k] !== void 0 && a[k] !== null;
        };
      }
      exports2.hasPresentKey = hasPresentKey;
      function hasValueAtKey(k, v) {
        return function(a) {
          return a[k] === v;
        };
      }
      exports2.hasValueAtKey = hasValueAtKey;
    }
  });

  // node_modules/lottie-web/build/player/lottie.js
  var require_lottie = __commonJS({
    "node_modules/lottie-web/build/player/lottie.js"(exports, module) {
      typeof navigator !== "undefined" && function(root, factory2) {
        if (typeof define === "function" && define.amd) {
          define(function() {
            return factory2(root);
          });
        } else if (typeof module === "object" && module.exports) {
          module.exports = factory2(root);
        } else {
          root.lottie = factory2(root);
          root.bodymovin = root.lottie;
        }
      }(window || {}, function(window) {
        "use strict";
        var svgNS = "http://www.w3.org/2000/svg";
        var locationHref = "";
        var initialDefaultFrame = -999999;
        var _useWebWorker = false;
        var subframeEnabled = true;
        var idPrefix = "";
        var expressionsPlugin;
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        var cachedColors = {};
        var bmRnd;
        var bmPow = Math.pow;
        var bmSqrt = Math.sqrt;
        var bmFloor = Math.floor;
        var bmMax = Math.max;
        var bmMin = Math.min;
        var BMMath = {};
        (function() {
          var propertyNames = ["abs", "acos", "acosh", "asin", "asinh", "atan", "atanh", "atan2", "ceil", "cbrt", "expm1", "clz32", "cos", "cosh", "exp", "floor", "fround", "hypot", "imul", "log", "log1p", "log2", "log10", "max", "min", "pow", "random", "round", "sign", "sin", "sinh", "sqrt", "tan", "tanh", "trunc", "E", "LN10", "LN2", "LOG10E", "LOG2E", "PI", "SQRT1_2", "SQRT2"];
          var i;
          var len = propertyNames.length;
          for (i = 0; i < len; i += 1) {
            BMMath[propertyNames[i]] = Math[propertyNames[i]];
          }
        })();
        function ProjectInterface() {
          return {};
        }
        BMMath.random = Math.random;
        BMMath.abs = function(val2) {
          var tOfVal = typeof val2;
          if (tOfVal === "object" && val2.length) {
            var absArr = createSizedArray(val2.length);
            var i;
            var len = val2.length;
            for (i = 0; i < len; i += 1) {
              absArr[i] = Math.abs(val2[i]);
            }
            return absArr;
          }
          return Math.abs(val2);
        };
        var defaultCurveSegments = 150;
        var degToRads = Math.PI / 180;
        var roundCorner = 0.5519;
        function roundValues(flag) {
          if (flag) {
            bmRnd = Math.round;
          } else {
            bmRnd = function(val2) {
              return val2;
            };
          }
        }
        roundValues(false);
        function styleDiv(element) {
          element.style.position = "absolute";
          element.style.top = 0;
          element.style.left = 0;
          element.style.display = "block";
          element.style.transformOrigin = "0 0";
          element.style.webkitTransformOrigin = "0 0";
          element.style.backfaceVisibility = "visible";
          element.style.webkitBackfaceVisibility = "visible";
          element.style.transformStyle = "preserve-3d";
          element.style.webkitTransformStyle = "preserve-3d";
          element.style.mozTransformStyle = "preserve-3d";
        }
        function BMEnterFrameEvent(type, currentTime, totalTime, frameMultiplier) {
          this.type = type;
          this.currentTime = currentTime;
          this.totalTime = totalTime;
          this.direction = frameMultiplier < 0 ? -1 : 1;
        }
        function BMCompleteEvent(type, frameMultiplier) {
          this.type = type;
          this.direction = frameMultiplier < 0 ? -1 : 1;
        }
        function BMCompleteLoopEvent(type, totalLoops, currentLoop, frameMultiplier) {
          this.type = type;
          this.currentLoop = currentLoop;
          this.totalLoops = totalLoops;
          this.direction = frameMultiplier < 0 ? -1 : 1;
        }
        function BMSegmentStartEvent(type, firstFrame, totalFrames) {
          this.type = type;
          this.firstFrame = firstFrame;
          this.totalFrames = totalFrames;
        }
        function BMDestroyEvent(type, target) {
          this.type = type;
          this.target = target;
        }
        function BMRenderFrameErrorEvent(nativeError, currentTime) {
          this.type = "renderFrameError";
          this.nativeError = nativeError;
          this.currentTime = currentTime;
        }
        function BMConfigErrorEvent(nativeError) {
          this.type = "configError";
          this.nativeError = nativeError;
        }
        function BMAnimationConfigErrorEvent(type, nativeError) {
          this.type = type;
          this.nativeError = nativeError;
        }
        var createElementID = function() {
          var _count = 0;
          return function createID() {
            _count += 1;
            return idPrefix + "__lottie_element_" + _count;
          };
        }();
        function HSVtoRGB(h, s, v) {
          var r;
          var g;
          var b;
          var i;
          var f;
          var p;
          var q;
          var t;
          i = Math.floor(h * 6);
          f = h * 6 - i;
          p = v * (1 - s);
          q = v * (1 - f * s);
          t = v * (1 - (1 - f) * s);
          switch (i % 6) {
            case 0:
              r = v;
              g = t;
              b = p;
              break;
            case 1:
              r = q;
              g = v;
              b = p;
              break;
            case 2:
              r = p;
              g = v;
              b = t;
              break;
            case 3:
              r = p;
              g = q;
              b = v;
              break;
            case 4:
              r = t;
              g = p;
              b = v;
              break;
            case 5:
              r = v;
              g = p;
              b = q;
              break;
            default:
              break;
          }
          return [
            r,
            g,
            b
          ];
        }
        function RGBtoHSV(r, g, b) {
          var max = Math.max(r, g, b);
          var min = Math.min(r, g, b);
          var d = max - min;
          var h;
          var s = max === 0 ? 0 : d / max;
          var v = max / 255;
          switch (max) {
            case min:
              h = 0;
              break;
            case r:
              h = g - b + d * (g < b ? 6 : 0);
              h /= 6 * d;
              break;
            case g:
              h = b - r + d * 2;
              h /= 6 * d;
              break;
            case b:
              h = r - g + d * 4;
              h /= 6 * d;
              break;
            default:
              break;
          }
          return [
            h,
            s,
            v
          ];
        }
        function addSaturationToRGB(color, offset) {
          var hsv = RGBtoHSV(color[0] * 255, color[1] * 255, color[2] * 255);
          hsv[1] += offset;
          if (hsv[1] > 1) {
            hsv[1] = 1;
          } else if (hsv[1] <= 0) {
            hsv[1] = 0;
          }
          return HSVtoRGB(hsv[0], hsv[1], hsv[2]);
        }
        function addBrightnessToRGB(color, offset) {
          var hsv = RGBtoHSV(color[0] * 255, color[1] * 255, color[2] * 255);
          hsv[2] += offset;
          if (hsv[2] > 1) {
            hsv[2] = 1;
          } else if (hsv[2] < 0) {
            hsv[2] = 0;
          }
          return HSVtoRGB(hsv[0], hsv[1], hsv[2]);
        }
        function addHueToRGB(color, offset) {
          var hsv = RGBtoHSV(color[0] * 255, color[1] * 255, color[2] * 255);
          hsv[0] += offset / 360;
          if (hsv[0] > 1) {
            hsv[0] -= 1;
          } else if (hsv[0] < 0) {
            hsv[0] += 1;
          }
          return HSVtoRGB(hsv[0], hsv[1], hsv[2]);
        }
        var rgbToHex = function() {
          var colorMap = [];
          var i;
          var hex;
          for (i = 0; i < 256; i += 1) {
            hex = i.toString(16);
            colorMap[i] = hex.length === 1 ? "0" + hex : hex;
          }
          return function(r, g, b) {
            if (r < 0) {
              r = 0;
            }
            if (g < 0) {
              g = 0;
            }
            if (b < 0) {
              b = 0;
            }
            return "#" + colorMap[r] + colorMap[g] + colorMap[b];
          };
        }();
        function BaseEvent() {
        }
        BaseEvent.prototype = {
          triggerEvent: function(eventName, args) {
            if (this._cbs[eventName]) {
              var callbacks = this._cbs[eventName];
              for (var i = 0; i < callbacks.length; i += 1) {
                callbacks[i](args);
              }
            }
          },
          addEventListener: function(eventName, callback) {
            if (!this._cbs[eventName]) {
              this._cbs[eventName] = [];
            }
            this._cbs[eventName].push(callback);
            return function() {
              this.removeEventListener(eventName, callback);
            }.bind(this);
          },
          removeEventListener: function(eventName, callback) {
            if (!callback) {
              this._cbs[eventName] = null;
            } else if (this._cbs[eventName]) {
              var i = 0;
              var len = this._cbs[eventName].length;
              while (i < len) {
                if (this._cbs[eventName][i] === callback) {
                  this._cbs[eventName].splice(i, 1);
                  i -= 1;
                  len -= 1;
                }
                i += 1;
              }
              if (!this._cbs[eventName].length) {
                this._cbs[eventName] = null;
              }
            }
          }
        };
        var createTypedArray = function() {
          function createRegularArray(type, len) {
            var i = 0;
            var arr = [];
            var value2;
            switch (type) {
              case "int16":
              case "uint8c":
                value2 = 1;
                break;
              default:
                value2 = 1.1;
                break;
            }
            for (i = 0; i < len; i += 1) {
              arr.push(value2);
            }
            return arr;
          }
          function createTypedArrayFactory(type, len) {
            if (type === "float32") {
              return new Float32Array(len);
            }
            if (type === "int16") {
              return new Int16Array(len);
            }
            if (type === "uint8c") {
              return new Uint8ClampedArray(len);
            }
            return createRegularArray(type, len);
          }
          if (typeof Uint8ClampedArray === "function" && typeof Float32Array === "function") {
            return createTypedArrayFactory;
          }
          return createRegularArray;
        }();
        function createSizedArray(len) {
          return Array.apply(null, { length: len });
        }
        function createNS(type) {
          return document.createElementNS(svgNS, type);
        }
        function createTag(type) {
          return document.createElement(type);
        }
        function DynamicPropertyContainer() {
        }
        DynamicPropertyContainer.prototype = {
          addDynamicProperty: function(prop) {
            if (this.dynamicProperties.indexOf(prop) === -1) {
              this.dynamicProperties.push(prop);
              this.container.addDynamicProperty(this);
              this._isAnimated = true;
            }
          },
          iterateDynamicProperties: function() {
            this._mdf = false;
            var i;
            var len = this.dynamicProperties.length;
            for (i = 0; i < len; i += 1) {
              this.dynamicProperties[i].getValue();
              if (this.dynamicProperties[i]._mdf) {
                this._mdf = true;
              }
            }
          },
          initDynamicPropertyContainer: function(container) {
            this.container = container;
            this.dynamicProperties = [];
            this._mdf = false;
            this._isAnimated = false;
          }
        };
        var getBlendMode = function() {
          var blendModeEnums = {
            0: "source-over",
            1: "multiply",
            2: "screen",
            3: "overlay",
            4: "darken",
            5: "lighten",
            6: "color-dodge",
            7: "color-burn",
            8: "hard-light",
            9: "soft-light",
            10: "difference",
            11: "exclusion",
            12: "hue",
            13: "saturation",
            14: "color",
            15: "luminosity"
          };
          return function(mode) {
            return blendModeEnums[mode] || "";
          };
        }();
        var lineCapEnum = {
          1: "butt",
          2: "round",
          3: "square"
        };
        var lineJoinEnum = {
          1: "miter",
          2: "round",
          3: "bevel"
        };
        var Matrix = function() {
          var _cos = Math.cos;
          var _sin = Math.sin;
          var _tan = Math.tan;
          var _rnd = Math.round;
          function reset() {
            this.props[0] = 1;
            this.props[1] = 0;
            this.props[2] = 0;
            this.props[3] = 0;
            this.props[4] = 0;
            this.props[5] = 1;
            this.props[6] = 0;
            this.props[7] = 0;
            this.props[8] = 0;
            this.props[9] = 0;
            this.props[10] = 1;
            this.props[11] = 0;
            this.props[12] = 0;
            this.props[13] = 0;
            this.props[14] = 0;
            this.props[15] = 1;
            return this;
          }
          function rotate(angle) {
            if (angle === 0) {
              return this;
            }
            var mCos = _cos(angle);
            var mSin = _sin(angle);
            return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          }
          function rotateX(angle) {
            if (angle === 0) {
              return this;
            }
            var mCos = _cos(angle);
            var mSin = _sin(angle);
            return this._t(1, 0, 0, 0, 0, mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1);
          }
          function rotateY(angle) {
            if (angle === 0) {
              return this;
            }
            var mCos = _cos(angle);
            var mSin = _sin(angle);
            return this._t(mCos, 0, mSin, 0, 0, 1, 0, 0, -mSin, 0, mCos, 0, 0, 0, 0, 1);
          }
          function rotateZ(angle) {
            if (angle === 0) {
              return this;
            }
            var mCos = _cos(angle);
            var mSin = _sin(angle);
            return this._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          }
          function shear(sx, sy) {
            return this._t(1, sy, sx, 1, 0, 0);
          }
          function skew(ax, ay) {
            return this.shear(_tan(ax), _tan(ay));
          }
          function skewFromAxis(ax, angle) {
            var mCos = _cos(angle);
            var mSin = _sin(angle);
            return this._t(mCos, mSin, 0, 0, -mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(1, 0, 0, 0, _tan(ax), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)._t(mCos, -mSin, 0, 0, mSin, mCos, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
          }
          function scale2(sx, sy, sz) {
            if (!sz && sz !== 0) {
              sz = 1;
            }
            if (sx === 1 && sy === 1 && sz === 1) {
              return this;
            }
            return this._t(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);
          }
          function setTransform(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
            this.props[0] = a;
            this.props[1] = b;
            this.props[2] = c;
            this.props[3] = d;
            this.props[4] = e;
            this.props[5] = f;
            this.props[6] = g;
            this.props[7] = h;
            this.props[8] = i;
            this.props[9] = j;
            this.props[10] = k;
            this.props[11] = l;
            this.props[12] = m;
            this.props[13] = n;
            this.props[14] = o;
            this.props[15] = p;
            return this;
          }
          function translate(tx, ty, tz) {
            tz = tz || 0;
            if (tx !== 0 || ty !== 0 || tz !== 0) {
              return this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1);
            }
            return this;
          }
          function transform2(a2, b2, c2, d2, e2, f2, g2, h2, i2, j2, k2, l2, m2, n2, o2, p2) {
            var _p = this.props;
            if (a2 === 1 && b2 === 0 && c2 === 0 && d2 === 0 && e2 === 0 && f2 === 1 && g2 === 0 && h2 === 0 && i2 === 0 && j2 === 0 && k2 === 1 && l2 === 0) {
              _p[12] = _p[12] * a2 + _p[15] * m2;
              _p[13] = _p[13] * f2 + _p[15] * n2;
              _p[14] = _p[14] * k2 + _p[15] * o2;
              _p[15] *= p2;
              this._identityCalculated = false;
              return this;
            }
            var a1 = _p[0];
            var b1 = _p[1];
            var c1 = _p[2];
            var d1 = _p[3];
            var e1 = _p[4];
            var f1 = _p[5];
            var g1 = _p[6];
            var h1 = _p[7];
            var i1 = _p[8];
            var j1 = _p[9];
            var k1 = _p[10];
            var l1 = _p[11];
            var m1 = _p[12];
            var n1 = _p[13];
            var o1 = _p[14];
            var p1 = _p[15];
            _p[0] = a1 * a2 + b1 * e2 + c1 * i2 + d1 * m2;
            _p[1] = a1 * b2 + b1 * f2 + c1 * j2 + d1 * n2;
            _p[2] = a1 * c2 + b1 * g2 + c1 * k2 + d1 * o2;
            _p[3] = a1 * d2 + b1 * h2 + c1 * l2 + d1 * p2;
            _p[4] = e1 * a2 + f1 * e2 + g1 * i2 + h1 * m2;
            _p[5] = e1 * b2 + f1 * f2 + g1 * j2 + h1 * n2;
            _p[6] = e1 * c2 + f1 * g2 + g1 * k2 + h1 * o2;
            _p[7] = e1 * d2 + f1 * h2 + g1 * l2 + h1 * p2;
            _p[8] = i1 * a2 + j1 * e2 + k1 * i2 + l1 * m2;
            _p[9] = i1 * b2 + j1 * f2 + k1 * j2 + l1 * n2;
            _p[10] = i1 * c2 + j1 * g2 + k1 * k2 + l1 * o2;
            _p[11] = i1 * d2 + j1 * h2 + k1 * l2 + l1 * p2;
            _p[12] = m1 * a2 + n1 * e2 + o1 * i2 + p1 * m2;
            _p[13] = m1 * b2 + n1 * f2 + o1 * j2 + p1 * n2;
            _p[14] = m1 * c2 + n1 * g2 + o1 * k2 + p1 * o2;
            _p[15] = m1 * d2 + n1 * h2 + o1 * l2 + p1 * p2;
            this._identityCalculated = false;
            return this;
          }
          function isIdentity() {
            if (!this._identityCalculated) {
              this._identity = !(this.props[0] !== 1 || this.props[1] !== 0 || this.props[2] !== 0 || this.props[3] !== 0 || this.props[4] !== 0 || this.props[5] !== 1 || this.props[6] !== 0 || this.props[7] !== 0 || this.props[8] !== 0 || this.props[9] !== 0 || this.props[10] !== 1 || this.props[11] !== 0 || this.props[12] !== 0 || this.props[13] !== 0 || this.props[14] !== 0 || this.props[15] !== 1);
              this._identityCalculated = true;
            }
            return this._identity;
          }
          function equals(matr) {
            var i = 0;
            while (i < 16) {
              if (matr.props[i] !== this.props[i]) {
                return false;
              }
              i += 1;
            }
            return true;
          }
          function clone(matr) {
            var i;
            for (i = 0; i < 16; i += 1) {
              matr.props[i] = this.props[i];
            }
            return matr;
          }
          function cloneFromProps(props) {
            var i;
            for (i = 0; i < 16; i += 1) {
              this.props[i] = props[i];
            }
          }
          function applyToPoint(x, y, z) {
            return {
              x: x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12],
              y: x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13],
              z: x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]
            };
          }
          function applyToX(x, y, z) {
            return x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12];
          }
          function applyToY(x, y, z) {
            return x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13];
          }
          function applyToZ(x, y, z) {
            return x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14];
          }
          function getInverseMatrix() {
            var determinant = this.props[0] * this.props[5] - this.props[1] * this.props[4];
            var a = this.props[5] / determinant;
            var b = -this.props[1] / determinant;
            var c = -this.props[4] / determinant;
            var d = this.props[0] / determinant;
            var e = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / determinant;
            var f = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / determinant;
            var inverseMatrix = new Matrix();
            inverseMatrix.props[0] = a;
            inverseMatrix.props[1] = b;
            inverseMatrix.props[4] = c;
            inverseMatrix.props[5] = d;
            inverseMatrix.props[12] = e;
            inverseMatrix.props[13] = f;
            return inverseMatrix;
          }
          function inversePoint(pt) {
            var inverseMatrix = this.getInverseMatrix();
            return inverseMatrix.applyToPointArray(pt[0], pt[1], pt[2] || 0);
          }
          function inversePoints(pts) {
            var i;
            var len = pts.length;
            var retPts = [];
            for (i = 0; i < len; i += 1) {
              retPts[i] = inversePoint(pts[i]);
            }
            return retPts;
          }
          function applyToTriplePoints(pt1, pt2, pt3) {
            var arr = createTypedArray("float32", 6);
            if (this.isIdentity()) {
              arr[0] = pt1[0];
              arr[1] = pt1[1];
              arr[2] = pt2[0];
              arr[3] = pt2[1];
              arr[4] = pt3[0];
              arr[5] = pt3[1];
            } else {
              var p0 = this.props[0];
              var p1 = this.props[1];
              var p4 = this.props[4];
              var p5 = this.props[5];
              var p12 = this.props[12];
              var p13 = this.props[13];
              arr[0] = pt1[0] * p0 + pt1[1] * p4 + p12;
              arr[1] = pt1[0] * p1 + pt1[1] * p5 + p13;
              arr[2] = pt2[0] * p0 + pt2[1] * p4 + p12;
              arr[3] = pt2[0] * p1 + pt2[1] * p5 + p13;
              arr[4] = pt3[0] * p0 + pt3[1] * p4 + p12;
              arr[5] = pt3[0] * p1 + pt3[1] * p5 + p13;
            }
            return arr;
          }
          function applyToPointArray(x, y, z) {
            var arr;
            if (this.isIdentity()) {
              arr = [x, y, z];
            } else {
              arr = [
                x * this.props[0] + y * this.props[4] + z * this.props[8] + this.props[12],
                x * this.props[1] + y * this.props[5] + z * this.props[9] + this.props[13],
                x * this.props[2] + y * this.props[6] + z * this.props[10] + this.props[14]
              ];
            }
            return arr;
          }
          function applyToPointStringified(x, y) {
            if (this.isIdentity()) {
              return x + "," + y;
            }
            var _p = this.props;
            return Math.round((x * _p[0] + y * _p[4] + _p[12]) * 100) / 100 + "," + Math.round((x * _p[1] + y * _p[5] + _p[13]) * 100) / 100;
          }
          function toCSS() {
            var i = 0;
            var props = this.props;
            var cssValue = "matrix3d(";
            var v = 1e4;
            while (i < 16) {
              cssValue += _rnd(props[i] * v) / v;
              cssValue += i === 15 ? ")" : ",";
              i += 1;
            }
            return cssValue;
          }
          function roundMatrixProperty(val2) {
            var v = 1e4;
            if (val2 < 1e-6 && val2 > 0 || val2 > -1e-6 && val2 < 0) {
              return _rnd(val2 * v) / v;
            }
            return val2;
          }
          function to2dCSS() {
            var props = this.props;
            var _a = roundMatrixProperty(props[0]);
            var _b = roundMatrixProperty(props[1]);
            var _c = roundMatrixProperty(props[4]);
            var _d = roundMatrixProperty(props[5]);
            var _e = roundMatrixProperty(props[12]);
            var _f = roundMatrixProperty(props[13]);
            return "matrix(" + _a + "," + _b + "," + _c + "," + _d + "," + _e + "," + _f + ")";
          }
          return function() {
            this.reset = reset;
            this.rotate = rotate;
            this.rotateX = rotateX;
            this.rotateY = rotateY;
            this.rotateZ = rotateZ;
            this.skew = skew;
            this.skewFromAxis = skewFromAxis;
            this.shear = shear;
            this.scale = scale2;
            this.setTransform = setTransform;
            this.translate = translate;
            this.transform = transform2;
            this.applyToPoint = applyToPoint;
            this.applyToX = applyToX;
            this.applyToY = applyToY;
            this.applyToZ = applyToZ;
            this.applyToPointArray = applyToPointArray;
            this.applyToTriplePoints = applyToTriplePoints;
            this.applyToPointStringified = applyToPointStringified;
            this.toCSS = toCSS;
            this.to2dCSS = to2dCSS;
            this.clone = clone;
            this.cloneFromProps = cloneFromProps;
            this.equals = equals;
            this.inversePoints = inversePoints;
            this.inversePoint = inversePoint;
            this.getInverseMatrix = getInverseMatrix;
            this._t = this.transform;
            this.isIdentity = isIdentity;
            this._identity = true;
            this._identityCalculated = false;
            this.props = createTypedArray("float32", 16);
            this.reset();
          };
        }();
        (function(pool, math) {
          var global = this, width2 = 256, chunks = 6, digits = 52, rngname = "random", startdenom = math.pow(width2, chunks), significance = math.pow(2, digits), overflow = significance * 2, mask2 = width2 - 1, nodecrypto;
          function seedrandom(seed, options, callback) {
            var key2 = [];
            options = options === true ? { entropy: true } : options || {};
            var shortseed = mixkey(flatten(
              options.entropy ? [seed, tostring(pool)] : seed === null ? autoseed() : seed,
              3
            ), key2);
            var arc4 = new ARC4(key2);
            var prng = function() {
              var n = arc4.g(chunks), d = startdenom, x = 0;
              while (n < significance) {
                n = (n + x) * width2;
                d *= width2;
                x = arc4.g(1);
              }
              while (n >= overflow) {
                n /= 2;
                d /= 2;
                x >>>= 1;
              }
              return (n + x) / d;
            };
            prng.int32 = function() {
              return arc4.g(4) | 0;
            };
            prng.quick = function() {
              return arc4.g(4) / 4294967296;
            };
            prng.double = prng;
            mixkey(tostring(arc4.S), pool);
            return (options.pass || callback || function(prng2, seed2, is_math_call, state) {
              if (state) {
                if (state.S) {
                  copy(state, arc4);
                }
                prng2.state = function() {
                  return copy(arc4, {});
                };
              }
              if (is_math_call) {
                math[rngname] = prng2;
                return seed2;
              } else
                return prng2;
            })(
              prng,
              shortseed,
              "global" in options ? options.global : this == math,
              options.state
            );
          }
          math["seed" + rngname] = seedrandom;
          function ARC4(key2) {
            var t, keylen = key2.length, me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];
            if (!keylen) {
              key2 = [keylen++];
            }
            while (i < width2) {
              s[i] = i++;
            }
            for (i = 0; i < width2; i++) {
              s[i] = s[j = mask2 & j + key2[i % keylen] + (t = s[i])];
              s[j] = t;
            }
            me.g = function(count) {
              var t2, r = 0, i2 = me.i, j2 = me.j, s2 = me.S;
              while (count--) {
                t2 = s2[i2 = mask2 & i2 + 1];
                r = r * width2 + s2[mask2 & (s2[i2] = s2[j2 = mask2 & j2 + t2]) + (s2[j2] = t2)];
              }
              me.i = i2;
              me.j = j2;
              return r;
            };
          }
          function copy(f, t) {
            t.i = f.i;
            t.j = f.j;
            t.S = f.S.slice();
            return t;
          }
          function flatten(obj, depth) {
            var result = [], typ = typeof obj, prop;
            if (depth && typ == "object") {
              for (prop in obj) {
                try {
                  result.push(flatten(obj[prop], depth - 1));
                } catch (e) {
                }
              }
            }
            return result.length ? result : typ == "string" ? obj : obj + "\0";
          }
          function mixkey(seed, key2) {
            var stringseed = seed + "", smear, j = 0;
            while (j < stringseed.length) {
              key2[mask2 & j] = mask2 & (smear ^= key2[mask2 & j] * 19) + stringseed.charCodeAt(j++);
            }
            return tostring(key2);
          }
          function autoseed() {
            try {
              if (nodecrypto) {
                return tostring(nodecrypto.randomBytes(width2));
              }
              var out = new Uint8Array(width2);
              (global.crypto || global.msCrypto).getRandomValues(out);
              return tostring(out);
            } catch (e) {
              var browser = global.navigator, plugins = browser && browser.plugins;
              return [+new Date(), global, plugins, global.screen, tostring(pool)];
            }
          }
          function tostring(a) {
            return String.fromCharCode.apply(0, a);
          }
          mixkey(math.random(), pool);
        })(
          [],
          BMMath
        );
        var BezierFactory = function() {
          var ob2 = {};
          ob2.getBezierEasing = getBezierEasing;
          var beziers = {};
          function getBezierEasing(a, b, c, d, nm) {
            var str = nm || ("bez_" + a + "_" + b + "_" + c + "_" + d).replace(/\./g, "p");
            if (beziers[str]) {
              return beziers[str];
            }
            var bezEasing = new BezierEasing([a, b, c, d]);
            beziers[str] = bezEasing;
            return bezEasing;
          }
          var NEWTON_ITERATIONS = 4;
          var NEWTON_MIN_SLOPE = 1e-3;
          var SUBDIVISION_PRECISION = 1e-7;
          var SUBDIVISION_MAX_ITERATIONS = 10;
          var kSplineTableSize = 11;
          var kSampleStepSize = 1 / (kSplineTableSize - 1);
          var float32ArraySupported = typeof Float32Array === "function";
          function A(aA1, aA2) {
            return 1 - 3 * aA2 + 3 * aA1;
          }
          function B(aA1, aA2) {
            return 3 * aA2 - 6 * aA1;
          }
          function C(aA1) {
            return 3 * aA1;
          }
          function calcBezier(aT, aA1, aA2) {
            return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
          }
          function getSlope(aT, aA1, aA2) {
            return 3 * A(aA1, aA2) * aT * aT + 2 * B(aA1, aA2) * aT + C(aA1);
          }
          function binarySubdivide(aX, aA, aB, mX1, mX2) {
            var currentX, currentT, i = 0;
            do {
              currentT = aA + (aB - aA) / 2;
              currentX = calcBezier(currentT, mX1, mX2) - aX;
              if (currentX > 0) {
                aB = currentT;
              } else {
                aA = currentT;
              }
            } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
            return currentT;
          }
          function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
            for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
              var currentSlope = getSlope(aGuessT, mX1, mX2);
              if (currentSlope === 0)
                return aGuessT;
              var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
              aGuessT -= currentX / currentSlope;
            }
            return aGuessT;
          }
          function BezierEasing(points) {
            this._p = points;
            this._mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
            this._precomputed = false;
            this.get = this.get.bind(this);
          }
          BezierEasing.prototype = {
            get: function(x) {
              var mX1 = this._p[0], mY1 = this._p[1], mX2 = this._p[2], mY2 = this._p[3];
              if (!this._precomputed)
                this._precompute();
              if (mX1 === mY1 && mX2 === mY2)
                return x;
              if (x === 0)
                return 0;
              if (x === 1)
                return 1;
              return calcBezier(this._getTForX(x), mY1, mY2);
            },
            _precompute: function() {
              var mX1 = this._p[0], mY1 = this._p[1], mX2 = this._p[2], mY2 = this._p[3];
              this._precomputed = true;
              if (mX1 !== mY1 || mX2 !== mY2) {
                this._calcSampleValues();
              }
            },
            _calcSampleValues: function() {
              var mX1 = this._p[0], mX2 = this._p[2];
              for (var i = 0; i < kSplineTableSize; ++i) {
                this._mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
              }
            },
            _getTForX: function(aX) {
              var mX1 = this._p[0], mX2 = this._p[2], mSampleValues = this._mSampleValues;
              var intervalStart = 0;
              var currentSample = 1;
              var lastSample = kSplineTableSize - 1;
              for (; currentSample !== lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
                intervalStart += kSampleStepSize;
              }
              --currentSample;
              var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]);
              var guessForT = intervalStart + dist * kSampleStepSize;
              var initialSlope = getSlope(guessForT, mX1, mX2);
              if (initialSlope >= NEWTON_MIN_SLOPE) {
                return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
              }
              if (initialSlope === 0) {
                return guessForT;
              }
              return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
            }
          };
          return ob2;
        }();
        (function() {
          var lastTime = 0;
          var vendors = ["ms", "moz", "webkit", "o"];
          for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
            window.cancelAnimationFrame = window[vendors[x] + "CancelAnimationFrame"] || window[vendors[x] + "CancelRequestAnimationFrame"];
          }
          if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id2 = setTimeout(
                function() {
                  callback(currTime + timeToCall);
                },
                timeToCall
              );
              lastTime = currTime + timeToCall;
              return id2;
            };
          }
          if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id2) {
              clearTimeout(id2);
            };
          }
        })();
        function extendPrototype(sources, destination) {
          var i;
          var len = sources.length;
          var sourcePrototype;
          for (i = 0; i < len; i += 1) {
            sourcePrototype = sources[i].prototype;
            for (var attr in sourcePrototype) {
              if (Object.prototype.hasOwnProperty.call(sourcePrototype, attr))
                destination.prototype[attr] = sourcePrototype[attr];
            }
          }
        }
        function getDescriptor(object, prop) {
          return Object.getOwnPropertyDescriptor(object, prop);
        }
        function createProxyFunction(prototype) {
          function ProxyFunction() {
          }
          ProxyFunction.prototype = prototype;
          return ProxyFunction;
        }
        function bezFunction() {
          var math = Math;
          function pointOnLine2D(x1, y1, x2, y2, x3, y3) {
            var det1 = x1 * y2 + y1 * x3 + x2 * y3 - x3 * y2 - y3 * x1 - x2 * y1;
            return det1 > -1e-3 && det1 < 1e-3;
          }
          function pointOnLine3D(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
            if (z1 === 0 && z2 === 0 && z3 === 0) {
              return pointOnLine2D(x1, y1, x2, y2, x3, y3);
            }
            var dist1 = math.sqrt(math.pow(x2 - x1, 2) + math.pow(y2 - y1, 2) + math.pow(z2 - z1, 2));
            var dist2 = math.sqrt(math.pow(x3 - x1, 2) + math.pow(y3 - y1, 2) + math.pow(z3 - z1, 2));
            var dist3 = math.sqrt(math.pow(x3 - x2, 2) + math.pow(y3 - y2, 2) + math.pow(z3 - z2, 2));
            var diffDist;
            if (dist1 > dist2) {
              if (dist1 > dist3) {
                diffDist = dist1 - dist2 - dist3;
              } else {
                diffDist = dist3 - dist2 - dist1;
              }
            } else if (dist3 > dist2) {
              diffDist = dist3 - dist2 - dist1;
            } else {
              diffDist = dist2 - dist1 - dist3;
            }
            return diffDist > -1e-4 && diffDist < 1e-4;
          }
          var getBezierLength = function() {
            return function(pt1, pt2, pt3, pt4) {
              var curveSegments = defaultCurveSegments;
              var k;
              var i;
              var len;
              var ptCoord;
              var perc;
              var addedLength = 0;
              var ptDistance;
              var point = [];
              var lastPoint = [];
              var lengthData = bezierLengthPool.newElement();
              len = pt3.length;
              for (k = 0; k < curveSegments; k += 1) {
                perc = k / (curveSegments - 1);
                ptDistance = 0;
                for (i = 0; i < len; i += 1) {
                  ptCoord = bmPow(1 - perc, 3) * pt1[i] + 3 * bmPow(1 - perc, 2) * perc * pt3[i] + 3 * (1 - perc) * bmPow(perc, 2) * pt4[i] + bmPow(perc, 3) * pt2[i];
                  point[i] = ptCoord;
                  if (lastPoint[i] !== null) {
                    ptDistance += bmPow(point[i] - lastPoint[i], 2);
                  }
                  lastPoint[i] = point[i];
                }
                if (ptDistance) {
                  ptDistance = bmSqrt(ptDistance);
                  addedLength += ptDistance;
                }
                lengthData.percents[k] = perc;
                lengthData.lengths[k] = addedLength;
              }
              lengthData.addedLength = addedLength;
              return lengthData;
            };
          }();
          function getSegmentsLength(shapeData) {
            var segmentsLength = segmentsLengthPool.newElement();
            var closed = shapeData.c;
            var pathV = shapeData.v;
            var pathO = shapeData.o;
            var pathI = shapeData.i;
            var i;
            var len = shapeData._length;
            var lengths = segmentsLength.lengths;
            var totalLength = 0;
            for (i = 0; i < len - 1; i += 1) {
              lengths[i] = getBezierLength(pathV[i], pathV[i + 1], pathO[i], pathI[i + 1]);
              totalLength += lengths[i].addedLength;
            }
            if (closed && len) {
              lengths[i] = getBezierLength(pathV[i], pathV[0], pathO[i], pathI[0]);
              totalLength += lengths[i].addedLength;
            }
            segmentsLength.totalLength = totalLength;
            return segmentsLength;
          }
          function BezierData(length2) {
            this.segmentLength = 0;
            this.points = new Array(length2);
          }
          function PointData(partial, point) {
            this.partialLength = partial;
            this.point = point;
          }
          var buildBezierData = function() {
            var storedData = {};
            return function(pt1, pt2, pt3, pt4) {
              var bezierName = (pt1[0] + "_" + pt1[1] + "_" + pt2[0] + "_" + pt2[1] + "_" + pt3[0] + "_" + pt3[1] + "_" + pt4[0] + "_" + pt4[1]).replace(/\./g, "p");
              if (!storedData[bezierName]) {
                var curveSegments = defaultCurveSegments;
                var k;
                var i;
                var len;
                var ptCoord;
                var perc;
                var addedLength = 0;
                var ptDistance;
                var point;
                var lastPoint = null;
                if (pt1.length === 2 && (pt1[0] !== pt2[0] || pt1[1] !== pt2[1]) && pointOnLine2D(pt1[0], pt1[1], pt2[0], pt2[1], pt1[0] + pt3[0], pt1[1] + pt3[1]) && pointOnLine2D(pt1[0], pt1[1], pt2[0], pt2[1], pt2[0] + pt4[0], pt2[1] + pt4[1])) {
                  curveSegments = 2;
                }
                var bezierData = new BezierData(curveSegments);
                len = pt3.length;
                for (k = 0; k < curveSegments; k += 1) {
                  point = createSizedArray(len);
                  perc = k / (curveSegments - 1);
                  ptDistance = 0;
                  for (i = 0; i < len; i += 1) {
                    ptCoord = bmPow(1 - perc, 3) * pt1[i] + 3 * bmPow(1 - perc, 2) * perc * (pt1[i] + pt3[i]) + 3 * (1 - perc) * bmPow(perc, 2) * (pt2[i] + pt4[i]) + bmPow(perc, 3) * pt2[i];
                    point[i] = ptCoord;
                    if (lastPoint !== null) {
                      ptDistance += bmPow(point[i] - lastPoint[i], 2);
                    }
                  }
                  ptDistance = bmSqrt(ptDistance);
                  addedLength += ptDistance;
                  bezierData.points[k] = new PointData(ptDistance, point);
                  lastPoint = point;
                }
                bezierData.segmentLength = addedLength;
                storedData[bezierName] = bezierData;
              }
              return storedData[bezierName];
            };
          }();
          function getDistancePerc(perc, bezierData) {
            var percents = bezierData.percents;
            var lengths = bezierData.lengths;
            var len = percents.length;
            var initPos = bmFloor((len - 1) * perc);
            var lengthPos = perc * bezierData.addedLength;
            var lPerc = 0;
            if (initPos === len - 1 || initPos === 0 || lengthPos === lengths[initPos]) {
              return percents[initPos];
            }
            var dir = lengths[initPos] > lengthPos ? -1 : 1;
            var flag = true;
            while (flag) {
              if (lengths[initPos] <= lengthPos && lengths[initPos + 1] > lengthPos) {
                lPerc = (lengthPos - lengths[initPos]) / (lengths[initPos + 1] - lengths[initPos]);
                flag = false;
              } else {
                initPos += dir;
              }
              if (initPos < 0 || initPos >= len - 1) {
                if (initPos === len - 1) {
                  return percents[initPos];
                }
                flag = false;
              }
            }
            return percents[initPos] + (percents[initPos + 1] - percents[initPos]) * lPerc;
          }
          function getPointInSegment(pt1, pt2, pt3, pt4, percent, bezierData) {
            var t1 = getDistancePerc(percent, bezierData);
            var u1 = 1 - t1;
            var ptX = math.round((u1 * u1 * u1 * pt1[0] + (t1 * u1 * u1 + u1 * t1 * u1 + u1 * u1 * t1) * pt3[0] + (t1 * t1 * u1 + u1 * t1 * t1 + t1 * u1 * t1) * pt4[0] + t1 * t1 * t1 * pt2[0]) * 1e3) / 1e3;
            var ptY = math.round((u1 * u1 * u1 * pt1[1] + (t1 * u1 * u1 + u1 * t1 * u1 + u1 * u1 * t1) * pt3[1] + (t1 * t1 * u1 + u1 * t1 * t1 + t1 * u1 * t1) * pt4[1] + t1 * t1 * t1 * pt2[1]) * 1e3) / 1e3;
            return [ptX, ptY];
          }
          var bezierSegmentPoints = createTypedArray("float32", 8);
          function getNewSegment(pt1, pt2, pt3, pt4, startPerc, endPerc, bezierData) {
            if (startPerc < 0) {
              startPerc = 0;
            } else if (startPerc > 1) {
              startPerc = 1;
            }
            var t0 = getDistancePerc(startPerc, bezierData);
            endPerc = endPerc > 1 ? 1 : endPerc;
            var t1 = getDistancePerc(endPerc, bezierData);
            var i;
            var len = pt1.length;
            var u0 = 1 - t0;
            var u1 = 1 - t1;
            var u0u0u0 = u0 * u0 * u0;
            var t0u0u0_3 = t0 * u0 * u0 * 3;
            var t0t0u0_3 = t0 * t0 * u0 * 3;
            var t0t0t0 = t0 * t0 * t0;
            var u0u0u1 = u0 * u0 * u1;
            var t0u0u1_3 = t0 * u0 * u1 + u0 * t0 * u1 + u0 * u0 * t1;
            var t0t0u1_3 = t0 * t0 * u1 + u0 * t0 * t1 + t0 * u0 * t1;
            var t0t0t1 = t0 * t0 * t1;
            var u0u1u1 = u0 * u1 * u1;
            var t0u1u1_3 = t0 * u1 * u1 + u0 * t1 * u1 + u0 * u1 * t1;
            var t0t1u1_3 = t0 * t1 * u1 + u0 * t1 * t1 + t0 * u1 * t1;
            var t0t1t1 = t0 * t1 * t1;
            var u1u1u1 = u1 * u1 * u1;
            var t1u1u1_3 = t1 * u1 * u1 + u1 * t1 * u1 + u1 * u1 * t1;
            var t1t1u1_3 = t1 * t1 * u1 + u1 * t1 * t1 + t1 * u1 * t1;
            var t1t1t1 = t1 * t1 * t1;
            for (i = 0; i < len; i += 1) {
              bezierSegmentPoints[i * 4] = math.round((u0u0u0 * pt1[i] + t0u0u0_3 * pt3[i] + t0t0u0_3 * pt4[i] + t0t0t0 * pt2[i]) * 1e3) / 1e3;
              bezierSegmentPoints[i * 4 + 1] = math.round((u0u0u1 * pt1[i] + t0u0u1_3 * pt3[i] + t0t0u1_3 * pt4[i] + t0t0t1 * pt2[i]) * 1e3) / 1e3;
              bezierSegmentPoints[i * 4 + 2] = math.round((u0u1u1 * pt1[i] + t0u1u1_3 * pt3[i] + t0t1u1_3 * pt4[i] + t0t1t1 * pt2[i]) * 1e3) / 1e3;
              bezierSegmentPoints[i * 4 + 3] = math.round((u1u1u1 * pt1[i] + t1u1u1_3 * pt3[i] + t1t1u1_3 * pt4[i] + t1t1t1 * pt2[i]) * 1e3) / 1e3;
            }
            return bezierSegmentPoints;
          }
          return {
            getSegmentsLength,
            getNewSegment,
            getPointInSegment,
            buildBezierData,
            pointOnLine2D,
            pointOnLine3D
          };
        }
        var bez = bezFunction();
        var dataManager = function() {
          var _counterId = 1;
          var processes = [];
          var workerFn;
          var workerInstance;
          var workerProxy = {
            onmessage: function() {
            },
            postMessage: function(path) {
              workerFn({
                data: path
              });
            }
          };
          var _workerSelf = {
            postMessage: function(data2) {
              workerProxy.onmessage({
                data: data2
              });
            }
          };
          function createWorker(fn) {
            if (window.Worker && window.Blob && _useWebWorker) {
              var blob = new Blob(["var _workerSelf = self; self.onmessage = ", fn.toString()], { type: "text/javascript" });
              var url = URL.createObjectURL(blob);
              return new Worker(url);
            }
            workerFn = fn;
            return workerProxy;
          }
          function setupWorker() {
            if (!workerInstance) {
              workerInstance = createWorker(function workerStart(e) {
                function dataFunctionManager() {
                  function completeLayers(layers, comps) {
                    var layerData;
                    var i;
                    var len = layers.length;
                    var j;
                    var jLen;
                    var k;
                    var kLen;
                    for (i = 0; i < len; i += 1) {
                      layerData = layers[i];
                      if ("ks" in layerData && !layerData.completed) {
                        layerData.completed = true;
                        if (layerData.tt) {
                          layers[i - 1].td = layerData.tt;
                        }
                        if (layerData.hasMask) {
                          var maskProps = layerData.masksProperties;
                          jLen = maskProps.length;
                          for (j = 0; j < jLen; j += 1) {
                            if (maskProps[j].pt.k.i) {
                              convertPathsToAbsoluteValues(maskProps[j].pt.k);
                            } else {
                              kLen = maskProps[j].pt.k.length;
                              for (k = 0; k < kLen; k += 1) {
                                if (maskProps[j].pt.k[k].s) {
                                  convertPathsToAbsoluteValues(maskProps[j].pt.k[k].s[0]);
                                }
                                if (maskProps[j].pt.k[k].e) {
                                  convertPathsToAbsoluteValues(maskProps[j].pt.k[k].e[0]);
                                }
                              }
                            }
                          }
                        }
                        if (layerData.ty === 0) {
                          layerData.layers = findCompLayers(layerData.refId, comps);
                          completeLayers(layerData.layers, comps);
                        } else if (layerData.ty === 4) {
                          completeShapes(layerData.shapes);
                        } else if (layerData.ty === 5) {
                          completeText(layerData);
                        }
                      }
                    }
                  }
                  function findCompLayers(id2, comps) {
                    var i = 0;
                    var len = comps.length;
                    while (i < len) {
                      if (comps[i].id === id2) {
                        if (!comps[i].layers.__used) {
                          comps[i].layers.__used = true;
                          return comps[i].layers;
                        }
                        return JSON.parse(JSON.stringify(comps[i].layers));
                      }
                      i += 1;
                    }
                    return null;
                  }
                  function completeShapes(arr) {
                    var i;
                    var len = arr.length;
                    var j;
                    var jLen;
                    for (i = len - 1; i >= 0; i -= 1) {
                      if (arr[i].ty === "sh") {
                        if (arr[i].ks.k.i) {
                          convertPathsToAbsoluteValues(arr[i].ks.k);
                        } else {
                          jLen = arr[i].ks.k.length;
                          for (j = 0; j < jLen; j += 1) {
                            if (arr[i].ks.k[j].s) {
                              convertPathsToAbsoluteValues(arr[i].ks.k[j].s[0]);
                            }
                            if (arr[i].ks.k[j].e) {
                              convertPathsToAbsoluteValues(arr[i].ks.k[j].e[0]);
                            }
                          }
                        }
                      } else if (arr[i].ty === "gr") {
                        completeShapes(arr[i].it);
                      }
                    }
                  }
                  function convertPathsToAbsoluteValues(path) {
                    var i;
                    var len = path.i.length;
                    for (i = 0; i < len; i += 1) {
                      path.i[i][0] += path.v[i][0];
                      path.i[i][1] += path.v[i][1];
                      path.o[i][0] += path.v[i][0];
                      path.o[i][1] += path.v[i][1];
                    }
                  }
                  function checkVersion(minimum, animVersionString) {
                    var animVersion = animVersionString ? animVersionString.split(".") : [100, 100, 100];
                    if (minimum[0] > animVersion[0]) {
                      return true;
                    }
                    if (animVersion[0] > minimum[0]) {
                      return false;
                    }
                    if (minimum[1] > animVersion[1]) {
                      return true;
                    }
                    if (animVersion[1] > minimum[1]) {
                      return false;
                    }
                    if (minimum[2] > animVersion[2]) {
                      return true;
                    }
                    if (animVersion[2] > minimum[2]) {
                      return false;
                    }
                    return null;
                  }
                  var checkText = function() {
                    var minimumVersion = [4, 4, 14];
                    function updateTextLayer(textLayer) {
                      var documentData = textLayer.t.d;
                      textLayer.t.d = {
                        k: [
                          {
                            s: documentData,
                            t: 0
                          }
                        ]
                      };
                    }
                    function iterateLayers(layers) {
                      var i;
                      var len = layers.length;
                      for (i = 0; i < len; i += 1) {
                        if (layers[i].ty === 5) {
                          updateTextLayer(layers[i]);
                        }
                      }
                    }
                    return function(animationData2) {
                      if (checkVersion(minimumVersion, animationData2.v)) {
                        iterateLayers(animationData2.layers);
                        if (animationData2.assets) {
                          var i;
                          var len = animationData2.assets.length;
                          for (i = 0; i < len; i += 1) {
                            if (animationData2.assets[i].layers) {
                              iterateLayers(animationData2.assets[i].layers);
                            }
                          }
                        }
                      }
                    };
                  }();
                  var checkChars = function() {
                    var minimumVersion = [4, 7, 99];
                    return function(animationData2) {
                      if (animationData2.chars && !checkVersion(minimumVersion, animationData2.v)) {
                        var i;
                        var len = animationData2.chars.length;
                        var j;
                        var jLen;
                        var pathData;
                        var paths;
                        for (i = 0; i < len; i += 1) {
                          if (animationData2.chars[i].data && animationData2.chars[i].data.shapes) {
                            paths = animationData2.chars[i].data.shapes[0].it;
                            jLen = paths.length;
                            for (j = 0; j < jLen; j += 1) {
                              pathData = paths[j].ks.k;
                              if (!pathData.__converted) {
                                convertPathsToAbsoluteValues(paths[j].ks.k);
                                pathData.__converted = true;
                              }
                            }
                          }
                        }
                      }
                    };
                  }();
                  var checkPathProperties = function() {
                    var minimumVersion = [5, 7, 15];
                    function updateTextLayer(textLayer) {
                      var pathData = textLayer.t.p;
                      if (typeof pathData.a === "number") {
                        pathData.a = {
                          a: 0,
                          k: pathData.a
                        };
                      }
                      if (typeof pathData.p === "number") {
                        pathData.p = {
                          a: 0,
                          k: pathData.p
                        };
                      }
                      if (typeof pathData.r === "number") {
                        pathData.r = {
                          a: 0,
                          k: pathData.r
                        };
                      }
                    }
                    function iterateLayers(layers) {
                      var i;
                      var len = layers.length;
                      for (i = 0; i < len; i += 1) {
                        if (layers[i].ty === 5) {
                          updateTextLayer(layers[i]);
                        }
                      }
                    }
                    return function(animationData2) {
                      if (checkVersion(minimumVersion, animationData2.v)) {
                        iterateLayers(animationData2.layers);
                        if (animationData2.assets) {
                          var i;
                          var len = animationData2.assets.length;
                          for (i = 0; i < len; i += 1) {
                            if (animationData2.assets[i].layers) {
                              iterateLayers(animationData2.assets[i].layers);
                            }
                          }
                        }
                      }
                    };
                  }();
                  var checkColors = function() {
                    var minimumVersion = [4, 1, 9];
                    function iterateShapes(shapes) {
                      var i;
                      var len = shapes.length;
                      var j;
                      var jLen;
                      for (i = 0; i < len; i += 1) {
                        if (shapes[i].ty === "gr") {
                          iterateShapes(shapes[i].it);
                        } else if (shapes[i].ty === "fl" || shapes[i].ty === "st") {
                          if (shapes[i].c.k && shapes[i].c.k[0].i) {
                            jLen = shapes[i].c.k.length;
                            for (j = 0; j < jLen; j += 1) {
                              if (shapes[i].c.k[j].s) {
                                shapes[i].c.k[j].s[0] /= 255;
                                shapes[i].c.k[j].s[1] /= 255;
                                shapes[i].c.k[j].s[2] /= 255;
                                shapes[i].c.k[j].s[3] /= 255;
                              }
                              if (shapes[i].c.k[j].e) {
                                shapes[i].c.k[j].e[0] /= 255;
                                shapes[i].c.k[j].e[1] /= 255;
                                shapes[i].c.k[j].e[2] /= 255;
                                shapes[i].c.k[j].e[3] /= 255;
                              }
                            }
                          } else {
                            shapes[i].c.k[0] /= 255;
                            shapes[i].c.k[1] /= 255;
                            shapes[i].c.k[2] /= 255;
                            shapes[i].c.k[3] /= 255;
                          }
                        }
                      }
                    }
                    function iterateLayers(layers) {
                      var i;
                      var len = layers.length;
                      for (i = 0; i < len; i += 1) {
                        if (layers[i].ty === 4) {
                          iterateShapes(layers[i].shapes);
                        }
                      }
                    }
                    return function(animationData2) {
                      if (checkVersion(minimumVersion, animationData2.v)) {
                        iterateLayers(animationData2.layers);
                        if (animationData2.assets) {
                          var i;
                          var len = animationData2.assets.length;
                          for (i = 0; i < len; i += 1) {
                            if (animationData2.assets[i].layers) {
                              iterateLayers(animationData2.assets[i].layers);
                            }
                          }
                        }
                      }
                    };
                  }();
                  var checkShapes = function() {
                    var minimumVersion = [4, 4, 18];
                    function completeClosingShapes(arr) {
                      var i;
                      var len = arr.length;
                      var j;
                      var jLen;
                      for (i = len - 1; i >= 0; i -= 1) {
                        if (arr[i].ty === "sh") {
                          if (arr[i].ks.k.i) {
                            arr[i].ks.k.c = arr[i].closed;
                          } else {
                            jLen = arr[i].ks.k.length;
                            for (j = 0; j < jLen; j += 1) {
                              if (arr[i].ks.k[j].s) {
                                arr[i].ks.k[j].s[0].c = arr[i].closed;
                              }
                              if (arr[i].ks.k[j].e) {
                                arr[i].ks.k[j].e[0].c = arr[i].closed;
                              }
                            }
                          }
                        } else if (arr[i].ty === "gr") {
                          completeClosingShapes(arr[i].it);
                        }
                      }
                    }
                    function iterateLayers(layers) {
                      var layerData;
                      var i;
                      var len = layers.length;
                      var j;
                      var jLen;
                      var k;
                      var kLen;
                      for (i = 0; i < len; i += 1) {
                        layerData = layers[i];
                        if (layerData.hasMask) {
                          var maskProps = layerData.masksProperties;
                          jLen = maskProps.length;
                          for (j = 0; j < jLen; j += 1) {
                            if (maskProps[j].pt.k.i) {
                              maskProps[j].pt.k.c = maskProps[j].cl;
                            } else {
                              kLen = maskProps[j].pt.k.length;
                              for (k = 0; k < kLen; k += 1) {
                                if (maskProps[j].pt.k[k].s) {
                                  maskProps[j].pt.k[k].s[0].c = maskProps[j].cl;
                                }
                                if (maskProps[j].pt.k[k].e) {
                                  maskProps[j].pt.k[k].e[0].c = maskProps[j].cl;
                                }
                              }
                            }
                          }
                        }
                        if (layerData.ty === 4) {
                          completeClosingShapes(layerData.shapes);
                        }
                      }
                    }
                    return function(animationData2) {
                      if (checkVersion(minimumVersion, animationData2.v)) {
                        iterateLayers(animationData2.layers);
                        if (animationData2.assets) {
                          var i;
                          var len = animationData2.assets.length;
                          for (i = 0; i < len; i += 1) {
                            if (animationData2.assets[i].layers) {
                              iterateLayers(animationData2.assets[i].layers);
                            }
                          }
                        }
                      }
                    };
                  }();
                  function completeData(animationData2) {
                    if (animationData2.__complete) {
                      return;
                    }
                    checkColors(animationData2);
                    checkText(animationData2);
                    checkChars(animationData2);
                    checkPathProperties(animationData2);
                    checkShapes(animationData2);
                    completeLayers(animationData2.layers, animationData2.assets);
                    animationData2.__complete = true;
                  }
                  function completeText(data2) {
                    if (data2.t.a.length === 0 && !("m" in data2.t.p)) {
                      data2.singleShape = true;
                    }
                  }
                  var moduleOb = {};
                  moduleOb.completeData = completeData;
                  moduleOb.checkColors = checkColors;
                  moduleOb.checkChars = checkChars;
                  moduleOb.checkPathProperties = checkPathProperties;
                  moduleOb.checkShapes = checkShapes;
                  moduleOb.completeLayers = completeLayers;
                  return moduleOb;
                }
                if (!_workerSelf.dataManager) {
                  _workerSelf.dataManager = dataFunctionManager();
                }
                if (!_workerSelf.assetLoader) {
                  _workerSelf.assetLoader = function() {
                    function formatResponse(xhr) {
                      var contentTypeHeader = xhr.getResponseHeader("content-type");
                      if (contentTypeHeader && xhr.responseType === "json" && contentTypeHeader.indexOf("json") !== -1) {
                        return xhr.response;
                      }
                      if (xhr.response && typeof xhr.response === "object") {
                        return xhr.response;
                      }
                      if (xhr.response && typeof xhr.response === "string") {
                        return JSON.parse(xhr.response);
                      }
                      if (xhr.responseText) {
                        return JSON.parse(xhr.responseText);
                      }
                      return null;
                    }
                    function loadAsset(path, fullPath, callback, errorCallback) {
                      var response;
                      var xhr = new XMLHttpRequest();
                      try {
                        xhr.responseType = "json";
                      } catch (err) {
                      }
                      xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                          if (xhr.status === 200) {
                            response = formatResponse(xhr);
                            callback(response);
                          } else {
                            try {
                              response = formatResponse(xhr);
                              callback(response);
                            } catch (err) {
                              if (errorCallback) {
                                errorCallback(err);
                              }
                            }
                          }
                        }
                      };
                      try {
                        xhr.open("GET", path, true);
                      } catch (error) {
                        xhr.open("GET", fullPath + "/" + path, true);
                      }
                      xhr.send();
                    }
                    return {
                      load: loadAsset
                    };
                  }();
                }
                if (e.data.type === "loadAnimation") {
                  _workerSelf.assetLoader.load(
                    e.data.path,
                    e.data.fullPath,
                    function(data2) {
                      _workerSelf.dataManager.completeData(data2);
                      _workerSelf.postMessage({
                        id: e.data.id,
                        payload: data2,
                        status: "success"
                      });
                    },
                    function() {
                      _workerSelf.postMessage({
                        id: e.data.id,
                        status: "error"
                      });
                    }
                  );
                } else if (e.data.type === "complete") {
                  var animation = e.data.animation;
                  _workerSelf.dataManager.completeData(animation);
                  _workerSelf.postMessage({
                    id: e.data.id,
                    payload: animation,
                    status: "success"
                  });
                } else if (e.data.type === "loadData") {
                  _workerSelf.assetLoader.load(
                    e.data.path,
                    e.data.fullPath,
                    function(data2) {
                      _workerSelf.postMessage({
                        id: e.data.id,
                        payload: data2,
                        status: "success"
                      });
                    },
                    function() {
                      _workerSelf.postMessage({
                        id: e.data.id,
                        status: "error"
                      });
                    }
                  );
                }
              });
              workerInstance.onmessage = function(event) {
                var data2 = event.data;
                var id2 = data2.id;
                var process = processes[id2];
                processes[id2] = null;
                if (data2.status === "success") {
                  process.onComplete(data2.payload);
                } else if (process.onError) {
                  process.onError();
                }
              };
            }
          }
          function createProcess(onComplete, onError) {
            _counterId += 1;
            var id2 = "processId_" + _counterId;
            processes[id2] = {
              onComplete,
              onError
            };
            return id2;
          }
          function loadAnimation2(path, onComplete, onError) {
            setupWorker();
            var processId = createProcess(onComplete, onError);
            workerInstance.postMessage({
              type: "loadAnimation",
              path,
              fullPath: window.location.origin + window.location.pathname,
              id: processId
            });
          }
          function loadData(path, onComplete, onError) {
            setupWorker();
            var processId = createProcess(onComplete, onError);
            workerInstance.postMessage({
              type: "loadData",
              path,
              fullPath: window.location.origin + window.location.pathname,
              id: processId
            });
          }
          function completeAnimation(anim, onComplete, onError) {
            setupWorker();
            var processId = createProcess(onComplete, onError);
            workerInstance.postMessage({
              type: "complete",
              animation: anim,
              id: processId
            });
          }
          return {
            loadAnimation: loadAnimation2,
            loadData,
            completeAnimation
          };
        }();
        function getFontProperties(fontData) {
          var styles = fontData.fStyle ? fontData.fStyle.split(" ") : [];
          var fWeight = "normal";
          var fStyle = "normal";
          var len = styles.length;
          var styleName;
          for (var i = 0; i < len; i += 1) {
            styleName = styles[i].toLowerCase();
            switch (styleName) {
              case "italic":
                fStyle = "italic";
                break;
              case "bold":
                fWeight = "700";
                break;
              case "black":
                fWeight = "900";
                break;
              case "medium":
                fWeight = "500";
                break;
              case "regular":
              case "normal":
                fWeight = "400";
                break;
              case "light":
              case "thin":
                fWeight = "200";
                break;
              default:
                break;
            }
          }
          return {
            style: fStyle,
            weight: fontData.fWeight || fWeight
          };
        }
        var FontManager = function() {
          var maxWaitingTime = 5e3;
          var emptyChar = {
            w: 0,
            size: 0,
            shapes: []
          };
          var combinedCharacters = [];
          combinedCharacters = combinedCharacters.concat([
            2304,
            2305,
            2306,
            2307,
            2362,
            2363,
            2364,
            2364,
            2366,
            2367,
            2368,
            2369,
            2370,
            2371,
            2372,
            2373,
            2374,
            2375,
            2376,
            2377,
            2378,
            2379,
            2380,
            2381,
            2382,
            2383,
            2387,
            2388,
            2389,
            2390,
            2391,
            2402,
            2403
          ]);
          var surrogateModifiers = [
            "d83cdffb",
            "d83cdffc",
            "d83cdffd",
            "d83cdffe",
            "d83cdfff"
          ];
          var zeroWidthJoiner = [65039, 8205];
          function trimFontOptions(font) {
            var familyArray = font.split(",");
            var i;
            var len = familyArray.length;
            var enabledFamilies = [];
            for (i = 0; i < len; i += 1) {
              if (familyArray[i] !== "sans-serif" && familyArray[i] !== "monospace") {
                enabledFamilies.push(familyArray[i]);
              }
            }
            return enabledFamilies.join(",");
          }
          function setUpNode(font, family) {
            var parentNode = createTag("span");
            parentNode.setAttribute("aria-hidden", true);
            parentNode.style.fontFamily = family;
            var node = createTag("span");
            node.innerText = "giItT1WQy@!-/#";
            parentNode.style.position = "absolute";
            parentNode.style.left = "-10000px";
            parentNode.style.top = "-10000px";
            parentNode.style.fontSize = "300px";
            parentNode.style.fontVariant = "normal";
            parentNode.style.fontStyle = "normal";
            parentNode.style.fontWeight = "normal";
            parentNode.style.letterSpacing = "0";
            parentNode.appendChild(node);
            document.body.appendChild(parentNode);
            var width2 = node.offsetWidth;
            node.style.fontFamily = trimFontOptions(font) + ", " + family;
            return { node, w: width2, parent: parentNode };
          }
          function checkLoadedFonts() {
            var i;
            var len = this.fonts.length;
            var node;
            var w;
            var loadedCount = len;
            for (i = 0; i < len; i += 1) {
              if (this.fonts[i].loaded) {
                loadedCount -= 1;
              } else if (this.fonts[i].fOrigin === "n" || this.fonts[i].origin === 0) {
                this.fonts[i].loaded = true;
              } else {
                node = this.fonts[i].monoCase.node;
                w = this.fonts[i].monoCase.w;
                if (node.offsetWidth !== w) {
                  loadedCount -= 1;
                  this.fonts[i].loaded = true;
                } else {
                  node = this.fonts[i].sansCase.node;
                  w = this.fonts[i].sansCase.w;
                  if (node.offsetWidth !== w) {
                    loadedCount -= 1;
                    this.fonts[i].loaded = true;
                  }
                }
                if (this.fonts[i].loaded) {
                  this.fonts[i].sansCase.parent.parentNode.removeChild(this.fonts[i].sansCase.parent);
                  this.fonts[i].monoCase.parent.parentNode.removeChild(this.fonts[i].monoCase.parent);
                }
              }
            }
            if (loadedCount !== 0 && Date.now() - this.initTime < maxWaitingTime) {
              setTimeout(this.checkLoadedFontsBinded, 20);
            } else {
              setTimeout(this.setIsLoadedBinded, 10);
            }
          }
          function createHelper(def, fontData) {
            var tHelper = createNS("text");
            tHelper.style.fontSize = "100px";
            var fontProps = getFontProperties(fontData);
            tHelper.setAttribute("font-family", fontData.fFamily);
            tHelper.setAttribute("font-style", fontProps.style);
            tHelper.setAttribute("font-weight", fontProps.weight);
            tHelper.textContent = "1";
            if (fontData.fClass) {
              tHelper.style.fontFamily = "inherit";
              tHelper.setAttribute("class", fontData.fClass);
            } else {
              tHelper.style.fontFamily = fontData.fFamily;
            }
            def.appendChild(tHelper);
            var tCanvasHelper = createTag("canvas").getContext("2d");
            tCanvasHelper.font = fontData.fWeight + " " + fontData.fStyle + " 100px " + fontData.fFamily;
            return tHelper;
          }
          function addFonts(fontData, defs) {
            if (!fontData) {
              this.isLoaded = true;
              return;
            }
            if (this.chars) {
              this.isLoaded = true;
              this.fonts = fontData.list;
              return;
            }
            var fontArr = fontData.list;
            var i;
            var len = fontArr.length;
            var _pendingFonts = len;
            for (i = 0; i < len; i += 1) {
              var shouldLoadFont = true;
              var loadedSelector;
              var j;
              fontArr[i].loaded = false;
              fontArr[i].monoCase = setUpNode(fontArr[i].fFamily, "monospace");
              fontArr[i].sansCase = setUpNode(fontArr[i].fFamily, "sans-serif");
              if (!fontArr[i].fPath) {
                fontArr[i].loaded = true;
                _pendingFonts -= 1;
              } else if (fontArr[i].fOrigin === "p" || fontArr[i].origin === 3) {
                loadedSelector = document.querySelectorAll('style[f-forigin="p"][f-family="' + fontArr[i].fFamily + '"], style[f-origin="3"][f-family="' + fontArr[i].fFamily + '"]');
                if (loadedSelector.length > 0) {
                  shouldLoadFont = false;
                }
                if (shouldLoadFont) {
                  var s = createTag("style");
                  s.setAttribute("f-forigin", fontArr[i].fOrigin);
                  s.setAttribute("f-origin", fontArr[i].origin);
                  s.setAttribute("f-family", fontArr[i].fFamily);
                  s.type = "text/css";
                  s.innerText = "@font-face {font-family: " + fontArr[i].fFamily + "; font-style: normal; src: url('" + fontArr[i].fPath + "');}";
                  defs.appendChild(s);
                }
              } else if (fontArr[i].fOrigin === "g" || fontArr[i].origin === 1) {
                loadedSelector = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]');
                for (j = 0; j < loadedSelector.length; j += 1) {
                  if (loadedSelector[j].href.indexOf(fontArr[i].fPath) !== -1) {
                    shouldLoadFont = false;
                  }
                }
                if (shouldLoadFont) {
                  var l = createTag("link");
                  l.setAttribute("f-forigin", fontArr[i].fOrigin);
                  l.setAttribute("f-origin", fontArr[i].origin);
                  l.type = "text/css";
                  l.rel = "stylesheet";
                  l.href = fontArr[i].fPath;
                  document.body.appendChild(l);
                }
              } else if (fontArr[i].fOrigin === "t" || fontArr[i].origin === 2) {
                loadedSelector = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]');
                for (j = 0; j < loadedSelector.length; j += 1) {
                  if (fontArr[i].fPath === loadedSelector[j].src) {
                    shouldLoadFont = false;
                  }
                }
                if (shouldLoadFont) {
                  var sc = createTag("link");
                  sc.setAttribute("f-forigin", fontArr[i].fOrigin);
                  sc.setAttribute("f-origin", fontArr[i].origin);
                  sc.setAttribute("rel", "stylesheet");
                  sc.setAttribute("href", fontArr[i].fPath);
                  defs.appendChild(sc);
                }
              }
              fontArr[i].helper = createHelper(defs, fontArr[i]);
              fontArr[i].cache = {};
              this.fonts.push(fontArr[i]);
            }
            if (_pendingFonts === 0) {
              this.isLoaded = true;
            } else {
              setTimeout(this.checkLoadedFonts.bind(this), 100);
            }
          }
          function addChars(chars) {
            if (!chars) {
              return;
            }
            if (!this.chars) {
              this.chars = [];
            }
            var i;
            var len = chars.length;
            var j;
            var jLen = this.chars.length;
            var found;
            for (i = 0; i < len; i += 1) {
              j = 0;
              found = false;
              while (j < jLen) {
                if (this.chars[j].style === chars[i].style && this.chars[j].fFamily === chars[i].fFamily && this.chars[j].ch === chars[i].ch) {
                  found = true;
                }
                j += 1;
              }
              if (!found) {
                this.chars.push(chars[i]);
                jLen += 1;
              }
            }
          }
          function getCharData(char, style, font) {
            var i = 0;
            var len = this.chars.length;
            while (i < len) {
              if (this.chars[i].ch === char && this.chars[i].style === style && this.chars[i].fFamily === font) {
                return this.chars[i];
              }
              i += 1;
            }
            if ((typeof char === "string" && char.charCodeAt(0) !== 13 || !char) && console && console.warn && !this._warned) {
              this._warned = true;
              console.warn("Missing character from exported characters list: ", char, style, font);
            }
            return emptyChar;
          }
          function measureText(char, fontName, size) {
            var fontData = this.getFontByName(fontName);
            var index2 = char.charCodeAt(0);
            if (!fontData.cache[index2 + 1]) {
              var tHelper = fontData.helper;
              if (char === " ") {
                tHelper.textContent = "|" + char + "|";
                var doubleSize = tHelper.getComputedTextLength();
                tHelper.textContent = "||";
                var singleSize = tHelper.getComputedTextLength();
                fontData.cache[index2 + 1] = (doubleSize - singleSize) / 100;
              } else {
                tHelper.textContent = char;
                fontData.cache[index2 + 1] = tHelper.getComputedTextLength() / 100;
              }
            }
            return fontData.cache[index2 + 1] * size;
          }
          function getFontByName(name2) {
            var i = 0;
            var len = this.fonts.length;
            while (i < len) {
              if (this.fonts[i].fName === name2) {
                return this.fonts[i];
              }
              i += 1;
            }
            return this.fonts[0];
          }
          function isModifier(firstCharCode, secondCharCode) {
            var sum2 = firstCharCode.toString(16) + secondCharCode.toString(16);
            return surrogateModifiers.indexOf(sum2) !== -1;
          }
          function isZeroWidthJoiner(firstCharCode, secondCharCode) {
            if (!secondCharCode) {
              return firstCharCode === zeroWidthJoiner[1];
            }
            return firstCharCode === zeroWidthJoiner[0] && secondCharCode === zeroWidthJoiner[1];
          }
          function isCombinedCharacter(char) {
            return combinedCharacters.indexOf(char) !== -1;
          }
          function setIsLoaded() {
            this.isLoaded = true;
          }
          var Font = function() {
            this.fonts = [];
            this.chars = null;
            this.typekitLoaded = 0;
            this.isLoaded = false;
            this._warned = false;
            this.initTime = Date.now();
            this.setIsLoadedBinded = this.setIsLoaded.bind(this);
            this.checkLoadedFontsBinded = this.checkLoadedFonts.bind(this);
          };
          Font.isModifier = isModifier;
          Font.isZeroWidthJoiner = isZeroWidthJoiner;
          Font.isCombinedCharacter = isCombinedCharacter;
          var fontPrototype = {
            addChars,
            addFonts,
            getCharData,
            getFontByName,
            measureText,
            checkLoadedFonts,
            setIsLoaded
          };
          Font.prototype = fontPrototype;
          return Font;
        }();
        var PropertyFactory = function() {
          var initFrame = initialDefaultFrame;
          var mathAbs = Math.abs;
          function interpolateValue(frameNum, caching) {
            var offsetTime = this.offsetTime;
            var newValue;
            if (this.propType === "multidimensional") {
              newValue = createTypedArray("float32", this.pv.length);
            }
            var iterationIndex = caching.lastIndex;
            var i = iterationIndex;
            var len = this.keyframes.length - 1;
            var flag = true;
            var keyData;
            var nextKeyData;
            var keyframeMetadata;
            while (flag) {
              keyData = this.keyframes[i];
              nextKeyData = this.keyframes[i + 1];
              if (i === len - 1 && frameNum >= nextKeyData.t - offsetTime) {
                if (keyData.h) {
                  keyData = nextKeyData;
                }
                iterationIndex = 0;
                break;
              }
              if (nextKeyData.t - offsetTime > frameNum) {
                iterationIndex = i;
                break;
              }
              if (i < len - 1) {
                i += 1;
              } else {
                iterationIndex = 0;
                flag = false;
              }
            }
            keyframeMetadata = this.keyframesMetadata[i] || {};
            var k;
            var kLen;
            var perc;
            var jLen;
            var j;
            var fnc;
            var nextKeyTime = nextKeyData.t - offsetTime;
            var keyTime = keyData.t - offsetTime;
            var endValue;
            if (keyData.to) {
              if (!keyframeMetadata.bezierData) {
                keyframeMetadata.bezierData = bez.buildBezierData(keyData.s, nextKeyData.s || keyData.e, keyData.to, keyData.ti);
              }
              var bezierData = keyframeMetadata.bezierData;
              if (frameNum >= nextKeyTime || frameNum < keyTime) {
                var ind = frameNum >= nextKeyTime ? bezierData.points.length - 1 : 0;
                kLen = bezierData.points[ind].point.length;
                for (k = 0; k < kLen; k += 1) {
                  newValue[k] = bezierData.points[ind].point[k];
                }
              } else {
                if (keyframeMetadata.__fnct) {
                  fnc = keyframeMetadata.__fnct;
                } else {
                  fnc = BezierFactory.getBezierEasing(keyData.o.x, keyData.o.y, keyData.i.x, keyData.i.y, keyData.n).get;
                  keyframeMetadata.__fnct = fnc;
                }
                perc = fnc((frameNum - keyTime) / (nextKeyTime - keyTime));
                var distanceInLine = bezierData.segmentLength * perc;
                var segmentPerc;
                var addedLength = caching.lastFrame < frameNum && caching._lastKeyframeIndex === i ? caching._lastAddedLength : 0;
                j = caching.lastFrame < frameNum && caching._lastKeyframeIndex === i ? caching._lastPoint : 0;
                flag = true;
                jLen = bezierData.points.length;
                while (flag) {
                  addedLength += bezierData.points[j].partialLength;
                  if (distanceInLine === 0 || perc === 0 || j === bezierData.points.length - 1) {
                    kLen = bezierData.points[j].point.length;
                    for (k = 0; k < kLen; k += 1) {
                      newValue[k] = bezierData.points[j].point[k];
                    }
                    break;
                  } else if (distanceInLine >= addedLength && distanceInLine < addedLength + bezierData.points[j + 1].partialLength) {
                    segmentPerc = (distanceInLine - addedLength) / bezierData.points[j + 1].partialLength;
                    kLen = bezierData.points[j].point.length;
                    for (k = 0; k < kLen; k += 1) {
                      newValue[k] = bezierData.points[j].point[k] + (bezierData.points[j + 1].point[k] - bezierData.points[j].point[k]) * segmentPerc;
                    }
                    break;
                  }
                  if (j < jLen - 1) {
                    j += 1;
                  } else {
                    flag = false;
                  }
                }
                caching._lastPoint = j;
                caching._lastAddedLength = addedLength - bezierData.points[j].partialLength;
                caching._lastKeyframeIndex = i;
              }
            } else {
              var outX;
              var outY;
              var inX;
              var inY;
              var keyValue;
              len = keyData.s.length;
              endValue = nextKeyData.s || keyData.e;
              if (this.sh && keyData.h !== 1) {
                if (frameNum >= nextKeyTime) {
                  newValue[0] = endValue[0];
                  newValue[1] = endValue[1];
                  newValue[2] = endValue[2];
                } else if (frameNum <= keyTime) {
                  newValue[0] = keyData.s[0];
                  newValue[1] = keyData.s[1];
                  newValue[2] = keyData.s[2];
                } else {
                  var quatStart = createQuaternion(keyData.s);
                  var quatEnd = createQuaternion(endValue);
                  var time2 = (frameNum - keyTime) / (nextKeyTime - keyTime);
                  quaternionToEuler(newValue, slerp(quatStart, quatEnd, time2));
                }
              } else {
                for (i = 0; i < len; i += 1) {
                  if (keyData.h !== 1) {
                    if (frameNum >= nextKeyTime) {
                      perc = 1;
                    } else if (frameNum < keyTime) {
                      perc = 0;
                    } else {
                      if (keyData.o.x.constructor === Array) {
                        if (!keyframeMetadata.__fnct) {
                          keyframeMetadata.__fnct = [];
                        }
                        if (!keyframeMetadata.__fnct[i]) {
                          outX = keyData.o.x[i] === void 0 ? keyData.o.x[0] : keyData.o.x[i];
                          outY = keyData.o.y[i] === void 0 ? keyData.o.y[0] : keyData.o.y[i];
                          inX = keyData.i.x[i] === void 0 ? keyData.i.x[0] : keyData.i.x[i];
                          inY = keyData.i.y[i] === void 0 ? keyData.i.y[0] : keyData.i.y[i];
                          fnc = BezierFactory.getBezierEasing(outX, outY, inX, inY).get;
                          keyframeMetadata.__fnct[i] = fnc;
                        } else {
                          fnc = keyframeMetadata.__fnct[i];
                        }
                      } else if (!keyframeMetadata.__fnct) {
                        outX = keyData.o.x;
                        outY = keyData.o.y;
                        inX = keyData.i.x;
                        inY = keyData.i.y;
                        fnc = BezierFactory.getBezierEasing(outX, outY, inX, inY).get;
                        keyData.keyframeMetadata = fnc;
                      } else {
                        fnc = keyframeMetadata.__fnct;
                      }
                      perc = fnc((frameNum - keyTime) / (nextKeyTime - keyTime));
                    }
                  }
                  endValue = nextKeyData.s || keyData.e;
                  keyValue = keyData.h === 1 ? keyData.s[i] : keyData.s[i] + (endValue[i] - keyData.s[i]) * perc;
                  if (this.propType === "multidimensional") {
                    newValue[i] = keyValue;
                  } else {
                    newValue = keyValue;
                  }
                }
              }
            }
            caching.lastIndex = iterationIndex;
            return newValue;
          }
          function slerp(a, b, t) {
            var out = [];
            var ax = a[0];
            var ay = a[1];
            var az = a[2];
            var aw = a[3];
            var bx = b[0];
            var by = b[1];
            var bz = b[2];
            var bw = b[3];
            var omega;
            var cosom;
            var sinom;
            var scale0;
            var scale1;
            cosom = ax * bx + ay * by + az * bz + aw * bw;
            if (cosom < 0) {
              cosom = -cosom;
              bx = -bx;
              by = -by;
              bz = -bz;
              bw = -bw;
            }
            if (1 - cosom > 1e-6) {
              omega = Math.acos(cosom);
              sinom = Math.sin(omega);
              scale0 = Math.sin((1 - t) * omega) / sinom;
              scale1 = Math.sin(t * omega) / sinom;
            } else {
              scale0 = 1 - t;
              scale1 = t;
            }
            out[0] = scale0 * ax + scale1 * bx;
            out[1] = scale0 * ay + scale1 * by;
            out[2] = scale0 * az + scale1 * bz;
            out[3] = scale0 * aw + scale1 * bw;
            return out;
          }
          function quaternionToEuler(out, quat) {
            var qx = quat[0];
            var qy = quat[1];
            var qz = quat[2];
            var qw = quat[3];
            var heading = Math.atan2(2 * qy * qw - 2 * qx * qz, 1 - 2 * qy * qy - 2 * qz * qz);
            var attitude = Math.asin(2 * qx * qy + 2 * qz * qw);
            var bank = Math.atan2(2 * qx * qw - 2 * qy * qz, 1 - 2 * qx * qx - 2 * qz * qz);
            out[0] = heading / degToRads;
            out[1] = attitude / degToRads;
            out[2] = bank / degToRads;
          }
          function createQuaternion(values) {
            var heading = values[0] * degToRads;
            var attitude = values[1] * degToRads;
            var bank = values[2] * degToRads;
            var c1 = Math.cos(heading / 2);
            var c2 = Math.cos(attitude / 2);
            var c3 = Math.cos(bank / 2);
            var s1 = Math.sin(heading / 2);
            var s2 = Math.sin(attitude / 2);
            var s3 = Math.sin(bank / 2);
            var w = c1 * c2 * c3 - s1 * s2 * s3;
            var x = s1 * s2 * c3 + c1 * c2 * s3;
            var y = s1 * c2 * c3 + c1 * s2 * s3;
            var z = c1 * s2 * c3 - s1 * c2 * s3;
            return [x, y, z, w];
          }
          function getValueAtCurrentTime() {
            var frameNum = this.comp.renderedFrame - this.offsetTime;
            var initTime = this.keyframes[0].t - this.offsetTime;
            var endTime = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
            if (!(frameNum === this._caching.lastFrame || this._caching.lastFrame !== initFrame && (this._caching.lastFrame >= endTime && frameNum >= endTime || this._caching.lastFrame < initTime && frameNum < initTime))) {
              if (this._caching.lastFrame >= frameNum) {
                this._caching._lastKeyframeIndex = -1;
                this._caching.lastIndex = 0;
              }
              var renderResult = this.interpolateValue(frameNum, this._caching);
              this.pv = renderResult;
            }
            this._caching.lastFrame = frameNum;
            return this.pv;
          }
          function setVValue(val2) {
            var multipliedValue;
            if (this.propType === "unidimensional") {
              multipliedValue = val2 * this.mult;
              if (mathAbs(this.v - multipliedValue) > 1e-5) {
                this.v = multipliedValue;
                this._mdf = true;
              }
            } else {
              var i = 0;
              var len = this.v.length;
              while (i < len) {
                multipliedValue = val2[i] * this.mult;
                if (mathAbs(this.v[i] - multipliedValue) > 1e-5) {
                  this.v[i] = multipliedValue;
                  this._mdf = true;
                }
                i += 1;
              }
            }
          }
          function processEffectsSequence() {
            if (this.elem.globalData.frameId === this.frameId || !this.effectsSequence.length) {
              return;
            }
            if (this.lock) {
              this.setVValue(this.pv);
              return;
            }
            this.lock = true;
            this._mdf = this._isFirstFrame;
            var i;
            var len = this.effectsSequence.length;
            var finalValue = this.kf ? this.pv : this.data.k;
            for (i = 0; i < len; i += 1) {
              finalValue = this.effectsSequence[i](finalValue);
            }
            this.setVValue(finalValue);
            this._isFirstFrame = false;
            this.lock = false;
            this.frameId = this.elem.globalData.frameId;
          }
          function addEffect(effectFunction) {
            this.effectsSequence.push(effectFunction);
            this.container.addDynamicProperty(this);
          }
          function ValueProperty(elem2, data2, mult, container) {
            this.propType = "unidimensional";
            this.mult = mult || 1;
            this.data = data2;
            this.v = mult ? data2.k * mult : data2.k;
            this.pv = data2.k;
            this._mdf = false;
            this.elem = elem2;
            this.container = container;
            this.comp = elem2.comp;
            this.k = false;
            this.kf = false;
            this.vel = 0;
            this.effectsSequence = [];
            this._isFirstFrame = true;
            this.getValue = processEffectsSequence;
            this.setVValue = setVValue;
            this.addEffect = addEffect;
          }
          function MultiDimensionalProperty(elem2, data2, mult, container) {
            this.propType = "multidimensional";
            this.mult = mult || 1;
            this.data = data2;
            this._mdf = false;
            this.elem = elem2;
            this.container = container;
            this.comp = elem2.comp;
            this.k = false;
            this.kf = false;
            this.frameId = -1;
            var i;
            var len = data2.k.length;
            this.v = createTypedArray("float32", len);
            this.pv = createTypedArray("float32", len);
            this.vel = createTypedArray("float32", len);
            for (i = 0; i < len; i += 1) {
              this.v[i] = data2.k[i] * this.mult;
              this.pv[i] = data2.k[i];
            }
            this._isFirstFrame = true;
            this.effectsSequence = [];
            this.getValue = processEffectsSequence;
            this.setVValue = setVValue;
            this.addEffect = addEffect;
          }
          function KeyframedValueProperty(elem2, data2, mult, container) {
            this.propType = "unidimensional";
            this.keyframes = data2.k;
            this.keyframesMetadata = [];
            this.offsetTime = elem2.data.st;
            this.frameId = -1;
            this._caching = {
              lastFrame: initFrame,
              lastIndex: 0,
              value: 0,
              _lastKeyframeIndex: -1
            };
            this.k = true;
            this.kf = true;
            this.data = data2;
            this.mult = mult || 1;
            this.elem = elem2;
            this.container = container;
            this.comp = elem2.comp;
            this.v = initFrame;
            this.pv = initFrame;
            this._isFirstFrame = true;
            this.getValue = processEffectsSequence;
            this.setVValue = setVValue;
            this.interpolateValue = interpolateValue;
            this.effectsSequence = [getValueAtCurrentTime.bind(this)];
            this.addEffect = addEffect;
          }
          function KeyframedMultidimensionalProperty(elem2, data2, mult, container) {
            this.propType = "multidimensional";
            var i;
            var len = data2.k.length;
            var s;
            var e;
            var to;
            var ti;
            for (i = 0; i < len - 1; i += 1) {
              if (data2.k[i].to && data2.k[i].s && data2.k[i + 1] && data2.k[i + 1].s) {
                s = data2.k[i].s;
                e = data2.k[i + 1].s;
                to = data2.k[i].to;
                ti = data2.k[i].ti;
                if (s.length === 2 && !(s[0] === e[0] && s[1] === e[1]) && bez.pointOnLine2D(s[0], s[1], e[0], e[1], s[0] + to[0], s[1] + to[1]) && bez.pointOnLine2D(s[0], s[1], e[0], e[1], e[0] + ti[0], e[1] + ti[1]) || s.length === 3 && !(s[0] === e[0] && s[1] === e[1] && s[2] === e[2]) && bez.pointOnLine3D(s[0], s[1], s[2], e[0], e[1], e[2], s[0] + to[0], s[1] + to[1], s[2] + to[2]) && bez.pointOnLine3D(s[0], s[1], s[2], e[0], e[1], e[2], e[0] + ti[0], e[1] + ti[1], e[2] + ti[2])) {
                  data2.k[i].to = null;
                  data2.k[i].ti = null;
                }
                if (s[0] === e[0] && s[1] === e[1] && to[0] === 0 && to[1] === 0 && ti[0] === 0 && ti[1] === 0) {
                  if (s.length === 2 || s[2] === e[2] && to[2] === 0 && ti[2] === 0) {
                    data2.k[i].to = null;
                    data2.k[i].ti = null;
                  }
                }
              }
            }
            this.effectsSequence = [getValueAtCurrentTime.bind(this)];
            this.data = data2;
            this.keyframes = data2.k;
            this.keyframesMetadata = [];
            this.offsetTime = elem2.data.st;
            this.k = true;
            this.kf = true;
            this._isFirstFrame = true;
            this.mult = mult || 1;
            this.elem = elem2;
            this.container = container;
            this.comp = elem2.comp;
            this.getValue = processEffectsSequence;
            this.setVValue = setVValue;
            this.interpolateValue = interpolateValue;
            this.frameId = -1;
            var arrLen = data2.k[0].s.length;
            this.v = createTypedArray("float32", arrLen);
            this.pv = createTypedArray("float32", arrLen);
            for (i = 0; i < arrLen; i += 1) {
              this.v[i] = initFrame;
              this.pv[i] = initFrame;
            }
            this._caching = { lastFrame: initFrame, lastIndex: 0, value: createTypedArray("float32", arrLen) };
            this.addEffect = addEffect;
          }
          function getProp(elem2, data2, type, mult, container) {
            var p;
            if (!data2.k.length) {
              p = new ValueProperty(elem2, data2, mult, container);
            } else if (typeof data2.k[0] === "number") {
              p = new MultiDimensionalProperty(elem2, data2, mult, container);
            } else {
              switch (type) {
                case 0:
                  p = new KeyframedValueProperty(elem2, data2, mult, container);
                  break;
                case 1:
                  p = new KeyframedMultidimensionalProperty(elem2, data2, mult, container);
                  break;
                default:
                  break;
              }
            }
            if (p.effectsSequence.length) {
              container.addDynamicProperty(p);
            }
            return p;
          }
          var ob2 = {
            getProp
          };
          return ob2;
        }();
        var TransformPropertyFactory = function() {
          var defaultVector = [0, 0];
          function applyToMatrix(mat) {
            var _mdf = this._mdf;
            this.iterateDynamicProperties();
            this._mdf = this._mdf || _mdf;
            if (this.a) {
              mat.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]);
            }
            if (this.s) {
              mat.scale(this.s.v[0], this.s.v[1], this.s.v[2]);
            }
            if (this.sk) {
              mat.skewFromAxis(-this.sk.v, this.sa.v);
            }
            if (this.r) {
              mat.rotate(-this.r.v);
            } else {
              mat.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]);
            }
            if (this.data.p.s) {
              if (this.data.p.z) {
                mat.translate(this.px.v, this.py.v, -this.pz.v);
              } else {
                mat.translate(this.px.v, this.py.v, 0);
              }
            } else {
              mat.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
            }
          }
          function processKeys(forceRender) {
            if (this.elem.globalData.frameId === this.frameId) {
              return;
            }
            if (this._isDirty) {
              this.precalculateMatrix();
              this._isDirty = false;
            }
            this.iterateDynamicProperties();
            if (this._mdf || forceRender) {
              var frameRate;
              this.v.cloneFromProps(this.pre.props);
              if (this.appliedTransformations < 1) {
                this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]);
              }
              if (this.appliedTransformations < 2) {
                this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]);
              }
              if (this.sk && this.appliedTransformations < 3) {
                this.v.skewFromAxis(-this.sk.v, this.sa.v);
              }
              if (this.r && this.appliedTransformations < 4) {
                this.v.rotate(-this.r.v);
              } else if (!this.r && this.appliedTransformations < 4) {
                this.v.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]);
              }
              if (this.autoOriented) {
                var v1;
                var v2;
                frameRate = this.elem.globalData.frameRate;
                if (this.p && this.p.keyframes && this.p.getValueAtTime) {
                  if (this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t) {
                    v1 = this.p.getValueAtTime((this.p.keyframes[0].t + 0.01) / frameRate, 0);
                    v2 = this.p.getValueAtTime(this.p.keyframes[0].t / frameRate, 0);
                  } else if (this.p._caching.lastFrame + this.p.offsetTime >= this.p.keyframes[this.p.keyframes.length - 1].t) {
                    v1 = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / frameRate, 0);
                    v2 = this.p.getValueAtTime((this.p.keyframes[this.p.keyframes.length - 1].t - 0.05) / frameRate, 0);
                  } else {
                    v1 = this.p.pv;
                    v2 = this.p.getValueAtTime((this.p._caching.lastFrame + this.p.offsetTime - 0.01) / frameRate, this.p.offsetTime);
                  }
                } else if (this.px && this.px.keyframes && this.py.keyframes && this.px.getValueAtTime && this.py.getValueAtTime) {
                  v1 = [];
                  v2 = [];
                  var px = this.px;
                  var py = this.py;
                  if (px._caching.lastFrame + px.offsetTime <= px.keyframes[0].t) {
                    v1[0] = px.getValueAtTime((px.keyframes[0].t + 0.01) / frameRate, 0);
                    v1[1] = py.getValueAtTime((py.keyframes[0].t + 0.01) / frameRate, 0);
                    v2[0] = px.getValueAtTime(px.keyframes[0].t / frameRate, 0);
                    v2[1] = py.getValueAtTime(py.keyframes[0].t / frameRate, 0);
                  } else if (px._caching.lastFrame + px.offsetTime >= px.keyframes[px.keyframes.length - 1].t) {
                    v1[0] = px.getValueAtTime(px.keyframes[px.keyframes.length - 1].t / frameRate, 0);
                    v1[1] = py.getValueAtTime(py.keyframes[py.keyframes.length - 1].t / frameRate, 0);
                    v2[0] = px.getValueAtTime((px.keyframes[px.keyframes.length - 1].t - 0.01) / frameRate, 0);
                    v2[1] = py.getValueAtTime((py.keyframes[py.keyframes.length - 1].t - 0.01) / frameRate, 0);
                  } else {
                    v1 = [px.pv, py.pv];
                    v2[0] = px.getValueAtTime((px._caching.lastFrame + px.offsetTime - 0.01) / frameRate, px.offsetTime);
                    v2[1] = py.getValueAtTime((py._caching.lastFrame + py.offsetTime - 0.01) / frameRate, py.offsetTime);
                  }
                } else {
                  v2 = defaultVector;
                  v1 = v2;
                }
                this.v.rotate(-Math.atan2(v1[1] - v2[1], v1[0] - v2[0]));
              }
              if (this.data.p && this.data.p.s) {
                if (this.data.p.z) {
                  this.v.translate(this.px.v, this.py.v, -this.pz.v);
                } else {
                  this.v.translate(this.px.v, this.py.v, 0);
                }
              } else {
                this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
              }
            }
            this.frameId = this.elem.globalData.frameId;
          }
          function precalculateMatrix() {
            if (!this.a.k) {
              this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]);
              this.appliedTransformations = 1;
            } else {
              return;
            }
            if (!this.s.effectsSequence.length) {
              this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]);
              this.appliedTransformations = 2;
            } else {
              return;
            }
            if (this.sk) {
              if (!this.sk.effectsSequence.length && !this.sa.effectsSequence.length) {
                this.pre.skewFromAxis(-this.sk.v, this.sa.v);
                this.appliedTransformations = 3;
              } else {
                return;
              }
            }
            if (this.r) {
              if (!this.r.effectsSequence.length) {
                this.pre.rotate(-this.r.v);
                this.appliedTransformations = 4;
              }
            } else if (!this.rz.effectsSequence.length && !this.ry.effectsSequence.length && !this.rx.effectsSequence.length && !this.or.effectsSequence.length) {
              this.pre.rotateZ(-this.rz.v).rotateY(this.ry.v).rotateX(this.rx.v).rotateZ(-this.or.v[2]).rotateY(this.or.v[1]).rotateX(this.or.v[0]);
              this.appliedTransformations = 4;
            }
          }
          function autoOrient() {
          }
          function addDynamicProperty(prop) {
            this._addDynamicProperty(prop);
            this.elem.addDynamicProperty(prop);
            this._isDirty = true;
          }
          function TransformProperty(elem2, data2, container) {
            this.elem = elem2;
            this.frameId = -1;
            this.propType = "transform";
            this.data = data2;
            this.v = new Matrix();
            this.pre = new Matrix();
            this.appliedTransformations = 0;
            this.initDynamicPropertyContainer(container || elem2);
            if (data2.p && data2.p.s) {
              this.px = PropertyFactory.getProp(elem2, data2.p.x, 0, 0, this);
              this.py = PropertyFactory.getProp(elem2, data2.p.y, 0, 0, this);
              if (data2.p.z) {
                this.pz = PropertyFactory.getProp(elem2, data2.p.z, 0, 0, this);
              }
            } else {
              this.p = PropertyFactory.getProp(elem2, data2.p || { k: [0, 0, 0] }, 1, 0, this);
            }
            if (data2.rx) {
              this.rx = PropertyFactory.getProp(elem2, data2.rx, 0, degToRads, this);
              this.ry = PropertyFactory.getProp(elem2, data2.ry, 0, degToRads, this);
              this.rz = PropertyFactory.getProp(elem2, data2.rz, 0, degToRads, this);
              if (data2.or.k[0].ti) {
                var i;
                var len = data2.or.k.length;
                for (i = 0; i < len; i += 1) {
                  data2.or.k[i].to = null;
                  data2.or.k[i].ti = null;
                }
              }
              this.or = PropertyFactory.getProp(elem2, data2.or, 1, degToRads, this);
              this.or.sh = true;
            } else {
              this.r = PropertyFactory.getProp(elem2, data2.r || { k: 0 }, 0, degToRads, this);
            }
            if (data2.sk) {
              this.sk = PropertyFactory.getProp(elem2, data2.sk, 0, degToRads, this);
              this.sa = PropertyFactory.getProp(elem2, data2.sa, 0, degToRads, this);
            }
            this.a = PropertyFactory.getProp(elem2, data2.a || { k: [0, 0, 0] }, 1, 0, this);
            this.s = PropertyFactory.getProp(elem2, data2.s || { k: [100, 100, 100] }, 1, 0.01, this);
            if (data2.o) {
              this.o = PropertyFactory.getProp(elem2, data2.o, 0, 0.01, elem2);
            } else {
              this.o = { _mdf: false, v: 1 };
            }
            this._isDirty = true;
            if (!this.dynamicProperties.length) {
              this.getValue(true);
            }
          }
          TransformProperty.prototype = {
            applyToMatrix,
            getValue: processKeys,
            precalculateMatrix,
            autoOrient
          };
          extendPrototype([DynamicPropertyContainer], TransformProperty);
          TransformProperty.prototype.addDynamicProperty = addDynamicProperty;
          TransformProperty.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty;
          function getTransformProperty(elem2, data2, container) {
            return new TransformProperty(elem2, data2, container);
          }
          return {
            getTransformProperty
          };
        }();
        function ShapePath() {
          this.c = false;
          this._length = 0;
          this._maxLength = 8;
          this.v = createSizedArray(this._maxLength);
          this.o = createSizedArray(this._maxLength);
          this.i = createSizedArray(this._maxLength);
        }
        ShapePath.prototype.setPathData = function(closed, len) {
          this.c = closed;
          this.setLength(len);
          var i = 0;
          while (i < len) {
            this.v[i] = pointPool.newElement();
            this.o[i] = pointPool.newElement();
            this.i[i] = pointPool.newElement();
            i += 1;
          }
        };
        ShapePath.prototype.setLength = function(len) {
          while (this._maxLength < len) {
            this.doubleArrayLength();
          }
          this._length = len;
        };
        ShapePath.prototype.doubleArrayLength = function() {
          this.v = this.v.concat(createSizedArray(this._maxLength));
          this.i = this.i.concat(createSizedArray(this._maxLength));
          this.o = this.o.concat(createSizedArray(this._maxLength));
          this._maxLength *= 2;
        };
        ShapePath.prototype.setXYAt = function(x, y, type, pos, replace) {
          var arr;
          this._length = Math.max(this._length, pos + 1);
          if (this._length >= this._maxLength) {
            this.doubleArrayLength();
          }
          switch (type) {
            case "v":
              arr = this.v;
              break;
            case "i":
              arr = this.i;
              break;
            case "o":
              arr = this.o;
              break;
            default:
              arr = [];
              break;
          }
          if (!arr[pos] || arr[pos] && !replace) {
            arr[pos] = pointPool.newElement();
          }
          arr[pos][0] = x;
          arr[pos][1] = y;
        };
        ShapePath.prototype.setTripleAt = function(vX, vY, oX, oY, iX, iY, pos, replace) {
          this.setXYAt(vX, vY, "v", pos, replace);
          this.setXYAt(oX, oY, "o", pos, replace);
          this.setXYAt(iX, iY, "i", pos, replace);
        };
        ShapePath.prototype.reverse = function() {
          var newPath = new ShapePath();
          newPath.setPathData(this.c, this._length);
          var vertices = this.v;
          var outPoints = this.o;
          var inPoints = this.i;
          var init = 0;
          if (this.c) {
            newPath.setTripleAt(vertices[0][0], vertices[0][1], inPoints[0][0], inPoints[0][1], outPoints[0][0], outPoints[0][1], 0, false);
            init = 1;
          }
          var cnt = this._length - 1;
          var len = this._length;
          var i;
          for (i = init; i < len; i += 1) {
            newPath.setTripleAt(vertices[cnt][0], vertices[cnt][1], inPoints[cnt][0], inPoints[cnt][1], outPoints[cnt][0], outPoints[cnt][1], i, false);
            cnt -= 1;
          }
          return newPath;
        };
        var ShapePropertyFactory = function() {
          var initFrame = -999999;
          function interpolateShape(frameNum, previousValue, caching) {
            var iterationIndex = caching.lastIndex;
            var keyPropS;
            var keyPropE;
            var isHold;
            var j;
            var k;
            var jLen;
            var kLen;
            var perc;
            var vertexValue;
            var kf = this.keyframes;
            if (frameNum < kf[0].t - this.offsetTime) {
              keyPropS = kf[0].s[0];
              isHold = true;
              iterationIndex = 0;
            } else if (frameNum >= kf[kf.length - 1].t - this.offsetTime) {
              keyPropS = kf[kf.length - 1].s ? kf[kf.length - 1].s[0] : kf[kf.length - 2].e[0];
              isHold = true;
            } else {
              var i = iterationIndex;
              var len = kf.length - 1;
              var flag = true;
              var keyData;
              var nextKeyData;
              var keyframeMetadata;
              while (flag) {
                keyData = kf[i];
                nextKeyData = kf[i + 1];
                if (nextKeyData.t - this.offsetTime > frameNum) {
                  break;
                }
                if (i < len - 1) {
                  i += 1;
                } else {
                  flag = false;
                }
              }
              keyframeMetadata = this.keyframesMetadata[i] || {};
              isHold = keyData.h === 1;
              iterationIndex = i;
              if (!isHold) {
                if (frameNum >= nextKeyData.t - this.offsetTime) {
                  perc = 1;
                } else if (frameNum < keyData.t - this.offsetTime) {
                  perc = 0;
                } else {
                  var fnc;
                  if (keyframeMetadata.__fnct) {
                    fnc = keyframeMetadata.__fnct;
                  } else {
                    fnc = BezierFactory.getBezierEasing(keyData.o.x, keyData.o.y, keyData.i.x, keyData.i.y).get;
                    keyframeMetadata.__fnct = fnc;
                  }
                  perc = fnc((frameNum - (keyData.t - this.offsetTime)) / (nextKeyData.t - this.offsetTime - (keyData.t - this.offsetTime)));
                }
                keyPropE = nextKeyData.s ? nextKeyData.s[0] : keyData.e[0];
              }
              keyPropS = keyData.s[0];
            }
            jLen = previousValue._length;
            kLen = keyPropS.i[0].length;
            caching.lastIndex = iterationIndex;
            for (j = 0; j < jLen; j += 1) {
              for (k = 0; k < kLen; k += 1) {
                vertexValue = isHold ? keyPropS.i[j][k] : keyPropS.i[j][k] + (keyPropE.i[j][k] - keyPropS.i[j][k]) * perc;
                previousValue.i[j][k] = vertexValue;
                vertexValue = isHold ? keyPropS.o[j][k] : keyPropS.o[j][k] + (keyPropE.o[j][k] - keyPropS.o[j][k]) * perc;
                previousValue.o[j][k] = vertexValue;
                vertexValue = isHold ? keyPropS.v[j][k] : keyPropS.v[j][k] + (keyPropE.v[j][k] - keyPropS.v[j][k]) * perc;
                previousValue.v[j][k] = vertexValue;
              }
            }
          }
          function interpolateShapeCurrentTime() {
            var frameNum = this.comp.renderedFrame - this.offsetTime;
            var initTime = this.keyframes[0].t - this.offsetTime;
            var endTime = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
            var lastFrame = this._caching.lastFrame;
            if (!(lastFrame !== initFrame && (lastFrame < initTime && frameNum < initTime || lastFrame > endTime && frameNum > endTime))) {
              this._caching.lastIndex = lastFrame < frameNum ? this._caching.lastIndex : 0;
              this.interpolateShape(frameNum, this.pv, this._caching);
            }
            this._caching.lastFrame = frameNum;
            return this.pv;
          }
          function resetShape() {
            this.paths = this.localShapeCollection;
          }
          function shapesEqual(shape1, shape2) {
            if (shape1._length !== shape2._length || shape1.c !== shape2.c) {
              return false;
            }
            var i;
            var len = shape1._length;
            for (i = 0; i < len; i += 1) {
              if (shape1.v[i][0] !== shape2.v[i][0] || shape1.v[i][1] !== shape2.v[i][1] || shape1.o[i][0] !== shape2.o[i][0] || shape1.o[i][1] !== shape2.o[i][1] || shape1.i[i][0] !== shape2.i[i][0] || shape1.i[i][1] !== shape2.i[i][1]) {
                return false;
              }
            }
            return true;
          }
          function setVValue(newPath) {
            if (!shapesEqual(this.v, newPath)) {
              this.v = shapePool.clone(newPath);
              this.localShapeCollection.releaseShapes();
              this.localShapeCollection.addShape(this.v);
              this._mdf = true;
              this.paths = this.localShapeCollection;
            }
          }
          function processEffectsSequence() {
            if (this.elem.globalData.frameId === this.frameId) {
              return;
            }
            if (!this.effectsSequence.length) {
              this._mdf = false;
              return;
            }
            if (this.lock) {
              this.setVValue(this.pv);
              return;
            }
            this.lock = true;
            this._mdf = false;
            var finalValue;
            if (this.kf) {
              finalValue = this.pv;
            } else if (this.data.ks) {
              finalValue = this.data.ks.k;
            } else {
              finalValue = this.data.pt.k;
            }
            var i;
            var len = this.effectsSequence.length;
            for (i = 0; i < len; i += 1) {
              finalValue = this.effectsSequence[i](finalValue);
            }
            this.setVValue(finalValue);
            this.lock = false;
            this.frameId = this.elem.globalData.frameId;
          }
          function ShapeProperty(elem2, data2, type) {
            this.propType = "shape";
            this.comp = elem2.comp;
            this.container = elem2;
            this.elem = elem2;
            this.data = data2;
            this.k = false;
            this.kf = false;
            this._mdf = false;
            var pathData = type === 3 ? data2.pt.k : data2.ks.k;
            this.v = shapePool.clone(pathData);
            this.pv = shapePool.clone(this.v);
            this.localShapeCollection = shapeCollectionPool.newShapeCollection();
            this.paths = this.localShapeCollection;
            this.paths.addShape(this.v);
            this.reset = resetShape;
            this.effectsSequence = [];
          }
          function addEffect(effectFunction) {
            this.effectsSequence.push(effectFunction);
            this.container.addDynamicProperty(this);
          }
          ShapeProperty.prototype.interpolateShape = interpolateShape;
          ShapeProperty.prototype.getValue = processEffectsSequence;
          ShapeProperty.prototype.setVValue = setVValue;
          ShapeProperty.prototype.addEffect = addEffect;
          function KeyframedShapeProperty(elem2, data2, type) {
            this.propType = "shape";
            this.comp = elem2.comp;
            this.elem = elem2;
            this.container = elem2;
            this.offsetTime = elem2.data.st;
            this.keyframes = type === 3 ? data2.pt.k : data2.ks.k;
            this.keyframesMetadata = [];
            this.k = true;
            this.kf = true;
            var len = this.keyframes[0].s[0].i.length;
            this.v = shapePool.newElement();
            this.v.setPathData(this.keyframes[0].s[0].c, len);
            this.pv = shapePool.clone(this.v);
            this.localShapeCollection = shapeCollectionPool.newShapeCollection();
            this.paths = this.localShapeCollection;
            this.paths.addShape(this.v);
            this.lastFrame = initFrame;
            this.reset = resetShape;
            this._caching = { lastFrame: initFrame, lastIndex: 0 };
            this.effectsSequence = [interpolateShapeCurrentTime.bind(this)];
          }
          KeyframedShapeProperty.prototype.getValue = processEffectsSequence;
          KeyframedShapeProperty.prototype.interpolateShape = interpolateShape;
          KeyframedShapeProperty.prototype.setVValue = setVValue;
          KeyframedShapeProperty.prototype.addEffect = addEffect;
          var EllShapeProperty = function() {
            var cPoint = roundCorner;
            function EllShapePropertyFactory(elem2, data2) {
              this.v = shapePool.newElement();
              this.v.setPathData(true, 4);
              this.localShapeCollection = shapeCollectionPool.newShapeCollection();
              this.paths = this.localShapeCollection;
              this.localShapeCollection.addShape(this.v);
              this.d = data2.d;
              this.elem = elem2;
              this.comp = elem2.comp;
              this.frameId = -1;
              this.initDynamicPropertyContainer(elem2);
              this.p = PropertyFactory.getProp(elem2, data2.p, 1, 0, this);
              this.s = PropertyFactory.getProp(elem2, data2.s, 1, 0, this);
              if (this.dynamicProperties.length) {
                this.k = true;
              } else {
                this.k = false;
                this.convertEllToPath();
              }
            }
            EllShapePropertyFactory.prototype = {
              reset: resetShape,
              getValue: function() {
                if (this.elem.globalData.frameId === this.frameId) {
                  return;
                }
                this.frameId = this.elem.globalData.frameId;
                this.iterateDynamicProperties();
                if (this._mdf) {
                  this.convertEllToPath();
                }
              },
              convertEllToPath: function() {
                var p0 = this.p.v[0];
                var p1 = this.p.v[1];
                var s0 = this.s.v[0] / 2;
                var s1 = this.s.v[1] / 2;
                var _cw = this.d !== 3;
                var _v = this.v;
                _v.v[0][0] = p0;
                _v.v[0][1] = p1 - s1;
                _v.v[1][0] = _cw ? p0 + s0 : p0 - s0;
                _v.v[1][1] = p1;
                _v.v[2][0] = p0;
                _v.v[2][1] = p1 + s1;
                _v.v[3][0] = _cw ? p0 - s0 : p0 + s0;
                _v.v[3][1] = p1;
                _v.i[0][0] = _cw ? p0 - s0 * cPoint : p0 + s0 * cPoint;
                _v.i[0][1] = p1 - s1;
                _v.i[1][0] = _cw ? p0 + s0 : p0 - s0;
                _v.i[1][1] = p1 - s1 * cPoint;
                _v.i[2][0] = _cw ? p0 + s0 * cPoint : p0 - s0 * cPoint;
                _v.i[2][1] = p1 + s1;
                _v.i[3][0] = _cw ? p0 - s0 : p0 + s0;
                _v.i[3][1] = p1 + s1 * cPoint;
                _v.o[0][0] = _cw ? p0 + s0 * cPoint : p0 - s0 * cPoint;
                _v.o[0][1] = p1 - s1;
                _v.o[1][0] = _cw ? p0 + s0 : p0 - s0;
                _v.o[1][1] = p1 + s1 * cPoint;
                _v.o[2][0] = _cw ? p0 - s0 * cPoint : p0 + s0 * cPoint;
                _v.o[2][1] = p1 + s1;
                _v.o[3][0] = _cw ? p0 - s0 : p0 + s0;
                _v.o[3][1] = p1 - s1 * cPoint;
              }
            };
            extendPrototype([DynamicPropertyContainer], EllShapePropertyFactory);
            return EllShapePropertyFactory;
          }();
          var StarShapeProperty = function() {
            function StarShapePropertyFactory(elem2, data2) {
              this.v = shapePool.newElement();
              this.v.setPathData(true, 0);
              this.elem = elem2;
              this.comp = elem2.comp;
              this.data = data2;
              this.frameId = -1;
              this.d = data2.d;
              this.initDynamicPropertyContainer(elem2);
              if (data2.sy === 1) {
                this.ir = PropertyFactory.getProp(elem2, data2.ir, 0, 0, this);
                this.is = PropertyFactory.getProp(elem2, data2.is, 0, 0.01, this);
                this.convertToPath = this.convertStarToPath;
              } else {
                this.convertToPath = this.convertPolygonToPath;
              }
              this.pt = PropertyFactory.getProp(elem2, data2.pt, 0, 0, this);
              this.p = PropertyFactory.getProp(elem2, data2.p, 1, 0, this);
              this.r = PropertyFactory.getProp(elem2, data2.r, 0, degToRads, this);
              this.or = PropertyFactory.getProp(elem2, data2.or, 0, 0, this);
              this.os = PropertyFactory.getProp(elem2, data2.os, 0, 0.01, this);
              this.localShapeCollection = shapeCollectionPool.newShapeCollection();
              this.localShapeCollection.addShape(this.v);
              this.paths = this.localShapeCollection;
              if (this.dynamicProperties.length) {
                this.k = true;
              } else {
                this.k = false;
                this.convertToPath();
              }
            }
            StarShapePropertyFactory.prototype = {
              reset: resetShape,
              getValue: function() {
                if (this.elem.globalData.frameId === this.frameId) {
                  return;
                }
                this.frameId = this.elem.globalData.frameId;
                this.iterateDynamicProperties();
                if (this._mdf) {
                  this.convertToPath();
                }
              },
              convertStarToPath: function() {
                var numPts = Math.floor(this.pt.v) * 2;
                var angle = Math.PI * 2 / numPts;
                var longFlag = true;
                var longRad = this.or.v;
                var shortRad = this.ir.v;
                var longRound = this.os.v;
                var shortRound = this.is.v;
                var longPerimSegment = 2 * Math.PI * longRad / (numPts * 2);
                var shortPerimSegment = 2 * Math.PI * shortRad / (numPts * 2);
                var i;
                var rad;
                var roundness;
                var perimSegment;
                var currentAng = -Math.PI / 2;
                currentAng += this.r.v;
                var dir = this.data.d === 3 ? -1 : 1;
                this.v._length = 0;
                for (i = 0; i < numPts; i += 1) {
                  rad = longFlag ? longRad : shortRad;
                  roundness = longFlag ? longRound : shortRound;
                  perimSegment = longFlag ? longPerimSegment : shortPerimSegment;
                  var x = rad * Math.cos(currentAng);
                  var y = rad * Math.sin(currentAng);
                  var ox = x === 0 && y === 0 ? 0 : y / Math.sqrt(x * x + y * y);
                  var oy = x === 0 && y === 0 ? 0 : -x / Math.sqrt(x * x + y * y);
                  x += +this.p.v[0];
                  y += +this.p.v[1];
                  this.v.setTripleAt(x, y, x - ox * perimSegment * roundness * dir, y - oy * perimSegment * roundness * dir, x + ox * perimSegment * roundness * dir, y + oy * perimSegment * roundness * dir, i, true);
                  longFlag = !longFlag;
                  currentAng += angle * dir;
                }
              },
              convertPolygonToPath: function() {
                var numPts = Math.floor(this.pt.v);
                var angle = Math.PI * 2 / numPts;
                var rad = this.or.v;
                var roundness = this.os.v;
                var perimSegment = 2 * Math.PI * rad / (numPts * 4);
                var i;
                var currentAng = -Math.PI * 0.5;
                var dir = this.data.d === 3 ? -1 : 1;
                currentAng += this.r.v;
                this.v._length = 0;
                for (i = 0; i < numPts; i += 1) {
                  var x = rad * Math.cos(currentAng);
                  var y = rad * Math.sin(currentAng);
                  var ox = x === 0 && y === 0 ? 0 : y / Math.sqrt(x * x + y * y);
                  var oy = x === 0 && y === 0 ? 0 : -x / Math.sqrt(x * x + y * y);
                  x += +this.p.v[0];
                  y += +this.p.v[1];
                  this.v.setTripleAt(x, y, x - ox * perimSegment * roundness * dir, y - oy * perimSegment * roundness * dir, x + ox * perimSegment * roundness * dir, y + oy * perimSegment * roundness * dir, i, true);
                  currentAng += angle * dir;
                }
                this.paths.length = 0;
                this.paths[0] = this.v;
              }
            };
            extendPrototype([DynamicPropertyContainer], StarShapePropertyFactory);
            return StarShapePropertyFactory;
          }();
          var RectShapeProperty = function() {
            function RectShapePropertyFactory(elem2, data2) {
              this.v = shapePool.newElement();
              this.v.c = true;
              this.localShapeCollection = shapeCollectionPool.newShapeCollection();
              this.localShapeCollection.addShape(this.v);
              this.paths = this.localShapeCollection;
              this.elem = elem2;
              this.comp = elem2.comp;
              this.frameId = -1;
              this.d = data2.d;
              this.initDynamicPropertyContainer(elem2);
              this.p = PropertyFactory.getProp(elem2, data2.p, 1, 0, this);
              this.s = PropertyFactory.getProp(elem2, data2.s, 1, 0, this);
              this.r = PropertyFactory.getProp(elem2, data2.r, 0, 0, this);
              if (this.dynamicProperties.length) {
                this.k = true;
              } else {
                this.k = false;
                this.convertRectToPath();
              }
            }
            RectShapePropertyFactory.prototype = {
              convertRectToPath: function() {
                var p0 = this.p.v[0];
                var p1 = this.p.v[1];
                var v0 = this.s.v[0] / 2;
                var v1 = this.s.v[1] / 2;
                var round = bmMin(v0, v1, this.r.v);
                var cPoint = round * (1 - roundCorner);
                this.v._length = 0;
                if (this.d === 2 || this.d === 1) {
                  this.v.setTripleAt(p0 + v0, p1 - v1 + round, p0 + v0, p1 - v1 + round, p0 + v0, p1 - v1 + cPoint, 0, true);
                  this.v.setTripleAt(p0 + v0, p1 + v1 - round, p0 + v0, p1 + v1 - cPoint, p0 + v0, p1 + v1 - round, 1, true);
                  if (round !== 0) {
                    this.v.setTripleAt(p0 + v0 - round, p1 + v1, p0 + v0 - round, p1 + v1, p0 + v0 - cPoint, p1 + v1, 2, true);
                    this.v.setTripleAt(p0 - v0 + round, p1 + v1, p0 - v0 + cPoint, p1 + v1, p0 - v0 + round, p1 + v1, 3, true);
                    this.v.setTripleAt(p0 - v0, p1 + v1 - round, p0 - v0, p1 + v1 - round, p0 - v0, p1 + v1 - cPoint, 4, true);
                    this.v.setTripleAt(p0 - v0, p1 - v1 + round, p0 - v0, p1 - v1 + cPoint, p0 - v0, p1 - v1 + round, 5, true);
                    this.v.setTripleAt(p0 - v0 + round, p1 - v1, p0 - v0 + round, p1 - v1, p0 - v0 + cPoint, p1 - v1, 6, true);
                    this.v.setTripleAt(p0 + v0 - round, p1 - v1, p0 + v0 - cPoint, p1 - v1, p0 + v0 - round, p1 - v1, 7, true);
                  } else {
                    this.v.setTripleAt(p0 - v0, p1 + v1, p0 - v0 + cPoint, p1 + v1, p0 - v0, p1 + v1, 2);
                    this.v.setTripleAt(p0 - v0, p1 - v1, p0 - v0, p1 - v1 + cPoint, p0 - v0, p1 - v1, 3);
                  }
                } else {
                  this.v.setTripleAt(p0 + v0, p1 - v1 + round, p0 + v0, p1 - v1 + cPoint, p0 + v0, p1 - v1 + round, 0, true);
                  if (round !== 0) {
                    this.v.setTripleAt(p0 + v0 - round, p1 - v1, p0 + v0 - round, p1 - v1, p0 + v0 - cPoint, p1 - v1, 1, true);
                    this.v.setTripleAt(p0 - v0 + round, p1 - v1, p0 - v0 + cPoint, p1 - v1, p0 - v0 + round, p1 - v1, 2, true);
                    this.v.setTripleAt(p0 - v0, p1 - v1 + round, p0 - v0, p1 - v1 + round, p0 - v0, p1 - v1 + cPoint, 3, true);
                    this.v.setTripleAt(p0 - v0, p1 + v1 - round, p0 - v0, p1 + v1 - cPoint, p0 - v0, p1 + v1 - round, 4, true);
                    this.v.setTripleAt(p0 - v0 + round, p1 + v1, p0 - v0 + round, p1 + v1, p0 - v0 + cPoint, p1 + v1, 5, true);
                    this.v.setTripleAt(p0 + v0 - round, p1 + v1, p0 + v0 - cPoint, p1 + v1, p0 + v0 - round, p1 + v1, 6, true);
                    this.v.setTripleAt(p0 + v0, p1 + v1 - round, p0 + v0, p1 + v1 - round, p0 + v0, p1 + v1 - cPoint, 7, true);
                  } else {
                    this.v.setTripleAt(p0 - v0, p1 - v1, p0 - v0 + cPoint, p1 - v1, p0 - v0, p1 - v1, 1, true);
                    this.v.setTripleAt(p0 - v0, p1 + v1, p0 - v0, p1 + v1 - cPoint, p0 - v0, p1 + v1, 2, true);
                    this.v.setTripleAt(p0 + v0, p1 + v1, p0 + v0 - cPoint, p1 + v1, p0 + v0, p1 + v1, 3, true);
                  }
                }
              },
              getValue: function() {
                if (this.elem.globalData.frameId === this.frameId) {
                  return;
                }
                this.frameId = this.elem.globalData.frameId;
                this.iterateDynamicProperties();
                if (this._mdf) {
                  this.convertRectToPath();
                }
              },
              reset: resetShape
            };
            extendPrototype([DynamicPropertyContainer], RectShapePropertyFactory);
            return RectShapePropertyFactory;
          }();
          function getShapeProp(elem2, data2, type) {
            var prop;
            if (type === 3 || type === 4) {
              var dataProp = type === 3 ? data2.pt : data2.ks;
              var keys = dataProp.k;
              if (keys.length) {
                prop = new KeyframedShapeProperty(elem2, data2, type);
              } else {
                prop = new ShapeProperty(elem2, data2, type);
              }
            } else if (type === 5) {
              prop = new RectShapeProperty(elem2, data2);
            } else if (type === 6) {
              prop = new EllShapeProperty(elem2, data2);
            } else if (type === 7) {
              prop = new StarShapeProperty(elem2, data2);
            }
            if (prop.k) {
              elem2.addDynamicProperty(prop);
            }
            return prop;
          }
          function getConstructorFunction() {
            return ShapeProperty;
          }
          function getKeyframedConstructorFunction() {
            return KeyframedShapeProperty;
          }
          var ob2 = {};
          ob2.getShapeProp = getShapeProp;
          ob2.getConstructorFunction = getConstructorFunction;
          ob2.getKeyframedConstructorFunction = getKeyframedConstructorFunction;
          return ob2;
        }();
        var ShapeModifiers = function() {
          var ob2 = {};
          var modifiers = {};
          ob2.registerModifier = registerModifier;
          ob2.getModifier = getModifier;
          function registerModifier(nm, factory2) {
            if (!modifiers[nm]) {
              modifiers[nm] = factory2;
            }
          }
          function getModifier(nm, elem2, data2) {
            return new modifiers[nm](elem2, data2);
          }
          return ob2;
        }();
        function ShapeModifier() {
        }
        ShapeModifier.prototype.initModifierProperties = function() {
        };
        ShapeModifier.prototype.addShapeToModifier = function() {
        };
        ShapeModifier.prototype.addShape = function(data2) {
          if (!this.closed) {
            data2.sh.container.addDynamicProperty(data2.sh);
            var shapeData = { shape: data2.sh, data: data2, localShapeCollection: shapeCollectionPool.newShapeCollection() };
            this.shapes.push(shapeData);
            this.addShapeToModifier(shapeData);
            if (this._isAnimated) {
              data2.setAsAnimated();
            }
          }
        };
        ShapeModifier.prototype.init = function(elem2, data2) {
          this.shapes = [];
          this.elem = elem2;
          this.initDynamicPropertyContainer(elem2);
          this.initModifierProperties(elem2, data2);
          this.frameId = initialDefaultFrame;
          this.closed = false;
          this.k = false;
          if (this.dynamicProperties.length) {
            this.k = true;
          } else {
            this.getValue(true);
          }
        };
        ShapeModifier.prototype.processKeys = function() {
          if (this.elem.globalData.frameId === this.frameId) {
            return;
          }
          this.frameId = this.elem.globalData.frameId;
          this.iterateDynamicProperties();
        };
        extendPrototype([DynamicPropertyContainer], ShapeModifier);
        function TrimModifier() {
        }
        extendPrototype([ShapeModifier], TrimModifier);
        TrimModifier.prototype.initModifierProperties = function(elem2, data2) {
          this.s = PropertyFactory.getProp(elem2, data2.s, 0, 0.01, this);
          this.e = PropertyFactory.getProp(elem2, data2.e, 0, 0.01, this);
          this.o = PropertyFactory.getProp(elem2, data2.o, 0, 0, this);
          this.sValue = 0;
          this.eValue = 0;
          this.getValue = this.processKeys;
          this.m = data2.m;
          this._isAnimated = !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length;
        };
        TrimModifier.prototype.addShapeToModifier = function(shapeData) {
          shapeData.pathsData = [];
        };
        TrimModifier.prototype.calculateShapeEdges = function(s, e, shapeLength, addedLength, totalModifierLength) {
          var segments = [];
          if (e <= 1) {
            segments.push({
              s,
              e
            });
          } else if (s >= 1) {
            segments.push({
              s: s - 1,
              e: e - 1
            });
          } else {
            segments.push({
              s,
              e: 1
            });
            segments.push({
              s: 0,
              e: e - 1
            });
          }
          var shapeSegments = [];
          var i;
          var len = segments.length;
          var segmentOb;
          for (i = 0; i < len; i += 1) {
            segmentOb = segments[i];
            if (!(segmentOb.e * totalModifierLength < addedLength || segmentOb.s * totalModifierLength > addedLength + shapeLength)) {
              var shapeS;
              var shapeE;
              if (segmentOb.s * totalModifierLength <= addedLength) {
                shapeS = 0;
              } else {
                shapeS = (segmentOb.s * totalModifierLength - addedLength) / shapeLength;
              }
              if (segmentOb.e * totalModifierLength >= addedLength + shapeLength) {
                shapeE = 1;
              } else {
                shapeE = (segmentOb.e * totalModifierLength - addedLength) / shapeLength;
              }
              shapeSegments.push([shapeS, shapeE]);
            }
          }
          if (!shapeSegments.length) {
            shapeSegments.push([0, 0]);
          }
          return shapeSegments;
        };
        TrimModifier.prototype.releasePathsData = function(pathsData) {
          var i;
          var len = pathsData.length;
          for (i = 0; i < len; i += 1) {
            segmentsLengthPool.release(pathsData[i]);
          }
          pathsData.length = 0;
          return pathsData;
        };
        TrimModifier.prototype.processShapes = function(_isFirstFrame) {
          var s;
          var e;
          if (this._mdf || _isFirstFrame) {
            var o = this.o.v % 360 / 360;
            if (o < 0) {
              o += 1;
            }
            if (this.s.v > 1) {
              s = 1 + o;
            } else if (this.s.v < 0) {
              s = 0 + o;
            } else {
              s = this.s.v + o;
            }
            if (this.e.v > 1) {
              e = 1 + o;
            } else if (this.e.v < 0) {
              e = 0 + o;
            } else {
              e = this.e.v + o;
            }
            if (s > e) {
              var _s = s;
              s = e;
              e = _s;
            }
            s = Math.round(s * 1e4) * 1e-4;
            e = Math.round(e * 1e4) * 1e-4;
            this.sValue = s;
            this.eValue = e;
          } else {
            s = this.sValue;
            e = this.eValue;
          }
          var shapePaths;
          var i;
          var len = this.shapes.length;
          var j;
          var jLen;
          var pathsData;
          var pathData;
          var totalShapeLength;
          var totalModifierLength = 0;
          if (e === s) {
            for (i = 0; i < len; i += 1) {
              this.shapes[i].localShapeCollection.releaseShapes();
              this.shapes[i].shape._mdf = true;
              this.shapes[i].shape.paths = this.shapes[i].localShapeCollection;
              if (this._mdf) {
                this.shapes[i].pathsData.length = 0;
              }
            }
          } else if (!(e === 1 && s === 0 || e === 0 && s === 1)) {
            var segments = [];
            var shapeData;
            var localShapeCollection;
            for (i = 0; i < len; i += 1) {
              shapeData = this.shapes[i];
              if (!shapeData.shape._mdf && !this._mdf && !_isFirstFrame && this.m !== 2) {
                shapeData.shape.paths = shapeData.localShapeCollection;
              } else {
                shapePaths = shapeData.shape.paths;
                jLen = shapePaths._length;
                totalShapeLength = 0;
                if (!shapeData.shape._mdf && shapeData.pathsData.length) {
                  totalShapeLength = shapeData.totalShapeLength;
                } else {
                  pathsData = this.releasePathsData(shapeData.pathsData);
                  for (j = 0; j < jLen; j += 1) {
                    pathData = bez.getSegmentsLength(shapePaths.shapes[j]);
                    pathsData.push(pathData);
                    totalShapeLength += pathData.totalLength;
                  }
                  shapeData.totalShapeLength = totalShapeLength;
                  shapeData.pathsData = pathsData;
                }
                totalModifierLength += totalShapeLength;
                shapeData.shape._mdf = true;
              }
            }
            var shapeS = s;
            var shapeE = e;
            var addedLength = 0;
            var edges;
            for (i = len - 1; i >= 0; i -= 1) {
              shapeData = this.shapes[i];
              if (shapeData.shape._mdf) {
                localShapeCollection = shapeData.localShapeCollection;
                localShapeCollection.releaseShapes();
                if (this.m === 2 && len > 1) {
                  edges = this.calculateShapeEdges(s, e, shapeData.totalShapeLength, addedLength, totalModifierLength);
                  addedLength += shapeData.totalShapeLength;
                } else {
                  edges = [[shapeS, shapeE]];
                }
                jLen = edges.length;
                for (j = 0; j < jLen; j += 1) {
                  shapeS = edges[j][0];
                  shapeE = edges[j][1];
                  segments.length = 0;
                  if (shapeE <= 1) {
                    segments.push({
                      s: shapeData.totalShapeLength * shapeS,
                      e: shapeData.totalShapeLength * shapeE
                    });
                  } else if (shapeS >= 1) {
                    segments.push({
                      s: shapeData.totalShapeLength * (shapeS - 1),
                      e: shapeData.totalShapeLength * (shapeE - 1)
                    });
                  } else {
                    segments.push({
                      s: shapeData.totalShapeLength * shapeS,
                      e: shapeData.totalShapeLength
                    });
                    segments.push({
                      s: 0,
                      e: shapeData.totalShapeLength * (shapeE - 1)
                    });
                  }
                  var newShapesData = this.addShapes(shapeData, segments[0]);
                  if (segments[0].s !== segments[0].e) {
                    if (segments.length > 1) {
                      var lastShapeInCollection = shapeData.shape.paths.shapes[shapeData.shape.paths._length - 1];
                      if (lastShapeInCollection.c) {
                        var lastShape = newShapesData.pop();
                        this.addPaths(newShapesData, localShapeCollection);
                        newShapesData = this.addShapes(shapeData, segments[1], lastShape);
                      } else {
                        this.addPaths(newShapesData, localShapeCollection);
                        newShapesData = this.addShapes(shapeData, segments[1]);
                      }
                    }
                    this.addPaths(newShapesData, localShapeCollection);
                  }
                }
                shapeData.shape.paths = localShapeCollection;
              }
            }
          } else if (this._mdf) {
            for (i = 0; i < len; i += 1) {
              this.shapes[i].pathsData.length = 0;
              this.shapes[i].shape._mdf = true;
            }
          }
        };
        TrimModifier.prototype.addPaths = function(newPaths, localShapeCollection) {
          var i;
          var len = newPaths.length;
          for (i = 0; i < len; i += 1) {
            localShapeCollection.addShape(newPaths[i]);
          }
        };
        TrimModifier.prototype.addSegment = function(pt1, pt2, pt3, pt4, shapePath, pos, newShape) {
          shapePath.setXYAt(pt2[0], pt2[1], "o", pos);
          shapePath.setXYAt(pt3[0], pt3[1], "i", pos + 1);
          if (newShape) {
            shapePath.setXYAt(pt1[0], pt1[1], "v", pos);
          }
          shapePath.setXYAt(pt4[0], pt4[1], "v", pos + 1);
        };
        TrimModifier.prototype.addSegmentFromArray = function(points, shapePath, pos, newShape) {
          shapePath.setXYAt(points[1], points[5], "o", pos);
          shapePath.setXYAt(points[2], points[6], "i", pos + 1);
          if (newShape) {
            shapePath.setXYAt(points[0], points[4], "v", pos);
          }
          shapePath.setXYAt(points[3], points[7], "v", pos + 1);
        };
        TrimModifier.prototype.addShapes = function(shapeData, shapeSegment, shapePath) {
          var pathsData = shapeData.pathsData;
          var shapePaths = shapeData.shape.paths.shapes;
          var i;
          var len = shapeData.shape.paths._length;
          var j;
          var jLen;
          var addedLength = 0;
          var currentLengthData;
          var segmentCount;
          var lengths;
          var segment;
          var shapes = [];
          var initPos;
          var newShape = true;
          if (!shapePath) {
            shapePath = shapePool.newElement();
            segmentCount = 0;
            initPos = 0;
          } else {
            segmentCount = shapePath._length;
            initPos = shapePath._length;
          }
          shapes.push(shapePath);
          for (i = 0; i < len; i += 1) {
            lengths = pathsData[i].lengths;
            shapePath.c = shapePaths[i].c;
            jLen = shapePaths[i].c ? lengths.length : lengths.length + 1;
            for (j = 1; j < jLen; j += 1) {
              currentLengthData = lengths[j - 1];
              if (addedLength + currentLengthData.addedLength < shapeSegment.s) {
                addedLength += currentLengthData.addedLength;
                shapePath.c = false;
              } else if (addedLength > shapeSegment.e) {
                shapePath.c = false;
                break;
              } else {
                if (shapeSegment.s <= addedLength && shapeSegment.e >= addedLength + currentLengthData.addedLength) {
                  this.addSegment(shapePaths[i].v[j - 1], shapePaths[i].o[j - 1], shapePaths[i].i[j], shapePaths[i].v[j], shapePath, segmentCount, newShape);
                  newShape = false;
                } else {
                  segment = bez.getNewSegment(shapePaths[i].v[j - 1], shapePaths[i].v[j], shapePaths[i].o[j - 1], shapePaths[i].i[j], (shapeSegment.s - addedLength) / currentLengthData.addedLength, (shapeSegment.e - addedLength) / currentLengthData.addedLength, lengths[j - 1]);
                  this.addSegmentFromArray(segment, shapePath, segmentCount, newShape);
                  newShape = false;
                  shapePath.c = false;
                }
                addedLength += currentLengthData.addedLength;
                segmentCount += 1;
              }
            }
            if (shapePaths[i].c && lengths.length) {
              currentLengthData = lengths[j - 1];
              if (addedLength <= shapeSegment.e) {
                var segmentLength = lengths[j - 1].addedLength;
                if (shapeSegment.s <= addedLength && shapeSegment.e >= addedLength + segmentLength) {
                  this.addSegment(shapePaths[i].v[j - 1], shapePaths[i].o[j - 1], shapePaths[i].i[0], shapePaths[i].v[0], shapePath, segmentCount, newShape);
                  newShape = false;
                } else {
                  segment = bez.getNewSegment(shapePaths[i].v[j - 1], shapePaths[i].v[0], shapePaths[i].o[j - 1], shapePaths[i].i[0], (shapeSegment.s - addedLength) / segmentLength, (shapeSegment.e - addedLength) / segmentLength, lengths[j - 1]);
                  this.addSegmentFromArray(segment, shapePath, segmentCount, newShape);
                  newShape = false;
                  shapePath.c = false;
                }
              } else {
                shapePath.c = false;
              }
              addedLength += currentLengthData.addedLength;
              segmentCount += 1;
            }
            if (shapePath._length) {
              shapePath.setXYAt(shapePath.v[initPos][0], shapePath.v[initPos][1], "i", initPos);
              shapePath.setXYAt(shapePath.v[shapePath._length - 1][0], shapePath.v[shapePath._length - 1][1], "o", shapePath._length - 1);
            }
            if (addedLength > shapeSegment.e) {
              break;
            }
            if (i < len - 1) {
              shapePath = shapePool.newElement();
              newShape = true;
              shapes.push(shapePath);
              segmentCount = 0;
            }
          }
          return shapes;
        };
        ShapeModifiers.registerModifier("tm", TrimModifier);
        function RoundCornersModifier() {
        }
        extendPrototype([ShapeModifier], RoundCornersModifier);
        RoundCornersModifier.prototype.initModifierProperties = function(elem2, data2) {
          this.getValue = this.processKeys;
          this.rd = PropertyFactory.getProp(elem2, data2.r, 0, null, this);
          this._isAnimated = !!this.rd.effectsSequence.length;
        };
        RoundCornersModifier.prototype.processPath = function(path, round) {
          var clonedPath = shapePool.newElement();
          clonedPath.c = path.c;
          var i;
          var len = path._length;
          var currentV;
          var currentI;
          var currentO;
          var closerV;
          var distance;
          var newPosPerc;
          var index2 = 0;
          var vX;
          var vY;
          var oX;
          var oY;
          var iX;
          var iY;
          for (i = 0; i < len; i += 1) {
            currentV = path.v[i];
            currentO = path.o[i];
            currentI = path.i[i];
            if (currentV[0] === currentO[0] && currentV[1] === currentO[1] && currentV[0] === currentI[0] && currentV[1] === currentI[1]) {
              if ((i === 0 || i === len - 1) && !path.c) {
                clonedPath.setTripleAt(currentV[0], currentV[1], currentO[0], currentO[1], currentI[0], currentI[1], index2);
                index2 += 1;
              } else {
                if (i === 0) {
                  closerV = path.v[len - 1];
                } else {
                  closerV = path.v[i - 1];
                }
                distance = Math.sqrt(Math.pow(currentV[0] - closerV[0], 2) + Math.pow(currentV[1] - closerV[1], 2));
                newPosPerc = distance ? Math.min(distance / 2, round) / distance : 0;
                iX = currentV[0] + (closerV[0] - currentV[0]) * newPosPerc;
                vX = iX;
                iY = currentV[1] - (currentV[1] - closerV[1]) * newPosPerc;
                vY = iY;
                oX = vX - (vX - currentV[0]) * roundCorner;
                oY = vY - (vY - currentV[1]) * roundCorner;
                clonedPath.setTripleAt(vX, vY, oX, oY, iX, iY, index2);
                index2 += 1;
                if (i === len - 1) {
                  closerV = path.v[0];
                } else {
                  closerV = path.v[i + 1];
                }
                distance = Math.sqrt(Math.pow(currentV[0] - closerV[0], 2) + Math.pow(currentV[1] - closerV[1], 2));
                newPosPerc = distance ? Math.min(distance / 2, round) / distance : 0;
                oX = currentV[0] + (closerV[0] - currentV[0]) * newPosPerc;
                vX = oX;
                oY = currentV[1] + (closerV[1] - currentV[1]) * newPosPerc;
                vY = oY;
                iX = vX - (vX - currentV[0]) * roundCorner;
                iY = vY - (vY - currentV[1]) * roundCorner;
                clonedPath.setTripleAt(vX, vY, oX, oY, iX, iY, index2);
                index2 += 1;
              }
            } else {
              clonedPath.setTripleAt(path.v[i][0], path.v[i][1], path.o[i][0], path.o[i][1], path.i[i][0], path.i[i][1], index2);
              index2 += 1;
            }
          }
          return clonedPath;
        };
        RoundCornersModifier.prototype.processShapes = function(_isFirstFrame) {
          var shapePaths;
          var i;
          var len = this.shapes.length;
          var j;
          var jLen;
          var rd = this.rd.v;
          if (rd !== 0) {
            var shapeData;
            var localShapeCollection;
            for (i = 0; i < len; i += 1) {
              shapeData = this.shapes[i];
              localShapeCollection = shapeData.localShapeCollection;
              if (!(!shapeData.shape._mdf && !this._mdf && !_isFirstFrame)) {
                localShapeCollection.releaseShapes();
                shapeData.shape._mdf = true;
                shapePaths = shapeData.shape.paths.shapes;
                jLen = shapeData.shape.paths._length;
                for (j = 0; j < jLen; j += 1) {
                  localShapeCollection.addShape(this.processPath(shapePaths[j], rd));
                }
              }
              shapeData.shape.paths = shapeData.localShapeCollection;
            }
          }
          if (!this.dynamicProperties.length) {
            this._mdf = false;
          }
        };
        ShapeModifiers.registerModifier("rd", RoundCornersModifier);
        function PuckerAndBloatModifier() {
        }
        extendPrototype([ShapeModifier], PuckerAndBloatModifier);
        PuckerAndBloatModifier.prototype.initModifierProperties = function(elem2, data2) {
          this.getValue = this.processKeys;
          this.amount = PropertyFactory.getProp(elem2, data2.a, 0, null, this);
          this._isAnimated = !!this.amount.effectsSequence.length;
        };
        PuckerAndBloatModifier.prototype.processPath = function(path, amount) {
          var percent = amount / 100;
          var centerPoint = [0, 0];
          var pathLength = path._length;
          var i = 0;
          for (i = 0; i < pathLength; i += 1) {
            centerPoint[0] += path.v[i][0];
            centerPoint[1] += path.v[i][1];
          }
          centerPoint[0] /= pathLength;
          centerPoint[1] /= pathLength;
          var clonedPath = shapePool.newElement();
          clonedPath.c = path.c;
          var vX;
          var vY;
          var oX;
          var oY;
          var iX;
          var iY;
          for (i = 0; i < pathLength; i += 1) {
            vX = path.v[i][0] + (centerPoint[0] - path.v[i][0]) * percent;
            vY = path.v[i][1] + (centerPoint[1] - path.v[i][1]) * percent;
            oX = path.o[i][0] + (centerPoint[0] - path.o[i][0]) * -percent;
            oY = path.o[i][1] + (centerPoint[1] - path.o[i][1]) * -percent;
            iX = path.i[i][0] + (centerPoint[0] - path.i[i][0]) * -percent;
            iY = path.i[i][1] + (centerPoint[1] - path.i[i][1]) * -percent;
            clonedPath.setTripleAt(vX, vY, oX, oY, iX, iY, i);
          }
          return clonedPath;
        };
        PuckerAndBloatModifier.prototype.processShapes = function(_isFirstFrame) {
          var shapePaths;
          var i;
          var len = this.shapes.length;
          var j;
          var jLen;
          var amount = this.amount.v;
          if (amount !== 0) {
            var shapeData;
            var localShapeCollection;
            for (i = 0; i < len; i += 1) {
              shapeData = this.shapes[i];
              localShapeCollection = shapeData.localShapeCollection;
              if (!(!shapeData.shape._mdf && !this._mdf && !_isFirstFrame)) {
                localShapeCollection.releaseShapes();
                shapeData.shape._mdf = true;
                shapePaths = shapeData.shape.paths.shapes;
                jLen = shapeData.shape.paths._length;
                for (j = 0; j < jLen; j += 1) {
                  localShapeCollection.addShape(this.processPath(shapePaths[j], amount));
                }
              }
              shapeData.shape.paths = shapeData.localShapeCollection;
            }
          }
          if (!this.dynamicProperties.length) {
            this._mdf = false;
          }
        };
        ShapeModifiers.registerModifier("pb", PuckerAndBloatModifier);
        function RepeaterModifier() {
        }
        extendPrototype([ShapeModifier], RepeaterModifier);
        RepeaterModifier.prototype.initModifierProperties = function(elem2, data2) {
          this.getValue = this.processKeys;
          this.c = PropertyFactory.getProp(elem2, data2.c, 0, null, this);
          this.o = PropertyFactory.getProp(elem2, data2.o, 0, null, this);
          this.tr = TransformPropertyFactory.getTransformProperty(elem2, data2.tr, this);
          this.so = PropertyFactory.getProp(elem2, data2.tr.so, 0, 0.01, this);
          this.eo = PropertyFactory.getProp(elem2, data2.tr.eo, 0, 0.01, this);
          this.data = data2;
          if (!this.dynamicProperties.length) {
            this.getValue(true);
          }
          this._isAnimated = !!this.dynamicProperties.length;
          this.pMatrix = new Matrix();
          this.rMatrix = new Matrix();
          this.sMatrix = new Matrix();
          this.tMatrix = new Matrix();
          this.matrix = new Matrix();
        };
        RepeaterModifier.prototype.applyTransforms = function(pMatrix, rMatrix, sMatrix, transform2, perc, inv) {
          var dir = inv ? -1 : 1;
          var scaleX = transform2.s.v[0] + (1 - transform2.s.v[0]) * (1 - perc);
          var scaleY = transform2.s.v[1] + (1 - transform2.s.v[1]) * (1 - perc);
          pMatrix.translate(transform2.p.v[0] * dir * perc, transform2.p.v[1] * dir * perc, transform2.p.v[2]);
          rMatrix.translate(-transform2.a.v[0], -transform2.a.v[1], transform2.a.v[2]);
          rMatrix.rotate(-transform2.r.v * dir * perc);
          rMatrix.translate(transform2.a.v[0], transform2.a.v[1], transform2.a.v[2]);
          sMatrix.translate(-transform2.a.v[0], -transform2.a.v[1], transform2.a.v[2]);
          sMatrix.scale(inv ? 1 / scaleX : scaleX, inv ? 1 / scaleY : scaleY);
          sMatrix.translate(transform2.a.v[0], transform2.a.v[1], transform2.a.v[2]);
        };
        RepeaterModifier.prototype.init = function(elem2, arr, pos, elemsData) {
          this.elem = elem2;
          this.arr = arr;
          this.pos = pos;
          this.elemsData = elemsData;
          this._currentCopies = 0;
          this._elements = [];
          this._groups = [];
          this.frameId = -1;
          this.initDynamicPropertyContainer(elem2);
          this.initModifierProperties(elem2, arr[pos]);
          while (pos > 0) {
            pos -= 1;
            this._elements.unshift(arr[pos]);
          }
          if (this.dynamicProperties.length) {
            this.k = true;
          } else {
            this.getValue(true);
          }
        };
        RepeaterModifier.prototype.resetElements = function(elements) {
          var i;
          var len = elements.length;
          for (i = 0; i < len; i += 1) {
            elements[i]._processed = false;
            if (elements[i].ty === "gr") {
              this.resetElements(elements[i].it);
            }
          }
        };
        RepeaterModifier.prototype.cloneElements = function(elements) {
          var newElements = JSON.parse(JSON.stringify(elements));
          this.resetElements(newElements);
          return newElements;
        };
        RepeaterModifier.prototype.changeGroupRender = function(elements, renderFlag) {
          var i;
          var len = elements.length;
          for (i = 0; i < len; i += 1) {
            elements[i]._render = renderFlag;
            if (elements[i].ty === "gr") {
              this.changeGroupRender(elements[i].it, renderFlag);
            }
          }
        };
        RepeaterModifier.prototype.processShapes = function(_isFirstFrame) {
          var items;
          var itemsTransform;
          var i;
          var dir;
          var cont;
          var hasReloaded = false;
          if (this._mdf || _isFirstFrame) {
            var copies = Math.ceil(this.c.v);
            if (this._groups.length < copies) {
              while (this._groups.length < copies) {
                var group = {
                  it: this.cloneElements(this._elements),
                  ty: "gr"
                };
                group.it.push({
                  a: { a: 0, ix: 1, k: [0, 0] },
                  nm: "Transform",
                  o: { a: 0, ix: 7, k: 100 },
                  p: { a: 0, ix: 2, k: [0, 0] },
                  r: { a: 1, ix: 6, k: [{ s: 0, e: 0, t: 0 }, { s: 0, e: 0, t: 1 }] },
                  s: { a: 0, ix: 3, k: [100, 100] },
                  sa: { a: 0, ix: 5, k: 0 },
                  sk: { a: 0, ix: 4, k: 0 },
                  ty: "tr"
                });
                this.arr.splice(0, 0, group);
                this._groups.splice(0, 0, group);
                this._currentCopies += 1;
              }
              this.elem.reloadShapes();
              hasReloaded = true;
            }
            cont = 0;
            var renderFlag;
            for (i = 0; i <= this._groups.length - 1; i += 1) {
              renderFlag = cont < copies;
              this._groups[i]._render = renderFlag;
              this.changeGroupRender(this._groups[i].it, renderFlag);
              if (!renderFlag) {
                var elems = this.elemsData[i].it;
                var transformData = elems[elems.length - 1];
                if (transformData.transform.op.v !== 0) {
                  transformData.transform.op._mdf = true;
                  transformData.transform.op.v = 0;
                } else {
                  transformData.transform.op._mdf = false;
                }
              }
              cont += 1;
            }
            this._currentCopies = copies;
            var offset = this.o.v;
            var offsetModulo = offset % 1;
            var roundOffset = offset > 0 ? Math.floor(offset) : Math.ceil(offset);
            var pProps = this.pMatrix.props;
            var rProps = this.rMatrix.props;
            var sProps = this.sMatrix.props;
            this.pMatrix.reset();
            this.rMatrix.reset();
            this.sMatrix.reset();
            this.tMatrix.reset();
            this.matrix.reset();
            var iteration = 0;
            if (offset > 0) {
              while (iteration < roundOffset) {
                this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, false);
                iteration += 1;
              }
              if (offsetModulo) {
                this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, offsetModulo, false);
                iteration += offsetModulo;
              }
            } else if (offset < 0) {
              while (iteration > roundOffset) {
                this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, true);
                iteration -= 1;
              }
              if (offsetModulo) {
                this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -offsetModulo, true);
                iteration -= offsetModulo;
              }
            }
            i = this.data.m === 1 ? 0 : this._currentCopies - 1;
            dir = this.data.m === 1 ? 1 : -1;
            cont = this._currentCopies;
            var j;
            var jLen;
            while (cont) {
              items = this.elemsData[i].it;
              itemsTransform = items[items.length - 1].transform.mProps.v.props;
              jLen = itemsTransform.length;
              items[items.length - 1].transform.mProps._mdf = true;
              items[items.length - 1].transform.op._mdf = true;
              items[items.length - 1].transform.op.v = this._currentCopies === 1 ? this.so.v : this.so.v + (this.eo.v - this.so.v) * (i / (this._currentCopies - 1));
              if (iteration !== 0) {
                if (i !== 0 && dir === 1 || i !== this._currentCopies - 1 && dir === -1) {
                  this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, false);
                }
                this.matrix.transform(rProps[0], rProps[1], rProps[2], rProps[3], rProps[4], rProps[5], rProps[6], rProps[7], rProps[8], rProps[9], rProps[10], rProps[11], rProps[12], rProps[13], rProps[14], rProps[15]);
                this.matrix.transform(sProps[0], sProps[1], sProps[2], sProps[3], sProps[4], sProps[5], sProps[6], sProps[7], sProps[8], sProps[9], sProps[10], sProps[11], sProps[12], sProps[13], sProps[14], sProps[15]);
                this.matrix.transform(pProps[0], pProps[1], pProps[2], pProps[3], pProps[4], pProps[5], pProps[6], pProps[7], pProps[8], pProps[9], pProps[10], pProps[11], pProps[12], pProps[13], pProps[14], pProps[15]);
                for (j = 0; j < jLen; j += 1) {
                  itemsTransform[j] = this.matrix.props[j];
                }
                this.matrix.reset();
              } else {
                this.matrix.reset();
                for (j = 0; j < jLen; j += 1) {
                  itemsTransform[j] = this.matrix.props[j];
                }
              }
              iteration += 1;
              cont -= 1;
              i += dir;
            }
          } else {
            cont = this._currentCopies;
            i = 0;
            dir = 1;
            while (cont) {
              items = this.elemsData[i].it;
              itemsTransform = items[items.length - 1].transform.mProps.v.props;
              items[items.length - 1].transform.mProps._mdf = false;
              items[items.length - 1].transform.op._mdf = false;
              cont -= 1;
              i += dir;
            }
          }
          return hasReloaded;
        };
        RepeaterModifier.prototype.addShape = function() {
        };
        ShapeModifiers.registerModifier("rp", RepeaterModifier);
        function ShapeCollection() {
          this._length = 0;
          this._maxLength = 4;
          this.shapes = createSizedArray(this._maxLength);
        }
        ShapeCollection.prototype.addShape = function(shapeData) {
          if (this._length === this._maxLength) {
            this.shapes = this.shapes.concat(createSizedArray(this._maxLength));
            this._maxLength *= 2;
          }
          this.shapes[this._length] = shapeData;
          this._length += 1;
        };
        ShapeCollection.prototype.releaseShapes = function() {
          var i;
          for (i = 0; i < this._length; i += 1) {
            shapePool.release(this.shapes[i]);
          }
          this._length = 0;
        };
        function DashProperty(elem2, data2, renderer2, container) {
          this.elem = elem2;
          this.frameId = -1;
          this.dataProps = createSizedArray(data2.length);
          this.renderer = renderer2;
          this.k = false;
          this.dashStr = "";
          this.dashArray = createTypedArray("float32", data2.length ? data2.length - 1 : 0);
          this.dashoffset = createTypedArray("float32", 1);
          this.initDynamicPropertyContainer(container);
          var i;
          var len = data2.length || 0;
          var prop;
          for (i = 0; i < len; i += 1) {
            prop = PropertyFactory.getProp(elem2, data2[i].v, 0, 0, this);
            this.k = prop.k || this.k;
            this.dataProps[i] = { n: data2[i].n, p: prop };
          }
          if (!this.k) {
            this.getValue(true);
          }
          this._isAnimated = this.k;
        }
        DashProperty.prototype.getValue = function(forceRender) {
          if (this.elem.globalData.frameId === this.frameId && !forceRender) {
            return;
          }
          this.frameId = this.elem.globalData.frameId;
          this.iterateDynamicProperties();
          this._mdf = this._mdf || forceRender;
          if (this._mdf) {
            var i = 0;
            var len = this.dataProps.length;
            if (this.renderer === "svg") {
              this.dashStr = "";
            }
            for (i = 0; i < len; i += 1) {
              if (this.dataProps[i].n !== "o") {
                if (this.renderer === "svg") {
                  this.dashStr += " " + this.dataProps[i].p.v;
                } else {
                  this.dashArray[i] = this.dataProps[i].p.v;
                }
              } else {
                this.dashoffset[0] = this.dataProps[i].p.v;
              }
            }
          }
        };
        extendPrototype([DynamicPropertyContainer], DashProperty);
        function GradientProperty(elem2, data2, container) {
          this.data = data2;
          this.c = createTypedArray("uint8c", data2.p * 4);
          var cLength = data2.k.k[0].s ? data2.k.k[0].s.length - data2.p * 4 : data2.k.k.length - data2.p * 4;
          this.o = createTypedArray("float32", cLength);
          this._cmdf = false;
          this._omdf = false;
          this._collapsable = this.checkCollapsable();
          this._hasOpacity = cLength;
          this.initDynamicPropertyContainer(container);
          this.prop = PropertyFactory.getProp(elem2, data2.k, 1, null, this);
          this.k = this.prop.k;
          this.getValue(true);
        }
        GradientProperty.prototype.comparePoints = function(values, points) {
          var i = 0;
          var len = this.o.length / 2;
          var diff;
          while (i < len) {
            diff = Math.abs(values[i * 4] - values[points * 4 + i * 2]);
            if (diff > 0.01) {
              return false;
            }
            i += 1;
          }
          return true;
        };
        GradientProperty.prototype.checkCollapsable = function() {
          if (this.o.length / 2 !== this.c.length / 4) {
            return false;
          }
          if (this.data.k.k[0].s) {
            var i = 0;
            var len = this.data.k.k.length;
            while (i < len) {
              if (!this.comparePoints(this.data.k.k[i].s, this.data.p)) {
                return false;
              }
              i += 1;
            }
          } else if (!this.comparePoints(this.data.k.k, this.data.p)) {
            return false;
          }
          return true;
        };
        GradientProperty.prototype.getValue = function(forceRender) {
          this.prop.getValue();
          this._mdf = false;
          this._cmdf = false;
          this._omdf = false;
          if (this.prop._mdf || forceRender) {
            var i;
            var len = this.data.p * 4;
            var mult;
            var val2;
            for (i = 0; i < len; i += 1) {
              mult = i % 4 === 0 ? 100 : 255;
              val2 = Math.round(this.prop.v[i] * mult);
              if (this.c[i] !== val2) {
                this.c[i] = val2;
                this._cmdf = !forceRender;
              }
            }
            if (this.o.length) {
              len = this.prop.v.length;
              for (i = this.data.p * 4; i < len; i += 1) {
                mult = i % 2 === 0 ? 100 : 1;
                val2 = i % 2 === 0 ? Math.round(this.prop.v[i] * 100) : this.prop.v[i];
                if (this.o[i - this.data.p * 4] !== val2) {
                  this.o[i - this.data.p * 4] = val2;
                  this._omdf = !forceRender;
                }
              }
            }
            this._mdf = !forceRender;
          }
        };
        extendPrototype([DynamicPropertyContainer], GradientProperty);
        var buildShapeString = function(pathNodes, length2, closed, mat) {
          if (length2 === 0) {
            return "";
          }
          var _o = pathNodes.o;
          var _i = pathNodes.i;
          var _v = pathNodes.v;
          var i;
          var shapeString = " M" + mat.applyToPointStringified(_v[0][0], _v[0][1]);
          for (i = 1; i < length2; i += 1) {
            shapeString += " C" + mat.applyToPointStringified(_o[i - 1][0], _o[i - 1][1]) + " " + mat.applyToPointStringified(_i[i][0], _i[i][1]) + " " + mat.applyToPointStringified(_v[i][0], _v[i][1]);
          }
          if (closed && length2) {
            shapeString += " C" + mat.applyToPointStringified(_o[i - 1][0], _o[i - 1][1]) + " " + mat.applyToPointStringified(_i[0][0], _i[0][1]) + " " + mat.applyToPointStringified(_v[0][0], _v[0][1]);
            shapeString += "z";
          }
          return shapeString;
        };
        var audioControllerFactory = function() {
          function AudioController(audioFactory) {
            this.audios = [];
            this.audioFactory = audioFactory;
            this._volume = 1;
            this._isMuted = false;
          }
          AudioController.prototype = {
            addAudio: function(audio) {
              this.audios.push(audio);
            },
            pause: function() {
              var i;
              var len = this.audios.length;
              for (i = 0; i < len; i += 1) {
                this.audios[i].pause();
              }
            },
            resume: function() {
              var i;
              var len = this.audios.length;
              for (i = 0; i < len; i += 1) {
                this.audios[i].resume();
              }
            },
            setRate: function(rateValue) {
              var i;
              var len = this.audios.length;
              for (i = 0; i < len; i += 1) {
                this.audios[i].setRate(rateValue);
              }
            },
            createAudio: function(assetPath) {
              if (this.audioFactory) {
                return this.audioFactory(assetPath);
              }
              if (Howl) {
                return new Howl({
                  src: [assetPath]
                });
              }
              return {
                isPlaying: false,
                play: function() {
                  this.isPlaying = true;
                },
                seek: function() {
                  this.isPlaying = false;
                },
                playing: function() {
                },
                rate: function() {
                },
                setVolume: function() {
                }
              };
            },
            setAudioFactory: function(audioFactory) {
              this.audioFactory = audioFactory;
            },
            setVolume: function(value2) {
              this._volume = value2;
              this._updateVolume();
            },
            mute: function() {
              this._isMuted = true;
              this._updateVolume();
            },
            unmute: function() {
              this._isMuted = false;
              this._updateVolume();
            },
            getVolume: function() {
              return this._volume;
            },
            _updateVolume: function() {
              var i;
              var len = this.audios.length;
              for (i = 0; i < len; i += 1) {
                this.audios[i].volume(this._volume * (this._isMuted ? 0 : 1));
              }
            }
          };
          return function() {
            return new AudioController();
          };
        }();
        var ImagePreloader = function() {
          var proxyImage = function() {
            var canvas = createTag("canvas");
            canvas.width = 1;
            canvas.height = 1;
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = "rgba(0,0,0,0)";
            ctx.fillRect(0, 0, 1, 1);
            return canvas;
          }();
          function imageLoaded() {
            this.loadedAssets += 1;
            if (this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages) {
              if (this.imagesLoadedCb) {
                this.imagesLoadedCb(null);
              }
            }
          }
          function footageLoaded() {
            this.loadedFootagesCount += 1;
            if (this.loadedAssets === this.totalImages && this.loadedFootagesCount === this.totalFootages) {
              if (this.imagesLoadedCb) {
                this.imagesLoadedCb(null);
              }
            }
          }
          function getAssetsPath(assetData, assetsPath, originalPath) {
            var path = "";
            if (assetData.e) {
              path = assetData.p;
            } else if (assetsPath) {
              var imagePath = assetData.p;
              if (imagePath.indexOf("images/") !== -1) {
                imagePath = imagePath.split("/")[1];
              }
              path = assetsPath + imagePath;
            } else {
              path = originalPath;
              path += assetData.u ? assetData.u : "";
              path += assetData.p;
            }
            return path;
          }
          function testImageLoaded(img) {
            var _count = 0;
            var intervalId = setInterval(function() {
              var box = img.getBBox();
              if (box.width || _count > 500) {
                this._imageLoaded();
                clearInterval(intervalId);
              }
              _count += 1;
            }.bind(this), 50);
          }
          function createImageData(assetData) {
            var path = getAssetsPath(assetData, this.assetsPath, this.path);
            var img = createNS("image");
            if (isSafari) {
              this.testImageLoaded(img);
            } else {
              img.addEventListener("load", this._imageLoaded, false);
            }
            img.addEventListener("error", function() {
              ob2.img = proxyImage;
              this._imageLoaded();
            }.bind(this), false);
            img.setAttributeNS("http://www.w3.org/1999/xlink", "href", path);
            if (this._elementHelper.append) {
              this._elementHelper.append(img);
            } else {
              this._elementHelper.appendChild(img);
            }
            var ob2 = {
              img,
              assetData
            };
            return ob2;
          }
          function createImgData(assetData) {
            var path = getAssetsPath(assetData, this.assetsPath, this.path);
            var img = createTag("img");
            img.crossOrigin = "anonymous";
            img.addEventListener("load", this._imageLoaded, false);
            img.addEventListener("error", function() {
              ob2.img = proxyImage;
              this._imageLoaded();
            }.bind(this), false);
            img.src = path;
            var ob2 = {
              img,
              assetData
            };
            return ob2;
          }
          function createFootageData(data2) {
            var ob2 = {
              assetData: data2
            };
            var path = getAssetsPath(data2, this.assetsPath, this.path);
            dataManager.loadData(path, function(footageData) {
              ob2.img = footageData;
              this._footageLoaded();
            }.bind(this), function() {
              ob2.img = {};
              this._footageLoaded();
            }.bind(this));
            return ob2;
          }
          function loadAssets(assets, cb) {
            this.imagesLoadedCb = cb;
            var i;
            var len = assets.length;
            for (i = 0; i < len; i += 1) {
              if (!assets[i].layers) {
                if (!assets[i].t || assets[i].t === "seq") {
                  this.totalImages += 1;
                  this.images.push(this._createImageData(assets[i]));
                } else if (assets[i].t === 3) {
                  this.totalFootages += 1;
                  this.images.push(this.createFootageData(assets[i]));
                }
              }
            }
          }
          function setPath(path) {
            this.path = path || "";
          }
          function setAssetsPath(path) {
            this.assetsPath = path || "";
          }
          function getAsset(assetData) {
            var i = 0;
            var len = this.images.length;
            while (i < len) {
              if (this.images[i].assetData === assetData) {
                return this.images[i].img;
              }
              i += 1;
            }
            return null;
          }
          function destroy() {
            this.imagesLoadedCb = null;
            this.images.length = 0;
          }
          function loadedImages() {
            return this.totalImages === this.loadedAssets;
          }
          function loadedFootages() {
            return this.totalFootages === this.loadedFootagesCount;
          }
          function setCacheType(type, elementHelper) {
            if (type === "svg") {
              this._elementHelper = elementHelper;
              this._createImageData = this.createImageData.bind(this);
            } else {
              this._createImageData = this.createImgData.bind(this);
            }
          }
          function ImagePreloaderFactory() {
            this._imageLoaded = imageLoaded.bind(this);
            this._footageLoaded = footageLoaded.bind(this);
            this.testImageLoaded = testImageLoaded.bind(this);
            this.createFootageData = createFootageData.bind(this);
            this.assetsPath = "";
            this.path = "";
            this.totalImages = 0;
            this.totalFootages = 0;
            this.loadedAssets = 0;
            this.loadedFootagesCount = 0;
            this.imagesLoadedCb = null;
            this.images = [];
          }
          ImagePreloaderFactory.prototype = {
            loadAssets,
            setAssetsPath,
            setPath,
            loadedImages,
            loadedFootages,
            destroy,
            getAsset,
            createImgData,
            createImageData,
            imageLoaded,
            footageLoaded,
            setCacheType
          };
          return ImagePreloaderFactory;
        }();
        var featureSupport = function() {
          var ob2 = {
            maskType: true
          };
          if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent) || /Edge\/\d./i.test(navigator.userAgent)) {
            ob2.maskType = false;
          }
          return ob2;
        }();
        var filtersFactory = function() {
          var ob2 = {};
          ob2.createFilter = createFilter;
          ob2.createAlphaToLuminanceFilter = createAlphaToLuminanceFilter;
          function createFilter(filId, skipCoordinates) {
            var fil = createNS("filter");
            fil.setAttribute("id", filId);
            if (skipCoordinates !== true) {
              fil.setAttribute("filterUnits", "objectBoundingBox");
              fil.setAttribute("x", "0%");
              fil.setAttribute("y", "0%");
              fil.setAttribute("width", "100%");
              fil.setAttribute("height", "100%");
            }
            return fil;
          }
          function createAlphaToLuminanceFilter() {
            var feColorMatrix = createNS("feColorMatrix");
            feColorMatrix.setAttribute("type", "matrix");
            feColorMatrix.setAttribute("color-interpolation-filters", "sRGB");
            feColorMatrix.setAttribute("values", "0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1");
            return feColorMatrix;
          }
          return ob2;
        }();
        function TextAnimatorProperty(textData, renderType, elem2) {
          this._isFirstFrame = true;
          this._hasMaskedPath = false;
          this._frameId = -1;
          this._textData = textData;
          this._renderType = renderType;
          this._elem = elem2;
          this._animatorsData = createSizedArray(this._textData.a.length);
          this._pathData = {};
          this._moreOptions = {
            alignment: {}
          };
          this.renderedLetters = [];
          this.lettersChangedFlag = false;
          this.initDynamicPropertyContainer(elem2);
        }
        TextAnimatorProperty.prototype.searchProperties = function() {
          var i;
          var len = this._textData.a.length;
          var animatorProps;
          var getProp = PropertyFactory.getProp;
          for (i = 0; i < len; i += 1) {
            animatorProps = this._textData.a[i];
            this._animatorsData[i] = new TextAnimatorDataProperty(this._elem, animatorProps, this);
          }
          if (this._textData.p && "m" in this._textData.p) {
            this._pathData = {
              a: getProp(this._elem, this._textData.p.a, 0, 0, this),
              f: getProp(this._elem, this._textData.p.f, 0, 0, this),
              l: getProp(this._elem, this._textData.p.l, 0, 0, this),
              r: getProp(this._elem, this._textData.p.r, 0, 0, this),
              p: getProp(this._elem, this._textData.p.p, 0, 0, this),
              m: this._elem.maskManager.getMaskProperty(this._textData.p.m)
            };
            this._hasMaskedPath = true;
          } else {
            this._hasMaskedPath = false;
          }
          this._moreOptions.alignment = getProp(this._elem, this._textData.m.a, 1, 0, this);
        };
        TextAnimatorProperty.prototype.getMeasures = function(documentData, lettersChangedFlag) {
          this.lettersChangedFlag = lettersChangedFlag;
          if (!this._mdf && !this._isFirstFrame && !lettersChangedFlag && (!this._hasMaskedPath || !this._pathData.m._mdf)) {
            return;
          }
          this._isFirstFrame = false;
          var alignment = this._moreOptions.alignment.v;
          var animators = this._animatorsData;
          var textData = this._textData;
          var matrixHelper = this.mHelper;
          var renderType = this._renderType;
          var renderedLettersCount = this.renderedLetters.length;
          var xPos;
          var yPos;
          var i;
          var len;
          var letters = documentData.l;
          var pathInfo;
          var currentLength;
          var currentPoint;
          var segmentLength;
          var flag;
          var pointInd;
          var segmentInd;
          var prevPoint;
          var points;
          var segments;
          var partialLength;
          var totalLength;
          var perc;
          var tanAngle;
          var mask2;
          if (this._hasMaskedPath) {
            mask2 = this._pathData.m;
            if (!this._pathData.n || this._pathData._mdf) {
              var paths = mask2.v;
              if (this._pathData.r.v) {
                paths = paths.reverse();
              }
              pathInfo = {
                tLength: 0,
                segments: []
              };
              len = paths._length - 1;
              var bezierData;
              totalLength = 0;
              for (i = 0; i < len; i += 1) {
                bezierData = bez.buildBezierData(
                  paths.v[i],
                  paths.v[i + 1],
                  [paths.o[i][0] - paths.v[i][0], paths.o[i][1] - paths.v[i][1]],
                  [paths.i[i + 1][0] - paths.v[i + 1][0], paths.i[i + 1][1] - paths.v[i + 1][1]]
                );
                pathInfo.tLength += bezierData.segmentLength;
                pathInfo.segments.push(bezierData);
                totalLength += bezierData.segmentLength;
              }
              i = len;
              if (mask2.v.c) {
                bezierData = bez.buildBezierData(
                  paths.v[i],
                  paths.v[0],
                  [paths.o[i][0] - paths.v[i][0], paths.o[i][1] - paths.v[i][1]],
                  [paths.i[0][0] - paths.v[0][0], paths.i[0][1] - paths.v[0][1]]
                );
                pathInfo.tLength += bezierData.segmentLength;
                pathInfo.segments.push(bezierData);
                totalLength += bezierData.segmentLength;
              }
              this._pathData.pi = pathInfo;
            }
            pathInfo = this._pathData.pi;
            currentLength = this._pathData.f.v;
            segmentInd = 0;
            pointInd = 1;
            segmentLength = 0;
            flag = true;
            segments = pathInfo.segments;
            if (currentLength < 0 && mask2.v.c) {
              if (pathInfo.tLength < Math.abs(currentLength)) {
                currentLength = -Math.abs(currentLength) % pathInfo.tLength;
              }
              segmentInd = segments.length - 1;
              points = segments[segmentInd].points;
              pointInd = points.length - 1;
              while (currentLength < 0) {
                currentLength += points[pointInd].partialLength;
                pointInd -= 1;
                if (pointInd < 0) {
                  segmentInd -= 1;
                  points = segments[segmentInd].points;
                  pointInd = points.length - 1;
                }
              }
            }
            points = segments[segmentInd].points;
            prevPoint = points[pointInd - 1];
            currentPoint = points[pointInd];
            partialLength = currentPoint.partialLength;
          }
          len = letters.length;
          xPos = 0;
          yPos = 0;
          var yOff = documentData.finalSize * 1.2 * 0.714;
          var firstLine = true;
          var animatorProps;
          var animatorSelector;
          var j;
          var jLen;
          var letterValue;
          jLen = animators.length;
          var mult;
          var ind = -1;
          var offf;
          var xPathPos;
          var yPathPos;
          var initPathPos = currentLength;
          var initSegmentInd = segmentInd;
          var initPointInd = pointInd;
          var currentLine = -1;
          var elemOpacity;
          var sc;
          var sw;
          var fc;
          var k;
          var letterSw;
          var letterSc;
          var letterFc;
          var letterM = "";
          var letterP = this.defaultPropsArray;
          var letterO;
          if (documentData.j === 2 || documentData.j === 1) {
            var animatorJustifyOffset = 0;
            var animatorFirstCharOffset = 0;
            var justifyOffsetMult = documentData.j === 2 ? -0.5 : -1;
            var lastIndex = 0;
            var isNewLine = true;
            for (i = 0; i < len; i += 1) {
              if (letters[i].n) {
                if (animatorJustifyOffset) {
                  animatorJustifyOffset += animatorFirstCharOffset;
                }
                while (lastIndex < i) {
                  letters[lastIndex].animatorJustifyOffset = animatorJustifyOffset;
                  lastIndex += 1;
                }
                animatorJustifyOffset = 0;
                isNewLine = true;
              } else {
                for (j = 0; j < jLen; j += 1) {
                  animatorProps = animators[j].a;
                  if (animatorProps.t.propType) {
                    if (isNewLine && documentData.j === 2) {
                      animatorFirstCharOffset += animatorProps.t.v * justifyOffsetMult;
                    }
                    animatorSelector = animators[j].s;
                    mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);
                    if (mult.length) {
                      animatorJustifyOffset += animatorProps.t.v * mult[0] * justifyOffsetMult;
                    } else {
                      animatorJustifyOffset += animatorProps.t.v * mult * justifyOffsetMult;
                    }
                  }
                }
                isNewLine = false;
              }
            }
            if (animatorJustifyOffset) {
              animatorJustifyOffset += animatorFirstCharOffset;
            }
            while (lastIndex < i) {
              letters[lastIndex].animatorJustifyOffset = animatorJustifyOffset;
              lastIndex += 1;
            }
          }
          for (i = 0; i < len; i += 1) {
            matrixHelper.reset();
            elemOpacity = 1;
            if (letters[i].n) {
              xPos = 0;
              yPos += documentData.yOffset;
              yPos += firstLine ? 1 : 0;
              currentLength = initPathPos;
              firstLine = false;
              if (this._hasMaskedPath) {
                segmentInd = initSegmentInd;
                pointInd = initPointInd;
                points = segments[segmentInd].points;
                prevPoint = points[pointInd - 1];
                currentPoint = points[pointInd];
                partialLength = currentPoint.partialLength;
                segmentLength = 0;
              }
              letterM = "";
              letterFc = "";
              letterSw = "";
              letterO = "";
              letterP = this.defaultPropsArray;
            } else {
              if (this._hasMaskedPath) {
                if (currentLine !== letters[i].line) {
                  switch (documentData.j) {
                    case 1:
                      currentLength += totalLength - documentData.lineWidths[letters[i].line];
                      break;
                    case 2:
                      currentLength += (totalLength - documentData.lineWidths[letters[i].line]) / 2;
                      break;
                    default:
                      break;
                  }
                  currentLine = letters[i].line;
                }
                if (ind !== letters[i].ind) {
                  if (letters[ind]) {
                    currentLength += letters[ind].extra;
                  }
                  currentLength += letters[i].an / 2;
                  ind = letters[i].ind;
                }
                currentLength += alignment[0] * letters[i].an * 5e-3;
                var animatorOffset = 0;
                for (j = 0; j < jLen; j += 1) {
                  animatorProps = animators[j].a;
                  if (animatorProps.p.propType) {
                    animatorSelector = animators[j].s;
                    mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);
                    if (mult.length) {
                      animatorOffset += animatorProps.p.v[0] * mult[0];
                    } else {
                      animatorOffset += animatorProps.p.v[0] * mult;
                    }
                  }
                  if (animatorProps.a.propType) {
                    animatorSelector = animators[j].s;
                    mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);
                    if (mult.length) {
                      animatorOffset += animatorProps.a.v[0] * mult[0];
                    } else {
                      animatorOffset += animatorProps.a.v[0] * mult;
                    }
                  }
                }
                flag = true;
                if (this._pathData.a.v) {
                  currentLength = letters[0].an * 0.5 + (totalLength - this._pathData.f.v - letters[0].an * 0.5 - letters[letters.length - 1].an * 0.5) * ind / (len - 1);
                  currentLength += this._pathData.f.v;
                }
                while (flag) {
                  if (segmentLength + partialLength >= currentLength + animatorOffset || !points) {
                    perc = (currentLength + animatorOffset - segmentLength) / currentPoint.partialLength;
                    xPathPos = prevPoint.point[0] + (currentPoint.point[0] - prevPoint.point[0]) * perc;
                    yPathPos = prevPoint.point[1] + (currentPoint.point[1] - prevPoint.point[1]) * perc;
                    matrixHelper.translate(-alignment[0] * letters[i].an * 5e-3, -(alignment[1] * yOff) * 0.01);
                    flag = false;
                  } else if (points) {
                    segmentLength += currentPoint.partialLength;
                    pointInd += 1;
                    if (pointInd >= points.length) {
                      pointInd = 0;
                      segmentInd += 1;
                      if (!segments[segmentInd]) {
                        if (mask2.v.c) {
                          pointInd = 0;
                          segmentInd = 0;
                          points = segments[segmentInd].points;
                        } else {
                          segmentLength -= currentPoint.partialLength;
                          points = null;
                        }
                      } else {
                        points = segments[segmentInd].points;
                      }
                    }
                    if (points) {
                      prevPoint = currentPoint;
                      currentPoint = points[pointInd];
                      partialLength = currentPoint.partialLength;
                    }
                  }
                }
                offf = letters[i].an / 2 - letters[i].add;
                matrixHelper.translate(-offf, 0, 0);
              } else {
                offf = letters[i].an / 2 - letters[i].add;
                matrixHelper.translate(-offf, 0, 0);
                matrixHelper.translate(-alignment[0] * letters[i].an * 5e-3, -alignment[1] * yOff * 0.01, 0);
              }
              for (j = 0; j < jLen; j += 1) {
                animatorProps = animators[j].a;
                if (animatorProps.t.propType) {
                  animatorSelector = animators[j].s;
                  mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);
                  if (xPos !== 0 || documentData.j !== 0) {
                    if (this._hasMaskedPath) {
                      if (mult.length) {
                        currentLength += animatorProps.t.v * mult[0];
                      } else {
                        currentLength += animatorProps.t.v * mult;
                      }
                    } else if (mult.length) {
                      xPos += animatorProps.t.v * mult[0];
                    } else {
                      xPos += animatorProps.t.v * mult;
                    }
                  }
                }
              }
              if (documentData.strokeWidthAnim) {
                sw = documentData.sw || 0;
              }
              if (documentData.strokeColorAnim) {
                if (documentData.sc) {
                  sc = [documentData.sc[0], documentData.sc[1], documentData.sc[2]];
                } else {
                  sc = [0, 0, 0];
                }
              }
              if (documentData.fillColorAnim && documentData.fc) {
                fc = [documentData.fc[0], documentData.fc[1], documentData.fc[2]];
              }
              for (j = 0; j < jLen; j += 1) {
                animatorProps = animators[j].a;
                if (animatorProps.a.propType) {
                  animatorSelector = animators[j].s;
                  mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);
                  if (mult.length) {
                    matrixHelper.translate(-animatorProps.a.v[0] * mult[0], -animatorProps.a.v[1] * mult[1], animatorProps.a.v[2] * mult[2]);
                  } else {
                    matrixHelper.translate(-animatorProps.a.v[0] * mult, -animatorProps.a.v[1] * mult, animatorProps.a.v[2] * mult);
                  }
                }
              }
              for (j = 0; j < jLen; j += 1) {
                animatorProps = animators[j].a;
                if (animatorProps.s.propType) {
                  animatorSelector = animators[j].s;
                  mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);
                  if (mult.length) {
                    matrixHelper.scale(1 + (animatorProps.s.v[0] - 1) * mult[0], 1 + (animatorProps.s.v[1] - 1) * mult[1], 1);
                  } else {
                    matrixHelper.scale(1 + (animatorProps.s.v[0] - 1) * mult, 1 + (animatorProps.s.v[1] - 1) * mult, 1);
                  }
                }
              }
              for (j = 0; j < jLen; j += 1) {
                animatorProps = animators[j].a;
                animatorSelector = animators[j].s;
                mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);
                if (animatorProps.sk.propType) {
                  if (mult.length) {
                    matrixHelper.skewFromAxis(-animatorProps.sk.v * mult[0], animatorProps.sa.v * mult[1]);
                  } else {
                    matrixHelper.skewFromAxis(-animatorProps.sk.v * mult, animatorProps.sa.v * mult);
                  }
                }
                if (animatorProps.r.propType) {
                  if (mult.length) {
                    matrixHelper.rotateZ(-animatorProps.r.v * mult[2]);
                  } else {
                    matrixHelper.rotateZ(-animatorProps.r.v * mult);
                  }
                }
                if (animatorProps.ry.propType) {
                  if (mult.length) {
                    matrixHelper.rotateY(animatorProps.ry.v * mult[1]);
                  } else {
                    matrixHelper.rotateY(animatorProps.ry.v * mult);
                  }
                }
                if (animatorProps.rx.propType) {
                  if (mult.length) {
                    matrixHelper.rotateX(animatorProps.rx.v * mult[0]);
                  } else {
                    matrixHelper.rotateX(animatorProps.rx.v * mult);
                  }
                }
                if (animatorProps.o.propType) {
                  if (mult.length) {
                    elemOpacity += (animatorProps.o.v * mult[0] - elemOpacity) * mult[0];
                  } else {
                    elemOpacity += (animatorProps.o.v * mult - elemOpacity) * mult;
                  }
                }
                if (documentData.strokeWidthAnim && animatorProps.sw.propType) {
                  if (mult.length) {
                    sw += animatorProps.sw.v * mult[0];
                  } else {
                    sw += animatorProps.sw.v * mult;
                  }
                }
                if (documentData.strokeColorAnim && animatorProps.sc.propType) {
                  for (k = 0; k < 3; k += 1) {
                    if (mult.length) {
                      sc[k] += (animatorProps.sc.v[k] - sc[k]) * mult[0];
                    } else {
                      sc[k] += (animatorProps.sc.v[k] - sc[k]) * mult;
                    }
                  }
                }
                if (documentData.fillColorAnim && documentData.fc) {
                  if (animatorProps.fc.propType) {
                    for (k = 0; k < 3; k += 1) {
                      if (mult.length) {
                        fc[k] += (animatorProps.fc.v[k] - fc[k]) * mult[0];
                      } else {
                        fc[k] += (animatorProps.fc.v[k] - fc[k]) * mult;
                      }
                    }
                  }
                  if (animatorProps.fh.propType) {
                    if (mult.length) {
                      fc = addHueToRGB(fc, animatorProps.fh.v * mult[0]);
                    } else {
                      fc = addHueToRGB(fc, animatorProps.fh.v * mult);
                    }
                  }
                  if (animatorProps.fs.propType) {
                    if (mult.length) {
                      fc = addSaturationToRGB(fc, animatorProps.fs.v * mult[0]);
                    } else {
                      fc = addSaturationToRGB(fc, animatorProps.fs.v * mult);
                    }
                  }
                  if (animatorProps.fb.propType) {
                    if (mult.length) {
                      fc = addBrightnessToRGB(fc, animatorProps.fb.v * mult[0]);
                    } else {
                      fc = addBrightnessToRGB(fc, animatorProps.fb.v * mult);
                    }
                  }
                }
              }
              for (j = 0; j < jLen; j += 1) {
                animatorProps = animators[j].a;
                if (animatorProps.p.propType) {
                  animatorSelector = animators[j].s;
                  mult = animatorSelector.getMult(letters[i].anIndexes[j], textData.a[j].s.totalChars);
                  if (this._hasMaskedPath) {
                    if (mult.length) {
                      matrixHelper.translate(0, animatorProps.p.v[1] * mult[0], -animatorProps.p.v[2] * mult[1]);
                    } else {
                      matrixHelper.translate(0, animatorProps.p.v[1] * mult, -animatorProps.p.v[2] * mult);
                    }
                  } else if (mult.length) {
                    matrixHelper.translate(animatorProps.p.v[0] * mult[0], animatorProps.p.v[1] * mult[1], -animatorProps.p.v[2] * mult[2]);
                  } else {
                    matrixHelper.translate(animatorProps.p.v[0] * mult, animatorProps.p.v[1] * mult, -animatorProps.p.v[2] * mult);
                  }
                }
              }
              if (documentData.strokeWidthAnim) {
                letterSw = sw < 0 ? 0 : sw;
              }
              if (documentData.strokeColorAnim) {
                letterSc = "rgb(" + Math.round(sc[0] * 255) + "," + Math.round(sc[1] * 255) + "," + Math.round(sc[2] * 255) + ")";
              }
              if (documentData.fillColorAnim && documentData.fc) {
                letterFc = "rgb(" + Math.round(fc[0] * 255) + "," + Math.round(fc[1] * 255) + "," + Math.round(fc[2] * 255) + ")";
              }
              if (this._hasMaskedPath) {
                matrixHelper.translate(0, -documentData.ls);
                matrixHelper.translate(0, alignment[1] * yOff * 0.01 + yPos, 0);
                if (this._pathData.p.v) {
                  tanAngle = (currentPoint.point[1] - prevPoint.point[1]) / (currentPoint.point[0] - prevPoint.point[0]);
                  var rot = Math.atan(tanAngle) * 180 / Math.PI;
                  if (currentPoint.point[0] < prevPoint.point[0]) {
                    rot += 180;
                  }
                  matrixHelper.rotate(-rot * Math.PI / 180);
                }
                matrixHelper.translate(xPathPos, yPathPos, 0);
                currentLength -= alignment[0] * letters[i].an * 5e-3;
                if (letters[i + 1] && ind !== letters[i + 1].ind) {
                  currentLength += letters[i].an / 2;
                  currentLength += documentData.tr * 1e-3 * documentData.finalSize;
                }
              } else {
                matrixHelper.translate(xPos, yPos, 0);
                if (documentData.ps) {
                  matrixHelper.translate(documentData.ps[0], documentData.ps[1] + documentData.ascent, 0);
                }
                switch (documentData.j) {
                  case 1:
                    matrixHelper.translate(letters[i].animatorJustifyOffset + documentData.justifyOffset + (documentData.boxWidth - documentData.lineWidths[letters[i].line]), 0, 0);
                    break;
                  case 2:
                    matrixHelper.translate(letters[i].animatorJustifyOffset + documentData.justifyOffset + (documentData.boxWidth - documentData.lineWidths[letters[i].line]) / 2, 0, 0);
                    break;
                  default:
                    break;
                }
                matrixHelper.translate(0, -documentData.ls);
                matrixHelper.translate(offf, 0, 0);
                matrixHelper.translate(alignment[0] * letters[i].an * 5e-3, alignment[1] * yOff * 0.01, 0);
                xPos += letters[i].l + documentData.tr * 1e-3 * documentData.finalSize;
              }
              if (renderType === "html") {
                letterM = matrixHelper.toCSS();
              } else if (renderType === "svg") {
                letterM = matrixHelper.to2dCSS();
              } else {
                letterP = [matrixHelper.props[0], matrixHelper.props[1], matrixHelper.props[2], matrixHelper.props[3], matrixHelper.props[4], matrixHelper.props[5], matrixHelper.props[6], matrixHelper.props[7], matrixHelper.props[8], matrixHelper.props[9], matrixHelper.props[10], matrixHelper.props[11], matrixHelper.props[12], matrixHelper.props[13], matrixHelper.props[14], matrixHelper.props[15]];
              }
              letterO = elemOpacity;
            }
            if (renderedLettersCount <= i) {
              letterValue = new LetterProps(letterO, letterSw, letterSc, letterFc, letterM, letterP);
              this.renderedLetters.push(letterValue);
              renderedLettersCount += 1;
              this.lettersChangedFlag = true;
            } else {
              letterValue = this.renderedLetters[i];
              this.lettersChangedFlag = letterValue.update(letterO, letterSw, letterSc, letterFc, letterM, letterP) || this.lettersChangedFlag;
            }
          }
        };
        TextAnimatorProperty.prototype.getValue = function() {
          if (this._elem.globalData.frameId === this._frameId) {
            return;
          }
          this._frameId = this._elem.globalData.frameId;
          this.iterateDynamicProperties();
        };
        TextAnimatorProperty.prototype.mHelper = new Matrix();
        TextAnimatorProperty.prototype.defaultPropsArray = [];
        extendPrototype([DynamicPropertyContainer], TextAnimatorProperty);
        function TextAnimatorDataProperty(elem2, animatorProps, container) {
          var defaultData = { propType: false };
          var getProp = PropertyFactory.getProp;
          var textAnimatorAnimatables = animatorProps.a;
          this.a = {
            r: textAnimatorAnimatables.r ? getProp(elem2, textAnimatorAnimatables.r, 0, degToRads, container) : defaultData,
            rx: textAnimatorAnimatables.rx ? getProp(elem2, textAnimatorAnimatables.rx, 0, degToRads, container) : defaultData,
            ry: textAnimatorAnimatables.ry ? getProp(elem2, textAnimatorAnimatables.ry, 0, degToRads, container) : defaultData,
            sk: textAnimatorAnimatables.sk ? getProp(elem2, textAnimatorAnimatables.sk, 0, degToRads, container) : defaultData,
            sa: textAnimatorAnimatables.sa ? getProp(elem2, textAnimatorAnimatables.sa, 0, degToRads, container) : defaultData,
            s: textAnimatorAnimatables.s ? getProp(elem2, textAnimatorAnimatables.s, 1, 0.01, container) : defaultData,
            a: textAnimatorAnimatables.a ? getProp(elem2, textAnimatorAnimatables.a, 1, 0, container) : defaultData,
            o: textAnimatorAnimatables.o ? getProp(elem2, textAnimatorAnimatables.o, 0, 0.01, container) : defaultData,
            p: textAnimatorAnimatables.p ? getProp(elem2, textAnimatorAnimatables.p, 1, 0, container) : defaultData,
            sw: textAnimatorAnimatables.sw ? getProp(elem2, textAnimatorAnimatables.sw, 0, 0, container) : defaultData,
            sc: textAnimatorAnimatables.sc ? getProp(elem2, textAnimatorAnimatables.sc, 1, 0, container) : defaultData,
            fc: textAnimatorAnimatables.fc ? getProp(elem2, textAnimatorAnimatables.fc, 1, 0, container) : defaultData,
            fh: textAnimatorAnimatables.fh ? getProp(elem2, textAnimatorAnimatables.fh, 0, 0, container) : defaultData,
            fs: textAnimatorAnimatables.fs ? getProp(elem2, textAnimatorAnimatables.fs, 0, 0.01, container) : defaultData,
            fb: textAnimatorAnimatables.fb ? getProp(elem2, textAnimatorAnimatables.fb, 0, 0.01, container) : defaultData,
            t: textAnimatorAnimatables.t ? getProp(elem2, textAnimatorAnimatables.t, 0, 0, container) : defaultData
          };
          this.s = TextSelectorProp.getTextSelectorProp(elem2, animatorProps.s, container);
          this.s.t = animatorProps.s.t;
        }
        function LetterProps(o, sw, sc, fc, m, p) {
          this.o = o;
          this.sw = sw;
          this.sc = sc;
          this.fc = fc;
          this.m = m;
          this.p = p;
          this._mdf = {
            o: true,
            sw: !!sw,
            sc: !!sc,
            fc: !!fc,
            m: true,
            p: true
          };
        }
        LetterProps.prototype.update = function(o, sw, sc, fc, m, p) {
          this._mdf.o = false;
          this._mdf.sw = false;
          this._mdf.sc = false;
          this._mdf.fc = false;
          this._mdf.m = false;
          this._mdf.p = false;
          var updated = false;
          if (this.o !== o) {
            this.o = o;
            this._mdf.o = true;
            updated = true;
          }
          if (this.sw !== sw) {
            this.sw = sw;
            this._mdf.sw = true;
            updated = true;
          }
          if (this.sc !== sc) {
            this.sc = sc;
            this._mdf.sc = true;
            updated = true;
          }
          if (this.fc !== fc) {
            this.fc = fc;
            this._mdf.fc = true;
            updated = true;
          }
          if (this.m !== m) {
            this.m = m;
            this._mdf.m = true;
            updated = true;
          }
          if (p.length && (this.p[0] !== p[0] || this.p[1] !== p[1] || this.p[4] !== p[4] || this.p[5] !== p[5] || this.p[12] !== p[12] || this.p[13] !== p[13])) {
            this.p = p;
            this._mdf.p = true;
            updated = true;
          }
          return updated;
        };
        function TextProperty(elem2, data2) {
          this._frameId = initialDefaultFrame;
          this.pv = "";
          this.v = "";
          this.kf = false;
          this._isFirstFrame = true;
          this._mdf = false;
          this.data = data2;
          this.elem = elem2;
          this.comp = this.elem.comp;
          this.keysIndex = 0;
          this.canResize = false;
          this.minimumFontSize = 1;
          this.effectsSequence = [];
          this.currentData = {
            ascent: 0,
            boxWidth: this.defaultBoxWidth,
            f: "",
            fStyle: "",
            fWeight: "",
            fc: "",
            j: "",
            justifyOffset: "",
            l: [],
            lh: 0,
            lineWidths: [],
            ls: "",
            of: "",
            s: "",
            sc: "",
            sw: 0,
            t: 0,
            tr: 0,
            sz: 0,
            ps: null,
            fillColorAnim: false,
            strokeColorAnim: false,
            strokeWidthAnim: false,
            yOffset: 0,
            finalSize: 0,
            finalText: [],
            finalLineHeight: 0,
            __complete: false
          };
          this.copyData(this.currentData, this.data.d.k[0].s);
          if (!this.searchProperty()) {
            this.completeTextData(this.currentData);
          }
        }
        TextProperty.prototype.defaultBoxWidth = [0, 0];
        TextProperty.prototype.copyData = function(obj, data2) {
          for (var s in data2) {
            if (Object.prototype.hasOwnProperty.call(data2, s)) {
              obj[s] = data2[s];
            }
          }
          return obj;
        };
        TextProperty.prototype.setCurrentData = function(data2) {
          if (!data2.__complete) {
            this.completeTextData(data2);
          }
          this.currentData = data2;
          this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth;
          this._mdf = true;
        };
        TextProperty.prototype.searchProperty = function() {
          return this.searchKeyframes();
        };
        TextProperty.prototype.searchKeyframes = function() {
          this.kf = this.data.d.k.length > 1;
          if (this.kf) {
            this.addEffect(this.getKeyframeValue.bind(this));
          }
          return this.kf;
        };
        TextProperty.prototype.addEffect = function(effectFunction) {
          this.effectsSequence.push(effectFunction);
          this.elem.addDynamicProperty(this);
        };
        TextProperty.prototype.getValue = function(_finalValue) {
          if ((this.elem.globalData.frameId === this.frameId || !this.effectsSequence.length) && !_finalValue) {
            return;
          }
          this.currentData.t = this.data.d.k[this.keysIndex].s.t;
          var currentValue = this.currentData;
          var currentIndex = this.keysIndex;
          if (this.lock) {
            this.setCurrentData(this.currentData);
            return;
          }
          this.lock = true;
          this._mdf = false;
          var i;
          var len = this.effectsSequence.length;
          var finalValue = _finalValue || this.data.d.k[this.keysIndex].s;
          for (i = 0; i < len; i += 1) {
            if (currentIndex !== this.keysIndex) {
              finalValue = this.effectsSequence[i](finalValue, finalValue.t);
            } else {
              finalValue = this.effectsSequence[i](this.currentData, finalValue.t);
            }
          }
          if (currentValue !== finalValue) {
            this.setCurrentData(finalValue);
          }
          this.v = this.currentData;
          this.pv = this.v;
          this.lock = false;
          this.frameId = this.elem.globalData.frameId;
        };
        TextProperty.prototype.getKeyframeValue = function() {
          var textKeys = this.data.d.k;
          var frameNum = this.elem.comp.renderedFrame;
          var i = 0;
          var len = textKeys.length;
          while (i <= len - 1) {
            if (i === len - 1 || textKeys[i + 1].t > frameNum) {
              break;
            }
            i += 1;
          }
          if (this.keysIndex !== i) {
            this.keysIndex = i;
          }
          return this.data.d.k[this.keysIndex].s;
        };
        TextProperty.prototype.buildFinalText = function(text2) {
          var charactersArray = [];
          var i = 0;
          var len = text2.length;
          var charCode;
          var secondCharCode;
          var shouldCombine = false;
          while (i < len) {
            charCode = text2.charCodeAt(i);
            if (FontManager.isCombinedCharacter(charCode)) {
              charactersArray[charactersArray.length - 1] += text2.charAt(i);
            } else if (charCode >= 55296 && charCode <= 56319) {
              secondCharCode = text2.charCodeAt(i + 1);
              if (secondCharCode >= 56320 && secondCharCode <= 57343) {
                if (shouldCombine || FontManager.isModifier(charCode, secondCharCode)) {
                  charactersArray[charactersArray.length - 1] += text2.substr(i, 2);
                  shouldCombine = false;
                } else {
                  charactersArray.push(text2.substr(i, 2));
                }
                i += 1;
              } else {
                charactersArray.push(text2.charAt(i));
              }
            } else if (charCode > 56319) {
              secondCharCode = text2.charCodeAt(i + 1);
              if (FontManager.isZeroWidthJoiner(charCode, secondCharCode)) {
                shouldCombine = true;
                charactersArray[charactersArray.length - 1] += text2.substr(i, 2);
                i += 1;
              } else {
                charactersArray.push(text2.charAt(i));
              }
            } else if (FontManager.isZeroWidthJoiner(charCode)) {
              charactersArray[charactersArray.length - 1] += text2.charAt(i);
              shouldCombine = true;
            } else {
              charactersArray.push(text2.charAt(i));
            }
            i += 1;
          }
          return charactersArray;
        };
        TextProperty.prototype.completeTextData = function(documentData) {
          documentData.__complete = true;
          var fontManager = this.elem.globalData.fontManager;
          var data2 = this.data;
          var letters = [];
          var i;
          var len;
          var newLineFlag;
          var index2 = 0;
          var val2;
          var anchorGrouping = data2.m.g;
          var currentSize = 0;
          var currentPos = 0;
          var currentLine = 0;
          var lineWidths = [];
          var lineWidth = 0;
          var maxLineWidth = 0;
          var j;
          var jLen;
          var fontData = fontManager.getFontByName(documentData.f);
          var charData;
          var cLength = 0;
          var fontProps = getFontProperties(fontData);
          documentData.fWeight = fontProps.weight;
          documentData.fStyle = fontProps.style;
          documentData.finalSize = documentData.s;
          documentData.finalText = this.buildFinalText(documentData.t);
          len = documentData.finalText.length;
          documentData.finalLineHeight = documentData.lh;
          var trackingOffset = documentData.tr / 1e3 * documentData.finalSize;
          var charCode;
          if (documentData.sz) {
            var flag = true;
            var boxWidth = documentData.sz[0];
            var boxHeight = documentData.sz[1];
            var currentHeight;
            var finalText;
            while (flag) {
              finalText = this.buildFinalText(documentData.t);
              currentHeight = 0;
              lineWidth = 0;
              len = finalText.length;
              trackingOffset = documentData.tr / 1e3 * documentData.finalSize;
              var lastSpaceIndex = -1;
              for (i = 0; i < len; i += 1) {
                charCode = finalText[i].charCodeAt(0);
                newLineFlag = false;
                if (finalText[i] === " ") {
                  lastSpaceIndex = i;
                } else if (charCode === 13 || charCode === 3) {
                  lineWidth = 0;
                  newLineFlag = true;
                  currentHeight += documentData.finalLineHeight || documentData.finalSize * 1.2;
                }
                if (fontManager.chars) {
                  charData = fontManager.getCharData(finalText[i], fontData.fStyle, fontData.fFamily);
                  cLength = newLineFlag ? 0 : charData.w * documentData.finalSize / 100;
                } else {
                  cLength = fontManager.measureText(finalText[i], documentData.f, documentData.finalSize);
                }
                if (lineWidth + cLength > boxWidth && finalText[i] !== " ") {
                  if (lastSpaceIndex === -1) {
                    len += 1;
                  } else {
                    i = lastSpaceIndex;
                  }
                  currentHeight += documentData.finalLineHeight || documentData.finalSize * 1.2;
                  finalText.splice(i, lastSpaceIndex === i ? 1 : 0, "\r");
                  lastSpaceIndex = -1;
                  lineWidth = 0;
                } else {
                  lineWidth += cLength;
                  lineWidth += trackingOffset;
                }
              }
              currentHeight += fontData.ascent * documentData.finalSize / 100;
              if (this.canResize && documentData.finalSize > this.minimumFontSize && boxHeight < currentHeight) {
                documentData.finalSize -= 1;
                documentData.finalLineHeight = documentData.finalSize * documentData.lh / documentData.s;
              } else {
                documentData.finalText = finalText;
                len = documentData.finalText.length;
                flag = false;
              }
            }
          }
          lineWidth = -trackingOffset;
          cLength = 0;
          var uncollapsedSpaces = 0;
          var currentChar;
          for (i = 0; i < len; i += 1) {
            newLineFlag = false;
            currentChar = documentData.finalText[i];
            charCode = currentChar.charCodeAt(0);
            if (charCode === 13 || charCode === 3) {
              uncollapsedSpaces = 0;
              lineWidths.push(lineWidth);
              maxLineWidth = lineWidth > maxLineWidth ? lineWidth : maxLineWidth;
              lineWidth = -2 * trackingOffset;
              val2 = "";
              newLineFlag = true;
              currentLine += 1;
            } else {
              val2 = currentChar;
            }
            if (fontManager.chars) {
              charData = fontManager.getCharData(currentChar, fontData.fStyle, fontManager.getFontByName(documentData.f).fFamily);
              cLength = newLineFlag ? 0 : charData.w * documentData.finalSize / 100;
            } else {
              cLength = fontManager.measureText(val2, documentData.f, documentData.finalSize);
            }
            if (currentChar === " ") {
              uncollapsedSpaces += cLength + trackingOffset;
            } else {
              lineWidth += cLength + trackingOffset + uncollapsedSpaces;
              uncollapsedSpaces = 0;
            }
            letters.push({
              l: cLength,
              an: cLength,
              add: currentSize,
              n: newLineFlag,
              anIndexes: [],
              val: val2,
              line: currentLine,
              animatorJustifyOffset: 0
            });
            if (anchorGrouping == 2) {
              currentSize += cLength;
              if (val2 === "" || val2 === " " || i === len - 1) {
                if (val2 === "" || val2 === " ") {
                  currentSize -= cLength;
                }
                while (currentPos <= i) {
                  letters[currentPos].an = currentSize;
                  letters[currentPos].ind = index2;
                  letters[currentPos].extra = cLength;
                  currentPos += 1;
                }
                index2 += 1;
                currentSize = 0;
              }
            } else if (anchorGrouping == 3) {
              currentSize += cLength;
              if (val2 === "" || i === len - 1) {
                if (val2 === "") {
                  currentSize -= cLength;
                }
                while (currentPos <= i) {
                  letters[currentPos].an = currentSize;
                  letters[currentPos].ind = index2;
                  letters[currentPos].extra = cLength;
                  currentPos += 1;
                }
                currentSize = 0;
                index2 += 1;
              }
            } else {
              letters[index2].ind = index2;
              letters[index2].extra = 0;
              index2 += 1;
            }
          }
          documentData.l = letters;
          maxLineWidth = lineWidth > maxLineWidth ? lineWidth : maxLineWidth;
          lineWidths.push(lineWidth);
          if (documentData.sz) {
            documentData.boxWidth = documentData.sz[0];
            documentData.justifyOffset = 0;
          } else {
            documentData.boxWidth = maxLineWidth;
            switch (documentData.j) {
              case 1:
                documentData.justifyOffset = -documentData.boxWidth;
                break;
              case 2:
                documentData.justifyOffset = -documentData.boxWidth / 2;
                break;
              default:
                documentData.justifyOffset = 0;
            }
          }
          documentData.lineWidths = lineWidths;
          var animators = data2.a;
          var animatorData;
          var letterData;
          jLen = animators.length;
          var based;
          var ind;
          var indexes = [];
          for (j = 0; j < jLen; j += 1) {
            animatorData = animators[j];
            if (animatorData.a.sc) {
              documentData.strokeColorAnim = true;
            }
            if (animatorData.a.sw) {
              documentData.strokeWidthAnim = true;
            }
            if (animatorData.a.fc || animatorData.a.fh || animatorData.a.fs || animatorData.a.fb) {
              documentData.fillColorAnim = true;
            }
            ind = 0;
            based = animatorData.s.b;
            for (i = 0; i < len; i += 1) {
              letterData = letters[i];
              letterData.anIndexes[j] = ind;
              if (based == 1 && letterData.val !== "" || based == 2 && letterData.val !== "" && letterData.val !== " " || based == 3 && (letterData.n || letterData.val == " " || i == len - 1) || based == 4 && (letterData.n || i == len - 1)) {
                if (animatorData.s.rn === 1) {
                  indexes.push(ind);
                }
                ind += 1;
              }
            }
            data2.a[j].s.totalChars = ind;
            var currentInd = -1;
            var newInd;
            if (animatorData.s.rn === 1) {
              for (i = 0; i < len; i += 1) {
                letterData = letters[i];
                if (currentInd != letterData.anIndexes[j]) {
                  currentInd = letterData.anIndexes[j];
                  newInd = indexes.splice(Math.floor(Math.random() * indexes.length), 1)[0];
                }
                letterData.anIndexes[j] = newInd;
              }
            }
          }
          documentData.yOffset = documentData.finalLineHeight || documentData.finalSize * 1.2;
          documentData.ls = documentData.ls || 0;
          documentData.ascent = fontData.ascent * documentData.finalSize / 100;
        };
        TextProperty.prototype.updateDocumentData = function(newData, index2) {
          index2 = index2 === void 0 ? this.keysIndex : index2;
          var dData = this.copyData({}, this.data.d.k[index2].s);
          dData = this.copyData(dData, newData);
          this.data.d.k[index2].s = dData;
          this.recalculate(index2);
          this.elem.addDynamicProperty(this);
        };
        TextProperty.prototype.recalculate = function(index2) {
          var dData = this.data.d.k[index2].s;
          dData.__complete = false;
          this.keysIndex = 0;
          this._isFirstFrame = true;
          this.getValue(dData);
        };
        TextProperty.prototype.canResizeFont = function(_canResize) {
          this.canResize = _canResize;
          this.recalculate(this.keysIndex);
          this.elem.addDynamicProperty(this);
        };
        TextProperty.prototype.setMinimumFontSize = function(_fontValue) {
          this.minimumFontSize = Math.floor(_fontValue) || 1;
          this.recalculate(this.keysIndex);
          this.elem.addDynamicProperty(this);
        };
        var TextSelectorProp = function() {
          var max = Math.max;
          var min = Math.min;
          var floor = Math.floor;
          function TextSelectorPropFactory(elem2, data2) {
            this._currentTextLength = -1;
            this.k = false;
            this.data = data2;
            this.elem = elem2;
            this.comp = elem2.comp;
            this.finalS = 0;
            this.finalE = 0;
            this.initDynamicPropertyContainer(elem2);
            this.s = PropertyFactory.getProp(elem2, data2.s || { k: 0 }, 0, 0, this);
            if ("e" in data2) {
              this.e = PropertyFactory.getProp(elem2, data2.e, 0, 0, this);
            } else {
              this.e = { v: 100 };
            }
            this.o = PropertyFactory.getProp(elem2, data2.o || { k: 0 }, 0, 0, this);
            this.xe = PropertyFactory.getProp(elem2, data2.xe || { k: 0 }, 0, 0, this);
            this.ne = PropertyFactory.getProp(elem2, data2.ne || { k: 0 }, 0, 0, this);
            this.sm = PropertyFactory.getProp(elem2, data2.sm || { k: 100 }, 0, 0, this);
            this.a = PropertyFactory.getProp(elem2, data2.a, 0, 0.01, this);
            if (!this.dynamicProperties.length) {
              this.getValue();
            }
          }
          TextSelectorPropFactory.prototype = {
            getMult: function(ind) {
              if (this._currentTextLength !== this.elem.textProperty.currentData.l.length) {
                this.getValue();
              }
              var x1 = 0;
              var y1 = 0;
              var x2 = 1;
              var y2 = 1;
              if (this.ne.v > 0) {
                x1 = this.ne.v / 100;
              } else {
                y1 = -this.ne.v / 100;
              }
              if (this.xe.v > 0) {
                x2 = 1 - this.xe.v / 100;
              } else {
                y2 = 1 + this.xe.v / 100;
              }
              var easer = BezierFactory.getBezierEasing(x1, y1, x2, y2).get;
              var mult = 0;
              var s = this.finalS;
              var e = this.finalE;
              var type = this.data.sh;
              if (type === 2) {
                if (e === s) {
                  mult = ind >= e ? 1 : 0;
                } else {
                  mult = max(0, min(0.5 / (e - s) + (ind - s) / (e - s), 1));
                }
                mult = easer(mult);
              } else if (type === 3) {
                if (e === s) {
                  mult = ind >= e ? 0 : 1;
                } else {
                  mult = 1 - max(0, min(0.5 / (e - s) + (ind - s) / (e - s), 1));
                }
                mult = easer(mult);
              } else if (type === 4) {
                if (e === s) {
                  mult = 0;
                } else {
                  mult = max(0, min(0.5 / (e - s) + (ind - s) / (e - s), 1));
                  if (mult < 0.5) {
                    mult *= 2;
                  } else {
                    mult = 1 - 2 * (mult - 0.5);
                  }
                }
                mult = easer(mult);
              } else if (type === 5) {
                if (e === s) {
                  mult = 0;
                } else {
                  var tot = e - s;
                  ind = min(max(0, ind + 0.5 - s), e - s);
                  var x = -tot / 2 + ind;
                  var a = tot / 2;
                  mult = Math.sqrt(1 - x * x / (a * a));
                }
                mult = easer(mult);
              } else if (type === 6) {
                if (e === s) {
                  mult = 0;
                } else {
                  ind = min(max(0, ind + 0.5 - s), e - s);
                  mult = (1 + Math.cos(Math.PI + Math.PI * 2 * ind / (e - s))) / 2;
                }
                mult = easer(mult);
              } else {
                if (ind >= floor(s)) {
                  if (ind - s < 0) {
                    mult = max(0, min(min(e, 1) - (s - ind), 1));
                  } else {
                    mult = max(0, min(e - ind, 1));
                  }
                }
                mult = easer(mult);
              }
              if (this.sm.v !== 100) {
                var smoothness = this.sm.v * 0.01;
                if (smoothness === 0) {
                  smoothness = 1e-8;
                }
                var threshold = 0.5 - smoothness * 0.5;
                if (mult < threshold) {
                  mult = 0;
                } else {
                  mult = (mult - threshold) / smoothness;
                  if (mult > 1) {
                    mult = 1;
                  }
                }
              }
              return mult * this.a.v;
            },
            getValue: function(newCharsFlag) {
              this.iterateDynamicProperties();
              this._mdf = newCharsFlag || this._mdf;
              this._currentTextLength = this.elem.textProperty.currentData.l.length || 0;
              if (newCharsFlag && this.data.r === 2) {
                this.e.v = this._currentTextLength;
              }
              var divisor = this.data.r === 2 ? 1 : 100 / this.data.totalChars;
              var o = this.o.v / divisor;
              var s = this.s.v / divisor + o;
              var e = this.e.v / divisor + o;
              if (s > e) {
                var _s = s;
                s = e;
                e = _s;
              }
              this.finalS = s;
              this.finalE = e;
            }
          };
          extendPrototype([DynamicPropertyContainer], TextSelectorPropFactory);
          function getTextSelectorProp(elem2, data2, arr) {
            return new TextSelectorPropFactory(elem2, data2, arr);
          }
          return {
            getTextSelectorProp
          };
        }();
        var poolFactory = function() {
          return function(initialLength, _create, _release) {
            var _length = 0;
            var _maxLength = initialLength;
            var pool = createSizedArray(_maxLength);
            var ob2 = {
              newElement,
              release
            };
            function newElement() {
              var element;
              if (_length) {
                _length -= 1;
                element = pool[_length];
              } else {
                element = _create();
              }
              return element;
            }
            function release(element) {
              if (_length === _maxLength) {
                pool = pooling.double(pool);
                _maxLength *= 2;
              }
              if (_release) {
                _release(element);
              }
              pool[_length] = element;
              _length += 1;
            }
            return ob2;
          };
        }();
        var pooling = function() {
          function double(arr) {
            return arr.concat(createSizedArray(arr.length));
          }
          return {
            double
          };
        }();
        var pointPool = function() {
          function create() {
            return createTypedArray("float32", 2);
          }
          return poolFactory(8, create);
        }();
        var shapePool = function() {
          function create() {
            return new ShapePath();
          }
          function release(shapePath) {
            var len = shapePath._length;
            var i;
            for (i = 0; i < len; i += 1) {
              pointPool.release(shapePath.v[i]);
              pointPool.release(shapePath.i[i]);
              pointPool.release(shapePath.o[i]);
              shapePath.v[i] = null;
              shapePath.i[i] = null;
              shapePath.o[i] = null;
            }
            shapePath._length = 0;
            shapePath.c = false;
          }
          function clone(shape) {
            var cloned = factory2.newElement();
            var i;
            var len = shape._length === void 0 ? shape.v.length : shape._length;
            cloned.setLength(len);
            cloned.c = shape.c;
            for (i = 0; i < len; i += 1) {
              cloned.setTripleAt(shape.v[i][0], shape.v[i][1], shape.o[i][0], shape.o[i][1], shape.i[i][0], shape.i[i][1], i);
            }
            return cloned;
          }
          var factory2 = poolFactory(4, create, release);
          factory2.clone = clone;
          return factory2;
        }();
        var shapeCollectionPool = function() {
          var ob2 = {
            newShapeCollection,
            release
          };
          var _length = 0;
          var _maxLength = 4;
          var pool = createSizedArray(_maxLength);
          function newShapeCollection() {
            var shapeCollection;
            if (_length) {
              _length -= 1;
              shapeCollection = pool[_length];
            } else {
              shapeCollection = new ShapeCollection();
            }
            return shapeCollection;
          }
          function release(shapeCollection) {
            var i;
            var len = shapeCollection._length;
            for (i = 0; i < len; i += 1) {
              shapePool.release(shapeCollection.shapes[i]);
            }
            shapeCollection._length = 0;
            if (_length === _maxLength) {
              pool = pooling.double(pool);
              _maxLength *= 2;
            }
            pool[_length] = shapeCollection;
            _length += 1;
          }
          return ob2;
        }();
        var segmentsLengthPool = function() {
          function create() {
            return {
              lengths: [],
              totalLength: 0
            };
          }
          function release(element) {
            var i;
            var len = element.lengths.length;
            for (i = 0; i < len; i += 1) {
              bezierLengthPool.release(element.lengths[i]);
            }
            element.lengths.length = 0;
          }
          return poolFactory(8, create, release);
        }();
        var bezierLengthPool = function() {
          function create() {
            return {
              addedLength: 0,
              percents: createTypedArray("float32", defaultCurveSegments),
              lengths: createTypedArray("float32", defaultCurveSegments)
            };
          }
          return poolFactory(8, create);
        }();
        var markerParser = function() {
          function parsePayloadLines(payload) {
            var lines = payload.split("\r\n");
            var keys = {};
            var line;
            var keysCount = 0;
            for (var i = 0; i < lines.length; i += 1) {
              line = lines[i].split(":");
              if (line.length === 2) {
                keys[line[0]] = line[1].trim();
                keysCount += 1;
              }
            }
            if (keysCount === 0) {
              throw new Error();
            }
            return keys;
          }
          return function(_markers) {
            var markers = [];
            for (var i = 0; i < _markers.length; i += 1) {
              var _marker = _markers[i];
              var markerData = {
                time: _marker.tm,
                duration: _marker.dr
              };
              try {
                markerData.payload = JSON.parse(_markers[i].cm);
              } catch (_) {
                try {
                  markerData.payload = parsePayloadLines(_markers[i].cm);
                } catch (__) {
                  markerData.payload = {
                    name: _markers[i]
                  };
                }
              }
              markers.push(markerData);
            }
            return markers;
          };
        }();
        function BaseRenderer() {
        }
        BaseRenderer.prototype.checkLayers = function(num) {
          var i;
          var len = this.layers.length;
          var data2;
          this.completeLayers = true;
          for (i = len - 1; i >= 0; i -= 1) {
            if (!this.elements[i]) {
              data2 = this.layers[i];
              if (data2.ip - data2.st <= num - this.layers[i].st && data2.op - data2.st > num - this.layers[i].st) {
                this.buildItem(i);
              }
            }
            this.completeLayers = this.elements[i] ? this.completeLayers : false;
          }
          this.checkPendingElements();
        };
        BaseRenderer.prototype.createItem = function(layer) {
          switch (layer.ty) {
            case 2:
              return this.createImage(layer);
            case 0:
              return this.createComp(layer);
            case 1:
              return this.createSolid(layer);
            case 3:
              return this.createNull(layer);
            case 4:
              return this.createShape(layer);
            case 5:
              return this.createText(layer);
            case 6:
              return this.createAudio(layer);
            case 13:
              return this.createCamera(layer);
            case 15:
              return this.createFootage(layer);
            default:
              return this.createNull(layer);
          }
        };
        BaseRenderer.prototype.createCamera = function() {
          throw new Error("You're using a 3d camera. Try the html renderer.");
        };
        BaseRenderer.prototype.createAudio = function(data2) {
          return new AudioElement(data2, this.globalData, this);
        };
        BaseRenderer.prototype.createFootage = function(data2) {
          return new FootageElement(data2, this.globalData, this);
        };
        BaseRenderer.prototype.buildAllItems = function() {
          var i;
          var len = this.layers.length;
          for (i = 0; i < len; i += 1) {
            this.buildItem(i);
          }
          this.checkPendingElements();
        };
        BaseRenderer.prototype.includeLayers = function(newLayers) {
          this.completeLayers = false;
          var i;
          var len = newLayers.length;
          var j;
          var jLen = this.layers.length;
          for (i = 0; i < len; i += 1) {
            j = 0;
            while (j < jLen) {
              if (this.layers[j].id === newLayers[i].id) {
                this.layers[j] = newLayers[i];
                break;
              }
              j += 1;
            }
          }
        };
        BaseRenderer.prototype.setProjectInterface = function(pInterface) {
          this.globalData.projectInterface = pInterface;
        };
        BaseRenderer.prototype.initItems = function() {
          if (!this.globalData.progressiveLoad) {
            this.buildAllItems();
          }
        };
        BaseRenderer.prototype.buildElementParenting = function(element, parentName, hierarchy) {
          var elements = this.elements;
          var layers = this.layers;
          var i = 0;
          var len = layers.length;
          while (i < len) {
            if (layers[i].ind == parentName) {
              if (!elements[i] || elements[i] === true) {
                this.buildItem(i);
                this.addPendingElement(element);
              } else {
                hierarchy.push(elements[i]);
                elements[i].setAsParent();
                if (layers[i].parent !== void 0) {
                  this.buildElementParenting(element, layers[i].parent, hierarchy);
                } else {
                  element.setHierarchy(hierarchy);
                }
              }
            }
            i += 1;
          }
        };
        BaseRenderer.prototype.addPendingElement = function(element) {
          this.pendingElements.push(element);
        };
        BaseRenderer.prototype.searchExtraCompositions = function(assets) {
          var i;
          var len = assets.length;
          for (i = 0; i < len; i += 1) {
            if (assets[i].xt) {
              var comp2 = this.createComp(assets[i]);
              comp2.initExpressions();
              this.globalData.projectInterface.registerComposition(comp2);
            }
          }
        };
        BaseRenderer.prototype.setupGlobalData = function(animData, fontsContainer) {
          this.globalData.fontManager = new FontManager();
          this.globalData.fontManager.addChars(animData.chars);
          this.globalData.fontManager.addFonts(animData.fonts, fontsContainer);
          this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem);
          this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem);
          this.globalData.imageLoader = this.animationItem.imagePreloader;
          this.globalData.audioController = this.animationItem.audioController;
          this.globalData.frameId = 0;
          this.globalData.frameRate = animData.fr;
          this.globalData.nm = animData.nm;
          this.globalData.compSize = {
            w: animData.w,
            h: animData.h
          };
        };
        function SVGRenderer(animationItem, config) {
          this.animationItem = animationItem;
          this.layers = null;
          this.renderedFrame = -1;
          this.svgElement = createNS("svg");
          var ariaLabel = "";
          if (config && config.title) {
            var titleElement = createNS("title");
            var titleId = createElementID();
            titleElement.setAttribute("id", titleId);
            titleElement.textContent = config.title;
            this.svgElement.appendChild(titleElement);
            ariaLabel += titleId;
          }
          if (config && config.description) {
            var descElement = createNS("desc");
            var descId = createElementID();
            descElement.setAttribute("id", descId);
            descElement.textContent = config.description;
            this.svgElement.appendChild(descElement);
            ariaLabel += " " + descId;
          }
          if (ariaLabel) {
            this.svgElement.setAttribute("aria-labelledby", ariaLabel);
          }
          var defs = createNS("defs");
          this.svgElement.appendChild(defs);
          var maskElement = createNS("g");
          this.svgElement.appendChild(maskElement);
          this.layerElement = maskElement;
          this.renderConfig = {
            preserveAspectRatio: config && config.preserveAspectRatio || "xMidYMid meet",
            imagePreserveAspectRatio: config && config.imagePreserveAspectRatio || "xMidYMid slice",
            contentVisibility: config && config.contentVisibility || "visible",
            progressiveLoad: config && config.progressiveLoad || false,
            hideOnTransparent: !(config && config.hideOnTransparent === false),
            viewBoxOnly: config && config.viewBoxOnly || false,
            viewBoxSize: config && config.viewBoxSize || false,
            className: config && config.className || "",
            id: config && config.id || "",
            focusable: config && config.focusable,
            filterSize: {
              width: config && config.filterSize && config.filterSize.width || "100%",
              height: config && config.filterSize && config.filterSize.height || "100%",
              x: config && config.filterSize && config.filterSize.x || "0%",
              y: config && config.filterSize && config.filterSize.y || "0%"
            }
          };
          this.globalData = {
            _mdf: false,
            frameNum: -1,
            defs,
            renderConfig: this.renderConfig
          };
          this.elements = [];
          this.pendingElements = [];
          this.destroyed = false;
          this.rendererType = "svg";
        }
        extendPrototype([BaseRenderer], SVGRenderer);
        SVGRenderer.prototype.createNull = function(data2) {
          return new NullElement(data2, this.globalData, this);
        };
        SVGRenderer.prototype.createShape = function(data2) {
          return new SVGShapeElement(data2, this.globalData, this);
        };
        SVGRenderer.prototype.createText = function(data2) {
          return new SVGTextLottieElement(data2, this.globalData, this);
        };
        SVGRenderer.prototype.createImage = function(data2) {
          return new IImageElement(data2, this.globalData, this);
        };
        SVGRenderer.prototype.createComp = function(data2) {
          return new SVGCompElement(data2, this.globalData, this);
        };
        SVGRenderer.prototype.createSolid = function(data2) {
          return new ISolidElement(data2, this.globalData, this);
        };
        SVGRenderer.prototype.configAnimation = function(animData) {
          this.svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          if (this.renderConfig.viewBoxSize) {
            this.svgElement.setAttribute("viewBox", this.renderConfig.viewBoxSize);
          } else {
            this.svgElement.setAttribute("viewBox", "0 0 " + animData.w + " " + animData.h);
          }
          if (!this.renderConfig.viewBoxOnly) {
            this.svgElement.setAttribute("width", animData.w);
            this.svgElement.setAttribute("height", animData.h);
            this.svgElement.style.width = "100%";
            this.svgElement.style.height = "100%";
            this.svgElement.style.transform = "translate3d(0,0,0)";
            this.svgElement.style.contentVisibility = this.renderConfig.contentVisibility;
          }
          if (this.renderConfig.className) {
            this.svgElement.setAttribute("class", this.renderConfig.className);
          }
          if (this.renderConfig.id) {
            this.svgElement.setAttribute("id", this.renderConfig.id);
          }
          if (this.renderConfig.focusable !== void 0) {
            this.svgElement.setAttribute("focusable", this.renderConfig.focusable);
          }
          this.svgElement.setAttribute("preserveAspectRatio", this.renderConfig.preserveAspectRatio);
          this.animationItem.wrapper.appendChild(this.svgElement);
          var defs = this.globalData.defs;
          this.setupGlobalData(animData, defs);
          this.globalData.progressiveLoad = this.renderConfig.progressiveLoad;
          this.data = animData;
          var maskElement = createNS("clipPath");
          var rect = createNS("rect");
          rect.setAttribute("width", animData.w);
          rect.setAttribute("height", animData.h);
          rect.setAttribute("x", 0);
          rect.setAttribute("y", 0);
          var maskId = createElementID();
          maskElement.setAttribute("id", maskId);
          maskElement.appendChild(rect);
          this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + maskId + ")");
          defs.appendChild(maskElement);
          this.layers = animData.layers;
          this.elements = createSizedArray(animData.layers.length);
        };
        SVGRenderer.prototype.destroy = function() {
          if (this.animationItem.wrapper) {
            this.animationItem.wrapper.innerText = "";
          }
          this.layerElement = null;
          this.globalData.defs = null;
          var i;
          var len = this.layers ? this.layers.length : 0;
          for (i = 0; i < len; i += 1) {
            if (this.elements[i]) {
              this.elements[i].destroy();
            }
          }
          this.elements.length = 0;
          this.destroyed = true;
          this.animationItem = null;
        };
        SVGRenderer.prototype.updateContainerSize = function() {
        };
        SVGRenderer.prototype.buildItem = function(pos) {
          var elements = this.elements;
          if (elements[pos] || this.layers[pos].ty === 99) {
            return;
          }
          elements[pos] = true;
          var element = this.createItem(this.layers[pos]);
          elements[pos] = element;
          if (expressionsPlugin) {
            if (this.layers[pos].ty === 0) {
              this.globalData.projectInterface.registerComposition(element);
            }
            element.initExpressions();
          }
          this.appendElementInPos(element, pos);
          if (this.layers[pos].tt) {
            if (!this.elements[pos - 1] || this.elements[pos - 1] === true) {
              this.buildItem(pos - 1);
              this.addPendingElement(element);
            } else {
              element.setMatte(elements[pos - 1].layerId);
            }
          }
        };
        SVGRenderer.prototype.checkPendingElements = function() {
          while (this.pendingElements.length) {
            var element = this.pendingElements.pop();
            element.checkParenting();
            if (element.data.tt) {
              var i = 0;
              var len = this.elements.length;
              while (i < len) {
                if (this.elements[i] === element) {
                  element.setMatte(this.elements[i - 1].layerId);
                  break;
                }
                i += 1;
              }
            }
          }
        };
        SVGRenderer.prototype.renderFrame = function(num) {
          if (this.renderedFrame === num || this.destroyed) {
            return;
          }
          if (num === null) {
            num = this.renderedFrame;
          } else {
            this.renderedFrame = num;
          }
          this.globalData.frameNum = num;
          this.globalData.frameId += 1;
          this.globalData.projectInterface.currentFrame = num;
          this.globalData._mdf = false;
          var i;
          var len = this.layers.length;
          if (!this.completeLayers) {
            this.checkLayers(num);
          }
          for (i = len - 1; i >= 0; i -= 1) {
            if (this.completeLayers || this.elements[i]) {
              this.elements[i].prepareFrame(num - this.layers[i].st);
            }
          }
          if (this.globalData._mdf) {
            for (i = 0; i < len; i += 1) {
              if (this.completeLayers || this.elements[i]) {
                this.elements[i].renderFrame();
              }
            }
          }
        };
        SVGRenderer.prototype.appendElementInPos = function(element, pos) {
          var newElement = element.getBaseElement();
          if (!newElement) {
            return;
          }
          var i = 0;
          var nextElement;
          while (i < pos) {
            if (this.elements[i] && this.elements[i] !== true && this.elements[i].getBaseElement()) {
              nextElement = this.elements[i].getBaseElement();
            }
            i += 1;
          }
          if (nextElement) {
            this.layerElement.insertBefore(newElement, nextElement);
          } else {
            this.layerElement.appendChild(newElement);
          }
        };
        SVGRenderer.prototype.hide = function() {
          this.layerElement.style.display = "none";
        };
        SVGRenderer.prototype.show = function() {
          this.layerElement.style.display = "block";
        };
        function CanvasRenderer(animationItem, config) {
          this.animationItem = animationItem;
          this.renderConfig = {
            clearCanvas: config && config.clearCanvas !== void 0 ? config.clearCanvas : true,
            context: config && config.context || null,
            progressiveLoad: config && config.progressiveLoad || false,
            preserveAspectRatio: config && config.preserveAspectRatio || "xMidYMid meet",
            imagePreserveAspectRatio: config && config.imagePreserveAspectRatio || "xMidYMid slice",
            contentVisibility: config && config.contentVisibility || "visible",
            className: config && config.className || "",
            id: config && config.id || ""
          };
          this.renderConfig.dpr = config && config.dpr || 1;
          if (this.animationItem.wrapper) {
            this.renderConfig.dpr = config && config.dpr || window.devicePixelRatio || 1;
          }
          this.renderedFrame = -1;
          this.globalData = {
            frameNum: -1,
            _mdf: false,
            renderConfig: this.renderConfig,
            currentGlobalAlpha: -1
          };
          this.contextData = new CVContextData();
          this.elements = [];
          this.pendingElements = [];
          this.transformMat = new Matrix();
          this.completeLayers = false;
          this.rendererType = "canvas";
        }
        extendPrototype([BaseRenderer], CanvasRenderer);
        CanvasRenderer.prototype.createShape = function(data2) {
          return new CVShapeElement(data2, this.globalData, this);
        };
        CanvasRenderer.prototype.createText = function(data2) {
          return new CVTextElement(data2, this.globalData, this);
        };
        CanvasRenderer.prototype.createImage = function(data2) {
          return new CVImageElement(data2, this.globalData, this);
        };
        CanvasRenderer.prototype.createComp = function(data2) {
          return new CVCompElement(data2, this.globalData, this);
        };
        CanvasRenderer.prototype.createSolid = function(data2) {
          return new CVSolidElement(data2, this.globalData, this);
        };
        CanvasRenderer.prototype.createNull = SVGRenderer.prototype.createNull;
        CanvasRenderer.prototype.ctxTransform = function(props) {
          if (props[0] === 1 && props[1] === 0 && props[4] === 0 && props[5] === 1 && props[12] === 0 && props[13] === 0) {
            return;
          }
          if (!this.renderConfig.clearCanvas) {
            this.canvasContext.transform(props[0], props[1], props[4], props[5], props[12], props[13]);
            return;
          }
          this.transformMat.cloneFromProps(props);
          var cProps = this.contextData.cTr.props;
          this.transformMat.transform(cProps[0], cProps[1], cProps[2], cProps[3], cProps[4], cProps[5], cProps[6], cProps[7], cProps[8], cProps[9], cProps[10], cProps[11], cProps[12], cProps[13], cProps[14], cProps[15]);
          this.contextData.cTr.cloneFromProps(this.transformMat.props);
          var trProps = this.contextData.cTr.props;
          this.canvasContext.setTransform(trProps[0], trProps[1], trProps[4], trProps[5], trProps[12], trProps[13]);
        };
        CanvasRenderer.prototype.ctxOpacity = function(op) {
          if (!this.renderConfig.clearCanvas) {
            this.canvasContext.globalAlpha *= op < 0 ? 0 : op;
            this.globalData.currentGlobalAlpha = this.contextData.cO;
            return;
          }
          this.contextData.cO *= op < 0 ? 0 : op;
          if (this.globalData.currentGlobalAlpha !== this.contextData.cO) {
            this.canvasContext.globalAlpha = this.contextData.cO;
            this.globalData.currentGlobalAlpha = this.contextData.cO;
          }
        };
        CanvasRenderer.prototype.reset = function() {
          if (!this.renderConfig.clearCanvas) {
            this.canvasContext.restore();
            return;
          }
          this.contextData.reset();
        };
        CanvasRenderer.prototype.save = function(actionFlag) {
          if (!this.renderConfig.clearCanvas) {
            this.canvasContext.save();
            return;
          }
          if (actionFlag) {
            this.canvasContext.save();
          }
          var props = this.contextData.cTr.props;
          if (this.contextData._length <= this.contextData.cArrPos) {
            this.contextData.duplicate();
          }
          var i;
          var arr = this.contextData.saved[this.contextData.cArrPos];
          for (i = 0; i < 16; i += 1) {
            arr[i] = props[i];
          }
          this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO;
          this.contextData.cArrPos += 1;
        };
        CanvasRenderer.prototype.restore = function(actionFlag) {
          if (!this.renderConfig.clearCanvas) {
            this.canvasContext.restore();
            return;
          }
          if (actionFlag) {
            this.canvasContext.restore();
            this.globalData.blendMode = "source-over";
          }
          this.contextData.cArrPos -= 1;
          var popped = this.contextData.saved[this.contextData.cArrPos];
          var i;
          var arr = this.contextData.cTr.props;
          for (i = 0; i < 16; i += 1) {
            arr[i] = popped[i];
          }
          this.canvasContext.setTransform(popped[0], popped[1], popped[4], popped[5], popped[12], popped[13]);
          popped = this.contextData.savedOp[this.contextData.cArrPos];
          this.contextData.cO = popped;
          if (this.globalData.currentGlobalAlpha !== popped) {
            this.canvasContext.globalAlpha = popped;
            this.globalData.currentGlobalAlpha = popped;
          }
        };
        CanvasRenderer.prototype.configAnimation = function(animData) {
          if (this.animationItem.wrapper) {
            this.animationItem.container = createTag("canvas");
            var containerStyle = this.animationItem.container.style;
            containerStyle.width = "100%";
            containerStyle.height = "100%";
            var origin = "0px 0px 0px";
            containerStyle.transformOrigin = origin;
            containerStyle.mozTransformOrigin = origin;
            containerStyle.webkitTransformOrigin = origin;
            containerStyle["-webkit-transform"] = origin;
            containerStyle.contentVisibility = this.renderConfig.contentVisibility;
            this.animationItem.wrapper.appendChild(this.animationItem.container);
            this.canvasContext = this.animationItem.container.getContext("2d");
            if (this.renderConfig.className) {
              this.animationItem.container.setAttribute("class", this.renderConfig.className);
            }
            if (this.renderConfig.id) {
              this.animationItem.container.setAttribute("id", this.renderConfig.id);
            }
          } else {
            this.canvasContext = this.renderConfig.context;
          }
          this.data = animData;
          this.layers = animData.layers;
          this.transformCanvas = {
            w: animData.w,
            h: animData.h,
            sx: 0,
            sy: 0,
            tx: 0,
            ty: 0
          };
          this.setupGlobalData(animData, document.body);
          this.globalData.canvasContext = this.canvasContext;
          this.globalData.renderer = this;
          this.globalData.isDashed = false;
          this.globalData.progressiveLoad = this.renderConfig.progressiveLoad;
          this.globalData.transformCanvas = this.transformCanvas;
          this.elements = createSizedArray(animData.layers.length);
          this.updateContainerSize();
        };
        CanvasRenderer.prototype.updateContainerSize = function() {
          this.reset();
          var elementWidth;
          var elementHeight;
          if (this.animationItem.wrapper && this.animationItem.container) {
            elementWidth = this.animationItem.wrapper.offsetWidth;
            elementHeight = this.animationItem.wrapper.offsetHeight;
            this.animationItem.container.setAttribute("width", elementWidth * this.renderConfig.dpr);
            this.animationItem.container.setAttribute("height", elementHeight * this.renderConfig.dpr);
          } else {
            elementWidth = this.canvasContext.canvas.width * this.renderConfig.dpr;
            elementHeight = this.canvasContext.canvas.height * this.renderConfig.dpr;
          }
          var elementRel;
          var animationRel;
          if (this.renderConfig.preserveAspectRatio.indexOf("meet") !== -1 || this.renderConfig.preserveAspectRatio.indexOf("slice") !== -1) {
            var par = this.renderConfig.preserveAspectRatio.split(" ");
            var fillType = par[1] || "meet";
            var pos = par[0] || "xMidYMid";
            var xPos = pos.substr(0, 4);
            var yPos = pos.substr(4);
            elementRel = elementWidth / elementHeight;
            animationRel = this.transformCanvas.w / this.transformCanvas.h;
            if (animationRel > elementRel && fillType === "meet" || animationRel < elementRel && fillType === "slice") {
              this.transformCanvas.sx = elementWidth / (this.transformCanvas.w / this.renderConfig.dpr);
              this.transformCanvas.sy = elementWidth / (this.transformCanvas.w / this.renderConfig.dpr);
            } else {
              this.transformCanvas.sx = elementHeight / (this.transformCanvas.h / this.renderConfig.dpr);
              this.transformCanvas.sy = elementHeight / (this.transformCanvas.h / this.renderConfig.dpr);
            }
            if (xPos === "xMid" && (animationRel < elementRel && fillType === "meet" || animationRel > elementRel && fillType === "slice")) {
              this.transformCanvas.tx = (elementWidth - this.transformCanvas.w * (elementHeight / this.transformCanvas.h)) / 2 * this.renderConfig.dpr;
            } else if (xPos === "xMax" && (animationRel < elementRel && fillType === "meet" || animationRel > elementRel && fillType === "slice")) {
              this.transformCanvas.tx = (elementWidth - this.transformCanvas.w * (elementHeight / this.transformCanvas.h)) * this.renderConfig.dpr;
            } else {
              this.transformCanvas.tx = 0;
            }
            if (yPos === "YMid" && (animationRel > elementRel && fillType === "meet" || animationRel < elementRel && fillType === "slice")) {
              this.transformCanvas.ty = (elementHeight - this.transformCanvas.h * (elementWidth / this.transformCanvas.w)) / 2 * this.renderConfig.dpr;
            } else if (yPos === "YMax" && (animationRel > elementRel && fillType === "meet" || animationRel < elementRel && fillType === "slice")) {
              this.transformCanvas.ty = (elementHeight - this.transformCanvas.h * (elementWidth / this.transformCanvas.w)) * this.renderConfig.dpr;
            } else {
              this.transformCanvas.ty = 0;
            }
          } else if (this.renderConfig.preserveAspectRatio === "none") {
            this.transformCanvas.sx = elementWidth / (this.transformCanvas.w / this.renderConfig.dpr);
            this.transformCanvas.sy = elementHeight / (this.transformCanvas.h / this.renderConfig.dpr);
            this.transformCanvas.tx = 0;
            this.transformCanvas.ty = 0;
          } else {
            this.transformCanvas.sx = this.renderConfig.dpr;
            this.transformCanvas.sy = this.renderConfig.dpr;
            this.transformCanvas.tx = 0;
            this.transformCanvas.ty = 0;
          }
          this.transformCanvas.props = [this.transformCanvas.sx, 0, 0, 0, 0, this.transformCanvas.sy, 0, 0, 0, 0, 1, 0, this.transformCanvas.tx, this.transformCanvas.ty, 0, 1];
          this.ctxTransform(this.transformCanvas.props);
          this.canvasContext.beginPath();
          this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h);
          this.canvasContext.closePath();
          this.canvasContext.clip();
          this.renderFrame(this.renderedFrame, true);
        };
        CanvasRenderer.prototype.destroy = function() {
          if (this.renderConfig.clearCanvas && this.animationItem.wrapper) {
            this.animationItem.wrapper.innerText = "";
          }
          var i;
          var len = this.layers ? this.layers.length : 0;
          for (i = len - 1; i >= 0; i -= 1) {
            if (this.elements[i]) {
              this.elements[i].destroy();
            }
          }
          this.elements.length = 0;
          this.globalData.canvasContext = null;
          this.animationItem.container = null;
          this.destroyed = true;
        };
        CanvasRenderer.prototype.renderFrame = function(num, forceRender) {
          if (this.renderedFrame === num && this.renderConfig.clearCanvas === true && !forceRender || this.destroyed || num === -1) {
            return;
          }
          this.renderedFrame = num;
          this.globalData.frameNum = num - this.animationItem._isFirstFrame;
          this.globalData.frameId += 1;
          this.globalData._mdf = !this.renderConfig.clearCanvas || forceRender;
          this.globalData.projectInterface.currentFrame = num;
          var i;
          var len = this.layers.length;
          if (!this.completeLayers) {
            this.checkLayers(num);
          }
          for (i = 0; i < len; i += 1) {
            if (this.completeLayers || this.elements[i]) {
              this.elements[i].prepareFrame(num - this.layers[i].st);
            }
          }
          if (this.globalData._mdf) {
            if (this.renderConfig.clearCanvas === true) {
              this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h);
            } else {
              this.save();
            }
            for (i = len - 1; i >= 0; i -= 1) {
              if (this.completeLayers || this.elements[i]) {
                this.elements[i].renderFrame();
              }
            }
            if (this.renderConfig.clearCanvas !== true) {
              this.restore();
            }
          }
        };
        CanvasRenderer.prototype.buildItem = function(pos) {
          var elements = this.elements;
          if (elements[pos] || this.layers[pos].ty === 99) {
            return;
          }
          var element = this.createItem(this.layers[pos], this, this.globalData);
          elements[pos] = element;
          element.initExpressions();
        };
        CanvasRenderer.prototype.checkPendingElements = function() {
          while (this.pendingElements.length) {
            var element = this.pendingElements.pop();
            element.checkParenting();
          }
        };
        CanvasRenderer.prototype.hide = function() {
          this.animationItem.container.style.display = "none";
        };
        CanvasRenderer.prototype.show = function() {
          this.animationItem.container.style.display = "block";
        };
        function HybridRenderer(animationItem, config) {
          this.animationItem = animationItem;
          this.layers = null;
          this.renderedFrame = -1;
          this.renderConfig = {
            className: config && config.className || "",
            imagePreserveAspectRatio: config && config.imagePreserveAspectRatio || "xMidYMid slice",
            hideOnTransparent: !(config && config.hideOnTransparent === false),
            filterSize: {
              width: config && config.filterSize && config.filterSize.width || "400%",
              height: config && config.filterSize && config.filterSize.height || "400%",
              x: config && config.filterSize && config.filterSize.x || "-100%",
              y: config && config.filterSize && config.filterSize.y || "-100%"
            }
          };
          this.globalData = {
            _mdf: false,
            frameNum: -1,
            renderConfig: this.renderConfig
          };
          this.pendingElements = [];
          this.elements = [];
          this.threeDElements = [];
          this.destroyed = false;
          this.camera = null;
          this.supports3d = true;
          this.rendererType = "html";
        }
        extendPrototype([BaseRenderer], HybridRenderer);
        HybridRenderer.prototype.buildItem = SVGRenderer.prototype.buildItem;
        HybridRenderer.prototype.checkPendingElements = function() {
          while (this.pendingElements.length) {
            var element = this.pendingElements.pop();
            element.checkParenting();
          }
        };
        HybridRenderer.prototype.appendElementInPos = function(element, pos) {
          var newDOMElement = element.getBaseElement();
          if (!newDOMElement) {
            return;
          }
          var layer = this.layers[pos];
          if (!layer.ddd || !this.supports3d) {
            if (this.threeDElements) {
              this.addTo3dContainer(newDOMElement, pos);
            } else {
              var i = 0;
              var nextDOMElement;
              var nextLayer;
              var tmpDOMElement;
              while (i < pos) {
                if (this.elements[i] && this.elements[i] !== true && this.elements[i].getBaseElement) {
                  nextLayer = this.elements[i];
                  tmpDOMElement = this.layers[i].ddd ? this.getThreeDContainerByPos(i) : nextLayer.getBaseElement();
                  nextDOMElement = tmpDOMElement || nextDOMElement;
                }
                i += 1;
              }
              if (nextDOMElement) {
                if (!layer.ddd || !this.supports3d) {
                  this.layerElement.insertBefore(newDOMElement, nextDOMElement);
                }
              } else if (!layer.ddd || !this.supports3d) {
                this.layerElement.appendChild(newDOMElement);
              }
            }
          } else {
            this.addTo3dContainer(newDOMElement, pos);
          }
        };
        HybridRenderer.prototype.createShape = function(data2) {
          if (!this.supports3d) {
            return new SVGShapeElement(data2, this.globalData, this);
          }
          return new HShapeElement(data2, this.globalData, this);
        };
        HybridRenderer.prototype.createText = function(data2) {
          if (!this.supports3d) {
            return new SVGTextLottieElement(data2, this.globalData, this);
          }
          return new HTextElement(data2, this.globalData, this);
        };
        HybridRenderer.prototype.createCamera = function(data2) {
          this.camera = new HCameraElement(data2, this.globalData, this);
          return this.camera;
        };
        HybridRenderer.prototype.createImage = function(data2) {
          if (!this.supports3d) {
            return new IImageElement(data2, this.globalData, this);
          }
          return new HImageElement(data2, this.globalData, this);
        };
        HybridRenderer.prototype.createComp = function(data2) {
          if (!this.supports3d) {
            return new SVGCompElement(data2, this.globalData, this);
          }
          return new HCompElement(data2, this.globalData, this);
        };
        HybridRenderer.prototype.createSolid = function(data2) {
          if (!this.supports3d) {
            return new ISolidElement(data2, this.globalData, this);
          }
          return new HSolidElement(data2, this.globalData, this);
        };
        HybridRenderer.prototype.createNull = SVGRenderer.prototype.createNull;
        HybridRenderer.prototype.getThreeDContainerByPos = function(pos) {
          var i = 0;
          var len = this.threeDElements.length;
          while (i < len) {
            if (this.threeDElements[i].startPos <= pos && this.threeDElements[i].endPos >= pos) {
              return this.threeDElements[i].perspectiveElem;
            }
            i += 1;
          }
          return null;
        };
        HybridRenderer.prototype.createThreeDContainer = function(pos, type) {
          var perspectiveElem = createTag("div");
          var style;
          var containerStyle;
          styleDiv(perspectiveElem);
          var container = createTag("div");
          styleDiv(container);
          if (type === "3d") {
            style = perspectiveElem.style;
            style.width = this.globalData.compSize.w + "px";
            style.height = this.globalData.compSize.h + "px";
            var center = "50% 50%";
            style.webkitTransformOrigin = center;
            style.mozTransformOrigin = center;
            style.transformOrigin = center;
            containerStyle = container.style;
            var matrix = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
            containerStyle.transform = matrix;
            containerStyle.webkitTransform = matrix;
          }
          perspectiveElem.appendChild(container);
          var threeDContainerData = {
            container,
            perspectiveElem,
            startPos: pos,
            endPos: pos,
            type
          };
          this.threeDElements.push(threeDContainerData);
          return threeDContainerData;
        };
        HybridRenderer.prototype.build3dContainers = function() {
          var i;
          var len = this.layers.length;
          var lastThreeDContainerData;
          var currentContainer = "";
          for (i = 0; i < len; i += 1) {
            if (this.layers[i].ddd && this.layers[i].ty !== 3) {
              if (currentContainer !== "3d") {
                currentContainer = "3d";
                lastThreeDContainerData = this.createThreeDContainer(i, "3d");
              }
              lastThreeDContainerData.endPos = Math.max(lastThreeDContainerData.endPos, i);
            } else {
              if (currentContainer !== "2d") {
                currentContainer = "2d";
                lastThreeDContainerData = this.createThreeDContainer(i, "2d");
              }
              lastThreeDContainerData.endPos = Math.max(lastThreeDContainerData.endPos, i);
            }
          }
          len = this.threeDElements.length;
          for (i = len - 1; i >= 0; i -= 1) {
            this.resizerElem.appendChild(this.threeDElements[i].perspectiveElem);
          }
        };
        HybridRenderer.prototype.addTo3dContainer = function(elem2, pos) {
          var i = 0;
          var len = this.threeDElements.length;
          while (i < len) {
            if (pos <= this.threeDElements[i].endPos) {
              var j = this.threeDElements[i].startPos;
              var nextElement;
              while (j < pos) {
                if (this.elements[j] && this.elements[j].getBaseElement) {
                  nextElement = this.elements[j].getBaseElement();
                }
                j += 1;
              }
              if (nextElement) {
                this.threeDElements[i].container.insertBefore(elem2, nextElement);
              } else {
                this.threeDElements[i].container.appendChild(elem2);
              }
              break;
            }
            i += 1;
          }
        };
        HybridRenderer.prototype.configAnimation = function(animData) {
          var resizerElem = createTag("div");
          var wrapper = this.animationItem.wrapper;
          var style = resizerElem.style;
          style.width = animData.w + "px";
          style.height = animData.h + "px";
          this.resizerElem = resizerElem;
          styleDiv(resizerElem);
          style.transformStyle = "flat";
          style.mozTransformStyle = "flat";
          style.webkitTransformStyle = "flat";
          if (this.renderConfig.className) {
            resizerElem.setAttribute("class", this.renderConfig.className);
          }
          wrapper.appendChild(resizerElem);
          style.overflow = "hidden";
          var svg = createNS("svg");
          svg.setAttribute("width", "1");
          svg.setAttribute("height", "1");
          styleDiv(svg);
          this.resizerElem.appendChild(svg);
          var defs = createNS("defs");
          svg.appendChild(defs);
          this.data = animData;
          this.setupGlobalData(animData, svg);
          this.globalData.defs = defs;
          this.layers = animData.layers;
          this.layerElement = this.resizerElem;
          this.build3dContainers();
          this.updateContainerSize();
        };
        HybridRenderer.prototype.destroy = function() {
          if (this.animationItem.wrapper) {
            this.animationItem.wrapper.innerText = "";
          }
          this.animationItem.container = null;
          this.globalData.defs = null;
          var i;
          var len = this.layers ? this.layers.length : 0;
          for (i = 0; i < len; i += 1) {
            this.elements[i].destroy();
          }
          this.elements.length = 0;
          this.destroyed = true;
          this.animationItem = null;
        };
        HybridRenderer.prototype.updateContainerSize = function() {
          var elementWidth = this.animationItem.wrapper.offsetWidth;
          var elementHeight = this.animationItem.wrapper.offsetHeight;
          var elementRel = elementWidth / elementHeight;
          var animationRel = this.globalData.compSize.w / this.globalData.compSize.h;
          var sx;
          var sy;
          var tx;
          var ty;
          if (animationRel > elementRel) {
            sx = elementWidth / this.globalData.compSize.w;
            sy = elementWidth / this.globalData.compSize.w;
            tx = 0;
            ty = (elementHeight - this.globalData.compSize.h * (elementWidth / this.globalData.compSize.w)) / 2;
          } else {
            sx = elementHeight / this.globalData.compSize.h;
            sy = elementHeight / this.globalData.compSize.h;
            tx = (elementWidth - this.globalData.compSize.w * (elementHeight / this.globalData.compSize.h)) / 2;
            ty = 0;
          }
          var style = this.resizerElem.style;
          style.webkitTransform = "matrix3d(" + sx + ",0,0,0,0," + sy + ",0,0,0,0,1,0," + tx + "," + ty + ",0,1)";
          style.transform = style.webkitTransform;
        };
        HybridRenderer.prototype.renderFrame = SVGRenderer.prototype.renderFrame;
        HybridRenderer.prototype.hide = function() {
          this.resizerElem.style.display = "none";
        };
        HybridRenderer.prototype.show = function() {
          this.resizerElem.style.display = "block";
        };
        HybridRenderer.prototype.initItems = function() {
          this.buildAllItems();
          if (this.camera) {
            this.camera.setup();
          } else {
            var cWidth = this.globalData.compSize.w;
            var cHeight = this.globalData.compSize.h;
            var i;
            var len = this.threeDElements.length;
            for (i = 0; i < len; i += 1) {
              var style = this.threeDElements[i].perspectiveElem.style;
              style.webkitPerspective = Math.sqrt(Math.pow(cWidth, 2) + Math.pow(cHeight, 2)) + "px";
              style.perspective = style.webkitPerspective;
            }
          }
        };
        HybridRenderer.prototype.searchExtraCompositions = function(assets) {
          var i;
          var len = assets.length;
          var floatingContainer = createTag("div");
          for (i = 0; i < len; i += 1) {
            if (assets[i].xt) {
              var comp2 = this.createComp(assets[i], floatingContainer, this.globalData.comp, null);
              comp2.initExpressions();
              this.globalData.projectInterface.registerComposition(comp2);
            }
          }
        };
        function MaskElement(data2, element, globalData2) {
          this.data = data2;
          this.element = element;
          this.globalData = globalData2;
          this.storedData = [];
          this.masksProperties = this.data.masksProperties || [];
          this.maskElement = null;
          var defs = this.globalData.defs;
          var i;
          var len = this.masksProperties ? this.masksProperties.length : 0;
          this.viewData = createSizedArray(len);
          this.solidPath = "";
          var path;
          var properties = this.masksProperties;
          var count = 0;
          var currentMasks = [];
          var j;
          var jLen;
          var layerId = createElementID();
          var rect;
          var expansor;
          var feMorph;
          var x;
          var maskType = "clipPath";
          var maskRef = "clip-path";
          for (i = 0; i < len; i += 1) {
            if (properties[i].mode !== "a" && properties[i].mode !== "n" || properties[i].inv || properties[i].o.k !== 100 || properties[i].o.x) {
              maskType = "mask";
              maskRef = "mask";
            }
            if ((properties[i].mode === "s" || properties[i].mode === "i") && count === 0) {
              rect = createNS("rect");
              rect.setAttribute("fill", "#ffffff");
              rect.setAttribute("width", this.element.comp.data.w || 0);
              rect.setAttribute("height", this.element.comp.data.h || 0);
              currentMasks.push(rect);
            } else {
              rect = null;
            }
            path = createNS("path");
            if (properties[i].mode === "n") {
              this.viewData[i] = {
                op: PropertyFactory.getProp(this.element, properties[i].o, 0, 0.01, this.element),
                prop: ShapePropertyFactory.getShapeProp(this.element, properties[i], 3),
                elem: path,
                lastPath: ""
              };
              defs.appendChild(path);
            } else {
              count += 1;
              path.setAttribute("fill", properties[i].mode === "s" ? "#000000" : "#ffffff");
              path.setAttribute("clip-rule", "nonzero");
              var filterID;
              if (properties[i].x.k !== 0) {
                maskType = "mask";
                maskRef = "mask";
                x = PropertyFactory.getProp(this.element, properties[i].x, 0, null, this.element);
                filterID = createElementID();
                expansor = createNS("filter");
                expansor.setAttribute("id", filterID);
                feMorph = createNS("feMorphology");
                feMorph.setAttribute("operator", "erode");
                feMorph.setAttribute("in", "SourceGraphic");
                feMorph.setAttribute("radius", "0");
                expansor.appendChild(feMorph);
                defs.appendChild(expansor);
                path.setAttribute("stroke", properties[i].mode === "s" ? "#000000" : "#ffffff");
              } else {
                feMorph = null;
                x = null;
              }
              this.storedData[i] = {
                elem: path,
                x,
                expan: feMorph,
                lastPath: "",
                lastOperator: "",
                filterId: filterID,
                lastRadius: 0
              };
              if (properties[i].mode === "i") {
                jLen = currentMasks.length;
                var g = createNS("g");
                for (j = 0; j < jLen; j += 1) {
                  g.appendChild(currentMasks[j]);
                }
                var mask2 = createNS("mask");
                mask2.setAttribute("mask-type", "alpha");
                mask2.setAttribute("id", layerId + "_" + count);
                mask2.appendChild(path);
                defs.appendChild(mask2);
                g.setAttribute("mask", "url(" + locationHref + "#" + layerId + "_" + count + ")");
                currentMasks.length = 0;
                currentMasks.push(g);
              } else {
                currentMasks.push(path);
              }
              if (properties[i].inv && !this.solidPath) {
                this.solidPath = this.createLayerSolidPath();
              }
              this.viewData[i] = {
                elem: path,
                lastPath: "",
                op: PropertyFactory.getProp(this.element, properties[i].o, 0, 0.01, this.element),
                prop: ShapePropertyFactory.getShapeProp(this.element, properties[i], 3),
                invRect: rect
              };
              if (!this.viewData[i].prop.k) {
                this.drawPath(properties[i], this.viewData[i].prop.v, this.viewData[i]);
              }
            }
          }
          this.maskElement = createNS(maskType);
          len = currentMasks.length;
          for (i = 0; i < len; i += 1) {
            this.maskElement.appendChild(currentMasks[i]);
          }
          if (count > 0) {
            this.maskElement.setAttribute("id", layerId);
            this.element.maskedElement.setAttribute(maskRef, "url(" + locationHref + "#" + layerId + ")");
            defs.appendChild(this.maskElement);
          }
          if (this.viewData.length) {
            this.element.addRenderableComponent(this);
          }
        }
        MaskElement.prototype.getMaskProperty = function(pos) {
          return this.viewData[pos].prop;
        };
        MaskElement.prototype.renderFrame = function(isFirstFrame) {
          var finalMat = this.element.finalTransform.mat;
          var i;
          var len = this.masksProperties.length;
          for (i = 0; i < len; i += 1) {
            if (this.viewData[i].prop._mdf || isFirstFrame) {
              this.drawPath(this.masksProperties[i], this.viewData[i].prop.v, this.viewData[i]);
            }
            if (this.viewData[i].op._mdf || isFirstFrame) {
              this.viewData[i].elem.setAttribute("fill-opacity", this.viewData[i].op.v);
            }
            if (this.masksProperties[i].mode !== "n") {
              if (this.viewData[i].invRect && (this.element.finalTransform.mProp._mdf || isFirstFrame)) {
                this.viewData[i].invRect.setAttribute("transform", finalMat.getInverseMatrix().to2dCSS());
              }
              if (this.storedData[i].x && (this.storedData[i].x._mdf || isFirstFrame)) {
                var feMorph = this.storedData[i].expan;
                if (this.storedData[i].x.v < 0) {
                  if (this.storedData[i].lastOperator !== "erode") {
                    this.storedData[i].lastOperator = "erode";
                    this.storedData[i].elem.setAttribute("filter", "url(" + locationHref + "#" + this.storedData[i].filterId + ")");
                  }
                  feMorph.setAttribute("radius", -this.storedData[i].x.v);
                } else {
                  if (this.storedData[i].lastOperator !== "dilate") {
                    this.storedData[i].lastOperator = "dilate";
                    this.storedData[i].elem.setAttribute("filter", null);
                  }
                  this.storedData[i].elem.setAttribute("stroke-width", this.storedData[i].x.v * 2);
                }
              }
            }
          }
        };
        MaskElement.prototype.getMaskelement = function() {
          return this.maskElement;
        };
        MaskElement.prototype.createLayerSolidPath = function() {
          var path = "M0,0 ";
          path += " h" + this.globalData.compSize.w;
          path += " v" + this.globalData.compSize.h;
          path += " h-" + this.globalData.compSize.w;
          path += " v-" + this.globalData.compSize.h + " ";
          return path;
        };
        MaskElement.prototype.drawPath = function(pathData, pathNodes, viewData) {
          var pathString = " M" + pathNodes.v[0][0] + "," + pathNodes.v[0][1];
          var i;
          var len;
          len = pathNodes._length;
          for (i = 1; i < len; i += 1) {
            pathString += " C" + pathNodes.o[i - 1][0] + "," + pathNodes.o[i - 1][1] + " " + pathNodes.i[i][0] + "," + pathNodes.i[i][1] + " " + pathNodes.v[i][0] + "," + pathNodes.v[i][1];
          }
          if (pathNodes.c && len > 1) {
            pathString += " C" + pathNodes.o[i - 1][0] + "," + pathNodes.o[i - 1][1] + " " + pathNodes.i[0][0] + "," + pathNodes.i[0][1] + " " + pathNodes.v[0][0] + "," + pathNodes.v[0][1];
          }
          if (viewData.lastPath !== pathString) {
            var pathShapeValue = "";
            if (viewData.elem) {
              if (pathNodes.c) {
                pathShapeValue = pathData.inv ? this.solidPath + pathString : pathString;
              }
              viewData.elem.setAttribute("d", pathShapeValue);
            }
            viewData.lastPath = pathString;
          }
        };
        MaskElement.prototype.destroy = function() {
          this.element = null;
          this.globalData = null;
          this.maskElement = null;
          this.data = null;
          this.masksProperties = null;
        };
        function HierarchyElement() {
        }
        HierarchyElement.prototype = {
          initHierarchy: function() {
            this.hierarchy = [];
            this._isParent = false;
            this.checkParenting();
          },
          setHierarchy: function(hierarchy) {
            this.hierarchy = hierarchy;
          },
          setAsParent: function() {
            this._isParent = true;
          },
          checkParenting: function() {
            if (this.data.parent !== void 0) {
              this.comp.buildElementParenting(this, this.data.parent, []);
            }
          }
        };
        function FrameElement() {
        }
        FrameElement.prototype = {
          initFrame: function() {
            this._isFirstFrame = false;
            this.dynamicProperties = [];
            this._mdf = false;
          },
          prepareProperties: function(num, isVisible) {
            var i;
            var len = this.dynamicProperties.length;
            for (i = 0; i < len; i += 1) {
              if (isVisible || this._isParent && this.dynamicProperties[i].propType === "transform") {
                this.dynamicProperties[i].getValue();
                if (this.dynamicProperties[i]._mdf) {
                  this.globalData._mdf = true;
                  this._mdf = true;
                }
              }
            }
          },
          addDynamicProperty: function(prop) {
            if (this.dynamicProperties.indexOf(prop) === -1) {
              this.dynamicProperties.push(prop);
            }
          }
        };
        function TransformElement() {
        }
        TransformElement.prototype = {
          initTransform: function() {
            this.finalTransform = {
              mProp: this.data.ks ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this) : { o: 0 },
              _matMdf: false,
              _opMdf: false,
              mat: new Matrix()
            };
            if (this.data.ao) {
              this.finalTransform.mProp.autoOriented = true;
            }
            if (this.data.ty !== 11) {
            }
          },
          renderTransform: function() {
            this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame;
            this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame;
            if (this.hierarchy) {
              var mat;
              var finalMat = this.finalTransform.mat;
              var i = 0;
              var len = this.hierarchy.length;
              if (!this.finalTransform._matMdf) {
                while (i < len) {
                  if (this.hierarchy[i].finalTransform.mProp._mdf) {
                    this.finalTransform._matMdf = true;
                    break;
                  }
                  i += 1;
                }
              }
              if (this.finalTransform._matMdf) {
                mat = this.finalTransform.mProp.v.props;
                finalMat.cloneFromProps(mat);
                for (i = 0; i < len; i += 1) {
                  mat = this.hierarchy[i].finalTransform.mProp.v.props;
                  finalMat.transform(mat[0], mat[1], mat[2], mat[3], mat[4], mat[5], mat[6], mat[7], mat[8], mat[9], mat[10], mat[11], mat[12], mat[13], mat[14], mat[15]);
                }
              }
            }
          },
          globalToLocal: function(pt) {
            var transforms = [];
            transforms.push(this.finalTransform);
            var flag = true;
            var comp2 = this.comp;
            while (flag) {
              if (comp2.finalTransform) {
                if (comp2.data.hasMask) {
                  transforms.splice(0, 0, comp2.finalTransform);
                }
                comp2 = comp2.comp;
              } else {
                flag = false;
              }
            }
            var i;
            var len = transforms.length;
            var ptNew;
            for (i = 0; i < len; i += 1) {
              ptNew = transforms[i].mat.applyToPointArray(0, 0, 0);
              pt = [pt[0] - ptNew[0], pt[1] - ptNew[1], 0];
            }
            return pt;
          },
          mHelper: new Matrix()
        };
        function RenderableElement() {
        }
        RenderableElement.prototype = {
          initRenderable: function() {
            this.isInRange = false;
            this.hidden = false;
            this.isTransparent = false;
            this.renderableComponents = [];
          },
          addRenderableComponent: function(component) {
            if (this.renderableComponents.indexOf(component) === -1) {
              this.renderableComponents.push(component);
            }
          },
          removeRenderableComponent: function(component) {
            if (this.renderableComponents.indexOf(component) !== -1) {
              this.renderableComponents.splice(this.renderableComponents.indexOf(component), 1);
            }
          },
          prepareRenderableFrame: function(num) {
            this.checkLayerLimits(num);
          },
          checkTransparency: function() {
            if (this.finalTransform.mProp.o.v <= 0) {
              if (!this.isTransparent && this.globalData.renderConfig.hideOnTransparent) {
                this.isTransparent = true;
                this.hide();
              }
            } else if (this.isTransparent) {
              this.isTransparent = false;
              this.show();
            }
          },
          checkLayerLimits: function(num) {
            if (this.data.ip - this.data.st <= num && this.data.op - this.data.st > num) {
              if (this.isInRange !== true) {
                this.globalData._mdf = true;
                this._mdf = true;
                this.isInRange = true;
                this.show();
              }
            } else if (this.isInRange !== false) {
              this.globalData._mdf = true;
              this.isInRange = false;
              this.hide();
            }
          },
          renderRenderable: function() {
            var i;
            var len = this.renderableComponents.length;
            for (i = 0; i < len; i += 1) {
              this.renderableComponents[i].renderFrame(this._isFirstFrame);
            }
          },
          sourceRectAtTime: function() {
            return {
              top: 0,
              left: 0,
              width: 100,
              height: 100
            };
          },
          getLayerSize: function() {
            if (this.data.ty === 5) {
              return { w: this.data.textData.width, h: this.data.textData.height };
            }
            return { w: this.data.width, h: this.data.height };
          }
        };
        function RenderableDOMElement() {
        }
        (function() {
          var _prototype = {
            initElement: function(data2, globalData2, comp2) {
              this.initFrame();
              this.initBaseData(data2, globalData2, comp2);
              this.initTransform(data2, globalData2, comp2);
              this.initHierarchy();
              this.initRenderable();
              this.initRendererElement();
              this.createContainerElements();
              this.createRenderableComponents();
              this.createContent();
              this.hide();
            },
            hide: function() {
              if (!this.hidden && (!this.isInRange || this.isTransparent)) {
                var elem2 = this.baseElement || this.layerElement;
                elem2.style.display = "none";
                this.hidden = true;
              }
            },
            show: function() {
              if (this.isInRange && !this.isTransparent) {
                if (!this.data.hd) {
                  var elem2 = this.baseElement || this.layerElement;
                  elem2.style.display = "block";
                }
                this.hidden = false;
                this._isFirstFrame = true;
              }
            },
            renderFrame: function() {
              if (this.data.hd || this.hidden) {
                return;
              }
              this.renderTransform();
              this.renderRenderable();
              this.renderElement();
              this.renderInnerContent();
              if (this._isFirstFrame) {
                this._isFirstFrame = false;
              }
            },
            renderInnerContent: function() {
            },
            prepareFrame: function(num) {
              this._mdf = false;
              this.prepareRenderableFrame(num);
              this.prepareProperties(num, this.isInRange);
              this.checkTransparency();
            },
            destroy: function() {
              this.innerElem = null;
              this.destroyBaseElement();
            }
          };
          extendPrototype([RenderableElement, createProxyFunction(_prototype)], RenderableDOMElement);
        })();
        function ProcessedElement(element, position2) {
          this.elem = element;
          this.pos = position2;
        }
        function SVGStyleData(data2, level) {
          this.data = data2;
          this.type = data2.ty;
          this.d = "";
          this.lvl = level;
          this._mdf = false;
          this.closed = data2.hd === true;
          this.pElem = createNS("path");
          this.msElem = null;
        }
        SVGStyleData.prototype.reset = function() {
          this.d = "";
          this._mdf = false;
        };
        function SVGShapeData(transformers, level, shape) {
          this.caches = [];
          this.styles = [];
          this.transformers = transformers;
          this.lStr = "";
          this.sh = shape;
          this.lvl = level;
          this._isAnimated = !!shape.k;
          var i = 0;
          var len = transformers.length;
          while (i < len) {
            if (transformers[i].mProps.dynamicProperties.length) {
              this._isAnimated = true;
              break;
            }
            i += 1;
          }
        }
        SVGShapeData.prototype.setAsAnimated = function() {
          this._isAnimated = true;
        };
        function SVGTransformData(mProps, op, container) {
          this.transform = {
            mProps,
            op,
            container
          };
          this.elements = [];
          this._isAnimated = this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length;
        }
        function SVGStrokeStyleData(elem2, data2, styleOb) {
          this.initDynamicPropertyContainer(elem2);
          this.getValue = this.iterateDynamicProperties;
          this.o = PropertyFactory.getProp(elem2, data2.o, 0, 0.01, this);
          this.w = PropertyFactory.getProp(elem2, data2.w, 0, null, this);
          this.d = new DashProperty(elem2, data2.d || {}, "svg", this);
          this.c = PropertyFactory.getProp(elem2, data2.c, 1, 255, this);
          this.style = styleOb;
          this._isAnimated = !!this._isAnimated;
        }
        extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData);
        function SVGFillStyleData(elem2, data2, styleOb) {
          this.initDynamicPropertyContainer(elem2);
          this.getValue = this.iterateDynamicProperties;
          this.o = PropertyFactory.getProp(elem2, data2.o, 0, 0.01, this);
          this.c = PropertyFactory.getProp(elem2, data2.c, 1, 255, this);
          this.style = styleOb;
        }
        extendPrototype([DynamicPropertyContainer], SVGFillStyleData);
        function SVGGradientFillStyleData(elem2, data2, styleOb) {
          this.initDynamicPropertyContainer(elem2);
          this.getValue = this.iterateDynamicProperties;
          this.initGradientData(elem2, data2, styleOb);
        }
        SVGGradientFillStyleData.prototype.initGradientData = function(elem2, data2, styleOb) {
          this.o = PropertyFactory.getProp(elem2, data2.o, 0, 0.01, this);
          this.s = PropertyFactory.getProp(elem2, data2.s, 1, null, this);
          this.e = PropertyFactory.getProp(elem2, data2.e, 1, null, this);
          this.h = PropertyFactory.getProp(elem2, data2.h || { k: 0 }, 0, 0.01, this);
          this.a = PropertyFactory.getProp(elem2, data2.a || { k: 0 }, 0, degToRads, this);
          this.g = new GradientProperty(elem2, data2.g, this);
          this.style = styleOb;
          this.stops = [];
          this.setGradientData(styleOb.pElem, data2);
          this.setGradientOpacity(data2, styleOb);
          this._isAnimated = !!this._isAnimated;
        };
        SVGGradientFillStyleData.prototype.setGradientData = function(pathElement, data2) {
          var gradientId = createElementID();
          var gfill = createNS(data2.t === 1 ? "linearGradient" : "radialGradient");
          gfill.setAttribute("id", gradientId);
          gfill.setAttribute("spreadMethod", "pad");
          gfill.setAttribute("gradientUnits", "userSpaceOnUse");
          var stops = [];
          var stop;
          var j;
          var jLen;
          jLen = data2.g.p * 4;
          for (j = 0; j < jLen; j += 4) {
            stop = createNS("stop");
            gfill.appendChild(stop);
            stops.push(stop);
          }
          pathElement.setAttribute(data2.ty === "gf" ? "fill" : "stroke", "url(" + locationHref + "#" + gradientId + ")");
          this.gf = gfill;
          this.cst = stops;
        };
        SVGGradientFillStyleData.prototype.setGradientOpacity = function(data2, styleOb) {
          if (this.g._hasOpacity && !this.g._collapsable) {
            var stop;
            var j;
            var jLen;
            var mask2 = createNS("mask");
            var maskElement = createNS("path");
            mask2.appendChild(maskElement);
            var opacityId = createElementID();
            var maskId = createElementID();
            mask2.setAttribute("id", maskId);
            var opFill = createNS(data2.t === 1 ? "linearGradient" : "radialGradient");
            opFill.setAttribute("id", opacityId);
            opFill.setAttribute("spreadMethod", "pad");
            opFill.setAttribute("gradientUnits", "userSpaceOnUse");
            jLen = data2.g.k.k[0].s ? data2.g.k.k[0].s.length : data2.g.k.k.length;
            var stops = this.stops;
            for (j = data2.g.p * 4; j < jLen; j += 2) {
              stop = createNS("stop");
              stop.setAttribute("stop-color", "rgb(255,255,255)");
              opFill.appendChild(stop);
              stops.push(stop);
            }
            maskElement.setAttribute(data2.ty === "gf" ? "fill" : "stroke", "url(" + locationHref + "#" + opacityId + ")");
            if (data2.ty === "gs") {
              maskElement.setAttribute("stroke-linecap", lineCapEnum[data2.lc || 2]);
              maskElement.setAttribute("stroke-linejoin", lineJoinEnum[data2.lj || 2]);
              if (data2.lj === 1) {
                maskElement.setAttribute("stroke-miterlimit", data2.ml);
              }
            }
            this.of = opFill;
            this.ms = mask2;
            this.ost = stops;
            this.maskId = maskId;
            styleOb.msElem = maskElement;
          }
        };
        extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData);
        function SVGGradientStrokeStyleData(elem2, data2, styleOb) {
          this.initDynamicPropertyContainer(elem2);
          this.getValue = this.iterateDynamicProperties;
          this.w = PropertyFactory.getProp(elem2, data2.w, 0, null, this);
          this.d = new DashProperty(elem2, data2.d || {}, "svg", this);
          this.initGradientData(elem2, data2, styleOb);
          this._isAnimated = !!this._isAnimated;
        }
        extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);
        function ShapeGroupData() {
          this.it = [];
          this.prevViewData = [];
          this.gr = createNS("g");
        }
        var SVGElementsRenderer = function() {
          var _identityMatrix = new Matrix();
          var _matrixHelper = new Matrix();
          var ob2 = {
            createRenderFunction
          };
          function createRenderFunction(data2) {
            switch (data2.ty) {
              case "fl":
                return renderFill;
              case "gf":
                return renderGradient;
              case "gs":
                return renderGradientStroke;
              case "st":
                return renderStroke;
              case "sh":
              case "el":
              case "rc":
              case "sr":
                return renderPath;
              case "tr":
                return renderContentTransform;
              default:
                return null;
            }
          }
          function renderContentTransform(styleData, itemData, isFirstFrame) {
            if (isFirstFrame || itemData.transform.op._mdf) {
              itemData.transform.container.setAttribute("opacity", itemData.transform.op.v);
            }
            if (isFirstFrame || itemData.transform.mProps._mdf) {
              itemData.transform.container.setAttribute("transform", itemData.transform.mProps.v.to2dCSS());
            }
          }
          function renderPath(styleData, itemData, isFirstFrame) {
            var j;
            var jLen;
            var pathStringTransformed;
            var redraw;
            var pathNodes;
            var l;
            var lLen = itemData.styles.length;
            var lvl = itemData.lvl;
            var paths;
            var mat;
            var props;
            var iterations;
            var k;
            for (l = 0; l < lLen; l += 1) {
              redraw = itemData.sh._mdf || isFirstFrame;
              if (itemData.styles[l].lvl < lvl) {
                mat = _matrixHelper.reset();
                iterations = lvl - itemData.styles[l].lvl;
                k = itemData.transformers.length - 1;
                while (!redraw && iterations > 0) {
                  redraw = itemData.transformers[k].mProps._mdf || redraw;
                  iterations -= 1;
                  k -= 1;
                }
                if (redraw) {
                  iterations = lvl - itemData.styles[l].lvl;
                  k = itemData.transformers.length - 1;
                  while (iterations > 0) {
                    props = itemData.transformers[k].mProps.v.props;
                    mat.transform(props[0], props[1], props[2], props[3], props[4], props[5], props[6], props[7], props[8], props[9], props[10], props[11], props[12], props[13], props[14], props[15]);
                    iterations -= 1;
                    k -= 1;
                  }
                }
              } else {
                mat = _identityMatrix;
              }
              paths = itemData.sh.paths;
              jLen = paths._length;
              if (redraw) {
                pathStringTransformed = "";
                for (j = 0; j < jLen; j += 1) {
                  pathNodes = paths.shapes[j];
                  if (pathNodes && pathNodes._length) {
                    pathStringTransformed += buildShapeString(pathNodes, pathNodes._length, pathNodes.c, mat);
                  }
                }
                itemData.caches[l] = pathStringTransformed;
              } else {
                pathStringTransformed = itemData.caches[l];
              }
              itemData.styles[l].d += styleData.hd === true ? "" : pathStringTransformed;
              itemData.styles[l]._mdf = redraw || itemData.styles[l]._mdf;
            }
          }
          function renderFill(styleData, itemData, isFirstFrame) {
            var styleElem = itemData.style;
            if (itemData.c._mdf || isFirstFrame) {
              styleElem.pElem.setAttribute("fill", "rgb(" + bmFloor(itemData.c.v[0]) + "," + bmFloor(itemData.c.v[1]) + "," + bmFloor(itemData.c.v[2]) + ")");
            }
            if (itemData.o._mdf || isFirstFrame) {
              styleElem.pElem.setAttribute("fill-opacity", itemData.o.v);
            }
          }
          function renderGradientStroke(styleData, itemData, isFirstFrame) {
            renderGradient(styleData, itemData, isFirstFrame);
            renderStroke(styleData, itemData, isFirstFrame);
          }
          function renderGradient(styleData, itemData, isFirstFrame) {
            var gfill = itemData.gf;
            var hasOpacity = itemData.g._hasOpacity;
            var pt1 = itemData.s.v;
            var pt2 = itemData.e.v;
            if (itemData.o._mdf || isFirstFrame) {
              var attr = styleData.ty === "gf" ? "fill-opacity" : "stroke-opacity";
              itemData.style.pElem.setAttribute(attr, itemData.o.v);
            }
            if (itemData.s._mdf || isFirstFrame) {
              var attr1 = styleData.t === 1 ? "x1" : "cx";
              var attr2 = attr1 === "x1" ? "y1" : "cy";
              gfill.setAttribute(attr1, pt1[0]);
              gfill.setAttribute(attr2, pt1[1]);
              if (hasOpacity && !itemData.g._collapsable) {
                itemData.of.setAttribute(attr1, pt1[0]);
                itemData.of.setAttribute(attr2, pt1[1]);
              }
            }
            var stops;
            var i;
            var len;
            var stop;
            if (itemData.g._cmdf || isFirstFrame) {
              stops = itemData.cst;
              var cValues = itemData.g.c;
              len = stops.length;
              for (i = 0; i < len; i += 1) {
                stop = stops[i];
                stop.setAttribute("offset", cValues[i * 4] + "%");
                stop.setAttribute("stop-color", "rgb(" + cValues[i * 4 + 1] + "," + cValues[i * 4 + 2] + "," + cValues[i * 4 + 3] + ")");
              }
            }
            if (hasOpacity && (itemData.g._omdf || isFirstFrame)) {
              var oValues = itemData.g.o;
              if (itemData.g._collapsable) {
                stops = itemData.cst;
              } else {
                stops = itemData.ost;
              }
              len = stops.length;
              for (i = 0; i < len; i += 1) {
                stop = stops[i];
                if (!itemData.g._collapsable) {
                  stop.setAttribute("offset", oValues[i * 2] + "%");
                }
                stop.setAttribute("stop-opacity", oValues[i * 2 + 1]);
              }
            }
            if (styleData.t === 1) {
              if (itemData.e._mdf || isFirstFrame) {
                gfill.setAttribute("x2", pt2[0]);
                gfill.setAttribute("y2", pt2[1]);
                if (hasOpacity && !itemData.g._collapsable) {
                  itemData.of.setAttribute("x2", pt2[0]);
                  itemData.of.setAttribute("y2", pt2[1]);
                }
              }
            } else {
              var rad;
              if (itemData.s._mdf || itemData.e._mdf || isFirstFrame) {
                rad = Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
                gfill.setAttribute("r", rad);
                if (hasOpacity && !itemData.g._collapsable) {
                  itemData.of.setAttribute("r", rad);
                }
              }
              if (itemData.e._mdf || itemData.h._mdf || itemData.a._mdf || isFirstFrame) {
                if (!rad) {
                  rad = Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
                }
                var ang = Math.atan2(pt2[1] - pt1[1], pt2[0] - pt1[0]);
                var percent = itemData.h.v;
                if (percent >= 1) {
                  percent = 0.99;
                } else if (percent <= -1) {
                  percent = -0.99;
                }
                var dist = rad * percent;
                var x = Math.cos(ang + itemData.a.v) * dist + pt1[0];
                var y = Math.sin(ang + itemData.a.v) * dist + pt1[1];
                gfill.setAttribute("fx", x);
                gfill.setAttribute("fy", y);
                if (hasOpacity && !itemData.g._collapsable) {
                  itemData.of.setAttribute("fx", x);
                  itemData.of.setAttribute("fy", y);
                }
              }
            }
          }
          function renderStroke(styleData, itemData, isFirstFrame) {
            var styleElem = itemData.style;
            var d = itemData.d;
            if (d && (d._mdf || isFirstFrame) && d.dashStr) {
              styleElem.pElem.setAttribute("stroke-dasharray", d.dashStr);
              styleElem.pElem.setAttribute("stroke-dashoffset", d.dashoffset[0]);
            }
            if (itemData.c && (itemData.c._mdf || isFirstFrame)) {
              styleElem.pElem.setAttribute("stroke", "rgb(" + bmFloor(itemData.c.v[0]) + "," + bmFloor(itemData.c.v[1]) + "," + bmFloor(itemData.c.v[2]) + ")");
            }
            if (itemData.o._mdf || isFirstFrame) {
              styleElem.pElem.setAttribute("stroke-opacity", itemData.o.v);
            }
            if (itemData.w._mdf || isFirstFrame) {
              styleElem.pElem.setAttribute("stroke-width", itemData.w.v);
              if (styleElem.msElem) {
                styleElem.msElem.setAttribute("stroke-width", itemData.w.v);
              }
            }
          }
          return ob2;
        }();
        function ShapeTransformManager() {
          this.sequences = {};
          this.sequenceList = [];
          this.transform_key_count = 0;
        }
        ShapeTransformManager.prototype = {
          addTransformSequence: function(transforms) {
            var i;
            var len = transforms.length;
            var key2 = "_";
            for (i = 0; i < len; i += 1) {
              key2 += transforms[i].transform.key + "_";
            }
            var sequence = this.sequences[key2];
            if (!sequence) {
              sequence = {
                transforms: [].concat(transforms),
                finalTransform: new Matrix(),
                _mdf: false
              };
              this.sequences[key2] = sequence;
              this.sequenceList.push(sequence);
            }
            return sequence;
          },
          processSequence: function(sequence, isFirstFrame) {
            var i = 0;
            var len = sequence.transforms.length;
            var _mdf = isFirstFrame;
            while (i < len && !isFirstFrame) {
              if (sequence.transforms[i].transform.mProps._mdf) {
                _mdf = true;
                break;
              }
              i += 1;
            }
            if (_mdf) {
              var props;
              sequence.finalTransform.reset();
              for (i = len - 1; i >= 0; i -= 1) {
                props = sequence.transforms[i].transform.mProps.v.props;
                sequence.finalTransform.transform(props[0], props[1], props[2], props[3], props[4], props[5], props[6], props[7], props[8], props[9], props[10], props[11], props[12], props[13], props[14], props[15]);
              }
            }
            sequence._mdf = _mdf;
          },
          processSequences: function(isFirstFrame) {
            var i;
            var len = this.sequenceList.length;
            for (i = 0; i < len; i += 1) {
              this.processSequence(this.sequenceList[i], isFirstFrame);
            }
          },
          getNewKey: function() {
            this.transform_key_count += 1;
            return "_" + this.transform_key_count;
          }
        };
        function CVShapeData(element, data2, styles, transformsManager) {
          this.styledShapes = [];
          this.tr = [0, 0, 0, 0, 0, 0];
          var ty = 4;
          if (data2.ty === "rc") {
            ty = 5;
          } else if (data2.ty === "el") {
            ty = 6;
          } else if (data2.ty === "sr") {
            ty = 7;
          }
          this.sh = ShapePropertyFactory.getShapeProp(element, data2, ty, element);
          var i;
          var len = styles.length;
          var styledShape;
          for (i = 0; i < len; i += 1) {
            if (!styles[i].closed) {
              styledShape = {
                transforms: transformsManager.addTransformSequence(styles[i].transforms),
                trNodes: []
              };
              this.styledShapes.push(styledShape);
              styles[i].elements.push(styledShape);
            }
          }
        }
        CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated;
        function BaseElement() {
        }
        BaseElement.prototype = {
          checkMasks: function() {
            if (!this.data.hasMask) {
              return false;
            }
            var i = 0;
            var len = this.data.masksProperties.length;
            while (i < len) {
              if (this.data.masksProperties[i].mode !== "n" && this.data.masksProperties[i].cl !== false) {
                return true;
              }
              i += 1;
            }
            return false;
          },
          initExpressions: function() {
            this.layerInterface = LayerExpressionInterface(this);
            if (this.data.hasMask && this.maskManager) {
              this.layerInterface.registerMaskInterface(this.maskManager);
            }
            var effectsInterface = EffectsExpressionInterface.createEffectsInterface(this, this.layerInterface);
            this.layerInterface.registerEffectsInterface(effectsInterface);
            if (this.data.ty === 0 || this.data.xt) {
              this.compInterface = CompExpressionInterface(this);
            } else if (this.data.ty === 4) {
              this.layerInterface.shapeInterface = ShapeExpressionInterface(this.shapesData, this.itemsData, this.layerInterface);
              this.layerInterface.content = this.layerInterface.shapeInterface;
            } else if (this.data.ty === 5) {
              this.layerInterface.textInterface = TextExpressionInterface(this);
              this.layerInterface.text = this.layerInterface.textInterface;
            }
          },
          setBlendMode: function() {
            var blendModeValue = getBlendMode(this.data.bm);
            var elem2 = this.baseElement || this.layerElement;
            elem2.style["mix-blend-mode"] = blendModeValue;
          },
          initBaseData: function(data2, globalData2, comp2) {
            this.globalData = globalData2;
            this.comp = comp2;
            this.data = data2;
            this.layerId = createElementID();
            if (!this.data.sr) {
              this.data.sr = 1;
            }
            this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties);
          },
          getType: function() {
            return this.type;
          },
          sourceRectAtTime: function() {
          }
        };
        function NullElement(data2, globalData2, comp2) {
          this.initFrame();
          this.initBaseData(data2, globalData2, comp2);
          this.initFrame();
          this.initTransform(data2, globalData2, comp2);
          this.initHierarchy();
        }
        NullElement.prototype.prepareFrame = function(num) {
          this.prepareProperties(num, true);
        };
        NullElement.prototype.renderFrame = function() {
        };
        NullElement.prototype.getBaseElement = function() {
          return null;
        };
        NullElement.prototype.destroy = function() {
        };
        NullElement.prototype.sourceRectAtTime = function() {
        };
        NullElement.prototype.hide = function() {
        };
        extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement);
        function SVGBaseElement() {
        }
        SVGBaseElement.prototype = {
          initRendererElement: function() {
            this.layerElement = createNS("g");
          },
          createContainerElements: function() {
            this.matteElement = createNS("g");
            this.transformedElement = this.layerElement;
            this.maskedElement = this.layerElement;
            this._sizeChanged = false;
            var layerElementParent = null;
            var filId;
            var fil;
            var gg;
            if (this.data.td) {
              if (this.data.td == 3 || this.data.td == 1) {
                var masker = createNS("mask");
                masker.setAttribute("id", this.layerId);
                masker.setAttribute("mask-type", this.data.td == 3 ? "luminance" : "alpha");
                masker.appendChild(this.layerElement);
                layerElementParent = masker;
                this.globalData.defs.appendChild(masker);
                if (!featureSupport.maskType && this.data.td == 1) {
                  masker.setAttribute("mask-type", "luminance");
                  filId = createElementID();
                  fil = filtersFactory.createFilter(filId);
                  this.globalData.defs.appendChild(fil);
                  fil.appendChild(filtersFactory.createAlphaToLuminanceFilter());
                  gg = createNS("g");
                  gg.appendChild(this.layerElement);
                  layerElementParent = gg;
                  masker.appendChild(gg);
                  gg.setAttribute("filter", "url(" + locationHref + "#" + filId + ")");
                }
              } else if (this.data.td == 2) {
                var maskGroup = createNS("mask");
                maskGroup.setAttribute("id", this.layerId);
                maskGroup.setAttribute("mask-type", "alpha");
                var maskGrouper = createNS("g");
                maskGroup.appendChild(maskGrouper);
                filId = createElementID();
                fil = filtersFactory.createFilter(filId);
                var feCTr = createNS("feComponentTransfer");
                feCTr.setAttribute("in", "SourceGraphic");
                fil.appendChild(feCTr);
                var feFunc = createNS("feFuncA");
                feFunc.setAttribute("type", "table");
                feFunc.setAttribute("tableValues", "1.0 0.0");
                feCTr.appendChild(feFunc);
                this.globalData.defs.appendChild(fil);
                var alphaRect = createNS("rect");
                alphaRect.setAttribute("width", this.comp.data.w);
                alphaRect.setAttribute("height", this.comp.data.h);
                alphaRect.setAttribute("x", "0");
                alphaRect.setAttribute("y", "0");
                alphaRect.setAttribute("fill", "#ffffff");
                alphaRect.setAttribute("opacity", "0");
                maskGrouper.setAttribute("filter", "url(" + locationHref + "#" + filId + ")");
                maskGrouper.appendChild(alphaRect);
                maskGrouper.appendChild(this.layerElement);
                layerElementParent = maskGrouper;
                if (!featureSupport.maskType) {
                  maskGroup.setAttribute("mask-type", "luminance");
                  fil.appendChild(filtersFactory.createAlphaToLuminanceFilter());
                  gg = createNS("g");
                  maskGrouper.appendChild(alphaRect);
                  gg.appendChild(this.layerElement);
                  layerElementParent = gg;
                  maskGrouper.appendChild(gg);
                }
                this.globalData.defs.appendChild(maskGroup);
              }
            } else if (this.data.tt) {
              this.matteElement.appendChild(this.layerElement);
              layerElementParent = this.matteElement;
              this.baseElement = this.matteElement;
            } else {
              this.baseElement = this.layerElement;
            }
            if (this.data.ln) {
              this.layerElement.setAttribute("id", this.data.ln);
            }
            if (this.data.cl) {
              this.layerElement.setAttribute("class", this.data.cl);
            }
            if (this.data.ty === 0 && !this.data.hd) {
              var cp = createNS("clipPath");
              var pt = createNS("path");
              pt.setAttribute("d", "M0,0 L" + this.data.w + ",0 L" + this.data.w + "," + this.data.h + " L0," + this.data.h + "z");
              var clipId = createElementID();
              cp.setAttribute("id", clipId);
              cp.appendChild(pt);
              this.globalData.defs.appendChild(cp);
              if (this.checkMasks()) {
                var cpGroup = createNS("g");
                cpGroup.setAttribute("clip-path", "url(" + locationHref + "#" + clipId + ")");
                cpGroup.appendChild(this.layerElement);
                this.transformedElement = cpGroup;
                if (layerElementParent) {
                  layerElementParent.appendChild(this.transformedElement);
                } else {
                  this.baseElement = this.transformedElement;
                }
              } else {
                this.layerElement.setAttribute("clip-path", "url(" + locationHref + "#" + clipId + ")");
              }
            }
            if (this.data.bm !== 0) {
              this.setBlendMode();
            }
          },
          renderElement: function() {
            if (this.finalTransform._matMdf) {
              this.transformedElement.setAttribute("transform", this.finalTransform.mat.to2dCSS());
            }
            if (this.finalTransform._opMdf) {
              this.transformedElement.setAttribute("opacity", this.finalTransform.mProp.o.v);
            }
          },
          destroyBaseElement: function() {
            this.layerElement = null;
            this.matteElement = null;
            this.maskManager.destroy();
          },
          getBaseElement: function() {
            if (this.data.hd) {
              return null;
            }
            return this.baseElement;
          },
          createRenderableComponents: function() {
            this.maskManager = new MaskElement(this.data, this, this.globalData);
            this.renderableEffectsManager = new SVGEffects(this);
          },
          setMatte: function(id2) {
            if (!this.matteElement) {
              return;
            }
            this.matteElement.setAttribute("mask", "url(" + locationHref + "#" + id2 + ")");
          }
        };
        function IShapeElement() {
        }
        IShapeElement.prototype = {
          addShapeToModifiers: function(data2) {
            var i;
            var len = this.shapeModifiers.length;
            for (i = 0; i < len; i += 1) {
              this.shapeModifiers[i].addShape(data2);
            }
          },
          isShapeInAnimatedModifiers: function(data2) {
            var i = 0;
            var len = this.shapeModifiers.length;
            while (i < len) {
              if (this.shapeModifiers[i].isAnimatedWithShape(data2)) {
                return true;
              }
            }
            return false;
          },
          renderModifiers: function() {
            if (!this.shapeModifiers.length) {
              return;
            }
            var i;
            var len = this.shapes.length;
            for (i = 0; i < len; i += 1) {
              this.shapes[i].sh.reset();
            }
            len = this.shapeModifiers.length;
            var shouldBreakProcess;
            for (i = len - 1; i >= 0; i -= 1) {
              shouldBreakProcess = this.shapeModifiers[i].processShapes(this._isFirstFrame);
              if (shouldBreakProcess) {
                break;
              }
            }
          },
          searchProcessedElement: function(elem2) {
            var elements = this.processedElements;
            var i = 0;
            var len = elements.length;
            while (i < len) {
              if (elements[i].elem === elem2) {
                return elements[i].pos;
              }
              i += 1;
            }
            return 0;
          },
          addProcessedElement: function(elem2, pos) {
            var elements = this.processedElements;
            var i = elements.length;
            while (i) {
              i -= 1;
              if (elements[i].elem === elem2) {
                elements[i].pos = pos;
                return;
              }
            }
            elements.push(new ProcessedElement(elem2, pos));
          },
          prepareFrame: function(num) {
            this.prepareRenderableFrame(num);
            this.prepareProperties(num, this.isInRange);
          }
        };
        function ITextElement() {
        }
        ITextElement.prototype.initElement = function(data2, globalData2, comp2) {
          this.lettersChangedFlag = true;
          this.initFrame();
          this.initBaseData(data2, globalData2, comp2);
          this.textProperty = new TextProperty(this, data2.t, this.dynamicProperties);
          this.textAnimator = new TextAnimatorProperty(data2.t, this.renderType, this);
          this.initTransform(data2, globalData2, comp2);
          this.initHierarchy();
          this.initRenderable();
          this.initRendererElement();
          this.createContainerElements();
          this.createRenderableComponents();
          this.createContent();
          this.hide();
          this.textAnimator.searchProperties(this.dynamicProperties);
        };
        ITextElement.prototype.prepareFrame = function(num) {
          this._mdf = false;
          this.prepareRenderableFrame(num);
          this.prepareProperties(num, this.isInRange);
          if (this.textProperty._mdf || this.textProperty._isFirstFrame) {
            this.buildNewText();
            this.textProperty._isFirstFrame = false;
            this.textProperty._mdf = false;
          }
        };
        ITextElement.prototype.createPathShape = function(matrixHelper, shapes) {
          var j;
          var jLen = shapes.length;
          var pathNodes;
          var shapeStr = "";
          for (j = 0; j < jLen; j += 1) {
            pathNodes = shapes[j].ks.k;
            shapeStr += buildShapeString(pathNodes, pathNodes.i.length, true, matrixHelper);
          }
          return shapeStr;
        };
        ITextElement.prototype.updateDocumentData = function(newData, index2) {
          this.textProperty.updateDocumentData(newData, index2);
        };
        ITextElement.prototype.canResizeFont = function(_canResize) {
          this.textProperty.canResizeFont(_canResize);
        };
        ITextElement.prototype.setMinimumFontSize = function(_fontSize) {
          this.textProperty.setMinimumFontSize(_fontSize);
        };
        ITextElement.prototype.applyTextPropertiesToMatrix = function(documentData, matrixHelper, lineNumber, xPos, yPos) {
          if (documentData.ps) {
            matrixHelper.translate(documentData.ps[0], documentData.ps[1] + documentData.ascent, 0);
          }
          matrixHelper.translate(0, -documentData.ls, 0);
          switch (documentData.j) {
            case 1:
              matrixHelper.translate(documentData.justifyOffset + (documentData.boxWidth - documentData.lineWidths[lineNumber]), 0, 0);
              break;
            case 2:
              matrixHelper.translate(documentData.justifyOffset + (documentData.boxWidth - documentData.lineWidths[lineNumber]) / 2, 0, 0);
              break;
            default:
              break;
          }
          matrixHelper.translate(xPos, yPos, 0);
        };
        ITextElement.prototype.buildColor = function(colorData) {
          return "rgb(" + Math.round(colorData[0] * 255) + "," + Math.round(colorData[1] * 255) + "," + Math.round(colorData[2] * 255) + ")";
        };
        ITextElement.prototype.emptyProp = new LetterProps();
        ITextElement.prototype.destroy = function() {
        };
        function ICompElement() {
        }
        extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement], ICompElement);
        ICompElement.prototype.initElement = function(data2, globalData2, comp2) {
          this.initFrame();
          this.initBaseData(data2, globalData2, comp2);
          this.initTransform(data2, globalData2, comp2);
          this.initRenderable();
          this.initHierarchy();
          this.initRendererElement();
          this.createContainerElements();
          this.createRenderableComponents();
          if (this.data.xt || !globalData2.progressiveLoad) {
            this.buildAllItems();
          }
          this.hide();
        };
        ICompElement.prototype.prepareFrame = function(num) {
          this._mdf = false;
          this.prepareRenderableFrame(num);
          this.prepareProperties(num, this.isInRange);
          if (!this.isInRange && !this.data.xt) {
            return;
          }
          if (!this.tm._placeholder) {
            var timeRemapped = this.tm.v;
            if (timeRemapped === this.data.op) {
              timeRemapped = this.data.op - 1;
            }
            this.renderedFrame = timeRemapped;
          } else {
            this.renderedFrame = num / this.data.sr;
          }
          var i;
          var len = this.elements.length;
          if (!this.completeLayers) {
            this.checkLayers(this.renderedFrame);
          }
          for (i = len - 1; i >= 0; i -= 1) {
            if (this.completeLayers || this.elements[i]) {
              this.elements[i].prepareFrame(this.renderedFrame - this.layers[i].st);
              if (this.elements[i]._mdf) {
                this._mdf = true;
              }
            }
          }
        };
        ICompElement.prototype.renderInnerContent = function() {
          var i;
          var len = this.layers.length;
          for (i = 0; i < len; i += 1) {
            if (this.completeLayers || this.elements[i]) {
              this.elements[i].renderFrame();
            }
          }
        };
        ICompElement.prototype.setElements = function(elems) {
          this.elements = elems;
        };
        ICompElement.prototype.getElements = function() {
          return this.elements;
        };
        ICompElement.prototype.destroyElements = function() {
          var i;
          var len = this.layers.length;
          for (i = 0; i < len; i += 1) {
            if (this.elements[i]) {
              this.elements[i].destroy();
            }
          }
        };
        ICompElement.prototype.destroy = function() {
          this.destroyElements();
          this.destroyBaseElement();
        };
        function IImageElement(data2, globalData2, comp2) {
          this.assetData = globalData2.getAssetData(data2.refId);
          this.initElement(data2, globalData2, comp2);
          this.sourceRect = {
            top: 0,
            left: 0,
            width: this.assetData.w,
            height: this.assetData.h
          };
        }
        extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], IImageElement);
        IImageElement.prototype.createContent = function() {
          var assetPath = this.globalData.getAssetsPath(this.assetData);
          this.innerElem = createNS("image");
          this.innerElem.setAttribute("width", this.assetData.w + "px");
          this.innerElem.setAttribute("height", this.assetData.h + "px");
          this.innerElem.setAttribute("preserveAspectRatio", this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio);
          this.innerElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", assetPath);
          this.layerElement.appendChild(this.innerElem);
        };
        IImageElement.prototype.sourceRectAtTime = function() {
          return this.sourceRect;
        };
        function ISolidElement(data2, globalData2, comp2) {
          this.initElement(data2, globalData2, comp2);
        }
        extendPrototype([IImageElement], ISolidElement);
        ISolidElement.prototype.createContent = function() {
          var rect = createNS("rect");
          rect.setAttribute("width", this.data.sw);
          rect.setAttribute("height", this.data.sh);
          rect.setAttribute("fill", this.data.sc);
          this.layerElement.appendChild(rect);
        };
        function AudioElement(data2, globalData2, comp2) {
          this.initFrame();
          this.initRenderable();
          this.assetData = globalData2.getAssetData(data2.refId);
          this.initBaseData(data2, globalData2, comp2);
          this._isPlaying = false;
          this._canPlay = false;
          var assetPath = this.globalData.getAssetsPath(this.assetData);
          this.audio = this.globalData.audioController.createAudio(assetPath);
          this._currentTime = 0;
          this.globalData.audioController.addAudio(this);
          this.tm = data2.tm ? PropertyFactory.getProp(this, data2.tm, 0, globalData2.frameRate, this) : { _placeholder: true };
        }
        AudioElement.prototype.prepareFrame = function(num) {
          this.prepareRenderableFrame(num, true);
          this.prepareProperties(num, true);
          if (!this.tm._placeholder) {
            var timeRemapped = this.tm.v;
            this._currentTime = timeRemapped;
          } else {
            this._currentTime = num / this.data.sr;
          }
        };
        extendPrototype([RenderableElement, BaseElement, FrameElement], AudioElement);
        AudioElement.prototype.renderFrame = function() {
          if (this.isInRange && this._canPlay) {
            if (!this._isPlaying) {
              this.audio.play();
              this.audio.seek(this._currentTime / this.globalData.frameRate);
              this._isPlaying = true;
            } else if (!this.audio.playing() || Math.abs(this._currentTime / this.globalData.frameRate - this.audio.seek()) > 0.1) {
              this.audio.seek(this._currentTime / this.globalData.frameRate);
            }
          }
        };
        AudioElement.prototype.show = function() {
        };
        AudioElement.prototype.hide = function() {
          this.audio.pause();
          this._isPlaying = false;
        };
        AudioElement.prototype.pause = function() {
          this.audio.pause();
          this._isPlaying = false;
          this._canPlay = false;
        };
        AudioElement.prototype.resume = function() {
          this._canPlay = true;
        };
        AudioElement.prototype.setRate = function(rateValue) {
          this.audio.rate(rateValue);
        };
        AudioElement.prototype.volume = function(volumeValue) {
          this.audio.volume(volumeValue);
        };
        AudioElement.prototype.getBaseElement = function() {
          return null;
        };
        AudioElement.prototype.destroy = function() {
        };
        AudioElement.prototype.sourceRectAtTime = function() {
        };
        AudioElement.prototype.initExpressions = function() {
        };
        function FootageElement(data2, globalData2, comp2) {
          this.initFrame();
          this.initRenderable();
          this.assetData = globalData2.getAssetData(data2.refId);
          this.footageData = globalData2.imageLoader.getAsset(this.assetData);
          this.initBaseData(data2, globalData2, comp2);
        }
        FootageElement.prototype.prepareFrame = function() {
        };
        extendPrototype([RenderableElement, BaseElement, FrameElement], FootageElement);
        FootageElement.prototype.getBaseElement = function() {
          return null;
        };
        FootageElement.prototype.renderFrame = function() {
        };
        FootageElement.prototype.destroy = function() {
        };
        FootageElement.prototype.initExpressions = function() {
          this.layerInterface = FootageInterface(this);
        };
        FootageElement.prototype.getFootageData = function() {
          return this.footageData;
        };
        function SVGCompElement(data2, globalData2, comp2) {
          this.layers = data2.layers;
          this.supports3d = true;
          this.completeLayers = false;
          this.pendingElements = [];
          this.elements = this.layers ? createSizedArray(this.layers.length) : [];
          this.initElement(data2, globalData2, comp2);
          this.tm = data2.tm ? PropertyFactory.getProp(this, data2.tm, 0, globalData2.frameRate, this) : { _placeholder: true };
        }
        extendPrototype([SVGRenderer, ICompElement, SVGBaseElement], SVGCompElement);
        function SVGTextLottieElement(data2, globalData2, comp2) {
          this.textSpans = [];
          this.renderType = "svg";
          this.initElement(data2, globalData2, comp2);
        }
        extendPrototype([BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], SVGTextLottieElement);
        SVGTextLottieElement.prototype.createContent = function() {
          if (this.data.singleShape && !this.globalData.fontManager.chars) {
            this.textContainer = createNS("text");
          }
        };
        SVGTextLottieElement.prototype.buildTextContents = function(textArray) {
          var i = 0;
          var len = textArray.length;
          var textContents = [];
          var currentTextContent = "";
          while (i < len) {
            if (textArray[i] === String.fromCharCode(13) || textArray[i] === String.fromCharCode(3)) {
              textContents.push(currentTextContent);
              currentTextContent = "";
            } else {
              currentTextContent += textArray[i];
            }
            i += 1;
          }
          textContents.push(currentTextContent);
          return textContents;
        };
        SVGTextLottieElement.prototype.buildNewText = function() {
          var i;
          var len;
          var documentData = this.textProperty.currentData;
          this.renderedLetters = createSizedArray(documentData ? documentData.l.length : 0);
          if (documentData.fc) {
            this.layerElement.setAttribute("fill", this.buildColor(documentData.fc));
          } else {
            this.layerElement.setAttribute("fill", "rgba(0,0,0,0)");
          }
          if (documentData.sc) {
            this.layerElement.setAttribute("stroke", this.buildColor(documentData.sc));
            this.layerElement.setAttribute("stroke-width", documentData.sw);
          }
          this.layerElement.setAttribute("font-size", documentData.finalSize);
          var fontData = this.globalData.fontManager.getFontByName(documentData.f);
          if (fontData.fClass) {
            this.layerElement.setAttribute("class", fontData.fClass);
          } else {
            this.layerElement.setAttribute("font-family", fontData.fFamily);
            var fWeight = documentData.fWeight;
            var fStyle = documentData.fStyle;
            this.layerElement.setAttribute("font-style", fStyle);
            this.layerElement.setAttribute("font-weight", fWeight);
          }
          this.layerElement.setAttribute("aria-label", documentData.t);
          var letters = documentData.l || [];
          var usesGlyphs = !!this.globalData.fontManager.chars;
          len = letters.length;
          var tSpan;
          var matrixHelper = this.mHelper;
          var shapes;
          var shapeStr = "";
          var singleShape = this.data.singleShape;
          var xPos = 0;
          var yPos = 0;
          var firstLine = true;
          var trackingOffset = documentData.tr * 1e-3 * documentData.finalSize;
          if (singleShape && !usesGlyphs && !documentData.sz) {
            var tElement = this.textContainer;
            var justify = "start";
            switch (documentData.j) {
              case 1:
                justify = "end";
                break;
              case 2:
                justify = "middle";
                break;
              default:
                justify = "start";
                break;
            }
            tElement.setAttribute("text-anchor", justify);
            tElement.setAttribute("letter-spacing", trackingOffset);
            var textContent = this.buildTextContents(documentData.finalText);
            len = textContent.length;
            yPos = documentData.ps ? documentData.ps[1] + documentData.ascent : 0;
            for (i = 0; i < len; i += 1) {
              tSpan = this.textSpans[i] || createNS("tspan");
              tSpan.textContent = textContent[i];
              tSpan.setAttribute("x", 0);
              tSpan.setAttribute("y", yPos);
              tSpan.style.display = "inherit";
              tElement.appendChild(tSpan);
              this.textSpans[i] = tSpan;
              yPos += documentData.finalLineHeight;
            }
            this.layerElement.appendChild(tElement);
          } else {
            var cachedSpansLength = this.textSpans.length;
            var shapeData;
            var charData;
            for (i = 0; i < len; i += 1) {
              if (!usesGlyphs || !singleShape || i === 0) {
                tSpan = cachedSpansLength > i ? this.textSpans[i] : createNS(usesGlyphs ? "path" : "text");
                if (cachedSpansLength <= i) {
                  tSpan.setAttribute("stroke-linecap", "butt");
                  tSpan.setAttribute("stroke-linejoin", "round");
                  tSpan.setAttribute("stroke-miterlimit", "4");
                  this.textSpans[i] = tSpan;
                  this.layerElement.appendChild(tSpan);
                }
                tSpan.style.display = "inherit";
              }
              matrixHelper.reset();
              matrixHelper.scale(documentData.finalSize / 100, documentData.finalSize / 100);
              if (singleShape) {
                if (letters[i].n) {
                  xPos = -trackingOffset;
                  yPos += documentData.yOffset;
                  yPos += firstLine ? 1 : 0;
                  firstLine = false;
                }
                this.applyTextPropertiesToMatrix(documentData, matrixHelper, letters[i].line, xPos, yPos);
                xPos += letters[i].l || 0;
                xPos += trackingOffset;
              }
              if (usesGlyphs) {
                charData = this.globalData.fontManager.getCharData(documentData.finalText[i], fontData.fStyle, this.globalData.fontManager.getFontByName(documentData.f).fFamily);
                shapeData = charData && charData.data || {};
                shapes = shapeData.shapes ? shapeData.shapes[0].it : [];
                if (!singleShape) {
                  tSpan.setAttribute("d", this.createPathShape(matrixHelper, shapes));
                } else {
                  shapeStr += this.createPathShape(matrixHelper, shapes);
                }
              } else {
                if (singleShape) {
                  tSpan.setAttribute("transform", "translate(" + matrixHelper.props[12] + "," + matrixHelper.props[13] + ")");
                }
                tSpan.textContent = letters[i].val;
                tSpan.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
              }
            }
            if (singleShape && tSpan) {
              tSpan.setAttribute("d", shapeStr);
            }
          }
          while (i < this.textSpans.length) {
            this.textSpans[i].style.display = "none";
            i += 1;
          }
          this._sizeChanged = true;
        };
        SVGTextLottieElement.prototype.sourceRectAtTime = function() {
          this.prepareFrame(this.comp.renderedFrame - this.data.st);
          this.renderInnerContent();
          if (this._sizeChanged) {
            this._sizeChanged = false;
            var textBox = this.layerElement.getBBox();
            this.bbox = {
              top: textBox.y,
              left: textBox.x,
              width: textBox.width,
              height: textBox.height
            };
          }
          return this.bbox;
        };
        SVGTextLottieElement.prototype.renderInnerContent = function() {
          if (!this.data.singleShape) {
            this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
            if (this.lettersChangedFlag || this.textAnimator.lettersChangedFlag) {
              this._sizeChanged = true;
              var i;
              var len;
              var renderedLetters = this.textAnimator.renderedLetters;
              var letters = this.textProperty.currentData.l;
              len = letters.length;
              var renderedLetter;
              var textSpan;
              for (i = 0; i < len; i += 1) {
                if (!letters[i].n) {
                  renderedLetter = renderedLetters[i];
                  textSpan = this.textSpans[i];
                  if (renderedLetter._mdf.m) {
                    textSpan.setAttribute("transform", renderedLetter.m);
                  }
                  if (renderedLetter._mdf.o) {
                    textSpan.setAttribute("opacity", renderedLetter.o);
                  }
                  if (renderedLetter._mdf.sw) {
                    textSpan.setAttribute("stroke-width", renderedLetter.sw);
                  }
                  if (renderedLetter._mdf.sc) {
                    textSpan.setAttribute("stroke", renderedLetter.sc);
                  }
                  if (renderedLetter._mdf.fc) {
                    textSpan.setAttribute("fill", renderedLetter.fc);
                  }
                }
              }
            }
          }
        };
        function SVGShapeElement(data2, globalData2, comp2) {
          this.shapes = [];
          this.shapesData = data2.shapes;
          this.stylesList = [];
          this.shapeModifiers = [];
          this.itemsData = [];
          this.processedElements = [];
          this.animatedContents = [];
          this.initElement(data2, globalData2, comp2);
          this.prevViewData = [];
        }
        extendPrototype([BaseElement, TransformElement, SVGBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableDOMElement], SVGShapeElement);
        SVGShapeElement.prototype.initSecondaryElement = function() {
        };
        SVGShapeElement.prototype.identityMatrix = new Matrix();
        SVGShapeElement.prototype.buildExpressionInterface = function() {
        };
        SVGShapeElement.prototype.createContent = function() {
          this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], true);
          this.filterUniqueShapes();
        };
        SVGShapeElement.prototype.filterUniqueShapes = function() {
          var i;
          var len = this.shapes.length;
          var shape;
          var j;
          var jLen = this.stylesList.length;
          var style;
          var tempShapes = [];
          var areAnimated = false;
          for (j = 0; j < jLen; j += 1) {
            style = this.stylesList[j];
            areAnimated = false;
            tempShapes.length = 0;
            for (i = 0; i < len; i += 1) {
              shape = this.shapes[i];
              if (shape.styles.indexOf(style) !== -1) {
                tempShapes.push(shape);
                areAnimated = shape._isAnimated || areAnimated;
              }
            }
            if (tempShapes.length > 1 && areAnimated) {
              this.setShapesAsAnimated(tempShapes);
            }
          }
        };
        SVGShapeElement.prototype.setShapesAsAnimated = function(shapes) {
          var i;
          var len = shapes.length;
          for (i = 0; i < len; i += 1) {
            shapes[i].setAsAnimated();
          }
        };
        SVGShapeElement.prototype.createStyleElement = function(data2, level) {
          var elementData;
          var styleOb = new SVGStyleData(data2, level);
          var pathElement = styleOb.pElem;
          if (data2.ty === "st") {
            elementData = new SVGStrokeStyleData(this, data2, styleOb);
          } else if (data2.ty === "fl") {
            elementData = new SVGFillStyleData(this, data2, styleOb);
          } else if (data2.ty === "gf" || data2.ty === "gs") {
            var GradientConstructor = data2.ty === "gf" ? SVGGradientFillStyleData : SVGGradientStrokeStyleData;
            elementData = new GradientConstructor(this, data2, styleOb);
            this.globalData.defs.appendChild(elementData.gf);
            if (elementData.maskId) {
              this.globalData.defs.appendChild(elementData.ms);
              this.globalData.defs.appendChild(elementData.of);
              pathElement.setAttribute("mask", "url(" + locationHref + "#" + elementData.maskId + ")");
            }
          }
          if (data2.ty === "st" || data2.ty === "gs") {
            pathElement.setAttribute("stroke-linecap", lineCapEnum[data2.lc || 2]);
            pathElement.setAttribute("stroke-linejoin", lineJoinEnum[data2.lj || 2]);
            pathElement.setAttribute("fill-opacity", "0");
            if (data2.lj === 1) {
              pathElement.setAttribute("stroke-miterlimit", data2.ml);
            }
          }
          if (data2.r === 2) {
            pathElement.setAttribute("fill-rule", "evenodd");
          }
          if (data2.ln) {
            pathElement.setAttribute("id", data2.ln);
          }
          if (data2.cl) {
            pathElement.setAttribute("class", data2.cl);
          }
          if (data2.bm) {
            pathElement.style["mix-blend-mode"] = getBlendMode(data2.bm);
          }
          this.stylesList.push(styleOb);
          this.addToAnimatedContents(data2, elementData);
          return elementData;
        };
        SVGShapeElement.prototype.createGroupElement = function(data2) {
          var elementData = new ShapeGroupData();
          if (data2.ln) {
            elementData.gr.setAttribute("id", data2.ln);
          }
          if (data2.cl) {
            elementData.gr.setAttribute("class", data2.cl);
          }
          if (data2.bm) {
            elementData.gr.style["mix-blend-mode"] = getBlendMode(data2.bm);
          }
          return elementData;
        };
        SVGShapeElement.prototype.createTransformElement = function(data2, container) {
          var transformProperty = TransformPropertyFactory.getTransformProperty(this, data2, this);
          var elementData = new SVGTransformData(transformProperty, transformProperty.o, container);
          this.addToAnimatedContents(data2, elementData);
          return elementData;
        };
        SVGShapeElement.prototype.createShapeElement = function(data2, ownTransformers, level) {
          var ty = 4;
          if (data2.ty === "rc") {
            ty = 5;
          } else if (data2.ty === "el") {
            ty = 6;
          } else if (data2.ty === "sr") {
            ty = 7;
          }
          var shapeProperty = ShapePropertyFactory.getShapeProp(this, data2, ty, this);
          var elementData = new SVGShapeData(ownTransformers, level, shapeProperty);
          this.shapes.push(elementData);
          this.addShapeToModifiers(elementData);
          this.addToAnimatedContents(data2, elementData);
          return elementData;
        };
        SVGShapeElement.prototype.addToAnimatedContents = function(data2, element) {
          var i = 0;
          var len = this.animatedContents.length;
          while (i < len) {
            if (this.animatedContents[i].element === element) {
              return;
            }
            i += 1;
          }
          this.animatedContents.push({
            fn: SVGElementsRenderer.createRenderFunction(data2),
            element,
            data: data2
          });
        };
        SVGShapeElement.prototype.setElementStyles = function(elementData) {
          var arr = elementData.styles;
          var j;
          var jLen = this.stylesList.length;
          for (j = 0; j < jLen; j += 1) {
            if (!this.stylesList[j].closed) {
              arr.push(this.stylesList[j]);
            }
          }
        };
        SVGShapeElement.prototype.reloadShapes = function() {
          this._isFirstFrame = true;
          var i;
          var len = this.itemsData.length;
          for (i = 0; i < len; i += 1) {
            this.prevViewData[i] = this.itemsData[i];
          }
          this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], true);
          this.filterUniqueShapes();
          len = this.dynamicProperties.length;
          for (i = 0; i < len; i += 1) {
            this.dynamicProperties[i].getValue();
          }
          this.renderModifiers();
        };
        SVGShapeElement.prototype.searchShapes = function(arr, itemsData, prevViewData, container, level, transformers, render) {
          var ownTransformers = [].concat(transformers);
          var i;
          var len = arr.length - 1;
          var j;
          var jLen;
          var ownStyles = [];
          var ownModifiers = [];
          var currentTransform;
          var modifier;
          var processedPos;
          for (i = len; i >= 0; i -= 1) {
            processedPos = this.searchProcessedElement(arr[i]);
            if (!processedPos) {
              arr[i]._render = render;
            } else {
              itemsData[i] = prevViewData[processedPos - 1];
            }
            if (arr[i].ty === "fl" || arr[i].ty === "st" || arr[i].ty === "gf" || arr[i].ty === "gs") {
              if (!processedPos) {
                itemsData[i] = this.createStyleElement(arr[i], level);
              } else {
                itemsData[i].style.closed = false;
              }
              if (arr[i]._render) {
                if (itemsData[i].style.pElem.parentNode !== container) {
                  container.appendChild(itemsData[i].style.pElem);
                }
              }
              ownStyles.push(itemsData[i].style);
            } else if (arr[i].ty === "gr") {
              if (!processedPos) {
                itemsData[i] = this.createGroupElement(arr[i]);
              } else {
                jLen = itemsData[i].it.length;
                for (j = 0; j < jLen; j += 1) {
                  itemsData[i].prevViewData[j] = itemsData[i].it[j];
                }
              }
              this.searchShapes(arr[i].it, itemsData[i].it, itemsData[i].prevViewData, itemsData[i].gr, level + 1, ownTransformers, render);
              if (arr[i]._render) {
                if (itemsData[i].gr.parentNode !== container) {
                  container.appendChild(itemsData[i].gr);
                }
              }
            } else if (arr[i].ty === "tr") {
              if (!processedPos) {
                itemsData[i] = this.createTransformElement(arr[i], container);
              }
              currentTransform = itemsData[i].transform;
              ownTransformers.push(currentTransform);
            } else if (arr[i].ty === "sh" || arr[i].ty === "rc" || arr[i].ty === "el" || arr[i].ty === "sr") {
              if (!processedPos) {
                itemsData[i] = this.createShapeElement(arr[i], ownTransformers, level);
              }
              this.setElementStyles(itemsData[i]);
            } else if (arr[i].ty === "tm" || arr[i].ty === "rd" || arr[i].ty === "ms" || arr[i].ty === "pb") {
              if (!processedPos) {
                modifier = ShapeModifiers.getModifier(arr[i].ty);
                modifier.init(this, arr[i]);
                itemsData[i] = modifier;
                this.shapeModifiers.push(modifier);
              } else {
                modifier = itemsData[i];
                modifier.closed = false;
              }
              ownModifiers.push(modifier);
            } else if (arr[i].ty === "rp") {
              if (!processedPos) {
                modifier = ShapeModifiers.getModifier(arr[i].ty);
                itemsData[i] = modifier;
                modifier.init(this, arr, i, itemsData);
                this.shapeModifiers.push(modifier);
                render = false;
              } else {
                modifier = itemsData[i];
                modifier.closed = true;
              }
              ownModifiers.push(modifier);
            }
            this.addProcessedElement(arr[i], i + 1);
          }
          len = ownStyles.length;
          for (i = 0; i < len; i += 1) {
            ownStyles[i].closed = true;
          }
          len = ownModifiers.length;
          for (i = 0; i < len; i += 1) {
            ownModifiers[i].closed = true;
          }
        };
        SVGShapeElement.prototype.renderInnerContent = function() {
          this.renderModifiers();
          var i;
          var len = this.stylesList.length;
          for (i = 0; i < len; i += 1) {
            this.stylesList[i].reset();
          }
          this.renderShape();
          for (i = 0; i < len; i += 1) {
            if (this.stylesList[i]._mdf || this._isFirstFrame) {
              if (this.stylesList[i].msElem) {
                this.stylesList[i].msElem.setAttribute("d", this.stylesList[i].d);
                this.stylesList[i].d = "M0 0" + this.stylesList[i].d;
              }
              this.stylesList[i].pElem.setAttribute("d", this.stylesList[i].d || "M0 0");
            }
          }
        };
        SVGShapeElement.prototype.renderShape = function() {
          var i;
          var len = this.animatedContents.length;
          var animatedContent;
          for (i = 0; i < len; i += 1) {
            animatedContent = this.animatedContents[i];
            if ((this._isFirstFrame || animatedContent.element._isAnimated) && animatedContent.data !== true) {
              animatedContent.fn(animatedContent.data, animatedContent.element, this._isFirstFrame);
            }
          }
        };
        SVGShapeElement.prototype.destroy = function() {
          this.destroyBaseElement();
          this.shapesData = null;
          this.itemsData = null;
        };
        function SVGTintFilter(filter, filterManager) {
          this.filterManager = filterManager;
          var feColorMatrix = createNS("feColorMatrix");
          feColorMatrix.setAttribute("type", "matrix");
          feColorMatrix.setAttribute("color-interpolation-filters", "linearRGB");
          feColorMatrix.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0");
          feColorMatrix.setAttribute("result", "f1");
          filter.appendChild(feColorMatrix);
          feColorMatrix = createNS("feColorMatrix");
          feColorMatrix.setAttribute("type", "matrix");
          feColorMatrix.setAttribute("color-interpolation-filters", "sRGB");
          feColorMatrix.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0");
          feColorMatrix.setAttribute("result", "f2");
          filter.appendChild(feColorMatrix);
          this.matrixFilter = feColorMatrix;
          if (filterManager.effectElements[2].p.v !== 100 || filterManager.effectElements[2].p.k) {
            var feMerge = createNS("feMerge");
            filter.appendChild(feMerge);
            var feMergeNode;
            feMergeNode = createNS("feMergeNode");
            feMergeNode.setAttribute("in", "SourceGraphic");
            feMerge.appendChild(feMergeNode);
            feMergeNode = createNS("feMergeNode");
            feMergeNode.setAttribute("in", "f2");
            feMerge.appendChild(feMergeNode);
          }
        }
        SVGTintFilter.prototype.renderFrame = function(forceRender) {
          if (forceRender || this.filterManager._mdf) {
            var colorBlack = this.filterManager.effectElements[0].p.v;
            var colorWhite = this.filterManager.effectElements[1].p.v;
            var opacity = this.filterManager.effectElements[2].p.v / 100;
            this.matrixFilter.setAttribute("values", colorWhite[0] - colorBlack[0] + " 0 0 0 " + colorBlack[0] + " " + (colorWhite[1] - colorBlack[1]) + " 0 0 0 " + colorBlack[1] + " " + (colorWhite[2] - colorBlack[2]) + " 0 0 0 " + colorBlack[2] + " 0 0 0 " + opacity + " 0");
          }
        };
        function SVGFillFilter(filter, filterManager) {
          this.filterManager = filterManager;
          var feColorMatrix = createNS("feColorMatrix");
          feColorMatrix.setAttribute("type", "matrix");
          feColorMatrix.setAttribute("color-interpolation-filters", "sRGB");
          feColorMatrix.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0");
          filter.appendChild(feColorMatrix);
          this.matrixFilter = feColorMatrix;
        }
        SVGFillFilter.prototype.renderFrame = function(forceRender) {
          if (forceRender || this.filterManager._mdf) {
            var color = this.filterManager.effectElements[2].p.v;
            var opacity = this.filterManager.effectElements[6].p.v;
            this.matrixFilter.setAttribute("values", "0 0 0 0 " + color[0] + " 0 0 0 0 " + color[1] + " 0 0 0 0 " + color[2] + " 0 0 0 " + opacity + " 0");
          }
        };
        function SVGGaussianBlurEffect(filter, filterManager) {
          filter.setAttribute("x", "-100%");
          filter.setAttribute("y", "-100%");
          filter.setAttribute("width", "300%");
          filter.setAttribute("height", "300%");
          this.filterManager = filterManager;
          var feGaussianBlur = createNS("feGaussianBlur");
          filter.appendChild(feGaussianBlur);
          this.feGaussianBlur = feGaussianBlur;
        }
        SVGGaussianBlurEffect.prototype.renderFrame = function(forceRender) {
          if (forceRender || this.filterManager._mdf) {
            var kBlurrinessToSigma = 0.3;
            var sigma = this.filterManager.effectElements[0].p.v * kBlurrinessToSigma;
            var dimensions = this.filterManager.effectElements[1].p.v;
            var sigmaX = dimensions == 3 ? 0 : sigma;
            var sigmaY = dimensions == 2 ? 0 : sigma;
            this.feGaussianBlur.setAttribute("stdDeviation", sigmaX + " " + sigmaY);
            var edgeMode = this.filterManager.effectElements[2].p.v == 1 ? "wrap" : "duplicate";
            this.feGaussianBlur.setAttribute("edgeMode", edgeMode);
          }
        };
        function SVGStrokeEffect(elem2, filterManager) {
          this.initialized = false;
          this.filterManager = filterManager;
          this.elem = elem2;
          this.paths = [];
        }
        SVGStrokeEffect.prototype.initialize = function() {
          var elemChildren = this.elem.layerElement.children || this.elem.layerElement.childNodes;
          var path;
          var groupPath;
          var i;
          var len;
          if (this.filterManager.effectElements[1].p.v === 1) {
            len = this.elem.maskManager.masksProperties.length;
            i = 0;
          } else {
            i = this.filterManager.effectElements[0].p.v - 1;
            len = i + 1;
          }
          groupPath = createNS("g");
          groupPath.setAttribute("fill", "none");
          groupPath.setAttribute("stroke-linecap", "round");
          groupPath.setAttribute("stroke-dashoffset", 1);
          for (i; i < len; i += 1) {
            path = createNS("path");
            groupPath.appendChild(path);
            this.paths.push({ p: path, m: i });
          }
          if (this.filterManager.effectElements[10].p.v === 3) {
            var mask2 = createNS("mask");
            var id2 = createElementID();
            mask2.setAttribute("id", id2);
            mask2.setAttribute("mask-type", "alpha");
            mask2.appendChild(groupPath);
            this.elem.globalData.defs.appendChild(mask2);
            var g = createNS("g");
            g.setAttribute("mask", "url(" + locationHref + "#" + id2 + ")");
            while (elemChildren[0]) {
              g.appendChild(elemChildren[0]);
            }
            this.elem.layerElement.appendChild(g);
            this.masker = mask2;
            groupPath.setAttribute("stroke", "#fff");
          } else if (this.filterManager.effectElements[10].p.v === 1 || this.filterManager.effectElements[10].p.v === 2) {
            if (this.filterManager.effectElements[10].p.v === 2) {
              elemChildren = this.elem.layerElement.children || this.elem.layerElement.childNodes;
              while (elemChildren.length) {
                this.elem.layerElement.removeChild(elemChildren[0]);
              }
            }
            this.elem.layerElement.appendChild(groupPath);
            this.elem.layerElement.removeAttribute("mask");
            groupPath.setAttribute("stroke", "#fff");
          }
          this.initialized = true;
          this.pathMasker = groupPath;
        };
        SVGStrokeEffect.prototype.renderFrame = function(forceRender) {
          if (!this.initialized) {
            this.initialize();
          }
          var i;
          var len = this.paths.length;
          var mask2;
          var path;
          for (i = 0; i < len; i += 1) {
            if (this.paths[i].m !== -1) {
              mask2 = this.elem.maskManager.viewData[this.paths[i].m];
              path = this.paths[i].p;
              if (forceRender || this.filterManager._mdf || mask2.prop._mdf) {
                path.setAttribute("d", mask2.lastPath);
              }
              if (forceRender || this.filterManager.effectElements[9].p._mdf || this.filterManager.effectElements[4].p._mdf || this.filterManager.effectElements[7].p._mdf || this.filterManager.effectElements[8].p._mdf || mask2.prop._mdf) {
                var dasharrayValue;
                if (this.filterManager.effectElements[7].p.v !== 0 || this.filterManager.effectElements[8].p.v !== 100) {
                  var s = Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) * 0.01;
                  var e = Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v) * 0.01;
                  var l = path.getTotalLength();
                  dasharrayValue = "0 0 0 " + l * s + " ";
                  var lineLength = l * (e - s);
                  var segment = 1 + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01;
                  var units = Math.floor(lineLength / segment);
                  var j;
                  for (j = 0; j < units; j += 1) {
                    dasharrayValue += "1 " + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01 + " ";
                  }
                  dasharrayValue += "0 " + l * 10 + " 0 0";
                } else {
                  dasharrayValue = "1 " + this.filterManager.effectElements[4].p.v * 2 * this.filterManager.effectElements[9].p.v * 0.01;
                }
                path.setAttribute("stroke-dasharray", dasharrayValue);
              }
            }
          }
          if (forceRender || this.filterManager.effectElements[4].p._mdf) {
            this.pathMasker.setAttribute("stroke-width", this.filterManager.effectElements[4].p.v * 2);
          }
          if (forceRender || this.filterManager.effectElements[6].p._mdf) {
            this.pathMasker.setAttribute("opacity", this.filterManager.effectElements[6].p.v);
          }
          if (this.filterManager.effectElements[10].p.v === 1 || this.filterManager.effectElements[10].p.v === 2) {
            if (forceRender || this.filterManager.effectElements[3].p._mdf) {
              var color = this.filterManager.effectElements[3].p.v;
              this.pathMasker.setAttribute("stroke", "rgb(" + bmFloor(color[0] * 255) + "," + bmFloor(color[1] * 255) + "," + bmFloor(color[2] * 255) + ")");
            }
          }
        };
        function SVGTritoneFilter(filter, filterManager) {
          this.filterManager = filterManager;
          var feColorMatrix = createNS("feColorMatrix");
          feColorMatrix.setAttribute("type", "matrix");
          feColorMatrix.setAttribute("color-interpolation-filters", "linearRGB");
          feColorMatrix.setAttribute("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0");
          feColorMatrix.setAttribute("result", "f1");
          filter.appendChild(feColorMatrix);
          var feComponentTransfer = createNS("feComponentTransfer");
          feComponentTransfer.setAttribute("color-interpolation-filters", "sRGB");
          filter.appendChild(feComponentTransfer);
          this.matrixFilter = feComponentTransfer;
          var feFuncR = createNS("feFuncR");
          feFuncR.setAttribute("type", "table");
          feComponentTransfer.appendChild(feFuncR);
          this.feFuncR = feFuncR;
          var feFuncG = createNS("feFuncG");
          feFuncG.setAttribute("type", "table");
          feComponentTransfer.appendChild(feFuncG);
          this.feFuncG = feFuncG;
          var feFuncB = createNS("feFuncB");
          feFuncB.setAttribute("type", "table");
          feComponentTransfer.appendChild(feFuncB);
          this.feFuncB = feFuncB;
        }
        SVGTritoneFilter.prototype.renderFrame = function(forceRender) {
          if (forceRender || this.filterManager._mdf) {
            var color1 = this.filterManager.effectElements[0].p.v;
            var color2 = this.filterManager.effectElements[1].p.v;
            var color3 = this.filterManager.effectElements[2].p.v;
            var tableR = color3[0] + " " + color2[0] + " " + color1[0];
            var tableG = color3[1] + " " + color2[1] + " " + color1[1];
            var tableB = color3[2] + " " + color2[2] + " " + color1[2];
            this.feFuncR.setAttribute("tableValues", tableR);
            this.feFuncG.setAttribute("tableValues", tableG);
            this.feFuncB.setAttribute("tableValues", tableB);
          }
        };
        function SVGProLevelsFilter(filter, filterManager) {
          this.filterManager = filterManager;
          var effectElements = this.filterManager.effectElements;
          var feComponentTransfer = createNS("feComponentTransfer");
          if (effectElements[10].p.k || effectElements[10].p.v !== 0 || effectElements[11].p.k || effectElements[11].p.v !== 1 || effectElements[12].p.k || effectElements[12].p.v !== 1 || effectElements[13].p.k || effectElements[13].p.v !== 0 || effectElements[14].p.k || effectElements[14].p.v !== 1) {
            this.feFuncR = this.createFeFunc("feFuncR", feComponentTransfer);
          }
          if (effectElements[17].p.k || effectElements[17].p.v !== 0 || effectElements[18].p.k || effectElements[18].p.v !== 1 || effectElements[19].p.k || effectElements[19].p.v !== 1 || effectElements[20].p.k || effectElements[20].p.v !== 0 || effectElements[21].p.k || effectElements[21].p.v !== 1) {
            this.feFuncG = this.createFeFunc("feFuncG", feComponentTransfer);
          }
          if (effectElements[24].p.k || effectElements[24].p.v !== 0 || effectElements[25].p.k || effectElements[25].p.v !== 1 || effectElements[26].p.k || effectElements[26].p.v !== 1 || effectElements[27].p.k || effectElements[27].p.v !== 0 || effectElements[28].p.k || effectElements[28].p.v !== 1) {
            this.feFuncB = this.createFeFunc("feFuncB", feComponentTransfer);
          }
          if (effectElements[31].p.k || effectElements[31].p.v !== 0 || effectElements[32].p.k || effectElements[32].p.v !== 1 || effectElements[33].p.k || effectElements[33].p.v !== 1 || effectElements[34].p.k || effectElements[34].p.v !== 0 || effectElements[35].p.k || effectElements[35].p.v !== 1) {
            this.feFuncA = this.createFeFunc("feFuncA", feComponentTransfer);
          }
          if (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) {
            feComponentTransfer.setAttribute("color-interpolation-filters", "sRGB");
            filter.appendChild(feComponentTransfer);
            feComponentTransfer = createNS("feComponentTransfer");
          }
          if (effectElements[3].p.k || effectElements[3].p.v !== 0 || effectElements[4].p.k || effectElements[4].p.v !== 1 || effectElements[5].p.k || effectElements[5].p.v !== 1 || effectElements[6].p.k || effectElements[6].p.v !== 0 || effectElements[7].p.k || effectElements[7].p.v !== 1) {
            feComponentTransfer.setAttribute("color-interpolation-filters", "sRGB");
            filter.appendChild(feComponentTransfer);
            this.feFuncRComposed = this.createFeFunc("feFuncR", feComponentTransfer);
            this.feFuncGComposed = this.createFeFunc("feFuncG", feComponentTransfer);
            this.feFuncBComposed = this.createFeFunc("feFuncB", feComponentTransfer);
          }
        }
        SVGProLevelsFilter.prototype.createFeFunc = function(type, feComponentTransfer) {
          var feFunc = createNS(type);
          feFunc.setAttribute("type", "table");
          feComponentTransfer.appendChild(feFunc);
          return feFunc;
        };
        SVGProLevelsFilter.prototype.getTableValue = function(inputBlack, inputWhite, gamma, outputBlack, outputWhite) {
          var cnt = 0;
          var segments = 256;
          var perc;
          var min = Math.min(inputBlack, inputWhite);
          var max = Math.max(inputBlack, inputWhite);
          var table = Array.call(null, { length: segments });
          var colorValue;
          var pos = 0;
          var outputDelta = outputWhite - outputBlack;
          var inputDelta = inputWhite - inputBlack;
          while (cnt <= 256) {
            perc = cnt / 256;
            if (perc <= min) {
              colorValue = inputDelta < 0 ? outputWhite : outputBlack;
            } else if (perc >= max) {
              colorValue = inputDelta < 0 ? outputBlack : outputWhite;
            } else {
              colorValue = outputBlack + outputDelta * Math.pow((perc - inputBlack) / inputDelta, 1 / gamma);
            }
            table[pos] = colorValue;
            pos += 1;
            cnt += 256 / (segments - 1);
          }
          return table.join(" ");
        };
        SVGProLevelsFilter.prototype.renderFrame = function(forceRender) {
          if (forceRender || this.filterManager._mdf) {
            var val2;
            var effectElements = this.filterManager.effectElements;
            if (this.feFuncRComposed && (forceRender || effectElements[3].p._mdf || effectElements[4].p._mdf || effectElements[5].p._mdf || effectElements[6].p._mdf || effectElements[7].p._mdf)) {
              val2 = this.getTableValue(effectElements[3].p.v, effectElements[4].p.v, effectElements[5].p.v, effectElements[6].p.v, effectElements[7].p.v);
              this.feFuncRComposed.setAttribute("tableValues", val2);
              this.feFuncGComposed.setAttribute("tableValues", val2);
              this.feFuncBComposed.setAttribute("tableValues", val2);
            }
            if (this.feFuncR && (forceRender || effectElements[10].p._mdf || effectElements[11].p._mdf || effectElements[12].p._mdf || effectElements[13].p._mdf || effectElements[14].p._mdf)) {
              val2 = this.getTableValue(effectElements[10].p.v, effectElements[11].p.v, effectElements[12].p.v, effectElements[13].p.v, effectElements[14].p.v);
              this.feFuncR.setAttribute("tableValues", val2);
            }
            if (this.feFuncG && (forceRender || effectElements[17].p._mdf || effectElements[18].p._mdf || effectElements[19].p._mdf || effectElements[20].p._mdf || effectElements[21].p._mdf)) {
              val2 = this.getTableValue(effectElements[17].p.v, effectElements[18].p.v, effectElements[19].p.v, effectElements[20].p.v, effectElements[21].p.v);
              this.feFuncG.setAttribute("tableValues", val2);
            }
            if (this.feFuncB && (forceRender || effectElements[24].p._mdf || effectElements[25].p._mdf || effectElements[26].p._mdf || effectElements[27].p._mdf || effectElements[28].p._mdf)) {
              val2 = this.getTableValue(effectElements[24].p.v, effectElements[25].p.v, effectElements[26].p.v, effectElements[27].p.v, effectElements[28].p.v);
              this.feFuncB.setAttribute("tableValues", val2);
            }
            if (this.feFuncA && (forceRender || effectElements[31].p._mdf || effectElements[32].p._mdf || effectElements[33].p._mdf || effectElements[34].p._mdf || effectElements[35].p._mdf)) {
              val2 = this.getTableValue(effectElements[31].p.v, effectElements[32].p.v, effectElements[33].p.v, effectElements[34].p.v, effectElements[35].p.v);
              this.feFuncA.setAttribute("tableValues", val2);
            }
          }
        };
        function SVGDropShadowEffect(filter, filterManager) {
          var filterSize = filterManager.container.globalData.renderConfig.filterSize;
          filter.setAttribute("x", filterSize.x);
          filter.setAttribute("y", filterSize.y);
          filter.setAttribute("width", filterSize.width);
          filter.setAttribute("height", filterSize.height);
          this.filterManager = filterManager;
          var feGaussianBlur = createNS("feGaussianBlur");
          feGaussianBlur.setAttribute("in", "SourceAlpha");
          feGaussianBlur.setAttribute("result", "drop_shadow_1");
          feGaussianBlur.setAttribute("stdDeviation", "0");
          this.feGaussianBlur = feGaussianBlur;
          filter.appendChild(feGaussianBlur);
          var feOffset = createNS("feOffset");
          feOffset.setAttribute("dx", "25");
          feOffset.setAttribute("dy", "0");
          feOffset.setAttribute("in", "drop_shadow_1");
          feOffset.setAttribute("result", "drop_shadow_2");
          this.feOffset = feOffset;
          filter.appendChild(feOffset);
          var feFlood = createNS("feFlood");
          feFlood.setAttribute("flood-color", "#00ff00");
          feFlood.setAttribute("flood-opacity", "1");
          feFlood.setAttribute("result", "drop_shadow_3");
          this.feFlood = feFlood;
          filter.appendChild(feFlood);
          var feComposite = createNS("feComposite");
          feComposite.setAttribute("in", "drop_shadow_3");
          feComposite.setAttribute("in2", "drop_shadow_2");
          feComposite.setAttribute("operator", "in");
          feComposite.setAttribute("result", "drop_shadow_4");
          filter.appendChild(feComposite);
          var feMerge = createNS("feMerge");
          filter.appendChild(feMerge);
          var feMergeNode;
          feMergeNode = createNS("feMergeNode");
          feMerge.appendChild(feMergeNode);
          feMergeNode = createNS("feMergeNode");
          feMergeNode.setAttribute("in", "SourceGraphic");
          this.feMergeNode = feMergeNode;
          this.feMerge = feMerge;
          this.originalNodeAdded = false;
          feMerge.appendChild(feMergeNode);
        }
        SVGDropShadowEffect.prototype.renderFrame = function(forceRender) {
          if (forceRender || this.filterManager._mdf) {
            if (forceRender || this.filterManager.effectElements[4].p._mdf) {
              this.feGaussianBlur.setAttribute("stdDeviation", this.filterManager.effectElements[4].p.v / 4);
            }
            if (forceRender || this.filterManager.effectElements[0].p._mdf) {
              var col = this.filterManager.effectElements[0].p.v;
              this.feFlood.setAttribute("flood-color", rgbToHex(Math.round(col[0] * 255), Math.round(col[1] * 255), Math.round(col[2] * 255)));
            }
            if (forceRender || this.filterManager.effectElements[1].p._mdf) {
              this.feFlood.setAttribute("flood-opacity", this.filterManager.effectElements[1].p.v / 255);
            }
            if (forceRender || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf) {
              var distance = this.filterManager.effectElements[3].p.v;
              var angle = (this.filterManager.effectElements[2].p.v - 90) * degToRads;
              var x = distance * Math.cos(angle);
              var y = distance * Math.sin(angle);
              this.feOffset.setAttribute("dx", x);
              this.feOffset.setAttribute("dy", y);
            }
          }
        };
        var _svgMatteSymbols = [];
        function SVGMatte3Effect(filterElem, filterManager, elem2) {
          this.initialized = false;
          this.filterManager = filterManager;
          this.filterElem = filterElem;
          this.elem = elem2;
          elem2.matteElement = createNS("g");
          elem2.matteElement.appendChild(elem2.layerElement);
          elem2.matteElement.appendChild(elem2.transformedElement);
          elem2.baseElement = elem2.matteElement;
        }
        SVGMatte3Effect.prototype.findSymbol = function(mask2) {
          var i = 0;
          var len = _svgMatteSymbols.length;
          while (i < len) {
            if (_svgMatteSymbols[i] === mask2) {
              return _svgMatteSymbols[i];
            }
            i += 1;
          }
          return null;
        };
        SVGMatte3Effect.prototype.replaceInParent = function(mask2, symbolId) {
          var parentNode = mask2.layerElement.parentNode;
          if (!parentNode) {
            return;
          }
          var children = parentNode.children;
          var i = 0;
          var len = children.length;
          while (i < len) {
            if (children[i] === mask2.layerElement) {
              break;
            }
            i += 1;
          }
          var nextChild;
          if (i <= len - 2) {
            nextChild = children[i + 1];
          }
          var useElem = createNS("use");
          useElem.setAttribute("href", "#" + symbolId);
          if (nextChild) {
            parentNode.insertBefore(useElem, nextChild);
          } else {
            parentNode.appendChild(useElem);
          }
        };
        SVGMatte3Effect.prototype.setElementAsMask = function(elem2, mask2) {
          if (!this.findSymbol(mask2)) {
            var symbolId = createElementID();
            var masker = createNS("mask");
            masker.setAttribute("id", mask2.layerId);
            masker.setAttribute("mask-type", "alpha");
            _svgMatteSymbols.push(mask2);
            var defs = elem2.globalData.defs;
            defs.appendChild(masker);
            var symbol = createNS("symbol");
            symbol.setAttribute("id", symbolId);
            this.replaceInParent(mask2, symbolId);
            symbol.appendChild(mask2.layerElement);
            defs.appendChild(symbol);
            var useElem = createNS("use");
            useElem.setAttribute("href", "#" + symbolId);
            masker.appendChild(useElem);
            mask2.data.hd = false;
            mask2.show();
          }
          elem2.setMatte(mask2.layerId);
        };
        SVGMatte3Effect.prototype.initialize = function() {
          var ind = this.filterManager.effectElements[0].p.v;
          var elements = this.elem.comp.elements;
          var i = 0;
          var len = elements.length;
          while (i < len) {
            if (elements[i] && elements[i].data.ind === ind) {
              this.setElementAsMask(this.elem, elements[i]);
            }
            i += 1;
          }
          this.initialized = true;
        };
        SVGMatte3Effect.prototype.renderFrame = function() {
          if (!this.initialized) {
            this.initialize();
          }
        };
        function SVGEffects(elem2) {
          var i;
          var len = elem2.data.ef ? elem2.data.ef.length : 0;
          var filId = createElementID();
          var fil = filtersFactory.createFilter(filId, true);
          var count = 0;
          this.filters = [];
          var filterManager;
          for (i = 0; i < len; i += 1) {
            filterManager = null;
            if (elem2.data.ef[i].ty === 20) {
              count += 1;
              filterManager = new SVGTintFilter(fil, elem2.effectsManager.effectElements[i]);
            } else if (elem2.data.ef[i].ty === 21) {
              count += 1;
              filterManager = new SVGFillFilter(fil, elem2.effectsManager.effectElements[i]);
            } else if (elem2.data.ef[i].ty === 22) {
              filterManager = new SVGStrokeEffect(elem2, elem2.effectsManager.effectElements[i]);
            } else if (elem2.data.ef[i].ty === 23) {
              count += 1;
              filterManager = new SVGTritoneFilter(fil, elem2.effectsManager.effectElements[i]);
            } else if (elem2.data.ef[i].ty === 24) {
              count += 1;
              filterManager = new SVGProLevelsFilter(fil, elem2.effectsManager.effectElements[i]);
            } else if (elem2.data.ef[i].ty === 25) {
              count += 1;
              filterManager = new SVGDropShadowEffect(fil, elem2.effectsManager.effectElements[i]);
            } else if (elem2.data.ef[i].ty === 28) {
              filterManager = new SVGMatte3Effect(fil, elem2.effectsManager.effectElements[i], elem2);
            } else if (elem2.data.ef[i].ty === 29) {
              count += 1;
              filterManager = new SVGGaussianBlurEffect(fil, elem2.effectsManager.effectElements[i]);
            }
            if (filterManager) {
              this.filters.push(filterManager);
            }
          }
          if (count) {
            elem2.globalData.defs.appendChild(fil);
            elem2.layerElement.setAttribute("filter", "url(" + locationHref + "#" + filId + ")");
          }
          if (this.filters.length) {
            elem2.addRenderableComponent(this);
          }
        }
        SVGEffects.prototype.renderFrame = function(_isFirstFrame) {
          var i;
          var len = this.filters.length;
          for (i = 0; i < len; i += 1) {
            this.filters[i].renderFrame(_isFirstFrame);
          }
        };
        function CVContextData() {
          this.saved = [];
          this.cArrPos = 0;
          this.cTr = new Matrix();
          this.cO = 1;
          var i;
          var len = 15;
          this.savedOp = createTypedArray("float32", len);
          for (i = 0; i < len; i += 1) {
            this.saved[i] = createTypedArray("float32", 16);
          }
          this._length = len;
        }
        CVContextData.prototype.duplicate = function() {
          var newLength = this._length * 2;
          var currentSavedOp = this.savedOp;
          this.savedOp = createTypedArray("float32", newLength);
          this.savedOp.set(currentSavedOp);
          var i = 0;
          for (i = this._length; i < newLength; i += 1) {
            this.saved[i] = createTypedArray("float32", 16);
          }
          this._length = newLength;
        };
        CVContextData.prototype.reset = function() {
          this.cArrPos = 0;
          this.cTr.reset();
          this.cO = 1;
        };
        function CVBaseElement() {
        }
        CVBaseElement.prototype = {
          createElements: function() {
          },
          initRendererElement: function() {
          },
          createContainerElements: function() {
            this.canvasContext = this.globalData.canvasContext;
            this.renderableEffectsManager = new CVEffects(this);
          },
          createContent: function() {
          },
          setBlendMode: function() {
            var globalData2 = this.globalData;
            if (globalData2.blendMode !== this.data.bm) {
              globalData2.blendMode = this.data.bm;
              var blendModeValue = getBlendMode(this.data.bm);
              globalData2.canvasContext.globalCompositeOperation = blendModeValue;
            }
          },
          createRenderableComponents: function() {
            this.maskManager = new CVMaskElement(this.data, this);
          },
          hideElement: function() {
            if (!this.hidden && (!this.isInRange || this.isTransparent)) {
              this.hidden = true;
            }
          },
          showElement: function() {
            if (this.isInRange && !this.isTransparent) {
              this.hidden = false;
              this._isFirstFrame = true;
              this.maskManager._isFirstFrame = true;
            }
          },
          renderFrame: function() {
            if (this.hidden || this.data.hd) {
              return;
            }
            this.renderTransform();
            this.renderRenderable();
            this.setBlendMode();
            var forceRealStack = this.data.ty === 0;
            this.globalData.renderer.save(forceRealStack);
            this.globalData.renderer.ctxTransform(this.finalTransform.mat.props);
            this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v);
            this.renderInnerContent();
            this.globalData.renderer.restore(forceRealStack);
            if (this.maskManager.hasMasks) {
              this.globalData.renderer.restore(true);
            }
            if (this._isFirstFrame) {
              this._isFirstFrame = false;
            }
          },
          destroy: function() {
            this.canvasContext = null;
            this.data = null;
            this.globalData = null;
            this.maskManager.destroy();
          },
          mHelper: new Matrix()
        };
        CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement;
        CVBaseElement.prototype.show = CVBaseElement.prototype.showElement;
        function CVImageElement(data2, globalData2, comp2) {
          this.assetData = globalData2.getAssetData(data2.refId);
          this.img = globalData2.imageLoader.getAsset(this.assetData);
          this.initElement(data2, globalData2, comp2);
        }
        extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVImageElement);
        CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement;
        CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame;
        CVImageElement.prototype.createContent = function() {
          if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
            var canvas = createTag("canvas");
            canvas.width = this.assetData.w;
            canvas.height = this.assetData.h;
            var ctx = canvas.getContext("2d");
            var imgW = this.img.width;
            var imgH = this.img.height;
            var imgRel = imgW / imgH;
            var canvasRel = this.assetData.w / this.assetData.h;
            var widthCrop;
            var heightCrop;
            var par = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
            if (imgRel > canvasRel && par === "xMidYMid slice" || imgRel < canvasRel && par !== "xMidYMid slice") {
              heightCrop = imgH;
              widthCrop = heightCrop * canvasRel;
            } else {
              widthCrop = imgW;
              heightCrop = widthCrop / canvasRel;
            }
            ctx.drawImage(this.img, (imgW - widthCrop) / 2, (imgH - heightCrop) / 2, widthCrop, heightCrop, 0, 0, this.assetData.w, this.assetData.h);
            this.img = canvas;
          }
        };
        CVImageElement.prototype.renderInnerContent = function() {
          this.canvasContext.drawImage(this.img, 0, 0);
        };
        CVImageElement.prototype.destroy = function() {
          this.img = null;
        };
        function CVCompElement(data2, globalData2, comp2) {
          this.completeLayers = false;
          this.layers = data2.layers;
          this.pendingElements = [];
          this.elements = createSizedArray(this.layers.length);
          this.initElement(data2, globalData2, comp2);
          this.tm = data2.tm ? PropertyFactory.getProp(this, data2.tm, 0, globalData2.frameRate, this) : { _placeholder: true };
        }
        extendPrototype([CanvasRenderer, ICompElement, CVBaseElement], CVCompElement);
        CVCompElement.prototype.renderInnerContent = function() {
          var ctx = this.canvasContext;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(this.data.w, 0);
          ctx.lineTo(this.data.w, this.data.h);
          ctx.lineTo(0, this.data.h);
          ctx.lineTo(0, 0);
          ctx.clip();
          var i;
          var len = this.layers.length;
          for (i = len - 1; i >= 0; i -= 1) {
            if (this.completeLayers || this.elements[i]) {
              this.elements[i].renderFrame();
            }
          }
        };
        CVCompElement.prototype.destroy = function() {
          var i;
          var len = this.layers.length;
          for (i = len - 1; i >= 0; i -= 1) {
            if (this.elements[i]) {
              this.elements[i].destroy();
            }
          }
          this.layers = null;
          this.elements = null;
        };
        function CVMaskElement(data2, element) {
          this.data = data2;
          this.element = element;
          this.masksProperties = this.data.masksProperties || [];
          this.viewData = createSizedArray(this.masksProperties.length);
          var i;
          var len = this.masksProperties.length;
          var hasMasks = false;
          for (i = 0; i < len; i += 1) {
            if (this.masksProperties[i].mode !== "n") {
              hasMasks = true;
            }
            this.viewData[i] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[i], 3);
          }
          this.hasMasks = hasMasks;
          if (hasMasks) {
            this.element.addRenderableComponent(this);
          }
        }
        CVMaskElement.prototype.renderFrame = function() {
          if (!this.hasMasks) {
            return;
          }
          var transform2 = this.element.finalTransform.mat;
          var ctx = this.element.canvasContext;
          var i;
          var len = this.masksProperties.length;
          var pt;
          var pts;
          var data2;
          ctx.beginPath();
          for (i = 0; i < len; i += 1) {
            if (this.masksProperties[i].mode !== "n") {
              if (this.masksProperties[i].inv) {
                ctx.moveTo(0, 0);
                ctx.lineTo(this.element.globalData.compSize.w, 0);
                ctx.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h);
                ctx.lineTo(0, this.element.globalData.compSize.h);
                ctx.lineTo(0, 0);
              }
              data2 = this.viewData[i].v;
              pt = transform2.applyToPointArray(data2.v[0][0], data2.v[0][1], 0);
              ctx.moveTo(pt[0], pt[1]);
              var j;
              var jLen = data2._length;
              for (j = 1; j < jLen; j += 1) {
                pts = transform2.applyToTriplePoints(data2.o[j - 1], data2.i[j], data2.v[j]);
                ctx.bezierCurveTo(pts[0], pts[1], pts[2], pts[3], pts[4], pts[5]);
              }
              pts = transform2.applyToTriplePoints(data2.o[j - 1], data2.i[0], data2.v[0]);
              ctx.bezierCurveTo(pts[0], pts[1], pts[2], pts[3], pts[4], pts[5]);
            }
          }
          this.element.globalData.renderer.save(true);
          ctx.clip();
        };
        CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty;
        CVMaskElement.prototype.destroy = function() {
          this.element = null;
        };
        function CVShapeElement(data2, globalData2, comp2) {
          this.shapes = [];
          this.shapesData = data2.shapes;
          this.stylesList = [];
          this.itemsData = [];
          this.prevViewData = [];
          this.shapeModifiers = [];
          this.processedElements = [];
          this.transformsManager = new ShapeTransformManager();
          this.initElement(data2, globalData2, comp2);
        }
        extendPrototype([BaseElement, TransformElement, CVBaseElement, IShapeElement, HierarchyElement, FrameElement, RenderableElement], CVShapeElement);
        CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement;
        CVShapeElement.prototype.transformHelper = { opacity: 1, _opMdf: false };
        CVShapeElement.prototype.dashResetter = [];
        CVShapeElement.prototype.createContent = function() {
          this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, true, []);
        };
        CVShapeElement.prototype.createStyleElement = function(data2, transforms) {
          var styleElem = {
            data: data2,
            type: data2.ty,
            preTransforms: this.transformsManager.addTransformSequence(transforms),
            transforms: [],
            elements: [],
            closed: data2.hd === true
          };
          var elementData = {};
          if (data2.ty === "fl" || data2.ty === "st") {
            elementData.c = PropertyFactory.getProp(this, data2.c, 1, 255, this);
            if (!elementData.c.k) {
              styleElem.co = "rgb(" + bmFloor(elementData.c.v[0]) + "," + bmFloor(elementData.c.v[1]) + "," + bmFloor(elementData.c.v[2]) + ")";
            }
          } else if (data2.ty === "gf" || data2.ty === "gs") {
            elementData.s = PropertyFactory.getProp(this, data2.s, 1, null, this);
            elementData.e = PropertyFactory.getProp(this, data2.e, 1, null, this);
            elementData.h = PropertyFactory.getProp(this, data2.h || { k: 0 }, 0, 0.01, this);
            elementData.a = PropertyFactory.getProp(this, data2.a || { k: 0 }, 0, degToRads, this);
            elementData.g = new GradientProperty(this, data2.g, this);
          }
          elementData.o = PropertyFactory.getProp(this, data2.o, 0, 0.01, this);
          if (data2.ty === "st" || data2.ty === "gs") {
            styleElem.lc = lineCapEnum[data2.lc || 2];
            styleElem.lj = lineJoinEnum[data2.lj || 2];
            if (data2.lj == 1) {
              styleElem.ml = data2.ml;
            }
            elementData.w = PropertyFactory.getProp(this, data2.w, 0, null, this);
            if (!elementData.w.k) {
              styleElem.wi = elementData.w.v;
            }
            if (data2.d) {
              var d = new DashProperty(this, data2.d, "canvas", this);
              elementData.d = d;
              if (!elementData.d.k) {
                styleElem.da = elementData.d.dashArray;
                styleElem.do = elementData.d.dashoffset[0];
              }
            }
          } else {
            styleElem.r = data2.r === 2 ? "evenodd" : "nonzero";
          }
          this.stylesList.push(styleElem);
          elementData.style = styleElem;
          return elementData;
        };
        CVShapeElement.prototype.createGroupElement = function() {
          var elementData = {
            it: [],
            prevViewData: []
          };
          return elementData;
        };
        CVShapeElement.prototype.createTransformElement = function(data2) {
          var elementData = {
            transform: {
              opacity: 1,
              _opMdf: false,
              key: this.transformsManager.getNewKey(),
              op: PropertyFactory.getProp(this, data2.o, 0, 0.01, this),
              mProps: TransformPropertyFactory.getTransformProperty(this, data2, this)
            }
          };
          return elementData;
        };
        CVShapeElement.prototype.createShapeElement = function(data2) {
          var elementData = new CVShapeData(this, data2, this.stylesList, this.transformsManager);
          this.shapes.push(elementData);
          this.addShapeToModifiers(elementData);
          return elementData;
        };
        CVShapeElement.prototype.reloadShapes = function() {
          this._isFirstFrame = true;
          var i;
          var len = this.itemsData.length;
          for (i = 0; i < len; i += 1) {
            this.prevViewData[i] = this.itemsData[i];
          }
          this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, true, []);
          len = this.dynamicProperties.length;
          for (i = 0; i < len; i += 1) {
            this.dynamicProperties[i].getValue();
          }
          this.renderModifiers();
          this.transformsManager.processSequences(this._isFirstFrame);
        };
        CVShapeElement.prototype.addTransformToStyleList = function(transform2) {
          var i;
          var len = this.stylesList.length;
          for (i = 0; i < len; i += 1) {
            if (!this.stylesList[i].closed) {
              this.stylesList[i].transforms.push(transform2);
            }
          }
        };
        CVShapeElement.prototype.removeTransformFromStyleList = function() {
          var i;
          var len = this.stylesList.length;
          for (i = 0; i < len; i += 1) {
            if (!this.stylesList[i].closed) {
              this.stylesList[i].transforms.pop();
            }
          }
        };
        CVShapeElement.prototype.closeStyles = function(styles) {
          var i;
          var len = styles.length;
          for (i = 0; i < len; i += 1) {
            styles[i].closed = true;
          }
        };
        CVShapeElement.prototype.searchShapes = function(arr, itemsData, prevViewData, shouldRender, transforms) {
          var i;
          var len = arr.length - 1;
          var j;
          var jLen;
          var ownStyles = [];
          var ownModifiers = [];
          var processedPos;
          var modifier;
          var currentTransform;
          var ownTransforms = [].concat(transforms);
          for (i = len; i >= 0; i -= 1) {
            processedPos = this.searchProcessedElement(arr[i]);
            if (!processedPos) {
              arr[i]._shouldRender = shouldRender;
            } else {
              itemsData[i] = prevViewData[processedPos - 1];
            }
            if (arr[i].ty === "fl" || arr[i].ty === "st" || arr[i].ty === "gf" || arr[i].ty === "gs") {
              if (!processedPos) {
                itemsData[i] = this.createStyleElement(arr[i], ownTransforms);
              } else {
                itemsData[i].style.closed = false;
              }
              ownStyles.push(itemsData[i].style);
            } else if (arr[i].ty === "gr") {
              if (!processedPos) {
                itemsData[i] = this.createGroupElement(arr[i]);
              } else {
                jLen = itemsData[i].it.length;
                for (j = 0; j < jLen; j += 1) {
                  itemsData[i].prevViewData[j] = itemsData[i].it[j];
                }
              }
              this.searchShapes(arr[i].it, itemsData[i].it, itemsData[i].prevViewData, shouldRender, ownTransforms);
            } else if (arr[i].ty === "tr") {
              if (!processedPos) {
                currentTransform = this.createTransformElement(arr[i]);
                itemsData[i] = currentTransform;
              }
              ownTransforms.push(itemsData[i]);
              this.addTransformToStyleList(itemsData[i]);
            } else if (arr[i].ty === "sh" || arr[i].ty === "rc" || arr[i].ty === "el" || arr[i].ty === "sr") {
              if (!processedPos) {
                itemsData[i] = this.createShapeElement(arr[i]);
              }
            } else if (arr[i].ty === "tm" || arr[i].ty === "rd" || arr[i].ty === "pb") {
              if (!processedPos) {
                modifier = ShapeModifiers.getModifier(arr[i].ty);
                modifier.init(this, arr[i]);
                itemsData[i] = modifier;
                this.shapeModifiers.push(modifier);
              } else {
                modifier = itemsData[i];
                modifier.closed = false;
              }
              ownModifiers.push(modifier);
            } else if (arr[i].ty === "rp") {
              if (!processedPos) {
                modifier = ShapeModifiers.getModifier(arr[i].ty);
                itemsData[i] = modifier;
                modifier.init(this, arr, i, itemsData);
                this.shapeModifiers.push(modifier);
                shouldRender = false;
              } else {
                modifier = itemsData[i];
                modifier.closed = true;
              }
              ownModifiers.push(modifier);
            }
            this.addProcessedElement(arr[i], i + 1);
          }
          this.removeTransformFromStyleList();
          this.closeStyles(ownStyles);
          len = ownModifiers.length;
          for (i = 0; i < len; i += 1) {
            ownModifiers[i].closed = true;
          }
        };
        CVShapeElement.prototype.renderInnerContent = function() {
          this.transformHelper.opacity = 1;
          this.transformHelper._opMdf = false;
          this.renderModifiers();
          this.transformsManager.processSequences(this._isFirstFrame);
          this.renderShape(this.transformHelper, this.shapesData, this.itemsData, true);
        };
        CVShapeElement.prototype.renderShapeTransform = function(parentTransform, groupTransform) {
          if (parentTransform._opMdf || groupTransform.op._mdf || this._isFirstFrame) {
            groupTransform.opacity = parentTransform.opacity;
            groupTransform.opacity *= groupTransform.op.v;
            groupTransform._opMdf = true;
          }
        };
        CVShapeElement.prototype.drawLayer = function() {
          var i;
          var len = this.stylesList.length;
          var j;
          var jLen;
          var k;
          var kLen;
          var elems;
          var nodes;
          var renderer2 = this.globalData.renderer;
          var ctx = this.globalData.canvasContext;
          var type;
          var currentStyle;
          for (i = 0; i < len; i += 1) {
            currentStyle = this.stylesList[i];
            type = currentStyle.type;
            if (!((type === "st" || type === "gs") && currentStyle.wi === 0 || !currentStyle.data._shouldRender || currentStyle.coOp === 0 || this.globalData.currentGlobalAlpha === 0)) {
              renderer2.save();
              elems = currentStyle.elements;
              if (type === "st" || type === "gs") {
                ctx.strokeStyle = type === "st" ? currentStyle.co : currentStyle.grd;
                ctx.lineWidth = currentStyle.wi;
                ctx.lineCap = currentStyle.lc;
                ctx.lineJoin = currentStyle.lj;
                ctx.miterLimit = currentStyle.ml || 0;
              } else {
                ctx.fillStyle = type === "fl" ? currentStyle.co : currentStyle.grd;
              }
              renderer2.ctxOpacity(currentStyle.coOp);
              if (type !== "st" && type !== "gs") {
                ctx.beginPath();
              }
              renderer2.ctxTransform(currentStyle.preTransforms.finalTransform.props);
              jLen = elems.length;
              for (j = 0; j < jLen; j += 1) {
                if (type === "st" || type === "gs") {
                  ctx.beginPath();
                  if (currentStyle.da) {
                    ctx.setLineDash(currentStyle.da);
                    ctx.lineDashOffset = currentStyle.do;
                  }
                }
                nodes = elems[j].trNodes;
                kLen = nodes.length;
                for (k = 0; k < kLen; k += 1) {
                  if (nodes[k].t === "m") {
                    ctx.moveTo(nodes[k].p[0], nodes[k].p[1]);
                  } else if (nodes[k].t === "c") {
                    ctx.bezierCurveTo(nodes[k].pts[0], nodes[k].pts[1], nodes[k].pts[2], nodes[k].pts[3], nodes[k].pts[4], nodes[k].pts[5]);
                  } else {
                    ctx.closePath();
                  }
                }
                if (type === "st" || type === "gs") {
                  ctx.stroke();
                  if (currentStyle.da) {
                    ctx.setLineDash(this.dashResetter);
                  }
                }
              }
              if (type !== "st" && type !== "gs") {
                ctx.fill(currentStyle.r);
              }
              renderer2.restore();
            }
          }
        };
        CVShapeElement.prototype.renderShape = function(parentTransform, items, data2, isMain) {
          var i;
          var len = items.length - 1;
          var groupTransform;
          groupTransform = parentTransform;
          for (i = len; i >= 0; i -= 1) {
            if (items[i].ty === "tr") {
              groupTransform = data2[i].transform;
              this.renderShapeTransform(parentTransform, groupTransform);
            } else if (items[i].ty === "sh" || items[i].ty === "el" || items[i].ty === "rc" || items[i].ty === "sr") {
              this.renderPath(items[i], data2[i]);
            } else if (items[i].ty === "fl") {
              this.renderFill(items[i], data2[i], groupTransform);
            } else if (items[i].ty === "st") {
              this.renderStroke(items[i], data2[i], groupTransform);
            } else if (items[i].ty === "gf" || items[i].ty === "gs") {
              this.renderGradientFill(items[i], data2[i], groupTransform);
            } else if (items[i].ty === "gr") {
              this.renderShape(groupTransform, items[i].it, data2[i].it);
            } else if (items[i].ty === "tm") {
            }
          }
          if (isMain) {
            this.drawLayer();
          }
        };
        CVShapeElement.prototype.renderStyledShape = function(styledShape, shape) {
          if (this._isFirstFrame || shape._mdf || styledShape.transforms._mdf) {
            var shapeNodes = styledShape.trNodes;
            var paths = shape.paths;
            var i;
            var len;
            var j;
            var jLen = paths._length;
            shapeNodes.length = 0;
            var groupTransformMat = styledShape.transforms.finalTransform;
            for (j = 0; j < jLen; j += 1) {
              var pathNodes = paths.shapes[j];
              if (pathNodes && pathNodes.v) {
                len = pathNodes._length;
                for (i = 1; i < len; i += 1) {
                  if (i === 1) {
                    shapeNodes.push({
                      t: "m",
                      p: groupTransformMat.applyToPointArray(pathNodes.v[0][0], pathNodes.v[0][1], 0)
                    });
                  }
                  shapeNodes.push({
                    t: "c",
                    pts: groupTransformMat.applyToTriplePoints(pathNodes.o[i - 1], pathNodes.i[i], pathNodes.v[i])
                  });
                }
                if (len === 1) {
                  shapeNodes.push({
                    t: "m",
                    p: groupTransformMat.applyToPointArray(pathNodes.v[0][0], pathNodes.v[0][1], 0)
                  });
                }
                if (pathNodes.c && len) {
                  shapeNodes.push({
                    t: "c",
                    pts: groupTransformMat.applyToTriplePoints(pathNodes.o[i - 1], pathNodes.i[0], pathNodes.v[0])
                  });
                  shapeNodes.push({
                    t: "z"
                  });
                }
              }
            }
            styledShape.trNodes = shapeNodes;
          }
        };
        CVShapeElement.prototype.renderPath = function(pathData, itemData) {
          if (pathData.hd !== true && pathData._shouldRender) {
            var i;
            var len = itemData.styledShapes.length;
            for (i = 0; i < len; i += 1) {
              this.renderStyledShape(itemData.styledShapes[i], itemData.sh);
            }
          }
        };
        CVShapeElement.prototype.renderFill = function(styleData, itemData, groupTransform) {
          var styleElem = itemData.style;
          if (itemData.c._mdf || this._isFirstFrame) {
            styleElem.co = "rgb(" + bmFloor(itemData.c.v[0]) + "," + bmFloor(itemData.c.v[1]) + "," + bmFloor(itemData.c.v[2]) + ")";
          }
          if (itemData.o._mdf || groupTransform._opMdf || this._isFirstFrame) {
            styleElem.coOp = itemData.o.v * groupTransform.opacity;
          }
        };
        CVShapeElement.prototype.renderGradientFill = function(styleData, itemData, groupTransform) {
          var styleElem = itemData.style;
          var grd;
          if (!styleElem.grd || itemData.g._mdf || itemData.s._mdf || itemData.e._mdf || styleData.t !== 1 && (itemData.h._mdf || itemData.a._mdf)) {
            var ctx = this.globalData.canvasContext;
            var pt1 = itemData.s.v;
            var pt2 = itemData.e.v;
            if (styleData.t === 1) {
              grd = ctx.createLinearGradient(pt1[0], pt1[1], pt2[0], pt2[1]);
            } else {
              var rad = Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
              var ang = Math.atan2(pt2[1] - pt1[1], pt2[0] - pt1[0]);
              var percent = itemData.h.v;
              if (percent >= 1) {
                percent = 0.99;
              } else if (percent <= -1) {
                percent = -0.99;
              }
              var dist = rad * percent;
              var x = Math.cos(ang + itemData.a.v) * dist + pt1[0];
              var y = Math.sin(ang + itemData.a.v) * dist + pt1[1];
              grd = ctx.createRadialGradient(x, y, 0, pt1[0], pt1[1], rad);
            }
            var i;
            var len = styleData.g.p;
            var cValues = itemData.g.c;
            var opacity = 1;
            for (i = 0; i < len; i += 1) {
              if (itemData.g._hasOpacity && itemData.g._collapsable) {
                opacity = itemData.g.o[i * 2 + 1];
              }
              grd.addColorStop(cValues[i * 4] / 100, "rgba(" + cValues[i * 4 + 1] + "," + cValues[i * 4 + 2] + "," + cValues[i * 4 + 3] + "," + opacity + ")");
            }
            styleElem.grd = grd;
          }
          styleElem.coOp = itemData.o.v * groupTransform.opacity;
        };
        CVShapeElement.prototype.renderStroke = function(styleData, itemData, groupTransform) {
          var styleElem = itemData.style;
          var d = itemData.d;
          if (d && (d._mdf || this._isFirstFrame)) {
            styleElem.da = d.dashArray;
            styleElem.do = d.dashoffset[0];
          }
          if (itemData.c._mdf || this._isFirstFrame) {
            styleElem.co = "rgb(" + bmFloor(itemData.c.v[0]) + "," + bmFloor(itemData.c.v[1]) + "," + bmFloor(itemData.c.v[2]) + ")";
          }
          if (itemData.o._mdf || groupTransform._opMdf || this._isFirstFrame) {
            styleElem.coOp = itemData.o.v * groupTransform.opacity;
          }
          if (itemData.w._mdf || this._isFirstFrame) {
            styleElem.wi = itemData.w.v;
          }
        };
        CVShapeElement.prototype.destroy = function() {
          this.shapesData = null;
          this.globalData = null;
          this.canvasContext = null;
          this.stylesList.length = 0;
          this.itemsData.length = 0;
        };
        function CVSolidElement(data2, globalData2, comp2) {
          this.initElement(data2, globalData2, comp2);
        }
        extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement], CVSolidElement);
        CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement;
        CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame;
        CVSolidElement.prototype.renderInnerContent = function() {
          var ctx = this.canvasContext;
          ctx.fillStyle = this.data.sc;
          ctx.fillRect(0, 0, this.data.sw, this.data.sh);
        };
        function CVTextElement(data2, globalData2, comp2) {
          this.textSpans = [];
          this.yOffset = 0;
          this.fillColorAnim = false;
          this.strokeColorAnim = false;
          this.strokeWidthAnim = false;
          this.stroke = false;
          this.fill = false;
          this.justifyOffset = 0;
          this.currentRender = null;
          this.renderType = "canvas";
          this.values = {
            fill: "rgba(0,0,0,0)",
            stroke: "rgba(0,0,0,0)",
            sWidth: 0,
            fValue: ""
          };
          this.initElement(data2, globalData2, comp2);
        }
        extendPrototype([BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement, ITextElement], CVTextElement);
        CVTextElement.prototype.tHelper = createTag("canvas").getContext("2d");
        CVTextElement.prototype.buildNewText = function() {
          var documentData = this.textProperty.currentData;
          this.renderedLetters = createSizedArray(documentData.l ? documentData.l.length : 0);
          var hasFill = false;
          if (documentData.fc) {
            hasFill = true;
            this.values.fill = this.buildColor(documentData.fc);
          } else {
            this.values.fill = "rgba(0,0,0,0)";
          }
          this.fill = hasFill;
          var hasStroke = false;
          if (documentData.sc) {
            hasStroke = true;
            this.values.stroke = this.buildColor(documentData.sc);
            this.values.sWidth = documentData.sw;
          }
          var fontData = this.globalData.fontManager.getFontByName(documentData.f);
          var i;
          var len;
          var letters = documentData.l;
          var matrixHelper = this.mHelper;
          this.stroke = hasStroke;
          this.values.fValue = documentData.finalSize + "px " + this.globalData.fontManager.getFontByName(documentData.f).fFamily;
          len = documentData.finalText.length;
          var charData;
          var shapeData;
          var k;
          var kLen;
          var shapes;
          var j;
          var jLen;
          var pathNodes;
          var commands;
          var pathArr;
          var singleShape = this.data.singleShape;
          var trackingOffset = documentData.tr * 1e-3 * documentData.finalSize;
          var xPos = 0;
          var yPos = 0;
          var firstLine = true;
          var cnt = 0;
          for (i = 0; i < len; i += 1) {
            charData = this.globalData.fontManager.getCharData(documentData.finalText[i], fontData.fStyle, this.globalData.fontManager.getFontByName(documentData.f).fFamily);
            shapeData = charData && charData.data || {};
            matrixHelper.reset();
            if (singleShape && letters[i].n) {
              xPos = -trackingOffset;
              yPos += documentData.yOffset;
              yPos += firstLine ? 1 : 0;
              firstLine = false;
            }
            shapes = shapeData.shapes ? shapeData.shapes[0].it : [];
            jLen = shapes.length;
            matrixHelper.scale(documentData.finalSize / 100, documentData.finalSize / 100);
            if (singleShape) {
              this.applyTextPropertiesToMatrix(documentData, matrixHelper, letters[i].line, xPos, yPos);
            }
            commands = createSizedArray(jLen);
            for (j = 0; j < jLen; j += 1) {
              kLen = shapes[j].ks.k.i.length;
              pathNodes = shapes[j].ks.k;
              pathArr = [];
              for (k = 1; k < kLen; k += 1) {
                if (k === 1) {
                  pathArr.push(matrixHelper.applyToX(pathNodes.v[0][0], pathNodes.v[0][1], 0), matrixHelper.applyToY(pathNodes.v[0][0], pathNodes.v[0][1], 0));
                }
                pathArr.push(matrixHelper.applyToX(pathNodes.o[k - 1][0], pathNodes.o[k - 1][1], 0), matrixHelper.applyToY(pathNodes.o[k - 1][0], pathNodes.o[k - 1][1], 0), matrixHelper.applyToX(pathNodes.i[k][0], pathNodes.i[k][1], 0), matrixHelper.applyToY(pathNodes.i[k][0], pathNodes.i[k][1], 0), matrixHelper.applyToX(pathNodes.v[k][0], pathNodes.v[k][1], 0), matrixHelper.applyToY(pathNodes.v[k][0], pathNodes.v[k][1], 0));
              }
              pathArr.push(matrixHelper.applyToX(pathNodes.o[k - 1][0], pathNodes.o[k - 1][1], 0), matrixHelper.applyToY(pathNodes.o[k - 1][0], pathNodes.o[k - 1][1], 0), matrixHelper.applyToX(pathNodes.i[0][0], pathNodes.i[0][1], 0), matrixHelper.applyToY(pathNodes.i[0][0], pathNodes.i[0][1], 0), matrixHelper.applyToX(pathNodes.v[0][0], pathNodes.v[0][1], 0), matrixHelper.applyToY(pathNodes.v[0][0], pathNodes.v[0][1], 0));
              commands[j] = pathArr;
            }
            if (singleShape) {
              xPos += letters[i].l;
              xPos += trackingOffset;
            }
            if (this.textSpans[cnt]) {
              this.textSpans[cnt].elem = commands;
            } else {
              this.textSpans[cnt] = { elem: commands };
            }
            cnt += 1;
          }
        };
        CVTextElement.prototype.renderInnerContent = function() {
          var ctx = this.canvasContext;
          ctx.font = this.values.fValue;
          ctx.lineCap = "butt";
          ctx.lineJoin = "miter";
          ctx.miterLimit = 4;
          if (!this.data.singleShape) {
            this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
          }
          var i;
          var len;
          var j;
          var jLen;
          var k;
          var kLen;
          var renderedLetters = this.textAnimator.renderedLetters;
          var letters = this.textProperty.currentData.l;
          len = letters.length;
          var renderedLetter;
          var lastFill = null;
          var lastStroke = null;
          var lastStrokeW = null;
          var commands;
          var pathArr;
          for (i = 0; i < len; i += 1) {
            if (!letters[i].n) {
              renderedLetter = renderedLetters[i];
              if (renderedLetter) {
                this.globalData.renderer.save();
                this.globalData.renderer.ctxTransform(renderedLetter.p);
                this.globalData.renderer.ctxOpacity(renderedLetter.o);
              }
              if (this.fill) {
                if (renderedLetter && renderedLetter.fc) {
                  if (lastFill !== renderedLetter.fc) {
                    lastFill = renderedLetter.fc;
                    ctx.fillStyle = renderedLetter.fc;
                  }
                } else if (lastFill !== this.values.fill) {
                  lastFill = this.values.fill;
                  ctx.fillStyle = this.values.fill;
                }
                commands = this.textSpans[i].elem;
                jLen = commands.length;
                this.globalData.canvasContext.beginPath();
                for (j = 0; j < jLen; j += 1) {
                  pathArr = commands[j];
                  kLen = pathArr.length;
                  this.globalData.canvasContext.moveTo(pathArr[0], pathArr[1]);
                  for (k = 2; k < kLen; k += 6) {
                    this.globalData.canvasContext.bezierCurveTo(pathArr[k], pathArr[k + 1], pathArr[k + 2], pathArr[k + 3], pathArr[k + 4], pathArr[k + 5]);
                  }
                }
                this.globalData.canvasContext.closePath();
                this.globalData.canvasContext.fill();
              }
              if (this.stroke) {
                if (renderedLetter && renderedLetter.sw) {
                  if (lastStrokeW !== renderedLetter.sw) {
                    lastStrokeW = renderedLetter.sw;
                    ctx.lineWidth = renderedLetter.sw;
                  }
                } else if (lastStrokeW !== this.values.sWidth) {
                  lastStrokeW = this.values.sWidth;
                  ctx.lineWidth = this.values.sWidth;
                }
                if (renderedLetter && renderedLetter.sc) {
                  if (lastStroke !== renderedLetter.sc) {
                    lastStroke = renderedLetter.sc;
                    ctx.strokeStyle = renderedLetter.sc;
                  }
                } else if (lastStroke !== this.values.stroke) {
                  lastStroke = this.values.stroke;
                  ctx.strokeStyle = this.values.stroke;
                }
                commands = this.textSpans[i].elem;
                jLen = commands.length;
                this.globalData.canvasContext.beginPath();
                for (j = 0; j < jLen; j += 1) {
                  pathArr = commands[j];
                  kLen = pathArr.length;
                  this.globalData.canvasContext.moveTo(pathArr[0], pathArr[1]);
                  for (k = 2; k < kLen; k += 6) {
                    this.globalData.canvasContext.bezierCurveTo(pathArr[k], pathArr[k + 1], pathArr[k + 2], pathArr[k + 3], pathArr[k + 4], pathArr[k + 5]);
                  }
                }
                this.globalData.canvasContext.closePath();
                this.globalData.canvasContext.stroke();
              }
              if (renderedLetter) {
                this.globalData.renderer.restore();
              }
            }
          }
        };
        function CVEffects() {
        }
        CVEffects.prototype.renderFrame = function() {
        };
        function HBaseElement() {
        }
        HBaseElement.prototype = {
          checkBlendMode: function() {
          },
          initRendererElement: function() {
            this.baseElement = createTag(this.data.tg || "div");
            if (this.data.hasMask) {
              this.svgElement = createNS("svg");
              this.layerElement = createNS("g");
              this.maskedElement = this.layerElement;
              this.svgElement.appendChild(this.layerElement);
              this.baseElement.appendChild(this.svgElement);
            } else {
              this.layerElement = this.baseElement;
            }
            styleDiv(this.baseElement);
          },
          createContainerElements: function() {
            this.renderableEffectsManager = new CVEffects(this);
            this.transformedElement = this.baseElement;
            this.maskedElement = this.layerElement;
            if (this.data.ln) {
              this.layerElement.setAttribute("id", this.data.ln);
            }
            if (this.data.cl) {
              this.layerElement.setAttribute("class", this.data.cl);
            }
            if (this.data.bm !== 0) {
              this.setBlendMode();
            }
          },
          renderElement: function() {
            var transformedElementStyle = this.transformedElement ? this.transformedElement.style : {};
            if (this.finalTransform._matMdf) {
              var matrixValue = this.finalTransform.mat.toCSS();
              transformedElementStyle.transform = matrixValue;
              transformedElementStyle.webkitTransform = matrixValue;
            }
            if (this.finalTransform._opMdf) {
              transformedElementStyle.opacity = this.finalTransform.mProp.o.v;
            }
          },
          renderFrame: function() {
            if (this.data.hd || this.hidden) {
              return;
            }
            this.renderTransform();
            this.renderRenderable();
            this.renderElement();
            this.renderInnerContent();
            if (this._isFirstFrame) {
              this._isFirstFrame = false;
            }
          },
          destroy: function() {
            this.layerElement = null;
            this.transformedElement = null;
            if (this.matteElement) {
              this.matteElement = null;
            }
            if (this.maskManager) {
              this.maskManager.destroy();
              this.maskManager = null;
            }
          },
          createRenderableComponents: function() {
            this.maskManager = new MaskElement(this.data, this, this.globalData);
          },
          addEffects: function() {
          },
          setMatte: function() {
          }
        };
        HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement;
        HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy;
        HBaseElement.prototype.buildElementParenting = HybridRenderer.prototype.buildElementParenting;
        function HSolidElement(data2, globalData2, comp2) {
          this.initElement(data2, globalData2, comp2);
        }
        extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement], HSolidElement);
        HSolidElement.prototype.createContent = function() {
          var rect;
          if (this.data.hasMask) {
            rect = createNS("rect");
            rect.setAttribute("width", this.data.sw);
            rect.setAttribute("height", this.data.sh);
            rect.setAttribute("fill", this.data.sc);
            this.svgElement.setAttribute("width", this.data.sw);
            this.svgElement.setAttribute("height", this.data.sh);
          } else {
            rect = createTag("div");
            rect.style.width = this.data.sw + "px";
            rect.style.height = this.data.sh + "px";
            rect.style.backgroundColor = this.data.sc;
          }
          this.layerElement.appendChild(rect);
        };
        function HCompElement(data2, globalData2, comp2) {
          this.layers = data2.layers;
          this.supports3d = !data2.hasMask;
          this.completeLayers = false;
          this.pendingElements = [];
          this.elements = this.layers ? createSizedArray(this.layers.length) : [];
          this.initElement(data2, globalData2, comp2);
          this.tm = data2.tm ? PropertyFactory.getProp(this, data2.tm, 0, globalData2.frameRate, this) : { _placeholder: true };
        }
        extendPrototype([HybridRenderer, ICompElement, HBaseElement], HCompElement);
        HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements;
        HCompElement.prototype.createContainerElements = function() {
          this._createBaseContainerElements();
          if (this.data.hasMask) {
            this.svgElement.setAttribute("width", this.data.w);
            this.svgElement.setAttribute("height", this.data.h);
            this.transformedElement = this.baseElement;
          } else {
            this.transformedElement = this.layerElement;
          }
        };
        HCompElement.prototype.addTo3dContainer = function(elem2, pos) {
          var j = 0;
          var nextElement;
          while (j < pos) {
            if (this.elements[j] && this.elements[j].getBaseElement) {
              nextElement = this.elements[j].getBaseElement();
            }
            j += 1;
          }
          if (nextElement) {
            this.layerElement.insertBefore(elem2, nextElement);
          } else {
            this.layerElement.appendChild(elem2);
          }
        };
        function HShapeElement(data2, globalData2, comp2) {
          this.shapes = [];
          this.shapesData = data2.shapes;
          this.stylesList = [];
          this.shapeModifiers = [];
          this.itemsData = [];
          this.processedElements = [];
          this.animatedContents = [];
          this.shapesContainer = createNS("g");
          this.initElement(data2, globalData2, comp2);
          this.prevViewData = [];
          this.currentBBox = {
            x: 999999,
            y: -999999,
            h: 0,
            w: 0
          };
        }
        extendPrototype([BaseElement, TransformElement, HSolidElement, SVGShapeElement, HBaseElement, HierarchyElement, FrameElement, RenderableElement], HShapeElement);
        HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent;
        HShapeElement.prototype.createContent = function() {
          var cont;
          this.baseElement.style.fontSize = 0;
          if (this.data.hasMask) {
            this.layerElement.appendChild(this.shapesContainer);
            cont = this.svgElement;
          } else {
            cont = createNS("svg");
            var size = this.comp.data ? this.comp.data : this.globalData.compSize;
            cont.setAttribute("width", size.w);
            cont.setAttribute("height", size.h);
            cont.appendChild(this.shapesContainer);
            this.layerElement.appendChild(cont);
          }
          this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], true);
          this.filterUniqueShapes();
          this.shapeCont = cont;
        };
        HShapeElement.prototype.getTransformedPoint = function(transformers, point) {
          var i;
          var len = transformers.length;
          for (i = 0; i < len; i += 1) {
            point = transformers[i].mProps.v.applyToPointArray(point[0], point[1], 0);
          }
          return point;
        };
        HShapeElement.prototype.calculateShapeBoundingBox = function(item, boundingBox) {
          var shape = item.sh.v;
          var transformers = item.transformers;
          var i;
          var len = shape._length;
          var vPoint;
          var oPoint;
          var nextIPoint;
          var nextVPoint;
          if (len <= 1) {
            return;
          }
          for (i = 0; i < len - 1; i += 1) {
            vPoint = this.getTransformedPoint(transformers, shape.v[i]);
            oPoint = this.getTransformedPoint(transformers, shape.o[i]);
            nextIPoint = this.getTransformedPoint(transformers, shape.i[i + 1]);
            nextVPoint = this.getTransformedPoint(transformers, shape.v[i + 1]);
            this.checkBounds(vPoint, oPoint, nextIPoint, nextVPoint, boundingBox);
          }
          if (shape.c) {
            vPoint = this.getTransformedPoint(transformers, shape.v[i]);
            oPoint = this.getTransformedPoint(transformers, shape.o[i]);
            nextIPoint = this.getTransformedPoint(transformers, shape.i[0]);
            nextVPoint = this.getTransformedPoint(transformers, shape.v[0]);
            this.checkBounds(vPoint, oPoint, nextIPoint, nextVPoint, boundingBox);
          }
        };
        HShapeElement.prototype.checkBounds = function(vPoint, oPoint, nextIPoint, nextVPoint, boundingBox) {
          this.getBoundsOfCurve(vPoint, oPoint, nextIPoint, nextVPoint);
          var bounds = this.shapeBoundingBox;
          boundingBox.x = bmMin(bounds.left, boundingBox.x);
          boundingBox.xMax = bmMax(bounds.right, boundingBox.xMax);
          boundingBox.y = bmMin(bounds.top, boundingBox.y);
          boundingBox.yMax = bmMax(bounds.bottom, boundingBox.yMax);
        };
        HShapeElement.prototype.shapeBoundingBox = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        };
        HShapeElement.prototype.tempBoundingBox = {
          x: 0,
          xMax: 0,
          y: 0,
          yMax: 0,
          width: 0,
          height: 0
        };
        HShapeElement.prototype.getBoundsOfCurve = function(p0, p1, p2, p3) {
          var bounds = [[p0[0], p3[0]], [p0[1], p3[1]]];
          for (var a, b, c, t, b2ac, t1, t2, i = 0; i < 2; ++i) {
            b = 6 * p0[i] - 12 * p1[i] + 6 * p2[i];
            a = -3 * p0[i] + 9 * p1[i] - 9 * p2[i] + 3 * p3[i];
            c = 3 * p1[i] - 3 * p0[i];
            b |= 0;
            a |= 0;
            c |= 0;
            if (a === 0 && b === 0) {
            } else if (a === 0) {
              t = -c / b;
              if (t > 0 && t < 1) {
                bounds[i].push(this.calculateF(t, p0, p1, p2, p3, i));
              }
            } else {
              b2ac = b * b - 4 * c * a;
              if (b2ac >= 0) {
                t1 = (-b + bmSqrt(b2ac)) / (2 * a);
                if (t1 > 0 && t1 < 1)
                  bounds[i].push(this.calculateF(t1, p0, p1, p2, p3, i));
                t2 = (-b - bmSqrt(b2ac)) / (2 * a);
                if (t2 > 0 && t2 < 1)
                  bounds[i].push(this.calculateF(t2, p0, p1, p2, p3, i));
              }
            }
          }
          this.shapeBoundingBox.left = bmMin.apply(null, bounds[0]);
          this.shapeBoundingBox.top = bmMin.apply(null, bounds[1]);
          this.shapeBoundingBox.right = bmMax.apply(null, bounds[0]);
          this.shapeBoundingBox.bottom = bmMax.apply(null, bounds[1]);
        };
        HShapeElement.prototype.calculateF = function(t, p0, p1, p2, p3, i) {
          return bmPow(1 - t, 3) * p0[i] + 3 * bmPow(1 - t, 2) * t * p1[i] + 3 * (1 - t) * bmPow(t, 2) * p2[i] + bmPow(t, 3) * p3[i];
        };
        HShapeElement.prototype.calculateBoundingBox = function(itemsData, boundingBox) {
          var i;
          var len = itemsData.length;
          for (i = 0; i < len; i += 1) {
            if (itemsData[i] && itemsData[i].sh) {
              this.calculateShapeBoundingBox(itemsData[i], boundingBox);
            } else if (itemsData[i] && itemsData[i].it) {
              this.calculateBoundingBox(itemsData[i].it, boundingBox);
            }
          }
        };
        HShapeElement.prototype.currentBoxContains = function(box) {
          return this.currentBBox.x <= box.x && this.currentBBox.y <= box.y && this.currentBBox.width + this.currentBBox.x >= box.x + box.width && this.currentBBox.height + this.currentBBox.y >= box.y + box.height;
        };
        HShapeElement.prototype.renderInnerContent = function() {
          this._renderShapeFrame();
          if (!this.hidden && (this._isFirstFrame || this._mdf)) {
            var tempBoundingBox = this.tempBoundingBox;
            var max = 999999;
            tempBoundingBox.x = max;
            tempBoundingBox.xMax = -max;
            tempBoundingBox.y = max;
            tempBoundingBox.yMax = -max;
            this.calculateBoundingBox(this.itemsData, tempBoundingBox);
            tempBoundingBox.width = tempBoundingBox.xMax < tempBoundingBox.x ? 0 : tempBoundingBox.xMax - tempBoundingBox.x;
            tempBoundingBox.height = tempBoundingBox.yMax < tempBoundingBox.y ? 0 : tempBoundingBox.yMax - tempBoundingBox.y;
            if (this.currentBoxContains(tempBoundingBox)) {
              return;
            }
            var changed = false;
            if (this.currentBBox.w !== tempBoundingBox.width) {
              this.currentBBox.w = tempBoundingBox.width;
              this.shapeCont.setAttribute("width", tempBoundingBox.width);
              changed = true;
            }
            if (this.currentBBox.h !== tempBoundingBox.height) {
              this.currentBBox.h = tempBoundingBox.height;
              this.shapeCont.setAttribute("height", tempBoundingBox.height);
              changed = true;
            }
            if (changed || this.currentBBox.x !== tempBoundingBox.x || this.currentBBox.y !== tempBoundingBox.y) {
              this.currentBBox.w = tempBoundingBox.width;
              this.currentBBox.h = tempBoundingBox.height;
              this.currentBBox.x = tempBoundingBox.x;
              this.currentBBox.y = tempBoundingBox.y;
              this.shapeCont.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h);
              var shapeStyle = this.shapeCont.style;
              var shapeTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)";
              shapeStyle.transform = shapeTransform;
              shapeStyle.webkitTransform = shapeTransform;
            }
          }
        };
        function HTextElement(data2, globalData2, comp2) {
          this.textSpans = [];
          this.textPaths = [];
          this.currentBBox = {
            x: 999999,
            y: -999999,
            h: 0,
            w: 0
          };
          this.renderType = "svg";
          this.isMasked = false;
          this.initElement(data2, globalData2, comp2);
        }
        extendPrototype([BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement, ITextElement], HTextElement);
        HTextElement.prototype.createContent = function() {
          this.isMasked = this.checkMasks();
          if (this.isMasked) {
            this.renderType = "svg";
            this.compW = this.comp.data.w;
            this.compH = this.comp.data.h;
            this.svgElement.setAttribute("width", this.compW);
            this.svgElement.setAttribute("height", this.compH);
            var g = createNS("g");
            this.maskedElement.appendChild(g);
            this.innerElem = g;
          } else {
            this.renderType = "html";
            this.innerElem = this.layerElement;
          }
          this.checkParenting();
        };
        HTextElement.prototype.buildNewText = function() {
          var documentData = this.textProperty.currentData;
          this.renderedLetters = createSizedArray(documentData.l ? documentData.l.length : 0);
          var innerElemStyle = this.innerElem.style;
          var textColor = documentData.fc ? this.buildColor(documentData.fc) : "rgba(0,0,0,0)";
          innerElemStyle.fill = textColor;
          innerElemStyle.color = textColor;
          if (documentData.sc) {
            innerElemStyle.stroke = this.buildColor(documentData.sc);
            innerElemStyle.strokeWidth = documentData.sw + "px";
          }
          var fontData = this.globalData.fontManager.getFontByName(documentData.f);
          if (!this.globalData.fontManager.chars) {
            innerElemStyle.fontSize = documentData.finalSize + "px";
            innerElemStyle.lineHeight = documentData.finalSize + "px";
            if (fontData.fClass) {
              this.innerElem.className = fontData.fClass;
            } else {
              innerElemStyle.fontFamily = fontData.fFamily;
              var fWeight = documentData.fWeight;
              var fStyle = documentData.fStyle;
              innerElemStyle.fontStyle = fStyle;
              innerElemStyle.fontWeight = fWeight;
            }
          }
          var i;
          var len;
          var letters = documentData.l;
          len = letters.length;
          var tSpan;
          var tParent;
          var tCont;
          var matrixHelper = this.mHelper;
          var shapes;
          var shapeStr = "";
          var cnt = 0;
          for (i = 0; i < len; i += 1) {
            if (this.globalData.fontManager.chars) {
              if (!this.textPaths[cnt]) {
                tSpan = createNS("path");
                tSpan.setAttribute("stroke-linecap", lineCapEnum[1]);
                tSpan.setAttribute("stroke-linejoin", lineJoinEnum[2]);
                tSpan.setAttribute("stroke-miterlimit", "4");
              } else {
                tSpan = this.textPaths[cnt];
              }
              if (!this.isMasked) {
                if (this.textSpans[cnt]) {
                  tParent = this.textSpans[cnt];
                  tCont = tParent.children[0];
                } else {
                  tParent = createTag("div");
                  tParent.style.lineHeight = 0;
                  tCont = createNS("svg");
                  tCont.appendChild(tSpan);
                  styleDiv(tParent);
                }
              }
            } else if (!this.isMasked) {
              if (this.textSpans[cnt]) {
                tParent = this.textSpans[cnt];
                tSpan = this.textPaths[cnt];
              } else {
                tParent = createTag("span");
                styleDiv(tParent);
                tSpan = createTag("span");
                styleDiv(tSpan);
                tParent.appendChild(tSpan);
              }
            } else {
              tSpan = this.textPaths[cnt] ? this.textPaths[cnt] : createNS("text");
            }
            if (this.globalData.fontManager.chars) {
              var charData = this.globalData.fontManager.getCharData(documentData.finalText[i], fontData.fStyle, this.globalData.fontManager.getFontByName(documentData.f).fFamily);
              var shapeData;
              if (charData) {
                shapeData = charData.data;
              } else {
                shapeData = null;
              }
              matrixHelper.reset();
              if (shapeData && shapeData.shapes) {
                shapes = shapeData.shapes[0].it;
                matrixHelper.scale(documentData.finalSize / 100, documentData.finalSize / 100);
                shapeStr = this.createPathShape(matrixHelper, shapes);
                tSpan.setAttribute("d", shapeStr);
              }
              if (!this.isMasked) {
                this.innerElem.appendChild(tParent);
                if (shapeData && shapeData.shapes) {
                  document.body.appendChild(tCont);
                  var boundingBox = tCont.getBBox();
                  tCont.setAttribute("width", boundingBox.width + 2);
                  tCont.setAttribute("height", boundingBox.height + 2);
                  tCont.setAttribute("viewBox", boundingBox.x - 1 + " " + (boundingBox.y - 1) + " " + (boundingBox.width + 2) + " " + (boundingBox.height + 2));
                  var tContStyle = tCont.style;
                  var tContTranslation = "translate(" + (boundingBox.x - 1) + "px," + (boundingBox.y - 1) + "px)";
                  tContStyle.transform = tContTranslation;
                  tContStyle.webkitTransform = tContTranslation;
                  letters[i].yOffset = boundingBox.y - 1;
                } else {
                  tCont.setAttribute("width", 1);
                  tCont.setAttribute("height", 1);
                }
                tParent.appendChild(tCont);
              } else {
                this.innerElem.appendChild(tSpan);
              }
            } else {
              tSpan.textContent = letters[i].val;
              tSpan.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
              if (!this.isMasked) {
                this.innerElem.appendChild(tParent);
                var tStyle = tSpan.style;
                var tSpanTranslation = "translate3d(0," + -documentData.finalSize / 1.2 + "px,0)";
                tStyle.transform = tSpanTranslation;
                tStyle.webkitTransform = tSpanTranslation;
              } else {
                this.innerElem.appendChild(tSpan);
              }
            }
            if (!this.isMasked) {
              this.textSpans[cnt] = tParent;
            } else {
              this.textSpans[cnt] = tSpan;
            }
            this.textSpans[cnt].style.display = "block";
            this.textPaths[cnt] = tSpan;
            cnt += 1;
          }
          while (cnt < this.textSpans.length) {
            this.textSpans[cnt].style.display = "none";
            cnt += 1;
          }
        };
        HTextElement.prototype.renderInnerContent = function() {
          var svgStyle;
          if (this.data.singleShape) {
            if (!this._isFirstFrame && !this.lettersChangedFlag) {
              return;
            }
            if (this.isMasked && this.finalTransform._matMdf) {
              this.svgElement.setAttribute("viewBox", -this.finalTransform.mProp.p.v[0] + " " + -this.finalTransform.mProp.p.v[1] + " " + this.compW + " " + this.compH);
              svgStyle = this.svgElement.style;
              var translation = "translate(" + -this.finalTransform.mProp.p.v[0] + "px," + -this.finalTransform.mProp.p.v[1] + "px)";
              svgStyle.transform = translation;
              svgStyle.webkitTransform = translation;
            }
          }
          this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
          if (!this.lettersChangedFlag && !this.textAnimator.lettersChangedFlag) {
            return;
          }
          var i;
          var len;
          var count = 0;
          var renderedLetters = this.textAnimator.renderedLetters;
          var letters = this.textProperty.currentData.l;
          len = letters.length;
          var renderedLetter;
          var textSpan;
          var textPath;
          for (i = 0; i < len; i += 1) {
            if (letters[i].n) {
              count += 1;
            } else {
              textSpan = this.textSpans[i];
              textPath = this.textPaths[i];
              renderedLetter = renderedLetters[count];
              count += 1;
              if (renderedLetter._mdf.m) {
                if (!this.isMasked) {
                  textSpan.style.webkitTransform = renderedLetter.m;
                  textSpan.style.transform = renderedLetter.m;
                } else {
                  textSpan.setAttribute("transform", renderedLetter.m);
                }
              }
              textSpan.style.opacity = renderedLetter.o;
              if (renderedLetter.sw && renderedLetter._mdf.sw) {
                textPath.setAttribute("stroke-width", renderedLetter.sw);
              }
              if (renderedLetter.sc && renderedLetter._mdf.sc) {
                textPath.setAttribute("stroke", renderedLetter.sc);
              }
              if (renderedLetter.fc && renderedLetter._mdf.fc) {
                textPath.setAttribute("fill", renderedLetter.fc);
                textPath.style.color = renderedLetter.fc;
              }
            }
          }
          if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
            var boundingBox = this.innerElem.getBBox();
            if (this.currentBBox.w !== boundingBox.width) {
              this.currentBBox.w = boundingBox.width;
              this.svgElement.setAttribute("width", boundingBox.width);
            }
            if (this.currentBBox.h !== boundingBox.height) {
              this.currentBBox.h = boundingBox.height;
              this.svgElement.setAttribute("height", boundingBox.height);
            }
            var margin = 1;
            if (this.currentBBox.w !== boundingBox.width + margin * 2 || this.currentBBox.h !== boundingBox.height + margin * 2 || this.currentBBox.x !== boundingBox.x - margin || this.currentBBox.y !== boundingBox.y - margin) {
              this.currentBBox.w = boundingBox.width + margin * 2;
              this.currentBBox.h = boundingBox.height + margin * 2;
              this.currentBBox.x = boundingBox.x - margin;
              this.currentBBox.y = boundingBox.y - margin;
              this.svgElement.setAttribute("viewBox", this.currentBBox.x + " " + this.currentBBox.y + " " + this.currentBBox.w + " " + this.currentBBox.h);
              svgStyle = this.svgElement.style;
              var svgTransform = "translate(" + this.currentBBox.x + "px," + this.currentBBox.y + "px)";
              svgStyle.transform = svgTransform;
              svgStyle.webkitTransform = svgTransform;
            }
          }
        };
        function HImageElement(data2, globalData2, comp2) {
          this.assetData = globalData2.getAssetData(data2.refId);
          this.initElement(data2, globalData2, comp2);
        }
        extendPrototype([BaseElement, TransformElement, HBaseElement, HSolidElement, HierarchyElement, FrameElement, RenderableElement], HImageElement);
        HImageElement.prototype.createContent = function() {
          var assetPath = this.globalData.getAssetsPath(this.assetData);
          var img = new Image();
          if (this.data.hasMask) {
            this.imageElem = createNS("image");
            this.imageElem.setAttribute("width", this.assetData.w + "px");
            this.imageElem.setAttribute("height", this.assetData.h + "px");
            this.imageElem.setAttributeNS("http://www.w3.org/1999/xlink", "href", assetPath);
            this.layerElement.appendChild(this.imageElem);
            this.baseElement.setAttribute("width", this.assetData.w);
            this.baseElement.setAttribute("height", this.assetData.h);
          } else {
            this.layerElement.appendChild(img);
          }
          img.crossOrigin = "anonymous";
          img.src = assetPath;
          if (this.data.ln) {
            this.baseElement.setAttribute("id", this.data.ln);
          }
        };
        function HCameraElement(data2, globalData2, comp2) {
          this.initFrame();
          this.initBaseData(data2, globalData2, comp2);
          this.initHierarchy();
          var getProp = PropertyFactory.getProp;
          this.pe = getProp(this, data2.pe, 0, 0, this);
          if (data2.ks.p.s) {
            this.px = getProp(this, data2.ks.p.x, 1, 0, this);
            this.py = getProp(this, data2.ks.p.y, 1, 0, this);
            this.pz = getProp(this, data2.ks.p.z, 1, 0, this);
          } else {
            this.p = getProp(this, data2.ks.p, 1, 0, this);
          }
          if (data2.ks.a) {
            this.a = getProp(this, data2.ks.a, 1, 0, this);
          }
          if (data2.ks.or.k.length && data2.ks.or.k[0].to) {
            var i;
            var len = data2.ks.or.k.length;
            for (i = 0; i < len; i += 1) {
              data2.ks.or.k[i].to = null;
              data2.ks.or.k[i].ti = null;
            }
          }
          this.or = getProp(this, data2.ks.or, 1, degToRads, this);
          this.or.sh = true;
          this.rx = getProp(this, data2.ks.rx, 0, degToRads, this);
          this.ry = getProp(this, data2.ks.ry, 0, degToRads, this);
          this.rz = getProp(this, data2.ks.rz, 0, degToRads, this);
          this.mat = new Matrix();
          this._prevMat = new Matrix();
          this._isFirstFrame = true;
          this.finalTransform = {
            mProp: this
          };
        }
        extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement);
        HCameraElement.prototype.setup = function() {
          var i;
          var len = this.comp.threeDElements.length;
          var comp2;
          var perspectiveStyle;
          var containerStyle;
          for (i = 0; i < len; i += 1) {
            comp2 = this.comp.threeDElements[i];
            if (comp2.type === "3d") {
              perspectiveStyle = comp2.perspectiveElem.style;
              containerStyle = comp2.container.style;
              var perspective = this.pe.v + "px";
              var origin = "0px 0px 0px";
              var matrix = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
              perspectiveStyle.perspective = perspective;
              perspectiveStyle.webkitPerspective = perspective;
              containerStyle.transformOrigin = origin;
              containerStyle.mozTransformOrigin = origin;
              containerStyle.webkitTransformOrigin = origin;
              perspectiveStyle.transform = matrix;
              perspectiveStyle.webkitTransform = matrix;
            }
          }
        };
        HCameraElement.prototype.createElements = function() {
        };
        HCameraElement.prototype.hide = function() {
        };
        HCameraElement.prototype.renderFrame = function() {
          var _mdf = this._isFirstFrame;
          var i;
          var len;
          if (this.hierarchy) {
            len = this.hierarchy.length;
            for (i = 0; i < len; i += 1) {
              _mdf = this.hierarchy[i].finalTransform.mProp._mdf || _mdf;
            }
          }
          if (_mdf || this.pe._mdf || this.p && this.p._mdf || this.px && (this.px._mdf || this.py._mdf || this.pz._mdf) || this.rx._mdf || this.ry._mdf || this.rz._mdf || this.or._mdf || this.a && this.a._mdf) {
            this.mat.reset();
            if (this.hierarchy) {
              len = this.hierarchy.length - 1;
              for (i = len; i >= 0; i -= 1) {
                var mTransf = this.hierarchy[i].finalTransform.mProp;
                this.mat.translate(-mTransf.p.v[0], -mTransf.p.v[1], mTransf.p.v[2]);
                this.mat.rotateX(-mTransf.or.v[0]).rotateY(-mTransf.or.v[1]).rotateZ(mTransf.or.v[2]);
                this.mat.rotateX(-mTransf.rx.v).rotateY(-mTransf.ry.v).rotateZ(mTransf.rz.v);
                this.mat.scale(1 / mTransf.s.v[0], 1 / mTransf.s.v[1], 1 / mTransf.s.v[2]);
                this.mat.translate(mTransf.a.v[0], mTransf.a.v[1], mTransf.a.v[2]);
              }
            }
            if (this.p) {
              this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2]);
            } else {
              this.mat.translate(-this.px.v, -this.py.v, this.pz.v);
            }
            if (this.a) {
              var diffVector;
              if (this.p) {
                diffVector = [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]];
              } else {
                diffVector = [this.px.v - this.a.v[0], this.py.v - this.a.v[1], this.pz.v - this.a.v[2]];
              }
              var mag = Math.sqrt(Math.pow(diffVector[0], 2) + Math.pow(diffVector[1], 2) + Math.pow(diffVector[2], 2));
              var lookDir = [diffVector[0] / mag, diffVector[1] / mag, diffVector[2] / mag];
              var lookLengthOnXZ = Math.sqrt(lookDir[2] * lookDir[2] + lookDir[0] * lookDir[0]);
              var mRotationX = Math.atan2(lookDir[1], lookLengthOnXZ);
              var mRotationY = Math.atan2(lookDir[0], -lookDir[2]);
              this.mat.rotateY(mRotationY).rotateX(-mRotationX);
            }
            this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v);
            this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]);
            this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0);
            this.mat.translate(0, 0, this.pe.v);
            var hasMatrixChanged = !this._prevMat.equals(this.mat);
            if ((hasMatrixChanged || this.pe._mdf) && this.comp.threeDElements) {
              len = this.comp.threeDElements.length;
              var comp2;
              var perspectiveStyle;
              var containerStyle;
              for (i = 0; i < len; i += 1) {
                comp2 = this.comp.threeDElements[i];
                if (comp2.type === "3d") {
                  if (hasMatrixChanged) {
                    var matValue = this.mat.toCSS();
                    containerStyle = comp2.container.style;
                    containerStyle.transform = matValue;
                    containerStyle.webkitTransform = matValue;
                  }
                  if (this.pe._mdf) {
                    perspectiveStyle = comp2.perspectiveElem.style;
                    perspectiveStyle.perspective = this.pe.v + "px";
                    perspectiveStyle.webkitPerspective = this.pe.v + "px";
                  }
                }
              }
              this.mat.clone(this._prevMat);
            }
          }
          this._isFirstFrame = false;
        };
        HCameraElement.prototype.prepareFrame = function(num) {
          this.prepareProperties(num, true);
        };
        HCameraElement.prototype.destroy = function() {
        };
        HCameraElement.prototype.getBaseElement = function() {
          return null;
        };
        function HEffects() {
        }
        HEffects.prototype.renderFrame = function() {
        };
        var animationManager = function() {
          var moduleOb = {};
          var registeredAnimations = [];
          var initTime = 0;
          var len = 0;
          var playingAnimationsNum = 0;
          var _stopped = true;
          var _isFrozen = false;
          function removeElement2(ev) {
            var i = 0;
            var animItem = ev.target;
            while (i < len) {
              if (registeredAnimations[i].animation === animItem) {
                registeredAnimations.splice(i, 1);
                i -= 1;
                len -= 1;
                if (!animItem.isPaused) {
                  subtractPlayingCount();
                }
              }
              i += 1;
            }
          }
          function registerAnimation(element, animationData2) {
            if (!element) {
              return null;
            }
            var i = 0;
            while (i < len) {
              if (registeredAnimations[i].elem === element && registeredAnimations[i].elem !== null) {
                return registeredAnimations[i].animation;
              }
              i += 1;
            }
            var animItem = new AnimationItem();
            setupAnimation(animItem, element);
            animItem.setData(element, animationData2);
            return animItem;
          }
          function getRegisteredAnimations() {
            var i;
            var lenAnims = registeredAnimations.length;
            var animations = [];
            for (i = 0; i < lenAnims; i += 1) {
              animations.push(registeredAnimations[i].animation);
            }
            return animations;
          }
          function addPlayingCount() {
            playingAnimationsNum += 1;
            activate();
          }
          function subtractPlayingCount() {
            playingAnimationsNum -= 1;
          }
          function setupAnimation(animItem, element) {
            animItem.addEventListener("destroy", removeElement2);
            animItem.addEventListener("_active", addPlayingCount);
            animItem.addEventListener("_idle", subtractPlayingCount);
            registeredAnimations.push({ elem: element, animation: animItem });
            len += 1;
          }
          function loadAnimation2(params) {
            var animItem = new AnimationItem();
            setupAnimation(animItem, null);
            animItem.setParams(params);
            return animItem;
          }
          function setSpeed(val2, animation) {
            var i;
            for (i = 0; i < len; i += 1) {
              registeredAnimations[i].animation.setSpeed(val2, animation);
            }
          }
          function setDirection(val2, animation) {
            var i;
            for (i = 0; i < len; i += 1) {
              registeredAnimations[i].animation.setDirection(val2, animation);
            }
          }
          function play(animation) {
            var i;
            for (i = 0; i < len; i += 1) {
              registeredAnimations[i].animation.play(animation);
            }
          }
          function resume(nowTime) {
            var elapsedTime = nowTime - initTime;
            var i;
            for (i = 0; i < len; i += 1) {
              registeredAnimations[i].animation.advanceTime(elapsedTime);
            }
            initTime = nowTime;
            if (playingAnimationsNum && !_isFrozen) {
              window.requestAnimationFrame(resume);
            } else {
              _stopped = true;
            }
          }
          function first(nowTime) {
            initTime = nowTime;
            window.requestAnimationFrame(resume);
          }
          function pause(animation) {
            var i;
            for (i = 0; i < len; i += 1) {
              registeredAnimations[i].animation.pause(animation);
            }
          }
          function goToAndStop(value2, isFrame, animation) {
            var i;
            for (i = 0; i < len; i += 1) {
              registeredAnimations[i].animation.goToAndStop(value2, isFrame, animation);
            }
          }
          function stop(animation) {
            var i;
            for (i = 0; i < len; i += 1) {
              registeredAnimations[i].animation.stop(animation);
            }
          }
          function togglePause(animation) {
            var i;
            for (i = 0; i < len; i += 1) {
              registeredAnimations[i].animation.togglePause(animation);
            }
          }
          function destroy(animation) {
            var i;
            for (i = len - 1; i >= 0; i -= 1) {
              registeredAnimations[i].animation.destroy(animation);
            }
          }
          function searchAnimations2(animationData2, standalone2, renderer2) {
            var animElements = [].concat(
              [].slice.call(document.getElementsByClassName("lottie")),
              [].slice.call(document.getElementsByClassName("bodymovin"))
            );
            var i;
            var lenAnims = animElements.length;
            for (i = 0; i < lenAnims; i += 1) {
              if (renderer2) {
                animElements[i].setAttribute("data-bm-type", renderer2);
              }
              registerAnimation(animElements[i], animationData2);
            }
            if (standalone2 && lenAnims === 0) {
              if (!renderer2) {
                renderer2 = "svg";
              }
              var body = document.getElementsByTagName("body")[0];
              body.innerText = "";
              var div2 = createTag("div");
              div2.style.width = "100%";
              div2.style.height = "100%";
              div2.setAttribute("data-bm-type", renderer2);
              body.appendChild(div2);
              registerAnimation(div2, animationData2);
            }
          }
          function resize() {
            var i;
            for (i = 0; i < len; i += 1) {
              registeredAnimations[i].animation.resize();
            }
          }
          function activate() {
            if (!_isFrozen && playingAnimationsNum) {
              if (_stopped) {
                window.requestAnimationFrame(first);
                _stopped = false;
              }
            }
          }
          function freeze() {
            _isFrozen = true;
          }
          function unfreeze() {
            _isFrozen = false;
            activate();
          }
          function setVolume(val2, animation) {
            var i;
            for (i = 0; i < len; i += 1) {
              registeredAnimations[i].animation.setVolume(val2, animation);
            }
          }
          function mute(animation) {
            var i;
            for (i = 0; i < len; i += 1) {
              registeredAnimations[i].animation.mute(animation);
            }
          }
          function unmute(animation) {
            var i;
            for (i = 0; i < len; i += 1) {
              registeredAnimations[i].animation.unmute(animation);
            }
          }
          moduleOb.registerAnimation = registerAnimation;
          moduleOb.loadAnimation = loadAnimation2;
          moduleOb.setSpeed = setSpeed;
          moduleOb.setDirection = setDirection;
          moduleOb.play = play;
          moduleOb.pause = pause;
          moduleOb.stop = stop;
          moduleOb.togglePause = togglePause;
          moduleOb.searchAnimations = searchAnimations2;
          moduleOb.resize = resize;
          moduleOb.goToAndStop = goToAndStop;
          moduleOb.destroy = destroy;
          moduleOb.freeze = freeze;
          moduleOb.unfreeze = unfreeze;
          moduleOb.setVolume = setVolume;
          moduleOb.mute = mute;
          moduleOb.unmute = unmute;
          moduleOb.getRegisteredAnimations = getRegisteredAnimations;
          return moduleOb;
        }();
        var AnimationItem = function() {
          this._cbs = [];
          this.name = "";
          this.path = "";
          this.isLoaded = false;
          this.currentFrame = 0;
          this.currentRawFrame = 0;
          this.firstFrame = 0;
          this.totalFrames = 0;
          this.frameRate = 0;
          this.frameMult = 0;
          this.playSpeed = 1;
          this.playDirection = 1;
          this.playCount = 0;
          this.animationData = {};
          this.assets = [];
          this.isPaused = true;
          this.autoplay = false;
          this.loop = true;
          this.renderer = null;
          this.animationID = createElementID();
          this.assetsPath = "";
          this.timeCompleted = 0;
          this.segmentPos = 0;
          this.isSubframeEnabled = subframeEnabled;
          this.segments = [];
          this._idle = true;
          this._completedLoop = false;
          this.projectInterface = ProjectInterface();
          this.imagePreloader = new ImagePreloader();
          this.audioController = audioControllerFactory();
          this.markers = [];
          this.configAnimation = this.configAnimation.bind(this);
          this.onSetupError = this.onSetupError.bind(this);
          this.onSegmentComplete = this.onSegmentComplete.bind(this);
        };
        extendPrototype([BaseEvent], AnimationItem);
        AnimationItem.prototype.setParams = function(params) {
          if (params.wrapper || params.container) {
            this.wrapper = params.wrapper || params.container;
          }
          var animType = "svg";
          if (params.animType) {
            animType = params.animType;
          } else if (params.renderer) {
            animType = params.renderer;
          }
          switch (animType) {
            case "canvas":
              this.renderer = new CanvasRenderer(this, params.rendererSettings);
              break;
            case "svg":
              this.renderer = new SVGRenderer(this, params.rendererSettings);
              break;
            default:
              this.renderer = new HybridRenderer(this, params.rendererSettings);
              break;
          }
          this.imagePreloader.setCacheType(animType, this.renderer.globalData.defs);
          this.renderer.setProjectInterface(this.projectInterface);
          this.animType = animType;
          if (params.loop === "" || params.loop === null || params.loop === void 0 || params.loop === true) {
            this.loop = true;
          } else if (params.loop === false) {
            this.loop = false;
          } else {
            this.loop = parseInt(params.loop, 10);
          }
          this.autoplay = "autoplay" in params ? params.autoplay : true;
          this.name = params.name ? params.name : "";
          this.autoloadSegments = Object.prototype.hasOwnProperty.call(params, "autoloadSegments") ? params.autoloadSegments : true;
          this.assetsPath = params.assetsPath;
          this.initialSegment = params.initialSegment;
          if (params.audioFactory) {
            this.audioController.setAudioFactory(params.audioFactory);
          }
          if (params.animationData) {
            this.setupAnimation(params.animationData);
          } else if (params.path) {
            if (params.path.lastIndexOf("\\") !== -1) {
              this.path = params.path.substr(0, params.path.lastIndexOf("\\") + 1);
            } else {
              this.path = params.path.substr(0, params.path.lastIndexOf("/") + 1);
            }
            this.fileName = params.path.substr(params.path.lastIndexOf("/") + 1);
            this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf(".json"));
            dataManager.loadAnimation(
              params.path,
              this.configAnimation,
              this.onSetupError
            );
          }
        };
        AnimationItem.prototype.onSetupError = function() {
          this.trigger("data_failed");
        };
        AnimationItem.prototype.setupAnimation = function(data2) {
          dataManager.completeAnimation(
            data2,
            this.configAnimation
          );
        };
        AnimationItem.prototype.setData = function(wrapper, animationData2) {
          if (animationData2) {
            if (typeof animationData2 !== "object") {
              animationData2 = JSON.parse(animationData2);
            }
          }
          var params = {
            wrapper,
            animationData: animationData2
          };
          var wrapperAttributes = wrapper.attributes;
          params.path = wrapperAttributes.getNamedItem("data-animation-path") ? wrapperAttributes.getNamedItem("data-animation-path").value : wrapperAttributes.getNamedItem("data-bm-path") ? wrapperAttributes.getNamedItem("data-bm-path").value : wrapperAttributes.getNamedItem("bm-path") ? wrapperAttributes.getNamedItem("bm-path").value : "";
          params.animType = wrapperAttributes.getNamedItem("data-anim-type") ? wrapperAttributes.getNamedItem("data-anim-type").value : wrapperAttributes.getNamedItem("data-bm-type") ? wrapperAttributes.getNamedItem("data-bm-type").value : wrapperAttributes.getNamedItem("bm-type") ? wrapperAttributes.getNamedItem("bm-type").value : wrapperAttributes.getNamedItem("data-bm-renderer") ? wrapperAttributes.getNamedItem("data-bm-renderer").value : wrapperAttributes.getNamedItem("bm-renderer") ? wrapperAttributes.getNamedItem("bm-renderer").value : "canvas";
          var loop = wrapperAttributes.getNamedItem("data-anim-loop") ? wrapperAttributes.getNamedItem("data-anim-loop").value : wrapperAttributes.getNamedItem("data-bm-loop") ? wrapperAttributes.getNamedItem("data-bm-loop").value : wrapperAttributes.getNamedItem("bm-loop") ? wrapperAttributes.getNamedItem("bm-loop").value : "";
          if (loop === "false") {
            params.loop = false;
          } else if (loop === "true") {
            params.loop = true;
          } else if (loop !== "") {
            params.loop = parseInt(loop, 10);
          }
          var autoplay = wrapperAttributes.getNamedItem("data-anim-autoplay") ? wrapperAttributes.getNamedItem("data-anim-autoplay").value : wrapperAttributes.getNamedItem("data-bm-autoplay") ? wrapperAttributes.getNamedItem("data-bm-autoplay").value : wrapperAttributes.getNamedItem("bm-autoplay") ? wrapperAttributes.getNamedItem("bm-autoplay").value : true;
          params.autoplay = autoplay !== "false";
          params.name = wrapperAttributes.getNamedItem("data-name") ? wrapperAttributes.getNamedItem("data-name").value : wrapperAttributes.getNamedItem("data-bm-name") ? wrapperAttributes.getNamedItem("data-bm-name").value : wrapperAttributes.getNamedItem("bm-name") ? wrapperAttributes.getNamedItem("bm-name").value : "";
          var prerender = wrapperAttributes.getNamedItem("data-anim-prerender") ? wrapperAttributes.getNamedItem("data-anim-prerender").value : wrapperAttributes.getNamedItem("data-bm-prerender") ? wrapperAttributes.getNamedItem("data-bm-prerender").value : wrapperAttributes.getNamedItem("bm-prerender") ? wrapperAttributes.getNamedItem("bm-prerender").value : "";
          if (prerender === "false") {
            params.prerender = false;
          }
          this.setParams(params);
        };
        AnimationItem.prototype.includeLayers = function(data2) {
          if (data2.op > this.animationData.op) {
            this.animationData.op = data2.op;
            this.totalFrames = Math.floor(data2.op - this.animationData.ip);
          }
          var layers = this.animationData.layers;
          var i;
          var len = layers.length;
          var newLayers = data2.layers;
          var j;
          var jLen = newLayers.length;
          for (j = 0; j < jLen; j += 1) {
            i = 0;
            while (i < len) {
              if (layers[i].id === newLayers[j].id) {
                layers[i] = newLayers[j];
                break;
              }
              i += 1;
            }
          }
          if (data2.chars || data2.fonts) {
            this.renderer.globalData.fontManager.addChars(data2.chars);
            this.renderer.globalData.fontManager.addFonts(data2.fonts, this.renderer.globalData.defs);
          }
          if (data2.assets) {
            len = data2.assets.length;
            for (i = 0; i < len; i += 1) {
              this.animationData.assets.push(data2.assets[i]);
            }
          }
          this.animationData.__complete = false;
          dataManager.completeAnimation(
            this.animationData,
            this.onSegmentComplete
          );
        };
        AnimationItem.prototype.onSegmentComplete = function(data2) {
          this.animationData = data2;
          if (expressionsPlugin) {
            expressionsPlugin.initExpressions(this);
          }
          this.loadNextSegment();
        };
        AnimationItem.prototype.loadNextSegment = function() {
          var segments = this.animationData.segments;
          if (!segments || segments.length === 0 || !this.autoloadSegments) {
            this.trigger("data_ready");
            this.timeCompleted = this.totalFrames;
            return;
          }
          var segment = segments.shift();
          this.timeCompleted = segment.time * this.frameRate;
          var segmentPath = this.path + this.fileName + "_" + this.segmentPos + ".json";
          this.segmentPos += 1;
          dataManager.loadData(segmentPath, this.includeLayers.bind(this), function() {
            this.trigger("data_failed");
          }.bind(this));
        };
        AnimationItem.prototype.loadSegments = function() {
          var segments = this.animationData.segments;
          if (!segments) {
            this.timeCompleted = this.totalFrames;
          }
          this.loadNextSegment();
        };
        AnimationItem.prototype.imagesLoaded = function() {
          this.trigger("loaded_images");
          this.checkLoaded();
        };
        AnimationItem.prototype.preloadImages = function() {
          this.imagePreloader.setAssetsPath(this.assetsPath);
          this.imagePreloader.setPath(this.path);
          this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this));
        };
        AnimationItem.prototype.configAnimation = function(animData) {
          if (!this.renderer) {
            return;
          }
          try {
            this.animationData = animData;
            if (this.initialSegment) {
              this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0]);
              this.firstFrame = Math.round(this.initialSegment[0]);
            } else {
              this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip);
              this.firstFrame = Math.round(this.animationData.ip);
            }
            this.renderer.configAnimation(animData);
            if (!animData.assets) {
              animData.assets = [];
            }
            this.assets = this.animationData.assets;
            this.frameRate = this.animationData.fr;
            this.frameMult = this.animationData.fr / 1e3;
            this.renderer.searchExtraCompositions(animData.assets);
            this.markers = markerParser(animData.markers || []);
            this.trigger("config_ready");
            this.preloadImages();
            this.loadSegments();
            this.updaFrameModifier();
            this.waitForFontsLoaded();
            if (this.isPaused) {
              this.audioController.pause();
            }
          } catch (error) {
            this.triggerConfigError(error);
          }
        };
        AnimationItem.prototype.waitForFontsLoaded = function() {
          if (!this.renderer) {
            return;
          }
          if (this.renderer.globalData.fontManager.isLoaded) {
            this.checkLoaded();
          } else {
            setTimeout(this.waitForFontsLoaded.bind(this), 20);
          }
        };
        AnimationItem.prototype.checkLoaded = function() {
          if (!this.isLoaded && this.renderer.globalData.fontManager.isLoaded && (this.imagePreloader.loadedImages() || this.renderer.rendererType !== "canvas") && this.imagePreloader.loadedFootages()) {
            this.isLoaded = true;
            if (expressionsPlugin) {
              expressionsPlugin.initExpressions(this);
            }
            this.renderer.initItems();
            setTimeout(function() {
              this.trigger("DOMLoaded");
            }.bind(this), 0);
            this.gotoFrame();
            if (this.autoplay) {
              this.play();
            }
          }
        };
        AnimationItem.prototype.resize = function() {
          this.renderer.updateContainerSize();
        };
        AnimationItem.prototype.setSubframe = function(flag) {
          this.isSubframeEnabled = !!flag;
        };
        AnimationItem.prototype.gotoFrame = function() {
          this.currentFrame = this.isSubframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame;
          if (this.timeCompleted !== this.totalFrames && this.currentFrame > this.timeCompleted) {
            this.currentFrame = this.timeCompleted;
          }
          this.trigger("enterFrame");
          this.renderFrame();
          this.trigger("drawnFrame");
        };
        AnimationItem.prototype.renderFrame = function() {
          if (this.isLoaded === false || !this.renderer) {
            return;
          }
          try {
            this.renderer.renderFrame(this.currentFrame + this.firstFrame);
          } catch (error) {
            this.triggerRenderFrameError(error);
          }
        };
        AnimationItem.prototype.play = function(name2) {
          if (name2 && this.name !== name2) {
            return;
          }
          if (this.isPaused === true) {
            this.isPaused = false;
            this.audioController.resume();
            if (this._idle) {
              this._idle = false;
              this.trigger("_active");
            }
          }
        };
        AnimationItem.prototype.pause = function(name2) {
          if (name2 && this.name !== name2) {
            return;
          }
          if (this.isPaused === false) {
            this.isPaused = true;
            this._idle = true;
            this.trigger("_idle");
            this.audioController.pause();
          }
        };
        AnimationItem.prototype.togglePause = function(name2) {
          if (name2 && this.name !== name2) {
            return;
          }
          if (this.isPaused === true) {
            this.play();
          } else {
            this.pause();
          }
        };
        AnimationItem.prototype.stop = function(name2) {
          if (name2 && this.name !== name2) {
            return;
          }
          this.pause();
          this.playCount = 0;
          this._completedLoop = false;
          this.setCurrentRawFrameValue(0);
        };
        AnimationItem.prototype.getMarkerData = function(markerName) {
          var marker;
          for (var i = 0; i < this.markers.length; i += 1) {
            marker = this.markers[i];
            if (marker.payload && marker.payload.name === markerName) {
              return marker;
            }
          }
          return null;
        };
        AnimationItem.prototype.goToAndStop = function(value2, isFrame, name2) {
          if (name2 && this.name !== name2) {
            return;
          }
          var numValue = Number(value2);
          if (isNaN(numValue)) {
            var marker = this.getMarkerData(value2);
            if (marker) {
              this.goToAndStop(marker.time, true);
            }
          } else if (isFrame) {
            this.setCurrentRawFrameValue(value2);
          } else {
            this.setCurrentRawFrameValue(value2 * this.frameModifier);
          }
          this.pause();
        };
        AnimationItem.prototype.goToAndPlay = function(value2, isFrame, name2) {
          if (name2 && this.name !== name2) {
            return;
          }
          var numValue = Number(value2);
          if (isNaN(numValue)) {
            var marker = this.getMarkerData(value2);
            if (marker) {
              if (!marker.duration) {
                this.goToAndStop(marker.time, true);
              } else {
                this.playSegments([marker.time, marker.time + marker.duration], true);
              }
            }
          } else {
            this.goToAndStop(numValue, isFrame, name2);
          }
          this.play();
        };
        AnimationItem.prototype.advanceTime = function(value2) {
          if (this.isPaused === true || this.isLoaded === false) {
            return;
          }
          var nextValue = this.currentRawFrame + value2 * this.frameModifier;
          var _isComplete = false;
          if (nextValue >= this.totalFrames - 1 && this.frameModifier > 0) {
            if (!this.loop || this.playCount === this.loop) {
              if (!this.checkSegments(nextValue > this.totalFrames ? nextValue % this.totalFrames : 0)) {
                _isComplete = true;
                nextValue = this.totalFrames - 1;
              }
            } else if (nextValue >= this.totalFrames) {
              this.playCount += 1;
              if (!this.checkSegments(nextValue % this.totalFrames)) {
                this.setCurrentRawFrameValue(nextValue % this.totalFrames);
                this._completedLoop = true;
                this.trigger("loopComplete");
              }
            } else {
              this.setCurrentRawFrameValue(nextValue);
            }
          } else if (nextValue < 0) {
            if (!this.checkSegments(nextValue % this.totalFrames)) {
              if (this.loop && !(this.playCount-- <= 0 && this.loop !== true)) {
                this.setCurrentRawFrameValue(this.totalFrames + nextValue % this.totalFrames);
                if (!this._completedLoop) {
                  this._completedLoop = true;
                } else {
                  this.trigger("loopComplete");
                }
              } else {
                _isComplete = true;
                nextValue = 0;
              }
            }
          } else {
            this.setCurrentRawFrameValue(nextValue);
          }
          if (_isComplete) {
            this.setCurrentRawFrameValue(nextValue);
            this.pause();
            this.trigger("complete");
          }
        };
        AnimationItem.prototype.adjustSegment = function(arr, offset) {
          this.playCount = 0;
          if (arr[1] < arr[0]) {
            if (this.frameModifier > 0) {
              if (this.playSpeed < 0) {
                this.setSpeed(-this.playSpeed);
              } else {
                this.setDirection(-1);
              }
            }
            this.totalFrames = arr[0] - arr[1];
            this.timeCompleted = this.totalFrames;
            this.firstFrame = arr[1];
            this.setCurrentRawFrameValue(this.totalFrames - 1e-3 - offset);
          } else if (arr[1] > arr[0]) {
            if (this.frameModifier < 0) {
              if (this.playSpeed < 0) {
                this.setSpeed(-this.playSpeed);
              } else {
                this.setDirection(1);
              }
            }
            this.totalFrames = arr[1] - arr[0];
            this.timeCompleted = this.totalFrames;
            this.firstFrame = arr[0];
            this.setCurrentRawFrameValue(1e-3 + offset);
          }
          this.trigger("segmentStart");
        };
        AnimationItem.prototype.setSegment = function(init, end) {
          var pendingFrame = -1;
          if (this.isPaused) {
            if (this.currentRawFrame + this.firstFrame < init) {
              pendingFrame = init;
            } else if (this.currentRawFrame + this.firstFrame > end) {
              pendingFrame = end - init;
            }
          }
          this.firstFrame = init;
          this.totalFrames = end - init;
          this.timeCompleted = this.totalFrames;
          if (pendingFrame !== -1) {
            this.goToAndStop(pendingFrame, true);
          }
        };
        AnimationItem.prototype.playSegments = function(arr, forceFlag) {
          if (forceFlag) {
            this.segments.length = 0;
          }
          if (typeof arr[0] === "object") {
            var i;
            var len = arr.length;
            for (i = 0; i < len; i += 1) {
              this.segments.push(arr[i]);
            }
          } else {
            this.segments.push(arr);
          }
          if (this.segments.length && forceFlag) {
            this.adjustSegment(this.segments.shift(), 0);
          }
          if (this.isPaused) {
            this.play();
          }
        };
        AnimationItem.prototype.resetSegments = function(forceFlag) {
          this.segments.length = 0;
          this.segments.push([this.animationData.ip, this.animationData.op]);
          if (forceFlag) {
            this.checkSegments(0);
          }
        };
        AnimationItem.prototype.checkSegments = function(offset) {
          if (this.segments.length) {
            this.adjustSegment(this.segments.shift(), offset);
            return true;
          }
          return false;
        };
        AnimationItem.prototype.destroy = function(name2) {
          if (name2 && this.name !== name2 || !this.renderer) {
            return;
          }
          this.renderer.destroy();
          this.imagePreloader.destroy();
          this.trigger("destroy");
          this._cbs = null;
          this.onEnterFrame = null;
          this.onLoopComplete = null;
          this.onComplete = null;
          this.onSegmentStart = null;
          this.onDestroy = null;
          this.renderer = null;
          this.renderer = null;
          this.imagePreloader = null;
          this.projectInterface = null;
        };
        AnimationItem.prototype.setCurrentRawFrameValue = function(value2) {
          this.currentRawFrame = value2;
          this.gotoFrame();
        };
        AnimationItem.prototype.setSpeed = function(val2) {
          this.playSpeed = val2;
          this.updaFrameModifier();
        };
        AnimationItem.prototype.setDirection = function(val2) {
          this.playDirection = val2 < 0 ? -1 : 1;
          this.updaFrameModifier();
        };
        AnimationItem.prototype.setVolume = function(val2, name2) {
          if (name2 && this.name !== name2) {
            return;
          }
          this.audioController.setVolume(val2);
        };
        AnimationItem.prototype.getVolume = function() {
          return this.audioController.getVolume();
        };
        AnimationItem.prototype.mute = function(name2) {
          if (name2 && this.name !== name2) {
            return;
          }
          this.audioController.mute();
        };
        AnimationItem.prototype.unmute = function(name2) {
          if (name2 && this.name !== name2) {
            return;
          }
          this.audioController.unmute();
        };
        AnimationItem.prototype.updaFrameModifier = function() {
          this.frameModifier = this.frameMult * this.playSpeed * this.playDirection;
          this.audioController.setRate(this.playSpeed * this.playDirection);
        };
        AnimationItem.prototype.getPath = function() {
          return this.path;
        };
        AnimationItem.prototype.getAssetsPath = function(assetData) {
          var path = "";
          if (assetData.e) {
            path = assetData.p;
          } else if (this.assetsPath) {
            var imagePath = assetData.p;
            if (imagePath.indexOf("images/") !== -1) {
              imagePath = imagePath.split("/")[1];
            }
            path = this.assetsPath + imagePath;
          } else {
            path = this.path;
            path += assetData.u ? assetData.u : "";
            path += assetData.p;
          }
          return path;
        };
        AnimationItem.prototype.getAssetData = function(id2) {
          var i = 0;
          var len = this.assets.length;
          while (i < len) {
            if (id2 === this.assets[i].id) {
              return this.assets[i];
            }
            i += 1;
          }
          return null;
        };
        AnimationItem.prototype.hide = function() {
          this.renderer.hide();
        };
        AnimationItem.prototype.show = function() {
          this.renderer.show();
        };
        AnimationItem.prototype.getDuration = function(isFrame) {
          return isFrame ? this.totalFrames : this.totalFrames / this.frameRate;
        };
        AnimationItem.prototype.trigger = function(name2) {
          if (this._cbs && this._cbs[name2]) {
            switch (name2) {
              case "enterFrame":
              case "drawnFrame":
                this.triggerEvent(name2, new BMEnterFrameEvent(name2, this.currentFrame, this.totalFrames, this.frameModifier));
                break;
              case "loopComplete":
                this.triggerEvent(name2, new BMCompleteLoopEvent(name2, this.loop, this.playCount, this.frameMult));
                break;
              case "complete":
                this.triggerEvent(name2, new BMCompleteEvent(name2, this.frameMult));
                break;
              case "segmentStart":
                this.triggerEvent(name2, new BMSegmentStartEvent(name2, this.firstFrame, this.totalFrames));
                break;
              case "destroy":
                this.triggerEvent(name2, new BMDestroyEvent(name2, this));
                break;
              default:
                this.triggerEvent(name2);
            }
          }
          if (name2 === "enterFrame" && this.onEnterFrame) {
            this.onEnterFrame.call(this, new BMEnterFrameEvent(name2, this.currentFrame, this.totalFrames, this.frameMult));
          }
          if (name2 === "loopComplete" && this.onLoopComplete) {
            this.onLoopComplete.call(this, new BMCompleteLoopEvent(name2, this.loop, this.playCount, this.frameMult));
          }
          if (name2 === "complete" && this.onComplete) {
            this.onComplete.call(this, new BMCompleteEvent(name2, this.frameMult));
          }
          if (name2 === "segmentStart" && this.onSegmentStart) {
            this.onSegmentStart.call(this, new BMSegmentStartEvent(name2, this.firstFrame, this.totalFrames));
          }
          if (name2 === "destroy" && this.onDestroy) {
            this.onDestroy.call(this, new BMDestroyEvent(name2, this));
          }
        };
        AnimationItem.prototype.triggerRenderFrameError = function(nativeError) {
          var error = new BMRenderFrameErrorEvent(nativeError, this.currentFrame);
          this.triggerEvent("error", error);
          if (this.onError) {
            this.onError.call(this, error);
          }
        };
        AnimationItem.prototype.triggerConfigError = function(nativeError) {
          var error = new BMConfigErrorEvent(nativeError, this.currentFrame);
          this.triggerEvent("error", error);
          if (this.onError) {
            this.onError.call(this, error);
          }
        };
        var Expressions = function() {
          var ob2 = {};
          ob2.initExpressions = initExpressions;
          function initExpressions(animation) {
            var stackCount = 0;
            var registers = [];
            function pushExpression() {
              stackCount += 1;
            }
            function popExpression() {
              stackCount -= 1;
              if (stackCount === 0) {
                releaseInstances();
              }
            }
            function registerExpressionProperty(expression) {
              if (registers.indexOf(expression) === -1) {
                registers.push(expression);
              }
            }
            function releaseInstances() {
              var i;
              var len = registers.length;
              for (i = 0; i < len; i += 1) {
                registers[i].release();
              }
              registers.length = 0;
            }
            animation.renderer.compInterface = CompExpressionInterface(animation.renderer);
            animation.renderer.globalData.projectInterface.registerComposition(animation.renderer);
            animation.renderer.globalData.pushExpression = pushExpression;
            animation.renderer.globalData.popExpression = popExpression;
            animation.renderer.globalData.registerExpressionProperty = registerExpressionProperty;
          }
          return ob2;
        }();
        expressionsPlugin = Expressions;
        var ExpressionManager = function() {
          "use strict";
          var ob = {};
          var Math = BMMath;
          var window = null;
          var document = null;
          var XMLHttpRequest = null;
          var fetch = null;
          var frames = null;
          function $bm_isInstanceOfArray(arr) {
            return arr.constructor === Array || arr.constructor === Float32Array;
          }
          function isNumerable(tOfV, v) {
            return tOfV === "number" || tOfV === "boolean" || tOfV === "string" || v instanceof Number;
          }
          function $bm_neg(a) {
            var tOfA = typeof a;
            if (tOfA === "number" || tOfA === "boolean" || a instanceof Number) {
              return -a;
            }
            if ($bm_isInstanceOfArray(a)) {
              var i;
              var lenA = a.length;
              var retArr = [];
              for (i = 0; i < lenA; i += 1) {
                retArr[i] = -a[i];
              }
              return retArr;
            }
            if (a.propType) {
              return a.v;
            }
            return -a;
          }
          var easeInBez = BezierFactory.getBezierEasing(0.333, 0, 0.833, 0.833, "easeIn").get;
          var easeOutBez = BezierFactory.getBezierEasing(0.167, 0.167, 0.667, 1, "easeOut").get;
          var easeInOutBez = BezierFactory.getBezierEasing(0.33, 0, 0.667, 1, "easeInOut").get;
          function sum(a, b) {
            var tOfA = typeof a;
            var tOfB = typeof b;
            if (tOfA === "string" || tOfB === "string") {
              return a + b;
            }
            if (isNumerable(tOfA, a) && isNumerable(tOfB, b)) {
              return a + b;
            }
            if ($bm_isInstanceOfArray(a) && isNumerable(tOfB, b)) {
              a = a.slice(0);
              a[0] += b;
              return a;
            }
            if (isNumerable(tOfA, a) && $bm_isInstanceOfArray(b)) {
              b = b.slice(0);
              b[0] = a + b[0];
              return b;
            }
            if ($bm_isInstanceOfArray(a) && $bm_isInstanceOfArray(b)) {
              var i = 0;
              var lenA = a.length;
              var lenB = b.length;
              var retArr = [];
              while (i < lenA || i < lenB) {
                if ((typeof a[i] === "number" || a[i] instanceof Number) && (typeof b[i] === "number" || b[i] instanceof Number)) {
                  retArr[i] = a[i] + b[i];
                } else {
                  retArr[i] = b[i] === void 0 ? a[i] : a[i] || b[i];
                }
                i += 1;
              }
              return retArr;
            }
            return 0;
          }
          var add = sum;
          function sub(a, b) {
            var tOfA = typeof a;
            var tOfB = typeof b;
            if (isNumerable(tOfA, a) && isNumerable(tOfB, b)) {
              if (tOfA === "string") {
                a = parseInt(a, 10);
              }
              if (tOfB === "string") {
                b = parseInt(b, 10);
              }
              return a - b;
            }
            if ($bm_isInstanceOfArray(a) && isNumerable(tOfB, b)) {
              a = a.slice(0);
              a[0] -= b;
              return a;
            }
            if (isNumerable(tOfA, a) && $bm_isInstanceOfArray(b)) {
              b = b.slice(0);
              b[0] = a - b[0];
              return b;
            }
            if ($bm_isInstanceOfArray(a) && $bm_isInstanceOfArray(b)) {
              var i = 0;
              var lenA = a.length;
              var lenB = b.length;
              var retArr = [];
              while (i < lenA || i < lenB) {
                if ((typeof a[i] === "number" || a[i] instanceof Number) && (typeof b[i] === "number" || b[i] instanceof Number)) {
                  retArr[i] = a[i] - b[i];
                } else {
                  retArr[i] = b[i] === void 0 ? a[i] : a[i] || b[i];
                }
                i += 1;
              }
              return retArr;
            }
            return 0;
          }
          function mul(a, b) {
            var tOfA = typeof a;
            var tOfB = typeof b;
            var arr;
            if (isNumerable(tOfA, a) && isNumerable(tOfB, b)) {
              return a * b;
            }
            var i;
            var len;
            if ($bm_isInstanceOfArray(a) && isNumerable(tOfB, b)) {
              len = a.length;
              arr = createTypedArray("float32", len);
              for (i = 0; i < len; i += 1) {
                arr[i] = a[i] * b;
              }
              return arr;
            }
            if (isNumerable(tOfA, a) && $bm_isInstanceOfArray(b)) {
              len = b.length;
              arr = createTypedArray("float32", len);
              for (i = 0; i < len; i += 1) {
                arr[i] = a * b[i];
              }
              return arr;
            }
            return 0;
          }
          function div(a, b) {
            var tOfA = typeof a;
            var tOfB = typeof b;
            var arr;
            if (isNumerable(tOfA, a) && isNumerable(tOfB, b)) {
              return a / b;
            }
            var i;
            var len;
            if ($bm_isInstanceOfArray(a) && isNumerable(tOfB, b)) {
              len = a.length;
              arr = createTypedArray("float32", len);
              for (i = 0; i < len; i += 1) {
                arr[i] = a[i] / b;
              }
              return arr;
            }
            if (isNumerable(tOfA, a) && $bm_isInstanceOfArray(b)) {
              len = b.length;
              arr = createTypedArray("float32", len);
              for (i = 0; i < len; i += 1) {
                arr[i] = a / b[i];
              }
              return arr;
            }
            return 0;
          }
          function mod(a, b) {
            if (typeof a === "string") {
              a = parseInt(a, 10);
            }
            if (typeof b === "string") {
              b = parseInt(b, 10);
            }
            return a % b;
          }
          var $bm_sum = sum;
          var $bm_sub = sub;
          var $bm_mul = mul;
          var $bm_div = div;
          var $bm_mod = mod;
          function clamp(num, min, max) {
            if (min > max) {
              var mm = max;
              max = min;
              min = mm;
            }
            return Math.min(Math.max(num, min), max);
          }
          function radiansToDegrees(val2) {
            return val2 / degToRads;
          }
          var radians_to_degrees = radiansToDegrees;
          function degreesToRadians(val2) {
            return val2 * degToRads;
          }
          var degrees_to_radians = radiansToDegrees;
          var helperLengthArray = [0, 0, 0, 0, 0, 0];
          function length(arr1, arr2) {
            if (typeof arr1 === "number" || arr1 instanceof Number) {
              arr2 = arr2 || 0;
              return Math.abs(arr1 - arr2);
            }
            if (!arr2) {
              arr2 = helperLengthArray;
            }
            var i;
            var len = Math.min(arr1.length, arr2.length);
            var addedLength = 0;
            for (i = 0; i < len; i += 1) {
              addedLength += Math.pow(arr2[i] - arr1[i], 2);
            }
            return Math.sqrt(addedLength);
          }
          function normalize(vec) {
            return div(vec, length(vec));
          }
          function rgbToHsl(val2) {
            var r = val2[0];
            var g = val2[1];
            var b = val2[2];
            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
            var h;
            var s;
            var l = (max + min) / 2;
            if (max === min) {
              h = 0;
              s = 0;
            } else {
              var d = max - min;
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
              switch (max) {
                case r:
                  h = (g - b) / d + (g < b ? 6 : 0);
                  break;
                case g:
                  h = (b - r) / d + 2;
                  break;
                case b:
                  h = (r - g) / d + 4;
                  break;
                default:
                  break;
              }
              h /= 6;
            }
            return [h, s, l, val2[3]];
          }
          function hue2rgb(p, q, t) {
            if (t < 0)
              t += 1;
            if (t > 1)
              t -= 1;
            if (t < 1 / 6)
              return p + (q - p) * 6 * t;
            if (t < 1 / 2)
              return q;
            if (t < 2 / 3)
              return p + (q - p) * (2 / 3 - t) * 6;
            return p;
          }
          function hslToRgb(val2) {
            var h = val2[0];
            var s = val2[1];
            var l = val2[2];
            var r;
            var g;
            var b;
            if (s === 0) {
              r = l;
              b = l;
              g = l;
            } else {
              var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
              var p = 2 * l - q;
              r = hue2rgb(p, q, h + 1 / 3);
              g = hue2rgb(p, q, h);
              b = hue2rgb(p, q, h - 1 / 3);
            }
            return [r, g, b, val2[3]];
          }
          function linear(t, tMin, tMax, value1, value2) {
            if (value1 === void 0 || value2 === void 0) {
              value1 = tMin;
              value2 = tMax;
              tMin = 0;
              tMax = 1;
            }
            if (tMax < tMin) {
              var _tMin = tMax;
              tMax = tMin;
              tMin = _tMin;
            }
            if (t <= tMin) {
              return value1;
            }
            if (t >= tMax) {
              return value2;
            }
            var perc = tMax === tMin ? 0 : (t - tMin) / (tMax - tMin);
            if (!value1.length) {
              return value1 + (value2 - value1) * perc;
            }
            var i;
            var len = value1.length;
            var arr = createTypedArray("float32", len);
            for (i = 0; i < len; i += 1) {
              arr[i] = value1[i] + (value2[i] - value1[i]) * perc;
            }
            return arr;
          }
          function random(min, max) {
            if (max === void 0) {
              if (min === void 0) {
                min = 0;
                max = 1;
              } else {
                max = min;
                min = void 0;
              }
            }
            if (max.length) {
              var i;
              var len = max.length;
              if (!min) {
                min = createTypedArray("float32", len);
              }
              var arr = createTypedArray("float32", len);
              var rnd = BMMath.random();
              for (i = 0; i < len; i += 1) {
                arr[i] = min[i] + rnd * (max[i] - min[i]);
              }
              return arr;
            }
            if (min === void 0) {
              min = 0;
            }
            var rndm = BMMath.random();
            return min + rndm * (max - min);
          }
          function createPath(points, inTangents, outTangents, closed) {
            var i;
            var len = points.length;
            var path = shapePool.newElement();
            path.setPathData(!!closed, len);
            var arrPlaceholder = [0, 0];
            var inVertexPoint;
            var outVertexPoint;
            for (i = 0; i < len; i += 1) {
              inVertexPoint = inTangents && inTangents[i] ? inTangents[i] : arrPlaceholder;
              outVertexPoint = outTangents && outTangents[i] ? outTangents[i] : arrPlaceholder;
              path.setTripleAt(points[i][0], points[i][1], outVertexPoint[0] + points[i][0], outVertexPoint[1] + points[i][1], inVertexPoint[0] + points[i][0], inVertexPoint[1] + points[i][1], i, true);
            }
            return path;
          }
          function initiateExpression(elem, data, property) {
            var val = data.x;
            var needsVelocity = /velocity(?![\w\d])/.test(val);
            var _needsRandom = val.indexOf("random") !== -1;
            var elemType = elem.data.ty;
            var transform;
            var $bm_transform;
            var content;
            var effect;
            var thisProperty = property;
            thisProperty.valueAtTime = thisProperty.getValueAtTime;
            Object.defineProperty(thisProperty, "value", {
              get: function() {
                return thisProperty.v;
              }
            });
            elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate;
            elem.comp.displayStartTime = 0;
            var inPoint = elem.data.ip / elem.comp.globalData.frameRate;
            var outPoint = elem.data.op / elem.comp.globalData.frameRate;
            var width = elem.data.sw ? elem.data.sw : 0;
            var height = elem.data.sh ? elem.data.sh : 0;
            var name = elem.data.nm;
            var loopIn;
            var loop_in;
            var loopOut;
            var loop_out;
            var smooth;
            var toWorld;
            var fromWorld;
            var fromComp;
            var toComp;
            var fromCompToSurface;
            var position;
            var rotation;
            var anchorPoint;
            var scale;
            var thisLayer;
            var thisComp;
            var mask;
            var valueAtTime;
            var velocityAtTime;
            var scoped_bm_rt;
            var expression_function = eval("[function _expression_function(){" + val + ";scoped_bm_rt=$bm_rt}]")[0];
            var numKeys = property.kf ? data.k.length : 0;
            var active = !this.data || this.data.hd !== true;
            var wiggle = function wiggle2(freq, amp) {
              var iWiggle;
              var j;
              var lenWiggle = this.pv.length ? this.pv.length : 1;
              var addedAmps = createTypedArray("float32", lenWiggle);
              freq = 5;
              var iterations = Math.floor(time * freq);
              iWiggle = 0;
              j = 0;
              while (iWiggle < iterations) {
                for (j = 0; j < lenWiggle; j += 1) {
                  addedAmps[j] += -amp + amp * 2 * BMMath.random();
                }
                iWiggle += 1;
              }
              var periods = time * freq;
              var perc = periods - Math.floor(periods);
              var arr = createTypedArray("float32", lenWiggle);
              if (lenWiggle > 1) {
                for (j = 0; j < lenWiggle; j += 1) {
                  arr[j] = this.pv[j] + addedAmps[j] + (-amp + amp * 2 * BMMath.random()) * perc;
                }
                return arr;
              }
              return this.pv + addedAmps[0] + (-amp + amp * 2 * BMMath.random()) * perc;
            }.bind(this);
            if (thisProperty.loopIn) {
              loopIn = thisProperty.loopIn.bind(thisProperty);
              loop_in = loopIn;
            }
            if (thisProperty.loopOut) {
              loopOut = thisProperty.loopOut.bind(thisProperty);
              loop_out = loopOut;
            }
            if (thisProperty.smooth) {
              smooth = thisProperty.smooth.bind(thisProperty);
            }
            function loopInDuration(type, duration) {
              return loopIn(type, duration, true);
            }
            function loopOutDuration(type, duration) {
              return loopOut(type, duration, true);
            }
            if (this.getValueAtTime) {
              valueAtTime = this.getValueAtTime.bind(this);
            }
            if (this.getVelocityAtTime) {
              velocityAtTime = this.getVelocityAtTime.bind(this);
            }
            var comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface);
            function lookAt(elem1, elem2) {
              var fVec = [elem2[0] - elem1[0], elem2[1] - elem1[1], elem2[2] - elem1[2]];
              var pitch = Math.atan2(fVec[0], Math.sqrt(fVec[1] * fVec[1] + fVec[2] * fVec[2])) / degToRads;
              var yaw = -Math.atan2(fVec[1], fVec[2]) / degToRads;
              return [yaw, pitch, 0];
            }
            function easeOut(t, tMin, tMax, val1, val2) {
              return applyEase(easeOutBez, t, tMin, tMax, val1, val2);
            }
            function easeIn(t, tMin, tMax, val1, val2) {
              return applyEase(easeInBez, t, tMin, tMax, val1, val2);
            }
            function ease(t, tMin, tMax, val1, val2) {
              return applyEase(easeInOutBez, t, tMin, tMax, val1, val2);
            }
            function applyEase(fn, t, tMin, tMax, val1, val2) {
              if (val1 === void 0) {
                val1 = tMin;
                val2 = tMax;
              } else {
                t = (t - tMin) / (tMax - tMin);
              }
              if (t > 1) {
                t = 1;
              } else if (t < 0) {
                t = 0;
              }
              var mult = fn(t);
              if ($bm_isInstanceOfArray(val1)) {
                var iKey;
                var lenKey = val1.length;
                var arr = createTypedArray("float32", lenKey);
                for (iKey = 0; iKey < lenKey; iKey += 1) {
                  arr[iKey] = (val2[iKey] - val1[iKey]) * mult + val1[iKey];
                }
                return arr;
              }
              return (val2 - val1) * mult + val1;
            }
            function nearestKey(time2) {
              var iKey;
              var lenKey = data.k.length;
              var index2;
              var keyTime;
              if (!data.k.length || typeof data.k[0] === "number") {
                index2 = 0;
                keyTime = 0;
              } else {
                index2 = -1;
                time2 *= elem.comp.globalData.frameRate;
                if (time2 < data.k[0].t) {
                  index2 = 1;
                  keyTime = data.k[0].t;
                } else {
                  for (iKey = 0; iKey < lenKey - 1; iKey += 1) {
                    if (time2 === data.k[iKey].t) {
                      index2 = iKey + 1;
                      keyTime = data.k[iKey].t;
                      break;
                    } else if (time2 > data.k[iKey].t && time2 < data.k[iKey + 1].t) {
                      if (time2 - data.k[iKey].t > data.k[iKey + 1].t - time2) {
                        index2 = iKey + 2;
                        keyTime = data.k[iKey + 1].t;
                      } else {
                        index2 = iKey + 1;
                        keyTime = data.k[iKey].t;
                      }
                      break;
                    }
                  }
                  if (index2 === -1) {
                    index2 = iKey + 1;
                    keyTime = data.k[iKey].t;
                  }
                }
              }
              var obKey = {};
              obKey.index = index2;
              obKey.time = keyTime / elem.comp.globalData.frameRate;
              return obKey;
            }
            function key(ind) {
              var obKey;
              var iKey;
              var lenKey;
              if (!data.k.length || typeof data.k[0] === "number") {
                throw new Error("The property has no keyframe at index " + ind);
              }
              ind -= 1;
              obKey = {
                time: data.k[ind].t / elem.comp.globalData.frameRate,
                value: []
              };
              var arr = Object.prototype.hasOwnProperty.call(data.k[ind], "s") ? data.k[ind].s : data.k[ind - 1].e;
              lenKey = arr.length;
              for (iKey = 0; iKey < lenKey; iKey += 1) {
                obKey[iKey] = arr[iKey];
                obKey.value[iKey] = arr[iKey];
              }
              return obKey;
            }
            function framesToTime(fr, fps) {
              if (!fps) {
                fps = elem.comp.globalData.frameRate;
              }
              return fr / fps;
            }
            function timeToFrames(t, fps) {
              if (!t && t !== 0) {
                t = time;
              }
              if (!fps) {
                fps = elem.comp.globalData.frameRate;
              }
              return t * fps;
            }
            function seedRandom(seed) {
              BMMath.seedrandom(randSeed + seed);
            }
            function sourceRectAtTime() {
              return elem.sourceRectAtTime();
            }
            function substring(init, end) {
              if (typeof value === "string") {
                if (end === void 0) {
                  return value.substring(init);
                }
                return value.substring(init, end);
              }
              return "";
            }
            function substr(init, end) {
              if (typeof value === "string") {
                if (end === void 0) {
                  return value.substr(init);
                }
                return value.substr(init, end);
              }
              return "";
            }
            function posterizeTime(framesPerSecond) {
              time = framesPerSecond === 0 ? 0 : Math.floor(time * framesPerSecond) / framesPerSecond;
              value = valueAtTime(time);
            }
            var time;
            var velocity;
            var value;
            var text;
            var textIndex;
            var textTotal;
            var selectorValue;
            var index = elem.data.ind;
            var hasParent = !!(elem.hierarchy && elem.hierarchy.length);
            var parent;
            var randSeed = Math.floor(Math.random() * 1e6);
            var globalData = elem.globalData;
            function executeExpression(_value) {
              value = _value;
              if (this.frameExpressionId === elem.globalData.frameId && this.propType !== "textSelector") {
                return value;
              }
              if (this.propType === "textSelector") {
                textIndex = this.textIndex;
                textTotal = this.textTotal;
                selectorValue = this.selectorValue;
              }
              if (!thisLayer) {
                text = elem.layerInterface.text;
                thisLayer = elem.layerInterface;
                thisComp = elem.comp.compInterface;
                toWorld = thisLayer.toWorld.bind(thisLayer);
                fromWorld = thisLayer.fromWorld.bind(thisLayer);
                fromComp = thisLayer.fromComp.bind(thisLayer);
                toComp = thisLayer.toComp.bind(thisLayer);
                mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null;
                fromCompToSurface = fromComp;
              }
              if (!transform) {
                transform = elem.layerInterface("ADBE Transform Group");
                $bm_transform = transform;
                if (transform) {
                  anchorPoint = transform.anchorPoint;
                }
              }
              if (elemType === 4 && !content) {
                content = thisLayer("ADBE Root Vectors Group");
              }
              if (!effect) {
                effect = thisLayer(4);
              }
              hasParent = !!(elem.hierarchy && elem.hierarchy.length);
              if (hasParent && !parent) {
                parent = elem.hierarchy[0].layerInterface;
              }
              time = this.comp.renderedFrame / this.comp.globalData.frameRate;
              if (_needsRandom) {
                seedRandom(randSeed + time);
              }
              if (needsVelocity) {
                velocity = velocityAtTime(time);
              }
              expression_function();
              this.frameExpressionId = elem.globalData.frameId;
              if (scoped_bm_rt.propType === "shape") {
                scoped_bm_rt = scoped_bm_rt.v;
              }
              return scoped_bm_rt;
            }
            return executeExpression;
          }
          ob.initiateExpression = initiateExpression;
          return ob;
        }();
        var expressionHelpers = function() {
          function searchExpressions(elem2, data2, prop) {
            if (data2.x) {
              prop.k = true;
              prop.x = true;
              prop.initiateExpression = ExpressionManager.initiateExpression;
              prop.effectsSequence.push(prop.initiateExpression(elem2, data2, prop).bind(prop));
            }
          }
          function getValueAtTime(frameNum) {
            frameNum *= this.elem.globalData.frameRate;
            frameNum -= this.offsetTime;
            if (frameNum !== this._cachingAtTime.lastFrame) {
              this._cachingAtTime.lastIndex = this._cachingAtTime.lastFrame < frameNum ? this._cachingAtTime.lastIndex : 0;
              this._cachingAtTime.value = this.interpolateValue(frameNum, this._cachingAtTime);
              this._cachingAtTime.lastFrame = frameNum;
            }
            return this._cachingAtTime.value;
          }
          function getSpeedAtTime(frameNum) {
            var delta = -0.01;
            var v1 = this.getValueAtTime(frameNum);
            var v2 = this.getValueAtTime(frameNum + delta);
            var speed = 0;
            if (v1.length) {
              var i;
              for (i = 0; i < v1.length; i += 1) {
                speed += Math.pow(v2[i] - v1[i], 2);
              }
              speed = Math.sqrt(speed) * 100;
            } else {
              speed = 0;
            }
            return speed;
          }
          function getVelocityAtTime(frameNum) {
            if (this.vel !== void 0) {
              return this.vel;
            }
            var delta = -1e-3;
            var v1 = this.getValueAtTime(frameNum);
            var v2 = this.getValueAtTime(frameNum + delta);
            var velocity2;
            if (v1.length) {
              velocity2 = createTypedArray("float32", v1.length);
              var i;
              for (i = 0; i < v1.length; i += 1) {
                velocity2[i] = (v2[i] - v1[i]) / delta;
              }
            } else {
              velocity2 = (v2 - v1) / delta;
            }
            return velocity2;
          }
          function getStaticValueAtTime() {
            return this.pv;
          }
          function setGroupProperty(propertyGroup) {
            this.propertyGroup = propertyGroup;
          }
          return {
            searchExpressions,
            getSpeedAtTime,
            getVelocityAtTime,
            getValueAtTime,
            getStaticValueAtTime,
            setGroupProperty
          };
        }();
        (function addPropertyDecorator() {
          function loopOut2(type, duration, durationFlag) {
            if (!this.k || !this.keyframes) {
              return this.pv;
            }
            type = type ? type.toLowerCase() : "";
            var currentFrame = this.comp.renderedFrame;
            var keyframes = this.keyframes;
            var lastKeyFrame = keyframes[keyframes.length - 1].t;
            if (currentFrame <= lastKeyFrame) {
              return this.pv;
            }
            var cycleDuration;
            var firstKeyFrame;
            if (!durationFlag) {
              if (!duration || duration > keyframes.length - 1) {
                duration = keyframes.length - 1;
              }
              firstKeyFrame = keyframes[keyframes.length - 1 - duration].t;
              cycleDuration = lastKeyFrame - firstKeyFrame;
            } else {
              if (!duration) {
                cycleDuration = Math.max(0, lastKeyFrame - this.elem.data.ip);
              } else {
                cycleDuration = Math.abs(lastKeyFrame - this.elem.comp.globalData.frameRate * duration);
              }
              firstKeyFrame = lastKeyFrame - cycleDuration;
            }
            var i;
            var len;
            var ret;
            if (type === "pingpong") {
              var iterations = Math.floor((currentFrame - firstKeyFrame) / cycleDuration);
              if (iterations % 2 !== 0) {
                return this.getValueAtTime((cycleDuration - (currentFrame - firstKeyFrame) % cycleDuration + firstKeyFrame) / this.comp.globalData.frameRate, 0);
              }
            } else if (type === "offset") {
              var initV = this.getValueAtTime(firstKeyFrame / this.comp.globalData.frameRate, 0);
              var endV = this.getValueAtTime(lastKeyFrame / this.comp.globalData.frameRate, 0);
              var current = this.getValueAtTime(((currentFrame - firstKeyFrame) % cycleDuration + firstKeyFrame) / this.comp.globalData.frameRate, 0);
              var repeats = Math.floor((currentFrame - firstKeyFrame) / cycleDuration);
              if (this.pv.length) {
                ret = new Array(initV.length);
                len = ret.length;
                for (i = 0; i < len; i += 1) {
                  ret[i] = (endV[i] - initV[i]) * repeats + current[i];
                }
                return ret;
              }
              return (endV - initV) * repeats + current;
            } else if (type === "continue") {
              var lastValue = this.getValueAtTime(lastKeyFrame / this.comp.globalData.frameRate, 0);
              var nextLastValue = this.getValueAtTime((lastKeyFrame - 1e-3) / this.comp.globalData.frameRate, 0);
              if (this.pv.length) {
                ret = new Array(lastValue.length);
                len = ret.length;
                for (i = 0; i < len; i += 1) {
                  ret[i] = lastValue[i] + (lastValue[i] - nextLastValue[i]) * ((currentFrame - lastKeyFrame) / this.comp.globalData.frameRate) / 5e-4;
                }
                return ret;
              }
              return lastValue + (lastValue - nextLastValue) * ((currentFrame - lastKeyFrame) / 1e-3);
            }
            return this.getValueAtTime(((currentFrame - firstKeyFrame) % cycleDuration + firstKeyFrame) / this.comp.globalData.frameRate, 0);
          }
          function loopIn2(type, duration, durationFlag) {
            if (!this.k) {
              return this.pv;
            }
            type = type ? type.toLowerCase() : "";
            var currentFrame = this.comp.renderedFrame;
            var keyframes = this.keyframes;
            var firstKeyFrame = keyframes[0].t;
            if (currentFrame >= firstKeyFrame) {
              return this.pv;
            }
            var cycleDuration;
            var lastKeyFrame;
            if (!durationFlag) {
              if (!duration || duration > keyframes.length - 1) {
                duration = keyframes.length - 1;
              }
              lastKeyFrame = keyframes[duration].t;
              cycleDuration = lastKeyFrame - firstKeyFrame;
            } else {
              if (!duration) {
                cycleDuration = Math.max(0, this.elem.data.op - firstKeyFrame);
              } else {
                cycleDuration = Math.abs(this.elem.comp.globalData.frameRate * duration);
              }
              lastKeyFrame = firstKeyFrame + cycleDuration;
            }
            var i;
            var len;
            var ret;
            if (type === "pingpong") {
              var iterations = Math.floor((firstKeyFrame - currentFrame) / cycleDuration);
              if (iterations % 2 === 0) {
                return this.getValueAtTime(((firstKeyFrame - currentFrame) % cycleDuration + firstKeyFrame) / this.comp.globalData.frameRate, 0);
              }
            } else if (type === "offset") {
              var initV = this.getValueAtTime(firstKeyFrame / this.comp.globalData.frameRate, 0);
              var endV = this.getValueAtTime(lastKeyFrame / this.comp.globalData.frameRate, 0);
              var current = this.getValueAtTime((cycleDuration - (firstKeyFrame - currentFrame) % cycleDuration + firstKeyFrame) / this.comp.globalData.frameRate, 0);
              var repeats = Math.floor((firstKeyFrame - currentFrame) / cycleDuration) + 1;
              if (this.pv.length) {
                ret = new Array(initV.length);
                len = ret.length;
                for (i = 0; i < len; i += 1) {
                  ret[i] = current[i] - (endV[i] - initV[i]) * repeats;
                }
                return ret;
              }
              return current - (endV - initV) * repeats;
            } else if (type === "continue") {
              var firstValue = this.getValueAtTime(firstKeyFrame / this.comp.globalData.frameRate, 0);
              var nextFirstValue = this.getValueAtTime((firstKeyFrame + 1e-3) / this.comp.globalData.frameRate, 0);
              if (this.pv.length) {
                ret = new Array(firstValue.length);
                len = ret.length;
                for (i = 0; i < len; i += 1) {
                  ret[i] = firstValue[i] + (firstValue[i] - nextFirstValue[i]) * (firstKeyFrame - currentFrame) / 1e-3;
                }
                return ret;
              }
              return firstValue + (firstValue - nextFirstValue) * (firstKeyFrame - currentFrame) / 1e-3;
            }
            return this.getValueAtTime((cycleDuration - ((firstKeyFrame - currentFrame) % cycleDuration + firstKeyFrame)) / this.comp.globalData.frameRate, 0);
          }
          function smooth2(width2, samples) {
            if (!this.k) {
              return this.pv;
            }
            width2 = (width2 || 0.4) * 0.5;
            samples = Math.floor(samples || 5);
            if (samples <= 1) {
              return this.pv;
            }
            var currentTime = this.comp.renderedFrame / this.comp.globalData.frameRate;
            var initFrame = currentTime - width2;
            var endFrame = currentTime + width2;
            var sampleFrequency = samples > 1 ? (endFrame - initFrame) / (samples - 1) : 1;
            var i = 0;
            var j = 0;
            var value2;
            if (this.pv.length) {
              value2 = createTypedArray("float32", this.pv.length);
            } else {
              value2 = 0;
            }
            var sampleValue;
            while (i < samples) {
              sampleValue = this.getValueAtTime(initFrame + i * sampleFrequency);
              if (this.pv.length) {
                for (j = 0; j < this.pv.length; j += 1) {
                  value2[j] += sampleValue[j];
                }
              } else {
                value2 += sampleValue;
              }
              i += 1;
            }
            if (this.pv.length) {
              for (j = 0; j < this.pv.length; j += 1) {
                value2[j] /= samples;
              }
            } else {
              value2 /= samples;
            }
            return value2;
          }
          function getTransformValueAtTime(time2) {
            if (!this._transformCachingAtTime) {
              this._transformCachingAtTime = {
                v: new Matrix()
              };
            }
            var matrix = this._transformCachingAtTime.v;
            matrix.cloneFromProps(this.pre.props);
            if (this.appliedTransformations < 1) {
              var anchor = this.a.getValueAtTime(time2);
              matrix.translate(
                -anchor[0] * this.a.mult,
                -anchor[1] * this.a.mult,
                anchor[2] * this.a.mult
              );
            }
            if (this.appliedTransformations < 2) {
              var scale2 = this.s.getValueAtTime(time2);
              matrix.scale(
                scale2[0] * this.s.mult,
                scale2[1] * this.s.mult,
                scale2[2] * this.s.mult
              );
            }
            if (this.sk && this.appliedTransformations < 3) {
              var skew = this.sk.getValueAtTime(time2);
              var skewAxis = this.sa.getValueAtTime(time2);
              matrix.skewFromAxis(-skew * this.sk.mult, skewAxis * this.sa.mult);
            }
            if (this.r && this.appliedTransformations < 4) {
              var rotation2 = this.r.getValueAtTime(time2);
              matrix.rotate(-rotation2 * this.r.mult);
            } else if (!this.r && this.appliedTransformations < 4) {
              var rotationZ = this.rz.getValueAtTime(time2);
              var rotationY = this.ry.getValueAtTime(time2);
              var rotationX = this.rx.getValueAtTime(time2);
              var orientation = this.or.getValueAtTime(time2);
              matrix.rotateZ(-rotationZ * this.rz.mult).rotateY(rotationY * this.ry.mult).rotateX(rotationX * this.rx.mult).rotateZ(-orientation[2] * this.or.mult).rotateY(orientation[1] * this.or.mult).rotateX(orientation[0] * this.or.mult);
            }
            if (this.data.p && this.data.p.s) {
              var positionX = this.px.getValueAtTime(time2);
              var positionY = this.py.getValueAtTime(time2);
              if (this.data.p.z) {
                var positionZ = this.pz.getValueAtTime(time2);
                matrix.translate(
                  positionX * this.px.mult,
                  positionY * this.py.mult,
                  -positionZ * this.pz.mult
                );
              } else {
                matrix.translate(positionX * this.px.mult, positionY * this.py.mult, 0);
              }
            } else {
              var position2 = this.p.getValueAtTime(time2);
              matrix.translate(
                position2[0] * this.p.mult,
                position2[1] * this.p.mult,
                -position2[2] * this.p.mult
              );
            }
            return matrix;
          }
          function getTransformStaticValueAtTime() {
            return this.v.clone(new Matrix());
          }
          var getTransformProperty = TransformPropertyFactory.getTransformProperty;
          TransformPropertyFactory.getTransformProperty = function(elem2, data2, container) {
            var prop = getTransformProperty(elem2, data2, container);
            if (prop.dynamicProperties.length) {
              prop.getValueAtTime = getTransformValueAtTime.bind(prop);
            } else {
              prop.getValueAtTime = getTransformStaticValueAtTime.bind(prop);
            }
            prop.setGroupProperty = expressionHelpers.setGroupProperty;
            return prop;
          };
          var propertyGetProp = PropertyFactory.getProp;
          PropertyFactory.getProp = function(elem2, data2, type, mult, container) {
            var prop = propertyGetProp(elem2, data2, type, mult, container);
            if (prop.kf) {
              prop.getValueAtTime = expressionHelpers.getValueAtTime.bind(prop);
            } else {
              prop.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(prop);
            }
            prop.setGroupProperty = expressionHelpers.setGroupProperty;
            prop.loopOut = loopOut2;
            prop.loopIn = loopIn2;
            prop.smooth = smooth2;
            prop.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(prop);
            prop.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(prop);
            prop.numKeys = data2.a === 1 ? data2.k.length : 0;
            prop.propertyIndex = data2.ix;
            var value2 = 0;
            if (type !== 0) {
              value2 = createTypedArray("float32", data2.a === 1 ? data2.k[0].s.length : data2.k.length);
            }
            prop._cachingAtTime = {
              lastFrame: initialDefaultFrame,
              lastIndex: 0,
              value: value2
            };
            expressionHelpers.searchExpressions(elem2, data2, prop);
            if (prop.k) {
              container.addDynamicProperty(prop);
            }
            return prop;
          };
          function getShapeValueAtTime(frameNum) {
            if (!this._cachingAtTime) {
              this._cachingAtTime = {
                shapeValue: shapePool.clone(this.pv),
                lastIndex: 0,
                lastTime: initialDefaultFrame
              };
            }
            frameNum *= this.elem.globalData.frameRate;
            frameNum -= this.offsetTime;
            if (frameNum !== this._cachingAtTime.lastTime) {
              this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < frameNum ? this._caching.lastIndex : 0;
              this._cachingAtTime.lastTime = frameNum;
              this.interpolateShape(frameNum, this._cachingAtTime.shapeValue, this._cachingAtTime);
            }
            return this._cachingAtTime.shapeValue;
          }
          var ShapePropertyConstructorFunction = ShapePropertyFactory.getConstructorFunction();
          var KeyframedShapePropertyConstructorFunction = ShapePropertyFactory.getKeyframedConstructorFunction();
          function ShapeExpressions() {
          }
          ShapeExpressions.prototype = {
            vertices: function(prop, time2) {
              if (this.k) {
                this.getValue();
              }
              var shapePath = this.v;
              if (time2 !== void 0) {
                shapePath = this.getValueAtTime(time2, 0);
              }
              var i;
              var len = shapePath._length;
              var vertices = shapePath[prop];
              var points = shapePath.v;
              var arr = createSizedArray(len);
              for (i = 0; i < len; i += 1) {
                if (prop === "i" || prop === "o") {
                  arr[i] = [vertices[i][0] - points[i][0], vertices[i][1] - points[i][1]];
                } else {
                  arr[i] = [vertices[i][0], vertices[i][1]];
                }
              }
              return arr;
            },
            points: function(time2) {
              return this.vertices("v", time2);
            },
            inTangents: function(time2) {
              return this.vertices("i", time2);
            },
            outTangents: function(time2) {
              return this.vertices("o", time2);
            },
            isClosed: function() {
              return this.v.c;
            },
            pointOnPath: function(perc, time2) {
              var shapePath = this.v;
              if (time2 !== void 0) {
                shapePath = this.getValueAtTime(time2, 0);
              }
              if (!this._segmentsLength) {
                this._segmentsLength = bez.getSegmentsLength(shapePath);
              }
              var segmentsLength = this._segmentsLength;
              var lengths = segmentsLength.lengths;
              var lengthPos = segmentsLength.totalLength * perc;
              var i = 0;
              var len = lengths.length;
              var accumulatedLength = 0;
              var pt;
              while (i < len) {
                if (accumulatedLength + lengths[i].addedLength > lengthPos) {
                  var initIndex = i;
                  var endIndex = shapePath.c && i === len - 1 ? 0 : i + 1;
                  var segmentPerc = (lengthPos - accumulatedLength) / lengths[i].addedLength;
                  pt = bez.getPointInSegment(shapePath.v[initIndex], shapePath.v[endIndex], shapePath.o[initIndex], shapePath.i[endIndex], segmentPerc, lengths[i]);
                  break;
                } else {
                  accumulatedLength += lengths[i].addedLength;
                }
                i += 1;
              }
              if (!pt) {
                pt = shapePath.c ? [shapePath.v[0][0], shapePath.v[0][1]] : [shapePath.v[shapePath._length - 1][0], shapePath.v[shapePath._length - 1][1]];
              }
              return pt;
            },
            vectorOnPath: function(perc, time2, vectorType) {
              if (perc == 1) {
                perc = this.v.c;
              } else if (perc == 0) {
                perc = 0.999;
              }
              var pt1 = this.pointOnPath(perc, time2);
              var pt2 = this.pointOnPath(perc + 1e-3, time2);
              var xLength = pt2[0] - pt1[0];
              var yLength = pt2[1] - pt1[1];
              var magnitude = Math.sqrt(Math.pow(xLength, 2) + Math.pow(yLength, 2));
              if (magnitude === 0) {
                return [0, 0];
              }
              var unitVector = vectorType === "tangent" ? [xLength / magnitude, yLength / magnitude] : [-yLength / magnitude, xLength / magnitude];
              return unitVector;
            },
            tangentOnPath: function(perc, time2) {
              return this.vectorOnPath(perc, time2, "tangent");
            },
            normalOnPath: function(perc, time2) {
              return this.vectorOnPath(perc, time2, "normal");
            },
            setGroupProperty: expressionHelpers.setGroupProperty,
            getValueAtTime: expressionHelpers.getStaticValueAtTime
          };
          extendPrototype([ShapeExpressions], ShapePropertyConstructorFunction);
          extendPrototype([ShapeExpressions], KeyframedShapePropertyConstructorFunction);
          KeyframedShapePropertyConstructorFunction.prototype.getValueAtTime = getShapeValueAtTime;
          KeyframedShapePropertyConstructorFunction.prototype.initiateExpression = ExpressionManager.initiateExpression;
          var propertyGetShapeProp = ShapePropertyFactory.getShapeProp;
          ShapePropertyFactory.getShapeProp = function(elem2, data2, type, arr, trims) {
            var prop = propertyGetShapeProp(elem2, data2, type, arr, trims);
            prop.propertyIndex = data2.ix;
            prop.lock = false;
            if (type === 3) {
              expressionHelpers.searchExpressions(elem2, data2.pt, prop);
            } else if (type === 4) {
              expressionHelpers.searchExpressions(elem2, data2.ks, prop);
            }
            if (prop.k) {
              elem2.addDynamicProperty(prop);
            }
            return prop;
          };
        })();
        (function addDecorator() {
          function searchExpressions() {
            if (this.data.d.x) {
              this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(this.elem, this.data.d, this);
              this.addEffect(this.getExpressionValue.bind(this));
              return true;
            }
            return null;
          }
          TextProperty.prototype.getExpressionValue = function(currentValue, text2) {
            var newValue = this.calculateExpression(text2);
            if (currentValue.t !== newValue) {
              var newData = {};
              this.copyData(newData, currentValue);
              newData.t = newValue.toString();
              newData.__complete = false;
              return newData;
            }
            return currentValue;
          };
          TextProperty.prototype.searchProperty = function() {
            var isKeyframed = this.searchKeyframes();
            var hasExpressions = this.searchExpressions();
            this.kf = isKeyframed || hasExpressions;
            return this.kf;
          };
          TextProperty.prototype.searchExpressions = searchExpressions;
        })();
        var ShapePathInterface = function() {
          return function pathInterfaceFactory(shape, view, propertyGroup) {
            var prop = view.sh;
            function interfaceFunction(val2) {
              if (val2 === "Shape" || val2 === "shape" || val2 === "Path" || val2 === "path" || val2 === "ADBE Vector Shape" || val2 === 2) {
                return interfaceFunction.path;
              }
              return null;
            }
            var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
            prop.setGroupProperty(PropertyInterface("Path", _propertyGroup));
            Object.defineProperties(interfaceFunction, {
              path: {
                get: function() {
                  if (prop.k) {
                    prop.getValue();
                  }
                  return prop;
                }
              },
              shape: {
                get: function() {
                  if (prop.k) {
                    prop.getValue();
                  }
                  return prop;
                }
              },
              _name: { value: shape.nm },
              ix: { value: shape.ix },
              propertyIndex: { value: shape.ix },
              mn: { value: shape.mn },
              propertyGroup: { value: propertyGroup }
            });
            return interfaceFunction;
          };
        }();
        var propertyGroupFactory = function() {
          return function(interfaceFunction, parentPropertyGroup) {
            return function(val2) {
              val2 = val2 === void 0 ? 1 : val2;
              if (val2 <= 0) {
                return interfaceFunction;
              }
              return parentPropertyGroup(val2 - 1);
            };
          };
        }();
        var PropertyInterface = function() {
          return function(propertyName, propertyGroup) {
            var interfaceFunction = {
              _name: propertyName
            };
            function _propertyGroup(val2) {
              val2 = val2 === void 0 ? 1 : val2;
              if (val2 <= 0) {
                return interfaceFunction;
              }
              return propertyGroup(val2 - 1);
            }
            return _propertyGroup;
          };
        }();
        var ShapeExpressionInterface = function() {
          function iterateElements(shapes, view, propertyGroup) {
            var arr = [];
            var i;
            var len = shapes ? shapes.length : 0;
            for (i = 0; i < len; i += 1) {
              if (shapes[i].ty === "gr") {
                arr.push(groupInterfaceFactory(shapes[i], view[i], propertyGroup));
              } else if (shapes[i].ty === "fl") {
                arr.push(fillInterfaceFactory(shapes[i], view[i], propertyGroup));
              } else if (shapes[i].ty === "st") {
                arr.push(strokeInterfaceFactory(shapes[i], view[i], propertyGroup));
              } else if (shapes[i].ty === "tm") {
                arr.push(trimInterfaceFactory(shapes[i], view[i], propertyGroup));
              } else if (shapes[i].ty === "tr") {
              } else if (shapes[i].ty === "el") {
                arr.push(ellipseInterfaceFactory(shapes[i], view[i], propertyGroup));
              } else if (shapes[i].ty === "sr") {
                arr.push(starInterfaceFactory(shapes[i], view[i], propertyGroup));
              } else if (shapes[i].ty === "sh") {
                arr.push(ShapePathInterface(shapes[i], view[i], propertyGroup));
              } else if (shapes[i].ty === "rc") {
                arr.push(rectInterfaceFactory(shapes[i], view[i], propertyGroup));
              } else if (shapes[i].ty === "rd") {
                arr.push(roundedInterfaceFactory(shapes[i], view[i], propertyGroup));
              } else if (shapes[i].ty === "rp") {
                arr.push(repeaterInterfaceFactory(shapes[i], view[i], propertyGroup));
              } else if (shapes[i].ty === "gf") {
                arr.push(gradientFillInterfaceFactory(shapes[i], view[i], propertyGroup));
              } else {
                arr.push(defaultInterfaceFactory(shapes[i], view[i], propertyGroup));
              }
            }
            return arr;
          }
          function contentsInterfaceFactory(shape, view, propertyGroup) {
            var interfaces;
            var interfaceFunction = function _interfaceFunction(value2) {
              var i = 0;
              var len = interfaces.length;
              while (i < len) {
                if (interfaces[i]._name === value2 || interfaces[i].mn === value2 || interfaces[i].propertyIndex === value2 || interfaces[i].ix === value2 || interfaces[i].ind === value2) {
                  return interfaces[i];
                }
                i += 1;
              }
              if (typeof value2 === "number") {
                return interfaces[value2 - 1];
              }
              return null;
            };
            interfaceFunction.propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
            interfaces = iterateElements(shape.it, view.it, interfaceFunction.propertyGroup);
            interfaceFunction.numProperties = interfaces.length;
            var transformInterface = transformInterfaceFactory(shape.it[shape.it.length - 1], view.it[view.it.length - 1], interfaceFunction.propertyGroup);
            interfaceFunction.transform = transformInterface;
            interfaceFunction.propertyIndex = shape.cix;
            interfaceFunction._name = shape.nm;
            return interfaceFunction;
          }
          function groupInterfaceFactory(shape, view, propertyGroup) {
            var interfaceFunction = function _interfaceFunction(value2) {
              switch (value2) {
                case "ADBE Vectors Group":
                case "Contents":
                case 2:
                  return interfaceFunction.content;
                default:
                  return interfaceFunction.transform;
              }
            };
            interfaceFunction.propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
            var content2 = contentsInterfaceFactory(shape, view, interfaceFunction.propertyGroup);
            var transformInterface = transformInterfaceFactory(shape.it[shape.it.length - 1], view.it[view.it.length - 1], interfaceFunction.propertyGroup);
            interfaceFunction.content = content2;
            interfaceFunction.transform = transformInterface;
            Object.defineProperty(interfaceFunction, "_name", {
              get: function() {
                return shape.nm;
              }
            });
            interfaceFunction.numProperties = shape.np;
            interfaceFunction.propertyIndex = shape.ix;
            interfaceFunction.nm = shape.nm;
            interfaceFunction.mn = shape.mn;
            return interfaceFunction;
          }
          function fillInterfaceFactory(shape, view, propertyGroup) {
            function interfaceFunction(val2) {
              if (val2 === "Color" || val2 === "color") {
                return interfaceFunction.color;
              }
              if (val2 === "Opacity" || val2 === "opacity") {
                return interfaceFunction.opacity;
              }
              return null;
            }
            Object.defineProperties(interfaceFunction, {
              color: {
                get: ExpressionPropertyInterface(view.c)
              },
              opacity: {
                get: ExpressionPropertyInterface(view.o)
              },
              _name: { value: shape.nm },
              mn: { value: shape.mn }
            });
            view.c.setGroupProperty(PropertyInterface("Color", propertyGroup));
            view.o.setGroupProperty(PropertyInterface("Opacity", propertyGroup));
            return interfaceFunction;
          }
          function gradientFillInterfaceFactory(shape, view, propertyGroup) {
            function interfaceFunction(val2) {
              if (val2 === "Start Point" || val2 === "start point") {
                return interfaceFunction.startPoint;
              }
              if (val2 === "End Point" || val2 === "end point") {
                return interfaceFunction.endPoint;
              }
              if (val2 === "Opacity" || val2 === "opacity") {
                return interfaceFunction.opacity;
              }
              return null;
            }
            Object.defineProperties(interfaceFunction, {
              startPoint: {
                get: ExpressionPropertyInterface(view.s)
              },
              endPoint: {
                get: ExpressionPropertyInterface(view.e)
              },
              opacity: {
                get: ExpressionPropertyInterface(view.o)
              },
              type: {
                get: function() {
                  return "a";
                }
              },
              _name: { value: shape.nm },
              mn: { value: shape.mn }
            });
            view.s.setGroupProperty(PropertyInterface("Start Point", propertyGroup));
            view.e.setGroupProperty(PropertyInterface("End Point", propertyGroup));
            view.o.setGroupProperty(PropertyInterface("Opacity", propertyGroup));
            return interfaceFunction;
          }
          function defaultInterfaceFactory() {
            function interfaceFunction() {
              return null;
            }
            return interfaceFunction;
          }
          function strokeInterfaceFactory(shape, view, propertyGroup) {
            var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
            var _dashPropertyGroup = propertyGroupFactory(dashOb, _propertyGroup);
            function addPropertyToDashOb(i2) {
              Object.defineProperty(dashOb, shape.d[i2].nm, {
                get: ExpressionPropertyInterface(view.d.dataProps[i2].p)
              });
            }
            var i;
            var len = shape.d ? shape.d.length : 0;
            var dashOb = {};
            for (i = 0; i < len; i += 1) {
              addPropertyToDashOb(i);
              view.d.dataProps[i].p.setGroupProperty(_dashPropertyGroup);
            }
            function interfaceFunction(val2) {
              if (val2 === "Color" || val2 === "color") {
                return interfaceFunction.color;
              }
              if (val2 === "Opacity" || val2 === "opacity") {
                return interfaceFunction.opacity;
              }
              if (val2 === "Stroke Width" || val2 === "stroke width") {
                return interfaceFunction.strokeWidth;
              }
              return null;
            }
            Object.defineProperties(interfaceFunction, {
              color: {
                get: ExpressionPropertyInterface(view.c)
              },
              opacity: {
                get: ExpressionPropertyInterface(view.o)
              },
              strokeWidth: {
                get: ExpressionPropertyInterface(view.w)
              },
              dash: {
                get: function() {
                  return dashOb;
                }
              },
              _name: { value: shape.nm },
              mn: { value: shape.mn }
            });
            view.c.setGroupProperty(PropertyInterface("Color", _propertyGroup));
            view.o.setGroupProperty(PropertyInterface("Opacity", _propertyGroup));
            view.w.setGroupProperty(PropertyInterface("Stroke Width", _propertyGroup));
            return interfaceFunction;
          }
          function trimInterfaceFactory(shape, view, propertyGroup) {
            function interfaceFunction(val2) {
              if (val2 === shape.e.ix || val2 === "End" || val2 === "end") {
                return interfaceFunction.end;
              }
              if (val2 === shape.s.ix) {
                return interfaceFunction.start;
              }
              if (val2 === shape.o.ix) {
                return interfaceFunction.offset;
              }
              return null;
            }
            var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
            interfaceFunction.propertyIndex = shape.ix;
            view.s.setGroupProperty(PropertyInterface("Start", _propertyGroup));
            view.e.setGroupProperty(PropertyInterface("End", _propertyGroup));
            view.o.setGroupProperty(PropertyInterface("Offset", _propertyGroup));
            interfaceFunction.propertyIndex = shape.ix;
            interfaceFunction.propertyGroup = propertyGroup;
            Object.defineProperties(interfaceFunction, {
              start: {
                get: ExpressionPropertyInterface(view.s)
              },
              end: {
                get: ExpressionPropertyInterface(view.e)
              },
              offset: {
                get: ExpressionPropertyInterface(view.o)
              },
              _name: { value: shape.nm }
            });
            interfaceFunction.mn = shape.mn;
            return interfaceFunction;
          }
          function transformInterfaceFactory(shape, view, propertyGroup) {
            function interfaceFunction(value2) {
              if (shape.a.ix === value2 || value2 === "Anchor Point") {
                return interfaceFunction.anchorPoint;
              }
              if (shape.o.ix === value2 || value2 === "Opacity") {
                return interfaceFunction.opacity;
              }
              if (shape.p.ix === value2 || value2 === "Position") {
                return interfaceFunction.position;
              }
              if (shape.r.ix === value2 || value2 === "Rotation" || value2 === "ADBE Vector Rotation") {
                return interfaceFunction.rotation;
              }
              if (shape.s.ix === value2 || value2 === "Scale") {
                return interfaceFunction.scale;
              }
              if (shape.sk && shape.sk.ix === value2 || value2 === "Skew") {
                return interfaceFunction.skew;
              }
              if (shape.sa && shape.sa.ix === value2 || value2 === "Skew Axis") {
                return interfaceFunction.skewAxis;
              }
              return null;
            }
            var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
            view.transform.mProps.o.setGroupProperty(PropertyInterface("Opacity", _propertyGroup));
            view.transform.mProps.p.setGroupProperty(PropertyInterface("Position", _propertyGroup));
            view.transform.mProps.a.setGroupProperty(PropertyInterface("Anchor Point", _propertyGroup));
            view.transform.mProps.s.setGroupProperty(PropertyInterface("Scale", _propertyGroup));
            view.transform.mProps.r.setGroupProperty(PropertyInterface("Rotation", _propertyGroup));
            if (view.transform.mProps.sk) {
              view.transform.mProps.sk.setGroupProperty(PropertyInterface("Skew", _propertyGroup));
              view.transform.mProps.sa.setGroupProperty(PropertyInterface("Skew Angle", _propertyGroup));
            }
            view.transform.op.setGroupProperty(PropertyInterface("Opacity", _propertyGroup));
            Object.defineProperties(interfaceFunction, {
              opacity: {
                get: ExpressionPropertyInterface(view.transform.mProps.o)
              },
              position: {
                get: ExpressionPropertyInterface(view.transform.mProps.p)
              },
              anchorPoint: {
                get: ExpressionPropertyInterface(view.transform.mProps.a)
              },
              scale: {
                get: ExpressionPropertyInterface(view.transform.mProps.s)
              },
              rotation: {
                get: ExpressionPropertyInterface(view.transform.mProps.r)
              },
              skew: {
                get: ExpressionPropertyInterface(view.transform.mProps.sk)
              },
              skewAxis: {
                get: ExpressionPropertyInterface(view.transform.mProps.sa)
              },
              _name: { value: shape.nm }
            });
            interfaceFunction.ty = "tr";
            interfaceFunction.mn = shape.mn;
            interfaceFunction.propertyGroup = propertyGroup;
            return interfaceFunction;
          }
          function ellipseInterfaceFactory(shape, view, propertyGroup) {
            function interfaceFunction(value2) {
              if (shape.p.ix === value2) {
                return interfaceFunction.position;
              }
              if (shape.s.ix === value2) {
                return interfaceFunction.size;
              }
              return null;
            }
            var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
            interfaceFunction.propertyIndex = shape.ix;
            var prop = view.sh.ty === "tm" ? view.sh.prop : view.sh;
            prop.s.setGroupProperty(PropertyInterface("Size", _propertyGroup));
            prop.p.setGroupProperty(PropertyInterface("Position", _propertyGroup));
            Object.defineProperties(interfaceFunction, {
              size: {
                get: ExpressionPropertyInterface(prop.s)
              },
              position: {
                get: ExpressionPropertyInterface(prop.p)
              },
              _name: { value: shape.nm }
            });
            interfaceFunction.mn = shape.mn;
            return interfaceFunction;
          }
          function starInterfaceFactory(shape, view, propertyGroup) {
            function interfaceFunction(value2) {
              if (shape.p.ix === value2) {
                return interfaceFunction.position;
              }
              if (shape.r.ix === value2) {
                return interfaceFunction.rotation;
              }
              if (shape.pt.ix === value2) {
                return interfaceFunction.points;
              }
              if (shape.or.ix === value2 || value2 === "ADBE Vector Star Outer Radius") {
                return interfaceFunction.outerRadius;
              }
              if (shape.os.ix === value2) {
                return interfaceFunction.outerRoundness;
              }
              if (shape.ir && (shape.ir.ix === value2 || value2 === "ADBE Vector Star Inner Radius")) {
                return interfaceFunction.innerRadius;
              }
              if (shape.is && shape.is.ix === value2) {
                return interfaceFunction.innerRoundness;
              }
              return null;
            }
            var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
            var prop = view.sh.ty === "tm" ? view.sh.prop : view.sh;
            interfaceFunction.propertyIndex = shape.ix;
            prop.or.setGroupProperty(PropertyInterface("Outer Radius", _propertyGroup));
            prop.os.setGroupProperty(PropertyInterface("Outer Roundness", _propertyGroup));
            prop.pt.setGroupProperty(PropertyInterface("Points", _propertyGroup));
            prop.p.setGroupProperty(PropertyInterface("Position", _propertyGroup));
            prop.r.setGroupProperty(PropertyInterface("Rotation", _propertyGroup));
            if (shape.ir) {
              prop.ir.setGroupProperty(PropertyInterface("Inner Radius", _propertyGroup));
              prop.is.setGroupProperty(PropertyInterface("Inner Roundness", _propertyGroup));
            }
            Object.defineProperties(interfaceFunction, {
              position: {
                get: ExpressionPropertyInterface(prop.p)
              },
              rotation: {
                get: ExpressionPropertyInterface(prop.r)
              },
              points: {
                get: ExpressionPropertyInterface(prop.pt)
              },
              outerRadius: {
                get: ExpressionPropertyInterface(prop.or)
              },
              outerRoundness: {
                get: ExpressionPropertyInterface(prop.os)
              },
              innerRadius: {
                get: ExpressionPropertyInterface(prop.ir)
              },
              innerRoundness: {
                get: ExpressionPropertyInterface(prop.is)
              },
              _name: { value: shape.nm }
            });
            interfaceFunction.mn = shape.mn;
            return interfaceFunction;
          }
          function rectInterfaceFactory(shape, view, propertyGroup) {
            function interfaceFunction(value2) {
              if (shape.p.ix === value2) {
                return interfaceFunction.position;
              }
              if (shape.r.ix === value2) {
                return interfaceFunction.roundness;
              }
              if (shape.s.ix === value2 || value2 === "Size" || value2 === "ADBE Vector Rect Size") {
                return interfaceFunction.size;
              }
              return null;
            }
            var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
            var prop = view.sh.ty === "tm" ? view.sh.prop : view.sh;
            interfaceFunction.propertyIndex = shape.ix;
            prop.p.setGroupProperty(PropertyInterface("Position", _propertyGroup));
            prop.s.setGroupProperty(PropertyInterface("Size", _propertyGroup));
            prop.r.setGroupProperty(PropertyInterface("Rotation", _propertyGroup));
            Object.defineProperties(interfaceFunction, {
              position: {
                get: ExpressionPropertyInterface(prop.p)
              },
              roundness: {
                get: ExpressionPropertyInterface(prop.r)
              },
              size: {
                get: ExpressionPropertyInterface(prop.s)
              },
              _name: { value: shape.nm }
            });
            interfaceFunction.mn = shape.mn;
            return interfaceFunction;
          }
          function roundedInterfaceFactory(shape, view, propertyGroup) {
            function interfaceFunction(value2) {
              if (shape.r.ix === value2 || value2 === "Round Corners 1") {
                return interfaceFunction.radius;
              }
              return null;
            }
            var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
            var prop = view;
            interfaceFunction.propertyIndex = shape.ix;
            prop.rd.setGroupProperty(PropertyInterface("Radius", _propertyGroup));
            Object.defineProperties(interfaceFunction, {
              radius: {
                get: ExpressionPropertyInterface(prop.rd)
              },
              _name: { value: shape.nm }
            });
            interfaceFunction.mn = shape.mn;
            return interfaceFunction;
          }
          function repeaterInterfaceFactory(shape, view, propertyGroup) {
            function interfaceFunction(value2) {
              if (shape.c.ix === value2 || value2 === "Copies") {
                return interfaceFunction.copies;
              }
              if (shape.o.ix === value2 || value2 === "Offset") {
                return interfaceFunction.offset;
              }
              return null;
            }
            var _propertyGroup = propertyGroupFactory(interfaceFunction, propertyGroup);
            var prop = view;
            interfaceFunction.propertyIndex = shape.ix;
            prop.c.setGroupProperty(PropertyInterface("Copies", _propertyGroup));
            prop.o.setGroupProperty(PropertyInterface("Offset", _propertyGroup));
            Object.defineProperties(interfaceFunction, {
              copies: {
                get: ExpressionPropertyInterface(prop.c)
              },
              offset: {
                get: ExpressionPropertyInterface(prop.o)
              },
              _name: { value: shape.nm }
            });
            interfaceFunction.mn = shape.mn;
            return interfaceFunction;
          }
          return function(shapes, view, propertyGroup) {
            var interfaces;
            function _interfaceFunction(value2) {
              if (typeof value2 === "number") {
                value2 = value2 === void 0 ? 1 : value2;
                if (value2 === 0) {
                  return propertyGroup;
                }
                return interfaces[value2 - 1];
              }
              var i = 0;
              var len = interfaces.length;
              while (i < len) {
                if (interfaces[i]._name === value2) {
                  return interfaces[i];
                }
                i += 1;
              }
              return null;
            }
            function parentGroupWrapper() {
              return propertyGroup;
            }
            _interfaceFunction.propertyGroup = propertyGroupFactory(_interfaceFunction, parentGroupWrapper);
            interfaces = iterateElements(shapes, view, _interfaceFunction.propertyGroup);
            _interfaceFunction.numProperties = interfaces.length;
            _interfaceFunction._name = "Contents";
            return _interfaceFunction;
          };
        }();
        var TextExpressionInterface = function() {
          return function(elem2) {
            var _prevValue;
            var _sourceText;
            function _thisLayerFunction(name2) {
              switch (name2) {
                case "ADBE Text Document":
                  return _thisLayerFunction.sourceText;
                default:
                  return null;
              }
            }
            Object.defineProperty(_thisLayerFunction, "sourceText", {
              get: function() {
                elem2.textProperty.getValue();
                var stringValue = elem2.textProperty.currentData.t;
                if (stringValue !== _prevValue) {
                  elem2.textProperty.currentData.t = _prevValue;
                  _sourceText = new String(stringValue);
                  _sourceText.value = stringValue || new String(stringValue);
                }
                return _sourceText;
              }
            });
            return _thisLayerFunction;
          };
        }();
        var LayerExpressionInterface = function() {
          function getMatrix(time2) {
            var toWorldMat = new Matrix();
            if (time2 !== void 0) {
              var propMatrix = this._elem.finalTransform.mProp.getValueAtTime(time2);
              propMatrix.clone(toWorldMat);
            } else {
              var transformMat = this._elem.finalTransform.mProp;
              transformMat.applyToMatrix(toWorldMat);
            }
            return toWorldMat;
          }
          function toWorldVec(arr, time2) {
            var toWorldMat = this.getMatrix(time2);
            toWorldMat.props[12] = 0;
            toWorldMat.props[13] = 0;
            toWorldMat.props[14] = 0;
            return this.applyPoint(toWorldMat, arr);
          }
          function toWorld2(arr, time2) {
            var toWorldMat = this.getMatrix(time2);
            return this.applyPoint(toWorldMat, arr);
          }
          function fromWorldVec(arr, time2) {
            var toWorldMat = this.getMatrix(time2);
            toWorldMat.props[12] = 0;
            toWorldMat.props[13] = 0;
            toWorldMat.props[14] = 0;
            return this.invertPoint(toWorldMat, arr);
          }
          function fromWorld2(arr, time2) {
            var toWorldMat = this.getMatrix(time2);
            return this.invertPoint(toWorldMat, arr);
          }
          function applyPoint(matrix, arr) {
            if (this._elem.hierarchy && this._elem.hierarchy.length) {
              var i;
              var len = this._elem.hierarchy.length;
              for (i = 0; i < len; i += 1) {
                this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(matrix);
              }
            }
            return matrix.applyToPointArray(arr[0], arr[1], arr[2] || 0);
          }
          function invertPoint(matrix, arr) {
            if (this._elem.hierarchy && this._elem.hierarchy.length) {
              var i;
              var len = this._elem.hierarchy.length;
              for (i = 0; i < len; i += 1) {
                this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(matrix);
              }
            }
            return matrix.inversePoint(arr);
          }
          function fromComp2(arr) {
            var toWorldMat = new Matrix();
            toWorldMat.reset();
            this._elem.finalTransform.mProp.applyToMatrix(toWorldMat);
            if (this._elem.hierarchy && this._elem.hierarchy.length) {
              var i;
              var len = this._elem.hierarchy.length;
              for (i = 0; i < len; i += 1) {
                this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(toWorldMat);
              }
              return toWorldMat.inversePoint(arr);
            }
            return toWorldMat.inversePoint(arr);
          }
          function sampleImage() {
            return [1, 1, 1, 1];
          }
          return function(elem2) {
            var transformInterface;
            function _registerMaskInterface(maskManager) {
              _thisLayerFunction.mask = new MaskManagerInterface(maskManager, elem2);
            }
            function _registerEffectsInterface(effects) {
              _thisLayerFunction.effect = effects;
            }
            function _thisLayerFunction(name2) {
              switch (name2) {
                case "ADBE Root Vectors Group":
                case "Contents":
                case 2:
                  return _thisLayerFunction.shapeInterface;
                case 1:
                case 6:
                case "Transform":
                case "transform":
                case "ADBE Transform Group":
                  return transformInterface;
                case 4:
                case "ADBE Effect Parade":
                case "effects":
                case "Effects":
                  return _thisLayerFunction.effect;
                case "ADBE Text Properties":
                  return _thisLayerFunction.textInterface;
                default:
                  return null;
              }
            }
            _thisLayerFunction.getMatrix = getMatrix;
            _thisLayerFunction.invertPoint = invertPoint;
            _thisLayerFunction.applyPoint = applyPoint;
            _thisLayerFunction.toWorld = toWorld2;
            _thisLayerFunction.toWorldVec = toWorldVec;
            _thisLayerFunction.fromWorld = fromWorld2;
            _thisLayerFunction.fromWorldVec = fromWorldVec;
            _thisLayerFunction.toComp = toWorld2;
            _thisLayerFunction.fromComp = fromComp2;
            _thisLayerFunction.sampleImage = sampleImage;
            _thisLayerFunction.sourceRectAtTime = elem2.sourceRectAtTime.bind(elem2);
            _thisLayerFunction._elem = elem2;
            transformInterface = TransformExpressionInterface(elem2.finalTransform.mProp);
            var anchorPointDescriptor = getDescriptor(transformInterface, "anchorPoint");
            Object.defineProperties(_thisLayerFunction, {
              hasParent: {
                get: function() {
                  return elem2.hierarchy.length;
                }
              },
              parent: {
                get: function() {
                  return elem2.hierarchy[0].layerInterface;
                }
              },
              rotation: getDescriptor(transformInterface, "rotation"),
              scale: getDescriptor(transformInterface, "scale"),
              position: getDescriptor(transformInterface, "position"),
              opacity: getDescriptor(transformInterface, "opacity"),
              anchorPoint: anchorPointDescriptor,
              anchor_point: anchorPointDescriptor,
              transform: {
                get: function() {
                  return transformInterface;
                }
              },
              active: {
                get: function() {
                  return elem2.isInRange;
                }
              }
            });
            _thisLayerFunction.startTime = elem2.data.st;
            _thisLayerFunction.index = elem2.data.ind;
            _thisLayerFunction.source = elem2.data.refId;
            _thisLayerFunction.height = elem2.data.ty === 0 ? elem2.data.h : 100;
            _thisLayerFunction.width = elem2.data.ty === 0 ? elem2.data.w : 100;
            _thisLayerFunction.inPoint = elem2.data.ip / elem2.comp.globalData.frameRate;
            _thisLayerFunction.outPoint = elem2.data.op / elem2.comp.globalData.frameRate;
            _thisLayerFunction._name = elem2.data.nm;
            _thisLayerFunction.registerMaskInterface = _registerMaskInterface;
            _thisLayerFunction.registerEffectsInterface = _registerEffectsInterface;
            return _thisLayerFunction;
          };
        }();
        var FootageInterface = function() {
          var outlineInterfaceFactory = function(elem2) {
            var currentPropertyName = "";
            var currentProperty = elem2.getFootageData();
            function init() {
              currentPropertyName = "";
              currentProperty = elem2.getFootageData();
              return searchProperty;
            }
            function searchProperty(value2) {
              if (currentProperty[value2]) {
                currentPropertyName = value2;
                currentProperty = currentProperty[value2];
                if (typeof currentProperty === "object") {
                  return searchProperty;
                }
                return currentProperty;
              }
              var propertyNameIndex = value2.indexOf(currentPropertyName);
              if (propertyNameIndex !== -1) {
                var index2 = parseInt(value2.substr(propertyNameIndex + currentPropertyName.length), 10);
                currentProperty = currentProperty[index2];
                if (typeof currentProperty === "object") {
                  return searchProperty;
                }
                return currentProperty;
              }
              return "";
            }
            return init;
          };
          var dataInterfaceFactory = function(elem2) {
            function interfaceFunction(value2) {
              if (value2 === "Outline") {
                return interfaceFunction.outlineInterface();
              }
              return null;
            }
            interfaceFunction._name = "Outline";
            interfaceFunction.outlineInterface = outlineInterfaceFactory(elem2);
            return interfaceFunction;
          };
          return function(elem2) {
            function _interfaceFunction(value2) {
              if (value2 === "Data") {
                return _interfaceFunction.dataInterface;
              }
              return null;
            }
            _interfaceFunction._name = "Data";
            _interfaceFunction.dataInterface = dataInterfaceFactory(elem2);
            return _interfaceFunction;
          };
        }();
        var CompExpressionInterface = function() {
          return function(comp2) {
            function _thisLayerFunction(name2) {
              var i = 0;
              var len = comp2.layers.length;
              while (i < len) {
                if (comp2.layers[i].nm === name2 || comp2.layers[i].ind === name2) {
                  return comp2.elements[i].layerInterface;
                }
                i += 1;
              }
              return null;
            }
            Object.defineProperty(_thisLayerFunction, "_name", { value: comp2.data.nm });
            _thisLayerFunction.layer = _thisLayerFunction;
            _thisLayerFunction.pixelAspect = 1;
            _thisLayerFunction.height = comp2.data.h || comp2.globalData.compSize.h;
            _thisLayerFunction.width = comp2.data.w || comp2.globalData.compSize.w;
            _thisLayerFunction.pixelAspect = 1;
            _thisLayerFunction.frameDuration = 1 / comp2.globalData.frameRate;
            _thisLayerFunction.displayStartTime = 0;
            _thisLayerFunction.numLayers = comp2.layers.length;
            return _thisLayerFunction;
          };
        }();
        var TransformExpressionInterface = function() {
          return function(transform2) {
            function _thisFunction(name2) {
              switch (name2) {
                case "scale":
                case "Scale":
                case "ADBE Scale":
                case 6:
                  return _thisFunction.scale;
                case "rotation":
                case "Rotation":
                case "ADBE Rotation":
                case "ADBE Rotate Z":
                case 10:
                  return _thisFunction.rotation;
                case "ADBE Rotate X":
                  return _thisFunction.xRotation;
                case "ADBE Rotate Y":
                  return _thisFunction.yRotation;
                case "position":
                case "Position":
                case "ADBE Position":
                case 2:
                  return _thisFunction.position;
                case "ADBE Position_0":
                  return _thisFunction.xPosition;
                case "ADBE Position_1":
                  return _thisFunction.yPosition;
                case "ADBE Position_2":
                  return _thisFunction.zPosition;
                case "anchorPoint":
                case "AnchorPoint":
                case "Anchor Point":
                case "ADBE AnchorPoint":
                case 1:
                  return _thisFunction.anchorPoint;
                case "opacity":
                case "Opacity":
                case 11:
                  return _thisFunction.opacity;
                default:
                  return null;
              }
            }
            Object.defineProperty(_thisFunction, "rotation", {
              get: ExpressionPropertyInterface(transform2.r || transform2.rz)
            });
            Object.defineProperty(_thisFunction, "zRotation", {
              get: ExpressionPropertyInterface(transform2.rz || transform2.r)
            });
            Object.defineProperty(_thisFunction, "xRotation", {
              get: ExpressionPropertyInterface(transform2.rx)
            });
            Object.defineProperty(_thisFunction, "yRotation", {
              get: ExpressionPropertyInterface(transform2.ry)
            });
            Object.defineProperty(_thisFunction, "scale", {
              get: ExpressionPropertyInterface(transform2.s)
            });
            var _px;
            var _py;
            var _pz;
            var _transformFactory;
            if (transform2.p) {
              _transformFactory = ExpressionPropertyInterface(transform2.p);
            } else {
              _px = ExpressionPropertyInterface(transform2.px);
              _py = ExpressionPropertyInterface(transform2.py);
              if (transform2.pz) {
                _pz = ExpressionPropertyInterface(transform2.pz);
              }
            }
            Object.defineProperty(_thisFunction, "position", {
              get: function() {
                if (transform2.p) {
                  return _transformFactory();
                }
                return [
                  _px(),
                  _py(),
                  _pz ? _pz() : 0
                ];
              }
            });
            Object.defineProperty(_thisFunction, "xPosition", {
              get: ExpressionPropertyInterface(transform2.px)
            });
            Object.defineProperty(_thisFunction, "yPosition", {
              get: ExpressionPropertyInterface(transform2.py)
            });
            Object.defineProperty(_thisFunction, "zPosition", {
              get: ExpressionPropertyInterface(transform2.pz)
            });
            Object.defineProperty(_thisFunction, "anchorPoint", {
              get: ExpressionPropertyInterface(transform2.a)
            });
            Object.defineProperty(_thisFunction, "opacity", {
              get: ExpressionPropertyInterface(transform2.o)
            });
            Object.defineProperty(_thisFunction, "skew", {
              get: ExpressionPropertyInterface(transform2.sk)
            });
            Object.defineProperty(_thisFunction, "skewAxis", {
              get: ExpressionPropertyInterface(transform2.sa)
            });
            Object.defineProperty(_thisFunction, "orientation", {
              get: ExpressionPropertyInterface(transform2.or)
            });
            return _thisFunction;
          };
        }();
        var ProjectInterface = function() {
          function registerComposition(comp2) {
            this.compositions.push(comp2);
          }
          return function() {
            function _thisProjectFunction(name2) {
              var i = 0;
              var len = this.compositions.length;
              while (i < len) {
                if (this.compositions[i].data && this.compositions[i].data.nm === name2) {
                  if (this.compositions[i].prepareFrame && this.compositions[i].data.xt) {
                    this.compositions[i].prepareFrame(this.currentFrame);
                  }
                  return this.compositions[i].compInterface;
                }
                i += 1;
              }
              return null;
            }
            _thisProjectFunction.compositions = [];
            _thisProjectFunction.currentFrame = 0;
            _thisProjectFunction.registerComposition = registerComposition;
            return _thisProjectFunction;
          };
        }();
        var EffectsExpressionInterface = function() {
          var ob2 = {
            createEffectsInterface
          };
          function createEffectsInterface(elem2, propertyGroup) {
            if (elem2.effectsManager) {
              var effectElements = [];
              var effectsData = elem2.data.ef;
              var i;
              var len = elem2.effectsManager.effectElements.length;
              for (i = 0; i < len; i += 1) {
                effectElements.push(createGroupInterface(effectsData[i], elem2.effectsManager.effectElements[i], propertyGroup, elem2));
              }
              var effects = elem2.data.ef || [];
              var groupInterface = function(name2) {
                i = 0;
                len = effects.length;
                while (i < len) {
                  if (name2 === effects[i].nm || name2 === effects[i].mn || name2 === effects[i].ix) {
                    return effectElements[i];
                  }
                  i += 1;
                }
                return null;
              };
              Object.defineProperty(groupInterface, "numProperties", {
                get: function() {
                  return effects.length;
                }
              });
              return groupInterface;
            }
            return null;
          }
          function createGroupInterface(data2, elements, propertyGroup, elem2) {
            function groupInterface(name2) {
              var effects = data2.ef;
              var i2 = 0;
              var len2 = effects.length;
              while (i2 < len2) {
                if (name2 === effects[i2].nm || name2 === effects[i2].mn || name2 === effects[i2].ix) {
                  if (effects[i2].ty === 5) {
                    return effectElements[i2];
                  }
                  return effectElements[i2]();
                }
                i2 += 1;
              }
              throw new Error();
            }
            var _propertyGroup = propertyGroupFactory(groupInterface, propertyGroup);
            var effectElements = [];
            var i;
            var len = data2.ef.length;
            for (i = 0; i < len; i += 1) {
              if (data2.ef[i].ty === 5) {
                effectElements.push(createGroupInterface(data2.ef[i], elements.effectElements[i], elements.effectElements[i].propertyGroup, elem2));
              } else {
                effectElements.push(createValueInterface(elements.effectElements[i], data2.ef[i].ty, elem2, _propertyGroup));
              }
            }
            if (data2.mn === "ADBE Color Control") {
              Object.defineProperty(groupInterface, "color", {
                get: function() {
                  return effectElements[0]();
                }
              });
            }
            Object.defineProperties(groupInterface, {
              numProperties: {
                get: function() {
                  return data2.np;
                }
              },
              _name: { value: data2.nm },
              propertyGroup: { value: _propertyGroup }
            });
            groupInterface.enabled = data2.en !== 0;
            groupInterface.active = groupInterface.enabled;
            return groupInterface;
          }
          function createValueInterface(element, type, elem2, propertyGroup) {
            var expressionProperty = ExpressionPropertyInterface(element.p);
            function interfaceFunction() {
              if (type === 10) {
                return elem2.comp.compInterface(element.p.v);
              }
              return expressionProperty();
            }
            if (element.p.setGroupProperty) {
              element.p.setGroupProperty(PropertyInterface("", propertyGroup));
            }
            return interfaceFunction;
          }
          return ob2;
        }();
        var MaskManagerInterface = function() {
          function MaskInterface(mask2, data2) {
            this._mask = mask2;
            this._data = data2;
          }
          Object.defineProperty(MaskInterface.prototype, "maskPath", {
            get: function() {
              if (this._mask.prop.k) {
                this._mask.prop.getValue();
              }
              return this._mask.prop;
            }
          });
          Object.defineProperty(MaskInterface.prototype, "maskOpacity", {
            get: function() {
              if (this._mask.op.k) {
                this._mask.op.getValue();
              }
              return this._mask.op.v * 100;
            }
          });
          var MaskManager = function(maskManager) {
            var _masksInterfaces = createSizedArray(maskManager.viewData.length);
            var i;
            var len = maskManager.viewData.length;
            for (i = 0; i < len; i += 1) {
              _masksInterfaces[i] = new MaskInterface(maskManager.viewData[i], maskManager.masksProperties[i]);
            }
            var maskFunction = function(name2) {
              i = 0;
              while (i < len) {
                if (maskManager.masksProperties[i].nm === name2) {
                  return _masksInterfaces[i];
                }
                i += 1;
              }
              return null;
            };
            return maskFunction;
          };
          return MaskManager;
        }();
        var ExpressionPropertyInterface = function() {
          var defaultUnidimensionalValue = { pv: 0, v: 0, mult: 1 };
          var defaultMultidimensionalValue = { pv: [0, 0, 0], v: [0, 0, 0], mult: 1 };
          function completeProperty(expressionValue, property2, type) {
            Object.defineProperty(expressionValue, "velocity", {
              get: function() {
                return property2.getVelocityAtTime(property2.comp.currentFrame);
              }
            });
            expressionValue.numKeys = property2.keyframes ? property2.keyframes.length : 0;
            expressionValue.key = function(pos) {
              if (!expressionValue.numKeys) {
                return 0;
              }
              var value2 = "";
              if ("s" in property2.keyframes[pos - 1]) {
                value2 = property2.keyframes[pos - 1].s;
              } else if ("e" in property2.keyframes[pos - 2]) {
                value2 = property2.keyframes[pos - 2].e;
              } else {
                value2 = property2.keyframes[pos - 2].s;
              }
              var valueProp = type === "unidimensional" ? new Number(value2) : Object.assign({}, value2);
              valueProp.time = property2.keyframes[pos - 1].t / property2.elem.comp.globalData.frameRate;
              valueProp.value = type === "unidimensional" ? value2[0] : value2;
              return valueProp;
            };
            expressionValue.valueAtTime = property2.getValueAtTime;
            expressionValue.speedAtTime = property2.getSpeedAtTime;
            expressionValue.velocityAtTime = property2.getVelocityAtTime;
            expressionValue.propertyGroup = property2.propertyGroup;
          }
          function UnidimensionalPropertyInterface(property2) {
            if (!property2 || !("pv" in property2)) {
              property2 = defaultUnidimensionalValue;
            }
            var mult = 1 / property2.mult;
            var val2 = property2.pv * mult;
            var expressionValue = new Number(val2);
            expressionValue.value = val2;
            completeProperty(expressionValue, property2, "unidimensional");
            return function() {
              if (property2.k) {
                property2.getValue();
              }
              val2 = property2.v * mult;
              if (expressionValue.value !== val2) {
                expressionValue = new Number(val2);
                expressionValue.value = val2;
                completeProperty(expressionValue, property2, "unidimensional");
              }
              return expressionValue;
            };
          }
          function MultidimensionalPropertyInterface(property2) {
            if (!property2 || !("pv" in property2)) {
              property2 = defaultMultidimensionalValue;
            }
            var mult = 1 / property2.mult;
            var len = property2.data && property2.data.l || property2.pv.length;
            var expressionValue = createTypedArray("float32", len);
            var arrValue = createTypedArray("float32", len);
            expressionValue.value = arrValue;
            completeProperty(expressionValue, property2, "multidimensional");
            return function() {
              if (property2.k) {
                property2.getValue();
              }
              for (var i = 0; i < len; i += 1) {
                arrValue[i] = property2.v[i] * mult;
                expressionValue[i] = arrValue[i];
              }
              return expressionValue;
            };
          }
          function defaultGetter() {
            return defaultUnidimensionalValue;
          }
          return function(property2) {
            if (!property2) {
              return defaultGetter;
            }
            if (property2.propType === "unidimensional") {
              return UnidimensionalPropertyInterface(property2);
            }
            return MultidimensionalPropertyInterface(property2);
          };
        }();
        var TextExpressionSelectorPropFactory = function() {
          function getValueProxy(index2, total) {
            this.textIndex = index2 + 1;
            this.textTotal = total;
            this.v = this.getValue() * this.mult;
            return this.v;
          }
          return function(elem2, data2) {
            this.pv = 1;
            this.comp = elem2.comp;
            this.elem = elem2;
            this.mult = 0.01;
            this.propType = "textSelector";
            this.textTotal = data2.totalChars;
            this.selectorValue = 100;
            this.lastValue = [1, 1, 1];
            this.k = true;
            this.x = true;
            this.getValue = ExpressionManager.initiateExpression.bind(this)(elem2, data2, this);
            this.getMult = getValueProxy;
            this.getVelocityAtTime = expressionHelpers.getVelocityAtTime;
            if (this.kf) {
              this.getValueAtTime = expressionHelpers.getValueAtTime.bind(this);
            } else {
              this.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(this);
            }
            this.setGroupProperty = expressionHelpers.setGroupProperty;
          };
        }();
        var propertyGetTextProp = TextSelectorProp.getTextSelectorProp;
        TextSelectorProp.getTextSelectorProp = function(elem2, data2, arr) {
          if (data2.t === 1) {
            return new TextExpressionSelectorPropFactory(elem2, data2, arr);
          }
          return propertyGetTextProp(elem2, data2, arr);
        };
        function SliderEffect(data2, elem2, container) {
          this.p = PropertyFactory.getProp(elem2, data2.v, 0, 0, container);
        }
        function AngleEffect(data2, elem2, container) {
          this.p = PropertyFactory.getProp(elem2, data2.v, 0, 0, container);
        }
        function ColorEffect(data2, elem2, container) {
          this.p = PropertyFactory.getProp(elem2, data2.v, 1, 0, container);
        }
        function PointEffect(data2, elem2, container) {
          this.p = PropertyFactory.getProp(elem2, data2.v, 1, 0, container);
        }
        function LayerIndexEffect(data2, elem2, container) {
          this.p = PropertyFactory.getProp(elem2, data2.v, 0, 0, container);
        }
        function MaskIndexEffect(data2, elem2, container) {
          this.p = PropertyFactory.getProp(elem2, data2.v, 0, 0, container);
        }
        function CheckboxEffect(data2, elem2, container) {
          this.p = PropertyFactory.getProp(elem2, data2.v, 0, 0, container);
        }
        function NoValueEffect() {
          this.p = {};
        }
        function EffectsManager(data2, element) {
          var effects = data2.ef || [];
          this.effectElements = [];
          var i;
          var len = effects.length;
          var effectItem;
          for (i = 0; i < len; i += 1) {
            effectItem = new GroupEffect(effects[i], element);
            this.effectElements.push(effectItem);
          }
        }
        function GroupEffect(data2, element) {
          this.init(data2, element);
        }
        extendPrototype([DynamicPropertyContainer], GroupEffect);
        GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties;
        GroupEffect.prototype.init = function(data2, element) {
          this.data = data2;
          this.effectElements = [];
          this.initDynamicPropertyContainer(element);
          var i;
          var len = this.data.ef.length;
          var eff;
          var effects = this.data.ef;
          for (i = 0; i < len; i += 1) {
            eff = null;
            switch (effects[i].ty) {
              case 0:
                eff = new SliderEffect(effects[i], element, this);
                break;
              case 1:
                eff = new AngleEffect(effects[i], element, this);
                break;
              case 2:
                eff = new ColorEffect(effects[i], element, this);
                break;
              case 3:
                eff = new PointEffect(effects[i], element, this);
                break;
              case 4:
              case 7:
                eff = new CheckboxEffect(effects[i], element, this);
                break;
              case 10:
                eff = new LayerIndexEffect(effects[i], element, this);
                break;
              case 11:
                eff = new MaskIndexEffect(effects[i], element, this);
                break;
              case 5:
                eff = new EffectsManager(effects[i], element, this);
                break;
              default:
                eff = new NoValueEffect(effects[i], element, this);
                break;
            }
            if (eff) {
              this.effectElements.push(eff);
            }
          }
        };
        var lottie = {};
        function setLocationHref(href) {
          locationHref = href;
        }
        function searchAnimations() {
          if (standalone === true) {
            animationManager.searchAnimations(animationData, standalone, renderer);
          } else {
            animationManager.searchAnimations();
          }
        }
        function setSubframeRendering(flag) {
          subframeEnabled = flag;
        }
        function setIDPrefix(prefix) {
          idPrefix = prefix;
        }
        function loadAnimation(params) {
          if (standalone === true) {
            params.animationData = JSON.parse(animationData);
          }
          return animationManager.loadAnimation(params);
        }
        function setQuality(value2) {
          if (typeof value2 === "string") {
            switch (value2) {
              case "high":
                defaultCurveSegments = 200;
                break;
              default:
              case "medium":
                defaultCurveSegments = 50;
                break;
              case "low":
                defaultCurveSegments = 10;
                break;
            }
          } else if (!isNaN(value2) && value2 > 1) {
            defaultCurveSegments = value2;
          }
          if (defaultCurveSegments >= 50) {
            roundValues(false);
          } else {
            roundValues(true);
          }
        }
        function inBrowser() {
          return typeof navigator !== "undefined";
        }
        function installPlugin(type, plugin) {
          if (type === "expressions") {
            expressionsPlugin = plugin;
          }
        }
        function getFactory(name2) {
          switch (name2) {
            case "propertyFactory":
              return PropertyFactory;
            case "shapePropertyFactory":
              return ShapePropertyFactory;
            case "matrix":
              return Matrix;
            default:
              return null;
          }
        }
        lottie.play = animationManager.play;
        lottie.pause = animationManager.pause;
        lottie.setLocationHref = setLocationHref;
        lottie.togglePause = animationManager.togglePause;
        lottie.setSpeed = animationManager.setSpeed;
        lottie.setDirection = animationManager.setDirection;
        lottie.stop = animationManager.stop;
        lottie.searchAnimations = searchAnimations;
        lottie.registerAnimation = animationManager.registerAnimation;
        lottie.loadAnimation = loadAnimation;
        lottie.setSubframeRendering = setSubframeRendering;
        lottie.resize = animationManager.resize;
        lottie.goToAndStop = animationManager.goToAndStop;
        lottie.destroy = animationManager.destroy;
        lottie.setQuality = setQuality;
        lottie.inBrowser = inBrowser;
        lottie.installPlugin = installPlugin;
        lottie.freeze = animationManager.freeze;
        lottie.unfreeze = animationManager.unfreeze;
        lottie.setVolume = animationManager.setVolume;
        lottie.mute = animationManager.mute;
        lottie.unmute = animationManager.unmute;
        lottie.getRegisteredAnimations = animationManager.getRegisteredAnimations;
        lottie.useWebWorker = function(flag) {
          _useWebWorker = flag;
        };
        lottie.setIDPrefix = setIDPrefix;
        lottie.__getFactory = getFactory;
        lottie.version = "5.8.1";
        function checkReady() {
          if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);
            searchAnimations();
          }
        }
        function getQueryVariable(variable) {
          var vars = queryString.split("&");
          for (var i = 0; i < vars.length; i += 1) {
            var pair = vars[i].split("=");
            if (decodeURIComponent(pair[0]) == variable) {
              return decodeURIComponent(pair[1]);
            }
          }
          return null;
        }
        var standalone = "__[STANDALONE]__";
        var animationData = "__[ANIMATIONDATA]__";
        var renderer = "";
        var queryString;
        if (standalone) {
          var scripts = document.getElementsByTagName("script");
          var index = scripts.length - 1;
          var myScript = scripts[index] || {
            src: ""
          };
          queryString = myScript.src.replace(/^[^\?]+\??/, "");
          renderer = getQueryVariable("renderer");
        }
        var readyStateCheckInterval = setInterval(checkReady, 100);
        return lottie;
      });
    }
  });

  // node_modules/jquery/dist/jquery.js
  var require_jquery = __commonJS({
    "node_modules/jquery/dist/jquery.js"(exports2, module2) {
      (function(global, factory2) {
        "use strict";
        if (typeof module2 === "object" && typeof module2.exports === "object") {
          module2.exports = global.document ? factory2(global, true) : function(w) {
            if (!w.document) {
              throw new Error("jQuery requires a window with a document");
            }
            return factory2(w);
          };
        } else {
          factory2(global);
        }
      })(typeof window !== "undefined" ? window : exports2, function(window2, noGlobal) {
        "use strict";
        var arr = [];
        var getProto = Object.getPrototypeOf;
        var slice = arr.slice;
        var flat = arr.flat ? function(array) {
          return arr.flat.call(array);
        } : function(array) {
          return arr.concat.apply([], array);
        };
        var push = arr.push;
        var indexOf = arr.indexOf;
        var class2type = {};
        var toString = class2type.toString;
        var hasOwn = class2type.hasOwnProperty;
        var fnToString = hasOwn.toString;
        var ObjectFunctionString = fnToString.call(Object);
        var support = {};
        var isFunction = function isFunction2(obj) {
          return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
        };
        var isWindow = function isWindow2(obj) {
          return obj != null && obj === obj.window;
        };
        var document2 = window2.document;
        var preservedScriptAttributes = {
          type: true,
          src: true,
          nonce: true,
          noModule: true
        };
        function DOMEval(code, node, doc) {
          doc = doc || document2;
          var i, val2, script = doc.createElement("script");
          script.text = code;
          if (node) {
            for (i in preservedScriptAttributes) {
              val2 = node[i] || node.getAttribute && node.getAttribute(i);
              if (val2) {
                script.setAttribute(i, val2);
              }
            }
          }
          doc.head.appendChild(script).parentNode.removeChild(script);
        }
        function toType(obj) {
          if (obj == null) {
            return obj + "";
          }
          return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
        }
        var version = "3.6.0", jQuery = function(selector, context) {
          return new jQuery.fn.init(selector, context);
        };
        jQuery.fn = jQuery.prototype = {
          jquery: version,
          constructor: jQuery,
          length: 0,
          toArray: function() {
            return slice.call(this);
          },
          get: function(num) {
            if (num == null) {
              return slice.call(this);
            }
            return num < 0 ? this[num + this.length] : this[num];
          },
          pushStack: function(elems) {
            var ret = jQuery.merge(this.constructor(), elems);
            ret.prevObject = this;
            return ret;
          },
          each: function(callback) {
            return jQuery.each(this, callback);
          },
          map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem2, i) {
              return callback.call(elem2, i, elem2);
            }));
          },
          slice: function() {
            return this.pushStack(slice.apply(this, arguments));
          },
          first: function() {
            return this.eq(0);
          },
          last: function() {
            return this.eq(-1);
          },
          even: function() {
            return this.pushStack(jQuery.grep(this, function(_elem, i) {
              return (i + 1) % 2;
            }));
          },
          odd: function() {
            return this.pushStack(jQuery.grep(this, function(_elem, i) {
              return i % 2;
            }));
          },
          eq: function(i) {
            var len = this.length, j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
          },
          end: function() {
            return this.prevObject || this.constructor();
          },
          push,
          sort: arr.sort,
          splice: arr.splice
        };
        jQuery.extend = jQuery.fn.extend = function() {
          var options, name2, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length2 = arguments.length, deep = false;
          if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
          }
          if (typeof target !== "object" && !isFunction(target)) {
            target = {};
          }
          if (i === length2) {
            target = this;
            i--;
          }
          for (; i < length2; i++) {
            if ((options = arguments[i]) != null) {
              for (name2 in options) {
                copy = options[name2];
                if (name2 === "__proto__" || target === copy) {
                  continue;
                }
                if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                  src = target[name2];
                  if (copyIsArray && !Array.isArray(src)) {
                    clone = [];
                  } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                    clone = {};
                  } else {
                    clone = src;
                  }
                  copyIsArray = false;
                  target[name2] = jQuery.extend(deep, clone, copy);
                } else if (copy !== void 0) {
                  target[name2] = copy;
                }
              }
            }
          }
          return target;
        };
        jQuery.extend({
          expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
          isReady: true,
          error: function(msg) {
            throw new Error(msg);
          },
          noop: function() {
          },
          isPlainObject: function(obj) {
            var proto, Ctor;
            if (!obj || toString.call(obj) !== "[object Object]") {
              return false;
            }
            proto = getProto(obj);
            if (!proto) {
              return true;
            }
            Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
            return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
          },
          isEmptyObject: function(obj) {
            var name2;
            for (name2 in obj) {
              return false;
            }
            return true;
          },
          globalEval: function(code, options, doc) {
            DOMEval(code, { nonce: options && options.nonce }, doc);
          },
          each: function(obj, callback) {
            var length2, i = 0;
            if (isArrayLike(obj)) {
              length2 = obj.length;
              for (; i < length2; i++) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                  break;
                }
              }
            } else {
              for (i in obj) {
                if (callback.call(obj[i], i, obj[i]) === false) {
                  break;
                }
              }
            }
            return obj;
          },
          makeArray: function(arr2, results) {
            var ret = results || [];
            if (arr2 != null) {
              if (isArrayLike(Object(arr2))) {
                jQuery.merge(
                  ret,
                  typeof arr2 === "string" ? [arr2] : arr2
                );
              } else {
                push.call(ret, arr2);
              }
            }
            return ret;
          },
          inArray: function(elem2, arr2, i) {
            return arr2 == null ? -1 : indexOf.call(arr2, elem2, i);
          },
          merge: function(first, second) {
            var len = +second.length, j = 0, i = first.length;
            for (; j < len; j++) {
              first[i++] = second[j];
            }
            first.length = i;
            return first;
          },
          grep: function(elems, callback, invert) {
            var callbackInverse, matches = [], i = 0, length2 = elems.length, callbackExpect = !invert;
            for (; i < length2; i++) {
              callbackInverse = !callback(elems[i], i);
              if (callbackInverse !== callbackExpect) {
                matches.push(elems[i]);
              }
            }
            return matches;
          },
          map: function(elems, callback, arg) {
            var length2, value2, i = 0, ret = [];
            if (isArrayLike(elems)) {
              length2 = elems.length;
              for (; i < length2; i++) {
                value2 = callback(elems[i], i, arg);
                if (value2 != null) {
                  ret.push(value2);
                }
              }
            } else {
              for (i in elems) {
                value2 = callback(elems[i], i, arg);
                if (value2 != null) {
                  ret.push(value2);
                }
              }
            }
            return flat(ret);
          },
          guid: 1,
          support
        });
        if (typeof Symbol === "function") {
          jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
        }
        jQuery.each(
          "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
          function(_i, name2) {
            class2type["[object " + name2 + "]"] = name2.toLowerCase();
          }
        );
        function isArrayLike(obj) {
          var length2 = !!obj && "length" in obj && obj.length, type = toType(obj);
          if (isFunction(obj) || isWindow(obj)) {
            return false;
          }
          return type === "array" || length2 === 0 || typeof length2 === "number" && length2 > 0 && length2 - 1 in obj;
        }
        var Sizzle = function(window3) {
          var i, support2, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document3, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * new Date(), preferredDoc = window3.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = function(a, b) {
            if (a === b) {
              hasDuplicate = true;
            }
            return 0;
          }, hasOwn2 = {}.hasOwnProperty, arr2 = [], pop = arr2.pop, pushNative = arr2.push, push2 = arr2.push, slice2 = arr2.slice, indexOf2 = function(list, elem2) {
            var i2 = 0, len = list.length;
            for (; i2 < len; i2++) {
              if (list[i2] === elem2) {
                return i2;
              }
            }
            return -1;
          }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace = "[\\x20\\t\\r\\n\\f]", identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace + "*([*^$|!~]?=)" + whitespace + `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + identifier + "))|)" + whitespace + "*\\]", pseudos = ":(" + identifier + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace + "+", "g"), rtrim2 = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"), rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"), rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"), rdescend = new RegExp(whitespace + "|>"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            "ID": new RegExp("^#(" + identifier + ")"),
            "CLASS": new RegExp("^\\.(" + identifier + ")"),
            "TAG": new RegExp("^(" + identifier + "|[*])"),
            "ATTR": new RegExp("^" + attributes),
            "PSEUDO": new RegExp("^" + pseudos),
            "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
            "bool": new RegExp("^(?:" + booleans + ")$", "i"),
            "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
          }, rhtml2 = /HTML$/i, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"), funescape = function(escape, nonHex) {
            var high = "0x" + escape.slice(1) - 65536;
            return nonHex ? nonHex : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
          }, rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fcssescape = function(ch, asCodePoint) {
            if (asCodePoint) {
              if (ch === "\0") {
                return "\uFFFD";
              }
              return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
            }
            return "\\" + ch;
          }, unloadHandler = function() {
            setDocument();
          }, inDisabledFieldset = addCombinator(
            function(elem2) {
              return elem2.disabled === true && elem2.nodeName.toLowerCase() === "fieldset";
            },
            { dir: "parentNode", next: "legend" }
          );
          try {
            push2.apply(
              arr2 = slice2.call(preferredDoc.childNodes),
              preferredDoc.childNodes
            );
            arr2[preferredDoc.childNodes.length].nodeType;
          } catch (e) {
            push2 = {
              apply: arr2.length ? function(target, els) {
                pushNative.apply(target, slice2.call(els));
              } : function(target, els) {
                var j = target.length, i2 = 0;
                while (target[j++] = els[i2++]) {
                }
                target.length = j - 1;
              }
            };
          }
          function Sizzle2(selector, context, results, seed) {
            var m, i2, elem2, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
            results = results || [];
            if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
              return results;
            }
            if (!seed) {
              setDocument(context);
              context = context || document3;
              if (documentIsHTML) {
                if (nodeType !== 11 && (match = rquickExpr2.exec(selector))) {
                  if (m = match[1]) {
                    if (nodeType === 9) {
                      if (elem2 = context.getElementById(m)) {
                        if (elem2.id === m) {
                          results.push(elem2);
                          return results;
                        }
                      } else {
                        return results;
                      }
                    } else {
                      if (newContext && (elem2 = newContext.getElementById(m)) && contains(context, elem2) && elem2.id === m) {
                        results.push(elem2);
                        return results;
                      }
                    }
                  } else if (match[2]) {
                    push2.apply(results, context.getElementsByTagName(selector));
                    return results;
                  } else if ((m = match[3]) && support2.getElementsByClassName && context.getElementsByClassName) {
                    push2.apply(results, context.getElementsByClassName(m));
                    return results;
                  }
                }
                if (support2.qsa && !nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && (nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {
                  newSelector = selector;
                  newContext = context;
                  if (nodeType === 1 && (rdescend.test(selector) || rcombinators.test(selector))) {
                    newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                    if (newContext !== context || !support2.scope) {
                      if (nid = context.getAttribute("id")) {
                        nid = nid.replace(rcssescape, fcssescape);
                      } else {
                        context.setAttribute("id", nid = expando);
                      }
                    }
                    groups = tokenize(selector);
                    i2 = groups.length;
                    while (i2--) {
                      groups[i2] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i2]);
                    }
                    newSelector = groups.join(",");
                  }
                  try {
                    push2.apply(
                      results,
                      newContext.querySelectorAll(newSelector)
                    );
                    return results;
                  } catch (qsaError) {
                    nonnativeSelectorCache(selector, true);
                  } finally {
                    if (nid === expando) {
                      context.removeAttribute("id");
                    }
                  }
                }
              }
            }
            return select(selector.replace(rtrim2, "$1"), context, results, seed);
          }
          function createCache() {
            var keys = [];
            function cache2(key2, value2) {
              if (keys.push(key2 + " ") > Expr.cacheLength) {
                delete cache2[keys.shift()];
              }
              return cache2[key2 + " "] = value2;
            }
            return cache2;
          }
          function markFunction(fn) {
            fn[expando] = true;
            return fn;
          }
          function assert(fn) {
            var el = document3.createElement("fieldset");
            try {
              return !!fn(el);
            } catch (e) {
              return false;
            } finally {
              if (el.parentNode) {
                el.parentNode.removeChild(el);
              }
              el = null;
            }
          }
          function addHandle(attrs, handler) {
            var arr3 = attrs.split("|"), i2 = arr3.length;
            while (i2--) {
              Expr.attrHandle[arr3[i2]] = handler;
            }
          }
          function siblingCheck(a, b) {
            var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;
            if (diff) {
              return diff;
            }
            if (cur) {
              while (cur = cur.nextSibling) {
                if (cur === b) {
                  return -1;
                }
              }
            }
            return a ? 1 : -1;
          }
          function createInputPseudo(type) {
            return function(elem2) {
              var name2 = elem2.nodeName.toLowerCase();
              return name2 === "input" && elem2.type === type;
            };
          }
          function createButtonPseudo(type) {
            return function(elem2) {
              var name2 = elem2.nodeName.toLowerCase();
              return (name2 === "input" || name2 === "button") && elem2.type === type;
            };
          }
          function createDisabledPseudo(disabled) {
            return function(elem2) {
              if ("form" in elem2) {
                if (elem2.parentNode && elem2.disabled === false) {
                  if ("label" in elem2) {
                    if ("label" in elem2.parentNode) {
                      return elem2.parentNode.disabled === disabled;
                    } else {
                      return elem2.disabled === disabled;
                    }
                  }
                  return elem2.isDisabled === disabled || elem2.isDisabled !== !disabled && inDisabledFieldset(elem2) === disabled;
                }
                return elem2.disabled === disabled;
              } else if ("label" in elem2) {
                return elem2.disabled === disabled;
              }
              return false;
            };
          }
          function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
              argument = +argument;
              return markFunction(function(seed, matches2) {
                var j, matchIndexes = fn([], seed.length, argument), i2 = matchIndexes.length;
                while (i2--) {
                  if (seed[j = matchIndexes[i2]]) {
                    seed[j] = !(matches2[j] = seed[j]);
                  }
                }
              });
            });
          }
          function testContext(context) {
            return context && typeof context.getElementsByTagName !== "undefined" && context;
          }
          support2 = Sizzle2.support = {};
          isXML = Sizzle2.isXML = function(elem2) {
            var namespace = elem2 && elem2.namespaceURI, docElem2 = elem2 && (elem2.ownerDocument || elem2).documentElement;
            return !rhtml2.test(namespace || docElem2 && docElem2.nodeName || "HTML");
          };
          setDocument = Sizzle2.setDocument = function(node) {
            var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
            if (doc == document3 || doc.nodeType !== 9 || !doc.documentElement) {
              return document3;
            }
            document3 = doc;
            docElem = document3.documentElement;
            documentIsHTML = !isXML(document3);
            if (preferredDoc != document3 && (subWindow = document3.defaultView) && subWindow.top !== subWindow) {
              if (subWindow.addEventListener) {
                subWindow.addEventListener("unload", unloadHandler, false);
              } else if (subWindow.attachEvent) {
                subWindow.attachEvent("onunload", unloadHandler);
              }
            }
            support2.scope = assert(function(el) {
              docElem.appendChild(el).appendChild(document3.createElement("div"));
              return typeof el.querySelectorAll !== "undefined" && !el.querySelectorAll(":scope fieldset div").length;
            });
            support2.attributes = assert(function(el) {
              el.className = "i";
              return !el.getAttribute("className");
            });
            support2.getElementsByTagName = assert(function(el) {
              el.appendChild(document3.createComment(""));
              return !el.getElementsByTagName("*").length;
            });
            support2.getElementsByClassName = rnative.test(document3.getElementsByClassName);
            support2.getById = assert(function(el) {
              docElem.appendChild(el).id = expando;
              return !document3.getElementsByName || !document3.getElementsByName(expando).length;
            });
            if (support2.getById) {
              Expr.filter["ID"] = function(id2) {
                var attrId = id2.replace(runescape, funescape);
                return function(elem2) {
                  return elem2.getAttribute("id") === attrId;
                };
              };
              Expr.find["ID"] = function(id2, context) {
                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                  var elem2 = context.getElementById(id2);
                  return elem2 ? [elem2] : [];
                }
              };
            } else {
              Expr.filter["ID"] = function(id2) {
                var attrId = id2.replace(runescape, funescape);
                return function(elem2) {
                  var node2 = typeof elem2.getAttributeNode !== "undefined" && elem2.getAttributeNode("id");
                  return node2 && node2.value === attrId;
                };
              };
              Expr.find["ID"] = function(id2, context) {
                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                  var node2, i2, elems, elem2 = context.getElementById(id2);
                  if (elem2) {
                    node2 = elem2.getAttributeNode("id");
                    if (node2 && node2.value === id2) {
                      return [elem2];
                    }
                    elems = context.getElementsByName(id2);
                    i2 = 0;
                    while (elem2 = elems[i2++]) {
                      node2 = elem2.getAttributeNode("id");
                      if (node2 && node2.value === id2) {
                        return [elem2];
                      }
                    }
                  }
                  return [];
                }
              };
            }
            Expr.find["TAG"] = support2.getElementsByTagName ? function(tag, context) {
              if (typeof context.getElementsByTagName !== "undefined") {
                return context.getElementsByTagName(tag);
              } else if (support2.qsa) {
                return context.querySelectorAll(tag);
              }
            } : function(tag, context) {
              var elem2, tmp = [], i2 = 0, results = context.getElementsByTagName(tag);
              if (tag === "*") {
                while (elem2 = results[i2++]) {
                  if (elem2.nodeType === 1) {
                    tmp.push(elem2);
                  }
                }
                return tmp;
              }
              return results;
            };
            Expr.find["CLASS"] = support2.getElementsByClassName && function(className, context) {
              if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                return context.getElementsByClassName(className);
              }
            };
            rbuggyMatches = [];
            rbuggyQSA = [];
            if (support2.qsa = rnative.test(document3.querySelectorAll)) {
              assert(function(el) {
                var input;
                docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>";
                if (el.querySelectorAll("[msallowcapture^='']").length) {
                  rbuggyQSA.push("[*^$]=" + whitespace + `*(?:''|"")`);
                }
                if (!el.querySelectorAll("[selected]").length) {
                  rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                }
                if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                  rbuggyQSA.push("~=");
                }
                input = document3.createElement("input");
                input.setAttribute("name", "");
                el.appendChild(input);
                if (!el.querySelectorAll("[name='']").length) {
                  rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + `*(?:''|"")`);
                }
                if (!el.querySelectorAll(":checked").length) {
                  rbuggyQSA.push(":checked");
                }
                if (!el.querySelectorAll("a#" + expando + "+*").length) {
                  rbuggyQSA.push(".#.+[+~]");
                }
                el.querySelectorAll("\\\f");
                rbuggyQSA.push("[\\r\\n\\f]");
              });
              assert(function(el) {
                el.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var input = document3.createElement("input");
                input.setAttribute("type", "hidden");
                el.appendChild(input).setAttribute("name", "D");
                if (el.querySelectorAll("[name=d]").length) {
                  rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                }
                if (el.querySelectorAll(":enabled").length !== 2) {
                  rbuggyQSA.push(":enabled", ":disabled");
                }
                docElem.appendChild(el).disabled = true;
                if (el.querySelectorAll(":disabled").length !== 2) {
                  rbuggyQSA.push(":enabled", ":disabled");
                }
                el.querySelectorAll("*,:x");
                rbuggyQSA.push(",.*:");
              });
            }
            if (support2.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
              assert(function(el) {
                support2.disconnectedMatch = matches.call(el, "*");
                matches.call(el, "[s!='']:x");
                rbuggyMatches.push("!=", pseudos);
              });
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
            hasCompare = rnative.test(docElem.compareDocumentPosition);
            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
              var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
              return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
            } : function(a, b) {
              if (b) {
                while (b = b.parentNode) {
                  if (b === a) {
                    return true;
                  }
                }
              }
              return false;
            };
            sortOrder = hasCompare ? function(a, b) {
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }
              var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
              if (compare) {
                return compare;
              }
              compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1;
              if (compare & 1 || !support2.sortDetached && b.compareDocumentPosition(a) === compare) {
                if (a == document3 || a.ownerDocument == preferredDoc && contains(preferredDoc, a)) {
                  return -1;
                }
                if (b == document3 || b.ownerDocument == preferredDoc && contains(preferredDoc, b)) {
                  return 1;
                }
                return sortInput ? indexOf2(sortInput, a) - indexOf2(sortInput, b) : 0;
              }
              return compare & 4 ? -1 : 1;
            } : function(a, b) {
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }
              var cur, i2 = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
              if (!aup || !bup) {
                return a == document3 ? -1 : b == document3 ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf2(sortInput, a) - indexOf2(sortInput, b) : 0;
              } else if (aup === bup) {
                return siblingCheck(a, b);
              }
              cur = a;
              while (cur = cur.parentNode) {
                ap.unshift(cur);
              }
              cur = b;
              while (cur = cur.parentNode) {
                bp.unshift(cur);
              }
              while (ap[i2] === bp[i2]) {
                i2++;
              }
              return i2 ? siblingCheck(ap[i2], bp[i2]) : ap[i2] == preferredDoc ? -1 : bp[i2] == preferredDoc ? 1 : 0;
            };
            return document3;
          };
          Sizzle2.matches = function(expr, elements) {
            return Sizzle2(expr, null, null, elements);
          };
          Sizzle2.matchesSelector = function(elem2, expr) {
            setDocument(elem2);
            if (support2.matchesSelector && documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
              try {
                var ret = matches.call(elem2, expr);
                if (ret || support2.disconnectedMatch || elem2.document && elem2.document.nodeType !== 11) {
                  return ret;
                }
              } catch (e) {
                nonnativeSelectorCache(expr, true);
              }
            }
            return Sizzle2(expr, document3, null, [elem2]).length > 0;
          };
          Sizzle2.contains = function(context, elem2) {
            if ((context.ownerDocument || context) != document3) {
              setDocument(context);
            }
            return contains(context, elem2);
          };
          Sizzle2.attr = function(elem2, name2) {
            if ((elem2.ownerDocument || elem2) != document3) {
              setDocument(elem2);
            }
            var fn = Expr.attrHandle[name2.toLowerCase()], val2 = fn && hasOwn2.call(Expr.attrHandle, name2.toLowerCase()) ? fn(elem2, name2, !documentIsHTML) : void 0;
            return val2 !== void 0 ? val2 : support2.attributes || !documentIsHTML ? elem2.getAttribute(name2) : (val2 = elem2.getAttributeNode(name2)) && val2.specified ? val2.value : null;
          };
          Sizzle2.escape = function(sel) {
            return (sel + "").replace(rcssescape, fcssescape);
          };
          Sizzle2.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
          };
          Sizzle2.uniqueSort = function(results) {
            var elem2, duplicates = [], j = 0, i2 = 0;
            hasDuplicate = !support2.detectDuplicates;
            sortInput = !support2.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
              while (elem2 = results[i2++]) {
                if (elem2 === results[i2]) {
                  j = duplicates.push(i2);
                }
              }
              while (j--) {
                results.splice(duplicates[j], 1);
              }
            }
            sortInput = null;
            return results;
          };
          getText = Sizzle2.getText = function(elem2) {
            var node, ret = "", i2 = 0, nodeType = elem2.nodeType;
            if (!nodeType) {
              while (node = elem2[i2++]) {
                ret += getText(node);
              }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
              if (typeof elem2.textContent === "string") {
                return elem2.textContent;
              } else {
                for (elem2 = elem2.firstChild; elem2; elem2 = elem2.nextSibling) {
                  ret += getText(elem2);
                }
              }
            } else if (nodeType === 3 || nodeType === 4) {
              return elem2.nodeValue;
            }
            return ret;
          };
          Expr = Sizzle2.selectors = {
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: true },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: true },
              "~": { dir: "previousSibling" }
            },
            preFilter: {
              "ATTR": function(match) {
                match[1] = match[1].replace(runescape, funescape);
                match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                if (match[2] === "~=") {
                  match[3] = " " + match[3] + " ";
                }
                return match.slice(0, 4);
              },
              "CHILD": function(match) {
                match[1] = match[1].toLowerCase();
                if (match[1].slice(0, 3) === "nth") {
                  if (!match[3]) {
                    Sizzle2.error(match[0]);
                  }
                  match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                  match[5] = +(match[7] + match[8] || match[3] === "odd");
                } else if (match[3]) {
                  Sizzle2.error(match[0]);
                }
                return match;
              },
              "PSEUDO": function(match) {
                var excess, unquoted = !match[6] && match[2];
                if (matchExpr["CHILD"].test(match[0])) {
                  return null;
                }
                if (match[3]) {
                  match[2] = match[4] || match[5] || "";
                } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                  match[0] = match[0].slice(0, excess);
                  match[2] = unquoted.slice(0, excess);
                }
                return match.slice(0, 3);
              }
            },
            filter: {
              "TAG": function(nodeNameSelector) {
                var nodeName2 = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                return nodeNameSelector === "*" ? function() {
                  return true;
                } : function(elem2) {
                  return elem2.nodeName && elem2.nodeName.toLowerCase() === nodeName2;
                };
              },
              "CLASS": function(className) {
                var pattern = classCache[className + " "];
                return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(
                  className,
                  function(elem2) {
                    return pattern.test(
                      typeof elem2.className === "string" && elem2.className || typeof elem2.getAttribute !== "undefined" && elem2.getAttribute("class") || ""
                    );
                  }
                );
              },
              "ATTR": function(name2, operator, check) {
                return function(elem2) {
                  var result = Sizzle2.attr(elem2, name2);
                  if (result == null) {
                    return operator === "!=";
                  }
                  if (!operator) {
                    return true;
                  }
                  result += "";
                  return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                };
              },
              "CHILD": function(type, what, _argument, first, last) {
                var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                return first === 1 && last === 0 ? function(elem2) {
                  return !!elem2.parentNode;
                } : function(elem2, _context, xml) {
                  var cache2, uniqueCache, outerCache, node, nodeIndex, start, dir2 = simple !== forward ? "nextSibling" : "previousSibling", parent2 = elem2.parentNode, name2 = ofType && elem2.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                  if (parent2) {
                    if (simple) {
                      while (dir2) {
                        node = elem2;
                        while (node = node[dir2]) {
                          if (ofType ? node.nodeName.toLowerCase() === name2 : node.nodeType === 1) {
                            return false;
                          }
                        }
                        start = dir2 = type === "only" && !start && "nextSibling";
                      }
                      return true;
                    }
                    start = [forward ? parent2.firstChild : parent2.lastChild];
                    if (forward && useCache) {
                      node = parent2;
                      outerCache = node[expando] || (node[expando] = {});
                      uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                      cache2 = uniqueCache[type] || [];
                      nodeIndex = cache2[0] === dirruns && cache2[1];
                      diff = nodeIndex && cache2[2];
                      node = nodeIndex && parent2.childNodes[nodeIndex];
                      while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                        if (node.nodeType === 1 && ++diff && node === elem2) {
                          uniqueCache[type] = [dirruns, nodeIndex, diff];
                          break;
                        }
                      }
                    } else {
                      if (useCache) {
                        node = elem2;
                        outerCache = node[expando] || (node[expando] = {});
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        cache2 = uniqueCache[type] || [];
                        nodeIndex = cache2[0] === dirruns && cache2[1];
                        diff = nodeIndex;
                      }
                      if (diff === false) {
                        while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                          if ((ofType ? node.nodeName.toLowerCase() === name2 : node.nodeType === 1) && ++diff) {
                            if (useCache) {
                              outerCache = node[expando] || (node[expando] = {});
                              uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                              uniqueCache[type] = [dirruns, diff];
                            }
                            if (node === elem2) {
                              break;
                            }
                          }
                        }
                      }
                    }
                    diff -= last;
                    return diff === first || diff % first === 0 && diff / first >= 0;
                  }
                };
              },
              "PSEUDO": function(pseudo, argument) {
                var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle2.error("unsupported pseudo: " + pseudo);
                if (fn[expando]) {
                  return fn(argument);
                }
                if (fn.length > 1) {
                  args = [pseudo, pseudo, "", argument];
                  return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches2) {
                    var idx, matched = fn(seed, argument), i2 = matched.length;
                    while (i2--) {
                      idx = indexOf2(seed, matched[i2]);
                      seed[idx] = !(matches2[idx] = matched[i2]);
                    }
                  }) : function(elem2) {
                    return fn(elem2, 0, args);
                  };
                }
                return fn;
              }
            },
            pseudos: {
              "not": markFunction(function(selector) {
                var input = [], results = [], matcher = compile(selector.replace(rtrim2, "$1"));
                return matcher[expando] ? markFunction(function(seed, matches2, _context, xml) {
                  var elem2, unmatched = matcher(seed, null, xml, []), i2 = seed.length;
                  while (i2--) {
                    if (elem2 = unmatched[i2]) {
                      seed[i2] = !(matches2[i2] = elem2);
                    }
                  }
                }) : function(elem2, _context, xml) {
                  input[0] = elem2;
                  matcher(input, null, xml, results);
                  input[0] = null;
                  return !results.pop();
                };
              }),
              "has": markFunction(function(selector) {
                return function(elem2) {
                  return Sizzle2(selector, elem2).length > 0;
                };
              }),
              "contains": markFunction(function(text2) {
                text2 = text2.replace(runescape, funescape);
                return function(elem2) {
                  return (elem2.textContent || getText(elem2)).indexOf(text2) > -1;
                };
              }),
              "lang": markFunction(function(lang) {
                if (!ridentifier.test(lang || "")) {
                  Sizzle2.error("unsupported lang: " + lang);
                }
                lang = lang.replace(runescape, funescape).toLowerCase();
                return function(elem2) {
                  var elemLang;
                  do {
                    if (elemLang = documentIsHTML ? elem2.lang : elem2.getAttribute("xml:lang") || elem2.getAttribute("lang")) {
                      elemLang = elemLang.toLowerCase();
                      return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                    }
                  } while ((elem2 = elem2.parentNode) && elem2.nodeType === 1);
                  return false;
                };
              }),
              "target": function(elem2) {
                var hash = window3.location && window3.location.hash;
                return hash && hash.slice(1) === elem2.id;
              },
              "root": function(elem2) {
                return elem2 === docElem;
              },
              "focus": function(elem2) {
                return elem2 === document3.activeElement && (!document3.hasFocus || document3.hasFocus()) && !!(elem2.type || elem2.href || ~elem2.tabIndex);
              },
              "enabled": createDisabledPseudo(false),
              "disabled": createDisabledPseudo(true),
              "checked": function(elem2) {
                var nodeName2 = elem2.nodeName.toLowerCase();
                return nodeName2 === "input" && !!elem2.checked || nodeName2 === "option" && !!elem2.selected;
              },
              "selected": function(elem2) {
                if (elem2.parentNode) {
                  elem2.parentNode.selectedIndex;
                }
                return elem2.selected === true;
              },
              "empty": function(elem2) {
                for (elem2 = elem2.firstChild; elem2; elem2 = elem2.nextSibling) {
                  if (elem2.nodeType < 6) {
                    return false;
                  }
                }
                return true;
              },
              "parent": function(elem2) {
                return !Expr.pseudos["empty"](elem2);
              },
              "header": function(elem2) {
                return rheader.test(elem2.nodeName);
              },
              "input": function(elem2) {
                return rinputs.test(elem2.nodeName);
              },
              "button": function(elem2) {
                var name2 = elem2.nodeName.toLowerCase();
                return name2 === "input" && elem2.type === "button" || name2 === "button";
              },
              "text": function(elem2) {
                var attr;
                return elem2.nodeName.toLowerCase() === "input" && elem2.type === "text" && ((attr = elem2.getAttribute("type")) == null || attr.toLowerCase() === "text");
              },
              "first": createPositionalPseudo(function() {
                return [0];
              }),
              "last": createPositionalPseudo(function(_matchIndexes, length2) {
                return [length2 - 1];
              }),
              "eq": createPositionalPseudo(function(_matchIndexes, length2, argument) {
                return [argument < 0 ? argument + length2 : argument];
              }),
              "even": createPositionalPseudo(function(matchIndexes, length2) {
                var i2 = 0;
                for (; i2 < length2; i2 += 2) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              "odd": createPositionalPseudo(function(matchIndexes, length2) {
                var i2 = 1;
                for (; i2 < length2; i2 += 2) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              "lt": createPositionalPseudo(function(matchIndexes, length2, argument) {
                var i2 = argument < 0 ? argument + length2 : argument > length2 ? length2 : argument;
                for (; --i2 >= 0; ) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              "gt": createPositionalPseudo(function(matchIndexes, length2, argument) {
                var i2 = argument < 0 ? argument + length2 : argument;
                for (; ++i2 < length2; ) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              })
            }
          };
          Expr.pseudos["nth"] = Expr.pseudos["eq"];
          for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
            Expr.pseudos[i] = createInputPseudo(i);
          }
          for (i in { submit: true, reset: true }) {
            Expr.pseudos[i] = createButtonPseudo(i);
          }
          function setFilters() {
          }
          setFilters.prototype = Expr.filters = Expr.pseudos;
          Expr.setFilters = new setFilters();
          tokenize = Sizzle2.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
              return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
              if (!matched || (match = rcomma.exec(soFar))) {
                if (match) {
                  soFar = soFar.slice(match[0].length) || soFar;
                }
                groups.push(tokens = []);
              }
              matched = false;
              if (match = rcombinators.exec(soFar)) {
                matched = match.shift();
                tokens.push({
                  value: matched,
                  type: match[0].replace(rtrim2, " ")
                });
                soFar = soFar.slice(matched.length);
              }
              for (type in Expr.filter) {
                if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                  matched = match.shift();
                  tokens.push({
                    value: matched,
                    type,
                    matches: match
                  });
                  soFar = soFar.slice(matched.length);
                }
              }
              if (!matched) {
                break;
              }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle2.error(selector) : tokenCache(selector, groups).slice(0);
          };
          function toSelector(tokens) {
            var i2 = 0, len = tokens.length, selector = "";
            for (; i2 < len; i2++) {
              selector += tokens[i2].value;
            }
            return selector;
          }
          function addCombinator(matcher, combinator, base) {
            var dir2 = combinator.dir, skip = combinator.next, key2 = skip || dir2, checkNonElements = base && key2 === "parentNode", doneName = done++;
            return combinator.first ? function(elem2, context, xml) {
              while (elem2 = elem2[dir2]) {
                if (elem2.nodeType === 1 || checkNonElements) {
                  return matcher(elem2, context, xml);
                }
              }
              return false;
            } : function(elem2, context, xml) {
              var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName];
              if (xml) {
                while (elem2 = elem2[dir2]) {
                  if (elem2.nodeType === 1 || checkNonElements) {
                    if (matcher(elem2, context, xml)) {
                      return true;
                    }
                  }
                }
              } else {
                while (elem2 = elem2[dir2]) {
                  if (elem2.nodeType === 1 || checkNonElements) {
                    outerCache = elem2[expando] || (elem2[expando] = {});
                    uniqueCache = outerCache[elem2.uniqueID] || (outerCache[elem2.uniqueID] = {});
                    if (skip && skip === elem2.nodeName.toLowerCase()) {
                      elem2 = elem2[dir2] || elem2;
                    } else if ((oldCache = uniqueCache[key2]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                      return newCache[2] = oldCache[2];
                    } else {
                      uniqueCache[key2] = newCache;
                      if (newCache[2] = matcher(elem2, context, xml)) {
                        return true;
                      }
                    }
                  }
                }
              }
              return false;
            };
          }
          function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem2, context, xml) {
              var i2 = matchers.length;
              while (i2--) {
                if (!matchers[i2](elem2, context, xml)) {
                  return false;
                }
              }
              return true;
            } : matchers[0];
          }
          function multipleContexts(selector, contexts, results) {
            var i2 = 0, len = contexts.length;
            for (; i2 < len; i2++) {
              Sizzle2(selector, contexts[i2], results);
            }
            return results;
          }
          function condense(unmatched, map, filter, context, xml) {
            var elem2, newUnmatched = [], i2 = 0, len = unmatched.length, mapped = map != null;
            for (; i2 < len; i2++) {
              if (elem2 = unmatched[i2]) {
                if (!filter || filter(elem2, context, xml)) {
                  newUnmatched.push(elem2);
                  if (mapped) {
                    map.push(i2);
                  }
                }
              }
            }
            return newUnmatched;
          }
          function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
              postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
              postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function(seed, results, context, xml) {
              var temp, i2, elem2, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(
                selector || "*",
                context.nodeType ? [context] : context,
                []
              ), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
              if (matcher) {
                matcher(matcherIn, matcherOut, context, xml);
              }
              if (postFilter) {
                temp = condense(matcherOut, postMap);
                postFilter(temp, [], context, xml);
                i2 = temp.length;
                while (i2--) {
                  if (elem2 = temp[i2]) {
                    matcherOut[postMap[i2]] = !(matcherIn[postMap[i2]] = elem2);
                  }
                }
              }
              if (seed) {
                if (postFinder || preFilter) {
                  if (postFinder) {
                    temp = [];
                    i2 = matcherOut.length;
                    while (i2--) {
                      if (elem2 = matcherOut[i2]) {
                        temp.push(matcherIn[i2] = elem2);
                      }
                    }
                    postFinder(null, matcherOut = [], temp, xml);
                  }
                  i2 = matcherOut.length;
                  while (i2--) {
                    if ((elem2 = matcherOut[i2]) && (temp = postFinder ? indexOf2(seed, elem2) : preMap[i2]) > -1) {
                      seed[temp] = !(results[temp] = elem2);
                    }
                  }
                }
              } else {
                matcherOut = condense(
                  matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut
                );
                if (postFinder) {
                  postFinder(null, results, matcherOut, xml);
                } else {
                  push2.apply(results, matcherOut);
                }
              }
            });
          }
          function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i2 = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem2) {
              return elem2 === checkContext;
            }, implicitRelative, true), matchAnyContext = addCombinator(function(elem2) {
              return indexOf2(checkContext, elem2) > -1;
            }, implicitRelative, true), matchers = [function(elem2, context, xml) {
              var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem2, context, xml) : matchAnyContext(elem2, context, xml));
              checkContext = null;
              return ret;
            }];
            for (; i2 < len; i2++) {
              if (matcher = Expr.relative[tokens[i2].type]) {
                matchers = [addCombinator(elementMatcher(matchers), matcher)];
              } else {
                matcher = Expr.filter[tokens[i2].type].apply(null, tokens[i2].matches);
                if (matcher[expando]) {
                  j = ++i2;
                  for (; j < len; j++) {
                    if (Expr.relative[tokens[j].type]) {
                      break;
                    }
                  }
                  return setMatcher(
                    i2 > 1 && elementMatcher(matchers),
                    i2 > 1 && toSelector(
                      tokens.slice(0, i2 - 1).concat({ value: tokens[i2 - 2].type === " " ? "*" : "" })
                    ).replace(rtrim2, "$1"),
                    matcher,
                    i2 < j && matcherFromTokens(tokens.slice(i2, j)),
                    j < len && matcherFromTokens(tokens = tokens.slice(j)),
                    j < len && toSelector(tokens)
                  );
                }
                matchers.push(matcher);
              }
            }
            return elementMatcher(matchers);
          }
          function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
              var elem2, j, matcher, matchedCount = 0, i2 = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find["TAG"]("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
              if (outermost) {
                outermostContext = context == document3 || context || outermost;
              }
              for (; i2 !== len && (elem2 = elems[i2]) != null; i2++) {
                if (byElement && elem2) {
                  j = 0;
                  if (!context && elem2.ownerDocument != document3) {
                    setDocument(elem2);
                    xml = !documentIsHTML;
                  }
                  while (matcher = elementMatchers[j++]) {
                    if (matcher(elem2, context || document3, xml)) {
                      results.push(elem2);
                      break;
                    }
                  }
                  if (outermost) {
                    dirruns = dirrunsUnique;
                  }
                }
                if (bySet) {
                  if (elem2 = !matcher && elem2) {
                    matchedCount--;
                  }
                  if (seed) {
                    unmatched.push(elem2);
                  }
                }
              }
              matchedCount += i2;
              if (bySet && i2 !== matchedCount) {
                j = 0;
                while (matcher = setMatchers[j++]) {
                  matcher(unmatched, setMatched, context, xml);
                }
                if (seed) {
                  if (matchedCount > 0) {
                    while (i2--) {
                      if (!(unmatched[i2] || setMatched[i2])) {
                        setMatched[i2] = pop.call(results);
                      }
                    }
                  }
                  setMatched = condense(setMatched);
                }
                push2.apply(results, setMatched);
                if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                  Sizzle2.uniqueSort(results);
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
                outermostContext = contextBackup;
              }
              return unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
          }
          compile = Sizzle2.compile = function(selector, match) {
            var i2, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
              if (!match) {
                match = tokenize(selector);
              }
              i2 = match.length;
              while (i2--) {
                cached = matcherFromTokens(match[i2]);
                if (cached[expando]) {
                  setMatchers.push(cached);
                } else {
                  elementMatchers.push(cached);
                }
              }
              cached = compilerCache(
                selector,
                matcherFromGroupMatchers(elementMatchers, setMatchers)
              );
              cached.selector = selector;
            }
            return cached;
          };
          select = Sizzle2.select = function(selector, context, results, seed) {
            var i2, tokens, token, type, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            results = results || [];
            if (match.length === 1) {
              tokens = match[0] = match[0].slice(0);
              if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                if (!context) {
                  return results;
                } else if (compiled) {
                  context = context.parentNode;
                }
                selector = selector.slice(tokens.shift().value.length);
              }
              i2 = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
              while (i2--) {
                token = tokens[i2];
                if (Expr.relative[type = token.type]) {
                  break;
                }
                if (find = Expr.find[type]) {
                  if (seed = find(
                    token.matches[0].replace(runescape, funescape),
                    rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                  )) {
                    tokens.splice(i2, 1);
                    selector = seed.length && toSelector(tokens);
                    if (!selector) {
                      push2.apply(results, seed);
                      return results;
                    }
                    break;
                  }
                }
              }
            }
            (compiled || compile(selector, match))(
              seed,
              context,
              !documentIsHTML,
              results,
              !context || rsibling.test(selector) && testContext(context.parentNode) || context
            );
            return results;
          };
          support2.sortStable = expando.split("").sort(sortOrder).join("") === expando;
          support2.detectDuplicates = !!hasDuplicate;
          setDocument();
          support2.sortDetached = assert(function(el) {
            return el.compareDocumentPosition(document3.createElement("fieldset")) & 1;
          });
          if (!assert(function(el) {
            el.innerHTML = "<a href='#'></a>";
            return el.firstChild.getAttribute("href") === "#";
          })) {
            addHandle("type|href|height|width", function(elem2, name2, isXML2) {
              if (!isXML2) {
                return elem2.getAttribute(name2, name2.toLowerCase() === "type" ? 1 : 2);
              }
            });
          }
          if (!support2.attributes || !assert(function(el) {
            el.innerHTML = "<input/>";
            el.firstChild.setAttribute("value", "");
            return el.firstChild.getAttribute("value") === "";
          })) {
            addHandle("value", function(elem2, _name, isXML2) {
              if (!isXML2 && elem2.nodeName.toLowerCase() === "input") {
                return elem2.defaultValue;
              }
            });
          }
          if (!assert(function(el) {
            return el.getAttribute("disabled") == null;
          })) {
            addHandle(booleans, function(elem2, name2, isXML2) {
              var val2;
              if (!isXML2) {
                return elem2[name2] === true ? name2.toLowerCase() : (val2 = elem2.getAttributeNode(name2)) && val2.specified ? val2.value : null;
              }
            });
          }
          return Sizzle2;
        }(window2);
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.pseudos;
        jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
        jQuery.escapeSelector = Sizzle.escape;
        var dir = function(elem2, dir2, until) {
          var matched = [], truncate = until !== void 0;
          while ((elem2 = elem2[dir2]) && elem2.nodeType !== 9) {
            if (elem2.nodeType === 1) {
              if (truncate && jQuery(elem2).is(until)) {
                break;
              }
              matched.push(elem2);
            }
          }
          return matched;
        };
        var siblings = function(n, elem2) {
          var matched = [];
          for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem2) {
              matched.push(n);
            }
          }
          return matched;
        };
        var rneedsContext = jQuery.expr.match.needsContext;
        function nodeName(elem2, name2) {
          return elem2.nodeName && elem2.nodeName.toLowerCase() === name2.toLowerCase();
        }
        var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        function winnow(elements, qualifier, not) {
          if (isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem2, i) {
              return !!qualifier.call(elem2, i, elem2) !== not;
            });
          }
          if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem2) {
              return elem2 === qualifier !== not;
            });
          }
          if (typeof qualifier !== "string") {
            return jQuery.grep(elements, function(elem2) {
              return indexOf.call(qualifier, elem2) > -1 !== not;
            });
          }
          return jQuery.filter(qualifier, elements, not);
        }
        jQuery.filter = function(expr, elems, not) {
          var elem2 = elems[0];
          if (not) {
            expr = ":not(" + expr + ")";
          }
          if (elems.length === 1 && elem2.nodeType === 1) {
            return jQuery.find.matchesSelector(elem2, expr) ? [elem2] : [];
          }
          return jQuery.find.matches(expr, jQuery.grep(elems, function(elem3) {
            return elem3.nodeType === 1;
          }));
        };
        jQuery.fn.extend({
          find: function(selector) {
            var i, ret, len = this.length, self = this;
            if (typeof selector !== "string") {
              return this.pushStack(jQuery(selector).filter(function() {
                for (i = 0; i < len; i++) {
                  if (jQuery.contains(self[i], this)) {
                    return true;
                  }
                }
              }));
            }
            ret = this.pushStack([]);
            for (i = 0; i < len; i++) {
              jQuery.find(selector, self[i], ret);
            }
            return len > 1 ? jQuery.uniqueSort(ret) : ret;
          },
          filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false));
          },
          not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
          },
          is: function(selector) {
            return !!winnow(
              this,
              typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [],
              false
            ).length;
          }
        });
        var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery.fn.init = function(selector, context, root) {
          var match, elem2;
          if (!selector) {
            return this;
          }
          root = root || rootjQuery;
          if (typeof selector === "string") {
            if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
              match = [null, selector, null];
            } else {
              match = rquickExpr.exec(selector);
            }
            if (match && (match[1] || !context)) {
              if (match[1]) {
                context = context instanceof jQuery ? context[0] : context;
                jQuery.merge(this, jQuery.parseHTML(
                  match[1],
                  context && context.nodeType ? context.ownerDocument || context : document2,
                  true
                ));
                if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                  for (match in context) {
                    if (isFunction(this[match])) {
                      this[match](context[match]);
                    } else {
                      this.attr(match, context[match]);
                    }
                  }
                }
                return this;
              } else {
                elem2 = document2.getElementById(match[2]);
                if (elem2) {
                  this[0] = elem2;
                  this.length = 1;
                }
                return this;
              }
            } else if (!context || context.jquery) {
              return (context || root).find(selector);
            } else {
              return this.constructor(context).find(selector);
            }
          } else if (selector.nodeType) {
            this[0] = selector;
            this.length = 1;
            return this;
          } else if (isFunction(selector)) {
            return root.ready !== void 0 ? root.ready(selector) : selector(jQuery);
          }
          return jQuery.makeArray(selector, this);
        };
        init.prototype = jQuery.fn;
        rootjQuery = jQuery(document2);
        var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
          children: true,
          contents: true,
          next: true,
          prev: true
        };
        jQuery.fn.extend({
          has: function(target) {
            var targets = jQuery(target, this), l = targets.length;
            return this.filter(function() {
              var i = 0;
              for (; i < l; i++) {
                if (jQuery.contains(this, targets[i])) {
                  return true;
                }
              }
            });
          },
          closest: function(selectors, context) {
            var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery(selectors);
            if (!rneedsContext.test(selectors)) {
              for (; i < l; i++) {
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                  if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
                    matched.push(cur);
                    break;
                  }
                }
              }
            }
            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
          },
          index: function(elem2) {
            if (!elem2) {
              return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            }
            if (typeof elem2 === "string") {
              return indexOf.call(jQuery(elem2), this[0]);
            }
            return indexOf.call(
              this,
              elem2.jquery ? elem2[0] : elem2
            );
          },
          add: function(selector, context) {
            return this.pushStack(
              jQuery.uniqueSort(
                jQuery.merge(this.get(), jQuery(selector, context))
              )
            );
          },
          addBack: function(selector) {
            return this.add(
              selector == null ? this.prevObject : this.prevObject.filter(selector)
            );
          }
        });
        function sibling(cur, dir2) {
          while ((cur = cur[dir2]) && cur.nodeType !== 1) {
          }
          return cur;
        }
        jQuery.each({
          parent: function(elem2) {
            var parent2 = elem2.parentNode;
            return parent2 && parent2.nodeType !== 11 ? parent2 : null;
          },
          parents: function(elem2) {
            return dir(elem2, "parentNode");
          },
          parentsUntil: function(elem2, _i, until) {
            return dir(elem2, "parentNode", until);
          },
          next: function(elem2) {
            return sibling(elem2, "nextSibling");
          },
          prev: function(elem2) {
            return sibling(elem2, "previousSibling");
          },
          nextAll: function(elem2) {
            return dir(elem2, "nextSibling");
          },
          prevAll: function(elem2) {
            return dir(elem2, "previousSibling");
          },
          nextUntil: function(elem2, _i, until) {
            return dir(elem2, "nextSibling", until);
          },
          prevUntil: function(elem2, _i, until) {
            return dir(elem2, "previousSibling", until);
          },
          siblings: function(elem2) {
            return siblings((elem2.parentNode || {}).firstChild, elem2);
          },
          children: function(elem2) {
            return siblings(elem2.firstChild);
          },
          contents: function(elem2) {
            if (elem2.contentDocument != null && getProto(elem2.contentDocument)) {
              return elem2.contentDocument;
            }
            if (nodeName(elem2, "template")) {
              elem2 = elem2.content || elem2;
            }
            return jQuery.merge([], elem2.childNodes);
          }
        }, function(name2, fn) {
          jQuery.fn[name2] = function(until, selector) {
            var matched = jQuery.map(this, fn, until);
            if (name2.slice(-5) !== "Until") {
              selector = until;
            }
            if (selector && typeof selector === "string") {
              matched = jQuery.filter(selector, matched);
            }
            if (this.length > 1) {
              if (!guaranteedUnique[name2]) {
                jQuery.uniqueSort(matched);
              }
              if (rparentsprev.test(name2)) {
                matched.reverse();
              }
            }
            return this.pushStack(matched);
          };
        });
        var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
        function createOptions(options) {
          var object = {};
          jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
            object[flag] = true;
          });
          return object;
        }
        jQuery.Callbacks = function(options) {
          options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
          var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
            locked = locked || options.once;
            fired = firing = true;
            for (; queue.length; firingIndex = -1) {
              memory = queue.shift();
              while (++firingIndex < list.length) {
                if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                  firingIndex = list.length;
                  memory = false;
                }
              }
            }
            if (!options.memory) {
              memory = false;
            }
            firing = false;
            if (locked) {
              if (memory) {
                list = [];
              } else {
                list = "";
              }
            }
          }, self = {
            add: function() {
              if (list) {
                if (memory && !firing) {
                  firingIndex = list.length - 1;
                  queue.push(memory);
                }
                (function add2(args) {
                  jQuery.each(args, function(_, arg) {
                    if (isFunction(arg)) {
                      if (!options.unique || !self.has(arg)) {
                        list.push(arg);
                      }
                    } else if (arg && arg.length && toType(arg) !== "string") {
                      add2(arg);
                    }
                  });
                })(arguments);
                if (memory && !firing) {
                  fire();
                }
              }
              return this;
            },
            remove: function() {
              jQuery.each(arguments, function(_, arg) {
                var index2;
                while ((index2 = jQuery.inArray(arg, list, index2)) > -1) {
                  list.splice(index2, 1);
                  if (index2 <= firingIndex) {
                    firingIndex--;
                  }
                }
              });
              return this;
            },
            has: function(fn) {
              return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
            },
            empty: function() {
              if (list) {
                list = [];
              }
              return this;
            },
            disable: function() {
              locked = queue = [];
              list = memory = "";
              return this;
            },
            disabled: function() {
              return !list;
            },
            lock: function() {
              locked = queue = [];
              if (!memory && !firing) {
                list = memory = "";
              }
              return this;
            },
            locked: function() {
              return !!locked;
            },
            fireWith: function(context, args) {
              if (!locked) {
                args = args || [];
                args = [context, args.slice ? args.slice() : args];
                queue.push(args);
                if (!firing) {
                  fire();
                }
              }
              return this;
            },
            fire: function() {
              self.fireWith(this, arguments);
              return this;
            },
            fired: function() {
              return !!fired;
            }
          };
          return self;
        };
        function Identity(v) {
          return v;
        }
        function Thrower(ex) {
          throw ex;
        }
        function adoptValue(value2, resolve, reject, noValue) {
          var method;
          try {
            if (value2 && isFunction(method = value2.promise)) {
              method.call(value2).done(resolve).fail(reject);
            } else if (value2 && isFunction(method = value2.then)) {
              method.call(value2, resolve, reject);
            } else {
              resolve.apply(void 0, [value2].slice(noValue));
            }
          } catch (value3) {
            reject.apply(void 0, [value3]);
          }
        }
        jQuery.extend({
          Deferred: function(func) {
            var tuples = [
              [
                "notify",
                "progress",
                jQuery.Callbacks("memory"),
                jQuery.Callbacks("memory"),
                2
              ],
              [
                "resolve",
                "done",
                jQuery.Callbacks("once memory"),
                jQuery.Callbacks("once memory"),
                0,
                "resolved"
              ],
              [
                "reject",
                "fail",
                jQuery.Callbacks("once memory"),
                jQuery.Callbacks("once memory"),
                1,
                "rejected"
              ]
            ], state = "pending", promise = {
              state: function() {
                return state;
              },
              always: function() {
                deferred.done(arguments).fail(arguments);
                return this;
              },
              "catch": function(fn) {
                return promise.then(null, fn);
              },
              pipe: function() {
                var fns = arguments;
                return jQuery.Deferred(function(newDefer) {
                  jQuery.each(tuples, function(_i, tuple) {
                    var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
                    deferred[tuple[1]](function() {
                      var returned = fn && fn.apply(this, arguments);
                      if (returned && isFunction(returned.promise)) {
                        returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                      } else {
                        newDefer[tuple[0] + "With"](
                          this,
                          fn ? [returned] : arguments
                        );
                      }
                    });
                  });
                  fns = null;
                }).promise();
              },
              then: function(onFulfilled, onRejected, onProgress) {
                var maxDepth = 0;
                function resolve(depth, deferred2, handler, special) {
                  return function() {
                    var that = this, args = arguments, mightThrow = function() {
                      var returned, then;
                      if (depth < maxDepth) {
                        return;
                      }
                      returned = handler.apply(that, args);
                      if (returned === deferred2.promise()) {
                        throw new TypeError("Thenable self-resolution");
                      }
                      then = returned && (typeof returned === "object" || typeof returned === "function") && returned.then;
                      if (isFunction(then)) {
                        if (special) {
                          then.call(
                            returned,
                            resolve(maxDepth, deferred2, Identity, special),
                            resolve(maxDepth, deferred2, Thrower, special)
                          );
                        } else {
                          maxDepth++;
                          then.call(
                            returned,
                            resolve(maxDepth, deferred2, Identity, special),
                            resolve(maxDepth, deferred2, Thrower, special),
                            resolve(
                              maxDepth,
                              deferred2,
                              Identity,
                              deferred2.notifyWith
                            )
                          );
                        }
                      } else {
                        if (handler !== Identity) {
                          that = void 0;
                          args = [returned];
                        }
                        (special || deferred2.resolveWith)(that, args);
                      }
                    }, process = special ? mightThrow : function() {
                      try {
                        mightThrow();
                      } catch (e) {
                        if (jQuery.Deferred.exceptionHook) {
                          jQuery.Deferred.exceptionHook(
                            e,
                            process.stackTrace
                          );
                        }
                        if (depth + 1 >= maxDepth) {
                          if (handler !== Thrower) {
                            that = void 0;
                            args = [e];
                          }
                          deferred2.rejectWith(that, args);
                        }
                      }
                    };
                    if (depth) {
                      process();
                    } else {
                      if (jQuery.Deferred.getStackHook) {
                        process.stackTrace = jQuery.Deferred.getStackHook();
                      }
                      window2.setTimeout(process);
                    }
                  };
                }
                return jQuery.Deferred(function(newDefer) {
                  tuples[0][3].add(
                    resolve(
                      0,
                      newDefer,
                      isFunction(onProgress) ? onProgress : Identity,
                      newDefer.notifyWith
                    )
                  );
                  tuples[1][3].add(
                    resolve(
                      0,
                      newDefer,
                      isFunction(onFulfilled) ? onFulfilled : Identity
                    )
                  );
                  tuples[2][3].add(
                    resolve(
                      0,
                      newDefer,
                      isFunction(onRejected) ? onRejected : Thrower
                    )
                  );
                }).promise();
              },
              promise: function(obj) {
                return obj != null ? jQuery.extend(obj, promise) : promise;
              }
            }, deferred = {};
            jQuery.each(tuples, function(i, tuple) {
              var list = tuple[2], stateString = tuple[5];
              promise[tuple[1]] = list.add;
              if (stateString) {
                list.add(
                  function() {
                    state = stateString;
                  },
                  tuples[3 - i][2].disable,
                  tuples[3 - i][3].disable,
                  tuples[0][2].lock,
                  tuples[0][3].lock
                );
              }
              list.add(tuple[3].fire);
              deferred[tuple[0]] = function() {
                deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments);
                return this;
              };
              deferred[tuple[0] + "With"] = list.fireWith;
            });
            promise.promise(deferred);
            if (func) {
              func.call(deferred, deferred);
            }
            return deferred;
          },
          when: function(singleValue) {
            var remaining = arguments.length, i = remaining, resolveContexts = Array(i), resolveValues = slice.call(arguments), primary = jQuery.Deferred(), updateFunc = function(i2) {
              return function(value2) {
                resolveContexts[i2] = this;
                resolveValues[i2] = arguments.length > 1 ? slice.call(arguments) : value2;
                if (!--remaining) {
                  primary.resolveWith(resolveContexts, resolveValues);
                }
              };
            };
            if (remaining <= 1) {
              adoptValue(
                singleValue,
                primary.done(updateFunc(i)).resolve,
                primary.reject,
                !remaining
              );
              if (primary.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
                return primary.then();
              }
            }
            while (i--) {
              adoptValue(resolveValues[i], updateFunc(i), primary.reject);
            }
            return primary.promise();
          }
        });
        var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        jQuery.Deferred.exceptionHook = function(error, stack) {
          if (window2.console && window2.console.warn && error && rerrorNames.test(error.name)) {
            window2.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
          }
        };
        jQuery.readyException = function(error) {
          window2.setTimeout(function() {
            throw error;
          });
        };
        var readyList = jQuery.Deferred();
        jQuery.fn.ready = function(fn) {
          readyList.then(fn).catch(function(error) {
            jQuery.readyException(error);
          });
          return this;
        };
        jQuery.extend({
          isReady: false,
          readyWait: 1,
          ready: function(wait) {
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
              return;
            }
            jQuery.isReady = true;
            if (wait !== true && --jQuery.readyWait > 0) {
              return;
            }
            readyList.resolveWith(document2, [jQuery]);
          }
        });
        jQuery.ready.then = readyList.then;
        function completed() {
          document2.removeEventListener("DOMContentLoaded", completed);
          window2.removeEventListener("load", completed);
          jQuery.ready();
        }
        if (document2.readyState === "complete" || document2.readyState !== "loading" && !document2.documentElement.doScroll) {
          window2.setTimeout(jQuery.ready);
        } else {
          document2.addEventListener("DOMContentLoaded", completed);
          window2.addEventListener("load", completed);
        }
        var access = function(elems, fn, key2, value2, chainable, emptyGet, raw) {
          var i = 0, len = elems.length, bulk = key2 == null;
          if (toType(key2) === "object") {
            chainable = true;
            for (i in key2) {
              access(elems, fn, i, key2[i], true, emptyGet, raw);
            }
          } else if (value2 !== void 0) {
            chainable = true;
            if (!isFunction(value2)) {
              raw = true;
            }
            if (bulk) {
              if (raw) {
                fn.call(elems, value2);
                fn = null;
              } else {
                bulk = fn;
                fn = function(elem2, _key, value3) {
                  return bulk.call(jQuery(elem2), value3);
                };
              }
            }
            if (fn) {
              for (; i < len; i++) {
                fn(
                  elems[i],
                  key2,
                  raw ? value2 : value2.call(elems[i], i, fn(elems[i], key2))
                );
              }
            }
          }
          if (chainable) {
            return elems;
          }
          if (bulk) {
            return fn.call(elems);
          }
          return len ? fn(elems[0], key2) : emptyGet;
        };
        var rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g;
        function fcamelCase(_all, letter) {
          return letter.toUpperCase();
        }
        function camelCase(string) {
          return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        }
        var acceptData = function(owner) {
          return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
        };
        function Data() {
          this.expando = jQuery.expando + Data.uid++;
        }
        Data.uid = 1;
        Data.prototype = {
          cache: function(owner) {
            var value2 = owner[this.expando];
            if (!value2) {
              value2 = {};
              if (acceptData(owner)) {
                if (owner.nodeType) {
                  owner[this.expando] = value2;
                } else {
                  Object.defineProperty(owner, this.expando, {
                    value: value2,
                    configurable: true
                  });
                }
              }
            }
            return value2;
          },
          set: function(owner, data2, value2) {
            var prop, cache2 = this.cache(owner);
            if (typeof data2 === "string") {
              cache2[camelCase(data2)] = value2;
            } else {
              for (prop in data2) {
                cache2[camelCase(prop)] = data2[prop];
              }
            }
            return cache2;
          },
          get: function(owner, key2) {
            return key2 === void 0 ? this.cache(owner) : owner[this.expando] && owner[this.expando][camelCase(key2)];
          },
          access: function(owner, key2, value2) {
            if (key2 === void 0 || key2 && typeof key2 === "string" && value2 === void 0) {
              return this.get(owner, key2);
            }
            this.set(owner, key2, value2);
            return value2 !== void 0 ? value2 : key2;
          },
          remove: function(owner, key2) {
            var i, cache2 = owner[this.expando];
            if (cache2 === void 0) {
              return;
            }
            if (key2 !== void 0) {
              if (Array.isArray(key2)) {
                key2 = key2.map(camelCase);
              } else {
                key2 = camelCase(key2);
                key2 = key2 in cache2 ? [key2] : key2.match(rnothtmlwhite) || [];
              }
              i = key2.length;
              while (i--) {
                delete cache2[key2[i]];
              }
            }
            if (key2 === void 0 || jQuery.isEmptyObject(cache2)) {
              if (owner.nodeType) {
                owner[this.expando] = void 0;
              } else {
                delete owner[this.expando];
              }
            }
          },
          hasData: function(owner) {
            var cache2 = owner[this.expando];
            return cache2 !== void 0 && !jQuery.isEmptyObject(cache2);
          }
        };
        var dataPriv = new Data();
        var dataUser = new Data();
        var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
        function getData(data2) {
          if (data2 === "true") {
            return true;
          }
          if (data2 === "false") {
            return false;
          }
          if (data2 === "null") {
            return null;
          }
          if (data2 === +data2 + "") {
            return +data2;
          }
          if (rbrace.test(data2)) {
            return JSON.parse(data2);
          }
          return data2;
        }
        function dataAttr(elem2, key2, data2) {
          var name2;
          if (data2 === void 0 && elem2.nodeType === 1) {
            name2 = "data-" + key2.replace(rmultiDash, "-$&").toLowerCase();
            data2 = elem2.getAttribute(name2);
            if (typeof data2 === "string") {
              try {
                data2 = getData(data2);
              } catch (e) {
              }
              dataUser.set(elem2, key2, data2);
            } else {
              data2 = void 0;
            }
          }
          return data2;
        }
        jQuery.extend({
          hasData: function(elem2) {
            return dataUser.hasData(elem2) || dataPriv.hasData(elem2);
          },
          data: function(elem2, name2, data2) {
            return dataUser.access(elem2, name2, data2);
          },
          removeData: function(elem2, name2) {
            dataUser.remove(elem2, name2);
          },
          _data: function(elem2, name2, data2) {
            return dataPriv.access(elem2, name2, data2);
          },
          _removeData: function(elem2, name2) {
            dataPriv.remove(elem2, name2);
          }
        });
        jQuery.fn.extend({
          data: function(key2, value2) {
            var i, name2, data2, elem2 = this[0], attrs = elem2 && elem2.attributes;
            if (key2 === void 0) {
              if (this.length) {
                data2 = dataUser.get(elem2);
                if (elem2.nodeType === 1 && !dataPriv.get(elem2, "hasDataAttrs")) {
                  i = attrs.length;
                  while (i--) {
                    if (attrs[i]) {
                      name2 = attrs[i].name;
                      if (name2.indexOf("data-") === 0) {
                        name2 = camelCase(name2.slice(5));
                        dataAttr(elem2, name2, data2[name2]);
                      }
                    }
                  }
                  dataPriv.set(elem2, "hasDataAttrs", true);
                }
              }
              return data2;
            }
            if (typeof key2 === "object") {
              return this.each(function() {
                dataUser.set(this, key2);
              });
            }
            return access(this, function(value3) {
              var data3;
              if (elem2 && value3 === void 0) {
                data3 = dataUser.get(elem2, key2);
                if (data3 !== void 0) {
                  return data3;
                }
                data3 = dataAttr(elem2, key2);
                if (data3 !== void 0) {
                  return data3;
                }
                return;
              }
              this.each(function() {
                dataUser.set(this, key2, value3);
              });
            }, null, value2, arguments.length > 1, null, true);
          },
          removeData: function(key2) {
            return this.each(function() {
              dataUser.remove(this, key2);
            });
          }
        });
        jQuery.extend({
          queue: function(elem2, type, data2) {
            var queue;
            if (elem2) {
              type = (type || "fx") + "queue";
              queue = dataPriv.get(elem2, type);
              if (data2) {
                if (!queue || Array.isArray(data2)) {
                  queue = dataPriv.access(elem2, type, jQuery.makeArray(data2));
                } else {
                  queue.push(data2);
                }
              }
              return queue || [];
            }
          },
          dequeue: function(elem2, type) {
            type = type || "fx";
            var queue = jQuery.queue(elem2, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem2, type), next = function() {
              jQuery.dequeue(elem2, type);
            };
            if (fn === "inprogress") {
              fn = queue.shift();
              startLength--;
            }
            if (fn) {
              if (type === "fx") {
                queue.unshift("inprogress");
              }
              delete hooks.stop;
              fn.call(elem2, next, hooks);
            }
            if (!startLength && hooks) {
              hooks.empty.fire();
            }
          },
          _queueHooks: function(elem2, type) {
            var key2 = type + "queueHooks";
            return dataPriv.get(elem2, key2) || dataPriv.access(elem2, key2, {
              empty: jQuery.Callbacks("once memory").add(function() {
                dataPriv.remove(elem2, [type + "queue", key2]);
              })
            });
          }
        });
        jQuery.fn.extend({
          queue: function(type, data2) {
            var setter = 2;
            if (typeof type !== "string") {
              data2 = type;
              type = "fx";
              setter--;
            }
            if (arguments.length < setter) {
              return jQuery.queue(this[0], type);
            }
            return data2 === void 0 ? this : this.each(function() {
              var queue = jQuery.queue(this, type, data2);
              jQuery._queueHooks(this, type);
              if (type === "fx" && queue[0] !== "inprogress") {
                jQuery.dequeue(this, type);
              }
            });
          },
          dequeue: function(type) {
            return this.each(function() {
              jQuery.dequeue(this, type);
            });
          },
          clearQueue: function(type) {
            return this.queue(type || "fx", []);
          },
          promise: function(type, obj) {
            var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
              if (!--count) {
                defer.resolveWith(elements, [elements]);
              }
            };
            if (typeof type !== "string") {
              obj = type;
              type = void 0;
            }
            type = type || "fx";
            while (i--) {
              tmp = dataPriv.get(elements[i], type + "queueHooks");
              if (tmp && tmp.empty) {
                count++;
                tmp.empty.add(resolve);
              }
            }
            resolve();
            return defer.promise(obj);
          }
        });
        var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
        var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
        var cssExpand = ["Top", "Right", "Bottom", "Left"];
        var documentElement = document2.documentElement;
        var isAttached = function(elem2) {
          return jQuery.contains(elem2.ownerDocument, elem2);
        }, composed = { composed: true };
        if (documentElement.getRootNode) {
          isAttached = function(elem2) {
            return jQuery.contains(elem2.ownerDocument, elem2) || elem2.getRootNode(composed) === elem2.ownerDocument;
          };
        }
        var isHiddenWithinTree = function(elem2, el) {
          elem2 = el || elem2;
          return elem2.style.display === "none" || elem2.style.display === "" && isAttached(elem2) && jQuery.css(elem2, "display") === "none";
        };
        function adjustCSS(elem2, prop, valueParts, tween) {
          var adjusted, scale2, maxIterations = 20, currentValue = tween ? function() {
            return tween.cur();
          } : function() {
            return jQuery.css(elem2, prop, "");
          }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = elem2.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem2, prop));
          if (initialInUnit && initialInUnit[3] !== unit) {
            initial = initial / 2;
            unit = unit || initialInUnit[3];
            initialInUnit = +initial || 1;
            while (maxIterations--) {
              jQuery.style(elem2, prop, initialInUnit + unit);
              if ((1 - scale2) * (1 - (scale2 = currentValue() / initial || 0.5)) <= 0) {
                maxIterations = 0;
              }
              initialInUnit = initialInUnit / scale2;
            }
            initialInUnit = initialInUnit * 2;
            jQuery.style(elem2, prop, initialInUnit + unit);
            valueParts = valueParts || [];
          }
          if (valueParts) {
            initialInUnit = +initialInUnit || +initial || 0;
            adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
            if (tween) {
              tween.unit = unit;
              tween.start = initialInUnit;
              tween.end = adjusted;
            }
          }
          return adjusted;
        }
        var defaultDisplayMap = {};
        function getDefaultDisplay(elem2) {
          var temp, doc = elem2.ownerDocument, nodeName2 = elem2.nodeName, display = defaultDisplayMap[nodeName2];
          if (display) {
            return display;
          }
          temp = doc.body.appendChild(doc.createElement(nodeName2));
          display = jQuery.css(temp, "display");
          temp.parentNode.removeChild(temp);
          if (display === "none") {
            display = "block";
          }
          defaultDisplayMap[nodeName2] = display;
          return display;
        }
        function showHide(elements, show) {
          var display, elem2, values = [], index2 = 0, length2 = elements.length;
          for (; index2 < length2; index2++) {
            elem2 = elements[index2];
            if (!elem2.style) {
              continue;
            }
            display = elem2.style.display;
            if (show) {
              if (display === "none") {
                values[index2] = dataPriv.get(elem2, "display") || null;
                if (!values[index2]) {
                  elem2.style.display = "";
                }
              }
              if (elem2.style.display === "" && isHiddenWithinTree(elem2)) {
                values[index2] = getDefaultDisplay(elem2);
              }
            } else {
              if (display !== "none") {
                values[index2] = "none";
                dataPriv.set(elem2, "display", display);
              }
            }
          }
          for (index2 = 0; index2 < length2; index2++) {
            if (values[index2] != null) {
              elements[index2].style.display = values[index2];
            }
          }
          return elements;
        }
        jQuery.fn.extend({
          show: function() {
            return showHide(this, true);
          },
          hide: function() {
            return showHide(this);
          },
          toggle: function(state) {
            if (typeof state === "boolean") {
              return state ? this.show() : this.hide();
            }
            return this.each(function() {
              if (isHiddenWithinTree(this)) {
                jQuery(this).show();
              } else {
                jQuery(this).hide();
              }
            });
          }
        });
        var rcheckableType = /^(?:checkbox|radio)$/i;
        var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
        var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
        (function() {
          var fragment = document2.createDocumentFragment(), div2 = fragment.appendChild(document2.createElement("div")), input = document2.createElement("input");
          input.setAttribute("type", "radio");
          input.setAttribute("checked", "checked");
          input.setAttribute("name", "t");
          div2.appendChild(input);
          support.checkClone = div2.cloneNode(true).cloneNode(true).lastChild.checked;
          div2.innerHTML = "<textarea>x</textarea>";
          support.noCloneChecked = !!div2.cloneNode(true).lastChild.defaultValue;
          div2.innerHTML = "<option></option>";
          support.option = !!div2.lastChild;
        })();
        var wrapMap = {
          thead: [1, "<table>", "</table>"],
          col: [2, "<table><colgroup>", "</colgroup></table>"],
          tr: [2, "<table><tbody>", "</tbody></table>"],
          td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
          _default: [0, "", ""]
        };
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;
        if (!support.option) {
          wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
        }
        function getAll(context, tag) {
          var ret;
          if (typeof context.getElementsByTagName !== "undefined") {
            ret = context.getElementsByTagName(tag || "*");
          } else if (typeof context.querySelectorAll !== "undefined") {
            ret = context.querySelectorAll(tag || "*");
          } else {
            ret = [];
          }
          if (tag === void 0 || tag && nodeName(context, tag)) {
            return jQuery.merge([context], ret);
          }
          return ret;
        }
        function setGlobalEval(elems, refElements) {
          var i = 0, l = elems.length;
          for (; i < l; i++) {
            dataPriv.set(
              elems[i],
              "globalEval",
              !refElements || dataPriv.get(refElements[i], "globalEval")
            );
          }
        }
        var rhtml = /<|&#?\w+;/;
        function buildFragment(elems, context, scripts2, selection, ignored) {
          var elem2, tmp, tag, wrap, attached, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
          for (; i < l; i++) {
            elem2 = elems[i];
            if (elem2 || elem2 === 0) {
              if (toType(elem2) === "object") {
                jQuery.merge(nodes, elem2.nodeType ? [elem2] : elem2);
              } else if (!rhtml.test(elem2)) {
                nodes.push(context.createTextNode(elem2));
              } else {
                tmp = tmp || fragment.appendChild(context.createElement("div"));
                tag = (rtagName.exec(elem2) || ["", ""])[1].toLowerCase();
                wrap = wrapMap[tag] || wrapMap._default;
                tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem2) + wrap[2];
                j = wrap[0];
                while (j--) {
                  tmp = tmp.lastChild;
                }
                jQuery.merge(nodes, tmp.childNodes);
                tmp = fragment.firstChild;
                tmp.textContent = "";
              }
            }
          }
          fragment.textContent = "";
          i = 0;
          while (elem2 = nodes[i++]) {
            if (selection && jQuery.inArray(elem2, selection) > -1) {
              if (ignored) {
                ignored.push(elem2);
              }
              continue;
            }
            attached = isAttached(elem2);
            tmp = getAll(fragment.appendChild(elem2), "script");
            if (attached) {
              setGlobalEval(tmp);
            }
            if (scripts2) {
              j = 0;
              while (elem2 = tmp[j++]) {
                if (rscriptType.test(elem2.type || "")) {
                  scripts2.push(elem2);
                }
              }
            }
          }
          return fragment;
        }
        var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
        function returnTrue() {
          return true;
        }
        function returnFalse() {
          return false;
        }
        function expectSync(elem2, type) {
          return elem2 === safeActiveElement() === (type === "focus");
        }
        function safeActiveElement() {
          try {
            return document2.activeElement;
          } catch (err) {
          }
        }
        function on(elem2, types, selector, data2, fn, one) {
          var origFn, type;
          if (typeof types === "object") {
            if (typeof selector !== "string") {
              data2 = data2 || selector;
              selector = void 0;
            }
            for (type in types) {
              on(elem2, type, selector, data2, types[type], one);
            }
            return elem2;
          }
          if (data2 == null && fn == null) {
            fn = selector;
            data2 = selector = void 0;
          } else if (fn == null) {
            if (typeof selector === "string") {
              fn = data2;
              data2 = void 0;
            } else {
              fn = data2;
              data2 = selector;
              selector = void 0;
            }
          }
          if (fn === false) {
            fn = returnFalse;
          } else if (!fn) {
            return elem2;
          }
          if (one === 1) {
            origFn = fn;
            fn = function(event) {
              jQuery().off(event);
              return origFn.apply(this, arguments);
            };
            fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
          }
          return elem2.each(function() {
            jQuery.event.add(this, types, fn, data2, selector);
          });
        }
        jQuery.event = {
          global: {},
          add: function(elem2, types, handler, data2, selector) {
            var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem2);
            if (!acceptData(elem2)) {
              return;
            }
            if (handler.handler) {
              handleObjIn = handler;
              handler = handleObjIn.handler;
              selector = handleObjIn.selector;
            }
            if (selector) {
              jQuery.find.matchesSelector(documentElement, selector);
            }
            if (!handler.guid) {
              handler.guid = jQuery.guid++;
            }
            if (!(events = elemData.events)) {
              events = elemData.events = /* @__PURE__ */ Object.create(null);
            }
            if (!(eventHandle = elemData.handle)) {
              eventHandle = elemData.handle = function(e) {
                return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem2, arguments) : void 0;
              };
            }
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
              tmp = rtypenamespace.exec(types[t]) || [];
              type = origType = tmp[1];
              namespaces = (tmp[2] || "").split(".").sort();
              if (!type) {
                continue;
              }
              special = jQuery.event.special[type] || {};
              type = (selector ? special.delegateType : special.bindType) || type;
              special = jQuery.event.special[type] || {};
              handleObj = jQuery.extend({
                type,
                origType,
                data: data2,
                handler,
                guid: handler.guid,
                selector,
                needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                namespace: namespaces.join(".")
              }, handleObjIn);
              if (!(handlers = events[type])) {
                handlers = events[type] = [];
                handlers.delegateCount = 0;
                if (!special.setup || special.setup.call(elem2, data2, namespaces, eventHandle) === false) {
                  if (elem2.addEventListener) {
                    elem2.addEventListener(type, eventHandle);
                  }
                }
              }
              if (special.add) {
                special.add.call(elem2, handleObj);
                if (!handleObj.handler.guid) {
                  handleObj.handler.guid = handler.guid;
                }
              }
              if (selector) {
                handlers.splice(handlers.delegateCount++, 0, handleObj);
              } else {
                handlers.push(handleObj);
              }
              jQuery.event.global[type] = true;
            }
          },
          remove: function(elem2, types, handler, selector, mappedTypes) {
            var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem2) && dataPriv.get(elem2);
            if (!elemData || !(events = elemData.events)) {
              return;
            }
            types = (types || "").match(rnothtmlwhite) || [""];
            t = types.length;
            while (t--) {
              tmp = rtypenamespace.exec(types[t]) || [];
              type = origType = tmp[1];
              namespaces = (tmp[2] || "").split(".").sort();
              if (!type) {
                for (type in events) {
                  jQuery.event.remove(elem2, type + types[t], handler, selector, true);
                }
                continue;
              }
              special = jQuery.event.special[type] || {};
              type = (selector ? special.delegateType : special.bindType) || type;
              handlers = events[type] || [];
              tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
              origCount = j = handlers.length;
              while (j--) {
                handleObj = handlers[j];
                if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                  handlers.splice(j, 1);
                  if (handleObj.selector) {
                    handlers.delegateCount--;
                  }
                  if (special.remove) {
                    special.remove.call(elem2, handleObj);
                  }
                }
              }
              if (origCount && !handlers.length) {
                if (!special.teardown || special.teardown.call(elem2, namespaces, elemData.handle) === false) {
                  jQuery.removeEvent(elem2, type, elemData.handle);
                }
                delete events[type];
              }
            }
            if (jQuery.isEmptyObject(events)) {
              dataPriv.remove(elem2, "handle events");
            }
          },
          dispatch: function(nativeEvent) {
            var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), event = jQuery.event.fix(nativeEvent), handlers = (dataPriv.get(this, "events") || /* @__PURE__ */ Object.create(null))[event.type] || [], special = jQuery.event.special[event.type] || {};
            args[0] = event;
            for (i = 1; i < arguments.length; i++) {
              args[i] = arguments[i];
            }
            event.delegateTarget = this;
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
              return;
            }
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
              event.currentTarget = matched.elem;
              j = 0;
              while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
                if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
                  event.handleObj = handleObj;
                  event.data = handleObj.data;
                  ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                  if (ret !== void 0) {
                    if ((event.result = ret) === false) {
                      event.preventDefault();
                      event.stopPropagation();
                    }
                  }
                }
              }
            }
            if (special.postDispatch) {
              special.postDispatch.call(this, event);
            }
            return event.result;
          },
          handlers: function(event, handlers) {
            var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
            if (delegateCount && cur.nodeType && !(event.type === "click" && event.button >= 1)) {
              for (; cur !== this; cur = cur.parentNode || this) {
                if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                  matchedHandlers = [];
                  matchedSelectors = {};
                  for (i = 0; i < delegateCount; i++) {
                    handleObj = handlers[i];
                    sel = handleObj.selector + " ";
                    if (matchedSelectors[sel] === void 0) {
                      matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
                    }
                    if (matchedSelectors[sel]) {
                      matchedHandlers.push(handleObj);
                    }
                  }
                  if (matchedHandlers.length) {
                    handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                  }
                }
              }
            }
            cur = this;
            if (delegateCount < handlers.length) {
              handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
            }
            return handlerQueue;
          },
          addProp: function(name2, hook) {
            Object.defineProperty(jQuery.Event.prototype, name2, {
              enumerable: true,
              configurable: true,
              get: isFunction(hook) ? function() {
                if (this.originalEvent) {
                  return hook(this.originalEvent);
                }
              } : function() {
                if (this.originalEvent) {
                  return this.originalEvent[name2];
                }
              },
              set: function(value2) {
                Object.defineProperty(this, name2, {
                  enumerable: true,
                  configurable: true,
                  writable: true,
                  value: value2
                });
              }
            });
          },
          fix: function(originalEvent) {
            return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
          },
          special: {
            load: {
              noBubble: true
            },
            click: {
              setup: function(data2) {
                var el = this || data2;
                if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                  leverageNative(el, "click", returnTrue);
                }
                return false;
              },
              trigger: function(data2) {
                var el = this || data2;
                if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                  leverageNative(el, "click");
                }
                return true;
              },
              _default: function(event) {
                var target = event.target;
                return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
              }
            },
            beforeunload: {
              postDispatch: function(event) {
                if (event.result !== void 0 && event.originalEvent) {
                  event.originalEvent.returnValue = event.result;
                }
              }
            }
          }
        };
        function leverageNative(el, type, expectSync2) {
          if (!expectSync2) {
            if (dataPriv.get(el, type) === void 0) {
              jQuery.event.add(el, type, returnTrue);
            }
            return;
          }
          dataPriv.set(el, type, false);
          jQuery.event.add(el, type, {
            namespace: false,
            handler: function(event) {
              var notAsync, result, saved = dataPriv.get(this, type);
              if (event.isTrigger & 1 && this[type]) {
                if (!saved.length) {
                  saved = slice.call(arguments);
                  dataPriv.set(this, type, saved);
                  notAsync = expectSync2(this, type);
                  this[type]();
                  result = dataPriv.get(this, type);
                  if (saved !== result || notAsync) {
                    dataPriv.set(this, type, false);
                  } else {
                    result = {};
                  }
                  if (saved !== result) {
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    return result && result.value;
                  }
                } else if ((jQuery.event.special[type] || {}).delegateType) {
                  event.stopPropagation();
                }
              } else if (saved.length) {
                dataPriv.set(this, type, {
                  value: jQuery.event.trigger(
                    jQuery.extend(saved[0], jQuery.Event.prototype),
                    saved.slice(1),
                    this
                  )
                });
                event.stopImmediatePropagation();
              }
            }
          });
        }
        jQuery.removeEvent = function(elem2, type, handle) {
          if (elem2.removeEventListener) {
            elem2.removeEventListener(type, handle);
          }
        };
        jQuery.Event = function(src, props) {
          if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
          }
          if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === void 0 && src.returnValue === false ? returnTrue : returnFalse;
            this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
            this.currentTarget = src.currentTarget;
            this.relatedTarget = src.relatedTarget;
          } else {
            this.type = src;
          }
          if (props) {
            jQuery.extend(this, props);
          }
          this.timeStamp = src && src.timeStamp || Date.now();
          this[jQuery.expando] = true;
        };
        jQuery.Event.prototype = {
          constructor: jQuery.Event,
          isDefaultPrevented: returnFalse,
          isPropagationStopped: returnFalse,
          isImmediatePropagationStopped: returnFalse,
          isSimulated: false,
          preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = returnTrue;
            if (e && !this.isSimulated) {
              e.preventDefault();
            }
          },
          stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
              e.stopPropagation();
            }
          },
          stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = returnTrue;
            if (e && !this.isSimulated) {
              e.stopImmediatePropagation();
            }
            this.stopPropagation();
          }
        };
        jQuery.each({
          altKey: true,
          bubbles: true,
          cancelable: true,
          changedTouches: true,
          ctrlKey: true,
          detail: true,
          eventPhase: true,
          metaKey: true,
          pageX: true,
          pageY: true,
          shiftKey: true,
          view: true,
          "char": true,
          code: true,
          charCode: true,
          key: true,
          keyCode: true,
          button: true,
          buttons: true,
          clientX: true,
          clientY: true,
          offsetX: true,
          offsetY: true,
          pointerId: true,
          pointerType: true,
          screenX: true,
          screenY: true,
          targetTouches: true,
          toElement: true,
          touches: true,
          which: true
        }, jQuery.event.addProp);
        jQuery.each({ focus: "focusin", blur: "focusout" }, function(type, delegateType) {
          jQuery.event.special[type] = {
            setup: function() {
              leverageNative(this, type, expectSync);
              return false;
            },
            trigger: function() {
              leverageNative(this, type);
              return true;
            },
            _default: function() {
              return true;
            },
            delegateType
          };
        });
        jQuery.each({
          mouseenter: "mouseover",
          mouseleave: "mouseout",
          pointerenter: "pointerover",
          pointerleave: "pointerout"
        }, function(orig, fix) {
          jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,
            handle: function(event) {
              var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
              if (!related || related !== target && !jQuery.contains(target, related)) {
                event.type = handleObj.origType;
                ret = handleObj.handler.apply(this, arguments);
                event.type = fix;
              }
              return ret;
            }
          };
        });
        jQuery.fn.extend({
          on: function(types, selector, data2, fn) {
            return on(this, types, selector, data2, fn);
          },
          one: function(types, selector, data2, fn) {
            return on(this, types, selector, data2, fn, 1);
          },
          off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {
              handleObj = types.handleObj;
              jQuery(types.delegateTarget).off(
                handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
                handleObj.selector,
                handleObj.handler
              );
              return this;
            }
            if (typeof types === "object") {
              for (type in types) {
                this.off(type, selector, types[type]);
              }
              return this;
            }
            if (selector === false || typeof selector === "function") {
              fn = selector;
              selector = void 0;
            }
            if (fn === false) {
              fn = returnFalse;
            }
            return this.each(function() {
              jQuery.event.remove(this, types, fn, selector);
            });
          }
        });
        var rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        function manipulationTarget(elem2, content2) {
          if (nodeName(elem2, "table") && nodeName(content2.nodeType !== 11 ? content2 : content2.firstChild, "tr")) {
            return jQuery(elem2).children("tbody")[0] || elem2;
          }
          return elem2;
        }
        function disableScript(elem2) {
          elem2.type = (elem2.getAttribute("type") !== null) + "/" + elem2.type;
          return elem2;
        }
        function restoreScript(elem2) {
          if ((elem2.type || "").slice(0, 5) === "true/") {
            elem2.type = elem2.type.slice(5);
          } else {
            elem2.removeAttribute("type");
          }
          return elem2;
        }
        function cloneCopyEvent(src, dest) {
          var i, l, type, pdataOld, udataOld, udataCur, events;
          if (dest.nodeType !== 1) {
            return;
          }
          if (dataPriv.hasData(src)) {
            pdataOld = dataPriv.get(src);
            events = pdataOld.events;
            if (events) {
              dataPriv.remove(dest, "handle events");
              for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                  jQuery.event.add(dest, type, events[type][i]);
                }
              }
            }
          }
          if (dataUser.hasData(src)) {
            udataOld = dataUser.access(src);
            udataCur = jQuery.extend({}, udataOld);
            dataUser.set(dest, udataCur);
          }
        }
        function fixInput(src, dest) {
          var nodeName2 = dest.nodeName.toLowerCase();
          if (nodeName2 === "input" && rcheckableType.test(src.type)) {
            dest.checked = src.checked;
          } else if (nodeName2 === "input" || nodeName2 === "textarea") {
            dest.defaultValue = src.defaultValue;
          }
        }
        function domManip(collection, args, callback, ignored) {
          args = flat(args);
          var fragment, first, scripts2, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value2 = args[0], valueIsFunction = isFunction(value2);
          if (valueIsFunction || l > 1 && typeof value2 === "string" && !support.checkClone && rchecked.test(value2)) {
            return collection.each(function(index2) {
              var self = collection.eq(index2);
              if (valueIsFunction) {
                args[0] = value2.call(this, index2, self.html());
              }
              domManip(self, args, callback, ignored);
            });
          }
          if (l) {
            fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
            first = fragment.firstChild;
            if (fragment.childNodes.length === 1) {
              fragment = first;
            }
            if (first || ignored) {
              scripts2 = jQuery.map(getAll(fragment, "script"), disableScript);
              hasScripts = scripts2.length;
              for (; i < l; i++) {
                node = fragment;
                if (i !== iNoClone) {
                  node = jQuery.clone(node, true, true);
                  if (hasScripts) {
                    jQuery.merge(scripts2, getAll(node, "script"));
                  }
                }
                callback.call(collection[i], node, i);
              }
              if (hasScripts) {
                doc = scripts2[scripts2.length - 1].ownerDocument;
                jQuery.map(scripts2, restoreScript);
                for (i = 0; i < hasScripts; i++) {
                  node = scripts2[i];
                  if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                    if (node.src && (node.type || "").toLowerCase() !== "module") {
                      if (jQuery._evalUrl && !node.noModule) {
                        jQuery._evalUrl(node.src, {
                          nonce: node.nonce || node.getAttribute("nonce")
                        }, doc);
                      }
                    } else {
                      DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                    }
                  }
                }
              }
            }
          }
          return collection;
        }
        function remove(elem2, selector, keepData) {
          var node, nodes = selector ? jQuery.filter(selector, elem2) : elem2, i = 0;
          for (; (node = nodes[i]) != null; i++) {
            if (!keepData && node.nodeType === 1) {
              jQuery.cleanData(getAll(node));
            }
            if (node.parentNode) {
              if (keepData && isAttached(node)) {
                setGlobalEval(getAll(node, "script"));
              }
              node.parentNode.removeChild(node);
            }
          }
          return elem2;
        }
        jQuery.extend({
          htmlPrefilter: function(html) {
            return html;
          },
          clone: function(elem2, dataAndEvents, deepDataAndEvents) {
            var i, l, srcElements, destElements, clone = elem2.cloneNode(true), inPage = isAttached(elem2);
            if (!support.noCloneChecked && (elem2.nodeType === 1 || elem2.nodeType === 11) && !jQuery.isXMLDoc(elem2)) {
              destElements = getAll(clone);
              srcElements = getAll(elem2);
              for (i = 0, l = srcElements.length; i < l; i++) {
                fixInput(srcElements[i], destElements[i]);
              }
            }
            if (dataAndEvents) {
              if (deepDataAndEvents) {
                srcElements = srcElements || getAll(elem2);
                destElements = destElements || getAll(clone);
                for (i = 0, l = srcElements.length; i < l; i++) {
                  cloneCopyEvent(srcElements[i], destElements[i]);
                }
              } else {
                cloneCopyEvent(elem2, clone);
              }
            }
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
              setGlobalEval(destElements, !inPage && getAll(elem2, "script"));
            }
            return clone;
          },
          cleanData: function(elems) {
            var data2, elem2, type, special = jQuery.event.special, i = 0;
            for (; (elem2 = elems[i]) !== void 0; i++) {
              if (acceptData(elem2)) {
                if (data2 = elem2[dataPriv.expando]) {
                  if (data2.events) {
                    for (type in data2.events) {
                      if (special[type]) {
                        jQuery.event.remove(elem2, type);
                      } else {
                        jQuery.removeEvent(elem2, type, data2.handle);
                      }
                    }
                  }
                  elem2[dataPriv.expando] = void 0;
                }
                if (elem2[dataUser.expando]) {
                  elem2[dataUser.expando] = void 0;
                }
              }
            }
          }
        });
        jQuery.fn.extend({
          detach: function(selector) {
            return remove(this, selector, true);
          },
          remove: function(selector) {
            return remove(this, selector);
          },
          text: function(value2) {
            return access(this, function(value3) {
              return value3 === void 0 ? jQuery.text(this) : this.empty().each(function() {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                  this.textContent = value3;
                }
              });
            }, null, value2, arguments.length);
          },
          append: function() {
            return domManip(this, arguments, function(elem2) {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var target = manipulationTarget(this, elem2);
                target.appendChild(elem2);
              }
            });
          },
          prepend: function() {
            return domManip(this, arguments, function(elem2) {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                var target = manipulationTarget(this, elem2);
                target.insertBefore(elem2, target.firstChild);
              }
            });
          },
          before: function() {
            return domManip(this, arguments, function(elem2) {
              if (this.parentNode) {
                this.parentNode.insertBefore(elem2, this);
              }
            });
          },
          after: function() {
            return domManip(this, arguments, function(elem2) {
              if (this.parentNode) {
                this.parentNode.insertBefore(elem2, this.nextSibling);
              }
            });
          },
          empty: function() {
            var elem2, i = 0;
            for (; (elem2 = this[i]) != null; i++) {
              if (elem2.nodeType === 1) {
                jQuery.cleanData(getAll(elem2, false));
                elem2.textContent = "";
              }
            }
            return this;
          },
          clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
            return this.map(function() {
              return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
          },
          html: function(value2) {
            return access(this, function(value3) {
              var elem2 = this[0] || {}, i = 0, l = this.length;
              if (value3 === void 0 && elem2.nodeType === 1) {
                return elem2.innerHTML;
              }
              if (typeof value3 === "string" && !rnoInnerhtml.test(value3) && !wrapMap[(rtagName.exec(value3) || ["", ""])[1].toLowerCase()]) {
                value3 = jQuery.htmlPrefilter(value3);
                try {
                  for (; i < l; i++) {
                    elem2 = this[i] || {};
                    if (elem2.nodeType === 1) {
                      jQuery.cleanData(getAll(elem2, false));
                      elem2.innerHTML = value3;
                    }
                  }
                  elem2 = 0;
                } catch (e) {
                }
              }
              if (elem2) {
                this.empty().append(value3);
              }
            }, null, value2, arguments.length);
          },
          replaceWith: function() {
            var ignored = [];
            return domManip(this, arguments, function(elem2) {
              var parent2 = this.parentNode;
              if (jQuery.inArray(this, ignored) < 0) {
                jQuery.cleanData(getAll(this));
                if (parent2) {
                  parent2.replaceChild(elem2, this);
                }
              }
            }, ignored);
          }
        });
        jQuery.each({
          appendTo: "append",
          prependTo: "prepend",
          insertBefore: "before",
          insertAfter: "after",
          replaceAll: "replaceWith"
        }, function(name2, original) {
          jQuery.fn[name2] = function(selector) {
            var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
            for (; i <= last; i++) {
              elems = i === last ? this : this.clone(true);
              jQuery(insert[i])[original](elems);
              push.apply(ret, elems.get());
            }
            return this.pushStack(ret);
          };
        });
        var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
        var getStyles = function(elem2) {
          var view = elem2.ownerDocument.defaultView;
          if (!view || !view.opener) {
            view = window2;
          }
          return view.getComputedStyle(elem2);
        };
        var swap = function(elem2, options, callback) {
          var ret, name2, old = {};
          for (name2 in options) {
            old[name2] = elem2.style[name2];
            elem2.style[name2] = options[name2];
          }
          ret = callback.call(elem2);
          for (name2 in options) {
            elem2.style[name2] = old[name2];
          }
          return ret;
        };
        var rboxStyle = new RegExp(cssExpand.join("|"), "i");
        (function() {
          function computeStyleTests() {
            if (!div2) {
              return;
            }
            container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
            div2.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
            documentElement.appendChild(container).appendChild(div2);
            var divStyle = window2.getComputedStyle(div2);
            pixelPositionVal = divStyle.top !== "1%";
            reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
            div2.style.right = "60%";
            pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
            boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
            div2.style.position = "absolute";
            scrollboxSizeVal = roundPixelMeasures(div2.offsetWidth / 3) === 12;
            documentElement.removeChild(container);
            div2 = null;
          }
          function roundPixelMeasures(measure) {
            return Math.round(parseFloat(measure));
          }
          var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableTrDimensionsVal, reliableMarginLeftVal, container = document2.createElement("div"), div2 = document2.createElement("div");
          if (!div2.style) {
            return;
          }
          div2.style.backgroundClip = "content-box";
          div2.cloneNode(true).style.backgroundClip = "";
          support.clearCloneStyle = div2.style.backgroundClip === "content-box";
          jQuery.extend(support, {
            boxSizingReliable: function() {
              computeStyleTests();
              return boxSizingReliableVal;
            },
            pixelBoxStyles: function() {
              computeStyleTests();
              return pixelBoxStylesVal;
            },
            pixelPosition: function() {
              computeStyleTests();
              return pixelPositionVal;
            },
            reliableMarginLeft: function() {
              computeStyleTests();
              return reliableMarginLeftVal;
            },
            scrollboxSize: function() {
              computeStyleTests();
              return scrollboxSizeVal;
            },
            reliableTrDimensions: function() {
              var table, tr, trChild, trStyle;
              if (reliableTrDimensionsVal == null) {
                table = document2.createElement("table");
                tr = document2.createElement("tr");
                trChild = document2.createElement("div");
                table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
                tr.style.cssText = "border:1px solid";
                tr.style.height = "1px";
                trChild.style.height = "9px";
                trChild.style.display = "block";
                documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
                trStyle = window2.getComputedStyle(tr);
                reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
                documentElement.removeChild(table);
              }
              return reliableTrDimensionsVal;
            }
          });
        })();
        function curCSS(elem2, name2, computed) {
          var width2, minWidth, maxWidth, ret, style = elem2.style;
          computed = computed || getStyles(elem2);
          if (computed) {
            ret = computed.getPropertyValue(name2) || computed[name2];
            if (ret === "" && !isAttached(elem2)) {
              ret = jQuery.style(elem2, name2);
            }
            if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name2)) {
              width2 = style.width;
              minWidth = style.minWidth;
              maxWidth = style.maxWidth;
              style.minWidth = style.maxWidth = style.width = ret;
              ret = computed.width;
              style.width = width2;
              style.minWidth = minWidth;
              style.maxWidth = maxWidth;
            }
          }
          return ret !== void 0 ? ret + "" : ret;
        }
        function addGetHookIf(conditionFn, hookFn) {
          return {
            get: function() {
              if (conditionFn()) {
                delete this.get;
                return;
              }
              return (this.get = hookFn).apply(this, arguments);
            }
          };
        }
        var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document2.createElement("div").style, vendorProps = {};
        function vendorPropName(name2) {
          var capName = name2[0].toUpperCase() + name2.slice(1), i = cssPrefixes.length;
          while (i--) {
            name2 = cssPrefixes[i] + capName;
            if (name2 in emptyStyle) {
              return name2;
            }
          }
        }
        function finalPropName(name2) {
          var final = jQuery.cssProps[name2] || vendorProps[name2];
          if (final) {
            return final;
          }
          if (name2 in emptyStyle) {
            return name2;
          }
          return vendorProps[name2] = vendorPropName(name2) || name2;
        }
        var rdisplayswap = /^(none|table(?!-c[ea]).+)/, rcustomProp = /^--/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
          letterSpacing: "0",
          fontWeight: "400"
        };
        function setPositiveNumber(_elem, value2, subtract) {
          var matches = rcssNum.exec(value2);
          return matches ? Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value2;
        }
        function boxModelAdjustment(elem2, dimension, box, isBorderBox, styles, computedVal) {
          var i = dimension === "width" ? 1 : 0, extra = 0, delta = 0;
          if (box === (isBorderBox ? "border" : "content")) {
            return 0;
          }
          for (; i < 4; i += 2) {
            if (box === "margin") {
              delta += jQuery.css(elem2, box + cssExpand[i], true, styles);
            }
            if (!isBorderBox) {
              delta += jQuery.css(elem2, "padding" + cssExpand[i], true, styles);
              if (box !== "padding") {
                delta += jQuery.css(elem2, "border" + cssExpand[i] + "Width", true, styles);
              } else {
                extra += jQuery.css(elem2, "border" + cssExpand[i] + "Width", true, styles);
              }
            } else {
              if (box === "content") {
                delta -= jQuery.css(elem2, "padding" + cssExpand[i], true, styles);
              }
              if (box !== "margin") {
                delta -= jQuery.css(elem2, "border" + cssExpand[i] + "Width", true, styles);
              }
            }
          }
          if (!isBorderBox && computedVal >= 0) {
            delta += Math.max(0, Math.ceil(
              elem2["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5
            )) || 0;
          }
          return delta;
        }
        function getWidthOrHeight(elem2, dimension, extra) {
          var styles = getStyles(elem2), boxSizingNeeded = !support.boxSizingReliable() || extra, isBorderBox = boxSizingNeeded && jQuery.css(elem2, "boxSizing", false, styles) === "border-box", valueIsBorderBox = isBorderBox, val2 = curCSS(elem2, dimension, styles), offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
          if (rnumnonpx.test(val2)) {
            if (!extra) {
              return val2;
            }
            val2 = "auto";
          }
          if ((!support.boxSizingReliable() && isBorderBox || !support.reliableTrDimensions() && nodeName(elem2, "tr") || val2 === "auto" || !parseFloat(val2) && jQuery.css(elem2, "display", false, styles) === "inline") && elem2.getClientRects().length) {
            isBorderBox = jQuery.css(elem2, "boxSizing", false, styles) === "border-box";
            valueIsBorderBox = offsetProp in elem2;
            if (valueIsBorderBox) {
              val2 = elem2[offsetProp];
            }
          }
          val2 = parseFloat(val2) || 0;
          return val2 + boxModelAdjustment(
            elem2,
            dimension,
            extra || (isBorderBox ? "border" : "content"),
            valueIsBorderBox,
            styles,
            val2
          ) + "px";
        }
        jQuery.extend({
          cssHooks: {
            opacity: {
              get: function(elem2, computed) {
                if (computed) {
                  var ret = curCSS(elem2, "opacity");
                  return ret === "" ? "1" : ret;
                }
              }
            }
          },
          cssNumber: {
            "animationIterationCount": true,
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "gridArea": true,
            "gridColumn": true,
            "gridColumnEnd": true,
            "gridColumnStart": true,
            "gridRow": true,
            "gridRowEnd": true,
            "gridRowStart": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
          },
          cssProps: {},
          style: function(elem2, name2, value2, extra) {
            if (!elem2 || elem2.nodeType === 3 || elem2.nodeType === 8 || !elem2.style) {
              return;
            }
            var ret, type, hooks, origName = camelCase(name2), isCustomProp = rcustomProp.test(name2), style = elem2.style;
            if (!isCustomProp) {
              name2 = finalPropName(origName);
            }
            hooks = jQuery.cssHooks[name2] || jQuery.cssHooks[origName];
            if (value2 !== void 0) {
              type = typeof value2;
              if (type === "string" && (ret = rcssNum.exec(value2)) && ret[1]) {
                value2 = adjustCSS(elem2, name2, ret);
                type = "number";
              }
              if (value2 == null || value2 !== value2) {
                return;
              }
              if (type === "number" && !isCustomProp) {
                value2 += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
              }
              if (!support.clearCloneStyle && value2 === "" && name2.indexOf("background") === 0) {
                style[name2] = "inherit";
              }
              if (!hooks || !("set" in hooks) || (value2 = hooks.set(elem2, value2, extra)) !== void 0) {
                if (isCustomProp) {
                  style.setProperty(name2, value2);
                } else {
                  style[name2] = value2;
                }
              }
            } else {
              if (hooks && "get" in hooks && (ret = hooks.get(elem2, false, extra)) !== void 0) {
                return ret;
              }
              return style[name2];
            }
          },
          css: function(elem2, name2, extra, styles) {
            var val2, num, hooks, origName = camelCase(name2), isCustomProp = rcustomProp.test(name2);
            if (!isCustomProp) {
              name2 = finalPropName(origName);
            }
            hooks = jQuery.cssHooks[name2] || jQuery.cssHooks[origName];
            if (hooks && "get" in hooks) {
              val2 = hooks.get(elem2, true, extra);
            }
            if (val2 === void 0) {
              val2 = curCSS(elem2, name2, styles);
            }
            if (val2 === "normal" && name2 in cssNormalTransform) {
              val2 = cssNormalTransform[name2];
            }
            if (extra === "" || extra) {
              num = parseFloat(val2);
              return extra === true || isFinite(num) ? num || 0 : val2;
            }
            return val2;
          }
        });
        jQuery.each(["height", "width"], function(_i, dimension) {
          jQuery.cssHooks[dimension] = {
            get: function(elem2, computed, extra) {
              if (computed) {
                return rdisplayswap.test(jQuery.css(elem2, "display")) && (!elem2.getClientRects().length || !elem2.getBoundingClientRect().width) ? swap(elem2, cssShow, function() {
                  return getWidthOrHeight(elem2, dimension, extra);
                }) : getWidthOrHeight(elem2, dimension, extra);
              }
            },
            set: function(elem2, value2, extra) {
              var matches, styles = getStyles(elem2), scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute", boxSizingNeeded = scrollboxSizeBuggy || extra, isBorderBox = boxSizingNeeded && jQuery.css(elem2, "boxSizing", false, styles) === "border-box", subtract = extra ? boxModelAdjustment(
                elem2,
                dimension,
                extra,
                isBorderBox,
                styles
              ) : 0;
              if (isBorderBox && scrollboxSizeBuggy) {
                subtract -= Math.ceil(
                  elem2["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem2, dimension, "border", false, styles) - 0.5
                );
              }
              if (subtract && (matches = rcssNum.exec(value2)) && (matches[3] || "px") !== "px") {
                elem2.style[dimension] = value2;
                value2 = jQuery.css(elem2, dimension);
              }
              return setPositiveNumber(elem2, value2, subtract);
            }
          };
        });
        jQuery.cssHooks.marginLeft = addGetHookIf(
          support.reliableMarginLeft,
          function(elem2, computed) {
            if (computed) {
              return (parseFloat(curCSS(elem2, "marginLeft")) || elem2.getBoundingClientRect().left - swap(elem2, { marginLeft: 0 }, function() {
                return elem2.getBoundingClientRect().left;
              })) + "px";
            }
          }
        );
        jQuery.each({
          margin: "",
          padding: "",
          border: "Width"
        }, function(prefix, suffix) {
          jQuery.cssHooks[prefix + suffix] = {
            expand: function(value2) {
              var i = 0, expanded = {}, parts = typeof value2 === "string" ? value2.split(" ") : [value2];
              for (; i < 4; i++) {
                expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
              }
              return expanded;
            }
          };
          if (prefix !== "margin") {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
          }
        });
        jQuery.fn.extend({
          css: function(name2, value2) {
            return access(this, function(elem2, name3, value3) {
              var styles, len, map = {}, i = 0;
              if (Array.isArray(name3)) {
                styles = getStyles(elem2);
                len = name3.length;
                for (; i < len; i++) {
                  map[name3[i]] = jQuery.css(elem2, name3[i], false, styles);
                }
                return map;
              }
              return value3 !== void 0 ? jQuery.style(elem2, name3, value3) : jQuery.css(elem2, name3);
            }, name2, value2, arguments.length > 1);
          }
        });
        function Tween(elem2, options, prop, end, easing) {
          return new Tween.prototype.init(elem2, options, prop, end, easing);
        }
        jQuery.Tween = Tween;
        Tween.prototype = {
          constructor: Tween,
          init: function(elem2, options, prop, end, easing, unit) {
            this.elem = elem2;
            this.prop = prop;
            this.easing = easing || jQuery.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
          },
          cur: function() {
            var hooks = Tween.propHooks[this.prop];
            return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
          },
          run: function(percent) {
            var eased, hooks = Tween.propHooks[this.prop];
            if (this.options.duration) {
              this.pos = eased = jQuery.easing[this.easing](
                percent,
                this.options.duration * percent,
                0,
                1,
                this.options.duration
              );
            } else {
              this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;
            if (this.options.step) {
              this.options.step.call(this.elem, this.now, this);
            }
            if (hooks && hooks.set) {
              hooks.set(this);
            } else {
              Tween.propHooks._default.set(this);
            }
            return this;
          }
        };
        Tween.prototype.init.prototype = Tween.prototype;
        Tween.propHooks = {
          _default: {
            get: function(tween) {
              var result;
              if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                return tween.elem[tween.prop];
              }
              result = jQuery.css(tween.elem, tween.prop, "");
              return !result || result === "auto" ? 0 : result;
            },
            set: function(tween) {
              if (jQuery.fx.step[tween.prop]) {
                jQuery.fx.step[tween.prop](tween);
              } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
                jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
              } else {
                tween.elem[tween.prop] = tween.now;
              }
            }
          }
        };
        Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
          set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
              tween.elem[tween.prop] = tween.now;
            }
          }
        };
        jQuery.easing = {
          linear: function(p) {
            return p;
          },
          swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
          },
          _default: "swing"
        };
        jQuery.fx = Tween.prototype.init;
        jQuery.fx.step = {};
        var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
        function schedule() {
          if (inProgress) {
            if (document2.hidden === false && window2.requestAnimationFrame) {
              window2.requestAnimationFrame(schedule);
            } else {
              window2.setTimeout(schedule, jQuery.fx.interval);
            }
            jQuery.fx.tick();
          }
        }
        function createFxNow() {
          window2.setTimeout(function() {
            fxNow = void 0;
          });
          return fxNow = Date.now();
        }
        function genFx(type, includeWidth) {
          var which, i = 0, attrs = { height: type };
          includeWidth = includeWidth ? 1 : 0;
          for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
          }
          if (includeWidth) {
            attrs.opacity = attrs.width = type;
          }
          return attrs;
        }
        function createTween(value2, prop, animation) {
          var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index2 = 0, length2 = collection.length;
          for (; index2 < length2; index2++) {
            if (tween = collection[index2].call(animation, prop, value2)) {
              return tween;
            }
          }
        }
        function defaultPrefilter(elem2, props, opts) {
          var prop, value2, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem2.style, hidden = elem2.nodeType && isHiddenWithinTree(elem2), dataShow = dataPriv.get(elem2, "fxshow");
          if (!opts.queue) {
            hooks = jQuery._queueHooks(elem2, "fx");
            if (hooks.unqueued == null) {
              hooks.unqueued = 0;
              oldfire = hooks.empty.fire;
              hooks.empty.fire = function() {
                if (!hooks.unqueued) {
                  oldfire();
                }
              };
            }
            hooks.unqueued++;
            anim.always(function() {
              anim.always(function() {
                hooks.unqueued--;
                if (!jQuery.queue(elem2, "fx").length) {
                  hooks.empty.fire();
                }
              });
            });
          }
          for (prop in props) {
            value2 = props[prop];
            if (rfxtypes.test(value2)) {
              delete props[prop];
              toggle = toggle || value2 === "toggle";
              if (value2 === (hidden ? "hide" : "show")) {
                if (value2 === "show" && dataShow && dataShow[prop] !== void 0) {
                  hidden = true;
                } else {
                  continue;
                }
              }
              orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem2, prop);
            }
          }
          propTween = !jQuery.isEmptyObject(props);
          if (!propTween && jQuery.isEmptyObject(orig)) {
            return;
          }
          if (isBox && elem2.nodeType === 1) {
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];
            restoreDisplay = dataShow && dataShow.display;
            if (restoreDisplay == null) {
              restoreDisplay = dataPriv.get(elem2, "display");
            }
            display = jQuery.css(elem2, "display");
            if (display === "none") {
              if (restoreDisplay) {
                display = restoreDisplay;
              } else {
                showHide([elem2], true);
                restoreDisplay = elem2.style.display || restoreDisplay;
                display = jQuery.css(elem2, "display");
                showHide([elem2]);
              }
            }
            if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
              if (jQuery.css(elem2, "float") === "none") {
                if (!propTween) {
                  anim.done(function() {
                    style.display = restoreDisplay;
                  });
                  if (restoreDisplay == null) {
                    display = style.display;
                    restoreDisplay = display === "none" ? "" : display;
                  }
                }
                style.display = "inline-block";
              }
            }
          }
          if (opts.overflow) {
            style.overflow = "hidden";
            anim.always(function() {
              style.overflow = opts.overflow[0];
              style.overflowX = opts.overflow[1];
              style.overflowY = opts.overflow[2];
            });
          }
          propTween = false;
          for (prop in orig) {
            if (!propTween) {
              if (dataShow) {
                if ("hidden" in dataShow) {
                  hidden = dataShow.hidden;
                }
              } else {
                dataShow = dataPriv.access(elem2, "fxshow", { display: restoreDisplay });
              }
              if (toggle) {
                dataShow.hidden = !hidden;
              }
              if (hidden) {
                showHide([elem2], true);
              }
              anim.done(function() {
                if (!hidden) {
                  showHide([elem2]);
                }
                dataPriv.remove(elem2, "fxshow");
                for (prop in orig) {
                  jQuery.style(elem2, prop, orig[prop]);
                }
              });
            }
            propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
            if (!(prop in dataShow)) {
              dataShow[prop] = propTween.start;
              if (hidden) {
                propTween.end = propTween.start;
                propTween.start = 0;
              }
            }
          }
        }
        function propFilter(props, specialEasing) {
          var index2, name2, easing, value2, hooks;
          for (index2 in props) {
            name2 = camelCase(index2);
            easing = specialEasing[name2];
            value2 = props[index2];
            if (Array.isArray(value2)) {
              easing = value2[1];
              value2 = props[index2] = value2[0];
            }
            if (index2 !== name2) {
              props[name2] = value2;
              delete props[index2];
            }
            hooks = jQuery.cssHooks[name2];
            if (hooks && "expand" in hooks) {
              value2 = hooks.expand(value2);
              delete props[name2];
              for (index2 in value2) {
                if (!(index2 in props)) {
                  props[index2] = value2[index2];
                  specialEasing[index2] = easing;
                }
              }
            } else {
              specialEasing[name2] = easing;
            }
          }
        }
        function Animation(elem2, properties, options) {
          var result, stopped, index2 = 0, length2 = Animation.prefilters.length, deferred = jQuery.Deferred().always(function() {
            delete tick.elem;
          }), tick = function() {
            if (stopped) {
              return false;
            }
            var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index3 = 0, length3 = animation.tweens.length;
            for (; index3 < length3; index3++) {
              animation.tweens[index3].run(percent);
            }
            deferred.notifyWith(elem2, [animation, percent, remaining]);
            if (percent < 1 && length3) {
              return remaining;
            }
            if (!length3) {
              deferred.notifyWith(elem2, [animation, 1, 0]);
            }
            deferred.resolveWith(elem2, [animation]);
            return false;
          }, animation = deferred.promise({
            elem: elem2,
            props: jQuery.extend({}, properties),
            opts: jQuery.extend(true, {
              specialEasing: {},
              easing: jQuery.easing._default
            }, options),
            originalProperties: properties,
            originalOptions: options,
            startTime: fxNow || createFxNow(),
            duration: options.duration,
            tweens: [],
            createTween: function(prop, end) {
              var tween = jQuery.Tween(
                elem2,
                animation.opts,
                prop,
                end,
                animation.opts.specialEasing[prop] || animation.opts.easing
              );
              animation.tweens.push(tween);
              return tween;
            },
            stop: function(gotoEnd) {
              var index3 = 0, length3 = gotoEnd ? animation.tweens.length : 0;
              if (stopped) {
                return this;
              }
              stopped = true;
              for (; index3 < length3; index3++) {
                animation.tweens[index3].run(1);
              }
              if (gotoEnd) {
                deferred.notifyWith(elem2, [animation, 1, 0]);
                deferred.resolveWith(elem2, [animation, gotoEnd]);
              } else {
                deferred.rejectWith(elem2, [animation, gotoEnd]);
              }
              return this;
            }
          }), props = animation.props;
          propFilter(props, animation.opts.specialEasing);
          for (; index2 < length2; index2++) {
            result = Animation.prefilters[index2].call(animation, elem2, props, animation.opts);
            if (result) {
              if (isFunction(result.stop)) {
                jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
              }
              return result;
            }
          }
          jQuery.map(props, createTween, animation);
          if (isFunction(animation.opts.start)) {
            animation.opts.start.call(elem2, animation);
          }
          animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
          jQuery.fx.timer(
            jQuery.extend(tick, {
              elem: elem2,
              anim: animation,
              queue: animation.opts.queue
            })
          );
          return animation;
        }
        jQuery.Animation = jQuery.extend(Animation, {
          tweeners: {
            "*": [function(prop, value2) {
              var tween = this.createTween(prop, value2);
              adjustCSS(tween.elem, prop, rcssNum.exec(value2), tween);
              return tween;
            }]
          },
          tweener: function(props, callback) {
            if (isFunction(props)) {
              callback = props;
              props = ["*"];
            } else {
              props = props.match(rnothtmlwhite);
            }
            var prop, index2 = 0, length2 = props.length;
            for (; index2 < length2; index2++) {
              prop = props[index2];
              Animation.tweeners[prop] = Animation.tweeners[prop] || [];
              Animation.tweeners[prop].unshift(callback);
            }
          },
          prefilters: [defaultPrefilter],
          prefilter: function(callback, prepend) {
            if (prepend) {
              Animation.prefilters.unshift(callback);
            } else {
              Animation.prefilters.push(callback);
            }
          }
        });
        jQuery.speed = function(speed, easing, fn) {
          var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing || isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !isFunction(easing) && easing
          };
          if (jQuery.fx.off) {
            opt.duration = 0;
          } else {
            if (typeof opt.duration !== "number") {
              if (opt.duration in jQuery.fx.speeds) {
                opt.duration = jQuery.fx.speeds[opt.duration];
              } else {
                opt.duration = jQuery.fx.speeds._default;
              }
            }
          }
          if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
          }
          opt.old = opt.complete;
          opt.complete = function() {
            if (isFunction(opt.old)) {
              opt.old.call(this);
            }
            if (opt.queue) {
              jQuery.dequeue(this, opt.queue);
            }
          };
          return opt;
        };
        jQuery.fn.extend({
          fadeTo: function(speed, to, easing, callback) {
            return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback);
          },
          animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
              var anim = Animation(this, jQuery.extend({}, prop), optall);
              if (empty || dataPriv.get(this, "finish")) {
                anim.stop(true);
              }
            };
            doAnimation.finish = doAnimation;
            return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
          },
          stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
              var stop = hooks.stop;
              delete hooks.stop;
              stop(gotoEnd);
            };
            if (typeof type !== "string") {
              gotoEnd = clearQueue;
              clearQueue = type;
              type = void 0;
            }
            if (clearQueue) {
              this.queue(type || "fx", []);
            }
            return this.each(function() {
              var dequeue = true, index2 = type != null && type + "queueHooks", timers = jQuery.timers, data2 = dataPriv.get(this);
              if (index2) {
                if (data2[index2] && data2[index2].stop) {
                  stopQueue(data2[index2]);
                }
              } else {
                for (index2 in data2) {
                  if (data2[index2] && data2[index2].stop && rrun.test(index2)) {
                    stopQueue(data2[index2]);
                  }
                }
              }
              for (index2 = timers.length; index2--; ) {
                if (timers[index2].elem === this && (type == null || timers[index2].queue === type)) {
                  timers[index2].anim.stop(gotoEnd);
                  dequeue = false;
                  timers.splice(index2, 1);
                }
              }
              if (dequeue || !gotoEnd) {
                jQuery.dequeue(this, type);
              }
            });
          },
          finish: function(type) {
            if (type !== false) {
              type = type || "fx";
            }
            return this.each(function() {
              var index2, data2 = dataPriv.get(this), queue = data2[type + "queue"], hooks = data2[type + "queueHooks"], timers = jQuery.timers, length2 = queue ? queue.length : 0;
              data2.finish = true;
              jQuery.queue(this, type, []);
              if (hooks && hooks.stop) {
                hooks.stop.call(this, true);
              }
              for (index2 = timers.length; index2--; ) {
                if (timers[index2].elem === this && timers[index2].queue === type) {
                  timers[index2].anim.stop(true);
                  timers.splice(index2, 1);
                }
              }
              for (index2 = 0; index2 < length2; index2++) {
                if (queue[index2] && queue[index2].finish) {
                  queue[index2].finish.call(this);
                }
              }
              delete data2.finish;
            });
          }
        });
        jQuery.each(["toggle", "show", "hide"], function(_i, name2) {
          var cssFn = jQuery.fn[name2];
          jQuery.fn[name2] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name2, true), speed, easing, callback);
          };
        });
        jQuery.each({
          slideDown: genFx("show"),
          slideUp: genFx("hide"),
          slideToggle: genFx("toggle"),
          fadeIn: { opacity: "show" },
          fadeOut: { opacity: "hide" },
          fadeToggle: { opacity: "toggle" }
        }, function(name2, props) {
          jQuery.fn[name2] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
          };
        });
        jQuery.timers = [];
        jQuery.fx.tick = function() {
          var timer, i = 0, timers = jQuery.timers;
          fxNow = Date.now();
          for (; i < timers.length; i++) {
            timer = timers[i];
            if (!timer() && timers[i] === timer) {
              timers.splice(i--, 1);
            }
          }
          if (!timers.length) {
            jQuery.fx.stop();
          }
          fxNow = void 0;
        };
        jQuery.fx.timer = function(timer) {
          jQuery.timers.push(timer);
          jQuery.fx.start();
        };
        jQuery.fx.interval = 13;
        jQuery.fx.start = function() {
          if (inProgress) {
            return;
          }
          inProgress = true;
          schedule();
        };
        jQuery.fx.stop = function() {
          inProgress = null;
        };
        jQuery.fx.speeds = {
          slow: 600,
          fast: 200,
          _default: 400
        };
        jQuery.fn.delay = function(time2, type) {
          time2 = jQuery.fx ? jQuery.fx.speeds[time2] || time2 : time2;
          type = type || "fx";
          return this.queue(type, function(next, hooks) {
            var timeout = window2.setTimeout(next, time2);
            hooks.stop = function() {
              window2.clearTimeout(timeout);
            };
          });
        };
        (function() {
          var input = document2.createElement("input"), select = document2.createElement("select"), opt = select.appendChild(document2.createElement("option"));
          input.type = "checkbox";
          support.checkOn = input.value !== "";
          support.optSelected = opt.selected;
          input = document2.createElement("input");
          input.value = "t";
          input.type = "radio";
          support.radioValue = input.value === "t";
        })();
        var boolHook, attrHandle = jQuery.expr.attrHandle;
        jQuery.fn.extend({
          attr: function(name2, value2) {
            return access(this, jQuery.attr, name2, value2, arguments.length > 1);
          },
          removeAttr: function(name2) {
            return this.each(function() {
              jQuery.removeAttr(this, name2);
            });
          }
        });
        jQuery.extend({
          attr: function(elem2, name2, value2) {
            var ret, hooks, nType = elem2.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
              return;
            }
            if (typeof elem2.getAttribute === "undefined") {
              return jQuery.prop(elem2, name2, value2);
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem2)) {
              hooks = jQuery.attrHooks[name2.toLowerCase()] || (jQuery.expr.match.bool.test(name2) ? boolHook : void 0);
            }
            if (value2 !== void 0) {
              if (value2 === null) {
                jQuery.removeAttr(elem2, name2);
                return;
              }
              if (hooks && "set" in hooks && (ret = hooks.set(elem2, value2, name2)) !== void 0) {
                return ret;
              }
              elem2.setAttribute(name2, value2 + "");
              return value2;
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem2, name2)) !== null) {
              return ret;
            }
            ret = jQuery.find.attr(elem2, name2);
            return ret == null ? void 0 : ret;
          },
          attrHooks: {
            type: {
              set: function(elem2, value2) {
                if (!support.radioValue && value2 === "radio" && nodeName(elem2, "input")) {
                  var val2 = elem2.value;
                  elem2.setAttribute("type", value2);
                  if (val2) {
                    elem2.value = val2;
                  }
                  return value2;
                }
              }
            }
          },
          removeAttr: function(elem2, value2) {
            var name2, i = 0, attrNames = value2 && value2.match(rnothtmlwhite);
            if (attrNames && elem2.nodeType === 1) {
              while (name2 = attrNames[i++]) {
                elem2.removeAttribute(name2);
              }
            }
          }
        });
        boolHook = {
          set: function(elem2, value2, name2) {
            if (value2 === false) {
              jQuery.removeAttr(elem2, name2);
            } else {
              elem2.setAttribute(name2, name2);
            }
            return name2;
          }
        };
        jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(_i, name2) {
          var getter = attrHandle[name2] || jQuery.find.attr;
          attrHandle[name2] = function(elem2, name3, isXML) {
            var ret, handle, lowercaseName = name3.toLowerCase();
            if (!isXML) {
              handle = attrHandle[lowercaseName];
              attrHandle[lowercaseName] = ret;
              ret = getter(elem2, name3, isXML) != null ? lowercaseName : null;
              attrHandle[lowercaseName] = handle;
            }
            return ret;
          };
        });
        var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
        jQuery.fn.extend({
          prop: function(name2, value2) {
            return access(this, jQuery.prop, name2, value2, arguments.length > 1);
          },
          removeProp: function(name2) {
            return this.each(function() {
              delete this[jQuery.propFix[name2] || name2];
            });
          }
        });
        jQuery.extend({
          prop: function(elem2, name2, value2) {
            var ret, hooks, nType = elem2.nodeType;
            if (nType === 3 || nType === 8 || nType === 2) {
              return;
            }
            if (nType !== 1 || !jQuery.isXMLDoc(elem2)) {
              name2 = jQuery.propFix[name2] || name2;
              hooks = jQuery.propHooks[name2];
            }
            if (value2 !== void 0) {
              if (hooks && "set" in hooks && (ret = hooks.set(elem2, value2, name2)) !== void 0) {
                return ret;
              }
              return elem2[name2] = value2;
            }
            if (hooks && "get" in hooks && (ret = hooks.get(elem2, name2)) !== null) {
              return ret;
            }
            return elem2[name2];
          },
          propHooks: {
            tabIndex: {
              get: function(elem2) {
                var tabindex = jQuery.find.attr(elem2, "tabindex");
                if (tabindex) {
                  return parseInt(tabindex, 10);
                }
                if (rfocusable.test(elem2.nodeName) || rclickable.test(elem2.nodeName) && elem2.href) {
                  return 0;
                }
                return -1;
              }
            }
          },
          propFix: {
            "for": "htmlFor",
            "class": "className"
          }
        });
        if (!support.optSelected) {
          jQuery.propHooks.selected = {
            get: function(elem2) {
              var parent2 = elem2.parentNode;
              if (parent2 && parent2.parentNode) {
                parent2.parentNode.selectedIndex;
              }
              return null;
            },
            set: function(elem2) {
              var parent2 = elem2.parentNode;
              if (parent2) {
                parent2.selectedIndex;
                if (parent2.parentNode) {
                  parent2.parentNode.selectedIndex;
                }
              }
            }
          };
        }
        jQuery.each([
          "tabIndex",
          "readOnly",
          "maxLength",
          "cellSpacing",
          "cellPadding",
          "rowSpan",
          "colSpan",
          "useMap",
          "frameBorder",
          "contentEditable"
        ], function() {
          jQuery.propFix[this.toLowerCase()] = this;
        });
        function stripAndCollapse(value2) {
          var tokens = value2.match(rnothtmlwhite) || [];
          return tokens.join(" ");
        }
        function getClass(elem2) {
          return elem2.getAttribute && elem2.getAttribute("class") || "";
        }
        function classesToArray(value2) {
          if (Array.isArray(value2)) {
            return value2;
          }
          if (typeof value2 === "string") {
            return value2.match(rnothtmlwhite) || [];
          }
          return [];
        }
        jQuery.fn.extend({
          addClass: function(value2) {
            var classes, elem2, cur, curValue, clazz, j, finalValue, i = 0;
            if (isFunction(value2)) {
              return this.each(function(j2) {
                jQuery(this).addClass(value2.call(this, j2, getClass(this)));
              });
            }
            classes = classesToArray(value2);
            if (classes.length) {
              while (elem2 = this[i++]) {
                curValue = getClass(elem2);
                cur = elem2.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
                if (cur) {
                  j = 0;
                  while (clazz = classes[j++]) {
                    if (cur.indexOf(" " + clazz + " ") < 0) {
                      cur += clazz + " ";
                    }
                  }
                  finalValue = stripAndCollapse(cur);
                  if (curValue !== finalValue) {
                    elem2.setAttribute("class", finalValue);
                  }
                }
              }
            }
            return this;
          },
          removeClass: function(value2) {
            var classes, elem2, cur, curValue, clazz, j, finalValue, i = 0;
            if (isFunction(value2)) {
              return this.each(function(j2) {
                jQuery(this).removeClass(value2.call(this, j2, getClass(this)));
              });
            }
            if (!arguments.length) {
              return this.attr("class", "");
            }
            classes = classesToArray(value2);
            if (classes.length) {
              while (elem2 = this[i++]) {
                curValue = getClass(elem2);
                cur = elem2.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
                if (cur) {
                  j = 0;
                  while (clazz = classes[j++]) {
                    while (cur.indexOf(" " + clazz + " ") > -1) {
                      cur = cur.replace(" " + clazz + " ", " ");
                    }
                  }
                  finalValue = stripAndCollapse(cur);
                  if (curValue !== finalValue) {
                    elem2.setAttribute("class", finalValue);
                  }
                }
              }
            }
            return this;
          },
          toggleClass: function(value2, stateVal) {
            var type = typeof value2, isValidValue = type === "string" || Array.isArray(value2);
            if (typeof stateVal === "boolean" && isValidValue) {
              return stateVal ? this.addClass(value2) : this.removeClass(value2);
            }
            if (isFunction(value2)) {
              return this.each(function(i) {
                jQuery(this).toggleClass(
                  value2.call(this, i, getClass(this), stateVal),
                  stateVal
                );
              });
            }
            return this.each(function() {
              var className, i, self, classNames;
              if (isValidValue) {
                i = 0;
                self = jQuery(this);
                classNames = classesToArray(value2);
                while (className = classNames[i++]) {
                  if (self.hasClass(className)) {
                    self.removeClass(className);
                  } else {
                    self.addClass(className);
                  }
                }
              } else if (value2 === void 0 || type === "boolean") {
                className = getClass(this);
                if (className) {
                  dataPriv.set(this, "__className__", className);
                }
                if (this.setAttribute) {
                  this.setAttribute(
                    "class",
                    className || value2 === false ? "" : dataPriv.get(this, "__className__") || ""
                  );
                }
              }
            });
          },
          hasClass: function(selector) {
            var className, elem2, i = 0;
            className = " " + selector + " ";
            while (elem2 = this[i++]) {
              if (elem2.nodeType === 1 && (" " + stripAndCollapse(getClass(elem2)) + " ").indexOf(className) > -1) {
                return true;
              }
            }
            return false;
          }
        });
        var rreturn = /\r/g;
        jQuery.fn.extend({
          val: function(value2) {
            var hooks, ret, valueIsFunction, elem2 = this[0];
            if (!arguments.length) {
              if (elem2) {
                hooks = jQuery.valHooks[elem2.type] || jQuery.valHooks[elem2.nodeName.toLowerCase()];
                if (hooks && "get" in hooks && (ret = hooks.get(elem2, "value")) !== void 0) {
                  return ret;
                }
                ret = elem2.value;
                if (typeof ret === "string") {
                  return ret.replace(rreturn, "");
                }
                return ret == null ? "" : ret;
              }
              return;
            }
            valueIsFunction = isFunction(value2);
            return this.each(function(i) {
              var val2;
              if (this.nodeType !== 1) {
                return;
              }
              if (valueIsFunction) {
                val2 = value2.call(this, i, jQuery(this).val());
              } else {
                val2 = value2;
              }
              if (val2 == null) {
                val2 = "";
              } else if (typeof val2 === "number") {
                val2 += "";
              } else if (Array.isArray(val2)) {
                val2 = jQuery.map(val2, function(value3) {
                  return value3 == null ? "" : value3 + "";
                });
              }
              hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
              if (!hooks || !("set" in hooks) || hooks.set(this, val2, "value") === void 0) {
                this.value = val2;
              }
            });
          }
        });
        jQuery.extend({
          valHooks: {
            option: {
              get: function(elem2) {
                var val2 = jQuery.find.attr(elem2, "value");
                return val2 != null ? val2 : stripAndCollapse(jQuery.text(elem2));
              }
            },
            select: {
              get: function(elem2) {
                var value2, option, i, options = elem2.options, index2 = elem2.selectedIndex, one = elem2.type === "select-one", values = one ? null : [], max = one ? index2 + 1 : options.length;
                if (index2 < 0) {
                  i = max;
                } else {
                  i = one ? index2 : 0;
                }
                for (; i < max; i++) {
                  option = options[i];
                  if ((option.selected || i === index2) && !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                    value2 = jQuery(option).val();
                    if (one) {
                      return value2;
                    }
                    values.push(value2);
                  }
                }
                return values;
              },
              set: function(elem2, value2) {
                var optionSet, option, options = elem2.options, values = jQuery.makeArray(value2), i = options.length;
                while (i--) {
                  option = options[i];
                  if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                    optionSet = true;
                  }
                }
                if (!optionSet) {
                  elem2.selectedIndex = -1;
                }
                return values;
              }
            }
          }
        });
        jQuery.each(["radio", "checkbox"], function() {
          jQuery.valHooks[this] = {
            set: function(elem2, value2) {
              if (Array.isArray(value2)) {
                return elem2.checked = jQuery.inArray(jQuery(elem2).val(), value2) > -1;
              }
            }
          };
          if (!support.checkOn) {
            jQuery.valHooks[this].get = function(elem2) {
              return elem2.getAttribute("value") === null ? "on" : elem2.value;
            };
          }
        });
        support.focusin = "onfocusin" in window2;
        var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function(e) {
          e.stopPropagation();
        };
        jQuery.extend(jQuery.event, {
          trigger: function(event, data2, elem2, onlyHandlers) {
            var i, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem2 || document2], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
            cur = lastElement = tmp = elem2 = elem2 || document2;
            if (elem2.nodeType === 3 || elem2.nodeType === 8) {
              return;
            }
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
              return;
            }
            if (type.indexOf(".") > -1) {
              namespaces = type.split(".");
              type = namespaces.shift();
              namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;
            event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
            event.result = void 0;
            if (!event.target) {
              event.target = elem2;
            }
            data2 = data2 == null ? [event] : jQuery.makeArray(data2, [event]);
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem2, data2) === false) {
              return;
            }
            if (!onlyHandlers && !special.noBubble && !isWindow(elem2)) {
              bubbleType = special.delegateType || type;
              if (!rfocusMorph.test(bubbleType + type)) {
                cur = cur.parentNode;
              }
              for (; cur; cur = cur.parentNode) {
                eventPath.push(cur);
                tmp = cur;
              }
              if (tmp === (elem2.ownerDocument || document2)) {
                eventPath.push(tmp.defaultView || tmp.parentWindow || window2);
              }
            }
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
              lastElement = cur;
              event.type = i > 1 ? bubbleType : special.bindType || type;
              handle = (dataPriv.get(cur, "events") || /* @__PURE__ */ Object.create(null))[event.type] && dataPriv.get(cur, "handle");
              if (handle) {
                handle.apply(cur, data2);
              }
              handle = ontype && cur[ontype];
              if (handle && handle.apply && acceptData(cur)) {
                event.result = handle.apply(cur, data2);
                if (event.result === false) {
                  event.preventDefault();
                }
              }
            }
            event.type = type;
            if (!onlyHandlers && !event.isDefaultPrevented()) {
              if ((!special._default || special._default.apply(eventPath.pop(), data2) === false) && acceptData(elem2)) {
                if (ontype && isFunction(elem2[type]) && !isWindow(elem2)) {
                  tmp = elem2[ontype];
                  if (tmp) {
                    elem2[ontype] = null;
                  }
                  jQuery.event.triggered = type;
                  if (event.isPropagationStopped()) {
                    lastElement.addEventListener(type, stopPropagationCallback);
                  }
                  elem2[type]();
                  if (event.isPropagationStopped()) {
                    lastElement.removeEventListener(type, stopPropagationCallback);
                  }
                  jQuery.event.triggered = void 0;
                  if (tmp) {
                    elem2[ontype] = tmp;
                  }
                }
              }
            }
            return event.result;
          },
          simulate: function(type, elem2, event) {
            var e = jQuery.extend(
              new jQuery.Event(),
              event,
              {
                type,
                isSimulated: true
              }
            );
            jQuery.event.trigger(e, null, elem2);
          }
        });
        jQuery.fn.extend({
          trigger: function(type, data2) {
            return this.each(function() {
              jQuery.event.trigger(type, data2, this);
            });
          },
          triggerHandler: function(type, data2) {
            var elem2 = this[0];
            if (elem2) {
              return jQuery.event.trigger(type, data2, elem2, true);
            }
          }
        });
        if (!support.focusin) {
          jQuery.each({ focus: "focusin", blur: "focusout" }, function(orig, fix) {
            var handler = function(event) {
              jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
            };
            jQuery.event.special[fix] = {
              setup: function() {
                var doc = this.ownerDocument || this.document || this, attaches = dataPriv.access(doc, fix);
                if (!attaches) {
                  doc.addEventListener(orig, handler, true);
                }
                dataPriv.access(doc, fix, (attaches || 0) + 1);
              },
              teardown: function() {
                var doc = this.ownerDocument || this.document || this, attaches = dataPriv.access(doc, fix) - 1;
                if (!attaches) {
                  doc.removeEventListener(orig, handler, true);
                  dataPriv.remove(doc, fix);
                } else {
                  dataPriv.access(doc, fix, attaches);
                }
              }
            };
          });
        }
        var location = window2.location;
        var nonce = { guid: Date.now() };
        var rquery = /\?/;
        jQuery.parseXML = function(data2) {
          var xml, parserErrorElem;
          if (!data2 || typeof data2 !== "string") {
            return null;
          }
          try {
            xml = new window2.DOMParser().parseFromString(data2, "text/xml");
          } catch (e) {
          }
          parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
          if (!xml || parserErrorElem) {
            jQuery.error("Invalid XML: " + (parserErrorElem ? jQuery.map(parserErrorElem.childNodes, function(el) {
              return el.textContent;
            }).join("\n") : data2));
          }
          return xml;
        };
        var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
        function buildParams(prefix, obj, traditional, add2) {
          var name2;
          if (Array.isArray(obj)) {
            jQuery.each(obj, function(i, v) {
              if (traditional || rbracket.test(prefix)) {
                add2(prefix, v);
              } else {
                buildParams(
                  prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
                  v,
                  traditional,
                  add2
                );
              }
            });
          } else if (!traditional && toType(obj) === "object") {
            for (name2 in obj) {
              buildParams(prefix + "[" + name2 + "]", obj[name2], traditional, add2);
            }
          } else {
            add2(prefix, obj);
          }
        }
        jQuery.param = function(a, traditional) {
          var prefix, s = [], add2 = function(key2, valueOrFunction) {
            var value2 = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
            s[s.length] = encodeURIComponent(key2) + "=" + encodeURIComponent(value2 == null ? "" : value2);
          };
          if (a == null) {
            return "";
          }
          if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
            jQuery.each(a, function() {
              add2(this.name, this.value);
            });
          } else {
            for (prefix in a) {
              buildParams(prefix, a[prefix], traditional, add2);
            }
          }
          return s.join("&");
        };
        jQuery.fn.extend({
          serialize: function() {
            return jQuery.param(this.serializeArray());
          },
          serializeArray: function() {
            return this.map(function() {
              var elements = jQuery.prop(this, "elements");
              return elements ? jQuery.makeArray(elements) : this;
            }).filter(function() {
              var type = this.type;
              return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
            }).map(function(_i, elem2) {
              var val2 = jQuery(this).val();
              if (val2 == null) {
                return null;
              }
              if (Array.isArray(val2)) {
                return jQuery.map(val2, function(val3) {
                  return { name: elem2.name, value: val3.replace(rCRLF, "\r\n") };
                });
              }
              return { name: elem2.name, value: val2.replace(rCRLF, "\r\n") };
            }).get();
          }
        });
        var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document2.createElement("a");
        originAnchor.href = location.href;
        function addToPrefiltersOrTransports(structure) {
          return function(dataTypeExpression, func) {
            if (typeof dataTypeExpression !== "string") {
              func = dataTypeExpression;
              dataTypeExpression = "*";
            }
            var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
            if (isFunction(func)) {
              while (dataType = dataTypes[i++]) {
                if (dataType[0] === "+") {
                  dataType = dataType.slice(1) || "*";
                  (structure[dataType] = structure[dataType] || []).unshift(func);
                } else {
                  (structure[dataType] = structure[dataType] || []).push(func);
                }
              }
            }
          };
        }
        function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
          var inspected = {}, seekingTransport = structure === transports;
          function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
              var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
              if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
                options.dataTypes.unshift(dataTypeOrTransport);
                inspect(dataTypeOrTransport);
                return false;
              } else if (seekingTransport) {
                return !(selected = dataTypeOrTransport);
              }
            });
            return selected;
          }
          return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
        }
        function ajaxExtend(target, src) {
          var key2, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
          for (key2 in src) {
            if (src[key2] !== void 0) {
              (flatOptions[key2] ? target : deep || (deep = {}))[key2] = src[key2];
            }
          }
          if (deep) {
            jQuery.extend(true, target, deep);
          }
          return target;
        }
        function ajaxHandleResponses(s, jqXHR, responses) {
          var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
          while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === void 0) {
              ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
          }
          if (ct) {
            for (type in contents) {
              if (contents[type] && contents[type].test(ct)) {
                dataTypes.unshift(type);
                break;
              }
            }
          }
          if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
          } else {
            for (type in responses) {
              if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                finalDataType = type;
                break;
              }
              if (!firstDataType) {
                firstDataType = type;
              }
            }
            finalDataType = finalDataType || firstDataType;
          }
          if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
              dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
          }
        }
        function ajaxConvert(s, response, jqXHR, isSuccess) {
          var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
          if (dataTypes[1]) {
            for (conv in s.converters) {
              converters[conv.toLowerCase()] = s.converters[conv];
            }
          }
          current = dataTypes.shift();
          while (current) {
            if (s.responseFields[current]) {
              jqXHR[s.responseFields[current]] = response;
            }
            if (!prev && isSuccess && s.dataFilter) {
              response = s.dataFilter(response, s.dataType);
            }
            prev = current;
            current = dataTypes.shift();
            if (current) {
              if (current === "*") {
                current = prev;
              } else if (prev !== "*" && prev !== current) {
                conv = converters[prev + " " + current] || converters["* " + current];
                if (!conv) {
                  for (conv2 in converters) {
                    tmp = conv2.split(" ");
                    if (tmp[1] === current) {
                      conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                      if (conv) {
                        if (conv === true) {
                          conv = converters[conv2];
                        } else if (converters[conv2] !== true) {
                          current = tmp[0];
                          dataTypes.unshift(tmp[1]);
                        }
                        break;
                      }
                    }
                  }
                }
                if (conv !== true) {
                  if (conv && s.throws) {
                    response = conv(response);
                  } else {
                    try {
                      response = conv(response);
                    } catch (e) {
                      return {
                        state: "parsererror",
                        error: conv ? e : "No conversion from " + prev + " to " + current
                      };
                    }
                  }
                }
              }
            }
          }
          return { state: "success", data: response };
        }
        jQuery.extend({
          active: 0,
          lastModified: {},
          etag: {},
          ajaxSettings: {
            url: location.href,
            type: "GET",
            isLocal: rlocalProtocol.test(location.protocol),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
              "*": allTypes,
              text: "text/plain",
              html: "text/html",
              xml: "application/xml, text/xml",
              json: "application/json, text/javascript"
            },
            contents: {
              xml: /\bxml\b/,
              html: /\bhtml/,
              json: /\bjson\b/
            },
            responseFields: {
              xml: "responseXML",
              text: "responseText",
              json: "responseJSON"
            },
            converters: {
              "* text": String,
              "text html": true,
              "text json": JSON.parse,
              "text xml": jQuery.parseXML
            },
            flatOptions: {
              url: true,
              context: true
            }
          },
          ajaxSetup: function(target, settings) {
            return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
          },
          ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
          ajaxTransport: addToPrefiltersOrTransports(transports),
          ajax: function(url, options) {
            if (typeof url === "object") {
              options = url;
              url = void 0;
            }
            options = options || {};
            var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed2, fireGlobals, i, uncached, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
              readyState: 0,
              getResponseHeader: function(key2) {
                var match;
                if (completed2) {
                  if (!responseHeaders) {
                    responseHeaders = {};
                    while (match = rheaders.exec(responseHeadersString)) {
                      responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
                    }
                  }
                  match = responseHeaders[key2.toLowerCase() + " "];
                }
                return match == null ? null : match.join(", ");
              },
              getAllResponseHeaders: function() {
                return completed2 ? responseHeadersString : null;
              },
              setRequestHeader: function(name2, value2) {
                if (completed2 == null) {
                  name2 = requestHeadersNames[name2.toLowerCase()] = requestHeadersNames[name2.toLowerCase()] || name2;
                  requestHeaders[name2] = value2;
                }
                return this;
              },
              overrideMimeType: function(type) {
                if (completed2 == null) {
                  s.mimeType = type;
                }
                return this;
              },
              statusCode: function(map) {
                var code;
                if (map) {
                  if (completed2) {
                    jqXHR.always(map[jqXHR.status]);
                  } else {
                    for (code in map) {
                      statusCode[code] = [statusCode[code], map[code]];
                    }
                  }
                }
                return this;
              },
              abort: function(statusText) {
                var finalText = statusText || strAbort;
                if (transport) {
                  transport.abort(finalText);
                }
                done(0, finalText);
                return this;
              }
            };
            deferred.promise(jqXHR);
            s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");
            s.type = options.method || options.type || s.method || s.type;
            s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
            if (s.crossDomain == null) {
              urlAnchor = document2.createElement("a");
              try {
                urlAnchor.href = s.url;
                urlAnchor.href = urlAnchor.href;
                s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
              } catch (e) {
                s.crossDomain = true;
              }
            }
            if (s.data && s.processData && typeof s.data !== "string") {
              s.data = jQuery.param(s.data, s.traditional);
            }
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
            if (completed2) {
              return jqXHR;
            }
            fireGlobals = jQuery.event && s.global;
            if (fireGlobals && jQuery.active++ === 0) {
              jQuery.event.trigger("ajaxStart");
            }
            s.type = s.type.toUpperCase();
            s.hasContent = !rnoContent.test(s.type);
            cacheURL = s.url.replace(rhash, "");
            if (!s.hasContent) {
              uncached = s.url.slice(cacheURL.length);
              if (s.data && (s.processData || typeof s.data === "string")) {
                cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
                delete s.data;
              }
              if (s.cache === false) {
                cacheURL = cacheURL.replace(rantiCache, "$1");
                uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
              }
              s.url = cacheURL + uncached;
            } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
              s.data = s.data.replace(r20, "+");
            }
            if (s.ifModified) {
              if (jQuery.lastModified[cacheURL]) {
                jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
              }
              if (jQuery.etag[cacheURL]) {
                jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
              }
            }
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
              jqXHR.setRequestHeader("Content-Type", s.contentType);
            }
            jqXHR.setRequestHeader(
              "Accept",
              s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]
            );
            for (i in s.headers) {
              jqXHR.setRequestHeader(i, s.headers[i]);
            }
            if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed2)) {
              return jqXHR.abort();
            }
            strAbort = "abort";
            completeDeferred.add(s.complete);
            jqXHR.done(s.success);
            jqXHR.fail(s.error);
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
            if (!transport) {
              done(-1, "No Transport");
            } else {
              jqXHR.readyState = 1;
              if (fireGlobals) {
                globalEventContext.trigger("ajaxSend", [jqXHR, s]);
              }
              if (completed2) {
                return jqXHR;
              }
              if (s.async && s.timeout > 0) {
                timeoutTimer = window2.setTimeout(function() {
                  jqXHR.abort("timeout");
                }, s.timeout);
              }
              try {
                completed2 = false;
                transport.send(requestHeaders, done);
              } catch (e) {
                if (completed2) {
                  throw e;
                }
                done(-1, e);
              }
            }
            function done(status, nativeStatusText, responses, headers) {
              var isSuccess, success, error, response, modified, statusText = nativeStatusText;
              if (completed2) {
                return;
              }
              completed2 = true;
              if (timeoutTimer) {
                window2.clearTimeout(timeoutTimer);
              }
              transport = void 0;
              responseHeadersString = headers || "";
              jqXHR.readyState = status > 0 ? 4 : 0;
              isSuccess = status >= 200 && status < 300 || status === 304;
              if (responses) {
                response = ajaxHandleResponses(s, jqXHR, responses);
              }
              if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1 && jQuery.inArray("json", s.dataTypes) < 0) {
                s.converters["text script"] = function() {
                };
              }
              response = ajaxConvert(s, response, jqXHR, isSuccess);
              if (isSuccess) {
                if (s.ifModified) {
                  modified = jqXHR.getResponseHeader("Last-Modified");
                  if (modified) {
                    jQuery.lastModified[cacheURL] = modified;
                  }
                  modified = jqXHR.getResponseHeader("etag");
                  if (modified) {
                    jQuery.etag[cacheURL] = modified;
                  }
                }
                if (status === 204 || s.type === "HEAD") {
                  statusText = "nocontent";
                } else if (status === 304) {
                  statusText = "notmodified";
                } else {
                  statusText = response.state;
                  success = response.data;
                  error = response.error;
                  isSuccess = !error;
                }
              } else {
                error = statusText;
                if (status || !statusText) {
                  statusText = "error";
                  if (status < 0) {
                    status = 0;
                  }
                }
              }
              jqXHR.status = status;
              jqXHR.statusText = (nativeStatusText || statusText) + "";
              if (isSuccess) {
                deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
              } else {
                deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
              }
              jqXHR.statusCode(statusCode);
              statusCode = void 0;
              if (fireGlobals) {
                globalEventContext.trigger(
                  isSuccess ? "ajaxSuccess" : "ajaxError",
                  [jqXHR, s, isSuccess ? success : error]
                );
              }
              completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
              if (fireGlobals) {
                globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
                if (!--jQuery.active) {
                  jQuery.event.trigger("ajaxStop");
                }
              }
            }
            return jqXHR;
          },
          getJSON: function(url, data2, callback) {
            return jQuery.get(url, data2, callback, "json");
          },
          getScript: function(url, callback) {
            return jQuery.get(url, void 0, callback, "script");
          }
        });
        jQuery.each(["get", "post"], function(_i, method) {
          jQuery[method] = function(url, data2, callback, type) {
            if (isFunction(data2)) {
              type = type || callback;
              callback = data2;
              data2 = void 0;
            }
            return jQuery.ajax(jQuery.extend({
              url,
              type: method,
              dataType: type,
              data: data2,
              success: callback
            }, jQuery.isPlainObject(url) && url));
          };
        });
        jQuery.ajaxPrefilter(function(s) {
          var i;
          for (i in s.headers) {
            if (i.toLowerCase() === "content-type") {
              s.contentType = s.headers[i] || "";
            }
          }
        });
        jQuery._evalUrl = function(url, options, doc) {
          return jQuery.ajax({
            url,
            type: "GET",
            dataType: "script",
            cache: true,
            async: false,
            global: false,
            converters: {
              "text script": function() {
              }
            },
            dataFilter: function(response) {
              jQuery.globalEval(response, options, doc);
            }
          });
        };
        jQuery.fn.extend({
          wrapAll: function(html) {
            var wrap;
            if (this[0]) {
              if (isFunction(html)) {
                html = html.call(this[0]);
              }
              wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
              if (this[0].parentNode) {
                wrap.insertBefore(this[0]);
              }
              wrap.map(function() {
                var elem2 = this;
                while (elem2.firstElementChild) {
                  elem2 = elem2.firstElementChild;
                }
                return elem2;
              }).append(this);
            }
            return this;
          },
          wrapInner: function(html) {
            if (isFunction(html)) {
              return this.each(function(i) {
                jQuery(this).wrapInner(html.call(this, i));
              });
            }
            return this.each(function() {
              var self = jQuery(this), contents = self.contents();
              if (contents.length) {
                contents.wrapAll(html);
              } else {
                self.append(html);
              }
            });
          },
          wrap: function(html) {
            var htmlIsFunction = isFunction(html);
            return this.each(function(i) {
              jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
            });
          },
          unwrap: function(selector) {
            this.parent(selector).not("body").each(function() {
              jQuery(this).replaceWith(this.childNodes);
            });
            return this;
          }
        });
        jQuery.expr.pseudos.hidden = function(elem2) {
          return !jQuery.expr.pseudos.visible(elem2);
        };
        jQuery.expr.pseudos.visible = function(elem2) {
          return !!(elem2.offsetWidth || elem2.offsetHeight || elem2.getClientRects().length);
        };
        jQuery.ajaxSettings.xhr = function() {
          try {
            return new window2.XMLHttpRequest();
          } catch (e) {
          }
        };
        var xhrSuccessStatus = {
          0: 200,
          1223: 204
        }, xhrSupported = jQuery.ajaxSettings.xhr();
        support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
        support.ajax = xhrSupported = !!xhrSupported;
        jQuery.ajaxTransport(function(options) {
          var callback, errorCallback;
          if (support.cors || xhrSupported && !options.crossDomain) {
            return {
              send: function(headers, complete) {
                var i, xhr = options.xhr();
                xhr.open(
                  options.type,
                  options.url,
                  options.async,
                  options.username,
                  options.password
                );
                if (options.xhrFields) {
                  for (i in options.xhrFields) {
                    xhr[i] = options.xhrFields[i];
                  }
                }
                if (options.mimeType && xhr.overrideMimeType) {
                  xhr.overrideMimeType(options.mimeType);
                }
                if (!options.crossDomain && !headers["X-Requested-With"]) {
                  headers["X-Requested-With"] = "XMLHttpRequest";
                }
                for (i in headers) {
                  xhr.setRequestHeader(i, headers[i]);
                }
                callback = function(type) {
                  return function() {
                    if (callback) {
                      callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                      if (type === "abort") {
                        xhr.abort();
                      } else if (type === "error") {
                        if (typeof xhr.status !== "number") {
                          complete(0, "error");
                        } else {
                          complete(
                            xhr.status,
                            xhr.statusText
                          );
                        }
                      } else {
                        complete(
                          xhrSuccessStatus[xhr.status] || xhr.status,
                          xhr.statusText,
                          (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText },
                          xhr.getAllResponseHeaders()
                        );
                      }
                    }
                  };
                };
                xhr.onload = callback();
                errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
                if (xhr.onabort !== void 0) {
                  xhr.onabort = errorCallback;
                } else {
                  xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                      window2.setTimeout(function() {
                        if (callback) {
                          errorCallback();
                        }
                      });
                    }
                  };
                }
                callback = callback("abort");
                try {
                  xhr.send(options.hasContent && options.data || null);
                } catch (e) {
                  if (callback) {
                    throw e;
                  }
                }
              },
              abort: function() {
                if (callback) {
                  callback();
                }
              }
            };
          }
        });
        jQuery.ajaxPrefilter(function(s) {
          if (s.crossDomain) {
            s.contents.script = false;
          }
        });
        jQuery.ajaxSetup({
          accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
          },
          contents: {
            script: /\b(?:java|ecma)script\b/
          },
          converters: {
            "text script": function(text2) {
              jQuery.globalEval(text2);
              return text2;
            }
          }
        });
        jQuery.ajaxPrefilter("script", function(s) {
          if (s.cache === void 0) {
            s.cache = false;
          }
          if (s.crossDomain) {
            s.type = "GET";
          }
        });
        jQuery.ajaxTransport("script", function(s) {
          if (s.crossDomain || s.scriptAttrs) {
            var script, callback;
            return {
              send: function(_, complete) {
                script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({ charset: s.scriptCharset, src: s.url }).on("load error", callback = function(evt) {
                  script.remove();
                  callback = null;
                  if (evt) {
                    complete(evt.type === "error" ? 404 : 200, evt.type);
                  }
                });
                document2.head.appendChild(script[0]);
              },
              abort: function() {
                if (callback) {
                  callback();
                }
              }
            };
          }
        });
        var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
        jQuery.ajaxSetup({
          jsonp: "callback",
          jsonpCallback: function() {
            var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce.guid++;
            this[callback] = true;
            return callback;
          }
        });
        jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
          var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
          if (jsonProp || s.dataTypes[0] === "jsonp") {
            callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
            if (jsonProp) {
              s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
              s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }
            s.converters["script json"] = function() {
              if (!responseContainer) {
                jQuery.error(callbackName + " was not called");
              }
              return responseContainer[0];
            };
            s.dataTypes[0] = "json";
            overwritten = window2[callbackName];
            window2[callbackName] = function() {
              responseContainer = arguments;
            };
            jqXHR.always(function() {
              if (overwritten === void 0) {
                jQuery(window2).removeProp(callbackName);
              } else {
                window2[callbackName] = overwritten;
              }
              if (s[callbackName]) {
                s.jsonpCallback = originalSettings.jsonpCallback;
                oldCallbacks.push(callbackName);
              }
              if (responseContainer && isFunction(overwritten)) {
                overwritten(responseContainer[0]);
              }
              responseContainer = overwritten = void 0;
            });
            return "script";
          }
        });
        support.createHTMLDocument = function() {
          var body = document2.implementation.createHTMLDocument("").body;
          body.innerHTML = "<form></form><form></form>";
          return body.childNodes.length === 2;
        }();
        jQuery.parseHTML = function(data2, context, keepScripts) {
          if (typeof data2 !== "string") {
            return [];
          }
          if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
          }
          var base, parsed, scripts2;
          if (!context) {
            if (support.createHTMLDocument) {
              context = document2.implementation.createHTMLDocument("");
              base = context.createElement("base");
              base.href = document2.location.href;
              context.head.appendChild(base);
            } else {
              context = document2;
            }
          }
          parsed = rsingleTag.exec(data2);
          scripts2 = !keepScripts && [];
          if (parsed) {
            return [context.createElement(parsed[1])];
          }
          parsed = buildFragment([data2], context, scripts2);
          if (scripts2 && scripts2.length) {
            jQuery(scripts2).remove();
          }
          return jQuery.merge([], parsed.childNodes);
        };
        jQuery.fn.load = function(url, params, callback) {
          var selector, type, response, self = this, off = url.indexOf(" ");
          if (off > -1) {
            selector = stripAndCollapse(url.slice(off));
            url = url.slice(0, off);
          }
          if (isFunction(params)) {
            callback = params;
            params = void 0;
          } else if (params && typeof params === "object") {
            type = "POST";
          }
          if (self.length > 0) {
            jQuery.ajax({
              url,
              type: type || "GET",
              dataType: "html",
              data: params
            }).done(function(responseText) {
              response = arguments;
              self.html(selector ? jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) : responseText);
            }).always(callback && function(jqXHR, status) {
              self.each(function() {
                callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
              });
            });
          }
          return this;
        };
        jQuery.expr.pseudos.animated = function(elem2) {
          return jQuery.grep(jQuery.timers, function(fn) {
            return elem2 === fn.elem;
          }).length;
        };
        jQuery.offset = {
          setOffset: function(elem2, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position2 = jQuery.css(elem2, "position"), curElem = jQuery(elem2), props = {};
            if (position2 === "static") {
              elem2.style.position = "relative";
            }
            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem2, "top");
            curCSSLeft = jQuery.css(elem2, "left");
            calculatePosition = (position2 === "absolute" || position2 === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
            if (calculatePosition) {
              curPosition = curElem.position();
              curTop = curPosition.top;
              curLeft = curPosition.left;
            } else {
              curTop = parseFloat(curCSSTop) || 0;
              curLeft = parseFloat(curCSSLeft) || 0;
            }
            if (isFunction(options)) {
              options = options.call(elem2, i, jQuery.extend({}, curOffset));
            }
            if (options.top != null) {
              props.top = options.top - curOffset.top + curTop;
            }
            if (options.left != null) {
              props.left = options.left - curOffset.left + curLeft;
            }
            if ("using" in options) {
              options.using.call(elem2, props);
            } else {
              curElem.css(props);
            }
          }
        };
        jQuery.fn.extend({
          offset: function(options) {
            if (arguments.length) {
              return options === void 0 ? this : this.each(function(i) {
                jQuery.offset.setOffset(this, options, i);
              });
            }
            var rect, win, elem2 = this[0];
            if (!elem2) {
              return;
            }
            if (!elem2.getClientRects().length) {
              return { top: 0, left: 0 };
            }
            rect = elem2.getBoundingClientRect();
            win = elem2.ownerDocument.defaultView;
            return {
              top: rect.top + win.pageYOffset,
              left: rect.left + win.pageXOffset
            };
          },
          position: function() {
            if (!this[0]) {
              return;
            }
            var offsetParent, offset, doc, elem2 = this[0], parentOffset = { top: 0, left: 0 };
            if (jQuery.css(elem2, "position") === "fixed") {
              offset = elem2.getBoundingClientRect();
            } else {
              offset = this.offset();
              doc = elem2.ownerDocument;
              offsetParent = elem2.offsetParent || doc.documentElement;
              while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
                offsetParent = offsetParent.parentNode;
              }
              if (offsetParent && offsetParent !== elem2 && offsetParent.nodeType === 1) {
                parentOffset = jQuery(offsetParent).offset();
                parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
              }
            }
            return {
              top: offset.top - parentOffset.top - jQuery.css(elem2, "marginTop", true),
              left: offset.left - parentOffset.left - jQuery.css(elem2, "marginLeft", true)
            };
          },
          offsetParent: function() {
            return this.map(function() {
              var offsetParent = this.offsetParent;
              while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
                offsetParent = offsetParent.offsetParent;
              }
              return offsetParent || documentElement;
            });
          }
        });
        jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop) {
          var top = "pageYOffset" === prop;
          jQuery.fn[method] = function(val2) {
            return access(this, function(elem2, method2, val3) {
              var win;
              if (isWindow(elem2)) {
                win = elem2;
              } else if (elem2.nodeType === 9) {
                win = elem2.defaultView;
              }
              if (val3 === void 0) {
                return win ? win[prop] : elem2[method2];
              }
              if (win) {
                win.scrollTo(
                  !top ? val3 : win.pageXOffset,
                  top ? val3 : win.pageYOffset
                );
              } else {
                elem2[method2] = val3;
              }
            }, method, val2, arguments.length);
          };
        });
        jQuery.each(["top", "left"], function(_i, prop) {
          jQuery.cssHooks[prop] = addGetHookIf(
            support.pixelPosition,
            function(elem2, computed) {
              if (computed) {
                computed = curCSS(elem2, prop);
                return rnumnonpx.test(computed) ? jQuery(elem2).position()[prop] + "px" : computed;
              }
            }
          );
        });
        jQuery.each({ Height: "height", Width: "width" }, function(name2, type) {
          jQuery.each({
            padding: "inner" + name2,
            content: type,
            "": "outer" + name2
          }, function(defaultExtra, funcName) {
            jQuery.fn[funcName] = function(margin, value2) {
              var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra = defaultExtra || (margin === true || value2 === true ? "margin" : "border");
              return access(this, function(elem2, type2, value3) {
                var doc;
                if (isWindow(elem2)) {
                  return funcName.indexOf("outer") === 0 ? elem2["inner" + name2] : elem2.document.documentElement["client" + name2];
                }
                if (elem2.nodeType === 9) {
                  doc = elem2.documentElement;
                  return Math.max(
                    elem2.body["scroll" + name2],
                    doc["scroll" + name2],
                    elem2.body["offset" + name2],
                    doc["offset" + name2],
                    doc["client" + name2]
                  );
                }
                return value3 === void 0 ? jQuery.css(elem2, type2, extra) : jQuery.style(elem2, type2, value3, extra);
              }, type, chainable ? margin : void 0, chainable);
            };
          });
        });
        jQuery.each([
          "ajaxStart",
          "ajaxStop",
          "ajaxComplete",
          "ajaxError",
          "ajaxSuccess",
          "ajaxSend"
        ], function(_i, type) {
          jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
          };
        });
        jQuery.fn.extend({
          bind: function(types, data2, fn) {
            return this.on(types, null, data2, fn);
          },
          unbind: function(types, fn) {
            return this.off(types, null, fn);
          },
          delegate: function(selector, types, data2, fn) {
            return this.on(types, selector, data2, fn);
          },
          undelegate: function(selector, types, fn) {
            return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
          },
          hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
          }
        });
        jQuery.each(
          "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),
          function(_i, name2) {
            jQuery.fn[name2] = function(data2, fn) {
              return arguments.length > 0 ? this.on(name2, null, data2, fn) : this.trigger(name2);
            };
          }
        );
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        jQuery.proxy = function(fn, context) {
          var tmp, args, proxy;
          if (typeof context === "string") {
            tmp = fn[context];
            context = fn;
            fn = tmp;
          }
          if (!isFunction(fn)) {
            return void 0;
          }
          args = slice.call(arguments, 2);
          proxy = function() {
            return fn.apply(context || this, args.concat(slice.call(arguments)));
          };
          proxy.guid = fn.guid = fn.guid || jQuery.guid++;
          return proxy;
        };
        jQuery.holdReady = function(hold) {
          if (hold) {
            jQuery.readyWait++;
          } else {
            jQuery.ready(true);
          }
        };
        jQuery.isArray = Array.isArray;
        jQuery.parseJSON = JSON.parse;
        jQuery.nodeName = nodeName;
        jQuery.isFunction = isFunction;
        jQuery.isWindow = isWindow;
        jQuery.camelCase = camelCase;
        jQuery.type = toType;
        jQuery.now = Date.now;
        jQuery.isNumeric = function(obj) {
          var type = jQuery.type(obj);
          return (type === "number" || type === "string") && !isNaN(obj - parseFloat(obj));
        };
        jQuery.trim = function(text2) {
          return text2 == null ? "" : (text2 + "").replace(rtrim, "");
        };
        if (typeof define === "function" && define.amd) {
          define("jquery", [], function() {
            return jQuery;
          });
        }
        var _jQuery = window2.jQuery, _$ = window2.$;
        jQuery.noConflict = function(deep) {
          if (window2.$ === jQuery) {
            window2.$ = _$;
          }
          if (deep && window2.jQuery === jQuery) {
            window2.jQuery = _jQuery;
          }
          return jQuery;
        };
        if (typeof noGlobal === "undefined") {
          window2.jQuery = window2.$ = jQuery;
        }
        return jQuery;
      });
    }
  });

  // node_modules/mousetrap/mousetrap.js
  var require_mousetrap = __commonJS({
    "node_modules/mousetrap/mousetrap.js"(exports2, module2) {
      (function(window2, document2, undefined2) {
        if (!window2) {
          return;
        }
        var _MAP = {
          8: "backspace",
          9: "tab",
          13: "enter",
          16: "shift",
          17: "ctrl",
          18: "alt",
          20: "capslock",
          27: "esc",
          32: "space",
          33: "pageup",
          34: "pagedown",
          35: "end",
          36: "home",
          37: "left",
          38: "up",
          39: "right",
          40: "down",
          45: "ins",
          46: "del",
          91: "meta",
          93: "meta",
          224: "meta"
        };
        var _KEYCODE_MAP = {
          106: "*",
          107: "+",
          109: "-",
          110: ".",
          111: "/",
          186: ";",
          187: "=",
          188: ",",
          189: "-",
          190: ".",
          191: "/",
          192: "`",
          219: "[",
          220: "\\",
          221: "]",
          222: "'"
        };
        var _SHIFT_MAP = {
          "~": "`",
          "!": "1",
          "@": "2",
          "#": "3",
          "$": "4",
          "%": "5",
          "^": "6",
          "&": "7",
          "*": "8",
          "(": "9",
          ")": "0",
          "_": "-",
          "+": "=",
          ":": ";",
          '"': "'",
          "<": ",",
          ">": ".",
          "?": "/",
          "|": "\\"
        };
        var _SPECIAL_ALIASES = {
          "option": "alt",
          "command": "meta",
          "return": "enter",
          "escape": "esc",
          "plus": "+",
          "mod": /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
        };
        var _REVERSE_MAP;
        for (var i = 1; i < 20; ++i) {
          _MAP[111 + i] = "f" + i;
        }
        for (i = 0; i <= 9; ++i) {
          _MAP[i + 96] = i.toString();
        }
        function _addEvent(object, type, callback) {
          if (object.addEventListener) {
            object.addEventListener(type, callback, false);
            return;
          }
          object.attachEvent("on" + type, callback);
        }
        function _characterFromEvent(e) {
          if (e.type == "keypress") {
            var character = String.fromCharCode(e.which);
            if (!e.shiftKey) {
              character = character.toLowerCase();
            }
            return character;
          }
          if (_MAP[e.which]) {
            return _MAP[e.which];
          }
          if (_KEYCODE_MAP[e.which]) {
            return _KEYCODE_MAP[e.which];
          }
          return String.fromCharCode(e.which).toLowerCase();
        }
        function _modifiersMatch(modifiers1, modifiers2) {
          return modifiers1.sort().join(",") === modifiers2.sort().join(",");
        }
        function _eventModifiers(e) {
          var modifiers = [];
          if (e.shiftKey) {
            modifiers.push("shift");
          }
          if (e.altKey) {
            modifiers.push("alt");
          }
          if (e.ctrlKey) {
            modifiers.push("ctrl");
          }
          if (e.metaKey) {
            modifiers.push("meta");
          }
          return modifiers;
        }
        function _preventDefault(e) {
          if (e.preventDefault) {
            e.preventDefault();
            return;
          }
          e.returnValue = false;
        }
        function _stopPropagation(e) {
          if (e.stopPropagation) {
            e.stopPropagation();
            return;
          }
          e.cancelBubble = true;
        }
        function _isModifier(key2) {
          return key2 == "shift" || key2 == "ctrl" || key2 == "alt" || key2 == "meta";
        }
        function _getReverseMap() {
          if (!_REVERSE_MAP) {
            _REVERSE_MAP = {};
            for (var key2 in _MAP) {
              if (key2 > 95 && key2 < 112) {
                continue;
              }
              if (_MAP.hasOwnProperty(key2)) {
                _REVERSE_MAP[_MAP[key2]] = key2;
              }
            }
          }
          return _REVERSE_MAP;
        }
        function _pickBestAction(key2, modifiers, action) {
          if (!action) {
            action = _getReverseMap()[key2] ? "keydown" : "keypress";
          }
          if (action == "keypress" && modifiers.length) {
            action = "keydown";
          }
          return action;
        }
        function _keysFromString(combination) {
          if (combination === "+") {
            return ["+"];
          }
          combination = combination.replace(/\+{2}/g, "+plus");
          return combination.split("+");
        }
        function _getKeyInfo(combination, action) {
          var keys;
          var key2;
          var i2;
          var modifiers = [];
          keys = _keysFromString(combination);
          for (i2 = 0; i2 < keys.length; ++i2) {
            key2 = keys[i2];
            if (_SPECIAL_ALIASES[key2]) {
              key2 = _SPECIAL_ALIASES[key2];
            }
            if (action && action != "keypress" && _SHIFT_MAP[key2]) {
              key2 = _SHIFT_MAP[key2];
              modifiers.push("shift");
            }
            if (_isModifier(key2)) {
              modifiers.push(key2);
            }
          }
          action = _pickBestAction(key2, modifiers, action);
          return {
            key: key2,
            modifiers,
            action
          };
        }
        function _belongsTo(element, ancestor) {
          if (element === null || element === document2) {
            return false;
          }
          if (element === ancestor) {
            return true;
          }
          return _belongsTo(element.parentNode, ancestor);
        }
        function Mousetrap2(targetElement) {
          var self = this;
          targetElement = targetElement || document2;
          if (!(self instanceof Mousetrap2)) {
            return new Mousetrap2(targetElement);
          }
          self.target = targetElement;
          self._callbacks = {};
          self._directMap = {};
          var _sequenceLevels = {};
          var _resetTimer;
          var _ignoreNextKeyup = false;
          var _ignoreNextKeypress = false;
          var _nextExpectedAction = false;
          function _resetSequences(doNotReset) {
            doNotReset = doNotReset || {};
            var activeSequences = false, key2;
            for (key2 in _sequenceLevels) {
              if (doNotReset[key2]) {
                activeSequences = true;
                continue;
              }
              _sequenceLevels[key2] = 0;
            }
            if (!activeSequences) {
              _nextExpectedAction = false;
            }
          }
          function _getMatches(character, modifiers, e, sequenceName, combination, level) {
            var i2;
            var callback;
            var matches = [];
            var action = e.type;
            if (!self._callbacks[character]) {
              return [];
            }
            if (action == "keyup" && _isModifier(character)) {
              modifiers = [character];
            }
            for (i2 = 0; i2 < self._callbacks[character].length; ++i2) {
              callback = self._callbacks[character][i2];
              if (!sequenceName && callback.seq && _sequenceLevels[callback.seq] != callback.level) {
                continue;
              }
              if (action != callback.action) {
                continue;
              }
              if (action == "keypress" && !e.metaKey && !e.ctrlKey || _modifiersMatch(modifiers, callback.modifiers)) {
                var deleteCombo = !sequenceName && callback.combo == combination;
                var deleteSequence = sequenceName && callback.seq == sequenceName && callback.level == level;
                if (deleteCombo || deleteSequence) {
                  self._callbacks[character].splice(i2, 1);
                }
                matches.push(callback);
              }
            }
            return matches;
          }
          function _fireCallback(callback, e, combo, sequence) {
            if (self.stopCallback(e, e.target || e.srcElement, combo, sequence)) {
              return;
            }
            if (callback(e, combo) === false) {
              _preventDefault(e);
              _stopPropagation(e);
            }
          }
          self._handleKey = function(character, modifiers, e) {
            var callbacks = _getMatches(character, modifiers, e);
            var i2;
            var doNotReset = {};
            var maxLevel = 0;
            var processedSequenceCallback = false;
            for (i2 = 0; i2 < callbacks.length; ++i2) {
              if (callbacks[i2].seq) {
                maxLevel = Math.max(maxLevel, callbacks[i2].level);
              }
            }
            for (i2 = 0; i2 < callbacks.length; ++i2) {
              if (callbacks[i2].seq) {
                if (callbacks[i2].level != maxLevel) {
                  continue;
                }
                processedSequenceCallback = true;
                doNotReset[callbacks[i2].seq] = 1;
                _fireCallback(callbacks[i2].callback, e, callbacks[i2].combo, callbacks[i2].seq);
                continue;
              }
              if (!processedSequenceCallback) {
                _fireCallback(callbacks[i2].callback, e, callbacks[i2].combo);
              }
            }
            var ignoreThisKeypress = e.type == "keypress" && _ignoreNextKeypress;
            if (e.type == _nextExpectedAction && !_isModifier(character) && !ignoreThisKeypress) {
              _resetSequences(doNotReset);
            }
            _ignoreNextKeypress = processedSequenceCallback && e.type == "keydown";
          };
          function _handleKeyEvent(e) {
            if (typeof e.which !== "number") {
              e.which = e.keyCode;
            }
            var character = _characterFromEvent(e);
            if (!character) {
              return;
            }
            if (e.type == "keyup" && _ignoreNextKeyup === character) {
              _ignoreNextKeyup = false;
              return;
            }
            self.handleKey(character, _eventModifiers(e), e);
          }
          function _resetSequenceTimer() {
            clearTimeout(_resetTimer);
            _resetTimer = setTimeout(_resetSequences, 1e3);
          }
          function _bindSequence(combo, keys, callback, action) {
            _sequenceLevels[combo] = 0;
            function _increaseSequence(nextAction) {
              return function() {
                _nextExpectedAction = nextAction;
                ++_sequenceLevels[combo];
                _resetSequenceTimer();
              };
            }
            function _callbackAndReset(e) {
              _fireCallback(callback, e, combo);
              if (action !== "keyup") {
                _ignoreNextKeyup = _characterFromEvent(e);
              }
              setTimeout(_resetSequences, 10);
            }
            for (var i2 = 0; i2 < keys.length; ++i2) {
              var isFinal = i2 + 1 === keys.length;
              var wrappedCallback = isFinal ? _callbackAndReset : _increaseSequence(action || _getKeyInfo(keys[i2 + 1]).action);
              _bindSingle(keys[i2], wrappedCallback, action, combo, i2);
            }
          }
          function _bindSingle(combination, callback, action, sequenceName, level) {
            self._directMap[combination + ":" + action] = callback;
            combination = combination.replace(/\s+/g, " ");
            var sequence = combination.split(" ");
            var info;
            if (sequence.length > 1) {
              _bindSequence(combination, sequence, callback, action);
              return;
            }
            info = _getKeyInfo(combination, action);
            self._callbacks[info.key] = self._callbacks[info.key] || [];
            _getMatches(info.key, info.modifiers, { type: info.action }, sequenceName, combination, level);
            self._callbacks[info.key][sequenceName ? "unshift" : "push"]({
              callback,
              modifiers: info.modifiers,
              action: info.action,
              seq: sequenceName,
              level,
              combo: combination
            });
          }
          self._bindMultiple = function(combinations, callback, action) {
            for (var i2 = 0; i2 < combinations.length; ++i2) {
              _bindSingle(combinations[i2], callback, action);
            }
          };
          _addEvent(targetElement, "keypress", _handleKeyEvent);
          _addEvent(targetElement, "keydown", _handleKeyEvent);
          _addEvent(targetElement, "keyup", _handleKeyEvent);
        }
        Mousetrap2.prototype.bind = function(keys, callback, action) {
          var self = this;
          keys = keys instanceof Array ? keys : [keys];
          self._bindMultiple.call(self, keys, callback, action);
          return self;
        };
        Mousetrap2.prototype.unbind = function(keys, action) {
          var self = this;
          return self.bind.call(self, keys, function() {
          }, action);
        };
        Mousetrap2.prototype.trigger = function(keys, action) {
          var self = this;
          if (self._directMap[keys + ":" + action]) {
            self._directMap[keys + ":" + action]({}, keys);
          }
          return self;
        };
        Mousetrap2.prototype.reset = function() {
          var self = this;
          self._callbacks = {};
          self._directMap = {};
          return self;
        };
        Mousetrap2.prototype.stopCallback = function(e, element) {
          var self = this;
          if ((" " + element.className + " ").indexOf(" mousetrap ") > -1) {
            return false;
          }
          if (_belongsTo(element, self.target)) {
            return false;
          }
          if ("composedPath" in e && typeof e.composedPath === "function") {
            var initialEventTarget = e.composedPath()[0];
            if (initialEventTarget !== e.target) {
              element = initialEventTarget;
            }
          }
          return element.tagName == "INPUT" || element.tagName == "SELECT" || element.tagName == "TEXTAREA" || element.isContentEditable;
        };
        Mousetrap2.prototype.handleKey = function() {
          var self = this;
          return self._handleKey.apply(self, arguments);
        };
        Mousetrap2.addKeycodes = function(object) {
          for (var key2 in object) {
            if (object.hasOwnProperty(key2)) {
              _MAP[key2] = object[key2];
            }
          }
          _REVERSE_MAP = null;
        };
        Mousetrap2.init = function() {
          var documentMousetrap = Mousetrap2(document2);
          for (var method in documentMousetrap) {
            if (method.charAt(0) !== "_") {
              Mousetrap2[method] = function(method2) {
                return function() {
                  return documentMousetrap[method2].apply(documentMousetrap, arguments);
                };
              }(method);
            }
          }
        };
        Mousetrap2.init();
        window2.Mousetrap = Mousetrap2;
        if (typeof module2 !== "undefined" && module2.exports) {
          module2.exports = Mousetrap2;
        }
        if (typeof define === "function" && define.amd) {
          define(function() {
            return Mousetrap2;
          });
        }
      })(typeof window !== "undefined" ? window : null, typeof window !== "undefined" ? document : null);
    }
  });

  // node_modules/eligius/dist/eligius.esm.js
  var import_ts_is_present = __toESM(require_lib());
  var import_lottie_web = __toESM(require_lottie());
  var import_jquery = __toESM(require_jquery());
  var import_mousetrap = __toESM(require_mousetrap());
  function deepCopy(original) {
    if ((0, import_ts_is_present.isDefined)(original)) {
      if (typeof structuredClone !== "undefined") {
        return structuredClone(original);
      }
      return JSON.parse(JSON.stringify(original));
    }
    return original;
  }
  function isPromise(obj) {
    return typeof obj === "object" && typeof obj.then === "function";
  }
  var Action = /* @__PURE__ */ function() {
    function Action2(name2, startOperations, eventbus) {
      this.name = void 0;
      this.startOperations = void 0;
      this.eventbus = void 0;
      this.id = "";
      this.name = name2;
      this.startOperations = startOperations;
      this.eventbus = eventbus;
    }
    var _proto = Action2.prototype;
    _proto.start = function start(initOperationData) {
      var _this = this;
      var context = {
        currentIndex: -1,
        eventbus: this.eventbus
      };
      var result = new Promise(function(resolve, reject) {
        _this.executeOperation(_this.startOperations, 0, resolve, reject, initOperationData, context);
      })["catch"](function(e) {
        console.error("Error in action start '" + _this.name + "'");
        console.error(e);
        throw e;
      });
      return result;
    };
    _proto.executeOperation = function executeOperation(operations, idx, resolve, reject, previousOperationData, context) {
      var _this2 = this;
      if (previousOperationData === void 0) {
        previousOperationData = {};
      }
      if (context.newIndex !== void 0) {
        idx = context.newIndex;
        delete context.newIndex;
      }
      context.currentIndex = idx;
      if (context.skipNextOperation) {
        if (idx < operations.length) {
          this.executeOperation(operations, ++idx, resolve, reject, previousOperationData, context);
        } else {
          resolve(previousOperationData);
        }
      }
      if (idx < operations.length) {
        var operationInfo = operations[idx];
        var copy = operationInfo.operationData ? deepCopy(operationInfo.operationData) : {};
        var mergedOperationData = Object.assign(previousOperationData, copy);
        var operationResult = operationInfo.instance.call(context, mergedOperationData);
        if (isPromise(operationResult)) {
          operationResult.then(function(resultOperationData) {
            _this2.executeOperation(operations, ++idx, resolve, reject, resultOperationData, context);
          })["catch"](function(error) {
            reject(error);
          });
        } else {
          this.executeOperation(operations, ++idx, resolve, reject, operationResult, context);
        }
      } else {
        resolve(previousOperationData);
      }
    };
    return Action2;
  }();
  function _regeneratorRuntime() {
    _regeneratorRuntime = function() {
      return exports2;
    };
    var exports2 = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define2(obj, key2, value2) {
      return Object.defineProperty(obj, key2, {
        value: value2,
        enumerable: true,
        configurable: true,
        writable: true
      }), obj[key2];
    }
    try {
      define2({}, "");
    } catch (err) {
      define2 = function(obj, key2, value2) {
        return obj[key2] = value2;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
      return generator._invoke = function(innerFn2, self2, context2) {
        var state = "suspendedStart";
        return function(method, arg) {
          if ("executing" === state)
            throw new Error("Generator is already running");
          if ("completed" === state) {
            if ("throw" === method)
              throw arg;
            return doneResult();
          }
          for (context2.method = method, context2.arg = arg; ; ) {
            var delegate = context2.delegate;
            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context2);
              if (delegateResult) {
                if (delegateResult === ContinueSentinel)
                  continue;
                return delegateResult;
              }
            }
            if ("next" === context2.method)
              context2.sent = context2._sent = context2.arg;
            else if ("throw" === context2.method) {
              if ("suspendedStart" === state)
                throw state = "completed", context2.arg;
              context2.dispatchException(context2.arg);
            } else
              "return" === context2.method && context2.abrupt("return", context2.arg);
            state = "executing";
            var record = tryCatch(innerFn2, self2, context2);
            if ("normal" === record.type) {
              if (state = context2.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel)
                continue;
              return {
                value: record.arg,
                done: context2.done
              };
            }
            "throw" === record.type && (state = "completed", context2.method = "throw", context2.arg = record.arg);
          }
        };
      }(innerFn, self, context), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports2.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    var IteratorPrototype = {};
    define2(IteratorPrototype, iteratorSymbol, function() {
      return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define2(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg, value2 = result.value;
          return value2 && "object" == typeof value2 && hasOwn.call(value2, "__await") ? PromiseImpl.resolve(value2.__await).then(function(value3) {
            invoke("next", value3, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value2).then(function(unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function(error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      this._invoke = function(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];
      if (void 0 === method) {
        if (context.delegate = null, "throw" === context.method) {
          if (delegate.iterator.return && (context.method = "return", context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method))
            return ContinueSentinel;
          context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }
        return ContinueSentinel;
      }
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type)
        return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = void 0), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(true);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod)
          return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next)
          return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1, next = function next2() {
            for (; ++i < iterable.length; )
              if (hasOwn.call(iterable, i))
                return next2.value = iterable[i], next2.done = false, next2;
            return next2.value = void 0, next2.done = true, next2;
          };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: void 0,
        done: true
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, define2(Gp, "constructor", GeneratorFunctionPrototype), define2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define2(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports2.isGeneratorFunction = function(genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports2.mark = function(genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define2(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports2.awrap = function(arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define2(AsyncIterator.prototype, asyncIteratorSymbol, function() {
      return this;
    }), exports2.AsyncIterator = AsyncIterator, exports2.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports2.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define2(Gp, toStringTagSymbol, "Generator"), define2(Gp, iteratorSymbol, function() {
      return this;
    }), define2(Gp, "toString", function() {
      return "[object Generator]";
    }), exports2.keys = function(object) {
      var keys = [];
      for (var key2 in object)
        keys.push(key2);
      return keys.reverse(), function next() {
        for (; keys.length; ) {
          var key3 = keys.pop();
          if (key3 in object)
            return next.value = key3, next.done = false, next;
        }
        return next.done = true, next;
      };
    }, exports2.values = values, Context.prototype = {
      constructor: Context,
      reset: function(skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), !skipTempReset)
          for (var name2 in this)
            "t" === name2.charAt(0) && hasOwn.call(this, name2) && !isNaN(+name2.slice(1)) && (this[name2] = void 0);
      },
      stop: function() {
        this.done = true;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type)
          throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function(exception) {
        if (this.done)
          throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = void 0), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i], record = entry.completion;
          if ("root" === entry.tryLoc)
            return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc)
                return handle(entry.catchLoc, true);
              if (this.prev < entry.finallyLoc)
                return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc)
                return handle(entry.catchLoc, true);
            } else {
              if (!hasFinally)
                throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc)
                return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function(record, afterLoc) {
        if ("throw" === record.type)
          throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc)
            return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function(iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName,
          nextLoc
        }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
      }
    }, exports2;
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key2, arg) {
    try {
      var info = gen[key2](arg);
      var value2 = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value2);
    } else {
      Promise.resolve(value2).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function() {
      var self = this, args = arguments;
      return new Promise(function(resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value2) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value2);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(void 0);
      });
    };
  }
  function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key2 in source) {
          if (Object.prototype.hasOwnProperty.call(source, key2)) {
            target[key2] = source[key2];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var EndableAction = /* @__PURE__ */ function(_Action) {
    _inheritsLoose(EndableAction2, _Action);
    function EndableAction2(name2, startOperations, endOperations, eventBus) {
      var _this;
      _this = _Action.call(this, name2, startOperations, eventBus) || this;
      _this.endOperations = void 0;
      _this.endOperations = endOperations;
      return _this;
    }
    var _proto = EndableAction2.prototype;
    _proto.end = function end(initOperationData) {
      var _this2 = this;
      if (this.endOperations.length) {
        var context = {
          currentIndex: -1,
          eventbus: this.eventbus
        };
        var result = new Promise(function(resolve, reject) {
          _this2.executeOperation(_this2.endOperations, 0, resolve, reject, initOperationData, context);
        })["catch"](function(e) {
          console.error("Error in action end '" + _this2.name + "'");
          throw e;
        });
        return result;
      }
      return new Promise(function(resolve) {
        resolve(initOperationData);
      });
    };
    return EndableAction2;
  }(Action);
  var TimelineAction = /* @__PURE__ */ function(_EndableAction) {
    _inheritsLoose(TimelineAction2, _EndableAction);
    function TimelineAction2(name2, startOperations, endOperations, duration, eventBus) {
      var _this;
      _this = _EndableAction.call(this, name2, startOperations, endOperations, eventBus) || this;
      _this.duration = void 0;
      _this.active = false;
      _this.duration = duration;
      return _this;
    }
    var _proto = TimelineAction2.prototype;
    _proto.start = function start(initOperationData) {
      if (!this.active || this.duration.end < 0) {
        this.active = this.duration.end > -1;
        return _EndableAction.prototype.start.call(this, initOperationData);
      }
      return new Promise(function(resolve) {
        resolve();
      });
    };
    _proto.end = function end(initOperationData) {
      this.active = false;
      return _EndableAction.prototype.end.call(this, initOperationData);
    };
    return TimelineAction2;
  }(EndableAction);
  function getNestedValue(properties, sourceObject) {
    if (!properties) {
      throw Error("properties arg cannot be null");
    }
    if (!sourceObject) {
      throw Error("sourceObject arg cannot be null");
    }
    var currentInstance = sourceObject;
    var suffix = null;
    properties.forEach(function(prop, index2) {
      if (index2 === properties.length - 1) {
        var parts = prop.split("+");
        if (parts.length > 1) {
          prop = parts[0];
          suffix = parts[1];
        }
      }
      currentInstance = currentInstance[prop];
    });
    return suffix ? currentInstance + suffix : currentInstance;
  }
  function getNestedPropertyValue(propertyChain, sourceObject) {
    var properties = propertyChain.split(".");
    return getNestedValue(properties, sourceObject);
  }
  var ConfigurationResolver = /* @__PURE__ */ function() {
    function ConfigurationResolver2(importer, eventbus) {
      this.importer = void 0;
      this.eventbus = void 0;
      this.importer = importer;
      this.eventbus = eventbus;
    }
    var _proto = ConfigurationResolver2.prototype;
    _proto.process = function process(configuration, actionRegistryListener) {
      resolvePlaceholders(configuration, configuration, this.importer);
      if (!(0, import_ts_is_present.isDefined)(configuration.timelineProviderSettings)) {
        throw new Error("Configuration incomplete: it needs to have at least one timeline provider setting");
      }
      var resolvedConfig = {
        id: configuration.id,
        engine: _extends({}, configuration.engine),
        timelineProviderSettings: deepCopy(configuration.timelineProviderSettings),
        containerSelector: configuration.containerSelector,
        language: configuration.language,
        layoutTemplate: configuration.layoutTemplate,
        availableLanguages: deepCopy(configuration.availableLanguages),
        actions: resolveActions(configuration.actions, this.importer, this.eventbus),
        initActions: resolveActions(configuration.initActions, this.importer, this.eventbus),
        labels: deepCopy(configuration.labels),
        timelineFlow: deepCopy(configuration.timelineFlow),
        timelines: resolveTimelines(configuration.timelines, this.importer, this.eventbus)
      };
      var eventActions2 = [];
      if (configuration.eventActions && actionRegistryListener) {
        eventActions2 = resolveEventActions(configuration.eventActions, actionRegistryListener, this.importer, this.eventbus);
      }
      var actionsLookup = resolvedConfig.actions.concat(eventActions2).reduce(function(aggr, action) {
        var _extends2;
        return _extends({}, aggr, (_extends2 = {}, _extends2[action.name] = action, _extends2));
      }, {});
      return [actionsLookup, resolvedConfig];
    };
    return ConfigurationResolver2;
  }();
  function resolveEventActions(eventActionConfigurations, actionRegistryListener, importer, eventbus) {
    var resolvedConfigs = eventActionConfigurations.map(function(config) {
      return resolveActionConfiguration(config, importer);
    });
    return resolvedConfigs.map(function(config, index2) {
      var _eventActionConfigura = eventActionConfigurations[index2], eventName = _eventActionConfigura.eventName, eventTopic = _eventActionConfigura.eventTopic;
      var eventAction = new Action(config.name, config.startOperations, eventbus);
      actionRegistryListener.registerAction(eventAction, eventName, eventTopic);
      return eventAction;
    });
  }
  function resolveTimelines(timelines2, importer, eventbus) {
    var resolve = resolveTimelineAction.bind(null, importer, eventbus);
    return timelines2.map(function(config) {
      return _extends({}, config, {
        timelineActions: config.timelineActions.map(resolve)
      });
    });
  }
  function resolveOperation(importer, operationConfig) {
    return {
      id: operationConfig.id,
      systemName: operationConfig.systemName,
      operationData: deepCopy(operationConfig.operationData),
      instance: importer["import"](operationConfig.systemName)[operationConfig.systemName]
    };
  }
  function resolveActionConfiguration(config, importer) {
    var resolve = resolveOperation.bind(null, importer);
    return {
      id: config.id,
      name: config.name,
      startOperations: config.startOperations.map(resolve)
    };
  }
  function resolveEndableActionConfiguration(config, importer) {
    var resolve = resolveOperation.bind(null, importer);
    var action = resolveActionConfiguration(config, importer);
    return _extends({}, action, {
      endOperations: config.endOperations.map(resolve)
    });
  }
  function resolveTimelineAction(importer, eventbus, actionConfiguration) {
    var _actionConfiguration$;
    var resolvedConfig = resolveEndableActionConfiguration(actionConfiguration, importer);
    var duration = {
      end: (_actionConfiguration$ = actionConfiguration.duration.end) != null ? _actionConfiguration$ : -1,
      start: actionConfiguration.duration.start
    };
    var id2 = resolvedConfig.id, name2 = resolvedConfig.name, endOperations = resolvedConfig.endOperations, startOperations = resolvedConfig.startOperations;
    var action = new TimelineAction(name2, startOperations, endOperations, duration, eventbus);
    action.id = id2;
    return action;
  }
  function resolveActions(actionConfigurations, importer, eventbus) {
    var resolvedConfigs = actionConfigurations.map(function(config) {
      return resolveEndableActionConfiguration(config, importer);
    });
    return resolvedConfigs.map(function(resolvedConfig) {
      var name2 = resolvedConfig.name, endOperations = resolvedConfig.endOperations, startOperations = resolvedConfig.startOperations;
      var action = new EndableAction(name2, startOperations, endOperations, eventbus);
      action.id = resolvedConfig.id;
      return action;
    });
  }
  function resolvePlaceholders(configFragment, rootConfig, importer) {
    if (!(0, import_ts_is_present.isDefined)(configFragment)) {
      return;
    }
    if (Array.isArray(configFragment)) {
      configFragment.forEach(function(item) {
        resolvePlaceholders(item, rootConfig, importer);
      });
    } else {
      Object.keys(configFragment).forEach(function(key2) {
        resolvePlaceholder(key2, configFragment, rootConfig, importer);
      });
    }
  }
  function resolvePlaceholder(key2, configFragment, rootConfig, importer) {
    var configValue = configFragment[key2];
    if (typeof configValue === "string") {
      if (configValue.startsWith("config:")) {
        var configProperty = configValue.substring(7, configValue.length);
        configFragment[key2] = getNestedPropertyValue(configProperty, rootConfig);
      } else if (configValue.startsWith("template:")) {
        var templateKey = configValue.substring(9, configValue.length);
        var template = importer["import"](templateKey)[templateKey];
        configFragment[key2] = template;
      } else if (configValue.startsWith("json:")) {
        var jsonKey = configValue.substring(5, configValue.length);
        var json = importer["import"](jsonKey)[jsonKey];
        configFragment[key2] = json;
      }
    } else if (typeof configValue === "object") {
      resolvePlaceholders(configValue, rootConfig, importer);
    }
  }
  var TimelineEventNames = function TimelineEventNames2() {
  };
  TimelineEventNames.PLAY_TOGGLE_REQUEST = "timeline-play-toggle-request";
  TimelineEventNames.PLAY_REQUEST = "timeline-play-request";
  TimelineEventNames.STOP_REQUEST = "timeline-stop-request";
  TimelineEventNames.PAUSE_REQUEST = "timeline-pause-request";
  TimelineEventNames.SEEK_REQUEST = "timeline-seek-request";
  TimelineEventNames.RESIZE_REQUEST = "timeline-resize-request";
  TimelineEventNames.CONTAINER_REQUEST = "timeline-container-request";
  TimelineEventNames.DURATION_REQUEST = "timeline-duration-request";
  TimelineEventNames.REQUEST_CURRENT_TIMELINE = "timeline-request-current-timeline";
  TimelineEventNames.DURATION = "timeline-duration";
  TimelineEventNames.TIME = "timeline-time";
  TimelineEventNames.SEEKED = "timeline-seeked";
  TimelineEventNames.COMPLETE = "timeline-complete";
  TimelineEventNames.PLAY = "timeline-play";
  TimelineEventNames.STOP = "timeline-stop";
  TimelineEventNames.PAUSE = "timeline-pause";
  TimelineEventNames.SEEK = "timeline-seek";
  TimelineEventNames.RESIZE = "timeline-resize";
  TimelineEventNames.POSITION_UPDATE = "timeline-position-update";
  TimelineEventNames.TIME_UPDATE = "timeline-time-update";
  TimelineEventNames.CURRENT_TIMELINE_CHANGE = "timeline-current-timeline-change";
  TimelineEventNames.FIRST_FRAME = "timeline-firstframe";
  TimelineEventNames.REQUEST_INSTANCE = "request-instance";
  TimelineEventNames.REQUEST_ACTION = "request-action";
  TimelineEventNames.REQUEST_FUNCTION = "request-function";
  TimelineEventNames.REQUEST_TIMELINE_URI = "request-timeline-uri";
  TimelineEventNames.BEFORE_REQUEST_TIMELINE_URI = "before-request-timeline-uri";
  TimelineEventNames.REQUEST_ENGINE_ROOT = "request-engine-root";
  TimelineEventNames.REQUEST_CURRENT_TIMELINE_POSITION = "request-current-timeline-position";
  TimelineEventNames.REQUEST_TIMELINE_CLEANUP = "request-timeline-cleanup";
  TimelineEventNames.EXECUTE_TIMELINEACTION = "execute-timelineaction";
  TimelineEventNames.RESIZE_TIMELINEACTION = "resize-timelineaction";
  TimelineEventNames.REQUEST_LABEL_COLLECTION = "request-label-collection";
  TimelineEventNames.REQUEST_LABEL_COLLECTIONS = "request-label-collections";
  TimelineEventNames.REQUEST_CURRENT_LANGUAGE = "request-current-language";
  TimelineEventNames.LANGUAGE_CHANGE = "language-change";
  var EventListenerController = /* @__PURE__ */ function() {
    function EventListenerController2() {
      this.operationData = void 0;
      this.actionInstanceInfos = void 0;
      this.name = "EventListenerController";
    }
    var _proto = EventListenerController2.prototype;
    _proto.init = function init(operationData) {
      this.operationData = {
        selectedElement: operationData.selectedElement,
        eventName: operationData.eventName,
        actions: operationData.actions.slice(),
        actionOperationData: operationData.actionOperationData ? deepCopy(operationData.actionOperationData) : void 0
      };
    };
    _proto.attach = function attach(eventbus) {
      var _this = this;
      if (!this.operationData) {
        return;
      }
      var _this$operationData = this.operationData, selectedElement = _this$operationData.selectedElement, actions2 = _this$operationData.actions, eventName = _this$operationData.eventName;
      if (!this.actionInstanceInfos) {
        this.actionInstanceInfos = [];
        var resultCallback = function resultCallback2(isStart) {
          return function(actionInstance) {
            var _this$actionInstanceI;
            (_this$actionInstanceI = _this.actionInstanceInfos) == null ? void 0 : _this$actionInstanceI.push({
              start: isStart,
              action: actionInstance
            });
          };
        };
        actions2.forEach(function(actionName) {
          var _this$_isStartAction = _this._isStartAction(actionName), isStart = _this$_isStartAction[0], name2 = _this$_isStartAction[1];
          eventbus.broadcast(TimelineEventNames.REQUEST_ACTION, [name2, resultCallback(isStart)]);
        });
        selectedElement.on(eventName, this._eventHandler.bind(this));
      }
    };
    _proto._isStartAction = function _isStartAction(actionName) {
      var prefix = actionName.substr(0, "end:".length);
      if (prefix === "end:") {
        return [false, actionName.substr("end:".length)];
      } else {
        return [true, actionName];
      }
    };
    _proto._eventHandler = function _eventHandler(event) {
      if (!this.operationData || !this.actionInstanceInfos) {
        return;
      }
      var actionOperationData = this.operationData.actionOperationData ? deepCopy(this.operationData.actionOperationData) : {};
      if (event.target) {
        actionOperationData.targetValue = event.target.value;
      }
      this._executeAction(this.actionInstanceInfos, actionOperationData, 0);
    };
    _proto._executeAction = /* @__PURE__ */ function() {
      var _executeAction2 = /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(actions2, operationData, idx) {
        var actionInfo, action, method, resultOperationData;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(idx < actions2.length)) {
                  _context.next = 8;
                  break;
                }
                actionInfo = actions2[idx];
                action = actionInfo.action;
                method = actionInfo.start ? action.start.bind(action) : action.end.bind(action);
                _context.next = 6;
                return method(operationData);
              case 6:
                resultOperationData = _context.sent;
                this._executeAction(actions2, Object.assign(operationData, resultOperationData), ++idx);
              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function _executeAction(_x, _x2, _x3) {
        return _executeAction2.apply(this, arguments);
      }
      return _executeAction;
    }();
    _proto.detach = function detach(_eventbus) {
      var _this$operationData2;
      (_this$operationData2 = this.operationData) == null ? void 0 : _this$operationData2.selectedElement.off(this.operationData.eventName);
    };
    return EventListenerController2;
  }();
  var LabelController = /* @__PURE__ */ function() {
    function LabelController2() {
      this.listeners = [];
      this.currentLanguage = null;
      this.operationData = null;
      this.labelData = {};
      this.name = "LabelController";
    }
    var _proto = LabelController2.prototype;
    _proto.init = function init(operationData) {
      this.operationData = Object.assign({}, operationData);
    };
    _proto.attach = function attach(eventbus) {
      var _this = this;
      if (!this.operationData) {
        return;
      }
      eventbus.broadcast(TimelineEventNames.REQUEST_CURRENT_LANGUAGE, [function(language2) {
        _this.currentLanguage = language2;
      }]);
      eventbus.broadcast(TimelineEventNames.REQUEST_LABEL_COLLECTION, [this.operationData.labelId, function(labelCollection) {
        _this.createTextDataLookup(labelCollection);
      }]);
      this.setLabel();
      this.listeners.push(eventbus.on(TimelineEventNames.LANGUAGE_CHANGE, this.handleLanguageChange.bind(this)));
    };
    _proto.setLabel = function setLabel() {
      if (this.currentLanguage) {
        var _this$operationData;
        (_this$operationData = this.operationData) == null ? void 0 : _this$operationData.selectedElement.html(this.labelData[this.currentLanguage]);
      }
    };
    _proto.detach = function detach(_eventbus) {
      this.listeners.forEach(function(func) {
        func();
      });
    };
    _proto.handleLanguageChange = function handleLanguageChange(code) {
      this.currentLanguage = code;
      this.setLabel();
    };
    _proto.createTextDataLookup = function createTextDataLookup(data2) {
      var _this2 = this;
      data2.forEach(function(d) {
        _this2.labelData[d.languageCode] = d.label;
      });
    };
    return LabelController2;
  }();
  var ProgressbarController = /* @__PURE__ */ function() {
    function ProgressbarController2() {
      this.name = "ProgressbarController";
      this.selectedElement = null;
      this.textElement = null;
      this.detachers = [];
    }
    var _proto = ProgressbarController2.prototype;
    _proto.init = function init(operationData) {
      this.selectedElement = operationData.selectedElement;
      this.textElement = operationData.textElement;
    };
    _proto.attach = function attach(eventbus) {
      var _this$selectedElement, _this = this;
      this.detachers.push(eventbus.on(TimelineEventNames.POSITION_UPDATE, this.positionUpdateHandler.bind(this)));
      var clickHandler = this.clickHandler.bind(this);
      (_this$selectedElement = this.selectedElement) == null ? void 0 : _this$selectedElement.on("click", clickHandler);
      this.detachers.push(function() {
        var _this$selectedElement2;
        return (_this$selectedElement2 = _this.selectedElement) == null ? void 0 : _this$selectedElement2.off("click");
      }, clickHandler);
    };
    _proto.detach = function detach(_eventbus) {
      this.detachers.forEach(function(func) {
        func();
      });
    };
    _proto.positionUpdateHandler = function positionUpdateHandler(_ref) {
      var _this$selectedElement3, _this$textElement;
      var position2 = _ref.position, duration = _ref.duration;
      var percentage = 100 / duration * position2;
      (_this$selectedElement3 = this.selectedElement) == null ? void 0 : _this$selectedElement3.css("width", percentage + "%");
      (_this$textElement = this.textElement) == null ? void 0 : _this$textElement.text(Math.floor(percentage) + "%");
    };
    _proto.clickHandler = function clickHandler() {
    };
    return ProgressbarController2;
  }();
  var SubtitlesController = /* @__PURE__ */ function() {
    function SubtitlesController2() {
      this.actionLookup = {};
      this.currentLanguage = null;
      this.lastFunc = null;
      this.name = "SubtitlesController";
    }
    var _proto = SubtitlesController2.prototype;
    _proto.attach = function attach(eventbus) {
      var detachTime = eventbus.on(TimelineEventNames.TIME, this.onTimeHandler.bind(this));
      var detachSeek = eventbus.on(TimelineEventNames.SEEKED, this.onSeekedHandler.bind(this));
      var detachLangChange = eventbus.on(TimelineEventNames.LANGUAGE_CHANGE, this.languageChangeHandler.bind(this));
      this.internalDetach = this.internalDetach.bind(this, [detachTime, detachLangChange, detachSeek]);
    };
    _proto.detach = function detach(_eventbus) {
      this.internalDetach();
    };
    _proto.internalDetach = function internalDetach(detachMethods) {
      if (detachMethods) {
        detachMethods.forEach(function(f) {
          f();
        });
      }
    };
    _proto.languageChangeHandler = function languageChangeHandler(newLanguage) {
      this.currentLanguage = newLanguage;
      if (this.lastFunc) {
        this.lastFunc();
      }
    };
    _proto.removeTitle = function removeTitle(container) {
      container == null ? void 0 : container.empty();
      this.lastFunc = null;
    };
    _proto.onTimeHandler = function onTimeHandler(arg) {
      var position2 = arg.position;
      var func = this.actionLookup[position2];
      if (func) {
        func();
        this.lastFunc = func;
      }
    };
    _proto.onSeekedHandler = function onSeekedHandler(arg) {
      var position2 = arg.position;
      var func = this.actionLookup[position2];
      while (!func && --position2 >= 0) {
        func = this.actionLookup[position2];
      }
      if (func) {
        func();
        this.lastFunc = func;
      } else {
        this.removeTitle();
      }
    };
    _proto.setTitle = function setTitle(container, titleLanguageLookup) {
      if (this.currentLanguage) {
        container.html(titleLanguageLookup[this.currentLanguage]);
      }
    };
    _proto.createActionLookup = function createActionLookup(operationData, container) {
      var subtitleData = operationData.subtitleData;
      var titles = subtitleData[0].titles;
      var subtitleTimeLookup = {};
      for (var i = 0, ii = titles.length; i < ii; i++) {
        var titleLanguageLookup = {};
        for (var j = 0, jj = subtitleData.length; j < jj; j++) {
          var subs = subtitleData[j];
          titleLanguageLookup[subs.lang] = subs.titles[i].text;
        }
        subtitleTimeLookup[titles[i].duration.start] = this.setTitle.bind(this, container, titleLanguageLookup);
        subtitleTimeLookup[titles[i].duration.end] = this.removeTitle;
      }
      return subtitleTimeLookup;
    };
    _proto.init = function init(operationData) {
      var container = operationData.selectedElement;
      this.removeTitle = this.removeTitle.bind(this, container);
      this.currentLanguage = operationData.language;
      this.actionLookup = this.createActionLookup(operationData, container);
    };
    return SubtitlesController2;
  }();
  var EligiusEngine = /* @__PURE__ */ function() {
    function EligiusEngine2(configuration, eventbus, timelineProviders, _languageManager) {
      this.configuration = void 0;
      this.eventbus = void 0;
      this.timelineProviders = void 0;
      this._languageManager = void 0;
      this._timeLineActionsLookup = {};
      this._eventbusListeners = [];
      this._currentTimelineUri = "";
      this._activeTimelineProvider = void 0;
      this._lastPosition = -1;
      this.configuration = configuration;
      this.eventbus = eventbus;
      this.timelineProviders = timelineProviders;
      this._languageManager = _languageManager;
    }
    var _proto = EligiusEngine2.prototype;
    _proto.init = function init() {
      this._createLayoutTemplate();
      this._addInitialisationListeners();
      var timelines2 = this.configuration.timelines;
      this._currentTimelineUri = timelines2 && timelines2.length ? timelines2[0].uri : "";
      this._createTimelineLookup();
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.TIME, this._onTimeHandler.bind(this, Math.floor)));
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.SEEK, this._onSeekHandler.bind(this, Math.floor)));
      return this._initializeTimelineProvider();
    };
    _proto._createLayoutTemplate = function _createLayoutTemplate() {
      var containerSelector2 = this.configuration.containerSelector;
      var container = (0, import_jquery.default)(containerSelector2);
      if (!container || !container.length) {
        throw new Error("Container selector not found: " + containerSelector2);
      }
      var layoutTemplate2 = this.configuration.layoutTemplate;
      if (layoutTemplate2 && layoutTemplate2.length) {
        container.html(layoutTemplate2);
      } else {
        console.warn("layoutTemplate is empty, unable to create layout");
      }
    };
    _proto._initializeTimelineProvider = function _initializeTimelineProvider() {
      var _this$configuration$t, _this = this;
      if (!((_this$configuration$t = this.configuration.timelines) != null && _this$configuration$t.length)) {
        throw new Error("No timelines present");
      }
      var firstTimeline = this.configuration.timelines[0];
      var providerSettings = this.timelineProviders[firstTimeline.type];
      if (!providerSettings) {
        throw new Error("No timeline provider configured for type " + firstTimeline.type);
      }
      if (this._activeTimelineProvider) {
        this._activeTimelineProvider.destroy();
      }
      this._activeTimelineProvider = providerSettings.provider;
      return new Promise(/* @__PURE__ */ function() {
        var _ref = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(resolve) {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!_this._activeTimelineProvider) {
                    _context.next = 8;
                    break;
                  }
                  _context.next = 3;
                  return _this._activeTimelineProvider.init();
                case 3:
                  _context.next = 5;
                  return _this._executeActions(_this.configuration.initActions, "start");
                case 5:
                  resolve(_this._activeTimelineProvider);
                  _context.next = 9;
                  break;
                case 8:
                  throw new Error("NO ACTIVE TIMELINE PROVIDER");
                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));
        return function(_x) {
          return _ref.apply(this, arguments);
        };
      }());
    };
    _proto._cleanUp = /* @__PURE__ */ function() {
      var _cleanUp2 = /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._cleanUpTimeline();
              case 2:
                _context2.next = 4;
                return this._executeActions(this.configuration.initActions, "end");
              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _cleanUp() {
        return _cleanUp2.apply(this, arguments);
      }
      return _cleanUp;
    }();
    _proto.destroy = /* @__PURE__ */ function() {
      var _destroy = /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._cleanUp();
              case 2:
                this._activeTimelineProvider = void 0;
                this._eventbusListeners.forEach(function(remover) {
                  return remover();
                });
                if (this.timelineProviders) {
                  Object.values(this.timelineProviders).forEach(function(info) {
                    return info.provider.destroy();
                  });
                }
              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function destroy() {
        return _destroy.apply(this, arguments);
      }
      return destroy;
    }();
    _proto._addInitialisationListeners = function _addInitialisationListeners() {
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.REQUEST_ENGINE_ROOT, this._handleRequestEngineRoot.bind(this, this.configuration.containerSelector)));
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.REQUEST_TIMELINE_URI, this._handleRequestTimelineUri.bind(this)));
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.REQUEST_CURRENT_TIMELINE_POSITION, this._handleRequestTimelinePosition.bind(this, Math.floor)));
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.REQUEST_TIMELINE_CLEANUP, this._handleTimelineComplete.bind(this)));
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.EXECUTE_TIMELINEACTION, this._handleExecuteTimelineAction.bind(this)));
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.RESIZE_TIMELINEACTION, this._resizeTimelineAction.bind(this)));
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.REQUEST_CURRENT_TIMELINE, this._requestCurrentTimeline.bind(this)));
    };
    _proto._createTimelineLookup = function _createTimelineLookup() {
      var _this2 = this;
      if (!this.configuration.timelines) {
        return;
      }
      this.configuration.timelines.forEach(function(timelineInfo) {
        timelineInfo.timelineActions.forEach(_this2._addTimelineAction.bind(_this2, timelineInfo.uri));
      });
    };
    _proto._addTimelineAction = function _addTimelineAction(uri, timeLineAction) {
      var _timeLineAction$id;
      var startPosition = timeLineAction.duration.start;
      var timelineStartPositions = this._initializeTimelinePosition(this._initializeUriLookup(this._timeLineActionsLookup, uri), startPosition);
      var startMethod = timeLineAction.start.bind(timeLineAction);
      if ((_timeLineAction$id = timeLineAction.id) != null && _timeLineAction$id.length) {
        startMethod.id = timeLineAction.id;
        startMethod.isStart = true;
      }
      timelineStartPositions.push(startMethod);
      var end = timeLineAction.duration.end;
      if (end < 0) {
        end = timeLineAction.duration.end = Infinity;
      }
      if (isFinite(end)) {
        var _timeLineAction$id2;
        var timelineEndPositions = this._initializeTimelinePosition(this._timeLineActionsLookup[uri], end);
        var endMethod = timeLineAction.end.bind(timeLineAction);
        if ((_timeLineAction$id2 = timeLineAction.id) != null && _timeLineAction$id2.length) {
          endMethod.id = timeLineAction.id;
        }
        timelineEndPositions.push(endMethod);
      }
    };
    _proto._initializeUriLookup = function _initializeUriLookup(lookup, uri) {
      if (!lookup[uri]) {
        lookup[uri] = {};
      }
      return lookup[uri];
    };
    _proto._initializeTimelinePosition = function _initializeTimelinePosition(lookup, position2) {
      if (!lookup[position2]) {
        lookup[position2] = [];
      }
      return lookup[position2];
    };
    _proto._executeActions = /* @__PURE__ */ function() {
      var _executeActions2 = /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4(actions2, methodName, idx) {
        var action;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (idx === void 0) {
                  idx = 0;
                }
                if (!(actions2 && idx < actions2.length)) {
                  _context4.next = 6;
                  break;
                }
                action = actions2[idx];
                _context4.next = 5;
                return action[methodName]();
              case 5:
                return _context4.abrupt("return", this._executeActions(actions2, methodName, ++idx));
              case 6:
                return _context4.abrupt("return", new Promise(function(resolve) {
                  resolve();
                }));
              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function _executeActions(_x2, _x3, _x4) {
        return _executeActions2.apply(this, arguments);
      }
      return _executeActions;
    }();
    _proto._handleRequestEngineRoot = function _handleRequestEngineRoot(engineRootSelector, resultCallback) {
      resultCallback((0, import_jquery.default)(engineRootSelector));
    };
    _proto._handleRequestTimelineUri = /* @__PURE__ */ function() {
      var _handleRequestTimelineUri2 = /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee5(uri, position2, previousVideoPosition) {
        var _position, _this3 = this;
        var timelineConfig, newProviderSettings;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this._activeTimelineProvider) {
                  _context5.next = 2;
                  break;
                }
                return _context5.abrupt("return");
              case 2:
                this._activeTimelineProvider.stop();
                _context5.next = 6;
                return this._cleanUpTimeline();
              case 6:
                timelineConfig = this.configuration.timelines.find(function(timeline) {
                  return timeline.uri === uri;
                });
                if (!(!timelineConfig || !this._activeTimelineProvider || this._currentTimelineUri === timelineConfig.uri)) {
                  _context5.next = 9;
                  break;
                }
                return _context5.abrupt("return");
              case 9:
                this._currentTimelineUri = timelineConfig.uri;
                this.eventbus.broadcast(TimelineEventNames.CURRENT_TIMELINE_CHANGE, [this._currentTimelineUri]);
                newProviderSettings = this.timelineProviders[timelineConfig.type];
                if (this._activeTimelineProvider !== newProviderSettings.provider) {
                  this._activeTimelineProvider.destroy();
                  this._activeTimelineProvider = newProviderSettings.provider;
                }
                this._activeTimelineProvider.loop = timelineConfig.loop;
                position2 = (_position = position2) != null ? _position : 0;
                if (!this._activeTimelineProvider.loop && position2 > 0) {
                  this.eventbus.once(TimelineEventNames.FIRST_FRAME, function() {
                    if (!_this3._activeTimelineProvider) {
                      return;
                    }
                    _this3._activeTimelineProvider.pause();
                    _this3.eventbus.broadcast(TimelineEventNames.DURATION, [_this3._activeTimelineProvider.getDuration()]);
                    _this3._executeStartActions().then(function() {
                      var _position2, _this3$_activeTimelin;
                      position2 = (_position2 = position2) != null ? _position2 : 0;
                      (_this3$_activeTimelin = _this3._activeTimelineProvider) == null ? void 0 : _this3$_activeTimelin.seek(position2);
                      _this3._onSeekHandler(Math.floor, {
                        offset: position2
                      });
                    });
                  });
                }
                this._activeTimelineProvider.playlistItem(uri);
              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function _handleRequestTimelineUri(_x5, _x6, _x7) {
        return _handleRequestTimelineUri2.apply(this, arguments);
      }
      return _handleRequestTimelineUri;
    }();
    _proto._cleanUpTimeline = function _cleanUpTimeline() {
      return this._executeRelevantActions(this._getActiveActions, "end");
    };
    _proto._executeStartActions = function _executeStartActions() {
      return this._executeRelevantActions(this._getActionsForPosition.bind(this, 0), "start");
    };
    _proto._getActionsForPosition = function _getActionsForPosition(position2, allActions) {
      return allActions.filter(function(action) {
        return !action.active && action.duration.start <= position2 && action.duration.end >= position2;
      });
    };
    _proto._getActiveActions = function _getActiveActions(allActions) {
      var actions2 = allActions.filter(function(action) {
        return action.active;
      });
      return actions2.sort(function(a, b) {
        if (b.duration.start < a.duration.start) {
          return -1;
        } else if (b.duration.start > a.duration.start) {
          return 1;
        } else {
          return 0;
        }
      });
    };
    _proto._executeRelevantActions = function _executeRelevantActions(filter, executionType) {
      var timelineActions = this._getRelevantTimelineActions();
      var currentActions = filter.apply(this, [timelineActions]);
      return this._executeActions(currentActions, executionType, 0);
    };
    _proto._handleRequestTimelinePosition = function _handleRequestTimelinePosition(floor, resultCallback) {
      var _this$_activeTimeline;
      resultCallback(floor(((_this$_activeTimeline = this._activeTimelineProvider) == null ? void 0 : _this$_activeTimeline.getPosition()) || -1));
    };
    _proto._handleTimelineComplete = function _handleTimelineComplete() {
      this._cleanUpTimeline();
    };
    _proto._handleExecuteTimelineAction = function _handleExecuteTimelineAction(uri, index2, start) {
      var actions2 = this._getTimelineActionsForUri(uri);
      var action = actions2 == null ? void 0 : actions2[index2];
      if (action) {
        if (start) {
          action.start();
        } else {
          action.end();
        }
      }
    };
    _proto._resizeTimelineAction = function _resizeTimelineAction() {
      console.error("no resizing implemented");
    };
    _proto._getRelevantTimelineActions = function _getRelevantTimelineActions() {
      return this._getTimelineActionsForUri(this._currentTimelineUri);
    };
    _proto._requestCurrentTimeline = function _requestCurrentTimeline(resultCallback) {
      resultCallback(this._currentTimelineUri);
    };
    _proto._getTimelineActionsForUri = function _getTimelineActionsForUri(uri) {
      var _info$timelineActions;
      var info = this.configuration.timelines.find(function(timelineInfo) {
        return timelineInfo.uri === uri;
      });
      return (_info$timelineActions = info == null ? void 0 : info.timelineActions) != null ? _info$timelineActions : [];
    };
    _proto._onTimeHandler = function _onTimeHandler(floor, event) {
      if (!isNaN(event.position)) {
        var _this$_activeTimeline3;
        var pos = floor(event.position);
        if (this._lastPosition !== pos) {
          var _this$_activeTimeline2;
          this._executeActionsForPosition(pos);
          this.eventbus.broadcast(TimelineEventNames.POSITION_UPDATE, [pos, (_this$_activeTimeline2 = this._activeTimelineProvider) == null ? void 0 : _this$_activeTimeline2.getDuration()]);
        }
        this.eventbus.broadcast(TimelineEventNames.TIME_UPDATE, [event.position, (_this$_activeTimeline3 = this._activeTimelineProvider) == null ? void 0 : _this$_activeTimeline3.getDuration()]);
      }
    };
    _proto._onSeekHandler = function _onSeekHandler(floor, event) {
      var _this4 = this;
      if (isNaN(event.offset)) {
        return;
      }
      var pos = floor(event.offset);
      this._executeSeekActions(pos).then(function() {
        var _this4$_activeTimelin;
        (_this4$_activeTimelin = _this4._activeTimelineProvider) == null ? void 0 : _this4$_activeTimelin.start();
      });
    };
    _proto._executeActionsForPosition = function _executeActionsForPosition(position2) {
      this._lastPosition = position2;
      var actions2 = this._timeLineActionsLookup[this._currentTimelineUri];
      if (actions2) {
        var executions = actions2[position2];
        executions == null ? void 0 : executions.forEach(function(exec) {
          exec();
        });
      }
    };
    _proto._executeSeekActions = function _executeSeekActions(pos) {
      var _this5 = this;
      var timelineActions = this._getRelevantTimelineActions();
      if (!timelineActions) {
        return Promise.resolve();
      }
      var currentActions = this._getActiveActions(timelineActions);
      var newActions = this._getActionsForPosition(pos, timelineActions);
      var promise = this._executeActions(currentActions, "end", 0);
      return new Promise(function(resolve) {
        promise.then(function() {
          _this5._executeActions(newActions, "start", 0).then(function() {
            resolve();
          });
        });
      });
    };
    return EligiusEngine2;
  }();
  var ActionRegistryEventbusListener = /* @__PURE__ */ function() {
    function ActionRegistryEventbusListener2() {
      this._actionRegistry = /* @__PURE__ */ new Map();
    }
    var _proto = ActionRegistryEventbusListener2.prototype;
    _proto.registerAction = function registerAction(action, eventName, eventTopic) {
      var _this$_actionRegistry;
      if (eventTopic && eventTopic.length) {
        eventName = eventName + ":" + eventTopic;
      }
      if (!this._actionRegistry.has(eventName)) {
        this._actionRegistry.set(eventName, []);
      }
      (_this$_actionRegistry = this._actionRegistry.get(eventName)) == null ? void 0 : _this$_actionRegistry.push(action);
    };
    _proto.handleEvent = function handleEvent(eventName, eventTopic, args) {
      if (eventTopic) {
        eventName = eventName + ":" + eventTopic;
      }
      var actions2 = this._actionRegistry.get(eventName);
      if (actions2) {
        var operationData = {
          eventArgs: args
        };
        actions2.forEach(function(action) {
          action.start(operationData);
        });
      }
    };
    return ActionRegistryEventbusListener2;
  }();
  var Eventbus = /* @__PURE__ */ function() {
    function Eventbus2() {
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.eventInterceptors = /* @__PURE__ */ new Map();
      this.eventListeners = [];
      this.clear();
    }
    var _proto = Eventbus2.prototype;
    _proto.clear = function clear() {
      this.eventHandlers = /* @__PURE__ */ new Map();
      this.eventListeners = [];
      this.eventInterceptors = /* @__PURE__ */ new Map();
    };
    _proto._getEventInterceptors = function _getEventInterceptors(eventName, eventTopic) {
      if (eventTopic) {
        eventName = eventName + ":" + eventTopic;
      }
      if (!this.eventInterceptors.has(eventName)) {
        this.eventInterceptors.set(eventName, []);
      }
      return this.eventInterceptors.get(eventName);
    };
    _proto._getEventHandlers = function _getEventHandlers(eventName, eventTopic) {
      if (eventTopic) {
        eventName = eventName + ":" + eventTopic;
      }
      if (!this.eventHandlers.has(eventName)) {
        this.eventHandlers.set(eventName, []);
      }
      return this.eventHandlers.get(eventName);
    };
    _proto.on = function on(eventName, eventHandler, eventTopic) {
      var _this = this;
      this._getEventHandlers(eventName, eventTopic).push(eventHandler);
      return function() {
        _this.off(eventName, eventHandler, eventTopic);
      };
    };
    _proto.once = function once(eventName, eventHandler, eventTopic) {
      var _this2 = this;
      var eventHandlerDecorator = function eventHandlerDecorator2() {
        eventHandler.apply(void 0, arguments);
        _this2.off(eventName, eventHandlerDecorator2, eventTopic);
      };
      this.on(eventName, eventHandlerDecorator, eventTopic);
    };
    _proto.off = function off(eventName, eventHandler, eventTopic) {
      var handlers = this._getEventHandlers(eventName, eventTopic);
      if (handlers) {
        var idx = handlers.indexOf(eventHandler);
        if (idx > -1) {
          handlers.splice(idx, 1);
        }
      }
    };
    _proto.broadcast = function broadcast(eventName, args) {
      this._callHandlers(eventName, void 0, args);
    };
    _proto.broadcastForTopic = function broadcastForTopic(eventName, eventTopic, args) {
      this._callHandlers(eventName, eventTopic, args);
    };
    _proto.registerEventlistener = function registerEventlistener(eventbusListener) {
      this.eventListeners.push(eventbusListener);
    };
    _proto.registerInterceptor = function registerInterceptor(eventName, interceptor, eventTopic) {
      var interceptors = this._getEventInterceptors(eventName, eventTopic);
      interceptors.push(interceptor);
    };
    _proto._callHandlers = function _callHandlers(eventName, eventTopic, args) {
      if (args === void 0) {
        args = [];
      }
      var handlers = this._getEventHandlers(eventName, eventTopic);
      if (handlers) {
        var _args;
        var interceptors = this._getEventInterceptors(eventName, eventTopic);
        interceptors.forEach(function(interceptor) {
          args = interceptor.intercept(args);
        });
        this.eventListeners.forEach(function(listener) {
          listener.handleEvent(eventName, eventTopic, args);
        });
        if ((_args = args) != null && _args.length) {
          handlers.forEach(function(handler) {
            return handler.apply(void 0, args);
          });
        } else {
          handlers.forEach(function(handler) {
            return handler();
          });
        }
      }
    };
    return Eventbus2;
  }();
  var RequestVideoUriInterceptor = /* @__PURE__ */ function() {
    function RequestVideoUriInterceptor2(eventbus) {
      this.eventbus = void 0;
      this.eventbus = eventbus;
    }
    var _proto = RequestVideoUriInterceptor2.prototype;
    _proto.intercept = function intercept(args) {
      this.eventbus.broadcast(TimelineEventNames.BEFORE_REQUEST_TIMELINE_URI, args.slice());
      return args;
    };
    return RequestVideoUriInterceptor2;
  }();
  var LanguageManager = /* @__PURE__ */ function() {
    function LanguageManager2(_currentLanguage, labels2, _eventbus) {
      this._currentLanguage = void 0;
      this._eventbus = void 0;
      this._labelLookup = {};
      this._eventbusListeners = [];
      this._currentLanguage = _currentLanguage;
      this._eventbus = _eventbus;
      if (!_currentLanguage || !_currentLanguage.length) {
        throw new Error("language ctor arg cannot be null or have zero length");
      }
      if (!labels2) {
        throw new Error("labels ctor arg cannot be null");
      }
      if (!_eventbus) {
        throw new Error("eventbus ctor arg cannot be null");
      }
      this._setRootElementLang(_currentLanguage);
      this._createLabelLookup(labels2);
      this._addEventbusListeners(_eventbus);
    }
    var _proto = LanguageManager2.prototype;
    _proto._addEventbusListeners = function _addEventbusListeners(eventbus) {
      this._eventbusListeners.push(eventbus.on(TimelineEventNames.REQUEST_LABEL_COLLECTION, this._handleRequestLabelCollection.bind(this)));
      this._eventbusListeners.push(eventbus.on(TimelineEventNames.REQUEST_LABEL_COLLECTIONS, this._handleRequestLabelCollections.bind(this)));
      this._eventbusListeners.push(eventbus.on(TimelineEventNames.REQUEST_CURRENT_LANGUAGE, this._handleRequestCurrentLanguage.bind(this)));
      this._eventbusListeners.push(eventbus.on(TimelineEventNames.LANGUAGE_CHANGE, this._handleLanguageChange.bind(this)));
    };
    _proto._handleRequestCurrentLanguage = function _handleRequestCurrentLanguage(resultCallback) {
      resultCallback(this._currentLanguage);
    };
    _proto._handleRequestLabelCollection = function _handleRequestLabelCollection(labelId, resultCallback) {
      resultCallback(this._labelLookup[labelId]);
    };
    _proto._handleRequestLabelCollections = function _handleRequestLabelCollections(labelIds, resultCallback) {
      var _this = this;
      var labelCollections = labelIds.map(function(labelId) {
        return _this._labelLookup[labelId];
      });
      resultCallback(labelCollections);
    };
    _proto._handleLanguageChange = function _handleLanguageChange(language2) {
      if (language2 && language2.length) {
        this._currentLanguage = language2;
        this._setRootElementLang(this._currentLanguage);
      } else {
        console.error("Language cannot be changed to null or empty string");
      }
    };
    _proto._setRootElementLang = function _setRootElementLang(language2) {
      var _this2 = this;
      var callBack = function callBack2(rootSelector) {
        var lang = _this2._extractLanguageFromCulture(language2);
        (0, import_jquery.default)(rootSelector).attr("lang", lang);
      };
      this._eventbus.broadcast(TimelineEventNames.REQUEST_ENGINE_ROOT, [callBack]);
    };
    _proto._extractLanguageFromCulture = function _extractLanguageFromCulture(culture) {
      if (culture.indexOf("-") > -1) {
        return culture.split("-").shift();
      }
      return culture;
    };
    _proto._createLabelLookup = function _createLabelLookup(labels2) {
      var _this3 = this;
      labels2.forEach(function(label) {
        _this3._labelLookup[label.id] = label.labels;
      });
    };
    return LanguageManager2;
  }();
  var EngineFactory = /* @__PURE__ */ function() {
    function EngineFactory2(importer, windowRef, eventbus) {
      this.resizeTimeout = -1;
      this.actionsLookup = {};
      this.importer = void 0;
      this.eventbus = void 0;
      this.importer = importer;
      this.eventbus = eventbus || new Eventbus();
      this.eventbus.on(TimelineEventNames.REQUEST_INSTANCE, this._requestInstanceHandler.bind(this));
      this.eventbus.on(TimelineEventNames.REQUEST_ACTION, this._requestActionHandler.bind(this));
      this.eventbus.on(TimelineEventNames.REQUEST_FUNCTION, this._requestFunctionHandler.bind(this));
      (0, import_jquery.default)(windowRef).resize(this._resizeHandler.bind(this));
    }
    var _proto = EngineFactory2.prototype;
    _proto.destroy = function destroy() {
      this.eventbus.clear();
    };
    _proto._resizeHandler = function _resizeHandler() {
      var _this = this;
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(function() {
        _this.eventbus.broadcast(TimelineEventNames.RESIZE);
      }, 200);
    };
    _proto._importSystemEntryWithEventbusDependency = function _importSystemEntryWithEventbusDependency(systemName) {
      var ctor = this._importSystemEntry(systemName);
      return new ctor(this.eventbus);
    };
    _proto._importSystemEntry = function _importSystemEntry(systemName) {
      return this.importer["import"](systemName)[systemName];
    };
    _proto._requestInstanceHandler = function _requestInstanceHandler(systemName, resultCallback) {
      resultCallback(this._importSystemEntryWithEventbusDependency(systemName));
    };
    _proto._requestFunctionHandler = function _requestFunctionHandler(systemName, resultCallback) {
      resultCallback(this._importSystemEntry(systemName));
    };
    _proto._requestActionHandler = function _requestActionHandler(systemName, resultCallback) {
      var action = this.actionsLookup[systemName];
      if (action) {
        resultCallback(action);
      } else {
        console.error("Unknown action: " + systemName);
        resultCallback(null);
      }
    };
    _proto.createEngine = function createEngine(configuration, resolver) {
      var _configuration$eventA, _this2 = this;
      var systemName = configuration.engine.systemName;
      var EngineClass = this._importSystemEntry(systemName);
      var actionRegistryListener = void 0;
      if ((_configuration$eventA = configuration.eventActions) != null && _configuration$eventA.length) {
        actionRegistryListener = new ActionRegistryEventbusListener();
        this.eventbus.registerEventlistener(actionRegistryListener);
      }
      this.eventbus.registerInterceptor(TimelineEventNames.REQUEST_TIMELINE_URI, new RequestVideoUriInterceptor(this.eventbus));
      resolver = resolver || new ConfigurationResolver(this.importer, this.eventbus);
      var _resolver$process = resolver.process(configuration, actionRegistryListener), actionLookup = _resolver$process[0], resolvedConfiguration = _resolver$process[1];
      this.actionsLookup = actionLookup;
      var timelineProviders = this._createTimelineProviders(resolvedConfiguration, this.eventbus);
      var language2 = configuration.language, labels2 = configuration.labels;
      var languageManager = new LanguageManager(language2, labels2, this.eventbus);
      var engineInstance = new EngineClass(resolvedConfiguration, this.eventbus, timelineProviders, languageManager);
      import_mousetrap.default.bind("space", function(event) {
        event.preventDefault();
        _this2.eventbus.broadcast(TimelineEventNames.PLAY_TOGGLE_REQUEST);
        return false;
      });
      return engineInstance;
    };
    _proto._createTimelineProviders = function _createTimelineProviders(configuration, eventbus) {
      var _this3 = this;
      var timelineProviderSettings2 = configuration.timelineProviderSettings;
      var result = Object.entries(timelineProviderSettings2).reduce(function(acc, _ref) {
        var timelineType = _ref[0], settings = _ref[1];
        if (!settings) {
          return acc;
        }
        var timelineProviderClass = _this3._importSystemEntry(settings.systemName);
        acc[timelineType] = {
          id: settings.id,
          vendor: settings.vendor,
          provider: new timelineProviderClass(eventbus, configuration)
        };
        return acc;
      }, {});
      return result;
    };
    return EngineFactory2;
  }();
  var addClass$1 = function addClass(operationData) {
    var selectedElement = operationData.selectedElement, className = operationData.className;
    selectedElement.addClass(className);
    return operationData;
  };
  var controllersDataName = "eligiusEngineControllers";
  function getElementData(name2, element) {
    return element.data(name2);
  }
  var getElementControllers = /* @__PURE__ */ getElementData.bind(null, controllersDataName);
  function attachControllerToElement(element, controller) {
    if (!element.data(controllersDataName)) {
      element.data(controllersDataName, []);
    }
    var controllers = getElementControllers(element);
    if (controllers) {
      controllers.push(controller);
    }
  }
  function mergeOperationData(operationData, newOperationData) {
    return _extends({}, operationData, newOperationData);
  }
  function internalResolve(resolve, operationData, newOperationData) {
    if (newOperationData) {
      resolve(mergeOperationData(operationData, newOperationData));
    } else {
      resolve(operationData);
    }
  }
  var addControllerToElement$1 = function addControllerToElement(operationData) {
    var selectedElement = operationData.selectedElement, controllerInstance = operationData.controllerInstance;
    attachControllerToElement(selectedElement, controllerInstance);
    controllerInstance.init(operationData);
    var promise = controllerInstance.attach(this.eventbus);
    if (promise) {
      return new Promise(function(resolve, reject) {
        promise.then(function(newOperationData) {
          internalResolve(resolve, operationData, newOperationData);
        }, reject);
      });
    } else {
      return operationData;
    }
  };
  function removeEventDataFromOperationData(operationData) {
    delete operationData.eventName;
    delete operationData.eventTopic;
    delete operationData.eventArgs;
  }
  function extractOperationDataArgumentValues(sourceObject, argumentValue) {
    if (typeof argumentValue === "string" && argumentValue.toLowerCase().startsWith("operationdata.")) {
      var propNames = argumentValue.split(".");
      propNames.shift();
      return getNestedValue(propNames, sourceObject);
    }
    return argumentValue;
  }
  function resolveEventArguments(operationData, eventArgs) {
    if (!eventArgs) {
      return;
    }
    var extract = extractOperationDataArgumentValues.bind(null, operationData);
    return eventArgs.map(extract);
  }
  var broadcastEvent$1 = function broadcastEvent(operationData) {
    var eventArgs = operationData.eventArgs, eventTopic = operationData.eventTopic, eventName = operationData.eventName;
    var eventArguments = resolveEventArguments(operationData, eventArgs);
    if (eventTopic) {
      this.eventbus.broadcastForTopic(eventName, eventTopic, eventArguments);
    } else {
      this.eventbus.broadcast(eventName, eventArguments);
    }
    removeEventDataFromOperationData(operationData);
    return operationData;
  };
  var clearElement$1 = function clearElement(operationData) {
    var selectedElement = operationData.selectedElement;
    selectedElement.empty();
    return operationData;
  };
  var cache = [];
  function resolvePropertyValues(operationData, properties) {
    var copy = properties !== operationData ? deepCopy(properties) : properties;
    var extract = extractOperationDataArgumentValues.bind(null, operationData);
    resolveProperties(properties, copy, extract);
    return copy;
  }
  function resolveProperties(properties, copy, extract) {
    if (cache.indexOf(properties) > -1) {
      return;
    }
    cache.push(properties);
    try {
      Object.entries(properties).forEach(function(_ref) {
        var key2 = _ref[0], value2 = _ref[1];
        if (value2 instanceof import_jquery.default) {
          return;
        }
        if (typeof value2 === "string") {
          copy[key2] = extract(value2);
        } else if (Array.isArray(value2)) {
          value2.forEach(function(item, index3, arr) {
            if (typeof item === "string") {
              arr[index3] = extract(item);
            } else {
              resolveProperties(item, item, extract);
            }
          });
        } else if (typeof value2 === "object") {
          resolveProperties(value2, value2, extract);
        }
      });
    } finally {
      var index2 = cache.indexOf(properties);
      cache.splice(index2, 1);
    }
  }
  var createElement$1 = function createElement(operationData) {
    operationData = resolvePropertyValues(operationData, operationData);
    var _operationData = operationData, elementName = _operationData.elementName, attributes = _operationData.attributes, text2 = _operationData.text, _operationData$proper = _operationData.propertyName, propertyName = _operationData$proper === void 0 ? "template" : _operationData$proper;
    var serializedAttrs = attributes ? " " + Object.entries(attributes).map(function(_ref) {
      var key2 = _ref[0], value2 = _ref[1];
      return key2 + '="' + value2 + '"';
    }).join(" ") : "";
    var template = text2 ? (0, import_jquery.default)("<" + elementName + serializedAttrs + ">" + text2 + "</" + elementName + ">") : (0, import_jquery.default)("<" + elementName + serializedAttrs + "/>");
    operationData[propertyName] = template;
    delete operationData.propertyName;
    return operationData;
  };
  var endLoop$1 = function endLoop(operationData) {
    var context = this;
    if (!context.skipNextOperation) {
      if (context.loopIndex !== void 0 && context.loopLength !== void 0 && context.loopIndex < context.loopLength) {
        context.loopIndex = context.loopIndex + 1;
        context.newIndex = context.startIndex;
      } else {
        delete context.loopIndex;
        delete context.loopLength;
        delete context.startIndex;
        delete context.newIndex;
      }
    } else {
      delete context.skipNextOperation;
    }
    return operationData;
  };
  var getControllerInstance$1 = function getControllerInstance(operationData) {
    var systemName = operationData.systemName, _operationData$proper = operationData.propertyName, propertyName = _operationData$proper === void 0 ? "controllerInstance" : _operationData$proper;
    operationData[propertyName] = null;
    var resultCallback = function resultCallback2(instance) {
      operationData[propertyName] = instance;
    };
    this.eventbus.broadcast(TimelineEventNames.REQUEST_INSTANCE, [systemName, resultCallback]);
    delete operationData.propertyName;
    return operationData;
  };
  var removeControllerFromElement$1 = function removeControllerFromElement(operationData) {
    var selectedElement = operationData.selectedElement, controllerName = operationData.controllerName;
    var controllers = getElementControllers(selectedElement);
    var controller = controllers == null ? void 0 : controllers.find(function(ctrl) {
      return ctrl.name === controllerName;
    });
    if (controller) {
      var idx = controllers.indexOf(controller);
      controllers.splice(idx, 1);
      controller.detach(this.eventbus);
    }
    return operationData;
  };
  var removeElement$1 = function removeElement(operationData) {
    var selectedElement = operationData.selectedElement;
    selectedElement.remove();
    return operationData;
  };
  function findElementBySelector(root, selector, operationData, propertyName) {
    var element = root.find(selector);
    if (!element.length) {
      console.warn("selector '" + selector + "' wasn't found!");
    }
    operationData[propertyName] = element;
    if (operationData.hasOwnProperty("propertyName")) {
      delete operationData.propertyName;
    }
  }
  var selectElement$1 = function selectElement(operationData) {
    var selector = operationData.selector, _operationData$proper = operationData.propertyName, propertyName = _operationData$proper === void 0 ? "selectedElement" : _operationData$proper, _operationData$useSel = operationData.useSelectedElementAsRoot, useSelectedElementAsRoot = _operationData$useSel === void 0 ? false : _operationData$useSel;
    if (!selector) {
      throw new Error("selector is undefined!");
    }
    if (useSelectedElementAsRoot && operationData[propertyName]) {
      var currentRoot = operationData[propertyName];
      findElementBySelector(currentRoot, selector, operationData, propertyName);
      return operationData;
    }
    var rootCallback = function rootCallback2(root) {
      findElementBySelector(root, selector, operationData, propertyName);
    };
    this.eventbus.broadcast(TimelineEventNames.REQUEST_ENGINE_ROOT, [rootCallback]);
    return operationData;
  };
  var setElementContent$1 = function setElementContent(operationData) {
    var _operationData$insert = operationData.insertionType, insertionType = _operationData$insert === void 0 ? "overwrite" : _operationData$insert, selectedElement = operationData.selectedElement, template = operationData.template;
    switch (true) {
      case insertionType === "overwrite":
        selectedElement.html(template);
        break;
      case insertionType === "append":
        selectedElement.append(template);
        break;
      case insertionType === "prepend":
        selectedElement.prepend(template);
        break;
    }
    delete operationData.insertionType;
    return operationData;
  };
  var startLoop$1 = function startLoop(operationData) {
    var context = this;
    var collection = operationData.collection, _operationData$proper = operationData.propertyName, propertyName = _operationData$proper === void 0 ? "currentItem" : _operationData$proper;
    if (typeof collection === "string") {
      throw new Error("Expected collection to be array type, string value was probably not resolved correctly");
    }
    if (context.loopIndex === void 0) {
      if (collection != null && collection.length) {
        context.loopIndex = 0;
        context.loopLength = collection.length - 1;
        context.startIndex = context.currentIndex;
      } else {
        context.skipNextOperation = true;
      }
    }
    if (collection != null && collection.length && context.loopIndex !== void 0) {
      operationData[propertyName] = collection[context.loopIndex];
    }
    delete operationData.propertyName;
    return operationData;
  };
  var RequestAnimationFrameTimelineProvider = /* @__PURE__ */ function() {
    function RequestAnimationFrameTimelineProvider2(eventbus, config) {
      this.eventbus = void 0;
      this.config = void 0;
      this._requestID = -1;
      this._last = 0;
      this._currentPosition = 0;
      this._updateBound = this._update.bind(this);
      this._eventbusListeners = [];
      this._firstFrame = true;
      this._currentPlaylistItem = void 0;
      this._granularity = 1e3;
      this._playlist = void 0;
      this._containerElement = void 0;
      this.playState = "stopped";
      this.loop = false;
      this.eventbus = eventbus;
      this.config = config;
      this.eventbus = eventbus;
      this.config = config;
      this._playlist = this._extractPlaylist(config);
      this._currentPlaylistItem = this._playlist[0];
    }
    var _proto = RequestAnimationFrameTimelineProvider2.prototype;
    _proto._extractPlaylist = function _extractPlaylist(configuration) {
      var playlist = configuration.timelines.filter(function(timeline) {
        return timeline.type === "animation";
      });
      return playlist;
    };
    _proto.playlistItem = function playlistItem(uri) {
      if (uri === null || !uri.length || this._playlist.length === 0) {
        return;
      }
      var item = this._playlist.find(function(item2) {
        return item2.uri === uri;
      });
      if (!item) {
        throw new Error("Unknown playlist uri: " + uri);
      }
      this._currentPlaylistItem = item;
      this._firstFrame = true;
    };
    _proto._addEventListeners = function _addEventListeners() {
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.PLAY_TOGGLE_REQUEST, this.toggleplay.bind(this)));
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.PLAY_REQUEST, this.start.bind(this)));
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.STOP_REQUEST, this.stop.bind(this)));
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.PAUSE_REQUEST, this.pause.bind(this)));
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.SEEK_REQUEST, this.seek.bind(this)));
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.RESIZE_REQUEST, this._resize.bind(this)));
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.CONTAINER_REQUEST, this._container.bind(this)));
      this._eventbusListeners.push(this.eventbus.on(TimelineEventNames.DURATION_REQUEST, this.requestDurationHandler.bind(this)));
    };
    _proto._update = function _update(now) {
      if (this.playState !== "running") {
        return;
      }
      if (!this._last || now - this._last >= this._granularity) {
        if (!this._last && this._firstFrame) {
          this._firstFrame = false;
          this.eventbus.broadcast(TimelineEventNames.FIRST_FRAME);
        }
        this._last = now;
        this._currentPosition++;
        if (this._currentPosition > this._currentPlaylistItem.duration) {
          if (this.loop) {
            this._reset();
          } else {
            this.stop();
            this.eventbus.broadcast(TimelineEventNames.COMPLETE);
            return;
          }
        }
        this.eventbus.broadcast(TimelineEventNames.TIME, [{
          position: this._currentPosition
        }]);
        this.eventbus.broadcast(TimelineEventNames.POSITION_UPDATE, [{
          position: this._currentPosition,
          duration: this._currentPlaylistItem.duration
        }]);
      }
      this._requestID = requestAnimationFrame(this._updateBound);
    };
    _proto._start = function _start() {
      if (this._requestID && this.playState === "running") {
        return;
      }
      this.playState = "running";
      this._requestID = requestAnimationFrame(this._updateBound);
    };
    _proto._reset = function _reset() {
      this._cancelAnimationFrame();
      this._last = 0;
      this._currentPosition = 0;
    };
    _proto._resize = function _resize() {
      console.error("Not implemented yet");
    };
    _proto._container = function _container(callBack) {
      callBack(this._containerElement);
    };
    _proto._cancelAnimationFrame = function _cancelAnimationFrame() {
      if (this._requestID) {
        cancelAnimationFrame(this._requestID);
        this._requestID = -1;
        this._last = 0;
        this._currentPosition = 0;
      }
    };
    _proto.init = function init() {
      this._addEventListeners();
      this._currentPlaylistItem = this._playlist[0];
      this._containerElement = (0, import_jquery.default)(this._currentPlaylistItem.selector);
      if (!this._containerElement.length) {
        throw new Error("timeline selector '" + this._currentPlaylistItem.selector + "' not found");
      }
      var promise = new Promise(function(resolve) {
        resolve();
      });
      return promise;
    };
    _proto.destroy = function destroy() {
      this.stop();
      this._eventbusListeners.forEach(function(func) {
        return func();
      });
      this._containerElement = void 0;
    };
    _proto.toggleplay = function toggleplay() {
      if (this.playState !== "running") {
        this.start();
      } else {
        this.pause();
      }
    };
    _proto.start = function start() {
      this._start();
      this.eventbus.broadcast(TimelineEventNames.PLAY);
    };
    _proto.stop = function stop() {
      this._cancelAnimationFrame();
      this.playState = "stopped";
      this.eventbus.broadcast(TimelineEventNames.STOP);
    };
    _proto.pause = function pause() {
      this.playState = "paused";
      this.eventbus.broadcast(TimelineEventNames.PAUSE);
    };
    _proto.seek = function seek(position2) {
      if (position2 < 0 || position2 > this._currentPlaylistItem.duration) {
        return;
      }
      this.eventbus.broadcast(TimelineEventNames.SEEK, [position2, this._currentPosition, this.getDuration()]);
      this._currentPosition = position2;
      this.eventbus.broadcast(TimelineEventNames.SEEKED, [this._currentPosition, this.getDuration()]);
      this.eventbus.broadcast(TimelineEventNames.TIME, [{
        position: this.getPosition()
      }]);
      this.eventbus.broadcast(TimelineEventNames.POSITION_UPDATE, [{
        position: this._currentPosition,
        duration: this._currentPlaylistItem.duration
      }]);
    };
    _proto.getPosition = function getPosition() {
      return this._currentPosition;
    };
    _proto.getDuration = function getDuration() {
      return this._currentPlaylistItem.duration;
    };
    _proto.requestDurationHandler = function requestDurationHandler(callBack) {
      callBack(this._currentPlaylistItem.duration);
    };
    return RequestAnimationFrameTimelineProvider2;
  }();

  // examples/requestanimationframe/src/config-data.json
  var config_data_exports = {};
  __export(config_data_exports, {
    actions: () => actions,
    availableLanguages: () => availableLanguages,
    containerSelector: () => containerSelector,
    default: () => config_data_default,
    engine: () => engine,
    eventActions: () => eventActions,
    id: () => id,
    initActions: () => initActions,
    labels: () => labels,
    language: () => language,
    layoutTemplate: () => layoutTemplate,
    timelineFlow: () => timelineFlow,
    timelineProviderSettings: () => timelineProviderSettings,
    timelines: () => timelines
  });
  var id = "6291bf4c-07fb-49c6-9005-2dca98d1b3af";
  var engine = {
    systemName: "EligiusEngine"
  };
  var timelineProviderSettings = {
    animation: {
      vendor: "eligius",
      systemName: "RequestAnimationFrameTimelineProvider"
    }
  };
  var containerSelector = "#ct-container";
  var language = "en-US";
  var layoutTemplate = "template:layoutTemplate";
  var availableLanguages = [
    {
      languageCode: "en-US",
      label: "English"
    },
    {
      languageCode: "nl-NL",
      label: "Nederlands"
    }
  ];
  var initActions = [
    {
      name: "MainTitleLabel",
      startOperations: [
        {
          systemName: "selectElement",
          operationData: {
            selector: "#main-title"
          }
        },
        {
          systemName: "getControllerInstance",
          operationData: {
            systemName: "LabelController"
          }
        },
        {
          systemName: "addControllerToElement",
          operationData: {
            labelId: "mainTitle"
          }
        }
      ],
      endOperations: [
        {
          systemName: "selectElement",
          operationData: {
            selector: "#main-title"
          }
        },
        {
          systemName: "removeControllerFromElement",
          operationData: {
            systemName: "LabelController"
          }
        }
      ]
    },
    {
      name: "ProgressbarSetup",
      startOperations: [
        {
          systemName: "selectElement",
          operationData: {
            selector: "#progress"
          }
        },
        {
          systemName: "selectElement",
          operationData: {
            selector: "#progress-text",
            propertyName: "textElement"
          }
        },
        {
          systemName: "getControllerInstance",
          operationData: {
            systemName: "ProgressbarController"
          }
        },
        {
          systemName: "addControllerToElement",
          operationData: {
            playerId: "raf"
          }
        }
      ],
      endOperations: [
        {
          systemName: "selectElement",
          operationData: {
            selector: "#progress"
          }
        },
        {
          systemName: "removeControllerFromElement",
          operationData: {
            systemName: "ProgressbarController"
          }
        }
      ]
    },
    {
      name: "LanguageSelection",
      startOperations: [
        {
          id: "6561337a-c83e-4d76-9ded-b887e59e151e",
          systemName: "selectElement",
          operationData: {
            selector: "[data-selector-container=true]"
          }
        },
        {
          id: "7d282d68-e75d-4b92-bf13-8e836f39ee96",
          systemName: "createElement",
          operationData: {
            elementName: "select",
            attributes: {
              "data-language-selector": "true",
              defaultValue: "nl-NL"
            }
          }
        },
        {
          id: "e61a532a-712a-4746-915a-ab0781bcd4dc",
          systemName: "setElementContent",
          operationData: {
            insertionType: "prepend"
          }
        },
        {
          id: "beaa54ef-5809-44e8-8bdf-2cd868cd5ed9",
          systemName: "selectElement",
          operationData: {
            selector: "[data-language-selector=true]"
          }
        },
        {
          id: "3cde6cdb-23e2-4149-a50b-0470cee46fb3",
          systemName: "startLoop",
          operationData: {
            collection: "config:availableLanguages"
          }
        },
        {
          id: "0b636a6d-4c59-47e2-b9fa-c88bc8cdfeb6",
          systemName: "createElement",
          operationData: {
            elementName: "option",
            attributes: {
              value: "operationdata.currentItem.languageCode"
            },
            text: "operationdata.currentItem.label"
          }
        },
        {
          id: "eda9fd92-ebf0-4418-9351-057db29bcdb1",
          systemName: "setElementContent",
          operationData: {
            insertionType: "append"
          }
        },
        {
          id: "2f215329-c443-40b7-b861-c5987fd7f5ad",
          systemName: "endLoop",
          operationData: {}
        },
        {
          id: "878c43e4-05c8-4b9f-a3c2-9db1e2c0a6a5",
          systemName: "getControllerInstance",
          operationData: {
            systemName: "EventListenerController"
          }
        },
        {
          id: "ec1eab42-fa1a-436d-be61-a288e16d5c24",
          systemName: "addControllerToElement",
          operationData: {
            eventName: "change",
            actions: ["BroadcastLanguageChange"]
          }
        }
      ],
      endOperations: [
        {
          id: "b5b58a06-bda3-4a14-8b5d-7f9f91b78b8e",
          systemName: "selectElement",
          operationData: {
            selector: "[data-language-selector=true]"
          }
        },
        {
          id: "bec08c61-34df-415d-937d-065294bd9f44",
          systemName: "removeControllerFromElement",
          operationData: {
            controllerName: "EventListenerController"
          }
        }
      ]
    },
    {
      name: "SubtitleDisplay",
      startOperations: [
        {
          systemName: "selectElement",
          operationData: {
            selector: "#subtitles"
          }
        },
        {
          systemName: "getControllerInstance",
          operationData: {
            systemName: "SubtitlesController"
          }
        },
        {
          systemName: "addControllerToElement",
          operationData: {
            language: "config:language",
            subtitleData: "json:testSubtitles"
          }
        }
      ],
      endOperations: [
        {
          systemName: "selectElement",
          operationData: {
            selector: "#subtitles"
          }
        },
        {
          systemName: "removeControllerFromElement",
          operationData: {
            systemName: "SubtitlesController"
          }
        }
      ]
    }
  ];
  var actions = [
    {
      name: "BroadcastLanguageChange",
      startOperations: [
        {
          systemName: "broadcastEvent",
          operationData: {
            eventName: "language-change",
            eventArgs: ["operationData.targetValue"]
          }
        }
      ],
      endOperations: []
    }
  ];
  var timelines = [
    {
      type: "animation",
      uri: "animation-01",
      duration: 45,
      loop: true,
      selector: ".timeline-div",
      timelineActions: [
        {
          name: "ShowChartHistoryItem",
          duration: {
            start: 7
          },
          startOperations: [
            {
              systemName: "selectElement",
              operationData: {
                selector: ".view-history-container"
              }
            },
            {
              systemName: "setElementContent",
              operationData: {
                template: '<div class="view-history-item-borders view-history-item" id="view-history-item-1"><span class="huge">1</span></div>',
                append: true
              }
            },
            {
              systemName: "selectElement",
              operationData: {
                useExistingAsRoot: true,
                selector: "#view-history-item-1"
              }
            },
            {
              systemName: "addClass",
              operationData: {
                className: "view-history-item-full"
              }
            }
          ],
          endOperations: [
            {
              systemName: "selectElement",
              operationData: {
                selector: "#view-history-item-1"
              }
            },
            {
              systemName: "removeElement"
            }
          ]
        },
        {
          name: "ShowGoogleMaps",
          duration: {
            start: 22,
            end: 40
          },
          startOperations: [
            {
              systemName: "selectElement",
              operationData: {
                selector: ".main-view-container"
              }
            },
            {
              systemName: "setElementContent",
              operationData: {
                template: '<iframe src="//www.google.com/maps/embed/v1/place?q=Harrods,Brompton%20Rd,%20UK&zoom=17" class="google-maps-container"></iframe>'
              }
            }
          ],
          endOperations: [
            {
              systemName: "selectElement",
              operationData: {
                selector: ".main-view-container"
              }
            },
            {
              systemName: "clearElement"
            }
          ]
        },
        {
          name: "ShowGoogleMapsHistoryItem",
          duration: {
            start: 24
          },
          startOperations: [
            {
              systemName: "selectElement",
              operationData: {
                selector: ".view-history-container"
              }
            },
            {
              systemName: "setElementContent",
              operationData: {
                template: '<div class="view-history-item" id="view-history-item-2"><span class="huge">2</span></div>',
                append: true
              }
            }
          ],
          endOperations: [
            {
              systemName: "selectElement",
              operationData: {
                selector: "#view-history-item-2"
              }
            },
            {
              systemName: "removeElement"
            }
          ]
        }
      ]
    }
  ];
  var timelineFlow = {
    id: "11-22-33",
    uri: "animation-01",
    children: [
      {
        id: "44-55-66",
        uri: "animation-02",
        param: true
      },
      {
        id: "77-88-99",
        uri: "animation-03",
        param: false
      }
    ]
  };
  var eventActions = [];
  var labels = [
    {
      id: "mainTitle",
      labels: [
        {
          languageCode: "en-US",
          label: "This is the main title"
        },
        {
          languageCode: "nl-NL",
          label: "Dit is de hoofdtitel"
        }
      ]
    }
  ];
  var config_data_default = {
    id,
    engine,
    timelineProviderSettings,
    containerSelector,
    language,
    layoutTemplate,
    availableLanguages,
    initActions,
    actions,
    timelines,
    timelineFlow,
    eventActions,
    labels
  };

  // examples/requestanimationframe/src/template/layout-template.html
  var layout_template_default = '<div id="main">\r\n  <div data-selector-container="true"></div>\r\n  <h1 id="main-title"></h1>\r\n  <div class="timeline-div"></div>\r\n  <div id="subtitles"></div>\r\n  <div id="progress">\r\n    <div id="progress-text"></div>\r\n  </div>\r\n  <div class="view-history-container"></div>\r\n</div>\r\n';

  // examples/requestanimationframe/src/json/test-subtitles.json
  var test_subtitles_default = [
    {
      lang: "en-US",
      titles: [
        {
          duration: {
            start: 1,
            end: 6
          },
          text: "Here is some text that will say here a while."
        },
        {
          duration: {
            start: 7,
            end: 13
          },
          text: "I could talk about some interesting things now."
        },
        {
          duration: {
            start: 14,
            end: 20
          },
          text: "But I'll have a Gordon instead."
        }
      ]
    },
    {
      lang: "nl-NL",
      titles: [
        {
          duration: {
            start: 1,
            end: 6
          },
          text: "Hier is wat tekst dat hier een tijdje staat."
        },
        {
          duration: {
            start: 7,
            end: 13
          },
          text: "Ik zou wat interessants kunnen zeggen hier."
        },
        {
          duration: {
            start: 14,
            end: 20
          },
          text: "Maar ik neem liever een Gordon."
        }
      ]
    }
  ];

  // examples/requestanimationframe/src/webpack-resource-importer.ts
  var WebpackResourceImporter = class {
    import(name2) {
      switch (true) {
        case name2 === "selectElement":
          return { [name2]: selectElement$1 };
        case name2 === "getControllerInstance":
          return { [name2]: getControllerInstance$1 };
        case name2 === "addControllerToElement":
          return { [name2]: addControllerToElement$1 };
        case name2 === "removeControllerFromElement":
          return { [name2]: removeControllerFromElement$1 };
        case name2 === "createElement":
          return { [name2]: createElement$1 };
        case name2 === "setElementContent":
          return { [name2]: setElementContent$1 };
        case name2 === "startLoop":
          return { [name2]: startLoop$1 };
        case name2 === "endLoop":
          return { [name2]: endLoop$1 };
        case name2 === "broadcastEvent":
          return { [name2]: broadcastEvent$1 };
        case name2 === "addClass":
          return { [name2]: addClass$1 };
        case name2 === "removeElement":
          return { [name2]: removeElement$1 };
        case name2 === "clearElement":
          return { [name2]: clearElement$1 };
        case name2 === "layoutTemplate":
          return { [name2]: layout_template_default };
        case name2 === "testSubtitles":
          return { [name2]: test_subtitles_default };
        case name2 === "LabelController":
          return { [name2]: LabelController };
        case name2 === "ProgressbarController":
          return { [name2]: ProgressbarController };
        case name2 === "EventListenerController":
          return { [name2]: EventListenerController };
        case name2 === "SubtitlesController":
          return { [name2]: SubtitlesController };
        case name2 === "RequestAnimationFrameTimelineProvider":
          return { [name2]: RequestAnimationFrameTimelineProvider };
        case name2 === "EligiusEngine":
          return { [name2]: EligiusEngine };
        default:
          throw Error("Unknown systemName: " + name2);
      }
    }
  };
  var webpack_resource_importer_default = WebpackResourceImporter;

  // examples/requestanimationframe/src/boot.ts
  var factory = new EngineFactory(new webpack_resource_importer_default(), window);
  var writableConfig = JSON.parse(JSON.stringify(config_data_exports));
  var engine2 = factory.createEngine(writableConfig);
  engine2.init().then(() => {
    console.log("Eligius engine ready for business");
  });
})();
/*!
 * jQuery JavaScript Library v3.6.0
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2021-03-02T17:08Z
 */
/*!
 Transformation Matrix v2.0
 (c) Epistemex 2014-2015
 www.epistemex.com
 By Ken Fyrstenberg
 Contributions by leeoniya.
 License: MIT, header required.
 */
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
