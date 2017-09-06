import WebGl from './engine/webgl.js';
import data from './data/path2.js';
// console.log(data);
import MercatorProjection from './engine/tools/mercatorPorjection.js';

var mercatorProjection = new MercatorProjection();

let app;
let heatMap;
let thumbnailCanvas;

let maxX = -Infinity;
let minX = Infinity;
let maxY = -Infinity;
let minY = Infinity;
let usePerPixel = 0;
window.onload = function () {
    app = window.app = new WebGl('canvas');
    // x
    app.Path({
        path: [
            [520, 520, 0],
            [520, 100 + 520, 0],
        ],
        color: '#f00'
    });

    // y
    app.Path({
        path: [
            [520, 520, 0],
            [100 + 520, 520, 0],
        ],
        color: '#0f0'
    });

    // z
    app.Path({
        path: [
            [520, 520, 0],
            [520, 520, 100],
        ],
        color: '#00f'
    });
    draw();
}

function getColorData() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = '255';
    canvas.height = '1';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.zIndex = '100';
    var grandient = ctx.createLinearGradient(0, 0, 255, 0);
    grandient.addColorStop(.25, "rgb(0,0,255)");
    grandient.addColorStop(0.5, "rgb(0,255,0)");
    grandient.addColorStop(0.75, "yellow");
    grandient.addColorStop(1, "rgb(250,0,0)");
    ctx.fillStyle = grandient;
    ctx.fillRect(0, 0, 255, 1);
    var colordata = ctx.getImageData(0, 0, 255, 1).data;
    return colordata;
}

function draw(data, isMct) {
    // color  data
    var colordata = getColorData();

    // otherdata 
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = '512';
    canvas.height = '512';
    canvas.style.width = '200px';
    canvas.style.height = '200px';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.zIndex = '100';
    canvas.className = 'thumbnailCanvas';
    document.body.appendChild(canvas);
    thumbnailCanvas && document.body.removeChild(thumbnailCanvas);
    thumbnailCanvas = canvas;


    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.shadowColor = 'rgba(0,0,0, 0.05)';
    ctx.shadowOffsetX = 10000;
    ctx.shadowBlur = 8;

    if (!data) {
        for (var i = 0; i < 500; i++) {
            ctx.fillRect((Math.random() * 512 | 0) - 10000, Math.random() * 512 | 0, Math.random() * 18 + 8, Math.random() * 18 + 8);
        }
    } else {
        maxX = -Infinity;
        minX = Infinity;
        maxY = -Infinity;
        minY = Infinity;
        data.forEach(item => {
            maxX = Math.max(maxX, item.x);
            minX = Math.min(minX, item.x);
            maxY = Math.max(maxY, item.y);
            minY = Math.min(minY, item.y);
        });
        console.log(maxX)
        let preX = 512 / (maxX - minX);
        let preY = 512 / (maxY - minY);
        usePerPixel = Math.min(preX, preY);
        // by graph
        let graph = {}

        let graphMax = 0;
        data.forEach(item => {
            let x = ((item.x - minX) * usePerPixel) | 0;
            let y = ((item.y - minY) * usePerPixel) | 0;
            graph[`${x}_${y}`] = graph[`${x}_${y}`] || {
                value: 0,
                x,
                y
            };
            graph[`${x}_${y}`].value++;
            graphMax = Math.max(graphMax, graph[`${x}_${y}`].value);
        });
        Object.keys(graph).forEach(key => {
            let basic = 0;
            let level = (graph[key].value - basic) < 0 ? 0 : (graph[key].value - basic) / (graphMax - basic);
            level = Math.max(0.1, level);
            ctx.fillStyle = `rgba(255,255,255,${level})`;
            ctx.beginPath();
            ctx.fillRect(graph[key].x - 10000, 512 - graph[key].y, ctx.shadowBlur, ctx.shadowBlur);
        });
    }

    // img data
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var alphaImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
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
    if (heatMap) {
        heatMap.update({
            alphaImageData,
            imgData
        })
    } else {
        heatMap = app.HeatMap({
            alphaImageData,
            imgData
        });
    }
}

// for drop
window.ondragover = (e) => {
    e.preventDefault();
}

window.ondragend = e => {
    e.preventDefault();
}

let datas = [];
window.ondrop = e => {
    e.preventDefault();
    let files = e.dataTransfer.files;

    Object.keys(files).forEach(id => {
        let read = new FileReader();
        read.onload = (e) => {
            let jsonData = JSON.parse(e.target.result).filter(item => {
                console.log(item)
                return item.x > 10 && item.y > 10
            });
            datas.push({
                name: files[id],
                datas: jsonData
            });
            updateList();
        }
        read.readAsText(files[id]);
    });
}

function updateList() {
    let ul = document.getElementById('ul');
    let newData = datas.map((data, index) => {
        return `<li data-id=${index}>${data.name.name}</li>`
    });
    ul.innerHTML = newData.join('');
}

document.getElementById('ul').onclick = e => {
    // console.log(datas[e.target.dataset.id]);
    draw(datas[e.target.dataset.id].datas, true)
}


// for draw area
let pickCanvas = document.createElement('canvas');
let pickCanvasCtx = pickCanvas.getContext('2d');
pickCanvas.style.position = 'absolute';
pickCanvas.style.top = pickCanvas.style.left = 0;
pickCanvas.width = pickCanvas.height = 512;
pickCanvas.style.width = pickCanvas.style.height = '512px';
pickCanvas.style.display = 'none';
pickCanvas.style.zIndex = '10000';
var pickPoints = [];

document.body.appendChild(pickCanvas);
document.body.onclick = e => {
    if (e.target == thumbnailCanvas) {
        thumbnailCanvas.style.width = '512px';
        thumbnailCanvas.style.height = '512px';
        pickCanvas.style.display = 'block';
        pickPoints = [];
        drawPick();
    }
}

pickCanvas.onclick = e => {
    pickPoints.push([e.offsetX, e.offsetY])
    drawPick();
}

function drawPick() {
    let ctx = pickCanvasCtx;
    if (!ctx) return false;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    pickPoints.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point[0], point[1]);
        } else {
            ctx.lineTo(point[0], point[1]);
        }
    });
    ctx.stroke();
}

window.onkeyup = e => {
    if (e.keyCode === 27 && pickPoints.length > 1) {
        let mc = [];
        for (let i = 0; i < pickPoints.length; i++) {
            mc.push(minX + pickPoints[i][0] / usePerPixel, minY + (512 - pickPoints[i][1]) / usePerPixel);
        }
        location.hash = mc.join(',');
        pickPoints = [];
        pickCanvas.style.display = 'none';
        thumbnailCanvas.style.width = '200px';
        thumbnailCanvas.style.height = '200px';
    }

}