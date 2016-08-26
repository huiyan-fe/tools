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
        this.polyline = new BMap.Polyline(points);
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
        this.polyline = new BMap.Polyline(points);
        map.addOverlay(this.polyline);
    }
}

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
            this.routes.splice(index);
        }
    }
});

Vue.component('panel', Panel)
Vue.component('route-list', RouteList)
Vue.component('selected-list', SelectedList)
