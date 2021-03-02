import React from "react";
import {Glyphicon} from 'react-bootstrap'
import './MapMarker.scss'


export default class MapMarker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isHovered: false,
        };

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onMouseEnter() {
        this.setState({isHovered: true});
        this.props.onMouseEnter(this.props.id)
    }

    onMouseLeave() {
        this.setState({isHovered: false});
        this.props.onMouseLeave()
    }

    onClick() {
        this.props.onClick(this.props.id)
    }

    render() {
        const {isHoveredOffer, isSelectedOffer, type} = this.props;
        const isHovered = this.state.isHovered || isHoveredOffer || isSelectedOffer;

        const src = isHovered ? `./img/marker_active.png` : `./img/marker.png`;

        return (
            <div className="mom-marker"
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}
                 onClick={this.onClick}>
                <img src={require(`${src}`)}/>
            </div>
        );
    }
}
