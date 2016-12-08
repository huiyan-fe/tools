var map = new BMap.Map("map", {
    enableMapClick: false,
});    // 创建Map实例
map.setDefaultCursor('default');
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
map.addControl(new BMap.MapTypeControl({
    anchor: BMAP_ANCHOR_TOP_LEFT,
    offset: new BMap.Size(450, 10),
}));   //添加地图类型控件
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
map.panBy(180, 0);

var style = 'grayscale';

map.setMapStyle({style:style});

map.addControl(new BMap.CityListControl({
    anchor: BMAP_ANCHOR_TOP_LEFT,
    offset: new BMap.Size(380, 10),
}));

var ctrl = new BMapLib.TrafficControl({
    showPanel: false //是否显示路况提示面板
});      
map.addControl(ctrl);
ctrl.setAnchor(BMAP_ANCHOR_BOTTOM_RIGHT); 

module.exports = map;
