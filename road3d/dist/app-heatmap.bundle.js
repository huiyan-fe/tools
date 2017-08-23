/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utility = __webpack_require__(4);

var _utility2 = _interopRequireDefault(_utility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var id = 0;

var OBJ = function () {
    function OBJ(GL, obj) {
        _classCallCheck(this, OBJ);

        this.GL = GL;
        this.id = ++id;
        this.gl = GL.gl;
        this.obj = obj = obj || {};
        this.operate = [];
        this.opearteID = 0;
        this.opearteBuild = {};
        this.color = _utility2.default.colorTransform(obj.color || '#FFF');
    }

    _createClass(OBJ, [{
        key: 'translate',
        value: function translate(x, y, z) {
            var id = this.opearteID = this.opearteID;
            this.operate.push({
                id: id++,
                name: 'translate',
                value: [x || 0, y || 0, z || 0]
            });
            return this;
        }

        // useage
        // rotate(30,'x')
        // rotate(30,'y')
        // rotate(30,'z')
        // rotate(30,[1,1,0])

    }, {
        key: 'rotate',
        value: function rotate(rad, axis) {
            var _axis = null;
            if (axis instanceof Array && axis.length == 3) {
                _axis = axis;
            } else {
                switch (axis) {
                    case 'x':
                        _axis = [1, 0, 0];
                        break;
                    case 'y':
                        _axis = [0, 1, 0];
                        break;
                    case 'z':
                        _axis = [0, 0, 1];
                        break;
                }
            }

            if (_axis) {
                var _id = this.opearteID = this.opearteID;
                this.operate.push({
                    id: _id++,
                    name: 'rotate',
                    value: [rad, _axis]
                });
            }
            return this;
        }
    }, {
        key: 'scale',
        value: function scale(x, y, z) {
            var id = this.opearteID = this.opearteID;
            this.operate.push({
                id: id++,
                name: 'scale',
                value: [x || 1, y || 1, z || 1]
            });
            return this;
        }
    }, {
        key: 'updateOpearte',
        value: function updateOpearte() {
            var mvMatrix = this.GL.camera.mvMatrix;
            if (this.opearteBuild.ID === this.opearteID && this.opearteBuild.start === mvMatrix.toString()) {
                mvMatrix = this.opearteBuild.result;
            } else {
                var start = mvMatrix.toString();
                for (var i in this.operate) {
                    var type = this.operate[i].name;
                    var value = this.operate[i].value;
                    var mvNMatrix = mat4.create();
                    switch (type) {
                        case 'translate':
                            mat4.translate(mvNMatrix, mvMatrix, value);
                            mvMatrix = mvNMatrix;
                            break;
                        case 'rotate':
                            mat4.rotate(mvNMatrix, mvMatrix, value[0], value[1]);
                            mvMatrix = mvNMatrix;
                            break;
                        case 'scale':
                            mat4.scale(mvNMatrix, mvMatrix, value);
                            mvMatrix = mvNMatrix;
                            break;
                    }
                }
                this.opearteBuild = {
                    ID: this.opearteID,
                    result: mvMatrix,
                    start: start
                };
            }
        }
    }]);

    return OBJ;
}();

exports.default = OBJ;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Object = __webpack_require__(0);

var _Object2 = _interopRequireDefault(_Object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Path = function (_Obj) {
    _inherits(Path, _Obj);

    function Path(GL, obj) {
        _classCallCheck(this, Path);

        var _this = _possibleConstructorReturn(this, (Path.__proto__ || Object.getPrototypeOf(Path)).call(this, GL, obj));

        var color = _this.color;
        var paths = obj.path;
        _this.verticesColors = [];
        paths.forEach(function (point) {
            _this.verticesColors = _this.verticesColors.concat(point.concat(color));
        });
        _this.verticesColors = new Float32Array(_this.verticesColors);
        return _this;
    }

    _createClass(Path, [{
        key: 'render',
        value: function render() {
            var gl = this.gl;
            gl.uniform1i(this.gl.uUseTexture, false);
            var mvMatrix = this.GL.camera.mvMatrix;

            // 顶点/颜色缓冲区操作
            var vertexColorBuffer = this.gl.buffers('vcBuffer' + this.id);
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.verticesColors, gl.STATIC_DRAW);
            //
            var FSIZE = this.verticesColors.BYTES_PER_ELEMENT;
            //
            gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, FSIZE * 6, 0);
            gl.enableVertexAttribArray(gl.aPosition);
            //
            gl.vertexAttribPointer(gl.aColor, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
            gl.enableVertexAttribArray(gl.aColor);
            vertexColorBuffer = null;
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);

            // set mv
            this.updateOpearte();
            //

            gl.uniformMatrix4fv(this.gl.uMVMatrix, false, this.opearteBuild.result);
            gl.drawArrays(gl.LINE_STRIP, 0, this.verticesColors.length / 6);
        }
    }]);

    return Path;
}(_Object2.default);

exports.default = Path;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Object = __webpack_require__(0);

var _Object2 = _interopRequireDefault(_Object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Belt = function (_Obj) {
    _inherits(Belt, _Obj);

    function Belt(GL, obj) {
        _classCallCheck(this, Belt);

        var _this = _possibleConstructorReturn(this, (Belt.__proto__ || Object.getPrototypeOf(Belt)).call(this, GL, obj));

        _this.obj = obj;
        _this.update(obj);
        return _this;
    }

    _createClass(Belt, [{
        key: 'update',
        value: function update(obj) {
            var _this2 = this;

            var color = this.color;
            var paths = obj.path;
            this.height = obj.height || 10.0;
            this.verticesColors = [];
            this.indices = [];
            this.texture_coords = [];

            var pathDistances = [];
            var pathLength = 0;
            paths.forEach(function (point, index) {
                // if(index>10) return false;
                if (index > 0) {
                    var start = point;
                    var end = paths[index - 1];
                    var dist = Math.sqrt(Math.pow(start[0] - end[0], 2), Math.pow(start[1] - end[1], 2));
                    pathLength += dist;
                }
                pathDistances.push(pathLength);
                //
                point[2] = _this2.height;
                _this2.verticesColors = _this2.verticesColors.concat(point.concat(color));
                point[2] = 0;
                _this2.verticesColors = _this2.verticesColors.concat(point.concat(color));
                //
                _this2.indices.push(index * 2);
                _this2.indices.push(index * 2 + 1);
            });
            pathDistances.forEach(function (dist, index) {
                _this2.texture_coords.push(dist / pathLength, 1);
                _this2.texture_coords.push(dist / pathLength, 0);
            });
            this.texture_coords = new Float32Array(this.texture_coords);
            this.indices = new Uint16Array(this.indices);
            this.verticesColors = new Float32Array(this.verticesColors);
        }
    }, {
        key: 'render',
        value: function render() {
            var gl = this.gl;
            var mvMatrix = this.GL.camera.mvMatrix;

            // 顶点/颜色缓冲区操作
            var vertexColorBuffer = this.gl.buffers('vcBuffer');
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.verticesColors, gl.STATIC_DRAW);
            var FSIZE = this.verticesColors.BYTES_PER_ELEMENT;
            gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, FSIZE * 6, 0);
            gl.enableVertexAttribArray(gl.aPosition);
            gl.vertexAttribPointer(gl.aColor, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
            gl.enableVertexAttribArray(gl.aColor);
            vertexColorBuffer = null;
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);

            // 顶点索引
            var indexBuffer = this.gl.buffers('indexBuffer');
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            // gl.bindTexture(gl.TEXTURE_2D, texture);
            // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            // gl.bindTexture(gl.TEXTURE_2D, null);

            if (this.obj.texture) {
                this.gl.uniform1i(this.gl.uUseTexture, true);
                // texture
                var texture = gl.textures('text');
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.activeTexture(gl.TEXTURE0);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.obj.texture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.uniform1i(gl.uSampler, 0);
                // // texture coordinate
                // console.log(this.texture_coords)
                var textureBufferObject = this.gl.buffers('textureBuffer');
                gl.bindBuffer(gl.ARRAY_BUFFER, textureBufferObject);
                gl.bufferData(gl.ARRAY_BUFFER, this.texture_coords, gl.STATIC_DRAW);
                gl.vertexAttribPointer(gl.aVertexTextureCoords, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(gl.aVertexTextureCoords);
                // gl.bindBuffer(gl.ARRAY_BUFFER, null);
            }

            // set mv
            this.updateOpearte();
            //

            gl.uniformMatrix4fv(this.gl.uMVMatrix, false, this.opearteBuild.result);
            // gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.verticesColors.length / 6);
            // console.log(this.indices.length)

            gl.drawElements(gl.TRIANGLE_STRIP, this.indices.length, gl.UNSIGNED_SHORT, 0);
            window.gl = gl;
        }
    }]);

    return Belt;
}(_Object2.default);

exports.default = Belt;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Object = __webpack_require__(0);

var _Object2 = _interopRequireDefault(_Object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Heatmap = function (_Obj) {
    _inherits(Heatmap, _Obj);

    function Heatmap(GL, obj) {
        _classCallCheck(this, Heatmap);

        var _this = _possibleConstructorReturn(this, (Heatmap.__proto__ || Object.getPrototypeOf(Heatmap)).call(this, GL, obj));

        _this.GL = GL;
        _this.obj = obj;

        var color = _this.color;
        var paths = obj.path;
        _this.verticesColors = [];
        _this.indices = [];
        _this.texture_coords = [];
        // this.verticesColors.concat(point.concat(color));

        var drawWidth = 1000;
        var drawHeight = 1000;
        var offsetX = 10;
        var offsetY = 10;

        var xIndex = 0;
        var yIndex = 0;
        while (yIndex <= drawWidth) {
            while (xIndex <= drawHeight) {
                var xPresent = xIndex / drawWidth;
                var yPresent = yIndex / drawHeight;
                var xImg = Math.round(obj.alphaImageData.width * xPresent);
                var yImg = Math.round(obj.alphaImageData.height * yPresent);
                xImg = Math.min(obj.alphaImageData.width - 1, xImg);
                yImg = Math.min(obj.alphaImageData.height - 1, yImg);
                var imgDataIndex = (xImg + yImg * obj.alphaImageData.width) * 4;

                var xPixel = xIndex - drawWidth / 2;
                var yPixel = drawHeight / 2 - yIndex;
                //
                var r = obj.imgData.data[imgDataIndex] / 255;
                var g = obj.imgData.data[imgDataIndex + 1] / 255;
                var b = obj.imgData.data[imgDataIndex + 2] / 255;
                if (obj.alphaImageData.data[imgDataIndex + 3] === 0) {
                    r = g = b = 0.1;
                }
                _this.verticesColors.push(xPixel, yPixel, obj.alphaImageData.data[imgDataIndex + 3] * 3, r, g, b, 0);
                xIndex += offsetX;
            }
            xIndex = 0;
            yIndex += offsetY;
        }

        var xPointsLength = Math.round(drawWidth / offsetX) + 1;
        var yPointsLength = Math.round(drawHeight / offsetY) + 1;

        //
        xIndex = 0;
        yIndex = 1;
        while (yIndex < yPointsLength) {
            while (xIndex < xPointsLength) {
                if (xIndex === 0) {
                    _this.indices.push((yIndex - 1) * xPointsLength + xIndex);
                }
                _this.indices.push((yIndex - 1) * xPointsLength + xIndex, yIndex * xPointsLength + xIndex);
                if (xIndex === xPointsLength - 1) {
                    _this.indices.push(yIndex * xPointsLength + xIndex);
                }
                xIndex += 1;
            }
            xIndex = 0;
            yIndex += 1;
        }

        _this.indices = new Uint16Array(_this.indices);
        _this.verticesColors = new Float32Array(_this.verticesColors);
        return _this;
    }

    _createClass(Heatmap, [{
        key: 'update',
        value: function update(obj) {
            this.constructor(this.GL, obj);
        }
    }, {
        key: 'render',
        value: function render() {
            var gl = this.gl;
            var mvMatrix = this.GL.camera.mvMatrix;

            // 顶点/颜色缓冲区操作
            var vertexColorBuffer = this.gl.buffers('vcBuffer');
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, this.verticesColors, gl.STATIC_DRAW);
            var FSIZE = this.verticesColors.BYTES_PER_ELEMENT;
            gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, FSIZE * 7, 0);
            gl.enableVertexAttribArray(gl.aPosition);
            gl.vertexAttribPointer(gl.aColor, 3, gl.FLOAT, false, FSIZE * 7, FSIZE * 3);
            gl.enableVertexAttribArray(gl.aColor);
            vertexColorBuffer = null;
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);

            // 顶点索引
            var indexBuffer = this.gl.buffers('indexBuffer');
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);

            // set mv
            this.updateOpearte();
            //

            gl.uniformMatrix4fv(this.gl.uMVMatrix, false, this.opearteBuild.result);
            gl.drawElements(gl.TRIANGLE_STRIP, this.indices.length, gl.UNSIGNED_SHORT, 0);
        }
    }]);

    return Heatmap;
}(_Object2.default);

exports.default = Heatmap;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//get the context
function getWebGLContext(canvas, err) {
    // bind err
    if (canvas.addEventListener) {
        canvas.addEventListener("webglcontextcreationerror", function (event) {
            console.log(event.statusMessage);
        }, false);
    }
    //create context
    var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    var context = null;
    for (var ii = 0; ii < names.length; ++ii) {
        try {
            context = canvas.getContext(names[ii], err);
        } catch (e) {}
        if (context) {
            break;
        }
    }
    return context;
};

//init shader
function initShaders(gl, vshader, fshader) {
    // console.log('?>??')
    var program = createProgram(gl, vshader, fshader);
    if (!program) {
        console.log('Failed to create program');
        return false;
    }
    gl.useProgram(program);
    gl.program = program;

    // init shader variable
    gl.uPMatrix = gl.getUniformLocation(program, "uPMatrix");
    gl.uMVMatrix = gl.getUniformLocation(program, "uMVMatrix");
    gl.uNMatrix = gl.getUniformLocation(program, "uNMatrix");
    gl.uSampler = gl.getUniformLocation(program, "uSampler");
    gl.uUseTexture = gl.getUniformLocation(program, "uUseTexture");
    gl.uniform1i(program.uUseTextures, false);

    gl.aVertexTextureCoords = gl.getAttribLocation(program, "aVertexTextureCoords");
    gl.aPosition = gl.getAttribLocation(gl.program, 'aPosition');
    gl.aColor = gl.getAttribLocation(gl.program, 'aColor');

    return true;
}

//create program
function createProgram(gl, vshader, fshader) {
    // Create shader object
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
    // console.log(vertexShader)

    if (!vertexShader || !fragmentShader) {
        return null;
    }
    // Create a program object
    var program = gl.createProgram();
    if (!program) {
        return null;
    }
    // Attach the shader objects
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    // Link the program object
    gl.linkProgram(program);
    // Check the result of linking
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
        var error = gl.getProgramInfoLog(program);
        console.log('Failed to link program: ' + error);
        gl.deleteProgram(program);
        gl.deleteShader(fragmentShader);
        gl.deleteShader(vertexShader);
        return null;
    }
    return program;
}

