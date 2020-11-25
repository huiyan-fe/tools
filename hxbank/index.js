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
map.addEventListener('zoomend', e => {
    document.getElementById('result').innerHTML = '';
    let zoom = Math.ceil(e.currentTarget.getZoom());
    let zoomDom = document.getElementById('zoom-value');
    if (zoomDom.innerHTML !== zoom) {
        zoomDom.innerHTML = zoom;
    }
});
map.setMapStyleV2({styleId: 'b55cfcedd9c54d1fd7169bfd39fac37f'});
$('#select').bind('change', function () {
    var style = $(this).val();
    if (style === 'midnight') {
        map.setMapStyleV2({styleId: 'b55cfcedd9c54d1fd7169bfd39fac37f'});
    } else {
        map.setMapStyleV2({styleId: ''});
    }
});

var tipLabel = new BMapGL.Label('单击添加沿路点，右键添加最后一个点并完成画面', {
    offset: new BMapGL.Size(10, -5),
    enableMassClear: true
});
tipLabel.setStyles({color: '#333', borderColor: '#ff0103'});
document.getElementById('zoom-value').innerHTML = Math.ceil(map.getZoom());

var zoomPolygons = createPolyInstance(map, 'polygon', {exportName: '沿路面数据导出'});
var zoomAreas = createPolyInstance(map, 'polygon', {exportName: '楼宇面数据导出', syncChexboxes: false});
var zoomPolylines = createPolyInstance(map, 'polyline', {exportName: '线数据导出'});
zoomAreas.init();
zoomPolygons.init();
zoomPolylines.init();
zoomPolygons.clearMarkers = clearMarkers;
zoomPolygons.onCancelEdit = function () {
    document.getElementById('createArea').setAttribute('disabled', '');
};
zoomPolygons.onClick = function () {
    document.getElementById('createArea').removeAttribute('disabled');
};
zoomAreas.parents = [];
zoomAreas.onClick = function (polygon, e) {
    zoomPolygons.disableEditing();
};
function createAreas() {
    var polygon = zoomPolygons.currentEdit;
    if (!polygon) {
        return;
    }
    let index = zoomAreas.parents.findIndex(item => item.polygon === polygon);
    if (index > -1) {
        zoomAreas.parents[index].overlays.forEach(item => zoomAreas.deleteData(item));
        zoomAreas.parents.splice(index, 1);
    }
    var bounds = polygon.getBounds();
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    var row = document.getElementById('row').value;
    var column = document.getElementById('column').value;
    var stepX = (ne.lng - sw.lng) / row;
    var stepY = (ne.lat - sw.lat) / column;
    var overlays = [];
    for (let i = 0; i < row; i++) {
        let lng1 = sw.lng + i * stepX + stepX * 0.05;
        let lng2 = sw.lng + (i + 1) * stepX - stepX * 0.05;
        for (let j = 0; j < column; j++) {
            let lat1 = sw.lat + j * stepY + stepY * 0.05;
            let lat2 = sw.lat + (j + 1) * stepY - stepY * 0.05;
            let ol = zoomAreas.createOverlay(
                [
                    new BMapGL.Point(lng1, lat1),
                    new BMapGL.Point(lng2, lat1),
                    new BMapGL.Point(lng2, lat2),
                    new BMapGL.Point(lng1, lat2)
                ],
                polygon.zoomLevel
            );
            overlays.push(ol);
        }
    }
    zoomAreas.parents.push({polygon: polygon, overlays: overlays});
    Object.keys(zoomPolygons.enableZooms).forEach(item => zoomAreas.enableZoom(item));
}
zoomPolylines.setData = function (zoom, polygons) {
    this.data[zoom] = polygons;
    this.enableZooms[zoom] = zoomPolygons.enableZooms[zoom];
    this.showEnablePolygons();
};

var editMarkers = false;
var zoomMarkers = createPolyInstance(map, 'marker', {exportName: '点数据导出', syncChexboxes: false});
zoomMarkers.init();
map.addEventListener('click', e => {
    // marker拖拽完毕还会触发click事件，处理一下
    if (editMarkers && !zoomMarkers.markerDraged) {
        zoomMarkers.createOverlay(e.latlng);
    }
    zoomMarkers.markerDraged = false;
});

function changeEditMarkers(status) {
    if (typeof status !== 'undefined') {
        editMarkers = status;
    } else {
        editMarkers = !editMarkers;
    }
    document.getElementById('editMarker').innerHTML = editMarkers ? '取消绘制地点' : '开启绘制地点';
}

function setEnableZoom(event, zoom, type) {
    if (event.target.checked) {
        if (type === 'polygon') {
            zoomPolygons.enableZoom(zoom);
            zoomAreas.enableZoom(zoom);
        } else {
            zoomPolylines.enableZoom(zoom);
        }
    } else {
        if (type === 'polygon') {
            zoomPolygons.disableZoom(zoom);
            zoomAreas.disableZoom(zoom);
        } else {
            zoomPolylines.disableZoom(zoom);
        }
    }
}
function setEnableZoomAuto(event, type) {
    if (event.target.checked) {
        if (type === 'polygon') {
            zoomPolygons.enableAuto();
            zoomAreas.enableAuto();
        } else {
            zoomPolylines.enableAuto();
        }
    } else {
        if (type === 'polygon') {
            zoomPolygons.disableAuto();
            zoomAreas.disableAuto();
        } else {
            zoomPolylines.disableAuto();
        }
    }
}

