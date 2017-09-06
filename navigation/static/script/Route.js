var map = require('./map');
var utils = require('./utils');

function Route(options) {
    options = options || {};
    this.color = '';
    this.lineStyle = {
        strokeColor: '#65b320',
        strokeOpacity: 0.8,
        strokeWeight: 5,
    }
    this.directions = [];
    this.isShowStartEndMarker = true;
    this.colors = [
        '#b71c1c',
        '#880e4f',
        '#4a148c',
        '#d50000',
        '#c51162',
        '#aa00ff',
        '#311b92',
        '#1a237e',
        '#0d47a1',
        '#6200ea',
        '#304ffe',
        '#2962ff',
        '#01579b',
        '#006064',
        '#004d40',
        '#0091ea',
        '#00b8d4',
        '#00bfa5',
        '#1b5e20',
        '#33691e',
        '#827717',
        '#00c853',
        '#64dd17',
        '#aeea00',
        '#f57f17',
        '#ff6f00',
        '#e65100',
        '#ffd600',
        '#ffab00',
        '#ff6d00',
        '#bf360c',
        '#3e2723',
        '#212121',
        '#dd2c00',
        '#263238',
        '#000',
        '#fff',
        '#999',
        '#666',
        '#ccc',
    ];
    this.weights = [
        3, 5, 8, 10, 12
    ];
    this.mode = options.mode;
    this._show = false;
    this.result = options.result;
    this.render();
}

Route.prototype.changeColor = function (color) {
    this.polyline.setStrokeColor(color);
}

Route.prototype.changeWeight = function (color) {
    this.polyline.setStrokeWeight(color);
}

Route.prototype.clear = function () {
    if (!this.selected) {
        map.removeOverlay(this.startMarker);
        map.removeOverlay(this.endMarker);
        map.removeOverlay(this.polyline);
        this.directions.forEach(function (item) {
            map.removeOverlay(item);
        });
    }
}

Route.prototype.showStartEndMarker = function () {
    this.isShowStartEndMarker = true;
    map.addOverlay(this.startMarker);
    map.addOverlay(this.endMarker);
}

Route.prototype.hideStartEndMarker = function () {
    this.isShowStartEndMarker = false;
    map.removeOverlay(this.startMarker);
    map.removeOverlay(this.endMarker);
}

Route.prototype.show = function () {
    if (this.selected) {
        if (this.isShowStartEndMarker) {
            map.addOverlay(this.startMarker);
            map.addOverlay(this.endMarker);
        }
        map.addOverlay(this.polyline);
        this.directions.forEach(function (item) {
            map.addOverlay(item);
        });
    }
}

Route.prototype.render = function () {
    if (this.polyline) {
        this.show();
        return;
    }

    var me = this;
    if (me.mode == 'transit') { //公交
        var route = this.result;
        var steps = route.scheme[0].steps;
        var points = [];
        var paths = [];
        for (var j = 0; j < steps.length; j++) {
            paths.push(steps[j][0].path);
        }
        paths = paths.join(';');
        paths = paths.split(';');
        for (var j = 0; j < paths.length; j++) {
            var lnglat = paths[j].split(',');
            points.push(new BMap.Point(lnglat[0], lnglat[1]));
        }

    } else { // 驾车
        var route = this.result;
        var paths = [];
        var steps = route.steps;
        for (var j = 0; j < steps.length; j++) {
            paths.push(steps[j].path);
        }
        paths = paths.join(';');
        paths = paths.split(';');
        var points = [];
        var lineStr = paths.join(',');
        for (var j = 0; j < paths.length; j++) {
            var lnglat = paths[j].split(',');
            points.push(new BMap.Point(lnglat[0], lnglat[1]));
        }
       
    }

    this.startMarker = utils.addStart(points[0]);
    this.endMarker = utils.addEnd(points[points.length - 1]);
    this.polyline = new BMap.Polyline(points, this.lineStyle);
    map.addOverlay(this.polyline);

    //this.directions.push(utils.addDirection(points, ~~(points.length / 3)));
    //this.directions.push(utils.addDirection(points, ~~(points.length / 3 * 2)));
    
}

module.exports = Route;
