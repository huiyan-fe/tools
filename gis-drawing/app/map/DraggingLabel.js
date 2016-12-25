function DraggingTip(options) {
    var map = options.map;
    var point = options.point;
    this.point = point;
    var name = options.name;

    this.map = map;
    var label = this.label = new BMap.Label(name, {
        position : point,    // 指定文本标注所在的地理位置
        offset   : new BMap.Size(0, -20)    //设置文本偏移量
    });  
    label.setStyle({
         fontSize : "12px",
         fontWeight: 'bold',
         height : "20px",
         border: '0',
         background: 'none',
         textShadow: '0px 0px 1px red',
         color: 'black',
         lineHeight : "20px",
         fontFamily:"微软雅黑"
    });
    var icon = new BMap.Icon("static/images/drag.png", new BMap.Size(name.length * 13 || 25, 25), {
        anchor:new BMap.Size(0, 20),
        imageSize: new BMap.Size(name.length * 13 || 25, 25)
    });
    var marker = this.marker = new BMap.Marker(this.point);
    marker.setIcon(icon);
    marker.setShadow(icon);
    var self = this;
    marker.addEventListener('dragging', function () {
        self.point = marker.point;
        label.setPosition(marker.point)
        options.change && options.change();
    });
    marker.enableDragging();
}

DraggingTip.prototype.show = function () {
    this.map.addOverlay(this.marker);
    this.map.addOverlay(this.label);
}

export default DraggingTip;
