import React, { Component } from 'react'
import PageHeader from '../Common/PageHeader'
import CreateEmployee from './CreateEmployee'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import { makeRequest } from '../../../libs/request'
import InputGroup from '../Common/InputGroup'
import DateInput from '../Common/DateInput'
import SkyModal from '../../../common/Modal/SkyModal';
import SelectEmployee from './SelectEmployee'
import { Link } from 'react-router-dom'

class Edit extends CreateEmployee {

    componentDidMount() {
        this.getEdit(),
            this.getAllServices()

    }

    getEdit() {
        let { employee_id } = this.props.match.params
        makeRequest('get', '/employee/getEdit', { id: employee_id })
            .then(result => {
                if (result.signal) {
                    let employee = result.data
                    this.setState({
                        name: employee.name,
                        mobile: employee.mobile,
                        birthday: new Date(employee.birthday),
                        address: employee.address,
                        services_id: employee.services_id,
                        type_employee: employee.type_employee,
                        id: employee.id,
                        status: employee.status,
                        password: employee.password
                    })
                } else {
                    this.props.history.push('/employee/list')
                }
            })
    }

    getAllServices() {
        makeRequest('get', '/services/getAllServices')
            .then(result => {
                if (result.signal) {
                    let services = result.data
                    this.setState({
                        services,
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }

    submitForm = (e) => {
        e.preventDefault()
        let { name, mobile, birthday, address, services_id, type_employee, password, id } = this.state
        if (!name || !mobile || !address || !services_id || !type_employee || !id || !password || !birthday) {
            return showErrorMessage('Vui lòng nhập đủ thông tin')
        }

        makeRequest('post', '/employee/updateEmployee', { name, mobile, birthday, address, services_id, type_employee, password, id })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage('Cập nhật thông tin thợ thành công')
                    this.props.history.push('/employee/list')
                } else {
                    showErrorMessage(result.message)
                }
            })
    }

    clickConfirm = () => {
        this.setState({
            isShowModal: true
        })
    }

    closeModal = () => {
        this.setState({
            isShowModal: false
        })
    }

    activeEmployee = () => {
        let { id } = this.state
        makeRequest('post', '/employee/active', { id })
            .then(result => {
                this.closeModal()
                if (result.signal) {
                    this.setState({
                        status: 1
                    })

                    showSuccessMessage('Xác thực thợ thành công')
                } else {
                    showErrorMessage(result.message)
                }
            })
    }

    handleChange = (value) => {
        this.setState({
            type_employee: value
        })
    }

    onHandle = (e) => {
        let target = e.target
        let name = target.name
        let value = target.value
        this.setState({
            [name]: value
        })
    }

    renderServices = () => {
        let { services } = this.state;
        return services.map((item, idx) => {
            return <option value={item.id} key={idx}>{item.name}</option>
        })
    }


    render() {
        let { name, mobile, birthday, address, services_id, type_employee, password, id } = this.state
        if (!id) return ''
        return (
            <div>
                <PageHeader
                    title="Cập nhật thông tin thợ"
                    breadcrumb={[
                        { title: 'Danh sách', link: '/employee/list' },
                        { title: 'Cập nhật', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <form className="form-horizonal" action="#" onSubmit={this.submitForm}>
                            <fieldset className="panel-body pb-10">

                                <div className="form-group">
                                    <label className="control-label fontBold">Tên thợ: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="name"
                                        value={name}
                                        placeholder="Tên thợ"
                                        icon="icon-user"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Mật khẩu: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        type="password"
                                        name="password"
                                        value={password}
                                        placeholder="Mật khẩu"
                                        icon="icon-lock"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Số điện thoại: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="mobile"
                                        value={mobile}
                                        placeholder="Số điện thoại"
                                        icon="icon-mobile"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Ngày sinh nhật: <span className="text-danger">*</span></label>
                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="icon-gift"></i>
                                        </div>
                                        <div style={{ height: 36 }} className="form-group">
                                            <DateInput timeInput={birthday} name="birthday" changeDate={this.changeDate.bind(this)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Địa chỉ: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="address"
                                        value={address}
                                        placeholder="Địa chỉ"
                                        icon="icon-location3"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Chọn dịch vụ: <span className="text-danger">*</span></label>

                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="icon-clipboard2"></i>
                                        </div>
                                        <select name="services_id" className="form-control" value={services_id} onChange={this.onHandle}>
                                            {this.renderServices()}
                                        </select>
                                    </div>

                                </div>

                                <SelectEmployee
                                    value={type_employee}
                                    handleChange={this.handleChange}
                                />


                                <div className="row">
                                    <div className="col-md-1">
                                        <div className="form-group">
                                            <label className="control-label fontBold">Trạng thái:</label><br />
                                            {this.state.status ? <span className="label label-success">Đã xác thực</span> : <span className="label label-danger">Chờ duyệt</span>}
                                        </div>
                                    </div>
                                    <div className="col-md-11" style={{ marginTop: '15px' }}>
                                        {(!this.state.status) && (

                                            <button type="button" className="btn bg-teal-400 btn-labeled btn-labeled-right" onClick={this.clickConfirm.bind(this)}>
                                                <b><i className="icon-checkmark2" /></b> Xác thực thợ
                                                    </button>

                                        )}
                                    </div>
                                </div>

                                <div className="form-group col-md-10">
                                    <button type="submit" className="btn bg-blue col-md-1" style={{ width: 'auto' }}>
                                        <i className="icon-checkmark4 position-left"></i>
                                        Cập nhật
                                    </button>

                                    <Link to={`/employee/list/`} className="btn btn-danger col-md-1" style={{ marginLeft: 5 }} >
                                        <i className="icon-cancel-circle2 position-left"></i>Hủy</Link>
                                </div>

                            </fieldset>
                        </form>
                    </div>
                </div>

                <SkyModal
                    isShow={this.state.isShowModal}
                    title={`Xác nhận xét duyệt thông tin thợ này`}
                    handleHide={this.closeModal.bind(this)}
                    size="sm"
                >
                    <div className="text-right">
                        <button className="btn btn-primary mr-10" onClick={this.closeModal.bind(this)}>Hủy</button>
                        <button className="btn btn-danger" onClick={this.activeEmployee.bind(this)}>Xác nhận</button>
                    </div>
                </SkyModal>

            </div>
        );
    }

}

export default Edit;