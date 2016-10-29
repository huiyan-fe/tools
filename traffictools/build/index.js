/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var map = __webpack_require__(1);
	__webpack_require__(4);

	new Vue({
	    el: '#app'
	})


/***/ },
/* 1 */
/***/ function(module, exports) {

	var map = new BMap.Map("map", {
	    enableMapClick: false,
	});    // 创建Map实例
	map.setDefaultCursor('default');
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	map.panBy(180, 0);

	var style = 'grayscale';

	map.setMapStyle({style:style});

	module.exports = map;


/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var map = __webpack_require__(1);

	var Panel = Vue.extend({
	    template: '#form-template',
	    data: function () {
	        return {   
	            inputText: '',
	            routes: []
	        }
	    },
	    watch: {
	    },
	    init: function () {
	    },
	    methods: {
	        addLine: function () {
	            this.routes.length = 0;
	            map.clearOverlays();
	            var inputText = this.inputText;
	            inputText = inputText.split("|");
	            //var lineName = inputText[0]
	            var linePaths = inputText[0].split(';');

	            var allPoints = [];
	            for (var i = 0; i < linePaths.length; i++) {
	                var linePath = linePaths[i].split(',');
	                var points = [];
	                for (var j = 0; j < linePath.length; j += 2) {
	                    points.push(new BMap.Point(linePath[j], linePath[j + 1]));
	                }
	                var r = ~~(Math.random() * 255);
	                var g = ~~(Math.random() * 255);
	                var b = ~~(Math.random() * 255);
	                var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
	                var polyline = new BMap.Polyline(points, {strokeColor: color, strokeWeight:3, strokeOpacity:1});   //创建折线
	                polyline.color = color;
	                allPoints = allPoints.concat(points);
	                map.addOverlay(polyline);
	                this.routes.push(polyline);
	            }
	            map.setViewport(allPoints);

	        }
	    }
	});


	var RouteList = Vue.extend({
	    template: '#route-list',
	    props: ['routes'],
	    methods: {
	        toggle: function (polyline) {
	            if (polyline.isHide) {
	                map.addOverlay(polyline);
	                polyline.isHide = false;
	            } else {
	                map.removeOverlay(polyline);
	                polyline.isHide = true;
	            }
	        }
	    }
	});

	Vue.component('panel', Panel)
	Vue.component('route-list', RouteList)


/***/ }
/******/ ]);