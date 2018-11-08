import React, {Component, PropTypes} from 'react';

class Alert extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {message} = this.props;

        let type = this.props.type || 'primary';
        let border = this.props.border || false;
        let style = this.props.style || false;
        
        let classAlert = 'alert alert-' + type;
        classAlert += border ? ' alert-bordered' : ' no-border';
        classAlert += style ? ' alert-styled-left' : '';

        return (
            <div className={classAlert}>
                <button type="button" className="close" data-dismiss="alert"><span>&times;</span><span className="sr-only">Close</span></button>
                {this.props.children}
            </div>
        );
    }
}

export default Alert;