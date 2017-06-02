import WebGl from './engine/webgl.js';
import data from './data/path.js';
import MercatorProjection from './engine/tools/mercatorPorjection.js';

var mercatorProjection = new MercatorProjection();

window.onload = function () {
    let app = window.app = new WebGl('canvas');

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

    // z
    app.Path({
        path: [
            [-500, 0, 0],
            [500, 0, 0],
        ],
        color: '#fff'
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
    console.log(min, max, delta, scale)

    var newPath = data.paths.map(point => {
        return [(point[0] - mid[0]) * scale, (point[1] - mid[1]) * scale, 0];
    });

    //
    app.Belt({
        path: newPath,
        height: 10
    });
}