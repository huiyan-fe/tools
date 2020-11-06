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

var tipLabel = new BMapGL.Label('单击添加沿路点，右键添加最后一个点并完成画面', {
    offset: new BMapGL.Size(10, -5),
    enableMassClear: true
});
tipLabel.setStyles({color: '#333', borderColor: '#ff0103'});
document.getElementById('zoom-value').innerHTML = Math.ceil(map.getZoom());
var markers = [];
var points = [];
var zoomPolygons = createPolyInstance(map, 'polygon');
var zoomPolylines = createPolyInstance(map, 'polyline', {disableEdit: true});
zoomPolygons.init();
zoomPolylines.init();
zoomPolygons.clearMarkers = clearMarkers;
zoomPolylines.setData = function (zoom, polygons) {
    this.data[zoom] = polygons;
    this.enableZooms[zoom] = zoomPolygons.enableZooms[zoom];
    this.showEnablePolygons();
};
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

var _isOpen = false;
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
            var polygon = zoomPolygons.createOverlay(ps);
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

var local = new BMapGL.LocalSearch(map, {
    renderOptions: {
        map: map
    }
});
function poisearch() {
    var text = document.getElementById('searchText').value;
    local.search(text);
}
