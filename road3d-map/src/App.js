import React, {Component} from 'react';
import * as mapvgl from 'mapvgl';
import h337 from 'heatmap.js';
import TitleHeader from './components/TitleHeader';
import Map3D from './components/Map3D';
import ShenhaiData from './data/shenhai.json';
import HuanchengData from './data/huancheng.json';
import './App.less';

class App extends Component {

    canvasWidth = 128;
    canvasHeight = 256;
    state = {
        innerHeight: window.innerHeight
    };

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize);
    }

    onResize = () => {
        this.setState({
            innerHeight: window.innerHeight
        });
    }

    onMapLoaded = map => {
        this.map = map;
        this.initMapvgl(map);
    }

    initMapvgl = map => {
        this.view = new mapvgl.View({
            map: map
        });
        this.drawMapvgl(this.view);
    }

    initCanvas = () => {
        this.heatmap = h337.create({
            container: this.canvasContainer,
            blur: 1,
            radius: 1
        });
        this.canvas = this.heatmap._renderer.canvas;
    }

    drawMapvgl = view => {
        this.initCanvas();
        let {heatMax, heatData, lineData} = this.parseData(HuanchengData);

        this.heatmap.setData({
            max: heatMax * 4,
            min: 0,
            data: heatData
        });

        var layer = new mapvgl.WallLayer({
            texture: this.canvas,
            height: 30000
        });
        view.addLayer(layer);    
        layer.setData(lineData);
    }

    parseData = roadData => {
        let dataMaxWidth = roadData.length;
        let dataMaxHeight = 0;
        let dataMaxValue = 0;
        let dataMinValue = Infinity;
        let lineData = [];
        let hotData = [];
        let path = [];
        for (let i = 0; i < roadData.length; i++) {
            const link = roadData[i];
            for (let j = 0; j < link.data.length; j++) {
                const hot = link.data[j];
                hotData.push([i, ...hot]);
                dataMaxHeight = Math.max(dataMaxHeight, hot[0]);
                dataMaxValue = Math.max(dataMaxValue, hot[1]);
                dataMinValue = Math.min(dataMinValue, hot[1]);
            }

            let loc = link.loc.split(',');
            for (let k = 0; k < loc.length; k+=2) {
                const x = Number(loc[k]);
                const y = Number(loc[k +1 ]);
                path.push([x, y]);
            }
        }
        lineData.push({
            geometry: {
                type: 'LineString',
                coordinates: path
            }
        });

        var heatData = [];
        var preWidth = this.canvasWidth / dataMaxWidth;
        var preHeight = this.canvasHeight / dataMaxHeight;
        hotData.forEach(data => {
            heatData.push({
                x: data[0] * preWidth,
                y: data[1] * preHeight,
                value: data[2]
            })
        });

        return {
            heatMax: dataMaxValue,
            heatData,
            lineData
        };
    }

    bindCanvasRef = input => {
        this.canvasContainer = input;
    }

    render() {
        const {innerHeight} = this.state;
        return (
            <>
                <TitleHeader />
                <div ref={this.bindCanvasRef} className="canvas"></div>
                <Map3D
                    style={{height: innerHeight}}
                    center={[13469929.82759, 3709883.54775]}
                    zoom={11}
                    onMapLoaded={this.onMapLoaded}
                >
                </Map3D>
            </>
        );
    }
}

export default App;
