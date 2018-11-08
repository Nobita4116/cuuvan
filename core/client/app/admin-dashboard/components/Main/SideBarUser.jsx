import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class SideBarUser extends Component {
    render() {
        let {users} = this.props;
        let {profile} = users;
        return(
            <div className="sidebar-user">
                <div className="category-content">
                    <div className="media">
                        {/* <a href="#" className="media-left"><img src="/images/avatar1.png" className="img-circle img-sm" alt=""/></a>
                        <div className="media-body">
                            <span className="media-heading text-semibold">DASHBOARD</span>
                        </div> */}
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

export default connect(mapStateToProps)(SideBarUser)