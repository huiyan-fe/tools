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

var _isOpen = false;
var tipLabel = new BMapGL.Label('单击添加沿路点，右键添加最后一个点并完成画面', {
    offset: new BMapGL.Size(10, -5),
    enableMassClear: true
});
tipLabel.setStyles({color: '#333', borderColor: '#ff0103'});

var markers = [];
var points = [];
var zoomLevel = getZoom();
var zoomPolygons = {
    data: {},
    enableZooms: {},
    auto: false,
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
        this.enableZooms[zoom] = zoom === zoomLevel;
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
    }
};
map.addEventListener('click', function (e) {
    zoomPolygons.disableEditing();
});
document.getElementById('zoom-value').innerHTML = getZoom();
map.addEventListener('zoomend', e => {
    if (zoomLevel !== getZoom()) {
        zoomLevel = getZoom();
        document.getElementById('result').innerHTML = '';
        document.getElementById('zoom-value').innerHTML = zoomLevel;
        if (zoomPolygons.auto) {
            zoomPolygons.enableAuto();
        }
    }
});
function setEnableZoom(event, zoom) {
    console.log(event);
    if (event.target.checked) {
        zoomPolygons.enableZoom(zoom);
    } else {
        zoomPolygons.disableZoom(zoom);
    }
}
function setEnableZoomAuto(event) {
    if (event.target.checked) {
        zoomPolygons.enableAuto();
    } else {
        zoomPolygons.disableAuto();
    }
}
function getZoom() {
    return Math.ceil(map.getZoom());
}
function startDraw() {
    if (_isOpen === true) {
        return true;
    }

    _isOpen = true;

    map.addOverlay(tipLabel);
    map.addEventListener('mousemove', _bindMouseMoveEvent);
    map.addEventListener('click', _bindClickEvent);
    map.addEventListener('rightclick', _bindRightClickEvent);
}

function endDraw() {
    if (_isOpen === false) {
        return false;
    }

    _isOpen = false;

    map.removeOverlay(tipLabel);
    map.removeEventListener('mousemove', _bindMouseMoveEvent);
    map.removeEventListener('click', _bindClickEvent);
    map.removeEventListener('rightclick', _bindRightClickEvent);

    let data = [];
    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        data.push({
            coord_type_input: 'bd09ll',
            latitude: point.lat,
            longitude: point.lng,
            loc_time: i * 100 + 1000000000
        });
    }
    // const data = [{"coord_type_input":"bd09ll","loc_time":1576583765,"latitude":29.606528,"longitude":105.09307},{"coord_type_input":"bd09ll","loc_time":1576582672,"latitude":29.61989,"longitude":105.063513},{"coord_type_input":"bd09ll","loc_time":1576582552,"latitude":29.617213,"longitude":105.063363},{"coord_type_input":"bd09ll","loc_time":1576582572,"latitude":29.617246,"longitude":105.063329},{"coord_type_input":"bd09ll","loc_time":1576582592,"latitude":29.618038,"longitude":105.063187},{"coord_type_input":"bd09ll","loc_time":1576582612,"latitude":29.618686,"longitude":105.063375},{"coord_type_input":"bd09ll","loc_time":1576582632,"latitude":29.61928,"longitude":105.063503},{"coord_type_input":"bd09ll","loc_time":1576582652,"latitude":29.619891,"longitude":105.063518},{"coord_type_input":"bd09ll","loc_time":1576582692,"latitude":29.619856,"longitude":105.063329},{"coord_type_input":"bd09ll","loc_time":1576582712,"latitude":29.620212,"longitude":105.06313},{"coord_type_input":"bd09ll","loc_time":1576582802,"latitude":29.620434,"longitude":105.063242},{"coord_type_input":"bd09ll","loc_time":1576582843,"latitude":29.619862,"longitude":105.063729},{"coord_type_input":"bd09ll","loc_time":1576582863,"latitude":29.619861,"longitude":105.063682},{"coord_type_input":"bd09ll","loc_time":1576582883,"latitude":29.619861,"longitude":105.063663},{"coord_type_input":"bd09ll","loc_time":1576582943,"latitude":29.619861,"longitude":105.063658},{"coord_type_input":"bd09ll","loc_time":1576582973,"latitude":29.619857,"longitude":105.06362},{"coord_type_input":"bd09ll","loc_time":1576582993,"latitude":29.619882,"longitude":105.063617},{"coord_type_input":"bd09ll","loc_time":1576583013,"latitude":29.61991,"longitude":105.063619},{"coord_type_input":"bd09ll","loc_time":1576583033,"latitude":29.619624,"longitude":105.063459},{"coord_type_input":"bd09ll","loc_time":1576583053,"latitude":29.618763,"longitude":105.063355},{"coord_type_input":"bd09ll","loc_time":1576583073,"latitude":29.618158,"longitude":105.063052},{"coord_type_input":"bd09ll","loc_time":1576583093,"latitude":29.617425,"longitude":105.063227},{"coord_type_input":"bd09ll","loc_time":1576583144,"latitude":29.616408,"longitude":105.063273},{"coord_type_input":"bd09ll","loc_time":1576583174,"latitude":29.614242,"longitude":105.063683},{"coord_type_input":"bd09ll","loc_time":1576583204,"latitude":29.6143,"longitude":105.067135},{"coord_type_input":"bd09ll","loc_time":1576583234,"latitude":29.614328,"longitude":105.072342},{"coord_type_input":"bd09ll","loc_time":1576583284,"latitude":29.611302,"longitude":105.073893},{"coord_type_input":"bd09ll","loc_time":1576583324,"latitude":29.609742,"longitude":105.074269},{"coord_type_input":"bd09ll","loc_time":1576583394,"latitude":29.609437,"longitude":105.075192},{"coord_type_input":"bd09ll","loc_time":1576583444,"latitude":29.609609,"longitude":105.079786},{"coord_type_input":"bd09ll","loc_time":1576583485,"latitude":29.609736,"longitude":105.080932},{"coord_type_input":"bd09ll","loc_time":1576583515,"latitude":29.609665,"longitude":105.08654},{"coord_type_input":"bd09ll","loc_time":1576583565,"latitude":29.609681,"longitude":105.091071},{"coord_type_input":"bd09ll","loc_time":1576583605,"latitude":29.607764,"longitude":105.093347},{"coord_type_input":"bd09ll","loc_time":1576583635,"latitude":29.606811,"longitude":105.093147},{"coord_type_input":"bd09ll","loc_time":1576583665,"latitude":29.60608,"longitude":105.093416},{"coord_type_input":"bd09ll","loc_time":1576583715,"latitude":29.605934,"longitude":105.09385}];
    $.ajax({
        url: 'https://da42drxk9awgx.cfc-execute.bj.baidubce.com/map/api/trackrectify',
        type: 'POST',
        data: {
            ak: 'rwDo54idcUa6YKDrLzmG13uXAGhQIw4T',
            point_list: JSON.stringify(data),
            rectify_option: 'need_mapmatch:1|transport_mode:driving|denoise_grade:1|vacuate_grade:1',
            supplement_mode: 'no_supplement',
            coord_type_output: 'bd09ll',
            extensions: 'base'
        },
        success: data => {
            const points = JSON.parse(data).points;
            const ps = [];
            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                ps.push(new BMapGL.Point(p.longitude, p.latitude));
            }
            var polygon = createPolygon(ps);
            polygon.enableEditing();
            showResult(polygon);
            clearMarkers();
            // map.setViewport(ps);
        }
    });
}

