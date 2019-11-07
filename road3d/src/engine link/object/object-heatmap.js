import Obj from './Object.js';

class Heatmap extends Obj {

    constructor(GL, obj) {
        super(GL, obj);
        this.GL = GL;
        this.obj = obj;

        let color = this.color;
        let paths = obj.path;
        this.verticesColors = [];
        this.indices = [];
        this.texture_coords = [];
        // this.verticesColors.concat(point.concat(color));

        const drawWidth = 1000;
        const drawHeight = 1000;
        const offsetX = 10;
        const offsetY = 10;


        let xIndex = 0;
        let yIndex = 0;
        while (yIndex <= drawWidth) {
            while (xIndex <= drawHeight) {
                let xPresent = xIndex / drawWidth;
                let yPresent = yIndex / drawHeight;
                let xImg = Math.round(obj.alphaImageData.width * xPresent);
                let yImg = Math.round(obj.alphaImageData.height * yPresent);
                xImg = Math.min(obj.alphaImageData.width - 1, xImg);
                yImg = Math.min(obj.alphaImageData.height - 1, yImg);
                let imgDataIndex = (xImg + yImg * obj.alphaImageData.width) * 4;

                let xPixel = xIndex - drawWidth / 2;
                let yPixel = drawHeight / 2 - yIndex;
                //
                let r = obj.imgData.data[imgDataIndex] / 255;
                let g = obj.imgData.data[imgDataIndex + 1] / 255;
                let b = obj.imgData.data[imgDataIndex + 2] / 255;
                if (obj.alphaImageData.data[imgDataIndex + 3] === 0) {
                    r = g = b = 0.1;
                }
                this.verticesColors.push(
                    xPixel, yPixel, obj.alphaImageData.data[imgDataIndex + 3] * 3,
                    r, g, b, 0
                );
                xIndex += offsetX;
            }
            xIndex = 0;
            yIndex += offsetY;
        }

        const xPointsLength = Math.round(drawWidth / offsetX) + 1;
        const yPointsLength = Math.round(drawHeight / offsetY) + 1;

        //
        xIndex = 0;
        yIndex = 1;
        while (yIndex < yPointsLength) {
            while (xIndex < xPointsLength) {
                if (xIndex === 0) {
                    this.indices.push((yIndex - 1) * xPointsLength + xIndex);
                }
                this.indices.push((yIndex - 1) * xPointsLength + xIndex, yIndex * xPointsLength + xIndex);
                if (xIndex === xPointsLength - 1) {
                    this.indices.push(yIndex * xPointsLength + xIndex);
                }
                xIndex += 1;
            }
            xIndex = 0;
            yIndex += 1;
        }

        this.indices = new Uint16Array(this.indices);
        this.verticesColors = new Float32Array(this.verticesColors);
    }

    update(obj) {
        this.constructor(this.GL, obj)
    }

    render() {
        let gl = this.gl;
        let mvMatrix = this.GL.camera.mvMatrix;

        // 顶点/颜色缓冲区操作
        let vertexColorBuffer = this.gl.buffers('vcBuffer');
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.verticesColors, gl.STATIC_DRAW);
        let FSIZE = this.verticesColors.BYTES_PER_ELEMENT;
        gl.vertexAttribPointer(gl.aPosition, 3, gl.FLOAT, false, FSIZE * 7, 0);
        gl.enableVertexAttribArray(gl.aPosition);
        gl.vertexAttribPointer(gl.aColor, 3, gl.FLOAT, false, FSIZE * 7, FSIZE * 3);
        gl.enableVertexAttribArray(gl.aColor);
        vertexColorBuffer = null;
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);

        // 顶点索引
        let indexBuffer = this.gl.buffers('indexBuffer');
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);


        // set mv
        this.updateOpearte();
        //

        gl.uniformMatrix4fv(this.gl.uMVMatrix, false, this.opearteBuild.result);
        gl.drawElements(gl.TRIANGLE_STRIP, this.indices.length, gl.UNSIGNED_SHORT, 0);
    }
}

export default Heatmap;