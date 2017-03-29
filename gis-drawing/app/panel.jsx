import React from 'react';
import RouteList from './routelist.jsx';
import DraggingTip from './map/DraggingTip.js';
import DraggingLabel from './map/DraggingLabel.js';

class App extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            isShowTipArrow: false,
            isShowText: true,
            data: []
        }
        this.updateDataByIndex = this.updateDataByIndex.bind(this);
    }

    componentDidMount() {
    }

    addData() {
        var self = this;
        var project = map.getMapType().getProjection();
        var tex = this.refs.textarea.value;
        var pointArrs = [];
        var data = this.state.data;
        var point = null;
        var lines = tex.split(";");
        console.log('lines.length', lines.length);
        for (var j = 0; j < lines.length; j++) {
            var item = lines[j].split("|");
            var list = item[0];
            var points = list.split(",");
            var pointArr = [];
            var coordinates = [];
            for (var i = 0; i < points.length; i += 2) {
                if (points[i] > 10000) {
                    point = project.pointToLngLat(new BMap.Pixel(points[i], points[i+1]));
                } else {
                    point = new BMap.Point(points[i], points[i+1]);
                }
                pointArr.push(point);
                pointArrs.push(point);
            }
            data.push({
                points: pointArr,
                strokeColor: 'red',
                strokeWeight: 5,
                tipColor: '#ee5d5b',
                textPoint: pointArr[~~(pointArr.length / 2)],
                startPoint: pointArr[0],
                endPoint: pointArr[pointArr.length - 1],
                isShowArrow: false,
                isShowText: true,
                name: item[1],
                startName: item[2],
                endName: item[3]
            });
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

    renderRoads() {
        var self = this;
        this.clearRoads();
        var data = this.state.data;
        for (var i = 0; i < data.length; i++) {
            map.addOverlay(new BMap.Polyline(data[i].points, {
                strokeColor: data[i].strokeColor || 'red',
                strokeWeight: data[i].strokeWeight || 5
            }));

            if (data[i].isShowArrow) {
                //getDirection(data[i].points, ~~(data[i].points.length / 3));
                //getDirection(data[i].points, ~~(data[i].points.length / 3 * 2));
                getDirection(data[i].points, ~~(data[i].points.length / 2));
            }

            if (data[i].isShowText) {
                (function(i){
                    if (data[i].name) {
                        var tip = new DraggingTip({
                            isShowTipArrow: self.state.isShowTipArrow,
                            map: map,
                            point: data[i].textPoint,
                            name: data[i].name,
                            color: data[i].tipColor,
                            change: function() {
                                data[i].textPoint = tip.point;
                            }
                        });
                        tip.show();
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
            isShowTipArrow: flag
        }, function() {
            this.renderRoads();
        });
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

    render() {
        return (
            <div className="panel">
                <div className="inner">
                    <textarea ref="textarea" style={{height: '100px',width:'100%',border:'1px solid #999'}} className="" placeholder="116.330484,40.031406,116.33124,40.029496,116.33124,40.029496|高速公路"></textarea>
                    <a className="waves-effect waves-light btn" onClick={this.addData.bind(this)}>添加道路</a>
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
                <RouteList data={this.state.data} updateDataByIndex={this.updateDataByIndex}/>
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
    marker.setIcon(icon);
    marker.setShadow(icon);
    var targetPos = points[curIndex + 2]; 
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
