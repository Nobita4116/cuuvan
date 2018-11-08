import React, { Component } from 'react';
import InputGroupWage from '../Common/InputGroupV3'
import InputGroup from '../Common/InputGroupV2'
import { makeRequest } from '../../../libs/request'
import { Link } from 'react-router-dom'
import PageHeader from '../Common/PageHeader'
import DateInput from '../Common/DateInput'


class UpdateCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            employee_id: '',
            wage: '',
            employee_type: '',
            time: '',
            listEmployee: []

        }
    }
    componentDidMount() {
        this.getWageById(),
            this.getAllEmployee()
    }

    getWageById() {
        let { id } = this.props.match.params; //api lấy thông tin từ id
        makeRequest('get', '/employee/getWage', { id })
            .then(result => {
                if (result.signal) {
                    let { id, wage, employee_id, employee_type, time } = result.data;
                    this.setState({
                        id,
                        wage,
                        employee_id,
                        employee_type,
                        time: time
                        // time: new Date(time) // định dạng lại ngày
                    })
                } else {
                    this.props.history.push('/employee/table')
                }
            })
    }

    getAllEmployee() {
        makeRequest('get', '/employee/searchEmployee')
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listEmployee: result.data.listEmployee
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }


    handleInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    changeDate(value, key) {
        try {
            let time = value.format('YYYY-MM-DD')
            this.setState({
                [key]: time
            })
        } catch (err) {
            console.log(err)
        }
    }

    onUpdate = () => {
        let { id, wage, time, employee_id, employee_type, } = this.state;
        makeRequest('post', '/employee/updateWage', {
            id, wage, time, employee_id, employee_type
        })
            .then(res => {
                if (res.signal) {
                    this.props.history.push('/employee/table')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    onHandle = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        })
    }

    handleChange = (value) => {
        this.setState({
            employee_type: value
        })
    }


    renderEmployee = () => {
        let { listEmployee } = this.state;
        return listEmployee.map((item, idx) => {
            return <option value={item.id} key={idx}>{item.name}</option>
        })
    }


    render() {
        let { employee_id, employee_type, wage, time } = this.state;
        return (
            <div>
                <PageHeader
                    title="Cập nhật mức lương"
                    breadcrumb={[
                        { title: 'Quản lý thợ', link: '/employee/table' },
                        { title: 'Cập nhật', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-flat">
                        <div className="panel-body">
                            <form className="form-horizontal" >
                                <fieldset className="content-group">
                                    <div className="form-group">

                                        <div className="form-group">
                                            <label className="control-label fontBold">Tên thợ: <span className="text-danger">*</span></label>

                                            <div className="input-group">
                                                <div className="input-group-addon">
                                                    <i className="icon-user-check"></i>
                                                </div>
                                                <select name="employee_id" className="form-control" value={employee_id} onChange={this.onHandle} disabled>
                                                    {this.renderEmployee()}
                                                </select>
                                            </div>

                                        </div>


                                        <div className="form-group">
                                            <label className="control-label fontBold">Tên thợ: <span className="text-danger">*</span></label>

                                            {(employee_type == 1) && (
                                                <InputGroup
                                                    value="Công ty"
                                                    icon="icon-tree5"
                                                    required />
                                            )}

                                            {(employee_type == 2) && (
                                                <InputGroup
                                                    value="Thuê khoán"
                                                    icon="icon-tree5"
                                                    required />
                                            )}
                                        </div>



                                        <div className="form-group">
                                            <label className="control-label fontBold">Mức lương: <span className="text-danger">*</span></label>

                                            {(employee_type == 1) && (
                                                <InputGroupWage
                                                    type="text"
                                                    name="wage"
                                                    value={`${wage.toLocaleString()}`}
                                                    icon="icon-coin-dollar"
                                                    changeInput={this.handleInput}
                                                    required />
                                            )}

                                            {(employee_type == 2) && (
                                                <InputGroupWage
                                                    type="text"
                                                    name="wage"
                                                    value={`${wage} %`}
                                                    icon="icon-coin-dollar"
                                                    changeInput={this.handleInput}
                                                    required />
                                            )}


                                        </div>

                                        <div className="form-group">
                                            <label className="control-label fontBold">Ngày thực thi: <span className="text-danger">*</span></label>
                                            <div className="input-group">
                                                <div className="input-group-addon">
                                                    <i className="icon-calendar52"></i>
                                                </div>
                                                <div style={{ height: 36 }} className="form-group">
                                                    <DateInput timeInput={time} name="birthday" changeDate={this.changeDate.bind(this)} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-10">
                                            <button className="btn bg-blue col-md-1" type="button" onClick={this.onUpdate} style={{ width: 'auto' }}>
                                                <i className="icon-checkmark4 position-left"></i>Cập Nhật</button>
                                            <Link to={`/employee/table/`} className="btn btn-danger col-md-1" style={{ marginLeft: 5 }}>
                                                <i className="icon-cancel-circle2 position-left"></i>Hủy</Link>
                                        </div>

                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

        );
    }
}

export default UpdateCustomer;