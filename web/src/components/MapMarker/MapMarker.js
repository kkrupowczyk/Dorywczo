import React from "react";
import {Glyphicon} from 'react-bootstrap'
import './MapMarker.scss'

export default class MapMarker extends React.Component {

    constructor(props) {
        super(props);

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onMouseEnter() {
    }

    onMouseLeave() {
    }

    onClick() {
    }

    render() {
        const src = `./img/marker.png`;

        return (
            <div className="mm-marker">
                <img src={require(`${src}`)}
                     onMouseEnter={this.onMouseEnter}
                     onMouseLeave={this.onMouseLeave}
                     onClick={this.onClick}/>
            </div>
        );
    }
}
