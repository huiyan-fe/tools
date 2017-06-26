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
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
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
            // console.log(this.texture_coords, this.indices, this.verticesColors)
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

            gl.drawElements(gl.TRIANGLE_STRIP, this.indices.length, gl.UNSIGNED_SHORT, 0);
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


var hotDate = [["0", 3, "1"], ["0", 4, "1"], ["0", 5, "1"], ["0", 6, "2"], ["0", 7, "2"], ["0", 8, "3"], ["0", 9, "2"], ["0", 10, "2"], ["0", 11, "2"], ["0", 12, "1"], ["0", 13, "2"], ["0", 14, "3"], ["0", 15, "3"], ["0", 17, "1"], ["0", 18, "2"], ["0", 19, "2"], ["0", 20, "1"], ["0", 21, "2"], ["0", 22, "1"], ["0", 23, "1"], ["0", 24, "2"], ["0", 25, "2"], ["0", 26, "2"], ["0", 27, "2"], ["0", 28, "4"], ["0", 29, "5"], ["0", 30, "5"], ["0", 31, "5"], ["0", 32, "5"], ["0", 33, "4"], ["0", 34, "6"], ["0", 35, "5"], ["0", 36, "6"], ["0", 37, "10"], ["0", 38, "9"], ["0", 39, "9"], ["0", 40, "11"], ["0", 41, "9"], ["0", 42, "10"], ["0", 43, "8"], ["0", 44, "9"], ["0", 45, "10"], ["0", 46, "9"], ["0", 47, "11"], ["0", 48, "9"], ["0", 49, "7"], ["0", 50, "8"], ["0", 51, "6"], ["0", 52, "3"], ["0", 53, "2"], ["0", 54, "4"], ["0", 55, "2"], ["0", 56, "3"], ["0", 57, "3"], ["0", 58, "1"], ["0", 59, "2"], ["0", 60, "2"], ["0", 61, "3"], ["0", 62, "1"], ["0", 65, "1"], ["0", 101, "1"], ["0", 102, "1"], ["0", 103, "1"], ["0", 105, "1"], ["0", 106, "1"], ["0", 107, "1"], ["0", 108, "1"], ["0", 115, "1"], ["0", 116, "1"], ["0", 117, "1"], ["0", 118, "3"], ["0", 119, "2"], ["0", 121, "2"], ["0", 122, "1"], ["0", 123, "1"], ["0", 124, "1"], ["0", 125, "2"], ["0", 126, "1"], ["0", 127, "1"], ["0", 128, "1"], ["0", 130, "1"], ["0", 131, "1"], ["0", 132, "1"], ["0", 133, "1"], ["0", 135, "1"], ["0", 136, "1"], ["0", 138, "2"], ["0", 139, "1"], ["0", 152, "1"], ["0", 153, "1"], ["0", 154, "1"], ["0", 155, "1"], ["0", 158, "2"], ["0", 159, "2"], ["0", 162, "1"], ["0", 164, "1"], ["0", 165, "1"], ["0", 166, "1"], ["0", 167, "1"], ["0", 168, "1"], ["0", 169, "1"], ["0", 170, "1"], ["0", 171, "1"], ["0", 172, "1"], ["2", 3, "1"], ["2", 4, "1"], ["2", 5, "1"], ["2", 6, "2"], ["2", 7, "2"], ["2", 8, "3"], ["2", 9, "2"], ["2", 10, "2"], ["2", 11, "2"], ["2", 12, "1"], ["2", 13, "2"], ["2", 14, "3"], ["2", 15, "3"], ["2", 17, "1"], ["2", 18, "2"], ["2", 19, "2"], ["2", 20, "1"], ["2", 21, "2"], ["2", 22, "1"], ["2", 23, "1"], ["2", 24, "2"], ["2", 25, "2"], ["2", 26, "2"], ["2", 27, "2"], ["2", 28, "4"], ["2", 29, "5"], ["2", 30, "5"], ["2", 31, "5"], ["2", 32, "5"], ["2", 33, "4"], ["2", 34, "6"], ["2", 35, "5"], ["2", 36, "6"], ["2", 37, "10"], ["2", 38, "9"], ["2", 39, "9"], ["2", 40, "11"], ["2", 41, "9"], ["2", 42, "10"], ["2", 43, "8"], ["2", 44, "9"], ["2", 45, "10"], ["2", 46, "9"], ["2", 47, "11"], ["2", 48, "9"], ["2", 49, "7"], ["2", 50, "8"], ["2", 51, "6"], ["2", 52, "3"], ["2", 53, "2"], ["2", 54, "4"], ["2", 55, "2"], ["2", 56, "3"], ["2", 57, "3"], ["2", 58, "1"], ["2", 59, "2"], ["2", 60, "2"], ["2", 61, "3"], ["2", 62, "1"], ["2", 65, "1"], ["2", 101, "1"], ["2", 102, "1"], ["2", 103, "1"], ["2", 105, "1"], ["2", 106, "1"], ["2", 107, "1"], ["2", 108, "1"], ["2", 115, "1"], ["2", 116, "1"], ["2", 117, "1"], ["2", 118, "3"], ["2", 119, "2"], ["2", 121, "2"], ["2", 122, "1"], ["2", 123, "1"], ["2", 124, "1"], ["2", 125, "2"], ["2", 126, "1"], ["2", 127, "1"], ["2", 128, "1"], ["2", 130, "1"], ["2", 131, "1"], ["2", 132, "1"], ["2", 133, "1"], ["2", 135, "1"], ["2", 136, "1"], ["2", 138, "2"], ["2", 139, "1"], ["2", 152, "1"], ["2", 153, "1"], ["2", 154, "1"], ["2", 155, "1"], ["2", 158, "2"], ["2", 159, "2"], ["2", 162, "1"], ["2", 164, "1"], ["2", 165, "1"], ["2", 166, "1"], ["2", 167, "1"], ["2", 168, "1"], ["2", 169, "1"], ["2", 170, "1"], ["2", 171, "1"], ["2", 172, "1"], ["3", 2, "1"], ["3", 3, "1"], ["3", 4, "1"], ["3", 5, "1"], ["3", 6, "1"], ["3", 8, "2"], ["3", 9, "1"], ["3", 10, "1"], ["3", 11, "2"], ["3", 12, "2"], ["3", 13, "3"], ["3", 14, "3"], ["3", 15, "3"], ["3", 16, "1"], ["3", 17, "2"], ["3", 20, "2"], ["3", 21, "4"], ["3", 22, "4"], ["3", 23, "2"], ["3", 24, "2"], ["3", 25, "2"], ["3", 26, "3"], ["3", 27, "3"], ["3", 28, "5"], ["3", 29, "4"], ["3", 30, "8"], ["3", 31, "6"], ["3", 32, "5"], ["3", 33, "6"], ["3", 34, "6"], ["3", 35, "7"], ["3", 36, "8"], ["3", 37, "10"], ["3", 38, "10"], ["3", 39, "10"], ["3", 40, "7"], ["3", 41, "6"], ["3", 42, "5"], ["3", 43, "7"], ["3", 44, "8"], ["3", 45, "7"], ["3", 46, "9"], ["3", 47, "8"], ["3", 48, "5"], ["3", 49, "6"], ["3", 50, "5"], ["3", 51, "3"], ["3", 52, "6"], ["3", 53, "5"], ["3", 54, "3"], ["3", 55, "4"], ["3", 56, "4"], ["3", 57, "5"], ["3", 58, "3"], ["3", 59, "2"], ["3", 60, "3"], ["3", 61, "1"], ["3", 62, "1"], ["3", 64, "2"], ["3", 65, "2"], ["3", 66, "2"], ["3", 69, "1"], ["3", 95, "1"], ["3", 96, "1"], ["3", 97, "1"], ["3", 98, "1"], ["3", 100, "1"], ["3", 101, "1"], ["3", 102, "1"], ["3", 104, "2"], ["3", 105, "2"], ["3", 106, "1"], ["3", 107, "1"], ["3", 113, "1"], ["3", 114, "1"], ["3", 115, "2"], ["3", 117, "1"], ["3", 118, "2"], ["3", 119, "1"], ["3", 120, "1"], ["3", 121, "1"], ["3", 122, "1"], ["3", 123, "1"], ["3", 124, "1"], ["3", 125, "1"], ["3", 126, "1"], ["3", 127, "2"], ["3", 129, "1"], ["3", 130, "1"], ["3", 134, "1"], ["3", 135, "1"], ["3", 136, "1"], ["3", 137, "3"], ["3", 138, "1"], ["3", 146, "1"], ["3", 151, "1"], ["3", 152, "1"], ["3", 153, "1"], ["3", 154, "1"], ["3", 155, "1"], ["3", 157, "1"], ["3", 158, "1"], ["3", 159, "2"], ["3", 160, "1"], ["3", 161, "1"], ["3", 162, "2"], ["3", 163, "1"], ["3", 164, "1"], ["3", 166, "1"], ["3", 167, "1"], ["3", 168, "1"], ["3", 169, "1"], ["3", 170, "1"], ["3", 171, "1"], ["4", 2, "1"], ["4", 3, "1"], ["4", 4, "1"], ["4", 5, "1"], ["4", 6, "1"], ["4", 8, "2"], ["4", 9, "1"], ["4", 10, "1"], ["4", 11, "2"], ["4", 12, "2"], ["4", 13, "3"], ["4", 14, "3"], ["4", 15, "3"], ["4", 16, "1"], ["4", 17, "2"], ["4", 20, "2"], ["4", 21, "4"], ["4", 22, "4"], ["4", 23, "2"], ["4", 24, "2"], ["4", 25, "2"], ["4", 26, "3"], ["4", 27, "3"], ["4", 28, "5"], ["4", 29, "4"], ["4", 30, "8"], ["4", 31, "6"], ["4", 32, "5"], ["4", 33, "6"], ["4", 34, "6"], ["4", 35, "7"], ["4", 36, "8"], ["4", 37, "10"], ["4", 38, "10"], ["4", 39, "10"], ["4", 40, "7"], ["4", 41, "6"], ["4", 42, "5"], ["4", 43, "7"], ["4", 44, "8"], ["4", 45, "7"], ["4", 46, "9"], ["4", 47, "8"], ["4", 48, "5"], ["4", 49, "6"], ["4", 50, "5"], ["4", 51, "3"], ["4", 52, "6"], ["4", 53, "5"], ["4", 54, "3"], ["4", 55, "4"], ["4", 56, "4"], ["4", 57, "5"], ["4", 58, "3"], ["4", 59, "2"], ["4", 60, "3"], ["4", 61, "1"], ["4", 62, "1"], ["4", 64, "2"], ["4", 65, "2"], ["4", 66, "2"], ["4", 69, "1"], ["4", 95, "1"], ["4", 96, "1"], ["4", 97, "1"], ["4", 98, "1"], ["4", 100, "1"], ["4", 101, "1"], ["4", 102, "1"], ["4", 104, "2"], ["4", 105, "2"], ["4", 106, "1"], ["4", 107, "1"], ["4", 113, "1"], ["4", 114, "1"], ["4", 115, "2"], ["4", 117, "1"], ["4", 118, "2"], ["4", 119, "1"], ["4", 120, "1"], ["4", 121, "1"], ["4", 122, "1"], ["4", 123, "1"], ["4", 124, "1"], ["4", 125, "1"], ["4", 126, "1"], ["4", 127, "2"], ["4", 129, "1"], ["4", 130, "1"], ["4", 134, "1"], ["4", 135, "1"], ["4", 136, "1"], ["4", 137, "3"], ["4", 138, "1"], ["4", 146, "1"], ["4", 151, "1"], ["4", 152, "1"], ["4", 153, "1"], ["4", 154, "1"], ["4", 155, "1"], ["4", 157, "1"], ["4", 158, "1"], ["4", 159, "2"], ["4", 160, "1"], ["4", 161, "1"], ["4", 162, "2"], ["4", 163, "1"], ["4", 164, "1"], ["4", 166, "1"], ["4", 167, "1"], ["4", 168, "1"], ["4", 169, "1"], ["4", 170, "1"], ["4", 171, "1"], ["5", 2, "1"], ["5", 3, "1"], ["5", 5, "1"], ["5", 6, "3"], ["5", 7, "4"], ["5", 8, "3"], ["5", 9, "2"], ["5", 10, "1"], ["5", 11, "1"], ["5", 12, "1"], ["5", 13, "4"], ["5", 14, "3"], ["5", 15, "4"], ["5", 16, "2"], ["5", 17, "4"], ["5", 18, "2"], ["5", 19, "4"], ["5", 20, "4"], ["5", 21, "3"], ["5", 22, "6"], ["5", 23, "6"], ["5", 24, "4"], ["5", 25, "5"], ["5", 26, "4"], ["5", 27, "6"], ["5", 28, "10"], ["5", 29, "10"], ["5", 30, "7"], ["5", 31, "5"], ["5", 32, "7"], ["5", 33, "8"], ["5", 34, "7"], ["5", 35, "9"], ["5", 36, "9"], ["5", 37, "10"], ["5", 38, "13"], ["5", 39, "14"], ["5", 40, "16"], ["5", 41, "12"], ["5", 42, "12"], ["5", 43, "12"], ["5", 44, "15"], ["5", 45, "16"], ["5", 46, "14"], ["5", 47, "12"], ["5", 48, "11"], ["5", 49, "12"], ["5", 50, "13"], ["5", 51, "10"], ["5", 52, "10"], ["5", 53, "7"], ["5", 54, "7"], ["5", 55, "7"], ["5", 56, "8"], ["5", 57, "7"], ["5", 58, "7"], ["5", 59, "9"], ["5", 60, "6"], ["5", 61, "5"], ["5", 62, "4"], ["5", 63, "4"], ["5", 64, "4"], ["5", 65, "2"], ["5", 66, "3"], ["5", 67, "2"], ["5", 68, "1"], ["5", 69, "1"], ["5", 92, "1"], ["5", 93, "1"], ["5", 94, "3"], ["5", 95, "2"], ["5", 96, "1"], ["5", 97, "2"], ["5", 98, "2"], ["5", 99, "4"], ["5", 100, "4"], ["5", 101, "4"], ["5", 102, "3"], ["5", 103, "5"], ["5", 104, "5"], ["5", 105, "4"], ["5", 106, "4"], ["5", 107, "1"], ["5", 108, "1"], ["5", 109, "2"], ["5", 110, "1"], ["5", 111, "2"], ["5", 113, "2"], ["5", 114, "2"], ["5", 115, "3"], ["5", 116, "4"], ["5", 117, "2"], ["5", 118, "3"], ["5", 119, "4"], ["5", 120, "3"], ["5", 121, "2"], ["5", 122, "2"], ["5", 123, "2"], ["5", 124, "2"], ["5", 125, "2"], ["5", 126, "2"], ["5", 127, "3"], ["5", 128, "1"], ["5", 129, "2"], ["5", 130, "2"], ["5", 131, "3"], ["5", 132, "3"], ["5", 133, "3"], ["5", 134, "4"], ["5", 135, "5"], ["5", 136, "7"], ["5", 137, "7"], ["5", 138, "4"], ["5", 139, "2"], ["5", 140, "1"], ["5", 142, "1"], ["5", 144, "1"], ["5", 145, "1"], ["5", 146, "1"], ["5", 152, "1"], ["5", 153, "1"], ["5", 154, "1"], ["5", 155, "1"], ["5", 156, "2"], ["5", 157, "1"], ["5", 158, "1"], ["5", 159, "1"], ["5", 160, "1"], ["5", 161, "1"], ["5", 162, "2"], ["5", 163, "3"], ["5", 164, "3"], ["5", 166, "1"], ["5", 167, "1"], ["5", 168, "1"], ["5", 169, "1"], ["5", 170, "1"], ["5", 171, "1"], ["5", 172, "2"], ["5", 197, "1"], ["6", 2, "1"], ["6", 3, "1"], ["6", 5, "1"], ["6", 6, "3"], ["6", 7, "4"], ["6", 8, "3"], ["6", 9, "2"], ["6", 10, "1"], ["6", 11, "1"], ["6", 12, "1"], ["6", 13, "4"], ["6", 14, "3"], ["6", 15, "4"], ["6", 16, "2"], ["6", 17, "4"], ["6", 18, "2"], ["6", 19, "4"], ["6", 20, "4"], ["6", 21, "3"], ["6", 22, "6"], ["6", 23, "6"], ["6", 24, "4"], ["6", 25, "5"], ["6", 26, "4"], ["6", 27, "6"], ["6", 28, "10"], ["6", 29, "10"], ["6", 30, "7"], ["6", 31, "5"], ["6", 32, "7"], ["6", 33, "8"], ["6", 34, "7"], ["6", 35, "9"], ["6", 36, "9"], ["6", 37, "10"], ["6", 38, "13"], ["6", 39, "14"], ["6", 40, "16"], ["6", 41, "12"], ["6", 42, "12"], ["6", 43, "12"], ["6", 44, "15"], ["6", 45, "16"], ["6", 46, "14"], ["6", 47, "12"], ["6", 48, "11"], ["6", 49, "12"], ["6", 50, "13"], ["6", 51, "10"], ["6", 52, "10"], ["6", 53, "7"], ["6", 54, "7"], ["6", 55, "7"], ["6", 56, "8"], ["6", 57, "7"], ["6", 58, "7"], ["6", 59, "9"], ["6", 60, "6"], ["6", 61, "5"], ["6", 62, "4"], ["6", 63, "4"], ["6", 64, "4"], ["6", 65, "2"], ["6", 66, "3"], ["6", 67, "2"], ["6", 68, "1"], ["6", 69, "1"], ["6", 92, "1"], ["6", 93, "1"], ["6", 94, "3"], ["6", 95, "2"], ["6", 96, "1"], ["6", 97, "2"], ["6", 98, "2"], ["6", 99, "4"], ["6", 100, "4"], ["6", 101, "4"], ["6", 102, "3"], ["6", 103, "5"], ["6", 104, "5"], ["6", 105, "4"], ["6", 106, "4"], ["6", 107, "1"], ["6", 108, "1"], ["6", 109, "2"], ["6", 110, "1"], ["6", 111, "2"], ["6", 113, "2"], ["6", 114, "2"], ["6", 115, "3"], ["6", 116, "4"], ["6", 117, "2"], ["6", 118, "3"], ["6", 119, "4"], ["6", 120, "3"], ["6", 121, "2"], ["6", 122, "2"], ["6", 123, "2"], ["6", 124, "2"], ["6", 125, "2"], ["6", 126, "2"], ["6", 127, "3"], ["6", 128, "1"], ["6", 129, "2"], ["6", 130, "2"], ["6", 131, "3"], ["6", 132, "3"], ["6", 133, "3"], ["6", 134, "4"], ["6", 135, "5"], ["6", 136, "7"], ["6", 137, "7"], ["6", 138, "4"], ["6", 139, "2"], ["6", 140, "1"], ["6", 142, "1"], ["6", 144, "1"], ["6", 145, "1"], ["6", 146, "1"], ["6", 152, "1"], ["6", 153, "1"], ["6", 154, "1"], ["6", 155, "1"], ["6", 156, "2"], ["6", 157, "1"], ["6", 158, "1"], ["6", 159, "1"], ["6", 160, "1"], ["6", 161, "1"], ["6", 162, "2"], ["6", 163, "3"], ["6", 164, "3"], ["6", 166, "1"], ["6", 167, "1"], ["6", 168, "1"], ["6", 169, "1"], ["6", 170, "1"], ["6", 171, "1"], ["6", 172, "2"], ["6", 197, "1"], ["7", 1, "1"], ["7", 2, "3"], ["7", 3, "8"], ["7", 4, "15"], ["7", 5, "14"], ["7", 6, "11"], ["7", 7, "11"], ["7", 8, "8"], ["7", 9, "9"], ["7", 10, "11"], ["7", 11, "8"], ["7", 12, "10"], ["7", 13, "11"], ["7", 14, "8"], ["7", 15, "7"], ["7", 16, "10"], ["7", 17, "10"], ["7", 18, "11"], ["7", 19, "9"], ["7", 20, "9"], ["7", 21, "7"], ["7", 22, "10"], ["7", 23, "10"], ["7", 24, "8"], ["7", 25, "8"], ["7", 26, "9"], ["7", 27, "13"], ["7", 28, "13"], ["7", 29, "12"], ["7", 30, "15"], ["7", 31, "15"], ["7", 32, "13"], ["7", 33, "13"], ["7", 34, "14"], ["7", 35, "15"], ["7", 36, "14"], ["7", 37, "15"], ["7", 38, "18"], ["7", 39, "19"], ["7", 40, "19"], ["7", 41, "19"], ["7", 42, "17"], ["7", 43, "17"], ["7", 44, "17"], ["7", 45, "19"], ["7", 46, "20"], ["7", 47, "20"], ["7", 48, "14"], ["7", 49, "17"], ["7", 50, "15"], ["7", 51, "16"], ["7", 52, "16"], ["7", 53, "14"], ["7", 54, "12"], ["7", 55, "12"], ["7", 56, "12"], ["7", 57, "10"], ["7", 58, "10"], ["7", 59, "11"], ["7", 60, "14"], ["7", 61, "11"], ["7", 62, "12"], ["7", 63, "11"], ["7", 64, "11"], ["7", 65, "6"], ["7", 66, "4"], ["7", 67, "3"], ["7", 68, "2"], ["7", 69, "4"], ["7", 72, "1"], ["7", 73, "1"], ["7", 74, "1"], ["7", 75, "1"], ["7", 84, "1"], ["7", 85, "1"], ["7", 86, "1"], ["7", 87, "2"], ["7", 89, "1"], ["7", 90, "2"], ["7", 91, "4"], ["7", 92, "5"], ["7", 93, "6"], ["7", 94, "6"], ["7", 95, "5"], ["7", 96, "6"], ["7", 97, "5"], ["7", 98, "4"], ["7", 99, "6"], ["7", 100, "6"], ["7", 101, "7"], ["7", 102, "9"], ["7", 103, "8"], ["7", 104, "7"], ["7", 105, "8"], ["7", 106, "8"], ["7", 107, "7"], ["7", 108, "6"], ["7", 109, "5"], ["7", 110, "3"], ["7", 111, "2"], ["7", 112, "4"], ["7", 113, "3"], ["7", 114, "3"], ["7", 115, "5"], ["7", 116, "5"], ["7", 117, "6"], ["7", 118, "6"], ["7", 119, "6"], ["7", 120, "4"], ["7", 121, "3"], ["7", 122, "4"], ["7", 123, "3"], ["7", 124, "3"], ["7", 125, "6"], ["7", 126, "5"], ["7", 127, "5"], ["7", 128, "5"], ["7", 129, "4"], ["7", 130, "5"], ["7", 131, "4"], ["7", 132, "8"], ["7", 133, "9"], ["7", 134, "8"], ["7", 135, "11"], ["7", 136, "11"], ["7", 137, "11"], ["7", 138, "7"], ["7", 139, "8"], ["7", 140, "5"], ["7", 141, "5"], ["7", 142, "2"], ["7", 143, "3"], ["7", 144, "2"], ["7", 145, "1"], ["7", 146, "1"], ["7", 149, "1"], ["7", 150, "1"], ["7", 151, "1"], ["7", 152, "1"], ["7", 153, "1"], ["7", 154, "1"], ["7", 155, "1"], ["7", 156, "2"], ["7", 157, "2"], ["7", 158, "2"], ["7", 159, "1"], ["7", 160, "2"], ["7", 161, "2"], ["7", 162, "2"], ["7", 163, "3"], ["7", 164, "3"], ["7", 165, "4"], ["7", 166, "4"], ["7", 167, "3"], ["7", 168, "2"], ["7", 169, "3"], ["7", 170, "4"], ["7", 171, "3"], ["7", 172, "3"], ["7", 173, "1"], ["7", 176, "1"], ["7", 177, "1"], ["7", 184, "1"], ["7", 185, "1"], ["7", 207, "1"], ["8", 1, "1"], ["8", 2, "2"], ["8", 3, "7"], ["8", 4, "9"], ["8", 5, "8"], ["8", 6, "13"], ["8", 7, "15"], ["8", 8, "13"], ["8", 9, "13"], ["8", 10, "16"], ["8", 11, "16"], ["8", 12, "14"], ["8", 13, "11"], ["8", 14, "14"], ["8", 15, "16"], ["8", 16, "15"], ["8", 17, "16"], ["8", 18, "16"], ["8", 19, "14"], ["8", 20, "13"], ["8", 21, "13"], ["8", 22, "16"], ["8", 23, "15"], ["8", 24, "13"], ["8", 25, "15"], ["8", 26, "12"], ["8", 27, "17"], ["8", 28, "15"], ["8", 29, "15"], ["8", 30, "15"], ["8", 31, "16"], ["8", 32, "15"], ["8", 33, "14"], ["8", 34, "15"], ["8", 35, "16"], ["8", 36, "19"], ["8", 37, "18"], ["8", 38, "18"], ["8", 39, "19"], ["8", 40, "18"], ["8", 41, "18"], ["8", 42, "18"], ["8", 43, "19"], ["8", 44, "20"], ["8", 45, "18"], ["8", 46, "18"], ["8", 47, "16"], ["8", 48, "15"], ["8", 49, "16"], ["8", 50, "18"], ["8", 51, "16"], ["8", 52, "16"], ["8", 53, "13"], ["8", 54, "14"], ["8", 55, "15"], ["8", 56, "14"], ["8", 57, "11"], ["8", 58, "12"], ["8", 59, "14"], ["8", 60, "12"], ["8", 61, "12"], ["8", 62, "10"], ["8", 63, "12"], ["8", 64, "12"], ["8", 65, "8"], ["8", 66, "9"], ["8", 67, "6"], ["8", 68, "8"], ["8", 69, "5"], ["8", 70, "3"], ["8", 71, "1"], ["8", 72, "1"], ["8", 73, "1"], ["8", 74, "1"], ["8", 80, "2"], ["8", 81, "1"], ["8", 83, "1"], ["8", 84, "1"], ["8", 86, "3"], ["8", 87, "2"], ["8", 88, "1"], ["8", 89, "3"], ["8", 90, "4"], ["8", 91, "5"], ["8", 92, "4"], ["8", 93, "6"], ["8", 94, "4"], ["8", 95, "4"], ["8", 96, "5"], ["8", 97, "4"], ["8", 98, "6"], ["8", 99, "6"], ["8", 100, "7"], ["8", 101, "8"], ["8", 102, "9"], ["8", 103, "5"], ["8", 104, "5"], ["8", 105, "5"], ["8", 106, "3"], ["8", 107, "6"], ["8", 108, "5"], ["8", 109, "6"], ["8", 110, "5"], ["8", 111, "3"], ["8", 112, "3"], ["8", 113, "4"], ["8", 114, "4"], ["8", 115, "4"], ["8", 116, "7"], ["8", 117, "7"], ["8", 118, "7"], ["8", 119, "6"], ["8", 120, "5"], ["8", 121, "2"], ["8", 122, "4"], ["8", 123, "3"], ["8", 124, "6"], ["8", 125, "5"], ["8", 126, "6"], ["8", 127, "5"], ["8", 128, "5"], ["8", 129, "6"], ["8", 130, "6"], ["8", 131, "5"], ["8", 132, "5"], ["8", 133, "8"], ["8", 134, "10"], ["8", 135, "13"], ["8", 136, "14"], ["8", 137, "11"], ["8", 138, "10"], ["8", 139, "9"], ["8", 140, "5"], ["8", 141, "6"], ["8", 142, "4"], ["8", 143, "2"], ["8", 144, "2"], ["8", 145, "1"], ["8", 146, "1"], ["8", 148, "1"], ["8", 149, "2"], ["8", 150, "1"], ["8", 151, "1"], ["8", 152, "1"], ["8", 153, "1"], ["8", 154, "1"], ["8", 155, "2"], ["8", 156, "2"], ["8", 157, "3"], ["8", 158, "3"], ["8", 159, "4"], ["8", 160, "3"], ["8", 161, "2"], ["8", 162, "3"], ["8", 163, "4"], ["8", 164, "4"], ["8", 165, "4"], ["8", 166, "4"], ["8", 167, "4"], ["8", 168, "5"], ["8", 169, "4"], ["8", 170, "4"], ["8", 171, "3"], ["8", 172, "4"], ["8", 173, "4"], ["8", 174, "4"], ["8", 175, "3"], ["8", 176, "1"], ["8", 177, "1"], ["8", 179, "1"], ["8", 184, "1"], ["8", 185, "2"], ["8", 198, "1"], ["9", 1, "1"], ["9", 2, "2"], ["9", 3, "7"], ["9", 4, "9"], ["9", 5, "8"], ["9", 6, "13"], ["9", 7, "15"], ["9", 8, "13"], ["9", 9, "13"], ["9", 10, "16"], ["9", 11, "16"], ["9", 12, "14"], ["9", 13, "11"], ["9", 14, "14"], ["9", 15, "16"], ["9", 16, "15"], ["9", 17, "16"], ["9", 18, "16"], ["9", 19, "14"], ["9", 20, "13"], ["9", 21, "13"], ["9", 22, "16"], ["9", 23, "15"], ["9", 24, "13"], ["9", 25, "15"], ["9", 26, "12"], ["9", 27, "17"], ["9", 28, "15"], ["9", 29, "15"], ["9", 30, "15"], ["9", 31, "16"], ["9", 32, "15"], ["9", 33, "14"], ["9", 34, "15"], ["9", 35, "16"], ["9", 36, "19"], ["9", 37, "18"], ["9", 38, "18"], ["9", 39, "19"], ["9", 40, "18"], ["9", 41, "18"], ["9", 42, "18"], ["9", 43, "19"], ["9", 44, "20"], ["9", 45, "18"], ["9", 46, "18"], ["9", 47, "16"], ["9", 48, "15"], ["9", 49, "16"], ["9", 50, "18"], ["9", 51, "16"], ["9", 52, "16"], ["9", 53, "13"], ["9", 54, "14"], ["9", 55, "15"], ["9", 56, "14"], ["9", 57, "11"], ["9", 58, "12"], ["9", 59, "14"], ["9", 60, "12"], ["9", 61, "12"], ["9", 62, "10"], ["9", 63, "12"], ["9", 64, "12"], ["9", 65, "8"], ["9", 66, "9"], ["9", 67, "6"], ["9", 68, "8"], ["9", 69, "5"], ["9", 70, "3"], ["9", 71, "1"], ["9", 72, "1"], ["9", 73, "1"], ["9", 74, "1"], ["9", 80, "2"], ["9", 81, "1"], ["9", 83, "1"], ["9", 84, "1"], ["9", 86, "3"], ["9", 87, "2"], ["9", 88, "1"], ["9", 89, "3"], ["9", 90, "4"], ["9", 91, "5"], ["9", 92, "4"], ["9", 93, "6"], ["9", 94, "4"], ["9", 95, "4"], ["9", 96, "5"], ["9", 97, "4"], ["9", 98, "6"], ["9", 99, "6"], ["9", 100, "7"], ["9", 101, "8"], ["9", 102, "9"], ["9", 103, "5"], ["9", 104, "5"], ["9", 105, "5"], ["9", 106, "3"], ["9", 107, "6"], ["9", 108, "5"], ["9", 109, "6"], ["9", 110, "5"], ["9", 111, "3"], ["9", 112, "3"], ["9", 113, "4"], ["9", 114, "4"], ["9", 115, "4"], ["9", 116, "7"], ["9", 117, "7"], ["9", 118, "7"], ["9", 119, "6"], ["9", 120, "5"], ["9", 121, "2"], ["9", 122, "4"], ["9", 123, "3"], ["9", 124, "6"], ["9", 125, "5"], ["9", 126, "6"], ["9", 127, "5"], ["9", 128, "5"], ["9", 129, "6"], ["9", 130, "6"], ["9", 131, "5"], ["9", 132, "5"], ["9", 133, "8"], ["9", 134, "10"], ["9", 135, "13"], ["9", 136, "14"], ["9", 137, "11"], ["9", 138, "10"], ["9", 139, "9"], ["9", 140, "5"], ["9", 141, "6"], ["9", 142, "4"], ["9", 143, "2"], ["9", 144, "2"], ["9", 145, "1"], ["9", 146, "1"], ["9", 148, "1"], ["9", 149, "2"], ["9", 150, "1"], ["9", 151, "1"], ["9", 152, "1"], ["9", 153, "1"], ["9", 154, "1"], ["9", 155, "2"], ["9", 156, "2"], ["9", 157, "3"], ["9", 158, "3"], ["9", 159, "4"], ["9", 160, "3"], ["9", 161, "2"], ["9", 162, "3"], ["9", 163, "4"], ["9", 164, "4"], ["9", 165, "4"], ["9", 166, "4"], ["9", 167, "4"], ["9", 168, "5"], ["9", 169, "4"], ["9", 170, "4"], ["9", 171, "3"], ["9", 172, "4"], ["9", 173, "4"], ["9", 174, "4"], ["9", 175, "3"], ["9", 176, "1"], ["9", 177, "1"], ["9", 179, "1"], ["9", 184, "1"], ["9", 185, "2"], ["9", 198, "1"], ["10", 1, "1"], ["10", 2, "2"], ["10", 3, "7"], ["10", 4, "7"], ["10", 5, "8"], ["10", 6, "12"], ["10", 7, "14"], ["10", 8, "14"], ["10", 9, "15"], ["10", 10, "16"], ["10", 11, "16"], ["10", 12, "14"], ["10", 13, "12"], ["10", 14, "14"], ["10", 15, "16"], ["10", 16, "15"], ["10", 17, "17"], ["10", 18, "17"], ["10", 19, "15"], ["10", 20, "15"], ["10", 21, "15"], ["10", 22, "16"], ["10", 23, "15"], ["10", 24, "13"], ["10", 25, "15"], ["10", 26, "11"], ["10", 27, "16"], ["10", 28, "15"], ["10", 29, "14"], ["10", 30, "15"], ["10", 31, "16"], ["10", 32, "14"], ["10", 33, "13"], ["10", 34, "14"], ["10", 35, "15"], ["10", 36, "19"], ["10", 37, "19"], ["10", 38, "19"], ["10", 39, "18"], ["10", 40, "18"], ["10", 41, "19"], ["10", 42, "18"], ["10", 43, "18"], ["10", 44, "20"], ["10", 45, "17"], ["10", 46, "18"], ["10", 47, "16"], ["10", 48, "13"], ["10", 49, "16"], ["10", 50, "17"], ["10", 51, "15"], ["10", 52, "14"], ["10", 53, "12"], ["10", 54, "14"], ["10", 55, "15"], ["10", 56, "14"], ["10", 57, "13"], ["10", 58, "13"], ["10", 59, "14"], ["10", 60, "12"], ["10", 61, "13"], ["10", 62, "9"], ["10", 63, "12"], ["10", 64, "12"], ["10", 65, "8"], ["10", 66, "8"], ["10", 67, "6"], ["10", 68, "7"], ["10", 69, "7"], ["10", 70, "3"], ["10", 71, "2"], ["10", 72, "3"], ["10", 73, "2"], ["10", 74, "1"], ["10", 75, "2"], ["10", 76, "2"], ["10", 77, "1"], ["10", 78, "1"], ["10", 79, "1"], ["10", 80, "3"], ["10", 81, "2"], ["10", 82, "1"], ["10", 83, "1"], ["10", 84, "2"], ["10", 85, "1"], ["10", 86, "3"], ["10", 87, "2"], ["10", 88, "3"], ["10", 89, "4"], ["10", 90, "5"], ["10", 91, "6"], ["10", 92, "6"], ["10", 93, "7"], ["10", 94, "5"], ["10", 95, "6"], ["10", 96, "5"], ["10", 97, "5"], ["10", 98, "6"], ["10", 99, "7"], ["10", 100, "9"], ["10", 101, "8"], ["10", 102, "10"], ["10", 103, "4"], ["10", 104, "6"], ["10", 105, "6"], ["10", 106, "5"], ["10", 107, "6"], ["10", 108, "5"], ["10", 109, "6"], ["10", 110, "5"], ["10", 111, "3"], ["10", 112, "3"], ["10", 113, "5"], ["10", 114, "4"], ["10", 115, "5"], ["10", 116, "8"], ["10", 117, "9"], ["10", 118, "9"], ["10", 119, "7"], ["10", 120, "5"], ["10", 121, "1"], ["10", 122, "5"], ["10", 123, "5"], ["10", 124, "6"], ["10", 125, "5"], ["10", 126, "7"], ["10", 127, "6"], ["10", 128, "5"], ["10", 129, "6"], ["10", 130, "7"], ["10", 131, "5"], ["10", 132, "5"], ["10", 133, "9"], ["10", 134, "10"], ["10", 135, "15"], ["10", 136, "14"], ["10", 137, "10"], ["10", 138, "10"], ["10", 139, "9"], ["10", 140, "6"], ["10", 141, "6"], ["10", 142, "3"], ["10", 143, "1"], ["10", 144, "2"], ["10", 145, "1"], ["10", 146, "1"], ["10", 147, "1"], ["10", 148, "2"], ["10", 149, "2"], ["10", 150, "1"], ["10", 151, "1"], ["10", 152, "1"], ["10", 153, "1"], ["10", 154, "1"], ["10", 155, "3"], ["10", 156, "3"], ["10", 157, "3"], ["10", 158, "3"], ["10", 159, "4"], ["10", 160, "4"], ["10", 161, "3"], ["10", 162, "4"], ["10", 163, "4"], ["10", 164, "4"], ["10", 165, "4"], ["10", 166, "4"], ["10", 167, "5"], ["10", 168, "5"], ["10", 169, "4"], ["10", 170, "4"], ["10", 171, "4"], ["10", 172, "5"], ["10", 173, "6"], ["10", 174, "4"], ["10", 175, "3"], ["10", 176, "2"], ["10", 177, "1"], ["10", 178, "1"], ["10", 179, "1"], ["10", 180, "1"], ["10", 181, "2"], ["10", 182, "1"], ["10", 183, "1"], ["10", 184, "1"], ["10", 185, "2"], ["10", 186, "1"], ["10", 196, "1"], ["10", 197, "1"], ["10", 198, "1"], ["11", -3, "1"], ["11", 0, "1"], ["11", 1, "3"], ["11", 2, "3"], ["11", 3, "8"], ["11", 4, "10"], ["11", 5, "8"], ["11", 6, "11"], ["11", 7, "16"], ["11", 8, "13"], ["11", 9, "15"], ["11", 10, "18"], ["11", 11, "18"], ["11", 12, "19"], ["11", 13, "19"], ["11", 14, "19"], ["11", 15, "19"], ["11", 16, "20"], ["11", 17, "20"], ["11", 18, "19"], ["11", 19, "17"], ["11", 20, "19"], ["11", 21, "19"], ["11", 22, "20"], ["11", 23, "16"], ["11", 24, "16"], ["11", 25, "18"], ["11", 26, "15"], ["11", 27, "17"], ["11", 28, "16"], ["11", 29, "14"], ["11", 30, "17"], ["11", 31, "17"], ["11", 32, "16"], ["11", 33, "14"], ["11", 34, "17"], ["11", 35, "17"], ["11", 36, "21"], ["11", 37, "20"], ["11", 38, "21"], ["11", 39, "17"], ["11", 40, "20"], ["11", 41, "20"], ["11", 42, "19"], ["11", 43, "16"], ["11", 44, "18"], ["11", 45, "16"], ["11", 46, "18"], ["11", 47, "19"], ["11", 48, "13"], ["11", 49, "15"], ["11", 50, "15"], ["11", 51, "15"], ["11", 52, "13"], ["11", 53, "11"], ["11", 54, "17"], ["11", 55, "18"], ["11", 56, "14"], ["11", 57, "13"], ["11", 58, "14"], ["11", 59, "15"], ["11", 60, "14"], ["11", 61, "14"], ["11", 62, "11"], ["11", 63, "14"], ["11", 64, "14"], ["11", 65, "13"], ["11", 66, "10"], ["11", 67, "14"], ["11", 68, "12"], ["11", 69, "12"], ["11", 70, "8"], ["11", 71, "7"], ["11", 72, "8"], ["11", 73, "6"], ["11", 74, "5"], ["11", 75, "7"], ["11", 76, "3"], ["11", 77, "2"], ["11", 78, "3"], ["11", 79, "5"], ["11", 80, "6"], ["11", 81, "7"], ["11", 82, "7"], ["11", 83, "4"], ["11", 84, "5"], ["11", 85, "6"], ["11", 86, "5"], ["11", 87, "4"], ["11", 88, "6"], ["11", 89, "4"], ["11", 90, "9"], ["11", 91, "7"], ["11", 92, "8"], ["11", 93, "8"], ["11", 94, "5"], ["11", 95, "7"], ["11", 96, "8"], ["11", 97, "8"], ["11", 98, "11"], ["11", 99, "11"], ["11", 100, "10"], ["11", 101, "9"], ["11", 102, "10"], ["11", 103, "9"], ["11", 104, "12"], ["11", 105, "9"], ["11", 106, "8"], ["11", 107, "7"], ["11", 108, "6"], ["11", 109, "7"], ["11", 110, "7"], ["11", 111, "8"], ["11", 112, "7"], ["11", 113, "6"], ["11", 114, "10"], ["11", 115, "8"], ["11", 116, "12"], ["11", 117, "13"], ["11", 118, "15"], ["11", 119, "12"], ["11", 120, "9"], ["11", 121, "4"], ["11", 122, "11"], ["11", 123, "10"], ["11", 124, "10"], ["11", 125, "11"], ["11", 126, "11"], ["11", 127, "12"], ["11", 128, "9"], ["11", 129, "9"], ["11", 130, "9"], ["11", 131, "11"], ["11", 132, "10"], ["11", 133, "10"], ["11", 134, "14"], ["11", 135, "17"], ["11", 136, "14"], ["11", 137, "11"], ["11", 138, "11"], ["11", 139, "9"], ["11", 140, "10"], ["11", 141, "11"], ["11", 142, "6"], ["11", 143, "6"], ["11", 144, "4"], ["11", 145, "5"], ["11", 146, "6"], ["11", 147, "7"], ["11", 148, "5"], ["11", 149, "6"], ["11", 150, "4"], ["11", 151, "5"], ["11", 152, "4"], ["11", 153, "2"], ["11", 154, "4"], ["11", 155, "5"], ["11", 156, "6"], ["11", 157, "6"], ["11", 158, "7"], ["11", 159, "8"], ["11", 160, "6"], ["11", 161, "9"], ["11", 162, "8"], ["11", 163, "8"], ["11", 164, "6"], ["11", 165, "6"], ["11", 166, "6"], ["11", 167, "9"], ["11", 168, "7"], ["11", 169, "7"], ["11", 170, "8"], ["11", 171, "9"], ["11", 172, "10"], ["11", 173, "9"], ["11", 174, "7"], ["11", 175, "6"], ["11", 176, "6"], ["11", 177, "4"], ["11", 178, "4"], ["11", 179, "4"], ["11", 180, "3"], ["11", 181, "2"], ["11", 182, "1"], ["11", 183, "4"], ["11", 184, "5"], ["11", 185, "2"], ["11", 186, "3"], ["11", 187, "2"], ["11", 188, "1"], ["11", 189, "1"], ["11", 190, "1"], ["11", 191, "1"], ["11", 195, "1"], ["11", 196, "1"], ["11", 197, "1"], ["11", 198, "1"], ["11", 199, "1"], ["11", 200, "1"], ["12", -67, "1"], ["12", -3, "1"], ["12", 0, "1"], ["12", 1, "3"], ["12", 2, "3"], ["12", 3, "8"], ["12", 4, "10"], ["12", 5, "7"], ["12", 6, "10"], ["12", 7, "16"], ["12", 8, "12"], ["12", 9, "13"], ["12", 10, "17"], ["12", 11, "17"], ["12", 12, "18"], ["12", 13, "19"], ["12", 14, "19"], ["12", 15, "18"], ["12", 16, "21"], ["12", 17, "20"], ["12", 18, "19"], ["12", 19, "18"], ["12", 20, "19"], ["12", 21, "19"], ["12", 22, "19"], ["12", 23, "15"], ["12", 24, "15"], ["12", 25, "17"], ["12", 26, "15"], ["12", 27, "18"], ["12", 28, "16"], ["12", 29, "14"], ["12", 30, "18"], ["12", 31, "18"], ["12", 32, "18"], ["12", 33, "15"], ["12", 34, "16"], ["12", 35, "17"], ["12", 36, "21"], ["12", 37, "20"], ["12", 38, "21"], ["12", 39, "18"], ["12", 40, "20"], ["12", 41, "20"], ["12", 42, "20"], ["12", 43, "18"], ["12", 44, "18"], ["12", 45, "16"], ["12", 46, "18"], ["12", 47, "18"], ["12", 48, "14"], ["12", 49, "14"], ["12", 50, "15"], ["12", 51, "14"], ["12", 52, "12"], ["12", 53, "10"], ["12", 54, "16"], ["12", 55, "18"], ["12", 56, "12"], ["12", 57, "12"], ["12", 58, "12"], ["12", 59, "14"], ["12", 60, "14"], ["12", 61, "12"], ["12", 62, "10"], ["12", 63, "13"], ["12", 64, "14"], ["12", 65, "12"], ["12", 66, "10"], ["12", 67, "14"], ["12", 68, "10"], ["12", 69, "10"], ["12", 70, "9"], ["12", 71, "8"], ["12", 72, "7"], ["12", 73, "6"], ["12", 74, "5"], ["12", 75, "7"], ["12", 76, "3"], ["12", 77, "3"], ["12", 78, "3"], ["12", 79, "5"], ["12", 80, "6"], ["12", 81, "7"], ["12", 82, "8"], ["12", 83, "4"], ["12", 84, "6"], ["12", 85, "6"], ["12", 86, "4"], ["12", 87, "4"], ["12", 88, "5"], ["12", 89, "5"], ["12", 90, "8"], ["12", 91, "6"], ["12", 92, "7"], ["12", 93, "7"], ["12", 94, "5"], ["12", 95, "7"], ["12", 96, "9"], ["12", 97, "8"], ["12", 98, "11"], ["12", 99, "12"], ["12", 100, "8"], ["12", 101, "10"], ["12", 102, "9"], ["12", 103, "10"], ["12", 104, "11"], ["12", 105, "9"], ["12", 106, "8"], ["12", 107, "7"], ["12", 108, "6"], ["12", 109, "8"], ["12", 110, "7"], ["12", 111, "8"], ["12", 112, "8"], ["12", 113, "6"], ["12", 114, "10"], ["12", 115, "8"], ["12", 116, "11"], ["12", 117, "12"], ["12", 118, "14"], ["12", 119, "12"], ["12", 120, "8"], ["12", 121, "4"], ["12", 122, "11"], ["12", 123, "9"], ["12", 124, "8"], ["12", 125, "10"], ["12", 126, "11"], ["12", 127, "10"], ["12", 128, "9"], ["12", 129, "9"], ["12", 130, "9"], ["12", 131, "11"], ["12", 132, "10"], ["12", 133, "10"], ["12", 134, "14"], ["12", 135, "16"], ["12", 136, "15"], ["12", 137, "12"], ["12", 138, "11"], ["12", 139, "10"], ["12", 140, "10"], ["12", 141, "11"], ["12", 142, "6"], ["12", 143, "7"], ["12", 144, "4"], ["12", 145, "5"], ["12", 146, "6"], ["12", 147, "7"], ["12", 148, "5"], ["12", 149, "7"], ["12", 150, "4"], ["12", 151, "6"], ["12", 152, "4"], ["12", 153, "2"], ["12", 154, "5"], ["12", 155, "5"], ["12", 156, "6"], ["12", 157, "7"], ["12", 158, "7"], ["12", 159, "8"], ["12", 160, "6"], ["12", 161, "9"], ["12", 162, "8"], ["12", 163, "8"], ["12", 164, "6"], ["12", 165, "6"], ["12", 166, "6"], ["12", 167, "9"], ["12", 168, "7"], ["12", 169, "7"], ["12", 170, "8"], ["12", 171, "9"], ["12", 172, "11"], ["12", 173, "9"], ["12", 174, "9"], ["12", 175, "6"], ["12", 176, "6"], ["12", 177, "5"], ["12", 178, "4"], ["12", 179, "6"], ["12", 180, "4"], ["12", 181, "3"], ["12", 182, "1"], ["12", 183, "4"], ["12", 184, "6"], ["12", 185, "2"], ["12", 186, "3"], ["12", 187, "2"], ["12", 188, "1"], ["12", 189, "1"], ["12", 190, "1"], ["12", 191, "2"], ["12", 192, "1"], ["12", 195, "1"], ["12", 196, "1"], ["12", 197, "1"], ["12", 198, "1"], ["12", 199, "1"], ["12", 200, "2"], ["13", -67, "1"], ["13", -3, "1"], ["13", 0, "1"], ["13", 1, "3"], ["13", 2, "3"], ["13", 3, "6"], ["13", 4, "6"], ["13", 5, "6"], ["13", 6, "3"], ["13", 7, "11"], ["13", 8, "11"], ["13", 9, "11"], ["13", 10, "14"], ["13", 11, "10"], ["13", 12, "12"], ["13", 13, "16"], ["13", 14, "17"], ["13", 15, "16"], ["13", 16, "17"], ["13", 17, "15"], ["13", 18, "14"], ["13", 19, "17"], ["13", 20, "18"], ["13", 21, "16"], ["13", 22, "13"], ["13", 23, "14"], ["13", 24, "14"], ["13", 25, "17"], ["13", 26, "15"], ["13", 27, "16"], ["13", 28, "15"], ["13", 29, "13"], ["13", 30, "17"], ["13", 31, "13"], ["13", 32, "15"], ["13", 33, "16"], ["13", 34, "14"], ["13", 35, "16"], ["13", 36, "21"], ["13", 37, "19"], ["13", 38, "15"], ["13", 39, "18"], ["13", 40, "17"], ["13", 41, "19"], ["13", 42, "18"], ["13", 43, "16"], ["13", 44, "17"], ["13", 45, "14"], ["13", 46, "18"], ["13", 47, "14"], ["13", 48, "12"], ["13", 49, "12"], ["13", 50, "14"], ["13", 51, "11"], ["13", 52, "9"], ["13", 53, "8"], ["13", 54, "14"], ["13", 55, "17"], ["13", 56, "10"], ["13", 57, "9"], ["13", 58, "11"], ["13", 59, "11"], ["13", 60, "11"], ["13", 61, "8"], ["13", 62, "9"], ["13", 63, "10"], ["13", 64, "10"], ["13", 65, "12"], ["13", 66, "10"], ["13", 67, "12"], ["13", 68, "10"], ["13", 69, "10"], ["13", 70, "8"], ["13", 71, "7"], ["13", 72, "6"], ["13", 73, "6"], ["13", 74, "5"], ["13", 75, "7"], ["13", 76, "3"], ["13", 77, "3"], ["13", 78, "3"], ["13", 79, "5"], ["13", 80, "6"], ["13", 81, "5"], ["13", 82, "8"], ["13", 83, "3"], ["13", 84, "6"], ["13", 85, "6"], ["13", 86, "4"], ["13", 87, "4"], ["13", 88, "5"], ["13", 89, "5"], ["13", 90, "7"], ["13", 91, "6"], ["13", 92, "8"], ["13", 93, "7"], ["13", 94, "5"], ["13", 95, "6"], ["13", 96, "7"], ["13", 97, "9"], ["13", 98, "8"], ["13", 99, "11"], ["13", 100, "7"], ["13", 101, "10"], ["13", 102, "7"], ["13", 103, "6"], ["13", 104, "9"], ["13", 105, "5"], ["13", 106, "7"], ["13", 107, "5"], ["13", 108, "6"], ["13", 109, "8"], ["13", 110, "8"], ["13", 111, "7"], ["13", 112, "7"], ["13", 113, "6"], ["13", 114, "7"], ["13", 115, "7"], ["13", 116, "9"], ["13", 117, "9"], ["13", 118, "12"], ["13", 119, "9"], ["13", 120, "6"], ["13", 121, "4"], ["13", 122, "11"], ["13", 123, "9"], ["13", 124, "8"], ["13", 125, "7"], ["13", 126, "10"], ["13", 127, "8"], ["13", 128, "9"], ["13", 129, "7"], ["13", 130, "7"], ["13", 131, "8"], ["13", 132, "7"], ["13", 133, "9"], ["13", 134, "10"], ["13", 135, "12"], ["13", 136, "15"], ["13", 137, "9"], ["13", 138, "9"], ["13", 139, "6"], ["13", 140, "9"], ["13", 141, "10"], ["13", 142, "6"], ["13", 143, "7"], ["13", 144, "4"], ["13", 145, "5"], ["13", 146, "6"], ["13", 147, "6"], ["13", 148, "5"], ["13", 149, "6"], ["13", 150, "5"], ["13", 151, "6"], ["13", 152, "4"], ["13", 153, "1"], ["13", 154, "5"], ["13", 155, "6"], ["13", 156, "7"], ["13", 157, "7"], ["13", 158, "7"], ["13", 159, "7"], ["13", 160, "6"], ["13", 161, "8"], ["13", 162, "8"], ["13", 163, "8"], ["13", 164, "6"], ["13", 165, "6"], ["13", 166, "6"], ["13", 167, "9"], ["13", 168, "7"], ["13", 169, "6"], ["13", 170, "7"], ["13", 171, "9"], ["13", 172, "11"], ["13", 173, "9"], ["13", 174, "8"], ["13", 175, "6"], ["13", 176, "5"], ["13", 177, "5"], ["13", 178, "4"], ["13", 179, "5"], ["13", 180, "4"], ["13", 181, "3"], ["13", 182, "1"], ["13", 183, "5"], ["13", 184, "6"], ["13", 185, "2"], ["13", 186, "3"], ["13", 187, "2"], ["13", 188, "1"], ["13", 189, "1"], ["13", 190, "1"], ["13", 191, "1"], ["13", 192, "1"], ["13", 195, "1"], ["13", 196, "1"], ["13", 197, "1"], ["13", 198, "1"], ["13", 199, "1"], ["13", 200, "2"], ["14", -67, "1"], ["14", -3, "1"], ["14", 0, "2"], ["14", 1, "4"], ["14", 2, "3"], ["14", 3, "6"], ["14", 4, "6"], ["14", 5, "6"], ["14", 6, "3"], ["14", 7, "11"], ["14", 8, "11"], ["14", 9, "11"], ["14", 10, "14"], ["14", 11, "9"], ["14", 12, "12"], ["14", 13, "16"], ["14", 14, "17"], ["14", 15, "16"], ["14", 16, "15"], ["14", 17, "14"], ["14", 18, "13"], ["14", 19, "17"], ["14", 20, "17"], ["14", 21, "16"], ["14", 22, "13"], ["14", 23, "14"], ["14", 24, "14"], ["14", 25, "17"], ["14", 26, "15"], ["14", 27, "16"], ["14", 28, "15"], ["14", 29, "14"], ["14", 30, "17"], ["14", 31, "13"], ["14", 32, "15"], ["14", 33, "15"], ["14", 34, "15"], ["14", 35, "16"], ["14", 36, "20"], ["14", 37, "19"], ["14", 38, "15"], ["14", 39, "17"], ["14", 40, "16"], ["14", 41, "18"], ["14", 42, "18"], ["14", 43, "16"], ["14", 44, "16"], ["14", 45, "14"], ["14", 46, "18"], ["14", 47, "14"], ["14", 48, "12"], ["14", 49, "12"], ["14", 50, "15"], ["14", 51, "11"], ["14", 52, "9"], ["14", 53, "8"], ["14", 54, "14"], ["14", 55, "17"], ["14", 56, "11"], ["14", 57, "9"], ["14", 58, "12"], ["14", 59, "11"], ["14", 60, "11"], ["14", 61, "8"], ["14", 62, "9"], ["14", 63, "10"], ["14", 64, "10"], ["14", 65, "12"], ["14", 66, "10"], ["14", 67, "12"], ["14", 68, "10"], ["14", 69, "10"], ["14", 70, "7"], ["14", 71, "7"], ["14", 72, "7"], ["14", 73, "6"], ["14", 74, "5"], ["14", 75, "7"], ["14", 76, "3"], ["14", 77, "3"], ["14", 78, "3"], ["14", 79, "5"], ["14", 80, "6"], ["14", 81, "5"], ["14", 82, "8"], ["14", 83, "3"], ["14", 84, "6"], ["14", 85, "6"], ["14", 86, "4"], ["14", 87, "4"], ["14", 88, "5"], ["14", 89, "5"], ["14", 90, "7"], ["14", 91, "6"], ["14", 92, "8"], ["14", 93, "7"], ["14", 94, "5"], ["14", 95, "6"], ["14", 96, "7"], ["14", 97, "9"], ["14", 98, "8"], ["14", 99, "11"], ["14", 100, "7"], ["14", 101, "10"], ["14", 102, "7"], ["14", 103, "6"], ["14", 104, "9"], ["14", 105, "5"], ["14", 106, "7"], ["14", 107, "5"], ["14", 108, "6"], ["14", 109, "8"], ["14", 110, "8"], ["14", 111, "7"], ["14", 112, "7"], ["14", 113, "6"], ["14", 114, "7"], ["14", 115, "7"], ["14", 116, "9"], ["14", 117, "9"], ["14", 118, "12"], ["14", 119, "9"], ["14", 120, "6"], ["14", 121, "4"], ["14", 122, "11"], ["14", 123, "9"], ["14", 124, "8"], ["14", 125, "7"], ["14", 126, "10"], ["14", 127, "9"], ["14", 128, "9"], ["14", 129, "7"], ["14", 130, "7"], ["14", 131, "8"], ["14", 132, "7"], ["14", 133, "9"], ["14", 134, "9"], ["14", 135, "12"], ["14", 136, "15"], ["14", 137, "9"], ["14", 138, "9"], ["14", 139, "6"], ["14", 140, "9"], ["14", 141, "10"], ["14", 142, "6"], ["14", 143, "7"], ["14", 144, "4"], ["14", 145, "5"], ["14", 146, "6"], ["14", 147, "6"], ["14", 148, "5"], ["14", 149, "6"], ["14", 150, "5"], ["14", 151, "6"], ["14", 152, "4"], ["14", 153, "1"], ["14", 154, "5"], ["14", 155, "6"], ["14", 156, "7"], ["14", 157, "7"], ["14", 158, "7"], ["14", 159, "7"], ["14", 160, "6"], ["14", 161, "8"], ["14", 162, "8"], ["14", 163, "8"], ["14", 164, "6"], ["14", 165, "6"], ["14", 166, "6"], ["14", 167, "9"], ["14", 168, "7"], ["14", 169, "6"], ["14", 170, "7"], ["14", 171, "9"], ["14", 172, "11"], ["14", 173, "9"], ["14", 174, "8"], ["14", 175, "6"], ["14", 176, "5"], ["14", 177, "5"], ["14", 178, "4"], ["14", 179, "5"], ["14", 180, "4"], ["14", 181, "4"], ["14", 182, "1"], ["14", 183, "5"], ["14", 184, "5"], ["14", 185, "2"], ["14", 186, "3"], ["14", 187, "2"], ["14", 188, "1"], ["14", 189, "1"], ["14", 190, "1"], ["14", 191, "1"], ["14", 192, "1"], ["14", 195, "1"], ["14", 196, "1"], ["14", 197, "1"], ["14", 198, "1"], ["14", 199, "1"], ["14", 200, "2"], ["15", -67, "1"], ["15", -3, "1"], ["15", 0, "2"], ["15", 1, "4"], ["15", 2, "3"], ["15", 3, "6"], ["15", 4, "6"], ["15", 5, "6"], ["15", 6, "3"], ["15", 7, "11"], ["15", 8, "11"], ["15", 9, "11"], ["15", 10, "14"], ["15", 11, "9"], ["15", 12, "12"], ["15", 13, "16"], ["15", 14, "17"], ["15", 15, "16"], ["15", 16, "15"], ["15", 17, "14"], ["15", 18, "13"], ["15", 19, "17"], ["15", 20, "17"], ["15", 21, "16"], ["15", 22, "13"], ["15", 23, "14"], ["15", 24, "14"], ["15", 25, "17"], ["15", 26, "15"], ["15", 27, "16"], ["15", 28, "15"], ["15", 29, "14"], ["15", 30, "17"], ["15", 31, "13"], ["15", 32, "15"], ["15", 33, "15"], ["15", 34, "15"], ["15", 35, "16"], ["15", 36, "20"], ["15", 37, "19"], ["15", 38, "15"], ["15", 39, "17"], ["15", 40, "16"], ["15", 41, "18"], ["15", 42, "18"], ["15", 43, "16"], ["15", 44, "16"], ["15", 45, "14"], ["15", 46, "18"], ["15", 47, "14"], ["15", 48, "12"], ["15", 49, "12"], ["15", 50, "15"], ["15", 51, "11"], ["15", 52, "9"], ["15", 53, "8"], ["15", 54, "14"], ["15", 55, "17"], ["15", 56, "11"], ["15", 57, "9"], ["15", 58, "12"], ["15", 59, "11"], ["15", 60, "11"], ["15", 61, "8"], ["15", 62, "9"], ["15", 63, "10"], ["15", 64, "10"], ["15", 65, "12"], ["15", 66, "10"], ["15", 67, "12"], ["15", 68, "10"], ["15", 69, "10"], ["15", 70, "7"], ["15", 71, "7"], ["15", 72, "7"], ["15", 73, "6"], ["15", 74, "5"], ["15", 75, "7"], ["15", 76, "3"], ["15", 77, "3"], ["15", 78, "3"], ["15", 79, "5"], ["15", 80, "6"], ["15", 81, "5"], ["15", 82, "8"], ["15", 83, "3"], ["15", 84, "6"], ["15", 85, "6"], ["15", 86, "4"], ["15", 87, "4"], ["15", 88, "5"], ["15", 89, "5"], ["15", 90, "7"], ["15", 91, "6"], ["15", 92, "8"], ["15", 93, "7"], ["15", 94, "5"], ["15", 95, "6"], ["15", 96, "7"], ["15", 97, "9"], ["15", 98, "8"], ["15", 99, "11"], ["15", 100, "7"], ["15", 101, "10"], ["15", 102, "7"], ["15", 103, "6"], ["15", 104, "9"], ["15", 105, "5"], ["15", 106, "7"], ["15", 107, "5"], ["15", 108, "6"], ["15", 109, "8"], ["15", 110, "8"], ["15", 111, "7"], ["15", 112, "7"], ["15", 113, "6"], ["15", 114, "7"], ["15", 115, "7"], ["15", 116, "9"], ["15", 117, "9"], ["15", 118, "12"], ["15", 119, "9"], ["15", 120, "6"], ["15", 121, "4"], ["15", 122, "11"], ["15", 123, "9"], ["15", 124, "8"], ["15", 125, "7"], ["15", 126, "10"], ["15", 127, "9"], ["15", 128, "9"], ["15", 129, "7"], ["15", 130, "7"], ["15", 131, "8"], ["15", 132, "7"], ["15", 133, "9"], ["15", 134, "9"], ["15", 135, "12"], ["15", 136, "15"], ["15", 137, "9"], ["15", 138, "9"], ["15", 139, "6"], ["15", 140, "9"], ["15", 141, "10"], ["15", 142, "6"], ["15", 143, "7"], ["15", 144, "4"], ["15", 145, "5"], ["15", 146, "6"], ["15", 147, "6"], ["15", 148, "5"], ["15", 149, "6"], ["15", 150, "5"], ["15", 151, "6"], ["15", 152, "4"], ["15", 153, "1"], ["15", 154, "5"], ["15", 155, "6"], ["15", 156, "7"], ["15", 157, "7"], ["15", 158, "7"], ["15", 159, "7"], ["15", 160, "6"], ["15", 161, "8"], ["15", 162, "8"], ["15", 163, "8"], ["15", 164, "6"], ["15", 165, "6"], ["15", 166, "6"], ["15", 167, "9"], ["15", 168, "7"], ["15", 169, "6"], ["15", 170, "7"], ["15", 171, "9"], ["15", 172, "11"], ["15", 173, "9"], ["15", 174, "8"], ["15", 175, "6"], ["15", 176, "5"], ["15", 177, "5"], ["15", 178, "4"], ["15", 179, "5"], ["15", 180, "4"], ["15", 181, "4"], ["15", 182, "1"], ["15", 183, "5"], ["15", 184, "5"], ["15", 185, "2"], ["15", 186, "3"], ["15", 187, "2"], ["15", 188, "1"], ["15", 189, "1"], ["15", 190, "1"], ["15", 191, "1"], ["15", 192, "1"], ["15", 195, "1"], ["15", 196, "1"], ["15", 197, "1"], ["15", 198, "1"], ["15", 199, "1"], ["15", 200, "2"], ["16", -67, "1"], ["16", -3, "1"], ["16", 0, "2"], ["16", 1, "4"], ["16", 2, "3"], ["16", 3, "6"], ["16", 4, "6"], ["16", 5, "6"], ["16", 6, "3"], ["16", 7, "11"], ["16", 8, "11"], ["16", 9, "11"], ["16", 10, "14"], ["16", 11, "9"], ["16", 12, "12"], ["16", 13, "16"], ["16", 14, "17"], ["16", 15, "16"], ["16", 16, "15"], ["16", 17, "14"], ["16", 18, "13"], ["16", 19, "17"], ["16", 20, "17"], ["16", 21, "16"], ["16", 22, "13"], ["16", 23, "14"], ["16", 24, "14"], ["16", 25, "17"], ["16", 26, "15"], ["16", 27, "16"], ["16", 28, "15"], ["16", 29, "14"], ["16", 30, "17"], ["16", 31, "13"], ["16", 32, "15"], ["16", 33, "15"], ["16", 34, "15"], ["16", 35, "16"], ["16", 36, "20"], ["16", 37, "19"], ["16", 38, "15"], ["16", 39, "17"], ["16", 40, "16"], ["16", 41, "18"], ["16", 42, "18"], ["16", 43, "16"], ["16", 44, "16"], ["16", 45, "14"], ["16", 46, "18"], ["16", 47, "14"], ["16", 48, "12"], ["16", 49, "12"], ["16", 50, "15"], ["16", 51, "11"], ["16", 52, "9"], ["16", 53, "8"], ["16", 54, "14"], ["16", 55, "17"], ["16", 56, "11"], ["16", 57, "9"], ["16", 58, "12"], ["16", 59, "11"], ["16", 60, "11"], ["16", 61, "8"], ["16", 62, "9"], ["16", 63, "10"], ["16", 64, "10"], ["16", 65, "12"], ["16", 66, "10"], ["16", 67, "12"], ["16", 68, "10"], ["16", 69, "10"], ["16", 70, "7"], ["16", 71, "7"], ["16", 72, "7"], ["16", 73, "6"], ["16", 74, "5"], ["16", 75, "7"], ["16", 76, "3"], ["16", 77, "3"], ["16", 78, "3"], ["16", 79, "5"], ["16", 80, "6"], ["16", 81, "5"], ["16", 82, "8"], ["16", 83, "3"], ["16", 84, "6"], ["16", 85, "6"], ["16", 86, "4"], ["16", 87, "4"], ["16", 88, "5"], ["16", 89, "5"], ["16", 90, "7"], ["16", 91, "6"], ["16", 92, "8"], ["16", 93, "7"], ["16", 94, "5"], ["16", 95, "6"], ["16", 96, "7"], ["16", 97, "9"], ["16", 98, "8"], ["16", 99, "11"], ["16", 100, "7"], ["16", 101, "10"], ["16", 102, "7"], ["16", 103, "6"], ["16", 104, "9"], ["16", 105, "5"], ["16", 106, "7"], ["16", 107, "5"], ["16", 108, "6"], ["16", 109, "8"], ["16", 110, "8"], ["16", 111, "7"], ["16", 112, "7"], ["16", 113, "6"], ["16", 114, "7"], ["16", 115, "7"], ["16", 116, "9"], ["16", 117, "9"], ["16", 118, "12"], ["16", 119, "9"], ["16", 120, "6"], ["16", 121, "4"], ["16", 122, "11"], ["16", 123, "9"], ["16", 124, "8"], ["16", 125, "7"], ["16", 126, "10"], ["16", 127, "9"], ["16", 128, "9"], ["16", 129, "7"], ["16", 130, "7"], ["16", 131, "8"], ["16", 132, "7"], ["16", 133, "9"], ["16", 134, "9"], ["16", 135, "12"], ["16", 136, "15"], ["16", 137, "9"], ["16", 138, "9"], ["16", 139, "6"], ["16", 140, "9"], ["16", 141, "10"], ["16", 142, "6"], ["16", 143, "7"], ["16", 144, "4"], ["16", 145, "5"], ["16", 146, "6"], ["16", 147, "6"], ["16", 148, "5"], ["16", 149, "6"], ["16", 150, "5"], ["16", 151, "6"], ["16", 152, "4"], ["16", 153, "1"], ["16", 154, "5"], ["16", 155, "6"], ["16", 156, "7"], ["16", 157, "7"], ["16", 158, "7"], ["16", 159, "7"], ["16", 160, "6"], ["16", 161, "8"], ["16", 162, "8"], ["16", 163, "8"], ["16", 164, "6"], ["16", 165, "6"], ["16", 166, "6"], ["16", 167, "9"], ["16", 168, "7"], ["16", 169, "6"], ["16", 170, "7"], ["16", 171, "9"], ["16", 172, "11"], ["16", 173, "9"], ["16", 174, "8"], ["16", 175, "6"], ["16", 176, "5"], ["16", 177, "5"], ["16", 178, "4"], ["16", 179, "5"], ["16", 180, "4"], ["16", 181, "4"], ["16", 182, "1"], ["16", 183, "5"], ["16", 184, "5"], ["16", 185, "2"], ["16", 186, "3"], ["16", 187, "2"], ["16", 188, "1"], ["16", 189, "1"], ["16", 190, "1"], ["16", 191, "1"], ["16", 192, "1"], ["16", 195, "1"], ["16", 196, "1"], ["16", 197, "1"], ["16", 198, "1"], ["16", 199, "1"], ["16", 200, "2"], ["17", 4, "1"], ["17", 13, "1"], ["17", 14, "2"], ["17", 15, "3"], ["17", 17, "3"], ["17", 18, "2"], ["17", 19, "1"], ["17", 20, "3"], ["17", 21, "4"], ["17", 22, "1"], ["17", 23, "3"], ["17", 24, "3"], ["17", 25, "7"], ["17", 26, "7"], ["17", 27, "6"], ["17", 28, "4"], ["17", 29, "1"], ["17", 30, "2"], ["17", 31, "3"], ["17", 32, "3"], ["17", 33, "3"], ["17", 34, "3"], ["17", 35, "4"], ["17", 36, "1"], ["17", 37, "3"], ["17", 38, "2"], ["17", 39, "1"], ["17", 40, "1"], ["17", 41, "1"], ["17", 43, "1"], ["17", 45, "1"], ["17", 47, "1"], ["17", 49, "1"], ["17", 50, "3"], ["17", 54, "1"], ["17", 58, "1"], ["17", 59, "1"], ["17", 60, "2"], ["17", 61, "2"], ["17", 62, "1"], ["17", 63, "2"], ["17", 64, "1"], ["17", 66, "1"], ["17", 119, "1"], ["17", 120, "1"], ["17", 122, "1"], ["17", 123, "1"], ["17", 126, "1"], ["17", 131, "1"], ["17", 132, "1"], ["17", 133, "2"], ["17", 134, "1"], ["17", 137, "1"], ["17", 138, "1"], ["17", 139, "1"], ["17", 140, "1"], ["17", 141, "1"], ["17", 149, "1"], ["17", 156, "1"], ["17", 163, "1"], ["19", 19, "1"], ["19", 31, "1"], ["19", 32, "2"], ["19", 33, "1"], ["19", 34, "1"], ["19", 60, "1"], ["19", 61, "1"], ["19", 62, "1"], ["19", 63, "1"], ["19", 64, "1"], ["20", 19, "1"], ["20", 31, "1"], ["20", 32, "2"], ["20", 33, "1"], ["20", 34, "1"], ["20", 60, "1"], ["20", 61, "1"], ["20", 62, "1"], ["20", 63, "1"], ["20", 64, "1"], ["21", 19, "1"], ["21", 31, "1"], ["21", 32, "2"], ["21", 33, "1"], ["21", 34, "1"], ["21", 60, "1"], ["21", 61, "1"], ["21", 62, "1"], ["21", 63, "1"], ["21", 64, "1"], ["22", 19, "1"], ["22", 31, "1"], ["22", 32, "2"], ["22", 33, "1"], ["22", 34, "1"], ["22", 60, "1"], ["22", 61, "1"], ["22", 62, "1"], ["22", 63, "1"], ["22", 64, "1"], ["23", 19, "1"], ["23", 31, "1"], ["23", 32, "2"], ["23", 33, "1"], ["23", 34, "1"], ["23", 60, "1"], ["23", 61, "1"], ["23", 62, "1"], ["23", 63, "1"], ["23", 64, "1"], ["24", 19, "1"], ["24", 31, "1"], ["24", 32, "2"], ["24", 33, "1"], ["24", 34, "1"], ["24", 60, "1"], ["24", 61, "1"], ["24", 62, "1"], ["24", 63, "1"], ["24", 64, "1"], ["25", 13, "1"], ["25", 14, "1"], ["25", 15, "1"], ["25", 16, "1"], ["25", 17, "1"], ["25", 18, "1"], ["25", 19, "1"], ["25", 20, "1"], ["25", 49, "1"], ["25", 50, "1"], ["25", 56, "1"], ["25", 58, "1"], ["25", 59, "1"], ["25", 60, "1"], ["25", 61, "1"], ["25", 62, "1"], ["25", 63, "1"], ["25", 64, "1"], ["25", 65, "1"], ["25", 66, "1"], ["25", 141, "1"], ["25", 142, "1"], ["25", 147, "1"], ["26", 13, "1"], ["26", 14, "1"], ["26", 15, "1"], ["26", 16, "1"], ["26", 17, "1"], ["26", 18, "1"], ["26", 19, "1"], ["26", 20, "1"], ["26", 49, "1"], ["26", 50, "1"], ["26", 56, "1"], ["26", 58, "1"], ["26", 59, "1"], ["26", 60, "1"], ["26", 61, "1"], ["26", 62, "1"], ["26", 63, "1"], ["26", 64, "1"], ["26", 65, "1"], ["26", 66, "1"], ["26", 141, "1"], ["26", 142, "1"], ["26", 147, "1"], ["27", 13, "1"], ["27", 14, "1"], ["27", 15, "1"], ["27", 16, "1"], ["27", 17, "1"], ["27", 18, "1"], ["27", 19, "1"], ["27", 20, "1"], ["27", 49, "1"], ["27", 50, "1"], ["27", 56, "1"], ["27", 58, "1"], ["27", 59, "1"], ["27", 60, "1"], ["27", 61, "1"], ["27", 62, "1"], ["27", 63, "1"], ["27", 64, "1"], ["27", 65, "1"], ["27", 66, "1"], ["27", 141, "1"], ["27", 142, "1"], ["27", 147, "1"], ["28", 13, "1"], ["28", 14, "1"], ["28", 15, "1"], ["28", 16, "1"], ["28", 17, "1"], ["28", 18, "1"], ["28", 19, "1"], ["28", 20, "1"], ["28", 49, "1"], ["28", 50, "1"], ["28", 56, "1"], ["28", 58, "1"], ["28", 59, "1"], ["28", 60, "1"], ["28", 61, "1"], ["28", 62, "1"], ["28", 63, "1"], ["28", 64, "1"], ["28", 65, "1"], ["28", 66, "1"], ["28", 141, "1"], ["28", 142, "1"], ["28", 147, "1"], ["29", 13, "1"], ["29", 14, "1"], ["29", 15, "1"], ["29", 16, "1"], ["29", 17, "1"], ["29", 18, "1"], ["29", 19, "1"], ["29", 20, "1"], ["29", 49, "1"], ["29", 50, "1"], ["29", 56, "1"], ["29", 58, "1"], ["29", 59, "1"], ["29", 60, "1"], ["29", 61, "1"], ["29", 62, "1"], ["29", 63, "1"], ["29", 64, "1"], ["29", 65, "1"], ["29", 66, "1"], ["29", 141, "1"], ["29", 142, "1"], ["29", 147, "1"], ["30", 8, "1"], ["30", 9, "1"], ["30", 10, "1"], ["30", 11, "1"], ["30", 12, "1"], ["30", 13, "1"], ["30", 14, "1"], ["30", 15, "1"], ["30", 16, "1"], ["30", 17, "1"], ["30", 18, "1"], ["30", 19, "1"], ["30", 20, "1"], ["30", 21, "1"], ["30", 35, "1"], ["30", 36, "1"], ["30", 43, "1"], ["30", 44, "1"], ["30", 48, "1"], ["30", 49, "1"], ["30", 50, "1"], ["30", 51, "1"], ["30", 52, "1"], ["30", 53, "1"], ["30", 54, "1"], ["30", 55, "1"], ["30", 56, "1"], ["30", 57, "1"], ["30", 58, "1"], ["30", 59, "1"], ["30", 60, "1"], ["30", 61, "1"], ["30", 62, "1"], ["30", 63, "1"], ["30", 64, "1"], ["30", 65, "1"], ["31", 8, "1"], ["31", 9, "1"], ["31", 10, "1"], ["31", 11, "1"], ["31", 12, "1"], ["31", 13, "1"], ["31", 14, "1"], ["31", 15, "1"], ["31", 16, "1"], ["31", 17, "1"], ["31", 18, "1"], ["31", 19, "1"], ["31", 20, "1"], ["31", 21, "1"], ["31", 35, "1"], ["31", 36, "1"], ["31", 43, "1"], ["31", 44, "1"], ["31", 48, "1"], ["31", 49, "1"], ["31", 50, "1"], ["31", 51, "1"], ["31", 52, "1"], ["31", 53, "1"], ["31", 54, "1"], ["31", 55, "1"], ["31", 56, "1"], ["31", 57, "1"], ["31", 58, "1"], ["31", 59, "1"], ["31", 60, "1"], ["31", 61, "1"], ["31", 62, "1"], ["31", 63, "1"], ["31", 64, "1"], ["31", 65, "1"], ["32", 7, "1"], ["32", 8, "1"], ["32", 9, "1"], ["32", 10, "1"], ["32", 11, "1"], ["32", 12, "1"], ["32", 13, "1"], ["32", 35, "1"], ["32", 36, "1"], ["32", 43, "1"], ["32", 44, "1"], ["32", 54, "1"], ["32", 58, "1"], ["32", 59, "1"], ["32", 60, "1"], ["32", 61, "1"], ["32", 62, "1"], ["32", 63, "1"], ["32", 64, "1"], ["32", 65, "1"], ["33", 7, "1"], ["33", 8, "1"], ["33", 9, "1"], ["33", 10, "1"], ["33", 11, "1"], ["33", 12, "1"], ["33", 13, "1"], ["33", 32, "1"], ["33", 34, "1"], ["33", 35, "1"], ["33", 36, "1"], ["33", 40, "1"], ["33", 41, "1"], ["33", 42, "3"], ["33", 43, "1"], ["33", 45, "1"], ["33", 46, "1"], ["33", 51, "1"], ["33", 52, "1"], ["33", 53, "1"], ["33", 54, "2"], ["33", 55, "1"], ["33", 56, "1"], ["33", 58, "1"], ["33", 59, "1"], ["33", 60, "1"], ["33", 61, "1"], ["33", 62, "1"], ["33", 63, "1"], ["33", 64, "1"], ["33", 65, "1"], ["34", 7, "1"], ["34", 8, "1"], ["34", 9, "1"], ["34", 10, "1"], ["34", 11, "1"], ["34", 12, "1"], ["34", 13, "1"], ["34", 32, "1"], ["34", 34, "1"], ["34", 35, "1"], ["34", 36, "1"], ["34", 40, "1"], ["34", 41, "1"], ["34", 42, "3"], ["34", 43, "1"], ["34", 45, "1"], ["34", 46, "1"], ["34", 51, "1"], ["34", 52, "1"], ["34", 53, "1"], ["34", 54, "2"], ["34", 55, "1"], ["34", 56, "1"], ["34", 58, "1"], ["34", 59, "1"], ["34", 60, "1"], ["34", 61, "1"], ["34", 62, "1"], ["34", 63, "1"], ["34", 64, "1"], ["34", 65, "1"], ["35", 7, "1"], ["35", 8, "1"], ["35", 9, "1"], ["35", 10, "1"], ["35", 11, "1"], ["35", 12, "1"], ["35", 13, "1"], ["35", 32, "1"], ["35", 34, "1"], ["35", 35, "1"], ["35", 36, "1"], ["35", 40, "1"], ["35", 41, "1"], ["35", 42, "3"], ["35", 43, "1"], ["35", 45, "1"], ["35", 46, "1"], ["35", 51, "1"], ["35", 52, "1"], ["35", 53, "1"], ["35", 54, "2"], ["35", 55, "1"], ["35", 56, "1"], ["35", 58, "1"], ["35", 59, "1"], ["35", 60, "1"], ["35", 61, "1"], ["35", 62, "1"], ["35", 63, "1"], ["35", 64, "1"], ["35", 65, "1"], ["36", 7, "1"], ["36", 8, "1"], ["36", 9, "1"], ["36", 10, "1"], ["36", 11, "1"], ["36", 12, "1"], ["36", 13, "1"], ["36", 32, "1"], ["36", 34, "1"], ["36", 35, "1"], ["36", 36, "1"], ["36", 40, "1"], ["36", 41, "1"], ["36", 42, "3"], ["36", 43, "1"], ["36", 45, "1"], ["36", 46, "1"], ["36", 51, "1"], ["36", 52, "1"], ["36", 53, "1"], ["36", 54, "2"], ["36", 55, "1"], ["36", 56, "1"], ["36", 58, "1"], ["36", 59, "1"], ["36", 60, "1"], ["36", 61, "1"], ["36", 62, "1"], ["36", 63, "1"], ["36", 64, "1"], ["36", 65, "1"], ["37", 7, "1"], ["37", 8, "1"], ["37", 9, "1"], ["37", 10, "1"], ["37", 11, "1"], ["37", 12, "1"], ["37", 13, "1"], ["37", 32, "1"], ["37", 34, "1"], ["37", 35, "1"], ["37", 36, "1"], ["37", 40, "1"], ["37", 41, "1"], ["37", 42, "3"], ["37", 43, "1"], ["37", 45, "1"], ["37", 46, "1"], ["37", 51, "1"], ["37", 52, "1"], ["37", 53, "1"], ["37", 54, "2"], ["37", 55, "1"], ["37", 56, "1"], ["37", 58, "1"], ["37", 59, "1"], ["37", 60, "1"], ["37", 61, "1"], ["37", 62, "1"], ["37", 63, "1"], ["37", 64, "1"], ["37", 65, "1"], ["38", 7, "1"], ["38", 8, "1"], ["38", 9, "1"], ["38", 10, "1"], ["38", 11, "1"], ["38", 12, "1"], ["38", 13, "1"], ["38", 32, "1"], ["38", 34, "1"], ["38", 35, "1"], ["38", 36, "1"], ["38", 40, "1"], ["38", 41, "1"], ["38", 42, "3"], ["38", 43, "1"], ["38", 45, "1"], ["38", 46, "1"], ["38", 51, "1"], ["38", 52, "1"], ["38", 53, "1"], ["38", 54, "2"], ["38", 55, "1"], ["38", 56, "1"], ["38", 58, "1"], ["38", 59, "1"], ["38", 60, "1"], ["38", 61, "1"], ["38", 62, "1"], ["38", 63, "1"], ["38", 64, "1"], ["38", 65, "1"], ["39", 7, "1"], ["39", 8, "1"], ["39", 9, "1"], ["39", 10, "1"], ["39", 11, "1"], ["39", 12, "1"], ["39", 13, "1"], ["39", 32, "1"], ["39", 34, "1"], ["39", 35, "1"], ["39", 36, "1"], ["39", 40, "1"], ["39", 41, "1"], ["39", 42, "3"], ["39", 43, "1"], ["39", 45, "1"], ["39", 46, "1"], ["39", 51, "1"], ["39", 52, "1"], ["39", 53, "1"], ["39", 54, "2"], ["39", 55, "1"], ["39", 56, "1"], ["39", 58, "1"], ["39", 59, "1"], ["39", 60, "1"], ["39", 61, "1"], ["39", 62, "1"], ["39", 63, "1"], ["39", 64, "1"], ["39", 65, "1"], ["40", 7, "1"], ["40", 8, "1"], ["40", 9, "1"], ["40", 10, "1"], ["40", 11, "1"], ["40", 12, "1"], ["40", 13, "1"], ["40", 32, "1"], ["40", 34, "1"], ["40", 35, "1"], ["40", 36, "1"], ["40", 40, "1"], ["40", 41, "1"], ["40", 42, "3"], ["40", 43, "1"], ["40", 45, "1"], ["40", 46, "1"], ["40", 51, "1"], ["40", 52, "1"], ["40", 53, "1"], ["40", 54, "2"], ["40", 55, "1"], ["40", 56, "1"], ["40", 58, "1"], ["40", 59, "1"], ["40", 60, "1"], ["40", 61, "1"], ["40", 62, "1"], ["40", 63, "1"], ["40", 64, "1"], ["40", 65, "1"], ["41", 7, "1"], ["41", 8, "1"], ["41", 9, "1"], ["41", 10, "1"], ["41", 11, "1"], ["41", 12, "1"], ["41", 13, "1"], ["41", 32, "1"], ["41", 34, "1"], ["41", 35, "1"], ["41", 36, "1"], ["41", 40, "1"], ["41", 41, "1"], ["41", 42, "3"], ["41", 43, "1"], ["41", 45, "1"], ["41", 46, "1"], ["41", 51, "1"], ["41", 52, "1"], ["41", 53, "1"], ["41", 54, "2"], ["41", 55, "1"], ["41", 56, "1"], ["41", 58, "1"], ["41", 59, "1"], ["41", 60, "1"], ["41", 61, "1"], ["41", 62, "1"], ["41", 63, "1"], ["41", 64, "1"], ["41", 65, "1"], ["42", 7, "1"], ["42", 8, "1"], ["42", 9, "1"], ["42", 10, "1"], ["42", 11, "1"], ["42", 24, "1"], ["42", 26, "3"], ["42", 27, "1"], ["42", 28, "2"], ["42", 29, "2"], ["42", 30, "3"], ["42", 31, "3"], ["42", 32, "6"], ["42", 33, "5"], ["42", 34, "5"], ["42", 35, "5"], ["42", 36, "4"], ["42", 37, "1"], ["42", 38, "3"], ["42", 39, "3"], ["42", 40, "2"], ["42", 41, "2"], ["42", 42, "4"], ["42", 43, "3"], ["42", 44, "3"], ["42", 45, "5"], ["42", 46, "4"], ["42", 47, "3"], ["42", 48, "5"], ["42", 49, "6"], ["42", 50, "3"], ["42", 51, "3"], ["42", 52, "6"], ["42", 53, "4"], ["42", 54, "5"], ["42", 55, "4"], ["42", 56, "5"], ["42", 57, "1"], ["42", 59, "5"], ["42", 60, "4"], ["42", 61, "4"], ["42", 62, "3"], ["42", 63, "2"], ["42", 64, "2"], ["42", 65, "2"], ["42", 66, "2"], ["42", 67, "4"], ["42", 70, "1"], ["42", 71, "2"], ["42", 72, "2"], ["42", 77, "2"], ["42", 78, "1"], ["42", 79, "1"], ["42", 83, "1"], ["42", 88, "1"], ["42", 89, "1"], ["42", 96, "1"], ["42", 98, "1"], ["42", 99, "1"], ["42", 101, "2"], ["42", 102, "1"], ["42", 103, "1"], ["42", 104, "1"], ["42", 108, "1"], ["42", 110, "1"], ["42", 111, "3"], ["42", 112, "1"], ["42", 113, "1"], ["42", 114, "2"], ["42", 115, "1"], ["42", 116, "2"], ["42", 118, "1"], ["42", 119, "1"], ["42", 120, "1"], ["42", 121, "1"], ["42", 122, "1"], ["42", 126, "1"], ["42", 128, "1"], ["42", 129, "1"], ["42", 130, "1"], ["42", 131, "2"], ["42", 132, "1"], ["42", 134, "1"], ["42", 135, "1"], ["42", 136, "1"], ["42", 143, "1"], ["42", 144, "1"], ["42", 147, "1"], ["42", 148, "3"], ["42", 149, "3"], ["42", 168, "1"], ["42", 169, "1"], ["43", 7, "1"], ["43", 8, "1"], ["43", 9, "1"], ["43", 10, "1"], ["43", 11, "1"], ["43", 24, "1"], ["43", 26, "3"], ["43", 27, "1"], ["43", 28, "2"], ["43", 29, "2"], ["43", 30, "3"], ["43", 31, "3"], ["43", 32, "6"], ["43", 33, "5"], ["43", 34, "5"], ["43", 35, "5"], ["43", 36, "4"], ["43", 37, "1"], ["43", 38, "3"], ["43", 39, "3"], ["43", 40, "2"], ["43", 41, "2"], ["43", 42, "4"], ["43", 43, "3"], ["43", 44, "3"], ["43", 45, "5"], ["43", 46, "4"], ["43", 47, "3"], ["43", 48, "5"], ["43", 49, "6"], ["43", 50, "3"], ["43", 51, "3"], ["43", 52, "6"], ["43", 53, "4"], ["43", 54, "5"], ["43", 55, "4"], ["43", 56, "5"], ["43", 57, "1"], ["43", 59, "5"], ["43", 60, "4"], ["43", 61, "4"], ["43", 62, "3"], ["43", 63, "2"], ["43", 64, "2"], ["43", 65, "2"], ["43", 66, "2"], ["43", 67, "4"], ["43", 70, "1"], ["43", 71, "2"], ["43", 72, "2"], ["43", 77, "2"], ["43", 78, "1"], ["43", 79, "1"], ["43", 83, "1"], ["43", 88, "1"], ["43", 89, "1"], ["43", 96, "1"], ["43", 98, "1"], ["43", 99, "1"], ["43", 101, "2"], ["43", 102, "1"], ["43", 103, "1"], ["43", 104, "1"], ["43", 108, "1"], ["43", 110, "1"], ["43", 111, "3"], ["43", 112, "1"], ["43", 113, "1"], ["43", 114, "2"], ["43", 115, "1"], ["43", 116, "2"], ["43", 118, "1"], ["43", 119, "1"], ["43", 120, "1"], ["43", 121, "1"], ["43", 122, "1"], ["43", 126, "1"], ["43", 128, "1"], ["43", 129, "1"], ["43", 130, "1"], ["43", 131, "2"], ["43", 132, "1"], ["43", 134, "1"], ["43", 135, "1"], ["43", 136, "1"], ["43", 143, "1"], ["43", 144, "1"], ["43", 147, "1"], ["43", 148, "3"], ["43", 149, "3"], ["43", 168, "1"], ["43", 169, "1"], ["46", 7, "1"], ["46", 8, "1"], ["46", 9, "1"], ["46", 10, "1"], ["46", 11, "1"], ["46", 24, "1"], ["46", 26, "3"], ["46", 27, "1"], ["46", 28, "2"], ["46", 29, "2"], ["46", 30, "2"], ["46", 31, "4"], ["46", 32, "6"], ["46", 33, "5"], ["46", 34, "5"], ["46", 35, "4"], ["46", 36, "2"], ["46", 38, "2"], ["46", 39, "3"], ["46", 40, "2"], ["46", 41, "3"], ["46", 42, "4"], ["46", 43, "3"], ["46", 44, "3"], ["46", 45, "4"], ["46", 46, "4"], ["46", 47, "3"], ["46", 48, "5"], ["46", 49, "6"], ["46", 50, "4"], ["46", 51, "4"], ["46", 52, "6"], ["46", 53, "5"], ["46", 54, "6"], ["46", 55, "5"], ["46", 56, "5"], ["46", 57, "1"], ["46", 58, "1"], ["46", 59, "4"], ["46", 60, "3"], ["46", 61, "4"], ["46", 62, "3"], ["46", 63, "3"], ["46", 64, "2"], ["46", 65, "1"], ["46", 66, "2"], ["46", 67, "4"], ["46", 70, "1"], ["46", 71, "2"], ["46", 72, "2"], ["46", 77, "2"], ["46", 78, "1"], ["46", 79, "1"], ["46", 83, "1"], ["46", 88, "1"], ["46", 89, "1"], ["46", 96, "1"], ["46", 98, "1"], ["46", 99, "2"], ["46", 101, "2"], ["46", 102, "1"], ["46", 103, "1"], ["46", 104, "1"], ["46", 108, "1"], ["46", 110, "2"], ["46", 111, "3"], ["46", 112, "2"], ["46", 113, "1"], ["46", 114, "2"], ["46", 115, "1"], ["46", 116, "2"], ["46", 118, "1"], ["46", 119, "1"], ["46", 120, "1"], ["46", 121, "1"], ["46", 122, "1"], ["46", 126, "1"], ["46", 128, "2"], ["46", 129, "1"], ["46", 130, "1"], ["46", 131, "2"], ["46", 132, "1"], ["46", 134, "1"], ["46", 135, "1"], ["46", 136, "1"], ["46", 143, "1"], ["46", 144, "1"], ["46", 147, "1"], ["46", 148, "3"], ["46", 149, "3"], ["46", 168, "1"], ["46", 169, "1"], ["47", 9, "1"], ["47", 10, "1"], ["47", 11, "1"], ["47", 12, "1"], ["47", 13, "1"], ["47", 14, "1"], ["47", 15, "1"], ["47", 16, "1"], ["47", 17, "1"], ["47", 18, "2"], ["47", 19, "1"], ["47", 20, "1"], ["47", 21, "2"], ["47", 22, "1"], ["47", 23, "3"], ["47", 24, "3"], ["47", 25, "5"], ["47", 26, "1"], ["47", 27, "1"], ["47", 28, "1"], ["47", 29, "1"], ["47", 30, "1"], ["47", 31, "1"], ["47", 32, "1"], ["47", 33, "2"], ["47", 34, "2"], ["47", 35, "4"], ["47", 36, "6"], ["47", 37, "3"], ["47", 38, "5"], ["47", 39, "7"], ["47", 40, "7"], ["47", 41, "7"], ["47", 42, "9"], ["47", 43, "11"], ["47", 44, "11"], ["47", 45, "10"], ["47", 46, "10"], ["47", 47, "10"], ["47", 48, "9"], ["47", 49, "11"], ["47", 50, "10"], ["47", 51, "7"], ["47", 52, "9"], ["47", 53, "11"], ["47", 54, "13"], ["47", 55, "11"], ["47", 56, "9"], ["47", 57, "10"], ["47", 58, "5"], ["47", 59, "5"], ["47", 60, "4"], ["47", 61, "4"], ["47", 62, "3"], ["47", 63, "7"], ["47", 64, "5"], ["47", 65, "2"], ["47", 66, "6"], ["47", 67, "6"], ["47", 68, "6"], ["47", 69, "4"], ["47", 70, "7"], ["47", 71, "7"], ["47", 72, "4"], ["47", 73, "3"], ["47", 74, "3"], ["47", 75, "4"], ["47", 76, "3"], ["47", 77, "2"], ["47", 78, "1"], ["47", 79, "1"], ["47", 80, "2"], ["47", 81, "2"], ["47", 82, "2"], ["47", 83, "2"], ["47", 84, "1"], ["47", 85, "1"], ["47", 86, "1"], ["47", 87, "1"], ["47", 88, "4"], ["47", 89, "1"], ["47", 90, "1"], ["47", 91, "4"], ["47", 92, "5"], ["47", 93, "2"], ["47", 94, "3"], ["47", 95, "2"], ["47", 96, "4"], ["47", 97, "8"], ["47", 98, "7"], ["47", 99, "3"], ["47", 100, "2"], ["47", 101, "3"], ["47", 102, "3"], ["47", 103, "3"], ["47", 104, "5"], ["47", 105, "4"], ["47", 106, "2"], ["47", 107, "3"], ["47", 108, "4"], ["47", 109, "3"], ["47", 110, "8"], ["47", 111, "5"], ["47", 112, "4"], ["47", 113, "5"], ["47", 114, "5"], ["47", 115, "5"], ["47", 116, "7"], ["47", 117, "5"], ["47", 118, "3"], ["47", 119, "4"], ["47", 120, "3"], ["47", 121, "4"], ["47", 122, "2"], ["47", 123, "4"], ["47", 124, "3"], ["47", 125, "3"], ["47", 126, "3"], ["47", 127, "2"], ["47", 128, "4"], ["47", 129, "3"], ["47", 130, "3"], ["47", 131, "4"], ["47", 132, "2"], ["47", 133, "4"], ["47", 134, "7"], ["47", 135, "2"], ["47", 136, "2"], ["47", 137, "2"], ["47", 138, "6"], ["47", 139, "2"], ["47", 140, "2"], ["47", 141, "1"], ["47", 145, "1"], ["47", 146, "3"], ["47", 147, "3"], ["47", 148, "1"], ["47", 151, "1"], ["47", 166, "1"], ["47", 170, "1"], ["47", 173, "1"], ["48", 9, "1"], ["48", 10, "1"], ["48", 11, "1"], ["48", 12, "1"], ["48", 13, "1"], ["48", 14, "1"], ["48", 15, "1"], ["48", 16, "1"], ["48", 17, "1"], ["48", 18, "2"], ["48", 19, "1"], ["48", 20, "1"], ["48", 21, "2"], ["48", 22, "1"], ["48", 23, "3"], ["48", 24, "3"], ["48", 25, "5"], ["48", 26, "1"], ["48", 27, "1"], ["48", 28, "1"], ["48", 29, "1"], ["48", 30, "1"], ["48", 31, "1"], ["48", 32, "1"], ["48", 33, "2"], ["48", 34, "2"], ["48", 35, "4"], ["48", 36, "6"], ["48", 37, "3"], ["48", 38, "5"], ["48", 39, "7"], ["48", 40, "7"], ["48", 41, "7"], ["48", 42, "9"], ["48", 43, "11"], ["48", 44, "11"], ["48", 45, "10"], ["48", 46, "10"], ["48", 47, "10"], ["48", 48, "9"], ["48", 49, "11"], ["48", 50, "10"], ["48", 51, "7"], ["48", 52, "9"], ["48", 53, "11"], ["48", 54, "13"], ["48", 55, "11"], ["48", 56, "9"], ["48", 57, "10"], ["48", 58, "5"], ["48", 59, "5"], ["48", 60, "4"], ["48", 61, "4"], ["48", 62, "3"], ["48", 63, "7"], ["48", 64, "5"], ["48", 65, "2"], ["48", 66, "6"], ["48", 67, "6"], ["48", 68, "6"], ["48", 69, "4"], ["48", 70, "7"], ["48", 71, "7"], ["48", 72, "4"], ["48", 73, "3"], ["48", 74, "3"], ["48", 75, "4"], ["48", 76, "3"], ["48", 77, "2"], ["48", 78, "1"], ["48", 79, "1"], ["48", 80, "2"], ["48", 81, "2"], ["48", 82, "2"], ["48", 83, "2"], ["48", 84, "1"], ["48", 85, "1"], ["48", 86, "1"], ["48", 87, "1"], ["48", 88, "4"], ["48", 89, "1"], ["48", 90, "1"], ["48", 91, "4"], ["48", 92, "5"], ["48", 93, "2"], ["48", 94, "3"], ["48", 95, "2"], ["48", 96, "4"], ["48", 97, "8"], ["48", 98, "7"], ["48", 99, "3"], ["48", 100, "2"], ["48", 101, "3"], ["48", 102, "3"], ["48", 103, "3"], ["48", 104, "5"], ["48", 105, "4"], ["48", 106, "2"], ["48", 107, "3"], ["48", 108, "4"], ["48", 109, "3"], ["48", 110, "8"], ["48", 111, "5"], ["48", 112, "4"], ["48", 113, "5"], ["48", 114, "5"], ["48", 115, "5"], ["48", 116, "7"], ["48", 117, "5"], ["48", 118, "3"], ["48", 119, "4"], ["48", 120, "3"], ["48", 121, "4"], ["48", 122, "2"], ["48", 123, "4"], ["48", 124, "3"], ["48", 125, "3"], ["48", 126, "3"], ["48", 127, "2"], ["48", 128, "4"], ["48", 129, "3"], ["48", 130, "3"], ["48", 131, "4"], ["48", 132, "2"], ["48", 133, "4"], ["48", 134, "7"], ["48", 135, "2"], ["48", 136, "2"], ["48", 137, "2"], ["48", 138, "6"], ["48", 139, "2"], ["48", 140, "2"], ["48", 141, "1"], ["48", 145, "1"], ["48", 146, "3"], ["48", 147, "3"], ["48", 148, "1"], ["48", 151, "1"], ["48", 166, "1"], ["48", 170, "1"], ["48", 173, "1"], ["49", 9, "1"], ["49", 10, "1"], ["49", 11, "1"], ["49", 12, "1"], ["49", 13, "1"], ["49", 14, "1"], ["49", 15, "1"], ["49", 16, "1"], ["49", 17, "1"], ["49", 18, "2"], ["49", 19, "1"], ["49", 20, "1"], ["49", 21, "2"], ["49", 22, "1"], ["49", 23, "3"], ["49", 24, "3"], ["49", 25, "5"], ["49", 26, "1"], ["49", 27, "1"], ["49", 28, "1"], ["49", 29, "1"], ["49", 30, "1"], ["49", 31, "1"], ["49", 32, "1"], ["49", 33, "2"], ["49", 34, "2"], ["49", 35, "4"], ["49", 36, "6"], ["49", 37, "3"], ["49", 38, "5"], ["49", 39, "7"], ["49", 40, "7"], ["49", 41, "7"], ["49", 42, "9"], ["49", 43, "11"], ["49", 44, "11"], ["49", 45, "10"], ["49", 46, "10"], ["49", 47, "10"], ["49", 48, "9"], ["49", 49, "11"], ["49", 50, "10"], ["49", 51, "7"], ["49", 52, "9"], ["49", 53, "11"], ["49", 54, "13"], ["49", 55, "11"], ["49", 56, "9"], ["49", 57, "10"], ["49", 58, "5"], ["49", 59, "5"], ["49", 60, "4"], ["49", 61, "4"], ["49", 62, "3"], ["49", 63, "7"], ["49", 64, "5"], ["49", 65, "2"], ["49", 66, "6"], ["49", 67, "6"], ["49", 68, "6"], ["49", 69, "4"], ["49", 70, "7"], ["49", 71, "7"], ["49", 72, "4"], ["49", 73, "3"], ["49", 74, "3"], ["49", 75, "4"], ["49", 76, "3"], ["49", 77, "2"], ["49", 78, "1"], ["49", 79, "1"], ["49", 80, "2"], ["49", 81, "2"], ["49", 82, "2"], ["49", 83, "2"], ["49", 84, "1"], ["49", 85, "1"], ["49", 86, "1"], ["49", 87, "1"], ["49", 88, "4"], ["49", 89, "1"], ["49", 90, "1"], ["49", 91, "4"], ["49", 92, "5"], ["49", 93, "2"], ["49", 94, "3"], ["49", 95, "2"], ["49", 96, "4"], ["49", 97, "8"], ["49", 98, "7"], ["49", 99, "3"], ["49", 100, "2"], ["49", 101, "3"], ["49", 102, "3"], ["49", 103, "3"], ["49", 104, "5"], ["49", 105, "4"], ["49", 106, "2"], ["49", 107, "3"], ["49", 108, "4"], ["49", 109, "3"], ["49", 110, "8"], ["49", 111, "5"], ["49", 112, "4"], ["49", 113, "5"], ["49", 114, "5"], ["49", 115, "5"], ["49", 116, "7"], ["49", 117, "5"], ["49", 118, "3"], ["49", 119, "4"], ["49", 120, "3"], ["49", 121, "4"], ["49", 122, "2"], ["49", 123, "4"], ["49", 124, "3"], ["49", 125, "3"], ["49", 126, "3"], ["49", 127, "2"], ["49", 128, "4"], ["49", 129, "3"], ["49", 130, "3"], ["49", 131, "4"], ["49", 132, "2"], ["49", 133, "4"], ["49", 134, "7"], ["49", 135, "2"], ["49", 136, "2"], ["49", 137, "2"], ["49", 138, "6"], ["49", 139, "2"], ["49", 140, "2"], ["49", 141, "1"], ["49", 145, "1"], ["49", 146, "3"], ["49", 147, "3"], ["49", 148, "1"], ["49", 151, "1"], ["49", 166, "1"], ["49", 170, "1"], ["49", 173, "1"], ["51", 13, "1"], ["51", 14, "1"], ["51", 15, "1"], ["51", 16, "1"], ["51", 17, "1"], ["51", 18, "1"], ["51", 19, "1"], ["51", 20, "2"], ["51", 21, "2"], ["51", 22, "1"], ["51", 23, "4"], ["51", 24, "3"], ["51", 25, "6"], ["51", 26, "1"], ["51", 27, "3"], ["51", 28, "1"], ["51", 29, "1"], ["51", 30, "1"], ["51", 31, "1"], ["51", 32, "2"], ["51", 33, "3"], ["51", 34, "2"], ["51", 35, "4"], ["51", 36, "7"], ["51", 37, "7"], ["51", 38, "7"], ["51", 39, "8"], ["51", 40, "7"], ["51", 41, "8"], ["51", 42, "9"], ["51", 43, "11"], ["51", 44, "11"], ["51", 45, "12"], ["51", 46, "13"], ["51", 47, "10"], ["51", 48, "10"], ["51", 49, "12"], ["51", 50, "11"], ["51", 51, "7"], ["51", 52, "9"], ["51", 53, "11"], ["51", 54, "13"], ["51", 55, "12"], ["51", 56, "10"], ["51", 57, "10"], ["51", 58, "6"], ["51", 59, "6"], ["51", 60, "4"], ["51", 61, "4"], ["51", 62, "4"], ["51", 63, "7"], ["51", 64, "5"], ["51", 65, "3"], ["51", 66, "7"], ["51", 67, "6"], ["51", 68, "6"], ["51", 69, "4"], ["51", 70, "7"], ["51", 71, "8"], ["51", 72, "4"], ["51", 73, "3"], ["51", 74, "3"], ["51", 75, "4"], ["51", 76, "3"], ["51", 77, "2"], ["51", 78, "1"], ["51", 79, "1"], ["51", 80, "2"], ["51", 81, "2"], ["51", 82, "2"], ["51", 83, "2"], ["51", 84, "2"], ["51", 85, "1"], ["51", 86, "1"], ["51", 87, "1"], ["51", 88, "4"], ["51", 89, "1"], ["51", 90, "1"], ["51", 91, "4"], ["51", 92, "5"], ["51", 93, "3"], ["51", 94, "3"], ["51", 95, "2"], ["51", 96, "4"], ["51", 97, "9"], ["51", 98, "7"], ["51", 99, "3"], ["51", 100, "2"], ["51", 101, "3"], ["51", 102, "3"], ["51", 103, "4"], ["51", 104, "6"], ["51", 105, "5"], ["51", 106, "3"], ["51", 107, "3"], ["51", 108, "5"], ["51", 109, "5"], ["51", 110, "9"], ["51", 111, "5"], ["51", 112, "4"], ["51", 113, "5"], ["51", 114, "6"], ["51", 115, "5"], ["51", 116, "7"], ["51", 117, "5"], ["51", 118, "3"], ["51", 119, "4"], ["51", 120, "3"], ["51", 121, "4"], ["51", 122, "2"], ["51", 123, "5"], ["51", 124, "3"], ["51", 125, "3"], ["51", 126, "4"], ["51", 127, "2"], ["51", 128, "4"], ["51", 129, "4"], ["51", 130, "4"], ["51", 131, "5"], ["51", 132, "3"], ["51", 133, "4"], ["51", 134, "7"], ["51", 135, "2"], ["51", 136, "2"], ["51", 137, "2"], ["51", 138, "6"], ["51", 139, "2"], ["51", 140, "2"], ["51", 141, "2"], ["51", 145, "1"], ["51", 146, "3"], ["51", 147, "3"], ["51", 148, "1"], ["51", 151, "1"], ["51", 166, "1"], ["51", 170, "1"], ["51", 173, "1"], ["51", 180, "1"], ["52", 18, "1"], ["52", 21, "1"], ["52", 23, "3"], ["52", 24, "1"], ["52", 25, "4"], ["52", 26, "1"], ["52", 30, "1"], ["52", 31, "1"], ["52", 33, "2"], ["52", 34, "1"], ["52", 35, "3"], ["52", 36, "7"], ["52", 37, "6"], ["52", 38, "5"], ["52", 39, "6"], ["52", 40, "5"], ["52", 41, "7"], ["52", 42, "8"], ["52", 43, "9"], ["52", 44, "10"], ["52", 45, "11"], ["52", 46, "13"], ["52", 47, "10"], ["52", 48, "10"], ["52", 49, "7"], ["52", 50, "6"], ["52", 51, "4"], ["52", 52, "5"], ["52", 53, "9"], ["52", 54, "12"], ["52", 55, "9"], ["52", 56, "6"], ["52", 57, "6"], ["52", 58, "5"], ["52", 59, "4"], ["52", 60, "4"], ["52", 61, "4"], ["52", 62, "3"], ["52", 63, "6"], ["52", 64, "3"], ["52", 65, "2"], ["52", 66, "4"], ["52", 67, "4"], ["52", 68, "4"], ["52", 69, "3"], ["52", 70, "5"], ["52", 71, "4"], ["52", 72, "2"], ["52", 73, "1"], ["52", 74, "1"], ["52", 75, "2"], ["52", 76, "2"], ["52", 80, "1"], ["52", 81, "1"], ["52", 82, "1"], ["52", 83, "1"], ["52", 84, "1"], ["52", 85, "1"], ["52", 86, "1"], ["52", 87, "1"], ["52", 88, "2"], ["52", 89, "1"], ["52", 91, "2"], ["52", 92, "3"], ["52", 94, "3"], ["52", 95, "1"], ["52", 96, "2"], ["52", 97, "5"], ["52", 98, "4"], ["52", 99, "1"], ["52", 100, "1"], ["52", 101, "2"], ["52", 102, "1"], ["52", 103, "1"], ["52", 104, "4"], ["52", 105, "4"], ["52", 106, "1"], ["52", 107, "2"], ["52", 108, "2"], ["52", 109, "3"], ["52", 110, "5"], ["52", 111, "4"], ["52", 112, "3"], ["52", 113, "4"], ["52", 114, "4"], ["52", 115, "3"], ["52", 116, "1"], ["52", 117, "3"], ["52", 118, "2"], ["52", 119, "3"], ["52", 120, "1"], ["52", 121, "2"], ["52", 122, "1"], ["52", 123, "3"], ["52", 124, "1"], ["52", 125, "1"], ["52", 126, "3"], ["52", 127, "2"], ["52", 128, "2"], ["52", 129, "2"], ["52", 130, "2"], ["52", 131, "3"], ["52", 132, "2"], ["52", 133, "3"], ["52", 134, "4"], ["52", 135, "1"], ["52", 136, "2"], ["52", 137, "1"], ["52", 138, "2"], ["52", 139, "2"], ["52", 140, "1"], ["52", 141, "1"], ["52", 146, "1"], ["52", 147, "2"], ["52", 148, "1"], ["53", 14, "1"], ["53", 15, "1"], ["53", 21, "1"], ["53", 22, "1"], ["53", 23, "1"], ["53", 25, "2"], ["53", 26, "4"], ["53", 27, "3"], ["53", 28, "3"], ["53", 33, "1"], ["53", 34, "2"], ["53", 35, "2"], ["53", 36, "4"], ["53", 37, "4"], ["53", 38, "3"], ["53", 39, "4"], ["53", 40, "6"], ["53", 41, "5"], ["53", 42, "4"], ["53", 43, "7"], ["53", 44, "11"], ["53", 45, "7"], ["53", 46, "7"], ["53", 47, "7"], ["53", 48, "8"], ["53", 49, "7"], ["53", 50, "8"], ["53", 51, "4"], ["53", 52, "5"], ["53", 53, "5"], ["53", 54, "10"], ["53", 55, "8"], ["53", 56, "4"], ["53", 57, "3"], ["53", 58, "6"], ["53", 59, "6"], ["53", 60, "5"], ["53", 61, "8"], ["53", 62, "7"], ["53", 63, "8"], ["53", 64, "6"], ["53", 65, "6"], ["53", 66, "5"], ["53", 67, "4"], ["53", 68, "5"], ["53", 69, "2"], ["53", 70, "2"], ["53", 71, "3"], ["53", 72, "3"], ["53", 73, "4"], ["53", 74, "2"], ["53", 75, "2"], ["53", 76, "3"], ["53", 77, "2"], ["53", 78, "2"], ["53", 79, "1"], ["53", 80, "2"], ["53", 81, "2"], ["53", 82, "3"], ["53", 83, "3"], ["53", 84, "2"], ["53", 85, "1"], ["53", 86, "1"], ["53", 89, "2"], ["53", 91, "1"], ["53", 92, "1"], ["53", 93, "3"], ["53", 94, "1"], ["53", 95, "2"], ["53", 96, "1"], ["53", 97, "2"], ["53", 98, "3"], ["53", 99, "1"], ["53", 100, "3"], ["53", 101, "1"], ["53", 102, "1"], ["53", 103, "5"], ["53", 104, "4"], ["53", 105, "5"], ["53", 106, "4"], ["53", 107, "2"], ["53", 108, "3"], ["53", 109, "3"], ["53", 110, "2"], ["53", 111, "4"], ["53", 112, "4"], ["53", 113, "4"], ["53", 114, "3"], ["53", 115, "3"], ["53", 116, "2"], ["53", 117, "1"], ["53", 118, "1"], ["53", 119, "1"], ["53", 121, "3"], ["53", 122, "5"], ["53", 123, "3"], ["53", 124, "2"], ["53", 125, "2"], ["53", 126, "1"], ["53", 127, "1"], ["53", 128, "2"], ["53", 129, "2"], ["53", 130, "3"], ["53", 131, "3"], ["53", 132, "3"], ["53", 133, "7"], ["53", 134, "4"], ["53", 135, "1"], ["53", 137, "2"], ["53", 138, "4"], ["53", 139, "3"], ["53", 141, "2"], ["53", 143, "1"], ["53", 144, "1"], ["53", 145, "1"], ["53", 146, "1"], ["53", 147, "1"], ["53", 148, "3"], ["53", 149, "2"], ["53", 150, "1"], ["53", 156, "1"], ["53", 157, "1"], ["53", 158, "3"], ["53", 159, "1"], ["53", 161, "1"], ["53", 166, "1"], ["54", 14, "1"], ["54", 15, "1"], ["54", 21, "1"], ["54", 22, "1"], ["54", 23, "1"], ["54", 25, "2"], ["54", 26, "4"], ["54", 27, "3"], ["54", 28, "3"], ["54", 33, "1"], ["54", 34, "2"], ["54", 35, "2"], ["54", 36, "4"], ["54", 37, "4"], ["54", 38, "3"], ["54", 39, "4"], ["54", 40, "6"], ["54", 41, "5"], ["54", 42, "4"], ["54", 43, "7"], ["54", 44, "11"], ["54", 45, "7"], ["54", 46, "7"], ["54", 47, "7"], ["54", 48, "8"], ["54", 49, "7"], ["54", 50, "8"], ["54", 51, "4"], ["54", 52, "5"], ["54", 53, "5"], ["54", 54, "10"], ["54", 55, "8"], ["54", 56, "4"], ["54", 57, "3"], ["54", 58, "6"], ["54", 59, "6"], ["54", 60, "5"], ["54", 61, "8"], ["54", 62, "7"], ["54", 63, "8"], ["54", 64, "6"], ["54", 65, "6"], ["54", 66, "5"], ["54", 67, "4"], ["54", 68, "5"], ["54", 69, "2"], ["54", 70, "2"], ["54", 71, "3"], ["54", 72, "3"], ["54", 73, "4"], ["54", 74, "2"], ["54", 75, "2"], ["54", 76, "3"], ["54", 77, "2"], ["54", 78, "2"], ["54", 79, "1"], ["54", 80, "2"], ["54", 81, "2"], ["54", 82, "3"], ["54", 83, "3"], ["54", 84, "2"], ["54", 85, "1"], ["54", 86, "1"], ["54", 89, "2"], ["54", 91, "1"], ["54", 92, "1"], ["54", 93, "3"], ["54", 94, "1"], ["54", 95, "2"], ["54", 96, "1"], ["54", 97, "2"], ["54", 98, "3"], ["54", 99, "1"], ["54", 100, "3"], ["54", 101, "1"], ["54", 102, "1"], ["54", 103, "5"], ["54", 104, "4"], ["54", 105, "5"], ["54", 106, "4"], ["54", 107, "2"], ["54", 108, "3"], ["54", 109, "3"], ["54", 110, "2"], ["54", 111, "4"], ["54", 112, "4"], ["54", 113, "4"], ["54", 114, "3"], ["54", 115, "3"], ["54", 116, "2"], ["54", 117, "1"], ["54", 118, "1"], ["54", 119, "1"], ["54", 121, "3"], ["54", 122, "5"], ["54", 123, "3"], ["54", 124, "2"], ["54", 125, "2"], ["54", 126, "1"], ["54", 127, "1"], ["54", 128, "2"], ["54", 129, "2"], ["54", 130, "3"], ["54", 131, "3"], ["54", 132, "3"], ["54", 133, "7"], ["54", 134, "4"], ["54", 135, "1"], ["54", 137, "2"], ["54", 138, "4"], ["54", 139, "3"], ["54", 141, "2"], ["54", 143, "1"], ["54", 144, "1"], ["54", 145, "1"], ["54", 146, "1"], ["54", 147, "1"], ["54", 148, "3"], ["54", 149, "2"], ["54", 150, "1"], ["54", 156, "1"], ["54", 157, "1"], ["54", 158, "3"], ["54", 159, "1"], ["54", 161, "1"], ["54", 166, "1"], ["55", 14, "1"], ["55", 15, "1"], ["55", 21, "1"], ["55", 22, "1"], ["55", 23, "1"], ["55", 25, "2"], ["55", 26, "4"], ["55", 27, "3"], ["55", 28, "3"], ["55", 33, "1"], ["55", 34, "2"], ["55", 35, "2"], ["55", 36, "3"], ["55", 37, "3"], ["55", 38, "2"], ["55", 39, "3"], ["55", 40, "6"], ["55", 41, "4"], ["55", 42, "3"], ["55", 43, "6"], ["55", 44, "9"], ["55", 45, "7"], ["55", 46, "7"], ["55", 47, "7"], ["55", 48, "8"], ["55", 49, "7"], ["55", 50, "9"], ["55", 51, "4"], ["55", 52, "5"], ["55", 53, "5"], ["55", 54, "10"], ["55", 55, "7"], ["55", 56, "4"], ["55", 57, "3"], ["55", 58, "5"], ["55", 59, "6"], ["55", 60, "4"], ["55", 61, "6"], ["55", 62, "7"], ["55", 63, "8"], ["55", 64, "6"], ["55", 65, "5"], ["55", 66, "5"], ["55", 67, "4"], ["55", 68, "5"], ["55", 69, "2"], ["55", 70, "2"], ["55", 71, "3"], ["55", 72, "3"], ["55", 73, "4"], ["55", 74, "2"], ["55", 75, "2"], ["55", 76, "3"], ["55", 77, "2"], ["55", 78, "1"], ["55", 80, "2"], ["55", 81, "2"], ["55", 82, "3"], ["55", 83, "3"], ["55", 84, "2"], ["55", 85, "1"], ["55", 86, "1"], ["55", 89, "2"], ["55", 91, "1"], ["55", 92, "1"], ["55", 93, "3"], ["55", 94, "1"], ["55", 95, "2"], ["55", 96, "1"], ["55", 97, "2"], ["55", 98, "3"], ["55", 99, "1"], ["55", 100, "3"], ["55", 101, "1"], ["55", 102, "1"], ["55", 103, "4"], ["55", 104, "4"], ["55", 105, "5"], ["55", 106, "4"], ["55", 107, "2"], ["55", 108, "3"], ["55", 109, "2"], ["55", 110, "4"], ["55", 111, "4"], ["55", 112, "4"], ["55", 113, "5"], ["55", 114, "3"], ["55", 115, "2"], ["55", 116, "2"], ["55", 117, "1"], ["55", 118, "1"], ["55", 119, "1"], ["55", 121, "3"], ["55", 122, "5"], ["55", 123, "2"], ["55", 124, "2"], ["55", 125, "2"], ["55", 126, "1"], ["55", 127, "1"], ["55", 128, "2"], ["55", 129, "2"], ["55", 130, "5"], ["55", 131, "3"], ["55", 132, "3"], ["55", 133, "7"], ["55", 134, "4"], ["55", 135, "1"], ["55", 136, "1"], ["55", 137, "3"], ["55", 138, "4"], ["55", 139, "4"], ["55", 141, "2"], ["55", 143, "1"], ["55", 144, "1"], ["55", 145, "1"], ["55", 146, "1"], ["55", 147, "2"], ["55", 148, "3"], ["55", 149, "2"], ["55", 150, "1"], ["55", 156, "1"], ["55", 157, "1"], ["55", 158, "3"], ["55", 159, "1"], ["55", 161, "1"], ["55", 166, "1"], ["56", 14, "1"], ["56", 15, "1"], ["56", 21, "1"], ["56", 22, "1"], ["56", 23, "1"], ["56", 25, "2"], ["56", 26, "4"], ["56", 27, "3"], ["56", 28, "3"], ["56", 33, "1"], ["56", 34, "2"], ["56", 35, "2"], ["56", 36, "3"], ["56", 37, "3"], ["56", 38, "2"], ["56", 39, "3"], ["56", 40, "6"], ["56", 41, "4"], ["56", 42, "3"], ["56", 43, "6"], ["56", 44, "9"], ["56", 45, "7"], ["56", 46, "7"], ["56", 47, "7"], ["56", 48, "8"], ["56", 49, "7"], ["56", 50, "9"], ["56", 51, "4"], ["56", 52, "5"], ["56", 53, "5"], ["56", 54, "10"], ["56", 55, "7"], ["56", 56, "4"], ["56", 57, "3"], ["56", 58, "5"], ["56", 59, "6"], ["56", 60, "4"], ["56", 61, "6"], ["56", 62, "7"], ["56", 63, "8"], ["56", 64, "6"], ["56", 65, "5"], ["56", 66, "5"], ["56", 67, "4"], ["56", 68, "5"], ["56", 69, "2"], ["56", 70, "2"], ["56", 71, "3"], ["56", 72, "3"], ["56", 73, "4"], ["56", 74, "2"], ["56", 75, "2"], ["56", 76, "3"], ["56", 77, "2"], ["56", 78, "1"], ["56", 80, "2"], ["56", 81, "2"], ["56", 82, "3"], ["56", 83, "3"], ["56", 84, "2"], ["56", 85, "1"], ["56", 86, "1"], ["56", 89, "2"], ["56", 91, "1"], ["56", 92, "1"], ["56", 93, "3"], ["56", 94, "1"], ["56", 95, "2"], ["56", 96, "1"], ["56", 97, "2"], ["56", 98, "3"], ["56", 99, "1"], ["56", 100, "3"], ["56", 101, "1"], ["56", 102, "1"], ["56", 103, "4"], ["56", 104, "4"], ["56", 105, "5"], ["56", 106, "4"], ["56", 107, "2"], ["56", 108, "3"], ["56", 109, "2"], ["56", 110, "4"], ["56", 111, "4"], ["56", 112, "4"], ["56", 113, "5"], ["56", 114, "3"], ["56", 115, "2"], ["56", 116, "2"], ["56", 117, "1"], ["56", 118, "1"], ["56", 119, "1"], ["56", 121, "3"], ["56", 122, "5"], ["56", 123, "2"], ["56", 124, "2"], ["56", 125, "2"], ["56", 126, "1"], ["56", 127, "1"], ["56", 128, "2"], ["56", 129, "2"], ["56", 130, "5"], ["56", 131, "3"], ["56", 132, "3"], ["56", 133, "7"], ["56", 134, "4"], ["56", 135, "1"], ["56", 136, "1"], ["56", 137, "3"], ["56", 138, "4"], ["56", 139, "4"], ["56", 141, "2"], ["56", 143, "1"], ["56", 144, "1"], ["56", 145, "1"], ["56", 146, "1"], ["56", 147, "2"], ["56", 148, "3"], ["56", 149, "2"], ["56", 150, "1"], ["56", 156, "1"], ["56", 157, "1"], ["56", 158, "3"], ["56", 159, "1"], ["56", 161, "1"], ["56", 166, "1"], ["57", 14, "1"], ["57", 15, "1"], ["57", 21, "1"], ["57", 22, "1"], ["57", 23, "1"], ["57", 25, "2"], ["57", 26, "4"], ["57", 27, "3"], ["57", 28, "3"], ["57", 33, "1"], ["57", 34, "2"], ["57", 35, "2"], ["57", 36, "3"], ["57", 37, "3"], ["57", 38, "2"], ["57", 39, "3"], ["57", 40, "6"], ["57", 41, "4"], ["57", 42, "3"], ["57", 43, "6"], ["57", 44, "9"], ["57", 45, "7"], ["57", 46, "7"], ["57", 47, "7"], ["57", 48, "8"], ["57", 49, "7"], ["57", 50, "9"], ["57", 51, "4"], ["57", 52, "5"], ["57", 53, "5"], ["57", 54, "10"], ["57", 55, "7"], ["57", 56, "4"], ["57", 57, "3"], ["57", 58, "5"], ["57", 59, "6"], ["57", 60, "4"], ["57", 61, "6"], ["57", 62, "7"], ["57", 63, "8"], ["57", 64, "6"], ["57", 65, "5"], ["57", 66, "5"], ["57", 67, "4"], ["57", 68, "5"], ["57", 69, "2"], ["57", 70, "2"], ["57", 71, "3"], ["57", 72, "3"], ["57", 73, "4"], ["57", 74, "2"], ["57", 75, "2"], ["57", 76, "3"], ["57", 77, "2"], ["57", 78, "1"], ["57", 80, "2"], ["57", 81, "2"], ["57", 82, "3"], ["57", 83, "3"], ["57", 84, "2"], ["57", 85, "1"], ["57", 86, "1"], ["57", 89, "2"], ["57", 91, "1"], ["57", 92, "1"], ["57", 93, "3"], ["57", 94, "1"], ["57", 95, "2"], ["57", 96, "1"], ["57", 97, "2"], ["57", 98, "3"], ["57", 99, "1"], ["57", 100, "3"], ["57", 101, "1"], ["57", 102, "1"], ["57", 103, "4"], ["57", 104, "4"], ["57", 105, "5"], ["57", 106, "4"], ["57", 107, "2"], ["57", 108, "3"], ["57", 109, "2"], ["57", 110, "4"], ["57", 111, "4"], ["57", 112, "4"], ["57", 113, "5"], ["57", 114, "3"], ["57", 115, "2"], ["57", 116, "2"], ["57", 117, "1"], ["57", 118, "1"], ["57", 119, "1"], ["57", 121, "3"], ["57", 122, "5"], ["57", 123, "2"], ["57", 124, "2"], ["57", 125, "2"], ["57", 126, "1"], ["57", 127, "1"], ["57", 128, "2"], ["57", 129, "2"], ["57", 130, "5"], ["57", 131, "3"], ["57", 132, "3"], ["57", 133, "7"], ["57", 134, "4"], ["57", 135, "1"], ["57", 136, "1"], ["57", 137, "3"], ["57", 138, "4"], ["57", 139, "4"], ["57", 141, "2"], ["57", 143, "1"], ["57", 144, "1"], ["57", 145, "1"], ["57", 146, "1"], ["57", 147, "2"], ["57", 148, "3"], ["57", 149, "2"], ["57", 150, "1"], ["57", 156, "1"], ["57", 157, "1"], ["57", 158, "3"], ["57", 159, "1"], ["57", 161, "1"], ["57", 166, "1"], ["58", 14, "1"], ["58", 15, "1"], ["58", 21, "1"], ["58", 22, "1"], ["58", 23, "1"], ["58", 25, "2"], ["58", 26, "4"], ["58", 27, "3"], ["58", 28, "3"], ["58", 33, "1"], ["58", 34, "2"], ["58", 35, "2"], ["58", 36, "3"], ["58", 37, "3"], ["58", 38, "2"], ["58", 39, "3"], ["58", 40, "6"], ["58", 41, "4"], ["58", 42, "3"], ["58", 43, "6"], ["58", 44, "9"], ["58", 45, "7"], ["58", 46, "7"], ["58", 47, "7"], ["58", 48, "8"], ["58", 49, "7"], ["58", 50, "9"], ["58", 51, "4"], ["58", 52, "5"], ["58", 53, "5"], ["58", 54, "10"], ["58", 55, "7"], ["58", 56, "4"], ["58", 57, "3"], ["58", 58, "5"], ["58", 59, "6"], ["58", 60, "4"], ["58", 61, "6"], ["58", 62, "7"], ["58", 63, "8"], ["58", 64, "6"], ["58", 65, "5"], ["58", 66, "5"], ["58", 67, "4"], ["58", 68, "5"], ["58", 69, "2"], ["58", 70, "2"], ["58", 71, "3"], ["58", 72, "3"], ["58", 73, "4"], ["58", 74, "2"], ["58", 75, "2"], ["58", 76, "3"], ["58", 77, "2"], ["58", 78, "1"], ["58", 80, "2"], ["58", 81, "2"], ["58", 82, "3"], ["58", 83, "3"], ["58", 84, "2"], ["58", 85, "1"], ["58", 86, "1"], ["58", 89, "2"], ["58", 91, "1"], ["58", 92, "1"], ["58", 93, "3"], ["58", 94, "1"], ["58", 95, "2"], ["58", 96, "1"], ["58", 97, "2"], ["58", 98, "3"], ["58", 99, "1"], ["58", 100, "3"], ["58", 101, "1"], ["58", 102, "1"], ["58", 103, "4"], ["58", 104, "4"], ["58", 105, "5"], ["58", 106, "4"], ["58", 107, "2"], ["58", 108, "3"], ["58", 109, "2"], ["58", 110, "4"], ["58", 111, "4"], ["58", 112, "4"], ["58", 113, "5"], ["58", 114, "3"], ["58", 115, "2"], ["58", 116, "2"], ["58", 117, "1"], ["58", 118, "1"], ["58", 119, "1"], ["58", 121, "3"], ["58", 122, "5"], ["58", 123, "2"], ["58", 124, "2"], ["58", 125, "2"], ["58", 126, "1"], ["58", 127, "1"], ["58", 128, "2"], ["58", 129, "2"], ["58", 130, "5"], ["58", 131, "3"], ["58", 132, "3"], ["58", 133, "7"], ["58", 134, "4"], ["58", 135, "1"], ["58", 136, "1"], ["58", 137, "3"], ["58", 138, "4"], ["58", 139, "4"], ["58", 141, "2"], ["58", 143, "1"], ["58", 144, "1"], ["58", 145, "1"], ["58", 146, "1"], ["58", 147, "2"], ["58", 148, "3"], ["58", 149, "2"], ["58", 150, "1"], ["58", 156, "1"], ["58", 157, "1"], ["58", 158, "3"], ["58", 159, "1"], ["58", 161, "1"], ["58", 166, "1"], ["59", 29, "1"], ["59", 32, "1"], ["59", 35, "1"], ["59", 36, "2"], ["59", 37, "1"], ["59", 38, "2"], ["59", 39, "1"], ["59", 40, "1"], ["59", 41, "3"], ["59", 42, "4"], ["59", 43, "3"], ["59", 44, "4"], ["59", 45, "3"], ["59", 46, "4"], ["59", 47, "7"], ["59", 48, "7"], ["59", 49, "4"], ["59", 50, "5"], ["59", 51, "5"], ["59", 52, "5"], ["59", 53, "6"], ["59", 54, "5"], ["59", 55, "6"], ["59", 56, "3"], ["59", 57, "3"], ["59", 58, "5"], ["59", 59, "3"], ["59", 60, "4"], ["59", 61, "6"], ["59", 62, "8"], ["59", 63, "9"], ["59", 64, "4"], ["59", 65, "5"], ["59", 66, "5"], ["59", 67, "4"], ["59", 68, "4"], ["59", 69, "6"], ["59", 70, "4"], ["59", 71, "1"], ["59", 72, "2"], ["59", 73, "4"], ["59", 74, "3"], ["59", 75, "5"], ["59", 76, "2"], ["59", 77, "1"], ["59", 78, "1"], ["59", 79, "2"], ["59", 81, "1"], ["59", 82, "2"], ["59", 83, "2"], ["59", 84, "1"], ["59", 85, "2"], ["59", 86, "3"], ["59", 87, "2"], ["59", 88, "4"], ["59", 89, "2"], ["59", 90, "4"], ["59", 91, "4"], ["59", 92, "3"], ["59", 93, "2"], ["59", 94, "3"], ["59", 95, "5"], ["59", 96, "4"], ["59", 97, "1"], ["59", 98, "4"], ["59", 99, "3"], ["59", 100, "2"], ["59", 101, "3"], ["59", 102, "4"], ["59", 103, "4"], ["59", 104, "3"], ["59", 105, "3"], ["59", 106, "4"], ["59", 107, "3"], ["59", 108, "3"], ["59", 109, "4"], ["59", 110, "5"], ["59", 111, "3"], ["59", 112, "3"], ["59", 113, "4"], ["59", 114, "3"], ["59", 115, "6"], ["59", 116, "4"], ["59", 117, "4"], ["59", 118, "4"], ["59", 119, "5"], ["59", 120, "6"], ["59", 121, "5"], ["59", 122, "2"], ["59", 123, "2"], ["59", 124, "3"], ["59", 125, "2"], ["59", 126, "2"], ["59", 127, "1"], ["59", 128, "3"], ["59", 129, "1"], ["59", 130, "1"], ["59", 131, "1"], ["59", 132, "1"], ["59", 133, "2"], ["59", 134, "2"], ["59", 135, "2"], ["59", 136, "3"], ["59", 137, "4"], ["59", 138, "7"], ["59", 139, "7"], ["59", 140, "5"], ["59", 141, "2"], ["59", 142, "1"], ["59", 152, "1"], ["59", 153, "1"], ["59", 154, "1"], ["59", 155, "1"], ["60", 26, "1"], ["60", 27, "1"], ["60", 28, "1"], ["60", 29, "1"], ["60", 30, "2"], ["60", 32, "1"], ["60", 33, "2"], ["60", 34, "2"], ["60", 35, "5"], ["60", 36, "3"], ["60", 37, "4"], ["60", 38, "6"], ["60", 39, "8"], ["60", 40, "4"], ["60", 41, "6"], ["60", 42, "6"], ["60", 43, "5"], ["60", 44, "7"], ["60", 45, "8"], ["60", 46, "7"], ["60", 47, "9"], ["60", 48, "10"], ["60", 49, "10"], ["60", 50, "9"], ["60", 51, "7"], ["60", 52, "8"], ["60", 53, "9"], ["60", 54, "10"], ["60", 55, "11"], ["60", 56, "7"], ["60", 57, "5"], ["60", 58, "6"], ["60", 59, "8"], ["60", 60, "9"], ["60", 61, "10"], ["60", 62, "9"], ["60", 63, "10"], ["60", 64, "9"], ["60", 65, "8"], ["60", 66, "8"], ["60", 67, "7"], ["60", 68, "8"], ["60", 69, "6"], ["60", 70, "4"], ["60", 71, "5"], ["60", 72, "5"], ["60", 73, "5"], ["60", 74, "5"], ["60", 75, "6"], ["60", 76, "5"], ["60", 77, "2"], ["60", 78, "2"], ["60", 79, "1"], ["60", 80, "3"], ["60", 81, "5"], ["60", 82, "3"], ["60", 83, "4"], ["60", 84, "4"], ["60", 85, "7"], ["60", 86, "8"], ["60", 87, "4"], ["60", 88, "4"], ["60", 89, "5"], ["60", 90, "6"], ["60", 91, "7"], ["60", 92, "7"], ["60", 93, "9"], ["60", 94, "7"], ["60", 95, "7"], ["60", 96, "7"], ["60", 97, "8"], ["60", 98, "7"], ["60", 99, "3"], ["60", 100, "5"], ["60", 101, "7"], ["60", 102, "7"], ["60", 103, "8"], ["60", 104, "5"], ["60", 105, "4"], ["60", 106, "4"], ["60", 107, "8"], ["60", 108, "7"], ["60", 109, "7"], ["60", 110, "8"], ["60", 111, "6"], ["60", 112, "6"], ["60", 113, "6"], ["60", 114, "8"], ["60", 115, "8"], ["60", 116, "10"], ["60", 117, "7"], ["60", 118, "8"], ["60", 119, "7"], ["60", 120, "7"], ["60", 121, "6"], ["60", 122, "2"], ["60", 123, "4"], ["60", 124, "6"], ["60", 125, "3"], ["60", 126, "4"], ["60", 127, "2"], ["60", 128, "3"], ["60", 129, "2"], ["60", 130, "2"], ["60", 131, "4"], ["60", 132, "2"], ["60", 133, "3"], ["60", 134, "5"], ["60", 135, "5"], ["60", 136, "8"], ["60", 137, "10"], ["60", 138, "9"], ["60", 139, "8"], ["60", 140, "9"], ["60", 141, "7"], ["60", 142, "3"], ["60", 143, "1"], ["60", 144, "1"], ["60", 145, "1"], ["60", 150, "1"], ["60", 151, "1"], ["60", 152, "1"], ["60", 153, "1"], ["60", 154, "1"], ["60", 155, "1"], ["60", 156, "1"], ["61", 26, "1"], ["61", 27, "1"], ["61", 28, "1"], ["61", 29, "1"], ["61", 30, "2"], ["61", 32, "1"], ["61", 33, "2"], ["61", 34, "2"], ["61", 35, "5"], ["61", 36, "3"], ["61", 37, "4"], ["61", 38, "6"], ["61", 39, "8"], ["61", 40, "4"], ["61", 41, "6"], ["61", 42, "6"], ["61", 43, "5"], ["61", 44, "7"], ["61", 45, "8"], ["61", 46, "7"], ["61", 47, "9"], ["61", 48, "10"], ["61", 49, "10"], ["61", 50, "9"], ["61", 51, "7"], ["61", 52, "8"], ["61", 53, "9"], ["61", 54, "10"], ["61", 55, "11"], ["61", 56, "7"], ["61", 57, "5"], ["61", 58, "6"], ["61", 59, "8"], ["61", 60, "9"], ["61", 61, "10"], ["61", 62, "9"], ["61", 63, "10"], ["61", 64, "9"], ["61", 65, "8"], ["61", 66, "8"], ["61", 67, "7"], ["61", 68, "8"], ["61", 69, "6"], ["61", 70, "4"], ["61", 71, "5"], ["61", 72, "5"], ["61", 73, "5"], ["61", 74, "5"], ["61", 75, "6"], ["61", 76, "5"], ["61", 77, "2"], ["61", 78, "2"], ["61", 79, "1"], ["61", 80, "3"], ["61", 81, "5"], ["61", 82, "3"], ["61", 83, "4"], ["61", 84, "4"], ["61", 85, "7"], ["61", 86, "8"], ["61", 87, "4"], ["61", 88, "4"], ["61", 89, "5"], ["61", 90, "6"], ["61", 91, "7"], ["61", 92, "7"], ["61", 93, "9"], ["61", 94, "7"], ["61", 95, "7"], ["61", 96, "7"], ["61", 97, "8"], ["61", 98, "7"], ["61", 99, "3"], ["61", 100, "5"], ["61", 101, "7"], ["61", 102, "7"], ["61", 103, "8"], ["61", 104, "5"], ["61", 105, "4"], ["61", 106, "4"], ["61", 107, "8"], ["61", 108, "7"], ["61", 109, "7"], ["61", 110, "8"], ["61", 111, "6"], ["61", 112, "6"], ["61", 113, "6"], ["61", 114, "8"], ["61", 115, "8"], ["61", 116, "10"], ["61", 117, "7"], ["61", 118, "8"], ["61", 119, "7"], ["61", 120, "7"], ["61", 121, "6"], ["61", 122, "2"], ["61", 123, "4"], ["61", 124, "6"], ["61", 125, "3"], ["61", 126, "4"], ["61", 127, "2"], ["61", 128, "3"], ["61", 129, "2"], ["61", 130, "2"], ["61", 131, "4"], ["61", 132, "2"], ["61", 133, "3"], ["61", 134, "5"], ["61", 135, "5"], ["61", 136, "8"], ["61", 137, "10"], ["61", 138, "9"], ["61", 139, "8"], ["61", 140, "9"], ["61", 141, "7"], ["61", 142, "3"], ["61", 143, "1"], ["61", 144, "1"], ["61", 145, "1"], ["61", 150, "1"], ["61", 151, "1"], ["61", 152, "1"], ["61", 153, "1"], ["61", 154, "1"], ["61", 155, "1"], ["61", 156, "1"], ["62", 26, "1"], ["62", 27, "1"], ["62", 28, "1"], ["62", 29, "1"], ["62", 30, "2"], ["62", 32, "1"], ["62", 33, "2"], ["62", 34, "2"], ["62", 35, "5"], ["62", 36, "3"], ["62", 37, "4"], ["62", 38, "6"], ["62", 39, "8"], ["62", 40, "4"], ["62", 41, "6"], ["62", 42, "6"], ["62", 43, "5"], ["62", 44, "7"], ["62", 45, "8"], ["62", 46, "7"], ["62", 47, "9"], ["62", 48, "10"], ["62", 49, "10"], ["62", 50, "9"], ["62", 51, "7"], ["62", 52, "8"], ["62", 53, "9"], ["62", 54, "10"], ["62", 55, "11"], ["62", 56, "7"], ["62", 57, "5"], ["62", 58, "6"], ["62", 59, "8"], ["62", 60, "9"], ["62", 61, "10"], ["62", 62, "9"], ["62", 63, "10"], ["62", 64, "9"], ["62", 65, "8"], ["62", 66, "8"], ["62", 67, "7"], ["62", 68, "8"], ["62", 69, "6"], ["62", 70, "4"], ["62", 71, "5"], ["62", 72, "5"], ["62", 73, "5"], ["62", 74, "5"], ["62", 75, "6"], ["62", 76, "5"], ["62", 77, "2"], ["62", 78, "2"], ["62", 79, "1"], ["62", 80, "3"], ["62", 81, "5"], ["62", 82, "3"], ["62", 83, "4"], ["62", 84, "4"], ["62", 85, "7"], ["62", 86, "8"], ["62", 87, "4"], ["62", 88, "4"], ["62", 89, "5"], ["62", 90, "6"], ["62", 91, "7"], ["62", 92, "7"], ["62", 93, "9"], ["62", 94, "7"], ["62", 95, "7"], ["62", 96, "7"], ["62", 97, "8"], ["62", 98, "7"], ["62", 99, "3"], ["62", 100, "5"], ["62", 101, "7"], ["62", 102, "7"], ["62", 103, "8"], ["62", 104, "5"], ["62", 105, "4"], ["62", 106, "4"], ["62", 107, "8"], ["62", 108, "7"], ["62", 109, "7"], ["62", 110, "8"], ["62", 111, "6"], ["62", 112, "6"], ["62", 113, "6"], ["62", 114, "8"], ["62", 115, "8"], ["62", 116, "10"], ["62", 117, "7"], ["62", 118, "8"], ["62", 119, "7"], ["62", 120, "7"], ["62", 121, "6"], ["62", 122, "2"], ["62", 123, "4"], ["62", 124, "6"], ["62", 125, "3"], ["62", 126, "4"], ["62", 127, "2"], ["62", 128, "3"], ["62", 129, "2"], ["62", 130, "2"], ["62", 131, "4"], ["62", 132, "2"], ["62", 133, "3"], ["62", 134, "5"], ["62", 135, "5"], ["62", 136, "8"], ["62", 137, "10"], ["62", 138, "9"], ["62", 139, "8"], ["62", 140, "9"], ["62", 141, "7"], ["62", 142, "3"], ["62", 143, "1"], ["62", 144, "1"], ["62", 145, "1"], ["62", 150, "1"], ["62", 151, "1"], ["62", 152, "1"], ["62", 153, "1"], ["62", 154, "1"], ["62", 155, "1"], ["62", 156, "1"], ["63", 26, "1"], ["63", 27, "1"], ["63", 28, "1"], ["63", 29, "1"], ["63", 30, "2"], ["63", 32, "1"], ["63", 33, "2"], ["63", 34, "2"], ["63", 35, "5"], ["63", 36, "3"], ["63", 37, "4"], ["63", 38, "6"], ["63", 39, "8"], ["63", 40, "4"], ["63", 41, "6"], ["63", 42, "6"], ["63", 43, "5"], ["63", 44, "7"], ["63", 45, "8"], ["63", 46, "7"], ["63", 47, "9"], ["63", 48, "10"], ["63", 49, "10"], ["63", 50, "9"], ["63", 51, "7"], ["63", 52, "8"], ["63", 53, "9"], ["63", 54, "10"], ["63", 55, "11"], ["63", 56, "7"], ["63", 57, "5"], ["63", 58, "6"], ["63", 59, "8"], ["63", 60, "9"], ["63", 61, "10"], ["63", 62, "9"], ["63", 63, "10"], ["63", 64, "9"], ["63", 65, "8"], ["63", 66, "8"], ["63", 67, "7"], ["63", 68, "8"], ["63", 69, "6"], ["63", 70, "4"], ["63", 71, "5"], ["63", 72, "5"], ["63", 73, "5"], ["63", 74, "5"], ["63", 75, "6"], ["63", 76, "5"], ["63", 77, "2"], ["63", 78, "2"], ["63", 79, "1"], ["63", 80, "3"], ["63", 81, "5"], ["63", 82, "3"], ["63", 83, "4"], ["63", 84, "4"], ["63", 85, "7"], ["63", 86, "8"], ["63", 87, "4"], ["63", 88, "4"], ["63", 89, "5"], ["63", 90, "6"], ["63", 91, "7"], ["63", 92, "7"], ["63", 93, "9"], ["63", 94, "7"], ["63", 95, "7"], ["63", 96, "7"], ["63", 97, "8"], ["63", 98, "7"], ["63", 99, "3"], ["63", 100, "5"], ["63", 101, "7"], ["63", 102, "7"], ["63", 103, "8"], ["63", 104, "5"], ["63", 105, "4"], ["63", 106, "4"], ["63", 107, "8"], ["63", 108, "7"], ["63", 109, "7"], ["63", 110, "8"], ["63", 111, "6"], ["63", 112, "6"], ["63", 113, "6"], ["63", 114, "8"], ["63", 115, "8"], ["63", 116, "10"], ["63", 117, "7"], ["63", 118, "8"], ["63", 119, "7"], ["63", 120, "7"], ["63", 121, "6"], ["63", 122, "2"], ["63", 123, "4"], ["63", 124, "6"], ["63", 125, "3"], ["63", 126, "4"], ["63", 127, "2"], ["63", 128, "3"], ["63", 129, "2"], ["63", 130, "2"], ["63", 131, "4"], ["63", 132, "2"], ["63", 133, "3"], ["63", 134, "5"], ["63", 135, "5"], ["63", 136, "8"], ["63", 137, "10"], ["63", 138, "9"], ["63", 139, "8"], ["63", 140, "9"], ["63", 141, "7"], ["63", 142, "3"], ["63", 143, "1"], ["63", 144, "1"], ["63", 145, "1"], ["63", 150, "1"], ["63", 151, "1"], ["63", 152, "1"], ["63", 153, "1"], ["63", 154, "1"], ["63", 155, "1"], ["63", 156, "1"], ["64", 26, "1"], ["64", 27, "1"], ["64", 28, "1"], ["64", 29, "1"], ["64", 30, "2"], ["64", 32, "1"], ["64", 33, "2"], ["64", 34, "2"], ["64", 35, "5"], ["64", 36, "3"], ["64", 37, "4"], ["64", 38, "6"], ["64", 39, "8"], ["64", 40, "4"], ["64", 41, "6"], ["64", 42, "6"], ["64", 43, "5"], ["64", 44, "7"], ["64", 45, "8"], ["64", 46, "7"], ["64", 47, "9"], ["64", 48, "10"], ["64", 49, "10"], ["64", 50, "9"], ["64", 51, "7"], ["64", 52, "8"], ["64", 53, "9"], ["64", 54, "10"], ["64", 55, "11"], ["64", 56, "7"], ["64", 57, "5"], ["64", 58, "6"], ["64", 59, "8"], ["64", 60, "9"], ["64", 61, "10"], ["64", 62, "9"], ["64", 63, "10"], ["64", 64, "9"], ["64", 65, "8"], ["64", 66, "8"], ["64", 67, "7"], ["64", 68, "8"], ["64", 69, "6"], ["64", 70, "4"], ["64", 71, "5"], ["64", 72, "5"], ["64", 73, "5"], ["64", 74, "5"], ["64", 75, "6"], ["64", 76, "5"], ["64", 77, "2"], ["64", 78, "2"], ["64", 79, "1"], ["64", 80, "3"], ["64", 81, "5"], ["64", 82, "3"], ["64", 83, "4"], ["64", 84, "4"], ["64", 85, "7"], ["64", 86, "8"], ["64", 87, "4"], ["64", 88, "4"], ["64", 89, "5"], ["64", 90, "6"], ["64", 91, "7"], ["64", 92, "7"], ["64", 93, "9"], ["64", 94, "7"], ["64", 95, "7"], ["64", 96, "7"], ["64", 97, "8"], ["64", 98, "7"], ["64", 99, "3"], ["64", 100, "5"], ["64", 101, "7"], ["64", 102, "7"], ["64", 103, "8"], ["64", 104, "5"], ["64", 105, "4"], ["64", 106, "4"], ["64", 107, "8"], ["64", 108, "7"], ["64", 109, "7"], ["64", 110, "8"], ["64", 111, "6"], ["64", 112, "6"], ["64", 113, "6"], ["64", 114, "8"], ["64", 115, "8"], ["64", 116, "10"], ["64", 117, "7"], ["64", 118, "8"], ["64", 119, "7"], ["64", 120, "7"], ["64", 121, "6"], ["64", 122, "2"], ["64", 123, "4"], ["64", 124, "6"], ["64", 125, "3"], ["64", 126, "4"], ["64", 127, "2"], ["64", 128, "3"], ["64", 129, "2"], ["64", 130, "2"], ["64", 131, "4"], ["64", 132, "2"], ["64", 133, "3"], ["64", 134, "5"], ["64", 135, "5"], ["64", 136, "8"], ["64", 137, "10"], ["64", 138, "9"], ["64", 139, "8"], ["64", 140, "9"], ["64", 141, "7"], ["64", 142, "3"], ["64", 143, "1"], ["64", 144, "1"], ["64", 145, "1"], ["64", 150, "1"], ["64", 151, "1"], ["64", 152, "1"], ["64", 153, "1"], ["64", 154, "1"], ["64", 155, "1"], ["64", 156, "1"], ["67", -63, "1"], ["67", -62, "1"], ["67", 12, "1"], ["67", 13, "2"], ["67", 16, "1"], ["67", 20, "1"], ["67", 21, "2"], ["67", 22, "4"], ["67", 23, "1"], ["67", 25, "3"], ["67", 26, "4"], ["67", 27, "3"], ["67", 28, "6"], ["67", 29, "7"], ["67", 30, "8"], ["67", 31, "1"], ["67", 32, "4"], ["67", 33, "4"], ["67", 34, "10"], ["67", 35, "6"], ["67", 36, "5"], ["67", 37, "6"], ["67", 38, "6"], ["67", 39, "4"], ["67", 40, "6"], ["67", 41, "10"], ["67", 42, "5"], ["67", 43, "7"], ["67", 44, "9"], ["67", 45, "7"], ["67", 46, "10"], ["67", 47, "7"], ["67", 48, "8"], ["67", 49, "8"], ["67", 50, "9"], ["67", 51, "7"], ["67", 52, "5"], ["67", 53, "8"], ["67", 54, "8"], ["67", 55, "5"], ["67", 56, "5"], ["67", 57, "6"], ["67", 58, "5"], ["67", 59, "4"], ["67", 60, "4"], ["67", 61, "4"], ["67", 62, "3"], ["67", 63, "4"], ["67", 64, "3"], ["67", 65, "5"], ["67", 66, "3"], ["67", 67, "3"], ["67", 68, "2"], ["67", 69, "3"], ["67", 70, "3"], ["67", 71, "3"], ["67", 72, "3"], ["67", 73, "1"], ["67", 74, "2"], ["67", 75, "1"], ["67", 76, "1"], ["67", 77, "1"], ["67", 78, "1"], ["67", 79, "3"], ["67", 80, "3"], ["67", 81, "2"], ["67", 82, "2"], ["67", 83, "1"], ["67", 84, "1"], ["67", 85, "2"], ["67", 86, "1"], ["67", 87, "3"], ["67", 88, "3"], ["67", 89, "8"], ["67", 90, "5"], ["67", 91, "3"], ["67", 92, "8"], ["67", 93, "5"], ["67", 94, "2"], ["67", 95, "7"], ["67", 96, "3"], ["67", 97, "5"], ["67", 98, "2"], ["67", 99, "1"], ["67", 100, "4"], ["67", 101, "5"], ["67", 102, "4"], ["67", 103, "4"], ["67", 104, "4"], ["67", 105, "3"], ["67", 106, "3"], ["67", 107, "3"], ["67", 108, "2"], ["67", 109, "2"], ["67", 111, "3"], ["67", 112, "4"], ["67", 113, "3"], ["67", 114, "2"], ["67", 115, "4"], ["67", 116, "5"], ["67", 117, "3"], ["67", 118, "4"], ["67", 119, "4"], ["67", 120, "3"], ["67", 121, "1"], ["67", 122, "4"], ["67", 123, "5"], ["67", 124, "5"], ["67", 125, "3"], ["67", 126, "4"], ["67", 127, "2"], ["67", 128, "1"], ["67", 129, "1"], ["67", 130, "3"], ["67", 131, "3"], ["67", 132, "4"], ["67", 133, "3"], ["67", 134, "3"], ["67", 135, "5"], ["67", 136, "4"], ["67", 137, "7"], ["67", 138, "11"], ["67", 139, "9"], ["67", 140, "9"], ["67", 141, "10"], ["67", 142, "8"], ["67", 143, "8"], ["67", 144, "8"], ["67", 145, "2"], ["67", 146, "1"], ["67", 147, "1"], ["67", 148, "3"], ["67", 149, "4"], ["67", 150, "7"], ["67", 151, "4"], ["67", 152, "4"], ["67", 153, "1"], ["67", 154, "2"], ["67", 155, "2"], ["67", 156, "2"], ["67", 157, "1"], ["67", 165, "1"], ["67", 177, "1"], ["67", 178, "1"], ["67", 189, "1"], ["67", 199, "1"], ["67", 200, "1"], ["68", -63, "1"], ["68", -62, "1"], ["68", 12, "1"], ["68", 13, "2"], ["68", 16, "1"], ["68", 20, "1"], ["68", 21, "2"], ["68", 22, "4"], ["68", 23, "1"], ["68", 25, "3"], ["68", 26, "4"], ["68", 27, "3"], ["68", 28, "6"], ["68", 29, "7"], ["68", 30, "8"], ["68", 31, "1"], ["68", 32, "4"], ["68", 33, "4"], ["68", 34, "10"], ["68", 35, "6"], ["68", 36, "5"], ["68", 37, "6"], ["68", 38, "6"], ["68", 39, "4"], ["68", 40, "6"], ["68", 41, "10"], ["68", 42, "5"], ["68", 43, "7"], ["68", 44, "9"], ["68", 45, "7"], ["68", 46, "10"], ["68", 47, "7"], ["68", 48, "8"], ["68", 49, "8"], ["68", 50, "9"], ["68", 51, "7"], ["68", 52, "5"], ["68", 53, "8"], ["68", 54, "8"], ["68", 55, "5"], ["68", 56, "5"], ["68", 57, "6"], ["68", 58, "5"], ["68", 59, "4"], ["68", 60, "4"], ["68", 61, "4"], ["68", 62, "3"], ["68", 63, "4"], ["68", 64, "3"], ["68", 65, "5"], ["68", 66, "3"], ["68", 67, "3"], ["68", 68, "2"], ["68", 69, "3"], ["68", 70, "3"], ["68", 71, "3"], ["68", 72, "3"], ["68", 73, "1"], ["68", 74, "2"], ["68", 75, "1"], ["68", 76, "1"], ["68", 77, "1"], ["68", 78, "1"], ["68", 79, "3"], ["68", 80, "3"], ["68", 81, "2"], ["68", 82, "2"], ["68", 83, "1"], ["68", 84, "1"], ["68", 85, "2"], ["68", 86, "1"], ["68", 87, "3"], ["68", 88, "3"], ["68", 89, "8"], ["68", 90, "5"], ["68", 91, "3"], ["68", 92, "8"], ["68", 93, "5"], ["68", 94, "2"], ["68", 95, "7"], ["68", 96, "3"], ["68", 97, "5"], ["68", 98, "2"], ["68", 99, "1"], ["68", 100, "4"], ["68", 101, "5"], ["68", 102, "4"], ["68", 103, "4"], ["68", 104, "4"], ["68", 105, "3"], ["68", 106, "3"], ["68", 107, "3"], ["68", 108, "2"], ["68", 109, "2"], ["68", 111, "3"], ["68", 112, "4"], ["68", 113, "3"], ["68", 114, "2"], ["68", 115, "4"], ["68", 116, "5"], ["68", 117, "3"], ["68", 118, "4"], ["68", 119, "4"], ["68", 120, "3"], ["68", 121, "1"], ["68", 122, "4"], ["68", 123, "5"], ["68", 124, "5"], ["68", 125, "3"], ["68", 126, "4"], ["68", 127, "2"], ["68", 128, "1"], ["68", 129, "1"], ["68", 130, "3"], ["68", 131, "3"], ["68", 132, "4"], ["68", 133, "3"], ["68", 134, "3"], ["68", 135, "5"], ["68", 136, "4"], ["68", 137, "7"], ["68", 138, "11"], ["68", 139, "9"], ["68", 140, "9"], ["68", 141, "10"], ["68", 142, "8"], ["68", 143, "8"], ["68", 144, "8"], ["68", 145, "2"], ["68", 146, "1"], ["68", 147, "1"], ["68", 148, "3"], ["68", 149, "4"], ["68", 150, "7"], ["68", 151, "4"], ["68", 152, "4"], ["68", 153, "1"], ["68", 154, "2"], ["68", 155, "2"], ["68", 156, "2"], ["68", 157, "1"], ["68", 165, "1"], ["68", 177, "1"], ["68", 178, "1"], ["68", 189, "1"], ["68", 199, "1"], ["68", 200, "1"], ["69", -63, "1"], ["69", -62, "1"], ["69", 12, "1"], ["69", 13, "2"], ["69", 16, "1"], ["69", 20, "1"], ["69", 21, "2"], ["69", 22, "4"], ["69", 23, "1"], ["69", 25, "3"], ["69", 26, "4"], ["69", 27, "3"], ["69", 28, "6"], ["69", 29, "7"], ["69", 30, "8"], ["69", 31, "1"], ["69", 32, "4"], ["69", 33, "4"], ["69", 34, "10"], ["69", 35, "6"], ["69", 36, "5"], ["69", 37, "6"], ["69", 38, "6"], ["69", 39, "4"], ["69", 40, "6"], ["69", 41, "10"], ["69", 42, "5"], ["69", 43, "7"], ["69", 44, "9"], ["69", 45, "7"], ["69", 46, "10"], ["69", 47, "7"], ["69", 48, "8"], ["69", 49, "8"], ["69", 50, "9"], ["69", 51, "7"], ["69", 52, "5"], ["69", 53, "8"], ["69", 54, "8"], ["69", 55, "5"], ["69", 56, "5"], ["69", 57, "6"], ["69", 58, "5"], ["69", 59, "4"], ["69", 60, "4"], ["69", 61, "4"], ["69", 62, "3"], ["69", 63, "4"], ["69", 64, "3"], ["69", 65, "5"], ["69", 66, "3"], ["69", 67, "3"], ["69", 68, "2"], ["69", 69, "3"], ["69", 70, "3"], ["69", 71, "3"], ["69", 72, "3"], ["69", 73, "1"], ["69", 74, "2"], ["69", 75, "1"], ["69", 76, "1"], ["69", 77, "1"], ["69", 78, "1"], ["69", 79, "3"], ["69", 80, "3"], ["69", 81, "2"], ["69", 82, "2"], ["69", 83, "1"], ["69", 84, "1"], ["69", 85, "2"], ["69", 86, "1"], ["69", 87, "3"], ["69", 88, "3"], ["69", 89, "8"], ["69", 90, "5"], ["69", 91, "3"], ["69", 92, "8"], ["69", 93, "5"], ["69", 94, "2"], ["69", 95, "7"], ["69", 96, "3"], ["69", 97, "5"], ["69", 98, "2"], ["69", 99, "1"], ["69", 100, "4"], ["69", 101, "5"], ["69", 102, "4"], ["69", 103, "4"], ["69", 104, "4"], ["69", 105, "3"], ["69", 106, "3"], ["69", 107, "3"], ["69", 108, "2"], ["69", 109, "2"], ["69", 111, "3"], ["69", 112, "4"], ["69", 113, "3"], ["69", 114, "2"], ["69", 115, "4"], ["69", 116, "5"], ["69", 117, "3"], ["69", 118, "4"], ["69", 119, "4"], ["69", 120, "3"], ["69", 121, "1"], ["69", 122, "4"], ["69", 123, "5"], ["69", 124, "5"], ["69", 125, "3"], ["69", 126, "4"], ["69", 127, "2"], ["69", 128, "1"], ["69", 129, "1"], ["69", 130, "3"], ["69", 131, "3"], ["69", 132, "4"], ["69", 133, "3"], ["69", 134, "3"], ["69", 135, "5"], ["69", 136, "4"], ["69", 137, "7"], ["69", 138, "11"], ["69", 139, "9"], ["69", 140, "9"], ["69", 141, "10"], ["69", 142, "8"], ["69", 143, "8"], ["69", 144, "8"], ["69", 145, "2"], ["69", 146, "1"], ["69", 147, "1"], ["69", 148, "3"], ["69", 149, "4"], ["69", 150, "7"], ["69", 151, "4"], ["69", 152, "4"], ["69", 153, "1"], ["69", 154, "2"], ["69", 155, "2"], ["69", 156, "2"], ["69", 157, "1"], ["69", 165, "1"], ["69", 177, "1"], ["69", 178, "1"], ["69", 189, "1"], ["69", 199, "1"], ["69", 200, "1"], ["70", -63, "1"], ["70", -62, "1"], ["70", 1, "1"], ["70", 4, "1"], ["70", 5, "1"], ["70", 7, "1"], ["70", 12, "1"], ["70", 13, "2"], ["70", 16, "1"], ["70", 18, "1"], ["70", 19, "1"], ["70", 20, "3"], ["70", 21, "2"], ["70", 22, "4"], ["70", 23, "1"], ["70", 25, "3"], ["70", 26, "4"], ["70", 27, "6"], ["70", 28, "7"], ["70", 29, "7"], ["70", 30, "8"], ["70", 31, "3"], ["70", 32, "4"], ["70", 33, "6"], ["70", 34, "10"], ["70", 35, "7"], ["70", 36, "5"], ["70", 37, "6"], ["70", 38, "6"], ["70", 39, "5"], ["70", 40, "7"], ["70", 41, "10"], ["70", 42, "5"], ["70", 43, "8"], ["70", 44, "9"], ["70", 45, "8"], ["70", 46, "10"], ["70", 47, "8"], ["70", 48, "8"], ["70", 49, "8"], ["70", 50, "10"], ["70", 51, "8"], ["70", 52, "5"], ["70", 53, "8"], ["70", 54, "8"], ["70", 55, "6"], ["70", 56, "6"], ["70", 57, "7"], ["70", 58, "4"], ["70", 59, "4"], ["70", 60, "6"], ["70", 61, "4"], ["70", 62, "3"], ["70", 63, "4"], ["70", 64, "3"], ["70", 65, "5"], ["70", 66, "3"], ["70", 67, "3"], ["70", 68, "2"], ["70", 69, "3"], ["70", 70, "3"], ["70", 71, "3"], ["70", 72, "3"], ["70", 73, "1"], ["70", 74, "2"], ["70", 75, "2"], ["70", 76, "1"], ["70", 77, "1"], ["70", 78, "2"], ["70", 79, "4"], ["70", 80, "3"], ["70", 81, "2"], ["70", 82, "2"], ["70", 83, "1"], ["70", 84, "1"], ["70", 85, "2"], ["70", 86, "1"], ["70", 87, "3"], ["70", 88, "4"], ["70", 89, "8"], ["70", 90, "5"], ["70", 91, "3"], ["70", 92, "8"], ["70", 93, "5"], ["70", 94, "2"], ["70", 95, "7"], ["70", 96, "3"], ["70", 97, "5"], ["70", 98, "2"], ["70", 99, "2"], ["70", 100, "4"], ["70", 101, "6"], ["70", 102, "4"], ["70", 103, "4"], ["70", 104, "4"], ["70", 105, "5"], ["70", 106, "3"], ["70", 107, "3"], ["70", 108, "2"], ["70", 109, "2"], ["70", 111, "5"], ["70", 112, "4"], ["70", 113, "5"], ["70", 114, "4"], ["70", 115, "4"], ["70", 116, "6"], ["70", 117, "4"], ["70", 118, "4"], ["70", 119, "4"], ["70", 120, "4"], ["70", 121, "1"], ["70", 122, "4"], ["70", 123, "6"], ["70", 124, "6"], ["70", 125, "4"], ["70", 126, "4"], ["70", 127, "3"], ["70", 128, "1"], ["70", 129, "1"], ["70", 130, "5"], ["70", 131, "4"], ["70", 132, "4"], ["70", 133, "3"], ["70", 134, "3"], ["70", 135, "5"], ["70", 136, "5"], ["70", 137, "9"], ["70", 138, "11"], ["70", 139, "9"], ["70", 140, "10"], ["70", 141, "10"], ["70", 142, "8"], ["70", 143, "10"], ["70", 144, "8"], ["70", 145, "3"], ["70", 146, "1"], ["70", 147, "1"], ["70", 148, "6"], ["70", 149, "5"], ["70", 150, "8"], ["70", 151, "4"], ["70", 152, "4"], ["70", 153, "1"], ["70", 154, "3"], ["70", 155, "3"], ["70", 156, "2"], ["70", 157, "2"], ["70", 165, "1"], ["70", 177, "1"], ["70", 178, "1"], ["70", 187, "1"], ["70", 189, "1"], ["70", 199, "1"], ["70", 200, "1"]];

