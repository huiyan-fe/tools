// data = [];

let isInit = true;

var map = new BMap.Map("map"); // 创建Map实例
map.centerAndZoom(new BMap.Point(116.404, 39.915), 13); // 初始化地图,设置中心点坐标和地图级别
map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

//
//

const lightStyle = [{
    featureType: 'land',
    elementType: 'geometry.fill',
    stylers: {
        color: '#fafcfc'
    }
}, {
    featureType: 'water',
    elementType: 'all',
    stylers: {
        color: '#cbdff8'
    }
}, {
    featureType: 'green',
    elementType: 'all',
    stylers: {
        color: '#dceac7',
        lightness: 33,
        saturation: -37
    }
}, {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: {
        color: '#ffffff'
    }
}, {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: {
        color: '#ced4d0'
    }
}, {
    featureType: 'subway',
    elementType: 'all',
    stylers: {
        weight: '1',
        lightness: 43,
        saturation: -87
    }
}, {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: {
        color: '#9da29e'
    }
}, {
    featureType: 'poi',
    elementType: 'labels',
    stylers: {
        visibility: 'off'
    }
}, {
    featureType: 'label',
    elementType: 'labels',
    stylers: {
        hue: '#000000',
        lightness: 23,
        saturation: -90
    }
}, {
    featureType: 'boundary',
    elementType: 'geometry.fill',
    stylers: {
        color: '#898b86',
        weight: '0.5'
    }
}, {
    featureType: 'local',
    elementType: 'geometry',
    stylers: {
        color: '#ffffff'
    }
}, {
    featureType: 'arterial',
    elementType: 'geometry',
    stylers: {
        color: '#ffffff'
    }
}, {
    featureType: 'building',
    elementType: 'geometry',
    stylers: {
        visibility: 'on'
    }
}, {
    featureType: 'manmade',
    elementType: 'geometry',
    stylers: {
        color: '#edf2ec'
    }
}, {
    featureType: 'arterial',
    elementType: 'geometry.stroke',
    stylers: {
        color: '#ced4d0'
    }
}, {
    featureType: 'local',
    elementType: 'geometry.stroke',
    stylers: {
        color: '#ced4d0'
    }
}];
map.setMapStyle({
    styleJson: lightStyle
});

//

var Merge = {
    mergeRoadPath(roadPath, options) {
        var newRoadPath = [];
        for (var i = 0; i < roadPath.length; i++) {
            if (newRoadPath.length == 0) {
                newRoadPath.push(roadPath[i]);
            } else {
                var item = roadPath[i].split(',');
                var last = newRoadPath[newRoadPath.length - 1].split(',');
                if (item[0] === last[last.length - 2] && item[1] === last[last.length - 1]) {
                    var add = item.slice(2);
                    newRoadPath[newRoadPath.length - 1] += ',' + add.join(',');
                } else {
                    newRoadPath.push(roadPath[i]);
                }
            }
        }

        newRoadPath = this.uniqueRoadPath(newRoadPath);

        return newRoadPath;
    },

    uniqueRoadPath(roadPath) {
        var tmpRoadPath = roadPath.map(function(line) {
            return new Polyline(line.split(','));
        });

        for (var i = 0; i < tmpRoadPath.length - 1; i++) {
            if (!tmpRoadPath[i]) {
                continue;
            }
            var ref = tmpRoadPath[i];
            for (var j = i + 1; j < tmpRoadPath.length; j++) {
                if (tmpRoadPath[j]) {
                    var line = tmpRoadPath[j];
                    if (line.isInclude(ref)) {
                        delete tmpRoadPath[j];
                    }

                }
            }
        }

        var newRoadPath = [];
        tmpRoadPath.map(function(line) {
            if (line) {
                newRoadPath.push(line.getPoints().join(','));
            }
        });

        return newRoadPath;
    },



}

function Polyline(pts) {
    this.polyline = pts;

    var minX = pts[0];
    var maxX = pts[0];
    var minY = pts[1];
    var maxY = pts[1];

    for (var i = 2; i < pts.length; i += 2) {
        minX = Math.min(minX, pts[i]);
        maxX = Math.max(maxX, pts[i]);
        minY = Math.min(minY, pts[i + 1]);
        maxY = Math.max(maxY, pts[i + 1]);
    }

    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;

}

