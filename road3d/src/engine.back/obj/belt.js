import Obj from './OBJ.js';

import {
    calculateNormals
} from '../tools/utility';


class Belt extends Obj {
    constructor(GL, obj) {
        super(GL, obj);

        this.width = obj.width || 10.0;
        this.height = obj.height || 10.0;

        var color = this.color;
        var paths = obj.path;
        this.vertices = [];
        this.verticesColors = [];
        this.newVerticesColors = [];

        // console.log(paths)
        let newPath = [];
        paths.forEach((path, index) => {
            // console.log(index, path[0], path[1], obj.width)
            this.vertices.push(path[0], path[1], path[2]);
            newPath = newPath.concat(path.concat(color));
        });

        paths.forEach((path, index) => {
            // console.log(index, path[0], path[1], obj.width)
            // this.vertices.push(path[0], path[1]);
            this.vertices.push(path[0], path[1], obj.width);
            newPath = newPath.concat([path[0], path[1], obj.width].concat(color));
        });

        // console.log(paths)

        this.verticesColors = new Float32Array(newPath);

        this.indices = [];
        this.texture_coords = [];
        // for (var i = 0; i < paths.length; i++) {
        //     this.indices.push(i);
        //     this.indices.push(i + paths.length);
        // }
        // this.indices = new Uint16Array(this.indices);
        // console.loAg(this.indices)

        for (var i = 1; i < paths.length; i++) {
            this.indices.push(i);
            this.indices.push(i - 1);
            this.indices.push(i - 1 + paths.length);

            this.indices.push(i);
            this.indices.push(i - 1 + paths.length);
            this.indices.push(i + paths.length);
        }

        this.indices = new Uint16Array(this.indices);


        // computer coords
        var pathLengths = [];
        var totalLemgth = 0;

        for (var i = 1; i < paths.length; i++) {
            var d = Math.sqrt(
                Math.pow(paths[i][0] - paths[i - 1][0], 2) +
                Math.pow(paths[i][1] - paths[i - 1][1], 2) +
                Math.pow(paths[i][2] - paths[i - 1][2], 2)
            );
            pathLengths.push(d);
            totalLemgth += d;
        }
        //
        var totalLength = 0;
        var newPathLengths = [0].concat(
            pathLengths.map((thePath) => {
                totalLength += thePath;
                return totalLength / totalLemgth;
            })
        );
        // console.log(newPathLengths.length)
        //
        var pointBase = [];
        var pointTop = [];
        this.texture_coords = [];

        newPathLengths.forEach((thepath, index) => {
            pointBase = pointBase.concat([thepath, 0.0]);
            pointTop = pointTop.concat([thepath, 1.0]);
        });

        this.texture_coords = pointBase.concat(pointTop);
        // color  data
        var canvas = this.canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = '255';
        canvas.height = '1';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.zIndex = '100';
        document.body.appendChild(canvas);
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
        canvas.height = '1024';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.zIndex = '100';
        // document.body.appendChild(canvas);

        ctx.fillStyle = 'rgba(255,0,0,0.01)';
        var preWidth = 1024 / 192;
        var preHeight = 2048 / 261;
        newDate.forEach((data) => {
            for (var i = 0; i < data[2]; i++) {
                ctx.fillRect(data[0] * preWidth, data[1] * preHeight, preWidth, preHeight)
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
        this.normals = calculateNormals(this.vertices, this.indices);
        //

        this.gl.uniform1i(this.gl.uUseTexture, true);
    }

    render() {
        var gl = this.gl;

        // 顶点/颜色缓冲区操作
        var vertexColorBuffer = this.gl.ubuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.verticesColors, gl.STATIC_DRAW);
        //
        var FSIZE = this.verticesColors.BYTES_PER_ELEMENT;
        gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, FSIZE * 6, 0);
        gl.enableVertexAttribArray(gl.aPosition);
        gl.vertexAttribPointer(gl.aColor, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
        gl.enableVertexAttribArray(gl.aColor);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        // 顶点索引缓冲区
        var indexBuffer = gl.ibuffer;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);


        // texture
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.activeTexture(gl.TEXTURE0)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.uniform1i(gl.uSampler, 0);

        // texture coordinate
        var textureBufferObject = gl.tbuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.texture_coords), gl.STATIC_DRAW);
        gl.vertexAttribPointer(gl.aVertexTextureCoords, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(gl.aVertexTextureCoords);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        // // normals
        var normalBuffer = gl.nbuffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
        gl.vertexAttribPointer(gl.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(gl.aVertexNormal);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);


        // set mv
        this.updateOpearte();
        // console.log(this.indices.length)
        //
        gl.uniformMatrix4fv(gl.uMVMatrix, false, this.opearteBuild.result);
        gl.drawElements(gl.TRIANGLE_STRIP, this.indices.length, gl.UNSIGNED_SHORT, 0);
        // console.log(1);
        gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT, 0);
    }

}

export default Belt;