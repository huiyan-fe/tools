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

var OBJ = function () {
    function OBJ(GL, obj) {
        _classCallCheck(this, OBJ);

        this.GL = GL;
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
                var id = this.opearteID = this.opearteID;
                this.operate.push({
                    id: id++,
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
            var vertexColorBuffer = this.gl.buffers('vcBuffer');
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
                // prepare for the pathsDistances
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
            // console.log(pathDistances)
            pathDistances.forEach(function (dist) {
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

            if (this.obj.texture) {
                this.gl.uniform1i(this.gl.uUseTexture, true);
                // texture
                var texture = gl.textures('text');
                gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.activeTexture(gl.TEXTURE0);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.obj.texture);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                gl.uniform1i(gl.uSampler, 0);
                // // texture coordinate
                var textureBufferObject = this.gl.buffers('textureBuffer');
                gl.bindBuffer(gl.ARRAY_BUFFER, textureBufferObject);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coords), gl.STATIC_DRAW);
                gl.vertexAttribPointer(gl.aVertexTextureCoords, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(gl.aVertexTextureCoords);
                gl.bindBuffer(gl.ARRAY_BUFFER, null);
            }

            // set mv
            this.updateOpearte();
            //

            gl.uniformMatrix4fv(this.gl.uMVMatrix, false, this.opearteBuild.result);
            // gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.verticesColors.length / 6);
            // console.log(this.indices.length)

            gl.drawElements(gl.TRIANGLE_STRIP, 516 || this.indices.length, gl.UNSIGNED_SHORT, 0);
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

var Belt = function (_Obj) {
    _inherits(Belt, _Obj);

    function Belt(GL, obj) {
        _classCallCheck(this, Belt);

        var _this = _possibleConstructorReturn(this, (Belt.__proto__ || Object.getPrototypeOf(Belt)).call(this, GL, obj));

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
                _this.verticesColors.push(xPixel, yPixel, obj.alphaImageData.data[imgDataIndex + 3] * 3, obj.imgData.data[imgDataIndex] / 255, obj.imgData.data[imgDataIndex + 1] / 255, obj.imgData.data[imgDataIndex + 2] / 255, 0);
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

    _createClass(Belt, [{
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

    return Belt;
}(_Object2.default);

exports.default = Belt;

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

    gl.aVertexTextureCoords = gl.getUniformLocation(program, "aVertexTextureCoords");
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
var hotDate = [["1", 10, "1"], ["1", 11, "1"], ["1", 17, "1"], ["1", 18, "1"], ["1", 19, "2"], ["1", 20, "2"], ["1", 22, "1"], ["1", 23, "1"], ["1", 24, "2"], ["1", 25, "2"], ["1", 26, "4"], ["1", 27, "2"], ["1", 28, "2"], ["1", 29, "1"], ["1", 30, "1"], ["1", 31, "2"], ["1", 32, "2"], ["1", 33, "1"], ["1", 34, "1"], ["1", 35, "1"], ["1", 36, "2"], ["1", 37, "2"], ["1", 38, "2"], ["1", 39, "2"], ["1", 40, "1"], ["1", 41, "1"], ["1", 42, "2"], ["1", 43, "2"], ["1", 44, "1"], ["1", 45, "3"], ["1", 46, "4"], ["1", 47, "3"], ["1", 48, "3"], ["1", 49, "2"], ["1", 50, "1"], ["1", 51, "2"], ["1", 52, "2"], ["1", 53, "1"], ["1", 54, "2"], ["1", 55, "4"], ["1", 56, "4"], ["1", 57, "7"], ["1", 58, "7"], ["1", 59, "8"], ["1", 60, "8"], ["1", 61, "5"], ["1", 62, "5"], ["1", 63, "4"], ["1", 64, "5"], ["1", 65, "3"], ["1", 66, "5"], ["1", 67, "5"], ["1", 68, "3"], ["1", 69, "1"], ["1", 70, "3"], ["1", 73, "1"], ["1", 74, "1"], ["1", 75, "1"], ["1", 76, "2"], ["1", 77, "6"], ["1", 78, "2"], ["1", 79, "2"], ["1", 80, "3"], ["1", 81, "2"], ["1", 82, "2"], ["1", 83, "5"], ["1", 84, "5"], ["1", 85, "7"], ["1", 86, "3"], ["1", 87, "6"], ["1", 88, "13"], ["1", 89, "18"], ["1", 90, "17"], ["1", 91, "16"], ["1", 92, "15"], ["1", 93, "16"], ["1", 94, "19"], ["1", 95, "20"], ["1", 96, "20"], ["1", 97, "17"], ["1", 98, "19"], ["1", 99, "20"], ["1", 100, "20"], ["1", 101, "20"], ["1", 102, "20"], ["1", 103, "20"], ["1", 104, "22"], ["1", 105, "21"], ["1", 106, "22"], ["1", 107, "22"], ["1", 108, "21"], ["1", 109, "20"], ["1", 110, "19"], ["1", 111, "22"], ["1", 112, "21"], ["1", 113, "23"], ["1", 114, "21"], ["1", 115, "21"], ["1", 116, "23"], ["1", 117, "23"], ["1", 118, "22"], ["1", 119, "21"], ["1", 120, "22"], ["1", 121, "23"], ["1", 122, "23"], ["1", 123, "21"], ["1", 124, "22"], ["1", 125, "19"], ["1", 126, "21"], ["1", 127, "23"], ["1", 128, "22"], ["1", 129, "23"], ["1", 130, "23"], ["1", 131, "22"], ["1", 132, "22"], ["1", 133, "23"], ["1", 134, "22"], ["1", 135, "22"], ["1", 136, "22"], ["1", 137, "21"], ["1", 138, "21"], ["1", 139, "22"], ["1", 140, "22"], ["1", 141, "22"], ["1", 142, "23"], ["1", 143, "23"], ["1", 144, "23"], ["1", 145, "23"], ["1", 146, "22"], ["1", 147, "23"], ["1", 148, "22"], ["1", 149, "22"], ["1", 150, "20"], ["1", 151, "20"], ["1", 152, "15"], ["1", 153, "13"], ["1", 154, "9"], ["1", 155, "5"], ["1", 156, "5"], ["1", 157, "5"], ["1", 158, "4"], ["1", 159, "4"], ["1", 160, "4"], ["1", 161, "5"], ["1", 162, "6"], ["1", 163, "7"], ["1", 164, "8"], ["1", 165, "9"], ["1", 166, "9"], ["1", 167, "13"], ["1", 168, "12"], ["1", 169, "15"], ["1", 170, "16"], ["1", 171, "14"], ["1", 172, "14"], ["1", 173, "14"], ["1", 174, "14"], ["1", 175, "12"], ["1", 176, "8"], ["1", 177, "9"], ["1", 178, "8"], ["1", 179, "6"], ["1", 180, "6"], ["1", 181, "4"], ["1", 182, "4"], ["1", 183, "4"], ["1", 184, "4"], ["1", 185, "4"], ["1", 186, "4"], ["1", 187, "2"], ["1", 188, "2"], ["2", 10, "1"], ["2", 11, "1"], ["2", 17, "1"], ["2", 18, "1"], ["2", 19, "2"], ["2", 20, "2"], ["2", 22, "1"], ["2", 23, "1"], ["2", 24, "2"], ["2", 25, "2"], ["2", 26, "4"], ["2", 27, "2"], ["2", 28, "2"], ["2", 29, "1"], ["2", 30, "1"], ["2", 31, "2"], ["2", 32, "2"], ["2", 33, "1"], ["2", 34, "1"], ["2", 35, "1"], ["2", 36, "2"], ["2", 37, "2"], ["2", 38, "2"], ["2", 39, "2"], ["2", 40, "1"], ["2", 41, "1"], ["2", 42, "2"], ["2", 43, "2"], ["2", 44, "1"], ["2", 45, "3"], ["2", 46, "4"], ["2", 47, "3"], ["2", 48, "3"], ["2", 49, "2"], ["2", 50, "1"], ["2", 51, "2"], ["2", 52, "2"], ["2", 53, "1"], ["2", 54, "2"], ["2", 55, "4"], ["2", 56, "4"], ["2", 57, "7"], ["2", 58, "7"], ["2", 59, "8"], ["2", 60, "8"], ["2", 61, "5"], ["2", 62, "5"], ["2", 63, "4"], ["2", 64, "5"], ["2", 65, "3"], ["2", 66, "5"], ["2", 67, "5"], ["2", 68, "3"], ["2", 69, "1"], ["2", 70, "3"], ["2", 73, "1"], ["2", 74, "1"], ["2", 75, "1"], ["2", 76, "2"], ["2", 77, "6"], ["2", 78, "2"], ["2", 79, "2"], ["2", 80, "3"], ["2", 81, "2"], ["2", 82, "2"], ["2", 83, "5"], ["2", 84, "5"], ["2", 85, "7"], ["2", 86, "3"], ["2", 87, "6"], ["2", 88, "13"], ["2", 89, "18"], ["2", 90, "17"], ["2", 91, "16"], ["2", 92, "15"], ["2", 93, "16"], ["2", 94, "19"], ["2", 95, "20"], ["2", 96, "20"], ["2", 97, "17"], ["2", 98, "19"], ["2", 99, "20"], ["2", 100, "20"], ["2", 101, "20"], ["2", 102, "20"], ["2", 103, "20"], ["2", 104, "22"], ["2", 105, "21"], ["2", 106, "22"], ["2", 107, "22"], ["2", 108, "21"], ["2", 109, "20"], ["2", 110, "19"], ["2", 111, "22"], ["2", 112, "21"], ["2", 113, "23"], ["2", 114, "21"], ["2", 115, "21"], ["2", 116, "23"], ["2", 117, "23"], ["2", 118, "22"], ["2", 119, "21"], ["2", 120, "22"], ["2", 121, "23"], ["2", 122, "23"], ["2", 123, "21"], ["2", 124, "22"], ["2", 125, "19"], ["2", 126, "21"], ["2", 127, "23"], ["2", 128, "22"], ["2", 129, "23"], ["2", 130, "23"], ["2", 131, "22"], ["2", 132, "22"], ["2", 133, "23"], ["2", 134, "22"], ["2", 135, "22"], ["2", 136, "22"], ["2", 137, "21"], ["2", 138, "21"], ["2", 139, "22"], ["2", 140, "22"], ["2", 141, "22"], ["2", 142, "23"], ["2", 143, "23"], ["2", 144, "23"], ["2", 145, "23"], ["2", 146, "22"], ["2", 147, "23"], ["2", 148, "22"], ["2", 149, "22"], ["2", 150, "20"], ["2", 151, "20"], ["2", 152, "15"], ["2", 153, "13"], ["2", 154, "9"], ["2", 155, "5"], ["2", 156, "5"], ["2", 157, "5"], ["2", 158, "4"], ["2", 159, "4"], ["2", 160, "4"], ["2", 161, "5"], ["2", 162, "6"], ["2", 163, "7"], ["2", 164, "8"], ["2", 165, "9"], ["2", 166, "9"], ["2", 167, "13"], ["2", 168, "12"], ["2", 169, "15"], ["2", 170, "16"], ["2", 171, "14"], ["2", 172, "14"], ["2", 173, "14"], ["2", 174, "14"], ["2", 175, "12"], ["2", 176, "8"], ["2", 177, "9"], ["2", 178, "8"], ["2", 179, "6"], ["2", 180, "6"], ["2", 181, "4"], ["2", 182, "4"], ["2", 183, "4"], ["2", 184, "4"], ["2", 185, "4"], ["2", 186, "4"], ["2", 187, "2"], ["2", 188, "2"], ["3", 10, "1"], ["3", 11, "1"], ["3", 17, "1"], ["3", 18, "1"], ["3", 19, "2"], ["3", 20, "2"], ["3", 22, "1"], ["3", 23, "1"], ["3", 24, "2"], ["3", 25, "2"], ["3", 26, "4"], ["3", 27, "2"], ["3", 28, "2"], ["3", 29, "1"], ["3", 30, "1"], ["3", 31, "2"], ["3", 32, "2"], ["3", 33, "1"], ["3", 34, "1"], ["3", 35, "1"], ["3", 36, "2"], ["3", 37, "2"], ["3", 38, "2"], ["3", 39, "2"], ["3", 40, "1"], ["3", 41, "1"], ["3", 42, "2"], ["3", 43, "2"], ["3", 44, "1"], ["3", 45, "3"], ["3", 46, "4"], ["3", 47, "3"], ["3", 48, "3"], ["3", 49, "2"], ["3", 50, "1"], ["3", 51, "2"], ["3", 52, "2"], ["3", 53, "1"], ["3", 54, "2"], ["3", 55, "4"], ["3", 56, "4"], ["3", 57, "7"], ["3", 58, "7"], ["3", 59, "8"], ["3", 60, "8"], ["3", 61, "5"], ["3", 62, "5"], ["3", 63, "4"], ["3", 64, "5"], ["3", 65, "3"], ["3", 66, "5"], ["3", 67, "5"], ["3", 68, "3"], ["3", 69, "1"], ["3", 70, "3"], ["3", 73, "1"], ["3", 74, "1"], ["3", 75, "1"], ["3", 76, "2"], ["3", 77, "6"], ["3", 78, "2"], ["3", 79, "2"], ["3", 80, "3"], ["3", 81, "2"], ["3", 82, "2"], ["3", 83, "5"], ["3", 84, "5"], ["3", 85, "7"], ["3", 86, "3"], ["3", 87, "6"], ["3", 88, "13"], ["3", 89, "18"], ["3", 90, "17"], ["3", 91, "16"], ["3", 92, "15"], ["3", 93, "16"], ["3", 94, "19"], ["3", 95, "20"], ["3", 96, "20"], ["3", 97, "17"], ["3", 98, "19"], ["3", 99, "20"], ["3", 100, "20"], ["3", 101, "20"], ["3", 102, "20"], ["3", 103, "20"], ["3", 104, "22"], ["3", 105, "21"], ["3", 106, "22"], ["3", 107, "22"], ["3", 108, "21"], ["3", 109, "20"], ["3", 110, "19"], ["3", 111, "22"], ["3", 112, "21"], ["3", 113, "23"], ["3", 114, "21"], ["3", 115, "21"], ["3", 116, "23"], ["3", 117, "23"], ["3", 118, "22"], ["3", 119, "21"], ["3", 120, "22"], ["3", 121, "23"], ["3", 122, "23"], ["3", 123, "21"], ["3", 124, "22"], ["3", 125, "19"], ["3", 126, "21"], ["3", 127, "23"], ["3", 128, "22"], ["3", 129, "23"], ["3", 130, "23"], ["3", 131, "22"], ["3", 132, "22"], ["3", 133, "23"], ["3", 134, "22"], ["3", 135, "22"], ["3", 136, "22"], ["3", 137, "21"], ["3", 138, "21"], ["3", 139, "22"], ["3", 140, "22"], ["3", 141, "22"], ["3", 142, "23"], ["3", 143, "23"], ["3", 144, "23"], ["3", 145, "23"], ["3", 146, "22"], ["3", 147, "23"], ["3", 148, "22"], ["3", 149, "22"], ["3", 150, "20"], ["3", 151, "20"], ["3", 152, "15"], ["3", 153, "13"], ["3", 154, "9"], ["3", 155, "5"], ["3", 156, "5"], ["3", 157, "5"], ["3", 158, "4"], ["3", 159, "4"], ["3", 160, "4"], ["3", 161, "5"], ["3", 162, "6"], ["3", 163, "7"], ["3", 164, "8"], ["3", 165, "9"], ["3", 166, "9"], ["3", 167, "13"], ["3", 168, "12"], ["3", 169, "15"], ["3", 170, "16"], ["3", 171, "14"], ["3", 172, "14"], ["3", 173, "14"], ["3", 174, "14"], ["3", 175, "12"], ["3", 176, "8"], ["3", 177, "9"], ["3", 178, "8"], ["3", 179, "6"], ["3", 180, "6"], ["3", 181, "4"], ["3", 182, "4"], ["3", 183, "4"], ["3", 184, "4"], ["3", 185, "4"], ["3", 186, "4"], ["3", 187, "2"], ["3", 188, "2"], ["4", 10, "1"], ["4", 11, "1"], ["4", 17, "1"], ["4", 18, "1"], ["4", 19, "2"], ["4", 20, "2"], ["4", 22, "1"], ["4", 23, "1"], ["4", 24, "2"], ["4", 25, "2"], ["4", 26, "4"], ["4", 27, "2"], ["4", 28, "2"], ["4", 29, "1"], ["4", 30, "1"], ["4", 31, "2"], ["4", 32, "2"], ["4", 33, "1"], ["4", 34, "1"], ["4", 35, "1"], ["4", 36, "2"], ["4", 37, "2"], ["4", 38, "2"], ["4", 39, "2"], ["4", 40, "1"], ["4", 41, "1"], ["4", 42, "2"], ["4", 43, "2"], ["4", 44, "1"], ["4", 45, "3"], ["4", 46, "4"], ["4", 47, "3"], ["4", 48, "3"], ["4", 49, "2"], ["4", 50, "1"], ["4", 51, "2"], ["4", 52, "2"], ["4", 53, "1"], ["4", 54, "2"], ["4", 55, "4"], ["4", 56, "4"], ["4", 57, "7"], ["4", 58, "7"], ["4", 59, "8"], ["4", 60, "8"], ["4", 61, "5"], ["4", 62, "5"], ["4", 63, "4"], ["4", 64, "5"], ["4", 65, "3"], ["4", 66, "5"], ["4", 67, "5"], ["4", 68, "3"], ["4", 69, "1"], ["4", 70, "3"], ["4", 73, "1"], ["4", 74, "1"], ["4", 75, "1"], ["4", 76, "2"], ["4", 77, "6"], ["4", 78, "2"], ["4", 79, "2"], ["4", 80, "3"], ["4", 81, "2"], ["4", 82, "2"], ["4", 83, "5"], ["4", 84, "5"], ["4", 85, "7"], ["4", 86, "3"], ["4", 87, "6"], ["4", 88, "13"], ["4", 89, "18"], ["4", 90, "17"], ["4", 91, "16"], ["4", 92, "15"], ["4", 93, "16"], ["4", 94, "19"], ["4", 95, "20"], ["4", 96, "20"], ["4", 97, "17"], ["4", 98, "19"], ["4", 99, "20"], ["4", 100, "20"], ["4", 101, "20"], ["4", 102, "20"], ["4", 103, "20"], ["4", 104, "22"], ["4", 105, "21"], ["4", 106, "22"], ["4", 107, "22"], ["4", 108, "21"], ["4", 109, "20"], ["4", 110, "19"], ["4", 111, "22"], ["4", 112, "21"], ["4", 113, "23"], ["4", 114, "21"], ["4", 115, "21"], ["4", 116, "23"], ["4", 117, "23"], ["4", 118, "22"], ["4", 119, "21"], ["4", 120, "22"], ["4", 121, "23"], ["4", 122, "23"], ["4", 123, "21"], ["4", 124, "22"], ["4", 125, "19"], ["4", 126, "21"], ["4", 127, "23"], ["4", 128, "22"], ["4", 129, "23"], ["4", 130, "23"], ["4", 131, "22"], ["4", 132, "22"], ["4", 133, "23"], ["4", 134, "22"], ["4", 135, "22"], ["4", 136, "22"], ["4", 137, "21"], ["4", 138, "21"], ["4", 139, "22"], ["4", 140, "22"], ["4", 141, "22"], ["4", 142, "23"], ["4", 143, "23"], ["4", 144, "23"], ["4", 145, "23"], ["4", 146, "22"], ["4", 147, "23"], ["4", 148, "22"], ["4", 149, "22"], ["4", 150, "20"], ["4", 151, "20"], ["4", 152, "15"], ["4", 153, "13"], ["4", 154, "9"], ["4", 155, "5"], ["4", 156, "5"], ["4", 157, "5"], ["4", 158, "4"], ["4", 159, "4"], ["4", 160, "4"], ["4", 161, "5"], ["4", 162, "6"], ["4", 163, "7"], ["4", 164, "8"], ["4", 165, "9"], ["4", 166, "9"], ["4", 167, "13"], ["4", 168, "12"], ["4", 169, "15"], ["4", 170, "16"], ["4", 171, "14"], ["4", 172, "14"], ["4", 173, "14"], ["4", 174, "14"], ["4", 175, "12"], ["4", 176, "8"], ["4", 177, "9"], ["4", 178, "8"], ["4", 179, "6"], ["4", 180, "6"], ["4", 181, "4"], ["4", 182, "4"], ["4", 183, "4"], ["4", 184, "4"], ["4", 185, "4"], ["4", 186, "4"], ["4", 187, "2"], ["4", 188, "2"], ["5", 10, "1"], ["5", 11, "1"], ["5", 17, "1"], ["5", 18, "1"], ["5", 19, "2"], ["5", 20, "2"], ["5", 22, "1"], ["5", 23, "1"], ["5", 24, "2"], ["5", 25, "2"], ["5", 26, "4"], ["5", 27, "2"], ["5", 28, "2"], ["5", 29, "1"], ["5", 30, "1"], ["5", 31, "2"], ["5", 32, "2"], ["5", 33, "1"], ["5", 34, "1"], ["5", 35, "1"], ["5", 36, "2"], ["5", 37, "2"], ["5", 38, "2"], ["5", 39, "2"], ["5", 40, "1"], ["5", 41, "1"], ["5", 42, "2"], ["5", 43, "2"], ["5", 44, "1"], ["5", 45, "3"], ["5", 46, "4"], ["5", 47, "3"], ["5", 48, "3"], ["5", 49, "2"], ["5", 50, "1"], ["5", 51, "2"], ["5", 52, "2"], ["5", 53, "1"], ["5", 54, "2"], ["5", 55, "4"], ["5", 56, "4"], ["5", 57, "7"], ["5", 58, "7"], ["5", 59, "8"], ["5", 60, "8"], ["5", 61, "5"], ["5", 62, "5"], ["5", 63, "4"], ["5", 64, "5"], ["5", 65, "3"], ["5", 66, "5"], ["5", 67, "5"], ["5", 68, "3"], ["5", 69, "1"], ["5", 70, "3"], ["5", 73, "1"], ["5", 74, "1"], ["5", 75, "1"], ["5", 76, "2"], ["5", 77, "6"], ["5", 78, "2"], ["5", 79, "2"], ["5", 80, "3"], ["5", 81, "2"], ["5", 82, "2"], ["5", 83, "5"], ["5", 84, "5"], ["5", 85, "7"], ["5", 86, "3"], ["5", 87, "6"], ["5", 88, "13"], ["5", 89, "18"], ["5", 90, "17"], ["5", 91, "16"], ["5", 92, "15"], ["5", 93, "16"], ["5", 94, "19"], ["5", 95, "20"], ["5", 96, "20"], ["5", 97, "17"], ["5", 98, "19"], ["5", 99, "20"], ["5", 100, "20"], ["5", 101, "20"], ["5", 102, "20"], ["5", 103, "20"], ["5", 104, "22"], ["5", 105, "21"], ["5", 106, "22"], ["5", 107, "22"], ["5", 108, "21"], ["5", 109, "20"], ["5", 110, "19"], ["5", 111, "22"], ["5", 112, "21"], ["5", 113, "23"], ["5", 114, "21"], ["5", 115, "21"], ["5", 116, "23"], ["5", 117, "23"], ["5", 118, "22"], ["5", 119, "21"], ["5", 120, "22"], ["5", 121, "23"], ["5", 122, "23"], ["5", 123, "21"], ["5", 124, "22"], ["5", 125, "19"], ["5", 126, "21"], ["5", 127, "23"], ["5", 128, "22"], ["5", 129, "23"], ["5", 130, "23"], ["5", 131, "22"], ["5", 132, "22"], ["5", 133, "23"], ["5", 134, "22"], ["5", 135, "22"], ["5", 136, "22"], ["5", 137, "21"], ["5", 138, "21"], ["5", 139, "22"], ["5", 140, "22"], ["5", 141, "22"], ["5", 142, "23"], ["5", 143, "23"], ["5", 144, "23"], ["5", 145, "23"], ["5", 146, "22"], ["5", 147, "23"], ["5", 148, "22"], ["5", 149, "22"], ["5", 150, "20"], ["5", 151, "20"], ["5", 152, "15"], ["5", 153, "13"], ["5", 154, "9"], ["5", 155, "5"], ["5", 156, "5"], ["5", 157, "5"], ["5", 158, "4"], ["5", 159, "4"], ["5", 160, "4"], ["5", 161, "5"], ["5", 162, "6"], ["5", 163, "7"], ["5", 164, "8"], ["5", 165, "9"], ["5", 166, "9"], ["5", 167, "13"], ["5", 168, "12"], ["5", 169, "15"], ["5", 170, "16"], ["5", 171, "14"], ["5", 172, "14"], ["5", 173, "14"], ["5", 174, "14"], ["5", 175, "12"], ["5", 176, "8"], ["5", 177, "9"], ["5", 178, "8"], ["5", 179, "6"], ["5", 180, "6"], ["5", 181, "4"], ["5", 182, "4"], ["5", 183, "4"], ["5", 184, "4"], ["5", 185, "4"], ["5", 186, "4"], ["5", 187, "2"], ["5", 188, "2"], ["6", 8, "1"], ["6", 16, "1"], ["6", 17, "1"], ["6", 18, "1"], ["6", 19, "1"], ["6", 20, "1"], ["6", 22, "1"], ["6", 24, "1"], ["6", 25, "2"], ["6", 26, "2"], ["6", 27, "1"], ["6", 28, "1"], ["6", 29, "2"], ["6", 30, "1"], ["6", 31, "1"], ["6", 32, "1"], ["6", 33, "1"], ["6", 34, "1"], ["6", 35, "1"], ["6", 36, "2"], ["6", 37, "1"], ["6", 38, "2"], ["6", 39, "2"], ["6", 40, "1"], ["6", 41, "1"], ["6", 42, "2"], ["6", 43, "1"], ["6", 44, "1"], ["6", 45, "1"], ["6", 46, "3"], ["6", 47, "1"], ["6", 50, "1"], ["6", 52, "2"], ["6", 54, "1"], ["6", 55, "2"], ["6", 56, "4"], ["6", 57, "4"], ["6", 58, "3"], ["6", 59, "4"], ["6", 60, "3"], ["6", 61, "2"], ["6", 62, "3"], ["6", 63, "4"], ["6", 64, "4"], ["6", 65, "1"], ["6", 66, "1"], ["6", 67, "5"], ["6", 68, "1"], ["6", 69, "1"], ["6", 77, "1"], ["6", 79, "1"], ["6", 83, "1"], ["6", 84, "2"], ["6", 85, "3"], ["6", 86, "4"], ["6", 87, "1"], ["6", 88, "5"], ["6", 89, "8"], ["6", 90, "11"], ["6", 91, "9"], ["6", 92, "12"], ["6", 93, "15"], ["6", 94, "14"], ["6", 95, "14"], ["6", 96, "16"], ["6", 97, "14"], ["6", 98, "15"], ["6", 99, "14"], ["6", 100, "16"], ["6", 101, "18"], ["6", 102, "17"], ["6", 103, "20"], ["6", 104, "20"], ["6", 105, "20"], ["6", 106, "22"], ["6", 107, "23"], ["6", 108, "21"], ["6", 109, "19"], ["6", 110, "19"], ["6", 111, "19"], ["6", 112, "20"], ["6", 113, "22"], ["6", 114, "21"], ["6", 115, "22"], ["6", 116, "20"], ["6", 117, "21"], ["6", 118, "20"], ["6", 119, "20"], ["6", 120, "22"], ["6", 121, "22"], ["6", 122, "23"], ["6", 123, "22"], ["6", 124, "22"], ["6", 125, "19"], ["6", 126, "20"], ["6", 127, "22"], ["6", 128, "23"], ["6", 129, "23"], ["6", 130, "23"], ["6", 131, "21"], ["6", 132, "21"], ["6", 133, "22"], ["6", 134, "21"], ["6", 135, "22"], ["6", 136, "21"], ["6", 137, "20"], ["6", 138, "20"], ["6", 139, "22"], ["6", 140, "22"], ["6", 141, "22"], ["6", 142, "23"], ["6", 143, "23"], ["6", 144, "23"], ["6", 145, "23"], ["6", 146, "23"], ["6", 147, "23"], ["6", 148, "23"], ["6", 149, "23"], ["6", 150, "21"], ["6", 151, "20"], ["6", 152, "20"], ["6", 153, "19"], ["6", 154, "16"], ["6", 155, "12"], ["6", 156, "7"], ["6", 157, "5"], ["6", 158, "5"], ["6", 159, "5"], ["6", 160, "6"], ["6", 161, "6"], ["6", 162, "7"], ["6", 163, "7"], ["6", 164, "8"], ["6", 165, "6"], ["6", 166, "9"], ["6", 167, "13"], ["6", 168, "13"], ["6", 169, "13"], ["6", 170, "13"], ["6", 171, "14"], ["6", 172, "15"], ["6", 173, "15"], ["6", 174, "12"], ["6", 175, "11"], ["6", 176, "10"], ["6", 177, "9"], ["6", 178, "9"], ["6", 179, "7"], ["6", 180, "7"], ["6", 181, "4"], ["6", 182, "4"], ["6", 183, "4"], ["6", 184, "4"], ["6", 185, "5"], ["6", 186, "5"], ["6", 187, "3"], ["6", 188, "2"], ["6", 189, "1"], ["7", 8, "1"], ["7", 16, "1"], ["7", 17, "1"], ["7", 18, "1"], ["7", 19, "1"], ["7", 20, "1"], ["7", 22, "1"], ["7", 24, "1"], ["7", 25, "2"], ["7", 26, "2"], ["7", 27, "1"], ["7", 28, "1"], ["7", 29, "2"], ["7", 30, "1"], ["7", 31, "1"], ["7", 32, "1"], ["7", 33, "1"], ["7", 34, "1"], ["7", 35, "1"], ["7", 36, "2"], ["7", 37, "1"], ["7", 38, "2"], ["7", 39, "2"], ["7", 40, "1"], ["7", 41, "1"], ["7", 42, "2"], ["7", 43, "1"], ["7", 44, "1"], ["7", 45, "1"], ["7", 46, "3"], ["7", 47, "1"], ["7", 50, "1"], ["7", 52, "2"], ["7", 54, "1"], ["7", 55, "2"], ["7", 56, "4"], ["7", 57, "4"], ["7", 58, "3"], ["7", 59, "4"], ["7", 60, "3"], ["7", 61, "2"], ["7", 62, "3"], ["7", 63, "4"], ["7", 64, "4"], ["7", 65, "1"], ["7", 66, "1"], ["7", 67, "5"], ["7", 68, "1"], ["7", 69, "1"], ["7", 77, "1"], ["7", 79, "1"], ["7", 83, "1"], ["7", 84, "2"], ["7", 85, "3"], ["7", 86, "4"], ["7", 87, "1"], ["7", 88, "5"], ["7", 89, "8"], ["7", 90, "11"], ["7", 91, "9"], ["7", 92, "12"], ["7", 93, "15"], ["7", 94, "14"], ["7", 95, "14"], ["7", 96, "16"], ["7", 97, "14"], ["7", 98, "15"], ["7", 99, "14"], ["7", 100, "16"], ["7", 101, "18"], ["7", 102, "17"], ["7", 103, "20"], ["7", 104, "20"], ["7", 105, "20"], ["7", 106, "22"], ["7", 107, "23"], ["7", 108, "21"], ["7", 109, "19"], ["7", 110, "19"], ["7", 111, "19"], ["7", 112, "20"], ["7", 113, "22"], ["7", 114, "21"], ["7", 115, "22"], ["7", 116, "20"], ["7", 117, "21"], ["7", 118, "20"], ["7", 119, "20"], ["7", 120, "22"], ["7", 121, "22"], ["7", 122, "23"], ["7", 123, "22"], ["7", 124, "22"], ["7", 125, "19"], ["7", 126, "20"], ["7", 127, "22"], ["7", 128, "23"], ["7", 129, "23"], ["7", 130, "23"], ["7", 131, "21"], ["7", 132, "21"], ["7", 133, "22"], ["7", 134, "21"], ["7", 135, "22"], ["7", 136, "21"], ["7", 137, "20"], ["7", 138, "20"], ["7", 139, "22"], ["7", 140, "22"], ["7", 141, "22"], ["7", 142, "23"], ["7", 143, "23"], ["7", 144, "23"], ["7", 145, "23"], ["7", 146, "23"], ["7", 147, "23"], ["7", 148, "23"], ["7", 149, "23"], ["7", 150, "21"], ["7", 151, "20"], ["7", 152, "20"], ["7", 153, "19"], ["7", 154, "16"], ["7", 155, "12"], ["7", 156, "7"], ["7", 157, "5"], ["7", 158, "5"], ["7", 159, "5"], ["7", 160, "6"], ["7", 161, "6"], ["7", 162, "7"], ["7", 163, "7"], ["7", 164, "8"], ["7", 165, "6"], ["7", 166, "9"], ["7", 167, "13"], ["7", 168, "13"], ["7", 169, "13"], ["7", 170, "13"], ["7", 171, "14"], ["7", 172, "15"], ["7", 173, "15"], ["7", 174, "12"], ["7", 175, "11"], ["7", 176, "10"], ["7", 177, "9"], ["7", 178, "9"], ["7", 179, "7"], ["7", 180, "7"], ["7", 181, "4"], ["7", 182, "4"], ["7", 183, "4"], ["7", 184, "4"], ["7", 185, "5"], ["7", 186, "5"], ["7", 187, "3"], ["7", 188, "2"], ["7", 189, "1"], ["8", 8, "2"], ["8", 9, "1"], ["8", 10, "1"], ["8", 16, "1"], ["8", 17, "1"], ["8", 18, "1"], ["8", 19, "1"], ["8", 20, "1"], ["8", 24, "2"], ["8", 25, "3"], ["8", 26, "2"], ["8", 27, "2"], ["8", 28, "3"], ["8", 29, "3"], ["8", 30, "1"], ["8", 31, "1"], ["8", 32, "1"], ["8", 33, "2"], ["8", 34, "2"], ["8", 35, "1"], ["8", 36, "2"], ["8", 37, "2"], ["8", 38, "2"], ["8", 39, "2"], ["8", 40, "1"], ["8", 41, "2"], ["8", 42, "2"], ["8", 43, "2"], ["8", 44, "2"], ["8", 45, "1"], ["8", 46, "3"], ["8", 47, "3"], ["8", 48, "2"], ["8", 49, "1"], ["8", 50, "2"], ["8", 51, "2"], ["8", 52, "1"], ["8", 53, "2"], ["8", 54, "3"], ["8", 55, "5"], ["8", 56, "4"], ["8", 57, "4"], ["8", 58, "4"], ["8", 59, "4"], ["8", 60, "5"], ["8", 61, "4"], ["8", 62, "5"], ["8", 63, "4"], ["8", 64, "4"], ["8", 65, "3"], ["8", 66, "1"], ["8", 67, "4"], ["8", 68, "2"], ["8", 69, "1"], ["8", 70, "2"], ["8", 78, "1"], ["8", 79, "2"], ["8", 80, "1"], ["8", 81, "1"], ["8", 82, "1"], ["8", 83, "1"], ["8", 84, "5"], ["8", 85, "3"], ["8", 86, "3"], ["8", 87, "4"], ["8", 88, "7"], ["8", 89, "12"], ["8", 90, "12"], ["8", 91, "12"], ["8", 92, "14"], ["8", 93, "16"], ["8", 94, "14"], ["8", 95, "15"], ["8", 96, "14"], ["8", 97, "15"], ["8", 98, "16"], ["8", 99, "17"], ["8", 100, "18"], ["8", 101, "17"], ["8", 102, "18"], ["8", 103, "21"], ["8", 104, "19"], ["8", 105, "19"], ["8", 106, "22"], ["8", 107, "23"], ["8", 108, "20"], ["8", 109, "18"], ["8", 110, "19"], ["8", 111, "18"], ["8", 112, "19"], ["8", 113, "20"], ["8", 114, "21"], ["8", 115, "21"], ["8", 116, "22"], ["8", 117, "21"], ["8", 118, "19"], ["8", 119, "20"], ["8", 120, "22"], ["8", 121, "22"], ["8", 122, "23"], ["8", 123, "21"], ["8", 124, "22"], ["8", 125, "19"], ["8", 126, "21"], ["8", 127, "22"], ["8", 128, "23"], ["8", 129, "22"], ["8", 130, "21"], ["8", 131, "21"], ["8", 132, "21"], ["8", 133, "22"], ["8", 134, "21"], ["8", 135, "22"], ["8", 136, "21"], ["8", 137, "20"], ["8", 138, "20"], ["8", 139, "22"], ["8", 140, "22"], ["8", 141, "22"], ["8", 142, "23"], ["8", 143, "23"], ["8", 144, "23"], ["8", 145, "22"], ["8", 146, "23"], ["8", 147, "23"], ["8", 148, "23"], ["8", 149, "22"], ["8", 150, "22"], ["8", 151, "22"], ["8", 152, "20"], ["8", 153, "20"], ["8", 154, "19"], ["8", 155, "16"], ["8", 156, "10"], ["8", 157, "8"], ["8", 158, "5"], ["8", 159, "5"], ["8", 160, "5"], ["8", 161, "7"], ["8", 162, "6"], ["8", 163, "5"], ["8", 164, "7"], ["8", 165, "7"], ["8", 166, "15"], ["8", 167, "16"], ["8", 168, "15"], ["8", 169, "12"], ["8", 170, "14"], ["8", 171, "17"], ["8", 172, "18"], ["8", 173, "18"], ["8", 174, "15"], ["8", 175, "16"], ["8", 176, "12"], ["8", 177, "11"], ["8", 178, "10"], ["8", 179, "9"], ["8", 180, "7"], ["8", 181, "5"], ["8", 182, "5"], ["8", 183, "5"], ["8", 184, "6"], ["8", 185, "6"], ["8", 186, "4"], ["8", 187, "4"], ["8", 188, "2"], ["8", 189, "2"], ["8", 190, "1"], ["10", 8, "2"], ["10", 9, "1"], ["10", 10, "1"], ["10", 16, "1"], ["10", 17, "1"], ["10", 18, "1"], ["10", 19, "1"], ["10", 20, "1"], ["10", 24, "2"], ["10", 25, "3"], ["10", 26, "2"], ["10", 27, "2"], ["10", 28, "3"], ["10", 29, "3"], ["10", 30, "1"], ["10", 31, "1"], ["10", 32, "1"], ["10", 33, "2"], ["10", 34, "2"], ["10", 35, "1"], ["10", 36, "2"], ["10", 37, "2"], ["10", 38, "2"], ["10", 39, "2"], ["10", 40, "1"], ["10", 41, "2"], ["10", 42, "2"], ["10", 43, "2"], ["10", 44, "2"], ["10", 45, "1"], ["10", 46, "3"], ["10", 47, "3"], ["10", 48, "2"], ["10", 49, "1"], ["10", 50, "2"], ["10", 51, "2"], ["10", 52, "1"], ["10", 53, "2"], ["10", 54, "3"], ["10", 55, "5"], ["10", 56, "4"], ["10", 57, "4"], ["10", 58, "4"], ["10", 59, "4"], ["10", 60, "5"], ["10", 61, "4"], ["10", 62, "5"], ["10", 63, "4"], ["10", 64, "4"], ["10", 65, "3"], ["10", 66, "1"], ["10", 67, "4"], ["10", 68, "2"], ["10", 69, "1"], ["10", 70, "2"], ["10", 78, "1"], ["10", 79, "2"], ["10", 80, "1"], ["10", 81, "1"], ["10", 82, "1"], ["10", 83, "1"], ["10", 84, "5"], ["10", 85, "3"], ["10", 86, "3"], ["10", 87, "4"], ["10", 88, "7"], ["10", 89, "12"], ["10", 90, "12"], ["10", 91, "12"], ["10", 92, "14"], ["10", 93, "16"], ["10", 94, "14"], ["10", 95, "15"], ["10", 96, "14"], ["10", 97, "15"], ["10", 98, "16"], ["10", 99, "17"], ["10", 100, "18"], ["10", 101, "17"], ["10", 102, "18"], ["10", 103, "21"], ["10", 104, "19"], ["10", 105, "19"], ["10", 106, "22"], ["10", 107, "23"], ["10", 108, "20"], ["10", 109, "18"], ["10", 110, "19"], ["10", 111, "18"], ["10", 112, "19"], ["10", 113, "20"], ["10", 114, "21"], ["10", 115, "21"], ["10", 116, "22"], ["10", 117, "21"], ["10", 118, "19"], ["10", 119, "20"], ["10", 120, "22"], ["10", 121, "22"], ["10", 122, "23"], ["10", 123, "21"], ["10", 124, "22"], ["10", 125, "19"], ["10", 126, "21"], ["10", 127, "22"], ["10", 128, "23"], ["10", 129, "22"], ["10", 130, "21"], ["10", 131, "21"], ["10", 132, "21"], ["10", 133, "22"], ["10", 134, "21"], ["10", 135, "22"], ["10", 136, "21"], ["10", 137, "20"], ["10", 138, "20"], ["10", 139, "22"], ["10", 140, "22"], ["10", 141, "22"], ["10", 142, "23"], ["10", 143, "23"], ["10", 144, "23"], ["10", 145, "22"], ["10", 146, "23"], ["10", 147, "23"], ["10", 148, "23"], ["10", 149, "22"], ["10", 150, "22"], ["10", 151, "22"], ["10", 152, "20"], ["10", 153, "20"], ["10", 154, "19"], ["10", 155, "16"], ["10", 156, "10"], ["10", 157, "8"], ["10", 158, "5"], ["10", 159, "5"], ["10", 160, "5"], ["10", 161, "7"], ["10", 162, "6"], ["10", 163, "5"], ["10", 164, "7"], ["10", 165, "7"], ["10", 166, "15"], ["10", 167, "16"], ["10", 168, "15"], ["10", 169, "12"], ["10", 170, "14"], ["10", 171, "17"], ["10", 172, "18"], ["10", 173, "18"], ["10", 174, "15"], ["10", 175, "16"], ["10", 176, "12"], ["10", 177, "11"], ["10", 178, "10"], ["10", 179, "9"], ["10", 180, "7"], ["10", 181, "5"], ["10", 182, "5"], ["10", 183, "5"], ["10", 184, "6"], ["10", 185, "6"], ["10", 186, "4"], ["10", 187, "4"], ["10", 188, "2"], ["10", 189, "2"], ["10", 190, "1"], ["11", 8, "2"], ["11", 9, "1"], ["11", 10, "1"], ["11", 16, "1"], ["11", 17, "1"], ["11", 18, "1"], ["11", 19, "1"], ["11", 20, "1"], ["11", 24, "2"], ["11", 25, "3"], ["11", 26, "2"], ["11", 27, "2"], ["11", 28, "3"], ["11", 29, "3"], ["11", 30, "1"], ["11", 31, "1"], ["11", 32, "1"], ["11", 33, "2"], ["11", 34, "2"], ["11", 35, "1"], ["11", 36, "2"], ["11", 37, "2"], ["11", 38, "2"], ["11", 39, "2"], ["11", 40, "1"], ["11", 41, "2"], ["11", 42, "2"], ["11", 43, "2"], ["11", 44, "2"], ["11", 45, "1"], ["11", 46, "3"], ["11", 47, "3"], ["11", 48, "2"], ["11", 49, "1"], ["11", 50, "2"], ["11", 51, "2"], ["11", 52, "1"], ["11", 53, "2"], ["11", 54, "3"], ["11", 55, "5"], ["11", 56, "4"], ["11", 57, "4"], ["11", 58, "4"], ["11", 59, "4"], ["11", 60, "5"], ["11", 61, "4"], ["11", 62, "5"], ["11", 63, "4"], ["11", 64, "4"], ["11", 65, "3"], ["11", 66, "1"], ["11", 67, "4"], ["11", 68, "2"], ["11", 69, "1"], ["11", 70, "2"], ["11", 78, "1"], ["11", 79, "2"], ["11", 80, "1"], ["11", 81, "1"], ["11", 82, "1"], ["11", 83, "1"], ["11", 84, "5"], ["11", 85, "3"], ["11", 86, "3"], ["11", 87, "4"], ["11", 88, "7"], ["11", 89, "12"], ["11", 90, "12"], ["11", 91, "12"], ["11", 92, "14"], ["11", 93, "16"], ["11", 94, "14"], ["11", 95, "15"], ["11", 96, "14"], ["11", 97, "15"], ["11", 98, "16"], ["11", 99, "17"], ["11", 100, "18"], ["11", 101, "17"], ["11", 102, "18"], ["11", 103, "21"], ["11", 104, "19"], ["11", 105, "19"], ["11", 106, "22"], ["11", 107, "23"], ["11", 108, "20"], ["11", 109, "18"], ["11", 110, "19"], ["11", 111, "18"], ["11", 112, "19"], ["11", 113, "20"], ["11", 114, "21"], ["11", 115, "21"], ["11", 116, "22"], ["11", 117, "21"], ["11", 118, "19"], ["11", 119, "20"], ["11", 120, "22"], ["11", 121, "22"], ["11", 122, "23"], ["11", 123, "21"], ["11", 124, "22"], ["11", 125, "19"], ["11", 126, "21"], ["11", 127, "22"], ["11", 128, "23"], ["11", 129, "22"], ["11", 130, "21"], ["11", 131, "21"], ["11", 132, "21"], ["11", 133, "22"], ["11", 134, "21"], ["11", 135, "22"], ["11", 136, "21"], ["11", 137, "20"], ["11", 138, "20"], ["11", 139, "22"], ["11", 140, "22"], ["11", 141, "22"], ["11", 142, "23"], ["11", 143, "23"], ["11", 144, "23"], ["11", 145, "22"], ["11", 146, "23"], ["11", 147, "23"], ["11", 148, "23"], ["11", 149, "22"], ["11", 150, "22"], ["11", 151, "22"], ["11", 152, "20"], ["11", 153, "20"], ["11", 154, "19"], ["11", 155, "16"], ["11", 156, "10"], ["11", 157, "8"], ["11", 158, "5"], ["11", 159, "5"], ["11", 160, "5"], ["11", 161, "7"], ["11", 162, "6"], ["11", 163, "5"], ["11", 164, "7"], ["11", 165, "7"], ["11", 166, "15"], ["11", 167, "16"], ["11", 168, "15"], ["11", 169, "12"], ["11", 170, "14"], ["11", 171, "17"], ["11", 172, "18"], ["11", 173, "18"], ["11", 174, "15"], ["11", 175, "16"], ["11", 176, "12"], ["11", 177, "11"], ["11", 178, "10"], ["11", 179, "9"], ["11", 180, "7"], ["11", 181, "5"], ["11", 182, "5"], ["11", 183, "5"], ["11", 184, "6"], ["11", 185, "6"], ["11", 186, "4"], ["11", 187, "4"], ["11", 188, "2"], ["11", 189, "2"], ["11", 190, "1"], ["12", 9, "1"], ["12", 16, "1"], ["12", 17, "1"], ["12", 19, "1"], ["12", 23, "1"], ["12", 24, "2"], ["12", 25, "2"], ["12", 26, "1"], ["12", 27, "1"], ["12", 28, "4"], ["12", 33, "1"], ["12", 34, "1"], ["12", 36, "1"], ["12", 37, "1"], ["12", 38, "1"], ["12", 39, "2"], ["12", 40, "1"], ["12", 41, "1"], ["12", 42, "1"], ["12", 44, "1"], ["12", 45, "1"], ["12", 46, "4"], ["12", 47, "2"], ["12", 48, "1"], ["12", 50, "1"], ["12", 52, "1"], ["12", 53, "1"], ["12", 54, "4"], ["12", 55, "4"], ["12", 56, "5"], ["12", 57, "5"], ["12", 58, "1"], ["12", 59, "4"], ["12", 60, "2"], ["12", 61, "6"], ["12", 62, "4"], ["12", 63, "4"], ["12", 64, "1"], ["12", 65, "3"], ["12", 66, "2"], ["12", 67, "3"], ["12", 68, "1"], ["12", 78, "1"], ["12", 79, "2"], ["12", 80, "1"], ["12", 81, "2"], ["12", 83, "2"], ["12", 84, "2"], ["12", 85, "2"], ["12", 86, "2"], ["12", 87, "2"], ["12", 88, "4"], ["12", 89, "9"], ["12", 90, "9"], ["12", 91, "6"], ["12", 92, "8"], ["12", 93, "10"], ["12", 94, "8"], ["12", 95, "13"], ["12", 96, "13"], ["12", 97, "11"], ["12", 98, "12"], ["12", 99, "15"], ["12", 100, "13"], ["12", 101, "13"], ["12", 102, "17"], ["12", 103, "14"], ["12", 104, "18"], ["12", 105, "16"], ["12", 106, "20"], ["12", 107, "19"], ["12", 108, "14"], ["12", 109, "14"], ["12", 110, "17"], ["12", 111, "15"], ["12", 112, "17"], ["12", 113, "20"], ["12", 114, "21"], ["12", 115, "20"], ["12", 116, "22"], ["12", 117, "21"], ["12", 118, "17"], ["12", 119, "21"], ["12", 120, "21"], ["12", 121, "21"], ["12", 122, "22"], ["12", 123, "21"], ["12", 124, "19"], ["12", 125, "19"], ["12", 126, "18"], ["12", 127, "22"], ["12", 128, "23"], ["12", 129, "21"], ["12", 130, "21"], ["12", 131, "21"], ["12", 132, "21"], ["12", 133, "21"], ["12", 134, "21"], ["12", 135, "21"], ["12", 136, "21"], ["12", 137, "20"], ["12", 138, "20"], ["12", 139, "22"], ["12", 140, "22"], ["12", 141, "22"], ["12", 142, "22"], ["12", 143, "23"], ["12", 144, "22"], ["12", 145, "23"], ["12", 146, "23"], ["12", 147, "23"], ["12", 148, "23"], ["12", 149, "23"], ["12", 150, "23"], ["12", 151, "21"], ["12", 152, "20"], ["12", 153, "20"], ["12", 154, "17"], ["12", 155, "16"], ["12", 156, "11"], ["12", 157, "9"], ["12", 158, "6"], ["12", 159, "5"], ["12", 160, "8"], ["12", 161, "7"], ["12", 162, "8"], ["12", 163, "5"], ["12", 164, "6"], ["12", 165, "6"], ["12", 166, "14"], ["12", 167, "12"], ["12", 168, "14"], ["12", 169, "13"], ["12", 170, "13"], ["12", 171, "15"], ["12", 172, "17"], ["12", 173, "14"], ["12", 174, "13"], ["12", 175, "12"], ["12", 176, "12"], ["12", 177, "12"], ["12", 178, "10"], ["12", 179, "8"], ["12", 180, "4"], ["12", 181, "4"], ["12", 182, "5"], ["12", 183, "6"], ["12", 184, "6"], ["12", 185, "6"], ["12", 186, "5"], ["12", 187, "3"], ["12", 188, "1"], ["12", 189, "2"], ["13", 9, "1"], ["13", 16, "1"], ["13", 17, "1"], ["13", 19, "1"], ["13", 23, "1"], ["13", 24, "2"], ["13", 25, "2"], ["13", 26, "1"], ["13", 27, "1"], ["13", 28, "4"], ["13", 33, "1"], ["13", 34, "1"], ["13", 36, "1"], ["13", 37, "1"], ["13", 38, "1"], ["13", 39, "2"], ["13", 40, "1"], ["13", 41, "1"], ["13", 42, "1"], ["13", 44, "1"], ["13", 45, "1"], ["13", 46, "4"], ["13", 47, "2"], ["13", 48, "1"], ["13", 50, "1"], ["13", 52, "1"], ["13", 53, "1"], ["13", 54, "4"], ["13", 55, "4"], ["13", 56, "5"], ["13", 57, "5"], ["13", 58, "1"], ["13", 59, "4"], ["13", 60, "2"], ["13", 61, "6"], ["13", 62, "4"], ["13", 63, "4"], ["13", 64, "1"], ["13", 65, "3"], ["13", 66, "2"], ["13", 67, "3"], ["13", 68, "1"], ["13", 78, "1"], ["13", 79, "2"], ["13", 80, "1"], ["13", 81, "2"], ["13", 83, "2"], ["13", 84, "2"], ["13", 85, "2"], ["13", 86, "2"], ["13", 87, "2"], ["13", 88, "4"], ["13", 89, "9"], ["13", 90, "9"], ["13", 91, "6"], ["13", 92, "8"], ["13", 93, "10"], ["13", 94, "8"], ["13", 95, "13"], ["13", 96, "13"], ["13", 97, "11"], ["13", 98, "12"], ["13", 99, "15"], ["13", 100, "13"], ["13", 101, "13"], ["13", 102, "17"], ["13", 103, "14"], ["13", 104, "18"], ["13", 105, "16"], ["13", 106, "20"], ["13", 107, "19"], ["13", 108, "14"], ["13", 109, "14"], ["13", 110, "17"], ["13", 111, "15"], ["13", 112, "17"], ["13", 113, "20"], ["13", 114, "21"], ["13", 115, "20"], ["13", 116, "22"], ["13", 117, "21"], ["13", 118, "17"], ["13", 119, "21"], ["13", 120, "21"], ["13", 121, "21"], ["13", 122, "22"], ["13", 123, "21"], ["13", 124, "19"], ["13", 125, "19"], ["13", 126, "18"], ["13", 127, "22"], ["13", 128, "23"], ["13", 129, "21"], ["13", 130, "21"], ["13", 131, "21"], ["13", 132, "21"], ["13", 133, "21"], ["13", 134, "21"], ["13", 135, "21"], ["13", 136, "21"], ["13", 137, "20"], ["13", 138, "20"], ["13", 139, "22"], ["13", 140, "22"], ["13", 141, "22"], ["13", 142, "22"], ["13", 143, "23"], ["13", 144, "22"], ["13", 145, "23"], ["13", 146, "23"], ["13", 147, "23"], ["13", 148, "23"], ["13", 149, "23"], ["13", 150, "23"], ["13", 151, "21"], ["13", 152, "20"], ["13", 153, "20"], ["13", 154, "17"], ["13", 155, "16"], ["13", 156, "11"], ["13", 157, "9"], ["13", 158, "6"], ["13", 159, "5"], ["13", 160, "8"], ["13", 161, "7"], ["13", 162, "8"], ["13", 163, "5"], ["13", 164, "6"], ["13", 165, "6"], ["13", 166, "14"], ["13", 167, "12"], ["13", 168, "14"], ["13", 169, "13"], ["13", 170, "13"], ["13", 171, "15"], ["13", 172, "17"], ["13", 173, "14"], ["13", 174, "13"], ["13", 175, "12"], ["13", 176, "12"], ["13", 177, "12"], ["13", 178, "10"], ["13", 179, "8"], ["13", 180, "4"], ["13", 181, "4"], ["13", 182, "5"], ["13", 183, "6"], ["13", 184, "6"], ["13", 185, "6"], ["13", 186, "5"], ["13", 187, "3"], ["13", 188, "1"], ["13", 189, "2"], ["14", 36, "1"], ["14", 37, "1"], ["14", 38, "1"], ["14", 39, "1"], ["14", 40, "1"], ["14", 41, "1"], ["14", 46, "1"], ["14", 106, "1"], ["14", 117, "1"], ["14", 118, "1"], ["14", 122, "1"], ["14", 124, "1"], ["14", 125, "2"], ["14", 126, "3"], ["14", 127, "3"], ["14", 128, "3"], ["14", 129, "1"], ["14", 130, "2"], ["14", 131, "3"], ["14", 132, "6"], ["14", 133, "6"], ["14", 134, "3"], ["14", 135, "1"], ["14", 136, "2"], ["14", 137, "2"], ["14", 138, "5"], ["14", 139, "5"], ["14", 140, "6"], ["14", 141, "1"], ["14", 142, "1"], ["14", 144, "1"], ["14", 145, "1"], ["15", 36, "1"], ["15", 37, "1"], ["15", 38, "1"], ["15", 39, "1"], ["15", 40, "1"], ["15", 41, "1"], ["15", 46, "1"], ["15", 106, "1"], ["15", 117, "1"], ["15", 118, "1"], ["15", 122, "1"], ["15", 124, "1"], ["15", 125, "2"], ["15", 126, "3"], ["15", 127, "3"], ["15", 128, "3"], ["15", 129, "1"], ["15", 130, "2"], ["15", 131, "3"], ["15", 132, "6"], ["15", 133, "6"], ["15", 134, "3"], ["15", 135, "1"], ["15", 136, "2"], ["15", 137, "2"], ["15", 138, "5"], ["15", 139, "5"], ["15", 140, "6"], ["15", 141, "1"], ["15", 142, "1"], ["15", 144, "1"], ["15", 145, "1"], ["16", 36, "1"], ["16", 37, "1"], ["16", 38, "1"], ["16", 39, "1"], ["16", 40, "1"], ["16", 41, "1"], ["16", 46, "1"], ["16", 106, "1"], ["16", 117, "1"], ["16", 118, "1"], ["16", 122, "1"], ["16", 124, "1"], ["16", 125, "2"], ["16", 126, "3"], ["16", 127, "3"], ["16", 128, "3"], ["16", 129, "1"], ["16", 130, "2"], ["16", 131, "3"], ["16", 132, "6"], ["16", 133, "6"], ["16", 134, "3"], ["16", 135, "1"], ["16", 136, "2"], ["16", 137, "2"], ["16", 138, "5"], ["16", 139, "5"], ["16", 140, "6"], ["16", 141, "1"], ["16", 142, "1"], ["16", 144, "1"], ["16", 145, "1"], ["20", 40, "1"], ["20", 119, "1"], ["20", 120, "1"], ["20", 124, "2"], ["20", 125, "3"], ["20", 126, "4"], ["20", 127, "6"], ["20", 128, "6"], ["20", 129, "5"], ["20", 130, "6"], ["20", 131, "5"], ["20", 132, "9"], ["20", 133, "11"], ["20", 134, "6"], ["20", 135, "5"], ["20", 136, "8"], ["20", 137, "10"], ["20", 138, "6"], ["20", 139, "10"], ["20", 140, "9"], ["20", 141, "5"], ["20", 142, "5"], ["20", 143, "3"], ["20", 144, "2"], ["20", 145, "1"], ["21", 40, "1"], ["21", 119, "1"], ["21", 120, "1"], ["21", 124, "2"], ["21", 125, "3"], ["21", 126, "4"], ["21", 127, "6"], ["21", 128, "6"], ["21", 129, "5"], ["21", 130, "6"], ["21", 131, "5"], ["21", 132, "9"], ["21", 133, "11"], ["21", 134, "6"], ["21", 135, "5"], ["21", 136, "8"], ["21", 137, "10"], ["21", 138, "6"], ["21", 139, "10"], ["21", 140, "9"], ["21", 141, "5"], ["21", 142, "5"], ["21", 143, "3"], ["21", 144, "2"], ["21", 145, "1"], ["23", 40, "1"], ["23", 119, "1"], ["23", 120, "1"], ["23", 124, "2"], ["23", 125, "3"], ["23", 126, "4"], ["23", 127, "6"], ["23", 128, "6"], ["23", 129, "5"], ["23", 130, "6"], ["23", 131, "5"], ["23", 132, "9"], ["23", 133, "11"], ["23", 134, "6"], ["23", 135, "5"], ["23", 136, "8"], ["23", 137, "10"], ["23", 138, "6"], ["23", 139, "10"], ["23", 140, "9"], ["23", 141, "5"], ["23", 142, "5"], ["23", 143, "3"], ["23", 144, "2"], ["23", 145, "1"], ["24", 40, "1"], ["24", 119, "1"], ["24", 120, "1"], ["24", 124, "2"], ["24", 125, "3"], ["24", 126, "4"], ["24", 127, "6"], ["24", 128, "6"], ["24", 129, "5"], ["24", 130, "6"], ["24", 131, "5"], ["24", 132, "9"], ["24", 133, "11"], ["24", 134, "6"], ["24", 135, "5"], ["24", 136, "8"], ["24", 137, "10"], ["24", 138, "6"], ["24", 139, "10"], ["24", 140, "9"], ["24", 141, "5"], ["24", 142, "5"], ["24", 143, "3"], ["24", 144, "2"], ["24", 145, "1"], ["26", 40, "1"], ["26", 119, "1"], ["26", 120, "1"], ["26", 124, "2"], ["26", 125, "3"], ["26", 126, "4"], ["26", 127, "6"], ["26", 128, "6"], ["26", 129, "5"], ["26", 130, "6"], ["26", 131, "5"], ["26", 132, "9"], ["26", 133, "11"], ["26", 134, "6"], ["26", 135, "5"], ["26", 136, "8"], ["26", 137, "10"], ["26", 138, "6"], ["26", 139, "10"], ["26", 140, "9"], ["26", 141, "5"], ["26", 142, "5"], ["26", 143, "3"], ["26", 144, "2"], ["26", 145, "1"], ["27", 40, "1"], ["27", 117, "1"], ["27", 118, "1"], ["27", 119, "1"], ["27", 120, "1"], ["27", 123, "1"], ["27", 124, "5"], ["27", 125, "4"], ["27", 126, "7"], ["27", 127, "11"], ["27", 128, "12"], ["27", 129, "14"], ["27", 130, "16"], ["27", 131, "15"], ["27", 132, "16"], ["27", 133, "16"], ["27", 134, "15"], ["27", 135, "11"], ["27", 136, "15"], ["27", 137, "16"], ["27", 138, "17"], ["27", 139, "18"], ["27", 140, "19"], ["27", 141, "16"], ["27", 142, "15"], ["27", 143, "12"], ["27", 144, "13"], ["27", 145, "6"], ["27", 146, "2"], ["27", 158, "1"], ["27", 159, "1"], ["28", 40, "1"], ["28", 117, "1"], ["28", 118, "1"], ["28", 119, "1"], ["28", 120, "1"], ["28", 123, "1"], ["28", 124, "5"], ["28", 125, "4"], ["28", 126, "7"], ["28", 127, "11"], ["28", 128, "12"], ["28", 129, "14"], ["28", 130, "16"], ["28", 131, "15"], ["28", 132, "16"], ["28", 133, "16"], ["28", 134, "15"], ["28", 135, "11"], ["28", 136, "15"], ["28", 137, "16"], ["28", 138, "17"], ["28", 139, "18"], ["28", 140, "19"], ["28", 141, "16"], ["28", 142, "15"], ["28", 143, "12"], ["28", 144, "13"], ["28", 145, "6"], ["28", 146, "2"], ["28", 158, "1"], ["28", 159, "1"], ["29", 40, "1"], ["29", 117, "1"], ["29", 118, "1"], ["29", 119, "1"], ["29", 120, "1"], ["29", 123, "1"], ["29", 124, "5"], ["29", 125, "4"], ["29", 126, "7"], ["29", 127, "11"], ["29", 128, "12"], ["29", 129, "14"], ["29", 130, "16"], ["29", 131, "15"], ["29", 132, "16"], ["29", 133, "16"], ["29", 134, "15"], ["29", 135, "11"], ["29", 136, "15"], ["29", 137, "16"], ["29", 138, "17"], ["29", 139, "18"], ["29", 140, "19"], ["29", 141, "16"], ["29", 142, "15"], ["29", 143, "12"], ["29", 144, "13"], ["29", 145, "6"], ["29", 146, "2"], ["29", 158, "1"], ["29", 159, "1"], ["30", 40, "1"], ["30", 117, "1"], ["30", 118, "1"], ["30", 119, "1"], ["30", 120, "1"], ["30", 123, "1"], ["30", 124, "5"], ["30", 125, "4"], ["30", 126, "7"], ["30", 127, "11"], ["30", 128, "12"], ["30", 129, "14"], ["30", 130, "16"], ["30", 131, "15"], ["30", 132, "16"], ["30", 133, "16"], ["30", 134, "15"], ["30", 135, "11"], ["30", 136, "15"], ["30", 137, "16"], ["30", 138, "17"], ["30", 139, "18"], ["30", 140, "19"], ["30", 141, "16"], ["30", 142, "15"], ["30", 143, "12"], ["30", 144, "13"], ["30", 145, "6"], ["30", 146, "2"], ["30", 158, "1"], ["30", 159, "1"], ["31", 40, "1"], ["31", 117, "1"], ["31", 118, "1"], ["31", 119, "1"], ["31", 120, "1"], ["31", 123, "1"], ["31", 124, "5"], ["31", 125, "4"], ["31", 126, "7"], ["31", 127, "11"], ["31", 128, "12"], ["31", 129, "14"], ["31", 130, "16"], ["31", 131, "15"], ["31", 132, "16"], ["31", 133, "16"], ["31", 134, "15"], ["31", 135, "11"], ["31", 136, "15"], ["31", 137, "16"], ["31", 138, "17"], ["31", 139, "18"], ["31", 140, "19"], ["31", 141, "16"], ["31", 142, "15"], ["31", 143, "12"], ["31", 144, "13"], ["31", 145, "6"], ["31", 146, "2"], ["31", 158, "1"], ["31", 159, "1"], ["32", 40, "1"], ["32", 117, "1"], ["32", 118, "1"], ["32", 119, "1"], ["32", 120, "1"], ["32", 123, "1"], ["32", 124, "5"], ["32", 125, "4"], ["32", 126, "7"], ["32", 127, "11"], ["32", 128, "12"], ["32", 129, "14"], ["32", 130, "16"], ["32", 131, "15"], ["32", 132, "16"], ["32", 133, "16"], ["32", 134, "15"], ["32", 135, "11"], ["32", 136, "15"], ["32", 137, "16"], ["32", 138, "17"], ["32", 139, "18"], ["32", 140, "19"], ["32", 141, "16"], ["32", 142, "15"], ["32", 143, "12"], ["32", 144, "13"], ["32", 145, "6"], ["32", 146, "2"], ["32", 158, "1"], ["32", 159, "1"], ["34", 39, "1"], ["34", 40, "1"], ["34", 41, "1"], ["34", 42, "1"], ["34", 52, "1"], ["34", 110, "1"], ["34", 112, "1"], ["34", 115, "1"], ["34", 116, "1"], ["34", 117, "1"], ["34", 118, "1"], ["34", 119, "1"], ["34", 122, "1"], ["34", 123, "4"], ["34", 124, "4"], ["34", 125, "4"], ["34", 126, "7"], ["34", 127, "13"], ["34", 128, "10"], ["34", 129, "9"], ["34", 130, "10"], ["34", 131, "11"], ["34", 132, "12"], ["34", 133, "8"], ["34", 134, "7"], ["34", 135, "11"], ["34", 136, "9"], ["34", 137, "14"], ["34", 138, "12"], ["34", 139, "11"], ["34", 140, "11"], ["34", 141, "11"], ["34", 142, "11"], ["34", 143, "6"], ["34", 144, "9"], ["34", 145, "1"], ["34", 175, "1"], ["34", 176, "1"], ["35", 39, "1"], ["35", 40, "1"], ["35", 41, "1"], ["35", 42, "1"], ["35", 52, "1"], ["35", 110, "1"], ["35", 112, "1"], ["35", 115, "1"], ["35", 116, "1"], ["35", 117, "1"], ["35", 118, "1"], ["35", 119, "1"], ["35", 122, "1"], ["35", 123, "4"], ["35", 124, "4"], ["35", 125, "4"], ["35", 126, "7"], ["35", 127, "13"], ["35", 128, "10"], ["35", 129, "9"], ["35", 130, "10"], ["35", 131, "11"], ["35", 132, "12"], ["35", 133, "8"], ["35", 134, "7"], ["35", 135, "11"], ["35", 136, "9"], ["35", 137, "14"], ["35", 138, "12"], ["35", 139, "11"], ["35", 140, "11"], ["35", 141, "11"], ["35", 142, "11"], ["35", 143, "6"], ["35", 144, "9"], ["35", 145, "1"], ["35", 175, "1"], ["35", 176, "1"], ["36", 8, "1"], ["36", 9, "1"], ["36", 10, "1"], ["36", 11, "1"], ["36", 12, "1"], ["36", 13, "1"], ["36", 39, "1"], ["36", 40, "1"], ["36", 41, "1"], ["36", 42, "2"], ["36", 43, "1"], ["36", 44, "1"], ["36", 48, "1"], ["36", 49, "1"], ["36", 50, "1"], ["36", 51, "1"], ["36", 52, "1"], ["36", 78, "1"], ["36", 79, "1"], ["36", 96, "1"], ["36", 97, "1"], ["36", 110, "1"], ["36", 111, "1"], ["36", 112, "1"], ["36", 113, "3"], ["36", 114, "1"], ["36", 115, "2"], ["36", 116, "4"], ["36", 117, "2"], ["36", 118, "3"], ["36", 119, "2"], ["36", 120, "2"], ["36", 121, "1"], ["36", 122, "5"], ["36", 123, "5"], ["36", 124, "7"], ["36", 125, "9"], ["36", 126, "14"], ["36", 127, "16"], ["36", 128, "17"], ["36", 129, "16"], ["36", 130, "17"], ["36", 131, "13"], ["36", 132, "17"], ["36", 133, "17"], ["36", 134, "15"], ["36", 135, "16"], ["36", 136, "17"], ["36", 137, "17"], ["36", 138, "18"], ["36", 139, "19"], ["36", 140, "15"], ["36", 141, "16"], ["36", 142, "16"], ["36", 143, "12"], ["36", 144, "11"], ["36", 145, "2"], ["36", 146, "1"], ["36", 147, "1"], ["36", 174, "1"], ["36", 175, "1"], ["36", 176, "1"], ["36", 180, "1"], ["36", 181, "1"], ["36", 182, "1"], ["36", 183, "1"], ["36", 184, "1"], ["36", 185, "1"], ["40", 18, "1"], ["40", 19, "1"], ["40", 20, "1"], ["40", 21, "1"], ["40", 38, "1"], ["40", 39, "1"], ["40", 40, "1"], ["40", 41, "1"], ["40", 51, "1"], ["40", 52, "1"], ["40", 88, "1"], ["40", 95, "1"], ["40", 96, "1"], ["40", 97, "1"], ["40", 98, "1"], ["40", 99, "1"], ["40", 109, "1"], ["40", 111, "1"], ["40", 112, "1"], ["40", 116, "1"], ["40", 117, "1"], ["40", 118, "1"], ["40", 120, "1"], ["40", 122, "1"], ["40", 123, "1"], ["40", 124, "1"], ["40", 125, "2"], ["40", 127, "2"], ["40", 128, "1"], ["40", 129, "1"], ["40", 130, "3"], ["40", 131, "2"], ["40", 132, "1"], ["40", 133, "1"], ["40", 134, "1"], ["40", 135, "1"], ["40", 136, "2"], ["40", 137, "2"], ["40", 138, "1"], ["40", 139, "1"], ["40", 140, "1"], ["40", 143, "1"], ["41", 18, "1"], ["41", 19, "1"], ["41", 20, "1"], ["41", 21, "1"], ["41", 38, "1"], ["41", 39, "1"], ["41", 40, "1"], ["41", 41, "1"], ["41", 51, "1"], ["41", 52, "1"], ["41", 88, "1"], ["41", 95, "1"], ["41", 96, "1"], ["41", 97, "1"], ["41", 98, "1"], ["41", 99, "1"], ["41", 109, "1"], ["41", 111, "1"], ["41", 112, "1"], ["41", 116, "1"], ["41", 117, "1"], ["41", 118, "1"], ["41", 120, "1"], ["41", 122, "1"], ["41", 123, "1"], ["41", 124, "1"], ["41", 125, "2"], ["41", 127, "2"], ["41", 128, "1"], ["41", 129, "1"], ["41", 130, "3"], ["41", 131, "2"], ["41", 132, "1"], ["41", 133, "1"], ["41", 134, "1"], ["41", 135, "1"], ["41", 136, "2"], ["41", 137, "2"], ["41", 138, "1"], ["41", 139, "1"], ["41", 140, "1"], ["41", 143, "1"], ["42", 18, "1"], ["42", 19, "1"], ["42", 20, "1"], ["42", 21, "1"], ["42", 38, "1"], ["42", 39, "1"], ["42", 40, "1"], ["42", 41, "1"], ["42", 51, "1"], ["42", 52, "1"], ["42", 88, "1"], ["42", 95, "1"], ["42", 96, "1"], ["42", 97, "1"], ["42", 98, "1"], ["42", 99, "1"], ["42", 109, "1"], ["42", 111, "1"], ["42", 112, "1"], ["42", 116, "1"], ["42", 117, "1"], ["42", 118, "1"], ["42", 120, "1"], ["42", 122, "1"], ["42", 123, "1"], ["42", 124, "1"], ["42", 125, "2"], ["42", 127, "2"], ["42", 128, "1"], ["42", 129, "1"], ["42", 130, "3"], ["42", 131, "2"], ["42", 132, "1"], ["42", 133, "1"], ["42", 134, "1"], ["42", 135, "1"], ["42", 136, "2"], ["42", 137, "2"], ["42", 138, "1"], ["42", 139, "1"], ["42", 140, "1"], ["42", 143, "1"], ["43", 17, "1"], ["43", 18, "1"], ["43", 19, "1"], ["43", 20, "1"], ["43", 21, "1"], ["43", 37, "1"], ["43", 38, "1"], ["43", 39, "1"], ["43", 40, "1"], ["43", 41, "1"], ["43", 42, "1"], ["43", 49, "1"], ["43", 50, "1"], ["43", 51, "1"], ["43", 82, "1"], ["43", 83, "1"], ["43", 84, "1"], ["43", 85, "1"], ["43", 86, "1"], ["43", 87, "1"], ["43", 88, "1"], ["43", 96, "1"], ["43", 106, "1"], ["43", 108, "1"], ["43", 109, "2"], ["43", 111, "1"], ["43", 122, "1"], ["43", 128, "1"], ["43", 129, "1"], ["43", 130, "2"], ["43", 131, "3"], ["43", 132, "2"], ["43", 133, "1"], ["43", 134, "1"], ["43", 135, "1"], ["43", 136, "1"], ["43", 137, "2"], ["43", 138, "1"], ["43", 143, "1"], ["44", 17, "1"], ["44", 18, "1"], ["44", 19, "1"], ["44", 20, "1"], ["44", 21, "1"], ["44", 37, "1"], ["44", 38, "1"], ["44", 39, "1"], ["44", 40, "1"], ["44", 41, "1"], ["44", 42, "1"], ["44", 49, "1"], ["44", 50, "1"], ["44", 51, "1"], ["44", 82, "1"], ["44", 83, "1"], ["44", 84, "1"], ["44", 85, "1"], ["44", 86, "1"], ["44", 87, "1"], ["44", 88, "1"], ["44", 96, "1"], ["44", 106, "1"], ["44", 108, "1"], ["44", 109, "2"], ["44", 111, "1"], ["44", 122, "1"], ["44", 128, "1"], ["44", 129, "1"], ["44", 130, "2"], ["44", 131, "3"], ["44", 132, "2"], ["44", 133, "1"], ["44", 134, "1"], ["44", 135, "1"], ["44", 136, "1"], ["44", 137, "2"], ["44", 138, "1"], ["44", 143, "1"], ["45", 16, "2"], ["45", 17, "2"], ["45", 18, "1"], ["45", 19, "1"], ["45", 20, "1"], ["45", 21, "1"], ["45", 22, "1"], ["45", 23, "1"], ["45", 37, "1"], ["45", 38, "1"], ["45", 39, "1"], ["45", 40, "1"], ["45", 41, "1"], ["45", 42, "1"], ["45", 47, "1"], ["45", 48, "1"], ["45", 49, "1"], ["45", 50, "1"], ["45", 51, "1"], ["45", 53, "1"], ["45", 106, "2"], ["45", 108, "1"], ["45", 109, "2"], ["45", 111, "1"], ["45", 113, "1"], ["45", 115, "1"], ["45", 125, "1"], ["45", 127, "1"], ["45", 128, "1"], ["45", 129, "1"], ["45", 130, "2"], ["45", 131, "3"], ["45", 132, "1"], ["45", 133, "1"], ["45", 134, "2"], ["45", 136, "2"], ["45", 137, "2"], ["45", 138, "1"], ["45", 165, "1"], ["45", 166, "1"], ["45", 167, "1"], ["46", 16, "2"], ["46", 17, "2"], ["46", 18, "1"], ["46", 19, "1"], ["46", 20, "1"], ["46", 21, "1"], ["46", 22, "1"], ["46", 23, "1"], ["46", 37, "1"], ["46", 38, "1"], ["46", 39, "1"], ["46", 40, "1"], ["46", 41, "1"], ["46", 42, "1"], ["46", 47, "1"], ["46", 48, "1"], ["46", 49, "1"], ["46", 50, "1"], ["46", 51, "1"], ["46", 53, "1"], ["46", 106, "2"], ["46", 108, "1"], ["46", 109, "2"], ["46", 111, "1"], ["46", 113, "1"], ["46", 115, "1"], ["46", 125, "1"], ["46", 127, "1"], ["46", 128, "1"], ["46", 129, "1"], ["46", 130, "2"], ["46", 131, "3"], ["46", 132, "1"], ["46", 133, "1"], ["46", 134, "2"], ["46", 136, "2"], ["46", 137, "2"], ["46", 138, "1"], ["46", 165, "1"], ["46", 166, "1"], ["46", 167, "1"], ["48", 16, "2"], ["48", 17, "2"], ["48", 18, "1"], ["48", 19, "1"], ["48", 20, "1"], ["48", 21, "1"], ["48", 22, "1"], ["48", 23, "1"], ["48", 37, "1"], ["48", 38, "1"], ["48", 39, "1"], ["48", 40, "1"], ["48", 41, "1"], ["48", 42, "1"], ["48", 47, "1"], ["48", 48, "1"], ["48", 49, "1"], ["48", 50, "1"], ["48", 51, "1"], ["48", 53, "1"], ["48", 106, "2"], ["48", 108, "1"], ["48", 109, "2"], ["48", 111, "1"], ["48", 113, "1"], ["48", 115, "1"], ["48", 125, "1"], ["48", 127, "1"], ["48", 128, "1"], ["48", 129, "1"], ["48", 130, "2"], ["48", 131, "3"], ["48", 132, "1"], ["48", 133, "1"], ["48", 134, "2"], ["48", 136, "2"], ["48", 137, "2"], ["48", 138, "1"], ["48", 165, "1"], ["48", 166, "1"], ["48", 167, "1"], ["49", 16, "2"], ["49", 17, "2"], ["49", 18, "1"], ["49", 19, "1"], ["49", 20, "1"], ["49", 21, "1"], ["49", 22, "1"], ["49", 23, "1"], ["49", 37, "1"], ["49", 38, "1"], ["49", 39, "1"], ["49", 40, "1"], ["49", 41, "1"], ["49", 42, "1"], ["49", 47, "1"], ["49", 48, "1"], ["49", 49, "1"], ["49", 50, "1"], ["49", 51, "1"], ["49", 53, "1"], ["49", 106, "2"], ["49", 108, "1"], ["49", 109, "2"], ["49", 111, "1"], ["49", 113, "1"], ["49", 115, "1"], ["49", 125, "1"], ["49", 127, "1"], ["49", 128, "1"], ["49", 129, "1"], ["49", 130, "2"], ["49", 131, "3"], ["49", 132, "1"], ["49", 133, "1"], ["49", 134, "2"], ["49", 136, "2"], ["49", 137, "2"], ["49", 138, "1"], ["49", 165, "1"], ["49", 166, "1"], ["49", 167, "1"], ["50", 16, "2"], ["50", 17, "2"], ["50", 18, "1"], ["50", 19, "1"], ["50", 20, "1"], ["50", 21, "1"], ["50", 22, "1"], ["50", 23, "1"], ["50", 37, "1"], ["50", 38, "1"], ["50", 39, "1"], ["50", 40, "1"], ["50", 41, "1"], ["50", 42, "1"], ["50", 47, "1"], ["50", 48, "1"], ["50", 49, "1"], ["50", 50, "1"], ["50", 51, "1"], ["50", 53, "1"], ["50", 106, "2"], ["50", 108, "1"], ["50", 109, "2"], ["50", 111, "1"], ["50", 113, "1"], ["50", 115, "1"], ["50", 125, "1"], ["50", 127, "1"], ["50", 128, "1"], ["50", 129, "1"], ["50", 130, "2"], ["50", 131, "3"], ["50", 132, "1"], ["50", 133, "1"], ["50", 134, "2"], ["50", 136, "2"], ["50", 137, "2"], ["50", 138, "1"], ["50", 165, "1"], ["50", 166, "1"], ["50", 167, "1"], ["51", 16, "2"], ["51", 17, "2"], ["51", 18, "1"], ["51", 19, "1"], ["51", 20, "1"], ["51", 21, "1"], ["51", 22, "1"], ["51", 23, "1"], ["51", 37, "1"], ["51", 38, "1"], ["51", 39, "1"], ["51", 40, "1"], ["51", 41, "1"], ["51", 42, "1"], ["51", 47, "1"], ["51", 48, "1"], ["51", 49, "1"], ["51", 50, "1"], ["51", 51, "1"], ["51", 53, "1"], ["51", 106, "2"], ["51", 108, "1"], ["51", 109, "2"], ["51", 111, "1"], ["51", 113, "1"], ["51", 115, "1"], ["51", 125, "1"], ["51", 127, "1"], ["51", 128, "1"], ["51", 129, "1"], ["51", 130, "2"], ["51", 131, "3"], ["51", 132, "1"], ["51", 133, "1"], ["51", 134, "2"], ["51", 136, "2"], ["51", 137, "2"], ["51", 138, "1"], ["51", 165, "1"], ["51", 166, "1"], ["51", 167, "1"], ["52", 16, "2"], ["52", 17, "2"], ["52", 18, "1"], ["52", 19, "1"], ["52", 20, "1"], ["52", 21, "1"], ["52", 22, "1"], ["52", 23, "1"], ["52", 37, "1"], ["52", 38, "1"], ["52", 39, "1"], ["52", 40, "1"], ["52", 41, "1"], ["52", 42, "1"], ["52", 47, "1"], ["52", 48, "1"], ["52", 49, "1"], ["52", 50, "1"], ["52", 51, "1"], ["52", 53, "1"], ["52", 106, "2"], ["52", 108, "1"], ["52", 109, "2"], ["52", 111, "1"], ["52", 113, "1"], ["52", 115, "1"], ["52", 125, "1"], ["52", 127, "1"], ["52", 128, "1"], ["52", 129, "1"], ["52", 130, "2"], ["52", 131, "3"], ["52", 132, "1"], ["52", 133, "1"], ["52", 134, "2"], ["52", 136, "2"], ["52", 137, "2"], ["52", 138, "1"], ["52", 165, "1"], ["52", 166, "1"], ["52", 167, "1"], ["53", 15, "2"], ["53", 16, "2"], ["53", 17, "2"], ["53", 18, "1"], ["53", 19, "1"], ["53", 20, "1"], ["53", 111, "1"], ["53", 114, "1"], ["53", 130, "1"], ["53", 131, "1"], ["53", 132, "1"], ["53", 133, "1"], ["53", 134, "2"], ["53", 135, "1"], ["53", 136, "1"], ["53", 137, "1"], ["53", 138, "1"], ["53", 164, "1"], ["53", 165, "1"], ["53", 166, "1"], ["54", 15, "2"], ["54", 16, "2"], ["54", 17, "2"], ["54", 18, "1"], ["54", 19, "1"], ["54", 20, "1"], ["54", 111, "1"], ["54", 114, "1"], ["54", 130, "1"], ["54", 131, "1"], ["54", 132, "1"], ["54", 133, "1"], ["54", 134, "2"], ["54", 135, "1"], ["54", 136, "1"], ["54", 137, "1"], ["54", 138, "1"], ["54", 164, "1"], ["54", 165, "1"], ["54", 166, "1"], ["55", 15, "2"], ["55", 16, "2"], ["55", 17, "2"], ["55", 18, "1"], ["55", 19, "1"], ["55", 20, "1"], ["55", 111, "1"], ["55", 114, "1"], ["55", 130, "1"], ["55", 131, "1"], ["55", 132, "1"], ["55", 133, "1"], ["55", 134, "2"], ["55", 135, "1"], ["55", 136, "1"], ["55", 137, "1"], ["55", 138, "1"], ["55", 164, "1"], ["55", 165, "1"], ["55", 166, "1"], ["56", 15, "2"], ["56", 16, "2"], ["56", 17, "2"], ["56", 18, "1"], ["56", 19, "1"], ["56", 20, "1"], ["56", 111, "1"], ["56", 114, "1"], ["56", 130, "1"], ["56", 131, "1"], ["56", 132, "1"], ["56", 133, "1"], ["56", 134, "2"], ["56", 135, "1"], ["56", 136, "1"], ["56", 137, "1"], ["56", 138, "1"], ["56", 164, "1"], ["56", 165, "1"], ["56", 166, "1"], ["57", 15, "2"], ["57", 16, "2"], ["57", 17, "2"], ["57", 18, "1"], ["57", 19, "1"], ["57", 20, "1"], ["57", 111, "1"], ["57", 114, "1"], ["57", 130, "1"], ["57", 131, "1"], ["57", 132, "1"], ["57", 133, "1"], ["57", 134, "2"], ["57", 135, "1"], ["57", 136, "1"], ["57", 137, "1"], ["57", 138, "1"], ["57", 164, "1"], ["57", 165, "1"], ["57", 166, "1"], ["58", 14, "2"], ["58", 15, "2"], ["58", 16, "1"], ["58", 19, "1"], ["58", 110, "1"], ["58", 111, "2"], ["58", 130, "1"], ["58", 133, "2"], ["58", 134, "1"], ["58", 135, "1"], ["58", 137, "1"], ["58", 163, "1"], ["58", 164, "1"], ["58", 165, "1"], ["58", 166, "1"], ["60", 14, "2"], ["60", 15, "2"], ["60", 16, "1"], ["60", 19, "1"], ["60", 110, "1"], ["60", 111, "2"], ["60", 130, "1"], ["60", 133, "2"], ["60", 134, "1"], ["60", 135, "1"], ["60", 137, "1"], ["60", 163, "1"], ["60", 164, "1"], ["60", 165, "1"], ["60", 166, "1"], ["61", 14, "2"], ["61", 15, "2"], ["61", 16, "1"], ["61", 19, "1"], ["61", 110, "1"], ["61", 111, "2"], ["61", 130, "1"], ["61", 133, "2"], ["61", 134, "1"], ["61", 135, "1"], ["61", 137, "1"], ["61", 163, "1"], ["61", 164, "1"], ["61", 165, "1"], ["61", 166, "1"], ["62", 14, "2"], ["62", 15, "2"], ["62", 16, "1"], ["62", 19, "1"], ["62", 110, "1"], ["62", 111, "2"], ["62", 130, "1"], ["62", 133, "2"], ["62", 134, "1"], ["62", 135, "1"], ["62", 137, "1"], ["62", 163, "1"], ["62", 164, "1"], ["62", 165, "1"], ["62", 166, "1"], ["63", 14, "1"], ["63", 15, "1"], ["63", 16, "1"], ["63", 18, "1"], ["63", 19, "1"], ["63", 20, "1"], ["64", 14, "1"], ["64", 15, "1"], ["64", 16, "1"], ["64", 18, "1"], ["64", 19, "1"], ["64", 20, "1"], ["65", 14, "1"], ["65", 15, "1"], ["65", 16, "1"], ["65", 18, "1"], ["65", 19, "1"], ["65", 20, "1"], ["66", 14, "1"], ["66", 15, "1"], ["66", 16, "1"], ["66", 18, "1"], ["66", 19, "1"], ["66", 20, "1"], ["70", 12, "1"], ["70", 13, "1"], ["70", 14, "2"], ["70", 15, "3"], ["70", 16, "4"], ["70", 17, "4"], ["70", 18, "4"], ["70", 19, "4"], ["70", 20, "4"], ["70", 125, "1"], ["70", 134, "1"], ["70", 135, "1"], ["71", 11, "1"], ["71", 12, "4"], ["71", 13, "5"], ["71", 14, "8"], ["71", 15, "6"], ["71", 16, "7"], ["71", 17, "8"], ["71", 18, "6"], ["71", 19, "6"], ["71", 20, "5"], ["71", 21, "5"], ["71", 22, "2"], ["71", 52, "1"], ["71", 124, "1"], ["71", 125, "1"], ["71", 132, "1"], ["71", 133, "2"], ["71", 134, "2"], ["71", 135, "1"], ["72", 11, "1"], ["72", 12, "4"], ["72", 13, "5"], ["72", 14, "8"], ["72", 15, "6"], ["72", 16, "7"], ["72", 17, "8"], ["72", 18, "6"], ["72", 19, "6"], ["72", 20, "5"], ["72", 21, "5"], ["72", 22, "2"], ["72", 52, "1"], ["72", 124, "1"], ["72", 125, "1"], ["72", 132, "1"], ["72", 133, "2"], ["72", 134, "2"], ["72", 135, "1"], ["73", 13, "1"], ["73", 14, "6"], ["73", 15, "3"], ["73", 16, "2"], ["73", 17, "6"], ["73", 18, "5"], ["73", 19, "4"], ["73", 20, "4"], ["73", 21, "1"], ["73", 22, "2"], ["73", 51, "1"], ["73", 52, "1"], ["73", 125, "1"], ["73", 131, "2"], ["73", 133, "2"], ["73", 134, "1"], ["74", 13, "1"], ["74", 14, "6"], ["74", 15, "3"], ["74", 16, "2"], ["74", 17, "6"], ["74", 18, "5"], ["74", 19, "4"], ["74", 20, "4"], ["74", 21, "1"], ["74", 22, "2"], ["74", 51, "1"], ["74", 52, "1"], ["74", 125, "1"], ["74", 131, "2"], ["74", 133, "2"], ["74", 134, "1"], ["75", 13, "1"], ["75", 14, "6"], ["75", 15, "3"], ["75", 16, "2"], ["75", 17, "6"], ["75", 18, "5"], ["75", 19, "4"], ["75", 20, "4"], ["75", 21, "1"], ["75", 22, "2"], ["75", 51, "1"], ["75", 52, "1"], ["75", 125, "1"], ["75", 131, "2"], ["75", 133, "2"], ["75", 134, "1"], ["76", 11, "1"], ["76", 12, "1"], ["76", 13, "2"], ["76", 14, "5"], ["76", 15, "4"], ["76", 16, "5"], ["76", 17, "5"], ["76", 18, "6"], ["76", 19, "4"], ["76", 20, "3"], ["76", 21, "2"], ["76", 22, "2"], ["76", 51, "1"], ["76", 52, "1"], ["76", 54, "1"], ["76", 55, "1"], ["76", 96, "1"], ["76", 97, "1"], ["76", 125, "1"], ["76", 129, "1"], ["76", 131, "1"], ["76", 133, "2"], ["76", 134, "1"], ["77", 11, "1"], ["77", 12, "1"], ["77", 13, "2"], ["77", 14, "5"], ["77", 15, "4"], ["77", 16, "5"], ["77", 17, "5"], ["77", 18, "6"], ["77", 19, "4"], ["77", 20, "3"], ["77", 21, "2"], ["77", 22, "2"], ["77", 51, "1"], ["77", 52, "1"], ["77", 54, "1"], ["77", 55, "1"], ["77", 96, "1"], ["77", 97, "1"], ["77", 125, "1"], ["77", 129, "1"], ["77", 131, "1"], ["77", 133, "2"], ["77", 134, "1"], ["78", 11, "1"], ["78", 12, "1"], ["78", 13, "3"], ["78", 14, "3"], ["78", 15, "4"], ["78", 16, "5"], ["78", 17, "5"], ["78", 18, "5"], ["78", 19, "4"], ["78", 20, "3"], ["78", 21, "2"], ["78", 22, "1"], ["78", 23, "1"], ["78", 50, "1"], ["78", 51, "1"], ["78", 53, "1"], ["78", 54, "1"], ["78", 55, "1"], ["78", 56, "1"], ["78", 57, "1"], ["78", 92, "1"], ["78", 95, "1"], ["78", 96, "1"], ["78", 97, "1"], ["78", 99, "1"], ["78", 101, "1"], ["78", 103, "1"], ["78", 124, "1"], ["78", 125, "1"], ["78", 132, "2"], ["78", 133, "2"], ["79", 13, "2"], ["79", 14, "1"], ["79", 16, "3"], ["79", 17, "3"], ["79", 18, "4"], ["79", 19, "1"], ["79", 20, "1"], ["79", 21, "1"], ["79", 22, "1"], ["79", 23, "1"], ["79", 24, "1"], ["79", 41, "1"], ["79", 49, "1"], ["79", 50, "1"], ["79", 51, "1"], ["79", 53, "1"], ["79", 54, "1"], ["79", 55, "1"], ["79", 56, "1"], ["79", 81, "1"], ["79", 82, "1"], ["79", 91, "1"], ["79", 92, "1"], ["79", 95, "1"], ["79", 96, "1"], ["79", 100, "1"], ["79", 101, "1"], ["79", 102, "1"], ["80", 13, "2"], ["80", 14, "1"], ["80", 16, "3"], ["80", 17, "3"], ["80", 18, "4"], ["80", 19, "1"], ["80", 20, "1"], ["80", 21, "1"], ["80", 22, "1"], ["80", 23, "1"], ["80", 24, "1"], ["80", 41, "1"], ["80", 49, "1"], ["80", 50, "1"], ["80", 51, "1"], ["80", 53, "1"], ["80", 54, "1"], ["80", 55, "1"], ["80", 56, "1"], ["80", 81, "1"], ["80", 82, "1"], ["80", 91, "1"], ["80", 92, "1"], ["80", 95, "1"], ["80", 96, "1"], ["80", 100, "1"], ["80", 101, "1"], ["80", 102, "1"], ["81", 13, "2"], ["81", 14, "1"], ["81", 16, "3"], ["81", 17, "3"], ["81", 18, "4"], ["81", 19, "1"], ["81", 20, "1"], ["81", 21, "1"], ["81", 22, "1"], ["81", 23, "1"], ["81", 24, "1"], ["81", 41, "1"], ["81", 49, "1"], ["81", 50, "1"], ["81", 51, "1"], ["81", 53, "1"], ["81", 54, "1"], ["81", 55, "1"], ["81", 56, "1"], ["81", 81, "1"], ["81", 82, "1"], ["81", 91, "1"], ["81", 92, "1"], ["81", 95, "1"], ["81", 96, "1"], ["81", 100, "1"], ["81", 101, "1"], ["81", 102, "1"], ["82", 13, "2"], ["82", 14, "1"], ["82", 16, "3"], ["82", 17, "3"], ["82", 18, "4"], ["82", 19, "1"], ["82", 20, "1"], ["82", 21, "1"], ["82", 22, "1"], ["82", 23, "1"], ["82", 24, "1"], ["82", 41, "1"], ["82", 49, "1"], ["82", 50, "1"], ["82", 51, "1"], ["82", 53, "1"], ["82", 54, "1"], ["82", 55, "1"], ["82", 56, "1"], ["82", 81, "1"], ["82", 82, "1"], ["82", 91, "1"], ["82", 92, "1"], ["82", 95, "1"], ["82", 96, "1"], ["82", 100, "1"], ["82", 101, "1"], ["82", 102, "1"], ["83", 13, "2"], ["83", 14, "1"], ["83", 16, "3"], ["83", 17, "3"], ["83", 18, "4"], ["83", 19, "1"], ["83", 20, "1"], ["83", 21, "1"], ["83", 22, "1"], ["83", 23, "1"], ["83", 24, "1"], ["83", 41, "1"], ["83", 49, "1"], ["83", 50, "1"], ["83", 51, "1"], ["83", 53, "1"], ["83", 54, "1"], ["83", 55, "1"], ["83", 56, "1"], ["83", 81, "1"], ["83", 82, "1"], ["83", 91, "1"], ["83", 92, "1"], ["83", 95, "1"], ["83", 96, "1"], ["83", 100, "1"], ["83", 101, "1"], ["83", 102, "1"], ["84", 13, "2"], ["84", 14, "1"], ["84", 16, "3"], ["84", 17, "3"], ["84", 18, "4"], ["84", 19, "1"], ["84", 20, "1"], ["84", 21, "1"], ["84", 22, "1"], ["84", 23, "1"], ["84", 24, "1"], ["84", 41, "1"], ["84", 49, "1"], ["84", 50, "1"], ["84", 51, "1"], ["84", 53, "1"], ["84", 54, "1"], ["84", 55, "1"], ["84", 56, "1"], ["84", 81, "1"], ["84", 82, "1"], ["84", 91, "1"], ["84", 92, "1"], ["84", 95, "1"], ["84", 96, "1"], ["84", 100, "1"], ["84", 101, "1"], ["84", 102, "1"], ["85", 13, "2"], ["85", 14, "1"], ["85", 16, "3"], ["85", 17, "3"], ["85", 18, "4"], ["85", 19, "1"], ["85", 20, "1"], ["85", 21, "1"], ["85", 22, "1"], ["85", 23, "1"], ["85", 24, "1"], ["85", 41, "1"], ["85", 49, "1"], ["85", 50, "1"], ["85", 51, "1"], ["85", 53, "1"], ["85", 54, "1"], ["85", 55, "1"], ["85", 56, "1"], ["85", 81, "1"], ["85", 82, "1"], ["85", 91, "1"], ["85", 92, "1"], ["85", 95, "1"], ["85", 96, "1"], ["85", 100, "1"], ["85", 101, "1"], ["85", 102, "1"], ["86", 13, "3"], ["86", 14, "1"], ["86", 16, "2"], ["86", 17, "3"], ["86", 18, "3"], ["86", 19, "1"], ["86", 20, "1"], ["86", 21, "1"], ["86", 23, "1"], ["86", 24, "1"], ["86", 31, "1"], ["86", 33, "1"], ["86", 34, "1"], ["86", 37, "1"], ["86", 38, "1"], ["86", 39, "1"], ["86", 40, "2"], ["86", 41, "2"], ["86", 42, "1"], ["86", 43, "1"], ["86", 45, "1"], ["86", 46, "1"], ["86", 49, "1"], ["86", 50, "1"], ["86", 51, "1"], ["86", 52, "1"], ["86", 53, "1"], ["86", 55, "1"], ["86", 56, "1"], ["86", 57, "1"], ["86", 81, "1"], ["86", 82, "1"], ["86", 91, "1"], ["86", 93, "1"], ["86", 94, "2"], ["86", 95, "1"], ["86", 96, "2"], ["86", 97, "1"], ["86", 98, "2"], ["86", 99, "2"], ["86", 100, "2"], ["86", 101, "2"], ["86", 102, "1"], ["86", 104, "1"], ["86", 106, "1"], ["87", 13, "3"], ["87", 14, "1"], ["87", 16, "2"], ["87", 17, "3"], ["87", 18, "3"], ["87", 19, "1"], ["87", 20, "1"], ["87", 21, "1"], ["87", 23, "1"], ["87", 24, "1"], ["87", 31, "1"], ["87", 33, "1"], ["87", 34, "1"], ["87", 37, "1"], ["87", 38, "1"], ["87", 39, "1"], ["87", 40, "2"], ["87", 41, "2"], ["87", 42, "1"], ["87", 43, "1"], ["87", 45, "1"], ["87", 46, "1"], ["87", 49, "1"], ["87", 50, "1"], ["87", 51, "1"], ["87", 52, "1"], ["87", 53, "1"], ["87", 55, "1"], ["87", 56, "1"], ["87", 57, "1"], ["87", 81, "1"], ["87", 82, "1"], ["87", 91, "1"], ["87", 93, "1"], ["87", 94, "2"], ["87", 95, "1"], ["87", 96, "2"], ["87", 97, "1"], ["87", 98, "2"], ["87", 99, "2"], ["87", 100, "2"], ["87", 101, "2"], ["87", 102, "1"], ["87", 104, "1"], ["87", 106, "1"], ["88", 13, "3"], ["88", 14, "1"], ["88", 16, "2"], ["88", 17, "3"], ["88", 18, "3"], ["88", 19, "1"], ["88", 20, "1"], ["88", 21, "1"], ["88", 23, "1"], ["88", 24, "1"], ["88", 31, "1"], ["88", 33, "1"], ["88", 34, "1"], ["88", 37, "1"], ["88", 38, "1"], ["88", 39, "1"], ["88", 40, "2"], ["88", 41, "2"], ["88", 42, "1"], ["88", 43, "1"], ["88", 45, "1"], ["88", 46, "1"], ["88", 49, "1"], ["88", 50, "1"], ["88", 51, "1"], ["88", 52, "1"], ["88", 53, "1"], ["88", 55, "1"], ["88", 56, "1"], ["88", 57, "1"], ["88", 81, "1"], ["88", 82, "1"], ["88", 91, "1"], ["88", 93, "1"], ["88", 94, "2"], ["88", 95, "1"], ["88", 96, "2"], ["88", 97, "1"], ["88", 98, "2"], ["88", 99, "2"], ["88", 100, "2"], ["88", 101, "2"], ["88", 102, "1"], ["88", 104, "1"], ["88", 106, "1"], ["89", 13, "3"], ["89", 14, "1"], ["89", 16, "2"], ["89", 17, "3"], ["89", 18, "3"], ["89", 19, "1"], ["89", 20, "1"], ["89", 21, "1"], ["89", 23, "1"], ["89", 24, "1"], ["89", 31, "1"], ["89", 33, "1"], ["89", 34, "1"], ["89", 37, "1"], ["89", 38, "1"], ["89", 39, "1"], ["89", 40, "2"], ["89", 41, "2"], ["89", 42, "1"], ["89", 43, "1"], ["89", 45, "1"], ["89", 46, "1"], ["89", 49, "1"], ["89", 50, "1"], ["89", 51, "1"], ["89", 52, "1"], ["89", 53, "1"], ["89", 55, "1"], ["89", 56, "1"], ["89", 57, "1"], ["89", 81, "1"], ["89", 82, "1"], ["89", 91, "1"], ["89", 93, "1"], ["89", 94, "2"], ["89", 95, "1"], ["89", 96, "2"], ["89", 97, "1"], ["89", 98, "2"], ["89", 99, "2"], ["89", 100, "2"], ["89", 101, "2"], ["89", 102, "1"], ["89", 104, "1"], ["89", 106, "1"], ["90", 13, "1"], ["90", 15, "2"], ["90", 16, "3"], ["90", 17, "3"], ["90", 18, "3"], ["90", 19, "2"], ["90", 20, "1"], ["90", 21, "1"], ["90", 22, "2"], ["90", 23, "1"], ["90", 24, "1"], ["90", 29, "2"], ["90", 30, "2"], ["90", 31, "2"], ["90", 32, "1"], ["90", 33, "1"], ["90", 34, "1"], ["90", 35, "1"], ["90", 36, "3"], ["90", 37, "3"], ["90", 38, "4"], ["90", 39, "4"], ["90", 40, "3"], ["90", 41, "2"], ["90", 42, "3"], ["90", 43, "4"], ["90", 44, "4"], ["90", 45, "4"], ["90", 46, "4"], ["90", 47, "3"], ["90", 48, "2"], ["90", 49, "1"], ["90", 50, "1"], ["90", 51, "1"], ["90", 52, "1"], ["90", 53, "1"], ["90", 54, "1"], ["90", 55, "1"], ["90", 56, "1"], ["90", 57, "1"], ["90", 58, "1"], ["90", 80, "1"], ["90", 81, "1"], ["90", 82, "1"], ["90", 85, "1"], ["90", 86, "1"], ["90", 90, "1"], ["90", 91, "1"], ["90", 92, "2"], ["90", 93, "2"], ["90", 94, "3"], ["90", 95, "3"], ["90", 96, "3"], ["90", 97, "3"], ["90", 98, "3"], ["90", 99, "3"], ["90", 100, "3"], ["90", 101, "2"], ["90", 102, "2"], ["90", 103, "2"], ["90", 104, "1"], ["90", 105, "1"], ["90", 106, "1"], ["90", 107, "1"], ["90", 108, "1"], ["90", 133, "1"], ["91", 13, "1"], ["91", 15, "2"], ["91", 16, "3"], ["91", 17, "3"], ["91", 18, "3"], ["91", 19, "2"], ["91", 20, "1"], ["91", 21, "1"], ["91", 22, "2"], ["91", 23, "1"], ["91", 24, "1"], ["91", 29, "2"], ["91", 30, "2"], ["91", 31, "2"], ["91", 32, "1"], ["91", 33, "1"], ["91", 34, "1"], ["91", 35, "1"], ["91", 36, "3"], ["91", 37, "3"], ["91", 38, "4"], ["91", 39, "4"], ["91", 40, "3"], ["91", 41, "2"], ["91", 42, "3"], ["91", 43, "4"], ["91", 44, "4"], ["91", 45, "4"], ["91", 46, "4"], ["91", 47, "3"], ["91", 48, "2"], ["91", 49, "1"], ["91", 50, "1"], ["91", 51, "1"], ["91", 52, "1"], ["91", 53, "1"], ["91", 54, "1"], ["91", 55, "1"], ["91", 56, "1"], ["91", 57, "1"], ["91", 58, "1"], ["91", 80, "1"], ["91", 81, "1"], ["91", 82, "1"], ["91", 85, "1"], ["91", 86, "1"], ["91", 90, "1"], ["91", 91, "1"], ["91", 92, "2"], ["91", 93, "2"], ["91", 94, "3"], ["91", 95, "3"], ["91", 96, "3"], ["91", 97, "3"], ["91", 98, "3"], ["91", 99, "3"], ["91", 100, "3"], ["91", 101, "2"], ["91", 102, "2"], ["91", 103, "2"], ["91", 104, "1"], ["91", 105, "1"], ["91", 106, "1"], ["91", 107, "1"], ["91", 108, "1"], ["91", 133, "1"], ["92", 13, "1"], ["92", 15, "2"], ["92", 16, "3"], ["92", 17, "3"], ["92", 18, "3"], ["92", 19, "2"], ["92", 20, "1"], ["92", 21, "1"], ["92", 22, "2"], ["92", 23, "1"], ["92", 24, "1"], ["92", 29, "2"], ["92", 30, "2"], ["92", 31, "2"], ["92", 32, "1"], ["92", 33, "1"], ["92", 34, "1"], ["92", 35, "1"], ["92", 36, "3"], ["92", 37, "3"], ["92", 38, "4"], ["92", 39, "4"], ["92", 40, "3"], ["92", 41, "2"], ["92", 42, "3"], ["92", 43, "4"], ["92", 44, "4"], ["92", 45, "4"], ["92", 46, "4"], ["92", 47, "3"], ["92", 48, "2"], ["92", 49, "1"], ["92", 50, "1"], ["92", 51, "1"], ["92", 52, "1"], ["92", 53, "1"], ["92", 54, "1"], ["92", 55, "1"], ["92", 56, "1"], ["92", 57, "1"], ["92", 58, "1"], ["92", 80, "1"], ["92", 81, "1"], ["92", 82, "1"], ["92", 85, "1"], ["92", 86, "1"], ["92", 90, "1"], ["92", 91, "1"], ["92", 92, "2"], ["92", 93, "2"], ["92", 94, "3"], ["92", 95, "3"], ["92", 96, "3"], ["92", 97, "3"], ["92", 98, "3"], ["92", 99, "3"], ["92", 100, "3"], ["92", 101, "2"], ["92", 102, "2"], ["92", 103, "2"], ["92", 104, "1"], ["92", 105, "1"], ["92", 106, "1"], ["92", 107, "1"], ["92", 108, "1"], ["92", 133, "1"], ["95", 15, "2"], ["95", 16, "2"], ["95", 17, "2"], ["95", 18, "2"], ["95", 19, "1"], ["95", 20, "1"], ["95", 21, "1"], ["95", 22, "1"], ["95", 23, "1"], ["95", 24, "1"], ["95", 28, "1"], ["95", 29, "1"], ["95", 30, "2"], ["95", 31, "2"], ["95", 32, "2"], ["95", 33, "2"], ["95", 34, "2"], ["95", 35, "4"], ["95", 36, "3"], ["95", 37, "5"], ["95", 38, "4"], ["95", 39, "4"], ["95", 40, "2"], ["95", 41, "2"], ["95", 42, "5"], ["95", 43, "4"], ["95", 44, "3"], ["95", 45, "3"], ["95", 46, "3"], ["95", 47, "1"], ["95", 48, "1"], ["95", 49, "1"], ["95", 50, "1"], ["95", 51, "1"], ["95", 52, "1"], ["95", 53, "1"], ["95", 54, "1"], ["95", 55, "1"], ["95", 56, "1"], ["95", 57, "1"], ["95", 59, "1"], ["95", 60, "1"], ["95", 80, "1"], ["95", 81, "1"], ["95", 82, "1"], ["95", 89, "1"], ["95", 90, "1"], ["95", 91, "1"], ["95", 92, "1"], ["95", 93, "1"], ["95", 94, "2"], ["95", 95, "2"], ["95", 96, "2"], ["95", 97, "2"], ["95", 98, "1"], ["95", 99, "3"], ["95", 100, "3"], ["95", 101, "1"], ["95", 102, "2"], ["95", 103, "1"], ["95", 104, "1"], ["95", 105, "1"], ["96", 15, "2"], ["96", 16, "2"], ["96", 17, "2"], ["96", 18, "2"], ["96", 19, "1"], ["96", 20, "1"], ["96", 21, "1"], ["96", 22, "1"], ["96", 23, "1"], ["96", 47, "1"], ["96", 48, "1"], ["96", 49, "1"], ["96", 50, "1"], ["96", 51, "1"], ["96", 52, "1"], ["96", 53, "1"], ["96", 54, "1"], ["96", 55, "1"], ["96", 56, "1"], ["96", 57, "1"], ["96", 58, "1"], ["96", 59, "1"], ["96", 60, "1"], ["96", 61, "1"], ["96", 62, "1"], ["96", 79, "1"], ["96", 80, "1"], ["96", 81, "1"], ["96", 82, "1"], ["96", 131, "1"], ["96", 132, "1"], ["97", 15, "2"], ["97", 16, "2"], ["97", 17, "2"], ["97", 18, "2"], ["97", 19, "1"], ["97", 20, "1"], ["97", 21, "1"], ["97", 22, "1"], ["97", 23, "1"], ["97", 47, "1"], ["97", 48, "1"], ["97", 49, "1"], ["97", 50, "1"], ["97", 51, "1"], ["97", 52, "1"], ["97", 53, "1"], ["97", 54, "1"], ["97", 55, "1"], ["97", 56, "1"], ["97", 57, "1"], ["97", 58, "1"], ["97", 59, "1"], ["97", 60, "1"], ["97", 61, "1"], ["97", 62, "1"], ["97", 79, "1"], ["97", 80, "1"], ["97", 81, "1"], ["97", 82, "1"], ["97", 131, "1"], ["97", 132, "1"], ["98", 15, "2"], ["98", 16, "2"], ["98", 17, "2"], ["98", 18, "2"], ["98", 19, "1"], ["98", 20, "1"], ["98", 21, "1"], ["98", 22, "1"], ["98", 23, "1"], ["98", 47, "1"], ["98", 48, "1"], ["98", 49, "1"], ["98", 50, "1"], ["98", 51, "1"], ["98", 52, "1"], ["98", 53, "1"], ["98", 54, "1"], ["98", 55, "1"], ["98", 56, "1"], ["98", 57, "1"], ["98", 58, "1"], ["98", 59, "1"], ["98", 60, "1"], ["98", 61, "1"], ["98", 62, "1"], ["98", 79, "1"], ["98", 80, "1"], ["98", 81, "1"], ["98", 82, "1"], ["98", 131, "1"], ["98", 132, "1"], ["99", 15, "2"], ["99", 16, "2"], ["99", 17, "2"], ["99", 18, "2"], ["99", 19, "1"], ["99", 20, "1"], ["99", 21, "1"], ["99", 22, "1"], ["99", 23, "1"], ["99", 47, "1"], ["99", 48, "1"], ["99", 49, "1"], ["99", 50, "1"], ["99", 51, "1"], ["99", 52, "1"], ["99", 53, "1"], ["99", 54, "1"], ["99", 55, "1"], ["99", 56, "1"], ["99", 57, "1"], ["99", 58, "1"], ["99", 59, "1"], ["99", 60, "1"], ["99", 61, "1"], ["99", 62, "1"], ["99", 79, "1"], ["99", 80, "1"], ["99", 81, "1"], ["99", 82, "1"], ["99", 131, "1"], ["99", 132, "1"], ["100", 15, "2"], ["100", 16, "2"], ["100", 17, "2"], ["100", 18, "2"], ["100", 19, "1"], ["100", 20, "1"], ["100", 21, "1"], ["100", 22, "1"], ["100", 23, "1"], ["100", 47, "1"], ["100", 48, "1"], ["100", 49, "1"], ["100", 50, "1"], ["100", 51, "1"], ["100", 52, "1"], ["100", 53, "1"], ["100", 54, "1"], ["100", 55, "1"], ["100", 56, "1"], ["100", 57, "1"], ["100", 58, "1"], ["100", 59, "1"], ["100", 60, "1"], ["100", 61, "1"], ["100", 62, "1"], ["100", 79, "1"], ["100", 80, "1"], ["100", 81, "1"], ["100", 82, "1"], ["100", 131, "1"], ["100", 132, "1"], ["101", 14, "2"], ["101", 15, "2"], ["101", 16, "3"], ["101", 17, "2"], ["101", 18, "1"], ["101", 19, "2"], ["101", 20, "1"], ["101", 21, "2"], ["101", 22, "1"], ["101", 23, "1"], ["101", 24, "1"], ["101", 78, "1"], ["101", 79, "1"], ["101", 80, "1"], ["101", 81, "1"], ["101", 82, "1"], ["101", 83, "1"], ["101", 84, "1"], ["101", 85, "1"], ["101", 129, "1"], ["101", 130, "1"], ["101", 131, "1"], ["101", 132, "1"], ["101", 134, "1"], ["101", 135, "1"], ["101", 136, "1"], ["101", 154, "1"], ["101", 155, "1"], ["102", 14, "2"], ["102", 15, "2"], ["102", 16, "3"], ["102", 17, "2"], ["102", 18, "1"], ["102", 19, "2"], ["102", 20, "1"], ["102", 21, "2"], ["102", 22, "1"], ["102", 23, "1"], ["102", 24, "1"], ["102", 78, "1"], ["102", 79, "1"], ["102", 80, "1"], ["102", 81, "1"], ["102", 82, "1"], ["102", 83, "1"], ["102", 84, "1"], ["102", 85, "1"], ["102", 129, "1"], ["102", 130, "1"], ["102", 131, "1"], ["102", 132, "1"], ["102", 134, "1"], ["102", 135, "1"], ["102", 136, "1"], ["102", 154, "1"], ["102", 155, "1"], ["103", 14, "2"], ["103", 15, "2"], ["103", 16, "3"], ["103", 17, "2"], ["103", 18, "1"], ["103", 19, "2"], ["103", 20, "1"], ["103", 21, "2"], ["103", 22, "1"], ["103", 23, "1"], ["103", 24, "1"], ["103", 78, "1"], ["103", 79, "1"], ["103", 80, "1"], ["103", 81, "1"], ["103", 82, "1"], ["103", 83, "1"], ["103", 84, "1"], ["103", 85, "1"], ["103", 129, "1"], ["103", 130, "1"], ["103", 131, "1"], ["103", 132, "1"], ["103", 134, "1"], ["103", 135, "1"], ["103", 136, "1"], ["103", 154, "1"], ["103", 155, "1"], ["104", 14, "2"], ["104", 15, "2"], ["104", 16, "3"], ["104", 17, "3"], ["104", 18, "1"], ["104", 19, "2"], ["104", 20, "2"], ["104", 21, "2"], ["104", 22, "2"], ["104", 23, "2"], ["104", 24, "2"], ["104", 73, "1"], ["104", 78, "1"], ["104", 79, "1"], ["104", 80, "1"], ["104", 81, "1"], ["104", 82, "1"], ["104", 83, "1"], ["104", 84, "1"], ["104", 85, "1"], ["104", 86, "1"], ["104", 87, "1"], ["104", 88, "1"], ["104", 95, "1"], ["104", 96, "1"], ["104", 97, "1"], ["104", 98, "1"], ["104", 99, "1"], ["104", 101, "1"], ["104", 102, "1"], ["104", 103, "1"], ["104", 126, "1"], ["104", 128, "2"], ["104", 129, "1"], ["104", 130, "1"], ["104", 131, "1"], ["104", 132, "3"], ["104", 133, "4"], ["104", 134, "3"], ["104", 135, "1"], ["104", 136, "1"], ["104", 137, "1"], ["104", 139, "1"], ["104", 152, "1"], ["104", 153, "1"], ["104", 154, "1"], ["104", null, "1"], ["104", null, "1"], ["104", null, "1"], ["104", null, "1"], ["104", null, "1"], ["105", 14, "2"], ["105", 15, "2"], ["105", 16, "3"], ["105", 17, "3"], ["105", 18, "1"], ["105", 19, "2"], ["105", 20, "2"], ["105", 21, "2"], ["105", 22, "2"], ["105", 23, "2"], ["105", 24, "2"], ["105", 73, "1"], ["105", 78, "1"], ["105", 79, "1"], ["105", 80, "1"], ["105", 81, "1"], ["105", 82, "1"], ["105", 83, "1"], ["105", 84, "1"], ["105", 85, "1"], ["105", 86, "1"], ["105", 87, "1"], ["105", 88, "1"], ["105", 95, "1"], ["105", 96, "1"], ["105", 97, "1"], ["105", 98, "1"], ["105", 99, "1"], ["105", 101, "1"], ["105", 102, "1"], ["105", 103, "1"], ["105", 126, "1"], ["105", 128, "2"], ["105", 129, "1"], ["105", 130, "1"], ["105", 131, "1"], ["105", 132, "3"], ["105", 133, "4"], ["105", 134, "3"], ["105", 135, "1"], ["105", 136, "1"], ["105", 137, "1"], ["105", 139, "1"], ["105", 152, "1"], ["105", 153, "1"], ["105", 154, "1"], ["105", null, "1"], ["105", null, "1"], ["105", null, "1"], ["105", null, "1"], ["105", null, "1"], ["106", 13, "1"], ["106", 14, "1"], ["106", 15, "1"], ["106", 16, "2"], ["106", 17, "2"], ["106", 18, "1"], ["106", 19, "1"], ["106", 20, "1"], ["106", 21, "1"], ["106", 22, "1"], ["106", 23, "2"], ["106", 24, "2"], ["106", 95, "2"], ["106", 96, "1"], ["106", 97, "1"], ["106", 98, "2"], ["106", 99, "1"], ["106", 100, "2"], ["106", 101, "2"], ["106", 102, "2"], ["106", 103, "2"], ["106", 104, "1"], ["106", 105, "1"], ["106", 106, "1"], ["106", 107, "1"], ["106", 108, "2"], ["106", 109, "1"], ["106", 128, "1"], ["106", 129, "1"], ["106", 130, "1"], ["106", 131, "1"], ["106", 132, "3"], ["106", 133, "2"], ["106", 134, "1"], ["106", 135, "1"], ["106", 136, "1"], ["106", 137, "1"], ["106", 138, "1"], ["106", 139, "1"], ["106", 151, "1"], ["106", 152, "1"], ["106", 153, "1"], ["106", 154, "1"], ["107", 13, "1"], ["107", 14, "1"], ["107", 15, "1"], ["107", 16, "2"], ["107", 17, "2"], ["107", 18, "1"], ["107", 19, "1"], ["107", 20, "1"], ["107", 21, "1"], ["107", 22, "1"], ["107", 23, "2"], ["107", 24, "2"], ["107", 95, "2"], ["107", 96, "1"], ["107", 97, "1"], ["107", 98, "2"], ["107", 99, "1"], ["107", 100, "2"], ["107", 101, "2"], ["107", 102, "2"], ["107", 103, "2"], ["107", 104, "1"], ["107", 105, "1"], ["107", 106, "1"], ["107", 107, "1"], ["107", 108, "2"], ["107", 109, "1"], ["107", 128, "1"], ["107", 129, "1"], ["107", 130, "1"], ["107", 131, "1"], ["107", 132, "3"], ["107", 133, "2"], ["107", 134, "1"], ["107", 135, "1"], ["107", 136, "1"], ["107", 137, "1"], ["107", 138, "1"], ["107", 139, "1"], ["107", 151, "1"], ["107", 152, "1"], ["107", 153, "1"], ["107", 154, "1"], ["108", 13, "1"], ["108", 14, "1"], ["108", 15, "1"], ["108", 16, "2"], ["108", 17, "2"], ["108", 18, "1"], ["108", 19, "1"], ["108", 20, "1"], ["108", 21, "1"], ["108", 22, "1"], ["108", 23, "2"], ["108", 24, "2"], ["108", 95, "2"], ["108", 96, "1"], ["108", 97, "1"], ["108", 98, "2"], ["108", 99, "1"], ["108", 100, "2"], ["108", 101, "2"], ["108", 102, "2"], ["108", 103, "2"], ["108", 104, "1"], ["108", 105, "1"], ["108", 106, "1"], ["108", 107, "1"], ["108", 108, "2"], ["108", 109, "1"], ["108", 128, "1"], ["108", 129, "1"], ["108", 130, "1"], ["108", 131, "1"], ["108", 132, "3"], ["108", 133, "2"], ["108", 134, "1"], ["108", 135, "1"], ["108", 136, "1"], ["108", 137, "1"], ["108", 138, "1"], ["108", 139, "1"], ["108", 151, "1"], ["108", 152, "1"], ["108", 153, "1"], ["108", 154, "1"], ["109", 13, "1"], ["109", 14, "1"], ["109", 15, "1"], ["109", 16, "2"], ["109", 17, "2"], ["109", 18, "1"], ["109", 19, "1"], ["109", 20, "1"], ["109", 21, "1"], ["109", 22, "1"], ["109", 23, "2"], ["109", 24, "2"], ["109", 95, "2"], ["109", 96, "1"], ["109", 97, "1"], ["109", 98, "2"], ["109", 99, "1"], ["109", 100, "2"], ["109", 101, "2"], ["109", 102, "2"], ["109", 103, "2"], ["109", 104, "1"], ["109", 105, "1"], ["109", 106, "1"], ["109", 107, "1"], ["109", 108, "2"], ["109", 109, "1"], ["109", 128, "1"], ["109", 129, "1"], ["109", 130, "1"], ["109", 131, "1"], ["109", 132, "3"], ["109", 133, "2"], ["109", 134, "1"], ["109", 135, "1"], ["109", 136, "1"], ["109", 137, "1"], ["109", 138, "1"], ["109", 139, "1"], ["109", 151, "1"], ["109", 152, "1"], ["109", 153, "1"], ["109", 154, "1"], ["111", 13, "1"], ["111", 14, "1"], ["111", 15, "1"], ["111", 16, "2"], ["111", 17, "2"], ["111", 18, "1"], ["111", 19, "1"], ["111", 20, "1"], ["111", 21, "1"], ["111", 22, "1"], ["111", 23, "2"], ["111", 24, "2"], ["111", 95, "2"], ["111", 96, "1"], ["111", 97, "1"], ["111", 98, "2"], ["111", 99, "1"], ["111", 100, "2"], ["111", 101, "2"], ["111", 102, "2"], ["111", 103, "2"], ["111", 104, "1"], ["111", 105, "1"], ["111", 106, "1"], ["111", 107, "1"], ["111", 108, "2"], ["111", 109, "1"], ["111", 128, "1"], ["111", 129, "1"], ["111", 130, "1"], ["111", 131, "1"], ["111", 132, "3"], ["111", 133, "2"], ["111", 134, "1"], ["111", 135, "1"], ["111", 136, "1"], ["111", 137, "1"], ["111", 138, "1"], ["111", 139, "1"], ["111", 151, "1"], ["111", 152, "1"], ["111", 153, "1"], ["111", 154, "1"], ["112", 13, "1"], ["112", 14, "2"], ["112", 15, "2"], ["112", 16, "3"], ["112", 17, "2"], ["112", 18, "2"], ["112", 19, "2"], ["112", 20, "2"], ["112", 21, "2"], ["112", 22, "1"], ["112", 23, "2"], ["112", 24, "2"], ["112", 93, "1"], ["112", 94, "1"], ["112", 95, "1"], ["112", 96, "1"], ["112", 97, "1"], ["112", 98, "1"], ["112", 99, "1"], ["112", 100, "1"], ["112", 101, "1"], ["112", 102, "1"], ["112", 103, "2"], ["112", 104, "2"], ["112", 105, "2"], ["112", 106, "2"], ["112", 107, "3"], ["112", 108, "3"], ["112", 109, "2"], ["112", 128, "2"], ["112", 130, "2"], ["112", 131, "2"], ["112", 132, "5"], ["112", 133, "3"], ["112", 134, "2"], ["112", 135, "2"], ["112", 136, "1"], ["112", 137, "2"], ["112", 138, "3"], ["112", 139, "1"], ["112", 150, "1"], ["112", 151, "1"], ["112", 152, "1"], ["112", 153, "1"], ["112", 154, "1"], ["113", 13, "1"], ["113", 14, "2"], ["113", 15, "2"], ["113", 16, "3"], ["113", 17, "2"], ["113", 18, "2"], ["113", 19, "2"], ["113", 20, "2"], ["113", 21, "2"], ["113", 22, "1"], ["113", 23, "2"], ["113", 24, "2"], ["113", 93, "1"], ["113", 94, "1"], ["113", 95, "1"], ["113", 96, "1"], ["113", 97, "1"], ["113", 98, "1"], ["113", 99, "1"], ["113", 100, "1"], ["113", 101, "1"], ["113", 102, "1"], ["113", 103, "2"], ["113", 104, "2"], ["113", 105, "2"], ["113", 106, "2"], ["113", 107, "3"], ["113", 108, "3"], ["113", 109, "2"], ["113", 128, "2"], ["113", 130, "2"], ["113", 131, "2"], ["113", 132, "5"], ["113", 133, "3"], ["113", 134, "2"], ["113", 135, "2"], ["113", 136, "1"], ["113", 137, "2"], ["113", 138, "3"], ["113", 139, "1"], ["113", 150, "1"], ["113", 151, "1"], ["113", 152, "1"], ["113", 153, "1"], ["113", 154, "1"], ["114", 13, "1"], ["114", 14, "2"], ["114", 15, "2"], ["114", 16, "3"], ["114", 17, "2"], ["114", 18, "2"], ["114", 19, "2"], ["114", 20, "2"], ["114", 21, "2"], ["114", 22, "1"], ["114", 23, "2"], ["114", 24, "2"], ["114", 93, "1"], ["114", 94, "1"], ["114", 95, "1"], ["114", 96, "1"], ["114", 97, "1"], ["114", 98, "1"], ["114", 99, "1"], ["114", 100, "1"], ["114", 101, "1"], ["114", 102, "1"], ["114", 103, "2"], ["114", 104, "2"], ["114", 105, "2"], ["114", 106, "2"], ["114", 107, "3"], ["114", 108, "3"], ["114", 109, "2"], ["114", 128, "2"], ["114", 130, "2"], ["114", 131, "2"], ["114", 132, "5"], ["114", 133, "3"], ["114", 134, "2"], ["114", 135, "2"], ["114", 136, "1"], ["114", 137, "2"], ["114", 138, "3"], ["114", 139, "1"], ["114", 150, "1"], ["114", 151, "1"], ["114", 152, "1"], ["114", 153, "1"], ["114", 154, "1"], ["115", 12, "1"], ["115", 13, "1"], ["115", 14, "2"], ["115", 15, "2"], ["115", 16, "2"], ["115", 17, "1"], ["115", 18, "2"], ["115", 19, "1"], ["115", 20, "2"], ["115", 21, "1"], ["115", 22, "1"], ["115", 82, "1"], ["115", 93, "1"], ["115", 94, "1"], ["115", 95, "1"], ["115", 96, "1"], ["115", 97, "1"], ["115", 98, "1"], ["115", 99, "1"], ["115", 100, "2"], ["115", 101, "2"], ["115", 102, "2"], ["115", 103, "3"], ["115", 104, "3"], ["115", 105, "3"], ["115", 106, "3"], ["115", 107, "3"], ["115", 108, "3"], ["115", 109, "1"], ["115", 129, "1"], ["115", 130, "1"], ["115", 152, "1"], ["115", 153, "1"], ["116", 12, "1"], ["116", 13, "1"], ["116", 14, "2"], ["116", 15, "2"], ["116", 16, "2"], ["116", 17, "1"], ["116", 18, "2"], ["116", 19, "1"], ["116", 20, "2"], ["116", 21, "1"], ["116", 22, "1"], ["116", 82, "1"], ["116", 93, "1"], ["116", 94, "1"], ["116", 95, "1"], ["116", 96, "1"], ["116", 97, "1"], ["116", 98, "1"], ["116", 99, "1"], ["116", 100, "2"], ["116", 101, "2"], ["116", 102, "2"], ["116", 103, "3"], ["116", 104, "3"], ["116", 105, "3"], ["116", 106, "3"], ["116", 107, "3"], ["116", 108, "3"], ["116", 109, "1"], ["116", 129, "1"], ["116", 130, "1"], ["116", 152, "1"], ["116", 153, "1"], ["117", 12, "1"], ["117", 13, "1"], ["117", 14, "2"], ["117", 15, "2"], ["117", 16, "2"], ["117", 17, "1"], ["117", 18, "2"], ["117", 19, "1"], ["117", 20, "2"], ["117", 21, "1"], ["117", 22, "1"], ["117", 82, "1"], ["117", 93, "1"], ["117", 94, "1"], ["117", 95, "1"], ["117", 96, "1"], ["117", 97, "1"], ["117", 98, "1"], ["117", 99, "1"], ["117", 100, "2"], ["117", 101, "2"], ["117", 102, "2"], ["117", 103, "3"], ["117", 104, "3"], ["117", 105, "3"], ["117", 106, "3"], ["117", 107, "3"], ["117", 108, "3"], ["117", 109, "1"], ["117", 129, "1"], ["117", 130, "1"], ["117", 152, "1"], ["117", 153, "1"], ["119", 12, "1"], ["119", 13, "1"], ["119", 14, "2"], ["119", 15, "2"], ["119", 16, "2"], ["119", 17, "1"], ["119", 18, "2"], ["119", 19, "1"], ["119", 20, "2"], ["119", 21, "1"], ["119", 22, "1"], ["119", 82, "1"], ["119", 93, "1"], ["119", 94, "1"], ["119", 95, "1"], ["119", 96, "1"], ["119", 97, "1"], ["119", 98, "1"], ["119", 99, "1"], ["119", 100, "2"], ["119", 101, "2"], ["119", 102, "2"], ["119", 103, "3"], ["119", 104, "3"], ["119", 105, "3"], ["119", 106, "3"], ["119", 107, "3"], ["119", 108, "3"], ["119", 109, "1"], ["119", 129, "1"], ["119", 130, "1"], ["119", 152, "1"], ["119", 153, "1"], ["120", 11, "1"], ["120", 12, "1"], ["120", 13, "2"], ["120", 14, "2"], ["120", 15, "2"], ["120", 16, "3"], ["120", 17, "3"], ["120", 18, "2"], ["120", 19, "2"], ["120", 20, "2"], ["120", 21, "2"], ["120", 22, "2"], ["120", 23, "1"], ["120", 24, "1"], ["120", 79, "1"], ["120", 80, "2"], ["120", 81, "2"], ["120", 82, "1"], ["120", 83, "1"], ["120", 89, "1"], ["120", 90, "1"], ["120", 92, "1"], ["120", 93, "1"], ["120", 94, "1"], ["120", 95, "3"], ["120", 96, "3"], ["120", 97, "4"], ["120", 98, "3"], ["120", 99, "3"], ["120", 100, "3"], ["120", 101, "3"], ["120", 102, "3"], ["120", 103, "4"], ["120", 104, "4"], ["120", 105, "4"], ["120", 106, "3"], ["120", 107, "3"], ["120", 108, "3"], ["120", 109, "2"], ["120", 110, "2"], ["120", 111, "1"], ["120", 119, "1"], ["120", 120, "1"], ["120", 125, "1"], ["120", 126, "2"], ["120", 127, "2"], ["120", 128, "3"], ["120", 129, "5"], ["120", 130, "4"], ["120", 131, "3"], ["120", 132, "2"], ["120", 133, "2"], ["121", 11, "1"], ["121", 12, "1"], ["121", 13, "2"], ["121", 14, "2"], ["121", 15, "2"], ["121", 16, "3"], ["121", 17, "2"], ["121", 18, "2"], ["121", 19, "2"], ["121", 20, "2"], ["121", 21, "2"], ["121", 22, "2"], ["121", 23, "1"], ["121", 24, "1"], ["121", 69, "1"], ["121", 70, "1"], ["121", 71, "1"], ["121", 75, "1"], ["121", 76, "1"], ["121", 77, "1"], ["121", 78, "2"], ["121", 79, "2"], ["121", 80, "2"], ["121", 81, "1"], ["121", 82, "1"], ["121", 83, "1"], ["121", 92, "1"], ["121", 93, "1"], ["121", 94, "2"], ["121", 95, "2"], ["121", 96, "3"], ["121", 97, "3"], ["121", 98, "3"], ["121", 99, "3"], ["121", 100, "4"], ["121", 101, "4"], ["121", 102, "4"], ["121", 103, "4"], ["121", 104, "4"], ["121", 105, "4"], ["121", 106, "3"], ["121", 107, "3"], ["121", 108, "2"], ["121", 109, "1"], ["121", 110, "1"], ["121", 125, "1"], ["121", 129, "1"], ["121", 130, "2"], ["121", 131, "1"], ["121", 132, "1"], ["122", 11, "1"], ["122", 12, "1"], ["122", 13, "2"], ["122", 14, "2"], ["122", 15, "2"], ["122", 16, "3"], ["122", 17, "2"], ["122", 18, "2"], ["122", 19, "2"], ["122", 20, "2"], ["122", 21, "2"], ["122", 22, "2"], ["122", 23, "1"], ["122", 24, "1"], ["122", 69, "1"], ["122", 70, "1"], ["122", 71, "1"], ["122", 75, "1"], ["122", 76, "1"], ["122", 77, "1"], ["122", 78, "2"], ["122", 79, "2"], ["122", 80, "2"], ["122", 81, "1"], ["122", 82, "1"], ["122", 83, "1"], ["122", 92, "1"], ["122", 93, "1"], ["122", 94, "2"], ["122", 95, "2"], ["122", 96, "3"], ["122", 97, "3"], ["122", 98, "3"], ["122", 99, "3"], ["122", 100, "4"], ["122", 101, "4"], ["122", 102, "4"], ["122", 103, "4"], ["122", 104, "4"], ["122", 105, "4"], ["122", 106, "3"], ["122", 107, "3"], ["122", 108, "2"], ["122", 109, "1"], ["122", 110, "1"], ["122", 125, "1"], ["122", 129, "1"], ["122", 130, "2"], ["122", 131, "1"], ["122", 132, "1"], ["123", 11, "1"], ["123", 12, "1"], ["123", 13, "2"], ["123", 14, "2"], ["123", 15, "2"], ["123", 16, "3"], ["123", 17, "2"], ["123", 18, "2"], ["123", 19, "2"], ["123", 20, "2"], ["123", 21, "2"], ["123", 22, "2"], ["123", 23, "1"], ["123", 24, "1"], ["123", 69, "1"], ["123", 70, "1"], ["123", 71, "1"], ["123", 75, "1"], ["123", 76, "1"], ["123", 77, "1"], ["123", 78, "2"], ["123", 79, "2"], ["123", 80, "2"], ["123", 81, "1"], ["123", 82, "1"], ["123", 83, "1"], ["123", 92, "1"], ["123", 93, "1"], ["123", 94, "2"], ["123", 95, "2"], ["123", 96, "3"], ["123", 97, "3"], ["123", 98, "3"], ["123", 99, "3"], ["123", 100, "4"], ["123", 101, "4"], ["123", 102, "4"], ["123", 103, "4"], ["123", 104, "4"], ["123", 105, "4"], ["123", 106, "3"], ["123", 107, "3"], ["123", 108, "2"], ["123", 109, "1"], ["123", 110, "1"], ["123", 125, "1"], ["123", 129, "1"], ["123", 130, "2"], ["123", 131, "1"], ["123", 132, "1"], ["124", 11, "1"], ["124", 12, "1"], ["124", 13, "2"], ["124", 14, "2"], ["124", 15, "2"], ["124", 16, "3"], ["124", 17, "2"], ["124", 18, "2"], ["124", 19, "2"], ["124", 20, "2"], ["124", 21, "2"], ["124", 22, "2"], ["124", 23, "1"], ["124", 24, "1"], ["124", 69, "1"], ["124", 70, "1"], ["124", 71, "1"], ["124", 75, "1"], ["124", 76, "1"], ["124", 77, "1"], ["124", 78, "2"], ["124", 79, "2"], ["124", 80, "2"], ["124", 81, "1"], ["124", 82, "1"], ["124", 83, "1"], ["124", 92, "1"], ["124", 93, "1"], ["124", 94, "2"], ["124", 95, "2"], ["124", 96, "3"], ["124", 97, "3"], ["124", 98, "3"], ["124", 99, "3"], ["124", 100, "4"], ["124", 101, "4"], ["124", 102, "4"], ["124", 103, "4"], ["124", 104, "4"], ["124", 105, "4"], ["124", 106, "3"], ["124", 107, "3"], ["124", 108, "2"], ["124", 109, "1"], ["124", 110, "1"], ["124", 125, "1"], ["124", 129, "1"], ["124", 130, "2"], ["124", 131, "1"], ["124", 132, "1"], ["125", 11, "1"], ["125", 12, "1"], ["125", 13, "2"], ["125", 14, "2"], ["125", 15, "2"], ["125", 16, "3"], ["125", 17, "2"], ["125", 18, "2"], ["125", 19, "2"], ["125", 20, "2"], ["125", 21, "2"], ["125", 22, "2"], ["125", 23, "1"], ["125", 24, "1"], ["125", 69, "1"], ["125", 70, "1"], ["125", 71, "1"], ["125", 75, "1"], ["125", 76, "1"], ["125", 77, "1"], ["125", 78, "2"], ["125", 79, "2"], ["125", 80, "2"], ["125", 81, "1"], ["125", 82, "1"], ["125", 83, "1"], ["125", 92, "1"], ["125", 93, "1"], ["125", 94, "2"], ["125", 95, "2"], ["125", 96, "3"], ["125", 97, "3"], ["125", 98, "3"], ["125", 99, "3"], ["125", 100, "4"], ["125", 101, "4"], ["125", 102, "4"], ["125", 103, "4"], ["125", 104, "4"], ["125", 105, "4"], ["125", 106, "3"], ["125", 107, "3"], ["125", 108, "2"], ["125", 109, "1"], ["125", 110, "1"], ["125", 125, "1"], ["125", 129, "1"], ["125", 130, "2"], ["125", 131, "1"], ["125", 132, "1"], ["126", 11, "1"], ["126", 12, "1"], ["126", 13, "2"], ["126", 14, "2"], ["126", 15, "2"], ["126", 16, "3"], ["126", 17, "2"], ["126", 18, "2"], ["126", 19, "2"], ["126", 20, "2"], ["126", 21, "2"], ["126", 22, "2"], ["126", 23, "1"], ["126", 24, "1"], ["126", 69, "1"], ["126", 70, "1"], ["126", 71, "1"], ["126", 75, "1"], ["126", 76, "1"], ["126", 77, "1"], ["126", 78, "2"], ["126", 79, "2"], ["126", 80, "2"], ["126", 81, "1"], ["126", 82, "1"], ["126", 83, "1"], ["126", 92, "1"], ["126", 93, "1"], ["126", 94, "2"], ["126", 95, "2"], ["126", 96, "3"], ["126", 97, "3"], ["126", 98, "3"], ["126", 99, "3"], ["126", 100, "4"], ["126", 101, "4"], ["126", 102, "4"], ["126", 103, "4"], ["126", 104, "4"], ["126", 105, "4"], ["126", 106, "3"], ["126", 107, "3"], ["126", 108, "2"], ["126", 109, "1"], ["126", 110, "1"], ["126", 125, "1"], ["126", 129, "1"], ["126", 130, "2"], ["126", 131, "1"], ["126", 132, "1"], ["128", 11, "1"], ["128", 12, "2"], ["128", 13, "3"], ["128", 14, "3"], ["128", 15, "3"], ["128", 16, "3"], ["128", 17, "4"], ["128", 18, "4"], ["128", 19, "2"], ["128", 20, "2"], ["128", 21, "2"], ["128", 22, "2"], ["128", 23, "2"], ["128", 24, "1"], ["128", 27, "1"], ["128", 28, "1"], ["128", 29, "1"], ["128", 49, "1"], ["128", 50, "1"], ["128", 51, "1"], ["128", 52, "1"], ["128", 53, "1"], ["128", 67, "1"], ["128", 68, "1"], ["128", 69, "1"], ["128", 70, "2"], ["128", 71, "2"], ["128", 72, "2"], ["128", 73, "2"], ["128", 74, "2"], ["128", 75, "2"], ["128", 76, "2"], ["128", 77, "3"], ["128", 78, "4"], ["128", 79, "4"], ["128", 80, "4"], ["128", 81, "3"], ["128", 82, "3"], ["128", 83, "4"], ["128", 84, "1"], ["128", 85, "2"], ["128", 86, "3"], ["128", 87, "2"], ["128", 88, "3"], ["128", 89, "2"], ["128", 90, "4"], ["128", 91, "3"], ["128", 92, "4"], ["128", 93, "4"], ["128", 94, "4"], ["128", 95, "6"], ["128", 96, "4"], ["128", 97, "5"], ["128", 98, "4"], ["128", 99, "4"], ["128", 100, "5"], ["128", 101, "5"], ["128", 102, "4"], ["128", 103, "4"], ["128", 104, "4"], ["128", 105, "4"], ["128", 106, "3"], ["128", 107, "3"], ["128", 108, "3"], ["128", 109, "3"], ["128", 110, "1"], ["128", 111, "1"], ["128", 118, "1"], ["128", 119, "1"], ["128", 124, "2"], ["128", 125, "3"], ["128", 126, "4"], ["128", 127, "4"], ["128", 128, "6"], ["128", 129, "7"], ["128", 130, "6"], ["128", 131, "3"], ["128", 132, "2"], ["128", 133, "1"], ["128", 139, "1"], ["128", 140, "1"], ["128", 141, "1"], ["128", 142, "1"], ["128", 143, "1"], ["129", 11, "1"], ["129", 12, "2"], ["129", 13, "3"], ["129", 14, "3"], ["129", 15, "3"], ["129", 16, "3"], ["129", 17, "4"], ["129", 18, "4"], ["129", 19, "2"], ["129", 20, "2"], ["129", 21, "2"], ["129", 22, "2"], ["129", 23, "2"], ["129", 24, "1"], ["129", 27, "1"], ["129", 28, "1"], ["129", 29, "1"], ["129", 49, "1"], ["129", 50, "1"], ["129", 51, "1"], ["129", 52, "1"], ["129", 53, "1"], ["129", 67, "1"], ["129", 68, "1"], ["129", 69, "1"], ["129", 70, "2"], ["129", 71, "2"], ["129", 72, "2"], ["129", 73, "2"], ["129", 74, "2"], ["129", 75, "2"], ["129", 76, "2"], ["129", 77, "3"], ["129", 78, "4"], ["129", 79, "4"], ["129", 80, "4"], ["129", 81, "3"], ["129", 82, "3"], ["129", 83, "4"], ["129", 84, "1"], ["129", 85, "2"], ["129", 86, "3"], ["129", 87, "2"], ["129", 88, "3"], ["129", 89, "2"], ["129", 90, "4"], ["129", 91, "3"], ["129", 92, "4"], ["129", 93, "4"], ["129", 94, "4"], ["129", 95, "6"], ["129", 96, "4"], ["129", 97, "5"], ["129", 98, "4"], ["129", 99, "4"], ["129", 100, "5"], ["129", 101, "5"], ["129", 102, "4"], ["129", 103, "4"], ["129", 104, "4"], ["129", 105, "4"], ["129", 106, "3"], ["129", 107, "3"], ["129", 108, "3"], ["129", 109, "3"], ["129", 110, "1"], ["129", 111, "1"], ["129", 118, "1"], ["129", 119, "1"], ["129", 124, "2"], ["129", 125, "3"], ["129", 126, "4"], ["129", 127, "4"], ["129", 128, "6"], ["129", 129, "7"], ["129", 130, "6"], ["129", 131, "3"], ["129", 132, "2"], ["129", 133, "1"], ["129", 139, "1"], ["129", 140, "1"], ["129", 141, "1"], ["129", 142, "1"], ["129", 143, "1"], ["130", 11, "1"], ["130", 12, "2"], ["130", 13, "3"], ["130", 14, "3"], ["130", 15, "3"], ["130", 16, "3"], ["130", 17, "4"], ["130", 18, "4"], ["130", 19, "2"], ["130", 20, "2"], ["130", 21, "2"], ["130", 22, "2"], ["130", 23, "2"], ["130", 24, "1"], ["130", 27, "1"], ["130", 28, "1"], ["130", 29, "1"], ["130", 49, "1"], ["130", 50, "1"], ["130", 51, "1"], ["130", 52, "1"], ["130", 53, "1"], ["130", 67, "1"], ["130", 68, "1"], ["130", 69, "1"], ["130", 70, "2"], ["130", 71, "2"], ["130", 72, "2"], ["130", 73, "2"], ["130", 74, "2"], ["130", 75, "2"], ["130", 76, "2"], ["130", 77, "3"], ["130", 78, "4"], ["130", 79, "4"], ["130", 80, "4"], ["130", 81, "3"], ["130", 82, "3"], ["130", 83, "4"], ["130", 84, "1"], ["130", 85, "2"], ["130", 86, "3"], ["130", 87, "2"], ["130", 88, "3"], ["130", 89, "2"], ["130", 90, "4"], ["130", 91, "3"], ["130", 92, "4"], ["130", 93, "4"], ["130", 94, "4"], ["130", 95, "6"], ["130", 96, "4"], ["130", 97, "5"], ["130", 98, "4"], ["130", 99, "4"], ["130", 100, "5"], ["130", 101, "5"], ["130", 102, "4"], ["130", 103, "4"], ["130", 104, "4"], ["130", 105, "4"], ["130", 106, "3"], ["130", 107, "3"], ["130", 108, "3"], ["130", 109, "3"], ["130", 110, "1"], ["130", 111, "1"], ["130", 118, "1"], ["130", 119, "1"], ["130", 124, "2"], ["130", 125, "3"], ["130", 126, "4"], ["130", 127, "4"], ["130", 128, "6"], ["130", 129, "7"], ["130", 130, "6"], ["130", 131, "3"], ["130", 132, "2"], ["130", 133, "1"], ["130", 139, "1"], ["130", 140, "1"], ["130", 141, "1"], ["130", 142, "1"], ["130", 143, "1"], ["131", 11, "1"], ["131", 12, "2"], ["131", 13, "3"], ["131", 14, "3"], ["131", 15, "3"], ["131", 16, "3"], ["131", 17, "4"], ["131", 18, "4"], ["131", 19, "2"], ["131", 20, "2"], ["131", 21, "2"], ["131", 22, "2"], ["131", 23, "2"], ["131", 24, "1"], ["131", 27, "1"], ["131", 28, "1"], ["131", 29, "1"], ["131", 49, "1"], ["131", 50, "1"], ["131", 51, "1"], ["131", 52, "1"], ["131", 53, "1"], ["131", 67, "1"], ["131", 68, "1"], ["131", 69, "1"], ["131", 70, "2"], ["131", 71, "2"], ["131", 72, "2"], ["131", 73, "2"], ["131", 74, "2"], ["131", 75, "2"], ["131", 76, "2"], ["131", 77, "3"], ["131", 78, "4"], ["131", 79, "4"], ["131", 80, "4"], ["131", 81, "3"], ["131", 82, "3"], ["131", 83, "4"], ["131", 84, "1"], ["131", 85, "2"], ["131", 86, "3"], ["131", 87, "2"], ["131", 88, "3"], ["131", 89, "2"], ["131", 90, "4"], ["131", 91, "3"], ["131", 92, "4"], ["131", 93, "4"], ["131", 94, "4"], ["131", 95, "6"], ["131", 96, "4"], ["131", 97, "5"], ["131", 98, "4"], ["131", 99, "4"], ["131", 100, "5"], ["131", 101, "5"], ["131", 102, "4"], ["131", 103, "4"], ["131", 104, "4"], ["131", 105, "4"], ["131", 106, "3"], ["131", 107, "3"], ["131", 108, "3"], ["131", 109, "3"], ["131", 110, "1"], ["131", 111, "1"], ["131", 118, "1"], ["131", 119, "1"], ["131", 124, "2"], ["131", 125, "3"], ["131", 126, "4"], ["131", 127, "4"], ["131", 128, "6"], ["131", 129, "7"], ["131", 130, "6"], ["131", 131, "3"], ["131", 132, "2"], ["131", 133, "1"], ["131", 139, "1"], ["131", 140, "1"], ["131", 141, "1"], ["131", 142, "1"], ["131", 143, "1"], ["133", 10, "1"], ["133", 11, "2"], ["133", 12, "2"], ["133", 13, "3"], ["133", 14, "2"], ["133", 15, "3"], ["133", 16, "3"], ["133", 17, "3"], ["133", 18, "2"], ["133", 19, "2"], ["133", 20, "2"], ["133", 21, "1"], ["133", 22, "2"], ["133", 23, "1"], ["133", 24, "1"], ["133", 25, "1"], ["133", 26, "1"], ["133", 27, "1"], ["133", 28, "1"], ["133", 46, "1"], ["133", 49, "1"], ["133", 50, "1"], ["133", 51, "1"], ["133", 52, "1"], ["133", 53, "1"], ["133", 65, "1"], ["133", 66, "1"], ["133", 67, "1"], ["133", 68, "1"], ["133", 69, "2"], ["133", 70, "2"], ["133", 71, "2"], ["133", 72, "2"], ["133", 73, "2"], ["133", 74, "2"], ["133", 75, "2"], ["133", 76, "2"], ["133", 77, "4"], ["133", 78, "4"], ["133", 79, "2"], ["133", 80, "4"], ["133", 81, "4"], ["133", 82, "2"], ["133", 83, "1"], ["133", 84, "3"], ["133", 85, "2"], ["133", 87, "1"], ["133", 88, "1"], ["133", 89, "3"], ["133", 90, "2"], ["133", 91, "3"], ["133", 92, "3"], ["133", 93, "3"], ["133", 94, "3"], ["133", 95, "4"], ["133", 96, "4"], ["133", 97, "4"], ["133", 98, "4"], ["133", 99, "4"], ["133", 100, "4"], ["133", 101, "3"], ["133", 102, "4"], ["133", 103, "4"], ["133", 104, "4"], ["133", 105, "3"], ["133", 106, "3"], ["133", 107, "3"], ["133", 108, "1"], ["133", 109, "1"], ["133", 110, "1"], ["133", 124, "2"], ["133", 126, "3"], ["133", 127, "2"], ["133", 128, "3"], ["133", 129, "4"], ["133", 130, "1"], ["133", 131, "1"], ["133", 137, "1"], ["133", 138, "1"], ["133", 139, "1"], ["133", 140, "1"], ["133", 141, "2"], ["133", 142, "1"], ["134", 11, "1"], ["134", 13, "3"], ["134", 14, "2"], ["134", 15, "2"], ["134", 16, "2"], ["134", 17, "2"], ["134", 18, "1"], ["134", 19, "2"], ["134", 25, "1"], ["134", 26, "1"], ["134", 27, "1"], ["134", 28, "1"], ["134", 46, "1"], ["134", 76, "1"], ["134", 77, "2"], ["134", 78, "3"], ["134", 79, "2"], ["134", 80, "2"], ["134", 81, "2"], ["134", 82, "1"], ["134", 83, "3"], ["134", 84, "5"], ["134", 85, "3"], ["134", 86, "1"], ["134", 87, "1"], ["134", 88, "1"], ["134", 89, "3"], ["134", 90, "2"], ["134", 91, "2"], ["134", 92, "1"], ["134", 94, "1"], ["134", 95, "1"], ["134", 96, "1"], ["134", 130, "1"], ["135", 11, "1"], ["135", 13, "3"], ["135", 14, "2"], ["135", 15, "2"], ["135", 16, "2"], ["135", 17, "2"], ["135", 18, "1"], ["135", 19, "2"], ["135", 25, "1"], ["135", 26, "1"], ["135", 27, "1"], ["135", 28, "1"], ["135", 46, "1"], ["135", 76, "1"], ["135", 77, "2"], ["135", 78, "3"], ["135", 79, "2"], ["135", 80, "2"], ["135", 81, "2"], ["135", 82, "1"], ["135", 83, "3"], ["135", 84, "5"], ["135", 85, "3"], ["135", 86, "1"], ["135", 87, "1"], ["135", 88, "1"], ["135", 89, "3"], ["135", 90, "2"], ["135", 91, "2"], ["135", 92, "1"], ["135", 94, "1"], ["135", 95, "1"], ["135", 96, "1"], ["135", 130, "1"], ["136", 11, "1"], ["136", 13, "3"], ["136", 14, "2"], ["136", 15, "2"], ["136", 16, "2"], ["136", 17, "2"], ["136", 18, "1"], ["136", 19, "2"], ["136", 25, "1"], ["136", 26, "1"], ["136", 27, "1"], ["136", 28, "1"], ["136", 46, "1"], ["136", 76, "1"], ["136", 77, "2"], ["136", 78, "3"], ["136", 79, "2"], ["136", 80, "2"], ["136", 81, "2"], ["136", 82, "1"], ["136", 83, "3"], ["136", 84, "5"], ["136", 85, "3"], ["136", 86, "1"], ["136", 87, "1"], ["136", 88, "1"], ["136", 89, "3"], ["136", 90, "2"], ["136", 91, "2"], ["136", 92, "1"], ["136", 94, "1"], ["136", 95, "1"], ["136", 96, "1"], ["136", 130, "1"], ["137", null, "1"], ["137", null, "1"], ["137", 5, "1"], ["137", 6, "2"], ["137", 7, "3"], ["137", 8, "2"], ["137", 9, "3"], ["137", 10, "1"], ["137", 11, "1"], ["137", 12, "1"], ["137", 13, "1"], ["137", 14, "1"], ["137", 15, "1"], ["137", 16, "1"], ["137", 17, "1"], ["137", 18, "1"], ["137", 20, "2"], ["137", 21, "2"], ["137", 22, "2"], ["137", 23, "2"], ["137", 24, "3"], ["137", 25, "3"], ["137", 26, "2"], ["137", 27, "2"], ["137", 28, "2"], ["137", 29, "2"], ["137", 30, "1"], ["137", 66, "2"], ["137", 67, "3"], ["137", 68, "1"], ["137", 69, "1"], ["137", 70, "3"], ["137", 71, "5"], ["137", 72, "6"], ["137", 73, "6"], ["137", 74, "4"], ["137", 75, "6"], ["137", 76, "8"], ["137", 77, "7"], ["137", 78, "7"], ["137", 79, "9"], ["137", 80, "9"], ["137", 81, "11"], ["137", 82, "11"], ["137", 83, "11"], ["137", 84, "10"], ["137", 85, "10"], ["137", 86, "8"], ["137", 87, "5"], ["137", 88, "5"], ["137", 89, "6"], ["137", 90, "6"], ["137", 91, "4"], ["137", 92, "3"], ["137", 93, "3"], ["137", 94, "3"], ["137", 95, "3"], ["137", 96, "3"], ["137", 97, "1"], ["137", 114, "1"], ["137", 115, "1"], ["137", 116, "1"], ["138", null, "1"], ["138", null, "1"], ["138", 5, "1"], ["138", 6, "2"], ["138", 7, "3"], ["138", 8, "2"], ["138", 9, "3"], ["138", 10, "1"], ["138", 11, "1"], ["138", 12, "1"], ["138", 13, "1"], ["138", 14, "1"], ["138", 15, "1"], ["138", 16, "1"], ["138", 17, "1"], ["138", 18, "1"], ["138", 20, "2"], ["138", 21, "2"], ["138", 22, "2"], ["138", 23, "2"], ["138", 24, "3"], ["138", 25, "3"], ["138", 26, "2"], ["138", 27, "2"], ["138", 28, "2"], ["138", 29, "2"], ["138", 30, "1"], ["138", 66, "2"], ["138", 67, "3"], ["138", 68, "1"], ["138", 69, "1"], ["138", 70, "3"], ["138", 71, "5"], ["138", 72, "6"], ["138", 73, "6"], ["138", 74, "4"], ["138", 75, "6"], ["138", 76, "8"], ["138", 77, "7"], ["138", 78, "7"], ["138", 79, "9"], ["138", 80, "9"], ["138", 81, "11"], ["138", 82, "11"], ["138", 83, "11"], ["138", 84, "10"], ["138", 85, "10"], ["138", 86, "8"], ["138", 87, "5"], ["138", 88, "5"], ["138", 89, "6"], ["138", 90, "6"], ["138", 91, "4"], ["138", 92, "3"], ["138", 93, "3"], ["138", 94, "3"], ["138", 95, "3"], ["138", 96, "3"], ["138", 97, "1"], ["138", 114, "1"], ["138", 115, "1"], ["138", 116, "1"], ["139", null, "1"], ["139", null, "3"], ["139", null, "2"], ["139", 1, "1"], ["139", 2, "1"], ["139", 3, "1"], ["139", 4, "2"], ["139", 5, "4"], ["139", 6, "5"], ["139", 7, "7"], ["139", 8, "8"], ["139", 9, "7"], ["139", 10, "11"], ["139", 11, "9"], ["139", 12, "11"], ["139", 13, "9"], ["139", 14, "9"], ["139", 15, "7"], ["139", 16, "6"], ["139", 17, "6"], ["139", 18, "3"], ["139", 19, "6"], ["139", 20, "7"], ["139", 21, "8"], ["139", 22, "7"], ["139", 23, "9"], ["139", 24, "7"], ["139", 25, "6"], ["139", 26, "4"], ["139", 27, "4"], ["139", 28, "5"], ["139", 29, "5"], ["139", 30, "3"], ["139", 31, "1"], ["139", 34, "1"], ["139", 35, "1"], ["139", 36, "1"], ["139", 37, "1"], ["139", 38, "1"], ["139", 39, "2"], ["139", 40, "1"], ["139", 41, "2"], ["139", 42, "2"], ["139", 43, "3"], ["139", 44, "3"], ["139", 45, "1"], ["139", 46, "1"], ["139", 47, "2"], ["139", 48, "2"], ["139", 49, "3"], ["139", 50, "1"], ["139", 51, "1"], ["139", 64, "1"], ["139", 65, "3"], ["139", 66, "6"], ["139", 67, "8"], ["139", 68, "9"], ["139", 69, "8"], ["139", 70, "7"], ["139", 71, "9"], ["139", 72, "9"], ["139", 73, "7"], ["139", 74, "10"], ["139", 75, "10"], ["139", 76, "9"], ["139", 77, "9"], ["139", 78, "10"], ["139", 79, "11"], ["139", 80, "11"], ["139", 81, "11"], ["139", 82, "11"], ["139", 83, "11"], ["139", 84, "10"], ["139", 85, "9"], ["139", 86, "8"], ["139", 87, "6"], ["139", 88, "5"], ["139", 89, "6"], ["139", 90, "6"], ["139", 91, "5"], ["139", 92, "5"], ["139", 93, "5"], ["139", 94, "5"], ["139", 95, "5"], ["139", 96, "4"], ["139", 97, "2"], ["139", 99, "1"], ["139", 100, "1"], ["139", 113, "1"], ["139", 114, "1"], ["139", 115, "1"], ["139", 116, "1"], ["139", 117, "1"], ["139", 124, "1"], ["140", null, "1"], ["140", null, "3"], ["140", null, "3"], ["140", null, "7"], ["140", null, "13"], ["140", null, "17"], ["140", 1, "22"], ["140", 2, "22"], ["140", 3, "23"], ["140", 4, "23"], ["140", 5, "23"], ["140", 6, "23"], ["140", 7, "23"], ["140", 8, "23"], ["140", 9, "23"], ["140", 10, "23"], ["140", 11, "23"], ["140", 12, "23"], ["140", 13, "23"], ["140", 14, "22"], ["140", 15, "22"], ["140", 16, "22"], ["140", 17, "22"], ["140", 18, "22"], ["140", 19, "22"], ["140", 20, "22"], ["140", 21, "21"], ["140", 22, "21"], ["140", 23, "20"], ["140", 24, "20"], ["140", 25, "18"], ["140", 26, "17"], ["140", 27, "17"], ["140", 28, "16"], ["140", 29, "17"], ["140", 30, "14"], ["140", 31, "12"], ["140", 32, "11"], ["140", 33, "13"], ["140", 34, "13"], ["140", 35, "12"], ["140", 36, "11"], ["140", 37, "8"], ["140", 38, "9"], ["140", 39, "8"], ["140", 40, "7"], ["140", 41, "7"], ["140", 42, "6"], ["140", 43, "6"], ["140", 44, "5"], ["140", 45, "5"], ["140", 46, "5"], ["140", 47, "4"], ["140", 48, "5"], ["140", 49, "6"], ["140", 50, "3"], ["140", 51, "1"], ["140", 52, "1"], ["140", 76, "1"], ["140", 78, "1"], ["140", 79, "5"], ["140", 80, "1"], ["140", 81, "3"], ["140", 82, "4"], ["140", 83, "4"], ["140", 84, "1"], ["140", 85, "1"], ["140", 86, "2"], ["140", 87, "4"], ["140", 88, "5"], ["140", 89, "1"], ["140", 90, "5"], ["140", 91, "4"], ["140", 92, "8"], ["140", 93, "9"], ["140", 94, "7"], ["140", 95, "5"], ["140", 96, "4"], ["140", 97, "3"], ["140", 98, "4"], ["140", 99, "4"], ["140", 100, "3"], ["140", 101, "4"], ["140", 102, "3"], ["140", 103, "3"], ["140", 104, "1"], ["140", 105, "2"], ["140", 106, "3"], ["140", 107, "1"], ["140", 108, "1"], ["140", 109, "2"], ["140", 110, "1"], ["140", 111, "2"], ["140", 112, "2"], ["140", 113, "2"], ["140", 114, "2"], ["140", 115, "1"], ["140", 116, "1"], ["140", 122, "1"], ["140", 123, "3"], ["140", 124, "3"], ["140", 125, "1"], ["140", 130, "1"], ["140", 137, "1"], ["140", 138, "1"], ["140", 139, "1"], ["140", 140, "1"], ["140", 141, "1"], ["141", null, "1"], ["141", null, "3"], ["141", null, "3"], ["141", null, "7"], ["141", null, "13"], ["141", null, "17"], ["141", 1, "22"], ["141", 2, "22"], ["141", 3, "23"], ["141", 4, "23"], ["141", 5, "23"], ["141", 6, "23"], ["141", 7, "23"], ["141", 8, "23"], ["141", 9, "23"], ["141", 10, "23"], ["141", 11, "23"], ["141", 12, "23"], ["141", 13, "23"], ["141", 14, "22"], ["141", 15, "22"], ["141", 16, "22"], ["141", 17, "22"], ["141", 18, "22"], ["141", 19, "22"], ["141", 20, "22"], ["141", 21, "21"], ["141", 22, "21"], ["141", 23, "20"], ["141", 24, "20"], ["141", 25, "18"], ["141", 26, "17"], ["141", 27, "17"], ["141", 28, "16"], ["141", 29, "17"], ["141", 30, "14"], ["141", 31, "12"], ["141", 32, "11"], ["141", 33, "13"], ["141", 34, "13"], ["141", 35, "12"], ["141", 36, "11"], ["141", 37, "8"], ["141", 38, "9"], ["141", 39, "8"], ["141", 40, "7"], ["141", 41, "7"], ["141", 42, "6"], ["141", 43, "6"], ["141", 44, "5"], ["141", 45, "5"], ["141", 46, "5"], ["141", 47, "4"], ["141", 48, "5"], ["141", 49, "6"], ["141", 50, "3"], ["141", 51, "1"], ["141", 52, "1"], ["141", 76, "1"], ["141", 78, "1"], ["141", 79, "5"], ["141", 80, "1"], ["141", 81, "3"], ["141", 82, "4"], ["141", 83, "4"], ["141", 84, "1"], ["141", 85, "1"], ["141", 86, "2"], ["141", 87, "4"], ["141", 88, "5"], ["141", 89, "1"], ["141", 90, "5"], ["141", 91, "4"], ["141", 92, "8"], ["141", 93, "9"], ["141", 94, "7"], ["141", 95, "5"], ["141", 96, "4"], ["141", 97, "3"], ["141", 98, "4"], ["141", 99, "4"], ["141", 100, "3"], ["141", 101, "4"], ["141", 102, "3"], ["141", 103, "3"], ["141", 104, "1"], ["141", 105, "2"], ["141", 106, "3"], ["141", 107, "1"], ["141", 108, "1"], ["141", 109, "2"], ["141", 110, "1"], ["141", 111, "2"], ["141", 112, "2"], ["141", 113, "2"], ["141", 114, "2"], ["141", 115, "1"], ["141", 116, "1"], ["141", 122, "1"], ["141", 123, "3"], ["141", 124, "3"], ["141", 125, "1"], ["141", 130, "1"], ["141", 137, "1"], ["141", 138, "1"], ["141", 139, "1"], ["141", 140, "1"], ["141", 141, "1"], ["142", null, "1"], ["142", null, "3"], ["142", null, "3"], ["142", null, "7"], ["142", null, "13"], ["142", null, "17"], ["142", 1, "22"], ["142", 2, "22"], ["142", 3, "23"], ["142", 4, "23"], ["142", 5, "23"], ["142", 6, "23"], ["142", 7, "23"], ["142", 8, "23"], ["142", 9, "23"], ["142", 10, "23"], ["142", 11, "23"], ["142", 12, "23"], ["142", 13, "23"], ["142", 14, "22"], ["142", 15, "22"], ["142", 16, "22"], ["142", 17, "22"], ["142", 18, "22"], ["142", 19, "22"], ["142", 20, "22"], ["142", 21, "21"], ["142", 22, "21"], ["142", 23, "20"], ["142", 24, "20"], ["142", 25, "18"], ["142", 26, "17"], ["142", 27, "17"], ["142", 28, "16"], ["142", 29, "17"], ["142", 30, "14"], ["142", 31, "12"], ["142", 32, "11"], ["142", 33, "13"], ["142", 34, "13"], ["142", 35, "12"], ["142", 36, "11"], ["142", 37, "8"], ["142", 38, "9"], ["142", 39, "8"], ["142", 40, "7"], ["142", 41, "7"], ["142", 42, "6"], ["142", 43, "6"], ["142", 44, "5"], ["142", 45, "5"], ["142", 46, "5"], ["142", 47, "4"], ["142", 48, "5"], ["142", 49, "6"], ["142", 50, "3"], ["142", 51, "1"], ["142", 52, "1"], ["142", 76, "1"], ["142", 78, "1"], ["142", 79, "5"], ["142", 80, "1"], ["142", 81, "3"], ["142", 82, "4"], ["142", 83, "4"], ["142", 84, "1"], ["142", 85, "1"], ["142", 86, "2"], ["142", 87, "4"], ["142", 88, "5"], ["142", 89, "1"], ["142", 90, "5"], ["142", 91, "4"], ["142", 92, "8"], ["142", 93, "9"], ["142", 94, "7"], ["142", 95, "5"], ["142", 96, "4"], ["142", 97, "3"], ["142", 98, "4"], ["142", 99, "4"], ["142", 100, "3"], ["142", 101, "4"], ["142", 102, "3"], ["142", 103, "3"], ["142", 104, "1"], ["142", 105, "2"], ["142", 106, "3"], ["142", 107, "1"], ["142", 108, "1"], ["142", 109, "2"], ["142", 110, "1"], ["142", 111, "2"], ["142", 112, "2"], ["142", 113, "2"], ["142", 114, "2"], ["142", 115, "1"], ["142", 116, "1"], ["142", 122, "1"], ["142", 123, "3"], ["142", 124, "3"], ["142", 125, "1"], ["142", 130, "1"], ["142", 137, "1"], ["142", 138, "1"], ["142", 139, "1"], ["142", 140, "1"], ["142", 141, "1"], ["143", null, "1"], ["143", null, "3"], ["143", null, "3"], ["143", null, "7"], ["143", null, "13"], ["143", null, "17"], ["143", 1, "22"], ["143", 2, "22"], ["143", 3, "23"], ["143", 4, "23"], ["143", 5, "23"], ["143", 6, "23"], ["143", 7, "23"], ["143", 8, "23"], ["143", 9, "23"], ["143", 10, "23"], ["143", 11, "23"], ["143", 12, "23"], ["143", 13, "23"], ["143", 14, "22"], ["143", 15, "22"], ["143", 16, "22"], ["143", 17, "22"], ["143", 18, "22"], ["143", 19, "22"], ["143", 20, "22"], ["143", 21, "21"], ["143", 22, "21"], ["143", 23, "20"], ["143", 24, "20"], ["143", 25, "18"], ["143", 26, "17"], ["143", 27, "17"], ["143", 28, "16"], ["143", 29, "17"], ["143", 30, "14"], ["143", 31, "12"], ["143", 32, "11"], ["143", 33, "13"], ["143", 34, "13"], ["143", 35, "12"], ["143", 36, "11"], ["143", 37, "8"], ["143", 38, "9"], ["143", 39, "8"], ["143", 40, "7"], ["143", 41, "7"], ["143", 42, "6"], ["143", 43, "6"], ["143", 44, "5"], ["143", 45, "5"], ["143", 46, "5"], ["143", 47, "4"], ["143", 48, "5"], ["143", 49, "6"], ["143", 50, "3"], ["143", 51, "1"], ["143", 52, "1"], ["143", 76, "1"], ["143", 78, "1"], ["143", 79, "5"], ["143", 80, "1"], ["143", 81, "3"], ["143", 82, "4"], ["143", 83, "4"], ["143", 84, "1"], ["143", 85, "1"], ["143", 86, "2"], ["143", 87, "4"], ["143", 88, "5"], ["143", 89, "1"], ["143", 90, "5"], ["143", 91, "4"], ["143", 92, "8"], ["143", 93, "9"], ["143", 94, "7"], ["143", 95, "5"], ["143", 96, "4"], ["143", 97, "3"], ["143", 98, "4"], ["143", 99, "4"], ["143", 100, "3"], ["143", 101, "4"], ["143", 102, "3"], ["143", 103, "3"], ["143", 104, "1"], ["143", 105, "2"], ["143", 106, "3"], ["143", 107, "1"], ["143", 108, "1"], ["143", 109, "2"], ["143", 110, "1"], ["143", 111, "2"], ["143", 112, "2"], ["143", 113, "2"], ["143", 114, "2"], ["143", 115, "1"], ["143", 116, "1"], ["143", 122, "1"], ["143", 123, "3"], ["143", 124, "3"], ["143", 125, "1"], ["143", 130, "1"], ["143", 137, "1"], ["143", 138, "1"], ["143", 139, "1"], ["143", 140, "1"], ["143", 141, "1"], ["144", null, "1"], ["144", null, "3"], ["144", null, "3"], ["144", null, "7"], ["144", null, "13"], ["144", null, "17"], ["144", 1, "22"], ["144", 2, "22"], ["144", 3, "23"], ["144", 4, "23"], ["144", 5, "23"], ["144", 6, "23"], ["144", 7, "23"], ["144", 8, "23"], ["144", 9, "23"], ["144", 10, "23"], ["144", 11, "23"], ["144", 12, "23"], ["144", 13, "23"], ["144", 14, "22"], ["144", 15, "22"], ["144", 16, "22"], ["144", 17, "22"], ["144", 18, "22"], ["144", 19, "22"], ["144", 20, "22"], ["144", 21, "21"], ["144", 22, "21"], ["144", 23, "20"], ["144", 24, "20"], ["144", 25, "18"], ["144", 26, "17"], ["144", 27, "17"], ["144", 28, "16"], ["144", 29, "17"], ["144", 30, "14"], ["144", 31, "12"], ["144", 32, "11"], ["144", 33, "13"], ["144", 34, "13"], ["144", 35, "12"], ["144", 36, "11"], ["144", 37, "8"], ["144", 38, "9"], ["144", 39, "8"], ["144", 40, "7"], ["144", 41, "7"], ["144", 42, "6"], ["144", 43, "6"], ["144", 44, "5"], ["144", 45, "5"], ["144", 46, "5"], ["144", 47, "4"], ["144", 48, "5"], ["144", 49, "6"], ["144", 50, "3"], ["144", 51, "1"], ["144", 52, "1"], ["144", 76, "1"], ["144", 78, "1"], ["144", 79, "5"], ["144", 80, "1"], ["144", 81, "3"], ["144", 82, "4"], ["144", 83, "4"], ["144", 84, "1"], ["144", 85, "1"], ["144", 86, "2"], ["144", 87, "4"], ["144", 88, "5"], ["144", 89, "1"], ["144", 90, "5"], ["144", 91, "4"], ["144", 92, "8"], ["144", 93, "9"], ["144", 94, "7"], ["144", 95, "5"], ["144", 96, "4"], ["144", 97, "3"], ["144", 98, "4"], ["144", 99, "4"], ["144", 100, "3"], ["144", 101, "4"], ["144", 102, "3"], ["144", 103, "3"], ["144", 104, "1"], ["144", 105, "2"], ["144", 106, "3"], ["144", 107, "1"], ["144", 108, "1"], ["144", 109, "2"], ["144", 110, "1"], ["144", 111, "2"], ["144", 112, "2"], ["144", 113, "2"], ["144", 114, "2"], ["144", 115, "1"], ["144", 116, "1"], ["144", 122, "1"], ["144", 123, "3"], ["144", 124, "3"], ["144", 125, "1"], ["144", 130, "1"], ["144", 137, "1"], ["144", 138, "1"], ["144", 139, "1"], ["144", 140, "1"], ["144", 141, "1"], ["145", null, "2"], ["145", null, "2"], ["145", null, "2"], ["145", null, "6"], ["145", null, "17"], ["145", 1, "21"], ["145", 2, "23"], ["145", 3, "23"], ["145", 4, "23"], ["145", 5, "22"], ["145", 6, "23"], ["145", 7, "23"], ["145", 8, "23"], ["145", 9, "23"], ["145", 10, "23"], ["145", 11, "23"], ["145", 12, "23"], ["145", 13, "23"], ["145", 14, "23"], ["145", 15, "23"], ["145", 16, "22"], ["145", 17, "22"], ["145", 18, "22"], ["145", 19, "22"], ["145", 20, "22"], ["145", 21, "22"], ["145", 22, "22"], ["145", 23, "22"], ["145", 24, "21"], ["145", 25, "21"], ["145", 26, "20"], ["145", 27, "18"], ["145", 28, "19"], ["145", 29, "17"], ["145", 30, "15"], ["145", 31, "16"], ["145", 32, "15"], ["145", 33, "19"], ["145", 34, "16"], ["145", 35, "18"], ["145", 36, "15"], ["145", 37, "15"], ["145", 38, "14"], ["145", 39, "10"], ["145", 40, "7"], ["145", 41, "7"], ["145", 42, "8"], ["145", 43, "8"], ["145", 44, "5"], ["145", 45, "5"], ["145", 46, "5"], ["145", 47, "6"], ["145", 48, "6"], ["145", 49, "5"], ["145", 50, "2"], ["145", 51, "1"], ["145", 78, "2"], ["145", 79, "1"], ["145", 80, "1"], ["145", 81, "1"], ["145", 82, "2"], ["145", 83, "1"], ["145", 84, "1"], ["145", 85, "1"], ["145", 86, "1"], ["145", 87, "1"], ["145", 88, "1"], ["145", 89, "1"], ["145", 90, "1"], ["145", 91, "1"], ["145", 92, "1"], ["145", 93, "3"], ["145", 94, "2"], ["145", 95, "2"], ["145", 96, "1"], ["145", 97, "1"], ["145", 98, "3"], ["145", 99, "3"], ["145", 100, "2"], ["145", 101, "1"], ["145", 102, "2"], ["145", 103, "1"], ["145", 104, "1"], ["145", 106, "1"], ["145", 107, "1"], ["145", 108, "1"], ["145", 109, "2"], ["145", 110, "2"], ["145", 111, "2"], ["145", 112, "4"], ["145", 113, "4"], ["145", 114, "2"], ["145", 115, "3"], ["145", 116, "1"], ["145", 122, "2"], ["145", 123, "2"], ["145", 124, "1"], ["145", 132, "1"], ["145", 134, "1"], ["145", 135, "1"], ["145", 136, "1"], ["145", 137, "1"], ["145", 138, "1"], ["145", 139, "1"], ["145", 140, "1"], ["146", null, "2"], ["146", null, "2"], ["146", null, "2"], ["146", null, "6"], ["146", null, "17"], ["146", 1, "21"], ["146", 2, "23"], ["146", 3, "23"], ["146", 4, "23"], ["146", 5, "22"], ["146", 6, "23"], ["146", 7, "23"], ["146", 8, "23"], ["146", 9, "23"], ["146", 10, "23"], ["146", 11, "23"], ["146", 12, "23"], ["146", 13, "23"], ["146", 14, "23"], ["146", 15, "23"], ["146", 16, "22"], ["146", 17, "22"], ["146", 18, "22"], ["146", 19, "22"], ["146", 20, "22"], ["146", 21, "22"], ["146", 22, "22"], ["146", 23, "22"], ["146", 24, "21"], ["146", 25, "21"], ["146", 26, "20"], ["146", 27, "18"], ["146", 28, "19"], ["146", 29, "17"], ["146", 30, "15"], ["146", 31, "16"], ["146", 32, "15"], ["146", 33, "19"], ["146", 34, "16"], ["146", 35, "18"], ["146", 36, "15"], ["146", 37, "15"], ["146", 38, "14"], ["146", 39, "10"], ["146", 40, "7"], ["146", 41, "7"], ["146", 42, "8"], ["146", 43, "8"], ["146", 44, "5"], ["146", 45, "5"], ["146", 46, "5"], ["146", 47, "6"], ["146", 48, "6"], ["146", 49, "5"], ["146", 50, "2"], ["146", 51, "1"], ["146", 78, "2"], ["146", 79, "1"], ["146", 80, "1"], ["146", 81, "1"], ["146", 82, "2"], ["146", 83, "1"], ["146", 84, "1"], ["146", 85, "1"], ["146", 86, "1"], ["146", 87, "1"], ["146", 88, "1"], ["146", 89, "1"], ["146", 90, "1"], ["146", 91, "1"], ["146", 92, "1"], ["146", 93, "3"], ["146", 94, "2"], ["146", 95, "2"], ["146", 96, "1"], ["146", 97, "1"], ["146", 98, "3"], ["146", 99, "3"], ["146", 100, "2"], ["146", 101, "1"], ["146", 102, "2"], ["146", 103, "1"], ["146", 104, "1"], ["146", 106, "1"], ["146", 107, "1"], ["146", 108, "1"], ["146", 109, "2"], ["146", 110, "2"], ["146", 111, "2"], ["146", 112, "4"], ["146", 113, "4"], ["146", 114, "2"], ["146", 115, "3"], ["146", 116, "1"], ["146", 122, "2"], ["146", 123, "2"], ["146", 124, "1"], ["146", 132, "1"], ["146", 134, "1"], ["146", 135, "1"], ["146", 136, "1"], ["146", 137, "1"], ["146", 138, "1"], ["146", 139, "1"], ["146", 140, "1"], ["147", null, "1"], ["147", null, "1"], ["147", null, "1"], ["147", null, "1"], ["147", null, "1"], ["147", null, "1"], ["147", null, "1"], ["147", null, "1"], ["147", null, "1"], ["147", null, "2"], ["147", null, "2"], ["147", null, "2"], ["147", null, "5"], ["147", null, "16"], ["147", 1, "22"], ["147", 2, "20"], ["147", 3, "21"], ["147", 4, "22"], ["147", 5, "23"], ["147", 6, "23"], ["147", 7, "23"], ["147", 8, "23"], ["147", 9, "23"], ["147", 10, "23"], ["147", 11, "23"], ["147", 12, "23"], ["147", 13, "23"], ["147", 14, "23"], ["147", 15, "23"], ["147", 16, "23"], ["147", 17, "23"], ["147", 18, "23"], ["147", 19, "23"], ["147", 20, "23"], ["147", 21, "21"], ["147", 22, "22"], ["147", 23, "22"], ["147", 24, "22"], ["147", 25, "21"], ["147", 26, "20"], ["147", 27, "19"], ["147", 28, "20"], ["147", 29, "17"], ["147", 30, "18"], ["147", 31, "16"], ["147", 32, "16"], ["147", 33, "18"], ["147", 34, "18"], ["147", 35, "17"], ["147", 36, "15"], ["147", 37, "14"], ["147", 38, "14"], ["147", 39, "10"], ["147", 40, "8"], ["147", 41, "7"], ["147", 42, "8"], ["147", 43, "7"], ["147", 44, "5"], ["147", 45, "5"], ["147", 46, "5"], ["147", 47, "5"], ["147", 48, "7"], ["147", 49, "4"], ["147", 50, "2"], ["147", 51, "1"], ["147", 78, "1"], ["147", 79, "1"], ["147", 80, "1"], ["147", 81, "1"], ["147", 82, "1"], ["147", 83, "1"], ["147", 84, "1"], ["147", 85, "1"], ["147", 86, "1"], ["147", 87, "1"], ["147", 88, "1"], ["147", 89, "1"], ["147", 90, "1"], ["147", 91, "1"], ["147", 92, "1"], ["147", 93, "1"], ["147", 94, "1"], ["147", 95, "1"], ["147", 98, "1"], ["147", 99, "2"], ["147", 100, "2"], ["147", 101, "1"], ["147", 102, "2"], ["147", 103, "2"], ["147", 104, "1"], ["147", 106, "1"], ["147", 107, "1"], ["147", 108, "2"], ["147", 109, "2"], ["147", 110, "2"], ["147", 111, "2"], ["147", 112, "3"], ["147", 113, "3"], ["147", 114, "2"], ["147", 115, "2"], ["147", 121, "2"], ["147", 122, "2"], ["147", 123, "3"], ["147", 124, "1"], ["147", 131, "1"], ["147", 132, "1"], ["147", 134, "1"], ["147", 135, "1"], ["147", 136, "1"], ["147", 137, "1"], ["147", 138, "1"], ["147", 139, "1"], ["147", 140, "1"], ["147", 141, "1"], ["147", 142, "1"], ["148", null, "1"], ["148", null, "1"], ["148", null, "1"], ["148", null, "1"], ["148", null, "1"], ["148", null, "1"], ["148", null, "1"], ["148", null, "1"], ["148", null, "1"], ["148", null, "2"], ["148", null, "2"], ["148", null, "2"], ["148", null, "5"], ["148", null, "16"], ["148", 1, "22"], ["148", 2, "20"], ["148", 3, "21"], ["148", 4, "22"], ["148", 5, "23"], ["148", 6, "23"], ["148", 7, "23"], ["148", 8, "23"], ["148", 9, "23"], ["148", 10, "23"], ["148", 11, "23"], ["148", 12, "23"], ["148", 13, "23"], ["148", 14, "23"], ["148", 15, "23"], ["148", 16, "23"], ["148", 17, "23"], ["148", 18, "23"], ["148", 19, "23"], ["148", 20, "23"], ["148", 21, "21"], ["148", 22, "22"], ["148", 23, "22"], ["148", 24, "22"], ["148", 25, "21"], ["148", 26, "20"], ["148", 27, "19"], ["148", 28, "20"], ["148", 29, "17"], ["148", 30, "18"], ["148", 31, "16"], ["148", 32, "16"], ["148", 33, "18"], ["148", 34, "18"], ["148", 35, "17"], ["148", 36, "15"], ["148", 37, "14"], ["148", 38, "14"], ["148", 39, "10"], ["148", 40, "8"], ["148", 41, "7"], ["148", 42, "8"], ["148", 43, "7"], ["148", 44, "5"], ["148", 45, "5"], ["148", 46, "5"], ["148", 47, "5"], ["148", 48, "7"], ["148", 49, "4"], ["148", 50, "2"], ["148", 51, "1"], ["148", 78, "1"], ["148", 79, "1"], ["148", 80, "1"], ["148", 81, "1"], ["148", 82, "1"], ["148", 83, "1"], ["148", 84, "1"], ["148", 85, "1"], ["148", 86, "1"], ["148", 87, "1"], ["148", 88, "1"], ["148", 89, "1"], ["148", 90, "1"], ["148", 91, "1"], ["148", 92, "1"], ["148", 93, "1"], ["148", 94, "1"], ["148", 95, "1"], ["148", 98, "1"], ["148", 99, "2"], ["148", 100, "2"], ["148", 101, "1"], ["148", 102, "2"], ["148", 103, "2"], ["148", 104, "1"], ["148", 106, "1"], ["148", 107, "1"], ["148", 108, "2"], ["148", 109, "2"], ["148", 110, "2"], ["148", 111, "2"], ["148", 112, "3"], ["148", 113, "3"], ["148", 114, "2"], ["148", 115, "2"], ["148", 121, "2"], ["148", 122, "2"], ["148", 123, "3"], ["148", 124, "1"], ["148", 131, "1"], ["148", 132, "1"], ["148", 134, "1"], ["148", 135, "1"], ["148", 136, "1"], ["148", 137, "1"], ["148", 138, "1"], ["148", 139, "1"], ["148", 140, "1"], ["148", 141, "1"], ["148", 142, "1"], ["149", null, "1"], ["149", null, "2"], ["149", null, "3"], ["149", null, "6"], ["149", null, "16"], ["149", 1, "20"], ["149", 2, "16"], ["149", 3, "20"], ["149", 4, "19"], ["149", 5, "22"], ["149", 6, "22"], ["149", 7, "23"], ["149", 8, "23"], ["149", 9, "23"], ["149", 10, "23"], ["149", 11, "23"], ["149", 12, "23"], ["149", 13, "23"], ["149", 14, "23"], ["149", 15, "23"], ["149", 16, "22"], ["149", 17, "23"], ["149", 18, "23"], ["149", 19, "23"], ["149", 20, "23"], ["149", 21, "22"], ["149", 22, "22"], ["149", 23, "20"], ["149", 24, "22"], ["149", 25, "20"], ["149", 26, "18"], ["149", 27, "19"], ["149", 28, "17"], ["149", 29, "12"], ["149", 30, "14"], ["149", 31, "14"], ["149", 32, "14"], ["149", 33, "16"], ["149", 34, "14"], ["149", 35, "10"], ["149", 36, "12"], ["149", 37, "11"], ["149", 38, "9"], ["149", 39, "8"], ["149", 40, "5"], ["149", 41, "4"], ["149", 42, "4"], ["149", 43, "3"], ["149", 44, "2"], ["149", 45, "2"], ["149", 46, "2"], ["149", 47, "2"], ["149", 48, "2"], ["149", 49, "2"], ["149", 50, "1"], ["149", 78, "1"], ["149", 79, "2"], ["149", 80, "2"], ["149", 81, "1"], ["149", 82, "1"], ["149", 83, "1"], ["149", 84, "1"], ["149", 85, "1"], ["149", 86, "1"], ["149", 87, "1"], ["149", 88, "1"], ["149", 89, "1"], ["149", 90, "1"], ["149", 91, "1"], ["149", 92, "1"], ["149", 93, "1"], ["149", 94, "1"], ["149", 95, "1"], ["149", 97, "1"], ["149", 98, "2"], ["149", 99, "2"], ["149", 100, "1"], ["149", 101, "1"], ["149", 102, "1"], ["149", 103, "1"], ["149", 105, "1"], ["149", 106, "1"], ["149", 107, "2"], ["149", 108, "2"], ["149", 109, "2"], ["149", 110, "2"], ["149", 111, "3"], ["149", 112, "2"], ["149", 113, "1"], ["149", 114, "1"], ["149", 116, "1"], ["149", 120, "2"], ["149", 121, "2"], ["149", 122, "3"], ["149", 123, "3"], ["149", 124, "1"], ["149", 130, "1"], ["149", 131, "1"], ["149", 133, "1"], ["149", 134, "1"], ["149", 135, "1"], ["149", 136, "1"], ["149", 137, "1"], ["149", 138, "1"], ["149", 139, "1"], ["149", 141, "1"], ["149", 142, "1"], ["149", 143, "1"], ["150", null, "1"], ["150", null, "2"], ["150", null, "2"], ["150", null, "4"], ["150", null, "12"], ["150", null, "21"], ["150", null, "23"], ["150", 1, "23"], ["150", 2, "23"], ["150", 3, "23"], ["150", 4, "23"], ["150", 5, "23"], ["150", 6, "23"], ["150", 7, "23"], ["150", 8, "23"], ["150", 9, "23"], ["150", 10, "23"], ["150", 11, "23"], ["150", 12, "23"], ["150", 13, "23"], ["150", 14, "23"], ["150", 15, "23"], ["150", 16, "23"], ["150", 17, "23"], ["150", 18, "23"], ["150", 19, "23"], ["150", 20, "23"], ["150", 21, "22"], ["150", 22, "22"], ["150", 23, "22"], ["150", 24, "23"], ["150", 25, "22"], ["150", 26, "22"], ["150", 27, "23"], ["150", 28, "23"], ["150", 29, "23"], ["150", 30, "19"], ["150", 31, "21"], ["150", 32, "20"], ["150", 33, "20"], ["150", 34, "19"], ["150", 35, "19"], ["150", 36, "18"], ["150", 37, "16"], ["150", 38, "14"], ["150", 39, "12"], ["150", 40, "11"], ["150", 41, "12"], ["150", 42, "10"], ["150", 43, "8"], ["150", 44, "5"], ["150", 45, "5"], ["150", 46, "4"], ["150", 47, "5"], ["150", 48, "5"], ["150", 49, "5"], ["150", 50, "1"], ["150", 51, "1"], ["150", 75, "1"], ["150", 76, "1"], ["150", 77, "1"], ["150", 78, "3"], ["150", 79, "3"], ["150", 80, "3"], ["150", 81, "2"], ["150", 82, "2"], ["150", 83, "1"], ["150", 84, "1"], ["150", 85, "1"], ["150", 86, "2"], ["150", 87, "2"], ["150", 88, "2"], ["150", 89, "3"], ["150", 90, "3"], ["150", 91, "2"], ["150", 92, "2"], ["150", 93, "1"], ["150", 94, "2"], ["150", 95, "2"], ["150", 96, "1"], ["150", 97, "1"], ["150", 98, "1"], ["150", 99, "1"], ["150", 100, "1"], ["150", 101, "2"], ["150", 102, "1"], ["150", 103, "2"], ["150", 104, "2"], ["150", 105, "1"], ["150", 106, "1"], ["150", 107, "1"], ["150", 108, "1"], ["150", 109, "1"], ["150", 110, "2"], ["150", 111, "2"], ["150", 112, "2"], ["150", 113, "3"], ["150", 114, "3"], ["150", 115, "3"], ["150", 116, "2"], ["150", 117, "2"], ["150", 118, "2"], ["150", 119, "2"], ["150", 120, "3"], ["150", 121, "3"], ["150", 122, "3"], ["150", 123, "3"], ["150", 124, "1"], ["150", 130, "2"], ["150", 131, "2"], ["150", 132, "1"], ["150", 133, "1"], ["150", 134, "1"], ["150", 135, "1"], ["150", 136, "1"], ["150", 137, "1"], ["150", 138, "1"], ["150", 139, "1"], ["150", 140, "1"], ["150", 141, "1"], ["150", 142, "1"], ["150", 143, "1"], ["150", 144, "1"], ["150", 145, "1"], ["151", null, "1"], ["151", null, "2"], ["151", null, "2"], ["151", null, "4"], ["151", null, "12"], ["151", null, "21"], ["151", null, "23"], ["151", 1, "23"], ["151", 2, "23"], ["151", 3, "23"], ["151", 4, "23"], ["151", 5, "23"], ["151", 6, "23"], ["151", 7, "23"], ["151", 8, "23"], ["151", 9, "23"], ["151", 10, "23"], ["151", 11, "23"], ["151", 12, "23"], ["151", 13, "23"], ["151", 14, "23"], ["151", 15, "23"], ["151", 16, "23"], ["151", 17, "23"], ["151", 18, "23"], ["151", 19, "23"], ["151", 20, "23"], ["151", 21, "22"], ["151", 22, "22"], ["151", 23, "22"], ["151", 24, "23"], ["151", 25, "22"], ["151", 26, "22"], ["151", 27, "23"], ["151", 28, "23"], ["151", 29, "23"], ["151", 30, "19"], ["151", 31, "21"], ["151", 32, "20"], ["151", 33, "20"], ["151", 34, "19"], ["151", 35, "19"], ["151", 36, "18"], ["151", 37, "16"], ["151", 38, "14"], ["151", 39, "12"], ["151", 40, "11"], ["151", 41, "12"], ["151", 42, "10"], ["151", 43, "8"], ["151", 44, "5"], ["151", 45, "5"], ["151", 46, "4"], ["151", 47, "5"], ["151", 48, "5"], ["151", 49, "5"], ["151", 50, "1"], ["151", 51, "1"], ["151", 75, "1"], ["151", 76, "1"], ["151", 77, "1"], ["151", 78, "3"], ["151", 79, "3"], ["151", 80, "3"], ["151", 81, "2"], ["151", 82, "2"], ["151", 83, "1"], ["151", 84, "1"], ["151", 85, "1"], ["151", 86, "2"], ["151", 87, "2"], ["151", 88, "2"], ["151", 89, "3"], ["151", 90, "3"], ["151", 91, "2"], ["151", 92, "2"], ["151", 93, "1"], ["151", 94, "2"], ["151", 95, "2"], ["151", 96, "1"], ["151", 97, "1"], ["151", 98, "1"], ["151", 99, "1"], ["151", 100, "1"], ["151", 101, "2"], ["151", 102, "1"], ["151", 103, "2"], ["151", 104, "2"], ["151", 105, "1"], ["151", 106, "1"], ["151", 107, "1"], ["151", 108, "1"], ["151", 109, "1"], ["151", 110, "2"], ["151", 111, "2"], ["151", 112, "2"], ["151", 113, "3"], ["151", 114, "3"], ["151", 115, "3"], ["151", 116, "2"], ["151", 117, "2"], ["151", 118, "2"], ["151", 119, "2"], ["151", 120, "3"], ["151", 121, "3"], ["151", 122, "3"], ["151", 123, "3"], ["151", 124, "1"], ["151", 130, "2"], ["151", 131, "2"], ["151", 132, "1"], ["151", 133, "1"], ["151", 134, "1"], ["151", 135, "1"], ["151", 136, "1"], ["151", 137, "1"], ["151", 138, "1"], ["151", 139, "1"], ["151", 140, "1"], ["151", 141, "1"], ["151", 142, "1"], ["151", 143, "1"], ["151", 144, "1"], ["151", 145, "1"], ["152", null, "1"], ["152", null, "2"], ["152", null, "2"], ["152", null, "4"], ["152", null, "12"], ["152", null, "21"], ["152", null, "23"], ["152", 1, "23"], ["152", 2, "23"], ["152", 3, "23"], ["152", 4, "23"], ["152", 5, "23"], ["152", 6, "23"], ["152", 7, "23"], ["152", 8, "23"], ["152", 9, "23"], ["152", 10, "23"], ["152", 11, "23"], ["152", 12, "23"], ["152", 13, "23"], ["152", 14, "23"], ["152", 15, "23"], ["152", 16, "23"], ["152", 17, "23"], ["152", 18, "23"], ["152", 19, "23"], ["152", 20, "23"], ["152", 21, "22"], ["152", 22, "22"], ["152", 23, "22"], ["152", 24, "23"], ["152", 25, "22"], ["152", 26, "22"], ["152", 27, "23"], ["152", 28, "23"], ["152", 29, "23"], ["152", 30, "19"], ["152", 31, "21"], ["152", 32, "20"], ["152", 33, "20"], ["152", 34, "19"], ["152", 35, "19"], ["152", 36, "18"], ["152", 37, "16"], ["152", 38, "14"], ["152", 39, "12"], ["152", 40, "11"], ["152", 41, "12"], ["152", 42, "10"], ["152", 43, "8"], ["152", 44, "5"], ["152", 45, "5"], ["152", 46, "4"], ["152", 47, "5"], ["152", 48, "5"], ["152", 49, "5"], ["152", 50, "1"], ["152", 51, "1"], ["152", 75, "1"], ["152", 76, "1"], ["152", 77, "1"], ["152", 78, "3"], ["152", 79, "3"], ["152", 80, "3"], ["152", 81, "2"], ["152", 82, "2"], ["152", 83, "1"], ["152", 84, "1"], ["152", 85, "1"], ["152", 86, "2"], ["152", 87, "2"], ["152", 88, "2"], ["152", 89, "3"], ["152", 90, "3"], ["152", 91, "2"], ["152", 92, "2"], ["152", 93, "1"], ["152", 94, "2"], ["152", 95, "2"], ["152", 96, "1"], ["152", 97, "1"], ["152", 98, "1"], ["152", 99, "1"], ["152", 100, "1"], ["152", 101, "2"], ["152", 102, "1"], ["152", 103, "2"], ["152", 104, "2"], ["152", 105, "1"], ["152", 106, "1"], ["152", 107, "1"], ["152", 108, "1"], ["152", 109, "1"], ["152", 110, "2"], ["152", 111, "2"], ["152", 112, "2"], ["152", 113, "3"], ["152", 114, "3"], ["152", 115, "3"], ["152", 116, "2"], ["152", 117, "2"], ["152", 118, "2"], ["152", 119, "2"], ["152", 120, "3"], ["152", 121, "3"], ["152", 122, "3"], ["152", 123, "3"], ["152", 124, "1"], ["152", 130, "2"], ["152", 131, "2"], ["152", 132, "1"], ["152", 133, "1"], ["152", 134, "1"], ["152", 135, "1"], ["152", 136, "1"], ["152", 137, "1"], ["152", 138, "1"], ["152", 139, "1"], ["152", 140, "1"], ["152", 141, "1"], ["152", 142, "1"], ["152", 143, "1"], ["152", 144, "1"], ["152", 145, "1"], ["153", null, "1"], ["153", null, "2"], ["153", null, "2"], ["153", null, "4"], ["153", null, "12"], ["153", null, "21"], ["153", null, "23"], ["153", 1, "23"], ["153", 2, "23"], ["153", 3, "23"], ["153", 4, "23"], ["153", 5, "23"], ["153", 6, "23"], ["153", 7, "23"], ["153", 8, "23"], ["153", 9, "23"], ["153", 10, "23"], ["153", 11, "23"], ["153", 12, "23"], ["153", 13, "23"], ["153", 14, "23"], ["153", 15, "23"], ["153", 16, "23"], ["153", 17, "23"], ["153", 18, "23"], ["153", 19, "23"], ["153", 20, "23"], ["153", 21, "22"], ["153", 22, "22"], ["153", 23, "22"], ["153", 24, "23"], ["153", 25, "22"], ["153", 26, "22"], ["153", 27, "23"], ["153", 28, "23"], ["153", 29, "23"], ["153", 30, "19"], ["153", 31, "21"], ["153", 32, "20"], ["153", 33, "20"], ["153", 34, "19"], ["153", 35, "19"], ["153", 36, "18"], ["153", 37, "16"], ["153", 38, "14"], ["153", 39, "12"], ["153", 40, "11"], ["153", 41, "12"], ["153", 42, "10"], ["153", 43, "8"], ["153", 44, "5"], ["153", 45, "5"], ["153", 46, "4"], ["153", 47, "5"], ["153", 48, "5"], ["153", 49, "5"], ["153", 50, "1"], ["153", 51, "1"], ["153", 75, "1"], ["153", 76, "1"], ["153", 77, "1"], ["153", 78, "3"], ["153", 79, "3"], ["153", 80, "3"], ["153", 81, "2"], ["153", 82, "2"], ["153", 83, "1"], ["153", 84, "1"], ["153", 85, "1"], ["153", 86, "2"], ["153", 87, "2"], ["153", 88, "2"], ["153", 89, "3"], ["153", 90, "3"], ["153", 91, "2"], ["153", 92, "2"], ["153", 93, "1"], ["153", 94, "2"], ["153", 95, "2"], ["153", 96, "1"], ["153", 97, "1"], ["153", 98, "1"], ["153", 99, "1"], ["153", 100, "1"], ["153", 101, "2"], ["153", 102, "1"], ["153", 103, "2"], ["153", 104, "2"], ["153", 105, "1"], ["153", 106, "1"], ["153", 107, "1"], ["153", 108, "1"], ["153", 109, "1"], ["153", 110, "2"], ["153", 111, "2"], ["153", 112, "2"], ["153", 113, "3"], ["153", 114, "3"], ["153", 115, "3"], ["153", 116, "2"], ["153", 117, "2"], ["153", 118, "2"], ["153", 119, "2"], ["153", 120, "3"], ["153", 121, "3"], ["153", 122, "3"], ["153", 123, "3"], ["153", 124, "1"], ["153", 130, "2"], ["153", 131, "2"], ["153", 132, "1"], ["153", 133, "1"], ["153", 134, "1"], ["153", 135, "1"], ["153", 136, "1"], ["153", 137, "1"], ["153", 138, "1"], ["153", 139, "1"], ["153", 140, "1"], ["153", 141, "1"], ["153", 142, "1"], ["153", 143, "1"], ["153", 144, "1"], ["153", 145, "1"], ["155", null, "1"], ["155", null, "4"], ["155", null, "8"], ["155", null, "16"], ["155", null, "23"], ["155", null, "23"], ["155", 1, "23"], ["155", 2, "23"], ["155", 3, "23"], ["155", 4, "23"], ["155", 5, "23"], ["155", 6, "23"], ["155", 7, "23"], ["155", 8, "23"], ["155", 9, "23"], ["155", 10, "23"], ["155", 11, "23"], ["155", 12, "23"], ["155", 13, "23"], ["155", 14, "23"], ["155", 15, "23"], ["155", 16, "23"], ["155", 17, "23"], ["155", 18, "23"], ["155", 19, "23"], ["155", 20, "23"], ["155", 21, "22"], ["155", 22, "22"], ["155", 23, "23"], ["155", 24, "23"], ["155", 25, "22"], ["155", 26, "22"], ["155", 27, "23"], ["155", 28, "23"], ["155", 29, "23"], ["155", 30, "23"], ["155", 31, "23"], ["155", 32, "21"], ["155", 33, "22"], ["155", 34, "21"], ["155", 35, "21"], ["155", 36, "18"], ["155", 37, "19"], ["155", 38, "19"], ["155", 39, "18"], ["155", 40, "18"], ["155", 41, "18"], ["155", 42, "14"], ["155", 43, "12"], ["155", 44, "12"], ["155", 45, "9"], ["155", 46, "9"], ["155", 47, "7"], ["155", 48, "6"], ["155", 49, "6"], ["155", 50, "5"], ["155", 51, "3"], ["155", 52, "3"], ["155", 53, "1"], ["155", 54, "1"], ["155", 55, "1"], ["155", 56, "1"], ["155", 57, "1"], ["155", 64, "1"], ["155", 72, "1"], ["155", 73, "1"], ["155", 74, "1"], ["155", 75, "1"], ["155", 76, "1"], ["155", 77, "3"], ["155", 78, "3"], ["155", 79, "3"], ["155", 80, "3"], ["155", 81, "2"], ["155", 82, "2"], ["155", 83, "1"], ["155", 84, "1"], ["155", 85, "1"], ["155", 86, "1"], ["155", 87, "2"], ["155", 88, "3"], ["155", 89, "2"], ["155", 90, "2"], ["155", 91, "2"], ["155", 92, "2"], ["155", 93, "2"], ["155", 94, "2"], ["155", 95, "2"], ["155", 96, "2"], ["155", 97, "3"], ["155", 98, "1"], ["155", 99, "1"], ["155", 100, "2"], ["155", 101, "1"], ["155", 102, "2"], ["155", 103, "2"], ["155", 104, "2"], ["155", 105, "2"], ["155", 106, "1"], ["155", 107, "1"], ["155", 108, "1"], ["155", 109, "3"], ["155", 110, "3"], ["155", 111, "3"], ["155", 112, "4"], ["155", 113, "4"], ["155", 114, "4"], ["155", 115, "3"], ["155", 116, "3"], ["155", 117, "2"], ["155", 118, "3"], ["155", 119, "3"], ["155", 120, "3"], ["155", 121, "3"], ["155", 122, "3"], ["155", 123, "1"], ["155", 128, "1"], ["155", 129, "3"], ["155", 130, "3"], ["155", 131, "2"], ["155", 132, "2"], ["155", 133, "1"], ["155", 134, "1"], ["155", 135, "1"], ["155", 136, "1"], ["155", 137, "1"], ["155", 138, "1"], ["155", 139, "1"], ["155", 140, "1"], ["155", 141, "1"], ["155", 142, "1"], ["155", 143, "1"], ["155", 144, "1"], ["155", 145, "1"], ["156", null, "1"], ["156", null, "4"], ["156", null, "8"], ["156", null, "16"], ["156", null, "23"], ["156", null, "23"], ["156", 1, "23"], ["156", 2, "23"], ["156", 3, "23"], ["156", 4, "23"], ["156", 5, "23"], ["156", 6, "23"], ["156", 7, "23"], ["156", 8, "23"], ["156", 9, "23"], ["156", 10, "23"], ["156", 11, "23"], ["156", 12, "23"], ["156", 13, "23"], ["156", 14, "23"], ["156", 15, "23"], ["156", 16, "23"], ["156", 17, "23"], ["156", 18, "23"], ["156", 19, "23"], ["156", 20, "23"], ["156", 21, "22"], ["156", 22, "22"], ["156", 23, "23"], ["156", 24, "23"], ["156", 25, "22"], ["156", 26, "22"], ["156", 27, "23"], ["156", 28, "23"], ["156", 29, "23"], ["156", 30, "23"], ["156", 31, "23"], ["156", 32, "21"], ["156", 33, "22"], ["156", 34, "21"], ["156", 35, "21"], ["156", 36, "18"], ["156", 37, "19"], ["156", 38, "19"], ["156", 39, "18"], ["156", 40, "18"], ["156", 41, "18"], ["156", 42, "14"], ["156", 43, "12"], ["156", 44, "12"], ["156", 45, "9"], ["156", 46, "9"], ["156", 47, "7"], ["156", 48, "6"], ["156", 49, "6"], ["156", 50, "5"], ["156", 51, "3"], ["156", 52, "3"], ["156", 53, "1"], ["156", 54, "1"], ["156", 55, "1"], ["156", 56, "1"], ["156", 57, "1"], ["156", 64, "1"], ["156", 72, "1"], ["156", 73, "1"], ["156", 74, "1"], ["156", 75, "1"], ["156", 76, "1"], ["156", 77, "3"], ["156", 78, "3"], ["156", 79, "3"], ["156", 80, "3"], ["156", 81, "2"], ["156", 82, "2"], ["156", 83, "1"], ["156", 84, "1"], ["156", 85, "1"], ["156", 86, "1"], ["156", 87, "2"], ["156", 88, "3"], ["156", 89, "2"], ["156", 90, "2"], ["156", 91, "2"], ["156", 92, "2"], ["156", 93, "2"], ["156", 94, "2"], ["156", 95, "2"], ["156", 96, "2"], ["156", 97, "3"], ["156", 98, "1"], ["156", 99, "1"], ["156", 100, "2"], ["156", 101, "1"], ["156", 102, "2"], ["156", 103, "2"], ["156", 104, "2"], ["156", 105, "2"], ["156", 106, "1"], ["156", 107, "1"], ["156", 108, "1"], ["156", 109, "3"], ["156", 110, "3"], ["156", 111, "3"], ["156", 112, "4"], ["156", 113, "4"], ["156", 114, "4"], ["156", 115, "3"], ["156", 116, "3"], ["156", 117, "2"], ["156", 118, "3"], ["156", 119, "3"], ["156", 120, "3"], ["156", 121, "3"], ["156", 122, "3"], ["156", 123, "1"], ["156", 128, "1"], ["156", 129, "3"], ["156", 130, "3"], ["156", 131, "2"], ["156", 132, "2"], ["156", 133, "1"], ["156", 134, "1"], ["156", 135, "1"], ["156", 136, "1"], ["156", 137, "1"], ["156", 138, "1"], ["156", 139, "1"], ["156", 140, "1"], ["156", 141, "1"], ["156", 142, "1"], ["156", 143, "1"], ["156", 144, "1"], ["156", 145, "1"], ["157", null, "1"], ["157", null, "4"], ["157", null, "8"], ["157", null, "16"], ["157", null, "23"], ["157", null, "23"], ["157", 1, "23"], ["157", 2, "23"], ["157", 3, "23"], ["157", 4, "23"], ["157", 5, "23"], ["157", 6, "23"], ["157", 7, "23"], ["157", 8, "23"], ["157", 9, "23"], ["157", 10, "23"], ["157", 11, "23"], ["157", 12, "23"], ["157", 13, "23"], ["157", 14, "23"], ["157", 15, "23"], ["157", 16, "23"], ["157", 17, "23"], ["157", 18, "23"], ["157", 19, "23"], ["157", 20, "23"], ["157", 21, "22"], ["157", 22, "22"], ["157", 23, "23"], ["157", 24, "23"], ["157", 25, "22"], ["157", 26, "22"], ["157", 27, "23"], ["157", 28, "23"], ["157", 29, "23"], ["157", 30, "23"], ["157", 31, "23"], ["157", 32, "21"], ["157", 33, "22"], ["157", 34, "21"], ["157", 35, "21"], ["157", 36, "18"], ["157", 37, "19"], ["157", 38, "19"], ["157", 39, "18"], ["157", 40, "18"], ["157", 41, "18"], ["157", 42, "14"], ["157", 43, "12"], ["157", 44, "12"], ["157", 45, "9"], ["157", 46, "9"], ["157", 47, "7"], ["157", 48, "6"], ["157", 49, "6"], ["157", 50, "5"], ["157", 51, "3"], ["157", 52, "3"], ["157", 53, "1"], ["157", 54, "1"], ["157", 55, "1"], ["157", 56, "1"], ["157", 57, "1"], ["157", 64, "1"], ["157", 72, "1"], ["157", 73, "1"], ["157", 74, "1"], ["157", 75, "1"], ["157", 76, "1"], ["157", 77, "3"], ["157", 78, "3"], ["157", 79, "3"], ["157", 80, "3"], ["157", 81, "2"], ["157", 82, "2"], ["157", 83, "1"], ["157", 84, "1"], ["157", 85, "1"], ["157", 86, "1"], ["157", 87, "2"], ["157", 88, "3"], ["157", 89, "2"], ["157", 90, "2"], ["157", 91, "2"], ["157", 92, "2"], ["157", 93, "2"], ["157", 94, "2"], ["157", 95, "2"], ["157", 96, "2"], ["157", 97, "3"], ["157", 98, "1"], ["157", 99, "1"], ["157", 100, "2"], ["157", 101, "1"], ["157", 102, "2"], ["157", 103, "2"], ["157", 104, "2"], ["157", 105, "2"], ["157", 106, "1"], ["157", 107, "1"], ["157", 108, "1"], ["157", 109, "3"], ["157", 110, "3"], ["157", 111, "3"], ["157", 112, "4"], ["157", 113, "4"], ["157", 114, "4"], ["157", 115, "3"], ["157", 116, "3"], ["157", 117, "2"], ["157", 118, "3"], ["157", 119, "3"], ["157", 120, "3"], ["157", 121, "3"], ["157", 122, "3"], ["157", 123, "1"], ["157", 128, "1"], ["157", 129, "3"], ["157", 130, "3"], ["157", 131, "2"], ["157", 132, "2"], ["157", 133, "1"], ["157", 134, "1"], ["157", 135, "1"], ["157", 136, "1"], ["157", 137, "1"], ["157", 138, "1"], ["157", 139, "1"], ["157", 140, "1"], ["157", 141, "1"], ["157", 142, "1"], ["157", 143, "1"], ["157", 144, "1"], ["157", 145, "1"], ["164", null, "2"], ["164", null, "3"], ["164", null, "11"], ["164", null, "17"], ["164", null, "22"], ["164", null, "23"], ["164", null, "23"], ["164", 1, "23"], ["164", 2, "23"], ["164", 3, "23"], ["164", 4, "23"], ["164", 5, "23"], ["164", 6, "23"], ["164", 7, "23"], ["164", 8, "23"], ["164", 9, "23"], ["164", 10, "23"], ["164", 11, "23"], ["164", 12, "23"], ["164", 13, "23"], ["164", 14, "23"], ["164", 15, "23"], ["164", 16, "23"], ["164", 17, "23"], ["164", 18, "23"], ["164", 19, "23"], ["164", 20, "23"], ["164", 21, "22"], ["164", 22, "22"], ["164", 23, "23"], ["164", 24, "23"], ["164", 25, "22"], ["164", 26, "22"], ["164", 27, "23"], ["164", 28, "23"], ["164", 29, "23"], ["164", 30, "23"], ["164", 31, "23"], ["164", 32, "23"], ["164", 33, "23"], ["164", 34, "23"], ["164", 35, "22"], ["164", 36, "22"], ["164", 37, "23"], ["164", 38, "22"], ["164", 39, "22"], ["164", 40, "22"], ["164", 41, "21"], ["164", 42, "19"], ["164", 43, "18"], ["164", 44, "17"], ["164", 45, "15"], ["164", 46, "14"], ["164", 47, "14"], ["164", 48, "13"], ["164", 49, "11"], ["164", 50, "10"], ["164", 51, "9"], ["164", 52, "9"], ["164", 53, "12"], ["164", 54, "11"], ["164", 55, "8"], ["164", 56, "6"], ["164", 57, "4"], ["164", 58, "3"], ["164", 59, "3"], ["164", 60, "3"], ["164", 61, "1"], ["164", 62, "2"], ["164", 63, "1"], ["164", 64, "2"], ["164", 65, "2"], ["164", 66, "1"], ["164", 67, "1"], ["164", 71, "1"], ["164", 75, "2"], ["164", 76, "3"], ["164", 77, "5"], ["164", 78, "3"], ["164", 79, "2"], ["164", 80, "2"], ["164", 81, "2"], ["164", 82, "3"], ["164", 83, "3"], ["164", 84, "3"], ["164", 85, "2"], ["164", 86, "2"], ["164", 87, "3"], ["164", 88, "5"], ["164", 89, "5"], ["164", 90, "5"], ["164", 91, "6"], ["164", 92, "5"], ["164", 93, "6"], ["164", 94, "4"], ["164", 95, "5"], ["164", 96, "6"], ["164", 97, "7"], ["164", 98, "6"], ["164", 99, "3"], ["164", 100, "3"], ["164", 101, "3"], ["164", 102, "2"], ["164", 103, "2"], ["164", 104, "1"], ["164", 105, "1"], ["164", 108, "2"], ["164", 109, "2"], ["164", 110, "2"], ["164", 111, "3"], ["164", 112, "4"], ["164", 113, "4"], ["164", 114, "4"], ["164", 115, "4"], ["164", 116, "4"], ["164", 117, "4"], ["164", 118, "4"], ["164", 119, "4"], ["164", 120, "4"], ["164", 121, "3"], ["164", 122, "3"], ["164", 123, "2"], ["164", 124, "1"], ["164", 125, "1"], ["164", 126, "4"], ["164", 127, "5"], ["164", 128, "5"], ["164", 129, "3"], ["164", 130, "3"], ["164", 131, "1"], ["164", 132, "1"], ["164", 133, "2"], ["164", 134, "2"], ["164", 135, "2"], ["164", 136, "1"], ["164", 137, "1"], ["164", 138, "1"], ["164", 139, "2"], ["164", 140, "1"], ["164", 156, "1"], ["164", 157, "1"], ["164", 158, "1"], ["164", 159, "1"], ["165", null, "2"], ["165", null, "3"], ["165", null, "11"], ["165", null, "17"], ["165", null, "22"], ["165", null, "23"], ["165", null, "23"], ["165", 1, "23"], ["165", 2, "23"], ["165", 3, "23"], ["165", 4, "23"], ["165", 5, "23"], ["165", 6, "23"], ["165", 7, "23"], ["165", 8, "23"], ["165", 9, "23"], ["165", 10, "23"], ["165", 11, "23"], ["165", 12, "23"], ["165", 13, "23"], ["165", 14, "23"], ["165", 15, "23"], ["165", 16, "23"], ["165", 17, "23"], ["165", 18, "23"], ["165", 19, "23"], ["165", 20, "23"], ["165", 21, "22"], ["165", 22, "22"], ["165", 23, "23"], ["165", 24, "23"], ["165", 25, "22"], ["165", 26, "22"], ["165", 27, "23"], ["165", 28, "23"], ["165", 29, "23"], ["165", 30, "23"], ["165", 31, "23"], ["165", 32, "23"], ["165", 33, "23"], ["165", 34, "23"], ["165", 35, "22"], ["165", 36, "22"], ["165", 37, "23"], ["165", 38, "22"], ["165", 39, "22"], ["165", 40, "22"], ["165", 41, "21"], ["165", 42, "19"], ["165", 43, "18"], ["165", 44, "17"], ["165", 45, "15"], ["165", 46, "14"], ["165", 47, "14"], ["165", 48, "13"], ["165", 49, "11"], ["165", 50, "10"], ["165", 51, "9"], ["165", 52, "9"], ["165", 53, "12"], ["165", 54, "11"], ["165", 55, "8"], ["165", 56, "6"], ["165", 57, "4"], ["165", 58, "3"], ["165", 59, "3"], ["165", 60, "3"], ["165", 61, "1"], ["165", 62, "2"], ["165", 63, "1"], ["165", 64, "2"], ["165", 65, "2"], ["165", 66, "1"], ["165", 67, "1"], ["165", 71, "1"], ["165", 75, "2"], ["165", 76, "3"], ["165", 77, "5"], ["165", 78, "3"], ["165", 79, "2"], ["165", 80, "2"], ["165", 81, "2"], ["165", 82, "3"], ["165", 83, "3"], ["165", 84, "3"], ["165", 85, "2"], ["165", 86, "2"], ["165", 87, "3"], ["165", 88, "5"], ["165", 89, "5"], ["165", 90, "5"], ["165", 91, "6"], ["165", 92, "5"], ["165", 93, "6"], ["165", 94, "4"], ["165", 95, "5"], ["165", 96, "6"], ["165", 97, "7"], ["165", 98, "6"], ["165", 99, "3"], ["165", 100, "3"], ["165", 101, "3"], ["165", 102, "2"], ["165", 103, "2"], ["165", 104, "1"], ["165", 105, "1"], ["165", 108, "2"], ["165", 109, "2"], ["165", 110, "2"], ["165", 111, "3"], ["165", 112, "4"], ["165", 113, "4"], ["165", 114, "4"], ["165", 115, "4"], ["165", 116, "4"], ["165", 117, "4"], ["165", 118, "4"], ["165", 119, "4"], ["165", 120, "4"], ["165", 121, "3"], ["165", 122, "3"], ["165", 123, "2"], ["165", 124, "1"], ["165", 125, "1"], ["165", 126, "4"], ["165", 127, "5"], ["165", 128, "5"], ["165", 129, "3"], ["165", 130, "3"], ["165", 131, "1"], ["165", 132, "1"], ["165", 133, "2"], ["165", 134, "2"], ["165", 135, "2"], ["165", 136, "1"], ["165", 137, "1"], ["165", 138, "1"], ["165", 139, "2"], ["165", 140, "1"], ["165", 156, "1"], ["165", 157, "1"], ["165", 158, "1"], ["165", 159, "1"], ["166", null, "2"], ["166", null, "6"], ["166", null, "15"], ["166", null, "20"], ["166", null, "22"], ["166", null, "23"], ["166", null, "23"], ["166", null, "23"], ["166", 1, "23"], ["166", 2, "23"], ["166", 3, "23"], ["166", 4, "23"], ["166", 5, "23"], ["166", 6, "23"], ["166", 7, "23"], ["166", 8, "23"], ["166", 9, "23"], ["166", 10, "23"], ["166", 11, "23"], ["166", 12, "23"], ["166", 13, "23"], ["166", 14, "23"], ["166", 15, "23"], ["166", 16, "23"], ["166", 17, "23"], ["166", 18, "23"], ["166", 19, "23"], ["166", 20, "23"], ["166", 21, "22"], ["166", 22, "22"], ["166", 23, "23"], ["166", 24, "23"], ["166", 25, "22"], ["166", 26, "22"], ["166", 27, "23"], ["166", 28, "23"], ["166", 29, "23"], ["166", 30, "23"], ["166", 31, "23"], ["166", 32, "23"], ["166", 33, "23"], ["166", 34, "23"], ["166", 35, "22"], ["166", 36, "22"], ["166", 37, "23"], ["166", 38, "23"], ["166", 39, "23"], ["166", 40, "22"], ["166", 41, "21"], ["166", 42, "21"], ["166", 43, "20"], ["166", 44, "19"], ["166", 45, "19"], ["166", 46, "18"], ["166", 47, "20"], ["166", 48, "19"], ["166", 49, "15"], ["166", 50, "14"], ["166", 51, "15"], ["166", 52, "13"], ["166", 53, "14"], ["166", 54, "14"], ["166", 55, "14"], ["166", 56, "12"], ["166", 57, "12"], ["166", 58, "11"], ["166", 59, "12"], ["166", 60, "10"], ["166", 61, "7"], ["166", 62, "7"], ["166", 63, "5"], ["166", 64, "3"], ["166", 65, "4"], ["166", 66, "2"], ["166", 67, "2"], ["166", 68, "2"], ["166", 69, "3"], ["166", 70, "4"], ["166", 71, "3"], ["166", 72, "2"], ["166", 73, "2"], ["166", 74, "2"], ["166", 75, "8"], ["166", 76, "9"], ["166", 77, "8"], ["166", 78, "7"], ["166", 79, "8"], ["166", 80, "8"], ["166", 81, "9"], ["166", 82, "13"], ["166", 83, "11"], ["166", 84, "11"], ["166", 85, "11"], ["166", 86, "12"], ["166", 87, "12"], ["166", 88, "12"], ["166", 89, "14"], ["166", 90, "16"], ["166", 91, "12"], ["166", 92, "12"], ["166", 93, "12"], ["166", 94, "13"], ["166", 95, "14"], ["166", 96, "12"], ["166", 97, "12"], ["166", 98, "11"], ["166", 99, "10"], ["166", 100, "9"], ["166", 101, "8"], ["166", 102, "7"], ["166", 103, "6"], ["166", 104, "4"], ["166", 105, "5"], ["166", 106, "3"], ["166", 107, "6"], ["166", 108, "6"], ["166", 109, "7"], ["166", 110, "7"], ["166", 111, "6"], ["166", 112, "7"], ["166", 113, "8"], ["166", 114, "7"], ["166", 115, "6"], ["166", 116, "6"], ["166", 117, "6"], ["166", 118, "7"], ["166", 119, "6"], ["166", 120, "6"], ["166", 121, "5"], ["166", 122, "5"], ["166", 123, "5"], ["166", 124, "5"], ["166", 125, "6"], ["166", 126, "6"], ["166", 127, "9"], ["166", 128, "9"], ["166", 129, "9"], ["166", 130, "9"], ["166", 131, "8"], ["166", 132, "8"], ["166", 133, "9"], ["166", 134, "7"], ["166", 135, "8"], ["166", 136, "7"], ["166", 137, "5"], ["166", 138, "4"], ["166", 139, "4"], ["166", 140, "3"], ["166", 141, "1"], ["166", 142, "1"], ["166", 143, "1"], ["166", 155, "1"], ["166", 156, "1"], ["166", 157, "1"], ["166", 158, "1"], ["166", 159, "1"], ["166", 163, "1"], ["166", 164, "2"], ["166", 165, "3"], ["166", 166, "2"], ["166", 167, "1"], ["166", 169, "1"], ["166", 170, "1"], ["166", 171, "2"], ["166", 172, "2"], ["166", 173, "2"], ["166", 174, "2"], ["166", 175, "2"], ["166", 176, "2"], ["166", 177, "2"], ["166", 178, "2"], ["166", 179, "1"], ["166", 180, "1"], ["167", null, "1"], ["167", null, "5"], ["167", null, "11"], ["167", null, "22"], ["167", null, "23"], ["167", null, "23"], ["167", 1, "23"], ["167", 2, "22"], ["167", 3, "23"], ["167", 4, "23"], ["167", 5, "23"], ["167", 6, "23"], ["167", 7, "22"], ["167", 8, "23"], ["167", 9, "23"], ["167", 10, "23"], ["167", 11, "23"], ["167", 12, "22"], ["167", 13, "23"], ["167", 14, "23"], ["167", 15, "23"], ["167", 16, "23"], ["167", 17, "23"], ["167", 18, "23"], ["167", 19, "23"], ["167", 20, "23"], ["167", 21, "22"], ["167", 22, "22"], ["167", 23, "23"], ["167", 24, "23"], ["167", 25, "22"], ["167", 26, "22"], ["167", 27, "23"], ["167", 28, "23"], ["167", 29, "23"], ["167", 30, "23"], ["167", 31, "23"], ["167", 32, "23"], ["167", 33, "23"], ["167", 34, "23"], ["167", 35, "22"], ["167", 36, "22"], ["167", 37, "23"], ["167", 38, "23"], ["167", 39, "23"], ["167", 40, "23"], ["167", 41, "22"], ["167", 42, "21"], ["167", 43, "20"], ["167", 44, "20"], ["167", 45, "21"], ["167", 46, "21"], ["167", 47, "19"], ["167", 48, "20"], ["167", 49, "19"], ["167", 50, "18"], ["167", 51, "15"], ["167", 52, "15"], ["167", 53, "15"], ["167", 54, "14"], ["167", 55, "14"], ["167", 56, "13"], ["167", 57, "13"], ["167", 58, "12"], ["167", 59, "13"], ["167", 60, "12"], ["167", 61, "9"], ["167", 62, "8"], ["167", 63, "7"], ["167", 64, "5"], ["167", 65, "4"], ["167", 66, "4"], ["167", 67, "4"], ["167", 68, "4"], ["167", 69, "4"], ["167", 70, "5"], ["167", 71, "6"], ["167", 72, "7"], ["167", 73, "6"], ["167", 74, "7"], ["167", 75, "10"], ["167", 76, "10"], ["167", 77, "7"], ["167", 78, "7"], ["167", 79, "10"], ["167", 80, "10"], ["167", 81, "14"], ["167", 82, "13"], ["167", 83, "12"], ["167", 84, "13"], ["167", 85, "14"], ["167", 86, "16"], ["167", 87, "17"], ["167", 88, "15"], ["167", 89, "18"], ["167", 90, "18"], ["167", 91, "16"], ["167", 92, "18"], ["167", 93, "16"], ["167", 94, "16"], ["167", 95, "17"], ["167", 96, "14"], ["167", 97, "13"], ["167", 98, "13"], ["167", 99, "12"], ["167", 100, "11"], ["167", 101, "11"], ["167", 102, "8"], ["167", 103, "9"], ["167", 104, "8"], ["167", 105, "6"], ["167", 106, "7"], ["167", 107, "7"], ["167", 108, "8"], ["167", 109, "9"], ["167", 110, "9"], ["167", 111, "9"], ["167", 112, "9"], ["167", 113, "10"], ["167", 114, "8"], ["167", 115, "8"], ["167", 116, "7"], ["167", 117, "7"], ["167", 118, "7"], ["167", 119, "7"], ["167", 120, "7"], ["167", 121, "7"], ["167", 122, "7"], ["167", 123, "7"], ["167", 124, "7"], ["167", 125, "8"], ["167", 126, "10"], ["167", 127, "11"], ["167", 128, "10"], ["167", 129, "12"], ["167", 130, "11"], ["167", 131, "11"], ["167", 132, "14"], ["167", 133, "16"], ["167", 134, "13"], ["167", 135, "12"], ["167", 136, "11"], ["167", 137, "10"], ["167", 138, "8"], ["167", 139, "7"], ["167", 140, "5"], ["167", 141, "4"], ["167", 142, "2"], ["167", 143, "1"], ["167", 144, "1"], ["167", 149, "1"], ["167", 150, "1"], ["167", 151, "1"], ["167", 155, "1"], ["167", 156, "1"], ["167", 157, "1"], ["167", 158, "1"], ["167", 162, "1"], ["167", 163, "2"], ["167", 164, "3"], ["167", 165, "3"], ["167", 166, "1"], ["167", 167, "1"], ["167", 168, "1"], ["167", 169, "2"], ["167", 170, "2"], ["167", 171, "2"], ["167", 172, "3"], ["167", 173, "3"], ["167", 174, "3"], ["167", 175, "2"], ["167", 176, "2"], ["167", 177, "2"], ["167", 178, "2"], ["167", 179, "2"], ["167", 180, "2"], ["167", 181, "2"], ["168", null, "1"], ["168", null, "5"], ["168", null, "11"], ["168", null, "22"], ["168", null, "23"], ["168", null, "23"], ["168", 1, "23"], ["168", 2, "22"], ["168", 3, "23"], ["168", 4, "23"], ["168", 5, "23"], ["168", 6, "23"], ["168", 7, "22"], ["168", 8, "23"], ["168", 9, "23"], ["168", 10, "23"], ["168", 11, "23"], ["168", 12, "22"], ["168", 13, "23"], ["168", 14, "23"], ["168", 15, "23"], ["168", 16, "23"], ["168", 17, "23"], ["168", 18, "23"], ["168", 19, "23"], ["168", 20, "23"], ["168", 21, "22"], ["168", 22, "22"], ["168", 23, "23"], ["168", 24, "23"], ["168", 25, "22"], ["168", 26, "22"], ["168", 27, "23"], ["168", 28, "23"], ["168", 29, "23"], ["168", 30, "23"], ["168", 31, "23"], ["168", 32, "23"], ["168", 33, "23"], ["168", 34, "23"], ["168", 35, "22"], ["168", 36, "22"], ["168", 37, "23"], ["168", 38, "23"], ["168", 39, "23"], ["168", 40, "23"], ["168", 41, "22"], ["168", 42, "21"], ["168", 43, "20"], ["168", 44, "20"], ["168", 45, "21"], ["168", 46, "21"], ["168", 47, "19"], ["168", 48, "20"], ["168", 49, "19"], ["168", 50, "18"], ["168", 51, "15"], ["168", 52, "15"], ["168", 53, "15"], ["168", 54, "14"], ["168", 55, "14"], ["168", 56, "13"], ["168", 57, "13"], ["168", 58, "12"], ["168", 59, "13"], ["168", 60, "12"], ["168", 61, "9"], ["168", 62, "8"], ["168", 63, "7"], ["168", 64, "5"], ["168", 65, "4"], ["168", 66, "4"], ["168", 67, "4"], ["168", 68, "4"], ["168", 69, "4"], ["168", 70, "5"], ["168", 71, "6"], ["168", 72, "7"], ["168", 73, "6"], ["168", 74, "7"], ["168", 75, "10"], ["168", 76, "10"], ["168", 77, "7"], ["168", 78, "7"], ["168", 79, "10"], ["168", 80, "10"], ["168", 81, "14"], ["168", 82, "13"], ["168", 83, "12"], ["168", 84, "13"], ["168", 85, "14"], ["168", 86, "16"], ["168", 87, "17"], ["168", 88, "15"], ["168", 89, "18"], ["168", 90, "18"], ["168", 91, "16"], ["168", 92, "18"], ["168", 93, "16"], ["168", 94, "16"], ["168", 95, "17"], ["168", 96, "14"], ["168", 97, "13"], ["168", 98, "13"], ["168", 99, "12"], ["168", 100, "11"], ["168", 101, "11"], ["168", 102, "8"], ["168", 103, "9"], ["168", 104, "8"], ["168", 105, "6"], ["168", 106, "7"], ["168", 107, "7"], ["168", 108, "8"], ["168", 109, "9"], ["168", 110, "9"], ["168", 111, "9"], ["168", 112, "9"], ["168", 113, "10"], ["168", 114, "8"], ["168", 115, "8"], ["168", 116, "7"], ["168", 117, "7"], ["168", 118, "7"], ["168", 119, "7"], ["168", 120, "7"], ["168", 121, "7"], ["168", 122, "7"], ["168", 123, "7"], ["168", 124, "7"], ["168", 125, "8"], ["168", 126, "10"], ["168", 127, "11"], ["168", 128, "10"], ["168", 129, "12"], ["168", 130, "11"], ["168", 131, "11"], ["168", 132, "14"], ["168", 133, "16"], ["168", 134, "13"], ["168", 135, "12"], ["168", 136, "11"], ["168", 137, "10"], ["168", 138, "8"], ["168", 139, "7"], ["168", 140, "5"], ["168", 141, "4"], ["168", 142, "2"], ["168", 143, "1"], ["168", 144, "1"], ["168", 149, "1"], ["168", 150, "1"], ["168", 151, "1"], ["168", 155, "1"], ["168", 156, "1"], ["168", 157, "1"], ["168", 158, "1"], ["168", 162, "1"], ["168", 163, "2"], ["168", 164, "3"], ["168", 165, "3"], ["168", 166, "1"], ["168", 167, "1"], ["168", 168, "1"], ["168", 169, "2"], ["168", 170, "2"], ["168", 171, "2"], ["168", 172, "3"], ["168", 173, "3"], ["168", 174, "3"], ["168", 175, "2"], ["168", 176, "2"], ["168", 177, "2"], ["168", 178, "2"], ["168", 179, "2"], ["168", 180, "2"], ["168", 181, "2"], ["169", null, "1"], ["169", null, "1"], ["169", null, "3"], ["169", null, "4"], ["169", 1, "8"], ["169", 2, "16"], ["169", 3, "19"], ["169", 4, "20"], ["169", 5, "23"], ["169", 6, "23"], ["169", 7, "23"], ["169", 8, "23"], ["169", 9, "23"], ["169", 10, "23"], ["169", 11, "23"], ["169", 12, "23"], ["169", 13, "23"], ["169", 14, "23"], ["169", 15, "23"], ["169", 16, "23"], ["169", 17, "23"], ["169", 18, "23"], ["169", 19, "23"], ["169", 20, "23"], ["169", 21, "22"], ["169", 22, "22"], ["169", 23, "23"], ["169", 24, "23"], ["169", 25, "22"], ["169", 26, "22"], ["169", 27, "23"], ["169", 28, "23"], ["169", 29, "23"], ["169", 30, "23"], ["169", 31, "23"], ["169", 32, "23"], ["169", 33, "23"], ["169", 34, "23"], ["169", 35, "22"], ["169", 36, "22"], ["169", 37, "23"], ["169", 38, "23"], ["169", 39, "23"], ["169", 40, "22"], ["169", 41, "21"], ["169", 42, "21"], ["169", 43, "18"], ["169", 44, "17"], ["169", 45, "20"], ["169", 46, "19"], ["169", 47, "17"], ["169", 48, "15"], ["169", 49, "18"], ["169", 50, "17"], ["169", 51, "15"], ["169", 52, "16"], ["169", 53, "15"], ["169", 54, "15"], ["169", 55, "11"], ["169", 56, "13"], ["169", 57, "16"], ["169", 58, "14"], ["169", 59, "14"], ["169", 60, "11"], ["169", 61, "11"], ["169", 62, "10"], ["169", 63, "7"], ["169", 64, "4"], ["169", 65, "5"], ["169", 66, "6"], ["169", 67, "7"], ["169", 68, "5"], ["169", 69, "6"], ["169", 70, "7"], ["169", 71, "5"], ["169", 72, "3"], ["169", 73, "8"], ["169", 74, "10"], ["169", 75, "10"], ["169", 76, "7"], ["169", 77, "6"], ["169", 78, "7"], ["169", 79, "7"], ["169", 80, "11"], ["169", 81, "13"], ["169", 82, "11"], ["169", 83, "11"], ["169", 84, "12"], ["169", 85, "12"], ["169", 86, "13"], ["169", 87, "12"], ["169", 88, "17"], ["169", 89, "18"], ["169", 90, "17"], ["169", 91, "16"], ["169", 92, "18"], ["169", 93, "16"], ["169", 94, "17"], ["169", 95, "17"], ["169", 96, "13"], ["169", 97, "12"], ["169", 98, "11"], ["169", 99, "14"], ["169", 100, "13"], ["169", 101, "11"], ["169", 102, "13"], ["169", 103, "11"], ["169", 104, "11"], ["169", 105, "9"], ["169", 106, "9"], ["169", 107, "9"], ["169", 108, "8"], ["169", 109, "9"], ["169", 110, "8"], ["169", 111, "11"], ["169", 112, "11"], ["169", 113, "8"], ["169", 114, "7"], ["169", 115, "7"], ["169", 116, "8"], ["169", 117, "6"], ["169", 118, "9"], ["169", 119, "9"], ["169", 120, "9"], ["169", 121, "9"], ["169", 122, "8"], ["169", 123, "11"], ["169", 124, "11"], ["169", 125, "11"], ["169", 126, "14"], ["169", 127, "17"], ["169", 128, "17"], ["169", 129, "17"], ["169", 130, "14"], ["169", 131, "17"], ["169", 132, "16"], ["169", 133, "19"], ["169", 134, "19"], ["169", 135, "18"], ["169", 136, "17"], ["169", 137, "13"], ["169", 138, "11"], ["169", 139, "12"], ["169", 140, "9"], ["169", 141, "6"], ["169", 142, "5"], ["169", 143, "2"], ["169", 144, "1"], ["169", 148, "1"], ["169", 149, "1"], ["169", 150, "1"], ["169", 161, "1"], ["169", 162, "1"], ["169", 163, "2"], ["169", 164, "2"], ["169", 165, "2"], ["169", 166, "2"], ["169", 167, "2"], ["169", 168, "2"], ["169", 169, "3"], ["169", 170, "3"], ["169", 171, "3"], ["169", 172, "3"], ["169", 173, "3"], ["169", 174, "3"], ["169", 175, "3"], ["169", 176, "3"], ["169", 177, "3"], ["169", 178, "3"], ["169", 179, "3"], ["169", 180, "3"], ["169", 181, "3"], ["169", 182, "3"], ["169", 183, "1"], ["169", null, "1"], ["170", null, "1"], ["170", null, "1"], ["170", null, "3"], ["170", null, "4"], ["170", 1, "8"], ["170", 2, "16"], ["170", 3, "19"], ["170", 4, "20"], ["170", 5, "23"], ["170", 6, "23"], ["170", 7, "23"], ["170", 8, "23"], ["170", 9, "23"], ["170", 10, "23"], ["170", 11, "23"], ["170", 12, "23"], ["170", 13, "23"], ["170", 14, "23"], ["170", 15, "23"], ["170", 16, "23"], ["170", 17, "23"], ["170", 18, "23"], ["170", 19, "23"], ["170", 20, "23"], ["170", 21, "22"], ["170", 22, "22"], ["170", 23, "23"], ["170", 24, "23"], ["170", 25, "22"], ["170", 26, "22"], ["170", 27, "23"], ["170", 28, "23"], ["170", 29, "23"], ["170", 30, "23"], ["170", 31, "23"], ["170", 32, "23"], ["170", 33, "23"], ["170", 34, "23"], ["170", 35, "22"], ["170", 36, "22"], ["170", 37, "23"], ["170", 38, "23"], ["170", 39, "23"], ["170", 40, "22"], ["170", 41, "21"], ["170", 42, "21"], ["170", 43, "18"], ["170", 44, "17"], ["170", 45, "20"], ["170", 46, "19"], ["170", 47, "17"], ["170", 48, "15"], ["170", 49, "18"], ["170", 50, "17"], ["170", 51, "15"], ["170", 52, "16"], ["170", 53, "15"], ["170", 54, "15"], ["170", 55, "11"], ["170", 56, "13"], ["170", 57, "16"], ["170", 58, "14"], ["170", 59, "14"], ["170", 60, "11"], ["170", 61, "11"], ["170", 62, "10"], ["170", 63, "7"], ["170", 64, "4"], ["170", 65, "5"], ["170", 66, "6"], ["170", 67, "7"], ["170", 68, "5"], ["170", 69, "6"], ["170", 70, "7"], ["170", 71, "5"], ["170", 72, "3"], ["170", 73, "8"], ["170", 74, "10"], ["170", 75, "10"], ["170", 76, "7"], ["170", 77, "6"], ["170", 78, "7"], ["170", 79, "7"], ["170", 80, "11"], ["170", 81, "13"], ["170", 82, "11"], ["170", 83, "11"], ["170", 84, "12"], ["170", 85, "12"], ["170", 86, "13"], ["170", 87, "12"], ["170", 88, "17"], ["170", 89, "18"], ["170", 90, "17"], ["170", 91, "16"], ["170", 92, "18"], ["170", 93, "16"], ["170", 94, "17"], ["170", 95, "17"], ["170", 96, "13"], ["170", 97, "12"], ["170", 98, "11"], ["170", 99, "14"], ["170", 100, "13"], ["170", 101, "11"], ["170", 102, "13"], ["170", 103, "11"], ["170", 104, "11"], ["170", 105, "9"], ["170", 106, "9"], ["170", 107, "9"], ["170", 108, "8"], ["170", 109, "9"], ["170", 110, "8"], ["170", 111, "11"], ["170", 112, "11"], ["170", 113, "8"], ["170", 114, "7"], ["170", 115, "7"], ["170", 116, "8"], ["170", 117, "6"], ["170", 118, "9"], ["170", 119, "9"], ["170", 120, "9"], ["170", 121, "9"], ["170", 122, "8"], ["170", 123, "11"], ["170", 124, "11"], ["170", 125, "11"], ["170", 126, "14"], ["170", 127, "17"], ["170", 128, "17"], ["170", 129, "17"], ["170", 130, "14"], ["170", 131, "17"], ["170", 132, "16"], ["170", 133, "19"], ["170", 134, "19"], ["170", 135, "18"], ["170", 136, "17"], ["170", 137, "13"], ["170", 138, "11"], ["170", 139, "12"], ["170", 140, "9"], ["170", 141, "6"], ["170", 142, "5"], ["170", 143, "2"], ["170", 144, "1"], ["170", 148, "1"], ["170", 149, "1"], ["170", 150, "1"], ["170", 161, "1"], ["170", 162, "1"], ["170", 163, "2"], ["170", 164, "2"], ["170", 165, "2"], ["170", 166, "2"], ["170", 167, "2"], ["170", 168, "2"], ["170", 169, "3"], ["170", 170, "3"], ["170", 171, "3"], ["170", 172, "3"], ["170", 173, "3"], ["170", 174, "3"], ["170", 175, "3"], ["170", 176, "3"], ["170", 177, "3"], ["170", 178, "3"], ["170", 179, "3"], ["170", 180, "3"], ["170", 181, "3"], ["170", 182, "3"], ["170", 183, "1"], ["170", null, "1"], ["171", null, "1"], ["171", null, "1"], ["171", null, "3"], ["171", null, "4"], ["171", 1, "8"], ["171", 2, "16"], ["171", 3, "19"], ["171", 4, "20"], ["171", 5, "23"], ["171", 6, "23"], ["171", 7, "23"], ["171", 8, "23"], ["171", 9, "23"], ["171", 10, "23"], ["171", 11, "23"], ["171", 12, "23"], ["171", 13, "23"], ["171", 14, "23"], ["171", 15, "23"], ["171", 16, "23"], ["171", 17, "23"], ["171", 18, "23"], ["171", 19, "23"], ["171", 20, "23"], ["171", 21, "22"], ["171", 22, "22"], ["171", 23, "23"], ["171", 24, "23"], ["171", 25, "22"], ["171", 26, "22"], ["171", 27, "23"], ["171", 28, "23"], ["171", 29, "23"], ["171", 30, "23"], ["171", 31, "23"], ["171", 32, "23"], ["171", 33, "23"], ["171", 34, "23"], ["171", 35, "22"], ["171", 36, "22"], ["171", 37, "23"], ["171", 38, "23"], ["171", 39, "23"], ["171", 40, "22"], ["171", 41, "21"], ["171", 42, "21"], ["171", 43, "18"], ["171", 44, "17"], ["171", 45, "20"], ["171", 46, "19"], ["171", 47, "17"], ["171", 48, "15"], ["171", 49, "18"], ["171", 50, "17"], ["171", 51, "15"], ["171", 52, "16"], ["171", 53, "15"], ["171", 54, "15"], ["171", 55, "11"], ["171", 56, "13"], ["171", 57, "16"], ["171", 58, "14"], ["171", 59, "14"], ["171", 60, "11"], ["171", 61, "11"], ["171", 62, "10"], ["171", 63, "7"], ["171", 64, "4"], ["171", 65, "5"], ["171", 66, "6"], ["171", 67, "7"], ["171", 68, "5"], ["171", 69, "6"], ["171", 70, "7"], ["171", 71, "5"], ["171", 72, "3"], ["171", 73, "8"], ["171", 74, "10"], ["171", 75, "10"], ["171", 76, "7"], ["171", 77, "6"], ["171", 78, "7"], ["171", 79, "7"], ["171", 80, "11"], ["171", 81, "13"], ["171", 82, "11"], ["171", 83, "11"], ["171", 84, "12"], ["171", 85, "12"], ["171", 86, "13"], ["171", 87, "12"], ["171", 88, "17"], ["171", 89, "18"], ["171", 90, "17"], ["171", 91, "16"], ["171", 92, "18"], ["171", 93, "16"], ["171", 94, "17"], ["171", 95, "17"], ["171", 96, "13"], ["171", 97, "12"], ["171", 98, "11"], ["171", 99, "14"], ["171", 100, "13"], ["171", 101, "11"], ["171", 102, "13"], ["171", 103, "11"], ["171", 104, "11"], ["171", 105, "9"], ["171", 106, "9"], ["171", 107, "9"], ["171", 108, "8"], ["171", 109, "9"], ["171", 110, "8"], ["171", 111, "11"], ["171", 112, "11"], ["171", 113, "8"], ["171", 114, "7"], ["171", 115, "7"], ["171", 116, "8"], ["171", 117, "6"], ["171", 118, "9"], ["171", 119, "9"], ["171", 120, "9"], ["171", 121, "9"], ["171", 122, "8"], ["171", 123, "11"], ["171", 124, "11"], ["171", 125, "11"], ["171", 126, "14"], ["171", 127, "17"], ["171", 128, "17"], ["171", 129, "17"], ["171", 130, "14"], ["171", 131, "17"], ["171", 132, "16"], ["171", 133, "19"], ["171", 134, "19"], ["171", 135, "18"], ["171", 136, "17"], ["171", 137, "13"], ["171", 138, "11"], ["171", 139, "12"], ["171", 140, "9"], ["171", 141, "6"], ["171", 142, "5"], ["171", 143, "2"], ["171", 144, "1"], ["171", 148, "1"], ["171", 149, "1"], ["171", 150, "1"], ["171", 161, "1"], ["171", 162, "1"], ["171", 163, "2"], ["171", 164, "2"], ["171", 165, "2"], ["171", 166, "2"], ["171", 167, "2"], ["171", 168, "2"], ["171", 169, "3"], ["171", 170, "3"], ["171", 171, "3"], ["171", 172, "3"], ["171", 173, "3"], ["171", 174, "3"], ["171", 175, "3"], ["171", 176, "3"], ["171", 177, "3"], ["171", 178, "3"], ["171", 179, "3"], ["171", 180, "3"], ["171", 181, "3"], ["171", 182, "3"], ["171", 183, "1"], ["171", null, "1"], ["172", null, "1"], ["172", null, "1"], ["172", null, "3"], ["172", null, "4"], ["172", 1, "8"], ["172", 2, "16"], ["172", 3, "19"], ["172", 4, "20"], ["172", 5, "23"], ["172", 6, "23"], ["172", 7, "23"], ["172", 8, "23"], ["172", 9, "23"], ["172", 10, "23"], ["172", 11, "23"], ["172", 12, "23"], ["172", 13, "23"], ["172", 14, "23"], ["172", 15, "23"], ["172", 16, "23"], ["172", 17, "23"], ["172", 18, "23"], ["172", 19, "23"], ["172", 20, "23"], ["172", 21, "22"], ["172", 22, "22"], ["172", 23, "23"], ["172", 24, "23"], ["172", 25, "22"], ["172", 26, "22"], ["172", 27, "23"], ["172", 28, "23"], ["172", 29, "23"], ["172", 30, "23"], ["172", 31, "23"], ["172", 32, "23"], ["172", 33, "23"], ["172", 34, "23"], ["172", 35, "22"], ["172", 36, "22"], ["172", 37, "23"], ["172", 38, "23"], ["172", 39, "23"], ["172", 40, "22"], ["172", 41, "21"], ["172", 42, "21"], ["172", 43, "18"], ["172", 44, "17"], ["172", 45, "20"], ["172", 46, "19"], ["172", 47, "17"], ["172", 48, "15"], ["172", 49, "18"], ["172", 50, "17"], ["172", 51, "15"], ["172", 52, "16"], ["172", 53, "15"], ["172", 54, "15"], ["172", 55, "11"], ["172", 56, "13"], ["172", 57, "16"], ["172", 58, "14"], ["172", 59, "14"], ["172", 60, "11"], ["172", 61, "11"], ["172", 62, "10"], ["172", 63, "7"], ["172", 64, "4"], ["172", 65, "5"], ["172", 66, "6"], ["172", 67, "7"], ["172", 68, "5"], ["172", 69, "6"], ["172", 70, "7"], ["172", 71, "5"], ["172", 72, "3"], ["172", 73, "8"], ["172", 74, "10"], ["172", 75, "10"], ["172", 76, "7"], ["172", 77, "6"], ["172", 78, "7"], ["172", 79, "7"], ["172", 80, "11"], ["172", 81, "13"], ["172", 82, "11"], ["172", 83, "11"], ["172", 84, "12"], ["172", 85, "12"], ["172", 86, "13"], ["172", 87, "12"], ["172", 88, "17"], ["172", 89, "18"], ["172", 90, "17"], ["172", 91, "16"], ["172", 92, "18"], ["172", 93, "16"], ["172", 94, "17"], ["172", 95, "17"], ["172", 96, "13"], ["172", 97, "12"], ["172", 98, "11"], ["172", 99, "14"], ["172", 100, "13"], ["172", 101, "11"], ["172", 102, "13"], ["172", 103, "11"], ["172", 104, "11"], ["172", 105, "9"], ["172", 106, "9"], ["172", 107, "9"], ["172", 108, "8"], ["172", 109, "9"], ["172", 110, "8"], ["172", 111, "11"], ["172", 112, "11"], ["172", 113, "8"], ["172", 114, "7"], ["172", 115, "7"], ["172", 116, "8"], ["172", 117, "6"], ["172", 118, "9"], ["172", 119, "9"], ["172", 120, "9"], ["172", 121, "9"], ["172", 122, "8"], ["172", 123, "11"], ["172", 124, "11"], ["172", 125, "11"], ["172", 126, "14"], ["172", 127, "17"], ["172", 128, "17"], ["172", 129, "17"], ["172", 130, "14"], ["172", 131, "17"], ["172", 132, "16"], ["172", 133, "19"], ["172", 134, "19"], ["172", 135, "18"], ["172", 136, "17"], ["172", 137, "13"], ["172", 138, "11"], ["172", 139, "12"], ["172", 140, "9"], ["172", 141, "6"], ["172", 142, "5"], ["172", 143, "2"], ["172", 144, "1"], ["172", 148, "1"], ["172", 149, "1"], ["172", 150, "1"], ["172", 161, "1"], ["172", 162, "1"], ["172", 163, "2"], ["172", 164, "2"], ["172", 165, "2"], ["172", 166, "2"], ["172", 167, "2"], ["172", 168, "2"], ["172", 169, "3"], ["172", 170, "3"], ["172", 171, "3"], ["172", 172, "3"], ["172", 173, "3"], ["172", 174, "3"], ["172", 175, "3"], ["172", 176, "3"], ["172", 177, "3"], ["172", 178, "3"], ["172", 179, "3"], ["172", 180, "3"], ["172", 181, "3"], ["172", 182, "3"], ["172", 183, "1"], ["172", null, "1"], ["173", null, "1"], ["173", null, "1"], ["173", 1, "2"], ["173", 2, "6"], ["173", 3, "8"], ["173", 4, "10"], ["173", 5, "14"], ["173", 6, "14"], ["173", 7, "17"], ["173", 8, "17"], ["173", 9, "18"], ["173", 10, "18"], ["173", 11, "18"], ["173", 12, "19"], ["173", 13, "18"], ["173", 14, "18"], ["173", 15, "20"], ["173", 16, "22"], ["173", 17, "20"], ["173", 18, "18"], ["173", 19, "13"], ["173", 20, "17"], ["173", 21, "16"], ["173", 22, "11"], ["173", 23, "16"], ["173", 24, "18"], ["173", 25, "16"], ["173", 26, "19"], ["173", 27, "11"], ["173", 28, "10"], ["173", 29, "12"], ["173", 30, "17"], ["173", 31, "21"], ["173", 32, "17"], ["173", 33, "17"], ["173", 34, "15"], ["173", 35, "14"], ["173", 36, "14"], ["173", 37, "13"], ["173", 38, "16"], ["173", 39, "17"], ["173", 40, "18"], ["173", 41, "11"], ["173", 42, "13"], ["173", 43, "11"], ["173", 44, "8"], ["173", 45, "14"], ["173", 46, "13"], ["173", 47, "9"], ["173", 48, "5"], ["173", 49, "12"], ["173", 50, "12"], ["173", 51, "15"], ["173", 52, "15"], ["173", 53, "15"], ["173", 54, "11"], ["173", 55, "9"], ["173", 56, "11"], ["173", 57, "15"], ["173", 58, "12"], ["173", 59, "14"], ["173", 60, "10"], ["173", 61, "8"], ["173", 62, "5"], ["173", 63, "6"], ["173", 64, "7"], ["173", 65, "6"], ["173", 66, "5"], ["173", 67, "2"], ["173", 68, "2"], ["173", 69, "2"], ["173", 70, "1"], ["173", 75, "1"], ["173", 79, "1"], ["173", 81, "2"], ["173", 82, "2"], ["173", 83, "4"], ["173", 84, "3"], ["173", 85, "3"], ["173", 86, "8"], ["173", 87, "10"], ["173", 88, "12"], ["173", 89, "11"], ["173", 90, "9"], ["173", 91, "11"], ["173", 92, "11"], ["173", 93, "12"], ["173", 94, "12"], ["173", 95, "9"], ["173", 96, "5"], ["173", 97, "8"], ["173", 98, "10"], ["173", 99, "7"], ["173", 100, "9"], ["173", 101, "10"], ["173", 102, "9"], ["173", 103, "13"], ["173", 104, "12"], ["173", 105, "13"], ["173", 106, "9"], ["173", 107, "9"], ["173", 108, "8"], ["173", 109, "6"], ["173", 110, "9"], ["173", 111, "10"], ["173", 112, "9"], ["173", 113, "10"], ["173", 114, "9"], ["173", 115, "8"], ["173", 116, "10"], ["173", 117, "11"], ["173", 118, "11"], ["173", 119, "11"], ["173", 120, "11"], ["173", 121, "14"], ["173", 122, "11"], ["173", 123, "17"], ["173", 124, "21"], ["173", 125, "20"], ["173", 126, "19"], ["173", 127, "22"], ["173", 128, "22"], ["173", 129, "22"], ["173", 130, "22"], ["173", 131, "22"], ["173", 132, "22"], ["173", 133, "23"], ["173", 134, "23"], ["173", 135, "23"], ["173", 136, "23"], ["173", 137, "22"], ["173", 138, "21"], ["173", 139, "18"], ["173", 140, "16"], ["173", 141, "14"], ["173", 142, "9"], ["173", 143, "8"], ["173", 144, "5"], ["173", 145, "4"], ["173", 146, "2"], ["173", 147, "1"], ["173", 148, "1"], ["173", 149, "1"], ["173", 150, "1"], ["173", 162, "1"], ["173", 163, "1"], ["173", 164, "1"], ["173", 165, "1"], ["173", 167, "1"], ["173", 168, "1"], ["173", 171, "1"], ["173", 172, "1"], ["173", 173, "1"], ["174", null, "1"], ["174", null, "1"], ["174", 1, "2"], ["174", 2, "6"], ["174", 3, "8"], ["174", 4, "10"], ["174", 5, "14"], ["174", 6, "14"], ["174", 7, "17"], ["174", 8, "17"], ["174", 9, "18"], ["174", 10, "18"], ["174", 11, "18"], ["174", 12, "19"], ["174", 13, "18"], ["174", 14, "18"], ["174", 15, "20"], ["174", 16, "22"], ["174", 17, "20"], ["174", 18, "18"], ["174", 19, "13"], ["174", 20, "17"], ["174", 21, "16"], ["174", 22, "11"], ["174", 23, "16"], ["174", 24, "18"], ["174", 25, "16"], ["174", 26, "19"], ["174", 27, "11"], ["174", 28, "10"], ["174", 29, "12"], ["174", 30, "17"], ["174", 31, "21"], ["174", 32, "17"], ["174", 33, "17"], ["174", 34, "15"], ["174", 35, "14"], ["174", 36, "14"], ["174", 37, "13"], ["174", 38, "16"], ["174", 39, "17"], ["174", 40, "18"], ["174", 41, "11"], ["174", 42, "13"], ["174", 43, "11"], ["174", 44, "8"], ["174", 45, "14"], ["174", 46, "13"], ["174", 47, "9"], ["174", 48, "5"], ["174", 49, "12"], ["174", 50, "12"], ["174", 51, "15"], ["174", 52, "15"], ["174", 53, "15"], ["174", 54, "11"], ["174", 55, "9"], ["174", 56, "11"], ["174", 57, "15"], ["174", 58, "12"], ["174", 59, "14"], ["174", 60, "10"], ["174", 61, "8"], ["174", 62, "5"], ["174", 63, "6"], ["174", 64, "7"], ["174", 65, "6"], ["174", 66, "5"], ["174", 67, "2"], ["174", 68, "2"], ["174", 69, "2"], ["174", 70, "1"], ["174", 75, "1"], ["174", 79, "1"], ["174", 81, "2"], ["174", 82, "2"], ["174", 83, "4"], ["174", 84, "3"], ["174", 85, "3"], ["174", 86, "8"], ["174", 87, "10"], ["174", 88, "12"], ["174", 89, "11"], ["174", 90, "9"], ["174", 91, "11"], ["174", 92, "11"], ["174", 93, "12"], ["174", 94, "12"], ["174", 95, "9"], ["174", 96, "5"], ["174", 97, "8"], ["174", 98, "10"], ["174", 99, "7"], ["174", 100, "9"], ["174", 101, "10"], ["174", 102, "9"], ["174", 103, "13"], ["174", 104, "12"], ["174", 105, "13"], ["174", 106, "9"], ["174", 107, "9"], ["174", 108, "8"], ["174", 109, "6"], ["174", 110, "9"], ["174", 111, "10"], ["174", 112, "9"], ["174", 113, "10"], ["174", 114, "9"], ["174", 115, "8"], ["174", 116, "10"], ["174", 117, "11"], ["174", 118, "11"], ["174", 119, "11"], ["174", 120, "11"], ["174", 121, "14"], ["174", 122, "11"], ["174", 123, "17"], ["174", 124, "21"], ["174", 125, "20"], ["174", 126, "19"], ["174", 127, "22"], ["174", 128, "22"], ["174", 129, "22"], ["174", 130, "22"], ["174", 131, "22"], ["174", 132, "22"], ["174", 133, "23"], ["174", 134, "23"], ["174", 135, "23"], ["174", 136, "23"], ["174", 137, "22"], ["174", 138, "21"], ["174", 139, "18"], ["174", 140, "16"], ["174", 141, "14"], ["174", 142, "9"], ["174", 143, "8"], ["174", 144, "5"], ["174", 145, "4"], ["174", 146, "2"], ["174", 147, "1"], ["174", 148, "1"], ["174", 149, "1"], ["174", 150, "1"], ["174", 162, "1"], ["174", 163, "1"], ["174", 164, "1"], ["174", 165, "1"], ["174", 167, "1"], ["174", 168, "1"], ["174", 171, "1"], ["174", 172, "1"], ["174", 173, "1"], ["175", null, "1"], ["175", null, "1"], ["175", 1, "2"], ["175", 2, "6"], ["175", 3, "8"], ["175", 4, "10"], ["175", 5, "14"], ["175", 6, "14"], ["175", 7, "17"], ["175", 8, "17"], ["175", 9, "18"], ["175", 10, "18"], ["175", 11, "18"], ["175", 12, "19"], ["175", 13, "18"], ["175", 14, "18"], ["175", 15, "20"], ["175", 16, "22"], ["175", 17, "20"], ["175", 18, "18"], ["175", 19, "13"], ["175", 20, "17"], ["175", 21, "16"], ["175", 22, "11"], ["175", 23, "16"], ["175", 24, "18"], ["175", 25, "16"], ["175", 26, "19"], ["175", 27, "11"], ["175", 28, "10"], ["175", 29, "12"], ["175", 30, "17"], ["175", 31, "21"], ["175", 32, "17"], ["175", 33, "17"], ["175", 34, "15"], ["175", 35, "14"], ["175", 36, "14"], ["175", 37, "13"], ["175", 38, "16"], ["175", 39, "17"], ["175", 40, "18"], ["175", 41, "11"], ["175", 42, "13"], ["175", 43, "11"], ["175", 44, "8"], ["175", 45, "14"], ["175", 46, "13"], ["175", 47, "9"], ["175", 48, "5"], ["175", 49, "12"], ["175", 50, "12"], ["175", 51, "15"], ["175", 52, "15"], ["175", 53, "15"], ["175", 54, "11"], ["175", 55, "9"], ["175", 56, "11"], ["175", 57, "15"], ["175", 58, "12"], ["175", 59, "14"], ["175", 60, "10"], ["175", 61, "8"], ["175", 62, "5"], ["175", 63, "6"], ["175", 64, "7"], ["175", 65, "6"], ["175", 66, "5"], ["175", 67, "2"], ["175", 68, "2"], ["175", 69, "2"], ["175", 70, "1"], ["175", 75, "1"], ["175", 79, "1"], ["175", 81, "2"], ["175", 82, "2"], ["175", 83, "4"], ["175", 84, "3"], ["175", 85, "3"], ["175", 86, "8"], ["175", 87, "10"], ["175", 88, "12"], ["175", 89, "11"], ["175", 90, "9"], ["175", 91, "11"], ["175", 92, "11"], ["175", 93, "12"], ["175", 94, "12"], ["175", 95, "9"], ["175", 96, "5"], ["175", 97, "8"], ["175", 98, "10"], ["175", 99, "7"], ["175", 100, "9"], ["175", 101, "10"], ["175", 102, "9"], ["175", 103, "13"], ["175", 104, "12"], ["175", 105, "13"], ["175", 106, "9"], ["175", 107, "9"], ["175", 108, "8"], ["175", 109, "6"], ["175", 110, "9"], ["175", 111, "10"], ["175", 112, "9"], ["175", 113, "10"], ["175", 114, "9"], ["175", 115, "8"], ["175", 116, "10"], ["175", 117, "11"], ["175", 118, "11"], ["175", 119, "11"], ["175", 120, "11"], ["175", 121, "14"], ["175", 122, "11"], ["175", 123, "17"], ["175", 124, "21"], ["175", 125, "20"], ["175", 126, "19"], ["175", 127, "22"], ["175", 128, "22"], ["175", 129, "22"], ["175", 130, "22"], ["175", 131, "22"], ["175", 132, "22"], ["175", 133, "23"], ["175", 134, "23"], ["175", 135, "23"], ["175", 136, "23"], ["175", 137, "22"], ["175", 138, "21"], ["175", 139, "18"], ["175", 140, "16"], ["175", 141, "14"], ["175", 142, "9"], ["175", 143, "8"], ["175", 144, "5"], ["175", 145, "4"], ["175", 146, "2"], ["175", 147, "1"], ["175", 148, "1"], ["175", 149, "1"], ["175", 150, "1"], ["175", 162, "1"], ["175", 163, "1"], ["175", 164, "1"], ["175", 165, "1"], ["175", 167, "1"], ["175", 168, "1"], ["175", 171, "1"], ["175", 172, "1"], ["175", 173, "1"], ["177", null, "1"], ["177", null, "1"], ["177", 1, "2"], ["177", 2, "8"], ["177", 3, "7"], ["177", 4, "12"], ["177", 5, "16"], ["177", 6, "18"], ["177", 7, "20"], ["177", 8, "20"], ["177", 9, "18"], ["177", 10, "20"], ["177", 11, "18"], ["177", 12, "13"], ["177", 13, "12"], ["177", 14, "9"], ["177", 15, "5"], ["177", 16, "4"], ["177", 17, "4"], ["177", 18, "5"], ["177", 19, "7"], ["177", 20, "10"], ["177", 21, "11"], ["177", 22, "12"], ["177", 23, "17"], ["177", 24, "19"], ["177", 25, "20"], ["177", 26, "20"], ["177", 27, "16"], ["177", 28, "16"], ["177", 29, "19"], ["177", 30, "22"], ["177", 31, "20"], ["177", 32, "22"], ["177", 33, "18"], ["177", 34, "16"], ["177", 35, "16"], ["177", 36, "13"], ["177", 37, "14"], ["177", 38, "12"], ["177", 39, "11"], ["177", 40, "13"], ["177", 41, "12"], ["177", 42, "13"], ["177", 43, "13"], ["177", 44, "11"], ["177", 45, "13"], ["177", 46, "15"], ["177", 47, "13"], ["177", 48, "10"], ["177", 49, "12"], ["177", 50, "15"], ["177", 51, "15"], ["177", 52, "16"], ["177", 53, "19"], ["177", 54, "16"], ["177", 55, "15"], ["177", 56, "16"], ["177", 57, "20"], ["177", 58, "17"], ["177", 59, "19"], ["177", 60, "16"], ["177", 61, "13"], ["177", 62, "12"], ["177", 63, "6"], ["177", 64, "8"], ["177", 65, "7"], ["177", 66, "7"], ["177", 67, "5"], ["177", 68, "2"], ["177", 69, "4"], ["177", 70, "3"], ["177", 71, "2"], ["177", 72, "2"], ["177", 73, "2"], ["177", 74, "2"], ["177", 75, "2"], ["177", 76, "1"], ["177", 77, "2"], ["177", 78, "3"], ["177", 79, "3"], ["177", 80, "4"], ["177", 81, "6"], ["177", 82, "10"], ["177", 83, "10"], ["177", 84, "11"], ["177", 85, "9"], ["177", 86, "12"], ["177", 87, "16"], ["177", 88, "15"], ["177", 89, "16"], ["177", 90, "15"], ["177", 91, "16"], ["177", 92, "16"], ["177", 93, "16"], ["177", 94, "16"], ["177", 95, "14"], ["177", 96, "14"], ["177", 97, "15"], ["177", 98, "14"], ["177", 99, "13"], ["177", 100, "16"], ["177", 101, "18"], ["177", 102, "18"], ["177", 103, "18"], ["177", 104, "17"], ["177", 105, "18"], ["177", 106, "16"], ["177", 107, "16"], ["177", 108, "16"], ["177", 109, "15"], ["177", 110, "15"], ["177", 111, "16"], ["177", 112, "16"], ["177", 113, "17"], ["177", 114, "17"], ["177", 115, "15"], ["177", 116, "16"], ["177", 117, "16"], ["177", 118, "17"], ["177", 119, "18"], ["177", 120, "20"], ["177", 121, "21"], ["177", 122, "21"], ["177", 123, "23"], ["177", 124, "23"], ["177", 125, "21"], ["177", 126, "21"], ["177", 127, "22"], ["177", 128, "22"], ["177", 129, "22"], ["177", 130, "22"], ["177", 131, "21"], ["177", 132, "21"], ["177", 133, "22"], ["177", 134, "22"], ["177", 135, "22"], ["177", 136, "22"], ["177", 137, "21"], ["177", 138, "21"], ["177", 139, "23"], ["177", 140, "23"], ["177", 141, "22"], ["177", 142, "21"], ["177", 143, "17"], ["177", 144, "11"], ["177", 145, "8"], ["177", 146, "6"], ["177", 147, "3"], ["177", 148, "1"], ["177", 149, "1"], ["177", 150, "1"], ["177", 152, "1"], ["177", 161, "1"], ["177", 162, "2"], ["177", 163, "1"], ["177", 164, "1"], ["177", 165, "1"], ["177", 166, "2"], ["177", 167, "1"], ["177", 168, "1"], ["177", 169, "1"], ["177", 170, "1"], ["177", 171, "1"], ["177", 172, "1"], ["177", 173, "1"], ["177", 176, "1"], ["177", 177, "1"], ["177", 178, "1"], ["177", 179, "1"], ["177", 180, "1"], ["177", 181, "1"], ["177", 182, "1"], ["177", 183, "1"], ["177", null, "1"], ["177", null, "1"], ["178", null, "1"], ["178", null, "1"], ["178", null, "1"], ["178", null, "1"], ["178", null, "1"], ["178", null, "1"], ["178", 1, "1"], ["178", 2, "6"], ["178", 3, "6"], ["178", 4, "9"], ["178", 5, "12"], ["178", 6, "17"], ["178", 7, "19"], ["178", 8, "19"], ["178", 9, "20"], ["178", 10, "19"], ["178", 11, "22"], ["178", 12, "19"], ["178", 13, "16"], ["178", 14, "14"], ["178", 15, "11"], ["178", 16, "8"], ["178", 17, "7"], ["178", 18, "6"], ["178", 19, "9"], ["178", 20, "10"], ["178", 21, "10"], ["178", 22, "12"], ["178", 23, "13"], ["178", 24, "17"], ["178", 25, "16"], ["178", 26, "12"], ["178", 27, "16"], ["178", 28, "18"], ["178", 29, "18"], ["178", 30, "21"], ["178", 31, "21"], ["178", 32, "20"], ["178", 33, "21"], ["178", 34, "16"], ["178", 35, "16"], ["178", 36, "15"], ["178", 37, "14"], ["178", 38, "14"], ["178", 39, "15"], ["178", 40, "14"], ["178", 41, "13"], ["178", 42, "12"], ["178", 43, "14"], ["178", 44, "12"], ["178", 45, "14"], ["178", 46, "15"], ["178", 47, "12"], ["178", 48, "14"], ["178", 49, "16"], ["178", 50, "16"], ["178", 51, "14"], ["178", 52, "15"], ["178", 53, "19"], ["178", 54, "18"], ["178", 55, "19"], ["178", 56, "18"], ["178", 57, "20"], ["178", 58, "19"], ["178", 59, "20"], ["178", 60, "17"], ["178", 61, "15"], ["178", 62, "13"], ["178", 63, "8"], ["178", 64, "10"], ["178", 65, "7"], ["178", 66, "6"], ["178", 67, "5"], ["178", 68, "4"], ["178", 69, "5"], ["178", 70, "2"], ["178", 71, "3"], ["178", 72, "4"], ["178", 73, "2"], ["178", 74, "3"], ["178", 75, "3"], ["178", 76, "1"], ["178", 77, "3"], ["178", 78, "5"], ["178", 79, "5"], ["178", 80, "8"], ["178", 81, "10"], ["178", 82, "11"], ["178", 83, "13"], ["178", 84, "12"], ["178", 85, "15"], ["178", 86, "16"], ["178", 87, "16"], ["178", 88, "17"], ["178", 89, "16"], ["178", 90, "18"], ["178", 91, "19"], ["178", 92, "16"], ["178", 93, "16"], ["178", 94, "16"], ["178", 95, "16"], ["178", 96, "16"], ["178", 97, "16"], ["178", 98, "17"], ["178", 99, "20"], ["178", 100, "20"], ["178", 101, "18"], ["178", 102, "21"], ["178", 103, "18"], ["178", 104, "19"], ["178", 105, "19"], ["178", 106, "18"], ["178", 107, "17"], ["178", 108, "16"], ["178", 109, "16"], ["178", 110, "18"], ["178", 111, "19"], ["178", 112, "17"], ["178", 113, "18"], ["178", 114, "19"], ["178", 115, "20"], ["178", 116, "19"], ["178", 117, "19"], ["178", 118, "19"], ["178", 119, "19"], ["178", 120, "20"], ["178", 121, "22"], ["178", 122, "23"], ["178", 123, "23"], ["178", 124, "23"], ["178", 125, "21"], ["178", 126, "21"], ["178", 127, "22"], ["178", 128, "22"], ["178", 129, "22"], ["178", 130, "22"], ["178", 131, "21"], ["178", 132, "21"], ["178", 133, "22"], ["178", 134, "22"], ["178", 135, "22"], ["178", 136, "22"], ["178", 137, "21"], ["178", 138, "21"], ["178", 139, "23"], ["178", 140, "23"], ["178", 141, "23"], ["178", 142, "22"], ["178", 143, "21"], ["178", 144, "19"], ["178", 145, "13"], ["178", 146, "9"], ["178", 147, "6"], ["178", 148, "3"], ["178", 149, "2"], ["178", 151, "1"], ["178", 152, "1"], ["178", 153, "1"], ["178", 161, "2"], ["178", 162, "2"], ["178", 163, "2"], ["178", 164, "2"], ["178", 165, "2"], ["178", 166, "2"], ["178", 167, "2"], ["178", 168, "1"], ["178", 169, "1"], ["178", 170, "2"], ["178", 171, "2"], ["178", 172, "2"], ["178", 173, "1"], ["178", 174, "1"], ["178", 175, "1"], ["178", 176, "1"], ["178", 177, "1"], ["178", 178, "1"], ["178", 179, "1"], ["178", 180, "1"], ["178", 181, "1"], ["178", 182, "1"], ["178", 183, "1"], ["178", null, "1"], ["178", null, "1"], ["178", null, "1"], ["178", null, "1"], ["178", null, "1"], ["180", null, "1"], ["180", null, "1"], ["180", null, "1"], ["180", null, "1"], ["180", null, "1"], ["180", null, "1"], ["180", null, "1"], ["180", 1, "1"], ["180", 2, "2"], ["180", 4, "2"], ["180", 5, "2"], ["180", 6, "4"], ["180", 7, "8"], ["180", 8, "7"], ["180", 9, "10"], ["180", 10, "8"], ["180", 11, "7"], ["180", 12, "10"], ["180", 13, "13"], ["180", 14, "8"], ["180", 15, "9"], ["180", 16, "11"], ["180", 17, "8"], ["180", 18, "6"], ["180", 19, "5"], ["180", 20, "6"], ["180", 21, "6"], ["180", 22, "8"], ["180", 23, "9"], ["180", 24, "10"], ["180", 25, "10"], ["180", 26, "1"], ["180", 27, "4"], ["180", 28, "7"], ["180", 29, "10"], ["180", 30, "14"], ["180", 31, "12"], ["180", 32, "12"], ["180", 33, "12"], ["180", 34, "12"], ["180", 35, "10"], ["180", 36, "9"], ["180", 37, "5"], ["180", 38, "10"], ["180", 39, "9"], ["180", 40, "5"], ["180", 41, "9"], ["180", 42, "8"], ["180", 43, "7"], ["180", 44, "7"], ["180", 45, "5"], ["180", 46, "10"], ["180", 47, "8"], ["180", 48, "7"], ["180", 49, "11"], ["180", 50, "11"], ["180", 51, "14"], ["180", 52, "12"], ["180", 53, "17"], ["180", 54, "11"], ["180", 55, "15"], ["180", 56, "16"], ["180", 57, "12"], ["180", 58, "16"], ["180", 59, "14"], ["180", 60, "15"], ["180", 61, "9"], ["180", 62, "12"], ["180", 63, "6"], ["180", 64, "9"], ["180", 65, "7"], ["180", 66, "7"], ["180", 67, "3"], ["180", 68, "5"], ["180", 69, "4"], ["180", 70, "2"], ["180", 71, "1"], ["180", 72, "2"], ["180", 73, "2"], ["180", 74, "2"], ["180", 75, "2"], ["180", 76, "1"], ["180", 77, "3"], ["180", 78, "5"], ["180", 79, "5"], ["180", 80, "6"], ["180", 81, "10"], ["180", 82, "7"], ["180", 83, "10"], ["180", 84, "11"], ["180", 85, "10"], ["180", 86, "13"], ["180", 87, "12"], ["180", 88, "15"], ["180", 89, "13"], ["180", 90, "19"], ["180", 91, "16"], ["180", 92, "16"], ["180", 93, "15"], ["180", 94, "13"], ["180", 95, "10"], ["180", 96, "12"], ["180", 97, "12"], ["180", 98, "15"], ["180", 99, "14"], ["180", 100, "17"], ["180", 101, "16"], ["180", 102, "18"], ["180", 103, "19"], ["180", 104, "16"], ["180", 105, "18"], ["180", 106, "15"], ["180", 107, "15"], ["180", 108, "17"], ["180", 109, "19"], ["180", 110, "19"], ["180", 111, "19"], ["180", 112, "18"], ["180", 113, "18"], ["180", 114, "20"], ["180", 115, "20"], ["180", 116, "20"], ["180", 117, "19"], ["180", 118, "19"], ["180", 119, "20"], ["180", 120, "20"], ["180", 121, "21"], ["180", 122, "22"], ["180", 123, "23"], ["180", 124, "23"], ["180", 125, "21"], ["180", 126, "21"], ["180", 127, "22"], ["180", 128, "22"], ["180", 129, "22"], ["180", 130, "23"], ["180", 131, "21"], ["180", 132, "21"], ["180", 133, "22"], ["180", 134, "22"], ["180", 135, "22"], ["180", 136, "21"], ["180", 137, "21"], ["180", 138, "21"], ["180", 139, "23"], ["180", 140, "23"], ["180", 141, "23"], ["180", 142, "23"], ["180", 143, "22"], ["180", 144, "21"], ["180", 145, "16"], ["180", 146, "12"], ["180", 147, "6"], ["180", 148, "7"], ["180", 149, "4"], ["180", 150, "1"], ["180", 151, "1"], ["180", 152, "1"], ["180", 153, "1"], ["180", 161, "2"], ["180", 162, "2"], ["180", 163, "2"], ["180", 164, "2"], ["180", 165, "2"], ["180", 166, "1"], ["180", 167, "1"], ["180", 168, "1"], ["180", 169, "1"], ["180", 170, "1"], ["180", 171, "1"], ["180", 173, "1"], ["180", 174, "1"], ["180", 175, "1"], ["180", 176, "2"], ["180", 177, "3"], ["180", 178, "1"], ["180", 179, "1"], ["180", 180, "1"], ["180", 181, "1"], ["180", 182, "1"], ["180", 183, "1"], ["180", null, "1"], ["180", null, "1"], ["180", null, "1"], ["180", null, "1"], ["180", null, "1"], ["180", null, "1"], ["180", null, "1"], ["181", null, "1"], ["181", null, "1"], ["181", null, "1"], ["181", null, "1"], ["181", null, "1"], ["181", null, "1"], ["181", null, "1"], ["181", 1, "1"], ["181", 2, "2"], ["181", 4, "2"], ["181", 5, "2"], ["181", 6, "4"], ["181", 7, "8"], ["181", 8, "7"], ["181", 9, "10"], ["181", 10, "8"], ["181", 11, "7"], ["181", 12, "10"], ["181", 13, "13"], ["181", 14, "8"], ["181", 15, "9"], ["181", 16, "11"], ["181", 17, "8"], ["181", 18, "6"], ["181", 19, "5"], ["181", 20, "6"], ["181", 21, "6"], ["181", 22, "8"], ["181", 23, "9"], ["181", 24, "10"], ["181", 25, "10"], ["181", 26, "1"], ["181", 27, "4"], ["181", 28, "7"], ["181", 29, "10"], ["181", 30, "14"], ["181", 31, "12"], ["181", 32, "12"], ["181", 33, "12"], ["181", 34, "12"], ["181", 35, "10"], ["181", 36, "9"], ["181", 37, "5"], ["181", 38, "10"], ["181", 39, "9"], ["181", 40, "5"], ["181", 41, "9"], ["181", 42, "8"], ["181", 43, "7"], ["181", 44, "7"], ["181", 45, "5"], ["181", 46, "10"], ["181", 47, "8"], ["181", 48, "7"], ["181", 49, "11"], ["181", 50, "11"], ["181", 51, "14"], ["181", 52, "12"], ["181", 53, "17"], ["181", 54, "11"], ["181", 55, "15"], ["181", 56, "16"], ["181", 57, "12"], ["181", 58, "16"], ["181", 59, "14"], ["181", 60, "15"], ["181", 61, "9"], ["181", 62, "12"], ["181", 63, "6"], ["181", 64, "9"], ["181", 65, "7"], ["181", 66, "7"], ["181", 67, "3"], ["181", 68, "5"], ["181", 69, "4"], ["181", 70, "2"], ["181", 71, "1"], ["181", 72, "2"], ["181", 73, "2"], ["181", 74, "2"], ["181", 75, "2"], ["181", 76, "1"], ["181", 77, "3"], ["181", 78, "5"], ["181", 79, "5"], ["181", 80, "6"], ["181", 81, "10"], ["181", 82, "7"], ["181", 83, "10"], ["181", 84, "11"], ["181", 85, "10"], ["181", 86, "13"], ["181", 87, "12"], ["181", 88, "15"], ["181", 89, "13"], ["181", 90, "19"], ["181", 91, "16"], ["181", 92, "16"], ["181", 93, "15"], ["181", 94, "13"], ["181", 95, "10"], ["181", 96, "12"], ["181", 97, "12"], ["181", 98, "15"], ["181", 99, "14"], ["181", 100, "17"], ["181", 101, "16"], ["181", 102, "18"], ["181", 103, "19"], ["181", 104, "16"], ["181", 105, "18"], ["181", 106, "15"], ["181", 107, "15"], ["181", 108, "17"], ["181", 109, "19"], ["181", 110, "19"], ["181", 111, "19"], ["181", 112, "18"], ["181", 113, "18"], ["181", 114, "20"], ["181", 115, "20"], ["181", 116, "20"], ["181", 117, "19"], ["181", 118, "19"], ["181", 119, "20"], ["181", 120, "20"], ["181", 121, "21"], ["181", 122, "22"], ["181", 123, "23"], ["181", 124, "23"], ["181", 125, "21"], ["181", 126, "21"], ["181", 127, "22"], ["181", 128, "22"], ["181", 129, "22"], ["181", 130, "23"], ["181", 131, "21"], ["181", 132, "21"], ["181", 133, "22"], ["181", 134, "22"], ["181", 135, "22"], ["181", 136, "21"], ["181", 137, "21"], ["181", 138, "21"], ["181", 139, "23"], ["181", 140, "23"], ["181", 141, "23"], ["181", 142, "23"], ["181", 143, "22"], ["181", 144, "21"], ["181", 145, "16"], ["181", 146, "12"], ["181", 147, "6"], ["181", 148, "7"], ["181", 149, "4"], ["181", 150, "1"], ["181", 151, "1"], ["181", 152, "1"], ["181", 153, "1"], ["181", 161, "2"], ["181", 162, "2"], ["181", 163, "2"], ["181", 164, "2"], ["181", 165, "2"], ["181", 166, "1"], ["181", 167, "1"], ["181", 168, "1"], ["181", 169, "1"], ["181", 170, "1"], ["181", 171, "1"], ["181", 173, "1"], ["181", 174, "1"], ["181", 175, "1"], ["181", 176, "2"], ["181", 177, "3"], ["181", 178, "1"], ["181", 179, "1"], ["181", 180, "1"], ["181", 181, "1"], ["181", 182, "1"], ["181", 183, "1"], ["181", null, "1"], ["181", null, "1"], ["181", null, "1"], ["181", null, "1"], ["181", null, "1"], ["181", null, "1"], ["181", null, "1"], ["182", null, "1"], ["182", null, "1"], ["182", null, "1"], ["182", null, "1"], ["182", null, "1"], ["182", null, "1"], ["182", null, "1"], ["182", null, "1"], ["182", 1, "2"], ["182", 2, "2"], ["182", 4, "1"], ["182", 5, "3"], ["182", 6, "4"], ["182", 7, "11"], ["182", 8, "11"], ["182", 9, "14"], ["182", 10, "7"], ["182", 11, "11"], ["182", 12, "12"], ["182", 13, "13"], ["182", 14, "13"], ["182", 15, "13"], ["182", 16, "12"], ["182", 17, "8"], ["182", 18, "7"], ["182", 19, "6"], ["182", 20, "6"], ["182", 21, "8"], ["182", 22, "9"], ["182", 23, "10"], ["182", 24, "11"], ["182", 25, "7"], ["182", 26, "2"], ["182", 27, "7"], ["182", 28, "6"], ["182", 29, "12"], ["182", 30, "12"], ["182", 31, "13"], ["182", 32, "12"], ["182", 33, "8"], ["182", 34, "11"], ["182", 35, "11"], ["182", 36, "8"], ["182", 37, "7"], ["182", 38, "11"], ["182", 39, "9"], ["182", 40, "8"], ["182", 41, "8"], ["182", 42, "5"], ["182", 43, "9"], ["182", 44, "8"], ["182", 45, "7"], ["182", 46, "10"], ["182", 47, "5"], ["182", 48, "9"], ["182", 49, "10"], ["182", 50, "8"], ["182", 51, "15"], ["182", 52, "16"], ["182", 53, "14"], ["182", 54, "9"], ["182", 55, "14"], ["182", 56, "18"], ["182", 57, "15"], ["182", 58, "17"], ["182", 59, "16"], ["182", 60, "12"], ["182", 61, "11"], ["182", 62, "8"], ["182", 63, "6"], ["182", 64, "6"], ["182", 65, "8"], ["182", 66, "4"], ["182", 67, "6"], ["182", 68, "5"], ["182", 69, "4"], ["182", 70, "3"], ["182", 71, "1"], ["182", 72, "1"], ["182", 73, "2"], ["182", 74, "2"], ["182", 75, "2"], ["182", 76, "2"], ["182", 77, "5"], ["182", 78, "3"], ["182", 79, "7"], ["182", 80, "6"], ["182", 81, "7"], ["182", 82, "9"], ["182", 83, "10"], ["182", 84, "11"], ["182", 85, "10"], ["182", 86, "15"], ["182", 87, "14"], ["182", 88, "14"], ["182", 89, "18"], ["182", 90, "19"], ["182", 91, "18"], ["182", 92, "14"], ["182", 93, "15"], ["182", 94, "11"], ["182", 95, "10"], ["182", 96, "14"], ["182", 97, "15"], ["182", 98, "16"], ["182", 99, "17"], ["182", 100, "18"], ["182", 101, "18"], ["182", 102, "18"], ["182", 103, "20"], ["182", 104, "19"], ["182", 105, "19"], ["182", 106, "19"], ["182", 107, "19"], ["182", 108, "21"], ["182", 109, "21"], ["182", 110, "20"], ["182", 111, "20"], ["182", 112, "19"], ["182", 113, "18"], ["182", 114, "20"], ["182", 115, "20"], ["182", 116, "20"], ["182", 117, "20"], ["182", 118, "20"], ["182", 119, "20"], ["182", 120, "21"], ["182", 121, "22"], ["182", 122, "23"], ["182", 123, "23"], ["182", 124, "23"], ["182", 125, "21"], ["182", 126, "21"], ["182", 127, "22"], ["182", 128, "22"], ["182", 129, "23"], ["182", 130, "23"], ["182", 131, "22"], ["182", 132, "22"], ["182", 133, "22"], ["182", 134, "22"], ["182", 135, "22"], ["182", 136, "23"], ["182", 137, "21"], ["182", 138, "22"], ["182", 139, "23"], ["182", 140, "23"], ["182", 141, "23"], ["182", 142, "23"], ["182", 143, "23"], ["182", 144, "22"], ["182", 145, "20"], ["182", 146, "12"], ["182", 147, "11"], ["182", 148, "7"], ["182", 149, "5"], ["182", 150, "3"], ["182", 151, "1"], ["182", 152, "1"], ["182", 153, "1"], ["182", 160, "2"], ["182", 161, "2"], ["182", 162, "2"], ["182", 163, "1"], ["182", 165, "2"], ["182", 167, "1"], ["182", 169, "1"], ["182", 170, "1"], ["182", 171, "1"], ["182", 172, "2"], ["182", 173, "1"], ["182", 174, "1"], ["182", 175, "1"], ["182", 176, "3"], ["182", 177, "1"], ["182", 178, "1"], ["182", 179, "1"], ["182", 180, "1"], ["182", 181, "1"], ["182", 182, "1"], ["182", 183, "1"], ["182", null, "1"], ["182", null, "1"], ["182", null, "1"], ["182", null, "1"], ["182", null, "1"], ["182", null, "1"], ["182", null, "1"], ["182", null, "1"], ["183", null, "1"], ["183", null, "1"], ["183", null, "1"], ["183", null, "1"], ["183", null, "1"], ["183", null, "1"], ["183", null, "1"], ["183", null, "1"], ["183", 1, "2"], ["183", 2, "2"], ["183", 4, "1"], ["183", 5, "3"], ["183", 6, "4"], ["183", 7, "11"], ["183", 8, "11"], ["183", 9, "14"], ["183", 10, "7"], ["183", 11, "11"], ["183", 12, "12"], ["183", 13, "13"], ["183", 14, "13"], ["183", 15, "13"], ["183", 16, "12"], ["183", 17, "8"], ["183", 18, "7"], ["183", 19, "6"], ["183", 20, "6"], ["183", 21, "8"], ["183", 22, "9"], ["183", 23, "10"], ["183", 24, "11"], ["183", 25, "7"], ["183", 26, "2"], ["183", 27, "7"], ["183", 28, "6"], ["183", 29, "12"], ["183", 30, "12"], ["183", 31, "13"], ["183", 32, "12"], ["183", 33, "8"], ["183", 34, "11"], ["183", 35, "11"], ["183", 36, "8"], ["183", 37, "7"], ["183", 38, "11"], ["183", 39, "9"], ["183", 40, "8"], ["183", 41, "8"], ["183", 42, "5"], ["183", 43, "9"], ["183", 44, "8"], ["183", 45, "7"], ["183", 46, "10"], ["183", 47, "5"], ["183", 48, "9"], ["183", 49, "10"], ["183", 50, "8"], ["183", 51, "15"], ["183", 52, "16"], ["183", 53, "14"], ["183", 54, "9"], ["183", 55, "14"], ["183", 56, "18"], ["183", 57, "15"], ["183", 58, "17"], ["183", 59, "16"], ["183", 60, "12"], ["183", 61, "11"], ["183", 62, "8"], ["183", 63, "6"], ["183", 64, "6"], ["183", 65, "8"], ["183", 66, "4"], ["183", 67, "6"], ["183", 68, "5"], ["183", 69, "4"], ["183", 70, "3"], ["183", 71, "1"], ["183", 72, "1"], ["183", 73, "2"], ["183", 74, "2"], ["183", 75, "2"], ["183", 76, "2"], ["183", 77, "5"], ["183", 78, "3"], ["183", 79, "7"], ["183", 80, "6"], ["183", 81, "7"], ["183", 82, "9"], ["183", 83, "10"], ["183", 84, "11"], ["183", 85, "10"], ["183", 86, "15"], ["183", 87, "14"], ["183", 88, "14"], ["183", 89, "18"], ["183", 90, "19"], ["183", 91, "18"], ["183", 92, "14"], ["183", 93, "15"], ["183", 94, "11"], ["183", 95, "10"], ["183", 96, "14"], ["183", 97, "15"], ["183", 98, "16"], ["183", 99, "17"], ["183", 100, "18"], ["183", 101, "18"], ["183", 102, "18"], ["183", 103, "20"], ["183", 104, "19"], ["183", 105, "19"], ["183", 106, "19"], ["183", 107, "19"], ["183", 108, "21"], ["183", 109, "21"], ["183", 110, "20"], ["183", 111, "20"], ["183", 112, "19"], ["183", 113, "18"], ["183", 114, "20"], ["183", 115, "20"], ["183", 116, "20"], ["183", 117, "20"], ["183", 118, "20"], ["183", 119, "20"], ["183", 120, "21"], ["183", 121, "22"], ["183", 122, "23"], ["183", 123, "23"], ["183", 124, "23"], ["183", 125, "21"], ["183", 126, "21"], ["183", 127, "22"], ["183", 128, "22"], ["183", 129, "23"], ["183", 130, "23"], ["183", 131, "22"], ["183", 132, "22"], ["183", 133, "22"], ["183", 134, "22"], ["183", 135, "22"], ["183", 136, "23"], ["183", 137, "21"], ["183", 138, "22"], ["183", 139, "23"], ["183", 140, "23"], ["183", 141, "23"], ["183", 142, "23"], ["183", 143, "23"], ["183", 144, "22"], ["183", 145, "20"], ["183", 146, "12"], ["183", 147, "11"], ["183", 148, "7"], ["183", 149, "5"], ["183", 150, "3"], ["183", 151, "1"], ["183", 152, "1"], ["183", 153, "1"], ["183", 160, "2"], ["183", 161, "2"], ["183", 162, "2"], ["183", 163, "1"], ["183", 165, "2"], ["183", 167, "1"], ["183", 169, "1"], ["183", 170, "1"], ["183", 171, "1"], ["183", 172, "2"], ["183", 173, "1"], ["183", 174, "1"], ["183", 175, "1"], ["183", 176, "3"], ["183", 177, "1"], ["183", 178, "1"], ["183", 179, "1"], ["183", 180, "1"], ["183", 181, "1"], ["183", 182, "1"], ["183", 183, "1"], ["183", null, "1"], ["183", null, "1"], ["183", null, "1"], ["183", null, "1"], ["183", null, "1"], ["183", null, "1"], ["183", null, "1"], ["183", null, "1"], ["185", null, "1"], ["185", 1, "1"], ["185", 2, "1"], ["185", 14, "3"], ["185", 15, "2"], ["185", 16, "2"], ["185", 17, "3"], ["185", 18, "2"], ["185", 19, "3"], ["185", 20, "2"], ["185", 21, "1"], ["185", 22, "4"], ["185", 23, "3"], ["185", 24, "3"], ["185", 25, "1"], ["185", 26, "1"], ["185", 27, "4"], ["185", 28, "7"], ["185", 29, "10"], ["185", 30, "12"], ["185", 31, "12"], ["185", 32, "10"], ["185", 33, "8"], ["185", 34, "10"], ["185", 35, "11"], ["185", 36, "6"], ["185", 37, "8"], ["185", 38, "11"], ["185", 39, "9"], ["185", 40, "8"], ["185", 41, "9"], ["185", 42, "8"], ["185", 43, "8"], ["185", 44, "4"], ["185", 45, "3"], ["185", 46, "3"], ["185", 47, "3"], ["185", 48, "5"], ["185", 49, "6"], ["185", 50, "8"], ["185", 51, "9"], ["185", 52, "8"], ["185", 53, "8"], ["185", 54, "8"], ["185", 55, "9"], ["185", 56, "12"], ["185", 57, "12"], ["185", 58, "12"], ["185", 59, "10"], ["185", 60, "6"], ["185", 61, "8"], ["185", 62, "5"], ["185", 63, "5"], ["185", 64, "6"], ["185", 65, "4"], ["185", 66, "3"], ["185", 67, "5"], ["185", 68, "2"], ["185", 69, "1"], ["185", 70, "3"], ["185", 72, "1"], ["185", 73, "1"], ["185", 74, "2"], ["185", 75, "2"], ["185", 76, "2"], ["185", 77, "6"], ["185", 78, "4"], ["185", 79, "8"], ["185", 80, "6"], ["185", 81, "7"], ["185", 82, "7"], ["185", 83, "10"], ["185", 84, "11"], ["185", 85, "11"], ["185", 86, "14"], ["185", 87, "13"], ["185", 88, "15"], ["185", 89, "17"], ["185", 90, "18"], ["185", 91, "17"], ["185", 92, "14"], ["185", 93, "13"], ["185", 94, "10"], ["185", 95, "11"], ["185", 96, "11"], ["185", 97, "11"], ["185", 98, "13"], ["185", 99, "14"], ["185", 100, "13"], ["185", 101, "17"], ["185", 102, "17"], ["185", 103, "14"], ["185", 104, "17"], ["185", 105, "15"], ["185", 106, "16"], ["185", 107, "16"], ["185", 108, "14"], ["185", 109, "10"], ["185", 110, "5"], ["185", 111, "3"], ["185", 112, "3"], ["185", 113, "6"], ["185", 114, "8"], ["185", 115, "3"], ["185", 116, "4"], ["185", 117, "5"], ["185", 118, "9"], ["185", 119, "13"], ["185", 120, "10"], ["185", 121, "12"], ["185", 122, "8"], ["185", 123, "11"], ["185", 124, "18"], ["185", 125, "18"], ["185", 126, "16"], ["185", 127, "21"], ["185", 128, "14"], ["185", 129, "20"], ["185", 130, "18"], ["185", 131, "20"], ["185", 132, "17"], ["185", 133, "18"], ["185", 134, "17"], ["185", 135, "17"], ["185", 136, "19"], ["185", 137, "16"], ["185", 138, "21"], ["185", 139, "22"], ["185", 140, "19"], ["185", 141, "15"], ["185", 142, "14"], ["185", 143, "17"], ["185", 144, "13"], ["185", 145, "10"], ["185", 146, "10"], ["185", 147, "12"], ["185", 148, "6"], ["185", 149, "4"], ["185", 150, "5"], ["185", 151, "1"], ["185", 152, "2"], ["185", 153, "1"], ["185", 159, "1"], ["185", 160, "2"], ["185", 161, "4"], ["185", 162, "2"], ["185", 163, "3"], ["185", 165, "2"], ["185", 166, "4"], ["185", 167, "3"], ["185", 169, "1"], ["185", 170, "1"], ["185", 171, "2"], ["185", 172, "1"], ["185", 173, "1"], ["185", 174, "2"], ["185", 176, "1"], ["185", 177, "1"], ["185", 178, "1"], ["185", 179, "1"], ["185", 181, "1"], ["185", 184, "1"], ["186", null, "1"], ["186", 1, "1"], ["186", 2, "1"], ["186", 14, "3"], ["186", 15, "2"], ["186", 16, "2"], ["186", 17, "3"], ["186", 18, "2"], ["186", 19, "3"], ["186", 20, "2"], ["186", 21, "1"], ["186", 22, "4"], ["186", 23, "3"], ["186", 24, "3"], ["186", 25, "1"], ["186", 26, "1"], ["186", 27, "4"], ["186", 28, "7"], ["186", 29, "10"], ["186", 30, "12"], ["186", 31, "12"], ["186", 32, "10"], ["186", 33, "8"], ["186", 34, "10"], ["186", 35, "11"], ["186", 36, "6"], ["186", 37, "8"], ["186", 38, "11"], ["186", 39, "9"], ["186", 40, "8"], ["186", 41, "9"], ["186", 42, "8"], ["186", 43, "8"], ["186", 44, "4"], ["186", 45, "3"], ["186", 46, "3"], ["186", 47, "3"], ["186", 48, "5"], ["186", 49, "6"], ["186", 50, "8"], ["186", 51, "9"], ["186", 52, "8"], ["186", 53, "8"], ["186", 54, "8"], ["186", 55, "9"], ["186", 56, "12"], ["186", 57, "12"], ["186", 58, "12"], ["186", 59, "10"], ["186", 60, "6"], ["186", 61, "8"], ["186", 62, "5"], ["186", 63, "5"], ["186", 64, "6"], ["186", 65, "4"], ["186", 66, "3"], ["186", 67, "5"], ["186", 68, "2"], ["186", 69, "1"], ["186", 70, "3"], ["186", 72, "1"], ["186", 73, "1"], ["186", 74, "2"], ["186", 75, "2"], ["186", 76, "2"], ["186", 77, "6"], ["186", 78, "4"], ["186", 79, "8"], ["186", 80, "6"], ["186", 81, "7"], ["186", 82, "7"], ["186", 83, "10"], ["186", 84, "11"], ["186", 85, "11"], ["186", 86, "14"], ["186", 87, "13"], ["186", 88, "15"], ["186", 89, "17"], ["186", 90, "18"], ["186", 91, "17"], ["186", 92, "14"], ["186", 93, "13"], ["186", 94, "10"], ["186", 95, "11"], ["186", 96, "11"], ["186", 97, "11"], ["186", 98, "13"], ["186", 99, "14"], ["186", 100, "13"], ["186", 101, "17"], ["186", 102, "17"], ["186", 103, "14"], ["186", 104, "17"], ["186", 105, "15"], ["186", 106, "16"], ["186", 107, "16"], ["186", 108, "14"], ["186", 109, "10"], ["186", 110, "5"], ["186", 111, "3"], ["186", 112, "3"], ["186", 113, "6"], ["186", 114, "8"], ["186", 115, "3"], ["186", 116, "4"], ["186", 117, "5"], ["186", 118, "9"], ["186", 119, "13"], ["186", 120, "10"], ["186", 121, "12"], ["186", 122, "8"], ["186", 123, "11"], ["186", 124, "18"], ["186", 125, "18"], ["186", 126, "16"], ["186", 127, "21"], ["186", 128, "14"], ["186", 129, "20"], ["186", 130, "18"], ["186", 131, "20"], ["186", 132, "17"], ["186", 133, "18"], ["186", 134, "17"], ["186", 135, "17"], ["186", 136, "19"], ["186", 137, "16"], ["186", 138, "21"], ["186", 139, "22"], ["186", 140, "19"], ["186", 141, "15"], ["186", 142, "14"], ["186", 143, "17"], ["186", 144, "13"], ["186", 145, "10"], ["186", 146, "10"], ["186", 147, "12"], ["186", 148, "6"], ["186", 149, "4"], ["186", 150, "5"], ["186", 151, "1"], ["186", 152, "2"], ["186", 153, "1"], ["186", 159, "1"], ["186", 160, "2"], ["186", 161, "4"], ["186", 162, "2"], ["186", 163, "3"], ["186", 165, "2"], ["186", 166, "4"], ["186", 167, "3"], ["186", 169, "1"], ["186", 170, "1"], ["186", 171, "2"], ["186", 172, "1"], ["186", 173, "1"], ["186", 174, "2"], ["186", 176, "1"], ["186", 177, "1"], ["186", 178, "1"], ["186", 179, "1"], ["186", 181, "1"], ["186", 184, "1"], ["187", 14, "1"], ["187", 15, "2"], ["187", 16, "1"], ["187", 17, "1"], ["187", 18, "1"], ["187", 19, "1"], ["187", 20, "1"], ["187", 21, "1"], ["187", 22, "2"], ["187", 23, "2"], ["187", 28, "1"], ["187", 30, "1"], ["187", 32, "2"], ["187", 34, "1"], ["187", 35, "2"], ["187", 36, "1"], ["187", 37, "2"], ["187", 39, "1"], ["187", 40, "2"], ["187", 42, "3"], ["187", 43, "2"], ["187", 49, "2"], ["187", 50, "2"], ["187", 51, "2"], ["187", 52, "3"], ["187", 53, "1"], ["187", 54, "2"], ["187", 55, "1"], ["187", 56, "1"], ["187", 57, "2"], ["187", 58, "3"], ["187", 59, "1"], ["187", 60, "1"], ["187", 61, "1"], ["187", 62, "1"], ["187", 63, "1"], ["187", 64, "1"], ["187", 65, "2"], ["187", 66, "2"], ["187", 67, "1"], ["187", 71, "1"], ["187", 73, "1"], ["187", 79, "2"], ["187", 80, "2"], ["187", 81, "2"], ["187", 82, "1"], ["187", 83, "3"], ["187", 84, "6"], ["187", 85, "5"], ["187", 86, "5"], ["187", 87, "4"], ["187", 88, "4"], ["187", 89, "4"], ["187", 90, "4"], ["187", 91, "4"], ["187", 92, "5"], ["187", 94, "1"], ["187", 96, "1"], ["187", 97, "1"], ["187", 98, "1"], ["187", 100, "2"], ["187", 101, "2"], ["187", 102, "2"], ["187", 104, "1"], ["187", 105, "2"], ["187", 106, "1"], ["187", 108, "1"], ["187", 109, "1"], ["187", 112, "1"], ["187", 113, "1"], ["187", 114, "2"], ["187", 118, "1"], ["187", 119, "3"], ["187", 120, "3"], ["187", 121, "1"], ["187", 122, "1"], ["187", 123, "1"], ["187", 124, "1"], ["187", 126, "1"], ["187", 127, "1"], ["187", 129, "2"], ["187", 131, "3"], ["187", 132, "3"], ["187", 133, "3"], ["187", 134, "3"], ["187", 135, "2"], ["187", 136, "2"], ["187", 137, "1"], ["187", 138, "3"], ["187", 139, "4"], ["187", 140, "2"], ["187", 141, "2"], ["187", 142, "1"], ["187", 143, "4"], ["187", 144, "4"], ["187", 145, "3"], ["187", 146, "3"], ["187", 147, "3"], ["187", 148, "1"], ["187", 149, "2"], ["187", 150, "1"], ["187", 151, "2"], ["187", 158, "1"], ["187", 159, "1"], ["187", 160, "1"], ["187", 161, "1"], ["187", 165, "1"], ["187", 170, "1"], ["187", 171, "1"], ["187", 172, "1"], ["187", 173, "1"], ["187", 174, "1"], ["187", 184, "1"], ["188", 14, "1"], ["188", 15, "2"], ["188", 16, "1"], ["188", 17, "1"], ["188", 18, "1"], ["188", 19, "1"], ["188", 20, "1"], ["188", 21, "1"], ["188", 22, "2"], ["188", 23, "2"], ["188", 28, "1"], ["188", 30, "1"], ["188", 32, "2"], ["188", 34, "1"], ["188", 35, "2"], ["188", 36, "1"], ["188", 37, "2"], ["188", 39, "1"], ["188", 40, "2"], ["188", 42, "3"], ["188", 43, "2"], ["188", 49, "2"], ["188", 50, "2"], ["188", 51, "2"], ["188", 52, "3"], ["188", 53, "1"], ["188", 54, "2"], ["188", 55, "1"], ["188", 56, "1"], ["188", 57, "2"], ["188", 58, "3"], ["188", 59, "1"], ["188", 60, "1"], ["188", 61, "1"], ["188", 62, "1"], ["188", 63, "1"], ["188", 64, "1"], ["188", 65, "2"], ["188", 66, "2"], ["188", 67, "1"], ["188", 71, "1"], ["188", 73, "1"], ["188", 79, "2"], ["188", 80, "2"], ["188", 81, "2"], ["188", 82, "1"], ["188", 83, "3"], ["188", 84, "6"], ["188", 85, "5"], ["188", 86, "5"], ["188", 87, "4"], ["188", 88, "4"], ["188", 89, "4"], ["188", 90, "4"], ["188", 91, "4"], ["188", 92, "5"], ["188", 94, "1"], ["188", 96, "1"], ["188", 97, "1"], ["188", 98, "1"], ["188", 100, "2"], ["188", 101, "2"], ["188", 102, "2"], ["188", 104, "1"], ["188", 105, "2"], ["188", 106, "1"], ["188", 108, "1"], ["188", 109, "1"], ["188", 112, "1"], ["188", 113, "1"], ["188", 114, "2"], ["188", 118, "1"], ["188", 119, "3"], ["188", 120, "3"], ["188", 121, "1"], ["188", 122, "1"], ["188", 123, "1"], ["188", 124, "1"], ["188", 126, "1"], ["188", 127, "1"], ["188", 129, "2"], ["188", 131, "3"], ["188", 132, "3"], ["188", 133, "3"], ["188", 134, "3"], ["188", 135, "2"], ["188", 136, "2"], ["188", 137, "1"], ["188", 138, "3"], ["188", 139, "4"], ["188", 140, "2"], ["188", 141, "2"], ["188", 142, "1"], ["188", 143, "4"], ["188", 144, "4"], ["188", 145, "3"], ["188", 146, "3"], ["188", 147, "3"], ["188", 148, "1"], ["188", 149, "2"], ["188", 150, "1"], ["188", 151, "2"], ["188", 158, "1"], ["188", 159, "1"], ["188", 160, "1"], ["188", 161, "1"], ["188", 165, "1"], ["188", 170, "1"], ["188", 171, "1"], ["188", 172, "1"], ["188", 173, "1"], ["188", 174, "1"], ["188", 184, "1"], ["189", 14, "1"], ["189", 15, "2"], ["189", 16, "1"], ["189", 17, "1"], ["189", 18, "1"], ["189", 19, "1"], ["189", 20, "1"], ["189", 21, "1"], ["189", 22, "2"], ["189", 23, "2"], ["189", 28, "1"], ["189", 30, "1"], ["189", 32, "2"], ["189", 34, "1"], ["189", 35, "2"], ["189", 36, "1"], ["189", 37, "2"], ["189", 39, "1"], ["189", 40, "2"], ["189", 42, "3"], ["189", 43, "2"], ["189", 49, "2"], ["189", 50, "2"], ["189", 51, "2"], ["189", 52, "3"], ["189", 53, "1"], ["189", 54, "2"], ["189", 55, "1"], ["189", 56, "1"], ["189", 57, "2"], ["189", 58, "3"], ["189", 59, "1"], ["189", 60, "1"], ["189", 61, "1"], ["189", 62, "1"], ["189", 63, "1"], ["189", 64, "1"], ["189", 65, "2"], ["189", 66, "2"], ["189", 67, "1"], ["189", 71, "1"], ["189", 73, "1"], ["189", 79, "2"], ["189", 80, "2"], ["189", 81, "2"], ["189", 82, "1"], ["189", 83, "3"], ["189", 84, "6"], ["189", 85, "5"], ["189", 86, "5"], ["189", 87, "4"], ["189", 88, "4"], ["189", 89, "4"], ["189", 90, "4"], ["189", 91, "4"], ["189", 92, "5"], ["189", 94, "1"], ["189", 96, "1"], ["189", 97, "1"], ["189", 98, "1"], ["189", 100, "2"], ["189", 101, "2"], ["189", 102, "2"], ["189", 104, "1"], ["189", 105, "2"], ["189", 106, "1"], ["189", 108, "1"], ["189", 109, "1"], ["189", 112, "1"], ["189", 113, "1"], ["189", 114, "2"], ["189", 118, "1"], ["189", 119, "3"], ["189", 120, "3"], ["189", 121, "1"], ["189", 122, "1"], ["189", 123, "1"], ["189", 124, "1"], ["189", 126, "1"], ["189", 127, "1"], ["189", 129, "2"], ["189", 131, "3"], ["189", 132, "3"], ["189", 133, "3"], ["189", 134, "3"], ["189", 135, "2"], ["189", 136, "2"], ["189", 137, "1"], ["189", 138, "3"], ["189", 139, "4"], ["189", 140, "2"], ["189", 141, "2"], ["189", 142, "1"], ["189", 143, "4"], ["189", 144, "4"], ["189", 145, "3"], ["189", 146, "3"], ["189", 147, "3"], ["189", 148, "1"], ["189", 149, "2"], ["189", 150, "1"], ["189", 151, "2"], ["189", 158, "1"], ["189", 159, "1"], ["189", 160, "1"], ["189", 161, "1"], ["189", 165, "1"], ["189", 170, "1"], ["189", 171, "1"], ["189", 172, "1"], ["189", 173, "1"], ["189", 174, "1"], ["189", 184, "1"], ["190", 14, "1"], ["190", 15, "2"], ["190", 16, "1"], ["190", 17, "1"], ["190", 18, "1"], ["190", 19, "1"], ["190", 20, "1"], ["190", 21, "1"], ["190", 22, "2"], ["190", 23, "2"], ["190", 28, "1"], ["190", 30, "1"], ["190", 32, "2"], ["190", 34, "1"], ["190", 35, "2"], ["190", 36, "1"], ["190", 37, "2"], ["190", 39, "1"], ["190", 40, "2"], ["190", 42, "3"], ["190", 43, "2"], ["190", 49, "2"], ["190", 50, "2"], ["190", 51, "2"], ["190", 52, "3"], ["190", 53, "1"], ["190", 54, "2"], ["190", 55, "1"], ["190", 56, "1"], ["190", 57, "2"], ["190", 58, "3"], ["190", 59, "1"], ["190", 60, "1"], ["190", 61, "1"], ["190", 62, "1"], ["190", 63, "1"], ["190", 64, "1"], ["190", 65, "2"], ["190", 66, "2"], ["190", 67, "1"], ["190", 71, "1"], ["190", 73, "1"], ["190", 79, "2"], ["190", 80, "2"], ["190", 81, "2"], ["190", 82, "1"], ["190", 83, "3"], ["190", 84, "6"], ["190", 85, "5"], ["190", 86, "5"], ["190", 87, "4"], ["190", 88, "4"], ["190", 89, "4"], ["190", 90, "4"], ["190", 91, "4"], ["190", 92, "5"], ["190", 94, "1"], ["190", 96, "1"], ["190", 97, "1"], ["190", 98, "1"], ["190", 100, "2"], ["190", 101, "2"], ["190", 102, "2"], ["190", 104, "1"], ["190", 105, "2"], ["190", 106, "1"], ["190", 108, "1"], ["190", 109, "1"], ["190", 112, "1"], ["190", 113, "1"], ["190", 114, "2"], ["190", 118, "1"], ["190", 119, "3"], ["190", 120, "3"], ["190", 121, "1"], ["190", 122, "1"], ["190", 123, "1"], ["190", 124, "1"], ["190", 126, "1"], ["190", 127, "1"], ["190", 129, "2"], ["190", 131, "3"], ["190", 132, "3"], ["190", 133, "3"], ["190", 134, "3"], ["190", 135, "2"], ["190", 136, "2"], ["190", 137, "1"], ["190", 138, "3"], ["190", 139, "4"], ["190", 140, "2"], ["190", 141, "2"], ["190", 142, "1"], ["190", 143, "4"], ["190", 144, "4"], ["190", 145, "3"], ["190", 146, "3"], ["190", 147, "3"], ["190", 148, "1"], ["190", 149, "2"], ["190", 150, "1"], ["190", 151, "2"], ["190", 158, "1"], ["190", 159, "1"], ["190", 160, "1"], ["190", 161, "1"], ["190", 165, "1"], ["190", 170, "1"], ["190", 171, "1"], ["190", 172, "1"], ["190", 173, "1"], ["190", 174, "1"], ["190", 184, "1"], ["191", null, "1"], ["191", 14, "2"], ["191", 15, "1"], ["191", 16, "1"], ["191", 17, "1"], ["191", 18, "1"], ["191", 19, "1"], ["191", 20, "1"], ["191", 21, "1"], ["191", 22, "2"], ["191", 23, "1"], ["191", 30, "1"], ["191", 39, "1"], ["191", 42, "1"], ["191", 79, "2"], ["191", 82, "1"], ["191", 83, "1"], ["191", 86, "1"], ["191", 89, "1"], ["191", 90, "1"], ["191", 114, "1"], ["191", 132, "1"], ["191", 133, "1"], ["191", 134, "1"], ["191", 135, "1"], ["191", 136, "1"], ["191", 137, "1"], ["191", 138, "1"], ["191", 139, "2"], ["191", 140, "2"], ["191", 141, "2"], ["191", 142, "1"], ["191", 143, "1"], ["191", 144, "2"], ["191", 151, "1"], ["191", 158, "1"], ["191", 159, "1"], ["191", 160, "1"], ["191", 174, "1"], ["193", 16, "1"], ["193", 17, "1"], ["193", 79, "1"], ["193", 132, "1"], ["193", 133, "1"], ["193", 134, "1"], ["193", 135, "1"], ["193", 136, "1"], ["193", 137, "1"], ["193", 138, "1"], ["193", 139, "1"], ["193", 140, "1"], ["193", 143, "1"], ["193", 144, "1"], ["195", 16, "1"], ["195", 17, "1"], ["195", 79, "1"], ["195", 132, "1"], ["195", 133, "1"], ["195", 134, "1"], ["195", 135, "1"], ["195", 136, "1"], ["195", 137, "1"], ["195", 138, "1"], ["195", 139, "1"], ["195", 140, "1"], ["195", 143, "1"], ["195", 144, "1"], ["197", 20, "1"], ["197", 21, "1"], ["197", 131, "1"], ["197", 132, "1"], ["197", 133, "1"], ["197", 143, "1"], ["199", 20, "1"], ["199", 21, "1"], ["199", 131, "1"], ["199", 132, "1"], ["199", 133, "1"], ["199", 143, "1"], ["200", 2, "1"], ["200", 3, "2"], ["200", 4, "2"], ["200", 5, "4"], ["200", 6, "4"], ["200", 7, "7"], ["200", 8, "7"], ["200", 9, "6"], ["200", 10, "8"], ["200", 11, "10"], ["200", 12, "12"], ["200", 13, "15"], ["200", 14, "14"], ["200", 15, "3"], ["200", 16, "2"], ["200", 18, "5"], ["200", 19, "3"], ["200", 20, "1"], ["200", 21, "2"], ["200", 42, "1"], ["200", 43, "1"], ["200", 44, "1"], ["200", 45, "1"], ["200", 46, "2"], ["200", 47, "1"], ["200", 73, "1"], ["200", 74, "1"], ["200", 83, "1"], ["200", 95, "1"], ["200", 107, "1"], ["200", 108, "1"], ["200", 110, "1"], ["200", 112, "1"], ["200", 118, "2"], ["200", 120, "1"], ["200", 122, "1"], ["200", 123, "4"], ["200", 124, "7"], ["200", 125, "9"], ["200", 126, "10"], ["200", 127, "12"], ["200", 128, "11"], ["200", 129, "9"], ["200", 130, "9"], ["200", 131, "11"], ["200", 132, "7"], ["200", 133, "10"], ["200", 134, "9"], ["200", 135, "10"], ["200", 136, "11"], ["200", 137, "9"], ["200", 138, "11"], ["200", 139, "11"], ["200", 140, "8"], ["200", 141, "6"], ["200", 142, "4"], ["200", 143, "1"], ["200", 144, "1"], ["200", 145, "1"], ["200", 183, "1"], ["200", null, "1"], ["201", 1, "5"], ["201", 2, "11"], ["201", 3, "20"], ["201", 4, "21"], ["201", 5, "23"], ["201", 6, "23"], ["201", 7, "23"], ["201", 8, "23"], ["201", 9, "23"], ["201", 10, "23"], ["201", 11, "23"], ["201", 12, "23"], ["201", 13, "23"], ["201", 14, "23"], ["201", 15, "23"], ["201", 16, "23"], ["201", 17, "22"], ["201", 18, "23"], ["201", 19, "23"], ["201", 20, "23"], ["201", 21, "20"], ["201", 22, "20"], ["201", 23, "19"], ["201", 24, "19"], ["201", 25, "18"], ["201", 26, "9"], ["201", 27, "12"], ["201", 28, "12"], ["201", 29, "10"], ["201", 30, "13"], ["201", 31, "11"], ["201", 32, "10"], ["201", 33, "10"], ["201", 34, "4"], ["201", 35, "3"], ["201", 36, "2"], ["201", 37, "2"], ["201", 38, "2"], ["201", 39, "2"], ["201", 40, "1"], ["201", 41, "3"], ["201", 42, "2"], ["201", 43, "4"], ["201", 44, "3"], ["201", 45, "2"], ["201", 46, "3"], ["201", 47, "5"], ["201", 48, "4"], ["201", 49, "5"], ["201", 50, "3"], ["201", 51, "2"], ["201", 52, "2"], ["201", 53, "2"], ["201", 54, "3"], ["201", 55, "1"], ["201", 56, "1"], ["201", 57, "1"], ["201", 58, "1"], ["201", 59, "3"], ["201", 60, "1"], ["201", 61, "1"], ["201", 62, "2"], ["201", 63, "1"], ["201", 64, "2"], ["201", 67, "1"], ["201", 68, "1"], ["201", 72, "1"], ["201", 73, "2"], ["201", 74, "2"], ["201", 75, "2"], ["201", 76, "1"], ["201", 77, "1"], ["201", 78, "2"], ["201", 79, "4"], ["201", 80, "3"], ["201", 81, "3"], ["201", 82, "6"], ["201", 83, "7"], ["201", 84, "7"], ["201", 85, "3"], ["201", 86, "5"], ["201", 87, "4"], ["201", 88, "2"], ["201", 89, "4"], ["201", 90, "7"], ["201", 91, "5"], ["201", 92, "3"], ["201", 93, "9"], ["201", 94, "5"], ["201", 95, "4"], ["201", 96, "7"], ["201", 97, "4"], ["201", 98, "6"], ["201", 99, "8"], ["201", 100, "8"], ["201", 101, "8"], ["201", 102, "11"], ["201", 103, "8"], ["201", 104, "12"], ["201", 105, "8"], ["201", 106, "7"], ["201", 107, "8"], ["201", 108, "8"], ["201", 109, "9"], ["201", 110, "9"], ["201", 111, "10"], ["201", 112, "12"], ["201", 113, "15"], ["201", 114, "13"], ["201", 115, "13"], ["201", 116, "14"], ["201", 117, "14"], ["201", 118, "15"], ["201", 119, "15"], ["201", 120, "17"], ["201", 121, "18"], ["201", 122, "16"], ["201", 123, "19"], ["201", 124, "20"], ["201", 125, "20"], ["201", 126, "20"], ["201", 127, "22"], ["201", 128, "23"], ["201", 129, "22"], ["201", 130, "22"], ["201", 131, "21"], ["201", 132, "21"], ["201", 133, "22"], ["201", 134, "22"], ["201", 135, "22"], ["201", 136, "22"], ["201", 137, "21"], ["201", 138, "21"], ["201", 139, "22"], ["201", 140, "22"], ["201", 141, "21"], ["201", 142, "20"], ["201", 143, "19"], ["201", 144, "15"], ["201", 145, "13"], ["201", 146, "5"], ["201", 147, "3"], ["201", 148, "3"], ["201", 149, "1"], ["201", 150, "1"], ["201", 177, "2"], ["201", 178, "2"], ["201", 182, "1"], ["201", 183, "1"], ["202", 1, "5"], ["202", 2, "11"], ["202", 3, "20"], ["202", 4, "21"], ["202", 5, "23"], ["202", 6, "23"], ["202", 7, "23"], ["202", 8, "23"], ["202", 9, "23"], ["202", 10, "23"], ["202", 11, "23"], ["202", 12, "23"], ["202", 13, "23"], ["202", 14, "23"], ["202", 15, "23"], ["202", 16, "23"], ["202", 17, "22"], ["202", 18, "23"], ["202", 19, "23"], ["202", 20, "23"], ["202", 21, "20"], ["202", 22, "20"], ["202", 23, "19"], ["202", 24, "19"], ["202", 25, "18"], ["202", 26, "9"], ["202", 27, "12"], ["202", 28, "12"], ["202", 29, "10"], ["202", 30, "13"], ["202", 31, "11"], ["202", 32, "10"], ["202", 33, "10"], ["202", 34, "4"], ["202", 35, "3"], ["202", 36, "2"], ["202", 37, "2"], ["202", 38, "2"], ["202", 39, "2"], ["202", 40, "1"], ["202", 41, "3"], ["202", 42, "2"], ["202", 43, "4"], ["202", 44, "3"], ["202", 45, "2"], ["202", 46, "3"], ["202", 47, "5"], ["202", 48, "4"], ["202", 49, "5"], ["202", 50, "3"], ["202", 51, "2"], ["202", 52, "2"], ["202", 53, "2"], ["202", 54, "3"], ["202", 55, "1"], ["202", 56, "1"], ["202", 57, "1"], ["202", 58, "1"], ["202", 59, "3"], ["202", 60, "1"], ["202", 61, "1"], ["202", 62, "2"], ["202", 63, "1"], ["202", 64, "2"], ["202", 67, "1"], ["202", 68, "1"], ["202", 72, "1"], ["202", 73, "2"], ["202", 74, "2"], ["202", 75, "2"], ["202", 76, "1"], ["202", 77, "1"], ["202", 78, "2"], ["202", 79, "4"], ["202", 80, "3"], ["202", 81, "3"], ["202", 82, "6"], ["202", 83, "7"], ["202", 84, "7"], ["202", 85, "3"], ["202", 86, "5"], ["202", 87, "4"], ["202", 88, "2"], ["202", 89, "4"], ["202", 90, "7"], ["202", 91, "5"], ["202", 92, "3"], ["202", 93, "9"], ["202", 94, "5"], ["202", 95, "4"], ["202", 96, "7"], ["202", 97, "4"], ["202", 98, "6"], ["202", 99, "8"], ["202", 100, "8"], ["202", 101, "8"], ["202", 102, "11"], ["202", 103, "8"], ["202", 104, "12"], ["202", 105, "8"], ["202", 106, "7"], ["202", 107, "8"], ["202", 108, "8"], ["202", 109, "9"], ["202", 110, "9"], ["202", 111, "10"], ["202", 112, "12"], ["202", 113, "15"], ["202", 114, "13"], ["202", 115, "13"], ["202", 116, "14"], ["202", 117, "14"], ["202", 118, "15"], ["202", 119, "15"], ["202", 120, "17"], ["202", 121, "18"], ["202", 122, "16"], ["202", 123, "19"], ["202", 124, "20"], ["202", 125, "20"], ["202", 126, "20"], ["202", 127, "22"], ["202", 128, "23"], ["202", 129, "22"], ["202", 130, "22"], ["202", 131, "21"], ["202", 132, "21"], ["202", 133, "22"], ["202", 134, "22"], ["202", 135, "22"], ["202", 136, "22"], ["202", 137, "21"], ["202", 138, "21"], ["202", 139, "22"], ["202", 140, "22"], ["202", 141, "21"], ["202", 142, "20"], ["202", 143, "19"], ["202", 144, "15"], ["202", 145, "13"], ["202", 146, "5"], ["202", 147, "3"], ["202", 148, "3"], ["202", 149, "1"], ["202", 150, "1"], ["202", 177, "2"], ["202", 178, "2"], ["202", 182, "1"], ["202", 183, "1"], ["204", null, "1"], ["204", null, "1"], ["204", 7, "1"], ["204", 9, "1"], ["204", 10, "7"], ["204", 11, "3"], ["204", 12, "2"], ["204", 13, "2"], ["204", 15, "2"], ["204", 16, "3"], ["204", 17, "5"], ["204", 18, "4"], ["204", 19, "1"], ["204", 20, "4"], ["204", 21, "2"], ["204", 22, "1"], ["204", 23, "3"], ["204", 24, "2"], ["204", 25, "1"], ["204", 26, "1"], ["204", 27, "1"], ["204", 28, "2"], ["204", 30, "1"], ["204", 41, "1"], ["204", 42, "1"], ["204", 43, "1"], ["204", 44, "1"], ["204", 45, "2"], ["204", 46, "2"], ["204", 47, "1"], ["204", 48, "1"], ["204", 83, "1"], ["204", 84, "1"], ["204", 99, "1"], ["204", 100, "1"], ["204", 107, "1"], ["204", 114, "1"], ["204", 119, "1"], ["204", 120, "1"], ["204", 121, "1"], ["204", 122, "1"], ["204", 123, "5"], ["204", 124, "2"], ["204", 125, "2"], ["204", 126, "5"], ["204", 127, "2"], ["204", 128, "1"], ["204", 129, "5"], ["204", 130, "4"], ["204", 131, "5"], ["204", 132, "6"], ["204", 133, "3"], ["204", 134, "5"], ["204", 135, "4"], ["204", 136, "1"], ["204", 137, "2"], ["204", 138, "2"], ["204", 139, "4"], ["204", 140, "3"], ["204", 141, "3"], ["204", 142, "1"], ["204", 143, "2"], ["204", 177, "1"], ["204", 178, "1"], ["204", 182, "1"], ["204", 183, "1"], ["204", null, "1"], ["204", null, "1"], ["204", null, "1"], ["204", null, "1"], ["204", null, "1"], ["204", null, "1"], ["204", null, "1"], ["205", null, "1"], ["205", null, "1"], ["205", 7, "1"], ["205", 9, "1"], ["205", 10, "7"], ["205", 11, "3"], ["205", 12, "2"], ["205", 13, "2"], ["205", 15, "2"], ["205", 16, "3"], ["205", 17, "5"], ["205", 18, "4"], ["205", 19, "1"], ["205", 20, "4"], ["205", 21, "2"], ["205", 22, "1"], ["205", 23, "3"], ["205", 24, "2"], ["205", 25, "1"], ["205", 26, "1"], ["205", 27, "1"], ["205", 28, "2"], ["205", 30, "1"], ["205", 41, "1"], ["205", 42, "1"], ["205", 43, "1"], ["205", 44, "1"], ["205", 45, "2"], ["205", 46, "2"], ["205", 47, "1"], ["205", 48, "1"], ["205", 83, "1"], ["205", 84, "1"], ["205", 99, "1"], ["205", 100, "1"], ["205", 107, "1"], ["205", 114, "1"], ["205", 119, "1"], ["205", 120, "1"], ["205", 121, "1"], ["205", 122, "1"], ["205", 123, "5"], ["205", 124, "2"], ["205", 125, "2"], ["205", 126, "5"], ["205", 127, "2"], ["205", 128, "1"], ["205", 129, "5"], ["205", 130, "4"], ["205", 131, "5"], ["205", 132, "6"], ["205", 133, "3"], ["205", 134, "5"], ["205", 135, "4"], ["205", 136, "1"], ["205", 137, "2"], ["205", 138, "2"], ["205", 139, "4"], ["205", 140, "3"], ["205", 141, "3"], ["205", 142, "1"], ["205", 143, "2"], ["205", 177, "1"], ["205", 178, "1"], ["205", 182, "1"], ["205", 183, "1"], ["205", null, "1"], ["205", null, "1"], ["205", null, "1"], ["205", null, "1"], ["205", null, "1"], ["205", null, "1"], ["205", null, "1"], ["206", null, "1"], ["206", 17, "1"], ["206", 18, "1"], ["206", 19, "1"], ["206", 41, "1"], ["206", 177, "1"], ["206", 178, "1"], ["206", 182, "1"], ["206", 183, "1"], ["208", null, "1"], ["208", 17, "1"], ["208", 18, "1"], ["208", 19, "1"], ["208", 41, "1"], ["208", 177, "1"], ["208", 178, "1"], ["208", 182, "1"], ["208", 183, "1"], ["209", 17, "1"], ["209", 18, "1"], ["209", 19, "1"], ["209", 33, "1"], ["209", 36, "1"], ["209", 37, "1"], ["209", 39, "1"], ["209", 83, "1"], ["209", 107, "1"], ["209", 108, "1"], ["209", 140, "1"], ["209", 141, "1"], ["210", 17, "1"], ["210", 18, "1"], ["210", 19, "1"], ["210", 33, "1"], ["210", 36, "1"], ["210", 37, "1"], ["210", 39, "1"], ["210", 83, "1"], ["210", 107, "1"], ["210", 108, "1"], ["210", 140, "1"], ["210", 141, "1"], ["211", 15, "1"], ["211", 16, "1"], ["211", 17, "1"], ["211", 18, "1"], ["211", 19, "1"], ["211", 20, "1"], ["211", 21, "1"], ["211", 22, "1"], ["211", 23, "1"], ["211", 26, "1"], ["211", 27, "1"], ["211", 28, "2"], ["211", 29, "2"], ["211", 30, "2"], ["211", 31, "2"], ["211", 32, "1"], ["211", 33, "1"], ["211", 34, "2"], ["211", 35, "3"], ["211", 36, "2"], ["211", 37, "1"], ["211", 38, "2"], ["211", 39, "1"], ["211", 40, "1"], ["211", 41, "1"], ["211", 81, "1"], ["211", 82, "1"], ["211", 83, "1"], ["211", 104, "1"], ["211", 105, "1"], ["211", 106, "1"], ["211", 107, "1"], ["211", 108, "1"], ["211", 109, "1"], ["211", 110, "1"], ["211", 111, "1"], ["211", 112, "1"], ["211", 113, "1"], ["211", 114, "1"], ["211", 115, "1"], ["211", 126, "1"], ["211", 127, "1"], ["211", 128, "1"], ["211", 138, "1"], ["211", 139, "1"], ["211", 140, "1"], ["211", 141, "1"], ["211", 142, "2"], ["211", 143, "2"], ["211", 144, "1"], ["213", 15, "1"], ["213", 16, "1"], ["213", 17, "1"], ["213", 18, "1"], ["213", 19, "1"], ["213", 20, "1"], ["213", 21, "1"], ["213", 22, "1"], ["213", 23, "1"], ["213", 26, "1"], ["213", 27, "1"], ["213", 28, "2"], ["213", 29, "2"], ["213", 30, "2"], ["213", 31, "2"], ["213", 32, "1"], ["213", 33, "1"], ["213", 34, "2"], ["213", 35, "3"], ["213", 36, "2"], ["213", 37, "1"], ["213", 38, "2"], ["213", 39, "1"], ["213", 40, "1"], ["213", 41, "1"], ["213", 81, "1"], ["213", 82, "1"], ["213", 83, "1"], ["213", 104, "1"], ["213", 105, "1"], ["213", 106, "1"], ["213", 107, "1"], ["213", 108, "1"], ["213", 109, "1"], ["213", 110, "1"], ["213", 111, "1"], ["213", 112, "1"], ["213", 113, "1"], ["213", 114, "1"], ["213", 115, "1"], ["213", 126, "1"], ["213", 127, "1"], ["213", 128, "1"], ["213", 138, "1"], ["213", 139, "1"], ["213", 140, "1"], ["213", 141, "1"], ["213", 142, "2"], ["213", 143, "2"], ["213", 144, "1"], ["214", 15, "1"], ["214", 16, "1"], ["214", 17, "1"], ["214", 18, "1"], ["214", 19, "1"], ["214", 20, "1"], ["214", 21, "1"], ["214", 22, "1"], ["214", 23, "1"], ["214", 26, "1"], ["214", 27, "1"], ["214", 28, "2"], ["214", 29, "2"], ["214", 30, "2"], ["214", 31, "2"], ["214", 32, "1"], ["214", 33, "1"], ["214", 34, "2"], ["214", 35, "3"], ["214", 36, "2"], ["214", 37, "1"], ["214", 38, "2"], ["214", 39, "1"], ["214", 40, "1"], ["214", 41, "1"], ["214", 81, "1"], ["214", 82, "1"], ["214", 83, "1"], ["214", 104, "1"], ["214", 105, "1"], ["214", 106, "1"], ["214", 107, "1"], ["214", 108, "1"], ["214", 109, "1"], ["214", 110, "1"], ["214", 111, "1"], ["214", 112, "1"], ["214", 113, "1"], ["214", 114, "1"], ["214", 115, "1"], ["214", 126, "1"], ["214", 127, "1"], ["214", 128, "1"], ["214", 138, "1"], ["214", 139, "1"], ["214", 140, "1"], ["214", 141, "1"], ["214", 142, "2"], ["214", 143, "2"], ["214", 144, "1"], ["215", 10, "1"], ["215", 11, "1"], ["215", 15, "2"], ["215", 16, "3"], ["215", 17, "5"], ["215", 18, "3"], ["215", 19, "3"], ["215", 20, "3"], ["215", 21, "2"], ["215", 22, "3"], ["215", 23, "3"], ["215", 24, "2"], ["215", 25, "2"], ["215", 26, "3"], ["215", 27, "3"], ["215", 28, "3"], ["215", 29, "4"], ["215", 30, "3"], ["215", 31, "5"], ["215", 32, "5"], ["215", 33, "7"], ["215", 34, "6"], ["215", 35, "6"], ["215", 36, "7"], ["215", 37, "7"], ["215", 38, "7"], ["215", 39, "7"], ["215", 40, "5"], ["215", 41, "4"], ["215", 42, "3"], ["215", 61, "1"], ["215", 80, "1"], ["215", 81, "1"], ["215", 82, "1"], ["215", 83, "1"], ["215", 102, "1"], ["215", 103, "1"], ["215", 104, "1"], ["215", 105, "1"], ["215", 106, "1"], ["215", 107, "1"], ["215", 108, "1"], ["215", 109, "2"], ["215", 110, "2"], ["215", 111, "2"], ["215", 112, "1"], ["215", 113, "1"], ["215", 114, "1"], ["215", 115, "1"], ["215", 116, "1"], ["215", 117, "1"], ["215", 123, "1"], ["215", 124, "2"], ["215", 125, "2"], ["215", 126, "2"], ["215", 127, "1"], ["215", 128, "1"], ["215", 129, "1"], ["215", 130, "1"], ["215", 136, "1"], ["215", 137, "2"], ["215", 138, "2"], ["215", 139, "2"], ["215", 140, "2"], ["215", 141, "2"], ["215", 142, "2"], ["215", 143, "2"], ["215", 144, "2"], ["216", 10, "1"], ["216", 11, "1"], ["216", 15, "2"], ["216", 16, "3"], ["216", 17, "5"], ["216", 18, "3"], ["216", 19, "3"], ["216", 20, "3"], ["216", 21, "2"], ["216", 22, "3"], ["216", 23, "3"], ["216", 24, "2"], ["216", 25, "2"], ["216", 26, "3"], ["216", 27, "3"], ["216", 28, "3"], ["216", 29, "4"], ["216", 30, "3"], ["216", 31, "5"], ["216", 32, "5"], ["216", 33, "7"], ["216", 34, "6"], ["216", 35, "6"], ["216", 36, "7"], ["216", 37, "7"], ["216", 38, "7"], ["216", 39, "7"], ["216", 40, "5"], ["216", 41, "4"], ["216", 42, "3"], ["216", 61, "1"], ["216", 80, "1"], ["216", 81, "1"], ["216", 82, "1"], ["216", 83, "1"], ["216", 102, "1"], ["216", 103, "1"], ["216", 104, "1"], ["216", 105, "1"], ["216", 106, "1"], ["216", 107, "1"], ["216", 108, "1"], ["216", 109, "2"], ["216", 110, "2"], ["216", 111, "2"], ["216", 112, "1"], ["216", 113, "1"], ["216", 114, "1"], ["216", 115, "1"], ["216", 116, "1"], ["216", 117, "1"], ["216", 123, "1"], ["216", 124, "2"], ["216", 125, "2"], ["216", 126, "2"], ["216", 127, "1"], ["216", 128, "1"], ["216", 129, "1"], ["216", 130, "1"], ["216", 136, "1"], ["216", 137, "2"], ["216", 138, "2"], ["216", 139, "2"], ["216", 140, "2"], ["216", 141, "2"], ["216", 142, "2"], ["216", 143, "2"], ["216", 144, "2"], ["217", 10, "1"], ["217", 11, "1"], ["217", 15, "2"], ["217", 16, "3"], ["217", 17, "5"], ["217", 18, "3"], ["217", 19, "3"], ["217", 20, "3"], ["217", 21, "2"], ["217", 22, "3"], ["217", 23, "3"], ["217", 24, "2"], ["217", 25, "2"], ["217", 26, "3"], ["217", 27, "3"], ["217", 28, "3"], ["217", 29, "4"], ["217", 30, "3"], ["217", 31, "5"], ["217", 32, "5"], ["217", 33, "7"], ["217", 34, "6"], ["217", 35, "6"], ["217", 36, "7"], ["217", 37, "7"], ["217", 38, "7"], ["217", 39, "7"], ["217", 40, "5"], ["217", 41, "4"], ["217", 42, "3"], ["217", 61, "1"], ["217", 80, "1"], ["217", 81, "1"], ["217", 82, "1"], ["217", 83, "1"], ["217", 102, "1"], ["217", 103, "1"], ["217", 104, "1"], ["217", 105, "1"], ["217", 106, "1"], ["217", 107, "1"], ["217", 108, "1"], ["217", 109, "2"], ["217", 110, "2"], ["217", 111, "2"], ["217", 112, "1"], ["217", 113, "1"], ["217", 114, "1"], ["217", 115, "1"], ["217", 116, "1"], ["217", 117, "1"], ["217", 123, "1"], ["217", 124, "2"], ["217", 125, "2"], ["217", 126, "2"], ["217", 127, "1"], ["217", 128, "1"], ["217", 129, "1"], ["217", 130, "1"], ["217", 136, "1"], ["217", 137, "2"], ["217", 138, "2"], ["217", 139, "2"], ["217", 140, "2"], ["217", 141, "2"], ["217", 142, "2"], ["217", 143, "2"], ["217", 144, "2"], ["218", 5, "1"], ["218", 6, "1"], ["218", 8, "3"], ["218", 9, "4"], ["218", 10, "4"], ["218", 11, "3"], ["218", 12, "3"], ["218", 13, "8"], ["218", 14, "9"], ["218", 15, "9"], ["218", 16, "10"], ["218", 17, "9"], ["218", 18, "9"], ["218", 19, "10"], ["218", 20, "12"], ["218", 21, "12"], ["218", 22, "14"], ["218", 23, "14"], ["218", 24, "13"], ["218", 25, "10"], ["218", 26, "10"], ["218", 27, "11"], ["218", 28, "16"], ["218", 29, "15"], ["218", 30, "17"], ["218", 31, "16"], ["218", 32, "16"], ["218", 33, "16"], ["218", 34, "18"], ["218", 35, "17"], ["218", 36, "16"], ["218", 37, "16"], ["218", 38, "14"], ["218", 39, "15"], ["218", 40, "13"], ["218", 41, "10"], ["218", 42, "9"], ["218", 43, "8"], ["218", 44, "7"], ["218", 45, "6"], ["218", 46, "4"], ["218", 47, "3"], ["218", 48, "2"], ["218", 49, "2"], ["218", 50, "3"], ["218", 51, "2"], ["218", 52, "2"], ["218", 54, "1"], ["218", 59, "1"], ["218", 60, "2"], ["218", 61, "2"], ["218", 64, "1"], ["218", 79, "1"], ["218", 80, "1"], ["218", 81, "2"], ["218", 82, "2"], ["218", 83, "1"], ["218", 84, "2"], ["218", 85, "1"], ["218", 86, "1"], ["218", 87, "1"], ["218", 88, "2"], ["218", 89, "2"], ["218", 90, "2"], ["218", 91, "1"], ["218", 92, "1"], ["218", 98, "1"], ["218", 99, "2"], ["218", 100, "2"], ["218", 101, "4"], ["218", 102, "6"], ["218", 103, "5"], ["218", 104, "4"], ["218", 105, "3"], ["218", 106, "2"], ["218", 107, "1"], ["218", 108, "2"], ["218", 109, "2"], ["218", 110, "2"], ["218", 111, "2"], ["218", 112, "1"], ["218", 113, "1"], ["218", 114, "1"], ["218", 115, "1"], ["218", 116, "1"], ["218", 117, "1"], ["218", 118, "1"], ["218", 120, "1"], ["218", 121, "2"], ["218", 122, "2"], ["218", 123, "2"], ["218", 124, "2"], ["218", 125, "2"], ["218", 126, "3"], ["218", 127, "3"], ["218", 128, "2"], ["218", 129, "1"], ["218", 130, "1"], ["218", 131, "2"], ["218", 132, "2"], ["218", 133, "1"], ["218", 134, "2"], ["218", 135, "3"], ["218", 136, "4"], ["218", 137, "4"], ["218", 138, "3"], ["218", 139, "2"], ["218", 140, "2"], ["218", 141, "2"], ["218", 142, "2"], ["218", 143, "2"], ["218", 144, "2"], ["218", 145, "2"], ["218", 146, "1"], ["218", 147, "1"], ["218", 148, "1"], ["218", null, "1"], ["218", null, "1"], ["218", null, "1"], ["218", null, "1"], ["219", 1, "1"], ["219", 2, "1"], ["219", 3, "1"], ["219", 4, "3"], ["219", 5, "4"], ["219", 6, "5"], ["219", 7, "7"], ["219", 8, "9"], ["219", 9, "8"], ["219", 10, "9"], ["219", 11, "13"], ["219", 12, "15"], ["219", 13, "17"], ["219", 14, "19"], ["219", 15, "19"], ["219", 16, "20"], ["219", 17, "19"], ["219", 18, "21"], ["219", 19, "19"], ["219", 20, "21"], ["219", 21, "19"], ["219", 22, "18"], ["219", 23, "17"], ["219", 24, "17"], ["219", 25, "15"], ["219", 26, "17"], ["219", 27, "20"], ["219", 28, "20"], ["219", 29, "22"], ["219", 30, "21"], ["219", 31, "21"], ["219", 32, "22"], ["219", 33, "21"], ["219", 34, "23"], ["219", 35, "21"], ["219", 36, "20"], ["219", 37, "20"], ["219", 38, "22"], ["219", 39, "18"], ["219", 40, "19"], ["219", 41, "16"], ["219", 42, "14"], ["219", 43, "14"], ["219", 44, "12"], ["219", 45, "9"], ["219", 46, "8"], ["219", 47, "9"], ["219", 48, "9"], ["219", 49, "7"], ["219", 50, "5"], ["219", 51, "4"], ["219", 52, "3"], ["219", 53, "4"], ["219", 54, "2"], ["219", 55, "2"], ["219", 56, "1"], ["219", 57, "2"], ["219", 58, "2"], ["219", 59, "3"], ["219", 60, "2"], ["219", 61, "2"], ["219", 62, "1"], ["219", 63, "1"], ["219", 64, "2"], ["219", 65, "2"], ["219", 76, "1"], ["219", 79, "2"], ["219", 80, "4"], ["219", 81, "5"], ["219", 82, "4"], ["219", 83, "5"], ["219", 84, "4"], ["219", 85, "2"], ["219", 86, "2"], ["219", 87, "6"], ["219", 88, "7"], ["219", 89, "10"], ["219", 90, "10"], ["219", 91, "9"], ["219", 92, "7"], ["219", 93, "5"], ["219", 94, "2"], ["219", 95, "2"], ["219", 96, "1"], ["219", 97, "2"], ["219", 98, "4"], ["219", 99, "5"], ["219", 100, "6"], ["219", 101, "7"], ["219", 102, "8"], ["219", 103, "8"], ["219", 104, "7"], ["219", 105, "6"], ["219", 106, "7"], ["219", 107, "7"], ["219", 108, "6"], ["219", 109, "4"], ["219", 110, "4"], ["219", 111, "3"], ["219", 112, "3"], ["219", 113, "3"], ["219", 114, "4"], ["219", 115, "4"], ["219", 116, "5"], ["219", 117, "3"], ["219", 118, "3"], ["219", 119, "2"], ["219", 120, "5"], ["219", 121, "4"], ["219", 122, "2"], ["219", 123, "2"], ["219", 124, "2"], ["219", 125, "4"], ["219", 126, "4"], ["219", 127, "3"], ["219", 128, "4"], ["219", 129, "3"], ["219", 130, "4"], ["219", 131, "4"], ["219", 132, "3"], ["219", 133, "3"], ["219", 134, "5"], ["219", 135, "6"], ["219", 136, "5"], ["219", 137, "4"], ["219", 138, "3"], ["219", 139, "2"], ["219", 140, "2"], ["219", 141, "3"], ["219", 142, "3"], ["219", 143, "2"], ["219", 144, "2"], ["219", 145, "2"], ["219", 146, "1"], ["219", 147, "1"], ["219", 148, "1"], ["219", null, "1"], ["219", null, "1"], ["219", null, "1"], ["219", null, "1"], ["219", null, "1"], ["219", null, "1"], ["219", null, "1"], ["220", 1, "1"], ["220", 2, "1"], ["220", 3, "1"], ["220", 4, "3"], ["220", 5, "4"], ["220", 6, "5"], ["220", 7, "7"], ["220", 8, "9"], ["220", 9, "8"], ["220", 10, "9"], ["220", 11, "13"], ["220", 12, "15"], ["220", 13, "17"], ["220", 14, "19"], ["220", 15, "19"], ["220", 16, "20"], ["220", 17, "19"], ["220", 18, "21"], ["220", 19, "19"], ["220", 20, "21"], ["220", 21, "19"], ["220", 22, "18"], ["220", 23, "17"], ["220", 24, "17"], ["220", 25, "15"], ["220", 26, "17"], ["220", 27, "20"], ["220", 28, "20"], ["220", 29, "22"], ["220", 30, "21"], ["220", 31, "21"], ["220", 32, "22"], ["220", 33, "21"], ["220", 34, "23"], ["220", 35, "21"], ["220", 36, "20"], ["220", 37, "20"], ["220", 38, "22"], ["220", 39, "18"], ["220", 40, "19"], ["220", 41, "16"], ["220", 42, "14"], ["220", 43, "14"], ["220", 44, "12"], ["220", 45, "9"], ["220", 46, "8"], ["220", 47, "9"], ["220", 48, "9"], ["220", 49, "7"], ["220", 50, "5"], ["220", 51, "4"], ["220", 52, "3"], ["220", 53, "4"], ["220", 54, "2"], ["220", 55, "2"], ["220", 56, "1"], ["220", 57, "2"], ["220", 58, "2"], ["220", 59, "3"], ["220", 60, "2"], ["220", 61, "2"], ["220", 62, "1"], ["220", 63, "1"], ["220", 64, "2"], ["220", 65, "2"], ["220", 76, "1"], ["220", 79, "2"], ["220", 80, "4"], ["220", 81, "5"], ["220", 82, "4"], ["220", 83, "5"], ["220", 84, "4"], ["220", 85, "2"], ["220", 86, "2"], ["220", 87, "6"], ["220", 88, "7"], ["220", 89, "10"], ["220", 90, "10"], ["220", 91, "9"], ["220", 92, "7"], ["220", 93, "5"], ["220", 94, "2"], ["220", 95, "2"], ["220", 96, "1"], ["220", 97, "2"], ["220", 98, "4"], ["220", 99, "5"], ["220", 100, "6"], ["220", 101, "7"], ["220", 102, "8"], ["220", 103, "8"], ["220", 104, "7"], ["220", 105, "6"], ["220", 106, "7"], ["220", 107, "7"], ["220", 108, "6"], ["220", 109, "4"], ["220", 110, "4"], ["220", 111, "3"], ["220", 112, "3"], ["220", 113, "3"], ["220", 114, "4"], ["220", 115, "4"], ["220", 116, "5"], ["220", 117, "3"], ["220", 118, "3"], ["220", 119, "2"], ["220", 120, "5"], ["220", 121, "4"], ["220", 122, "2"], ["220", 123, "2"], ["220", 124, "2"], ["220", 125, "4"], ["220", 126, "4"], ["220", 127, "3"], ["220", 128, "4"], ["220", 129, "3"], ["220", 130, "4"], ["220", 131, "4"], ["220", 132, "3"], ["220", 133, "3"], ["220", 134, "5"], ["220", 135, "6"], ["220", 136, "5"], ["220", 137, "4"], ["220", 138, "3"], ["220", 139, "2"], ["220", 140, "2"], ["220", 141, "3"], ["220", 142, "3"], ["220", 143, "2"], ["220", 144, "2"], ["220", 145, "2"], ["220", 146, "1"], ["220", 147, "1"], ["220", 148, "1"], ["220", null, "1"], ["220", null, "1"], ["220", null, "1"], ["220", null, "1"], ["220", null, "1"], ["220", null, "1"], ["220", null, "1"], ["222", 1, "1"], ["222", 2, "1"], ["222", 3, "1"], ["222", 4, "3"], ["222", 5, "4"], ["222", 6, "5"], ["222", 7, "7"], ["222", 8, "9"], ["222", 9, "8"], ["222", 10, "9"], ["222", 11, "13"], ["222", 12, "15"], ["222", 13, "17"], ["222", 14, "19"], ["222", 15, "19"], ["222", 16, "20"], ["222", 17, "19"], ["222", 18, "21"], ["222", 19, "19"], ["222", 20, "21"], ["222", 21, "19"], ["222", 22, "18"], ["222", 23, "17"], ["222", 24, "17"], ["222", 25, "15"], ["222", 26, "17"], ["222", 27, "20"], ["222", 28, "20"], ["222", 29, "22"], ["222", 30, "21"], ["222", 31, "21"], ["222", 32, "22"], ["222", 33, "21"], ["222", 34, "23"], ["222", 35, "21"], ["222", 36, "20"], ["222", 37, "20"], ["222", 38, "22"], ["222", 39, "18"], ["222", 40, "19"], ["222", 41, "16"], ["222", 42, "14"], ["222", 43, "14"], ["222", 44, "12"], ["222", 45, "9"], ["222", 46, "8"], ["222", 47, "9"], ["222", 48, "9"], ["222", 49, "7"], ["222", 50, "5"], ["222", 51, "4"], ["222", 52, "3"], ["222", 53, "4"], ["222", 54, "2"], ["222", 55, "2"], ["222", 56, "1"], ["222", 57, "2"], ["222", 58, "2"], ["222", 59, "3"], ["222", 60, "2"], ["222", 61, "2"], ["222", 62, "1"], ["222", 63, "1"], ["222", 64, "2"], ["222", 65, "2"], ["222", 76, "1"], ["222", 79, "2"], ["222", 80, "4"], ["222", 81, "5"], ["222", 82, "4"], ["222", 83, "5"], ["222", 84, "4"], ["222", 85, "2"], ["222", 86, "2"], ["222", 87, "6"], ["222", 88, "7"], ["222", 89, "10"], ["222", 90, "10"], ["222", 91, "9"], ["222", 92, "7"], ["222", 93, "5"], ["222", 94, "2"], ["222", 95, "2"], ["222", 96, "1"], ["222", 97, "2"], ["222", 98, "4"], ["222", 99, "5"], ["222", 100, "6"], ["222", 101, "7"], ["222", 102, "8"], ["222", 103, "8"], ["222", 104, "7"], ["222", 105, "6"], ["222", 106, "7"], ["222", 107, "7"], ["222", 108, "6"], ["222", 109, "4"], ["222", 110, "4"], ["222", 111, "3"], ["222", 112, "3"], ["222", 113, "3"], ["222", 114, "4"], ["222", 115, "4"], ["222", 116, "5"], ["222", 117, "3"], ["222", 118, "3"], ["222", 119, "2"], ["222", 120, "5"], ["222", 121, "4"], ["222", 122, "2"], ["222", 123, "2"], ["222", 124, "2"], ["222", 125, "4"], ["222", 126, "4"], ["222", 127, "3"], ["222", 128, "4"], ["222", 129, "3"], ["222", 130, "4"], ["222", 131, "4"], ["222", 132, "3"], ["222", 133, "3"], ["222", 134, "5"], ["222", 135, "6"], ["222", 136, "5"], ["222", 137, "4"], ["222", 138, "3"], ["222", 139, "2"], ["222", 140, "2"], ["222", 141, "3"], ["222", 142, "3"], ["222", 143, "2"], ["222", 144, "2"], ["222", 145, "2"], ["222", 146, "1"], ["222", 147, "1"], ["222", 148, "1"], ["222", null, "1"], ["222", null, "1"], ["222", null, "1"], ["222", null, "1"], ["222", null, "1"], ["222", null, "1"], ["222", null, "1"], ["223", 2, "3"], ["223", 3, "3"], ["223", 4, "5"], ["223", 5, "8"], ["223", 6, "8"], ["223", 7, "10"], ["223", 8, "12"], ["223", 9, "13"], ["223", 10, "17"], ["223", 11, "19"], ["223", 12, "21"], ["223", 13, "21"], ["223", 14, "23"], ["223", 15, "23"], ["223", 16, "23"], ["223", 17, "23"], ["223", 18, "23"], ["223", 19, "23"], ["223", 20, "23"], ["223", 21, "21"], ["223", 22, "21"], ["223", 23, "22"], ["223", 24, "23"], ["223", 25, "22"], ["223", 26, "21"], ["223", 27, "23"], ["223", 28, "22"], ["223", 29, "23"], ["223", 30, "23"], ["223", 31, "23"], ["223", 32, "23"], ["223", 33, "23"], ["223", 34, "23"], ["223", 35, "22"], ["223", 36, "22"], ["223", 37, "22"], ["223", 38, "23"], ["223", 39, "21"], ["223", 40, "20"], ["223", 41, "19"], ["223", 42, "19"], ["223", 43, "17"], ["223", 44, "16"], ["223", 45, "18"], ["223", 46, "14"], ["223", 47, "12"], ["223", 48, "10"], ["223", 49, "10"], ["223", 50, "12"], ["223", 51, "12"], ["223", 52, "8"], ["223", 53, "8"], ["223", 54, "7"], ["223", 55, "8"], ["223", 56, "5"], ["223", 57, "8"], ["223", 58, "6"], ["223", 59, "6"], ["223", 60, "2"], ["223", 61, "2"], ["223", 62, "3"], ["223", 63, "2"], ["223", 64, "2"], ["223", 65, "2"], ["223", 66, "1"], ["223", 67, "2"], ["223", 68, "2"], ["223", 69, "2"], ["223", 70, "2"], ["223", 71, "1"], ["223", 72, "1"], ["223", 73, "1"], ["223", 74, "1"], ["223", 75, "1"], ["223", 76, "2"], ["223", 77, "1"], ["223", 78, "3"], ["223", 79, "7"], ["223", 80, "10"], ["223", 81, "8"], ["223", 82, "13"], ["223", 83, "11"], ["223", 84, "12"], ["223", 85, "11"], ["223", 86, "11"], ["223", 87, "12"], ["223", 88, "17"], ["223", 89, "15"], ["223", 90, "15"], ["223", 91, "15"], ["223", 92, "11"], ["223", 93, "9"], ["223", 94, "10"], ["223", 95, "8"], ["223", 96, "7"], ["223", 97, "8"], ["223", 98, "7"], ["223", 99, "10"], ["223", 100, "10"], ["223", 101, "11"], ["223", 102, "12"], ["223", 103, "10"], ["223", 104, "12"], ["223", 105, "15"], ["223", 106, "13"], ["223", 107, "12"], ["223", 108, "11"], ["223", 109, "13"], ["223", 110, "12"], ["223", 111, "8"], ["223", 112, "9"], ["223", 113, "8"], ["223", 114, "10"], ["223", 115, "9"], ["223", 116, "11"], ["223", 117, "10"], ["223", 118, "5"], ["223", 119, "7"], ["223", 120, "6"], ["223", 121, "4"], ["223", 122, "3"], ["223", 123, "3"], ["223", 124, "4"], ["223", 125, "5"], ["223", 126, "6"], ["223", 127, "6"], ["223", 128, "9"], ["223", 129, "7"], ["223", 130, "7"], ["223", 131, "6"], ["223", 132, "5"], ["223", 133, "5"], ["223", 134, "6"], ["223", 135, "5"], ["223", 136, "5"], ["223", 137, "4"], ["223", 138, "4"], ["223", 139, "3"], ["223", 140, "4"], ["223", 141, "3"], ["223", 142, "5"], ["223", 143, "4"], ["223", 144, "2"], ["223", 145, "1"], ["223", 146, "2"], ["223", 147, "1"], ["223", 148, "1"], ["224", 2, "3"], ["224", 3, "3"], ["224", 4, "5"], ["224", 5, "8"], ["224", 6, "8"], ["224", 7, "10"], ["224", 8, "12"], ["224", 9, "13"], ["224", 10, "17"], ["224", 11, "19"], ["224", 12, "21"], ["224", 13, "21"], ["224", 14, "23"], ["224", 15, "23"], ["224", 16, "23"], ["224", 17, "23"], ["224", 18, "23"], ["224", 19, "23"], ["224", 20, "23"], ["224", 21, "21"], ["224", 22, "21"], ["224", 23, "22"], ["224", 24, "23"], ["224", 25, "22"], ["224", 26, "21"], ["224", 27, "23"], ["224", 28, "22"], ["224", 29, "23"], ["224", 30, "23"], ["224", 31, "23"], ["224", 32, "23"], ["224", 33, "23"], ["224", 34, "23"], ["224", 35, "22"], ["224", 36, "22"], ["224", 37, "22"], ["224", 38, "23"], ["224", 39, "21"], ["224", 40, "20"], ["224", 41, "19"], ["224", 42, "19"], ["224", 43, "17"], ["224", 44, "16"], ["224", 45, "18"], ["224", 46, "14"], ["224", 47, "12"], ["224", 48, "10"], ["224", 49, "10"], ["224", 50, "12"], ["224", 51, "12"], ["224", 52, "8"], ["224", 53, "8"], ["224", 54, "7"], ["224", 55, "8"], ["224", 56, "5"], ["224", 57, "8"], ["224", 58, "6"], ["224", 59, "6"], ["224", 60, "2"], ["224", 61, "2"], ["224", 62, "3"], ["224", 63, "2"], ["224", 64, "2"], ["224", 65, "2"], ["224", 66, "1"], ["224", 67, "2"], ["224", 68, "2"], ["224", 69, "2"], ["224", 70, "2"], ["224", 71, "1"], ["224", 72, "1"], ["224", 73, "1"], ["224", 74, "1"], ["224", 75, "1"], ["224", 76, "2"], ["224", 77, "1"], ["224", 78, "3"], ["224", 79, "7"], ["224", 80, "10"], ["224", 81, "8"], ["224", 82, "13"], ["224", 83, "11"], ["224", 84, "12"], ["224", 85, "11"], ["224", 86, "11"], ["224", 87, "12"], ["224", 88, "17"], ["224", 89, "15"], ["224", 90, "15"], ["224", 91, "15"], ["224", 92, "11"], ["224", 93, "9"], ["224", 94, "10"], ["224", 95, "8"], ["224", 96, "7"], ["224", 97, "8"], ["224", 98, "7"], ["224", 99, "10"], ["224", 100, "10"], ["224", 101, "11"], ["224", 102, "12"], ["224", 103, "10"], ["224", 104, "12"], ["224", 105, "15"], ["224", 106, "13"], ["224", 107, "12"], ["224", 108, "11"], ["224", 109, "13"], ["224", 110, "12"], ["224", 111, "8"], ["224", 112, "9"], ["224", 113, "8"], ["224", 114, "10"], ["224", 115, "9"], ["224", 116, "11"], ["224", 117, "10"], ["224", 118, "5"], ["224", 119, "7"], ["224", 120, "6"], ["224", 121, "4"], ["224", 122, "3"], ["224", 123, "3"], ["224", 124, "4"], ["224", 125, "5"], ["224", 126, "6"], ["224", 127, "6"], ["224", 128, "9"], ["224", 129, "7"], ["224", 130, "7"], ["224", 131, "6"], ["224", 132, "5"], ["224", 133, "5"], ["224", 134, "6"], ["224", 135, "5"], ["224", 136, "5"], ["224", 137, "4"], ["224", 138, "4"], ["224", 139, "3"], ["224", 140, "4"], ["224", 141, "3"], ["224", 142, "5"], ["224", 143, "4"], ["224", 144, "2"], ["224", 145, "1"], ["224", 146, "2"], ["224", 147, "1"], ["224", 148, "1"], ["225", 2, "3"], ["225", 3, "3"], ["225", 4, "5"], ["225", 5, "8"], ["225", 6, "8"], ["225", 7, "10"], ["225", 8, "12"], ["225", 9, "13"], ["225", 10, "17"], ["225", 11, "19"], ["225", 12, "21"], ["225", 13, "21"], ["225", 14, "23"], ["225", 15, "23"], ["225", 16, "23"], ["225", 17, "23"], ["225", 18, "23"], ["225", 19, "23"], ["225", 20, "23"], ["225", 21, "21"], ["225", 22, "21"], ["225", 23, "22"], ["225", 24, "23"], ["225", 25, "22"], ["225", 26, "21"], ["225", 27, "23"], ["225", 28, "22"], ["225", 29, "23"], ["225", 30, "23"], ["225", 31, "23"], ["225", 32, "23"], ["225", 33, "23"], ["225", 34, "23"], ["225", 35, "22"], ["225", 36, "22"], ["225", 37, "22"], ["225", 38, "23"], ["225", 39, "21"], ["225", 40, "20"], ["225", 41, "19"], ["225", 42, "19"], ["225", 43, "17"], ["225", 44, "16"], ["225", 45, "18"], ["225", 46, "14"], ["225", 47, "12"], ["225", 48, "10"], ["225", 49, "10"], ["225", 50, "12"], ["225", 51, "12"], ["225", 52, "8"], ["225", 53, "8"], ["225", 54, "7"], ["225", 55, "8"], ["225", 56, "5"], ["225", 57, "8"], ["225", 58, "6"], ["225", 59, "6"], ["225", 60, "2"], ["225", 61, "2"], ["225", 62, "3"], ["225", 63, "2"], ["225", 64, "2"], ["225", 65, "2"], ["225", 66, "1"], ["225", 67, "2"], ["225", 68, "2"], ["225", 69, "2"], ["225", 70, "2"], ["225", 71, "1"], ["225", 72, "1"], ["225", 73, "1"], ["225", 74, "1"], ["225", 75, "1"], ["225", 76, "2"], ["225", 77, "1"], ["225", 78, "3"], ["225", 79, "7"], ["225", 80, "10"], ["225", 81, "8"], ["225", 82, "13"], ["225", 83, "11"], ["225", 84, "12"], ["225", 85, "11"], ["225", 86, "11"], ["225", 87, "12"], ["225", 88, "17"], ["225", 89, "15"], ["225", 90, "15"], ["225", 91, "15"], ["225", 92, "11"], ["225", 93, "9"], ["225", 94, "10"], ["225", 95, "8"], ["225", 96, "7"], ["225", 97, "8"], ["225", 98, "7"], ["225", 99, "10"], ["225", 100, "10"], ["225", 101, "11"], ["225", 102, "12"], ["225", 103, "10"], ["225", 104, "12"], ["225", 105, "15"], ["225", 106, "13"], ["225", 107, "12"], ["225", 108, "11"], ["225", 109, "13"], ["225", 110, "12"], ["225", 111, "8"], ["225", 112, "9"], ["225", 113, "8"], ["225", 114, "10"], ["225", 115, "9"], ["225", 116, "11"], ["225", 117, "10"], ["225", 118, "5"], ["225", 119, "7"], ["225", 120, "6"], ["225", 121, "4"], ["225", 122, "3"], ["225", 123, "3"], ["225", 124, "4"], ["225", 125, "5"], ["225", 126, "6"], ["225", 127, "6"], ["225", 128, "9"], ["225", 129, "7"], ["225", 130, "7"], ["225", 131, "6"], ["225", 132, "5"], ["225", 133, "5"], ["225", 134, "6"], ["225", 135, "5"], ["225", 136, "5"], ["225", 137, "4"], ["225", 138, "4"], ["225", 139, "3"], ["225", 140, "4"], ["225", 141, "3"], ["225", 142, "5"], ["225", 143, "4"], ["225", 144, "2"], ["225", 145, "1"], ["225", 146, "2"], ["225", 147, "1"], ["225", 148, "1"], ["226", null, "1"], ["226", 1, "4"], ["226", 2, "5"], ["226", 3, "6"], ["226", 4, "7"], ["226", 5, "13"], ["226", 6, "15"], ["226", 7, "18"], ["226", 8, "18"], ["226", 9, "21"], ["226", 10, "22"], ["226", 11, "22"], ["226", 12, "22"], ["226", 13, "23"], ["226", 14, "23"], ["226", 15, "23"], ["226", 16, "23"], ["226", 17, "23"], ["226", 18, "23"], ["226", 19, "23"], ["226", 20, "23"], ["226", 21, "22"], ["226", 22, "22"], ["226", 23, "23"], ["226", 24, "23"], ["226", 25, "22"], ["226", 26, "22"], ["226", 27, "23"], ["226", 28, "23"], ["226", 29, "23"], ["226", 30, "23"], ["226", 31, "23"], ["226", 32, "23"], ["226", 33, "23"], ["226", 34, "23"], ["226", 35, "22"], ["226", 36, "22"], ["226", 37, "23"], ["226", 38, "23"], ["226", 39, "23"], ["226", 40, "23"], ["226", 41, "20"], ["226", 42, "21"], ["226", 43, "19"], ["226", 44, "18"], ["226", 45, "19"], ["226", 46, "17"], ["226", 47, "15"], ["226", 48, "17"], ["226", 49, "16"], ["226", 50, "15"], ["226", 51, "12"], ["226", 52, "11"], ["226", 53, "10"], ["226", 54, "12"], ["226", 55, "9"], ["226", 56, "8"], ["226", 57, "10"], ["226", 58, "9"], ["226", 59, "9"], ["226", 60, "5"], ["226", 61, "3"], ["226", 62, "4"], ["226", 63, "3"], ["226", 64, "2"], ["226", 65, "4"], ["226", 66, "4"], ["226", 67, "2"], ["226", 68, "4"], ["226", 69, "4"], ["226", 70, "3"], ["226", 71, "2"], ["226", 72, "2"], ["226", 73, "2"], ["226", 74, "2"], ["226", 75, "2"], ["226", 76, "3"], ["226", 77, "4"], ["226", 78, "8"], ["226", 79, "12"], ["226", 80, "14"], ["226", 81, "14"], ["226", 82, "14"], ["226", 83, "17"], ["226", 84, "18"], ["226", 85, "14"], ["226", 86, "20"], ["226", 87, "18"], ["226", 88, "18"], ["226", 89, "20"], ["226", 90, "18"], ["226", 91, "17"], ["226", 92, "18"], ["226", 93, "14"], ["226", 94, "13"], ["226", 95, "11"], ["226", 96, "13"], ["226", 97, "14"], ["226", 98, "15"], ["226", 99, "15"], ["226", 100, "17"], ["226", 101, "15"], ["226", 102, "16"], ["226", 103, "17"], ["226", 104, "16"], ["226", 105, "17"], ["226", 106, "18"], ["226", 107, "18"], ["226", 108, "20"], ["226", 109, "14"], ["226", 110, "17"], ["226", 111, "14"], ["226", 112, "18"], ["226", 113, "14"], ["226", 114, "14"], ["226", 115, "13"], ["226", 116, "13"], ["226", 117, "11"], ["226", 118, "13"], ["226", 119, "11"], ["226", 120, "8"], ["226", 121, "7"], ["226", 122, "6"], ["226", 123, "7"], ["226", 124, "7"], ["226", 125, "8"], ["226", 126, "10"], ["226", 127, "12"], ["226", 128, "10"], ["226", 129, "9"], ["226", 130, "9"], ["226", 131, "6"], ["226", 132, "6"], ["226", 133, "5"], ["226", 134, "5"], ["226", 135, "5"], ["226", 136, "5"], ["226", 137, "4"], ["226", 138, "4"], ["226", 139, "3"], ["226", 140, "4"], ["226", 141, "3"], ["226", 142, "5"], ["226", 143, "3"], ["226", 144, "3"], ["226", 145, "2"], ["226", 146, "2"], ["226", 147, "2"], ["226", 148, "1"], ["226", 149, "1"], ["227", null, "1"], ["227", 1, "4"], ["227", 2, "5"], ["227", 3, "6"], ["227", 4, "7"], ["227", 5, "13"], ["227", 6, "15"], ["227", 7, "18"], ["227", 8, "18"], ["227", 9, "21"], ["227", 10, "22"], ["227", 11, "22"], ["227", 12, "22"], ["227", 13, "23"], ["227", 14, "23"], ["227", 15, "23"], ["227", 16, "23"], ["227", 17, "23"], ["227", 18, "23"], ["227", 19, "23"], ["227", 20, "23"], ["227", 21, "22"], ["227", 22, "22"], ["227", 23, "23"], ["227", 24, "23"], ["227", 25, "22"], ["227", 26, "22"], ["227", 27, "23"], ["227", 28, "23"], ["227", 29, "23"], ["227", 30, "23"], ["227", 31, "23"], ["227", 32, "23"], ["227", 33, "23"], ["227", 34, "23"], ["227", 35, "22"], ["227", 36, "22"], ["227", 37, "23"], ["227", 38, "23"], ["227", 39, "23"], ["227", 40, "23"], ["227", 41, "20"], ["227", 42, "21"], ["227", 43, "19"], ["227", 44, "18"], ["227", 45, "19"], ["227", 46, "17"], ["227", 47, "15"], ["227", 48, "17"], ["227", 49, "16"], ["227", 50, "15"], ["227", 51, "12"], ["227", 52, "11"], ["227", 53, "10"], ["227", 54, "12"], ["227", 55, "9"], ["227", 56, "8"], ["227", 57, "10"], ["227", 58, "9"], ["227", 59, "9"], ["227", 60, "5"], ["227", 61, "3"], ["227", 62, "4"], ["227", 63, "3"], ["227", 64, "2"], ["227", 65, "4"], ["227", 66, "4"], ["227", 67, "2"], ["227", 68, "4"], ["227", 69, "4"], ["227", 70, "3"], ["227", 71, "2"], ["227", 72, "2"], ["227", 73, "2"], ["227", 74, "2"], ["227", 75, "2"], ["227", 76, "3"], ["227", 77, "4"], ["227", 78, "8"], ["227", 79, "12"], ["227", 80, "14"], ["227", 81, "14"], ["227", 82, "14"], ["227", 83, "17"], ["227", 84, "18"], ["227", 85, "14"], ["227", 86, "20"], ["227", 87, "18"], ["227", 88, "18"], ["227", 89, "20"], ["227", 90, "18"], ["227", 91, "17"], ["227", 92, "18"], ["227", 93, "14"], ["227", 94, "13"], ["227", 95, "11"], ["227", 96, "13"], ["227", 97, "14"], ["227", 98, "15"], ["227", 99, "15"], ["227", 100, "17"], ["227", 101, "15"], ["227", 102, "16"], ["227", 103, "17"], ["227", 104, "16"], ["227", 105, "17"], ["227", 106, "18"], ["227", 107, "18"], ["227", 108, "20"], ["227", 109, "14"], ["227", 110, "17"], ["227", 111, "14"], ["227", 112, "18"], ["227", 113, "14"], ["227", 114, "14"], ["227", 115, "13"], ["227", 116, "13"], ["227", 117, "11"], ["227", 118, "13"], ["227", 119, "11"], ["227", 120, "8"], ["227", 121, "7"], ["227", 122, "6"], ["227", 123, "7"], ["227", 124, "7"], ["227", 125, "8"], ["227", 126, "10"], ["227", 127, "12"], ["227", 128, "10"], ["227", 129, "9"], ["227", 130, "9"], ["227", 131, "6"], ["227", 132, "6"], ["227", 133, "5"], ["227", 134, "5"], ["227", 135, "5"], ["227", 136, "5"], ["227", 137, "4"], ["227", 138, "4"], ["227", 139, "3"], ["227", 140, "4"], ["227", 141, "3"], ["227", 142, "5"], ["227", 143, "3"], ["227", 144, "3"], ["227", 145, "2"], ["227", 146, "2"], ["227", 147, "2"], ["227", 148, "1"], ["227", 149, "1"], ["228", null, "2"], ["228", 1, "2"], ["228", 2, "5"], ["228", 3, "7"], ["228", 4, "7"], ["228", 5, "15"], ["228", 6, "20"], ["228", 7, "21"], ["228", 8, "21"], ["228", 9, "20"], ["228", 10, "23"], ["228", 11, "22"], ["228", 12, "22"], ["228", 13, "23"], ["228", 14, "23"], ["228", 15, "23"], ["228", 16, "23"], ["228", 17, "23"], ["228", 18, "23"], ["228", 19, "23"], ["228", 20, "23"], ["228", 21, "22"], ["228", 22, "22"], ["228", 23, "23"], ["228", 24, "22"], ["228", 25, "22"], ["228", 26, "22"], ["228", 27, "23"], ["228", 28, "23"], ["228", 29, "22"], ["228", 30, "23"], ["228", 31, "23"], ["228", 32, "23"], ["228", 33, "23"], ["228", 34, "22"], ["228", 35, "21"], ["228", 36, "21"], ["228", 37, "22"], ["228", 38, "22"], ["228", 39, "20"], ["228", 40, "21"], ["228", 41, "20"], ["228", 42, "20"], ["228", 43, "17"], ["228", 44, "20"], ["228", 45, "18"], ["228", 46, "17"], ["228", 47, "19"], ["228", 48, "17"], ["228", 49, "14"], ["228", 50, "14"], ["228", 51, "10"], ["228", 52, "11"], ["228", 53, "9"], ["228", 54, "12"], ["228", 55, "8"], ["228", 56, "8"], ["228", 57, "10"], ["228", 58, "10"], ["228", 59, "6"], ["228", 60, "5"], ["228", 61, "5"], ["228", 62, "5"], ["228", 63, "4"], ["228", 64, "5"], ["228", 65, "5"], ["228", 66, "8"], ["228", 67, "4"], ["228", 68, "5"], ["228", 69, "5"], ["228", 70, "4"], ["228", 71, "3"], ["228", 72, "3"], ["228", 73, "3"], ["228", 74, "3"], ["228", 75, "4"], ["228", 76, "4"], ["228", 77, "8"], ["228", 78, "8"], ["228", 79, "12"], ["228", 80, "12"], ["228", 81, "12"], ["228", 82, "14"], ["228", 83, "13"], ["228", 84, "12"], ["228", 85, "15"], ["228", 86, "18"], ["228", 87, "17"], ["228", 88, "18"], ["228", 89, "16"], ["228", 90, "17"], ["228", 91, "18"], ["228", 92, "12"], ["228", 93, "14"], ["228", 94, "13"], ["228", 95, "11"], ["228", 96, "15"], ["228", 97, "16"], ["228", 98, "15"], ["228", 99, "18"], ["228", 100, "15"], ["228", 101, "16"], ["228", 102, "16"], ["228", 103, "17"], ["228", 104, "16"], ["228", 105, "20"], ["228", 106, "19"], ["228", 107, "18"], ["228", 108, "17"], ["228", 109, "19"], ["228", 110, "15"], ["228", 111, "18"], ["228", 112, "17"], ["228", 113, "16"], ["228", 114, "18"], ["228", 115, "15"], ["228", 116, "15"], ["228", 117, "12"], ["228", 118, "13"], ["228", 119, "11"], ["228", 120, "8"], ["228", 121, "8"], ["228", 122, "6"], ["228", 123, "9"], ["228", 124, "13"], ["228", 125, "10"], ["228", 126, "14"], ["228", 127, "11"], ["228", 128, "10"], ["228", 129, "9"], ["228", 130, "9"], ["228", 131, "5"], ["228", 132, "7"], ["228", 133, "6"], ["228", 134, "5"], ["228", 135, "6"], ["228", 136, "7"], ["228", 137, "5"], ["228", 138, "6"], ["228", 139, "5"], ["228", 140, "5"], ["228", 141, "5"], ["228", 142, "3"], ["228", 143, "3"], ["228", 144, "3"], ["228", 145, "3"], ["228", 146, "2"], ["228", 147, "1"], ["228", 150, "1"], ["228", 169, "1"], ["228", 187, "1"], ["230", null, "1"], ["230", null, "3"], ["230", 1, "5"], ["230", 2, "10"], ["230", 3, "15"], ["230", 4, "20"], ["230", 5, "22"], ["230", 6, "22"], ["230", 7, "22"], ["230", 8, "22"], ["230", 9, "22"], ["230", 10, "22"], ["230", 11, "23"], ["230", 12, "23"], ["230", 13, "23"], ["230", 14, "23"], ["230", 15, "23"], ["230", 16, "23"], ["230", 17, "23"], ["230", 18, "23"], ["230", 19, "23"], ["230", 20, "23"], ["230", 21, "22"], ["230", 22, "22"], ["230", 23, "23"], ["230", 24, "23"], ["230", 25, "22"], ["230", 26, "22"], ["230", 27, "23"], ["230", 28, "22"], ["230", 29, "22"], ["230", 30, "23"], ["230", 31, "22"], ["230", 32, "22"], ["230", 33, "22"], ["230", 34, "21"], ["230", 35, "20"], ["230", 36, "20"], ["230", 37, "21"], ["230", 38, "21"], ["230", 39, "21"], ["230", 40, "22"], ["230", 41, "21"], ["230", 42, "20"], ["230", 43, "20"], ["230", 44, "20"], ["230", 45, "18"], ["230", 46, "20"], ["230", 47, "22"], ["230", 48, "21"], ["230", 49, "21"], ["230", 50, "18"], ["230", 51, "15"], ["230", 52, "14"], ["230", 53, "13"], ["230", 54, "15"], ["230", 55, "14"], ["230", 56, "12"], ["230", 57, "16"], ["230", 58, "11"], ["230", 59, "10"], ["230", 60, "10"], ["230", 61, "8"], ["230", 62, "11"], ["230", 63, "8"], ["230", 64, "9"], ["230", 65, "11"], ["230", 66, "9"], ["230", 67, "10"], ["230", 68, "5"], ["230", 69, "8"], ["230", 70, "6"], ["230", 71, "7"], ["230", 72, "6"], ["230", 73, "6"], ["230", 74, "7"], ["230", 75, "5"], ["230", 76, "11"], ["230", 77, "13"], ["230", 78, "14"], ["230", 79, "14"], ["230", 80, "14"], ["230", 81, "19"], ["230", 82, "16"], ["230", 83, "17"], ["230", 84, "15"], ["230", 85, "18"], ["230", 86, "20"], ["230", 87, "19"], ["230", 88, "21"], ["230", 89, "21"], ["230", 90, "20"], ["230", 91, "21"], ["230", 92, "18"], ["230", 93, "19"], ["230", 94, "20"], ["230", 95, "16"], ["230", 96, "20"], ["230", 97, "23"], ["230", 98, "21"], ["230", 99, "21"], ["230", 100, "20"], ["230", 101, "20"], ["230", 102, "22"], ["230", 103, "22"], ["230", 104, "21"], ["230", 105, "20"], ["230", 106, "19"], ["230", 107, "21"], ["230", 108, "20"], ["230", 109, "20"], ["230", 110, "20"], ["230", 111, "20"], ["230", 112, "21"], ["230", 113, "20"], ["230", 114, "21"], ["230", 115, "18"], ["230", 116, "19"], ["230", 117, "20"], ["230", 118, "17"], ["230", 119, "15"], ["230", 120, "15"], ["230", 121, "13"], ["230", 122, "14"], ["230", 123, "14"], ["230", 124, "17"], ["230", 125, "16"], ["230", 126, "15"], ["230", 127, "14"], ["230", 128, "13"], ["230", 129, "12"], ["230", 130, "13"], ["230", 131, "12"], ["230", 132, "11"], ["230", 133, "8"], ["230", 134, "9"], ["230", 135, "8"], ["230", 136, "7"], ["230", 137, "8"], ["230", 138, "9"], ["230", 139, "6"], ["230", 140, "7"], ["230", 141, "6"], ["230", 142, "6"], ["230", 143, "3"], ["230", 144, "4"], ["230", 145, "4"], ["230", 146, "3"], ["230", 147, "2"], ["230", 148, "1"], ["230", 149, "1"], ["230", 150, "1"], ["230", 168, "1"], ["230", 169, "1"], ["230", 175, "1"], ["230", 176, "1"], ["230", 178, "1"], ["230", null, "1"], ["230", null, "1"], ["231", null, "1"], ["231", null, "2"], ["231", 1, "9"], ["231", 2, "11"], ["231", 3, "13"], ["231", 4, "19"], ["231", 5, "22"], ["231", 6, "21"], ["231", 7, "22"], ["231", 8, "23"], ["231", 9, "23"], ["231", 10, "23"], ["231", 11, "23"], ["231", 12, "23"], ["231", 13, "23"], ["231", 14, "23"], ["231", 15, "23"], ["231", 16, "23"], ["231", 17, "23"], ["231", 18, "23"], ["231", 19, "23"], ["231", 20, "23"], ["231", 21, "22"], ["231", 22, "22"], ["231", 23, "23"], ["231", 24, "23"], ["231", 25, "21"], ["231", 26, "22"], ["231", 27, "23"], ["231", 28, "22"], ["231", 29, "23"], ["231", 30, "23"], ["231", 31, "23"], ["231", 32, "22"], ["231", 33, "22"], ["231", 34, "22"], ["231", 35, "21"], ["231", 36, "20"], ["231", 37, "21"], ["231", 38, "21"], ["231", 39, "21"], ["231", 40, "22"], ["231", 41, "21"], ["231", 42, "19"], ["231", 43, "19"], ["231", 44, "19"], ["231", 45, "17"], ["231", 46, "22"], ["231", 47, "20"], ["231", 48, "22"], ["231", 49, "22"], ["231", 50, "17"], ["231", 51, "16"], ["231", 52, "14"], ["231", 53, "17"], ["231", 54, "14"], ["231", 55, "15"], ["231", 56, "14"], ["231", 57, "15"], ["231", 58, "11"], ["231", 59, "12"], ["231", 60, "13"], ["231", 61, "12"], ["231", 62, "10"], ["231", 63, "10"], ["231", 64, "11"], ["231", 65, "11"], ["231", 66, "12"], ["231", 67, "11"], ["231", 68, "8"], ["231", 69, "9"], ["231", 70, "8"], ["231", 71, "8"], ["231", 72, "7"], ["231", 73, "8"], ["231", 74, "9"], ["231", 75, "8"], ["231", 76, "13"], ["231", 77, "13"], ["231", 78, "15"], ["231", 79, "17"], ["231", 80, "18"], ["231", 81, "18"], ["231", 82, "17"], ["231", 83, "18"], ["231", 84, "18"], ["231", 85, "18"], ["231", 86, "19"], ["231", 87, "20"], ["231", 88, "20"], ["231", 89, "20"], ["231", 90, "20"], ["231", 91, "20"], ["231", 92, "17"], ["231", 93, "18"], ["231", 94, "19"], ["231", 95, "19"], ["231", 96, "21"], ["231", 97, "23"], ["231", 98, "22"], ["231", 99, "21"], ["231", 100, "22"], ["231", 101, "21"], ["231", 102, "21"], ["231", 103, "21"], ["231", 104, "20"], ["231", 105, "19"], ["231", 106, "20"], ["231", 107, "22"], ["231", 108, "21"], ["231", 109, "20"], ["231", 110, "21"], ["231", 111, "20"], ["231", 112, "19"], ["231", 113, "19"], ["231", 114, "20"], ["231", 115, "19"], ["231", 116, "20"], ["231", 117, "18"], ["231", 118, "17"], ["231", 119, "17"], ["231", 120, "16"], ["231", 121, "14"], ["231", 122, "16"], ["231", 123, "17"], ["231", 124, "16"], ["231", 125, "16"], ["231", 126, "15"], ["231", 127, "13"], ["231", 128, "15"], ["231", 129, "12"], ["231", 130, "14"], ["231", 131, "14"], ["231", 132, "11"], ["231", 133, "10"], ["231", 134, "12"], ["231", 135, "9"], ["231", 136, "11"], ["231", 137, "11"], ["231", 138, "11"], ["231", 139, "8"], ["231", 140, "6"], ["231", 141, "5"], ["231", 142, "6"], ["231", 143, "6"], ["231", 144, "5"], ["231", 145, "3"], ["231", 146, "4"], ["231", 147, "1"], ["231", 148, "2"], ["231", 149, "1"], ["231", 150, "1"], ["231", 168, "1"], ["231", 169, "1"], ["231", 174, "1"], ["231", 175, "1"], ["231", 176, "2"], ["231", 177, "1"], ["231", 178, "1"], ["232", null, "1"], ["232", null, "2"], ["232", 1, "9"], ["232", 2, "11"], ["232", 3, "13"], ["232", 4, "19"], ["232", 5, "22"], ["232", 6, "21"], ["232", 7, "22"], ["232", 8, "23"], ["232", 9, "23"], ["232", 10, "23"], ["232", 11, "23"], ["232", 12, "23"], ["232", 13, "23"], ["232", 14, "23"], ["232", 15, "23"], ["232", 16, "23"], ["232", 17, "23"], ["232", 18, "23"], ["232", 19, "23"], ["232", 20, "23"], ["232", 21, "22"], ["232", 22, "22"], ["232", 23, "23"], ["232", 24, "23"], ["232", 25, "21"], ["232", 26, "22"], ["232", 27, "23"], ["232", 28, "22"], ["232", 29, "23"], ["232", 30, "23"], ["232", 31, "23"], ["232", 32, "22"], ["232", 33, "22"], ["232", 34, "22"], ["232", 35, "21"], ["232", 36, "20"], ["232", 37, "21"], ["232", 38, "21"], ["232", 39, "21"], ["232", 40, "22"], ["232", 41, "21"], ["232", 42, "19"], ["232", 43, "19"], ["232", 44, "19"], ["232", 45, "17"], ["232", 46, "22"], ["232", 47, "20"], ["232", 48, "22"], ["232", 49, "22"], ["232", 50, "17"], ["232", 51, "16"], ["232", 52, "14"], ["232", 53, "17"], ["232", 54, "14"], ["232", 55, "15"], ["232", 56, "14"], ["232", 57, "15"], ["232", 58, "11"], ["232", 59, "12"], ["232", 60, "13"], ["232", 61, "12"], ["232", 62, "10"], ["232", 63, "10"], ["232", 64, "11"], ["232", 65, "11"], ["232", 66, "12"], ["232", 67, "11"], ["232", 68, "8"], ["232", 69, "9"], ["232", 70, "8"], ["232", 71, "8"], ["232", 72, "7"], ["232", 73, "8"], ["232", 74, "9"], ["232", 75, "8"], ["232", 76, "13"], ["232", 77, "13"], ["232", 78, "15"], ["232", 79, "17"], ["232", 80, "18"], ["232", 81, "18"], ["232", 82, "17"], ["232", 83, "18"], ["232", 84, "18"], ["232", 85, "18"], ["232", 86, "19"], ["232", 87, "20"], ["232", 88, "20"], ["232", 89, "20"], ["232", 90, "20"], ["232", 91, "20"], ["232", 92, "17"], ["232", 93, "18"], ["232", 94, "19"], ["232", 95, "19"], ["232", 96, "21"], ["232", 97, "23"], ["232", 98, "22"], ["232", 99, "21"], ["232", 100, "22"], ["232", 101, "21"], ["232", 102, "21"], ["232", 103, "21"], ["232", 104, "20"], ["232", 105, "19"], ["232", 106, "20"], ["232", 107, "22"], ["232", 108, "21"], ["232", 109, "20"], ["232", 110, "21"], ["232", 111, "20"], ["232", 112, "19"], ["232", 113, "19"], ["232", 114, "20"], ["232", 115, "19"], ["232", 116, "20"], ["232", 117, "18"], ["232", 118, "17"], ["232", 119, "17"], ["232", 120, "16"], ["232", 121, "14"], ["232", 122, "16"], ["232", 123, "17"], ["232", 124, "16"], ["232", 125, "16"], ["232", 126, "15"], ["232", 127, "13"], ["232", 128, "15"], ["232", 129, "12"], ["232", 130, "14"], ["232", 131, "14"], ["232", 132, "11"], ["232", 133, "10"], ["232", 134, "12"], ["232", 135, "9"], ["232", 136, "11"], ["232", 137, "11"], ["232", 138, "11"], ["232", 139, "8"], ["232", 140, "6"], ["232", 141, "5"], ["232", 142, "6"], ["232", 143, "6"], ["232", 144, "5"], ["232", 145, "3"], ["232", 146, "4"], ["232", 147, "1"], ["232", 148, "2"], ["232", 149, "1"], ["232", 150, "1"], ["232", 168, "1"], ["232", 169, "1"], ["232", 174, "1"], ["232", 175, "1"], ["232", 176, "2"], ["232", 177, "1"], ["232", 178, "1"], ["233", 1, "1"], ["233", 2, "1"], ["233", 3, "2"], ["233", 4, "1"], ["233", 5, "3"], ["233", 6, "2"], ["233", 7, "5"], ["233", 8, "4"], ["233", 9, "3"], ["233", 10, "6"], ["233", 11, "4"], ["233", 12, "7"], ["233", 13, "10"], ["233", 14, "10"], ["233", 15, "8"], ["233", 16, "10"], ["233", 17, "13"], ["233", 18, "14"], ["233", 19, "14"], ["233", 20, "14"], ["233", 21, "14"], ["233", 22, "9"], ["233", 23, "7"], ["233", 24, "14"], ["233", 25, "16"], ["233", 26, "13"], ["233", 27, "18"], ["233", 28, "14"], ["233", 29, "11"], ["233", 30, "19"], ["233", 31, "17"], ["233", 32, "17"], ["233", 33, "17"], ["233", 34, "16"], ["233", 35, "15"], ["233", 36, "15"], ["233", 37, "16"], ["233", 38, "14"], ["233", 39, "15"], ["233", 40, "14"], ["233", 41, "11"], ["233", 42, "8"], ["233", 43, "10"], ["233", 44, "8"], ["233", 45, "8"], ["233", 46, "12"], ["233", 47, "10"], ["233", 48, "8"], ["233", 49, "8"], ["233", 50, "6"], ["233", 51, "4"], ["233", 52, "2"], ["233", 53, "8"], ["233", 54, "3"], ["233", 55, "6"], ["233", 56, "8"], ["233", 57, "5"], ["233", 58, "6"], ["233", 59, "5"], ["233", 60, "4"], ["233", 61, "7"], ["233", 62, "6"], ["233", 63, "8"], ["233", 64, "10"], ["233", 65, "9"], ["233", 66, "7"], ["233", 67, "8"], ["233", 68, "4"], ["233", 69, "5"], ["233", 70, "4"], ["233", 71, "3"], ["233", 72, "7"], ["233", 73, "6"], ["233", 74, "6"], ["233", 75, "7"], ["233", 76, "6"], ["233", 77, "10"], ["233", 78, "10"], ["233", 79, "8"], ["233", 80, "9"], ["233", 81, "8"], ["233", 82, "9"], ["233", 83, "7"], ["233", 84, "6"], ["233", 85, "10"], ["233", 86, "11"], ["233", 87, "11"], ["233", 88, "10"], ["233", 89, "7"], ["233", 90, "6"], ["233", 91, "5"], ["233", 92, "3"], ["233", 93, "8"], ["233", 94, "10"], ["233", 95, "11"], ["233", 96, "15"], ["233", 97, "19"], ["233", 98, "16"], ["233", 99, "17"], ["233", 100, "17"], ["233", 101, "19"], ["233", 102, "17"], ["233", 103, "18"], ["233", 104, "16"], ["233", 105, "17"], ["233", 106, "15"], ["233", 107, "17"], ["233", 108, "17"], ["233", 109, "16"], ["233", 110, "18"], ["233", 111, "19"], ["233", 112, "13"], ["233", 113, "18"], ["233", 114, "16"], ["233", 115, "15"], ["233", 116, "13"], ["233", 117, "14"], ["233", 118, "11"], ["233", 119, "11"], ["233", 120, "11"], ["233", 121, "8"], ["233", 122, "8"], ["233", 123, "10"], ["233", 124, "10"], ["233", 125, "10"], ["233", 126, "10"], ["233", 127, "7"], ["233", 128, "6"], ["233", 129, "7"], ["233", 130, "8"], ["233", 131, "6"], ["233", 132, "8"], ["233", 133, "10"], ["233", 134, "8"], ["233", 135, "7"], ["233", 136, "9"], ["233", 137, "7"], ["233", 138, "5"], ["233", 139, "6"], ["233", 140, "6"], ["233", 141, "3"], ["233", 142, "5"], ["233", 143, "5"], ["233", 144, "6"], ["233", 145, "4"], ["233", 146, "3"], ["233", 147, "1"], ["233", 149, "1"], ["233", 163, "1"], ["233", 164, "1"], ["233", 167, "1"], ["233", 168, "1"], ["233", 169, "1"], ["233", 173, "1"], ["233", 174, "1"], ["233", 175, "1"], ["233", 176, "2"], ["233", 177, "1"], ["233", 178, "1"], ["234", 1, "1"], ["234", 2, "1"], ["234", 4, "1"], ["234", 5, "1"], ["234", 6, "1"], ["234", 7, "2"], ["234", 8, "1"], ["234", 9, "2"], ["234", 10, "3"], ["234", 11, "2"], ["234", 12, "6"], ["234", 13, "9"], ["234", 14, "9"], ["234", 15, "7"], ["234", 16, "6"], ["234", 17, "6"], ["234", 18, "8"], ["234", 19, "10"], ["234", 20, "11"], ["234", 21, "10"], ["234", 22, "4"], ["234", 23, "6"], ["234", 24, "9"], ["234", 25, "13"], ["234", 26, "12"], ["234", 27, "15"], ["234", 28, "13"], ["234", 29, "10"], ["234", 30, "13"], ["234", 31, "15"], ["234", 32, "16"], ["234", 33, "11"], ["234", 34, "13"], ["234", 35, "14"], ["234", 36, "14"], ["234", 37, "15"], ["234", 38, "12"], ["234", 39, "16"], ["234", 40, "10"], ["234", 41, "7"], ["234", 42, "5"], ["234", 43, "8"], ["234", 44, "7"], ["234", 45, "10"], ["234", 46, "10"], ["234", 47, "8"], ["234", 48, "8"], ["234", 49, "8"], ["234", 50, "5"], ["234", 51, "3"], ["234", 52, "2"], ["234", 53, "4"], ["234", 54, "3"], ["234", 55, "4"], ["234", 56, "5"], ["234", 57, "5"], ["234", 58, "5"], ["234", 59, "4"], ["234", 60, "5"], ["234", 61, "6"], ["234", 62, "6"], ["234", 63, "10"], ["234", 64, "8"], ["234", 65, "10"], ["234", 66, "7"], ["234", 67, "6"], ["234", 68, "8"], ["234", 69, "7"], ["234", 70, "5"], ["234", 71, "4"], ["234", 72, "7"], ["234", 73, "7"], ["234", 74, "6"], ["234", 75, "8"], ["234", 76, "6"], ["234", 77, "5"], ["234", 78, "7"], ["234", 79, "7"], ["234", 80, "6"], ["234", 81, "3"], ["234", 82, "7"], ["234", 83, "4"], ["234", 84, "7"], ["234", 85, "8"], ["234", 86, "7"], ["234", 87, "9"], ["234", 88, "6"], ["234", 89, "6"], ["234", 90, "5"], ["234", 91, "3"], ["234", 92, "2"], ["234", 93, "6"], ["234", 94, "5"], ["234", 95, "8"], ["234", 96, "18"], ["234", 97, "15"], ["234", 98, "15"], ["234", 99, "15"], ["234", 100, "16"], ["234", 101, "14"], ["234", 102, "15"], ["234", 103, "17"], ["234", 104, "16"], ["234", 105, "16"], ["234", 106, "13"], ["234", 107, "15"], ["234", 108, "15"], ["234", 109, "17"], ["234", 110, "16"], ["234", 111, "15"], ["234", 112, "12"], ["234", 113, "14"], ["234", 114, "15"], ["234", 115, "13"], ["234", 116, "12"], ["234", 117, "11"], ["234", 118, "10"], ["234", 119, "7"], ["234", 120, "8"], ["234", 121, "7"], ["234", 122, "9"], ["234", 123, "9"], ["234", 124, "7"], ["234", 125, "10"], ["234", 126, "7"], ["234", 127, "5"], ["234", 128, "7"], ["234", 129, "7"], ["234", 130, "7"], ["234", 131, "6"], ["234", 132, "8"], ["234", 133, "11"], ["234", 134, "8"], ["234", 135, "10"], ["234", 136, "7"], ["234", 137, "6"], ["234", 138, "4"], ["234", 139, "7"], ["234", 140, "5"], ["234", 141, "5"], ["234", 142, "5"], ["234", 143, "5"], ["234", 144, "3"], ["234", 145, "3"], ["234", 146, "2"], ["234", 149, "1"], ["234", 151, "1"], ["234", 162, "1"], ["234", 163, "1"], ["234", 167, "1"], ["234", 168, "1"], ["234", 169, "1"], ["234", 172, "1"], ["234", 173, "1"], ["234", 174, "1"], ["234", 175, "1"], ["234", 176, "1"], ["234", 177, "1"], ["234", 178, "1"], ["238", 6, "1"], ["238", 7, "1"], ["238", 8, "1"], ["238", 10, "1"], ["238", 11, "2"], ["238", 12, "3"], ["238", 13, "6"], ["238", 14, "5"], ["238", 15, "1"], ["238", 16, "1"], ["238", 17, "2"], ["238", 18, "2"], ["238", 19, "2"], ["238", 20, "2"], ["238", 21, "1"], ["238", 22, "2"], ["238", 23, "2"], ["238", 24, "2"], ["238", 25, "3"], ["238", 26, "2"], ["238", 27, "1"], ["238", 28, "1"], ["238", 29, "2"], ["238", 30, "5"], ["238", 31, "4"], ["238", 32, "5"], ["238", 33, "5"], ["238", 34, "4"], ["238", 35, "4"], ["238", 36, "6"], ["238", 37, "5"], ["238", 38, "4"], ["238", 39, "5"], ["238", 40, "2"], ["238", 41, "2"], ["238", 42, "5"], ["238", 43, "4"], ["238", 44, "1"], ["238", 45, "3"], ["238", 46, "4"], ["238", 47, "3"], ["238", 48, "2"], ["238", 49, "1"], ["238", 50, "1"], ["238", 51, "1"], ["238", 52, "1"], ["238", 53, "1"], ["238", 54, "2"], ["238", 55, "3"], ["238", 56, "4"], ["238", 57, "2"], ["238", 58, "3"], ["238", 59, "3"], ["238", 60, "3"], ["238", 61, "3"], ["238", 62, "5"], ["238", 63, "4"], ["238", 64, "5"], ["238", 65, "4"], ["238", 66, "5"], ["238", 67, "4"], ["238", 68, "1"], ["238", 70, "2"], ["238", 72, "3"], ["238", 73, "3"], ["238", 74, "2"], ["238", 76, "2"], ["238", 77, "3"], ["238", 78, "4"], ["238", 79, "1"], ["238", 80, "3"], ["238", 82, "1"], ["238", 83, "1"], ["238", 84, "3"], ["238", 85, "5"], ["238", 86, "4"], ["238", 87, "5"], ["238", 88, "2"], ["238", 89, "3"], ["238", 90, "4"], ["238", 91, "1"], ["238", 92, "2"], ["238", 93, "2"], ["238", 95, "4"], ["238", 96, "5"], ["238", 97, "8"], ["238", 98, "9"], ["238", 99, "8"], ["238", 100, "10"], ["238", 101, "9"], ["238", 102, "12"], ["238", 103, "9"], ["238", 104, "9"], ["238", 105, "10"], ["238", 106, "9"], ["238", 107, "10"], ["238", 108, "9"], ["238", 109, "9"], ["238", 110, "10"], ["238", 111, "7"], ["238", 112, "8"], ["238", 113, "10"], ["238", 114, "12"], ["238", 115, "6"], ["238", 116, "5"], ["238", 117, "4"], ["238", 118, "4"], ["238", 119, "3"], ["238", 120, "5"], ["238", 121, "5"], ["238", 122, "6"], ["238", 123, "7"], ["238", 124, "5"], ["238", 125, "5"], ["238", 126, "3"], ["238", 127, "4"], ["238", 128, "5"], ["238", 129, "6"], ["238", 130, "7"], ["238", 131, "6"], ["238", 132, "6"], ["238", 133, "5"], ["238", 134, "5"], ["238", 135, "4"], ["238", 136, "3"], ["238", 137, "2"], ["238", 138, "2"], ["238", 139, "3"], ["238", 140, "3"], ["238", 141, "1"], ["238", 142, "2"], ["238", 143, "3"], ["238", 144, "1"], ["238", 145, "1"], ["238", 158, "1"], ["238", 159, "1"], ["238", 160, "1"], ["238", 161, "1"], ["238", 162, "1"], ["238", 163, "1"], ["238", 165, "1"], ["238", 166, "1"], ["238", 167, "1"], ["238", 168, "1"], ["238", 172, "1"], ["238", 173, "1"], ["238", 174, "1"], ["238", 175, "1"], ["238", 176, "1"], ["238", 177, "1"], ["239", null, "1"], ["239", null, "1"], ["239", 6, "1"], ["239", 7, "1"], ["239", 8, "1"], ["239", 10, "1"], ["239", 11, "2"], ["239", 12, "3"], ["239", 13, "6"], ["239", 14, "4"], ["239", 15, "1"], ["239", 16, "1"], ["239", 18, "2"], ["239", 19, "2"], ["239", 20, "1"], ["239", 21, "1"], ["239", 23, "2"], ["239", 24, "1"], ["239", 25, "1"], ["239", 30, "3"], ["239", 31, "3"], ["239", 32, "3"], ["239", 33, "3"], ["239", 34, "3"], ["239", 35, "3"], ["239", 36, "3"], ["239", 37, "2"], ["239", 38, "2"], ["239", 39, "3"], ["239", 40, "2"], ["239", 41, "1"], ["239", 42, "3"], ["239", 43, "2"], ["239", 44, "1"], ["239", 45, "2"], ["239", 46, "2"], ["239", 47, "2"], ["239", 48, "1"], ["239", 51, "1"], ["239", 52, "1"], ["239", 53, "1"], ["239", 54, "2"], ["239", 55, "4"], ["239", 56, "3"], ["239", 57, "2"], ["239", 58, "2"], ["239", 59, "2"], ["239", 60, "2"], ["239", 61, "2"], ["239", 62, "3"], ["239", 63, "3"], ["239", 64, "1"], ["239", 70, "1"], ["239", 71, "1"], ["239", 72, "3"], ["239", 73, "1"], ["239", 74, "1"], ["239", 75, "1"], ["239", 78, "1"], ["239", 80, "1"], ["239", 82, "1"], ["239", 83, "1"], ["239", 84, "2"], ["239", 85, "3"], ["239", 86, "5"], ["239", 87, "4"], ["239", 88, "2"], ["239", 89, "2"], ["239", 90, "2"], ["239", 92, "2"], ["239", 93, "2"], ["239", 94, "1"], ["239", 95, "4"], ["239", 96, "6"], ["239", 97, "6"], ["239", 98, "5"], ["239", 99, "6"], ["239", 100, "3"], ["239", 101, "7"], ["239", 102, "3"], ["239", 103, "5"], ["239", 104, "3"], ["239", 105, "4"], ["239", 106, "8"], ["239", 107, "6"], ["239", 108, "8"], ["239", 109, "4"], ["239", 110, "7"], ["239", 111, "4"], ["239", 112, "6"], ["239", 113, "6"], ["239", 114, "6"], ["239", 115, "2"], ["239", 116, "2"], ["239", 117, "4"], ["239", 118, "4"], ["239", 119, "3"], ["239", 120, "5"], ["239", 121, "5"], ["239", 122, "6"], ["239", 123, "6"], ["239", 124, "5"], ["239", 125, "4"], ["239", 126, "4"], ["239", 127, "5"], ["239", 128, "7"], ["239", 129, "6"], ["239", 130, "6"], ["239", 131, "5"], ["239", 132, "7"], ["239", 133, "6"], ["239", 134, "6"], ["239", 135, "4"], ["239", 136, "2"], ["239", 137, "2"], ["239", 138, "2"], ["239", 139, "2"], ["239", 140, "3"], ["239", 142, "2"], ["239", 143, "2"], ["239", 144, "1"], ["239", 145, "1"], ["239", 154, "1"], ["239", 155, "1"], ["239", 156, "1"], ["239", 157, "1"], ["239", 158, "1"], ["239", 159, "1"], ["239", 160, "1"], ["239", 161, "1"], ["239", 162, "1"], ["239", 163, "1"], ["239", 164, "1"], ["239", 165, "1"], ["239", 166, "1"], ["239", 167, "1"], ["239", 168, "1"], ["239", 172, "1"], ["239", 173, "1"], ["239", 174, "1"], ["239", 175, "1"], ["239", null, "1"], ["240", null, "1"], ["240", null, "1"], ["240", 6, "1"], ["240", 7, "1"], ["240", 8, "1"], ["240", 10, "1"], ["240", 11, "2"], ["240", 12, "3"], ["240", 13, "6"], ["240", 14, "4"], ["240", 15, "1"], ["240", 16, "1"], ["240", 18, "2"], ["240", 19, "2"], ["240", 20, "1"], ["240", 21, "1"], ["240", 23, "2"], ["240", 24, "1"], ["240", 25, "1"], ["240", 30, "3"], ["240", 31, "3"], ["240", 32, "3"], ["240", 33, "3"], ["240", 34, "3"], ["240", 35, "3"], ["240", 36, "3"], ["240", 37, "2"], ["240", 38, "2"], ["240", 39, "3"], ["240", 40, "2"], ["240", 41, "1"], ["240", 42, "3"], ["240", 43, "2"], ["240", 44, "1"], ["240", 45, "2"], ["240", 46, "2"], ["240", 47, "2"], ["240", 48, "1"], ["240", 51, "1"], ["240", 52, "1"], ["240", 53, "1"], ["240", 54, "2"], ["240", 55, "4"], ["240", 56, "3"], ["240", 57, "2"], ["240", 58, "2"], ["240", 59, "2"], ["240", 60, "2"], ["240", 61, "2"], ["240", 62, "3"], ["240", 63, "3"], ["240", 64, "1"], ["240", 70, "1"], ["240", 71, "1"], ["240", 72, "3"], ["240", 73, "1"], ["240", 74, "1"], ["240", 75, "1"], ["240", 78, "1"], ["240", 80, "1"], ["240", 82, "1"], ["240", 83, "1"], ["240", 84, "2"], ["240", 85, "3"], ["240", 86, "5"], ["240", 87, "4"], ["240", 88, "2"], ["240", 89, "2"], ["240", 90, "2"], ["240", 92, "2"], ["240", 93, "2"], ["240", 94, "1"], ["240", 95, "4"], ["240", 96, "6"], ["240", 97, "6"], ["240", 98, "5"], ["240", 99, "6"], ["240", 100, "3"], ["240", 101, "7"], ["240", 102, "3"], ["240", 103, "5"], ["240", 104, "3"], ["240", 105, "4"], ["240", 106, "8"], ["240", 107, "6"], ["240", 108, "8"], ["240", 109, "4"], ["240", 110, "7"], ["240", 111, "4"], ["240", 112, "6"], ["240", 113, "6"], ["240", 114, "6"], ["240", 115, "2"], ["240", 116, "2"], ["240", 117, "4"], ["240", 118, "4"], ["240", 119, "3"], ["240", 120, "5"], ["240", 121, "5"], ["240", 122, "6"], ["240", 123, "6"], ["240", 124, "5"], ["240", 125, "4"], ["240", 126, "4"], ["240", 127, "5"], ["240", 128, "7"], ["240", 129, "6"], ["240", 130, "6"], ["240", 131, "5"], ["240", 132, "7"], ["240", 133, "6"], ["240", 134, "6"], ["240", 135, "4"], ["240", 136, "2"], ["240", 137, "2"], ["240", 138, "2"], ["240", 139, "2"], ["240", 140, "3"], ["240", 142, "2"], ["240", 143, "2"], ["240", 144, "1"], ["240", 145, "1"], ["240", 154, "1"], ["240", 155, "1"], ["240", 156, "1"], ["240", 157, "1"], ["240", 158, "1"], ["240", 159, "1"], ["240", 160, "1"], ["240", 161, "1"], ["240", 162, "1"], ["240", 163, "1"], ["240", 164, "1"], ["240", 165, "1"], ["240", 166, "1"], ["240", 167, "1"], ["240", 168, "1"], ["240", 172, "1"], ["240", 173, "1"], ["240", 174, "1"], ["240", 175, "1"], ["240", null, "1"], ["242", null, "1"], ["242", null, "1"], ["242", 6, "1"], ["242", 7, "1"], ["242", 8, "1"], ["242", 10, "1"], ["242", 11, "2"], ["242", 12, "3"], ["242", 13, "6"], ["242", 14, "4"], ["242", 15, "1"], ["242", 16, "1"], ["242", 18, "2"], ["242", 19, "2"], ["242", 20, "1"], ["242", 21, "1"], ["242", 23, "2"], ["242", 24, "1"], ["242", 25, "1"], ["242", 30, "3"], ["242", 31, "3"], ["242", 32, "3"], ["242", 33, "3"], ["242", 34, "3"], ["242", 35, "3"], ["242", 36, "3"], ["242", 37, "2"], ["242", 38, "2"], ["242", 39, "3"], ["242", 40, "2"], ["242", 41, "1"], ["242", 42, "3"], ["242", 43, "2"], ["242", 44, "1"], ["242", 45, "2"], ["242", 46, "2"], ["242", 47, "2"], ["242", 48, "1"], ["242", 51, "1"], ["242", 52, "1"], ["242", 53, "1"], ["242", 54, "2"], ["242", 55, "4"], ["242", 56, "3"], ["242", 57, "2"], ["242", 58, "2"], ["242", 59, "2"], ["242", 60, "2"], ["242", 61, "2"], ["242", 62, "3"], ["242", 63, "3"], ["242", 64, "1"], ["242", 70, "1"], ["242", 71, "1"], ["242", 72, "3"], ["242", 73, "1"], ["242", 74, "1"], ["242", 75, "1"], ["242", 78, "1"], ["242", 80, "1"], ["242", 82, "1"], ["242", 83, "1"], ["242", 84, "2"], ["242", 85, "3"], ["242", 86, "5"], ["242", 87, "4"], ["242", 88, "2"], ["242", 89, "2"], ["242", 90, "2"], ["242", 92, "2"], ["242", 93, "2"], ["242", 94, "1"], ["242", 95, "4"], ["242", 96, "6"], ["242", 97, "6"], ["242", 98, "5"], ["242", 99, "6"], ["242", 100, "3"], ["242", 101, "7"], ["242", 102, "3"], ["242", 103, "5"], ["242", 104, "3"], ["242", 105, "4"], ["242", 106, "8"], ["242", 107, "6"], ["242", 108, "8"], ["242", 109, "4"], ["242", 110, "7"], ["242", 111, "4"], ["242", 112, "6"], ["242", 113, "6"], ["242", 114, "6"], ["242", 115, "2"], ["242", 116, "2"], ["242", 117, "4"], ["242", 118, "4"], ["242", 119, "3"], ["242", 120, "5"], ["242", 121, "5"], ["242", 122, "6"], ["242", 123, "6"], ["242", 124, "5"], ["242", 125, "4"], ["242", 126, "4"], ["242", 127, "5"], ["242", 128, "7"], ["242", 129, "6"], ["242", 130, "6"], ["242", 131, "5"], ["242", 132, "7"], ["242", 133, "6"], ["242", 134, "6"], ["242", 135, "4"], ["242", 136, "2"], ["242", 137, "2"], ["242", 138, "2"], ["242", 139, "2"], ["242", 140, "3"], ["242", 142, "2"], ["242", 143, "2"], ["242", 144, "1"], ["242", 145, "1"], ["242", 154, "1"], ["242", 155, "1"], ["242", 156, "1"], ["242", 157, "1"], ["242", 158, "1"], ["242", 159, "1"], ["242", 160, "1"], ["242", 161, "1"], ["242", 162, "1"], ["242", 163, "1"], ["242", 164, "1"], ["242", 165, "1"], ["242", 166, "1"], ["242", 167, "1"], ["242", 168, "1"], ["242", 172, "1"], ["242", 173, "1"], ["242", 174, "1"], ["242", 175, "1"], ["242", null, "1"], ["243", 3, "1"], ["243", 4, "1"], ["243", 5, "1"], ["243", 6, "1"], ["243", 7, "1"], ["243", 8, "1"], ["243", 10, "2"], ["243", 11, "2"], ["243", 12, "4"], ["243", 13, "6"], ["243", 14, "5"], ["243", 15, "3"], ["243", 16, "1"], ["243", 18, "2"], ["243", 19, "1"], ["243", 20, "1"], ["243", 21, "1"], ["243", 25, "1"], ["243", 26, "1"], ["243", 29, "1"], ["243", 30, "2"], ["243", 31, "2"], ["243", 32, "2"], ["243", 33, "1"], ["243", 34, "1"], ["243", 35, "1"], ["243", 36, "1"], ["243", 37, "1"], ["243", 38, "2"], ["243", 39, "2"], ["243", 51, "1"], ["243", 52, "2"], ["243", 53, "1"], ["243", 54, "2"], ["243", 55, "2"], ["243", 56, "2"], ["243", 57, "2"], ["243", 58, "2"], ["243", 59, "2"], ["243", 60, "2"], ["243", 61, "2"], ["243", 62, "2"], ["243", 63, "2"], ["243", 71, "1"], ["243", 72, "1"], ["243", 73, "1"], ["243", 82, "1"], ["243", 83, "2"], ["243", 84, "3"], ["243", 85, "4"], ["243", 86, "4"], ["243", 87, "3"], ["243", 88, "1"], ["243", 89, "1"], ["243", 90, "2"], ["243", 91, "2"], ["243", 92, "3"], ["243", 93, "3"], ["243", 94, "2"], ["243", 95, "4"], ["243", 96, "4"], ["243", 97, "5"], ["243", 98, "5"], ["243", 99, "4"], ["243", 100, "3"], ["243", 101, "4"], ["243", 102, "4"], ["243", 103, "3"], ["243", 104, "1"], ["243", 105, "2"], ["243", 106, "4"], ["243", 107, "4"], ["243", 108, "5"], ["243", 109, "6"], ["243", 110, "6"], ["243", 111, "2"], ["243", 112, "2"], ["243", 113, "2"], ["243", 114, "1"], ["243", 115, "1"], ["243", 116, "1"], ["243", 117, "1"], ["243", 118, "3"], ["243", 119, "3"], ["243", 120, "2"], ["243", 121, "2"], ["243", 122, "3"], ["243", 123, "3"], ["243", 124, "5"], ["243", 125, "4"], ["243", 126, "5"], ["243", 127, "6"], ["243", 128, "7"], ["243", 129, "6"], ["243", 130, "7"], ["243", 131, "8"], ["243", 132, "6"], ["243", 133, "7"], ["243", 134, "5"], ["243", 135, "4"], ["243", 136, "4"], ["243", 137, "3"], ["243", 138, "2"], ["243", 139, "2"], ["243", 140, "2"], ["243", 141, "1"], ["243", 142, "1"], ["243", 152, "1"], ["243", 153, "1"], ["243", 154, "1"], ["243", 155, "1"], ["243", 156, "1"], ["243", 157, "1"], ["243", 158, "1"], ["243", 159, "1"], ["243", 160, "1"], ["243", 161, "1"], ["243", 162, "1"], ["243", 163, "1"], ["243", 164, "1"], ["243", 166, "1"], ["243", 167, "1"], ["243", 168, "1"], ["244", 3, "1"], ["244", 4, "1"], ["244", 5, "1"], ["244", 6, "1"], ["244", 7, "1"], ["244", 8, "1"], ["244", 10, "2"], ["244", 11, "2"], ["244", 12, "4"], ["244", 13, "6"], ["244", 14, "5"], ["244", 15, "3"], ["244", 16, "1"], ["244", 18, "2"], ["244", 19, "1"], ["244", 20, "1"], ["244", 21, "1"], ["244", 25, "1"], ["244", 26, "1"], ["244", 29, "1"], ["244", 30, "2"], ["244", 31, "2"], ["244", 32, "2"], ["244", 33, "1"], ["244", 34, "1"], ["244", 35, "1"], ["244", 36, "1"], ["244", 37, "1"], ["244", 38, "2"], ["244", 39, "2"], ["244", 51, "1"], ["244", 52, "2"], ["244", 53, "1"], ["244", 54, "2"], ["244", 55, "2"], ["244", 56, "2"], ["244", 57, "2"], ["244", 58, "2"], ["244", 59, "2"], ["244", 60, "2"], ["244", 61, "2"], ["244", 62, "2"], ["244", 63, "2"], ["244", 71, "1"], ["244", 72, "1"], ["244", 73, "1"], ["244", 82, "1"], ["244", 83, "2"], ["244", 84, "3"], ["244", 85, "4"], ["244", 86, "4"], ["244", 87, "3"], ["244", 88, "1"], ["244", 89, "1"], ["244", 90, "2"], ["244", 91, "2"], ["244", 92, "3"], ["244", 93, "3"], ["244", 94, "2"], ["244", 95, "4"], ["244", 96, "4"], ["244", 97, "5"], ["244", 98, "5"], ["244", 99, "4"], ["244", 100, "3"], ["244", 101, "4"], ["244", 102, "4"], ["244", 103, "3"], ["244", 104, "1"], ["244", 105, "2"], ["244", 106, "4"], ["244", 107, "4"], ["244", 108, "5"], ["244", 109, "6"], ["244", 110, "6"], ["244", 111, "2"], ["244", 112, "2"], ["244", 113, "2"], ["244", 114, "1"], ["244", 115, "1"], ["244", 116, "1"], ["244", 117, "1"], ["244", 118, "3"], ["244", 119, "3"], ["244", 120, "2"], ["244", 121, "2"], ["244", 122, "3"], ["244", 123, "3"], ["244", 124, "5"], ["244", 125, "4"], ["244", 126, "5"], ["244", 127, "6"], ["244", 128, "7"], ["244", 129, "6"], ["244", 130, "7"], ["244", 131, "8"], ["244", 132, "6"], ["244", 133, "7"], ["244", 134, "5"], ["244", 135, "4"], ["244", 136, "4"], ["244", 137, "3"], ["244", 138, "2"], ["244", 139, "2"], ["244", 140, "2"], ["244", 141, "1"], ["244", 142, "1"], ["244", 152, "1"], ["244", 153, "1"], ["244", 154, "1"], ["244", 155, "1"], ["244", 156, "1"], ["244", 157, "1"], ["244", 158, "1"], ["244", 159, "1"], ["244", 160, "1"], ["244", 161, "1"], ["244", 162, "1"], ["244", 163, "1"], ["244", 164, "1"], ["244", 166, "1"], ["244", 167, "1"], ["244", 168, "1"], ["245", 3, "1"], ["245", 4, "1"], ["245", 5, "1"], ["245", 6, "1"], ["245", 7, "1"], ["245", 8, "1"], ["245", 10, "2"], ["245", 11, "2"], ["245", 12, "4"], ["245", 13, "6"], ["245", 14, "5"], ["245", 15, "3"], ["245", 16, "1"], ["245", 18, "2"], ["245", 19, "1"], ["245", 20, "1"], ["245", 21, "1"], ["245", 25, "1"], ["245", 26, "1"], ["245", 29, "1"], ["245", 30, "2"], ["245", 31, "2"], ["245", 32, "2"], ["245", 33, "1"], ["245", 34, "1"], ["245", 35, "1"], ["245", 36, "1"], ["245", 37, "1"], ["245", 38, "2"], ["245", 39, "2"], ["245", 51, "1"], ["245", 52, "2"], ["245", 53, "1"], ["245", 54, "2"], ["245", 55, "2"], ["245", 56, "2"], ["245", 57, "2"], ["245", 58, "2"], ["245", 59, "2"], ["245", 60, "2"], ["245", 61, "2"], ["245", 62, "2"], ["245", 63, "2"], ["245", 71, "1"], ["245", 72, "1"], ["245", 73, "1"], ["245", 82, "1"], ["245", 83, "2"], ["245", 84, "3"], ["245", 85, "4"], ["245", 86, "4"], ["245", 87, "3"], ["245", 88, "1"], ["245", 89, "1"], ["245", 90, "2"], ["245", 91, "2"], ["245", 92, "3"], ["245", 93, "3"], ["245", 94, "2"], ["245", 95, "4"], ["245", 96, "4"], ["245", 97, "5"], ["245", 98, "5"], ["245", 99, "4"], ["245", 100, "3"], ["245", 101, "4"], ["245", 102, "4"], ["245", 103, "3"], ["245", 104, "1"], ["245", 105, "2"], ["245", 106, "4"], ["245", 107, "4"], ["245", 108, "5"], ["245", 109, "6"], ["245", 110, "6"], ["245", 111, "2"], ["245", 112, "2"], ["245", 113, "2"], ["245", 114, "1"], ["245", 115, "1"], ["245", 116, "1"], ["245", 117, "1"], ["245", 118, "3"], ["245", 119, "3"], ["245", 120, "2"], ["245", 121, "2"], ["245", 122, "3"], ["245", 123, "3"], ["245", 124, "5"], ["245", 125, "4"], ["245", 126, "5"], ["245", 127, "6"], ["245", 128, "7"], ["245", 129, "6"], ["245", 130, "7"], ["245", 131, "8"], ["245", 132, "6"], ["245", 133, "7"], ["245", 134, "5"], ["245", 135, "4"], ["245", 136, "4"], ["245", 137, "3"], ["245", 138, "2"], ["245", 139, "2"], ["245", 140, "2"], ["245", 141, "1"], ["245", 142, "1"], ["245", 152, "1"], ["245", 153, "1"], ["245", 154, "1"], ["245", 155, "1"], ["245", 156, "1"], ["245", 157, "1"], ["245", 158, "1"], ["245", 159, "1"], ["245", 160, "1"], ["245", 161, "1"], ["245", 162, "1"], ["245", 163, "1"], ["245", 164, "1"], ["245", 166, "1"], ["245", 167, "1"], ["245", 168, "1"], ["248", 2, "1"], ["248", 3, "1"], ["248", 4, "1"], ["248", 7, "1"], ["248", 8, "2"], ["248", 9, "3"], ["248", 10, "2"], ["248", 11, "6"], ["248", 12, "5"], ["248", 13, "4"], ["248", 14, "1"], ["248", 15, "3"], ["248", 16, "5"], ["248", 17, "6"], ["248", 18, "7"], ["248", 19, "7"], ["248", 20, "5"], ["248", 21, "5"], ["248", 22, "4"], ["248", 23, "6"], ["248", 24, "4"], ["248", 25, "2"], ["248", 26, "2"], ["248", 27, "2"], ["248", 28, "2"], ["248", 29, "2"], ["248", 31, "2"], ["248", 32, "2"], ["248", 33, "2"], ["248", 34, "1"], ["248", 35, "4"], ["248", 36, "3"], ["248", 37, "3"], ["248", 38, "2"], ["248", 40, "1"], ["248", 41, "1"], ["248", 42, "2"], ["248", 43, "3"], ["248", 48, "2"], ["248", 49, "1"], ["248", 50, "2"], ["248", 51, "1"], ["248", 52, "1"], ["248", 54, "1"], ["248", 55, "1"], ["248", 58, "1"], ["248", 77, "1"], ["248", 78, "2"], ["248", 79, "2"], ["248", 80, "1"], ["248", 81, "1"], ["248", 82, "2"], ["248", 83, "4"], ["248", 84, "6"], ["248", 85, "7"], ["248", 86, "5"], ["248", 87, "5"], ["248", 88, "6"], ["248", 89, "11"], ["248", 90, "9"], ["248", 91, "12"], ["248", 92, "14"], ["248", 93, "14"], ["248", 94, "13"], ["248", 95, "13"], ["248", 96, "11"], ["248", 97, "8"], ["248", 98, "8"], ["248", 99, "7"], ["248", 100, "6"], ["248", 101, "8"], ["248", 102, "9"], ["248", 103, "9"], ["248", 104, "5"], ["248", 105, "5"], ["248", 106, "7"], ["248", 107, "6"], ["248", 108, "5"], ["248", 109, "5"], ["248", 110, "3"], ["248", 111, "3"], ["248", 112, "3"], ["248", 113, "4"], ["248", 114, "4"], ["248", 115, "3"], ["248", 116, "4"], ["248", 117, "5"], ["248", 118, "8"], ["248", 119, "9"], ["248", 120, "10"], ["248", 121, "9"], ["248", 122, "12"], ["248", 123, "13"], ["248", 124, "14"], ["248", 125, "13"], ["248", 126, "14"], ["248", 127, "17"], ["248", 128, "15"], ["248", 129, "15"], ["248", 130, "18"], ["248", 131, "18"], ["248", 132, "18"], ["248", 133, "19"], ["248", 134, "16"], ["248", 135, "17"], ["248", 136, "16"], ["248", 137, "16"], ["248", 138, "15"], ["248", 139, "14"], ["248", 140, "12"], ["248", 141, "10"], ["248", 142, "10"], ["248", 143, "8"], ["248", 144, "8"], ["248", 145, "6"], ["248", 146, "4"], ["248", 147, "4"], ["248", 148, "2"], ["248", 149, "2"], ["248", 150, "2"], ["248", 151, "1"], ["248", 152, "2"], ["248", 153, "2"], ["248", 154, "2"], ["248", 155, "2"], ["248", 156, "1"], ["248", 157, "1"], ["248", 175, "1"], ["248", 176, "1"], ["248", 177, "1"], ["248", 178, "1"], ["248", 179, "1"], ["248", 180, "1"], ["248", 181, "1"], ["250", 2, "1"], ["250", 3, "1"], ["250", 4, "1"], ["250", 7, "1"], ["250", 8, "2"], ["250", 9, "3"], ["250", 10, "2"], ["250", 11, "6"], ["250", 12, "5"], ["250", 13, "4"], ["250", 14, "1"], ["250", 15, "3"], ["250", 16, "5"], ["250", 17, "6"], ["250", 18, "7"], ["250", 19, "7"], ["250", 20, "5"], ["250", 21, "5"], ["250", 22, "4"], ["250", 23, "6"], ["250", 24, "4"], ["250", 25, "2"], ["250", 26, "2"], ["250", 27, "2"], ["250", 28, "2"], ["250", 29, "2"], ["250", 31, "2"], ["250", 32, "2"], ["250", 33, "2"], ["250", 34, "1"], ["250", 35, "4"], ["250", 36, "3"], ["250", 37, "3"], ["250", 38, "2"], ["250", 40, "1"], ["250", 41, "1"], ["250", 42, "2"], ["250", 43, "3"], ["250", 48, "2"], ["250", 49, "1"], ["250", 50, "2"], ["250", 51, "1"], ["250", 52, "1"], ["250", 54, "1"], ["250", 55, "1"], ["250", 58, "1"], ["250", 77, "1"], ["250", 78, "2"], ["250", 79, "2"], ["250", 80, "1"], ["250", 81, "1"], ["250", 82, "2"], ["250", 83, "4"], ["250", 84, "6"], ["250", 85, "7"], ["250", 86, "5"], ["250", 87, "5"], ["250", 88, "6"], ["250", 89, "11"], ["250", 90, "9"], ["250", 91, "12"], ["250", 92, "14"], ["250", 93, "14"], ["250", 94, "13"], ["250", 95, "13"], ["250", 96, "11"], ["250", 97, "8"], ["250", 98, "8"], ["250", 99, "7"], ["250", 100, "6"], ["250", 101, "8"], ["250", 102, "9"], ["250", 103, "9"], ["250", 104, "5"], ["250", 105, "5"], ["250", 106, "7"], ["250", 107, "6"], ["250", 108, "5"], ["250", 109, "5"], ["250", 110, "3"], ["250", 111, "3"], ["250", 112, "3"], ["250", 113, "4"], ["250", 114, "4"], ["250", 115, "3"], ["250", 116, "4"], ["250", 117, "5"], ["250", 118, "8"], ["250", 119, "9"], ["250", 120, "10"], ["250", 121, "9"], ["250", 122, "12"], ["250", 123, "13"], ["250", 124, "14"], ["250", 125, "13"], ["250", 126, "14"], ["250", 127, "17"], ["250", 128, "15"], ["250", 129, "15"], ["250", 130, "18"], ["250", 131, "18"], ["250", 132, "18"], ["250", 133, "19"], ["250", 134, "16"], ["250", 135, "17"], ["250", 136, "16"], ["250", 137, "16"], ["250", 138, "15"], ["250", 139, "14"], ["250", 140, "12"], ["250", 141, "10"], ["250", 142, "10"], ["250", 143, "8"], ["250", 144, "8"], ["250", 145, "6"], ["250", 146, "4"], ["250", 147, "4"], ["250", 148, "2"], ["250", 149, "2"], ["250", 150, "2"], ["250", 151, "1"], ["250", 152, "2"], ["250", 153, "2"], ["250", 154, "2"], ["250", 155, "2"], ["250", 156, "1"], ["250", 157, "1"], ["250", 175, "1"], ["250", 176, "1"], ["250", 177, "1"], ["250", 178, "1"], ["250", 179, "1"], ["250", 180, "1"], ["250", 181, "1"], ["251", 2, "1"], ["251", 3, "1"], ["251", 4, "1"], ["251", 7, "1"], ["251", 8, "2"], ["251", 9, "3"], ["251", 10, "2"], ["251", 11, "6"], ["251", 12, "5"], ["251", 13, "4"], ["251", 14, "1"], ["251", 15, "3"], ["251", 16, "5"], ["251", 17, "6"], ["251", 18, "7"], ["251", 19, "7"], ["251", 20, "5"], ["251", 21, "5"], ["251", 22, "4"], ["251", 23, "6"], ["251", 24, "4"], ["251", 25, "2"], ["251", 26, "2"], ["251", 27, "2"], ["251", 28, "2"], ["251", 29, "2"], ["251", 31, "2"], ["251", 32, "2"], ["251", 33, "2"], ["251", 34, "1"], ["251", 35, "4"], ["251", 36, "3"], ["251", 37, "3"], ["251", 38, "2"], ["251", 40, "1"], ["251", 41, "1"], ["251", 42, "2"], ["251", 43, "3"], ["251", 48, "2"], ["251", 49, "1"], ["251", 50, "2"], ["251", 51, "1"], ["251", 52, "1"], ["251", 54, "1"], ["251", 55, "1"], ["251", 58, "1"], ["251", 77, "1"], ["251", 78, "2"], ["251", 79, "2"], ["251", 80, "1"], ["251", 81, "1"], ["251", 82, "2"], ["251", 83, "4"], ["251", 84, "6"], ["251", 85, "7"], ["251", 86, "5"], ["251", 87, "5"], ["251", 88, "6"], ["251", 89, "11"], ["251", 90, "9"], ["251", 91, "12"], ["251", 92, "14"], ["251", 93, "14"], ["251", 94, "13"], ["251", 95, "13"], ["251", 96, "11"], ["251", 97, "8"], ["251", 98, "8"], ["251", 99, "7"], ["251", 100, "6"], ["251", 101, "8"], ["251", 102, "9"], ["251", 103, "9"], ["251", 104, "5"], ["251", 105, "5"], ["251", 106, "7"], ["251", 107, "6"], ["251", 108, "5"], ["251", 109, "5"], ["251", 110, "3"], ["251", 111, "3"], ["251", 112, "3"], ["251", 113, "4"], ["251", 114, "4"], ["251", 115, "3"], ["251", 116, "4"], ["251", 117, "5"], ["251", 118, "8"], ["251", 119, "9"], ["251", 120, "10"], ["251", 121, "9"], ["251", 122, "12"], ["251", 123, "13"], ["251", 124, "14"], ["251", 125, "13"], ["251", 126, "14"], ["251", 127, "17"], ["251", 128, "15"], ["251", 129, "15"], ["251", 130, "18"], ["251", 131, "18"], ["251", 132, "18"], ["251", 133, "19"], ["251", 134, "16"], ["251", 135, "17"], ["251", 136, "16"], ["251", 137, "16"], ["251", 138, "15"], ["251", 139, "14"], ["251", 140, "12"], ["251", 141, "10"], ["251", 142, "10"], ["251", 143, "8"], ["251", 144, "8"], ["251", 145, "6"], ["251", 146, "4"], ["251", 147, "4"], ["251", 148, "2"], ["251", 149, "2"], ["251", 150, "2"], ["251", 151, "1"], ["251", 152, "2"], ["251", 153, "2"], ["251", 154, "2"], ["251", 155, "2"], ["251", 156, "1"], ["251", 157, "1"], ["251", 175, "1"], ["251", 176, "1"], ["251", 177, "1"], ["251", 178, "1"], ["251", 179, "1"], ["251", 180, "1"], ["251", 181, "1"], ["252", 2, "1"], ["252", 3, "1"], ["252", 4, "1"], ["252", 7, "1"], ["252", 8, "1"], ["252", 10, "2"], ["252", 11, "5"], ["252", 12, "3"], ["252", 13, "2"], ["252", 14, "2"], ["252", 15, "3"], ["252", 16, "2"], ["252", 17, "3"], ["252", 18, "4"], ["252", 19, "2"], ["252", 20, "3"], ["252", 21, "2"], ["252", 22, "1"], ["252", 23, "2"], ["252", 25, "1"], ["252", 26, "1"], ["252", 27, "2"], ["252", 28, "1"], ["252", 29, "1"], ["252", 30, "1"], ["252", 31, "1"], ["252", 32, "3"], ["252", 33, "2"], ["252", 34, "2"], ["252", 35, "2"], ["252", 36, "2"], ["252", 37, "2"], ["252", 40, "3"], ["252", 41, "3"], ["252", 42, "2"], ["252", 43, "1"], ["252", 44, "1"], ["252", 45, "1"], ["252", 46, "1"], ["252", 47, "1"], ["252", 49, "1"], ["252", 50, "1"], ["252", 51, "1"], ["252", 54, "1"], ["252", 75, "1"], ["252", 76, "1"], ["252", 77, "1"], ["252", 78, "1"], ["252", 80, "1"], ["252", 82, "1"], ["252", 83, "2"], ["252", 84, "2"], ["252", 85, "5"], ["252", 86, "6"], ["252", 87, "2"], ["252", 88, "5"], ["252", 89, "9"], ["252", 90, "8"], ["252", 91, "10"], ["252", 92, "11"], ["252", 93, "8"], ["252", 94, "10"], ["252", 95, "9"], ["252", 96, "5"], ["252", 97, "6"], ["252", 98, "5"], ["252", 99, "5"], ["252", 100, "2"], ["252", 101, "4"], ["252", 102, "3"], ["252", 103, "3"], ["252", 104, "4"], ["252", 105, "3"], ["252", 106, "2"], ["252", 107, "4"], ["252", 108, "5"], ["252", 109, "8"], ["252", 110, "7"], ["252", 111, "7"], ["252", 112, "8"], ["252", 113, "7"], ["252", 114, "8"], ["252", 115, "8"], ["252", 116, "9"], ["252", 117, "12"], ["252", 118, "12"], ["252", 119, "10"], ["252", 120, "12"], ["252", 121, "11"], ["252", 122, "12"], ["252", 123, "14"], ["252", 124, "16"], ["252", 125, "15"], ["252", 126, "15"], ["252", 127, "17"], ["252", 128, "18"], ["252", 129, "19"], ["252", 130, "20"], ["252", 131, "18"], ["252", 132, "18"], ["252", 133, "19"], ["252", 134, "19"], ["252", 135, "19"], ["252", 136, "18"], ["252", 137, "14"], ["252", 138, "14"], ["252", 139, "16"], ["252", 140, "13"], ["252", 141, "12"], ["252", 142, "10"], ["252", 143, "6"], ["252", 144, "5"], ["252", 145, "3"], ["252", 146, "4"], ["252", 147, "2"], ["252", 148, "2"], ["252", 149, "1"], ["252", 151, "1"], ["252", 152, "1"], ["252", 153, "1"], ["252", 154, "1"], ["252", 155, "1"], ["252", 171, "1"], ["252", 172, "1"], ["252", 173, "1"], ["252", 174, "1"], ["252", 175, "1"], ["252", 177, "1"], ["253", 2, "1"], ["253", 3, "1"], ["253", 4, "1"], ["253", 7, "1"], ["253", 8, "1"], ["253", 10, "2"], ["253", 11, "5"], ["253", 12, "3"], ["253", 13, "2"], ["253", 14, "2"], ["253", 15, "3"], ["253", 16, "2"], ["253", 17, "3"], ["253", 18, "4"], ["253", 19, "2"], ["253", 20, "3"], ["253", 21, "2"], ["253", 22, "1"], ["253", 23, "2"], ["253", 25, "1"], ["253", 26, "1"], ["253", 27, "2"], ["253", 28, "1"], ["253", 29, "1"], ["253", 30, "1"], ["253", 31, "1"], ["253", 32, "3"], ["253", 33, "2"], ["253", 34, "2"], ["253", 35, "2"], ["253", 36, "2"], ["253", 37, "2"], ["253", 40, "3"], ["253", 41, "3"], ["253", 42, "2"], ["253", 43, "1"], ["253", 44, "1"], ["253", 45, "1"], ["253", 46, "1"], ["253", 47, "1"], ["253", 49, "1"], ["253", 50, "1"], ["253", 51, "1"], ["253", 54, "1"], ["253", 75, "1"], ["253", 76, "1"], ["253", 77, "1"], ["253", 78, "1"], ["253", 80, "1"], ["253", 82, "1"], ["253", 83, "2"], ["253", 84, "2"], ["253", 85, "5"], ["253", 86, "6"], ["253", 87, "2"], ["253", 88, "5"], ["253", 89, "9"], ["253", 90, "8"], ["253", 91, "10"], ["253", 92, "11"], ["253", 93, "8"], ["253", 94, "10"], ["253", 95, "9"], ["253", 96, "5"], ["253", 97, "6"], ["253", 98, "5"], ["253", 99, "5"], ["253", 100, "2"], ["253", 101, "4"], ["253", 102, "3"], ["253", 103, "3"], ["253", 104, "4"], ["253", 105, "3"], ["253", 106, "2"], ["253", 107, "4"], ["253", 108, "5"], ["253", 109, "8"], ["253", 110, "7"], ["253", 111, "7"], ["253", 112, "8"], ["253", 113, "7"], ["253", 114, "8"], ["253", 115, "8"], ["253", 116, "9"], ["253", 117, "12"], ["253", 118, "12"], ["253", 119, "10"], ["253", 120, "12"], ["253", 121, "11"], ["253", 122, "12"], ["253", 123, "14"], ["253", 124, "16"], ["253", 125, "15"], ["253", 126, "15"], ["253", 127, "17"], ["253", 128, "18"], ["253", 129, "19"], ["253", 130, "20"], ["253", 131, "18"], ["253", 132, "18"], ["253", 133, "19"], ["253", 134, "19"], ["253", 135, "19"], ["253", 136, "18"], ["253", 137, "14"], ["253", 138, "14"], ["253", 139, "16"], ["253", 140, "13"], ["253", 141, "12"], ["253", 142, "10"], ["253", 143, "6"], ["253", 144, "5"], ["253", 145, "3"], ["253", 146, "4"], ["253", 147, "2"], ["253", 148, "2"], ["253", 149, "1"], ["253", 151, "1"], ["253", 152, "1"], ["253", 153, "1"], ["253", 154, "1"], ["253", 155, "1"], ["253", 171, "1"], ["253", 172, "1"], ["253", 173, "1"], ["253", 174, "1"], ["253", 175, "1"], ["253", 177, "1"], ["254", 2, "1"], ["254", 3, "1"], ["254", 4, "1"], ["254", 7, "1"], ["254", 8, "1"], ["254", 10, "2"], ["254", 11, "5"], ["254", 12, "3"], ["254", 13, "2"], ["254", 14, "2"], ["254", 15, "3"], ["254", 16, "2"], ["254", 17, "3"], ["254", 18, "4"], ["254", 19, "2"], ["254", 20, "3"], ["254", 21, "2"], ["254", 22, "1"], ["254", 23, "2"], ["254", 25, "1"], ["254", 26, "1"], ["254", 27, "2"], ["254", 28, "1"], ["254", 29, "1"], ["254", 30, "1"], ["254", 31, "1"], ["254", 32, "3"], ["254", 33, "2"], ["254", 34, "2"], ["254", 35, "2"], ["254", 36, "2"], ["254", 37, "2"], ["254", 40, "3"], ["254", 41, "3"], ["254", 42, "2"], ["254", 43, "1"], ["254", 44, "1"], ["254", 45, "1"], ["254", 46, "1"], ["254", 47, "1"], ["254", 49, "1"], ["254", 50, "1"], ["254", 51, "1"], ["254", 54, "1"], ["254", 75, "1"], ["254", 76, "1"], ["254", 77, "1"], ["254", 78, "1"], ["254", 80, "1"], ["254", 82, "1"], ["254", 83, "2"], ["254", 84, "2"], ["254", 85, "5"], ["254", 86, "6"], ["254", 87, "2"], ["254", 88, "5"], ["254", 89, "9"], ["254", 90, "8"], ["254", 91, "10"], ["254", 92, "11"], ["254", 93, "8"], ["254", 94, "10"], ["254", 95, "9"], ["254", 96, "5"], ["254", 97, "6"], ["254", 98, "5"], ["254", 99, "5"], ["254", 100, "2"], ["254", 101, "4"], ["254", 102, "3"], ["254", 103, "3"], ["254", 104, "4"], ["254", 105, "3"], ["254", 106, "2"], ["254", 107, "4"], ["254", 108, "5"], ["254", 109, "8"], ["254", 110, "7"], ["254", 111, "7"], ["254", 112, "8"], ["254", 113, "7"], ["254", 114, "8"], ["254", 115, "8"], ["254", 116, "9"], ["254", 117, "12"], ["254", 118, "12"], ["254", 119, "10"], ["254", 120, "12"], ["254", 121, "11"], ["254", 122, "12"], ["254", 123, "14"], ["254", 124, "16"], ["254", 125, "15"], ["254", 126, "15"], ["254", 127, "17"], ["254", 128, "18"], ["254", 129, "19"], ["254", 130, "20"], ["254", 131, "18"], ["254", 132, "18"], ["254", 133, "19"], ["254", 134, "19"], ["254", 135, "19"], ["254", 136, "18"], ["254", 137, "14"], ["254", 138, "14"], ["254", 139, "16"], ["254", 140, "13"], ["254", 141, "12"], ["254", 142, "10"], ["254", 143, "6"], ["254", 144, "5"], ["254", 145, "3"], ["254", 146, "4"], ["254", 147, "2"], ["254", 148, "2"], ["254", 149, "1"], ["254", 151, "1"], ["254", 152, "1"], ["254", 153, "1"], ["254", 154, "1"], ["254", 155, "1"], ["254", 171, "1"], ["254", 172, "1"], ["254", 173, "1"], ["254", 174, "1"], ["254", 175, "1"], ["254", 177, "1"], ["255", 2, "1"], ["255", 3, "1"], ["255", 7, "1"], ["255", 10, "4"], ["255", 11, "4"], ["255", 12, "3"], ["255", 13, "1"], ["255", 14, "3"], ["255", 15, "2"], ["255", 16, "4"], ["255", 17, "3"], ["255", 18, "4"], ["255", 19, "2"], ["255", 20, "2"], ["255", 21, "1"], ["255", 22, "1"], ["255", 23, "2"], ["255", 24, "1"], ["255", 25, "3"], ["255", 26, "5"], ["255", 27, "5"], ["255", 28, "3"], ["255", 29, "2"], ["255", 30, "4"], ["255", 31, "4"], ["255", 32, "4"], ["255", 33, "3"], ["255", 34, "3"], ["255", 35, "4"], ["255", 36, "3"], ["255", 37, "1"], ["255", 38, "3"], ["255", 39, "5"], ["255", 40, "5"], ["255", 41, "4"], ["255", 42, "2"], ["255", 43, "2"], ["255", 44, "1"], ["255", 45, "1"], ["255", 48, "1"], ["255", 49, "2"], ["255", 50, "2"], ["255", 51, "2"], ["255", 52, "2"], ["255", 53, "3"], ["255", 54, "2"], ["255", 55, "4"], ["255", 56, "5"], ["255", 57, "4"], ["255", 58, "4"], ["255", 59, "2"], ["255", 60, "2"], ["255", 61, "3"], ["255", 62, "1"], ["255", 67, "1"], ["255", 74, "1"], ["255", 75, "1"], ["255", 76, "1"], ["255", 77, "1"], ["255", 79, "2"], ["255", 80, "3"], ["255", 81, "1"], ["255", 82, "2"], ["255", 83, "2"], ["255", 84, "6"], ["255", 85, "8"], ["255", 86, "11"], ["255", 87, "8"], ["255", 88, "7"], ["255", 89, "10"], ["255", 90, "13"], ["255", 91, "15"], ["255", 92, "14"], ["255", 93, "12"], ["255", 94, "12"], ["255", 95, "12"], ["255", 96, "13"], ["255", 97, "12"], ["255", 98, "8"], ["255", 99, "7"], ["255", 100, "8"], ["255", 101, "11"], ["255", 102, "12"], ["255", 103, "12"], ["255", 104, "13"], ["255", 105, "14"], ["255", 106, "14"], ["255", 107, "12"], ["255", 108, "11"], ["255", 109, "14"], ["255", 110, "13"], ["255", 111, "14"], ["255", 112, "15"], ["255", 113, "14"], ["255", 114, "17"], ["255", 115, "17"], ["255", 116, "18"], ["255", 117, "19"], ["255", 118, "18"], ["255", 119, "18"], ["255", 120, "18"], ["255", 121, "17"], ["255", 122, "17"], ["255", 123, "19"], ["255", 124, "20"], ["255", 125, "17"], ["255", 126, "18"], ["255", 127, "20"], ["255", 128, "20"], ["255", 129, "21"], ["255", 130, "21"], ["255", 131, "20"], ["255", 132, "21"], ["255", 133, "21"], ["255", 134, "22"], ["255", 135, "22"], ["255", 136, "22"], ["255", 137, "18"], ["255", 138, "20"], ["255", 139, "19"], ["255", 140, "17"], ["255", 141, "17"], ["255", 142, "17"], ["255", 143, "16"], ["255", 144, "13"], ["255", 145, "11"], ["255", 146, "9"], ["255", 147, "8"], ["255", 148, "5"], ["255", 149, "5"], ["255", 150, "4"], ["255", 151, "3"], ["255", 152, "1"], ["255", 153, "1"], ["255", 154, "1"], ["255", 155, "1"], ["255", 156, "1"], ["255", 157, "1"], ["255", 158, "1"], ["255", 159, "1"], ["255", 160, "1"], ["255", 169, "1"], ["255", 170, "1"], ["255", 171, "1"], ["255", 172, "2"], ["255", 173, "2"], ["255", 174, "2"], ["255", 175, "1"], ["255", 176, "1"], ["255", 177, "1"], ["255", 178, "1"], ["255", 179, "1"], ["255", 185, "1"], ["255", 186, "1"], ["255", 187, "1"], ["255", 188, "1"], ["256", 2, "1"], ["256", 3, "1"], ["256", 7, "1"], ["256", 10, "4"], ["256", 11, "4"], ["256", 12, "3"], ["256", 13, "1"], ["256", 14, "3"], ["256", 15, "2"], ["256", 16, "4"], ["256", 17, "3"], ["256", 18, "4"], ["256", 19, "2"], ["256", 20, "2"], ["256", 21, "1"], ["256", 22, "1"], ["256", 23, "2"], ["256", 24, "1"], ["256", 25, "3"], ["256", 26, "5"], ["256", 27, "5"], ["256", 28, "3"], ["256", 29, "2"], ["256", 30, "4"], ["256", 31, "4"], ["256", 32, "4"], ["256", 33, "3"], ["256", 34, "3"], ["256", 35, "4"], ["256", 36, "3"], ["256", 37, "1"], ["256", 38, "3"], ["256", 39, "5"], ["256", 40, "5"], ["256", 41, "4"], ["256", 42, "2"], ["256", 43, "2"], ["256", 44, "1"], ["256", 45, "1"], ["256", 48, "1"], ["256", 49, "2"], ["256", 50, "2"], ["256", 51, "2"], ["256", 52, "2"], ["256", 53, "3"], ["256", 54, "2"], ["256", 55, "4"], ["256", 56, "5"], ["256", 57, "4"], ["256", 58, "4"], ["256", 59, "2"], ["256", 60, "2"], ["256", 61, "3"], ["256", 62, "1"], ["256", 67, "1"], ["256", 74, "1"], ["256", 75, "1"], ["256", 76, "1"], ["256", 77, "1"], ["256", 79, "2"], ["256", 80, "3"], ["256", 81, "1"], ["256", 82, "2"], ["256", 83, "2"], ["256", 84, "6"], ["256", 85, "8"], ["256", 86, "11"], ["256", 87, "8"], ["256", 88, "7"], ["256", 89, "10"], ["256", 90, "13"], ["256", 91, "15"], ["256", 92, "14"], ["256", 93, "12"], ["256", 94, "12"], ["256", 95, "12"], ["256", 96, "13"], ["256", 97, "12"], ["256", 98, "8"], ["256", 99, "7"], ["256", 100, "8"], ["256", 101, "11"], ["256", 102, "12"], ["256", 103, "12"], ["256", 104, "13"], ["256", 105, "14"], ["256", 106, "14"], ["256", 107, "12"], ["256", 108, "11"], ["256", 109, "14"], ["256", 110, "13"], ["256", 111, "14"], ["256", 112, "15"], ["256", 113, "14"], ["256", 114, "17"], ["256", 115, "17"], ["256", 116, "18"], ["256", 117, "19"], ["256", 118, "18"], ["256", 119, "18"], ["256", 120, "18"], ["256", 121, "17"], ["256", 122, "17"], ["256", 123, "19"], ["256", 124, "20"], ["256", 125, "17"], ["256", 126, "18"], ["256", 127, "20"], ["256", 128, "20"], ["256", 129, "21"], ["256", 130, "21"], ["256", 131, "20"], ["256", 132, "21"], ["256", 133, "21"], ["256", 134, "22"], ["256", 135, "22"], ["256", 136, "22"], ["256", 137, "18"], ["256", 138, "20"], ["256", 139, "19"], ["256", 140, "17"], ["256", 141, "17"], ["256", 142, "17"], ["256", 143, "16"], ["256", 144, "13"], ["256", 145, "11"], ["256", 146, "9"], ["256", 147, "8"], ["256", 148, "5"], ["256", 149, "5"], ["256", 150, "4"], ["256", 151, "3"], ["256", 152, "1"], ["256", 153, "1"], ["256", 154, "1"], ["256", 155, "1"], ["256", 156, "1"], ["256", 157, "1"], ["256", 158, "1"], ["256", 159, "1"], ["256", 160, "1"], ["256", 169, "1"], ["256", 170, "1"], ["256", 171, "1"], ["256", 172, "2"], ["256", 173, "2"], ["256", 174, "2"], ["256", 175, "1"], ["256", 176, "1"], ["256", 177, "1"], ["256", 178, "1"], ["256", 179, "1"], ["256", 185, "1"], ["256", 186, "1"], ["256", 187, "1"], ["256", 188, "1"], ["257", 2, "1"], ["257", 3, "1"], ["257", 7, "1"], ["257", 10, "4"], ["257", 11, "4"], ["257", 12, "3"], ["257", 13, "1"], ["257", 14, "3"], ["257", 15, "2"], ["257", 16, "4"], ["257", 17, "3"], ["257", 18, "4"], ["257", 19, "2"], ["257", 20, "2"], ["257", 21, "1"], ["257", 22, "1"], ["257", 23, "2"], ["257", 24, "1"], ["257", 25, "3"], ["257", 26, "5"], ["257", 27, "5"], ["257", 28, "3"], ["257", 29, "2"], ["257", 30, "4"], ["257", 31, "4"], ["257", 32, "4"], ["257", 33, "3"], ["257", 34, "3"], ["257", 35, "4"], ["257", 36, "3"], ["257", 37, "1"], ["257", 38, "3"], ["257", 39, "5"], ["257", 40, "5"], ["257", 41, "4"], ["257", 42, "2"], ["257", 43, "2"], ["257", 44, "1"], ["257", 45, "1"], ["257", 48, "1"], ["257", 49, "2"], ["257", 50, "2"], ["257", 51, "2"], ["257", 52, "2"], ["257", 53, "3"], ["257", 54, "2"], ["257", 55, "4"], ["257", 56, "5"], ["257", 57, "4"], ["257", 58, "4"], ["257", 59, "2"], ["257", 60, "2"], ["257", 61, "3"], ["257", 62, "1"], ["257", 67, "1"], ["257", 74, "1"], ["257", 75, "1"], ["257", 76, "1"], ["257", 77, "1"], ["257", 79, "2"], ["257", 80, "3"], ["257", 81, "1"], ["257", 82, "2"], ["257", 83, "2"], ["257", 84, "6"], ["257", 85, "8"], ["257", 86, "11"], ["257", 87, "8"], ["257", 88, "7"], ["257", 89, "10"], ["257", 90, "13"], ["257", 91, "15"], ["257", 92, "14"], ["257", 93, "12"], ["257", 94, "12"], ["257", 95, "12"], ["257", 96, "13"], ["257", 97, "12"], ["257", 98, "8"], ["257", 99, "7"], ["257", 100, "8"], ["257", 101, "11"], ["257", 102, "12"], ["257", 103, "12"], ["257", 104, "13"], ["257", 105, "14"], ["257", 106, "14"], ["257", 107, "12"], ["257", 108, "11"], ["257", 109, "14"], ["257", 110, "13"], ["257", 111, "14"], ["257", 112, "15"], ["257", 113, "14"], ["257", 114, "17"], ["257", 115, "17"], ["257", 116, "18"], ["257", 117, "19"], ["257", 118, "18"], ["257", 119, "18"], ["257", 120, "18"], ["257", 121, "17"], ["257", 122, "17"], ["257", 123, "19"], ["257", 124, "20"], ["257", 125, "17"], ["257", 126, "18"], ["257", 127, "20"], ["257", 128, "20"], ["257", 129, "21"], ["257", 130, "21"], ["257", 131, "20"], ["257", 132, "21"], ["257", 133, "21"], ["257", 134, "22"], ["257", 135, "22"], ["257", 136, "22"], ["257", 137, "18"], ["257", 138, "20"], ["257", 139, "19"], ["257", 140, "17"], ["257", 141, "17"], ["257", 142, "17"], ["257", 143, "16"], ["257", 144, "13"], ["257", 145, "11"], ["257", 146, "9"], ["257", 147, "8"], ["257", 148, "5"], ["257", 149, "5"], ["257", 150, "4"], ["257", 151, "3"], ["257", 152, "1"], ["257", 153, "1"], ["257", 154, "1"], ["257", 155, "1"], ["257", 156, "1"], ["257", 157, "1"], ["257", 158, "1"], ["257", 159, "1"], ["257", 160, "1"], ["257", 169, "1"], ["257", 170, "1"], ["257", 171, "1"], ["257", 172, "2"], ["257", 173, "2"], ["257", 174, "2"], ["257", 175, "1"], ["257", 176, "1"], ["257", 177, "1"], ["257", 178, "1"], ["257", 179, "1"], ["257", 185, "1"], ["257", 186, "1"], ["257", 187, "1"], ["257", 188, "1"], ["259", 10, "1"], ["259", 11, "1"], ["259", 14, "1"], ["259", 16, "1"], ["259", 17, "1"], ["259", 18, "1"], ["259", 19, "1"], ["259", 20, "2"], ["259", 21, "1"], ["259", 24, "2"], ["259", 25, "1"], ["259", 26, "3"], ["259", 27, "5"], ["259", 28, "3"], ["259", 29, "1"], ["259", 30, "2"], ["259", 31, "1"], ["259", 32, "2"], ["259", 33, "3"], ["259", 34, "4"], ["259", 36, "1"], ["259", 38, "3"], ["259", 39, "3"], ["259", 40, "4"], ["259", 41, "1"], ["259", 42, "2"], ["259", 43, "1"], ["259", 46, "1"], ["259", 48, "3"], ["259", 49, "1"], ["259", 50, "2"], ["259", 51, "1"], ["259", 52, "1"], ["259", 53, "2"], ["259", 54, "1"], ["259", 55, "1"], ["259", 56, "4"], ["259", 57, "3"], ["259", 58, "4"], ["259", 59, "2"], ["259", 60, "4"], ["259", 61, "4"], ["259", 62, "1"], ["259", 63, "1"], ["259", 68, "1"], ["259", 74, "1"], ["259", 75, "1"], ["259", 76, "1"], ["259", 77, "1"], ["259", 78, "2"], ["259", 79, "1"], ["259", 80, "2"], ["259", 82, "1"], ["259", 83, "1"], ["259", 84, "2"], ["259", 85, "6"], ["259", 86, "6"], ["259", 87, "9"], ["259", 88, "9"], ["259", 89, "9"], ["259", 90, "15"], ["259", 91, "15"], ["259", 92, "15"], ["259", 93, "16"], ["259", 94, "16"], ["259", 95, "18"], ["259", 96, "16"], ["259", 97, "15"], ["259", 98, "13"], ["259", 99, "13"], ["259", 100, "15"], ["259", 101, "13"], ["259", 102, "15"], ["259", 103, "17"], ["259", 104, "18"], ["259", 105, "18"], ["259", 106, "18"], ["259", 107, "18"], ["259", 108, "16"], ["259", 109, "17"], ["259", 110, "18"], ["259", 111, "18"], ["259", 112, "18"], ["259", 113, "19"], ["259", 114, "20"], ["259", 115, "21"], ["259", 116, "21"], ["259", 117, "20"], ["259", 118, "21"], ["259", 119, "20"], ["259", 120, "20"], ["259", 121, "21"], ["259", 122, "20"], ["259", 123, "20"], ["259", 124, "20"], ["259", 125, "19"], ["259", 126, "19"], ["259", 127, "23"], ["259", 128, "22"], ["259", 129, "22"], ["259", 130, "23"], ["259", 131, "22"], ["259", 132, "21"], ["259", 133, "23"], ["259", 134, "22"], ["259", 135, "22"], ["259", 136, "22"], ["259", 137, "21"], ["259", 138, "20"], ["259", 139, "21"], ["259", 140, "21"], ["259", 141, "21"], ["259", 142, "21"], ["259", 143, "20"], ["259", 144, "17"], ["259", 145, "17"], ["259", 146, "15"], ["259", 147, "10"], ["259", 148, "9"], ["259", 149, "8"], ["259", 150, "7"], ["259", 151, "6"], ["259", 152, "5"], ["259", 153, "4"], ["259", 154, "3"], ["259", 155, "1"], ["259", 156, "1"], ["259", 157, "1"], ["259", 158, "1"], ["259", 159, "1"], ["259", 160, "1"], ["259", 161, "1"], ["259", 162, "1"], ["259", 163, "1"], ["259", 164, "1"], ["259", 168, "1"], ["259", 169, "1"], ["259", 170, "1"], ["259", 171, "3"], ["259", 172, "1"], ["259", 173, "3"], ["259", 174, "3"], ["259", 175, "1"], ["259", 176, "1"], ["259", 177, "1"], ["259", 178, "1"], ["259", 179, "2"], ["259", 180, "2"], ["259", 181, "2"], ["259", 182, "1"], ["259", 184, "1"], ["259", 185, "1"], ["259", 186, "1"], ["259", 187, "1"], ["259", 188, "1"], ["259", 189, "1"], ["260", 10, "1"], ["260", 11, "1"], ["260", 14, "1"], ["260", 16, "1"], ["260", 17, "1"], ["260", 18, "1"], ["260", 19, "1"], ["260", 20, "2"], ["260", 21, "1"], ["260", 24, "2"], ["260", 25, "1"], ["260", 26, "3"], ["260", 27, "5"], ["260", 28, "3"], ["260", 29, "1"], ["260", 30, "2"], ["260", 31, "1"], ["260", 32, "2"], ["260", 33, "3"], ["260", 34, "4"], ["260", 36, "1"], ["260", 38, "3"], ["260", 39, "3"], ["260", 40, "4"], ["260", 41, "1"], ["260", 42, "2"], ["260", 43, "1"], ["260", 46, "1"], ["260", 48, "3"], ["260", 49, "1"], ["260", 50, "2"], ["260", 51, "1"], ["260", 52, "1"], ["260", 53, "2"], ["260", 54, "1"], ["260", 55, "1"], ["260", 56, "4"], ["260", 57, "3"], ["260", 58, "4"], ["260", 59, "2"], ["260", 60, "4"], ["260", 61, "4"], ["260", 62, "1"], ["260", 63, "1"], ["260", 68, "1"], ["260", 74, "1"], ["260", 75, "1"], ["260", 76, "1"], ["260", 77, "1"], ["260", 78, "2"], ["260", 79, "1"], ["260", 80, "2"], ["260", 82, "1"], ["260", 83, "1"], ["260", 84, "2"], ["260", 85, "6"], ["260", 86, "6"], ["260", 87, "9"], ["260", 88, "9"], ["260", 89, "9"], ["260", 90, "15"], ["260", 91, "15"], ["260", 92, "15"], ["260", 93, "16"], ["260", 94, "16"], ["260", 95, "18"], ["260", 96, "16"], ["260", 97, "15"], ["260", 98, "13"], ["260", 99, "13"], ["260", 100, "15"], ["260", 101, "13"], ["260", 102, "15"], ["260", 103, "17"], ["260", 104, "18"], ["260", 105, "18"], ["260", 106, "18"], ["260", 107, "18"], ["260", 108, "16"], ["260", 109, "17"], ["260", 110, "18"], ["260", 111, "18"], ["260", 112, "18"], ["260", 113, "19"], ["260", 114, "20"], ["260", 115, "21"], ["260", 116, "21"], ["260", 117, "20"], ["260", 118, "21"], ["260", 119, "20"], ["260", 120, "20"], ["260", 121, "21"], ["260", 122, "20"], ["260", 123, "20"], ["260", 124, "20"], ["260", 125, "19"], ["260", 126, "19"], ["260", 127, "23"], ["260", 128, "22"], ["260", 129, "22"], ["260", 130, "23"], ["260", 131, "22"], ["260", 132, "21"], ["260", 133, "23"], ["260", 134, "22"], ["260", 135, "22"], ["260", 136, "22"], ["260", 137, "21"], ["260", 138, "20"], ["260", 139, "21"], ["260", 140, "21"], ["260", 141, "21"], ["260", 142, "21"], ["260", 143, "20"], ["260", 144, "17"], ["260", 145, "17"], ["260", 146, "15"], ["260", 147, "10"], ["260", 148, "9"], ["260", 149, "8"], ["260", 150, "7"], ["260", 151, "6"], ["260", 152, "5"], ["260", 153, "4"], ["260", 154, "3"], ["260", 155, "1"], ["260", 156, "1"], ["260", 157, "1"], ["260", 158, "1"], ["260", 159, "1"], ["260", 160, "1"], ["260", 161, "1"], ["260", 162, "1"], ["260", 163, "1"], ["260", 164, "1"], ["260", 168, "1"], ["260", 169, "1"], ["260", 170, "1"], ["260", 171, "3"], ["260", 172, "1"], ["260", 173, "3"], ["260", 174, "3"], ["260", 175, "1"], ["260", 176, "1"], ["260", 177, "1"], ["260", 178, "1"], ["260", 179, "2"], ["260", 180, "2"], ["260", 181, "2"], ["260", 182, "1"], ["260", 184, "1"], ["260", 185, "1"], ["260", 186, "1"], ["260", 187, "1"], ["260", 188, "1"], ["260", 189, "1"], ["261", 10, "1"], ["261", 11, "1"], ["261", 14, "1"], ["261", 16, "1"], ["261", 17, "1"], ["261", 18, "1"], ["261", 19, "1"], ["261", 20, "2"], ["261", 21, "1"], ["261", 24, "2"], ["261", 25, "1"], ["261", 26, "3"], ["261", 27, "5"], ["261", 28, "3"], ["261", 29, "1"], ["261", 30, "2"], ["261", 31, "1"], ["261", 32, "2"], ["261", 33, "3"], ["261", 34, "4"], ["261", 36, "1"], ["261", 38, "3"], ["261", 39, "3"], ["261", 40, "4"], ["261", 41, "1"], ["261", 42, "2"], ["261", 43, "1"], ["261", 46, "1"], ["261", 48, "3"], ["261", 49, "1"], ["261", 50, "2"], ["261", 51, "1"], ["261", 52, "1"], ["261", 53, "2"], ["261", 54, "1"], ["261", 55, "1"], ["261", 56, "4"], ["261", 57, "3"], ["261", 58, "4"], ["261", 59, "2"], ["261", 60, "4"], ["261", 61, "4"], ["261", 62, "1"], ["261", 63, "1"], ["261", 68, "1"], ["261", 74, "1"], ["261", 75, "1"], ["261", 76, "1"], ["261", 77, "1"], ["261", 78, "2"], ["261", 79, "1"], ["261", 80, "2"], ["261", 82, "1"], ["261", 83, "1"], ["261", 84, "2"], ["261", 85, "6"], ["261", 86, "6"], ["261", 87, "9"], ["261", 88, "9"], ["261", 89, "9"], ["261", 90, "15"], ["261", 91, "15"], ["261", 92, "15"], ["261", 93, "16"], ["261", 94, "16"], ["261", 95, "18"], ["261", 96, "16"], ["261", 97, "15"], ["261", 98, "13"], ["261", 99, "13"], ["261", 100, "15"], ["261", 101, "13"], ["261", 102, "15"], ["261", 103, "17"], ["261", 104, "18"], ["261", 105, "18"], ["261", 106, "18"], ["261", 107, "18"], ["261", 108, "16"], ["261", 109, "17"], ["261", 110, "18"], ["261", 111, "18"], ["261", 112, "18"], ["261", 113, "19"], ["261", 114, "20"], ["261", 115, "21"], ["261", 116, "21"], ["261", 117, "20"], ["261", 118, "21"], ["261", 119, "20"], ["261", 120, "20"], ["261", 121, "21"], ["261", 122, "20"], ["261", 123, "20"], ["261", 124, "20"], ["261", 125, "19"], ["261", 126, "19"], ["261", 127, "23"], ["261", 128, "22"], ["261", 129, "22"], ["261", 130, "23"], ["261", 131, "22"], ["261", 132, "21"], ["261", 133, "23"], ["261", 134, "22"], ["261", 135, "22"], ["261", 136, "22"], ["261", 137, "21"], ["261", 138, "20"], ["261", 139, "21"], ["261", 140, "21"], ["261", 141, "21"], ["261", 142, "21"], ["261", 143, "20"], ["261", 144, "17"], ["261", 145, "17"], ["261", 146, "15"], ["261", 147, "10"], ["261", 148, "9"], ["261", 149, "8"], ["261", 150, "7"], ["261", 151, "6"], ["261", 152, "5"], ["261", 153, "4"], ["261", 154, "3"], ["261", 155, "1"], ["261", 156, "1"], ["261", 157, "1"], ["261", 158, "1"], ["261", 159, "1"], ["261", 160, "1"], ["261", 161, "1"], ["261", 162, "1"], ["261", 163, "1"], ["261", 164, "1"], ["261", 168, "1"], ["261", 169, "1"], ["261", 170, "1"], ["261", 171, "3"], ["261", 172, "1"], ["261", 173, "3"], ["261", 174, "3"], ["261", 175, "1"], ["261", 176, "1"], ["261", 177, "1"], ["261", 178, "1"], ["261", 179, "2"], ["261", 180, "2"], ["261", 181, "2"], ["261", 182, "1"], ["261", 184, "1"], ["261", 185, "1"], ["261", 186, "1"], ["261", 187, "1"], ["261", 188, "1"], ["261", 189, "1"]];

exports.default = hotDate;

/***/ }),
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _utility = __webpack_require__(4);

var _utility2 = _interopRequireDefault(_utility);

var _camera = __webpack_require__(9);

var _camera2 = _interopRequireDefault(_camera);

var _objectPath = __webpack_require__(1);

var _objectPath2 = _interopRequireDefault(_objectPath);

var _default = __webpack_require__(10);

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebGl = function WebGl(dom, config) {
    _classCallCheck(this, WebGl);

    var Dom = document.getElementById(dom);
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
    gl.clearColor(0, 0, 0, 1.0);
    gl.clearDepth(1.0); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL);

    // auto draw
    (function draw() {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
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
        var objClass = __webpack_require__(13)("./" + object.path).default;
        var objInstance = new objClass(this, obj);
        this.renderList.push(objInstance);
        return objInstance;
    };
});

exports.default = WebGl;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _glMatrixMin = __webpack_require__(11);

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
/* 10 */
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
/* 11 */
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(12)(module)))

/***/ }),
/* 12 */
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
/* 13 */
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
webpackContext.id = 13;

/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _webgl = __webpack_require__(8);

var _webgl2 = _interopRequireDefault(_webgl);

var _path = __webpack_require__(6);

var _path2 = _interopRequireDefault(_path);

var _hot = __webpack_require__(5);

var _hot2 = _interopRequireDefault(_hot);

var _mercatorPorjection = __webpack_require__(7);

var _mercatorPorjection2 = _interopRequireDefault(_mercatorPorjection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_path2.default);
console.log(_hot2.default);

function drawBelt(id, data, hotData) {
    var mercatorProjection = new _mercatorPorjection2.default();
    var app = window.app = new _webgl2.default(id);

    // x
    app.Path({
        path: [[0, 0, 0], [0, 100, 0]],
        color: '#f00'
    });

    // y
    app.Path({
        path: [[0, 0, 0], [100, 0, 0]],
        color: '#0f0'
    });

    // z
    app.Path({
        path: [[0, 0, 0], [0, 0, 100]],
        color: '#00f'
    });

    // prepare data
    var maxWidth = 1000;
    var min = [Infinity, Infinity];
    var max = [-Infinity, -Infinity];
    data.paths = data.paths.map(function (point) {
        var newPoint = mercatorProjection.lngLatToMercator({
            lng: point[0],
            lat: point[1]
        });

        min[0] = Math.min(min[0], newPoint.lng);
        min[1] = Math.min(min[1], newPoint.lat);
        max[0] = Math.max(max[0], newPoint.lng);
        max[1] = Math.max(max[1], newPoint.lat);

        return [newPoint.lng, newPoint.lat, 0];
    });
    var mid = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2];
    var delta = [max[0] - min[0], max[1] - min[1]];
    var deltaMax = Math.max(delta[0], delta[1]);

    var scale = maxWidth / deltaMax;
    var newPath = data.paths.map(function (point) {
        return [(point[0] - mid[0]) * scale, (point[1] - mid[1]) * scale, 0];
    });
    // parpeat hot data 
    // color  data
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

    //
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = '2048';
    canvas.height = '1024';
    canvas.style.width = '200px';
    canvas.style.height = '100px';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.zIndex = '100';
    document.body.appendChild(canvas);

    ctx.fillStyle = 'rgba(255,0,0,0.01)';
    var preWidth = 1024 / 192;
    var preHeight = 2048 / 261;
    hotData.forEach(function (data) {
        for (var i = 0; i < data[2]; i++) {
            ctx.fillRect(data[0] * preWidth, data[1] * preHeight, preWidth, preHeight);
        }
    });
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
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
    app.Belt({
        path: newPath,
        height: 100,
        texture: canvas
    });
}

drawBelt('canvas', _path2.default, _hot2.default);

/***/ })
/******/ ]);