//loadShader
function loadShader(gl, type, source) {
    // console.log(type)
    // Create shader object
    var shader = gl.createShader(type);
    if (shader == null) {
        console.log('unable to create shader');
        return null;
    }
    // Set the shader program
    gl.shaderSource(shader, source);
    // Compile the shader
    gl.compileShader(shader);
    // Check the result of compilation
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
        var error = gl.getShaderInfoLog(shader);
        console.log('Failed to compile shader: ' + error);
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function colorTransform(colorStr) {
    var color = [0, 0, 0];
    if (typeof colorStr == 'string') {
        if (colorStr.indexOf('#') !== -1) {
            var _color = colorStr.substring(1);
            if (_color.length == 3) {
                color = [];
                for (var i = 0; i < _color.length; i++) {
                    var key = _color.charAt(i);
                    color.push(parseInt(key + key, 16) / 255);
                }
            } else if (_color.length == 6) {
                color = [];
                for (var i = 0; i < _color.length; i += 2) {
                    var key = _color.charAt(i);
                    var key2 = _color.charAt(i + 1);
                    color.push(parseInt(key + key2, 16) / 255);
                }
            }
        }
    }
    return color;
}

function calculateNormals(vs, ind) {
    // console.log(vs, ind)
    var x = 0;
    var y = 1;
    var z = 2;

    var ns = [];
    for (var i = 0; i < vs.length; i++) {
        //for each vertex, initialize normal x, normal y, normal z
        ns[i] = 0.0;
    }
    // console.warn(ns)
    for (var i = 0; i < ind.length; i = i + 3) {
        //we work on triads of vertices to calculate normals so i = i+3 (i = indices index)
        var v1 = [];
        var v2 = [];
        var normal = [];
        // console.log(vs[3 * ind[i + 1] + x] - vs[3 * ind[i] + x]);
        //p1 - p0
        v1[x] = vs[3 * ind[i + 1] + x] - vs[3 * ind[i] + x];
        v1[y] = vs[3 * ind[i + 1] + y] - vs[3 * ind[i] + y];
        v1[z] = vs[3 * ind[i + 1] + z] - vs[3 * ind[i] + z];
        // console.log('!', v1)
        // p0 - p1
        v2[x] = vs[3 * ind[i + 2] + x] - vs[3 * ind[i + 1] + x];
        v2[y] = vs[3 * ind[i + 2] + y] - vs[3 * ind[i + 1] + y];
        v2[z] = vs[3 * ind[i + 2] + z] - vs[3 * ind[i + 1] + z];
        // console.log('?', v2)
        //p2 - p1
        // v1[x] = vs[3*ind[i+2]+x] - vs[3*ind[i+1]+x];
        // v1[y] = vs[3*ind[i+2]+y] - vs[3*ind[i+1]+y];
        // v1[z] = vs[3*ind[i+2]+z] - vs[3*ind[i+1]+z];
        // p0 - p1
        // v2[x] = vs[3*ind[i]+x] - vs[3*ind[i+1]+x];
        // v2[y] = vs[3*ind[i]+y] - vs[3*ind[i+1]+y];
        // v2[z] = vs[3*ind[i]+z] - vs[3*ind[i+1]+z];
        //cross product by Sarrus Rule
        normal[x] = v1[y] * v2[z] - v1[z] * v2[y];
        normal[y] = v1[z] * v2[x] - v1[x] * v2[z];
        normal[z] = v1[x] * v2[y] - v1[y] * v2[x];
        // console.log(normal, x, y, z,v1)

        // ns[3*ind[i]+x] += normal[x];
        // ns[3*ind[i]+y] += normal[y];
        // ns[3*ind[i]+z] += normal[z];
        for (var j = 0; j < 3; j++) {
            //update the normals of that triangle: sum of vectors
            ns[3 * ind[i + j] + x] = ns[3 * ind[i + j] + x] + normal[x];
            ns[3 * ind[i + j] + y] = ns[3 * ind[i + j] + y] + normal[y];
            ns[3 * ind[i + j] + z] = ns[3 * ind[i + j] + z] + normal[z];
        }
    }
    // console.log(ns)
    //normalize the result
    for (var i = 0; i < vs.length; i = i + 3) {
        //the increment here is because each vertex occurs with an offset of 3 in the array (due to x, y, z contiguous values)

        var nn = [];
        nn[x] = ns[i + x];
        nn[y] = ns[i + y];
        nn[z] = ns[i + z];

        var len = Math.sqrt(nn[x] * nn[x] + nn[y] * nn[y] + nn[z] * nn[z]);
        if (len == 0) len = 0.00001;

        nn[x] = nn[x] / len;
        nn[y] = nn[y] / len;
        nn[z] = nn[z] / len;

        ns[i + x] = nn[x];
        ns[i + y] = nn[y];
        ns[i + z] = nn[z];
    }
    return ns;
}

function BufferManage(name) {
    this._cache = this._cache || {};
    this._cache.buffers = this._cache.buffers || {};
    if (!this._cache.buffers[name]) {
        this._cache.buffers[name] = this.createBuffer();
    }
    return this._cache.buffers[name];
}

function TextureManage(name) {
    this._cache = this._cache || {};
    this._cache.texture = this._cache.texture || {};
    if (!this._cache.texture[name]) {
        this._cache.texture[name] = this.createTexture();
    }
    return this._cache.texture[name];
}

exports.default = {
    getWebGLContext: getWebGLContext,
    initShaders: initShaders,
    createProgram: createProgram,
    loadShader: loadShader,
    colorTransform: colorTransform,
    calculateNormals: calculateNormals,
    BufferManage: BufferManage,
    TextureManage: TextureManage
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * 百度墨卡托投影类
 */
function MercatorProjection() {}

function extend(a, b) {
    for (var key in b) {
        a[key] = b[key];
    }
}

function Point(lng, lat) {
    this.lng = lng;
    this.lat = lat;
}

function Pixel(x, y) {
    this.x = x;
    this.y = y;
}

// 静态常量
extend(MercatorProjection, {
    EARTHRADIUS: 6370996.81,
    MCBAND: [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
    LLBAND: [75, 60, 45, 30, 15, 0],
    MC2LL: [[1.410526172116255e-008, 8.983055096488720e-006, -1.99398338163310, 2.009824383106796e+002, -1.872403703815547e+002, 91.60875166698430, -23.38765649603339, 2.57121317296198, -0.03801003308653, 1.733798120000000e+007], [-7.435856389565537e-009, 8.983055097726239e-006, -0.78625201886289, 96.32687599759846, -1.85204757529826, -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 1.026014486000000e+007], [-3.030883460898826e-008, 8.983055099835780e-006, 0.30071316287616, 59.74293618442277, 7.35798407487100, -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6.856817370000000e+006], [-1.981981304930552e-008, 8.983055099779535e-006, 0.03278182852591, 40.31678527705744, 0.65659298677277, -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4.482777060000000e+006], [3.091913710684370e-009, 8.983055096812155e-006, 0.00006995724062, 23.10934304144901, -0.00023663490511, -0.63218178102420, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2.555164400000000e+006], [2.890871144776878e-009, 8.983055095805407e-006, -0.00000003068298, 7.47137025468032, -0.00000353937994, -0.02145144861037, -0.00001234426596, 0.00010322952773, -0.00000323890364, 8.260885000000000e+005]],
    LL2MC: [[-0.00157021024440, 1.113207020616939e+005, 1.704480524535203e+015, -1.033898737604234e+016, 2.611266785660388e+016, -3.514966917665370e+016, 2.659570071840392e+016, -1.072501245418824e+016, 1.800819912950474e+015, 82.5], [8.277824516172526e-004, 1.113207020463578e+005, 6.477955746671608e+008, -4.082003173641316e+009, 1.077490566351142e+010, -1.517187553151559e+010, 1.205306533862167e+010, -5.124939663577472e+009, 9.133119359512032e+008, 67.5], [0.00337398766765, 1.113207020202162e+005, 4.481351045890365e+006, -2.339375119931662e+007, 7.968221547186455e+007, -1.159649932797253e+008, 9.723671115602145e+007, -4.366194633752821e+007, 8.477230501135234e+006, 52.5], [0.00220636496208, 1.113207020209128e+005, 5.175186112841131e+004, 3.796837749470245e+006, 9.920137397791013e+005, -1.221952217112870e+006, 1.340652697009075e+006, -6.209436990984312e+005, 1.444169293806241e+005, 37.5], [-3.441963504368392e-004, 1.113207020576856e+005, 2.782353980772752e+002, 2.485758690035394e+006, 6.070750963243378e+003, 5.482118345352118e+004, 9.540606633304236e+003, -2.710553267466450e+003, 1.405483844121726e+003, 22.5], [-3.218135878613132e-004, 1.113207020701615e+005, 0.00369383431289, 8.237256402795718e+005, 0.46104986909093, 2.351343141331292e+003, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45]]

    /**
     * 根据平面直角坐标计算两点间距离;
     * @param {Point} point1 平面直角点坐标1
     * @param {Point} point2 平面直角点坐标2;
     * @return {Number} 返回两点间的距离
     */

    , getDistanceByMC: function getDistanceByMC(point1, point2) {
        if (!point1 || !point2) return 0;
        var x1, y1, x2, y2;
        point1 = this.convertMC2LL(point1);
        if (!point1) return 0;
        x1 = this.toRadians(point1["lng"]);
        y1 = this.toRadians(point1["lat"]);
        point2 = this.convertMC2LL(point2);
        if (!point2) return 0;
        x2 = this.toRadians(point2["lng"]);
        y2 = this.toRadians(point2["lat"]);
        return this.getDistance(x1, x2, y1, y2);
    }
    /**
     * 根据经纬度坐标计算两点间距离;
     * @param {Point} point1 经纬度点坐标1
     * @param {Point} point2 经纬度点坐标2;
     * @return {Number} 返回两点间的距离
     */

    , getDistanceByLL: function getDistanceByLL(point1, point2) {
        if (!point1 || !point2) return 0;
        point1["lng"] = this.getLoop(point1["lng"], -180, 180);
        point1["lat"] = this.getRange(point1["lat"], -74, 74);
        point2["lng"] = this.getLoop(point2["lng"], -180, 180);
        point2["lat"] = this.getRange(point2["lat"], -74, 74);
        var x1, x2, y1, y2;
        x1 = this.toRadians(point1["lng"]);
        y1 = this.toRadians(point1["lat"]);
        x2 = this.toRadians(point2["lng"]);
        y2 = this.toRadians(point2["lat"]);
        return this.getDistance(x1, x2, y1, y2);
    }
    /**
     * 平面直角坐标转换成经纬度坐标;
     * @param {Point} point 平面直角坐标
     * @return {Point} 返回经纬度坐标
     */

    , convertMC2LL: function convertMC2LL(point) {
        if (point === null || point === undefined) {
            return new Point(0, 0);
        }

        var temp, factor;
        temp = new Point(Math.abs(point["lng"]), Math.abs(point["lat"]));
        for (var i = 0; i < this.MCBAND.length; i++) {
            if (temp["lat"] >= this.MCBAND[i]) {
                factor = this.MC2LL[i];
                break;
            }
        };
        var lnglat = this.convertor(point, factor);
        var point = new Point(lnglat["lng"].toFixed(6), lnglat["lat"].toFixed(6));
        return point;
    }

    /**
     * 经纬度坐标转换成平面直角坐标;
     * @param {Point} point 经纬度坐标
     * @return {Point} 返回平面直角坐标
     */

    , convertLL2MC: function convertLL2MC(point) {
        if (point === null || point === undefined) {
            return new Point(0, 0);
        }

        //添加判断by yansunrong  由于用户可能输入不合理的坐标，导致死循环。
        if (point["lng"] > 180 || point["lng"] < -180 || point["lat"] > 90 || point["lat"] < -90) {
            return new Point(0, 0);
        }

        var temp, factor;
        point["lng"] = this.getLoop(point["lng"], -180, 180);
        point["lat"] = this.getRange(point["lat"], -74, 74);
        temp = new Point(point["lng"], point["lat"]);
        for (var i = 0; i < this.LLBAND.length; i++) {
            if (temp["lat"] >= this.LLBAND[i]) {
                factor = this.LL2MC[i];
                break;
            }
        }
        if (!factor) {
            for (var i = 0; i < this.LLBAND.length; i++) {
                if (temp["lat"] <= -this.LLBAND[i]) {
                    factor = this.LL2MC[i];
                    break;
                }
            }
        }
        var mc = this.convertor(point, factor);
        var point = new Point(mc["lng"].toFixed(2), mc["lat"].toFixed(2));
        return point;
    },
    convertor: function convertor(fromPoint, factor) {
        if (!fromPoint || !factor) {
            return;
        }
        var x = factor[0] + factor[1] * Math.abs(fromPoint["lng"]);
        var temp = Math.abs(fromPoint["lat"]) / factor[9];
        var y = factor[2] + factor[3] * temp + factor[4] * temp * temp + factor[5] * temp * temp * temp + factor[6] * temp * temp * temp * temp + factor[7] * temp * temp * temp * temp * temp + factor[8] * temp * temp * temp * temp * temp * temp;
        x *= fromPoint["lng"] < 0 ? -1 : 1;
        y *= fromPoint["lat"] < 0 ? -1 : 1;
        return new Point(x, y);
    },

    getDistance: function getDistance(x1, x2, y1, y2) {
        return this.EARTHRADIUS * Math.acos(Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1));
    },

    toRadians: function toRadians(angdeg) {
        return Math.PI * angdeg / 180;
    },

    toDegrees: function toDegrees(angrad) {
        return 180 * angrad / Math.PI;
    },
    getRange: function getRange(v, a, b) {
        if (a != null) {
            v = Math.max(v, a);
        }
        if (b != null) {
            v = Math.min(v, b);
        }
        return v;
    },
    getLoop: function getLoop(v, a, b) {
        while (v > b) {
            v -= b - a;
        }
        while (v < a) {
            v += b - a;
        }
        return v;
    }
});

extend(MercatorProjection.prototype, {
    /**
     * 经纬度变换至墨卡托坐标
     * @param Point 经纬度
     * @return Point 墨卡托
     */
    lngLatToMercator: function lngLatToMercator(point) {
        return MercatorProjection.convertLL2MC(point);
    },
    /**
     * 球面到平面坐标
     * @param Point 球面坐标
     * @return Pixel 平面坐标
     */
    lngLatToPoint: function lngLatToPoint(point) {
        var mercator = MercatorProjection.convertLL2MC(point);
        return new Pixel(mercator["lng"], mercator["lat"]);
    },
    /**
     * 墨卡托变换至经纬度
     * @param Point 墨卡托
     * @returns Point 经纬度
     */
    mercatorToLngLat: function mercatorToLngLat(point) {
        return MercatorProjection.convertMC2LL(point);
    },
    /**
     * 平面到球面坐标
     * @param Pixel 平面坐标
     * @returns Point 球面坐标
     */
    pointToLngLat: function pointToLngLat(point) {
        var mercator = new Point(point.x, point.y);
        return MercatorProjection.convertMC2LL(mercator);
    },
    /**
     * 地理坐标转换至像素坐标
     * @param Point 地理坐标
     * @param Number 级别
     * @param Point 地图中心点，注意为了保证没有误差，这里需要传递墨卡托坐标
     * @param Size 地图容器大小
     * @return Pixel 像素坐标
     */
    pointToPixel: function pointToPixel(point, zoom, mapCenter, mapSize, curCity) {
        if (!point) {
            return;
        }
        point = this.lngLatToMercator(point, curCity);
        var zoomUnits = this.getZoomUnits(zoom);
        var x = Math.round((point["lng"] - mapCenter["lng"]) / zoomUnits + mapSize.width / 2);
        var y = Math.round((mapCenter["lat"] - point["lat"]) / zoomUnits + mapSize.height / 2);
        return new Pixel(x, y);
    },
    /**
     * 像素坐标转换至地理坐标
     * @param Pixel 像素坐标
     * @param Number 级别
     * @param Point 地图中心点，注意为了保证没有误差，这里需要传递墨卡托坐标
     * @param Size 地图容器大小
     * @return Point 地理坐标
     */
    pixelToPoint: function pixelToPoint(pixel, zoom, mapCenter, mapSize, curCity) {
        if (!pixel) {
            return;
        }
        var zoomUnits = this.getZoomUnits(zoom);
        var lng = mapCenter["lng"] + zoomUnits * (pixel.x - mapSize.width / 2);
        var lat = mapCenter["lat"] - zoomUnits * (pixel.y - mapSize.height / 2);
        var point = new Point(lng, lat);
        return this.mercatorToLngLat(point, curCity);
    },
    getZoomUnits: function getZoomUnits(zoom) {
        return Math.pow(2, 18 - zoom);
    }
});

exports.default = MercatorProjection;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utility = __webpack_require__(4);

var _utility2 = _interopRequireDefault(_utility);

var _camera = __webpack_require__(7);

var _camera2 = _interopRequireDefault(_camera);

var _objectPath = __webpack_require__(1);

var _objectPath2 = _interopRequireDefault(_objectPath);

var _default = __webpack_require__(8);

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebGl = function WebGl(dom, config) {
    _classCallCheck(this, WebGl);

    var Dom = document.getElementById(dom);
    console.log(dom, Dom);
    var DomSty = getComputedStyle(Dom);

    // init canvas
    var canvas = document.createElement('canvas');
    canvas.height = parseInt(DomSty.height) * devicePixelRatio;
    canvas.width = parseInt(DomSty.width) * devicePixelRatio;
    canvas.style.height = parseInt(DomSty.height) + 'px';
    canvas.style.width = parseInt(DomSty.width) + 'px';
    Dom.appendChild(canvas);

    // init renderlist
    var renderList = this.renderList = [];

    // init webgl context
    var gl = this.gl = _utility2.default.getWebGLContext(canvas);
    gl.buffers = _utility2.default.BufferManage;
    gl.textures = _utility2.default.TextureManage;

    // init shader
    _utility2.default.initShaders(gl, _default2.default.VSHADER_SOURCE, _default2.default.FSHADER_SOURCE);

    // init camera 
    this.camera = new _camera2.default(this.gl);

    // open depth test and set clear color
    gl.clearColor(.1, .1, .1, 1.0);
    gl.clearDepth(1.0); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL);

    // auto draw
    (function draw() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        // console.log(renderList)
        for (var i in renderList) {
            renderList[i].render();
        }
        requestAnimationFrame(draw);
    })();
};

// inject objects


var objects = [{
    name: 'Path',
    path: 'object-path.js'
}, {
    name: 'Belt',
    path: 'object-belt.js'
}, {
    name: 'HeatMap',
    path: 'object-heatmap.js'
}];

objects.forEach(function (object) {
    WebGl.prototype[object.name] = function (obj) {
        var objClass = __webpack_require__(11)("./" + object.path).default;
        var objInstance = new objClass(this, obj);
        this.renderList.push(objInstance);
        return objInstance;
    };
});

exports.default = WebGl;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _glMatrixMin = __webpack_require__(9);

// import Con from './sys';
var Con = {
    longitudeLatitudeScale: 100
};

var Camera = function Camera(gl) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.gl = gl;

    this.radius = opt.radius || 1200;
    this.lon = opt.lon || 90;
    this.lat = opt.lat || 45;

    this.transX = (opt.x || 0) * Con.longitudeLatitudeScale;
    this.transY = (opt.y || 0) * Con.longitudeLatitudeScale;

    var canvas = gl.canvas;

    gl.viewport(0, 0, canvas.width, canvas.height);
    var pMatrix = _glMatrixMin.mat4.create();
    this.nMatrix = _glMatrixMin.mat4.create(); // The normal matrix
    _glMatrixMin.mat4.perspective(pMatrix, 45, canvas.width / canvas.height, 1, 10000.0);
    gl.uniformMatrix4fv(gl.uPMatrix, false, pMatrix);

    this.computerXYZ();
    this.render();
    this.init();
};

Camera.prototype.init = function () {
    this.drag();
};

Camera.prototype.render = function () {
    var mvMatrix = _glMatrixMin.mat4.create();
    _glMatrixMin.mat4.lookAt(mvMatrix, [this.x, this.y, this.z], [0, 0, 0], [0, 0, 1]);
    this.mvMatrix = _glMatrixMin.mat4.translate(_glMatrixMin.mat4.create(), mvMatrix, [-this.transX, -this.transY, 0]);

    // // set normal
    var nMatrix = this.nMatrix;
    _glMatrixMin.mat4.set(mvMatrix, nMatrix);
    _glMatrixMin.mat4.invert(nMatrix, nMatrix);
    _glMatrixMin.mat4.transpose(nMatrix, nMatrix);
    this.gl.uniformMatrix4fv(this.gl.uNMatrix, false, nMatrix);
};

Camera.prototype.drag = function () {
    var self = this;
    var canvas = this.gl.canvas;

    var startX = 0;
    var startY = 0;
    var which = 1;
    var startLon = 0;
    var startTransX = 0;
    var startTransY = 0;
    var startLat = 0;
    var canDrag = false;

    canvas.addEventListener('mousewheel', function (e) {
        self.radius -= event.deltaY;
        self.radius = Math.max(10, self.radius);
        self.radius = Math.min(100000, self.radius);
        self.computerXYZ();
        self.render();
    });

    canvas.addEventListener('mousedown', function (e) {
        startX = e.offsetX;
        startY = e.offsetY;
        startLon = self.lon;
        startLat = self.lat;
        which = e.which;
        startTransX = self.transX;
        startTransY = self.transY;
        canDrag = true;
        window.event.returnValue = false;
        return false;
    });

    canvas.addEventListener('contextmenu', function () {
        window.event.returnValue = false;
        return false;
    });

    window.addEventListener('mousemove', function (e) {
        if (canDrag) {
            var dX = e.offsetX - startX;
            var dY = e.offsetY - startY;
            if (e.which === 1) {
                var dLon = dX / 1;
                var dLat = dY / 1;
                self.lon = (startLon + dLon) % 360;
                self.lat = startLat + dLat;
                self.lat = Math.min(90, self.lat);
                self.lat = Math.max(-90, self.lat);
                self.lat = Math.max(0, self.lat);
            } else {
                self.transX = startTransX - dX * Con.longitudeLatitudeScale / 10;
                self.transY = startTransY + dY * Con.longitudeLatitudeScale / 10;
            }
            self.computerXYZ();
            self.render();
        }
    });

    window.addEventListener('mouseup', function (e) {
        startX = 0;
        startY = 0;
        canDrag = false;
    });
};

