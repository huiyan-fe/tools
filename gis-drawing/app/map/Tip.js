function Tip(point, text){
    this._point = point;
    this._text = text;
}

Tip.prototype = new BMap.Overlay();

Tip.prototype.changeColor = function(color){
    var positions = {
        '#ee5d5b': '0 0',
        '#ff9625': '0 -10px',
        '#6caeca': '0 -20px'
    }
    var borderColors = {
        '#ee5d5b': '#BC3B3A',
        '#ff9625': '#c57f1d',
        '#6caeca': '#5188a5'
    }
    this._div.style.backgroundColor = color;
    this._div.style.borderColor = borderColors[color];
    this._arrow.style.backgroundPosition = positions[color];
}

Tip.prototype.initialize = function(map){
    this._map = map;
    var div = this._div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.backgroundColor = "#EE5D5B";
    div.style.border = "1px solid #BC3B3A";
    div.style.color = "white";
    div.style.height = "28px";
    div.style.padding = "5px";
    div.style.whiteSpace = "nowrap";
    div.style.MozUserSelect = "none";
    div.style.fontSize = "12px"
    var span = this._span = document.createElement("span");
    div.appendChild(span);
    span.appendChild(document.createTextNode(this._text));      
    var that = this;

    var arrow = this._arrow = document.createElement("div");
    arrow.style.background = "url(static/images/label.png) no-repeat";
    arrow.style.position = "absolute";
    arrow.style.width = "11px";
    arrow.style.height = "10px";
    arrow.style.top = "26px";
    arrow.style.left = "10px";
    arrow.style.overflow = "hidden";
    div.appendChild(arrow);

    map.getPanes().labelPane.appendChild(div);

    return div;
}

Tip.prototype.setPosition = function(point){
    this._point = point;
    this.draw();
}

Tip.prototype.draw = function(){
    var map = this._map;
    this._span.innerHTML = this._text;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
    this._div.style.top  = pixel.y - 40 + "px";
}

export default Tip;
