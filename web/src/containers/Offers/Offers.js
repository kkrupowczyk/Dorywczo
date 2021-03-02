import React from "react";
import {connect} from "react-redux";
import OffersList from './components/OffersList/OffersList'
import OffersMap from './components/OffersMap'
import OfferDetails from './components/OfferDetails'
import {getOffersRequest}from '../../redux/modules/offers'
import {loginUserRequest}from '../../redux/modules/user'
import {} from 'react-router'
import {Grid, Row, Col} from 'react-bootstrap'
import {MAP_DEFAULT, HISTORY_START_LENGTH} from '../../consts'
import {calculateVisibleMarkers}from '../../services/geo'
import './offers.scss'

class Offers extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            offersFiltered: [],

            hoveredOfferId: null,
            selectedOfferId: null,

            mapInfo: {
                center: MAP_DEFAULT.CENTRE,
                bounds: MAP_DEFAULT.BOUNDS,
                marginBounds: MAP_DEFAULT.MARGIN_BOUNDS,
                zoom: MAP_DEFAULT.ZOOM
            },

        };

        this.setHoveredOfferId = this.setHoveredOfferId.bind(this)
        this.setSelectedOfferId = this.setSelectedOfferId.bind(this)
        this.setMapInfo = this.setMapInfo.bind(this)
        this.goBackToOfferList = this.goBackToOfferList.bind(this)
    }

    componentWillMount() {
        this.props.getOffersRequest();
    }

    componentWillReceiveProps(newProps) {
        newProps.offersParamId ?
            this.setState({selectedOfferId: newProps.offersParamId}) :
            this.setState({offersFiltered: calculateVisibleMarkers(newProps.offers, this.state.mapInfo.marginBounds)})
    }

    setHoveredOfferId(id) {
        this.setState({
            hoveredOfferId: id
        })
    }

    setSelectedOfferId(id) {
        this.setState({
            selectedOfferId: id
        });
        id && this.props.router.push(`/offers/${id}`)
    }

    setMapInfo(center, zoom, bounds, marginBounds) {
        this.setState({
            offersFiltered: calculateVisibleMarkers(this.props.offers, marginBounds),
            mapInfo: {
                center: center,
                bounds: bounds,
                marginBounds: marginBounds,
                zoom: zoom
            },
        })
    }

    goBackToOfferList() {
        this.props.router.push('/offers')
    }

    render() {
        const {hoveredOfferId, selectedOfferId, mapInfo, offersFiltered} = this.state;
        const {offers, offersParamId} = this.props;
        let offerDetails;
        let offersList;

        if (offersParamId) {
            const offer = offers.find(o => o.id === offersParamId);

            if (offer) {
                offerDetails =
                    <OfferDetails
                        {...offer}
                        goBackToOfferList={this.goBackToOfferList}
                        setSelectedOfferId={this.setSelectedOfferId}/>;
            } else {
                //todo brak oferty
            }
        } else {
            offersList =
                <OffersList
                    offers={offersFiltered}
                    hoveredOfferId={hoveredOfferId}
                    selectedOfferId={selectedOfferId}
                    setSelectedOfferId={this.setSelectedOfferId}
                    setHoveredOfferId={this.setHoveredOfferId}/>;
        }

        return (
            <div className="offers">

                <div className="offers-list">
                    {offersList}
                    {offerDetails}
                </div>

                <div className="offers-map">
                    <OffersMap
                        offers={offers}
                        mapInfo={mapInfo}
                        setMapInfo={this.setMapInfo}
                        hoveredOfferId={hoveredOfferId}
                        selectedOfferId={selectedOfferId}
                        setSelectedOfferId={this.setSelectedOfferId}
                        setHoveredOfferId={this.setHoveredOfferId}/>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        offers: state.offers,
        offersParamId: ownProps.routeParams.id,
        user: state.user
    };
}
export default connect(mapStateToProps, {getOffersRequest, loginUserRequest})(Offers);