function clearMarkers() {
    for (let i = 0; i < markers.length; i++) {
        const overlay = markers[i];
        map.removeOverlay(overlay);
    }
    markers = [];
    points = [];
}

var _bindClickEvent = function (e) {
    var point = e.latlng;
    var marker = new BMapGL.Marker(point);
    map.addOverlay(marker);
    markers.push(marker);
    points.push(point);
};

var _bindMouseMoveEvent = function (e) {
    tipLabel.setPosition(e.latlng);
};

var _bindRightClickEvent = function (e) {
    var point = e.latlng;
    var marker = new BMapGL.Marker(point);
    map.addOverlay(marker);
    markers.push(marker);
    points.push(point);
    endDraw();
};

var project = new BMapGL.Projection();

var trigger = document.getElementsByClassName('copyText');
/* eslint-disable no-undef */
var clipboard = new Clipboard('.btn', {
    /* eslint-enable no-undef */
    target: function (trigger) {
        return trigger.nextElementSibling;
    }
});
clipboard.on('success', function (e) {
    console.log(this);
});

function createPolygon(points, zoom) {
    zoom = Number(zoom) || getZoom();
    var polygon = new BMapGL.Polygon(points, {
        strokeColor: '#f00'
    });
    polygon.id = new Date().valueOf();
    polygon.zoomLevel = zoom;
    polygon.addEventListener('editend', function (e) {
        if (zoom === polygon.zoomLevel) {
            showResult(e.overlay);
        }
    });
    polygon.addEventListener('click', function (e) {
        if (zoom === polygon.zoomLevel) {
            polygon.enableEditing();
            showResult(e.target);
        }
    });
    if (getZoom() === zoom) {
        map.addOverlay(polygon);
    }
    let polygons = zoomPolygons.getData(zoom);
    polygons = polygons || [];
    polygons.push(polygon);
    zoomPolygons.setData(zoom, polygons);
    return polygon;
}
function clearAllPolygons() {
    zoomPolygons.clearData();
    map.clearOverlays();
    document.getElementById('result').innerHTML = '';
}
function morePolygon() {
    clearAllPolygons();
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
            let polygon = createPolygon(pointArr, key);
        }
        if (Number(key) === zoom) {
            map.setViewport(allPointArr);
        }
    });
}

function savePolygon() {
    var data = {};
    Object.keys(zoomPolygons.data).forEach(level => {
        var points = zoomPolygons.data[level]
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
    exportFile('面数据导出.json', JSON.stringify(data));
}

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