Polyline.prototype.getPoints = function() {
    return this.polyline;
}

Polyline.prototype.isInBound = function(point) {
    if (point.lng > this.minX && point.lat > this.minY && point.lng < this.maxX && point.lat < this.maxY) {
        return true;
    } else {
        return false;
    }
}


Polyline.prototype.isInclude = function(polyline) {
    if (!(polyline.minX > this.minX && polyline.minY > this.minY && polyline.maxX < this.maxX && polyline.maxY < this.maxY)) {
        return false;
    }

    var line = this.getPoints();

    var flag = true;
    for (var z = 0; z < line.length; z += 2) {
        var tmp = this.isPointOnPolyline({
            lng: line[z],
            lat: line[z + 1]
        }, polyline);

        if (tmp == false) {
            flag = false;
        }
    }

    return flag;
}

/**
 * 判断点是否在折线上
 * @param {Point} point 点对象
 * @param {Polyline} polyline 折线对象
 * @returns {Boolean} 点在折线上返回true,否则返回false
 */
Polyline.prototype.isPointOnPolyline = function(point, polyline) {
    var pts = polyline.getPoints();

    if (!polyline.isInBound(point)) {
        return false;
    }

    //判断点是否在线段上，设点为Q，线段为P1P2 ，
    //判断点Q在该线段上的依据是：( Q - P1 ) × ( P2 - P1 ) = 0，且 Q 在以 P1，P2为对角顶点的矩形内
    for (var i = 0; i < pts.length - 2; i++) {

        var curPt = {
            lng: pts[i],
            lat: pts[i + 1]
        }

        var nextPt = {
            lng: pts[i + 2],
            lat: pts[i + 3]
        }

        //首先判断point是否在curPt和nextPt之间，即：此判断该点是否在该线段的外包矩形内
        if (point.lng >= Math.min(curPt.lng, nextPt.lng) && point.lng <= Math.max(curPt.lng, nextPt.lng) &&
            point.lat >= Math.min(curPt.lat, nextPt.lat) && point.lat <= Math.max(curPt.lat, nextPt.lat)) {
            //判断点是否在直线上公式
            var precision = (curPt.lng - point.lng) * (nextPt.lat - point.lat) -
                (nextPt.lng - point.lng) * (curPt.lat - point.lat);
            var diff = 2e-10;
            diff = 2e-9;
            if (precision < diff && precision > -diff) { //实质判断是否接近0
                return true;
            }
        }
    }

    return false;
}

//


// canvas layer

/**
 * 一直覆盖在当前地图视野的Canvas对象
 *
 * @author nikai (@胖嘟嘟的骨头, nikai@baidu.com)
 *
 * @param 
 * {
 *     map 地图实例对象
 * }
 */

function CanvasLayer(options) {
    this.options = options || {};
    this.paneName = this.options.paneName || 'labelPane';
    this.zIndex = this.options.zIndex || 0;
    this._map = options.map;
    this._lastDrawTime = null;
    this.show();
}

CanvasLayer.prototype = new BMap.Overlay();

CanvasLayer.prototype.initialize = function(map) {
    this._map = map;
    let canvas = this.canvas = document.createElement("canvas");
    let ctx = this.ctx = this.canvas.getContext('2d');
    canvas.style.cssText = "position:absolute;" +
        "left:0;" +
        "top:0;" +
        "z-index:" + this.zIndex + ";";
    this.adjustSize();
    this.adjustRatio(ctx);
    map.getPanes()[this.paneName].appendChild(canvas);
    let that = this;
    map.addEventListener('resize', function() {
        that.adjustSize();
        that._draw();
    });
    return this.canvas;
}

CanvasLayer.prototype.adjustSize = function() {
    let size = this._map.getSize();
    let canvas = this.canvas;
    canvas.width = size.width;
    canvas.height = size.height;
    canvas.style.width = canvas.width + "px";
    canvas.style.height = canvas.height + "px";
}

CanvasLayer.prototype.adjustRatio = function(ctx) {
    let backingStore = ctx.backingStorePixelRatio ||
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;
    let pixelRatio = (window.devicePixelRatio || 1) / backingStore;
    let canvasWidth = ctx.canvas.width;
    let canvasHeight = ctx.canvas.height;
    ctx.canvas.width = canvasWidth * pixelRatio;
    ctx.canvas.height = canvasHeight * pixelRatio;
    ctx.canvas.style.width = canvasWidth + 'px';
    ctx.canvas.style.height = canvasHeight + 'px';
    console.log(ctx.canvas.height, canvasHeight);
    ctx.scale(pixelRatio, pixelRatio);
};

