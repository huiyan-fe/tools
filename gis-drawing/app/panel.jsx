import React from 'react';
import RouteList from './routelist.jsx';
import DraggingTip from './map/DraggingTip.js';
import DraggingLabel from './map/DraggingLabel.js';
import center from './center.js';

var pt = new BMap.Point(131.733142,  23.226515);
var jiuduanwidth = 227;
var jiuduanheight = 338;
var scale = 2.5;

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
        "visibility": "on"
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

var chuxingStyle = [{
    "featureType": "land",
    "elementType": "geometry",
    "stylers": {
        "color": "#f5f6f7ff"
    }
}, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": {
        "color": "#c4d7f5ff"
    }
}, {
    "featureType": "green",
    "elementType": "geometry",
    "stylers": {
        "color": "#dcf2d5ff"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#ffe59eff"
    }
}, {
    "featureType": "highway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#f5d48cff"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#fff6ccff"
    }
}, {
    "featureType": "provincialway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#fff6ccff"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#fff6ccff"
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#fff6ccff"
    }
}, {
    "featureType": "nationalway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#f2dc9dff"
    }
}, {
    "featureType": "provincialway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#f2dc9dff"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#f2dc9dff"
    }
}, {
    "featureType": "arterial",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#f2dc9dff"
    }
}, {
    "featureType": "building",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#e6ebf0ff"
    }
}, {
    "featureType": "building",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#d8e2ebff"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#dfe4ebff"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#dfe4ebff"
    }
}, {
    "featureType": "local",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "local",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#dfe4ebff"
    }
}, {
    "featureType": "scenicspotsway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "scenicspotsway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#dfe4ebff"
    }
}, {
    "featureType": "universityway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#dfe4ebff"
    }
}, {
    "featureType": "universityway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "vacationway",
    "elementType": "geometry.stroke",
    "stylers": {
        "color": "#dfe4ebff"
    }
}, {
    "featureType": "vacationway",
    "elementType": "geometry.fill",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "town",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 18
    }
}, {
    "featureType": "town",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "town",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "highway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#c0792dff"
    }
}, {
    "featureType": "highway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#c0792dff"
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff60"
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#c0792dff"
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#c0792dff"
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "arterial",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "arterial",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#c0792dff"
    }
}, {
    "featureType": "arterial",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 24
    }
}, {
    "featureType": "cityhighway",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 24
    }
}, {
    "featureType": "provincialway",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 24
    }
}, {
    "featureType": "nationalway",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 24
    }
}, {
    "featureType": "highway",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 24
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.icon",
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
    "featureType": "businesstowerlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "companylabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "companylabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "companylabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "restaurantlabel",
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
    "featureType": "hotellabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "lifeservicelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "lifeservicelabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "lifeservicelabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "carservicelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "carservicelabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "carservicelabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "financelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "financelabel",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "financelabel",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "tertiaryway",
    "elementType": "labels.icon",
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
    "featureType": "fourlevelway",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "fourlevelway",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "local",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "local",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "local",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "companylabel",
    "elementType": "labels",
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
    "featureType": "carservicelabel",
    "elementType": "labels",
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
    "featureType": "scenicspotslabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "manmade",
    "elementType": "geometry",
    "stylers": {
        "color": "#f5f6f7ff"
    }
}, {
    "featureType": "subway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "12,13",
        "level": "12"
    }
}, {
    "featureType": "subway",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "12,13",
        "level": "13"
    }
}, {
    "featureType": "subway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,13",
        "level": "12"
    }
}, {
    "featureType": "subway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,13",
        "level": "13"
    }
}, {
    "featureType": "subwaylabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,13",
        "level": "13"
    }
}, {
    "featureType": "subwaylabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,13",
        "level": "13"
    }
}, {
    "featureType": "subwaylabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,13",
        "level": "13"
    }
}, {
    "featureType": "railway",
    "elementType": "geometry",
    "stylers": {
        "visibility": "off"
    }
}, {
    "featureType": "scenicspotslabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "10"
    }
}, {
    "featureType": "scenicspotslabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "11"
    }
}, {
    "featureType": "scenicspotslabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "12"
    }
}, {
    "featureType": "scenicspotslabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "13"
    }
}, {
    "featureType": "scenicspotslabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "14"
    }
}, {
    "featureType": "scenicspotslabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "15"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "10"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "11"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "12"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "13"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "14"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "15"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "10"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "11"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "12"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "13"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "14"
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "10,15",
        "level": "15"
    }
}, {
    "featureType": "district",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "district",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "city",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "city",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "city",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "country",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "country",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "continent",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#a77726ff"
    }
}, {
    "featureType": "continent",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "medicallabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "13"
    }
}, {
    "featureType": "medicallabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "14"
    }
}, {
    "featureType": "medicallabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "15"
    }
}, {
    "featureType": "medicallabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "16"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "13"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "14"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "15"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "16"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "13"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "14"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "15"
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "16"
    }
}, {
    "featureType": "entertainmentlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "12"
    }
}, {
    "featureType": "entertainmentlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "13"
    }
}, {
    "featureType": "entertainmentlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "14"
    }
}, {
    "featureType": "entertainmentlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "15"
    }
}, {
    "featureType": "entertainmentlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "16"
    }
}, {
    "featureType": "entertainmentlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "17"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "12"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "13"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "14"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "15"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "16"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "17"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "12"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "13"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "14"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "15"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "16"
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,17",
        "level": "17"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 23
    }
}, {
    "featureType": "estatelabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "13"
    }
}, {
    "featureType": "estatelabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "14"
    }
}, {
    "featureType": "estatelabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "15"
    }
}, {
    "featureType": "estatelabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "16"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "13"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "14"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "15"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "16"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "13"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "14"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "15"
    }
}, {
    "featureType": "estatelabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,16",
        "level": "16"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 23
    }
}, {
    "featureType": "businesstowerlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "12,16",
        "level": "12"
    }
}, {
    "featureType": "businesstowerlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "12,16",
        "level": "13"
    }
}, {
    "featureType": "businesstowerlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "12,16",
        "level": "14"
    }
}, {
    "featureType": "businesstowerlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "12,16",
        "level": "15"
    }
}, {
    "featureType": "businesstowerlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "12,16",
        "level": "16"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,16",
        "level": "12"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,16",
        "level": "13"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,16",
        "level": "14"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,16",
        "level": "15"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,16",
        "level": "16"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,16",
        "level": "12"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,16",
        "level": "13"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,16",
        "level": "14"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,16",
        "level": "15"
    }
}, {
    "featureType": "businesstowerlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,16",
        "level": "16"
    }
}, {
    "featureType": "governmentlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,17",
        "level": "13"
    }
}, {
    "featureType": "governmentlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,17",
        "level": "14"
    }
}, {
    "featureType": "governmentlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,17",
        "level": "15"
    }
}, {
    "featureType": "governmentlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,17",
        "level": "16"
    }
}, {
    "featureType": "governmentlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,17",
        "level": "17"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,17",
        "level": "13"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,17",
        "level": "14"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,17",
        "level": "15"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,17",
        "level": "16"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,17",
        "level": "17"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,17",
        "level": "13"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,17",
        "level": "14"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,17",
        "level": "15"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,17",
        "level": "16"
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,17",
        "level": "17"
    }
}, {
    "featureType": "restaurantlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "13"
    }
}, {
    "featureType": "restaurantlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "14"
    }
}, {
    "featureType": "restaurantlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "15"
    }
}, {
    "featureType": "restaurantlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "16"
    }
}, {
    "featureType": "restaurantlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "17"
    }
}, {
    "featureType": "restaurantlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "18"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "13"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "14"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "15"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "16"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "17"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "18"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "13"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "14"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "15"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "16"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "17"
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "13,18",
        "level": "18"
    }
}, {
    "featureType": "hotellabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "14,16",
        "level": "14"
    }
}, {
    "featureType": "hotellabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "14,16",
        "level": "15"
    }
}, {
    "featureType": "hotellabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "14,16",
        "level": "16"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 22,
        "curZoomRegionId": "0",
        "curZoomRegion": "14,16",
        "level": "14"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 22,
        "curZoomRegionId": "0",
        "curZoomRegion": "14,16",
        "level": "15"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 22,
        "curZoomRegionId": "0",
        "curZoomRegion": "14,16",
        "level": "16"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "14,16",
        "level": "14"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "14,16",
        "level": "15"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "14,16",
        "level": "16"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "14,16",
        "level": "14"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "14,16",
        "level": "15"
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "14,16",
        "level": "16"
    }
}, {
    "featureType": "shoppinglabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "11"
    }
}, {
    "featureType": "shoppinglabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "12"
    }
}, {
    "featureType": "shoppinglabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "13"
    }
}, {
    "featureType": "shoppinglabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "14"
    }
}, {
    "featureType": "shoppinglabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "15"
    }
}, {
    "featureType": "shoppinglabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "16"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "11"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "12"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "13"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "14"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "15"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "16"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "11"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "12"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "13"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "14"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "15"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,16",
        "level": "16"
    }
}, {
    "featureType": "shoppinglabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 23
    }
}, {
    "featureType": "hotellabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 23
    }
}, {
    "featureType": "restaurantlabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 23
    }
}, {
    "featureType": "governmentlabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 23
    }
}, {
    "featureType": "companylabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 24
    }
}, {
    "featureType": "entertainmentlabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 23
    }
}, {
    "featureType": "medicallabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 23
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 23
    }
}, {
    "featureType": "scenicspotslabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 23
    }
}, {
    "featureType": "airportlabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 23
    }
}, {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffffff"
    }
}, {
    "featureType": "manmade",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#9ca0a3ff"
    }
}, {
    "featureType": "manmade",
    "elementType": "labels.text.stroke",
    "stylers": {
        "color": "#ffffff00"
    }
}, {
    "featureType": "education",
    "elementType": "labels",
    "stylers": {
        "visibility": "on"
    }
}, {
    "featureType": "transportationlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "12,13",
        "level": "12"
    }
}, {
    "featureType": "transportationlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "12,13",
        "level": "13"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,13",
        "level": "12"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,13",
        "level": "13"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,13",
        "level": "12"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "12,13",
        "level": "13"
    }
}, {
    "featureType": "educationlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "11,14",
        "level": "11"
    }
}, {
    "featureType": "educationlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "11,14",
        "level": "12"
    }
}, {
    "featureType": "educationlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "11,14",
        "level": "13"
    }
}, {
    "featureType": "educationlabel",
    "stylers": {
        "curZoomRegionId": "0",
        "curZoomRegion": "11,14",
        "level": "14"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,14",
        "level": "11"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,14",
        "level": "12"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,14",
        "level": "13"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,14",
        "level": "14"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,14",
        "level": "11"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,14",
        "level": "12"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,14",
        "level": "13"
    }
}, {
    "featureType": "educationlabel",
    "elementType": "labels.icon",
    "stylers": {
        "visibility": "off",
        "curZoomRegionId": "0",
        "curZoomRegion": "11,14",
        "level": "14"
    }
}, {
    "featureType": "transportationlabel",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 23
    }
}, {
    "featureType": "manmade",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 23
    }
}, {
    "featureType": "scenicspots",
    "elementType": "labels.text.fill",
    "stylers": {
        "color": "#ab76b6ff"
    }
}, {
    "featureType": "scenicspots",
    "elementType": "labels.text",
    "stylers": {
        "fontsize": 23
    }
}]

class App extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            isShowTipArrow: false,
            isShowRoadLabel: false,
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
                var cityName = points[0].replace('市', '');
                var cityCenter = mapv.utilCityCenter.getCenterByCityName(cityName);
                if (cityName === '额济纳旗') {
                    cityCenter = {
                        lng: 101.063764,
                        lat: 41.960646
                    }
                }
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
                    map.setMapStyleV2({
                        styleJson: chuxingStyle
                    });
                } else {
                    map.setMapStyleV2({
                        styleJson: customStyle
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
