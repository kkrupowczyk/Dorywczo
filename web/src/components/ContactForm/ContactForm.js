import React from "react";
import {Panel, Modal} from "react-bootstrap";
import {injectIntl, defineMessages, FormattedMessage} from "react-intl";
import {Field, reduxForm} from "redux-form";
import FormInput from "../FormInput";
import "./ContactForm.scss";
import validate from "./Validate";
import {FORM_CONTACT} from "../../consts";

const messages = defineMessages({
    'contactform.name.placeholder': {
        id: 'contactform.name.placeholder',
        defaultMessage: 'Type name here',
    },
    'contactform.email.placeholder': {
        id: 'contactform.email.placeholder',
        defaultMessage: 'Type email ',
    },
    'contactform.text.placeholder': {
        id: 'contactform.text.placeholder',
        defaultMessage: 'Type text',
    },
});

class ContactForm extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {isOpen, handleSubmit, closeContact} = this.props;
        const {formatMessage} = this.props.intl;

        return (
            <Modal show={isOpen} onHide={closeContact}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header>
                        <Modal.Title>
                            <FormattedMessage
                                id={ 'contactform.title' }
                                defaultMessage={ 'Contact us' }/>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Field type="text"
                               name="name"
                               component={FormInput}
                               placeholder={formatMessage(messages['contactform.name.placeholder'])}>
                            <FormattedMessage
                                id={ 'contactform.name' }
                                defaultMessage={ 'Name' }/>
                        </Field>

                        <Field type="text"
                               name="email"
                               component={FormInput}
                               placeholder={formatMessage(messages['contactform.email.placeholder'])}>
                            <FormattedMessage
                                id={ 'contactform.email' }
                                defaultMessage={ 'Email' }/>
                        </Field>

                        <Field componentClass="textarea"
                               name="text"
                               component={FormInput}
                               placeholder={formatMessage(messages['contactform.text.placeholder'])}
                               rows="5">
                            <FormattedMessage
                                id={ 'contactform.text' }
                                defaultMessage={ 'Text' }/>
                        </Field>
                    </Modal.Body>

                    <Modal.Footer>
                        <button type="submit" className="btn btn-submit of-submit">
                            <FormattedMessage
                                id={ 'contactform.submit' }
                                defaultMessage={ 'Send' }/>
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

export default reduxForm({
    form: FORM_CONTACT,
    fields: ['name', 'email', 'text'],
    validate
})(injectIntl(ContactForm))