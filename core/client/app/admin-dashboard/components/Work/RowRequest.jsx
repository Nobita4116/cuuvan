import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { formartDateTime } from '../../../libs/date'
import StatusRequest from '../Common/StatusRequest'

class RowRequest extends Component {
    onRemove = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
            this.props.onRemove(id);
        }
    }

    render() {
        let { request, services } = this.props
        let service = services.find(e => e.id == request.services_id);
        let name_service = service && service.name
        return (
            <tr>
                <td>{request.name}</td>
                <td>{request.mobile}</td>
                <td>{name_service}</td>
                <td>{formartDateTime(request.time)}</td>
                <td><StatusRequest status={request.status} /></td>
                <td style={{ textAlign: "center" }}>
      
                    <Link to={`/work/request/detail/${request.id}`} className="label label-primary" > <span className="icon-info22 position-left"></span> Chi tiết</Link>

                    {(request.status == 3) && (
                        <div>                 
                            <Link to={`/work/request/progress/${request.id}`} className="label label-danger bg-red" style={{ marginTop: 5 }} ><i className="  icon-clipboard5 position-right" /> Tiến độ </Link>
                        </div>
                    )}

                </td>
            </tr>
        );
    }
}

export default RowRequest;