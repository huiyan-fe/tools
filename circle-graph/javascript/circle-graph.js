class circleGraph {
    constructor(dom, option) {
        this.dom = dom;
        this.option = option;
        let domStyle = getComputedStyle(dom);
        this.width = parseInt(domStyle.width, 10);
        this.height = parseInt(domStyle.height, 10);
        this.borderWidth = Math.min(this.width, this.height);

        let ratio = devicePixelRatio || 1;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width * ratio;
        this.canvas.height = this.height * ratio;
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(ratio, ratio);
        this.dom.appendChild(this.canvas);

        // config
        this.system();
        // draw
        let heatImg = this.drawHeatCurve();
        this.drawLegend();
        this.drawBar();
        this.drawCurve();

        this.drawIcons();

    }

    system() {
        // get the color legend;
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        ctx.save();
        canvas.width = 100;
        canvas.height = 1;
        let gradient = ctx.createLinearGradient(0, 0, 100, 1);
        gradient.addColorStop(1, "#F00");
        gradient.addColorStop(0.6, "#FFFC00");
        gradient.addColorStop(0.3, "#00FF1D");
        gradient.addColorStop(0, "#000BFF");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 100, 1);
        this.colorRangeData = ctx.getImageData(0, 0, 100, 1).data;
        ctx.restore();
    }

    drawLegend() {
        let raduis = (this.borderWidth - 100) / 2;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.width / 2, this.height / 2, raduis, 0, Math.PI * 2);
        this.ctx.strokeStyle = '#5b9f9d';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        // draw scale
        this.ctx.textAlign = 'center';
        let hour = 0;
        while (hour < 24) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.lineWidth = 1;
            this.ctx.translate(this.width / 2, this.height / 2);
            this.ctx.rotate((hour / 24) * Math.PI * 2);
            this.ctx.font = '12px sans-serif';
            this.ctx.fillStyle = '#999';
            this.ctx.fillText(`${hour}:00`, 0, -raduis - 10);

            this.ctx.lineWidth = 4;
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.moveTo(0, -raduis + 10);
            this.ctx.lineTo(0, -raduis - 10);
            this.ctx.stroke();

            this.ctx.restore();
            hour++;
        }
        this.ctx.restore();
    }

    drawBar() {
        let barData = this.option.data[0];
        if (!barData) {
            return false;
        }
        let barDataStratRadius = 20;
        let barDataEndRadius = ((this.borderWidth - 100) / 2 - 20) * .6;
        let barDataRadiusDelta = barDataEndRadius - barDataStratRadius;
        let maxValue = -Infinity;
        let minValue = Infinity;
        let delatValue = 0;

        barData.forEach(item => {
            maxValue = Math.max(maxValue, item);
            minValue = Math.min(minValue, item);
        });
        delatValue = maxValue - minValue;

        // bars
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        this.ctx.save();
        this.ctx.arc(this.width / 2, this.height / 2, barDataStratRadius, 0, Math.PI * 2);
        this.ctx.moveTo(this.width / 2 + barDataEndRadius, this.height / 2);
        this.ctx.arc(this.width / 2, this.height / 2, barDataEndRadius, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2);
        let rotate = 0;
        let rotateOffset = (1 / barData.length) * Math.PI * 2;
        barData.forEach((item, index) => {
            let present = (item - minValue) / delatValue;
            let presentInt = parseInt(present * 100, 10);
            let top = present * barDataRadiusDelta + barDataStratRadius;
            //
            presentInt = Math.min(presentInt, 99);
            this.ctx.fillStyle = `rgb(${this.colorRangeData[presentInt * 4]},${this.colorRangeData[presentInt * 4 + 1]},${this.colorRangeData[presentInt * 4 + 2]})`;
            this.ctx.rotate(rotateOffset);
            this.ctx.fillRect(0, 0, 2, -top);
        });
        this.ctx.restore();

        // center
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(this.width / 2, this.height / 2, barDataStratRadius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        //
        console.log(barData);
    }

    drawCurve(obj) {
        let curveData = this.option.data[1];
        if (!curveData) {
            return false;
        }

        let curveDataStratRadius = ((this.borderWidth - 100) / 2 - 20) * .62;
        let curveDataEndRadius = ((this.borderWidth - 100) / 2 - 20) * .9;
        let curveDataRadiusDelta = curveDataEndRadius - curveDataStratRadius;
        let maxValue = -Infinity;
        let minValue = Infinity;
        let delatValue = 0;

        curveData.forEach(item => {
            maxValue = Math.max(maxValue, item);
            minValue = Math.min(minValue, item);
        });
        delatValue = maxValue - minValue;


        this.ctx.beginPath();
        this.ctx.arc(this.width / 2, this.height / 2, curveDataEndRadius, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2);
        let rotate = 0;
        let rotateOffset = (1 / curveData.length) * Math.PI * 2;
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#000';
        let startPoint;
        let topTemp = null;
        curveData.forEach((item, index) => {
            let present = (item - minValue) / delatValue;
            let top = curveDataStratRadius + 5 + (curveDataRadiusDelta - 10) * present;
            if (index === 0) {
                startPoint = [0, -top];
                this.ctx.moveTo(0, -top)
            } else {
                this.ctx.quadraticCurveTo(0, -top, 0, -top);
            }
            this.ctx.rotate(rotateOffset);
        });
        this.ctx.lineTo(0, startPoint[1])
        this.ctx.stroke();

        this.ctx.restore();
    }

    drawHeatCurve() {
        let heatCurveData = this.option.data[2];
        if (!heatCurveData) {
            return false;
        }
        let img = this.canvas.toDataURL();
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width)

        let maxValue = -Infinity;
        let minValue = Infinity;
        let delatValue = 0;

        let curveDataStratRadius = ((this.borderWidth - 100) / 2 - 20) * .62;
        let curveDataEndRadius = ((this.borderWidth - 100) / 2 - 20) * .9;
        let curveDataRadiusDelta = curveDataEndRadius - curveDataStratRadius;

        heatCurveData.forEach(item => {
            maxValue = Math.max(maxValue, item);
            minValue = Math.min(minValue, item);
        });
        delatValue = maxValue - minValue;

        // for the color 
        this.ctx.globalAlpha = 1;
        this.ctx.beginPath();
        this.ctx.translate(this.width / 2, this.height / 2);
        let gradient = this.ctx.createRadialGradient(0, 0, curveDataStratRadius, 0, 0, curveDataEndRadius);
        gradient.addColorStop(0.9, "#F00");
        gradient.addColorStop(0, "#FFFC00");
        // gradient.addColorStop(0, "#00FF1D");
        // gradient.addColorStop(0, "#000BFF");
        this.ctx.arc(0, 0, curveDataEndRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        //
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.beginPath();
        this.ctx.fillStyle = 'white';
        this.ctx.arc(0, 0, curveDataStratRadius, 0, Math.PI * 2);
        this.ctx.fill();
        //

        this.ctx.globalCompositeOperation = 'destination-in';
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#000';
        let rotateOffset = (1 / heatCurveData.length) * Math.PI * 2;
        let startPoint;
        let topTemp = null;
        heatCurveData.forEach((item, index) => {
            let present = (item - minValue) / delatValue;
            let top = curveDataStratRadius + 5 + (curveDataRadiusDelta - 10) * present;
            if (index === 0) {
                startPoint = [0, -top];
                this.ctx.moveTo(0, -top)
            } else {
                this.ctx.quadraticCurveTo(0, -top, 0, -top);
            }
            this.ctx.rotate(rotateOffset);
        });
        this.ctx.lineTo(0, startPoint[1])
        this.ctx.fillStyle = 'white';
        this.ctx.fill();
        this.ctx.restore();
        let imgUrl = this.canvas.toDataURL();

        //
        let oldImg = new Image();
        oldImg.src = img;
        oldImg.onload = () => {
            this.ctx.drawImage(oldImg, 0, 0, parseInt(this.canvas.style.width, 10), parseInt(this.canvas.style.height, 10))
        }
        this.ctx.closePath();
        this.ctx.restore();
        return imgUrl;
    }

    drawIcons() {
        let icons = ['images/moon.png', 'images/weather.png', 'images/sun.png', 'images/weather2.png'];
        let raduis = (this.borderWidth - 100) / 2;
        icons.forEach((icon, index) => {
            let img = new Image();
            img.src = icon;
            img.onload = () => {
                this.ctx.save();
                this.ctx.translate(this.width / 2, this.height / 2);
                this.ctx.rotate((index / 4) * Math.PI * 2)
                this.ctx.drawImage(img, -18, -raduis + 15)
                this.ctx.restore();
            }
        });
    }
}