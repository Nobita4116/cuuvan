import React, { Component } from 'react';

class TextAreaForm extends Component {
    constructor(props){
        super(props)
    }

    handleInput = (e) => {
        this.props.changeInput(this.props.name, e.target.value)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.value != this.props.value) {
            return true
        }

        return false
    }

    render() {
        return (
            <textarea name={this.props.name} rows="3" cols="3" placeholder="" className="form-control" onChange={this.handleInput} value={this.props.value} />
        );
    }
}

export default TextAreaForm;