import WebGl from './engine/webgl.js';
import data from './data/path2.js';
// console.log(data);
import MercatorProjection from './engine/tools/mercatorPorjection.js';

var mercatorProjection = new MercatorProjection();

let app;
let heatMap;
window.onload = function () {
    app = window.app = new WebGl('canvas');
    draw();
}

function draw(data, isMct) {
    // color  data
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
    document.body.appendChild(canvas);

    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.shadowColor = 'rgba(0,0,0, 0.05)';
    ctx.shadowOffsetX = 10000;
    ctx.shadowBlur = 8;

    if (!data) {
        for (var i = 0; i < 100; i++) {
            ctx.fillRect((Math.random() * 512 | 0) - 2248, Math.random() * 512 | 0, Math.random() * 100 + 100, Math.random() * 100 + 100);
        }
    } else {
        let maxX = -Infinity;
        let minX = Infinity;
        let maxY = -Infinity;
        let minY = Infinity;
        data.forEach(item => {
            maxX = Math.max(maxX, item.x);
            minX = Math.min(minX, item.x);
            maxY = Math.max(maxY, item.y);
            minY = Math.min(minY, item.y);
        });
        let preX = 512 / (maxX - minX);
        let preY = 512 / (maxY - minY);
        let usePerPixel = Math.min(preX, preY);
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
            // (item.x - minX) * usePerPixel - 2248, (item.y - minY) * usePerPixel
            // console.log((item.x - minX) * usePerPixel)
            // ctx.fillRect((item.x - minX) * usePerPixel - 2248, (item.y - minY) * usePerPixel, 100, 100);
        });
        Object.keys(graph).forEach(key => {
            let basic = 0;
            let level = (graph[key].value - basic) < 0 ? 0 : (graph[key].value - basic) / (graphMax - basic);
            level = Math.max(0.1, level)
            // let level = (graph[key].value) / (graphMax);
            // console.log(level)
            ctx.fillStyle = `rgba(255,255,255,${level})`;
            ctx.beginPath();
            ctx.fillRect(graph[key].x - 10000, graph[key].y, ctx.shadowBlur, ctx.shadowBlur);
        })
        console.log(graph, graphMax);
        // console.log(maxX, minX, maxY, minY, usePerPixel)
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