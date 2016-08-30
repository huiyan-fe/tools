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

function addDirection(points, i) {
    var icon = new BMap.Icon("static/images/direction.png", new BMap.Size(20, 20), {
        imageSize: new BMap.Size(20, 20)
    });

    var curIndex = i;
    var curPos = points[curIndex];
    var marker = new BMap.Marker(curPos);
    map.addOverlay(marker);
    marker.setIcon(icon);
    marker.setShadow(icon);
    var targetPos = points[curIndex + 1]; 
    var curPos =  map.pointToPixel(curPos);
    var targetPos =  map.pointToPixel(targetPos);   


    if(targetPos.x != curPos.x){
        var tan = (targetPos.y - curPos.y)/(targetPos.x - curPos.x),
        atan  = Math.atan(tan);
        deg = atan*360/(2*Math.PI);
        //degree  correction;
        if(targetPos.x < curPos.x){
            deg = -deg + 90 + 90;

        } else {
            deg = -deg;
        }

        marker.setRotation(-deg);   

    }else {
        var disy = targetPos.y- curPos.y ;
        var bias = 0;
        if(disy > 0)
            bias=-1
        else
            bias = 1
        marker.setRotation(-bias * 90);  
    }
    return marker;
}