Camera.prototype.computerXYZ = function () {
    var self = this;
    self.z = self.radius * Math.sin(self.lat * Math.PI / 180);
    var smallRadius = self.radius * Math.cos(self.lat * Math.PI / 180);
    self.x = smallRadius * Math.cos(self.lon * Math.PI / 180);
    self.y = -smallRadius * Math.sin(self.lon * Math.PI / 180);
};

exports.default = Camera;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var VSHADER_SOURCE = 'attribute vec3 aPosition;\n' + 'attribute vec4 aColor;\n' + 'attribute vec2 aVertexTextureCoords;\n' + 'uniform mat4 uMVMatrix;\n' + 'uniform mat4 uPMatrix;\n' + 'varying vec4 vColor;\n' + 'varying vec2 vTextureCoords;\n' + 'void main() {\n' + '  gl_Position = uPMatrix * uMVMatrix * vec4(aPosition, 1.0);\n' + '  vTextureCoords = aVertexTextureCoords;\n' + '  vColor = aColor;\n' + '}\n';

var FSHADER_SOURCE = '#ifdef GL_ES\n' + 'precision highp float;\n' + '#endif\n' + 'uniform sampler2D uSampler;' + 'varying vec4 vColor;\n' + 'varying vec2 vTextureCoords;\n' + 'uniform bool uUseTexture;\n' + 'void main() {\n' + '  if(uUseTexture){\n' + '    gl_FragColor = vColor * texture2D(uSampler, vTextureCoords);\n' + '  }else{\n' + '    gl_FragColor = vColor;\n' + '  }\n' + '}\n';

var shaders = {
    VSHADER_SOURCE: VSHADER_SOURCE,
    FSHADER_SOURCE: FSHADER_SOURCE
};

exports.default = shaders;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.3.2
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

