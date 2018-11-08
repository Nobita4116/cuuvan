import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {makeRequest} from '../../../libs/request'
import {formartDateTime} from '../../../libs/utils'
import ModalNotifyHeader from '../Common/ModalNotify'

class Notification extends Component {
    constructor(props){
        super(props)
        this.state = {
            total: 0,
            listNotify: [],
            notifyShow: '',
            is_show: false
        }
    }
    componentDidMount() {
        makeRequest('get', '/agency/getNotification', {})
            .then(result => {
                if(result.signal){
                    let {total, listNotify} = result.data
                    this.setState({
                        listNotify,
                        total
                    })
                }
            })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.total != this.state.total 
            || nextState.listNotify != this.state.listNotify
            || nextState.notifyShow != this.state.notifyShow
            || nextState.is_show != this.state.is_show
        ) {
            return true
        }

        return false
    }

    clickNotify = (e) => {
        let {is_show, total} = this.state
        if (!is_show && total) {
            makeRequest('post', '/agency/setReadNotify', {})
                .then(result => {
                    console.log(result)
                })

            this.setState({
                is_show: true
            })
        }
    }

    showNotify = (notify, e) => {
        e.preventDefault()
        this.setState({
            notifyShow: notify
        }, () => {
            $('#modal_notify_header').modal('show')
        })
    }

    renderNotify() {
        let {listNotify} = this.state
        return listNotify.map((notify, idx) => {
            let time = formartDateTime(notify.createdAt)
            let content = notify.content
            if (content.type == 'buy') {
                return (
                    <li className="media" key={idx}>
                        <div className="media-left">
                            <Link to={`/orders/sale-detail/${content.order}`} className="btn border-warning text-warning btn-flat btn-rounded btn-icon btn-sm"><i className="icon-cart2"></i></Link>
                        </div>

                        <div className="media-body">
                            <Link to={`/orders/sale-detail/${content.order}`}>{content.agency} <span className="text-color-black">đã gửi yêu cầu nhập buôn hàng. Kiểm tra và xác nhận đơn hàng.</span></Link>
                            <Link to={`/orders/sale-detail/${content.order}`} className="text-color-xam">
                                <div className="media-annotation">{time}</div>
                            </Link>
                        </div>
                    </li>
                )
            } else if (content.type == "register") {
                return (
                    <li className="media" key={idx}>
                        <div className="media-left">
                            <Link to={`/agency/detail/${content.agency_id}`} className="btn border-warning text-warning btn-flat btn-rounded btn-icon btn-sm"><i className="icon-user-plus"></i></Link>
                        </div>

                        <div className="media-body">
                            <Link to={`/agency/detail/${content.agency_id}`}>{content.agency} <span className="text-color-black">đã đăng ký làm đại lý hệ thống. Kiểm tra và xét duyệt tài khoản.</span></Link>
                            <Link to={`/agency/detail/${content.agency_id}`} className="text-color-xam">
                                <div className="media-annotation">{time}</div>
                            </Link>
                        </div>
                    </li>
                )
            } else if (content.type == "accept_buy") {
                return (
                    <li className="media" key={idx}>
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
                )
            } else {
                return (
                    <li className="media" key={idx} onClick={this.showNotify.bind(this, content)}>
                        <div className="media-left">
                            <a href="#" className="btn border-warning text-warning btn-flat btn-rounded btn-icon btn-sm"><i className="icon-bell2"></i></a>
                        </div>

                        <div className="media-body">
                            <a href="#"><span className="text-color-black">Thông báo mới từ đại lý cấp trên</span> {content.agency}</a>
                            <a href="#" className="text-color-xam">
                                <div className="media-annotation">{time}</div>
                            </a>
                        </div>
                    </li>
                )
            }
        })
    }

    render() {
        let {total, listNotify} = this.state
        return (
            <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false" onClick={this.clickNotify.bind(this)}>
                    <i className="icon-bell2"></i>
                    <span className="visible-xs-inline-block position-right">Thông báo</span>
                    {total ? <span className="badge bg-warning-400">{total}</span> : ''}
                </a>
                
                <div className="dropdown-menu dropdown-content width-350">
                    <div className="dropdown-content-heading">
                        Thông báo
                    </div>

                    <ul className="media-list dropdown-content-body">
                        {this.renderNotify()}
                    </ul>

                    {listNotify.length ? (
                        <div className="dropdown-content-footer">
                            <Link to={'/notification'}>Xem tất cả <i className="icon-arrow-right7"></i></Link>
                        </div>
                    ) : ''}
                    
                </div>

                <ModalNotifyHeader 
                    notify={this.state.notifyShow}
                    idStr="modal_notify_header"
                />
            </li>
        );
    }
}

export default Notification;