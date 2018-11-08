import React, { Component, PureComponent } from 'react';

class Devider extends PureComponent {
    render() {
        return (
            <div className="content-group pt-5">
                <div className="content-divider content-divider-muted text-muted">
                    <span><i className="icon-circle-down2"></i></span>
                </div>
            </div>
        );
    }
}

export default Devider;