var r = 0.0;
var g = 0.3;
var b = 1;
var width = 780;
var height = 300;

function getColorData() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = '255';
    canvas.height = '1';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.zIndex = '100';
    var grandient = ctx.createLinearGradient(0, 0, 255, 0);
    // grandient.addColorStop(.25, "rgb(0,0,255)");
    grandient.addColorStop(r, "rgb(0,255,0)");
    grandient.addColorStop(g, "yellow");
    grandient.addColorStop(b, "rgb(250,0,0)");
    ctx.fillStyle = grandient;
    ctx.fillRect(0, 0, 255, 1);
    var colordata = ctx.getImageData(0, 0, 255, 1).data;
    return colordata;
}

let colorData = getColorData();

class Chart {
    constructor() {
        console.log('xxxx');
        colorData = getColorData();
        this.width = window.width;
        this.height = window.height;
        console.log(window.width, window.height)

        this.padding = 40;
        let dom = document.getElementById('chart');
        dom.innerHTML = '';
        let canvas = document.createElement('canvas');
        canvas.style.height = `${this.height}px`;
        canvas.style.width = `${this.width}px`;
        canvas.height = this.height * 2;
        canvas.width = this.width * 2;
        this.ctx = canvas.getContext('2d');
        this.ctx.scale(2, 2)
        dom.appendChild(canvas);

        this.prepare();

        this.draw();
    }

    prepare() {
        this.yKeys = data.y;
        this.useHeight = this.height - this.padding * 2;
        this.yStep = this.useHeight / this.yKeys.length;

        this.xKeys = data.x;
        this.useWidth = this.width - this.padding * 2;
        this.xStep = this.useWidth / this.xKeys.length;

        this.max = -Infinity;
        this.min = Infinity;

        data.values.forEach((times, timeIndex) => {
            times.forEach((item, valueIndex) => {
                this.max = Math.max(item, this.max);
                this.min = Math.min(item, this.min);
            });
        });

        //
    }

    draw() {
        // line
        let ctx = this.ctx;
        ctx.font = '8px sans-serif';
        ctx.moveTo(this.padding, this.padding);
        ctx.lineTo(this.padding, this.height - this.padding);
        ctx.lineTo(this.width - this.padding, this.height - this.padding);
        ctx.strokeStyle = 'grey';
        ctx.lineWidth = 1;
        ctx.stroke();

        // y- number
        ctx.beginPath();
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        this.yKeys.forEach((item, index) => {
            let y = this.height - this.padding - (index + 1) * this.yStep;
            let x = this.padding - 5;
            ctx.fillText(item, x, y);

            ctx.moveTo(this.padding, y);
            ctx.lineTo(x - 1, y);
        });

        ctx.beginPath();
        this.yKeys.forEach((item, index) => {
            let y = this.height - this.padding - (index + 1) * this.yStep;
            ctx.moveTo(this.padding, y);
            ctx.lineTo(this.padding - 2, y);
        });
        ctx.stroke();

        // y- number
        ctx.beginPath();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        this.xKeys.forEach((item, index) => {
            let x = this.padding + (index + 1) * this.xStep;
            let y = this.height - this.padding + 5;
            ctx.fillText(item, x - this.xStep / 2, y);
            ctx.moveTo(this.padding, y);
            ctx.lineTo(x - 1, y);
        });

        ctx.beginPath();
        this.xKeys.forEach((item, index) => {
            let x = this.padding + (index + 1) * this.xStep;
            ctx.moveTo(x, this.height - this.padding);
            ctx.lineTo(x, this.height - this.padding + 3);
        });
        ctx.stroke();

        //
        data.values.forEach((times, timeIndex) => {
            times.forEach((item, valueIndex) => {
                let precent = (item - this.min) / (this.max - this.min);
                let precentIndex = Math.min(254, Math.round(precent * 255));
                // console.log(precentI)
                if (item > 0) {
                    ctx.fillStyle = `rgb(${colorData[precentIndex*4]},${colorData[precentIndex*4+1]},${colorData[precentIndex*4+2]})`
                    ctx.fillRect(
                        this.padding + valueIndex * this.xStep,
                        this.height - this.padding - timeIndex * this.yStep,
                        this.xStep - 1, -this.yStep + 1
                    );
                }
            });
        });
    }
}

new Chart();




// for drop
window.ondragover = (e) => {
    e.preventDefault();
}

window.ondragend = e => {
    e.preventDefault();
}

window.ondrop = e => {
    e.preventDefault();
    let files = e.dataTransfer.files;

    // Object.yKeys(files).forEach(id => {
    let read = new FileReader();
    read.onload = (e) => {
        data = JSON.parse(e.target.result)
        new Chart();
    }
    read.readAsText(files[0]);
    // });
}

window.onkeyup = e => {
    if (e.target.nodeName === 'INPUT') {

        window[e.target.name] = e.target.value;
        new Chart();
    }
}