!function (t, a) {
  if ("object" == ( false ? "undefined" : _typeof(exports)) && "object" == ( false ? "undefined" : _typeof(module))) module.exports = a();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (a),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
    var n = a();for (var r in n) {
      ("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? exports : t)[r] = n[r];
    }
  }
}(undefined, function () {
  return function (t) {
    function a(r) {
      if (n[r]) return n[r].exports;var o = n[r] = { exports: {}, id: r, loaded: !1 };return t[r].call(o.exports, o, o.exports, a), o.loaded = !0, o.exports;
    }var n = {};return a.m = t, a.c = n, a.p = "", a(0);
  }([function (t, a, n) {
    a.glMatrix = n(1), a.mat2 = n(2), a.mat2d = n(3), a.mat3 = n(4), a.mat4 = n(5), a.quat = n(6), a.vec2 = n(9), a.vec3 = n(7), a.vec4 = n(8);
  }, function (t, a) {
    var n = {};n.EPSILON = 1e-6, n.ARRAY_TYPE = "undefined" != typeof Float32Array ? Float32Array : Array, n.RANDOM = Math.random, n.ENABLE_SIMD = !1, n.SIMD_AVAILABLE = n.ARRAY_TYPE === this.Float32Array && "SIMD" in this, n.USE_SIMD = n.ENABLE_SIMD && n.SIMD_AVAILABLE, n.setMatrixArrayType = function (t) {
      n.ARRAY_TYPE = t;
    };var r = Math.PI / 180;n.toRadian = function (t) {
      return t * r;
    }, n.equals = function (t, a) {
      return Math.abs(t - a) <= n.EPSILON * Math.max(1, Math.abs(t), Math.abs(a));
    }, t.exports = n;
  }, function (t, a, n) {
    var r = n(1),
        o = {};o.create = function () {
      var t = new r.ARRAY_TYPE(4);return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t;
    }, o.clone = function (t) {
      var a = new r.ARRAY_TYPE(4);return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a;
    }, o.copy = function (t, a) {
      return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t;
    }, o.identity = function (t) {
      return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t;
    }, o.fromValues = function (t, a, n, o) {
      var u = new r.ARRAY_TYPE(4);return u[0] = t, u[1] = a, u[2] = n, u[3] = o, u;
    }, o.set = function (t, a, n, r, o) {
      return t[0] = a, t[1] = n, t[2] = r, t[3] = o, t;
    }, o.transpose = function (t, a) {
      if (t === a) {
        var n = a[1];t[1] = a[2], t[2] = n;
      } else t[0] = a[0], t[1] = a[2], t[2] = a[1], t[3] = a[3];return t;
    }, o.invert = function (t, a) {
      var n = a[0],
          r = a[1],
          o = a[2],
          u = a[3],
          l = n * u - o * r;return l ? (l = 1 / l, t[0] = u * l, t[1] = -r * l, t[2] = -o * l, t[3] = n * l, t) : null;
    }, o.adjoint = function (t, a) {
      var n = a[0];return t[0] = a[3], t[1] = -a[1], t[2] = -a[2], t[3] = n, t;
    }, o.determinant = function (t) {
      return t[0] * t[3] - t[2] * t[1];
    }, o.multiply = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = n[0],
          M = n[1],
          s = n[2],
          i = n[3];return t[0] = r * e + u * M, t[1] = o * e + l * M, t[2] = r * s + u * i, t[3] = o * s + l * i, t;
    }, o.mul = o.multiply, o.rotate = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = Math.sin(n),
          M = Math.cos(n);return t[0] = r * M + u * e, t[1] = o * M + l * e, t[2] = r * -e + u * M, t[3] = o * -e + l * M, t;
    }, o.scale = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = n[0],
          M = n[1];return t[0] = r * e, t[1] = o * e, t[2] = u * M, t[3] = l * M, t;
    }, o.fromRotation = function (t, a) {
      var n = Math.sin(a),
          r = Math.cos(a);return t[0] = r, t[1] = n, t[2] = -n, t[3] = r, t;
    }, o.fromScaling = function (t, a) {
      return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = a[1], t;
    }, o.str = function (t) {
      return "mat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
    }, o.frob = function (t) {
      return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2));
    }, o.LDU = function (t, a, n, r) {
      return t[2] = r[2] / r[0], n[0] = r[0], n[1] = r[1], n[3] = r[3] - t[2] * n[1], [t, a, n];
    }, o.add = function (t, a, n) {
      return t[0] = a[0] + n[0], t[1] = a[1] + n[1], t[2] = a[2] + n[2], t[3] = a[3] + n[3], t;
    }, o.subtract = function (t, a, n) {
      return t[0] = a[0] - n[0], t[1] = a[1] - n[1], t[2] = a[2] - n[2], t[3] = a[3] - n[3], t;
    }, o.sub = o.subtract, o.exactEquals = function (t, a) {
      return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3];
    }, o.equals = function (t, a) {
      var n = t[0],
          o = t[1],
          u = t[2],
          l = t[3],
          e = a[0],
          M = a[1],
          s = a[2],
          i = a[3];return Math.abs(n - e) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(e)) && Math.abs(o - M) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(M)) && Math.abs(u - s) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(s)) && Math.abs(l - i) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(i));
    }, o.multiplyScalar = function (t, a, n) {
      return t[0] = a[0] * n, t[1] = a[1] * n, t[2] = a[2] * n, t[3] = a[3] * n, t;
    }, o.multiplyScalarAndAdd = function (t, a, n, r) {
      return t[0] = a[0] + n[0] * r, t[1] = a[1] + n[1] * r, t[2] = a[2] + n[2] * r, t[3] = a[3] + n[3] * r, t;
    }, t.exports = o;
  }, function (t, a, n) {
    var r = n(1),
        o = {};o.create = function () {
      var t = new r.ARRAY_TYPE(6);return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
    }, o.clone = function (t) {
      var a = new r.ARRAY_TYPE(6);return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a;
    }, o.copy = function (t, a) {
      return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t;
    }, o.identity = function (t) {
      return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t;
    }, o.fromValues = function (t, a, n, o, u, l) {
      var e = new r.ARRAY_TYPE(6);return e[0] = t, e[1] = a, e[2] = n, e[3] = o, e[4] = u, e[5] = l, e;
    }, o.set = function (t, a, n, r, o, u, l) {
      return t[0] = a, t[1] = n, t[2] = r, t[3] = o, t[4] = u, t[5] = l, t;
    }, o.invert = function (t, a) {
      var n = a[0],
          r = a[1],
          o = a[2],
          u = a[3],
          l = a[4],
          e = a[5],
          M = n * u - r * o;return M ? (M = 1 / M, t[0] = u * M, t[1] = -r * M, t[2] = -o * M, t[3] = n * M, t[4] = (o * e - u * l) * M, t[5] = (r * l - n * e) * M, t) : null;
    }, o.determinant = function (t) {
      return t[0] * t[3] - t[1] * t[2];
    }, o.multiply = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = a[4],
          M = a[5],
          s = n[0],
          i = n[1],
          c = n[2],
          h = n[3],
          S = n[4],
          I = n[5];return t[0] = r * s + u * i, t[1] = o * s + l * i, t[2] = r * c + u * h, t[3] = o * c + l * h, t[4] = r * S + u * I + e, t[5] = o * S + l * I + M, t;
    }, o.mul = o.multiply, o.rotate = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = a[4],
          M = a[5],
          s = Math.sin(n),
          i = Math.cos(n);return t[0] = r * i + u * s, t[1] = o * i + l * s, t[2] = r * -s + u * i, t[3] = o * -s + l * i, t[4] = e, t[5] = M, t;
    }, o.scale = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = a[4],
          M = a[5],
          s = n[0],
          i = n[1];return t[0] = r * s, t[1] = o * s, t[2] = u * i, t[3] = l * i, t[4] = e, t[5] = M, t;
    }, o.translate = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = a[4],
          M = a[5],
          s = n[0],
          i = n[1];return t[0] = r, t[1] = o, t[2] = u, t[3] = l, t[4] = r * s + u * i + e, t[5] = o * s + l * i + M, t;
    }, o.fromRotation = function (t, a) {
      var n = Math.sin(a),
          r = Math.cos(a);return t[0] = r, t[1] = n, t[2] = -n, t[3] = r, t[4] = 0, t[5] = 0, t;
    }, o.fromScaling = function (t, a) {
      return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = a[1], t[4] = 0, t[5] = 0, t;
    }, o.fromTranslation = function (t, a) {
      return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = a[0], t[5] = a[1], t;
    }, o.str = function (t) {
      return "mat2d(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ")";
    }, o.frob = function (t) {
      return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + 1);
    }, o.add = function (t, a, n) {
      return t[0] = a[0] + n[0], t[1] = a[1] + n[1], t[2] = a[2] + n[2], t[3] = a[3] + n[3], t[4] = a[4] + n[4], t[5] = a[5] + n[5], t;
    }, o.subtract = function (t, a, n) {
      return t[0] = a[0] - n[0], t[1] = a[1] - n[1], t[2] = a[2] - n[2], t[3] = a[3] - n[3], t[4] = a[4] - n[4], t[5] = a[5] - n[5], t;
    }, o.sub = o.subtract, o.multiplyScalar = function (t, a, n) {
      return t[0] = a[0] * n, t[1] = a[1] * n, t[2] = a[2] * n, t[3] = a[3] * n, t[4] = a[4] * n, t[5] = a[5] * n, t;
    }, o.multiplyScalarAndAdd = function (t, a, n, r) {
      return t[0] = a[0] + n[0] * r, t[1] = a[1] + n[1] * r, t[2] = a[2] + n[2] * r, t[3] = a[3] + n[3] * r, t[4] = a[4] + n[4] * r, t[5] = a[5] + n[5] * r, t;
    }, o.exactEquals = function (t, a) {
      return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5];
    }, o.equals = function (t, a) {
      var n = t[0],
          o = t[1],
          u = t[2],
          l = t[3],
          e = t[4],
          M = t[5],
          s = a[0],
          i = a[1],
          c = a[2],
          h = a[3],
          S = a[4],
          I = a[5];return Math.abs(n - s) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(s)) && Math.abs(o - i) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(i)) && Math.abs(u - c) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(c)) && Math.abs(l - h) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(h)) && Math.abs(e - S) <= r.EPSILON * Math.max(1, Math.abs(e), Math.abs(S)) && Math.abs(M - I) <= r.EPSILON * Math.max(1, Math.abs(M), Math.abs(I));
    }, t.exports = o;
  }, function (t, a, n) {
    var r = n(1),
        o = {};o.create = function () {
      var t = new r.ARRAY_TYPE(9);return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
    }, o.fromMat4 = function (t, a) {
      return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[4], t[4] = a[5], t[5] = a[6], t[6] = a[8], t[7] = a[9], t[8] = a[10], t;
    }, o.clone = function (t) {
      var a = new r.ARRAY_TYPE(9);return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a[8] = t[8], a;
    }, o.copy = function (t, a) {
      return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t;
    }, o.fromValues = function (t, a, n, o, u, l, e, M, s) {
      var i = new r.ARRAY_TYPE(9);return i[0] = t, i[1] = a, i[2] = n, i[3] = o, i[4] = u, i[5] = l, i[6] = e, i[7] = M, i[8] = s, i;
    }, o.set = function (t, a, n, r, o, u, l, e, M, s) {
      return t[0] = a, t[1] = n, t[2] = r, t[3] = o, t[4] = u, t[5] = l, t[6] = e, t[7] = M, t[8] = s, t;
    }, o.identity = function (t) {
      return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
    }, o.transpose = function (t, a) {
      if (t === a) {
        var n = a[1],
            r = a[2],
            o = a[5];t[1] = a[3], t[2] = a[6], t[3] = n, t[5] = a[7], t[6] = r, t[7] = o;
      } else t[0] = a[0], t[1] = a[3], t[2] = a[6], t[3] = a[1], t[4] = a[4], t[5] = a[7], t[6] = a[2], t[7] = a[5], t[8] = a[8];return t;
    }, o.invert = function (t, a) {
      var n = a[0],
          r = a[1],
          o = a[2],
          u = a[3],
          l = a[4],
          e = a[5],
          M = a[6],
          s = a[7],
          i = a[8],
          c = i * l - e * s,
          h = -i * u + e * M,
          S = s * u - l * M,
          I = n * c + r * h + o * S;return I ? (I = 1 / I, t[0] = c * I, t[1] = (-i * r + o * s) * I, t[2] = (e * r - o * l) * I, t[3] = h * I, t[4] = (i * n - o * M) * I, t[5] = (-e * n + o * u) * I, t[6] = S * I, t[7] = (-s * n + r * M) * I, t[8] = (l * n - r * u) * I, t) : null;
    }, o.adjoint = function (t, a) {
      var n = a[0],
          r = a[1],
          o = a[2],
          u = a[3],
          l = a[4],
          e = a[5],
          M = a[6],
          s = a[7],
          i = a[8];return t[0] = l * i - e * s, t[1] = o * s - r * i, t[2] = r * e - o * l, t[3] = e * M - u * i, t[4] = n * i - o * M, t[5] = o * u - n * e, t[6] = u * s - l * M, t[7] = r * M - n * s, t[8] = n * l - r * u, t;
    }, o.determinant = function (t) {
      var a = t[0],
          n = t[1],
          r = t[2],
          o = t[3],
          u = t[4],
          l = t[5],
          e = t[6],
          M = t[7],
          s = t[8];return a * (s * u - l * M) + n * (-s * o + l * e) + r * (M * o - u * e);
    }, o.multiply = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = a[4],
          M = a[5],
          s = a[6],
          i = a[7],
          c = a[8],
          h = n[0],
          S = n[1],
          I = n[2],
          f = n[3],
          x = n[4],
          D = n[5],
          F = n[6],
          m = n[7],
          d = n[8];return t[0] = h * r + S * l + I * s, t[1] = h * o + S * e + I * i, t[2] = h * u + S * M + I * c, t[3] = f * r + x * l + D * s, t[4] = f * o + x * e + D * i, t[5] = f * u + x * M + D * c, t[6] = F * r + m * l + d * s, t[7] = F * o + m * e + d * i, t[8] = F * u + m * M + d * c, t;
    }, o.mul = o.multiply, o.translate = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = a[4],
          M = a[5],
          s = a[6],
          i = a[7],
          c = a[8],
          h = n[0],
          S = n[1];return t[0] = r, t[1] = o, t[2] = u, t[3] = l, t[4] = e, t[5] = M, t[6] = h * r + S * l + s, t[7] = h * o + S * e + i, t[8] = h * u + S * M + c, t;
    }, o.rotate = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = a[4],
          M = a[5],
          s = a[6],
          i = a[7],
          c = a[8],
          h = Math.sin(n),
          S = Math.cos(n);return t[0] = S * r + h * l, t[1] = S * o + h * e, t[2] = S * u + h * M, t[3] = S * l - h * r, t[4] = S * e - h * o, t[5] = S * M - h * u, t[6] = s, t[7] = i, t[8] = c, t;
    }, o.scale = function (t, a, n) {
      var r = n[0],
          o = n[1];return t[0] = r * a[0], t[1] = r * a[1], t[2] = r * a[2], t[3] = o * a[3], t[4] = o * a[4], t[5] = o * a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t;
    }, o.fromTranslation = function (t, a) {
      return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = a[0], t[7] = a[1], t[8] = 1, t;
    }, o.fromRotation = function (t, a) {
      var n = Math.sin(a),
          r = Math.cos(a);return t[0] = r, t[1] = n, t[2] = 0, t[3] = -n, t[4] = r, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
    }, o.fromScaling = function (t, a) {
      return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = a[1], t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t;
    }, o.fromMat2d = function (t, a) {
      return t[0] = a[0], t[1] = a[1], t[2] = 0, t[3] = a[2], t[4] = a[3], t[5] = 0, t[6] = a[4], t[7] = a[5], t[8] = 1, t;
    }, o.fromQuat = function (t, a) {
      var n = a[0],
          r = a[1],
          o = a[2],
          u = a[3],
          l = n + n,
          e = r + r,
          M = o + o,
          s = n * l,
          i = r * l,
          c = r * e,
          h = o * l,
          S = o * e,
          I = o * M,
          f = u * l,
          x = u * e,
          D = u * M;return t[0] = 1 - c - I, t[3] = i - D, t[6] = h + x, t[1] = i + D, t[4] = 1 - s - I, t[7] = S - f, t[2] = h - x, t[5] = S + f, t[8] = 1 - s - c, t;
    }, o.normalFromMat4 = function (t, a) {
      var n = a[0],
          r = a[1],
          o = a[2],
          u = a[3],
          l = a[4],
          e = a[5],
          M = a[6],
          s = a[7],
          i = a[8],
          c = a[9],
          h = a[10],
          S = a[11],
          I = a[12],
          f = a[13],
          x = a[14],
          D = a[15],
          F = n * e - r * l,
          m = n * M - o * l,
          d = n * s - u * l,
          b = r * M - o * e,
          v = r * s - u * e,
          z = o * s - u * M,
          p = i * f - c * I,
          w = i * x - h * I,
          E = i * D - S * I,
          A = c * x - h * f,
          P = c * D - S * f,
          L = h * D - S * x,
          q = F * L - m * P + d * A + b * E - v * w + z * p;return q ? (q = 1 / q, t[0] = (e * L - M * P + s * A) * q, t[1] = (M * E - l * L - s * w) * q, t[2] = (l * P - e * E + s * p) * q, t[3] = (o * P - r * L - u * A) * q, t[4] = (n * L - o * E + u * w) * q, t[5] = (r * E - n * P - u * p) * q, t[6] = (f * z - x * v + D * b) * q, t[7] = (x * d - I * z - D * m) * q, t[8] = (I * v - f * d + D * F) * q, t) : null;
    }, o.str = function (t) {
      return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")";
    }, o.frob = function (t) {
      return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2));
    }, o.add = function (t, a, n) {
      return t[0] = a[0] + n[0], t[1] = a[1] + n[1], t[2] = a[2] + n[2], t[3] = a[3] + n[3], t[4] = a[4] + n[4], t[5] = a[5] + n[5], t[6] = a[6] + n[6], t[7] = a[7] + n[7], t[8] = a[8] + n[8], t;
    }, o.subtract = function (t, a, n) {
      return t[0] = a[0] - n[0], t[1] = a[1] - n[1], t[2] = a[2] - n[2], t[3] = a[3] - n[3], t[4] = a[4] - n[4], t[5] = a[5] - n[5], t[6] = a[6] - n[6], t[7] = a[7] - n[7], t[8] = a[8] - n[8], t;
    }, o.sub = o.subtract, o.multiplyScalar = function (t, a, n) {
      return t[0] = a[0] * n, t[1] = a[1] * n, t[2] = a[2] * n, t[3] = a[3] * n, t[4] = a[4] * n, t[5] = a[5] * n, t[6] = a[6] * n, t[7] = a[7] * n, t[8] = a[8] * n, t;
    }, o.multiplyScalarAndAdd = function (t, a, n, r) {
      return t[0] = a[0] + n[0] * r, t[1] = a[1] + n[1] * r, t[2] = a[2] + n[2] * r, t[3] = a[3] + n[3] * r, t[4] = a[4] + n[4] * r, t[5] = a[5] + n[5] * r, t[6] = a[6] + n[6] * r, t[7] = a[7] + n[7] * r, t[8] = a[8] + n[8] * r, t;
    }, o.exactEquals = function (t, a) {
      return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7] && t[8] === a[8];
    }, o.equals = function (t, a) {
      var n = t[0],
          o = t[1],
          u = t[2],
          l = t[3],
          e = t[4],
          M = t[5],
          s = t[6],
          i = t[7],
          c = t[8],
          h = a[0],
          S = a[1],
          I = a[2],
          f = a[3],
          x = a[4],
          D = a[5],
          F = t[6],
          m = a[7],
          d = a[8];return Math.abs(n - h) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(h)) && Math.abs(o - S) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(S)) && Math.abs(u - I) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(I)) && Math.abs(l - f) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(f)) && Math.abs(e - x) <= r.EPSILON * Math.max(1, Math.abs(e), Math.abs(x)) && Math.abs(M - D) <= r.EPSILON * Math.max(1, Math.abs(M), Math.abs(D)) && Math.abs(s - F) <= r.EPSILON * Math.max(1, Math.abs(s), Math.abs(F)) && Math.abs(i - m) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(m)) && Math.abs(c - d) <= r.EPSILON * Math.max(1, Math.abs(c), Math.abs(d));
    }, t.exports = o;
  }, function (t, a, n) {
    var r = n(1),
        o = { scalar: {}, SIMD: {} };o.create = function () {
      var t = new r.ARRAY_TYPE(16);return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
    }, o.clone = function (t) {
      var a = new r.ARRAY_TYPE(16);return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a[4] = t[4], a[5] = t[5], a[6] = t[6], a[7] = t[7], a[8] = t[8], a[9] = t[9], a[10] = t[10], a[11] = t[11], a[12] = t[12], a[13] = t[13], a[14] = t[14], a[15] = t[15], a;
    }, o.copy = function (t, a) {
      return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15], t;
    }, o.fromValues = function (t, a, n, o, u, l, e, M, s, i, c, h, S, I, f, x) {
      var D = new r.ARRAY_TYPE(16);return D[0] = t, D[1] = a, D[2] = n, D[3] = o, D[4] = u, D[5] = l, D[6] = e, D[7] = M, D[8] = s, D[9] = i, D[10] = c, D[11] = h, D[12] = S, D[13] = I, D[14] = f, D[15] = x, D;
    }, o.set = function (t, a, n, r, o, u, l, e, M, s, i, c, h, S, I, f, x) {
      return t[0] = a, t[1] = n, t[2] = r, t[3] = o, t[4] = u, t[5] = l, t[6] = e, t[7] = M, t[8] = s, t[9] = i, t[10] = c, t[11] = h, t[12] = S, t[13] = I, t[14] = f, t[15] = x, t;
    }, o.identity = function (t) {
      return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
    }, o.scalar.transpose = function (t, a) {
      if (t === a) {
        var n = a[1],
            r = a[2],
            o = a[3],
            u = a[6],
            l = a[7],
            e = a[11];t[1] = a[4], t[2] = a[8], t[3] = a[12], t[4] = n, t[6] = a[9], t[7] = a[13], t[8] = r, t[9] = u, t[11] = a[14], t[12] = o, t[13] = l, t[14] = e;
      } else t[0] = a[0], t[1] = a[4], t[2] = a[8], t[3] = a[12], t[4] = a[1], t[5] = a[5], t[6] = a[9], t[7] = a[13], t[8] = a[2], t[9] = a[6], t[10] = a[10], t[11] = a[14], t[12] = a[3], t[13] = a[7], t[14] = a[11], t[15] = a[15];return t;
    }, o.SIMD.transpose = function (t, a) {
      var n, r, o, u, l, e, M, s, i, c;return n = SIMD.Float32x4.load(a, 0), r = SIMD.Float32x4.load(a, 4), o = SIMD.Float32x4.load(a, 8), u = SIMD.Float32x4.load(a, 12), l = SIMD.Float32x4.shuffle(n, r, 0, 1, 4, 5), e = SIMD.Float32x4.shuffle(o, u, 0, 1, 4, 5), M = SIMD.Float32x4.shuffle(l, e, 0, 2, 4, 6), s = SIMD.Float32x4.shuffle(l, e, 1, 3, 5, 7), SIMD.Float32x4.store(t, 0, M), SIMD.Float32x4.store(t, 4, s), l = SIMD.Float32x4.shuffle(n, r, 2, 3, 6, 7), e = SIMD.Float32x4.shuffle(o, u, 2, 3, 6, 7), i = SIMD.Float32x4.shuffle(l, e, 0, 2, 4, 6), c = SIMD.Float32x4.shuffle(l, e, 1, 3, 5, 7), SIMD.Float32x4.store(t, 8, i), SIMD.Float32x4.store(t, 12, c), t;
    }, o.transpose = r.USE_SIMD ? o.SIMD.transpose : o.scalar.transpose, o.scalar.invert = function (t, a) {
      var n = a[0],
          r = a[1],
          o = a[2],
          u = a[3],
          l = a[4],
          e = a[5],
          M = a[6],
          s = a[7],
          i = a[8],
          c = a[9],
          h = a[10],
          S = a[11],
          I = a[12],
          f = a[13],
          x = a[14],
          D = a[15],
          F = n * e - r * l,
          m = n * M - o * l,
          d = n * s - u * l,
          b = r * M - o * e,
          v = r * s - u * e,
          z = o * s - u * M,
          p = i * f - c * I,
          w = i * x - h * I,
          E = i * D - S * I,
          A = c * x - h * f,
          P = c * D - S * f,
          L = h * D - S * x,
          q = F * L - m * P + d * A + b * E - v * w + z * p;return q ? (q = 1 / q, t[0] = (e * L - M * P + s * A) * q, t[1] = (o * P - r * L - u * A) * q, t[2] = (f * z - x * v + D * b) * q, t[3] = (h * v - c * z - S * b) * q, t[4] = (M * E - l * L - s * w) * q, t[5] = (n * L - o * E + u * w) * q, t[6] = (x * d - I * z - D * m) * q, t[7] = (i * z - h * d + S * m) * q, t[8] = (l * P - e * E + s * p) * q, t[9] = (r * E - n * P - u * p) * q, t[10] = (I * v - f * d + D * F) * q, t[11] = (c * d - i * v - S * F) * q, t[12] = (e * w - l * A - M * p) * q, t[13] = (n * A - r * w + o * p) * q, t[14] = (f * m - I * b - x * F) * q, t[15] = (i * b - c * m + h * F) * q, t) : null;
    }, o.SIMD.invert = function (t, a) {
      var n,
          r,
          o,
          u,
          l,
          e,
          M,
          s,
          i,
          c,
          h = SIMD.Float32x4.load(a, 0),
          S = SIMD.Float32x4.load(a, 4),
          I = SIMD.Float32x4.load(a, 8),
          f = SIMD.Float32x4.load(a, 12);return l = SIMD.Float32x4.shuffle(h, S, 0, 1, 4, 5), r = SIMD.Float32x4.shuffle(I, f, 0, 1, 4, 5), n = SIMD.Float32x4.shuffle(l, r, 0, 2, 4, 6), r = SIMD.Float32x4.shuffle(r, l, 1, 3, 5, 7), l = SIMD.Float32x4.shuffle(h, S, 2, 3, 6, 7), u = SIMD.Float32x4.shuffle(I, f, 2, 3, 6, 7), o = SIMD.Float32x4.shuffle(l, u, 0, 2, 4, 6), u = SIMD.Float32x4.shuffle(u, l, 1, 3, 5, 7), l = SIMD.Float32x4.mul(o, u), l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2), e = SIMD.Float32x4.mul(r, l), M = SIMD.Float32x4.mul(n, l), l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1), e = SIMD.Float32x4.sub(SIMD.Float32x4.mul(r, l), e), M = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, l), M), M = SIMD.Float32x4.swizzle(M, 2, 3, 0, 1), l = SIMD.Float32x4.mul(r, o), l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2), e = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, l), e), i = SIMD.Float32x4.mul(n, l), l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1), e = SIMD.Float32x4.sub(e, SIMD.Float32x4.mul(u, l)), i = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, l), i), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), l = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(r, 2, 3, 0, 1), u), l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2), o = SIMD.Float32x4.swizzle(o, 2, 3, 0, 1), e = SIMD.Float32x4.add(SIMD.Float32x4.mul(o, l), e), s = SIMD.Float32x4.mul(n, l), l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1), e = SIMD.Float32x4.sub(e, SIMD.Float32x4.mul(o, l)), s = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, l), s), s = SIMD.Float32x4.swizzle(s, 2, 3, 0, 1), l = SIMD.Float32x4.mul(n, r), l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2), s = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, l), s), i = SIMD.Float32x4.sub(SIMD.Float32x4.mul(o, l), i), l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1), s = SIMD.Float32x4.sub(SIMD.Float32x4.mul(u, l), s), i = SIMD.Float32x4.sub(i, SIMD.Float32x4.mul(o, l)), l = SIMD.Float32x4.mul(n, u), l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2), M = SIMD.Float32x4.sub(M, SIMD.Float32x4.mul(o, l)), s = SIMD.Float32x4.add(SIMD.Float32x4.mul(r, l), s), l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1), M = SIMD.Float32x4.add(SIMD.Float32x4.mul(o, l), M), s = SIMD.Float32x4.sub(s, SIMD.Float32x4.mul(r, l)), l = SIMD.Float32x4.mul(n, o), l = SIMD.Float32x4.swizzle(l, 1, 0, 3, 2), M = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, l), M), i = SIMD.Float32x4.sub(i, SIMD.Float32x4.mul(r, l)), l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1), M = SIMD.Float32x4.sub(M, SIMD.Float32x4.mul(u, l)), i = SIMD.Float32x4.add(SIMD.Float32x4.mul(r, l), i), c = SIMD.Float32x4.mul(n, e), c = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(c, 2, 3, 0, 1), c), c = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(c, 1, 0, 3, 2), c), l = SIMD.Float32x4.reciprocalApproximation(c), c = SIMD.Float32x4.sub(SIMD.Float32x4.add(l, l), SIMD.Float32x4.mul(c, SIMD.Float32x4.mul(l, l))), (c = SIMD.Float32x4.swizzle(c, 0, 0, 0, 0)) ? (SIMD.Float32x4.store(t, 0, SIMD.Float32x4.mul(c, e)), SIMD.Float32x4.store(t, 4, SIMD.Float32x4.mul(c, M)), SIMD.Float32x4.store(t, 8, SIMD.Float32x4.mul(c, s)), SIMD.Float32x4.store(t, 12, SIMD.Float32x4.mul(c, i)), t) : null;
    }, o.invert = r.USE_SIMD ? o.SIMD.invert : o.scalar.invert, o.scalar.adjoint = function (t, a) {
      var n = a[0],
          r = a[1],
          o = a[2],
          u = a[3],
          l = a[4],
          e = a[5],
          M = a[6],
          s = a[7],
          i = a[8],
          c = a[9],
          h = a[10],
          S = a[11],
          I = a[12],
          f = a[13],
          x = a[14],
          D = a[15];return t[0] = e * (h * D - S * x) - c * (M * D - s * x) + f * (M * S - s * h), t[1] = -(r * (h * D - S * x) - c * (o * D - u * x) + f * (o * S - u * h)), t[2] = r * (M * D - s * x) - e * (o * D - u * x) + f * (o * s - u * M), t[3] = -(r * (M * S - s * h) - e * (o * S - u * h) + c * (o * s - u * M)), t[4] = -(l * (h * D - S * x) - i * (M * D - s * x) + I * (M * S - s * h)), t[5] = n * (h * D - S * x) - i * (o * D - u * x) + I * (o * S - u * h), t[6] = -(n * (M * D - s * x) - l * (o * D - u * x) + I * (o * s - u * M)), t[7] = n * (M * S - s * h) - l * (o * S - u * h) + i * (o * s - u * M), t[8] = l * (c * D - S * f) - i * (e * D - s * f) + I * (e * S - s * c), t[9] = -(n * (c * D - S * f) - i * (r * D - u * f) + I * (r * S - u * c)), t[10] = n * (e * D - s * f) - l * (r * D - u * f) + I * (r * s - u * e), t[11] = -(n * (e * S - s * c) - l * (r * S - u * c) + i * (r * s - u * e)), t[12] = -(l * (c * x - h * f) - i * (e * x - M * f) + I * (e * h - M * c)), t[13] = n * (c * x - h * f) - i * (r * x - o * f) + I * (r * h - o * c), t[14] = -(n * (e * x - M * f) - l * (r * x - o * f) + I * (r * M - o * e)), t[15] = n * (e * h - M * c) - l * (r * h - o * c) + i * (r * M - o * e), t;
    }, o.SIMD.adjoint = function (t, a) {
      var n, r, o, u, l, e, M, s, i, c, h, S, I;return n = SIMD.Float32x4.load(a, 0), r = SIMD.Float32x4.load(a, 4), o = SIMD.Float32x4.load(a, 8), u = SIMD.Float32x4.load(a, 12), i = SIMD.Float32x4.shuffle(n, r, 0, 1, 4, 5), e = SIMD.Float32x4.shuffle(o, u, 0, 1, 4, 5), l = SIMD.Float32x4.shuffle(i, e, 0, 2, 4, 6), e = SIMD.Float32x4.shuffle(e, i, 1, 3, 5, 7), i = SIMD.Float32x4.shuffle(n, r, 2, 3, 6, 7), s = SIMD.Float32x4.shuffle(o, u, 2, 3, 6, 7), M = SIMD.Float32x4.shuffle(i, s, 0, 2, 4, 6), s = SIMD.Float32x4.shuffle(s, i, 1, 3, 5, 7), i = SIMD.Float32x4.mul(M, s), i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2), c = SIMD.Float32x4.mul(e, i), h = SIMD.Float32x4.mul(l, i), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), c = SIMD.Float32x4.sub(SIMD.Float32x4.mul(e, i), c), h = SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, i), h), h = SIMD.Float32x4.swizzle(h, 2, 3, 0, 1), i = SIMD.Float32x4.mul(e, M), i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2), c = SIMD.Float32x4.add(SIMD.Float32x4.mul(s, i), c), I = SIMD.Float32x4.mul(l, i), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), c = SIMD.Float32x4.sub(c, SIMD.Float32x4.mul(s, i)), I = SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, i), I), I = SIMD.Float32x4.swizzle(I, 2, 3, 0, 1), i = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e, 2, 3, 0, 1), s), i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2), M = SIMD.Float32x4.swizzle(M, 2, 3, 0, 1), c = SIMD.Float32x4.add(SIMD.Float32x4.mul(M, i), c), S = SIMD.Float32x4.mul(l, i), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), c = SIMD.Float32x4.sub(c, SIMD.Float32x4.mul(M, i)), S = SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, i), S), S = SIMD.Float32x4.swizzle(S, 2, 3, 0, 1), i = SIMD.Float32x4.mul(l, e), i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2), S = SIMD.Float32x4.add(SIMD.Float32x4.mul(s, i), S), I = SIMD.Float32x4.sub(SIMD.Float32x4.mul(M, i), I), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), S = SIMD.Float32x4.sub(SIMD.Float32x4.mul(s, i), S), I = SIMD.Float32x4.sub(I, SIMD.Float32x4.mul(M, i)), i = SIMD.Float32x4.mul(l, s), i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2), h = SIMD.Float32x4.sub(h, SIMD.Float32x4.mul(M, i)), S = SIMD.Float32x4.add(SIMD.Float32x4.mul(e, i), S), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), h = SIMD.Float32x4.add(SIMD.Float32x4.mul(M, i), h), S = SIMD.Float32x4.sub(S, SIMD.Float32x4.mul(e, i)), i = SIMD.Float32x4.mul(l, M), i = SIMD.Float32x4.swizzle(i, 1, 0, 3, 2), h = SIMD.Float32x4.add(SIMD.Float32x4.mul(s, i), h), I = SIMD.Float32x4.sub(I, SIMD.Float32x4.mul(e, i)), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), h = SIMD.Float32x4.sub(h, SIMD.Float32x4.mul(s, i)), I = SIMD.Float32x4.add(SIMD.Float32x4.mul(e, i), I), SIMD.Float32x4.store(t, 0, c), SIMD.Float32x4.store(t, 4, h), SIMD.Float32x4.store(t, 8, S), SIMD.Float32x4.store(t, 12, I), t;
    }, o.adjoint = r.USE_SIMD ? o.SIMD.adjoint : o.scalar.adjoint, o.determinant = function (t) {
      var a = t[0],
          n = t[1],
          r = t[2],
          o = t[3],
          u = t[4],
          l = t[5],
          e = t[6],
          M = t[7],
          s = t[8],
          i = t[9],
          c = t[10],
          h = t[11],
          S = t[12],
          I = t[13],
          f = t[14],
          x = t[15],
          D = a * l - n * u,
          F = a * e - r * u,
          m = a * M - o * u,
          d = n * e - r * l,
          b = n * M - o * l,
          v = r * M - o * e,
          z = s * I - i * S,
          p = s * f - c * S,
          w = s * x - h * S,
          E = i * f - c * I,
          A = i * x - h * I,
          P = c * x - h * f;return D * P - F * A + m * E + d * w - b * p + v * z;
    }, o.SIMD.multiply = function (t, a, n) {
      var r = SIMD.Float32x4.load(a, 0),
          o = SIMD.Float32x4.load(a, 4),
          u = SIMD.Float32x4.load(a, 8),
          l = SIMD.Float32x4.load(a, 12),
          e = SIMD.Float32x4.load(n, 0),
          M = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e, 1, 1, 1, 1), o), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e, 2, 2, 2, 2), u), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e, 3, 3, 3, 3), l))));SIMD.Float32x4.store(t, 0, M);var s = SIMD.Float32x4.load(n, 4),
          i = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 1, 1, 1, 1), o), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 2, 2, 2, 2), u), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s, 3, 3, 3, 3), l))));SIMD.Float32x4.store(t, 4, i);var c = SIMD.Float32x4.load(n, 8),
          h = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 1, 1, 1, 1), o), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 2, 2, 2, 2), u), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 3, 3, 3, 3), l))));SIMD.Float32x4.store(t, 8, h);var S = SIMD.Float32x4.load(n, 12),
          I = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S, 0, 0, 0, 0), r), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S, 1, 1, 1, 1), o), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S, 2, 2, 2, 2), u), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S, 3, 3, 3, 3), l))));return SIMD.Float32x4.store(t, 12, I), t;
    }, o.scalar.multiply = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = a[4],
          M = a[5],
          s = a[6],
          i = a[7],
          c = a[8],
          h = a[9],
          S = a[10],
          I = a[11],
          f = a[12],
          x = a[13],
          D = a[14],
          F = a[15],
          m = n[0],
          d = n[1],
          b = n[2],
          v = n[3];return t[0] = m * r + d * e + b * c + v * f, t[1] = m * o + d * M + b * h + v * x, t[2] = m * u + d * s + b * S + v * D, t[3] = m * l + d * i + b * I + v * F, m = n[4], d = n[5], b = n[6], v = n[7], t[4] = m * r + d * e + b * c + v * f, t[5] = m * o + d * M + b * h + v * x, t[6] = m * u + d * s + b * S + v * D, t[7] = m * l + d * i + b * I + v * F, m = n[8], d = n[9], b = n[10], v = n[11], t[8] = m * r + d * e + b * c + v * f, t[9] = m * o + d * M + b * h + v * x, t[10] = m * u + d * s + b * S + v * D, t[11] = m * l + d * i + b * I + v * F, m = n[12], d = n[13], b = n[14], v = n[15], t[12] = m * r + d * e + b * c + v * f, t[13] = m * o + d * M + b * h + v * x, t[14] = m * u + d * s + b * S + v * D, t[15] = m * l + d * i + b * I + v * F, t;
    }, o.multiply = r.USE_SIMD ? o.SIMD.multiply : o.scalar.multiply, o.mul = o.multiply, o.scalar.translate = function (t, a, n) {
      var r,
          o,
          u,
          l,
          e,
          M,
          s,
          i,
          c,
          h,
          S,
          I,
          f = n[0],
          x = n[1],
          D = n[2];return a === t ? (t[12] = a[0] * f + a[4] * x + a[8] * D + a[12], t[13] = a[1] * f + a[5] * x + a[9] * D + a[13], t[14] = a[2] * f + a[6] * x + a[10] * D + a[14], t[15] = a[3] * f + a[7] * x + a[11] * D + a[15]) : (r = a[0], o = a[1], u = a[2], l = a[3], e = a[4], M = a[5], s = a[6], i = a[7], c = a[8], h = a[9], S = a[10], I = a[11], t[0] = r, t[1] = o, t[2] = u, t[3] = l, t[4] = e, t[5] = M, t[6] = s, t[7] = i, t[8] = c, t[9] = h, t[10] = S, t[11] = I, t[12] = r * f + e * x + c * D + a[12], t[13] = o * f + M * x + h * D + a[13], t[14] = u * f + s * x + S * D + a[14], t[15] = l * f + i * x + I * D + a[15]), t;
    }, o.SIMD.translate = function (t, a, n) {
      var r = SIMD.Float32x4.load(a, 0),
          o = SIMD.Float32x4.load(a, 4),
          u = SIMD.Float32x4.load(a, 8),
          l = SIMD.Float32x4.load(a, 12),
          e = SIMD.Float32x4(n[0], n[1], n[2], 0);a !== t && (t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11]), r = SIMD.Float32x4.mul(r, SIMD.Float32x4.swizzle(e, 0, 0, 0, 0)), o = SIMD.Float32x4.mul(o, SIMD.Float32x4.swizzle(e, 1, 1, 1, 1)), u = SIMD.Float32x4.mul(u, SIMD.Float32x4.swizzle(e, 2, 2, 2, 2));var M = SIMD.Float32x4.add(r, SIMD.Float32x4.add(o, SIMD.Float32x4.add(u, l)));return SIMD.Float32x4.store(t, 12, M), t;
    }, o.translate = r.USE_SIMD ? o.SIMD.translate : o.scalar.translate, o.scalar.scale = function (t, a, n) {
      var r = n[0],
          o = n[1],
          u = n[2];return t[0] = a[0] * r, t[1] = a[1] * r, t[2] = a[2] * r, t[3] = a[3] * r, t[4] = a[4] * o, t[5] = a[5] * o, t[6] = a[6] * o, t[7] = a[7] * o, t[8] = a[8] * u, t[9] = a[9] * u, t[10] = a[10] * u, t[11] = a[11] * u, t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15], t;
    }, o.SIMD.scale = function (t, a, n) {
      var r,
          o,
          u,
          l = SIMD.Float32x4(n[0], n[1], n[2], 0);return r = SIMD.Float32x4.load(a, 0), SIMD.Float32x4.store(t, 0, SIMD.Float32x4.mul(r, SIMD.Float32x4.swizzle(l, 0, 0, 0, 0))), o = SIMD.Float32x4.load(a, 4), SIMD.Float32x4.store(t, 4, SIMD.Float32x4.mul(o, SIMD.Float32x4.swizzle(l, 1, 1, 1, 1))), u = SIMD.Float32x4.load(a, 8), SIMD.Float32x4.store(t, 8, SIMD.Float32x4.mul(u, SIMD.Float32x4.swizzle(l, 2, 2, 2, 2))), t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15], t;
    }, o.scale = r.USE_SIMD ? o.SIMD.scale : o.scalar.scale, o.rotate = function (t, a, n, o) {
      var u,
          l,
          e,
          M,
          s,
          i,
          c,
          h,
          S,
          I,
          f,
          x,
          D,
          F,
          m,
          d,
          b,
          v,
          z,
          p,
          w,
          E,
          A,
          P,
          L = o[0],
          q = o[1],
          R = o[2],
          N = Math.sqrt(L * L + q * q + R * R);return Math.abs(N) < r.EPSILON ? null : (N = 1 / N, L *= N, q *= N, R *= N, u = Math.sin(n), l = Math.cos(n), e = 1 - l, M = a[0], s = a[1], i = a[2], c = a[3], h = a[4], S = a[5], I = a[6], f = a[7], x = a[8], D = a[9], F = a[10], m = a[11], d = L * L * e + l, b = q * L * e + R * u, v = R * L * e - q * u, z = L * q * e - R * u, p = q * q * e + l, w = R * q * e + L * u, E = L * R * e + q * u, A = q * R * e - L * u, P = R * R * e + l, t[0] = M * d + h * b + x * v, t[1] = s * d + S * b + D * v, t[2] = i * d + I * b + F * v, t[3] = c * d + f * b + m * v, t[4] = M * z + h * p + x * w, t[5] = s * z + S * p + D * w, t[6] = i * z + I * p + F * w, t[7] = c * z + f * p + m * w, t[8] = M * E + h * A + x * P, t[9] = s * E + S * A + D * P, t[10] = i * E + I * A + F * P, t[11] = c * E + f * A + m * P, a !== t && (t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t);
    }, o.scalar.rotateX = function (t, a, n) {
      var r = Math.sin(n),
          o = Math.cos(n),
          u = a[4],
          l = a[5],
          e = a[6],
          M = a[7],
          s = a[8],
          i = a[9],
          c = a[10],
          h = a[11];return a !== t && (t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[4] = u * o + s * r, t[5] = l * o + i * r, t[6] = e * o + c * r, t[7] = M * o + h * r, t[8] = s * o - u * r, t[9] = i * o - l * r, t[10] = c * o - e * r, t[11] = h * o - M * r, t;
    }, o.SIMD.rotateX = function (t, a, n) {
      var r = SIMD.Float32x4.splat(Math.sin(n)),
          o = SIMD.Float32x4.splat(Math.cos(n));a !== t && (t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]);var u = SIMD.Float32x4.load(a, 4),
          l = SIMD.Float32x4.load(a, 8);return SIMD.Float32x4.store(t, 4, SIMD.Float32x4.add(SIMD.Float32x4.mul(u, o), SIMD.Float32x4.mul(l, r))), SIMD.Float32x4.store(t, 8, SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, o), SIMD.Float32x4.mul(u, r))), t;
    }, o.rotateX = r.USE_SIMD ? o.SIMD.rotateX : o.scalar.rotateX, o.scalar.rotateY = function (t, a, n) {
      var r = Math.sin(n),
          o = Math.cos(n),
          u = a[0],
          l = a[1],
          e = a[2],
          M = a[3],
          s = a[8],
          i = a[9],
          c = a[10],
          h = a[11];return a !== t && (t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[0] = u * o - s * r, t[1] = l * o - i * r, t[2] = e * o - c * r, t[3] = M * o - h * r, t[8] = u * r + s * o, t[9] = l * r + i * o, t[10] = e * r + c * o, t[11] = M * r + h * o, t;
    }, o.SIMD.rotateY = function (t, a, n) {
      var r = SIMD.Float32x4.splat(Math.sin(n)),
          o = SIMD.Float32x4.splat(Math.cos(n));a !== t && (t[4] = a[4], t[5] = a[5], t[6] = a[6], t[7] = a[7], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]);var u = SIMD.Float32x4.load(a, 0),
          l = SIMD.Float32x4.load(a, 8);return SIMD.Float32x4.store(t, 0, SIMD.Float32x4.sub(SIMD.Float32x4.mul(u, o), SIMD.Float32x4.mul(l, r))), SIMD.Float32x4.store(t, 8, SIMD.Float32x4.add(SIMD.Float32x4.mul(u, r), SIMD.Float32x4.mul(l, o))), t;
    }, o.rotateY = r.USE_SIMD ? o.SIMD.rotateY : o.scalar.rotateY, o.scalar.rotateZ = function (t, a, n) {
      var r = Math.sin(n),
          o = Math.cos(n),
          u = a[0],
          l = a[1],
          e = a[2],
          M = a[3],
          s = a[4],
          i = a[5],
          c = a[6],
          h = a[7];return a !== t && (t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]), t[0] = u * o + s * r, t[1] = l * o + i * r, t[2] = e * o + c * r, t[3] = M * o + h * r, t[4] = s * o - u * r, t[5] = i * o - l * r, t[6] = c * o - e * r, t[7] = h * o - M * r, t;
    }, o.SIMD.rotateZ = function (t, a, n) {
      var r = SIMD.Float32x4.splat(Math.sin(n)),
          o = SIMD.Float32x4.splat(Math.cos(n));a !== t && (t[8] = a[8], t[9] = a[9], t[10] = a[10], t[11] = a[11], t[12] = a[12], t[13] = a[13], t[14] = a[14], t[15] = a[15]);var u = SIMD.Float32x4.load(a, 0),
          l = SIMD.Float32x4.load(a, 4);return SIMD.Float32x4.store(t, 0, SIMD.Float32x4.add(SIMD.Float32x4.mul(u, o), SIMD.Float32x4.mul(l, r))), SIMD.Float32x4.store(t, 4, SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, o), SIMD.Float32x4.mul(u, r))), t;
    }, o.rotateZ = r.USE_SIMD ? o.SIMD.rotateZ : o.scalar.rotateZ, o.fromTranslation = function (t, a) {
      return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = a[0], t[13] = a[1], t[14] = a[2], t[15] = 1, t;
    }, o.fromScaling = function (t, a) {
      return t[0] = a[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = a[1], t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = a[2], t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
    }, o.fromRotation = function (t, a, n) {
      var o,
          u,
          l,
          e = n[0],
          M = n[1],
          s = n[2],
          i = Math.sqrt(e * e + M * M + s * s);return Math.abs(i) < r.EPSILON ? null : (i = 1 / i, e *= i, M *= i, s *= i, o = Math.sin(a), u = Math.cos(a), l = 1 - u, t[0] = e * e * l + u, t[1] = M * e * l + s * o, t[2] = s * e * l - M * o, t[3] = 0, t[4] = e * M * l - s * o, t[5] = M * M * l + u, t[6] = s * M * l + e * o, t[7] = 0, t[8] = e * s * l + M * o, t[9] = M * s * l - e * o, t[10] = s * s * l + u, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t);
    }, o.fromXRotation = function (t, a) {
      var n = Math.sin(a),
          r = Math.cos(a);return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = r, t[6] = n, t[7] = 0, t[8] = 0, t[9] = -n, t[10] = r, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
    }, o.fromYRotation = function (t, a) {
      var n = Math.sin(a),
          r = Math.cos(a);return t[0] = r, t[1] = 0, t[2] = -n, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = n, t[9] = 0, t[10] = r, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
    }, o.fromZRotation = function (t, a) {
      var n = Math.sin(a),
          r = Math.cos(a);return t[0] = r, t[1] = n, t[2] = 0, t[3] = 0, t[4] = -n, t[5] = r, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
    }, o.fromRotationTranslation = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = r + r,
          M = o + o,
          s = u + u,
          i = r * e,
          c = r * M,
          h = r * s,
          S = o * M,
          I = o * s,
          f = u * s,
          x = l * e,
          D = l * M,
          F = l * s;return t[0] = 1 - (S + f), t[1] = c + F, t[2] = h - D, t[3] = 0, t[4] = c - F, t[5] = 1 - (i + f), t[6] = I + x, t[7] = 0, t[8] = h + D, t[9] = I - x, t[10] = 1 - (i + S), t[11] = 0, t[12] = n[0], t[13] = n[1], t[14] = n[2], t[15] = 1, t;
    }, o.getTranslation = function (t, a) {
      return t[0] = a[12], t[1] = a[13], t[2] = a[14], t;
    }, o.getRotation = function (t, a) {
      var n = a[0] + a[5] + a[10],
          r = 0;return n > 0 ? (r = 2 * Math.sqrt(n + 1), t[3] = .25 * r, t[0] = (a[6] - a[9]) / r, t[1] = (a[8] - a[2]) / r, t[2] = (a[1] - a[4]) / r) : a[0] > a[5] & a[0] > a[10] ? (r = 2 * Math.sqrt(1 + a[0] - a[5] - a[10]), t[3] = (a[6] - a[9]) / r, t[0] = .25 * r, t[1] = (a[1] + a[4]) / r, t[2] = (a[8] + a[2]) / r) : a[5] > a[10] ? (r = 2 * Math.sqrt(1 + a[5] - a[0] - a[10]), t[3] = (a[8] - a[2]) / r, t[0] = (a[1] + a[4]) / r, t[1] = .25 * r, t[2] = (a[6] + a[9]) / r) : (r = 2 * Math.sqrt(1 + a[10] - a[0] - a[5]), t[3] = (a[1] - a[4]) / r, t[0] = (a[8] + a[2]) / r, t[1] = (a[6] + a[9]) / r, t[2] = .25 * r), t;
    }, o.fromRotationTranslationScale = function (t, a, n, r) {
      var o = a[0],
          u = a[1],
          l = a[2],
          e = a[3],
          M = o + o,
          s = u + u,
          i = l + l,
          c = o * M,
          h = o * s,
          S = o * i,
          I = u * s,
          f = u * i,
          x = l * i,
          D = e * M,
          F = e * s,
          m = e * i,
          d = r[0],
          b = r[1],
          v = r[2];return t[0] = (1 - (I + x)) * d, t[1] = (h + m) * d, t[2] = (S - F) * d, t[3] = 0, t[4] = (h - m) * b, t[5] = (1 - (c + x)) * b, t[6] = (f + D) * b, t[7] = 0, t[8] = (S + F) * v, t[9] = (f - D) * v, t[10] = (1 - (c + I)) * v, t[11] = 0, t[12] = n[0], t[13] = n[1], t[14] = n[2], t[15] = 1, t;
    }, o.fromRotationTranslationScaleOrigin = function (t, a, n, r, o) {
      var u = a[0],
          l = a[1],
          e = a[2],
          M = a[3],
          s = u + u,
          i = l + l,
          c = e + e,
          h = u * s,
          S = u * i,
          I = u * c,
          f = l * i,
          x = l * c,
          D = e * c,
          F = M * s,
          m = M * i,
          d = M * c,
          b = r[0],
          v = r[1],
          z = r[2],
          p = o[0],
          w = o[1],
          E = o[2];return t[0] = (1 - (f + D)) * b, t[1] = (S + d) * b, t[2] = (I - m) * b, t[3] = 0, t[4] = (S - d) * v, t[5] = (1 - (h + D)) * v, t[6] = (x + F) * v, t[7] = 0, t[8] = (I + m) * z, t[9] = (x - F) * z, t[10] = (1 - (h + f)) * z, t[11] = 0, t[12] = n[0] + p - (t[0] * p + t[4] * w + t[8] * E), t[13] = n[1] + w - (t[1] * p + t[5] * w + t[9] * E), t[14] = n[2] + E - (t[2] * p + t[6] * w + t[10] * E), t[15] = 1, t;
    }, o.fromQuat = function (t, a) {
      var n = a[0],
          r = a[1],
          o = a[2],
          u = a[3],
          l = n + n,
          e = r + r,
          M = o + o,
          s = n * l,
          i = r * l,
          c = r * e,
          h = o * l,
          S = o * e,
          I = o * M,
          f = u * l,
          x = u * e,
          D = u * M;return t[0] = 1 - c - I, t[1] = i + D, t[2] = h - x, t[3] = 0, t[4] = i - D, t[5] = 1 - s - I, t[6] = S + f, t[7] = 0, t[8] = h + x, t[9] = S - f, t[10] = 1 - s - c, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t;
    }, o.frustum = function (t, a, n, r, o, u, l) {
      var e = 1 / (n - a),
          M = 1 / (o - r),
          s = 1 / (u - l);return t[0] = 2 * u * e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 2 * u * M, t[6] = 0, t[7] = 0, t[8] = (n + a) * e, t[9] = (o + r) * M, t[10] = (l + u) * s, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = l * u * 2 * s, t[15] = 0, t;
    }, o.perspective = function (t, a, n, r, o) {
      var u = 1 / Math.tan(a / 2),
          l = 1 / (r - o);return t[0] = u / n, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = u, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = (o + r) * l, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = 2 * o * r * l, t[15] = 0, t;
    }, o.perspectiveFromFieldOfView = function (t, a, n, r) {
      var o = Math.tan(a.upDegrees * Math.PI / 180),
          u = Math.tan(a.downDegrees * Math.PI / 180),
          l = Math.tan(a.leftDegrees * Math.PI / 180),
          e = Math.tan(a.rightDegrees * Math.PI / 180),
          M = 2 / (l + e),
          s = 2 / (o + u);return t[0] = M, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = s, t[6] = 0, t[7] = 0, t[8] = -((l - e) * M * .5), t[9] = (o - u) * s * .5, t[10] = r / (n - r), t[11] = -1, t[12] = 0, t[13] = 0, t[14] = r * n / (n - r), t[15] = 0, t;
    }, o.ortho = function (t, a, n, r, o, u, l) {
      var e = 1 / (a - n),
          M = 1 / (r - o),
          s = 1 / (u - l);return t[0] = -2 * e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * M, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * s, t[11] = 0, t[12] = (a + n) * e, t[13] = (o + r) * M, t[14] = (l + u) * s, t[15] = 1, t;
    }, o.lookAt = function (t, a, n, u) {
      var l,
          e,
          M,
          s,
          i,
          c,
          h,
          S,
          I,
          f,
          x = a[0],
          D = a[1],
          F = a[2],
          m = u[0],
          d = u[1],
          b = u[2],
          v = n[0],
          z = n[1],
          p = n[2];return Math.abs(x - v) < r.EPSILON && Math.abs(D - z) < r.EPSILON && Math.abs(F - p) < r.EPSILON ? o.identity(t) : (h = x - v, S = D - z, I = F - p, f = 1 / Math.sqrt(h * h + S * S + I * I), h *= f, S *= f, I *= f, l = d * I - b * S, e = b * h - m * I, M = m * S - d * h, f = Math.sqrt(l * l + e * e + M * M), f ? (f = 1 / f, l *= f, e *= f, M *= f) : (l = 0, e = 0, M = 0), s = S * M - I * e, i = I * l - h * M, c = h * e - S * l, f = Math.sqrt(s * s + i * i + c * c), f ? (f = 1 / f, s *= f, i *= f, c *= f) : (s = 0, i = 0, c = 0), t[0] = l, t[1] = s, t[2] = h, t[3] = 0, t[4] = e, t[5] = i, t[6] = S, t[7] = 0, t[8] = M, t[9] = c, t[10] = I, t[11] = 0, t[12] = -(l * x + e * D + M * F), t[13] = -(s * x + i * D + c * F), t[14] = -(h * x + S * D + I * F), t[15] = 1, t);
    }, o.str = function (t) {
      return "mat4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + ")";
    }, o.frob = function (t) {
      return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2) + Math.pow(t[9], 2) + Math.pow(t[10], 2) + Math.pow(t[11], 2) + Math.pow(t[12], 2) + Math.pow(t[13], 2) + Math.pow(t[14], 2) + Math.pow(t[15], 2));
    }, o.add = function (t, a, n) {
      return t[0] = a[0] + n[0], t[1] = a[1] + n[1], t[2] = a[2] + n[2], t[3] = a[3] + n[3], t[4] = a[4] + n[4], t[5] = a[5] + n[5], t[6] = a[6] + n[6], t[7] = a[7] + n[7], t[8] = a[8] + n[8], t[9] = a[9] + n[9], t[10] = a[10] + n[10], t[11] = a[11] + n[11], t[12] = a[12] + n[12], t[13] = a[13] + n[13], t[14] = a[14] + n[14], t[15] = a[15] + n[15], t;
    }, o.subtract = function (t, a, n) {
      return t[0] = a[0] - n[0], t[1] = a[1] - n[1], t[2] = a[2] - n[2], t[3] = a[3] - n[3], t[4] = a[4] - n[4], t[5] = a[5] - n[5], t[6] = a[6] - n[6], t[7] = a[7] - n[7], t[8] = a[8] - n[8], t[9] = a[9] - n[9], t[10] = a[10] - n[10], t[11] = a[11] - n[11], t[12] = a[12] - n[12], t[13] = a[13] - n[13], t[14] = a[14] - n[14], t[15] = a[15] - n[15], t;
    }, o.sub = o.subtract, o.multiplyScalar = function (t, a, n) {
      return t[0] = a[0] * n, t[1] = a[1] * n, t[2] = a[2] * n, t[3] = a[3] * n, t[4] = a[4] * n, t[5] = a[5] * n, t[6] = a[6] * n, t[7] = a[7] * n, t[8] = a[8] * n, t[9] = a[9] * n, t[10] = a[10] * n, t[11] = a[11] * n, t[12] = a[12] * n, t[13] = a[13] * n, t[14] = a[14] * n, t[15] = a[15] * n, t;
    }, o.multiplyScalarAndAdd = function (t, a, n, r) {
      return t[0] = a[0] + n[0] * r, t[1] = a[1] + n[1] * r, t[2] = a[2] + n[2] * r, t[3] = a[3] + n[3] * r, t[4] = a[4] + n[4] * r, t[5] = a[5] + n[5] * r, t[6] = a[6] + n[6] * r, t[7] = a[7] + n[7] * r, t[8] = a[8] + n[8] * r, t[9] = a[9] + n[9] * r, t[10] = a[10] + n[10] * r, t[11] = a[11] + n[11] * r, t[12] = a[12] + n[12] * r, t[13] = a[13] + n[13] * r, t[14] = a[14] + n[14] * r, t[15] = a[15] + n[15] * r, t;
    }, o.exactEquals = function (t, a) {
      return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3] && t[4] === a[4] && t[5] === a[5] && t[6] === a[6] && t[7] === a[7] && t[8] === a[8] && t[9] === a[9] && t[10] === a[10] && t[11] === a[11] && t[12] === a[12] && t[13] === a[13] && t[14] === a[14] && t[15] === a[15];
    }, o.equals = function (t, a) {
      var n = t[0],
          o = t[1],
          u = t[2],
          l = t[3],
          e = t[4],
          M = t[5],
          s = t[6],
          i = t[7],
          c = t[8],
          h = t[9],
          S = t[10],
          I = t[11],
          f = t[12],
          x = t[13],
          D = t[14],
          F = t[15],
          m = a[0],
          d = a[1],
          b = a[2],
          v = a[3],
          z = a[4],
          p = a[5],
          w = a[6],
          E = a[7],
          A = a[8],
          P = a[9],
          L = a[10],
          q = a[11],
          R = a[12],
          N = a[13],
          O = a[14],
          Y = a[15];return Math.abs(n - m) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(m)) && Math.abs(o - d) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(d)) && Math.abs(u - b) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(b)) && Math.abs(l - v) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(v)) && Math.abs(e - z) <= r.EPSILON * Math.max(1, Math.abs(e), Math.abs(z)) && Math.abs(M - p) <= r.EPSILON * Math.max(1, Math.abs(M), Math.abs(p)) && Math.abs(s - w) <= r.EPSILON * Math.max(1, Math.abs(s), Math.abs(w)) && Math.abs(i - E) <= r.EPSILON * Math.max(1, Math.abs(i), Math.abs(E)) && Math.abs(c - A) <= r.EPSILON * Math.max(1, Math.abs(c), Math.abs(A)) && Math.abs(h - P) <= r.EPSILON * Math.max(1, Math.abs(h), Math.abs(P)) && Math.abs(S - L) <= r.EPSILON * Math.max(1, Math.abs(S), Math.abs(L)) && Math.abs(I - q) <= r.EPSILON * Math.max(1, Math.abs(I), Math.abs(q)) && Math.abs(f - R) <= r.EPSILON * Math.max(1, Math.abs(f), Math.abs(R)) && Math.abs(x - N) <= r.EPSILON * Math.max(1, Math.abs(x), Math.abs(N)) && Math.abs(D - O) <= r.EPSILON * Math.max(1, Math.abs(D), Math.abs(O)) && Math.abs(F - Y) <= r.EPSILON * Math.max(1, Math.abs(F), Math.abs(Y));
    }, t.exports = o;
  }, function (t, a, n) {
    var r = n(1),
        o = n(4),
        u = n(7),
        l = n(8),
        e = {};e.create = function () {
      var t = new r.ARRAY_TYPE(4);return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t;
    }, e.rotationTo = function () {
      var t = u.create(),
          a = u.fromValues(1, 0, 0),
          n = u.fromValues(0, 1, 0);return function (r, o, l) {
        var M = u.dot(o, l);return -.999999 > M ? (u.cross(t, a, o), u.length(t) < 1e-6 && u.cross(t, n, o), u.normalize(t, t), e.setAxisAngle(r, t, Math.PI), r) : M > .999999 ? (r[0] = 0, r[1] = 0, r[2] = 0, r[3] = 1, r) : (u.cross(t, o, l), r[0] = t[0], r[1] = t[1], r[2] = t[2], r[3] = 1 + M, e.normalize(r, r));
      };
    }(), e.setAxes = function () {
      var t = o.create();return function (a, n, r, o) {
        return t[0] = r[0], t[3] = r[1], t[6] = r[2], t[1] = o[0], t[4] = o[1], t[7] = o[2], t[2] = -n[0], t[5] = -n[1], t[8] = -n[2], e.normalize(a, e.fromMat3(a, t));
      };
    }(), e.clone = l.clone, e.fromValues = l.fromValues, e.copy = l.copy, e.set = l.set, e.identity = function (t) {
      return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t;
    }, e.setAxisAngle = function (t, a, n) {
      n = .5 * n;var r = Math.sin(n);return t[0] = r * a[0], t[1] = r * a[1], t[2] = r * a[2], t[3] = Math.cos(n), t;
    }, e.getAxisAngle = function (t, a) {
      var n = 2 * Math.acos(a[3]),
          r = Math.sin(n / 2);return 0 != r ? (t[0] = a[0] / r, t[1] = a[1] / r, t[2] = a[2] / r) : (t[0] = 1, t[1] = 0, t[2] = 0), n;
    }, e.add = l.add, e.multiply = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = n[0],
          M = n[1],
          s = n[2],
          i = n[3];return t[0] = r * i + l * e + o * s - u * M, t[1] = o * i + l * M + u * e - r * s, t[2] = u * i + l * s + r * M - o * e, t[3] = l * i - r * e - o * M - u * s, t;
    }, e.mul = e.multiply, e.scale = l.scale, e.rotateX = function (t, a, n) {
      n *= .5;var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = Math.sin(n),
          M = Math.cos(n);return t[0] = r * M + l * e, t[1] = o * M + u * e, t[2] = u * M - o * e, t[3] = l * M - r * e, t;
    }, e.rotateY = function (t, a, n) {
      n *= .5;var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = Math.sin(n),
          M = Math.cos(n);return t[0] = r * M - u * e, t[1] = o * M + l * e, t[2] = u * M + r * e, t[3] = l * M - o * e, t;
    }, e.rotateZ = function (t, a, n) {
      n *= .5;var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3],
          e = Math.sin(n),
          M = Math.cos(n);return t[0] = r * M + o * e, t[1] = o * M - r * e, t[2] = u * M + l * e, t[3] = l * M - u * e, t;
    }, e.calculateW = function (t, a) {
      var n = a[0],
          r = a[1],
          o = a[2];return t[0] = n, t[1] = r, t[2] = o, t[3] = Math.sqrt(Math.abs(1 - n * n - r * r - o * o)), t;
    }, e.dot = l.dot, e.lerp = l.lerp, e.slerp = function (t, a, n, r) {
      var o,
          u,
          l,
          e,
          M,
          s = a[0],
          i = a[1],
          c = a[2],
          h = a[3],
          S = n[0],
          I = n[1],
          f = n[2],
          x = n[3];return u = s * S + i * I + c * f + h * x, 0 > u && (u = -u, S = -S, I = -I, f = -f, x = -x), 1 - u > 1e-6 ? (o = Math.acos(u), l = Math.sin(o), e = Math.sin((1 - r) * o) / l, M = Math.sin(r * o) / l) : (e = 1 - r, M = r), t[0] = e * s + M * S, t[1] = e * i + M * I, t[2] = e * c + M * f, t[3] = e * h + M * x, t;
    }, e.sqlerp = function () {
      var t = e.create(),
          a = e.create();return function (n, r, o, u, l, M) {
        return e.slerp(t, r, l, M), e.slerp(a, o, u, M), e.slerp(n, t, a, 2 * M * (1 - M)), n;
      };
    }(), e.invert = function (t, a) {
      var n = a[0],
          r = a[1],
          o = a[2],
          u = a[3],
          l = n * n + r * r + o * o + u * u,
          e = l ? 1 / l : 0;return t[0] = -n * e, t[1] = -r * e, t[2] = -o * e, t[3] = u * e, t;
    }, e.conjugate = function (t, a) {
      return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = a[3], t;
    }, e.length = l.length, e.len = e.length, e.squaredLength = l.squaredLength, e.sqrLen = e.squaredLength, e.normalize = l.normalize, e.fromMat3 = function (t, a) {
      var n,
          r = a[0] + a[4] + a[8];if (r > 0) n = Math.sqrt(r + 1), t[3] = .5 * n, n = .5 / n, t[0] = (a[5] - a[7]) * n, t[1] = (a[6] - a[2]) * n, t[2] = (a[1] - a[3]) * n;else {
        var o = 0;a[4] > a[0] && (o = 1), a[8] > a[3 * o + o] && (o = 2);var u = (o + 1) % 3,
            l = (o + 2) % 3;n = Math.sqrt(a[3 * o + o] - a[3 * u + u] - a[3 * l + l] + 1), t[o] = .5 * n, n = .5 / n, t[3] = (a[3 * u + l] - a[3 * l + u]) * n, t[u] = (a[3 * u + o] + a[3 * o + u]) * n, t[l] = (a[3 * l + o] + a[3 * o + l]) * n;
      }return t;
    }, e.str = function (t) {
      return "quat(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
    }, e.exactEquals = l.exactEquals, e.equals = l.equals, t.exports = e;
  }, function (t, a, n) {
    var r = n(1),
        o = {};o.create = function () {
      var t = new r.ARRAY_TYPE(3);return t[0] = 0, t[1] = 0, t[2] = 0, t;
    }, o.clone = function (t) {
      var a = new r.ARRAY_TYPE(3);return a[0] = t[0], a[1] = t[1], a[2] = t[2], a;
    }, o.fromValues = function (t, a, n) {
      var o = new r.ARRAY_TYPE(3);return o[0] = t, o[1] = a, o[2] = n, o;
    }, o.copy = function (t, a) {
      return t[0] = a[0], t[1] = a[1], t[2] = a[2], t;
    }, o.set = function (t, a, n, r) {
      return t[0] = a, t[1] = n, t[2] = r, t;
    }, o.add = function (t, a, n) {
      return t[0] = a[0] + n[0], t[1] = a[1] + n[1], t[2] = a[2] + n[2], t;
    }, o.subtract = function (t, a, n) {
      return t[0] = a[0] - n[0], t[1] = a[1] - n[1], t[2] = a[2] - n[2], t;
    }, o.sub = o.subtract, o.multiply = function (t, a, n) {
      return t[0] = a[0] * n[0], t[1] = a[1] * n[1], t[2] = a[2] * n[2], t;
    }, o.mul = o.multiply, o.divide = function (t, a, n) {
      return t[0] = a[0] / n[0], t[1] = a[1] / n[1], t[2] = a[2] / n[2], t;
    }, o.div = o.divide, o.ceil = function (t, a) {
      return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t[2] = Math.ceil(a[2]), t;
    }, o.floor = function (t, a) {
      return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t[2] = Math.floor(a[2]), t;
    }, o.min = function (t, a, n) {
      return t[0] = Math.min(a[0], n[0]), t[1] = Math.min(a[1], n[1]), t[2] = Math.min(a[2], n[2]), t;
    }, o.max = function (t, a, n) {
      return t[0] = Math.max(a[0], n[0]), t[1] = Math.max(a[1], n[1]), t[2] = Math.max(a[2], n[2]), t;
    }, o.round = function (t, a) {
      return t[0] = Math.round(a[0]), t[1] = Math.round(a[1]), t[2] = Math.round(a[2]), t;
    }, o.scale = function (t, a, n) {
      return t[0] = a[0] * n, t[1] = a[1] * n, t[2] = a[2] * n, t;
    }, o.scaleAndAdd = function (t, a, n, r) {
      return t[0] = a[0] + n[0] * r, t[1] = a[1] + n[1] * r, t[2] = a[2] + n[2] * r, t;
    }, o.distance = function (t, a) {
      var n = a[0] - t[0],
          r = a[1] - t[1],
          o = a[2] - t[2];return Math.sqrt(n * n + r * r + o * o);
    }, o.dist = o.distance, o.squaredDistance = function (t, a) {
      var n = a[0] - t[0],
          r = a[1] - t[1],
          o = a[2] - t[2];return n * n + r * r + o * o;
    }, o.sqrDist = o.squaredDistance, o.length = function (t) {
      var a = t[0],
          n = t[1],
          r = t[2];return Math.sqrt(a * a + n * n + r * r);
    }, o.len = o.length, o.squaredLength = function (t) {
      var a = t[0],
          n = t[1],
          r = t[2];return a * a + n * n + r * r;
    }, o.sqrLen = o.squaredLength, o.negate = function (t, a) {
      return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t;
    }, o.inverse = function (t, a) {
      return t[0] = 1 / a[0], t[1] = 1 / a[1], t[2] = 1 / a[2], t;
    }, o.normalize = function (t, a) {
      var n = a[0],
          r = a[1],
          o = a[2],
          u = n * n + r * r + o * o;return u > 0 && (u = 1 / Math.sqrt(u), t[0] = a[0] * u, t[1] = a[1] * u, t[2] = a[2] * u), t;
    }, o.dot = function (t, a) {
      return t[0] * a[0] + t[1] * a[1] + t[2] * a[2];
    }, o.cross = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = n[0],
          e = n[1],
          M = n[2];return t[0] = o * M - u * e, t[1] = u * l - r * M, t[2] = r * e - o * l, t;
    }, o.lerp = function (t, a, n, r) {
      var o = a[0],
          u = a[1],
          l = a[2];return t[0] = o + r * (n[0] - o), t[1] = u + r * (n[1] - u), t[2] = l + r * (n[2] - l), t;
    }, o.hermite = function (t, a, n, r, o, u) {
      var l = u * u,
          e = l * (2 * u - 3) + 1,
          M = l * (u - 2) + u,
          s = l * (u - 1),
          i = l * (3 - 2 * u);return t[0] = a[0] * e + n[0] * M + r[0] * s + o[0] * i, t[1] = a[1] * e + n[1] * M + r[1] * s + o[1] * i, t[2] = a[2] * e + n[2] * M + r[2] * s + o[2] * i, t;
    }, o.bezier = function (t, a, n, r, o, u) {
      var l = 1 - u,
          e = l * l,
          M = u * u,
          s = e * l,
          i = 3 * u * e,
          c = 3 * M * l,
          h = M * u;return t[0] = a[0] * s + n[0] * i + r[0] * c + o[0] * h, t[1] = a[1] * s + n[1] * i + r[1] * c + o[1] * h, t[2] = a[2] * s + n[2] * i + r[2] * c + o[2] * h, t;
    }, o.random = function (t, a) {
      a = a || 1;var n = 2 * r.RANDOM() * Math.PI,
          o = 2 * r.RANDOM() - 1,
          u = Math.sqrt(1 - o * o) * a;return t[0] = Math.cos(n) * u, t[1] = Math.sin(n) * u, t[2] = o * a, t;
    }, o.transformMat4 = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = n[3] * r + n[7] * o + n[11] * u + n[15];return l = l || 1, t[0] = (n[0] * r + n[4] * o + n[8] * u + n[12]) / l, t[1] = (n[1] * r + n[5] * o + n[9] * u + n[13]) / l, t[2] = (n[2] * r + n[6] * o + n[10] * u + n[14]) / l, t;
    }, o.transformMat3 = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2];return t[0] = r * n[0] + o * n[3] + u * n[6], t[1] = r * n[1] + o * n[4] + u * n[7], t[2] = r * n[2] + o * n[5] + u * n[8], t;
    }, o.transformQuat = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = n[0],
          e = n[1],
          M = n[2],
          s = n[3],
          i = s * r + e * u - M * o,
          c = s * o + M * r - l * u,
          h = s * u + l * o - e * r,
          S = -l * r - e * o - M * u;return t[0] = i * s + S * -l + c * -M - h * -e, t[1] = c * s + S * -e + h * -l - i * -M, t[2] = h * s + S * -M + i * -e - c * -l, t;
    }, o.rotateX = function (t, a, n, r) {
      var o = [],
          u = [];return o[0] = a[0] - n[0], o[1] = a[1] - n[1], o[2] = a[2] - n[2], u[0] = o[0], u[1] = o[1] * Math.cos(r) - o[2] * Math.sin(r), u[2] = o[1] * Math.sin(r) + o[2] * Math.cos(r), t[0] = u[0] + n[0], t[1] = u[1] + n[1], t[2] = u[2] + n[2], t;
    }, o.rotateY = function (t, a, n, r) {
      var o = [],
          u = [];return o[0] = a[0] - n[0], o[1] = a[1] - n[1], o[2] = a[2] - n[2], u[0] = o[2] * Math.sin(r) + o[0] * Math.cos(r), u[1] = o[1], u[2] = o[2] * Math.cos(r) - o[0] * Math.sin(r), t[0] = u[0] + n[0], t[1] = u[1] + n[1], t[2] = u[2] + n[2], t;
    }, o.rotateZ = function (t, a, n, r) {
      var o = [],
          u = [];return o[0] = a[0] - n[0], o[1] = a[1] - n[1], o[2] = a[2] - n[2], u[0] = o[0] * Math.cos(r) - o[1] * Math.sin(r), u[1] = o[0] * Math.sin(r) + o[1] * Math.cos(r), u[2] = o[2], t[0] = u[0] + n[0], t[1] = u[1] + n[1], t[2] = u[2] + n[2], t;
    }, o.forEach = function () {
      var t = o.create();return function (a, n, r, o, u, l) {
        var e, M;for (n || (n = 3), r || (r = 0), M = o ? Math.min(o * n + r, a.length) : a.length, e = r; M > e; e += n) {
          t[0] = a[e], t[1] = a[e + 1], t[2] = a[e + 2], u(t, t, l), a[e] = t[0], a[e + 1] = t[1], a[e + 2] = t[2];
        }return a;
      };
    }(), o.angle = function (t, a) {
      var n = o.fromValues(t[0], t[1], t[2]),
          r = o.fromValues(a[0], a[1], a[2]);o.normalize(n, n), o.normalize(r, r);var u = o.dot(n, r);return u > 1 ? 0 : Math.acos(u);
    }, o.str = function (t) {
      return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
    }, o.exactEquals = function (t, a) {
      return t[0] === a[0] && t[1] === a[1] && t[2] === a[2];
    }, o.equals = function (t, a) {
      var n = t[0],
          o = t[1],
          u = t[2],
          l = a[0],
          e = a[1],
          M = a[2];return Math.abs(n - l) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(l)) && Math.abs(o - e) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(e)) && Math.abs(u - M) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(M));
    }, t.exports = o;
  }, function (t, a, n) {
    var r = n(1),
        o = {};o.create = function () {
      var t = new r.ARRAY_TYPE(4);return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t;
    }, o.clone = function (t) {
      var a = new r.ARRAY_TYPE(4);return a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = t[3], a;
    }, o.fromValues = function (t, a, n, o) {
      var u = new r.ARRAY_TYPE(4);return u[0] = t, u[1] = a, u[2] = n, u[3] = o, u;
    }, o.copy = function (t, a) {
      return t[0] = a[0], t[1] = a[1], t[2] = a[2], t[3] = a[3], t;
    }, o.set = function (t, a, n, r, o) {
      return t[0] = a, t[1] = n, t[2] = r, t[3] = o, t;
    }, o.add = function (t, a, n) {
      return t[0] = a[0] + n[0], t[1] = a[1] + n[1], t[2] = a[2] + n[2], t[3] = a[3] + n[3], t;
    }, o.subtract = function (t, a, n) {
      return t[0] = a[0] - n[0], t[1] = a[1] - n[1], t[2] = a[2] - n[2], t[3] = a[3] - n[3], t;
    }, o.sub = o.subtract, o.multiply = function (t, a, n) {
      return t[0] = a[0] * n[0], t[1] = a[1] * n[1], t[2] = a[2] * n[2], t[3] = a[3] * n[3], t;
    }, o.mul = o.multiply, o.divide = function (t, a, n) {
      return t[0] = a[0] / n[0], t[1] = a[1] / n[1], t[2] = a[2] / n[2], t[3] = a[3] / n[3], t;
    }, o.div = o.divide, o.ceil = function (t, a) {
      return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t[2] = Math.ceil(a[2]), t[3] = Math.ceil(a[3]), t;
    }, o.floor = function (t, a) {
      return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t[2] = Math.floor(a[2]), t[3] = Math.floor(a[3]), t;
    }, o.min = function (t, a, n) {
      return t[0] = Math.min(a[0], n[0]), t[1] = Math.min(a[1], n[1]), t[2] = Math.min(a[2], n[2]), t[3] = Math.min(a[3], n[3]), t;
    }, o.max = function (t, a, n) {
      return t[0] = Math.max(a[0], n[0]), t[1] = Math.max(a[1], n[1]), t[2] = Math.max(a[2], n[2]), t[3] = Math.max(a[3], n[3]), t;
    }, o.round = function (t, a) {
      return t[0] = Math.round(a[0]), t[1] = Math.round(a[1]), t[2] = Math.round(a[2]), t[3] = Math.round(a[3]), t;
    }, o.scale = function (t, a, n) {
      return t[0] = a[0] * n, t[1] = a[1] * n, t[2] = a[2] * n, t[3] = a[3] * n, t;
    }, o.scaleAndAdd = function (t, a, n, r) {
      return t[0] = a[0] + n[0] * r, t[1] = a[1] + n[1] * r, t[2] = a[2] + n[2] * r, t[3] = a[3] + n[3] * r, t;
    }, o.distance = function (t, a) {
      var n = a[0] - t[0],
          r = a[1] - t[1],
          o = a[2] - t[2],
          u = a[3] - t[3];return Math.sqrt(n * n + r * r + o * o + u * u);
    }, o.dist = o.distance, o.squaredDistance = function (t, a) {
      var n = a[0] - t[0],
          r = a[1] - t[1],
          o = a[2] - t[2],
          u = a[3] - t[3];return n * n + r * r + o * o + u * u;
    }, o.sqrDist = o.squaredDistance, o.length = function (t) {
      var a = t[0],
          n = t[1],
          r = t[2],
          o = t[3];return Math.sqrt(a * a + n * n + r * r + o * o);
    }, o.len = o.length, o.squaredLength = function (t) {
      var a = t[0],
          n = t[1],
          r = t[2],
          o = t[3];return a * a + n * n + r * r + o * o;
    }, o.sqrLen = o.squaredLength, o.negate = function (t, a) {
      return t[0] = -a[0], t[1] = -a[1], t[2] = -a[2], t[3] = -a[3], t;
    }, o.inverse = function (t, a) {
      return t[0] = 1 / a[0], t[1] = 1 / a[1], t[2] = 1 / a[2], t[3] = 1 / a[3], t;
    }, o.normalize = function (t, a) {
      var n = a[0],
          r = a[1],
          o = a[2],
          u = a[3],
          l = n * n + r * r + o * o + u * u;return l > 0 && (l = 1 / Math.sqrt(l), t[0] = n * l, t[1] = r * l, t[2] = o * l, t[3] = u * l), t;
    }, o.dot = function (t, a) {
      return t[0] * a[0] + t[1] * a[1] + t[2] * a[2] + t[3] * a[3];
    }, o.lerp = function (t, a, n, r) {
      var o = a[0],
          u = a[1],
          l = a[2],
          e = a[3];return t[0] = o + r * (n[0] - o), t[1] = u + r * (n[1] - u), t[2] = l + r * (n[2] - l), t[3] = e + r * (n[3] - e), t;
    }, o.random = function (t, a) {
      return a = a || 1, t[0] = r.RANDOM(), t[1] = r.RANDOM(), t[2] = r.RANDOM(), t[3] = r.RANDOM(), o.normalize(t, t), o.scale(t, t, a), t;
    }, o.transformMat4 = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = a[3];return t[0] = n[0] * r + n[4] * o + n[8] * u + n[12] * l, t[1] = n[1] * r + n[5] * o + n[9] * u + n[13] * l, t[2] = n[2] * r + n[6] * o + n[10] * u + n[14] * l, t[3] = n[3] * r + n[7] * o + n[11] * u + n[15] * l, t;
    }, o.transformQuat = function (t, a, n) {
      var r = a[0],
          o = a[1],
          u = a[2],
          l = n[0],
          e = n[1],
          M = n[2],
          s = n[3],
          i = s * r + e * u - M * o,
          c = s * o + M * r - l * u,
          h = s * u + l * o - e * r,
          S = -l * r - e * o - M * u;return t[0] = i * s + S * -l + c * -M - h * -e, t[1] = c * s + S * -e + h * -l - i * -M, t[2] = h * s + S * -M + i * -e - c * -l, t[3] = a[3], t;
    }, o.forEach = function () {
      var t = o.create();return function (a, n, r, o, u, l) {
        var e, M;for (n || (n = 4), r || (r = 0), M = o ? Math.min(o * n + r, a.length) : a.length, e = r; M > e; e += n) {
          t[0] = a[e], t[1] = a[e + 1], t[2] = a[e + 2], t[3] = a[e + 3], u(t, t, l), a[e] = t[0], a[e + 1] = t[1], a[e + 2] = t[2], a[e + 3] = t[3];
        }return a;
      };
    }(), o.str = function (t) {
      return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")";
    }, o.exactEquals = function (t, a) {
      return t[0] === a[0] && t[1] === a[1] && t[2] === a[2] && t[3] === a[3];
    }, o.equals = function (t, a) {
      var n = t[0],
          o = t[1],
          u = t[2],
          l = t[3],
          e = a[0],
          M = a[1],
          s = a[2],
          i = a[3];return Math.abs(n - e) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(e)) && Math.abs(o - M) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(M)) && Math.abs(u - s) <= r.EPSILON * Math.max(1, Math.abs(u), Math.abs(s)) && Math.abs(l - i) <= r.EPSILON * Math.max(1, Math.abs(l), Math.abs(i));
    }, t.exports = o;
  }, function (t, a, n) {
    var r = n(1),
        o = {};o.create = function () {
      var t = new r.ARRAY_TYPE(2);return t[0] = 0, t[1] = 0, t;
    }, o.clone = function (t) {
      var a = new r.ARRAY_TYPE(2);return a[0] = t[0], a[1] = t[1], a;
    }, o.fromValues = function (t, a) {
      var n = new r.ARRAY_TYPE(2);return n[0] = t, n[1] = a, n;
    }, o.copy = function (t, a) {
      return t[0] = a[0], t[1] = a[1], t;
    }, o.set = function (t, a, n) {
      return t[0] = a, t[1] = n, t;
    }, o.add = function (t, a, n) {
      return t[0] = a[0] + n[0], t[1] = a[1] + n[1], t;
    }, o.subtract = function (t, a, n) {
      return t[0] = a[0] - n[0], t[1] = a[1] - n[1], t;
    }, o.sub = o.subtract, o.multiply = function (t, a, n) {
      return t[0] = a[0] * n[0], t[1] = a[1] * n[1], t;
    }, o.mul = o.multiply, o.divide = function (t, a, n) {
      return t[0] = a[0] / n[0], t[1] = a[1] / n[1], t;
    }, o.div = o.divide, o.ceil = function (t, a) {
      return t[0] = Math.ceil(a[0]), t[1] = Math.ceil(a[1]), t;
    }, o.floor = function (t, a) {
      return t[0] = Math.floor(a[0]), t[1] = Math.floor(a[1]), t;
    }, o.min = function (t, a, n) {
      return t[0] = Math.min(a[0], n[0]), t[1] = Math.min(a[1], n[1]), t;
    }, o.max = function (t, a, n) {
      return t[0] = Math.max(a[0], n[0]), t[1] = Math.max(a[1], n[1]), t;
    }, o.round = function (t, a) {
      return t[0] = Math.round(a[0]), t[1] = Math.round(a[1]), t;
    }, o.scale = function (t, a, n) {
      return t[0] = a[0] * n, t[1] = a[1] * n, t;
    }, o.scaleAndAdd = function (t, a, n, r) {
      return t[0] = a[0] + n[0] * r, t[1] = a[1] + n[1] * r, t;
    }, o.distance = function (t, a) {
      var n = a[0] - t[0],
          r = a[1] - t[1];return Math.sqrt(n * n + r * r);
    }, o.dist = o.distance, o.squaredDistance = function (t, a) {
      var n = a[0] - t[0],
          r = a[1] - t[1];return n * n + r * r;
    }, o.sqrDist = o.squaredDistance, o.length = function (t) {
      var a = t[0],
          n = t[1];return Math.sqrt(a * a + n * n);
    }, o.len = o.length, o.squaredLength = function (t) {
      var a = t[0],
          n = t[1];return a * a + n * n;
    }, o.sqrLen = o.squaredLength, o.negate = function (t, a) {
      return t[0] = -a[0], t[1] = -a[1], t;
    }, o.inverse = function (t, a) {
      return t[0] = 1 / a[0], t[1] = 1 / a[1], t;
    }, o.normalize = function (t, a) {
      var n = a[0],
          r = a[1],
          o = n * n + r * r;return o > 0 && (o = 1 / Math.sqrt(o), t[0] = a[0] * o, t[1] = a[1] * o), t;
    }, o.dot = function (t, a) {
      return t[0] * a[0] + t[1] * a[1];
    }, o.cross = function (t, a, n) {
      var r = a[0] * n[1] - a[1] * n[0];return t[0] = t[1] = 0, t[2] = r, t;
    }, o.lerp = function (t, a, n, r) {
      var o = a[0],
          u = a[1];return t[0] = o + r * (n[0] - o), t[1] = u + r * (n[1] - u), t;
    }, o.random = function (t, a) {
      a = a || 1;var n = 2 * r.RANDOM() * Math.PI;return t[0] = Math.cos(n) * a, t[1] = Math.sin(n) * a, t;
    }, o.transformMat2 = function (t, a, n) {
      var r = a[0],
          o = a[1];return t[0] = n[0] * r + n[2] * o, t[1] = n[1] * r + n[3] * o, t;
    }, o.transformMat2d = function (t, a, n) {
      var r = a[0],
          o = a[1];return t[0] = n[0] * r + n[2] * o + n[4], t[1] = n[1] * r + n[3] * o + n[5], t;
    }, o.transformMat3 = function (t, a, n) {
      var r = a[0],
          o = a[1];return t[0] = n[0] * r + n[3] * o + n[6], t[1] = n[1] * r + n[4] * o + n[7], t;
    }, o.transformMat4 = function (t, a, n) {
      var r = a[0],
          o = a[1];return t[0] = n[0] * r + n[4] * o + n[12], t[1] = n[1] * r + n[5] * o + n[13], t;
    }, o.forEach = function () {
      var t = o.create();return function (a, n, r, o, u, l) {
        var e, M;for (n || (n = 2), r || (r = 0), M = o ? Math.min(o * n + r, a.length) : a.length, e = r; M > e; e += n) {
          t[0] = a[e], t[1] = a[e + 1], u(t, t, l), a[e] = t[0], a[e + 1] = t[1];
        }return a;
      };
    }(), o.str = function (t) {
      return "vec2(" + t[0] + ", " + t[1] + ")";
    }, o.exactEquals = function (t, a) {
      return t[0] === a[0] && t[1] === a[1];
    }, o.equals = function (t, a) {
      var n = t[0],
          o = t[1],
          u = a[0],
          l = a[1];return Math.abs(n - u) <= r.EPSILON * Math.max(1, Math.abs(n), Math.abs(u)) && Math.abs(o - l) <= r.EPSILON * Math.max(1, Math.abs(o), Math.abs(l));
    }, t.exports = o;
  }]);
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Object": 0,
	"./Object.js": 0,
	"./object-belt": 2,
	"./object-belt.js": 2,
	"./object-heatmap": 3,
	"./object-heatmap.js": 3,
	"./object-path": 1,
	"./object-path.js": 1
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 11;

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var paths = [["116.452143", "39.889167", 0], ["116.451994", "39.890329", 0], ["116.451846", "39.891591", 0], ["116.451739", "39.892438", 0], ["116.451643", "39.893203", 0], ["116.451323", "39.895705", 0], ["116.451103", "39.897235", 0], ["116.451020", "39.897781", 0], ["116.450945", "39.898277", 0], ["116.450825", "39.899458", 0], ["116.450759", "39.900727", 0], ["116.450748", "39.900943", 0], ["116.450662", "39.903094", 0], ["116.450417", "39.903752", 0], ["116.449079", "39.904687", 0], ["116.446823", "39.905211", 0], ["116.444635", "39.905708", 0], ["116.443402", "39.906438", 0], ["116.443151", "39.906811", 0], ["116.443011", "39.907385", 0], ["116.443027", "39.907719", 0], ["116.443042", "39.907911", 0], ["116.443068", "39.908238", 0], ["116.442954", "39.909361", 0], ["116.442804", "39.910220", 0], ["116.442768", "39.910438", 0], ["116.442687", "39.910907", 0], ["116.442669", "39.911008", 0], ["116.442541", "39.911746", 0], ["116.442496", "39.911948", 0], ["116.442460", "39.912539", 0], ["116.442416", "39.913245", 0], ["116.442382", "39.914500", 0], ["116.442295", "39.915674", 0], ["116.442285", "39.915882", 0], ["116.442243", "39.916742", 0], ["116.442040", "39.917711", 0], ["116.441813", "39.918740", 0], ["116.441483", "39.921427", 0], ["116.441476", "39.921570", 0], ["116.441445", "39.922271", 0], ["116.441436", "39.922576", 0], ["116.441428", "39.922730", 0], ["116.441399", "39.923433", 0], ["116.441393", "39.923617", 0], ["116.441289", "39.925688", 0], ["116.441227", "39.927439", 0], ["116.441212", "39.927748", 0], ["116.441196", "39.927861", 0], ["116.441079", "39.930370", 0], ["116.441012", "39.931965", 0], ["116.440986", "39.932708", 0], ["116.440921", "39.934236", 0], ["116.440894", "39.934861", 0], ["116.440822", "39.936462", 0], ["116.440816", "39.936684", 0], ["116.440800", "39.937062", 0], ["116.440771", "39.937575", 0], ["116.440675", "39.939640", 0], ["116.440609", "39.941181", 0], ["116.440563", "39.942114", 0], ["116.440553", "39.942264", 0], ["116.440509", "39.943285", 0], ["116.440446", "39.944815", 0], ["116.440347", "39.947009", 0], ["116.440275", "39.949320", 0], ["116.440291", "39.949821", 0], ["116.440322", "39.950905", 0], ["116.440309", "39.951048", 0], ["116.440315", "39.951350", 0], ["116.440344", "39.952350", 0], ["116.440343", "39.952484", 0], ["116.438276", "39.955607", 0], ["116.437094", "39.955816", 0], ["116.435638", "39.955792", 0], ["116.435177", "39.955786", 0], ["116.434470", "39.955773", 0], ["116.430681", "39.955711", 0], ["116.427758", "39.955671", 0], ["116.426977", "39.955654", 0], ["116.426766", "39.955651", 0], ["116.426435", "39.955648", 0], ["116.425105", "39.955621", 0], ["116.421619", "39.955556", 0], ["116.418171", "39.955490", 0], ["116.414766", "39.955462", 0], ["116.410814", "39.955458", 0], ["116.406925", "39.955431", 0], ["116.402176", "39.955374", 0], ["116.400467", "39.955354", 0], ["116.400270", "39.955352", 0], ["116.397776", "39.955335", 0], ["116.396883", "39.955320", 0], ["116.396284", "39.955310", 0], ["116.391650", "39.955213", 0], ["116.388423", "39.955144", 0], ["116.386054", "39.955099", 0], ["116.384483", "39.955040", 0], ["116.382831", "39.954981", 0], ["116.382383", "39.954965", 0], ["116.381459", "39.954917", 0], ["116.378012", "39.954641", 0], ["116.375494", "39.953935", 0], ["116.374771", "39.953644", 0], ["116.372932", "39.952841", 0], ["116.371970", "39.952421", 0], ["116.370419", "39.951940", 0], ["116.367191", "39.950978", 0], ["116.366170", "39.950680", 0], ["116.366083", "39.950655", 0], ["116.365591", "39.950509", 0], ["116.361928", "39.948586", 0], ["116.361967", "39.947731", 0], ["116.362032", "39.946246", 0], ["116.362053", "39.943655", 0], ["116.362170", "39.941876", 0], ["116.362181", "39.941266", 0], ["116.362336", "39.938210", 0], ["116.362489", "39.935104", 0], ["116.362546", "39.933335", 0], ["116.362617", "39.931677", 0], ["116.362621", "39.931422", 0], ["116.362668", "39.930570", 0], ["116.362726", "39.929455", 0], ["116.362786", "39.928375", 0], ["116.362811", "39.927908", 0], ["116.362845", "39.927300", 0], ["116.362860", "39.926697", 0], ["116.363037", "39.923706", 0], ["116.363083", "39.922439", 0], ["116.363115", "39.921784", 0], ["116.363210", "39.919724", 0], ["116.363234", "39.916692", 0], ["116.363170", "39.916124", 0], ["116.363105", "39.914178", 0], ["116.363158", "39.913017", 0], ["116.363210", "39.911812", 0], ["116.363277", "39.910069", 0], ["116.363231", "39.908398", 0], ["116.363247", "39.907031", 0], ["116.363260", "39.906804", 0], ["116.363276", "39.906523", 0], ["116.363057", "39.905419", 0], ["116.360762", "39.904211", 0], ["116.357967", "39.904007", 0], ["116.357328", "39.903965", 0], ["116.355180", "39.901867", 0], ["116.355231", "39.900434", 0], ["116.355228", "39.900070", 0], ["116.355231", "39.899202", 0], ["116.355242", "39.898325", 0], ["116.355259", "39.897530", 0], ["116.355261", "39.897472", 0], ["116.355274", "39.896488", 0], ["116.355281", "39.895299", 0], ["116.355304", "39.894311", 0], ["116.355323", "39.893709", 0], ["116.355338", "39.892896", 0], ["116.355341", "39.892635", 0], ["116.355353", "39.891327", 0], ["116.355379", "39.889328", 0], ["116.355381", "39.888599", 0], ["116.355390", "39.888385", 0], ["116.355420", "39.887638", 0], ["116.355621", "39.885016", 0], ["116.355850", "39.882375", 0], ["116.355826", "39.880801", 0], ["116.355738", "39.880256", 0], ["116.355595", "39.879221", 0], ["116.355499", "39.878504", 0], ["116.355319", "39.876775", 0], ["116.355702", "39.875349", 0], ["116.356837", "39.874460", 0], ["116.360095", "39.874115", 0], ["116.361516", "39.874107", 0], ["116.363561", "39.874081", 0], ["116.365209", "39.874190", 0], ["116.365449", "39.874209", 0], ["116.366479", "39.874306", 0], ["116.366597", "39.874323", 0], ["116.367043", "39.874384", 0], ["116.370755", "39.875016", 0], ["116.375193", "39.875736", 0], ["116.376808", "39.875904", 0], ["116.378011", "39.876030", 0], ["116.381488", "39.876347", 0], ["116.383279", "39.876498", 0], ["116.384578", "39.876610", 0], ["116.384982", "39.876644", 0], ["116.386605", "39.876787", 0], ["116.388015", "39.876910", 0], ["116.390503", "39.877132", 0], ["116.391317", "39.877192", 0], ["116.392350", "39.877279", 0], ["116.394374", "39.877421", 0], ["116.395746", "39.877515", 0], ["116.396180", "39.877545", 0], ["116.396504", "39.877567", 0], ["116.397429", "39.877628", 0], ["116.400260", "39.877775", 0], ["116.401773", "39.877826", 0], ["116.403841", "39.877919", 0], ["116.405912", "39.877982", 0], ["116.407887", "39.878077", 0], ["116.409628", "39.878204", 0], ["116.410613", "39.878253", 0], ["116.411896", "39.878285", 0], ["116.412908", "39.878308", 0], ["116.413621", "39.878328", 0], ["116.414545", "39.878354", 0], ["116.415307", "39.878348", 0], ["116.416517", "39.878369", 0], ["116.418634", "39.878412", 0], ["116.420226", "39.878440", 0], ["116.420545", "39.878448", 0], ["116.421641", "39.878355", 0], ["116.421709", "39.878340", 0], ["116.422258", "39.878123", 0], ["116.423074", "39.877718", 0], ["116.426273", "39.877270", 0], ["116.426727", "39.877289", 0], ["116.427368", "39.877328", 0], ["116.427484", "39.877331", 0], ["116.427622", "39.877338", 0], ["116.428028", "39.877356", 0], ["116.428454", "39.877377", 0], ["116.429088", "39.877411", 0], ["116.429862", "39.877426", 0], ["116.431068", "39.877408", 0], ["116.434706", "39.877210", 0], ["116.436790", "39.877053", 0], ["116.437244", "39.877012", 0], ["116.439287", "39.876871", 0], ["116.439955", "39.876826", 0], ["116.441024", "39.876748", 0], ["116.441403", "39.876726", 0], ["116.441881", "39.876695", 0], ["116.442122", "39.876678", 0], ["116.442315", "39.876664", 0], ["116.443333", "39.876590", 0], ["116.443841", "39.876549", 0], ["116.446124", "39.876387", 0], ["116.447569", "39.876293", 0], ["116.448502", "39.876345", 0], ["116.449349", "39.876593", 0], ["116.449882", "39.876878", 0], ["116.450456", "39.877499", 0], ["116.450527", "39.877617", 0], ["116.450885", "39.878793", 0], ["116.451306", "39.880522", 0], ["116.451387", "39.880748", 0], ["116.451685", "39.881578", 0], ["116.452358", "39.882953", 0], ["116.452613", "39.886537", 0], ["116.452577", "39.886829", 0], ["116.452304", "39.888168", 0], ["116.452246", "39.888527", 0], ["116.452143", "39.889167", 0]];

