import React from 'react';
import {FormGroup, FormControl, ControlLabel, HelpBlock, Checkbox} from 'react-bootstrap';

export default class CheckboxInput extends React.Component {

    constructor(props) {
        super(props);

        let bool = this.props.input.value;

        this.state = {
            bool: bool
        };

        this.onChange = this.onChange.bind(this)
    }

    onChange() {
        this.props.input.onChange(!this.state.bool);
        this.setState((prevState) => {
            return {bool: !prevState.bool};
        });
    }

    render() {
        return (
            <Checkbox className={this.props.className}
                      onChange={this.onChange}
                      checked={this.state.bool}>
                {this.props.children}
            </Checkbox>
        );
    }
}
