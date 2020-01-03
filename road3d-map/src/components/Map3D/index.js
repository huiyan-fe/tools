import React, {Component} from 'react';
import {darkStyle} from './style';

export default class Map3D extends Component {

    componentDidMount() {
        this.initMap();
        this.forceUpdate();
    }

    initMap() {

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
            poi: false,
            skyColors: options.skyColors || [
                'rgba(5, 5, 30, 0.01)',
                'rgba(5, 5, 30, 1.0)'
            ]
        });
        if (this.props.center && this.props.zoom) {
            map.centerAndZoom(new window.BMapGL.Point(this.props.center[0], this.props.center[1]), this.props.zoom);
        }

        this.map = map;
        this.props.onMapLoaded && this.props.onMapLoaded(map);
    }

    renderChildren() {

        const {children} = this.props;

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
        const { visible } = this.props
        let style = {
            display: this.isShow(visible),
            position: 'relative',
            height: '100%',
            ...this.props.style
        };
        return (
            <div style={style}>
                <div ref={mapRef => (this.mapRef = mapRef)} style={{width: '100%', height: '100%'}}></div>
                {this.renderChildren()}
                {this.onRender()}
            </div>
        );
    }
    
}