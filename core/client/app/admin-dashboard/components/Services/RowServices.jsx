import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class RowServices extends Component {
    onRemove = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
            this.props.onRemove(id);
        }
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.services)
    }

    render() {
        let { services, index } = this.props
        return (
            <tr>
                <td>
                    <img src={services.image} className="img-circle img-xs position-left" alt="" />
                </td>
                <td>{services.name}</td>
                <td>{services.description}</td>
                <td>
                    <div style={{ textAlign: "center" }}>
                        <Link to={`/services/update/${services.id}`} className="label label-primary"><span className="icon-info22 position-left"></span> Sửa</Link>
                        <button className="label label-danger bg-pink" type="button" onClick={() => this.onRemove(work.id)} style={{ marginLeft: 10 }}>
                            <i className=" icon-trash position-left"></i>Xóa </button>
                    </div>
                </td>
            </tr>
        );
    }
}

export default RowServices;