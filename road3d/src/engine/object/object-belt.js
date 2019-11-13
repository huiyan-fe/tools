import Obj from './Object.js';

class Belt extends Obj {
    constructor(GL, obj) {
        super(GL, obj);
        this.obj = obj;
        this.update(obj);
    }

    update(obj) {
        let color = this.color;
        let paths = obj.path;
        this.height = obj.height || 10.0;
        this.verticesColors = [];
        this.indices = [];
        this.texture_coords = [];

        let pathDistances = [];
        let pathLength = 0;
        paths.forEach((point, index) => {
            // if(index>10) return false;
            if (index > 0) {
                let start = point;
                let end = paths[index - 1];
                let dist = Math.sqrt((start[0] - end[0]) ** 2, (start[1] - end[1]) ** 2)
                pathLength += dist;
            }
            pathDistances.push(pathLength);
            //
            point[2] = this.height
            this.verticesColors = this.verticesColors.concat(point.concat(color));
            point[2] = 0
            this.verticesColors = this.verticesColors.concat(point.concat(color));
            //
            this.indices.push(index * 2);
            this.indices.push(index * 2 + 1);
        });
        pathDistances.forEach((dist, index) => {
            this.texture_coords.push(dist / pathLength, 1);
            this.texture_coords.push(dist / pathLength, 0);
        });
        this.texture_coords = new Float32Array(this.texture_coords);
        this.indices = new Uint16Array(this.indices);
        this.verticesColors = new Float32Array(this.verticesColors);
        console.log(this.texture_coords, this.verticesColors, this.indices)
    }

    render() {
        let gl = this.gl;
        let mvMatrix = this.GL.camera.mvMatrix;

        // 顶点/颜色缓冲区操作
        let vertexColorBuffer = this.gl.buffers('vcBuffer');
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.verticesColors, gl.STATIC_DRAW);
        let FSIZE = this.verticesColors.BYTES_PER_ELEMENT;
        gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, FSIZE * 6, 0);
        gl.enableVertexAttribArray(gl.aPosition);
        gl.vertexAttribPointer(gl.aColor, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
        gl.enableVertexAttribArray(gl.aColor);
        vertexColorBuffer = null;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);

        // 顶点索引
        let indexBuffer = this.gl.buffers('indexBuffer');
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
            let texture = gl.textures('text');
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.activeTexture(gl.TEXTURE0)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.obj.texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.uniform1i(gl.uSampler, 0);
            // // texture coordinate
            // console.log(this.texture_coords)
            let textureBufferObject = this.gl.buffers('textureBuffer');
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
}

export default Belt;