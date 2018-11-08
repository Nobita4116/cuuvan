import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Notification from './Notification'

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {users} = this.props;
        let {profile} = users;
        return (
            <div className="navbar navbar-inverse">
				<div className="navbar-header">
					<a className="navbar-brand" href="index.html">Cuu van Dashboard</a>

					<ul className="nav navbar-nav visible-xs-block">
						<li><a data-toggle="collapse" data-target="#navbar-mobile"><i className="icon-tree5"></i></a></li>
						<li><a className="sidebar-mobile-main-toggle"><i className="icon-paragraph-justify3"></i></a></li>
					</ul>
				</div>
                <div className="navbar-collapse collapse" id="navbar-mobile">
                    <ul className="nav navbar-nav">
                        <li><a className="sidebar-control sidebar-main-toggle hidden-xs"><i className="icon-paragraph-justify3"></i></a></li>
                    </ul>

                    <div className="navbar-right">
                        <ul className="nav navbar-nav">

                            <Notification />

                            <li className="dropdown dropdown-user">
                                <a className="dropdown-toggle" data-toggle="dropdown">
                                    <img src={profile.image || "/images/anonymous.png"} alt="" style={{width: 30}}/>
                                    <span>{profile.name}</span>
                                    <i className="caret"></i>
                                </a>

                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><Link to="/profile"><i className="icon-user-plus"></i> Tài khoản</Link></li>
                                    <li><a href="/logout"><i className="icon-switch2"></i> Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
			</div>
        
        );
    }
}

function mapStateToProps(state) {
    let {users} = state;
    return {
        users
    }
}

export default connect(mapStateToProps)(Header)