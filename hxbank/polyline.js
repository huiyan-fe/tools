/* globals BMapGL createPolyInstance */
var map = new BMapGL.Map('map', {
    maxZoom: 19,
    minZoom: 12,
    displayOptions: {
        indoor: false
    }
});
map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 15);
map.enableScrollWheelZoom();
map.disableDoubleClickZoom();
map.addControl(new BMapGL.ScaleControl());
map.addControl(new BMapGL.NavigationControl3D());
map.addControl(new BMapGL.ZoomControl());
map.setMapStyleV2({styleId: 'b55cfcedd9c54d1fd7169bfd39fac37f'});
$('#select').bind('change', function () {
    var style = $(this).val();
    if (style === 'midnight') {
        map.setMapStyleV2({styleId: 'b55cfcedd9c54d1fd7169bfd39fac37f'});
    } else {
        map.setMapStyleV2({styleId: ''});
    }
});
document.getElementById('zoom-value').innerHTML = Math.ceil(map.getZoom());

var zoomPolylines = createPolyInstance(map, 'polyline');
var zoomPolygons = createPolyInstance(map, 'polygon', {disableEdit: true});
zoomPolylines.init();
zoomPolygons.init();
zoomPolygons.setData = function (zoom, polygons) {
    this.data[zoom] = polygons;
    this.enableZooms[zoom] = zoomPolylines.enableZooms[zoom];
    this.showEnablePolygons();
};

var tipLabel = new BMapGL.Label('单击设置起点', {
    offset: new BMapGL.Size(10, -5),
    enableMassClear: true
});
tipLabel.setStyles({color: '#333', borderColor: '#ff0103'});
var drawManager = {
    currentLine: null,
    startMarker: null,
    endMarker: null,
    midMarkers: [],
    /**
     * step为当前的绘制状态
     * 0：默认状态
     * 1：绘制状态，未确认起点
     * 2：绘制状态，已确认起点，待插入途径点或确认终点
     */
    step: 0,
    startDraw() {
        if (this.step !== 0) {
            return true;
        }
        this.step = 1;
        this.clearMarkers();

        tipLabel.setContent('单击设置起点');
        map.addOverlay(tipLabel);
        map.addEventListener('mousemove', this.bindMouseMoveEvent);
        map.addEventListener('click', this.bindClickEvent);
        map.addEventListener('rightclick', this.bindRightClickEvent);
    },
    endDraw(isRepaint) {
        if (this.step !== 2 && !(isRepaint && this.step === 0)) {
            return false;
        }
        this.step = 0;
        map.removeOverlay(tipLabel);
        map.removeEventListener('mousemove', this.bindMouseMoveEvent);
        map.removeEventListener('click', this.bindClickEvent);
        map.removeEventListener('rightclick', this.bindRightClickEvent);
        var origin = `${this.startMarker.latLng.lat},${this.startMarker.latLng.lng}`;
        var destination = `${this.endMarker.latLng.lat},${this.endMarker.latLng.lng}`;
        var waypoints = '';
        for (let i = 0; i < this.midMarkers.length; i++) {
            const marker = this.midMarkers[i];
            var p = marker.latLng;
            waypoints += `${p.lat},${p.lng}`;
            if (i !== this.midMarkers.length - 1) {
                waypoints += '|';
            }
        }
        $.ajax({
            url: '//api.map.baidu.com/directionlite/v1/driving',
            type: 'GET',
            dataType: 'jsonp',
            jsonpCallback: 'jqcbk',
            data: {
                ak: 'rwDo54idcUa6YKDrLzmG13uXAGhQIw4T',
                origin: origin,
                destination: destination,
                waypoints: waypoints,
                tactics: 3
            },
            success: rs => {
                if (rs.status === 0) {
                    let data = rs.result.routes[0].steps;
                    let ps = [];
                    for (let i = 0; i < data.length; i++) {
                        ps.push(data[i].start_location);
                        ps.push(data[i].end_location);
                    }
                    if (!this.currentLine) {
                        this.currentLine = zoomPolylines.createOverlay(ps);
                    } else {
                        this.currentLine.setPath(ps);
                    }
                } else {
                    alert(rs.message);
                }
            }
        });
    },
    clearMarkers() {
        if (this.startMarker) {
            map.removeOverlay(this.startMarker);
            this.startMarker = null;
        }
        if (this.endMarker) {
            map.removeOverlay(this.endMarker);
            this.endMarker = null;
        }
        for (let i = 0; i < this.midMarkers.length; i++) {
            const marker = this.midMarkers[i];
            map.removeOverlay(marker);
        }
        this.currentLine = null;
        this.midMarkers = [];
    },
    bindClickEvent(e) {
        let that = drawManager;
        var point = e.latlng;
        var iconUrl = '//huiyan.baidu.com/cms/react-bmap/markers_new2x_fbb9e99.png';
        var icon = new BMapGL.Icon(iconUrl, new BMapGL.Size(25, 40), {
            imageSize: new BMapGL.Size(300, 300),
            imageOffset: new BMapGL.Size(200, 139)
        });
        if (that.step === 1) {
            that.startMarker = new BMapGL.Marker(point, {
                icon: icon,
                enableDragging: true
            });
            that.startMarker.addEventListener('dragend', e => {
                that.endDraw(true);
            });
            map.addOverlay(that.startMarker);
            tipLabel.setContent('再次单击确认终点，右键增加途径点');
            that.step = 2;
        } else {
            icon.setImageOffset(new BMapGL.Size(225, 139));
            that.endMarker = new BMapGL.Marker(point, {
                icon: icon,
                enableDragging: true
            });
            that.endMarker.addEventListener('dragend', e => {
                that.endDraw(true);
            });
            map.addOverlay(that.endMarker);
            that.endDraw();
        }
    },
    bindMouseMoveEvent(e) {
        tipLabel.setPosition(e.latlng);
    },

    bindRightClickEvent(e) {
        let that = drawManager;
        if (that.midMarkers.length === 5) {
            alert('途径点不能大于5个！');
            return;
        }

        if (that.step === 2) {
            var point = e.latlng;
            var iconUrl = '//huiyan.baidu.com/cms/react-bmap/markers_new2x_fbb9e99.png';
            var icon = new BMapGL.Icon(iconUrl, new BMapGL.Size(26, 40), {
                imageSize: new BMapGL.Size(300, 300),
                imageOffset: new BMapGL.Size(268, 210)
            });
            var marker = new BMapGL.Marker(point, {
                icon: icon,
                enableDragging: true
            });
            marker.addEventListener('dragend', e => {
                that.endDraw(true);
            });

            map.addOverlay(marker);
            that.midMarkers.push(marker);
        }
    }
};

zoomPolylines.clearMarkers = () => drawManager.clearMarkers();

var local = new BMapGL.LocalSearch(map, {
    renderOptions: {
        map: map
    }
});
function poisearch() {
    var text = document.getElementById('searchText').value;
    local.search(text);
}
function setEnableZoom(event, zoom, type) {
    console.log(event);
    if (event.target.checked) {
        type === 'polygon' ? zoomPolygons.enableZoom(zoom) : zoomPolylines.enableZoom(zoom);
    } else {
        type === 'polygon' ? zoomPolygons.disableZoom(zoom) : zoomPolylines.disableZoom(zoom);
    }
}
function setEnableZoomAuto(event, type) {
    if (event.target.checked) {
        type === 'polygon' ? zoomPolygons.enableAuto() : zoomPolylines.enableAuto();
    } else {
        type === 'polygon' ? zoomPolygons.disableAuto() : zoomPolylines.disableAuto();
    }
}
