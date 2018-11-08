import React, { Component, PropTypes } from 'react';
import { makeRequest } from '../../../libs/request'

class BaseSelectEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: [],
            employee_id: '',
        }
    }

    componentWillMount() {
        makeRequest('get', '/employee/searchEmployee')
            .then(result => {
                if (result.signal) {
                    let employee = result.data.listEmployee
                    this.setState({
                        employee
                    })
                }
            })
    }


    handleChangeEmployee = (e) => {
        let employee_id = e.target.value
        this.setState({
            employee_id
        })

        this.props.handleChange(this.props.name, employee_id)
    }


    render() {
        let { employee_id, employee } = this.state
        let contentOpts = employee.map((item, idx) => {
            return <option value={item.id} key={'opts-' + idx}>{item.name}</option>
        });
        return (
            <select name="employee_id" className="form-control" value={employee_id} onChange={this.handleChangeEmployee}>
                <option value="">Tất cả các thợ</option>
                {contentOpts}
            </select>
        )
    }
}

export default BaseSelectEmployee;