import React, { Component } from 'react';
import { Map, Road } from 'react-bmap';
import Color from 'color';
// import ShenhaiData from '../../data/shenhai.json';

// import ShenhaiData from './data/chengdu_avgspeed_holiday.json';
// import ShenhaiData from './data/chengdu_slowdown_holiday.json';

import ShenhaiData from '../../data/chengdu_avgspeed_0930.json';
// import ShenhaiData from './data/chengdu_slowdown_0930.json';

// import ShenhaiData from './data/chengdu_avgspeed_work.json';
// import ShenhaiData from './data/chengdu_slowdown_work.json';


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

  heatDataHander = (max, data) => {
    const { text } = this.props
    const { color1, color2, color3, color4, color5 } = text
    
    const colorArr = [
      [0.2, color1],
      [0.4, color2],
      [0.6, color3],
      [0.8, color4],
      [1, color5]
    ];

    const splitList = {}
    const category = []
    data.map((item, index) => {
      const percent = item.geometry.value / max
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
    const { center, zoom, text } = this.props
    const linksData = this.parseData(ShenhaiData)

    // 路线绘制
    const roadPath = this.dataHander(linksData)
    // 颜色控制
    const { splitList, category } =  this.heatDataHander(text.max / 4, linksData)

    return (
      <Map
        style={{ height: '100vh' }}
        mapStyle={simpleMapStyle}
        center={{ lng: center[0], lat: center[1] }}
        zoom={zoom}
        enableScrollWheelZoom={true}
      >
      <Road
        isShowArrow={false}
        category={category}
        splitList={splitList}
        color='rgba(0,255,0,0.7)'
        bgColor='rgba(255,255,255,0.1)'
        arrowColor='rgba(255,0,0,0.7)'
        lineWidth={10}
        roadPath={roadPath}
        onClick={index => {
          console.log(index);
        }}
      />
      
      </Map>
    );


  }
}