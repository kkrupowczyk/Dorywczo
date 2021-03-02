import React from "react";
import GoogleMapReact from 'google-map-react';
import MapMarker from '../MapMarker/MapMarker'
import {MAP_DEFAULT} from '../../consts'
import  './MapInput.scss'
import {FormGroup, ControlLabel} from 'react-bootstrap';

export default class MapInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lat: this.props.input.value.lat,
            lng: this.props.input.value.lng
        };

        this.onMapClick = this.onMapClick.bind(this)
    }

    onMapClick(point) {
        const {lat, lng}=point;

        this.setState({
            lat: lat,
            lng: lng
        });

        this.props.input.onChange({lat, lng})
    }

    render() {
        const {meta: {touched, error}} = this.props;

        const validationStateMap = touched && ( error && 'mi-error' ) || null;
        const validationState = touched && ( error && 'error' ) || null;

        return (
            <FormGroup validationState={validationState}>
                <ControlLabel>{this.props.children}</ControlLabel>
                <div className={`mi-map ${validationStateMap}`} style={this.props.style}>
                    <GoogleMapReact
                        bootstrapURLKeys={{
                            key: 'AIzaSyBl2rCC128_HS5woaTi7975091-NAWEJXc',
                            language: 'pl'
                        }}
                        defaultCenter={MAP_DEFAULT.CENTRE}
                        defaultZoom={MAP_DEFAULT.ZOOM}
                        onClick={this.onMapClick}>

                        <MapMarker lat={this.state.lat} lng={this.state.lng}/>

                    </GoogleMapReact>
                </div>
            </FormGroup>
        );
    }
}
