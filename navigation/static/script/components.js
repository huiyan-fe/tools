var Route = require('./Route');
var map = require('./map');
var utils = require('./utils');
var Vue = require('vue');

var Panel = Vue.extend({
    template: '#form-template',
    data: function () {
        return {   
            mode: 'driving',
            tactics: 12,
            tmpStartMarker: null,
            tmpEndMarker: null,
            tmpMarkers: [],
            starts: [
                {
                    name: '颐和园'
                }
            ],
            ends: [
                {
                    name: '西单'
                }
            ],
            tmpRoutes: [],
            polylines: [],
            markers: [],
        }
    },
    watch: {
        tmpStartMarker: function (newValue, oldValue) {
            map.removeOverlay(oldValue);
        },
        tmpEndMarker: function (newValue, oldValue) {
            map.removeOverlay(oldValue);
        },
    },
    init: function () {
        var menu = new BMap.ContextMenu();
        var me = this;
        var txtMenuItem = [
            {
                text:'设为起点',
                callback: function (point) {
                    me.starts[0].name = point.lat + ',' + point.lng;
                    me.tmpStartMarker = utils.addStart(point);
                }
            },
            {
                text:'设为终点',
                callback: function (point) {
                    me.ends[0].name = point.lat + ',' + point.lng;
                    me.tmpEndMarker = utils.addEnd(point);
                }
            }
        ];
        for (var i = 0; i < txtMenuItem.length; i++) {
            menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100));
        }
        map.addContextMenu(menu);
    },
    methods: {
        search: function () {
            this.clear();
            for (var i = 0; i < this.starts.length; i++) {
                for (var j = 0; j < this.ends.length; j++) {
                    if (this.starts[i].name && this.ends[j].name) {
                        var data = {
                            mode: this.mode,
                            tactics: this.tactics,
                            origin: this.starts[i].name,
                            destination: this.ends[j].name,
                            origin_region: map.getCurrentCity().name,
                            destination_region: map.getCurrentCity().name,
                            region: map.getCurrentCity().name,
                            output: 'json',
                            //tactics: 10,
                            ak: 'aONgqBx7eaWfv2X6RiMyGcWxp6HAwFWi'
                        }

                        this.request(data);
                    }
                }
            }
            
        },
        clear: function () {
            this.tmpRoutes.forEach(function (item) {
                item.clear();
            });
            this.tmpRoutes = [];
            if (this.tmpStartMarker) {
                map.removeOverlay(this.tmpStartMarker);
            }
            if (this.tmpEndMarker) {
                map.removeOverlay(this.tmpEndMarker);
            }
            this.tmpMarkers.forEach(function (item) {
                map.removeOverlay(item);
            });
            this.tmpMarkers = [];
        },
        request: function (data) {
            var me = this;
            var url = 'http://api.map.baidu.com/direction/v1?callback=?';
            $.getJSON(url, data, function (rs) {
                var type = rs.type;
                var points = [];
                if (type == 2) {
                    for (var i = 0; i < rs.result.routes.length; i++) {
                        var route = new Route({
                            mode: me.mode,
                            result: rs.result.routes[i]
                        });
                        me.tmpRoutes.push(route);
                        points = points.concat(route.polyline.getPath());
                    }
                } else if (type == 1) {
                    var destination = rs.result.destination.content;
                    var origin = rs.result.origin.content;
                    var len = origin.length;
                    if (len > 10) {
                        len = 10;
                    }
                    for (var i = 0; i < len; i++) {
                        var item = origin[i];
                        var point = new BMap.Point(item.location.lng, item.location.lat);
                        var marker = new BMap.Marker(point);
                        me.tmpMarkers.push(marker);
                        points.push(point);
                        map.addOverlay(marker);
                    };
                    var len = destination.length;
                    if (len > 10) {
                        len = 10;
                    }
                    for (var i = 0; i < len; i++) {
                        var item = destination[i];
                        var point = new BMap.Point(item.location.lng, item.location.lat);
                        var marker = new BMap.Marker(point);
                        me.tmpMarkers.push(marker);
                        points.push(point);
                        map.addOverlay(marker);
                    };
                }
                map.setViewport(points);
            });
        },
        addStart: function () {
            this.starts.push({ name: '' })
        },
        removeStart: function (index) {
            this.starts.splice(index, 1);
        },
        addEnd: function () {
            this.ends.push({ name: '' })
        },
        removeEnd: function (index) {
            this.ends.splice(index, 1);
        },
    }
});

