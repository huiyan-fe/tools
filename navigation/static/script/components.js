
var Panel = Vue.extend({
    template: '#luwang-form-template',
    data: function () {
        return {   
            mode: 'driving',
            tactics: 12,
            starts: [{
                name: ''
            }],
            ends: [{
                name: ''
            }]
        }
    },
    methods: {
        search: function () {
            for (var i = 0; i < this.starts.length; i++) {
                for (var j = 0; j < this.ends.length; j++) {
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
            
        },
        request: function (data) {
            var url = 'http://api.map.baidu.com/direction/v1?callback=?';
            $.getJSON(url, data, function (rs) {
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

Vue.component('panel', Panel)
