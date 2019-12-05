import React, {Component} from 'react';
import TitleHeader from './components/TitleHeader';
import Map3D from './components/Map3D';
import * as mapvgl from 'mapvgl';

class App extends Component {

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

    drawMapvgl = view => {
        this.pointLayer = new mapvgl.PointLayer({
            data: [{
                geometry: {
                    type: 'POINT',
                    coordinates: [116.403748, 39.915055]
                }
            }],
            size: 20
        });
        view.addLayer(this.pointLayer);
    }

    render() {
        return (
            <>
                <TitleHeader></TitleHeader>
                <Map3D
                    style={{height: '800px'}}
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
