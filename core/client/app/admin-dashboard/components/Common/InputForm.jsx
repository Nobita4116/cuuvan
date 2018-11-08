import React, { Component } from 'react';

class InputForm extends Component {
    handleInput = (e) => {
        this.props.changeInput(e.target.name, e.target.value)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.value != this.props.value) {
            return true
        }

        return false
    }

    render() {
        let {type, name, placeholder, required, readOnly} = this.props
        type = type || 'text'
        required = required ? true : false
        readOnly = readOnly ? true : false

        return (
            <input type={type} className="form-control" name={name} placeholder={placeholder} onChange={this.handleInput} value={this.props.value} required={required} readOnly={readOnly}/>
        );
    }
}

export default InputForm;