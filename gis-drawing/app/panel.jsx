import React from 'react';
import RouteList from './routelist.jsx';
import DraggingTip from './map/DraggingTip.js';
import DraggingLabel from './map/DraggingLabel.js';
import center from './center.js';

var pt = new BMap.Point(131.733142,  23.226515);
var jiuduanwidth = 492;
var jiuduanheight = 726;
var scale = 5.0;

var jiuduanIcon = new BMap.Icon("./static/images/jiuduanxian.png", new BMap.Size(jiuduanwidth / scale, jiuduanheight / scale), {
    imageSize: new BMap.Size(jiuduanwidth / scale, jiuduanheight / scale)
});

var jiuduanDarkIcon= new BMap.Icon("./static/images/jiuduanxian_dark.png", new BMap.Size(jiuduanwidth / scale, jiuduanheight / scale), {
    imageSize: new BMap.Size(jiuduanwidth / scale, jiuduanheight / scale)
});

var jiuduanxianMarker = new BMap.Marker(pt,{
    icon: jiuduanIcon, 
    enableMassClear: false,
});  // 创建标注

var jiuduanxianDark = new BMap.Marker(pt,{
    icon: jiuduanDarkIcon, 
    enableMassClear: false,
});  // 创建标注


var chinaLayer = null;


$.get('static/china.json', function(geojson) {

    var dataSet = mapv.geojson.getDataSet(geojson);

    var options = {
        fillStyle: 'rgba(218, 218, 218, 1)',
        //fillStyle: '#1495ff',
        //fillStyle: 'lightblue',
        //fillStyle: 'rgba(50, 50, 50, 0.5)',
        //strokeStyle: '#999',
        strokeStyle: 'rgba(255, 255, 255, 1)',
        lineWidth: 1,
        zIndex: 1,
        enableMassClear: false,
        draw: 'simple'
    }

    chinaLayer = new mapv.baiduMapLayer(map, dataSet, options);
    chinaLayer.hide();

    map.addOverlay(jiuduanxianMarker);

});

