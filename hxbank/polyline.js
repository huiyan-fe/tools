var map = new BMapGL.Map('map', {
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
document.getElementById('zoom-value').innerHTML = getZoom();
/**
 * _step为当前的绘制状态
 * 0：默认状态
 * 1：绘制状态，未确认起点
 * 2：绘制状态，已确认起点，待插入途径点或确认终点
 */
var _step = 0;
var tipLabel = new BMapGL.Label('单击设置起点', {
    offset: new BMapGL.Size(10, -5),
    enableMassClear: true
});
tipLabel.setStyles({color: '#333', borderColor: '#ff0103'});

var currentLine;
var startMarker;
var endMarker;
var midMarkers = [];
var zoomLevel = getZoom();
var zoomPolylines = {
    data: {},
    enableZooms: {},
    auto: false,
    init() {
        map.addEventListener('click', e => {
            this.disableEditing();
        });

        map.addEventListener('zoomend', e => {
            if (zoomLevel !== getZoom()) {
                zoomLevel = getZoom();
                document.getElementById('result').innerHTML = '';
                document.getElementById('zoom-value').innerHTML = zoomLevel;
                if (zoomPolylines.auto) {
                    zoomPolylines.enableAuto();
                }
            }
        });
    },
    syncChexboxes() {
        let zooms = Object.keys(this.enableZooms);
        let html = zooms
            .map(item => {
                return `<label>
                ${item}
                <input type="checkbox" ${
                    this.enableZooms[item] ? 'checked' : ''
                } onclick="setEnableZoom(event, ${item})"/>
                </label>`;
            })
            .join('');
        html += `<label>自动<input type="checkbox" ${
            this.auto ? 'checked' : ''
        } onclick="setEnableZoomAuto(event)"/></label>`;
        document.getElementById('zoom-list').innerHTML = html;
    },
    setData(zoom, polygons) {
        this.data[zoom] = polygons;
        this.enableZooms[zoom] = true;
        this.showEnablePolygons();
    },
    getData(zoom) {
        return this.data[zoom];
    },
    enableZoom(zoom) {
        this.enableZooms[zoom] = true;
        this.showEnablePolygons();
    },
    disableZoom(zoom) {
        this.enableZooms[zoom] = false;
        this.showEnablePolygons();
    },
    clearData() {
        Object.keys(this.data).forEach(key => {
            this.data[key].forEach(item => map.removeOverlay(item));
        });
        this.data = {};
    },
    enableAuto() {
        this.auto = true;
        Object.keys(this.enableZooms).forEach(zoom => {
            if (zoom == zoomLevel) {
                this.enableZooms[zoom] = true;
            } else {
                this.enableZooms[zoom] = false;
            }
        });
        this.showEnablePolygons();
    },
    disableAuto() {
        this.auto = false;
    },
    getEnableData() {
        let zooms = Object.keys(this.enableZooms).filter(item => item);
        return zooms.map(zoom => this.data[zoom]);
    },
    showEnablePolygons() {
        this.syncChexboxes();
        Object.keys(this.data).forEach(key => {
            if (this.enableZooms[key]) {
                this.data[key].forEach(item => map.addOverlay(item));
            } else {
                this.data[key].forEach(item => map.removeOverlay(item));
            }
        });
    },
    disableEditing() {
        Object.keys(this.data).forEach(key => {
            this.data[key].forEach(p => p.disableEditing());
        });
    },
    createPolyline(points, zoom) {
        zoom = Number(zoom) || getZoom();
        var polyline = new BMapGL.Polyline(points, {
            strokeColor: '#f00'
        });
        polyline.id = new Date().valueOf();
        polyline.addEventListener('editend', function (e) {
            showResult(e.overlay);
        });
        polyline.addEventListener('click', function (e) {
            polyline.enableEditing();
            showResult(e.target);
        });
        if (getZoom() === zoom) {
            map.addOverlay(polyline);
        }
        let polylines = this.getData(zoom);
        polylines = polylines || [];
        polylines.push(polyline);
        this.setData(zoom, polylines);
        return polyline;
    },
    importPolyline() {
        document.getElementById('result').innerHTML = '';
        this.clearData();
        this.clearAllPolylines();
        var tex = document.getElementById('more').value;
        if (!tex) {
            return alert('数据不能为空！');
        }
        var data = [];
        try {
            data = JSON.parse(tex);
        } catch (e) {
            alert('解析失败');
        }
        let zoom = getZoom();
        Object.keys(data).forEach(key => {
            if (Number.isNaN(Number(key))) {
                return;
            }
            var item = data[key];
            var polys = item.split(';');
            var allPointArr = [];
            for (var j = 0; j < polys.length; j++) {
                var points = polys[j].split(',');
                var pointArr = [];
                var point = null;
                for (var i = 0; i < points.length; i += 2) {
                    if (points[i] > 10000) {
                        point = project.pointToLngLat(new BMapGL.Pixel(points[i], points[i + 1]));
                    } else {
                        point = new BMapGL.Point(points[i], points[i + 1]);
                    }
                    pointArr.push(point);
                    allPointArr.push(point);
                }
                zoomPolylines.createPolyline(pointArr, key);
            }
            if (Number(key) === zoom) {
                map.setViewport(allPointArr);
            }
        });
    },
    exportPolyline() {
        var data = {};
        Object.keys(this.data).forEach(level => {
            var points = this.data[level]
                .map(item => {
                    let path = item.getPath();
                    path.pop();
                    return path
                        .map(point => {
                            return `${point.lng},${point.lat}`;
                        })
                        .join(',');
                })
                .join(';');
            data[level] = points;
        });
        data.type = 'polygon';
        exportFile('线数据导出.json', JSON.stringify(data));
    }
};
function setEnableZoom(event, zoom) {
    if (event.target.checked) {
        zoomPolylines.enableZoom(zoom);
    } else {
        zoomPolylines.disableZoom(zoom);
    }
}
function setEnableZoomAuto(event) {
    if (event.target.checked) {
        zoomPolylines.enableAuto();
    } else {
        zoomPolylines.disableAuto();
    }
}
function getZoom() {
    return Math.ceil(map.getZoom());
}
function startDraw() {
    if (_step !== 0) {
        return true;
    }

    _step = 1;
    clearMarkers();

    tipLabel.setContent('单击设置起点');
    map.addOverlay(tipLabel);
    map.addEventListener('mousemove', _bindMouseMoveEvent);
    map.addEventListener('click', _bindClickEvent);
    map.addEventListener('rightclick', _bindRightClickEvent);
}

function endDraw(isRepaint) {
    if (_step !== 2 && !(isRepaint && _step === 0)) {
        return false;
    }

    _step = 0;

    map.removeOverlay(tipLabel);
    map.removeEventListener('mousemove', _bindMouseMoveEvent);
    map.removeEventListener('click', _bindClickEvent);
    map.removeEventListener('rightclick', _bindRightClickEvent);

    var origin = `${startMarker.latLng.lat},${startMarker.latLng.lng}`;
    var destination = `${endMarker.latLng.lat},${endMarker.latLng.lng}`;
    var waypoints = '';
    for (let i = 0; i < midMarkers.length; i++) {
        const marker = midMarkers[i];
        var p = marker.latLng;
        waypoints += `${p.lat},${p.lng}`;
        if (i !== midMarkers.length - 1) {
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
                if (!currentLine) {
                    currentLine = zoomPolylines.createPolyline(ps);
                    map.setViewport(ps);
                } else {
                    currentLine.setPath(ps);
                }
                showResult(currentLine);
            } else {
                alert(rs.message);
            }
        }
    });
}