CanvasLayer.prototype.draw = function() {
    let self = this;
    let args = arguments;

    clearTimeout(self.timeoutID);
    self.timeoutID = setTimeout(function() {
        self._draw.apply(self, args);
    }, 15);
}

CanvasLayer.prototype._draw = function() {
    let map = this._map;
    let size = map.getSize();
    let center = map.getCenter();
    if (center) {
        let pixel = map.pointToOverlayPixel(center);
        this.canvas.style.left = pixel.x - size.width / 2 + 'px';
        this.canvas.style.top = pixel.y - size.height / 2 + 'px';
        this.dispatchEvent('draw');
        this.options.update && this.options.update.apply(this, arguments);
    }
}

CanvasLayer.prototype.getContainer = function() {
    return this.canvas;
}

CanvasLayer.prototype.show = function() {
    if (!this.canvas) {
        this._map.addOverlay(this);
    }
    this.canvas.style.display = "block";
}

CanvasLayer.prototype.hide = function() {
    this.canvas.style.display = "none";
    //this._map.removeOverlay(this);
}

CanvasLayer.prototype.setZIndex = function(zIndex) {
    this.canvas.style.zIndex = zIndex;
}

CanvasLayer.prototype.getZIndex = function() {
    return this.zIndex;
}


// canvas layer


const roadColor = {
    0: '#fff',
    1: '#6ec974',
    2: '#f3b13e',
    3: '#ec615a',
    4: '#b03b2c'
};


