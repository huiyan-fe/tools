let mercator = new MercatorProjection();

class Chart {
    constructor(dom, data) {
        let width = this.width = 800;
        let height = this.height = 400;
        let paddig = this.padding = [20, 20, 80, 20];
        let canvas = document.createElement('canvas');
        let ctx = this.ctx = canvas.getContext('2d');
        this.data = data;
        canvas.width = width * 2;
        canvas.height = height * 2;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(2, 2);
        dom.appendChild(canvas);

        this.formatData();
        this.drawCoordinate();
        this.drawHeat();
    }

    formatData() {
        this.dist = [];
        this.distTotal = 0;
        this.data.paths.forEach((item, index) => {
            if (index % 2 === 1 && index > 0) {
                let startPoint = mercator.lngLatToPoint({
                    lng: this.data.paths[index - 1][0],
                    lat: this.data.paths[index - 1][1]
                });

                let endPoint = mercator.lngLatToPoint({
                    lng: item[0],
                    lat: item[1]
                });

                let d = Math.sqrt((startPoint.x - endPoint.x) ** 2 + (startPoint.y - endPoint.y) ** 2);
                this.distTotal += d;
                this.dist.push(this.distTotal);
            }
        });
        this.timeMax = 0;
        this.valueMax = text.max;
        this.valueMin = text.min;
        this.data.hotData.forEach(item => {
            this.timeMax = Math.max(this.timeMax, item[1]);
            // this.valueMax = Math.max(this.valueMax, item[2]);
            // this.valueMin = Math.min(this.valueMin, item[2]);
        });
    }

    drawCoordinate() {
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(this.padding[3], this.padding[0]);
        ctx.lineTo(this.padding[3], this.height - this.padding[2]);
        ctx.lineTo(this.width - this.padding[1], this.height - this.padding[2]);
        ctx.stroke();
    }

    drawHeat() {
        // console.log(this.data.hotData);
        // console.log(this.dist);
        // console.log(this.timeMax);
        let ctx = this.ctx;
        this.xStep = (this.width - this.padding[1] - this.padding[3]) / this.timeMax;
        this.yStep = (this.height - this.padding[0] - this.padding[2]) / this.dist[this.dist.length - 1];

        ctx.beginPath();
        ctx.shadowOffsetX = 4000;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 2;
        ctx.shadowColor = 'rgba(0,0,0,1)';

        this.data.hotData.forEach((item, index) => {
            let x = this.padding[3] + this.xStep * item[1] - ctx.shadowOffsetX / 2;
            let y = this.height - this.padding[2] - this.yStep * this.dist[item[0]];
            this.itemWidth = this.xStep;
            this.itemHeight = (this.dist[item[0]] - (this.dist[item[0] - 1] || 0)) * this.yStep;
            ctx.fillStyle = `rgba(0, 0, 0, ${0.10 * ((this.valueMax-item[2])/(this.valueMax-this.valueMin))})`;
            ctx.fillRect(x, y, this.itemWidth, this.itemHeight);
        });
        ctx.closePath();

        // return false;


        let imgData = ctx.getImageData(
            this.padding[3] * 2,
            this.padding[0] * 2,
            ctx.canvas.width - (this.padding[1] + this.padding[3]) * 2,
            ctx.canvas.height - (this.padding[0] + this.padding[2]) * 2
        );
        let canvasData = imgData.data;
        let colordata = getColorData();
        for (var i = 0; i < canvasData.length; i += 4) {
            var index = Math.min(254, canvasData[i + 3] * 10);
            canvasData[i] = colordata[index * 4];
            canvasData[i + 1] = colordata[index * 4 + 1];
            canvasData[i + 2] = colordata[index * 4 + 2];
            canvasData[i + 3] = colordata[index * 4 + 3];
        }
        ctx.putImageData(
            imgData,
            this.padding[3] * 2,
            this.padding[0] * 2
        );

    }

}

function getColorData() {
    //get color data
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = '255';
    canvas.height = '1';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.zIndex = '100';
    var grandient = ctx.createLinearGradient(0, 0, 255, 0);
    // grandient.addColorStop(.25, "rgb(0,0,255)");
    grandient.addColorStop(0.2, "#87cefa");
    grandient.addColorStop(0.4, "#ebf629");
    grandient.addColorStop(0.6, "#ffd300");
    grandient.addColorStop(0.8, "#ff8c00");
    grandient.addColorStop(1.0, "#ff4500");
    ctx.fillStyle = grandient;
    ctx.fillRect(0, 0, 255, 1);
    var colordata = ctx.getImageData(0, 0, 255, 1).data;
    return colordata;
    //
}
