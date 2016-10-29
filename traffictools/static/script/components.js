var map = require('./map');

var Panel = Vue.extend({
    template: '#form-template',
    data: function () {
        return {   
            inputText: '',
            routes: []
        }
    },
    watch: {
    },
    init: function () {
    },
    methods: {
        addLine: function () {
            this.routes.length = 0;
            map.clearOverlays();
            var inputText = this.inputText;
            inputText = inputText.split("|");
            //var lineName = inputText[0]
            var linePaths = inputText[0].split(';');

            var allPoints = [];
            for (var i = 0; i < linePaths.length; i++) {
                var linePath = linePaths[i].split(',');
                var points = [];
                for (var j = 0; j < linePath.length; j += 2) {
                    points.push(new BMap.Point(linePath[j], linePath[j + 1]));
                }
                var r = ~~(Math.random() * 255);
                var g = ~~(Math.random() * 255);
                var b = ~~(Math.random() * 255);
                var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
                var polyline = new BMap.Polyline(points, {strokeColor: color, strokeWeight:3, strokeOpacity:1});   //创建折线
                polyline.color = color;
                allPoints = allPoints.concat(points);
                map.addOverlay(polyline);
                this.routes.push(polyline);
            }
            map.setViewport(allPoints);

        }
    }
});


var RouteList = Vue.extend({
    template: '#route-list',
    props: ['routes'],
    methods: {
        toggle: function (polyline) {
            if (polyline.isHide) {
                map.addOverlay(polyline);
                polyline.isHide = false;
            } else {
                map.removeOverlay(polyline);
                polyline.isHide = true;
            }
        }
    }
});

Vue.component('panel', Panel)
Vue.component('route-list', RouteList)
