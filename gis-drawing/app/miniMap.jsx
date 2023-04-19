import React from 'react';


var customStyle = [{
    "featureType": "estatelabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#8d694eff"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "lifeservicelabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "lifeservicelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "financelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "financelabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "land",
    "elementType": "geometry",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "building",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#e7dfd6ff"
    }
}, {
    "featureType": "building",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#b9a797ff"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ebe1d8ff"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 28
    }
}, {
    "featureType": "manmade",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#72533aff"
    }
}, {
    "featureType": "manmade",
    "elementType": "geometry",
    "stylers": {
        "color": "#ecececff",
        "visibility": "off"
    }
}, {
    "featureType": "manmade",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 36
    }
}, {
    "featureType": "manmade",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#b6997fff"
    }
}, {
    "featureType": "green",
    "elementType": "geometry",
    "stylers": {
        "color": "#ecececff",
        "visibility": "off"
    }
}, {
    "featureType": "education",
    "elementType": "geometry",
    "stylers": {
        "color": "#ecececff",
        "visibility": "off"
    }
}, {
    "featureType": "medical",
    "elementType": "geometry",
    "stylers": {
        "color": "#ecececff",
        "visibility": "off"
    }
}, {
    "featureType": "scenicspots",
    "elementType": "geometry",
    "stylers": {
        "color": "#ecececff",
        "visibility": "off"
    }
}, {
    "featureType": "entertainment",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "estate",
    "elementType": "geometry",
    "stylers": {
        "color": "#ecececff",
        "visibility": "off"
    }
}, {
    "featureType": "shopping",
    "elementType": "geometry",
    "stylers": {
        "color": "#ecececff",
        "visibility": "off"
    }
}, {
    "featureType": "transportation",
    "elementType": "geometry",
    "stylers": {
        "color": "#ecececff",
        "visibility": "off"
    }
}, {
    "featureType": "transportation",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#72533aff"
    }
}, {
    "featureType": "transportation",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#b6997fff"
    }
}, {
    "featureType": "transportation",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 36
    }
}, {
    "featureType": "medical",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#72533aff"
    }
}, {
    "featureType": "medical",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#b6997fff"
    }
}, {
    "featureType": "medical",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 36
    }
}, {
    "featureType": "education",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#72533aff"
    }
}, {
    "featureType": "education",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#b6997fff"
    }
}, {
    "featureType": "education",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 36
    }
}, {
    "featureType": "carservicelabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "carservicelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "companylabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "airportlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "airportlabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 36
    }
}, {
    "featureType": "airportlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#72533aff"
    }
}, {
    "featureType": "airportlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#b6997fff"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 28
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#4a4a4aff"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#8d694eff"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ebe1d8ff"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 26
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#8d694eff"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ebe1d8ff"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 24
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ebe1d8ff"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#8d694eff"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 24
    }
}, {
    "featureType": "companylabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#8d694eff"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ebe1d8ff"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 24
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#8d694eff"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ebe1d8ff"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#4a4a4aff"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 24
    }
}, {
    "featureType": "scenicspots",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#72533aff"
    }
}, {
    "featureType": "scenicspots",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#b6997fff"
    }
}, {
    "featureType": "scenicspots",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 36
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#4a4a4aff"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "district",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "district",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#72533aff",
        "weight": 3.5
    }
}, {
    "featureType": "town",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#72533aff",
        "weight": 3
    }
}, {
    "featureType": "town",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "village",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff",
        "weight": 2.5
    }
}, {
    "featureType": "village",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#72533aff",
        "weight": 40
    }
}, {
    "featureType": "village",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 20
    }
}, {
    "featureType": "highway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#fdf0daff"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffd993ff"
    }
}, {
    "featureType": "highway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#000000ff"
    }
}, {
    "featureType": "highway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#fdf0daff"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffd993ff"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#000000ff"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "provincialway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#ffd993ff"
    }
}, {
    "featureType": "provincialway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#fdf0daff"
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#000000ff"
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "subway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#f5a117ff"
    }
}, {
    "featureType": "manmade",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "building",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "subwaystation",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "poilabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "village",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "town",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "district",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "city",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "roadarrow",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "subwaylabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "subwaylabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "tertiarywaysign",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "tertiarywaysign",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "provincialwaysign",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "provincialwaysign",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "highwaysign",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "highwaysign",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "subway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "railway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "vacationway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "universityway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "scenicspotsway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "local",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "local",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "local",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "airportlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "continent",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "country",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "city",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "highway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "arterial",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "arterial",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "nationalwaysign",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "districtlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "districtlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "water",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "education",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "medical",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "scenicspots",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "transportation",
    "elementType": "labels",
    "stylers": {
        "visibility": "off"
    }
}];

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
        var map = window.miniMap = new BMap.Map(this.refs.miniMap, {
            enableMapClick: false,
        });    // 创建Map实例
        var centerPoint = new BMap.Point(116.034832, 12.937306);
        map.centerAndZoom(centerPoint, 4);  // 初始化地图,设置中心点坐标和地图级别
        map.setViewport([
            {
                lng: 106.54182718365324,
                lat: 0.4547390703322879,
            },
            {
                lng: 124.86553482037648,
                lat: 24.551090982312914,
            }
        ], {
            margins: [20, 0, 0, 20]
        });
        map.getContainer().style.zIndex = 1;
        map.disableScrollWheelZoom(); // 开启鼠标滚轮缩放
        map.enableMapClick(false); // 开启鼠标滚轮缩放
        map.disableDragging();
        map.disableInertialDragging();
        map.disableContinuousZoom();
        map.disableDoubleClickZoom();
        map.disablePinchToZoom();
        map.setMapStyleV2({
            styleJson: customStyle
        });

    }

    render() {
        return (
            <div className={this.props.showMiniMap ? "miniMap" : "miniMap hide"} ref='miniMap'></div>
        )
    }
}

export default App;
