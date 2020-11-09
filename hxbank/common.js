/* globals BMapGL Clipboard*/
function createPolyInstance(map, instanceType, options) {
    options = options || {};
    var zoomPolygons = {
        data: {},
        disableEdit: options.disableEdit,
        instanceType: instanceType,
        enableZooms: {},
        zoomLevel: getZoom(),
        currentEdit: null,
        auto: false,
        init() {
            map.addEventListener('click', e => {
                this.disableEditing();
            });
            map.addEventListener('zoomend', e => {
                if (this.zoomLevel !== getZoom()) {
                    this.zoomLevel = getZoom();
                    document.getElementById('result').innerHTML = '';
                    document.getElementById('zoom-value').innerHTML = this.zoomLevel;
                    if (this.auto) {
                        this.enableAuto();
                    }
                }
            });
            $(document).keydown(e => {
                if ((e.which === 8 || e.which === 46) && this.currentEdit) {
                    // 找到当前正在编辑的overlay删除
                    Object.keys(this.data).find(key => {
                        let item = this.data[key];
                        for (let i = 0; i < item.length; i++) {
                            if (item[i] === this.currentEdit) {
                                map.removeOverlay(this.currentEdit);
                                this.clearMarkers();
                                document.getElementById('result').innerHTML = '';
                                return item.splice(i, 1);
                            }
                        }
                    });
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
                    } onclick="setEnableZoom(event, ${item}, '${instanceType}')"/>
                    </label>`;
                })
                .join('');
            html += `<label>自动<input type="checkbox" ${
                this.auto ? 'checked' : ''
            } onclick="setEnableZoomAuto(event, '${instanceType}')"/></label>`;
            document.getElementById('zoom-list-' + instanceType).innerHTML = html;
        },
        setData(zoom, polygons) {
            this.data[zoom] = polygons;
            this.enableZooms[zoom] = zoom === this.zoomLevel;
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
        clearMarkers() {},
        clearData() {
            Object.keys(this.data).forEach(key => {
                this.data[key].forEach(item => map.removeOverlay(item));
            });
            this.data = {};
            this.enableZooms = {};
            this.currentEdit = null;
        },
        enableAuto() {
            this.auto = true;
            Object.keys(this.enableZooms).forEach(zoom => {
                if (zoom == this.zoomLevel) {
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
            document.getElementById('result').innerHTML = '';
            this.currentEdit = null;
            Object.keys(this.data).forEach(key => {
                this.data[key].forEach(p => p.disableEditing());
            });
        },
        // 初次创建图层
        createOverlay(points, zoom) {
            zoom = Number(zoom) || getZoom();
            var polygon = null;
            if (this.instanceType === 'polygon') {
                polygon = new BMapGL.Polygon(points, {
                    strokeColor: '#f00'
                });
            } else {
                polygon = new BMapGL.Polyline(points, {
                    strokeColor: '#f00'
                });
            }
            polygon.id = new Date().valueOf();
            polygon.zoomLevel = zoom;
            if (!this.disableEdit) {
                polygon.addEventListener('editend', e => {
                    showResult(e.overlay);
                });
                polygon.addEventListener('click', e => {
                    this.currentEdit = polygon;
                    polygon.enableEditing();
                    showResult(e.target);
                });
            }
            if (getZoom() === zoom) {
                map.addOverlay(polygon);
            }
            let polygons = zoomPolygons.getData(zoom);
            polygons = polygons || [];
            polygons.push(polygon);
            zoomPolygons.setData(zoom, polygons);
            return polygon;
        },
        // 导入数据
        importData() {
            document.getElementById('result').innerHTML = '';
            var tex = document.getElementById('more').value;
            if (!tex) {
                return alert('数据不能为空！');
            }
            this.clearData();
            var data = [];
            try {
                data = JSON.parse(tex);
            } catch (e) {
                alert('解析失败');
            }
            var project = new BMapGL.Projection();
            var allPointArr = [];
            Object.keys(data).forEach(key => {
                if (Number.isNaN(Number(key))) {
                    return;
                }
                var item = data[key];
                var polys = item.split(';');

                for (var j = 0; j < polys.length; j++) {
                    if (!polys[j]) {
                        continue;
                    }
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
                    this.createOverlay(pointArr, key);
                }
            });
            map.setViewport(allPointArr);
        },
        // 导出数据
        exportData() {
            var data = {};
            Object.keys(this.data).forEach(level => {
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
                    .filter(item => !!item)
                    .join(';');
                data[level] = points;
            });
            exportFile(this.instanceType === 'polygon' ? '面数据导出.json' : '线数据导出.json', JSON.stringify(data));
        }
    };
    function getZoom() {
        return Math.ceil(map.getZoom());
    }
    return zoomPolygons;
}
var trigger = document.getElementsByClassName('copyText');
var clipboard = new Clipboard('.btn', {
    target: function (trigger) {
        return trigger.nextElementSibling;
    }
});
clipboard.on('success', function (e) {
    console.log(this);
});

function showResult(overlay) {
    var project = new BMapGL.Projection();
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
    } else if (overlay.toString() === 'Polygon' || overlay.toString() === 'Circle') {
        geojsonStr = {
            type: 'Polygon',
            coordinates: [coordinates]
        };
    }
    document.getElementById('result').innerHTML = `<div> 按delete键或backspace键删除该图层；鼠标右键删除编辑点。</div>
        <div><span>左下角,右上角(经纬度)：</span>
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
function exportFile(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    save_link.click();
}
