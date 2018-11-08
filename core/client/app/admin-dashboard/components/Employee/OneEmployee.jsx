import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { makeRequest } from '../../../libs/request'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import { formartDateTime } from '../../../libs/date'

class OneEmployee extends Component {


    handleDelete = (e) => {
        e.preventDefault()
        let { employee } = this.props
        let { id } = employee

        makeRequest('post', '/employee/deleteEmployee', { id })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage('Xóa thợ thành công')
                    this.props.handleDelete(id)
                } else {
                    showErrorMessage(result.message)
                }
            })
    }

    render() {
        let { employee, services } = this.props
        let type = ""
        if (employee.type_employee == 1) {
            type = "Công ty"
        } else {
            type = "Thuê khoán"
        }
        let service = services.find(e => e.id == employee.services_id);
        let name_services = service && service.name
        return (
            <tr>
                <td>{employee.name}</td>
                <td>{employee.mobile}</td>
                <td>{formartDateTime(employee.birthday)}</td>
                <td>{employee.address}</td>
                <td>{name_services}</td>
                <td>{type}</td>
                <td>{employee.status ? <span className="label label-success">Đã xác thực</span> : <span className="label label-danger">Chờ duyệt</span>}</td>
                <td className="text-center">
                    <Link to={`/employee/edit/${employee.id}`} className="label label-primary" style={{ marginRight: 10 }}><span className="icon-info22 position-left"></span>Sửa</Link>
                    <button type="submit" className="label label-danger bg-pink" onClick={this.handleDelete}>
                        <i className=" icon-trash position-left"></i>
                        Xóa
                                    </button>

                </td>
            </tr>
        );
    }
}

export default OneEmployee;