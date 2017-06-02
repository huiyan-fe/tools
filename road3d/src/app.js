import WebGl from './engine/webgl.js';

window.onload = function () {
    let app = window.app = new WebGl('canvas');

    app.Path({
        path: [
            [0, 0, 0],
            [1000, 1000, 0],
        ]
    });

    
} 