function Route(options) {
    options = options || {};
    this.mode = options.mode;
    this.result = options.result;
    this.render();
}

Route.prototype.clear = function () {
    if (!this.selected) {
        map.removeOverlay(this.startMarker);
        map.removeOverlay(this.endMarker);
        map.removeOverlay(this.polyline);
    }
}

Route.prototype.show = function () {
    if (this.selected) {
        map.addOverlay(this.startMarker);
        map.addOverlay(this.endMarker);
        map.addOverlay(this.polyline);
    }
}

Route.prototype.highlight = function () {
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

        this.startMarker = addStart(points[0]);
        this.endMarker = addEnd(points[points.length - 1]);
        this.polyline = new BMap.Polyline(points, {
        });
        map.addOverlay(this.polyline);
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
        for (var j = 0; j < paths.length; j++) {
            var lnglat = paths[j].split(',');
            points.push(new BMap.Point(lnglat[0], lnglat[1]));
        }
       
        this.startMarker = addStart(points[0]);
        this.endMarker = addEnd(points[points.length - 1]);
        this.polyline = new BMap.Polyline(points, {
            strokeColor: '#65b320',
            strokeOpacity: 1,
            strokeWeight: 5,
        });
        map.addOverlay(this.polyline);
    }
}

var Panel = Vue.extend({
    template: '#form-template',
    data: function () {
        return {   
            mode: 'driving',
            tactics: 12,
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
        },
        request: function (data) {
            var me = this;
            var url = 'http://api.map.baidu.com/direction/v1?callback=?';
            $.getJSON(url, data, function (rs) {
                for (var i = 0; i < rs.result.routes.length; i++) {
                    me.tmpRoutes.push(new Route({
                        mode: me.mode,
                        result: rs.result.routes[i]
                    }));
                }
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
        }
    }
});

var SelectedList = Vue.extend({
    template: '#selected-list',
    props: ['routes'],
    methods: {
        deleteOne: function (index) {
            this.routes[index].selected = false;
            this.routes[index].clear();
            this.routes.splice(index, 1);
        }
    }
});

var LabelList = Vue.extend({
    template: '#label-list',
    data: function () {
        return {
            labels: [],
            markers: [],
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
    init: function () {
        var me = this;

        var overlays = [];
        var overlaycomplete = function(e){
            var overlay = e.overlay;

            if (overlay instanceof BMap.Marker) {
                var marker = overlay;
                me.markers.push(marker);
                var tip = new Tips(marker.point, "标注名称");
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
                me.labels.push('标注名称' + (me.labels.length + 1));
            }

        };

        var styleOptions = {
            strokeColor:"red",    //边线颜色。
            fillColor:"red",      //填充颜色。当参数为空时，圆形将没有填充效果。
            strokeWeight: 3,       //边线的宽度，以像素为单位。
            strokeOpacity: 0.8,       //边线透明度，取值范围0 - 1。
            fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
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
        showMarker: function () {
            this.markers.forEach(function (item) {
                map.addOverlay(item);
            });
        },
        hideMarker: function () {
            this.markers.forEach(function (item) {
                map.removeOverlay(item);
            });
        }
    }
});

var Tools = Vue.extend({
    template: '#tools',
    data: function () {
        return {
            style: 'grayscale'
        }
    },
    watch: {
        style: function (style) {
            map.setMapStyle({style: style});
        }
    }
});

Vue.component('panel', Panel)
Vue.component('route-list', RouteList)
Vue.component('selected-list', SelectedList)
Vue.component('label-list', LabelList)
Vue.component('tools', Tools)
