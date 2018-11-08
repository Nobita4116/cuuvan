import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class PageHeader extends Component {
    render() {
        let {title, breadcrumb} = this.props
        let numberBreadcrumb = breadcrumb.length
        return (
            <div className="page-header page-header-default">
                <div className="page-header-content">
                    <div className="page-title">
                        <h4><i className="icon-arrow-left52 position-left"></i> <span className="text-semibold">{title}</span></h4>
                    </div>
                </div>

                <div className="breadcrumb-line">
                    <ul className="breadcrumb">
                        <li><Link to="/dashboard"><i className="icon-home2 position-left"></i> Home</Link></li>
                        {breadcrumb.map((it, idx) => {
                            if (idx + 1 == numberBreadcrumb) {
                                return <li className="active" key={idx}>{it.title}</li>
                            } else {
                                return <li key={idx}><Link to={it.link}>{it.title}</Link></li>
                            }
                        })}
                        
                    </ul>
                </div>
            </div>
        );
    }
}

export default PageHeader;