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
        this.drawLegend();
        this.drawBar();
    }

    system() {
        // get the color legend;
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
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
    }

    drawLegend() {
        let raduis = (this.borderWidth - 100) / 2;
        this.ctx.save();
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
        let barDataEndRadius = ((this.borderWidth - 100) / 2 - 20) * .6 + 20;
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
}