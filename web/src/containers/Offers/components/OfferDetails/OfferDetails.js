import React, {PropTypes} from "react";
import {Glyphicon, Row, Col, Label} from "react-bootstrap";
import "./OfferDetails.scss";
import DateLabel from "../../../../components/DateLabel";
import {FormattedMessage} from "react-intl";

class OfferDetails extends React.Component {

    constructor(props) {
        super(props);

        this.goBackToOfferList = this.goBackToOfferList.bind(this);
    }

    componentWillUnmount() {
        this.props.setSelectedOfferId(null);
    }

    goBackToOfferList() {
        this.props.goBackToOfferList()
    }

    render() {
        let messangerUri = `https://www.facebook.com/messages/t/${this.props.userId}`;

        return (
            <div className="od-container">

                <Row>
                    <Col lg={9} md={8} sm={7} xs={12} className="vcenter">
                        <h3 className="od-title"><strong>{this.props.title}</strong></h3>
                    </Col>
                    <Col lg={2} md={3} sm={3} xs={9} className="vcenter">
                        <DateLabel className="od-dateCreation" date={this.props.dateCreation}/>
                    </Col>
                    <Col lg={1} md={1} sm={2} xs={3} className="vcenter">
                        <Glyphicon className="od-close"
                                   glyph="remove"
                                   onClick={this.goBackToOfferList}/>
                    </Col>
                </Row>

                <div className="od-date-container">
                    <h4 className="od-date od-description">{this.props.description}</h4>
                </div>

                {this.props.isFBContact && <div className="od-date-container">
                    <h5 className="od-date">
                        <a href={messangerUri}
                           className="od-contact">
                            <FormattedMessage
                                id={ 'offerDetails.contact.send' }
                                defaultMessage={ 'Sent message via facebook' }/>
                        </a>
                    </h5>
                </div>}

            </div>
        );
    }
}

OfferDetails.defaultProps = {isCloseBtn: false};

export default OfferDetails
