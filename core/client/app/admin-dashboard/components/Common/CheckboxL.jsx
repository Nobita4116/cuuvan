import React, { Component } from 'react';

class CheckboxL extends Component {

    onChange() {
        let { isCheck, id } = this.props.item;
        let check = !isCheck;
        this.props.onChange(check, id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.item.id)
    }

    render() {
        let { isCheck, title } = this.props.item;
        let { status } = this.props
        return (
            <div className="checkbox" key={this.props.index}>
                <label>

                    {(status != 0) && (
                        <div className="checker">
                            <span className={isCheck ? 'checked' : ''}>
                                <input type="checkbox" className="styled" checked={isCheck} onChange={this.onChange.bind(this)} disabled />
                            </span>
                        </div>
                    )}

                    {(status == 0) && (
                        <div className="checker">
                            <span className={isCheck ? 'checked' : ''}>
                                <input type="checkbox" className="styled" checked={isCheck} onChange={this.onChange.bind(this)} />
                            </span>
                        </div>
                    )}

                    {title}
                    {(status == 2 && isCheck == true) && (
                        <button className="btn btn-danger col-md-10" type="button" onClick={this.onUpdate} > Chọn Thợ </button>
                    )}

                </label>
            </div>
        );
    }
}

export default CheckboxL;