import React, { Component } from 'react';

class RateCustomer extends Component {
    render() {
        let { rate } = this.props
        if (rate == 1) {
            return <span className="label label-default">Không hài lòng</span>
        } else if (rate == 2) {
            return <span className="label label-primary">Bình thường</span>
        } else if (rate == 3) {
            return <span className="label label-success">Hài Lòng</span>
        } else if (rate == 4) {
            return <span className="label label-info">Rất hài lòng</span>
        }
    }
}

export default RateCustomer;
