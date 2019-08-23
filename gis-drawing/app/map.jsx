import React from 'react';

class App extends React.Component {
    constructor(args) {
        super(args);
        this.state = {}
    }

    componentDidMount() {
        this.initMap();
    }

    initMap() {

        // 百度地图API功能
        var map = window.map = new BMap.Map(this.refs.map, {
            enableMapClick: true
        });    // 创建Map实例
        map.getContainer().style.zIndex = 1;
        map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        var navigation = new BMap.NavigationControl();  //左上角，添加默认缩放平移控件
        map.addControl(navigation);

        /*
        map.setMapStyle({
            style: 'light'
        });
        */

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
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": {
                              "color": "#999999ff"
                    }
          }
]
        });

    }

    render() {
        return (
            <div className="map" ref="map"></div>
        )
    }
}

export default App;
