import React, {Component} from 'react';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheck: props.isCheck,
            title: props.title
        }
    }

    onChange() {
        let {isCheck} = this.state;
        this.setState({
            isCheck: !isCheck
        });

        this.props.onChange({check: !isCheck, id: this.props.id, type: this.props.type});
    }

    render() {
        let {isCheck, title} = this.state;
        return (
            <div className="checkbox">
                <label>
                    <div className="checker">
                        <span className={isCheck? 'checked' : ''}>
                            <input type="checkbox" className="styled" checked={isCheck} onChange={this.onChange.bind(this)}/>
                        </span>
                    </div>
                    {title}
                </label>
            </div>
        );
    }
}

export default Checkbox;