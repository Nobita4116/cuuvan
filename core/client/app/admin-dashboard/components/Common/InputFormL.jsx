import React, { Component } from 'react';

class InputFormL extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value || ''
        }
    }

    handleInput = (e) => {
        this.setState({
            value: e.target.value
        })

        this.props.changeInput(e.target.name, e.target.value)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.value != this.state.value) {
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
            <input type={type} className="form-control" name={name} placeholder={placeholder} onChange={this.handleInput} value={this.state.value} required={required} readOnly={readOnly}/>
        );
    }
}

export default InputFormL;