function clearMarkers() {
    if (startMarker) {
        map.removeOverlay(startMarker);
        startMarker = null;
    }
    if (endMarker) {
        map.removeOverlay(endMarker);
        endMarker = null;
    }
    for (let i = 0; i < midMarkers.length; i++) {
        const marker = midMarkers[i];
        map.removeOverlay(marker);
    }
    currentLine = null;
    midMarkers = [];
}

var _bindClickEvent = function (e) {
    var point = e.latlng;
    var iconUrl = '//huiyan.baidu.com/cms/react-bmap/markers_new2x_fbb9e99.png';
    var icon = new BMapGL.Icon(iconUrl, new BMapGL.Size(25, 40), {
        imageSize: new BMapGL.Size(300, 300),
        imageOffset: new BMapGL.Size(200, 139)
    });
    if (_step === 1) {
        startMarker = new BMapGL.Marker(point, {
            icon: icon,
            enableDragging: true
        });
        startMarker.addEventListener('dragend', e => {
            endDraw(true);
        });
        map.addOverlay(startMarker);
        tipLabel.setContent('再次单击确认终点，右键增加途径点');
        _step = 2;
    } else {
        icon.setImageOffset(new BMapGL.Size(225, 139));
        endMarker = new BMapGL.Marker(point, {
            icon: icon,
            enableDragging: true
        });
        endMarker.addEventListener('dragend', e => {
            endDraw(true);
        });
        map.addOverlay(endMarker);
        endDraw();
    }
};

