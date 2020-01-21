import React, {
    Component
} from 'react';
import * as mapvgl from 'mapvgl';
import h337 from 'heatmap.js';
import CustomOverlay from './utils/customOverlay'
import TitleHeader from './components/TitleHeader';
import Map3D from './components/Map3D';
import Map2D from './components/Map2D';
import ShenhaiData from './data/chengdu_avgspeed_sort_work.json';

import './App.less';

function FizzyText(radius, max, min, gradient, color1Value, color1, color2Value, color2, color3Value, color3, color4Value, color4) {
    this.radius = radius;
    this.max = max;
    this.min = min;
    this.gradient = gradient

    this.color1Value = color1Value;
    this.color1 = color1;
    this.color2Value = color2Value;
    this.color2 = color2;
    this.color3Value = color3Value;
    this.color3 = color3;
    this.color4Value = color4Value;
    this.color4 = color4;

}

const gradientOptions = [{
        0.25: "rgba(0, 0, 255, 1)",
        0.55: "rgba(0, 255, 0, 1)",
        0.85: "rgba(255, 255, 0, 1)",
        1.0: "rgba(255, 0, 0, 1)"
    },
    {
        0.25: "rgba(255, 0, 0, 1)",
        0.55: "rgba(255, 255, 0, 1)",
        0.85: "rgba(0, 255, 0, 1)",
        1.0: "rgba(0, 0, 255, 1)"
    },
    {
        0.25: "rgba(0, 0, 255, 1)",
        0.55: "rgba(0, 102, 255, 1)",
        0.85: "rgba(0, 187, 255, 1)",
        1.0: 'rgba(255, 255, 255, 1)'
    },
    {
        0.25: 'rgba(255, 255, 255, 1)',
        0.55: "rgba(0, 187, 255, 1)",
        0.85: "rgba(0, 102, 255, 1)",
        1: "rgba(0, 0, 255, 1)"
    }
];

const gradient = {
    0.25: "rgba(0, 0, 255, 1)",
    0.55: "rgba(0, 255, 0, 1)",
    0.85: "rgba(255, 255, 0, 1)",
    1.0: "rgba(255, 0, 0, 1)"
}

class App extends Component {
    state = {
        uploadOnce: false,
        dataWeRender: ShenhaiData,
        innerHeight: window.innerHeight,
        visible: true,
        text: null,
        selectValue: null
    };
    tRef = React.createRef();

    componentDidMount() {
        window.addEventListener('resize', this.onResize);
        this.canvasContainer.addEventListener('click', (e) => {
            const {
                dataWeRender
            } = this.state
            const x = Math.ceil((e.pageX - this.ctx.canvas.getBoundingClientRect().left) / 2)
            const y = Math.ceil((e.pageY - this.ctx.canvas.getBoundingClientRect().top) / 2)
            const {
                hotData,
                dataMaxHeight
            } = this.parseData(dataWeRender);

            const showPoint = hotData.filter(item => item[0] === x && item[1] === y - 1) || []
            const selectValue = {
                x,
                y,
                showPoint,
                nowTime: this.parseTime(y / dataMaxHeight * 24)
            }
            this.setState({
                selectValue
            })

        })
    }

    parseTime = (num) => {
        return ('0' + Math.floor(num) % 24).slice(-2) + ':' + ((num % 1) * 60 + '0').slice(0, 2);
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
        this.initCanvas();
        this.drawMapvgl();
        this.drawTimeTextMap()
        this.timeDomRender()
    }

    drawTimeTextMap = () => {
        const {
            dataWeRender
        } = this.state

        if (!dataWeRender[0] || !dataWeRender[0].loc) {
            alert('请您核对下上传数据')
            return;
        }
        let mc = this.map.lnglatToMercator(dataWeRender[0].loc.split(',')[0], dataWeRender[0].loc.split(',')[1]);
        var myOverlay = this.myOverlay = new CustomOverlay(new window.BMapGL.Point(mc[0], mc[1]));
        // var myOverlay = new CustomOverlay(this.map.getCenter());
        this.map.addOverlay(myOverlay);
    }

