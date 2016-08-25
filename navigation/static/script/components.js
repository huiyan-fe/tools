
var Panel = Vue.extend({
    template: '#form-template',
    data: function () {
        return {   
            mode: 'driving',
            tactics: 12,
            starts: [{
                name: '颐和园'
            }],
            ends: [{
                name: '西单'
            }],
            routes: []
        }
    },
    methods: {
        search: function () {
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
        request: function (data) {
            var me = this;
            var url = 'http://api.map.baidu.com/direction/v1?callback=?';
            $.getJSON(url, data, function (rs) {
                me.routes = rs.result.routes;
                if (me.mode == 'transit') { //公交
                    var routesLength = rs.result.routes.length;
                    for (var i = 0; i< routesLength; i++) {
                        var route = rs.result.routes[i];
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
                        addStart(points[0]);
                        addEnd(points[points.length - 1]);
                        var polyline = new BMap.Polyline(points);
                        map.addOverlay(polyline);
                    }
                } else { // 驾车
                    for (var i = 0; i< rs.result.routes.length; i++) {
                        var route = rs.result.routes[i];
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
                        addStart(points[0]);
                        addEnd(points[points.length - 1]);
                        var polyline = new BMap.Polyline(points);
                        map.addOverlay(polyline);
                    }
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
    props: ['routes']
});

Vue.component('panel', Panel)
Vue.component('route-list', RouteList )
