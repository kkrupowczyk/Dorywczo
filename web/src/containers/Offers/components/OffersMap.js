import React from "react";
import GoogleMapReact from 'google-map-react';
import MapOfferMarker from './MapOfferMarker/MapOfferMarker'
import {LOCATION_WARSAW, LOCATION_ZOOM} from '../../../consts'

class OffersMap extends React.Component {

    constructor(props) {
        super(props);

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onBoundsChange = this.onBoundsChange.bind(this);
    }

    onMouseEnter(id) {
        this.props.setHoveredOfferId(id);
    }

    onMouseLeave() {
        this.props.setHoveredOfferId();
    }

    onClick(id) {
        this.props.setSelectedOfferId(id)
    }

    onBoundsChange(center, zoom, bounds, marginBounds) {
        this.props.setMapInfo(center, zoom, bounds, marginBounds)
    }

    render() {
        const {offers, hoveredOfferId, selectedOfferId, mapInfo:{center, zoom}} = this.props;

        const markers = offers.map(offer => (
            <MapOfferMarker
                {...offer}
                key={offer.id}
                lat={offer.location.lat}
                lng={offer.location.lng}
                isSelectedOffer={selectedOfferId === offer.id}
                isHoveredOffer={hoveredOfferId === offer.id}
                onClick={this.onClick}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}/>
        ));

        return (
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyBl2rCC128_HS5woaTi7975091-NAWEJXc',
                    language: 'pl'
                }}
                center={center}
                zoom={zoom}
                onBoundsChange={this.onBoundsChange}>

                {markers}

            </GoogleMapReact>
        );
    }
}

export default OffersMap;

