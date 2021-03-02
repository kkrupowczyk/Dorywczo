import React from "react";
import {connect} from "react-redux";
import OfferForm from './components/OfferForm'
import {postOfferRequest} from '../../redux/modules/offers'
import {destroy} from 'redux-form';
import {getFormValues, change} from 'redux-form'
import moment from 'moment'
import {FORM_OFFER} from '../../consts'

class NewOffer extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleSubmitForm() {
        this.props.change(FORM_OFFER, 'dateCreation', moment().valueOf());
        this.props.postOfferRequest();
        this.props.router.replace(`/offers`);
        this.props.destroy(FORM_OFFER);
    }


    render() {

        return (
            <div className="container">
                <OfferForm onSubmit={this.handleSubmitForm}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        offer: getFormValues('offer')(state)
    };
}
export default connect(mapStateToProps, {destroy, change, postOfferRequest})(NewOffer);
