import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Header from './Header';
import SideBar from './SideBar';

class App extends Component {
    render() {
        let {children} = this.props;
        return (
            <div>
				<ToastContainer />
				<Header />
				<div className="page-container">
					<div className="page-content">
						<SideBar />

						<div className="content-wrapper">
								{this.props.children}
							
                    	</div>

					</div>
				</div>
			</div>
        )
    }
}

export default App;