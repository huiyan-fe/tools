import React, { Component } from 'react';
import * as dat from 'dat.gui';
import * as mapvgl from 'mapvgl';
import h337 from 'heatmap.js';
import TitleHeader from './components/TitleHeader';
import Map3D from './components/Map3D';
import Map2D from './components/Map2D';
import ShenhaiData from './data/chengdu_avgspeed_sort_work.json';

import './App.less';

function FizzyText(radius, max, min, color1, color2, color3, color4, color5) {
    this.radius = radius || 4;
    this.max = max || 10;
    this.min = min || 0;
    this.color1 = color1 || "#FF0000"; // CSS string
    this.color2 = color2 || "#FFFF33"; // CSS string
    this.color3 = color3 || "#66FF66"; // CSS string
    this.color4 = color4 || "#00FF00"; // CSS string
    this.color5 = color5 || "#0000FF"; // CSS string
}

class App extends Component {

    canvasWidth = 298;
    canvasHeight = 96;
    // canvasWidth = 298;
    // canvasHeight = 96;
    state = {
        dataWeRender: ShenhaiData,
        innerHeight: window.innerHeight,
        visible: true,
        text: null,
        selectValue: null
    };
    tRef = React.createRef();

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
        this.tRef.current.addEventListener("dragover", function (e) {
			e.preventDefault()
			e.stopPropagation()
		})
		this.tRef.current.addEventListener("dragenter", function (e) {
			e.preventDefault()
			e.stopPropagation()
		})
        this.tRef.current.addEventListener("drop", this.onDropUploadClick)