exports.default = {
    paths: paths
};

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _webgl = __webpack_require__(6);

var _webgl2 = _interopRequireDefault(_webgl);

var _path = __webpack_require__(13);

var _path2 = _interopRequireDefault(_path);

var _mercatorPorjection = __webpack_require__(5);

var _mercatorPorjection2 = _interopRequireDefault(_mercatorPorjection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mercatorProjection = new _mercatorPorjection2.default();
// console.log(data);


var app = void 0;
var heatMap = void 0;
var thumbnailCanvas = void 0;

var maxX = -Infinity;
var minX = Infinity;
var maxY = -Infinity;
var minY = Infinity;
var usePerPixel = 0;
window.onload = function () {
    app = window.app = new _webgl2.default('canvas');
    // x
    app.Path({
        path: [[520, 520, 0], [520, 100 + 520, 0]],
        color: '#f00'
    });

    // y
    app.Path({
        path: [[520, 520, 0], [100 + 520, 520, 0]],
        color: '#0f0'
    });

    // z
    app.Path({
        path: [[520, 520, 0], [520, 520, 100]],
        color: '#00f'
    });
    draw();
};

function getColorData() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = '255';
    canvas.height = '1';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.zIndex = '100';
    var grandient = ctx.createLinearGradient(0, 0, 255, 0);
    grandient.addColorStop(.25, "rgb(0,0,255)");
    grandient.addColorStop(0.5, "rgb(0,255,0)");
    grandient.addColorStop(0.75, "yellow");
    grandient.addColorStop(1, "rgb(250,0,0)");
    ctx.fillStyle = grandient;
    ctx.fillRect(0, 0, 255, 1);
    var colordata = ctx.getImageData(0, 0, 255, 1).data;
    return colordata;
}

