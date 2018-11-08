import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        // let {t, navigations} = this.props;
        // let {menuActive, listMenu} = navigations;
        // let menu = listMenu.filter(item => {
        //     return item.url == menuActive;
        // });
        // let levelActive = menuActive.length;
        return(
            <div className="breadcrumb-line">
                {/* <ul className="breadcrumb">
                    <li><Link to="/course/list"><i className="icon-home2 position-left"></i> Home</Link></li>
                    {menu.length? (
                        <li className='active'><Link to={menu[0].url}>{menu[0].name}</Link></li>
                    ) : ''}
                </ul> */}
            </div>
        );
    }
}

export default Breadcrumb