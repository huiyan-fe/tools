import React, { Component } from 'react';
import { Map, Road } from 'react-bmap';
import { simpleMapStyle } from './style';


export default class Map2D extends Component {

  componentDidMount = () => { }

  //是否显示
  isShow = (visible) => {
    return visible ? 'none' : 'block'
  }

  // 等分
  averageHander = (data, average) => {
    let result = [];
    for (let i = 0, len = data.length; i < len; i += average){
      result.push(data.slice(i, i + average).flat(2).toString());
    }
    return result;
  }

  dataHander = data => {
    const count = data.length 
    return this.averageHander(data, Math.floor(count / 10))
  }

  render() {
    const { visible, text, center, zoom, lineData} = this.props
    const { color1, color2, color3, color4, color5 } = text
    console.log(center)
    return (
      <Map
        style={{ height: '100vh' }}
        mapStyle={simpleMapStyle}
        center={{ lng: center[0], lat: center[1] }}
        zoom={zoom}
        enableScrollWheelZoom={true}
      >
        <Road
          category={[1, 2, 3, 4, 5]}
          splitList={{
             1: color1,
             2: color2,
             3: color3,
             4: color4,
             5: color5,
          }}
          color='rgba(0,255,0,0.7)'
          bgColor='rgba(255,255,255,0.1)'
          arrowColor='rgba(255,0,0,0.7)'
          lineWidth={10}
          roadPath={this.dataHander(lineData[0].geometry.coordinates)}
          onClick={index => {
            console.log(index);
          }}
        />
      </Map>
    );

  }
}