var _bindMouseMoveEvent = function (e) {
    tipLabel.setPosition(e.latlng);
};

var _bindRightClickEvent = function (e) {
    if (midMarkers.length === 5) {
        alert('途径点不能大于5个！');
        return;
    }

    if (_step === 2) {
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
            endDraw(true);
        });

        map.addOverlay(marker);
        midMarkers.push(marker);
    }
};

var project = new BMapGL.Projection();

var trigger = document.getElementsByClassName('copyText');
var clipboard = new Clipboard('.btn', {
    target: function (trigger) {
        return trigger.nextElementSibling;
    }
});
clipboard.on('success', function (e) {
    console.log(this);
});

var local = new BMapGL.LocalSearch(map, {
    renderOptions: {
        map: map
    }
});
function poisearch() {
    var text = document.getElementById('searchText').value;
    local.search(text);
}

function exportFile(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    save_link.click();
}

function showResult(overlay) {
    var bounds = overlay.getBounds();
    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();
    var neMc = project.lngLatToPoint(ne);
    var swMc = project.lngLatToPoint(sw);
    var pathStr = '';
    var geojsonStr = '';
    var pathmcStr = '';
    var path = overlay.getPath();
    var coordinates = [];
    for (var i = 0; i < path.length; i++) {
        pathStr += path[i].lng + ',' + path[i].lat + ',';
        var mc = project.lngLatToPoint(path[i]);
        pathmcStr += mc.x + ',' + mc.y + ',';
        coordinates.push([path[i].lng, path[i].lat]);
    }
    pathmcStr = pathmcStr.substr(0, pathmcStr.length - 1);
    pathStr = pathStr.substr(0, pathStr.length - 1);
    if (overlay.toString() == 'Polyline') {
        geojsonStr = {
            type: 'LineString',
            coordinates: coordinates
        };
    } else if (overlay.toString() == 'Polygon' || overlay.toString() === 'Circle') {
        geojsonStr = {
            type: 'Polygon',
            coordinates: [coordinates]
        };
    }

    document.getElementById('result').innerHTML = `<div><span>左下角,右上角(经纬度)：</span>
        <button class='btn'>复制</button><p class='copyText'>
        ${sw.lng},${sw.lat},${ne.lng}, ${ne.lat}</p></div>
        <div><span>左下角,右上角(墨卡托坐标)：</span>
        <button class='btn'>复制</button>
        <p class='copyText'>
        ${swMc.x}, ${swMc.y},${neMc.x},${neMc.y},</p></div>
        <div><span>坐标集(经纬度)：</span>
        <button class='btn'>复制</button><p class='copyText'>
        ${pathStr}
        </p></div>
        <div><span>坐标集(墨卡托坐标)：</span><button class='btn'>复制</button><p class='copyText'>
        ${pathmcStr}
        </p></div>
        <div><span>geojson：</span><button class='btn'>复制</button><p class='copyText' style='white-space:nowrap;'>
        ${JSON.stringify(geojsonStr)}
        </p></div>`;
}
