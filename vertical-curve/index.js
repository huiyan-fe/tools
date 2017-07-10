class Chart {
    constructor(dom, data) {
        let width = this.width = 1000;
        let height = this.height = 600;
        let paddig = this.padding = [20, 20, 80, 20];
        let canvas = document.createElement('canvas');
        let ctx = this.ctx = canvas.getContext('2d');
        this.data = data.filter((item, index) => index < 10);
        canvas.width = width * 2;
        canvas.height = height * 2;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.scale(2, 2);
        dom.appendChild(canvas);


        this.gradientColor = {
            '0': '#88c059',
            '0.1': '#84c150',
            '0.2': '#fee99d',
            '0.3': '#fca55d',
            '0.4': '#e34a33',
            '0.5': '#a50026'
        }
        let gradient = this.gradient = ctx.createLinearGradient(0, 0, 100, 0);
        Object.keys(this.gradientColor).forEach(item => {
            gradient.addColorStop(item, this.gradientColor[item]);
        });
        this.drawCoordinate();
        this.drawCurve();
        this.drawRange();
    }

    drawCoordinate() {
        this.xStep = (this.width - this.padding[1] - this.padding[3]) / this.data.length;

        let ctx = this.ctx;

        ctx.save();

        ctx.translate((this.width - 100) / 2, 0);
        ctx.fillStyle = this.gradient;
        ctx.fillRect(this.padding[3], this.height - 20, 100, 20);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#999';
        ctx.fillText('1.0', this.padding[3], this.height - 28);
        ctx.fillText('3.0', this.padding[3] + 100, this.height - 28);
        ctx.restore();


        ctx.strokeStyle = 'grey';
        ctx.moveTo(this.padding[3], this.padding[0]);
        ctx.lineTo(this.padding[3], this.height - this.padding[2]);
        ctx.lineTo(this.width - this.padding[1], this.height - this.padding[2]);
        ctx.stroke();

        //
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        this.max = -Infinity;
        this.min = Infinity;
        this.maxCount = 0;
        this.data.forEach((item, index) => {
            //
            this.maxCount = Math.max(this.maxCount, item.data.length);
            item.data.forEach(d => {
                this.max = Math.max(this.max, d);
                this.min = Math.min(this.min, d);
            });

            ctx.fillText(item.title,
                this.padding[3] + (index + 1) * this.xStep - this.xStep / 2,
                this.height - this.padding[2] + 5);
            // console.log(this.xStep, this.padding[3] + (index + 1) * this.xStep)

            ctx.save();
            ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            ctx.beginPath();
            ctx.moveTo(this.padding[3] + (index + 1) * this.xStep, this.height - this.padding[2]);
            ctx.lineTo(this.padding[3] + (index + 1) * this.xStep, this.padding[0]);
            ctx.stroke();
            ctx.restore();
        });
        this.min = 1;
        this.max = 3;
        this.yStep = (this.height - this.padding[0] - this.padding[2]) / this.maxCount;
    }

    drawCurve() {
        // console.log(this.max, this.min)
        let ctx = this.ctx;

        this.data.forEach((item, index) => {
            ctx.beginPath();
            let baseX = this.padding[3] + (index + 1) * this.xStep;
            let firstX = 0;
            let firstY = 0;
            let lastX = 0;
            let lastY = 0;
            item.data.forEach((d, i) => {
                let x = this.xStep * ((d - this.min) / (this.max - this.min));
                x = baseX - x;

                let y = this.height - this.padding[2] - i * this.yStep;
                if (i === 0) {
                    firstX = x;
                    firstY = y;
                    ctx.moveTo(x, y);
                } else {
                    // ctx.lineTo(x, y);
                    ctx.quadraticCurveTo(lastX, lastY, x, y);
                    if (i === item.data.length - 1) {
                        ctx.save();

                        let gradient = ctx.createLinearGradient(baseX, 0, baseX - this.xStep, 0);
                        Object.keys(this.gradientColor).forEach(item => {
                            gradient.addColorStop(item, this.gradientColor[item]);
                        });

                        ctx.fillStyle = gradient;
                        ctx.lineTo(baseX, y);
                        ctx.lineTo(baseX, this.height - this.padding[2]);
                        ctx.lineTo(firstX, firstY);
                        ctx.fill();
                        // ctx.stroke();
                        ctx.restore();
                    }
                }

                lastX = x;
                lastY = y;
            });
        });

    }

    drawRange() {
        let ctx = this.ctx;

        ctx.fillStyle = 'rgba(255, 0, 0, .2)';
        ctx.strokeStyle = 'rgba(255, 0, 0, .1)';
        this.data.forEach((item, index) => {
            if (item.range) {
                let range = item.range;
                let x = this.padding[3] + (index + 1) * this.xStep;
                range.forEach(r => {
                    let ranges = r.split(',').map(r => {
                        return parseInt(r.replace(/\d{2}$/, '') * 60) + parseInt(r.slice(-2));
                    });
                    ctx.beginPath();
                    let height = Math.abs(ranges[0] - ranges[1]) * this.yStep;
                    let width = this.xStep - 1;
                    let y = this.height - this.padding[2] - Math.min(ranges[0], ranges[1]) * this.yStep;
                    ctx.rect(x, y, -width, -height);
                    ctx.fill();
                    ctx.stroke();
                });

            }
        })

    }
}