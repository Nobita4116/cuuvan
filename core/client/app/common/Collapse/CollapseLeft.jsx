import React, { Component } from 'react';
import {connect} from 'react-redux';

import {OverlayTrigger, Tooltip} from 'react-bootstrap';

const tooltipEdit = (
    <Tooltip id="tooltip">
      <strong>Sửa thông tin item</strong>
    </Tooltip>
);

const tooltipRemove = (
    <Tooltip id="tooltip-r">
      <strong>Xóa item</strong>
    </Tooltip>
);

const tooltipAdd = (
    <Tooltip id="tooltip-a">
      <strong>Thêm item con</strong>
    </Tooltip>
);

const tooltipView = (
    <Tooltip id="tooltip-v">
      <strong>Xem file</strong>
    </Tooltip>
);

class CollapseLeft extends Component {
    constructor(props) {
        super(props);
        let isOpen = props.isOpen ? true : false;
        this.state = {
            openColl: isOpen,
            paddingContent: true
        }

        this.clickCollapse = this.clickCollapse.bind(this)
    }

    clickCollapse(e) {
        e.preventDefault();
        this.setState(state => ({
            openColl: !state.openColl
        }));
    }

    render() {
        let { openColl } = this.state;
        let { title, description, addButton, viewFile } = this.props;
        return (
            <div className="sidebar-category">
                <div
                    className={openColl ? "category-title-left" : "category-title-left category-collapsed"}
                >
                    <span className="fontBold" onClick={this.clickCollapse}>{title}</span>
                    <div className="heading-elements">
                        <div className="heading-btn">
                            <OverlayTrigger placement="top" overlay={tooltipAdd}>
                                <button className="btn text-info btn-flat btn-icon btn-rounded btn-xs" onClick={this.props.onClickBtn}>
                                    <i className="icon-plus-circle2"></i>
                                </button>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={tooltipEdit}>
                                <button className="btn text-success btn-flat btn-icon btn-rounded btn-xs" onClick={this.props.showModalEdit}>
                                    <i className="icon-pencil7"></i>
                                </button>
                            </OverlayTrigger>
                            
                            {viewFile ? (
                                <OverlayTrigger placement="top" overlay={tooltipView}>
                                    <button className="btn text-success btn-flat btn-icon btn-rounded btn-xs" onClick={this.props.viewFileItem}>
                                        <i className="icon-eye2"></i>
                                    </button>
                                </OverlayTrigger>
                            ) : ''}
                            <OverlayTrigger placement="top" overlay={tooltipRemove}>
                                <button className="btn text-warning btn-flat btn-icon btn-rounded btn-xs" onClick={this.props.showModalRemove}>
                                    <i className="icon-trash-alt"></i>
                                </button>
                            </OverlayTrigger>
                        </div>
                    </div>
                    <ul className="icons-list" onClick={this.clickCollapse}>
                        <li><a href="#" data-action="collapse" className={openColl ? "" : "rotate-180"}></a></li>
                    </ul>
                </div>
                {this.props.children ? (
                    <div className={openColl ? "category-content" : "category-content hide-text"}>
                        {description ? (
                            <span className="help-block">{description}</span>
                        ) : ''}
                        {this.props.children}
                    </div>
                ) : ''}
                
            </div>
        );
    }
}

export default CollapseLeft;