var RouteList = Vue.extend({
    template: '#route-list',
    props: ['routes'],
    data: function () {
        return {
            route: null,
            selectedRoutes: []
        }
    },
    watch: {
        route: function (value) {
            console.log(value);
        }
    },
    methods: {
        changeColor: function (index, color) {
            this.routes[index].changeColor(color);
        },
        changeWeight: function (index, color) {
            this.routes[index].changeWeight(color);
        },
        selectOne: function (index) {
            for (var i = 0; i < this.selectedRoutes.length; i++) {
                if (this.routes[index] == this.selectedRoutes[i]) {
                    return;
                }
            }
            this.routes[index].selected = true;
            this.routes[index].render();
            this.selectedRoutes.push(this.routes[index]);
        },
        showOne: function (index) {
            this.route = this.routes[index];
            var oldValue = this.route._show;
            this.routes.forEach(function (route) {
                route._show = false;
                route.polyline.setStrokeColor('#65b320');
            });
            this.route._show = !oldValue;
            if (this.route._show) {
                this.route.polyline.setStrokeColor('blue');
            }
        }
    }
});

var SelectedList = Vue.extend({
    template: '#selected-list',
    props: ['routes'],
    methods: {
        changeColor: function (index, color) {
            this.routes[index].changeColor(color);
        },
        changeWeight: function (index, color) {
            this.routes[index].changeWeight(color);
        },
        deleteOne: function (index) {
            this.routes[index].selected = false;
            this.routes[index].clear();
            this.routes.splice(index, 1);
        },
        showOne: function (index) {
            this.route = this.routes[index];
            var oldValue = this.route._show;
            this.routes.forEach(function (route) {
                route._show = false;
                route.polyline.setStrokeColor('#65b320');
            });
            this.route._show = !oldValue;
            this.route.polyline.setStrokeColor('blue');
        }
    }
});

var LabelList = Vue.extend({
    template: '#label-list',
    data: function () {
        return {
            labels: [],
            polylines: [],
            markers: [],
            colors: [
                '#ee5d5b',
                '#ff9625',
                '#6caeca'
            ],
            polylineColors: [
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
            ],
            tips: []
        }
    },
    watch: {
        labels: function () {
            for (var i = 0; i < this.tips.length; i++) {
                this.tips[i]._text = this.labels[i];
                this.tips[i].draw();
            }
        }
    },
    created: function () {
        var marker = new BMap.Marker(new BMap.Point(116.404, 39.915));
        this.labels.push('标注名称可在左侧修改1');
        marker.enableDragging();
        marker.addEventListener('dragging', function () {
            tip._point = marker.point;
            tip.draw();
        });
        marker.addEventListener('dragend', function () {
            tip._point = marker.point;
            tip.draw();
        });
        this.markers.push(marker);
        var tip = new Tips(new BMap.Point(116.404, 39.915), "标注名称可在左侧修改");
        this.tips.push(tip);
        map.addOverlay(marker);
        map.addOverlay(tip);
        var icon = new BMap.Icon("static/images/drag.png", new BMap.Size(25, 25), {
            imageSize: new BMap.Size(25, 25)
        });
        marker.setIcon(icon);
    },
    init: function () {
        var me = this;

        var overlays = [];
        var overlaycomplete = function(e){
            var overlay = e.overlay;

            if (overlay instanceof BMap.Marker) {
                var marker = overlay;
                var icon = new BMap.Icon("static/images/drag.png", new BMap.Size(25, 25), {
                    imageSize: new BMap.Size(25, 25)
                });
                marker.setIcon(icon);
                me.markers.push(marker);
                var tip = new Tips(marker.point, "标注名称可在左侧修改");
                me.tips.push(tip);
                map.addOverlay(tip);
                marker.addEventListener('click', function () {
                });
                marker.addEventListener('dragging', function () {
                    tip._point = marker.point;
                    tip.draw();
                });
                marker.addEventListener('dragend', function () {
                    tip._point = marker.point;
                    tip.draw();
                });
                marker.enableDragging();
                overlays.push(marker);
                drawingManager.close();
                me.labels.push('标注名称可在左侧修改' + (me.labels.length + 1));
            } else if (overlay instanceof BMap.Polyline) {
                me.polylines.push(overlay);
            }

        };

        var styleOptions = {
            strokeColor:"red",    //边线颜色。
            fillColor:"blue",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 5,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,       //边线透明度，取值范围0 - 1。
            fillOpacity: 0.2,      //填充的透明度，取值范围0 - 1。
            strokeStyle: 'solid' //边线的样式，solid或dashed。
        }

        //实例化鼠标绘制工具
        var drawingManager = new BMapLib.DrawingManager(map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: true, //是否显示工具栏
            drawingToolOptions: {
                anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
                /*
                drawingModes : [
                    BMAP_DRAWING_MARKER,
                    BMAP_DRAWING_POLYLINE,
                ],
                */
                offset: new BMap.Size(5, 5), //偏离值
            },
            circleOptions: styleOptions, //圆的样式
            polylineOptions: styleOptions, //线的样式
            polygonOptions: styleOptions, //多边形的样式
            rectangleOptions: styleOptions //矩形的样式
        });  

        //添加鼠标绘制工具监听事件，用于获取绘制结果
        drawingManager.addEventListener('overlaycomplete', overlaycomplete);
    },
    methods: {
        changeLabelColor: function (index, color) {
            this.tips[index].changeColor(color);
        },
        changeLineColor: function (color) {
            this.polylines.forEach(function (polyline) {
                polyline.setStrokeColor(color);
            });
        },
        showMarker: function () {
            this.markers.forEach(function (item) {
                map.addOverlay(item);
            });
        },
        hideMarker: function () {
            this.markers.forEach(function (item) {
                map.removeOverlay(item);
            });
        },
        deleteLastPolyline: function () {
            var polyline = this.polylines.pop();
            map.removeOverlay(polyline);
        },
        remove: function (index) {
            map.removeOverlay(this.markers[index]);
            map.removeOverlay(this.tips[index]);
            this.markers.splice(index, 1)
            this.tips.splice(index, 1)
            this.labels.splice(index, 1)
        }
    }
});

