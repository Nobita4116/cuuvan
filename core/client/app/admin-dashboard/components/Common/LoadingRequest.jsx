import React, { Component } from 'react';

class LoadingRequest extends Component {
    render() {
        return (
            <div className="text-center">
                <div className="pace-demo">
                    <div className="theme_tail"><div className="pace_progress" data-progress-text="60%" data-progress="60" style={{width: '60%'}}></div><div className="pace_activity"></div></div>
                </div>
            </div>
        );
    }
}

export default LoadingRequest;