var markers = [];
var points = [];
var _isOpen = false;
function changeDraw(open) {
    if (_isOpen) {
        endDraw();
    } else {
        startDraw();
    }
    document.getElementById('changeDraw').innerHTML = _isOpen ? '完成沿路画面' : '开启沿路画面';
}
function startDraw() {
    changeEditMarkers(false);
    document.getElementById('editMarker').setAttribute('disabled', '');
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
    document.getElementById('editMarker').removeAttribute('disabled');
    if (_isOpen === false) {
        return false;
    }
    _isOpen = false;

    map.removeOverlay(tipLabel);
    map.removeEventListener('mousemove', _bindMouseMoveEvent);
    map.removeEventListener('click', _bindClickEvent);
    map.removeEventListener('rightclick', _bindRightClickEvent);
    if (points.length < 1) {
        return false;
    }
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
            var polygon = zoomPolygons.createOverlay(ps);
            zoomPolygons.enableEdit(polygon);
            document.getElementById('createArea').removeAttribute('disabled');
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

var local = new BMapGL.LocalSearch(map, {
    renderOptions: {
        map: map
    }
});
function poisearch() {
    var text = document.getElementById('searchText').value;
    local.search(text);
}
var action = '导入沿路面';
function setDataLoadType(event) {
    action = event.target.value;
}
function doAction() {
    let fun = {
        '导入沿路面': () => zoomPolygons.importData(),
        '导入楼宇面': () => zoomAreas.importData(),
        '导入线数据': () => zoomPolylines.importData(),
        '导入点数据': () => zoomMarkers.importData(),
        '导出点数据': () => zoomMarkers.exportData(),
        '导出线数据': () => zoomPolylines.exportData(),
        '导出沿路面': () => zoomPolygons.exportData(),
        '导出楼宇面': () => zoomAreas.exportData()
    }[action];
    if (/导入/.test(action)) {
        var quest = window.confirm('确定' + action + '吗？这将会覆盖当前类型数据!');
        if (!quest) {
            return;
        }
    }
    fun && fun();
}

var styleOptions = {
    strokeColor: '#f00', // 边线颜色。
    fillColor: '#fff', // 填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 2, // 边线的宽度，以像素为单位。
    strokeOpacity: 1, // 边线透明度，取值范围0 - 1。
    fillOpacity: 0.6 // 填充的透明度，取值范围0 - 1。
};
var labelOptions = {
    borderRadius: '2px',
    background: '#FFFBCC',
    border: '1px solid #E1E1E1',
    color: '#703A04',
    fontSize: '12px',
    letterSpacing: '0',
    padding: '5px'
};

// 实例化鼠标绘制工具
var drawingManager = new BMapGLLib.DrawingManager(map, {
    enableDrawingTool: true, // 是否显示工具栏
    enableCalculate: false, // 绘制是否进行测距(画线时候)、测面(画圆、多边形、矩形)
    enableSorption: true,
    drawingToolOptions: {
        enableTips: true,
        customContainer: 'selectbox_Drawing',
        hasCustomStyle: true,
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        offset: new BMapGL.Size(210, 20), // 偏离值
        scale: 0.8, // 工具栏缩放比例
        drawingModes: [
            BMAP_DRAWING_MARKER,
            BMAP_DRAWING_POLYLINE,
            BMAP_DRAWING_RECTANGLE,
            BMAP_DRAWING_POLYGON,
            BMAP_DRAWING_CIRCLE
        ]
    },
    enableSorption: true, // 是否开启边界吸附功能
    sorptionDistance: 20, // 边界吸附距离
    enableGpc: true, // 是否开启延边裁剪功能
    enableLimit: false, // 是否开启超限提示
    circleOptions: styleOptions, // 圆的样式
    polylineOptions: styleOptions, // 线的样式
    polygonOptions: styleOptions, // 多边形的样式
    rectangleOptions: styleOptions, // 矩形的样式
    labelOptions: labelOptions // label的样式
});
drawingManager.addEventListener('overlaycomplete', e => {
    map.removeOverlay(e.overlay);
    if (e.drawingMode === 'polyline') {
        zoomPolylines.createOverlay(e.overlay.getPath(), Math.ceil(map.getZoom()));
    } else if (e.drawingMode === 'polygon' || e.drawingMode === 'circle' || e.drawingMode === 'rectangle') {
        zoomPolygons.createOverlay(e.overlay.getPath(), Math.ceil(map.getZoom()));
    } else if (e.drawingMode === 'marker') {
        zoomMarkers.createOverlay(e.overlay.getPosition(), Math.ceil(map.getZoom()));
    }
});
