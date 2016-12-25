import React from 'react';

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

    render() {
        var self = this;
        var list = this.props.data.map(function (item, index) {
            return <div className="route-list-item" key={index}>
                <div>{index + 1}{item.name}</div>
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
                </div>
            </div>;
        });

        return (
            <ul className="route-list">{list}</ul>
        )
    }
}

export default App;
