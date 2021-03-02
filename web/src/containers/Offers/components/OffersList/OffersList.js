import React from "react";
import OfferListElement from '../OffersListElement/OffersListElement'
import {AutoSizer, List}from 'react-virtualized'
import './OffersList.scss'

class OffersList extends React.Component {

    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
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

    renderRow(row) {
        const {columnIndex, index, isScrolling, isVisible, key, style} = row;

        const {offers, selectedOfferId, hoveredOfferId} = this.props;
        const offer = offers[index];

        return (
            <OfferListElement
                {...offer}
                key={offer.id}
                style={style}
                isSelectedOffer={selectedOfferId === offer.id}
                isHoveredOffer={hoveredOfferId === offer.id}
                onClick={this.onClick}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            />
        )
    }

    render() {
        const {offers, hoveredOfferId} = this.props;

        return (
            <AutoSizer disableHeight>
                {({height, width}) => (
                    <List
                        ref='offers-list'
                        height={height}
                        width={width}
                        scrollToIndex={2}
                        className="ol-list"
                        rowHeight={75}
                        rowCount={offers.length}
                        rowRenderer={this.renderRow}
                        hoveredOfferId={hoveredOfferId}
                    />)}
            </AutoSizer>
        );
    }
}

export default OffersList;
