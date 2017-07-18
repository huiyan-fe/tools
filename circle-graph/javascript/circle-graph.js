let weathermap = {
    '晴': 'images/d00.png',
    '多云': 'images/d01.png',
    '阴': 'images/d02.png',
    '阵雨': 'images/d03.png',
    '雷阵雨': 'images/d04.png',
    '雨夹雪': 'images/d06.png',
    '小雨': 'images/d07.png',
    '中雨': 'images/d08.png',
    '大雨': 'images/d09.png',
    '暴雨': 'images/d10.png',
    '阵雪': 'images/d14.png',
    '小雪': 'images/d15.png',
    '中雪': 'images/d15.png',
    '大雪': 'images/d16.png',
    '浮尘': 'images/d19.png',
    '小到中雨': 'images/d21.png',
    '中到大雨': 'images/d22.png',
    '大到暴雨': 'images/d23.png',
    '霾': 'images/d55.png',
    '雨': 'images/d301.png',
}

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
        this.prepareData();

        // draw


        this.drawLegend();
        this.drawBar();
        this.drawTitle();

        this.drawCurve();
        this.drawHeatCurve();

        this.drawIcons();

        this.bindEvent();
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
        //
        ctx.restore();
    }

    prepareData() {
        let barData = this.option.data[0];
        if (!barData) {
            return false;
        }

        let maxValue = -Infinity;
        let minValue = Infinity;
        barData.forEach(item => {
            maxValue = Math.max(maxValue, item);
            minValue = Math.min(minValue, item);
        });
        this.data = {
            hotMax: text.val1Max || maxValue,
            hotMin: text.val1Min || minValue
        }
    }

    drawTitle() {
        this.ctx.font = '16px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.option.title || '', this.width / 2, this.height / 2);
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
            this.ctx.font = '18px sans-serif';
            this.ctx.fillStyle = '#999';
            this.ctx.fillText(`${hour}:00`, 0, -raduis - 10);

            this.ctx.lineWidth = 4;
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.moveTo(0, -raduis + 5);
            this.ctx.lineTo(0, -raduis - 5);
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
        let barDataStratRadius = 50;
        let barDataEndRadius = ((this.borderWidth - 100) / 2 - 20) * .6;
        let barDataRadiusDelta = barDataEndRadius - barDataStratRadius;
        let maxValue = -Infinity;
        let minValue = Infinity;
        let delatValue = 0;

        barData.forEach(item => {
            maxValue = Math.max(maxValue, item);
            minValue = Math.min(minValue, item);
        });
        maxValue = text.val1Max;
        minValue = text.val1Min;
        delatValue = maxValue - minValue;


        // bars
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillStyle = 'rgba(0,0,0,0.2)';
        this.ctx.textAlign = 'cetner';
        this.ctx.textBaseline = 'top';

        let index = 1;
        let perWidth = barDataEndRadius / delatValue;
        this.ctx.setLineDash([5, 5]);
        this.ctx.textAlign = 'center';
        while (index < maxValue) {
            let indexRedius = index * perWidth;
            // console.log(indexRedius, barDataEndRadius)
            this.ctx.beginPath();
            this.ctx.moveTo(this.width / 2 + indexRedius, this.height / 2);
            this.ctx.fillText(index.toFixed(1), this.width / 2, this.height / 2 - indexRedius);
            this.ctx.arc(this.width / 2, this.height / 2, indexRedius, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.closePath();
            index++;
        }
        //
        this.ctx.beginPath();
        this.ctx.setLineDash([0, 0]);
        this.ctx.strokeStyle = 'rgba(0, 0, 0, .6)';
        this.ctx.moveTo(this.width / 2 + barDataEndRadius, this.height / 2);
        this.ctx.fillStyle = 'rgba(0,0,0,0.6)';
        this.ctx.fillText(maxValue.toFixed(1), this.width / 2, this.height / 2 - barDataEndRadius);
        this.ctx.arc(this.width / 2, this.height / 2, barDataEndRadius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.restore();

        // bar chart
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


        // clear the center
        this.ctx.save();
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'red';
        this.ctx.beginPath();
        this.ctx.arc(this.width / 2, this.height / 2, barDataStratRadius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }

    drawCurve(obj) {
        // return false;
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
        maxValue = text.val2Max;
        minValue = text.val2Min;
        delatValue = maxValue - minValue;

        this.ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        this.ctx.beginPath();
        this.ctx.arc(this.width / 2, this.height / 2, curveDataEndRadius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2);
        let rotate = 0;
        let rotateOffset = (1 / curveData.length) * Math.PI * 2;
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#000';

        let startPoint;
        let topTemp = null;
        let topMax = { value: -Infinity };
        let topMin = { value: Infinity };

        curveData.forEach((item, index) => {
            let present = (item - minValue) / delatValue;
            let top = curveDataStratRadius + 5 + (curveDataRadiusDelta - 10) * present;

            if (Number(item) > topMax.value) {
                topMax.value = item;
                topMax.index = index;
                topMax.top = top;
            }

            if (Number(item) < topMin.value) {
                topMin.value = item;
                topMin.index = index;
                topMin.top = top;
            }

            if (index === 0) {
                startPoint = [0, -top];
                this.ctx.moveTo(0, -top)
            } else {
                this.ctx.quadraticCurveTo(0, -top, 0, -top);
            }
            this.ctx.rotate(rotateOffset);
        });
        this.ctx.lineTo(0, startPoint[1]);
        this.ctx.stroke();
        this.ctx.restore();


        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(rotateOffset * topMax.index);
        this.ctx.textBaseline = 'bottom';
        this.ctx.font = '16px sans-serif';
        this.ctx.fillText(Number(topMax.value).toFixed(2), 0, -topMax.top);
        this.ctx.restore();

        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(rotateOffset * topMin.index);
        this.ctx.textBaseline = 'top';
        this.ctx.font = '16px sans-serif';
        this.ctx.fillText(Number(topMin.value).toFixed(2), 0, -topMin.top);
        this.ctx.restore();

        this.ctx.save();
        this.ctx.strokeStyle = '#666';
        this.ctx.moveTo(this.width - 200, this.height - 170 + 20);
        this.ctx.lineTo(this.width - 180, this.height - 180 + 20);
        this.ctx.lineTo(this.width - 160, this.height - 174 + 20);
        this.ctx.lineTo(this.width - 140, this.height - 180 + 20);
        this.ctx.lineTo(this.width - 120, this.height - 175 + 20);
        this.ctx.lineTo(this.width - 100, this.height - 171 + 20);
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
        maxValue = text.val3Max;
        minValue = text.val3Min;
        delatValue = maxValue - minValue;

        // for the color 
        this.ctx.globalAlpha = 1;
        this.ctx.beginPath();
        this.ctx.translate(this.width / 2, this.height / 2);
        let gradient = this.ctx.createRadialGradient(0, 0, curveDataStratRadius, 0, 0, curveDataEndRadius);
        gradient.addColorStop(0.9, "#F00");
        gradient.addColorStop(0, "#FFFC00");
        this.ctx.arc(0, 0, curveDataEndRadius, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        // for legent
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

        let topMax = { value: -Infinity };
        let topMin = { value: Infinity };

        heatCurveData.forEach((item, index) => {
            let present = (item - minValue) / delatValue;
            let top = curveDataStratRadius + 5 + (curveDataRadiusDelta - 10) * present;

            if (Number(item) > topMax.value) {
                topMax.value = item;
                topMax.index = index;
                topMax.top = top;
            }

            if (Number(item) < topMin.value) {
                topMin.value = item;
                topMin.index = index;
                topMin.top = top;
            }

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
        this.ctx.save();
        let index = 1;
        let perWidth = curveDataRadiusDelta / delatValue;
        this.ctx.font = '10px sans-serif';

        this.ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        this.ctx.fillStyle = 'rgba(0,0,0,0.2)';
        this.ctx.setLineDash([5, 5]);
        while (index < maxValue) {
            let present = (index - minValue) / delatValue;
            let top = curveDataStratRadius + 5 + (curveDataRadiusDelta - 10) * present;

            //
            this.ctx.beginPath();
            this.ctx.moveTo(this.width / 2 + top, this.height / 2);
            this.ctx.fillText(index.toFixed(1), this.width / 2, this.height / 2 - top);
            this.ctx.arc(this.width / 2, this.height / 2, top, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.closePath();
            index++;
        }
        this.ctx.fillStyle = 'rgba(0,0,0,.6)';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(maxValue.toFixed(1), this.width / 2, this.height / 2 - curveDataEndRadius);
        this.ctx.restore();
        //

        //
        let oldImg = new Image();
        oldImg.src = img;
        oldImg.onload = () => {
            this.ctx.drawImage(oldImg, 0, 0, parseInt(this.canvas.style.width, 10), parseInt(this.canvas.style.height, 10))
        }
        this.ctx.closePath();
        this.ctx.restore();

        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(rotateOffset * topMax.index);
        this.ctx.fillStyle = 'red';
        this.ctx.font = '16px sans-serif';
        this.ctx.textBaseline = 'bottom';
        this.ctx.fillText(Number(topMax.value).toFixed(2), 0, -topMax.top);
        this.ctx.restore();

        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(rotateOffset * topMin.index);
        this.ctx.fillStyle = '#c3c124';
        this.ctx.font = '16px sans-serif';
        this.ctx.textBaseline = 'top';
        this.ctx.fillText(Number(topMin.value).toFixed(2), 0, -topMin.top);
        this.ctx.restore();

        // for legent 
        gradient = this.ctx.createLinearGradient(this.width - 200, this.height - 200, this.width - 100, this.height - 180);
        gradient.addColorStop(0, "#F00");
        gradient.addColorStop(0.9, "#FFFC00");
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(this.width - 200, this.height - 200, 100, 20);
        return imgUrl;
    }

    drawIcons() {

        let icons = this.option.weather;
        let raduis = (this.borderWidth - 100) / 2;
        icons.forEach((icon, index) => {
            let img = new Image();
            let src = weathermap[icon];
            if (index < 6 || index > 17) {
                src = src.replace('d', 'n')
            }
            img.src = src;
            img.onload = () => {
                this.ctx.save();
                this.ctx.translate(this.width / 2, this.height / 2);
                this.ctx.rotate((index / 24) * Math.PI * 2)
                this.ctx.drawImage(img, -18, -raduis + 15, 30, 30)
                this.ctx.restore();
            }
        });
    }

    bindEvent() {
        this.ctx.canvas.onmousemove = (e) => {
            let width = document.documentElement.clientWidth;
            let height = document.documentElement.clientHeight;
            let centerX = width / 2;
            let centerY = height / 2;
            let mouseD = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
            let arc = Math.acos((e.clientY - centerY) / mouseD);
            if (e.clientX > centerX) {
                arc = Math.PI - arc;
            }
            let precent = 0;
            if (e.clientX > centerX) {
                precent = 0.5 * arc / Math.PI
            } else {
                precent = (1 - (Math.PI - arc) / Math.PI) * .5 + .5;
            }

            let data0 = datas.data[0];
            let data0Value = data0[Math.round(data0.length * precent)];
            let data1 = datas.data[1];
            let data1Value = data1[Math.round(data0.length * precent)];
            let data2 = datas.data[2];
            let data2Value = data2[Math.round(data0.length * precent)];

            this.ctx.clearRect(0, this.height, 400, -20);
            this.ctx.textBaseline = 'bottom';
            this.ctx.textAlign = 'left';
            this.ctx.font = '10px sans-serif';
            this.ctx.fillText(`v1: ${data0Value} , v2: ${data1Value} , v3: ${data2Value}`, 10, this.height);
            // console.log(data0Value, data1Value, data2Value);

            // console.log(arc, );
            // console.log((Math.PI - arc) / (Math.PI));

            // let arc = Math.
            // console.log(e.clientX, e.clientY, window.body.offsetWidth)
        }
    }
}