const mapLine = {

    drawTraffic(roads, index, options = {}) {
        // all road

        let allroadConnected = roads;
        allroadConnected = Merge.mergeRoadPath(roads);

        this.drawRoads(options.ctx, allroadConnected, {
            level: 1,
            arrow: false,
            lineWidth: 12,
            color: '#478b4a'
        });

        this.drawRoads(options.ctx, allroadConnected, {
            level: 1,
            arrow: false,
            lineWidth: 10
        });

        // level
        let otherLevel = [2, 3, 4];
        let levelPaths = {};
        otherLevel.forEach(level => {
            index.forEach((idx, idxIndex) => {
                if (Number(idx) === Number(level)) {
                    levelPaths[level] = levelPaths[level] || [];
                    levelPaths[level].push(roads[idxIndex]);
                }
            });
        });
        for (let i in levelPaths) {
            options.level = i;
            options.lineJoin = 'round';
            options.lineWidth = 10;
            this.drawRoads(options.ctx, levelPaths[i], options);
        }

        // arrow
        options.arrow = true;
        options.hideRoad = true;
        let allPoints = this.drawRoads(options.ctx, allroadConnected, options);
        return allPoints;
    },

    /**
     * roads ["116,40,117,59","116,40,117,59",...]
     */
    drawRoads(ctx, roads, options = {}) {
        let theMap;
        try {
            theMap = map;
        } catch (e) {
            theMap = options.map;
        }

        const zoom = theMap.getZoom();
        const lineWidth = options.lineWidth || 12;
        const level = options.level === undefined ? 1 : options.level;

        // prepareData
        const allPoints = [];
        const allPixel = [];

        let filteredRodas = roads.map((road, index) => {
            let path = road.split(',');
            let TempPixel = 0;
            let Dest = 0;
            let usePath = [];
            let testCount = 0;

            for (let k = 0; k < path.length; k += 2) {
                const point = new BMap.Point(path[k], path[k + 1]);
                allPoints.push(point);
                const pixel = theMap.pointToPixel(point);

                // ctx.save();
                // let width = 4;
                // ctx.fillStyle = 'black';
                // ctx.arc(pixel.x - width / 2, pixel.y - width / 2,width,0,Math)
                // // ctx.fillRect(pixel.x - width / 2, pixel.y - width / 2, width, width);
                // ctx.restore();
                // continue;

                allPixel[index] = allPixel[index] || [];
                allPixel[index].push(pixel);
                if (k === 0) {
                    usePath.push(pixel);
                    Dest = 0;
                } else {
                    const deltaX = pixel.x - TempPixel.x;
                    const deltaY = pixel.y - TempPixel.y;
                    const dep = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));
                    let step = 5;

                    if (Dest + dep > step) {
                        if (theMap.getZoom() < 16) {
                            usePath.push(pixel);
                        } else {
                            let comDeltaX = step * deltaX / dep;
                            let comDeltaY = step * deltaY / dep;
                            let TempPointPixel = {};
                            TempPointPixel.x = TempPixel.x;
                            TempPointPixel.y = TempPixel.y;

                            let tempDist = dep - Dest - dep;
                            while ((tempDist + step) < dep) {
                                TempPointPixel.x = TempPointPixel.x + comDeltaX;
                                TempPointPixel.y = TempPointPixel.y + comDeltaY;
                                usePath.push({
                                    x: TempPointPixel.x,
                                    y: TempPointPixel.y
                                });
                                tempDist += step;
                            }
                        }
                        Dest = (Dest + dep) % 5;
                    } else {
                        Dest += dep;
                    }

                    if (k >= path.length - 2) {
                        usePath.push(pixel);
                        break;
                    }
                }
                TempPixel = pixel;
            };
            return usePath;
        });

        if (options.nodraw) {
            return allPoints;
        }

        ctx.lineCap = options.lineCap || 'butt';
        ctx.lineJoin = options.lineJoin || 'round';
        ctx.beginPath();
        allPixel.forEach(road => {
            road.forEach((pixel, index) => {
                if (index === 0) {
                    ctx.moveTo(pixel.x, pixel.y);
                } else {
                    ctx.lineTo(pixel.x, pixel.y);
                }
            });
        });

        ctx.strokeStyle = options.color || roadColor[level] || '#fc2c2b';
        ctx.lineWidth = lineWidth || zoom <= 13 ? lineWidth - 2 : lineWidth;

        if (!options.hideRoad) {
            ctx.stroke();
        }
        // console.log(options)
        if (options.arrow) {
            this.drawArrow(ctx, filteredRodas, options);
        }

        return allPoints;
    },

    drawArrow(ctx, arrowPoint, options) {
        let width = options.arrow.width / 2 || 2;
        let height = options.arrow.height || width * 2;
        ctx.beginPath();
        arrowPoint.forEach(point => {
            for (let i = 5; i < point.length; i += 10) {
                let end = point[i];
                let start;
                let d = 0;
                let count = 1;
                while (d < 5 && count < 5) {
                    start = point[i - count];
                    d = Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
                    count++;
                }

                let vOrigin = [0, -1];
                let vItem = [end.x - start.x, end.y - start.y];
                let angleVar1 = (vOrigin[0] * vItem[0]) + (vOrigin[1] * vItem[1]);
                let angleVar2 = Math.sqrt((vOrigin[0] * vOrigin[0]) + (vOrigin[1] * vOrigin[1]));
                let angleVar3 = Math.sqrt((vItem[0] * vItem[0]) + (vItem[1] * vItem[1]));
                let angle = Math.acos(angleVar1 / (angleVar2 * angleVar3));
                if (vItem[0] < 0) {
                    angle = (Math.PI * 2) - angle;
                }

                ctx.save();
                ctx.translate(start.x, start.y);
                ctx.rotate(angle);
                ctx.moveTo(-width * 1.618, height);
                ctx.lineTo(0, 0);
                ctx.lineTo(width * 1.618, height);
                ctx.restore();
            }
        });

        ctx.strokeStyle = '#fff';
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
};


var canvasLayer = new CanvasLayer({
    map: map,
    update: update
});

function update() {
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    if (!ctx) {
        return;
    }

    let points = [];
    data.forEach(item => {
        points = points.concat(mapLine.drawTraffic(item.path, item.level, { ctx: ctx, lineCap: 'round' }));
    })

    // let points = mapLine.drawTraffic(data[0].path, data[0].level, { ctx: ctx, lineCap: 'round' });
    if (isInit) {
        map.setViewport(points);
        isInit = false;
    }
}




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

    // Object.keys(files).forEach(id => {
    let read = new FileReader();
    read.onload = (e) => {
        isInit = true;
        data = JSON.parse(e.target.result);
        canvasLayer._draw();
    }
    read.readAsText(files[0]);
    // });
}