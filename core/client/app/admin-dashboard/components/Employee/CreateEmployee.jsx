import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import InputGroup from '../Common/InputGroup'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import { makeRequest } from '../../../libs/request'
import DateInput from '../Common/DateInput'
import SelectEmployee from './SelectEmployee'

class CreateEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            mobile: '',
            birthday: '',
            address: '',
            services_id: '',
            password: '',
            services_id: '',
            services: [],
            type_employee: '',
        }
    }

    componentDidMount() {
        this.getAllServices()
    }

    getAllServices() {
        makeRequest('get', '/services/getAllServices')
            .then(result => {
                if (result.signal) {
                    let services = result.data
                    let services_id = services.length ? services[0].id : ''  //set value mặc định cho services = 1
                    this.setState({
                        services,
                        services_id
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

    submitForm = (e) => {
        e.preventDefault()
        let { name, mobile, birthday, address, services_id, password, type_employee } = this.state
        if (!name || !mobile || !birthday || !address || !services_id || !password || !type_employee) {
            return showErrorMessage('Vui lòng nhập đủ thông tin')
        }

        makeRequest('post', '/employee/createEmployee', { name, mobile, birthday, address, services_id, password, type_employee })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage('Thêm thợ thành công')
                    this.props.history.push('/employee/list')
                } else {
                    showErrorMessage(result.message)
                }
            })
            .catch(err => {
                console.log(err)
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

    handleChange = (value) => {
        this.setState({
            type_employee: value
        })
    }


    renderServices = () => {
        let { services } = this.state;
        return services.map((item, idx) => {
            return <option value={item.id} key={idx}>{item.name}</option>
        })
    }

    render() {
        let { services_id } = this.state
        return (
            <div>
                <PageHeader
                    title="Tạo thợ mới"
                    breadcrumb={[
                        { title: 'Danh sách', link: 'list' },
                        { title: 'Tạo mới', link: '' }
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
                                        placeholder="Mật khẩu"
                                        icon="icon-lock"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Số điện thoại: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="mobile"
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
                                            <DateInput timeInput={''} name="birthday" changeDate={this.changeDate.bind(this)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Địa chỉ: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="address"
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
                                    handleChange={this.handleChange}
                                />

                                <div className="form-group">
                                    <button type="submit" className="btn bg-blue">
                                        <i className="icon-envelop2 position-left"></i>
                                        Tạo thợ mới
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

export default CreateEmployee;