import Obj from './Object.js';

class Path extends Obj {
    constructor(GL, obj) {
        super(GL, obj);

        let color = this.color;
        let paths = obj.path;
        this.verticesColors = [];
        paths.forEach((point) => {
            this.verticesColors = this.verticesColors.concat(point.concat(color));
        });
        this.verticesColors = new Float32Array(this.verticesColors);
    }

    render() {
        let gl = this.gl;
        gl.uniform1i(this.gl.uUseTexture, false);
        let mvMatrix = this.GL.camera.mvMatrix;

        // 顶点/颜色缓冲区操作
        let vertexColorBuffer = this.gl.buffers('vcBuffer');
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.verticesColors, gl.STATIC_DRAW);
        //
        let FSIZE = this.verticesColors.BYTES_PER_ELEMENT;
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
}

export default Path;