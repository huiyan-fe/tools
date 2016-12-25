import React from 'react';

class App extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            colors: [
                '#b71c1c',
                '#880e4f',
                '#4a148c',
                '#d50000',
                '#c51162',
                '#aa00ff',
                '#311b92',
                '#1a237e',
                '#0d47a1',
                '#6200ea',
                '#304ffe',
                '#2962ff',
                '#01579b',
                '#006064',
                '#004d40',
                '#0091ea',
                '#00b8d4',
                '#00bfa5',
                '#1b5e20',
                '#33691e',
                '#827717',
                '#00c853',
                '#64dd17',
                '#aeea00',
                '#f57f17',
                '#ff6f00',
                '#e65100',
                '#ffd600',
                '#ffab00',
                '#ff6d00',
                '#bf360c',
                '#3e2723',
                '#212121',
                '#dd2c00',
                '#263238',
                '#000',
                '#fff',
            ]
        }
    }

    componentDidMount() {
    }

    changeColor(color) {
        this.props.changeColor && this.props.changeColor(color);
    }

    render() {
        var self = this;
        var module = this.state.colors.map(function (item, index) {
            return <li key={index} style={{background: item}} onClick={self.changeColor.bind(self, item)}></li>
        });

        return (
            <ul className="color-list">{module}</ul>
        )
    }
}

export default App;