var Tools = Vue.extend({
    template: '#tools',
    data: function () {
        return {
            style: 'grayscale',
            show: false
        }
    },
    watch: {
        style: function (style) {
            map.setMapStyle({style: style});
        }
    },
    methods: {
        toggle: function () {
            this.show = !this.show;
        }
    }
});

var DistanceTool = Vue.extend({
    template: '#distance-tool',
    data: function () {
        return {
            style: 'grayscale',
            show: false
        }
    },
    watch: {
        style: function (style) {
            map.setMapStyle({style: style});
        }
    },

    init: function () {
        this.myDis = new BMapLib.DistanceTool(map);
    },

    methods: {
        open: function () {
            this.myDis.open();
        },
        close: function () {
            this.myDis.close();
        },
    }
});

function Tips(point, text, mouseoverText){
    this._point = point;
    this._text = text;
    this._overText = mouseoverText;
}

Tips.prototype = new BMap.Overlay();

Tips.prototype.changeColor = function(color){
    var positions = {
        '#ee5d5b': '0 0',
        '#ff9625': '0 -10px',
        '#6caeca': '0 -20px'
    }
    var borderColors = {
        '#ee5d5b': '#BC3B3A',
        '#ff9625': '#c57f1d',
        '#6caeca': '#5188a5'
    }
    this._div.style.backgroundColor = color;
    this._div.style.borderColor = borderColors[color];
    this._arrow.style.backgroundPosition = positions[color];
}

Tips.prototype.initialize = function(map){
    this._map = map;
    var div = this._div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.backgroundColor = "#EE5D5B";
    div.style.border = "1px solid #BC3B3A";
    div.style.color = "white";
    div.style.height = "28px";
    div.style.padding = "5px";
    div.style.whiteSpace = "nowrap";
    div.style.MozUserSelect = "none";
    div.style.fontSize = "12px"
    var span = this._span = document.createElement("span");
    div.appendChild(span);
    span.appendChild(document.createTextNode(this._text));      
    var that = this;

    var arrow = this._arrow = document.createElement("div");
    arrow.style.background = "url(static/images/label.png) no-repeat";
    arrow.style.position = "absolute";
    arrow.style.width = "11px";
    arrow.style.height = "10px";
    arrow.style.top = "26px";
    arrow.style.left = "10px";
    arrow.style.overflow = "hidden";
    div.appendChild(arrow);

    map.getPanes().labelPane.appendChild(div);

    return div;
}

Tips.prototype.draw = function(){
    var map = this._map;
    this._span.innerHTML = this._text;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
    this._div.style.top  = pixel.y - 40 + "px";
}

Vue.component('panel', Panel)
Vue.component('distance-tool', DistanceTool)
Vue.component('route-list', RouteList)
Vue.component('selected-list', SelectedList)
Vue.component('label-list', LabelList)
Vue.component('tools', Tools)
