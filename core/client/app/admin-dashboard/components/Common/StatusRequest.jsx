import React, { Component } from 'react';

class StatusRequest extends Component {
    render() {
        let { status } = this.props
        if (status == 0) {
            return <span className="label label-default">Chờ duyệt</span>
        } else if (status == 1) {
            return <span className="label label-primary">Đã được duyệt</span>
        } else if (status == 2) {
            return <span className="label label-success">Khách hàng đồng ý</span>
        } else if (status == 3) {
            return <span className="label label-info">Đang thực hiện</span>
        } else if (status == 4) {
            return <span className="label label-success">Hoàn thành</span>
        } else {
            return <span className="label label-danger" >Hủy yêu cầu</span>
        }
    }
}

export default StatusRequest;
