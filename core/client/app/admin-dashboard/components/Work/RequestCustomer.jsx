import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import InputGroup from '../Common/InputGroup'
import { makeRequest } from '../../../libs/request'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'
import ButtonMultipleUpload from '../Common/ButtonMultipleUploadL'
import DateTimePicker from 'react-datetime-picker'
import Checkbox from '../Common/Checkbox'


class RequestCustomer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            mobile: '',
            address: '',
            list_image: [],
            services_id: '',
            services: [],
            work_item_id: [],
            list_work_item: [],
            time: new Date(),
            status: '',
        }
    }

    componentDidMount() {
        this.getAllServices(),
            this.getAllWork()
    }

    getAllServices() {
        makeRequest('get', '/services/getAllServices')
            .then(result => {
                if (result.signal) {
                    let services = result.data
                    let services_id = services.length ? services[0].id : ''
                    this.setState({
                        services,
                        services_id
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }

    getAllWork() {
        makeRequest('get', '/work/getAllWork')
            .then(result => {
                if (result.signal) {
                    let work = result.data
                    let list_work_item = work.work.map(item => {
                        return {
                            id: item.id,
                            title: item.name,
                            isCheck: false
                        }
                    })
                    this.setState({
                        list_work_item
                    })
                }
            }).catch(err => {
                console.log(err)
            })
    }

    handleDate = (date) => {
        this.setState({
            time: date
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
        let { name, mobile, address, list_image, services_id, work_item_id, time, status } = this.state
        if (!name || !mobile || !address || !services_id || !work_item_id.length || !time) {
            return showErrorMessage('Vui lòng nhập đủ thông tin')
        }

        makeRequest('post', '/customer/createRequest', {
            name, mobile, address,
            image: list_image,
            services_id,
            work_item_id: work_item_id, // biến đổi 1 chuỗi thành 1 mảng <=> JSON.parse
            time, status
        })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage('Thêm yêu cầu thành công')
                    this.props.history.push('/work/request/list')
                } else {
                    showErrorMessage(result.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    onChangeCheckbox = (isCheck, id) => {
        let { list_work_item, work_item_id } = this.state;
        list_work_item = list_work_item.map(item => {
            if (item.id == id) {
                item.isCheck = isCheck
            }
            return item;
        })
        if (isCheck) {
            work_item_id.push(id)
        } else {
            work_item_id = work_item_id.filter(item => item != id)
        }
        this.setState({
            list_work_item,
            work_item_id
        })
    }

    updateListImage = (list_image) => {
        this.setState({
            list_image
        })
    }

    renderServices = () => {
        let { services } = this.state;
        return services.map((item, idx) => {
            return <option value={item.id} key={idx}>{item.name}</option>
        })
    }

    renderWork = () => {
        let { list_work_item } = this.state
        let checkWork = list_work_item.map((item, idx) => {
            return <Checkbox item={item} key={idx} index={idx} onChange={this.onChangeCheckbox} />
        });
        return (
            <div>
                {checkWork}
            </div>
        );
    }


    render() {
        let { image, services_id, status } = this.state
        return (
            <div>
                <PageHeader
                    title="Khách hàng"
                    breadcrumb={[
                        { title: 'Danh sách yêu cầu', link: '/customer/request/list' },
                        { title: 'Tạo yêu cầu', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <form className="form-horizonal" action="#" onSubmit={this.submitForm}>
                            <fieldset className="panel-body pb-10">

                                <div className="form-group">
                                    <label className="control-label fontBold">Tên khách hàng: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="name"
                                        placeholder="Nhập tên khách hàng"
                                        icon="icon-user"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Số điện thoại: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="mobile"
                                        type="number"
                                        placeholder="Nhập số điện thoại"
                                        icon="icon-mobile2"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Địa chỉ <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="address"
                                        placeholder="Nhập địa chỉ"
                                        icon=" icon-location3"
                                        changeInput={this.handleInput}
                                    />

                                </div>


                                <ButtonMultipleUpload title="Upload ảnh công việc" updateListImage={this.updateListImage} />

                                <div className="form-group">
                                    <label className="control-label fontBold">Chọn nhóm dịch vụ <span className="text-danger">*</span></label>

                                    <div className="input-group">
                                        <div className="input-group-addon">
                                            <i className="icon-clipboard2"></i>
                                        </div>
                                        <select name="services_id" className="form-control" value={services_id} onChange={this.onHandle}>
                                            {this.renderServices()}
                                        </select>
                                    </div>

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Chọn công việc <span className="text-danger">*</span></label>
                                    {this.renderWork()}
                                </div>

                                <div className="form-group clearfix">
                                    <label className="control-label col-lg-2">Ngày bắt đầu<span className="text-danger">(*)</span></label>
                                    <div className="col-lg-10">
                                        <DateTimePicker
                                            onChange={this.handleDate}
                                            value={this.state.time}
                                        />
                                    </div>
                                </div>

                                <br />

                                <div className="form-group pt-20">
                                    <button type="submit" className="btn bg-blue">
                                        <i className="icon-envelop2 position-left"></i>
                                        Thêm yêu cầu
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

export default RequestCustomer;