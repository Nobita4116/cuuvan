import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { makeRequest } from '../../../libs/request'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import { formartDateTime } from '../../../libs/date'

class OneHistory extends Component {


    handleDelete = (e) => {
        e.preventDefault()
        let { wage } = this.props
        let { id } = wage

        makeRequest('post', '/employee/deleteWage', { id })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage('Xóa thành công')
                    this.props.handleDelete(id)
                } else {
                    showErrorMessage(result.message)
                }
            })
    }

    render() {
        let { wage, employee } = this.props
        let type = ""
        if (wage.employee_type == 1) {
            type = "Công ty"
        } else {
            type = "Thuê khoán"
        }
        let employees = employee.find(e => e.id == wage.employee_id);
        let employee_name = employees && employees.name
        return (
            <tr>
                <td>{employee_name}</td>
                <td>{type}</td>
                {(wage.employee_type == 1) && (
                    <td>{wage.wage.toLocaleString()} VNĐ</td>
                )}
                {(wage.employee_type == 2) && (
                    <td>{wage.wage} %</td>
                )}
                <td>{formartDateTime(wage.time)}</td>
                <td className="text-center">
                    <Link to={`/employee/table`} className="label label-danger" ><span className=" icon-exit3 position-left"></span>Quay lại</Link>
                    <button type="submit" className="label label-danger bg-pink" onClick={this.handleDelete} style={{ marginLeft: 10 }}>
                        <i className=" icon-trash position-left"></i>
                        Xóa
                                    </button>
                </td>
            </tr>
        );
    }
}

export default OneHistory;