import React, {Component} from 'react';
import {connect} from 'react-redux';
import SideBarUser from './SideBarUser';
import Navigation from './Navigation';

class SideBar extends Component {
    render() {
        return (
            <div className="sidebar sidebar-main">
				<div className="sidebar-content">

                    <SideBarUser />
                    <Navigation />

                </div>
            </div>
        );
    }
}

export default SideBar;