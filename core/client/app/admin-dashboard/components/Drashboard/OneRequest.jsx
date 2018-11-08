import React, { Component } from 'react';
import CustomerReview from '../Common/CustomerReview'

class OneRequest extends Component {

    render() {
        let { progress, employee, work_item } = this.props
        let name = employee.find(e => e.id == progress.employee_id)
        let name_employee = name && name.name
        let names = work_item.find(e => e.id == progress.work_item_id)
        let name_work = names && names.name

        return (
            <tr>
                <td>{name_work}</td>
                <td>{name_employee}</td>
                <td>{progress.employee_progress}%</td>
                <td><CustomerReview review={progress.customer_review_id} /></td>
            </tr >
        );
    }
}

export default OneRequest;