function draw(data, isMct) {
    // color  data
    var colordata = getColorData();

    // otherdata 
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = '512';
    canvas.height = '512';
    canvas.style.width = '200px';
    canvas.style.height = '200px';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.zIndex = '100';
    canvas.className = 'thumbnailCanvas';
    document.body.appendChild(canvas);
    thumbnailCanvas && document.body.removeChild(thumbnailCanvas);
    thumbnailCanvas = canvas;

    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.shadowColor = 'rgba(0,0,0, 0.05)';
    ctx.shadowOffsetX = 10000;
    ctx.shadowBlur = 8;

    if (!data) {
        for (var i = 0; i < 500; i++) {
            ctx.fillRect((Math.random() * 512 | 0) - 10000, Math.random() * 512 | 0, Math.random() * 18 + 8, Math.random() * 18 + 8);
        }
    } else {
        maxX = -Infinity;
        minX = Infinity;
        maxY = -Infinity;
        minY = Infinity;
        data.forEach(function (item) {
            maxX = Math.max(maxX, item.x);
            minX = Math.min(minX, item.x);
            maxY = Math.max(maxY, item.y);
            minY = Math.min(minY, item.y);
        });
        console.log(maxX);
        var preX = 512 / (maxX - minX);
        var preY = 512 / (maxY - minY);
        usePerPixel = Math.min(preX, preY);
        // by graph
        var graph = {};

        var graphMax = 0;
        data.forEach(function (item) {
            var x = (item.x - minX) * usePerPixel | 0;
            var y = (item.y - minY) * usePerPixel | 0;
            graph[x + '_' + y] = graph[x + '_' + y] || {
                value: 0,
                x: x,
                y: y
            };
            graph[x + '_' + y].value++;
            graphMax = Math.max(graphMax, graph[x + '_' + y].value);
        });
        Object.keys(graph).forEach(function (key) {
            var basic = 0;
            var level = graph[key].value - basic < 0 ? 0 : (graph[key].value - basic) / (graphMax - basic);
            level = Math.max(0.1, level);
            ctx.fillStyle = 'rgba(255,255,255,' + level + ')';
            ctx.beginPath();
            ctx.fillRect(graph[key].x - 10000, 512 - graph[key].y, ctx.shadowBlur, ctx.shadowBlur);
        });
    }

    // img data
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var alphaImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var canvasData = imgData.data;
    for (var i = 0; i < canvasData.length; i += 4) {
        var index = Math.min(254, canvasData[i + 3] * 10);
        canvasData[i] = colordata[index * 4];
        canvasData[i + 1] = colordata[index * 4 + 1];
        canvasData[i + 2] = colordata[index * 4 + 2];
        canvasData[i + 3] = colordata[index * 4 + 3];
    }
    ctx.putImageData(imgData, 0, 0);

    //
    if (heatMap) {
        heatMap.update({
            alphaImageData: alphaImageData,
            imgData: imgData
        });
    } else {
        heatMap = app.HeatMap({
            alphaImageData: alphaImageData,
            imgData: imgData
        });
    }
}

