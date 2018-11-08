import React, { Component } from 'react'
import StatusRequest from '../Common/StatusRequest'

class RowOrder extends Component {

    onCheck = (e) => {
        let { employee } = this.props;
        let value = e.target.checked ? employee.id : 0;
        this.props.onCheck(value)
    }
    render() {
        let { employee, employee_id } = this.props
        let type_employee = employee.type_employee
        if (type_employee == 1) {
            type_employee = "công ty"
        } else {
            type_employee = "thuê khoán"
        }
        return (
            <tr>
                <td>{employee.name}</td>
                <td>{employee.mobile}</td>
                <td>{type_employee}</td>
                <td className="text-center">
                    <input type="checkbox" name="action" checked={employee_id == employee.id ? true : false} onChange={this.onCheck}></input>
                </td>
            </tr>
        );
    }
}

export default RowOrder;

