import React, {
    Component
} from 'react';
import {
    darkStyle
} from './style';

export default class Map3D extends Component {

    componentDidMount() {
        const { center } = this.props
        this.initMap(center);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { uploadOnce } = this.props
        if (nextProps.uploadOnce !== uploadOnce) {
            this.initMap(nextProps.center);
        }
        return true
    }

    initMap(center) {

        let options = Object.assign({
            tilt: 60,
            heading: 0
        }, this.props.options);
        let map = new window.BMapGL.Map(this.mapRef, {
            restrictCenter: false,
            style: options.style || darkStyle
        });
        map.enableKeyboard();
        map.enableScrollWheelZoom();
        map.enableInertialDragging();
        map.enableContinuousZoom();
        map.setTilt(options.tilt);
        map.setHeading(options.heading);
        map.setDisplayOptions({
            indoor: false,
            poi: true,
            skyColors: options.skyColors || [
                'rgba(5, 5, 30, 0.01)',
                'rgba(5, 5, 30, 1.0)'
            ]
        });
        this.map = map;
        if (center && this.props.zoom) {
            if (!this.map) {
                alert('请确认上传数据')
            }

            const mc = this.map.lnglatToMercator(center[0], center[1])
            map.centerAndZoom(new window.BMapGL.Point(mc[0], mc[1]), this.props.zoom);

        }

        this.props.onMapLoaded && this.props.onMapLoaded(map);
    }

    renderChildren() {

        const {
            children
        } = this.props;

        if (!children || !this.map) return;

        return React.Children.map(children, child => {

            if (!child) {
                return;
            }

            if (typeof child.type === 'string') {
                return child;
            } else {
                return React.cloneElement(child, {
                    map: this.map
                });
            }

        })

    }

    onRender() {

        if (!this.props.render || !this.map) {
            return;
        }

        return this.props.render(this.map);
    }

    //是否显示
    isShow = (visible) => {
        return visible ? 'block' : 'none'
    }

    render() {
        
        const {
            visible
        } = this.props
        let style = {
            display: this.isShow(visible),
            position: 'relative',
            height: '100%',
            ...this.props.style
        };
        return (
            <div style={style} >
                < div ref = { mapRef => (this.mapRef = mapRef)}
                    style = {{ width: '100%', height: '100%' }} > 
                </div>
                { this.renderChildren() }
                { this.onRender() }
            </div>
        );
    }

}