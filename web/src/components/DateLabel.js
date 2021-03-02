import React from 'react';
import moment from 'moment'
import {DATE_FORMAT} from '../consts'
import  {Label} from 'react-bootstrap'
export default class DateLabel extends React.Component {

    render() {
        const date = moment(this.props.date);

        return (
            <div>
                <Label className={this.props.className}>{date.format(DATE_FORMAT)}</Label>
            </div>
        );
    }
}