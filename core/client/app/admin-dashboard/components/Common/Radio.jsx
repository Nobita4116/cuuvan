import React, { Component } from 'react';

class Radio extends Component {
    changeRadio = (e) => {
        let {name} = this.props
        let isCheck = e.target.checked
        let value = e.target.value
        console.log('====', name, isCheck, value)
        this.props.changeRadio(name, value, isCheck)
    }

    render() {
        let {title, name, isCheck, value} = this.props
        return (
            <label className="radio-inline">
                <div className="choice">
                    <span className={isCheck ? 'checked' : ''}>
                        <input type="radio" className="styled" name={name} value={value} checked={isCheck} onChange={this.changeRadio.bind(this)}/>
                    </span>
                </div>
                {title}
            </label>
        );
    }
}

export default Radio;