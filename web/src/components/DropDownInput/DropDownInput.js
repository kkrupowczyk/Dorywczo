import React from "react";
import {FormGroup, ControlLabel, HelpBlock, DropdownButton, MenuItem, Button} from "react-bootstrap";
import './DropDownInput.scss'
import * as bUtils from 'react-bootstrap/lib/utils/bootstrapUtils'

bUtils.addStyle(DropdownButton, 'drop','drop-error','drop active');
bUtils.addStyle(Button, 'drop','drop-error','drop active');

export default class DropDownInput extends React.Component {

    constructor(props) {
        super(props);

        let id = this.props.input.value;
        this.state = {
            id: id,
            title: this.getTitle(id)
        };

        this.onOptionChange = this.onOptionChange.bind(this);
        this.getTitle = this.getTitle.bind(this);
        this.setClassName = this.setClassName.bind(this);
    }

    getTitle(id) {
        let item = this.props.items.find((e) => e.id === id);
        return item ? item.name : this.props.titleDefault;
    }

    setClassName(validationState) {
        let className;
        if (validationState) {
            className = 'drop-error'
        } else {
            className = this.state.id ? 'drop active' : 'drop'
        }
        return className;
    }

    onOptionChange(id) {
        this.setState({
            id: id,
            title: this.getTitle(id)
        });
        this.props.input.onChange(id);
    }

    render() {
        const {items, dropDownId, meta: {touched, error}} = this.props;

        const validationState = touched && ( error && "error" ) || null;

        return (
            <FormGroup validationState={validationState}>
                <ControlLabel>{this.props.children}</ControlLabel>
                <DropdownButton
                    bsStyle={this.setClassName(validationState)}
                    title={this.state.title}
                    id={dropDownId}
                    onSelect={this.onOptionChange}>

                    {items.map(item =>
                        <MenuItem eventKey={item.id}
                                  active={this.state.id === item.id}
                                  key={item.id}>
                            {item.name}
                        </MenuItem>
                    )}

                </DropdownButton>
                {touched && error && <HelpBlock>{error}</HelpBlock>}
            </FormGroup>
        );
    }
}