// for drop
window.ondragover = function (e) {
    e.preventDefault();
};

window.ondragend = function (e) {
    e.preventDefault();
};

var datas = [];
window.ondrop = function (e) {
    e.preventDefault();
    var files = e.dataTransfer.files;

    Object.keys(files).forEach(function (id) {
        var read = new FileReader();
        read.onload = function (e) {
            var jsonData = JSON.parse(e.target.result).filter(function (item) {
                console.log(item);
                return item.x > 10 && item.y > 10;
            });
            datas.push({
                name: files[id],
                datas: jsonData
            });
            updateList();
        };
        read.readAsText(files[id]);
    });
};

function updateList() {
    var ul = document.getElementById('ul');
    var newData = datas.map(function (data, index) {
        return '<li data-id=' + index + '>' + data.name.name + '</li>';
    });
    ul.innerHTML = newData.join('');
}

document.getElementById('ul').onclick = function (e) {
    // console.log(datas[e.target.dataset.id]);
    draw(datas[e.target.dataset.id].datas, true);
};

// for draw area
var pickCanvas = document.createElement('canvas');
var pickCanvasCtx = pickCanvas.getContext('2d');
pickCanvas.style.position = 'absolute';
pickCanvas.style.top = pickCanvas.style.left = 0;
pickCanvas.width = pickCanvas.height = 512;
pickCanvas.style.width = pickCanvas.style.height = '512px';
pickCanvas.style.display = 'none';
pickCanvas.style.zIndex = '10000';
var pickPoints = [];

