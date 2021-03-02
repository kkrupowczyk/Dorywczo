import React from 'react';
import {FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';

export default class FormInput extends React.Component {

    render() {
        const {placeholder, type, input, meta: {touched, error}, componentClass,rows} = this.props;

        const validationState = touched && ( error && "error" ) || null;

        return (
            <FormGroup controlId={input.name} validationState={validationState}>
                <ControlLabel>{this.props.children}</ControlLabel>
                <FormControl type={type}
                             rows={rows}
                             componentClass={componentClass}
                             placeholder={placeholder} {...input}
                             onChange={input.onChange}/>
                {touched && error && <HelpBlock>{error}</HelpBlock>}
            </FormGroup>
        );
    }
}
