import React, {Component, PropTypes} from 'react';

export default class Button extends Component {
    render() {
        let style = this.props.style || 'default';
        return (
            <button type="button" className={"btn btn-" + style} onClick={this.props.onClick}>{this.props.children}</button>
        );
    }
}