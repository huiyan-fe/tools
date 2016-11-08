// init map

var map = new BMap.Map('mapWarp');

var pt = new BMap.Point(116.404, 39.915);

map.centerAndZoom(pt, 16);

map.enableScrollWheelZoom();//开启滚动缩放
map.enableContinuousZoom();//开启缩放平滑

// 百度地图API功能
// var map = new BMap.Map('map');
// var poi = new BMap.Point(116.307852, 40.057031);
// map.centerAndZoom(poi, 16);
map.enableScrollWheelZoom();


var styleOptions = {
    strokeColor: ['#fd3e73', '#ff6626', '#545d7c', '#b7db61', '#b775af','#e2443f','#ffe56e','#79cce6'],
    fillColor: ["rgba(255,94,94,0.5)",'rgba(255,101,37,0.5)', 'rgba(84,93,124,0.5)', 'rgba(183,219,97,0.5)', 'rgba(183,117,175,0.5)','rgba(226,68,63,0.5)','rgba(255,229,110,0.5)','rgba(121,204,230,0.5)'],
    strokeWeight: 3,  //边线的宽度，以像素为单位。
}
var colorBlock = new BMapLib.ColorBlock(map, {
    enableDrawingTool: true,
    polygonOptions: styleOptions
});


function polygonCallback(result) {
    var rs = result[result.length - 1];
    var path = rs.polygons[0];
    var mercatorProjection = map.getMapType().getProjection();
    var pathStr = "";
    var pathmcStr = "";
    for (var i = 0; i < path.length; i++) {
        pathStr += path[i].lng + "," + path[i].lat + ",";
        var mc = mercatorProjection.lngLatToPoint(path[i]);
        pathmcStr += mc.x + "," + mc.y + ",";
    }
    pathmcStr = pathmcStr.substr(0, pathmcStr.length - 1);
    pathStr = pathStr.substr(0, pathStr.length - 1);
    document.getElementById('result').innerHTML = "<div><span>坐标集(经纬度)：</span><p class='copyText'>" + pathStr + "</p></div>"
                                                 + "<div><span>坐标集(墨卡托坐标)：</span><p class='copyText'>" + pathmcStr + "</p></div>";
}