class App extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            isShowTipArrow: false,
            isShowRoadLabel: true,
            isShowChina: false,
            isShowText: true,
            isShowNumber: true,
            isShowJiuduan: true,
            data: []
        }
        this.updateDataByIndex = this.updateDataByIndex.bind(this);
    }

    componentDidMount() {
    }

    showBoundary() {
        var val = this.refs.boundary.value.split(',');
        for (var i= 0; i < val.length; i++) {
            this.getBoundary(val[i]);
        }
    }

    getBoundary(city) {       
        var bdary = new BMap.Boundary();
        bdary.get(city, function(rs){       //获取行政区域
            var count = rs.boundaries.length; //行政区域的点有多少个
            if (count === 0) {
                alert('未能获取当前输入行政区域');
                return ;
            }
            var pointArray = [];
            for (var i = 0; i < count; i++) {
                var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeStyle: 'solid', strokeOpacity: '0', fillOpacity: '0.1', fillColor: 'red', strokeColor: "red"}); //建立多边形覆盖物
                map.addOverlay(ply);  //添加覆盖物
                pointArray = pointArray.concat(ply.getPath());
            }    
        });   
    }

    addData() {
        var self = this;
        var project = map.getMapType().getProjection();
        var tex = this.refs.textarea.value;
        var pointArrs = [];
        var data = this.state.data;
        var point = null;
        var lines = tex.split(";");
        if (tex.split(";;").length > 1) {
            lines = tex.split(";;");
        }
        for (var j = 0; j < lines.length; j++) {
            var item = lines[j].split("|");
            var list = item[0];
            list = list.replace(/;/g, ',');
            var points = list.split(",");
            var pointArr = [];
            var coordinates = [];
            if (points.length > 1) {
                for (var i = 0; i < points.length; i += 2) {
                    if (points[i] > 10000) {
                        point = project.pointToLngLat(new BMap.Pixel(points[i], points[i+1]));
                    } else {
                        point = new BMap.Point(points[i], points[i+1]);
                    }
                    var isExist = false;
                    for (var z = 0; z < pointArr.length; z++) {
                        if (point.lng == pointArr[z].lng && point.lat == pointArr[z].lat) {
                            isExist = true;
                        }
                    }
                    if (!isExist) {
                        pointArr.push(point);
                        pointArrs.push(point);
                    }
                }
            } else {
                var cityCenter = mapv.utilCityCenter.getCenterByCityName(points[0].replace('市', ''));
                if (cityCenter) {
                    var point = new BMap.Point(cityCenter.lng, cityCenter.lat);
                } else {
                    cityCenter = center[points[0]];
                    if (cityCenter) {
                        var point = new BMap.Point(cityCenter[0], cityCenter[1]);
                    } else {
                        console.log(points[0]);
                    }
                }

                pointArr.push(point);
                pointArrs.push(point);
            }
            
            data.push({
                points: pointArr,
                strokeColor: 'red',
                strokeWeight: 3,
                tipColor: 'rgb(255, 111, 0)',
                index: j + 1,
                isNumberLeft: true,
                textPoint: pointArr[~~(pointArr.length / 2)],
                startPoint: pointArr[0],
                endPoint: pointArr[pointArr.length - 1],
                isShowArrow: false,
                isShowText: true,
                isShowNumber: true,
                name: item[1],
                startName: item[2],
                endName: item[3]
            });
        }
        if (pointArrs.length == lines.length) {
            this.addPoints(pointArrs);
        }
        this.setState({
            data: data
        }, function() {
            self.renderRoads();
        });
        map.setViewport(pointArrs);
    }

    clearRoads() {
        map.clearOverlays();
    }

    addPoints(pointArrs) {
        var data = [];
        for (var i = 0; i < pointArrs.length; i++) {
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates: [pointArrs[i].lng, pointArrs[i].lat]
                }
            });
        }

        var dataSet = new mapv.DataSet(data);

        var options = {
            fillStyle: 'rgb(255, 111, 0)',
            enableMassClear: false,
            shadowColor: 'rgba(55, 50, 50, 0.3)',
            shadowBlur: 20,
            strokeStyle: 'white',
            lineWidth: 2,
            zIndex: 2,
            size: 6,
            draw: 'simple'
        }

        var mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
    }

    renderRoads() {
        var self = this;
        this.clearRoads();
        var data = this.state.data;
        for (var i = 0; i < data.length; i++) {
            map.addOverlay(new BMap.Polyline(data[i].points, {
                strokeColor: data[i].strokeColor || 'red',
                strokeOpacity: 1,
                strokeWeight: data[i].strokeWeight || 3
            }));

            if (data[i].isShowArrow) {
                //getDirection(data[i].points, ~~(data[i].points.length / 3));
                //getDirection(data[i].points, ~~(data[i].points.length / 3 * 2));
                var index = ~~(data[i].points.length / 2);
                if (index >= data[i].points.length - 1) {
                    index = data[i].points.length - 2;
                }
                getDirection(data[i].points, index);
            }

            if (data[i].isShowText) {
                (function(i){
                    if (data[i].name) {
                        var tip = new DraggingTip({
                            isShowTipArrow: self.state.isShowTipArrow,
                            map: map,
                            point: data[i].textPoint,
                            name: data[i].name,
                            index: data[i].index,
                            color: data[i].tipColor,
                            change: function() {
                                data[i].textPoint = tip.point;
                            }
                        });
                        tip.show();

                        if (!data[i].isNumberLeft) {
                            tip.setNumberRight();
                        }
                        if (!data[i].isShowNumber) {
                            tip.hideNumber();
                        }
                    }

                    if (data[i].startName) {
                        var start = new DraggingLabel({
                            map: map,
                            point: data[i].startPoint,
                            name: data[i].startName,
                            change: function() {
                                data[i].startPoint = start.point;
                            }
                        });
                        start.show();
                    }

                    if (data[i].endName) {
                        var end = new DraggingLabel({
                            map: map,
                            point: data[i].endPoint,
                            name: data[i].endName,
                            change: function() {
                                data[i].endPoint = end.point;
                            }
                        });
                        end.show();
                    }

                })(i);
            }

        }
    }

    updateDataByIndex(index, params) {
        var self = this;
        var data = this.state.data;
        var item = data[index];
        for (var key in params) {
            item[key] = params[key];
        }

        this.setState({
            data: data
        }, function() {
            this.renderRoads();
        });
    }

    changeTipArrow(flag) {
        var self = this;
        var data = this.state.data;
        for (var i = 0; i < data.length; i++) {
            data[i].isShowArrow = flag;
        }

        this.setState({
            data: data,
        }, function() {
            this.renderRoads();
        });
    }

    showRoadLabel(flag) {
        var self = this;

        this.setState({
            isShowRoadLabel: flag
        }, this.changeMapStyle.bind(this));
    }

    changeBackground(flag) {
        var self = this;

        this.setState({
            isDark: flag
        }, this.changeMapStyle.bind(this));
    }

    showChina(flag) {
        var self = this;

        this.setState({
            isShowChina: flag
        }, this.changeMapStyle.bind(this));
    }

    changeMapStyle() {
        if (this.state.isShowChina) {
            map.setMapStyle({
                styleJson: [
              {
                        "featureType": "all",
                        "elementType": "all",
                        "stylers": {
                                  "visibility": "off"
                        }
              }
            ]
            });
            map.getContainer().style.background = '#fff';
            chinaLayer && chinaLayer.show();
        } else {
            chinaLayer && chinaLayer.hide();
            if (this.state.isDark) {
                map.setMapStyle({
                    style: 'midnight'
                });
            } else {
                if (this.state.isShowRoadLabel) {
                    map.setMapStyle({
                        styleJson: [
                      {
                                "featureType": "all",
                                "elementType": "all",
                                "stylers": {
                                          "lightness": 40,
                                          "saturation": -70
                                }
                      },
                      {
                                "featureType": "road",
                                "elementType": "labels",
                                "stylers": {
                                          "visibility": "on"
                                }
                      },
                      {
                                "featureType": "poi",
                                "elementType": "all",
                                "stylers": {
                                          "visibility": "off"
                                }
                      }
                    ]
                    });
                } else {
                    map.setMapStyle({
                        styleJson: [
          {
                    "featureType": "all",
                    "elementType": "all",
                    "stylers": {
                              "lightness": 40,
                              "saturation": -70
                    }
          },
          {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": {
                              "visibility": "off"
                    }
          },
          {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": {
                              "visibility": "off"
                    }
          },
          {
                    "featureType": "all",
                    "elementType": "labels",
                    "stylers": {
                              "visibility": "off"
                    }
          },
          {
                    "featureType": "0602",
                    "elementType": "geometry.fill",
                    "stylers": {
                              "visibility": "on"
                    }
          },
          {
                    "featureType": "boundary",
                    "elementType": "geometry.fill",
                    "stylers": {
                              "color": "#666666ff",
                              "visibility": "on"
                    }
          },
          {
                    "featureType": "land",
                    "elementType": "geometry.fill",
                    "stylers": {
                              "color": "#f3f3f3ff"
                    }
          },
          {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": {
                              "color": "#b6dcf7ff",
                              "lightness": 1,
                              "saturation": 1,
                              "visibility": "on"
                    }
          }
]
                    });
                }



            }
            
        }

        this.showJiuduan();
        
    }

    changeText(flag) {
        var self = this;
        var data = this.state.data;
        for (var i = 0; i < data.length; i++) {
            data[i].isShowText = flag;
        }

        this.setState({
            data: data,
            isShowText: flag
        }, function() {
            this.renderRoads();
        });
    }

    changeNumber(flag) {
        var self = this;
        var data = this.state.data;
        for (var i = 0; i < data.length; i++) {
            data[i].isShowNumber = flag;
        }

        this.setState({
            data: data,
            isShowNumber: flag
        }, function() {
            this.renderRoads();
        });
    }

    changeJiuduan(flag) {
        var self = this;
        var data = this.state.data;

        this.setState({
            isShowJiuduan: flag
        }, function() {
            this.showJiuduan();
        });
    }

    showJiuduan() {
        map.removeOverlay(jiuduanxianMarker);
        map.removeOverlay(jiuduanxianDark);
        if (this.state.isShowJiuduan) {
            if (this.state.isDark) {
                map.addOverlay(jiuduanxianDark);
            } else {
                map.addOverlay(jiuduanxianMarker);
            }
        } 
    }

    changeStrokeWeight() {
        var self = this;
        var data = this.state.data;
        for (var i = 0; i < data.length; i++) {
            data[i].strokeWeight = this.refs.strokeWeight.value;
        }

        this.setState({
            data: data
        }, function() {
            this.renderRoads();
        });
    }


    render() {
        return (
            <div className="panel">
                <div className="inner">
                    <textarea ref="textarea" style={{height: '100px',width:'100%',border:'1px solid #999'}} className="" placeholder="116.330484,40.031406,116.33124,40.029496,116.33124,40.029496|高速公路;116.330484,40.031406,116.33124,40.029496,116.33124,40.029496|高速公路"></textarea>
                    <a className="waves-effect waves-light btn" onClick={this.addData.bind(this)}>添加道路或点数据</a>
                </div>
                <div className="switch">
                    <label>
                      显示详细地图
                      <input type="checkbox" checked={this.state.isShowChina} onClick={this.showChina.bind(this, !this.state.isShowChina)}/>
                      <span className="lever"></span>
                      显示全国地图
                    </label>
                </div>
                <div className="switch">
                    <label>
                      浅色底图
                      <input type="checkbox" checked={this.state.isDark} onClick={this.changeBackground.bind(this, !this.state.isDark)}/>
                      <span className="lever"></span>
                      深色底图
                    </label>
                </div>
                <div className="switch">
                    <label>
                      隐藏底图道路名
                      <input type="checkbox" checked={this.state.isShowRoadLabel} onClick={this.showRoadLabel.bind(this, !this.state.isShowRoadLabel)}/>
                      <span className="lever"></span>
                      显示底图道路名
                    </label>
                </div>
                <div className="switch">
                    <label>
                      隐藏tip箭头
                      <input type="checkbox" checked={this.state.isShowTipArrow} onClick={this.changeTipArrow.bind(this, !this.state.isShowTipArrow)}/>
                      <span className="lever"></span>
                      显示tip箭头
                    </label>
                </div>
                <div className="switch">
                    <label>
                      隐藏所有文本
                      <input type="checkbox" checked={this.state.isShowText} onClick={this.changeText.bind(this, !this.state.isShowText)}/>
                      <span className="lever"></span>
                      显示所有文本
                    </label>
                </div>
                <div className="switch">
                    <label>
                      隐藏编号
                      <input type="checkbox" checked={this.state.isShowNumber} onClick={this.changeNumber.bind(this, !this.state.isShowNumber)}/>
                      <span className="lever"></span>
                      显示编号
                    </label>
                </div>
                <div className="switch">
                    <label>
                      隐藏九段线
                      <input type="checkbox" checked={this.state.isShowJiuduan} onClick={this.changeJiuduan.bind(this, !this.state.isShowJiuduan)}/>
                      <span className="lever"></span>
                      显示九段线
                    </label>
                </div>
                <div>
                    线宽
                    <p className="range-field">
                        <input ref="strokeWeight" type="range" min="0" max="25" onChange={this.changeStrokeWeight.bind(this)} defaultValue='3'/>
                    </p>
                </div>
                <RouteList data={this.state.data} updateDataByIndex={this.updateDataByIndex}/>
                <div className="inner">
                    <input ref="boundary" className="" defaultValue="北京市,河北省,天津市"/><a className="waves-effect waves-light btn" onClick={this.showBoundary.bind(this)}>添加边界</a>
                </div>
            </div>
        )
    }
}

