import React from 'react';
import ReactDOM from 'react-dom';

import Map from './map.jsx';
import MiniMap from './miniMap.jsx';
import Panel from './panel.jsx';

class App extends React.Component {

    constructor(args) {
        super(args);
        this.state = {
            isFullMap: false,
            showMiniMap: true,
        }
        this.hideOrShowMiniMap = this.hideOrShowMiniMap.bind(this);
    }

    togglePanel(isFullMap) {
        this.setState({
            isFullMap: isFullMap
        });
    }

    hideOrShowMiniMap(showMiniMap) {
        this.setState({
            showMiniMap,
        });
    }

    render() {
        var className = "container";
        if (this.state.isFullMap) {
            className = "full-map";
        }
        console.log('showMiniMap', this.state.showMiniMap);
        return (
            <div className={className}>
                <Panel hideOrShowMiniMap={this.hideOrShowMiniMap} />
                <Map />
                <MiniMap showMiniMap={this.state.showMiniMap} />
                <div className="switch is-full-map-btn">
                    <label>
                        收起
                        <input type="checkbox" onClick={this.togglePanel.bind(this, !this.state.isFullMap)} />
                        <span className="lever"></span>
                        全屏
                    </label>
                </div>

            </div>
        );
    };
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);
