import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import InputGroup from '../Common/InputGroup'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import { makeRequest } from '../../../libs/request'
import DateInput from '../Common/DateInput'
import SelectEmployee from './SelectEmployee'

class Wage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employee_id: '',
            listEmployee: [],
            wage: '',
            employee_type: '',
            time: ''
        }
    }

    componentDidMount() {
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

    onHandle = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
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

    submitForm = (e) => {
        e.preventDefault()
        let { employee_id, wage, employee_type, time } = this.state
        if (!employee_id || !wage || !employee_type || !time) {
            return showErrorMessage('Vui lòng nhập đủ thông tin')
        }

        makeRequest('post', '/employee/createWage', { employee_id, wage, employee_type, time })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage('Thêm mức lương cho thợ thành công')
                    this.props.history.push('/employee/table')
                } else {
                    showErrorMessage(result.message)
                }
            })
            .catch(err => {
                console.log(err)
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
        let { employee_id, employee_type } = this.state

        return (

            <div>

                <PageHeader
                    title="Thêm mức lương cho thợ"
                    breadcrumb={[
                        { title: 'Tạo mới', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <form className="form-horizonal" action="#" onSubmit={this.submitForm}>
                            <fieldset className="panel-body pb-10">

                                <div className="form-group">
                                    <label className="control-label fontBold">Chọn thợ: <span className="text-danger">*</span></label>
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="icon-user-check"></i>
                                        </div>
                                        <select name="employee_id" className="form-control" value={employee_id} onChange={this.onHandle}>
                                            {this.renderEmployee()}
                                        </select>
                                    </div>

                                </div>

                                <SelectEmployee
                                    handleChange={this.handleChange}
                                />

                                <div className="form-group">
                                    <label className="control-label fontBold">Mức lương trả cho thợ <span className="text-danger">*</span></label>

                                    {(employee_type == 1) && (
                                        <InputGroup
                                            type="number"
                                            name="wage"
                                            placeholder="Nhập mức lương theo VNĐ"
                                            icon="icon-coin-dollar"
                                            changeInput={this.handleInput}
                                        />
                                    )}

                                    {(employee_type != 1) && (
                                        <InputGroup
                                            type="number"
                                            name="wage"
                                            placeholder="Nhập % hoa hồng"
                                            icon="icon-user"
                                            changeInput={this.handleInput}
                                        />
                                    )}


                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Ngày thực thi <span className="text-danger">*</span></label>
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <span className="icon-calendar52" ></span>
                                        </div>
                                        <div style={{height : '36px'}} className="form-group">
                                            <DateInput timeInput={''} name="time" changeDate={this.changeDate.bind(this)} />
                                        </div>
                                    </div>
                                </div>


                                <div className="form-group">
                                    <button type="submit" className="btn bg-blue">
                                        <i className="icon-checkmark4 position-left"></i>
                                        Lưu Lại
                                    </button>
                                </div>

                            </fieldset>
                        </form>
                    </div>
                </div>


            </div>
        );
    }


}

export default Wage;