function CustomOverlay(point) {
  this.height = 12000 * 4;
  this.width = 50;
  this._point = new window.BMapGL.Point(point.lng, point.lat);
}

CustomOverlay.prototype = new window.BMapGL.Overlay();

CustomOverlay.prototype.setPosition = function (point) {
  this._point = point;
  this.draw();
}

CustomOverlay.prototype.getPixelSize = function () {
  var map = this._map;
  var height = this.height / map.getZoomUnits();
  if (map._webglMapCamera) {
    var bottom = map._webglMapCamera.fromMCToScreenPixel(this._point.lng, this._point.lat, {
      z: 0
    });
    var top = map._webglMapCamera.fromMCToScreenPixel(this._point.lng, this._point.lat, {
      z: this.height
    });
    height = bottom.y - top.y;
  }
  return {
    width: this.width,
    height: height
  };
}


CustomOverlay.prototype.addNumber = function () {
  var html = [];
  var allCount = 24;
  var height = this.getPixelSize().height;
  if (height < 16 * 24) {
    allCount = 12;
  }
  if (height < 8 * 24) {
    allCount = 6;
  }
  if (height < 4 * 24) {
    allCount = 3;
  }
  for (var i = 0; i <= 24; i += 24 / allCount) {
    html.push('<div style="font-size: 16px; color: #fff; height:' + height / allCount + 'px">' + i + ':00</div>');
  }
  this._div.innerHTML = html.join('');
}

CustomOverlay.prototype.initialize = function (map) {
  this._map = map;
  this._div = document.createElement("div");
  this._div.style.width = this.getPixelSize().width + "px";
  this._div.style.height = this.getPixelSize().height + "px";
  this._div.style.backgroundColor = "rgba(0, 0, 100, 0.3)";
  this._div.style.textAlign = "center";
  // this._div.style.boxShadow = "0 0 20px rgba(255, 255, 0, 1)";
  this._div.style.position = "absolute";
  this._div.style.zIndex = window.BMapGL.Overlay.getZIndex(this._point.lat);
  this.addNumber();
  this._div.onmousedown = function (event) {
    event = event || window.event;
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
    return false;
  }
  map.getPanes().floatShadow.appendChild(this._div);
  return this._div;
}

CustomOverlay.prototype.draw = function () {
  var map = this._map;
  var pixel = map.pointToOverlayPixel(this._point);
  this._div.style.left = pixel.x - this.getPixelSize().width - 10 + "px";
  this._div.style.width = this.getPixelSize().width + "px";
  this._div.style.height = this.getPixelSize().height + "px";
  this._div.style.top = pixel.y - this.getPixelSize().height + "px";
  this.addNumber();
}

export default CustomOverlay