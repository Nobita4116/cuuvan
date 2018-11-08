import React, { Component, Fragment } from 'react';

class CustomerReview extends Component {
    render() {
        let { review } = this.props;
        return (
            <Fragment>
                {(review == 1) &&
                    <span className="label label-default">Không hài lòng</span>}
                {review == 2 &&
                    <span className="label label-primary">Bình thường</span>}
                {review == 3 &&
                    <span className="label label-success">Hài Lòng</span>}
                {review == 4 &&
                    <span className="label label-info">Rất hài lòng</span>}
            </Fragment>
        )
    }
}

export default CustomerReview;
