import React from "react";
import {Button, ButtonToolbar, ControlLabel, FormGroup} from "react-bootstrap";
import './RadioButtonsInput.scss'

export default class RadioButtonsInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = {option: this.props.input.value};

        this.onOptionChange = this.onOptionChange.bind(this);
        this.setClassName = this.setClassName.bind(this);
    }

    onOptionChange(option) {
        this.setState({option: option})
        this.props.input.onChange(option);
    }

    setClassName(option, validationState) {
        let className;
        if (validationState) {
            className = 'btn-tag-error'
        } else {
            className = this.state.option === option ? 'btn-tag active' : 'btn-tag'
        }
        return `btn ${className}`;
    }

    render() {
        const {meta: {touched, error}} = this.props;

        const validationState = touched && ( error && "error" ) || null;

        return (
            <FormGroup validationState={validationState}>
                <ControlLabel>{this.props.children}</ControlLabel>
                <ButtonToolbar>

                    {this.props.options.map((option, index) =>
                        <a className={this.setClassName(option, validationState)}
                           value={option}
                           key={index}
                           onClick={() => this.onOptionChange(option)}>
                            {option}
                        </a>)}

                </ButtonToolbar>
            </FormGroup>
        );
    }
}