// export default hotDate;

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _webgl = __webpack_require__(6);

var _webgl2 = _interopRequireDefault(_webgl);

var _path = __webpack_require__(18);

var _path2 = _interopRequireDefault(_path);

var _hot = __webpack_require__(13);

var _hot2 = _interopRequireDefault(_hot);

var _mercatorPorjection = __webpack_require__(5);

var _mercatorPorjection2 = _interopRequireDefault(_mercatorPorjection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mercatorProjection = new _mercatorPorjection2.default();

window.onload = function () {
    var app = window.app = new _webgl2.default('canvas');

    // // x
    // app.Path({
    //     path: [
    //         [0, 0, 0],
    //         [0, 100, 0],
    //     ],
    //     color: '#f00'
    // });

    // // y
    // app.Path({
    //     path: [
    //         [0, 0, 0],
    //         [100, 0, 0],
    //     ],
    //     color: '#0f0'
    // });

    // // z
    // app.Path({
    //     path: [
    //         [0, 0, 0],
    //         [0, 0, 100],
    //     ],
    //     color: '#00f'
    // });

    // // z
    // app.Path({
    //     path: [
    //         [-500, 0, 0],
    //         [500, 0, 0],
    //     ],
    //     color: '#fff'
    // });
    // console.log(datas)
    // prepare data
    var maxWidth = 1000;
    var min = [Infinity, Infinity];
    var max = [-Infinity, -Infinity];
    _path2.default.paths = _path2.default.paths.map(function (point) {
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
    var newPath = _path2.default.paths.map(function (point) {
        return [(point[0] - mid[0]) * scale, (point[1] - mid[1]) * scale, 0];
    });

    // color  data
    var canvas = this.canvas = document.createElement('canvas');
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
    var canvas = this.canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = '2048';
    canvas.height = '2048';
    canvas.style.width = '200px';
    canvas.style.height = '200px';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.zIndex = '100';
    document.body.appendChild(canvas);

    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.shadowColor = 'rgba(0,255,0,0.06)';
    ctx.shadowOffsetX = 2048;
    ctx.shadowBlur = 100;

    for (var i = 0; i < 100; i++) {
        ctx.fillRect((Math.random() * 2048 | 0) - 2248, Math.random() * 2048 | 0, Math.random() * 100 + 100, Math.random() * 100 + 100);
    }

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

    // //
    app.HeatMap({
        alphaImageData: alphaImageData,
        imgData: imgData
    });
};

/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var paths = [["116.452143", "39.889167", 0], ["116.451994", "39.890329", 0], ["116.451846", "39.891591", 0], ["116.451739", "39.892438", 0], ["116.451643", "39.893203", 0], ["116.451323", "39.895705", 0], ["116.451103", "39.897235", 0], ["116.451020", "39.897781", 0], ["116.450945", "39.898277", 0], ["116.450825", "39.899458", 0], ["116.450759", "39.900727", 0], ["116.450748", "39.900943", 0], ["116.450662", "39.903094", 0], ["116.450417", "39.903752", 0], ["116.449079", "39.904687", 0], ["116.446823", "39.905211", 0], ["116.444635", "39.905708", 0], ["116.443402", "39.906438", 0], ["116.443151", "39.906811", 0], ["116.443011", "39.907385", 0], ["116.443027", "39.907719", 0], ["116.443042", "39.907911", 0], ["116.443068", "39.908238", 0], ["116.442954", "39.909361", 0], ["116.442804", "39.910220", 0], ["116.442768", "39.910438", 0], ["116.442687", "39.910907", 0], ["116.442669", "39.911008", 0], ["116.442541", "39.911746", 0], ["116.442496", "39.911948", 0], ["116.442460", "39.912539", 0], ["116.442416", "39.913245", 0], ["116.442382", "39.914500", 0], ["116.442295", "39.915674", 0], ["116.442285", "39.915882", 0], ["116.442243", "39.916742", 0], ["116.442040", "39.917711", 0], ["116.441813", "39.918740", 0], ["116.441483", "39.921427", 0], ["116.441476", "39.921570", 0], ["116.441445", "39.922271", 0], ["116.441436", "39.922576", 0], ["116.441428", "39.922730", 0], ["116.441399", "39.923433", 0], ["116.441393", "39.923617", 0], ["116.441289", "39.925688", 0], ["116.441227", "39.927439", 0], ["116.441212", "39.927748", 0], ["116.441196", "39.927861", 0], ["116.441079", "39.930370", 0], ["116.441012", "39.931965", 0], ["116.440986", "39.932708", 0], ["116.440921", "39.934236", 0], ["116.440894", "39.934861", 0], ["116.440822", "39.936462", 0], ["116.440816", "39.936684", 0], ["116.440800", "39.937062", 0], ["116.440771", "39.937575", 0], ["116.440675", "39.939640", 0], ["116.440609", "39.941181", 0], ["116.440563", "39.942114", 0], ["116.440553", "39.942264", 0], ["116.440509", "39.943285", 0], ["116.440446", "39.944815", 0], ["116.440347", "39.947009", 0], ["116.440275", "39.949320", 0], ["116.440291", "39.949821", 0], ["116.440322", "39.950905", 0], ["116.440309", "39.951048", 0], ["116.440315", "39.951350", 0], ["116.440344", "39.952350", 0], ["116.440343", "39.952484", 0], ["116.438276", "39.955607", 0], ["116.437094", "39.955816", 0], ["116.435638", "39.955792", 0], ["116.435177", "39.955786", 0], ["116.434470", "39.955773", 0], ["116.430681", "39.955711", 0], ["116.427758", "39.955671", 0], ["116.426977", "39.955654", 0], ["116.426766", "39.955651", 0], ["116.426435", "39.955648", 0], ["116.425105", "39.955621", 0], ["116.421619", "39.955556", 0], ["116.418171", "39.955490", 0], ["116.414766", "39.955462", 0], ["116.410814", "39.955458", 0], ["116.406925", "39.955431", 0], ["116.402176", "39.955374", 0], ["116.400467", "39.955354", 0], ["116.400270", "39.955352", 0], ["116.397776", "39.955335", 0], ["116.396883", "39.955320", 0], ["116.396284", "39.955310", 0], ["116.391650", "39.955213", 0], ["116.388423", "39.955144", 0], ["116.386054", "39.955099", 0], ["116.384483", "39.955040", 0], ["116.382831", "39.954981", 0], ["116.382383", "39.954965", 0], ["116.381459", "39.954917", 0], ["116.378012", "39.954641", 0], ["116.375494", "39.953935", 0], ["116.374771", "39.953644", 0], ["116.372932", "39.952841", 0], ["116.371970", "39.952421", 0], ["116.370419", "39.951940", 0], ["116.367191", "39.950978", 0], ["116.366170", "39.950680", 0], ["116.366083", "39.950655", 0], ["116.365591", "39.950509", 0], ["116.361928", "39.948586", 0], ["116.361967", "39.947731", 0], ["116.362032", "39.946246", 0], ["116.362053", "39.943655", 0], ["116.362170", "39.941876", 0], ["116.362181", "39.941266", 0], ["116.362336", "39.938210", 0], ["116.362489", "39.935104", 0], ["116.362546", "39.933335", 0], ["116.362617", "39.931677", 0], ["116.362621", "39.931422", 0], ["116.362668", "39.930570", 0], ["116.362726", "39.929455", 0], ["116.362786", "39.928375", 0], ["116.362811", "39.927908", 0], ["116.362845", "39.927300", 0], ["116.362860", "39.926697", 0], ["116.363037", "39.923706", 0], ["116.363083", "39.922439", 0], ["116.363115", "39.921784", 0], ["116.363210", "39.919724", 0], ["116.363234", "39.916692", 0], ["116.363170", "39.916124", 0], ["116.363105", "39.914178", 0], ["116.363158", "39.913017", 0], ["116.363210", "39.911812", 0], ["116.363277", "39.910069", 0], ["116.363231", "39.908398", 0], ["116.363247", "39.907031", 0], ["116.363260", "39.906804", 0], ["116.363276", "39.906523", 0], ["116.363057", "39.905419", 0], ["116.360762", "39.904211", 0], ["116.357967", "39.904007", 0], ["116.357328", "39.903965", 0], ["116.355180", "39.901867", 0], ["116.355231", "39.900434", 0], ["116.355228", "39.900070", 0], ["116.355231", "39.899202", 0], ["116.355242", "39.898325", 0], ["116.355259", "39.897530", 0], ["116.355261", "39.897472", 0], ["116.355274", "39.896488", 0], ["116.355281", "39.895299", 0], ["116.355304", "39.894311", 0], ["116.355323", "39.893709", 0], ["116.355338", "39.892896", 0], ["116.355341", "39.892635", 0], ["116.355353", "39.891327", 0], ["116.355379", "39.889328", 0], ["116.355381", "39.888599", 0], ["116.355390", "39.888385", 0], ["116.355420", "39.887638", 0], ["116.355621", "39.885016", 0], ["116.355850", "39.882375", 0], ["116.355826", "39.880801", 0], ["116.355738", "39.880256", 0], ["116.355595", "39.879221", 0], ["116.355499", "39.878504", 0], ["116.355319", "39.876775", 0], ["116.355702", "39.875349", 0], ["116.356837", "39.874460", 0], ["116.360095", "39.874115", 0], ["116.361516", "39.874107", 0], ["116.363561", "39.874081", 0], ["116.365209", "39.874190", 0], ["116.365449", "39.874209", 0], ["116.366479", "39.874306", 0], ["116.366597", "39.874323", 0], ["116.367043", "39.874384", 0], ["116.370755", "39.875016", 0], ["116.375193", "39.875736", 0], ["116.376808", "39.875904", 0], ["116.378011", "39.876030", 0], ["116.381488", "39.876347", 0], ["116.383279", "39.876498", 0], ["116.384578", "39.876610", 0], ["116.384982", "39.876644", 0], ["116.386605", "39.876787", 0], ["116.388015", "39.876910", 0], ["116.390503", "39.877132", 0], ["116.391317", "39.877192", 0], ["116.392350", "39.877279", 0], ["116.394374", "39.877421", 0], ["116.395746", "39.877515", 0], ["116.396180", "39.877545", 0], ["116.396504", "39.877567", 0], ["116.397429", "39.877628", 0], ["116.400260", "39.877775", 0], ["116.401773", "39.877826", 0], ["116.403841", "39.877919", 0], ["116.405912", "39.877982", 0], ["116.407887", "39.878077", 0], ["116.409628", "39.878204", 0], ["116.410613", "39.878253", 0], ["116.411896", "39.878285", 0], ["116.412908", "39.878308", 0], ["116.413621", "39.878328", 0], ["116.414545", "39.878354", 0], ["116.415307", "39.878348", 0], ["116.416517", "39.878369", 0], ["116.418634", "39.878412", 0], ["116.420226", "39.878440", 0], ["116.420545", "39.878448", 0], ["116.421641", "39.878355", 0], ["116.421709", "39.878340", 0], ["116.422258", "39.878123", 0], ["116.423074", "39.877718", 0], ["116.426273", "39.877270", 0], ["116.426727", "39.877289", 0], ["116.427368", "39.877328", 0], ["116.427484", "39.877331", 0], ["116.427622", "39.877338", 0], ["116.428028", "39.877356", 0], ["116.428454", "39.877377", 0], ["116.429088", "39.877411", 0], ["116.429862", "39.877426", 0], ["116.431068", "39.877408", 0], ["116.434706", "39.877210", 0], ["116.436790", "39.877053", 0], ["116.437244", "39.877012", 0], ["116.439287", "39.876871", 0], ["116.439955", "39.876826", 0], ["116.441024", "39.876748", 0], ["116.441403", "39.876726", 0], ["116.441881", "39.876695", 0], ["116.442122", "39.876678", 0], ["116.442315", "39.876664", 0], ["116.443333", "39.876590", 0], ["116.443841", "39.876549", 0], ["116.446124", "39.876387", 0], ["116.447569", "39.876293", 0], ["116.448502", "39.876345", 0], ["116.449349", "39.876593", 0], ["116.449882", "39.876878", 0], ["116.450456", "39.877499", 0], ["116.450527", "39.877617", 0], ["116.450885", "39.878793", 0], ["116.451306", "39.880522", 0], ["116.451387", "39.880748", 0], ["116.451685", "39.881578", 0], ["116.452358", "39.882953", 0], ["116.452613", "39.886537", 0], ["116.452577", "39.886829", 0], ["116.452304", "39.888168", 0], ["116.452246", "39.888527", 0], ["116.452143", "39.889167", 0]];

exports.default = {
    paths: paths
};

/***/ })
/******/ ]);