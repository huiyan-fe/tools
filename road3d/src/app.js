import WebGl from './engine/webgl.js';
import data from './data/path.js';
import hotData from './data/hot.js';
import MercatorProjection from './engine/tools/mercatorPorjection.js';

console.log(data)
console.log(hotData)

function drawBelt(id, data, hotData) {
    var mercatorProjection = new MercatorProjection();
    let app = window.app = new WebGl(id);

    // x
    app.Path({
        path: [
            [0, 0, 0],
            [0, 100, 0],
        ],
        color: '#f00'
    });

    // y
    app.Path({
        path: [
            [0, 0, 0],
            [100, 0, 0],
        ],
        color: '#0f0'
    });

    // z
    app.Path({
        path: [
            [0, 0, 0],
            [0, 0, 100],
        ],
        color: '#00f'
    });

    // prepare data
    var maxWidth = 1000;
    var min = [Infinity, Infinity];
    var max = [-Infinity, -Infinity];
    data.paths = data.paths.map(point => {
        let newPoint = mercatorProjection.lngLatToMercator({
            lng: point[0],
            lat: point[1]
        });

        min[0] = Math.min(min[0], newPoint.lng);
        min[1] = Math.min(min[1], newPoint.lat);
        max[0] = Math.max(max[0], newPoint.lng);
        max[1] = Math.max(max[1], newPoint.lat);

        return [newPoint.lng, newPoint.lat, 0];
    });
    var mid = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2];
    var delta = [max[0] - min[0], max[1] - min[1]];
    var deltaMax = Math.max(delta[0], delta[1]);

    var scale = maxWidth / deltaMax;
    var newPath = data.paths.map(point => {
        return [(point[0] - mid[0]) * scale, (point[1] - mid[1]) * scale, 0];
    });
    // parpeat hot data 
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

    //
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = '2048';
    canvas.height = '1024';
    canvas.style.width = '200px';
    canvas.style.height = '100px';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.zIndex = '100';
    document.body.appendChild(canvas);

    ctx.fillStyle = 'rgba(255,0,0,0.01)';
    var preWidth = 1024 / 192;
    var preHeight = 2048 / 261;
    hotData.forEach((data) => {
        for (var i = 0; i < data[2]; i++) {
            ctx.fillRect(data[0] * preWidth, data[1] * preHeight, preWidth, preHeight)
        }
    });
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
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
    app.Belt({
        path: newPath,
        height: 100,
        texture: canvas
    });
}

drawBelt('canvas', data, hotData);