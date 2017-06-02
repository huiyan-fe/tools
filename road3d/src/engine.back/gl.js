import Camera from './camera';
import Plane from './obj/plane';
import Wall from './obj/wall';
import Path from './obj/path';
import Cuboid from './obj/cuboid';
import Belt from './obj/belt';
import {
    getWebGLContext,
    initShaders,
    createProgram,
    loadShader
} from './tools/utility'
import {
    VSHADER_SOURCE,
    FSHADER_SOURCE
} from './shaders/default'

class GL {
    constructor(dom, opt = {}) {
        var self = this;

        var renderList = this.renderList = [];

        var Dom = document.getElementById(dom);
        var DomSty = getComputedStyle(Dom);

        var canvas = document.createElement('canvas');
        canvas.height = parseInt(DomSty.height);
        canvas.width = parseInt(DomSty.width);
        Dom.appendChild(canvas);

        var gl = this.gl = getWebGLContext(canvas);

        initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

        // init lights 11644.1483, 3992.1427000000003, 0
        // gl.uniform3f(gl.uLightPosition, 0.0, 1.0, 1.0);
        gl.uniform3f(gl.uLightPosition, 11640.38965, 3991.49485, 0.0);
        gl.uniform1f(gl.uShininess, 5.0);
        gl.uniform4fv(gl.uLightAmbient, [0.03, 0.03, 0.03, 1.0]);
        gl.uniform4fv(gl.uLightDiffuse, [10.0, 10.0, 10.0, 1.0]);
        //
        this.gl.ubuffer = gl.createBuffer();
        this.gl.ibuffer = gl.createBuffer();
        this.gl.tbuffer = gl.createBuffer();
        this.gl.nbuffer = gl.createBuffer();

        gl.enable(gl.DEPTH_TEST);
        gl.clearColor(0, 0, 0, 1.0);

        //init camear
        self.camera = new Camera(this.gl, opt.camera);

        function draw() {
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            // console.time('draw')
            for (var i in renderList) {
                renderList[i].render();
            }
            // console.timeEnd('draw')
            requestAnimationFrame(draw);
        }
        requestAnimationFrame(draw);
    }

    Plane(obj) {
        var plane = new Plane(this, obj);
        this.renderList.push(plane);
        return plane;
    }

    Wall(obj) {
        var wall = new Wall(this, obj);
        this.renderList.push(wall);
        return wall;
    }

    Path(obj) {
        var path = new Path(this, obj);
        this.renderList.push(path);
        return path;
    }

    Cuboid(obj) {
        var cuboid = new Cuboid(this, obj);
        this.renderList.push(cuboid);
        return cuboid;
    }

    Belt(obj) {
        var belt = new Belt(this, obj);
        this.renderList.push(belt);
        return belt;
    }

}

export default GL;