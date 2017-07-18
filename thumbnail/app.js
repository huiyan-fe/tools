var Merge = {
    mergeRoadPath(roadPath, options) {
        if (!roadPath) {
            return;
        }
        var newRoadPath = [];
        for (var i = 0; i < roadPath.length; i++) {
            if (newRoadPath.length == 0) {
                newRoadPath.push(roadPath[i]);
            } else {
                var item = roadPath[i].split(',');
                var isAdd = false;
                for (var j = 0; j < newRoadPath.length; j++) {
                    var last = newRoadPath[j].split(',');
                    if (item[0] === last[last.length - 2] && item[1] === last[last.length - 1]) {
                        var add = item.slice(2);
                        newRoadPath[j] += ',' + add.join(',');
                        isAdd = true;
                    }

                    if (item[item.length - 2] === last[0] && item[item.length - 1] === last[1]) {
                        var add = item.slice(0, item.length - 2);
                        newRoadPath[j] = add.join(',') + ',' + newRoadPath[j];
                        isAdd = true;
                    }
                }
                if (isAdd === false) {
                    newRoadPath.push(roadPath[i]);
                }
            }
        }

        newRoadPath = this.uniqueRoadPath(newRoadPath);

        return newRoadPath;
    },

    uniqueRoadPath(roadPath) {
        var tmpRoadPath = roadPath.map(function (line) {
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
        tmpRoadPath.map(function (line) {
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

Polyline.prototype.getPoints = function () {
    return this.polyline;
}

Polyline.prototype.isInBound = function (point) {
    if (point.lng > this.minX && point.lat > this.minY && point.lng < this.maxX && point.lat < this.maxY) {
        return true;
    } else {
        return false;
    }
}


Polyline.prototype.isInclude = function (polyline) {
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
Polyline.prototype.isPointOnPolyline = function (point, polyline) {
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

// export default App;

class Thumbnail {
    constructor(objects) {
        this.obj = objects;
        this.dom = document.createElement('div');
        this.dom.className = 'thumbnail';
        document.querySelector('#main').appendChild(this.dom);
        this.canvas = document.createElement('canvas');
        let domStyle = getComputedStyle(this.dom);
        this.height = parseInt(domStyle.height) - 80;
        this.width = parseInt(domStyle.width) - 80;
        this.canvas.height = this.height * 2;
        this.canvas.width = this.width * 2;
        this.canvas.style.height = this.height + 'px';
        this.canvas.style.width = this.width + 'px';
        this.dom.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(2, 2);
        //


        //
        this.system();
        //
        this.drawTitle();
        this.drawMap();
    }

    system() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = '255';
        canvas.height = '1';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.zIndex = '100';
        var grandient = ctx.createLinearGradient(0, 0, 255, 0);
        grandient.addColorStop(0, "yellow");
        grandient.addColorStop(1, "rgb(250,0,0)");
        document.body.appendChild(canvas);
        ctx.fillStyle = grandient;
        ctx.fillRect(0, 0, 255, 1);
        var colordata = ctx.getImageData(0, 0, 255, 1).data;
        this.colordata = colordata;

        //
        let type = this.obj.type;
        let number = this.obj.number;
        console.log(type, '@@', number)
        if (number) {
            let numberDom = document.createElement('div')
            numberDom.className = 'cardNumber';
            numberDom.innerHTML = number;
            let numberDom2 = document.createElement('div')
            numberDom2.className = 'cardNumber2';
            numberDom2.innerHTML = number;
            this.dom.appendChild(numberDom)
            this.dom.appendChild(numberDom2)
        }
        this.dom.className = 'thumbnail cardType' + type;

        let logo = document.createElement('div');
        logo.className = 'thumbnail-logo';
        this.dom.appendChild(logo);

        let logo2 = document.createElement('div');
        logo2.className = 'thumbnail-logo2';
        this.dom.appendChild(logo2);
        // this.document.appendChild()
    }

    drawTitle() {
        let padding = 10;

        //edeef0
        this.ctx.save();
        this.ctx.fillStyle = '#eee';
        this.ctx.fillRect(0, 40, this.width, 1);
        this.ctx.fillRect(0, this.height - 81, this.width, 1)
        this.ctx.fillStyle = '#f1f7fd';
        this.ctx.fillRect(0, this.height - 80, this.width, 80)
        this.ctx.restore();
        //

        // road title
        this.ctx.font = '16px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillStyle = '#333';
        let roadName = this.obj.title.split(' ')[0].split('-')[0];
        let roadDir = this.obj.title.split(' ')[1];
        let roadTitle = roadName + (roadDir ? ' - ' + roadDir : '');
        this.ctx.fillText(roadTitle, this.width / 2, 15 + padding);

        // road name 
        this.ctx.save();
        this.ctx.fillStyle = '#999';
        this.ctx.font = '12px sans-serif';
        this.ctx.textAlign = 'left';
        let roadSTime = this.obj.title.split(' ')[0].split('-')[2];
        let roadETime = this.obj.title.split(' ')[0].split('-')[1];
        let timeTitle = roadSTime ? roadSTime + ' - ' + roadETime : '';
        this.ctx.fillText(timeTitle, 10, this.height - 90);
        this.ctx.textAlign = 'right';
        // this.ctx.fillText(this.obj.title.split(' ')[1], this.width - 10, this.height - 90);
        this.ctx.restore();

        this.ctx.font = '14px sans-serif';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`路段长度`, padding + 5, this.height - 46 - padding);
        this.ctx.fillText(`拥堵指数`, padding + 5, this.height - 23 - padding);
        this.ctx.fillText(`平均速度`, padding + 5, this.height - padding);

        this.ctx.fillStyle = 'red';
        this.ctx.textAlign = 'right';
        this.ctx.fillText(`${this.obj.length.toFixed(3)} km`, this.width - padding - 5, this.height - 46 - padding);
        this.ctx.fillText(`${Number(this.obj.index).toFixed(3)}`, this.width - padding - 5, this.height - 23 - padding);
        this.ctx.fillText(`${Number(this.obj.speed).toFixed(3)} km/h`, this.width - padding - 5, this.height - padding);
    }

    drawMap() {
        this.MercatorProjection = this.MercatorProjection || new MercatorProjection();
        let minBorderX = Infinity;
        let maxBorderX = -Infinity;
        let minBorderY = Infinity;
        let maxBorderY = -Infinity;
        let maxSpeed = -Infinity;
        let minSpeed = Infinity;


        let allRoad = Merge.mergeRoadPath(this.obj.locations);
        let newAllPoints = allRoad.map((item, index) => {
            let points = item.split(',');
            let returnPoints = [];
            for (let i = 0; i < points.length; i += 2) {
                let newPoint = this.MercatorProjection.lngLatToPoint({
                    lng: points[i],
                    lat: points[i + 1]
                });
                returnPoints.push(newPoint);
            }
            return returnPoints;
        });


        // console.warn(this.obj.locations, Merge.mergeRoadPath(this.obj.locations))

        let newPoints = this.obj.locations.map((item, index) => {
            maxSpeed = Math.max(maxSpeed, this.obj.speeds[index]);
            minSpeed = Math.min(minSpeed, this.obj.speeds[index]);
            let points = item.split(',');
            let returnPoints = [];
            for (let i = 0; i < points.length; i += 2) {
                let newPoint = this.MercatorProjection.lngLatToPoint({
                    lng: points[i],
                    lat: points[i + 1]
                });

                minBorderX = Math.min(minBorderX, newPoint.x);
                maxBorderX = Math.max(maxBorderX, newPoint.x);
                minBorderY = Math.min(minBorderY, newPoint.y);
                maxBorderY = Math.max(maxBorderY, newPoint.y);
                returnPoints.push(newPoint);
            }
            return returnPoints;
        });

        let padding = [40, 20, 100, 20];
        let useHeight = this.height - padding[0] - padding[2] - 20;
        let useWidth = this.width - padding[1] - padding[3];

        let borderInfo = {
            startX: minBorderX,
            endX: maxBorderX,
            startY: minBorderY,
            endY: maxBorderY,
            deltaX: maxBorderX - minBorderX,
            deltaY: maxBorderY - minBorderY,
            preX: useWidth / (maxBorderX - minBorderX),
            preY: useHeight / (maxBorderY - minBorderY),
        }
        let usePreRatio = Math.min(borderInfo.preX, borderInfo.preY);


        let offsetX = (usePreRatio * borderInfo.deltaX - useWidth) / 2;
        let offsetY = (usePreRatio * borderInfo.deltaY - useHeight) / 2 + 10;

        // console.log()
        newPoints.forEach((item, index) => {
            this.ctx.beginPath();
            this.ctx.lineWidth = 6;


            let present = (this.obj.speeds[index] - minSpeed) / (maxSpeed - minSpeed);
            // console.log(present)
            if (text.inversion) {
                present = (maxSpeed - this.obj.speeds[index]) / (maxSpeed - minSpeed);
            }
            // console.log(present)


            let colorIndex = Math.min(254, parseInt(present * 255, 10));
            let color = `rgb(${this.colordata[colorIndex*4]},${this.colordata[colorIndex*4+1]},${this.colordata[colorIndex*4+2]})`
            this.ctx.strokeStyle = color;

            item.forEach((point, pointIndx) => {
                let x = (point.x - borderInfo.startX) * usePreRatio - offsetX;
                let y = useHeight - (point.y - borderInfo.startY) * usePreRatio + offsetY;
                if (pointIndx === 0) {
                    this.ctx.moveTo(x + padding[3], y + padding[0]);
                } else {
                    this.ctx.lineTo(x + padding[3], y + padding[0]);
                }
            });
            this.ctx.stroke();
        });

        // newAllPoints.forEach((item, index) => {
        //     this.ctx.beginPath();
        //     let midIndex = Math.round(item.length / 2);
        //     let startX;
        //     let startY;
        //     let endX;
        //     let endY;
        //     if (item[midIndex - 2] && item[midIndex + 2]) {
        //         startX = (item[midIndex - 2].x - borderInfo.startX) * usePreRatio - offsetX + padding[3];
        //         startY = useHeight - (item[midIndex - 2].y - borderInfo.startY) * usePreRatio + offsetY + padding[0];
        //         endX = (item[midIndex + 2].x - borderInfo.startX) * usePreRatio - offsetX + padding[3];
        //         endY = useHeight - (item[midIndex + 2].y - borderInfo.startY) * usePreRatio + offsetY + padding[0];
        //     }
        //     if (startX && endX) {
        //         let x1 = 0,
        //             y1 = 1;
        //         let x2 = endX - startX;
        //         let y2 = endY - startY;
        //         // let arc = Math.atan((endX - startX) / (endY - startX));
        //         let arc = Math.acos(
        //             (x1 * x2 + y1 * y2) /
        //             Math.sqrt(
        //                 (x1 ** 2 + y1 ** 2) * (x2 ** 2 + y2 ** 2)
        //             )
        //         );

        //         // if (endY < startY) {
        //         //     arc = Math.PI * 2 - arc
        //         // }

        //         this.ctx.save();
        //         this.ctx.strokeStyle = 'black';
        //         this.ctx.translate(startX, startY);
        //         this.ctx.rotate(arc);
        //         this.ctx.moveTo(0, 0);
        //         this.ctx.lineTo(0, -10);
        //         this.ctx.stroke();
        //         this.ctx.restore();
        //         // console.log(arc);
        //     }
        //     // console.log(startX, startY, endX, endY)
        //     // console.log(item.length, Math.round(item.length / 2))
        //     // item.forEach((point, pointIndx) => {
        //     //     let x = (point.x - borderInfo.startX) * usePreRatio - offsetX + padding[3];
        //     //     let y = useHeight - (point.y - borderInfo.startY) * usePreRatio + offsetY + padding[0];
        //     //     this.ctx.fillRect(x - 1, y - 1, 2, 2);
        //     // });
        //     // this.ctx.stroke();
        // });
        // newAllPoints.forEach(item)
    }
}