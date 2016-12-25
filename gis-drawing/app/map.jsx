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
            enableMapClick: false
        });    // 创建Map实例
        map.getContainer().style.zIndex = 1;
        map.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

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
                        "lightness": 61,
                        "saturation": -70
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
