import React, {Component, PropTypes} from 'react';
import Buttons from 'react-bootstrap-button-loader';

export default class ButtonLoader extends Component {
    render() {
        let style = this.props.style || 'primary';
        return(
            <Buttons loading={this.props.loading} bsStyle={style} onClick={this.props.clickFunc}>{this.props.text}</Buttons>
        );
    }
}