import React, { Component } from 'react';

class InputGroup extends Component {
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
        let {type, name, required, placeholder, icon} = this.props
        type = type || 'text'
        required = (required == 0) ? false : true
        icon = icon || 'icon-user'

        return (
            <div className="input-group">
                <span className="input-group-addon"><i className={icon}></i></span>
                <input type={type} className="form-control" name={name} placeholder={placeholder} onChange={this.handleInput} value={this.state.value} required={required}/>
            </div>
        );
    }
}

export default InputGroup;