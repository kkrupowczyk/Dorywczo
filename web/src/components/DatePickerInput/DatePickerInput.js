import React from "react";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import './DatePickerInput.scss'
import moment from 'moment'
import {DATE_FORMAT} from '../../consts'

export default class MapInput extends React.Component {

    constructor(props) {
        super(props);

        let date = moment(this.props.input.value);
        this.state = {
            date: date.isValid() ? date : null
        };

        this.onDatePickerChange = this.onDatePickerChange.bind(this)
    }

    onDatePickerChange(date) {
        this.setState({date: date});
        this.props.input.onChange(date.valueOf());
    }

    render() {
        const {placeholderText, meta: {touched, error}} = this.props;

        const validationState = touched && ( error && "error" ) || null;

        return (
            <FormGroup validationState={validationState}>
                <ControlLabel>{this.props.children}</ControlLabel>
                <DatePicker
                    withPortal
                    placeholderText={placeholderText}
                    selected={this.state.date}
                    dateFormat={DATE_FORMAT}
                    onChange={this.onDatePickerChange}
                    className="form-control"/>
                {touched && error && <HelpBlock>{error}</HelpBlock>}
            </FormGroup>
        );
    }
}


