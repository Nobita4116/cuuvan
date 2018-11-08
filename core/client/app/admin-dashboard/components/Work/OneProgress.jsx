import React, { Component } from 'react'
import { formartDateTime } from '../../../libs/date'
import RateCustomer from '../Common/RateCustomer'

class OneEmployee extends Component {

    render() {
        let { progress, work, employee } = this.props
        let employe = employee.find(e => e.id == progress.employee_id);
        let name_employee = employe && employe.name
        let item = work.find(e => e.id == progress.work_item_id)
        let name_work = item && item.name

        return (
            <tr>
                <td>{name_work}</td>
                <td>
                    <img src={progress.image} style = {{width : 100 , height : 100}}  alt="" />
                </td>
                <td>{formartDateTime(progress.time)}</td>
                <td>{name_employee}</td>
                <td>{progress.employee_progress}%</td>
                <td>{progress.description}</td>
                <td><RateCustomer rate={progress.customer_review_id} /></td>
            </tr>
        );
    }
}

export default OneEmployee;