function getDirection(points, i) {
    var project = map.getMapType().getProjection();
    var icon = new BMap.Icon("static/images/direction.png", new BMap.Size(20, 20), {
        imageSize: new BMap.Size(20, 20)
    });

    var curIndex = i;
    var curPos = points[curIndex];
    var marker = new BMap.Marker(curPos);
    // marker.enableDragging();
    map.addOverlay(marker);
    marker.enableDragging();
    marker.setIcon(icon);
    marker.setShadow(icon);
    var targetPos = points[curIndex + 1]; 
    var curPos =  project.lngLatToPoint(curPos);
    var targetPos =  project.lngLatToPoint(targetPos);   


    if(targetPos.x != curPos.x){
        var tan =  - (targetPos.y - curPos.y)/(targetPos.x - curPos.x),
        atan  = Math.atan(tan);
        var deg = atan * 360 / (2 * Math.PI);
        // degree  correction;
        if(targetPos.x < curPos.x){
            deg = -deg + 90 + 90;
        } else {
            deg = -deg;
        }
        marker.setRotation(-deg);   
    }else {
        var disy = - (targetPos.y- curPos.y) ;
        var bias = 0;
        if(disy > 0)
            bias=-1
        else
            bias = 1
        marker.setRotation(-bias * 90);  
    }
    return marker;
}


export default App;
