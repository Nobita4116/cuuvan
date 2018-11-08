import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { makeRequest } from '../../../libs/request'
import { connect } from 'react-redux'

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listMenu: [
                {
                    id: 1,
                    name: 'Dashboard',
                    icon: 'icon-home5',
                    url: '/dashboard',
                    path: '/dashboard',
                    pers: 'dashboard',
                    level: 1,
                    is_admin: 0,
                    child: []
                },
                {
                    id: 2,
                    name: 'Dịch vụ',
                    icon: 'icon-delicious',
                    url: '/services',
                    path: '/services',
                    pers: 'services',
                    level: 1,
                    is_admin: 0,
                    child: [
                        {
                            name: 'Danh sách dịch vụ',
                            url: '/services/list',
                            path: 'list',
                            parent: 2,
                            is_admin: 0
                        },
                        {
                            name: 'Tạo mới dịch vụ',
                            url: '/services/create',
                            path: 'create',
                            parent: 2,
                            is_admin: 0
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Hạng Mục Công Việc',
                    icon: 'icon-clipboard5',
                    url: '/work_item',
                    path: '/work_item',
                    pers: 'work_item',
                    level: 1,
                    is_admin: 0,
                    child: [
                        {
                            name: 'Danh sách hạng mục',
                            url: '/work_item/list',
                            path: 'list',
                            parent: 3,
                            is_admin: 0
                        },
                        {
                            name: 'Tạo mới hạng mục',
                            url: '/work_item/create',
                            path: 'create',
                            parent: 3,
                            is_admin: 0
                        }
                    ]
                },
                {
                    id: 6,
                    name: 'Công Việc',
                    icon: 'icon-briefcase',
                    url: '/work',
                    path: '/work',
                    pers: 'work',
                    level: 1,
                    is_admin: 0,
                    child: [
                        {
                            name: 'Tiến độ công việc',
                            url: '/work/progress',
                            path: 'progress',
                            parent: 6,
                            is_admin: 0,
                            is_agency: 1
                        },
                        {
                            name: 'Danh sách yêu cầu công việc',
                            url: '/work/request/list',
                            path: 'list',
                            parent: 6,
                            is_admin: 0
                        },
                        {
                            name: 'Tạo yêu cầu công việc',
                            url: '/work/request/create',
                            path: 'request',
                            parent: 6,
                            is_admin: 0
                        }
                    ]
                },
                {
                    id: 4,
                    name: 'Khách hàng',
                    icon: 'icon-user',
                    url: '/customer',
                    path: '/customer',
                    pers: 'customer',
                    level: 1,
                    is_admin: 0,
                    child: [
                        {
                            name: 'Danh sách khác hàng',
                            url: '/customer/list',
                            path: 'list',
                            parent: 4,
                            is_admin: 0
                        },
                        {
                            name: 'Thêm mới khách hàng',
                            url: '/customer/create',
                            path: 'create',
                            parent: 4,
                            is_admin: 0
                        },
                    ]
                },
                {
                    id: 5,
                    name: 'Quản lý thợ',
                    icon: 'icon-certificate',
                    url: '/employee',
                    path: '/employee',
                    pers: 'employee',
                    level: 1,
                    is_admin: 0,
                    child: [
                        {
                            name: ' Danh sách thợ',
                            url: '/employee/list',
                            path: 'list',
                            parent: 5,
                            is_admin: 0,
                            is_agency: 1
                        },
                        {
                            name: 'Tạo thợ mới',
                            url: '/employee/new',
                            path: 'new',
                            parent: 5,
                            is_admin: 0,
                            is_agency: 1
                        },
                        {
                            name: 'Bảng lương của thợ',
                            url: '/employee/table',
                            path: 'wage',
                            parent: 5,
                            is_admin: 0,
                            is_agency: 1
                        },
                        {
                            name: 'Quản lý chi phí trả cho thợ',
                            url: '/employee/wage',
                            path: 'wage',
                            parent: 5,
                            is_admin: 0,
                            is_agency: 1
                        }

                    ]
                }
            ],
            idMenu: 1,
            idxActive: 0,
            allObject: [],
            allAction: []
        }
    }

    componentWillMount() {
        makeRequest('get', '/permission/getPermissionUser', {})
            .then(result => {
                if (result.signal) {
                    let allPermission = result.data
                    let allObject = ['dashboard'], allAction = []
                    allPermission.map(pers => {
                        allObject.push(pers.object)
                        allAction.push(pers.action)
                    })

                    this.setState({
                        allObject,
                        allAction
                    })
                }
            })
    }

    componentDidMount() {
        let { location } = this.props
        let { pathname } = location
        let { listMenu } = this.state

        let idMenu = 1, idxActive = 0;
        listMenu.map((menu) => {
            if (pathname.indexOf(menu.path) >= 0) {
                idMenu = menu.id
                menu.child.map((child, idx) => {
                    if (pathname.indexOf(child.path) >= 0) {
                        idxActive = idx
                    }
                })
            }
        })

        this.setState({
            idMenu,
            idxActive
        })
    }

    clickMenu(menu, idx, e) {
        e.preventDefault()
        let { history } = this.props
        let { idMenu } = this.state

        if (!menu.level || (menu.level == 1 && !menu.child.length && menu.id != idMenu)) {
            history.push(menu.url)
        }

        this.setState({
            idMenu: menu.id || menu.parent,
            idxActive: idx
        })
    }

    renderListMenu() {
        let { users } = this.props
        let isAdmin = users.type ? true : false
        let { listMenu, idMenu, idxActive, allObject, allAction } = this.state

        if (isAdmin) {
            return listMenu.map((item, idx) => {
                if (item.is_agency) return ''
                if (allObject.indexOf(item.pers) < 0) return ''
                let nameMain = item.name

                let children = item.child.map((child, child_idx) => {
                    if (child.is_agency) return ''

                    let classActive = ''
                    if (item.id == idMenu && idxActive == child_idx) {
                        classActive = 'active'
                    }
                    return (
                        <li key={'child-' + child_idx} className={classActive}><a href={child.url} onClick={this.clickMenu.bind(this, child, child_idx)}>{child.name}</a></li>
                    )
                })

                return (
                    <li className={(item.id == idMenu) ? 'active' : ''} key={'menu-parent-' + idx}>
                        {item.child.length ? (
                            <a href='#' className={item.number_child ? "has-ul" : ''} onClick={this.clickMenu.bind(this, item, 0)}><i className={item.icon}></i> <span>{nameMain}</span></a>
                        ) : (
                                <a href={item.url} onClick={this.clickMenu.bind(this, item, 0)}><i className={item.icon}></i> <span>{nameMain}</span></a>
                            )}

                        {item.child.length ? (
                            <ul className={item.id == idMenu ? "" : 'hidden-ul'}>
                                {children}
                            </ul>
                        ) : ''}
                    </li>
                )
            })
        } else {
            return listMenu.map((item, idx) => {
                if (!isAdmin && item.is_admin) return ''
                if (isAdmin && item.is_agency) return ''
                let nameMain = (!isAdmin && item.name_agency) ? item.name_agency : item.name

                let children = item.child.map((child, child_idx) => {
                    if (!isAdmin && child.is_admin) return ''
                    if (isAdmin && child.is_agency) return ''
                    let nameChildMain = (!isAdmin && child.name_agency) ? child.name_agency : child.name

                    let classActive = ''
                    if (item.id == idMenu && idxActive == child_idx) {
                        classActive = 'active'
                    }
                    return (
                        <li key={'child-' + child_idx} className={classActive}><a href={child.url} onClick={this.clickMenu.bind(this, child, child_idx)}>{nameChildMain}</a></li>
                    )
                })

                return (
                    <li className={(item.id == idMenu) ? 'active' : ''} key={'menu-parent-' + idx}>
                        {item.child.length ? (
                            <a href='#' className={item.number_child ? "has-ul" : ''} onClick={this.clickMenu.bind(this, item, 0)}><i className={item.icon}></i> <span>{nameMain}</span></a>
                        ) : (
                                <a href={item.url} onClick={this.clickMenu.bind(this, item, 0)}><i className={item.icon}></i> <span>{nameMain}</span></a>
                            )}

                        {item.child.length ? (
                            <ul className={item.id == idMenu ? "" : 'hidden-ul'}>
                                {children}
                            </ul>
                        ) : ''}
                    </li>
                )
            })
        }
    }
    render() {
        return (
            <div className="sidebar-category sidebar-category-visible">
                <div className="category-content no-padding">
                    <ul className="navigation navigation-main navigation-accordion">
                        {this.renderListMenu()}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    let { users } = state;
    return {
        users: users.profile
    };
}

export default withRouter(connect(mapStateToProps)(Navigation));