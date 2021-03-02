import React from "react";
import {Row, Col, Label} from "react-bootstrap";
import DateLabel from "../../../../components/DateLabel";
import "./OffersListElement.scss";

export default class OfferListElement extends React.Component {

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
        let {isSelectedOffer, isHoveredOffer, style} = this.props;
        let isHovered = this.state.isHovered || isSelectedOffer || isHoveredOffer;

        return (
            <div className={'ole-container ' + (isHovered ? 'selected' : '')}
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}
                 style={style}
                 onClick={this.onClick}>

                <Row>
                    <Col lg={9} md={9} sm={9} xs={8} className="vcenter">
                        <h4 className="ole-title"><strong>{this.props.title}</strong></h4>
                    </Col>
                    <Col lg={3} md={3} sm={3} xs={4} className="text-right vcenter">
                        <div className="ole-label-container">
                            <DateLabel className="ole-dateCreation" date={this.props.dateCreation}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h5 className=" ole-description">
                            {this.props.description}
                        </h5>
                    </Col>
                </Row>
            </div>
        )
    }
}

