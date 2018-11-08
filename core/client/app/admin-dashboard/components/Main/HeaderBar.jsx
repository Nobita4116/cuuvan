import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class HeaderBar extends Component {

    signOut() {
        alert('logout');
    }

    onClickProfile(e) {
        alert('logout');
    }

    RedirectToSelectApp() {
        alert('logout');
        // browserHistory.push('/main/select_app');
    }

    changeLanguage(lang, e) {
        e.preventDefault();
        alert('logout');
    }

    render() {
        let lang = 'vi';
        let avatar = '/dist/img/avatar-default.png';
        let users = {
            name: 'Hieu'
        }

        return (
            <div className="navbar navbar-inverse bgBlueKT">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#"><span className="textWhite font20"  onClick={this.RedirectToSelectApp.bind(this)}>czcx</span></a>
                    <ul className="nav navbar-nav pull-right visible-xs-block">
                        <li><a data-toggle="collapse" data-target="#navbar-mobile"><i className="icon-tree5"></i></a></li>
                    </ul>
                </div>
                <div className="navbar-collapse collapse" id="navbar-mobile">
                    <div className="navbar-right">
                        <ul className="nav navbar-nav">
                            <li className="dropdown language-switch">
                                <a className="dropdown-toggle" data-toggle="dropdown">
                                    <img src={lang == 'vi' ? "/images/flags/vn.png" : "/images/flags/gb.png"} className="position-left" alt=""/>
                                    {lang == 'vi' ? "Vietnam" : "English"}
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="vi" onClick={this.changeLanguage.bind(this,'vi')}><img src="/images/flags/vn.png" alt=""/> Vietnam</a></li>
                                    <li><a className="en" onClick={this.changeLanguage.bind(this,'en')}><img src="/images/flags/gb.png" alt=""/> English</a></li>
                                </ul>
                            </li>
                            <li className="dropdown dropdown-user">
                                <a className="dropdown-toggle" data-toggle="dropdown">
                                    <img src={avatar} alt=""/>
                                    <span>{users.name}</span>
                                    <i className="caret"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a href="#" onClick={() => {this.signOut()}}><i className="icon-switch2"></i> Logout</a></li>
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
    const { users } = state;
    return {
        users
    };
}
export default withRouter(connect(mapStateToProps)(HeaderBar));
