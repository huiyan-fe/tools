import Tip from './Tip.js';

function DraggingTip(options) {
    var map = options.map;
    var point = options.point;
    this.point = point;
    var name = options.name;

    this.map = map;
    var tip = this.tip = new Tip(this.point, name, options.color);
    var icon = new BMap.Icon("static/images/drag.png", new BMap.Size(25, 25), {
        imageSize: new BMap.Size(25, 25)
    });
    var marker = this.marker = new BMap.Marker(this.point);
    marker.setIcon(icon);
    marker.setShadow(icon);
    var self = this;
    marker.addEventListener('dragging', function () {
        self.point = marker.point;
        tip.setPosition(marker.point)
        options.change && options.change();
    });
    marker.enableDragging();
}

DraggingTip.prototype.show = function () {
    this.map.addOverlay(this.marker);
    this.map.addOverlay(this.tip);
}

export default DraggingTip;
