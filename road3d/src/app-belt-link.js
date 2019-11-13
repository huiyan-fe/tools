import WebGl from './engine.link/webgl.js';

function drawBelt(id, data) {
    let app = window.app = new WebGl(id);
    let dom = document.getElementById(id);

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
    let hotData = [];
    let paths = [];
    data.road.forEach((link, index) => {
        let path = [];
        for (let i = 0; i < link.data.length; i++) {
            const hot = link.data[i];
            hotData.push([index, ...hot]);
        }
        let loc = link.loc.split(',');
        for (let j = 0; j < loc.length; j+=2) {
            const x = Number(loc[j]);
            const y = Number(loc[j+1]);
            path.push([x,y]);
        }
        paths.push(path);
    });

    paths.forEach(points => {
        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            min[0] = Math.min(min[0], point[0]);
            min[1] = Math.min(min[1], point[1]);
            max[0] = Math.max(max[0], point[0]);
            max[1] = Math.max(max[1], point[1]);
        }
    });
    var mid = [(min[0] + max[0]) / 2, (min[1] + max[1]) / 2];
    var delta = [max[0] - min[0], max[1] - min[1]];
    var deltaMax = Math.max(delta[0], delta[1]);
    // console.log(mid, deltaMax)

    var scale = maxWidth / deltaMax;
    var newPath = paths.map(points => {
        return points.map(point => {
            return [(point[0] - mid[0]) * scale, (point[1] - mid[1]) * scale];
        })
    });
    // console.log(JSON.stringify(newPath));

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

    let dataMaxWidth = 0;
    let dataMaxHeight = 0;
    let dataMaxValue = 0;
    let dataMinValue = Infinity;
    hotData.forEach(data => {
        dataMaxWidth = Math.max(dataMaxWidth, data[0]);
        dataMaxHeight = Math.max(dataMaxHeight, data[1]);
        dataMaxValue = Math.max(dataMaxValue, data[2]);
        dataMinValue = Math.min(dataMinValue, data[2]);
    });

    dataMaxValue = text.max;
    dataMinValue = text.min;
    //
    let canvasWidth = 1024;
    let canvasHeight = 2048;

    //
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvas.style.width = 100 + 'px';
    canvas.style.height = (100 * (canvasHeight / canvasWidth)) + 'px';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '10000';
    canvas.style.background = 'white';
    dom.appendChild(canvas);


    // get the maxwidth,and the maxheight


    var preWidth = canvasWidth / dataMaxWidth;
    var preHeight = canvasHeight / dataMaxHeight;
    console.log(preWidth, preHeight, dataMaxValue, dataMinValue)
    hotData.forEach((data) => {
        // for (var i = 0; i < data[2]; i++) {
        let precent = (data[2] - dataMinValue) / (dataMaxValue - dataMinValue);
        ctx.fillStyle = `rgba(255,0,0,${text.strength * precent})`;
        ctx.fillRect(data[0] * preWidth, data[1] * preHeight, preWidth, preHeight)
            // }
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
    return app.Belt({
        path: newPath,
        height: 500,
        texture: canvas
    });
}

// drawBelt('canvas', data, hotData);

export default drawBelt;