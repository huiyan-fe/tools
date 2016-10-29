var map = new BMap.Map("map", {
    enableMapClick: false,
});    // 创建Map实例
map.setDefaultCursor('default');
map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
map.panBy(180, 0);

var style = 'grayscale';

map.setMapStyle({style:style});

module.exports = map;