document.body.appendChild(pickCanvas);
document.body.onclick = function (e) {
    if (e.target == thumbnailCanvas) {
        thumbnailCanvas.style.width = '512px';
        thumbnailCanvas.style.height = '512px';
        pickCanvas.style.display = 'block';
        pickPoints = [];
        drawPick();
    }
};

pickCanvas.onclick = function (e) {
    pickPoints.push([e.offsetX, e.offsetY]);
    drawPick();
};

function drawPick() {
    var ctx = pickCanvasCtx;
    if (!ctx) return false;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    pickPoints.forEach(function (point, index) {
        if (index === 0) {
            ctx.moveTo(point[0], point[1]);
        } else {
            ctx.lineTo(point[0], point[1]);
        }
    });
    ctx.stroke();
}

window.onkeyup = function (e) {
    if (e.keyCode === 27 && pickPoints.length > 1) {
        var mc = [];
        for (var i = 0; i < pickPoints.length; i++) {
            mc.push(minX + pickPoints[i][0] / usePerPixel, minY + (512 - pickPoints[i][1]) / usePerPixel);
        }
        location.hash = mc.join(',');
        pickPoints = [];
        pickCanvas.style.display = 'none';
        thumbnailCanvas.style.width = '200px';
        thumbnailCanvas.style.height = '200px';
    }
};

/***/ })
/******/ ]);