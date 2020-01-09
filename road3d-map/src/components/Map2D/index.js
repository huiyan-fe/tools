import React, { Component } from 'react';
import { Map, Road, Marker } from 'react-bmap';
import Color from 'color';
import { simpleMapStyle } from './style';

export default class Map2D extends Component {
  // 累加器
  reducer = (accumulator, currentValue) =>  accumulator + currentValue[1]
  
  // 获取每个links的平均值
  getAverageValue = (items) => items.reduce(this.reducer, 0) / items.length

  parseData = (data) => {
    const lineData = []
    data.map(item => {
      lineData.push({
        geometry: {
            type: 'LineString',
            coordinates: item.loc,
            value: this.getAverageValue(item.data) 
        }
      });
    })
    return lineData
  }

  //是否显示
  isShow = (visible) => {
    return visible ? 'none' : 'block'
  }

  dataHander = data => {
    const lineData = []
    data.map(item => {
      lineData.push(item.geometry.coordinates)
    })
    return lineData
  }

  highlightRoadHander = (data, index = 0) => {
    return [data[index].geometry.coordinates]
  }

  heatDataHander = (data) => {
    const { text } = this.props
    const { color1, color1Value, color2, color2Value, color3, color3Value, color4, color4Value, radius, max, min } = text
    const color1Ratio = color1Value / max
    const color2Ratio = (color2Value - color1Value) / max
    const color3Ratio = (color3Value - color2Value) / max
    const color4Ratio = (color4Value - color3Value) / max

    const colorArr = [
      [color1Ratio, color1],
      [color1Ratio + color2Ratio, color2],
      [color1Ratio + color2Ratio + color3Ratio, color3],
      [color1Ratio + color2Ratio + color3Ratio + color4Ratio, color4]
    ];
    const splitList = {}
    const category = []
    data.map((item, index) => {
      const percent = (item.geometry.value * radius - min) / (max - min) 
      splitList[index] = this.getColorFromColorStops(colorArr, percent)
      category.push(index)
    })
    return { splitList, category }
  }

  getColorFromColorStops = (colorStops, percent) => { 
    if (percent < 0) {
      percent = 0;
    }
    if (percent > 1) {
      percent = 1;
    }
    let i = 0;
    for (let length = colorStops.length; i < length; ++i) {
      const colorStop = colorStops[i];
      if (colorStop[0] >= percent) {
        break;
      }
    }
    const startColorStop = colorStops[i - 1];
    const endColorStop = colorStops[i];
    let startPercent = 0;
    let endPercent = 1;
    let startColor = null;
    let endColor = null;
    if (startColorStop) {
      startPercent = startColorStop[0];
      startColor = startColorStop[1];
    }
    if (endColorStop) {
      endPercent = endColorStop[0];
      endColor = endColorStop[1];
    }
    if (!startColor) {
      startColor = endColor || '#000';
    }
    if (!endColor) {
      endColor = startColor || '#000';
    }

    let relativePercent = (percent - startPercent) / (endPercent - startPercent);
    const startColorObj = Color(startColor)
    const endColorObj = Color(endColor);
    const sr = startColorObj.red();
    const sg = startColorObj.green();
    const sb = startColorObj.blue();
    const sa = startColorObj.alpha();
    const er = endColorObj.red();
    const eg = endColorObj.green();
    const eb = endColorObj.blue();
    const ea = endColorObj.alpha();
    return `rgba(${(sr + (er - sr) * relativePercent).toFixed()},` +
      `${(sg + (eg - sg) * relativePercent).toFixed()},` +
      `${(sb + (eb - sb) * relativePercent).toFixed()},` +
      `${(sa + (ea - sa) * relativePercent).toFixed()})`;
  }


  render() {
    const { center, zoom, dataWeRender, selectValue } = this.props
    const linksData = this.parseData(dataWeRender)

    // 路线绘制
    const roadPath = this.dataHander(linksData)

    // 高亮路线
    const highlightRoad = selectValue && this.highlightRoadHander(linksData, selectValue.x)
   
    // 颜色控制
    const { splitList, category } = this.heatDataHander(linksData)
    
    let markersIconUrl =
      'http://webmap1.map.bdstatic.com/wolfman/static/common/images/markers_new2x_fbb9e99.png';
    const startIcon = new window.BMap.Icon(markersIconUrl, new window.BMap.Size(20, 26), {
      anchor: new window.BMap.Size(12, 25),
      imageOffset: new window.BMap.Size(-180, -140),
      imageSize: new window.BMap.Size(300, 300)
    });

    return (
      <Map
        style={{ height: '100vh' }}
        mapStyleV2={simpleMapStyle}
        center={{ lng: center[0], lat: center[1] }}
        zoom={zoom}
        enableScrollWheelZoom={true}
      >
      <Road
        category={category}
        splitList={splitList}
        color='rgba(0,255,0,0.7)'
        bgColor='rgba(255,255,255,0.1)'
        arrowColor='rgba(255,0,0,0.7)'
        lineWidth={10}
        roadPath={roadPath}
        viewportOptions={{ margins: [20, 500, 80, 440] }}
        />
      {highlightRoad && <Marker
          position={{ lng: highlightRoad[0].split(',')[0], lat: highlightRoad[0].split(',')[1] }}
          icon={startIcon}
      >
      </Marker>}
      </Map>
    );


  }
}