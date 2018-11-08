import React, { Component } from 'react';

class Collapse extends Component {
    constructor(props) {
        super(props);
        let isOpen = props.isOpen ? true : false;
        this.state = {
            openColl: isOpen,
            paddingContent: true
        }
    }

    clickCollapse(isOpen, e) {
        e.preventDefault();
        this.setState({
            openColl: !isOpen
        });
    }

    render() {
        let { openColl } = this.state;
        let { title, description, addButton } = this.props;
        return (
            <div className="sidebar-category">
                <div
                    className={openColl ? "category-title" : "category-title category-collapsed"}
                    onClick={this.clickCollapse.bind(this, openColl)}
                >
                    <span className="fontBold">{title}</span>
                    <ul className="icons-list">
                        <li><a href="#" data-action="collapse" className={openColl ? "" : "rotate-180"}></a></li>
                    </ul>
                </div>
                <div className={openColl ? "category-content" : "category-content hide-text"}>
                    {description ? (
                        <span className="help-block">{description}</span>
                    ) : ''}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Collapse;