import React from 'react';
import ColorList from './colorlist.jsx';

class App extends React.Component {
    constructor(args) {
        super(args);
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        this.addRoutes();
    }

    addRoutes() {
    }

    changeArrow(index, flag) {
        this.props.updateDataByIndex(index, {
            isShowArrow: flag
        });
    }

    changeText(index, flag) {
        this.props.updateDataByIndex(index, {
            isShowText: flag
        });
    }

    changeColor(index, color) {
        this.props.updateDataByIndex(index, {
            strokeColor: color
        });
    }

    changeTipColor(index, color) {
        this.props.updateDataByIndex(index, {
            tipColor: color
        });
    }

    render() {
        var self = this;
        var list = this.props.data.map(function (item, index) {
            return <div className="route-list-item" key={index}>
                <div>{item.name}</div>
                <div>
                  <div className="switch">
                    <label>
                      隐藏箭头
                      <input type="checkbox" defaultChecked='true' onClick={self.changeArrow.bind(self, index, !item.isShowArrow)}/>
                      <span className="lever"></span>
                      显示箭头
                    </label>
                  </div>
                  <div className="switch">
                    <label>
                      隐藏文本
                      <input type="checkbox" defaultChecked='true' onClick={self.changeText.bind(self, index, !item.isShowText)}/>
                      <span className="lever"></span>
                      显示文本
                    </label>
                  </div>
                    标注颜色
                    
                    <ColorList colors={['#ee5d5b', '#ff9625', '#6caeca']} changeColor={self.changeTipColor.bind(self, index)}/>
                    线颜色
                    <ColorList changeColor={self.changeTipColor.bind(self, index)}/>
                </div>
            </div>;
        });

        return (
            <ul className="route-list">{list}</ul>
        )
    }
}

export default App;
