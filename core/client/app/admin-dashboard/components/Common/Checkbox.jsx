import React, { Component } from 'react';

class Checkbox extends Component {

    onChange() {
        let { isCheck, id } = this.props.item;
        let check = !isCheck;
        this.props.onChange(check, id);
    }

    render() {
        let { isCheck, title } = this.props.item;
        return (
            <div className="checkbox" key={this.props.index}>
                <label>
                    <div className="checker">
                        <span className={isCheck ? 'checked' : ''}>
                            <input type="checkbox" className="styled" checked={isCheck} onChange={this.onChange.bind(this)} />
                        </span>
                    </div>
                    {title}
                </label>
            </div>
        );
    }
}

export default Checkbox;