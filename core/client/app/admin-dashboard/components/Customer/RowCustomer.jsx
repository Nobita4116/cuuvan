import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class RowCustomer extends Component {
    onRemove = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa?')) {
            this.props.onRemove(id);
        }
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.customer)
    }

    render() {
        let { customer, index } = this.props
        return (
            <tr>
                <td>{customer.name}</td>
                <td>{customer.mobile}</td>
                <td>{customer.address}</td>
                <td style={{ textAlign: "center" }}>
                    <Link to={`/customer/update/${customer.id}`} className="label label-primary">
                        <span className="icon-info22 position-left"></span> Sửa</Link>
                    <button className="label label-danger bg-pink" type="button" onClick={() => this.onRemove(customer.id)} style={{ marginLeft: 10 }}>
                        <i className=" icon-trash position-left"></i> Xóa </button>
                </td>
            </tr>
        );
    }
}

export default RowCustomer;