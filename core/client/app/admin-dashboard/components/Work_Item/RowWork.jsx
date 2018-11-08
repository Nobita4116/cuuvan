import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class RowWork extends Component {
    onRemove = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
            this.props.onRemove(id);
        }
    }


    render() {
        let { work, services } = this.props;
        let service = services.find(e => e.id == work.services_id);
        let name_services = service && service.name
        return (
            <tr>
                <td>{work.name}</td>
                <td>{work.description}</td>
                <td>{work.quantity}</td>
                <td>{work.unit}</td>
                <td>{name_services}</td>
                <td style={{ textAlign: "center" }}>
                    <Link to={`/work_item/update/${work.id}`} className="label label-primary"><span className="icon-info22 position-left"></span> Sửa</Link>
                    <button className="label label-danger bg-pink" type="button" onClick={() => this.onRemove(work.id)} style={{ marginLeft: 10 }}>
                        <i className=" icon-trash position-left"></i>Xóa </button>
                </td>
            </tr>
        );
    }
}

export default RowWork;