        this.canvasContainer.addEventListener('click', (e) => {
            const { dataWeRender } = this.state
            const x = Math.ceil((e.pageX -  this.ctx.canvas.getBoundingClientRect().left) / 2)
            const y = Math.ceil((e.pageY - this.ctx.canvas.getBoundingClientRect().top) / 2)
            const { hotData } = this.parseData(dataWeRender);   
            
            const showPoint = hotData.filter(item => item[0] === x && item[1]  === y - 1 ) || []
            const selectValue = {
                x,
                y,
                showPoint,
                nowTime: this.parseTime(y / 96 * 24)
            }
            this.setState({ selectValue })
    
        })
    }

    parseTime = (num) => {
        return ('0' + Math.floor(num) % 24).slice(-2) + ':' + ((num % 1)*60 + '0').slice(0, 2);
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
        const { dataWeRender } = this.state
        let { heatMax } = this.parseData(dataWeRender);
       
        this.view = new mapvgl.View({
            map: map
        });
        // 初始化 GUI面板
        this.initGUIPanel(4, heatMax, 0)
        this.initCanvas();
        this.drawMapvgl();
        // this.drawTimeText();
    }

    initCanvas = () => {
        const { color1, color2, color3, color4, color5 } = this.text

        const nuConfig = {
            container: this.canvasContainer,
            blur: 1,
            gradient: {
                '.3': color1,
                '.4': color2,
                '.5': color3,
                '.6': color4,
                '1': color5,
            },
            backgroundColor: '#000'
        };

        this.heatmap = h337.create(nuConfig);
        this.canvas = this.heatmap._renderer.canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    drawMapvgl = () => {
        const { dataWeRender } = this.state
        const { heatMax, heatData, lineData } = this.parseData(dataWeRender);

        this.maxText.setValue(heatMax)
        this.radiusText.setValue(4)

        heatData.map(item =>  Object.assign(item, {radius: 4}))

        this.heatmap.setData({
            max: heatMax,
            min: 0,
            data: heatData
        });
        this.mockCanvas = document.createElement('canvas');
        this.mockCanvas.width = 256
        this.mockCanvas.height = 128
        this.mockCtx = this.mockCanvas.getContext('2d');

        this.imageData = this.canvas.toDataURL();
        let img = this.img = document.createElement('img');
        this.img.src = this.imageData
        this.img.width = 299 
        this.img.height = 96 
        const _this = this
        this.img.onload = function () {
            _this.mockCtx.drawImage(img, 0, 0, 299, 96, 0, 0, 256, 128);
            _this.layer = new mapvgl.WallLayer({
                texture: _this.mockCanvas,
                height: 12000,
                enablePreciseMap: true
            });
            _this.view.addLayer(_this.layer);  
            _this.layer.setData(lineData);
        }

    }

    drawTimeText = () => {
        this.ctx.font = '20px normal 微软雅黑';
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';
        this.ctx.save();
        this.ctx.scale(1/3, 1);
        for (let i = 0; i <= 4; i++) {
            this.ctx.fillText(`${24/4*i}:00`, 0, this.canvasHeight / 4 * i);
        }
        this.ctx.restore();
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
            lineData,
            hotData 
        };
    }

    bindCanvasRef = input => {
        this.canvasContainer = input;
    }

    layerSetData = () => {
        const { dataWeRender } = this.state
        const { lineData } = this.parseData(dataWeRender);

        if (this.layer) {
            // this.drawTimeText();
            this.view.addLayer(this.layer);  
            this.layer.setData(lineData);
        }
    }

    changeHeatMap = () => {
        const { dataWeRender } = this.state
        const { heatData } = this.parseData(dataWeRender);
        const { radius, max, min } = this.text
        heatData.map(item =>  Object.assign(item, {radius}))
        this.heatmap.setDataMax(max)
        this.heatmap.setDataMin(min)

        this.heatmap.setData({
            max: max,
            min: min,
            data: heatData
        });

        this.mockCtx = this.mockCanvas.getContext('2d');
        this.mockCtx.clearRect(0, 0, this.mockCanvas.width, this.mockCanvas.height)
        let imageData = this.heatmap._renderer.canvas.toDataURL();

        this.img.src = imageData
        const _this = this

        this.img.onload = function () {
            _this.mockCtx.drawImage(_this.img, 0, 0, 299, 96, 0, 0, 256, 128);
            _this.layer.setOptions({
                texture: _this.mockCanvas,
            })
        }


        this.layerSetData()
        this.forceUpdate()
    }

    changeHeatMapColor = () => {
        const { dataWeRender } = this.state
        const { color1, color2, color3, color4, color5 } = this.text
        const { lineData } = this.parseData(dataWeRender);
        const nuConfig = {
            gradient: {
                '.3': color1,
                '.4': color2,
                '.5': color3,
                '.6': color4,
                '1': color5,
            },
            backgroundColor: '#000'
        };
        
        this.heatmap.configure(nuConfig)

        this.mockCtx = this.mockCanvas.getContext('2d');
        this.mockCtx.clearRect(0, 0, this.mockCanvas.width, this.mockCanvas.height)
        let imageData = this.heatmap._renderer.canvas.toDataURL();

        this.img.src = imageData
    
        const _this = this
        this.img.onload = function () {
            _this.mockCtx.drawImage(_this.img, 0, 0, 299, 96, 0, 0, 256, 128);
            _this.layer.setOptions({
                texture: _this.mockCanvas,
            })
        }

        this.layerSetData()
        this.forceUpdate()
    }

    onChangeClick = () => {
        const { visible } = this.state
        
        this.setState({ visible: !visible })
    }
      
    initGUIPanel = (radius, max, min, color1, color2, color3, color4, color5) => {
     
        this.gui = new dat.GUI();

        this.text = new FizzyText(radius, max, min, color1, color2, color3, color4, color5);
   
        this.setState({ text: this.text })
        
        this.radiusText = this.gui.add(this.text, 'radius');

        this.minText = this.gui.add(this.text, 'min');
        this.maxText = this.gui.add(this.text, 'max');

        this.color1 = this.gui.addColor(this.text, 'color1');
        this.color2 = this.gui.addColor(this.text, 'color2');
        this.color3 = this.gui.addColor(this.text, 'color3');
        this.color4 = this.gui.addColor(this.text, 'color4');
        this.color5 = this.gui.addColor(this.text, 'color5');

        this.radiusText.onFinishChange(this.changeHeatMap);

        this.minText.onFinishChange(this.changeHeatMap);
        this.maxText.onFinishChange(this.changeHeatMap);

        this.color1.onFinishChange(this.changeHeatMapColor)
        this.color2.onFinishChange(this.changeHeatMapColor)
        this.color3.onFinishChange(this.changeHeatMapColor)
        this.color4.onFinishChange(this.changeHeatMapColor)
        this.color5.onFinishChange(this.changeHeatMapColor)

        this.gui.__controllers.forEach(e => {
            e.updateDisplay()
        })
    }

    // 切换控制
    onChangeClick = () => {
        const { visible } = this.state

        this.setState({ visible: !visible })
    }

    onDropUploadClick = (e) => {
        const _this = this
        e.preventDefault()
		e.stopPropagation()
        var files = this.files || e.dataTransfer.files
        var reader = new FileReader()
        reader.readAsText(files[0], 'utf-8')
        reader.onload = function (evt) {
            _this.setState({ dataWeRender: JSON.parse(evt.target.result) }, () => {
                _this.view.removeLayer(_this.layer)
                _this.drawMapvgl()
            })
        }
    }

    render() {
        const { innerHeight, visible, text, dataWeRender, selectValue } = this.state;
        
        return (
            <React.Fragment>
                <TitleHeader />
                <div ref={this.bindCanvasRef} className="canvas"></div>
                {selectValue &&
                <div className="show">
                    <p>当前时间：{selectValue.nowTime}</p>
                    <p>当前值：{(selectValue.showPoint[0][2]).toFixed(2)}</p>
                </div>}
                <div ref={this.tRef} className="dashboard">请将数据拖入</div>
                <div className="change" onClick={this.onChangeClick}><b>切换2D/3D</b></div>
                <Map3D
                    style={{ height: innerHeight }}
                    visible={visible}
                    center={[11586045.04, 3566065.08]}
                    zoom={11}
                    onMapLoaded={this.onMapLoaded}
                    // changeHeatMap={this.changeHeatMap}
                >
                </Map3D>
                {text &&
                    <Map2D
                        center={[11586045.04,3566065.08]}
                        zoom={11}
                        dataWeRender={dataWeRender}
                        text={text}
                        visible={visible}
                        // changeHeatMap={this.changeHeatMap}
                        selectValue={selectValue}
                    >
                    </Map2D> 
                }
            </React.Fragment>
        );
    }
}

export default App;
