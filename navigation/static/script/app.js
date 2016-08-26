var map = new BMap.Map("map", {
    enableMapClick: false,
});    // 创建Map实例
map.setDefaultCursor('default');
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
map.addControl(new BMap.MapTypeControl({
    anchor: BMAP_ANCHOR_TOP_LEFT
}));   //添加地图类型控件
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
map.panBy(180, 0);

var style = 'grayscale';
map.setMapStyle({style:style});


var local = new BMap.LocalSearch(map, {
    renderOptions:{
        map: map
    },
    onInfoHtmlSet: function (poi, html) {
        var button = $('<div style="text-align:center;"><a class="waves-effect waves-light btn">选为事件地点</a></div>');
        $(html).append(button);
        poi.marker.enableDragging();
    }
});


new Vue({
    el: '#app',
    data: {
    }
})



function addStart(point) {
    var myIcon = new BMap.Icon("static/images/markers.png", new BMap.Size(25,40), {
        imageOffset: new BMap.Size(-200, -139),
        anchor: new BMap.Size(12, 40)
    });
    var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
    map.addOverlay(marker2);              // 将标注添加到地图中
    return marker2;
}

function addEnd(point) {
    var myIcon = new BMap.Icon("static/images/markers.png", new BMap.Size(25,40), {
        imageOffset: new BMap.Size(-225, -139),
        anchor: new BMap.Size(12, 40)
    });
    var marker2 = new BMap.Marker(point,{icon:myIcon});  // 创建标注
    map.addOverlay(marker2);              // 将标注添加到地图中
    return marker2;
}

