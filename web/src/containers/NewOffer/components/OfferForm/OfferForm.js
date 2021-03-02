import React, {PropTypes} from "react";
import {Panel, Checkbox} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import MapInput from "../../../../components/MapInput";
import CheckboxInput from "../../../../components/CheckboxInput";
import DatePickerInput from "../../../../components/DatePickerInput";
import FormInput from "../../../../components/FormInput";
import RadioButtonsInput from "../../../../components/RadioButtonsInput/RadioButtonsInput";
import {OFFER_TYPES, FORM_OFFER, FB_GROUPS} from "../../../../consts";
import validate from "./Validate";
import {FormattedMessage, injectIntl, defineMessages} from "react-intl";
import DropDownInput from '../../../../components/DropDownInput/DropDownInput'
import "./OfferForm.scss";

const messages = defineMessages({
    'offerform.title.placeholder': {
        id: 'offerform.title.placeholder',
        defaultMessage: 'Type title here',
    },
    'offerform.description.placeholder': {
        id: 'offerform.description.placeholder',
        defaultMessage: 'Type here Description',
    },
    'offerform.salary.placeholder': {
        id: 'offerform.salary.placeholder',
        defaultMessage: 'Type here salary',
    },
    'offerform.address.placeholder': {
        id: 'offerform.address.placeholder',
        defaultMessage: 'Type here address',
    },
    'offerform.dateDescription.placeholder': {
        id: 'offerform.dateDescription.placeholder',
        defaultMessage: 'Type datedescription here',
    },
    'offerform.dateExpiration.placeholder': {
        id: 'offerform.dateExpiration.placeholder',
        defaultMessage: 'Type here dateexpiration',
    },
    'offerform.fbGroupId.titleDefault': {
        id: 'offerform.fbGroupId.titleDefault',
        defaultMessage: 'Choose option',
    },
});

class OfferForm extends React.Component {
    constructor(props) {
        super(props);

        this.constructorItemsDropDownGroups = this.constructorItemsDropDownGroups.bind(this)
    }

    constructorItemsDropDownGroups() {
        return [
            {
                name: 'no group',
                id: -1
            },
            ...FB_GROUPS
        ];
    }

    render() {
        const {handleSubmit, submitting} = this.props;
        const {formatMessage} = this.props.intl;

        return (

            <form onSubmit={handleSubmit}>

                <Panel className="of-container">

                    <Field type="text"
                           name="title"
                           component={FormInput}
                           placeholder={formatMessage(messages['offerform.title.placeholder'])}>
                        <FormattedMessage
                            id={ 'offerform.title' }
                            defaultMessage={ 'Title' }/>
                    </Field>

                    <Field componentClass="textarea"
                           name="description"
                           component={FormInput}
                           placeholder={formatMessage(messages['offerform.description.placeholder'])}
                           rows="5">
                        <FormattedMessage
                            id={ 'offerform.description' }
                            defaultMessage={ 'Description' }/>
                    </Field>

                    <Field name="location"
                           component={MapInput}
                           style={{height: '400px'}}>
                        <FormattedMessage
                            id={ 'offerform.location' }
                            defaultMessage={ 'Choose location' }/>
                    </Field>


                    <Field name="dateExpiration"
                           component={DatePickerInput}
                           placeholderText={formatMessage(messages['offerform.dateExpiration.placeholder'])}>
                        <FormattedMessage
                            id={ 'offerform.dateExpiration' }
                            defaultMessage={ 'Choose date expiration' }/>
                    </Field>

                    <Field name="fbGroupId"
                           component={DropDownInput}
                           dropDownId="fbDropDown"
                           titleDefault={formatMessage(messages['offerform.fbGroupId.titleDefault'])}
                           items={this.constructorItemsDropDownGroups()}>
                        <FormattedMessage
                            id={ 'offerform.fbGroupId' }
                            defaultMessage={ 'Choose facebook group' }/>
                    </Field>

                    <Field name="isFBContact"
                           className="of-isFBContact"
                           component={CheckboxInput}>
                        <FormattedMessage
                            id={ 'offerform.isFBContact' }
                            defaultMessage={ 'Do you want ' }/>
                    </Field>

                    <button type="submit" className="btn btn-submit of-submit" disabled={submitting}>
                        <FormattedMessage
                            id={ 'offerform.submit' }
                            defaultMessage={ 'Submit' }/>
                    </button>

                </Panel>
            </form>
        );
    }
}

export default reduxForm({
    form: FORM_OFFER,
    destroyOnUnmount: false,
    validate
})(injectIntl(OfferForm))
