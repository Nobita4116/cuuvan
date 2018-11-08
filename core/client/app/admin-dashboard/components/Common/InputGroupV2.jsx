import React, { Component } from 'react';

class InputGroupV2 extends Component {
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
        let { type, name, required, placeholder, icon, value, readOnly, status } = this.props
        type = type || 'text'
        required = (required == 0) ? false : true
        readOnly = readOnly || false
        icon = icon || 'icon-user'

        return (

            <div className="input-group">
                <span className="input-group-addon"><i className={icon}></i></span>
                {(status != 0) && (
                    <input type={type} className="form-control" name={name} placeholder={placeholder} onChange={this.handleInput} value={value} required={required} readOnly={true} />
                )}
                {(status == 0) && (
                    <input type={type} className="form-control" name={name} placeholder={placeholder} onChange={this.handleInput} value={value} required={required} />
                )}

            </div>

        );
    }
}

export default InputGroupV2;