import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { makeRequest } from '../../../libs/request'
import PageHeader from '../Common/PageHeader'
import Pagination from '../Common/Pagination'
import {formartDateTime} from '../../../libs/utils'
import ModalNotify from '../Common/ModalNotify'

class ListNotification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listNotify: [],
            limit: 20,
            page: 1,
            number_page: 0,
            total: 0,
            notifyShow: ''
        }
    }
    componentDidMount() {
        this.getListNotification()
    }

    getListNotification(page) {
        let { limit } = this.state;
        makeRequest('get', '/agency/getListNotification', { page, limit })
            .then(result => {
                if (result.signal) {
                    let { total, listNotification, number_page } = result.data
                    this.setState({
                        listNotify: listNotification,
                        number_page,
                        total,
                    })
                }
            })
    }

    clickPage = (page) => {
        this.setState(page)
    }

    showNotify = (notify, e) => {
        e.preventDefault()
        this.setState({
            notifyShow: notify
        }, () => {
            $('#modal_notify_info').modal('show')
        })
    }

    renderNotify() {
        let { listNotify } = this.state
        return listNotify.map((notify, idx) => {
            let time = formartDateTime(notify.createdAt)
            let content = notify.content
            if (content.type == 'buy') {
                return (
                    <div className='col-sm-12' key={idx}>
                        <li className="panel panel-body">
                            <div className="media-left">
                                <Link to={`/orders/sale-detail/${content.order}`} className="btn border-warning text-warning btn-flat btn-rounded btn-icon btn-sm"><i className="icon-cart2"></i></Link>
                            </div>

                            <div className="media-body">
                                <Link to={`/orders/sale-detail/${content.order}`}>{content.agency} <span className="text-modal-black">đã gửi yêu cầu nhập buôn hàng. Kiểm tra và xác nhận đơn hàng.</span></Link>
                                <Link to={`/orders/sale-detail/${content.order}`} className="text-color-xam">
                                    <div className="media-annotation">{time}</div>
                                </Link>
                            </div>
                        </li>
                    </div>
                )
            } else if (content.type == "register"){
                return (
                    <div className='col-sm-12' key={idx}>
                        <li className="panel panel-body">
                            <div className="media-left">
                                <Link to={`/agency/detail/${content.agency_id}`} className="btn border-warning text-warning btn-flat btn-rounded btn-icon btn-sm"><i className="icon-user-plus"></i></Link>
                            </div>

                            <div className="media-body">
                                <Link to={`/agency/detail/${content.agency_id}`}>{content.agency} <span className="text-modal-black">đã đăng ký làm đại lý hệ thống. Kiểm tra và xét duyệt tài khoản.</span></Link>
                                <Link to={`/agency/detail/${content.agency_id}`} className="text-color-xam">
                                    <div className="media-annotation">{time}</div>
                                </Link>
                            </div>
                        </li>
                    </div>
                )
            } else if (content.type == "accept_buy") {
                return (
                    <div className='col-sm-12' key={idx}>
                        <li className="panel panel-body">
                            <div className="media-left">
                                <Link to={`/orders/buy-detail/${content.order}`} className="btn border-success text-success btn-flat btn-rounded btn-icon btn-sm"><i className="icon-checkmark3"></i></Link>
                            </div>

                            <div className="media-body">
                                <Link to={`/orders/buy-detail/${content.order}`}><span className="text-color-black">Đơn hàng</span> {content.order_code} <span className="text-color-black">nhập buôn của bạn đã được xác nhận.</span></Link>
                                <Link to={`/orders/buy-detail/${content.order}`} className="text-color-xam">
                                    <div className="media-annotation">{time}</div>
                                </Link>
                            </div>
                        </li>
                    </div>
                )
            } else {
                return (
                    <div className='col-sm-12' key={idx}>
                        <li className="panel panel-body" onClick={this.showNotify.bind(this, content)}>
                            <div className="media-left">
                                <a href="#" className="btn border-warning text-warning btn-flat btn-rounded btn-icon btn-sm"><i className="icon-bell2"></i></a>
                            </div>

                            <div className="media-body">
                                <a href="#"><span className="text-modal-black">Thông báo mới từ đại lý cấp trên</span> {content.agency}</a>
                                <a href="#" className="text-color-xam">
                                    <div className="media-annotation">{time}</div>
                                </a>
                            </div>
                        </li>
                    </div>
                )
            }
        })
    }

    render() {
        let { total, listNotify } = this.state
        return (
            <div>
                <PageHeader
                    title="Danh sách thông báo"
                    breadcrumb={[
                        { title: 'Thông báo', link: '' }
                    ]}
                />

                <div className="media-list dropdown-content-body">
                    {this.renderNotify()}
                </div>

                <div className="table-footer">
                    <div className="pull-right">
                        <Pagination page={this.state.page} number_page={this.state.number_page} clickPage={this.clickPage.bind(this)} />
                    </div>
                </div>

                <ModalNotify 
                    notify={this.state.notifyShow}
                />

            </div>
        );
    }
}

export default ListNotification;