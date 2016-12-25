import React from 'react';
import ReactDOM from 'react-dom';

import Map from './map.jsx';
import Panel from './panel.jsx';

class App extends React.Component {

    constructor(args) {
        super(args);
        this.state = {
            isFullMap: false
        }
    }
    
    togglePanel(isFullMap) {
        this.setState({
            isFullMap: isFullMap
        });
    }

  render () {
    var className = "container";
    if (this.state.isFullMap) {
        className  = "full-map";
    }
    return (
    <div className={className}>

        <Panel />
        <Map/>
        
        <div className="switch is-full-map-btn">
            <label>
                收起
                <input type="checkbox" onClick={this.togglePanel.bind(this, !this.state.isFullMap)}/>
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
