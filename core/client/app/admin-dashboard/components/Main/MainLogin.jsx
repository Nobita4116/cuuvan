import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';

class MainLogin extends Component {
    render() {
        let {children} = this.props;
        return (
            <div>
				<ToastContainer />
            	<div className="navbar navbar-inverse">
			        <div className="navbar-header">
			            <a className="navbar-brand" href="#"><span className="textWhite font20">Cửu Vạn</span></a>
			        </div>
			    </div>

			    <div className="page-container login-cover">
			        <div className="page-content">
			            <div className="content-wrapper">
			                <div className="content">
			                    {children}
			                </div>
			            </div>
			        </div>
			    </div>
                
            </div>
        )
    }
}

export default MainLogin;