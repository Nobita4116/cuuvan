import React, { Component, Fragment } from 'react';

class Pagination extends Component {

    clickPage(page, e) {
        e.preventDefault();
        this.props.clickPage(page);
    }

    clickDisabled(e) {
        e.preventDefault();
    }

    render() {
        let {page, number_page} = this.props;
        if (number_page < 1) return ''
        return (
            <ul className="pagination pagination-separated">
                {page == 1 && (
                    <li className="disabled">
                        <a href="#" onClick={this.clickDisabled.bind(this)}>
                            <span className="fa fa-angle-double-left"></span>
                        </a>
                    </li>
                )}
                {page > 1 && (
                    <Fragment>
                        <li>
                            <a href="#" onClick={this.clickPage.bind(this, page - 1)}>
                                <span className="fa fa-angle-double-left"></span>
                            </a>
                        </li>
                        {page > 2 && <li><a href="#" onClick={this.clickPage.bind(this, page - 2)}>{page - 2}</a></li>}
                        <li><a href="#" onClick={this.clickPage.bind(this, page - 1)}>{page - 1}</a></li>
                    </Fragment>
                )}
                
                <li className="active"><a href="#">{page}</a></li>

                {page < number_page && (
                    <Fragment>
                        <li><a href="#" onClick={this.clickPage.bind(this, page + 1)}>{page + 1}</a></li>
                        {page + 1 < number_page && <li><a href="#" onClick={this.clickPage.bind(this, page + 2)}>{page + 2}</a></li>}
                        <li>
                            <a href="#" onClick={this.clickPage.bind(this, page + 1)}>
                                <span className="fa fa-angle-double-right" role="button"></span>
                            </a>
                        </li>
                        
                    </Fragment>
                )}

                {page == number_page && (
                    <li className="disabled">
                        <a href="#" onClick={this.clickDisabled.bind(this)}>
                            <span className="fa fa-angle-double-right" role="button"></span>
                        </a>
                    </li>
                )} 
                
            </ul>
        );
    }
}

export default Pagination;