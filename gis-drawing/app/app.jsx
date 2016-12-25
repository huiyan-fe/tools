import React from 'react';
import ReactDOM from 'react-dom';

import Map from './map.jsx';
import Panel from './panel.jsx';

function App() {
  return (
    <div className="container">
        <Map />
        <Panel />
    </div>
  );
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);