    initCanvas = () => {
        const {
            dataWeRender
        } = this.state
        const {
            dataMaxWidth,
            dataMaxHeight
        } = this.parseData(dataWeRender);

        this.canvasContainer.style.width = dataMaxWidth + 'px'
        this.canvasContainer.style.height = dataMaxHeight + 'px'
        const nuConfig = {
            container: this.canvasContainer,
            blur: 1,
            gradient,
            backgroundColor: '#000'
        };

        this.heatmap = h337.create(nuConfig);
        this.canvas = this.heatmap._renderer.canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    drawMapvgl = () => {
        const {
            dataWeRender
        } = this.state
        const {
            heatMax,
            heatMin,
            heatData,
        } = this.parseData(dataWeRender);

        // 初始化 GUI面板
        this.initGUIPanel(2, heatMax, heatMin, gradient, heatMax * .25, "rgba(0, 0, 255, 1)",
            heatMax * .55, "rgba(0, 255, 0, 1)",
            heatMax * .85, "rgba(255, 255, 0, 1)",
            heatMax * 1, "rgba(255, 0, 0, 1)")

        heatData.map(item => Object.assign(item, {
            radius: 2
        }))

        this.heatmap.setData({
            max: heatMax,
            min: heatMin,
            data: heatData
        });
        this.mockCanvas = document.createElement('canvas');
        this.renderToMapCanvas()
    }

    // 绘制渲染canvas
    renderToMapCanvas = () => {
        const {
            dataWeRender
        } = this.state
        const {
            lineData,
            dataMaxWidth,
            dataMaxHeight
        } = this.parseData(dataWeRender);

        this.mockCanvas.width = 256
        this.mockCanvas.height = 128
        this.mockCtx = this.mockCanvas.getContext('2d');

        this.imageData = this.canvas.toDataURL();
        let img = this.img = document.createElement('img');
        this.img.src = this.imageData
        this.img.width = dataMaxWidth
        this.img.height = dataMaxHeight

        const _this = this
        this.img.onload = function () {
            const lengthArrow = 42
            _this.mockCtx.drawImage(img, 0, 0, dataMaxWidth, dataMaxHeight, 0, 0, 256, 128);
            for (let i = 0; i < dataMaxWidth * 2; i += lengthArrow) {
                _this.drawLineArrow(_this.mockCtx, i + 5, 5, lengthArrow + i, 5, "#fff");
            }
            _this.drawLineArrow(_this.ctx, 5, 5, lengthArrow, 5, "#fff");
            _this.layer = new mapvgl.WallLayer({
                texture: _this.mockCanvas,
                height: 12000,
                enablePreciseMap: false
            });
            _this.view.addLayer(_this.layer);
            _this.layer.setData(lineData);
        }
    }

    drawLineArrow = (cavParam, fromX, fromY, toX, toY, color) => {
        var headlen = 4; //自定义箭头线的长度
        var theta = 45; //自定义箭头线与直线的夹角，个人觉得45°刚刚好
        var arrowX, arrowY; //箭头线终点坐标
        // 计算各角度和对应的箭头终点坐标
        var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI;
        var angle1 = (angle + theta) * Math.PI / 180;
        var angle2 = (angle - theta) * Math.PI / 180;
        var topX = headlen * Math.cos(angle1);
        var topY = headlen * Math.sin(angle1);
        var botX = headlen * Math.cos(angle2);
        var botY = headlen * Math.sin(angle2);
        cavParam.beginPath();
        //画直线
        cavParam.moveTo(fromX, fromY);
        cavParam.lineTo(toX, toY);

        arrowX = toX + topX;
        arrowY = toY + topY;
        //画上边箭头线
        cavParam.moveTo(arrowX, arrowY);
        cavParam.lineTo(toX, toY);

        arrowX = toX + botX;
        arrowY = toY + botY;
        //画下边箭头线
        cavParam.lineTo(arrowX, arrowY);

        cavParam.strokeStyle = color;
        cavParam.stroke();
    }

    // 时间dom
    timeDomRender = () => {
        const {
            dataWeRender
        } = this.state
        const {
            dataMaxWidth
        } = this.parseData(dataWeRender);
        const timeCanvas = this.timeCanvas = document.createElement('canvas');
        const timeCanvasCtx = timeCanvas.getContext('2d');
        timeCanvas.width = 25
        timeCanvas.height = 192
        timeCanvas.style.cssText = `background: #070c17;z-index: 10;position: absolute;bottom: 0px; right: ${dataMaxWidth * 2}px`
        this.drawTimeText(timeCanvasCtx)
        document.getElementById('root').appendChild(timeCanvas)
    }

    drawTimeText = (ctx) => {
        const {
            dataWeRender
        } = this.state
        const {
            dataMaxHeight
        } = this.parseData(dataWeRender);

        ctx.font = '10px normal 微软雅黑';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.save();
        ctx.scale(1, 1);
        for (let i = 0; i <= 12; i++) {
            ctx.fillText(`${i * 2}:00`, 0, (dataMaxHeight - 4) / 6 * i + 4);
        }
        ctx.restore();
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
            for (let k = 0; k < loc.length; k += 2) {
                const x = Number(loc[k]);
                const y = Number(loc[k + 1]);
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

        hotData.forEach(data => {
            heatData.push({
                x: data[0],
                y: data[1],
                value: data[2]
            })
        });

        return {
            heatMax: dataMaxValue,
            heatMin: Math.floor(dataMinValue),
            heatData,
            lineData,
            hotData,
            dataMaxWidth,
            dataMaxHeight: dataMaxHeight + 1
        };
    }

    bindCanvasRef = input => {
        this.canvasContainer = input;
    }

    layerSetData = () => {
        const {
            dataWeRender
        } = this.state
        const {
            lineData
        } = this.parseData(dataWeRender);

        if (this.layer) {
            this.view.addLayer(this.layer);
            this.layer.setData(lineData);
        }
    }

    changeHeatMap = () => {
        const {
            dataWeRender
        } = this.state
        const {
            dataMaxWidth,
            dataMaxHeight,
            heatData
        } = this.parseData(dataWeRender);
        const {
            radius,
            max,
            min
        } = this.text
        heatData.map(item => Object.assign(item, {
            radius
        }))
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
            const lengthArrow = 42
            _this.mockCtx.drawImage(_this.img, 0, 0, dataMaxWidth, dataMaxHeight, 0, 0, 256, 128);
            for (let i = 0; i < dataMaxWidth * 2; i += lengthArrow) {
                _this.drawLineArrow(_this.mockCtx, i + 5, 5, lengthArrow + i, 5, "#fff");
            }
            _this.drawLineArrow(_this.ctx, 5, 5, lengthArrow, 5, "#fff");
            _this.layer.setOptions({
                texture: _this.mockCanvas,
            })
        }
        this.layerSetData()
        this.forceUpdate()
    }

    changeHeatMapAllColor = () => {
        const {
            max,
            gradient
        } = this.text
        const {
            dataWeRender
        } = this.state
        const {
            dataMaxWidth,
            dataMaxHeight
        } = this.parseData(dataWeRender);

        const nuConfig = {
            gradient,
            backgroundColor: '#000'
        };

        this.color1Value.setValue(max * 0.25)
        this.color2Value.setValue(max * 0.55)
        this.color3Value.setValue(max * 0.85)
        this.color4Value.setValue(max * 1)

        this.color1.setValue(gradient['0.25'])
        this.color2.setValue(gradient['0.55'])
        this.color3.setValue(gradient['0.85'])
        this.color4.setValue(gradient['1'])

        this.heatmap.configure(nuConfig)

        this.mockCtx = this.mockCanvas.getContext('2d');
        this.mockCtx.clearRect(0, 0, this.mockCanvas.width, this.mockCanvas.height)
        let imageData = this.heatmap._renderer.canvas.toDataURL();

        this.img.src = imageData

        const _this = this
        this.img.onload = function () {
            const lengthArrow = 42
            _this.mockCtx.drawImage(_this.img, 0, 0, dataMaxWidth, dataMaxHeight, 0, 0, 256, 128);
            for (let i = 0; i < dataMaxWidth * 2; i += lengthArrow) {
                _this.drawLineArrow(_this.mockCtx, i + 5, 5, lengthArrow + i, 5, "#fff");
            }
            _this.drawLineArrow(_this.ctx, 5, 5, lengthArrow, 5, "#fff");
            _this.layer.setOptions({
                texture: _this.mockCanvas,
            })
        }
        this.layerSetData()
        this.forceUpdate()
    }
    changeHeatMapColor = () => {
        const {
            max,
            color1Value,
            color2Value,
            color3Value,
            color4Value,
            color1,
            color2,
            color3,
            color4
        } = this.text
        const {
            dataWeRender
        } = this.state
        const {
            dataMaxWidth,
            dataMaxHeight
        } = this.parseData(dataWeRender);

        if (color1Value > max || color2Value > max || color3Value > max || color4Value > max) {
            alert('区间值务必小于最大阈值')
            return;
        }

        const nuConfig = {
            gradient: {
                [color1Value / max]: color1,
                [color2Value / max]: color2,
                [color3Value / max]: color3,
                [color4Value / max]: color4,
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
            const lengthArrow = 42
            _this.mockCtx.drawImage(_this.img, 0, 0, dataMaxWidth, dataMaxHeight, 0, 0, 256, 128);
            for (let i = 0; i < dataMaxWidth * 2; i += lengthArrow) {
                _this.drawLineArrow(_this.mockCtx, i + 5, 5, lengthArrow + i, 5, "#fff");
            }
            _this.drawLineArrow(_this.ctx, 5, 5, lengthArrow, 5, "#fff");
            _this.layer.setOptions({
                texture: _this.mockCanvas,
            })
        }
        this.layerSetData()
        this.forceUpdate()
    }

    onChangeClick = () => {
        const {
            visible
        } = this.state

        this.setState({
            visible: !visible
        })
    }

    initGUIPanel = (radius, max, min, gradient, color1Value, color1, color2Value, color2, color3Value, color3, color4Value, color4) => {
        this.gui = new window.dat.GUI({
            nameMap: {
                radius: '辐射半径',
                min: '最小阈值',
                max: '最大阈值',
                gradient: '渐变色',
                color1Value: '一档位值',
                color1: '一档颜色',
                color2Value: '二档位值',
                color2: '二档颜色',
                color3Value: '三档位值',
                color3: '三档颜色',
                color4Value: '四档位值',
                color4: '四档颜色',
            }
        });
        this.text = new FizzyText(radius, max, min, gradient, color1Value, color1, color2Value, color2, color3Value, color3, color4Value, color4);

        this.setState({
            text: this.text
        })

        this.radiusText = this.gui.add(this.text, 'radius').min(2).max(20);
        this.minText = this.gui.add(this.text, 'min').min(0).max(max * 1.2);
        this.maxText = this.gui.add(this.text, 'max').min(0).max(max * 1.2);

        this.radiusText.onFinishChange(this.changeHeatMap);
        this.minText.onFinishChange(this.changeHeatMap);
        this.maxText.onFinishChange(this.changeHeatMap);

        this.gradientOptions = this.gui.addGradient(this.text, 'gradient', gradientOptions);
        this.gradientOptions.onFinishChange(this.changeHeatMapAllColor);

        // 第一档
        this.color1Value = this.gui.add(this.text, 'color1Value').min(0).max(max * 1.2);
        this.color1Value.onFinishChange(this.changeHeatMapColor);
        this.color1 = this.gui.addColor(this.text, 'color1');
        this.color1.onFinishChange(this.changeHeatMapColor);
        // 第二档
        this.color2Value = this.gui.add(this.text, 'color2Value').min(0).max(max * 1.2);
        this.color2Value.onFinishChange(this.changeHeatMapColor);
        this.color2 = this.gui.addColor(this.text, 'color2');
        this.color2.onFinishChange(this.changeHeatMapColor);
        // 第三档
        this.color3Value = this.gui.add(this.text, 'color3Value').min(0).max(max * 1.2);;
        this.color3Value.onFinishChange(this.changeHeatMapColor);
        this.color3 = this.gui.addColor(this.text, 'color3');
        this.color3.onFinishChange(this.changeHeatMapColor);
        // 第四档
        this.color4Value = this.gui.add(this.text, 'color4Value').min(0).max(max * 1.2);;
        this.color4Value.onFinishChange(this.changeHeatMapColor);
        this.color4 = this.gui.addColor(this.text, 'color4');
        this.color4.onFinishChange(this.changeHeatMapColor);

        this.gui.__controllers.forEach(e => {
            e.updateDisplay()
        })
    }

    // 切换控制
    onChangeClick = () => {
        const {
            visible
        } = this.state

        this.setState({
            visible: !visible
        })
    }

    onDropUploadClick = () => {
        this.getFileContent(this.tRef.current, dataWeRender => {
            this.setState({
                dataWeRender: JSON.parse(dataWeRender)
            }, () => {
                const { uploadOnce } = this.state
                this.view.removeLayer(this.layer)
                this.gui.destroy()
                document.getElementById('root').removeChild(this.timeCanvas)
                this.myOverlay.remove()
                // 每次上传标志
                this.setState({ uploadOnce : !uploadOnce })
                // this.initCanvas();
                // this.drawMapvgl()
                // this.drawTimeTextMap()
                // this.timeDomRender()
            })
        });
    }

    getFileContent = (fileInput, callback) => {
        if (fileInput.files && fileInput.files.length > 0 && fileInput.files[0].size > 0) {
            var file = fileInput.files[0];
            if (window.FileReader) {
                var reader = new FileReader();
                reader.onloadend = function (evt) {
                    if (evt.target.readyState == FileReader.DONE) {
                        callback(evt.target.result);
                    }
                };
                // 包含中文内容用gbk编码
                reader.readAsText(file, 'gbk');
            }
        }
    };

    render() {
        const {
            uploadOnce,
            innerHeight,
            visible,
            text,
            dataWeRender,
            selectValue
        } = this.state;

        if (!dataWeRender[0] || !dataWeRender[0].loc) {
            alert('请您核对下上传数据')
            return;
        }
        let mc = [dataWeRender[0].loc.split(',')[0], dataWeRender[0].loc.split(',')[1]];

        return (
            <React.Fragment>
            <TitleHeader />
            <div ref={this.bindCanvasRef} className="canvas"></div>
            {selectValue && selectValue.showPoint[0] &&
            <div className="show">
                <p>当前时间：{selectValue.nowTime}</p>
                <p>当前值：{(selectValue.showPoint[0][2]).toFixed(2)}</p>
            </div>}
            {selectValue && !selectValue.showPoint[0] &&
            <div className="show">
                <p>当前点暂无数据</p>
            </div>}
            <input type='file' ref={this.tRef} className="fileUpload" onChange={this.onDropUploadClick}></input>
            <div className="change" onClick={this.onChangeClick}><b>切换2D/3D</b></div>
            <Map3D
                style={{ height: innerHeight }}
                visible={visible}
                uploadOnce={uploadOnce}
                center={mc}
                zoom={11}
                onMapLoaded={this.onMapLoaded}
            >
            </Map3D>
            {text &&
                <Map2D
                    center={mc}
                    zoom={11}
                    dataWeRender={dataWeRender}
                    text={text}
                    visible={visible}
                    selectValue={selectValue}
                >
                </Map2D> 
            }
        </React.Fragment>
        );

    }
}

export default App;