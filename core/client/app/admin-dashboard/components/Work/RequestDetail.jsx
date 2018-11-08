import React, { Component, Fragment } from 'react';
import InputGroup from '../Common/InputGroupV2'
import InputGroupPrice from '../Common/InputGroupL'
import { makeRequest } from '../../../libs/request'
import { Link } from 'react-router-dom'
import PageHeader from '../Common/PageHeader'
import ButtonMultipleUpload from '../Common/ButtonMultipleUpload'
import DateTimePicker from 'react-datetime-picker'
import Checkbox from '../Common/CheckboxL'
import WorkOrder from '../Work_Item/WorkOrder';
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'


class RequestDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            mobile: '',
            address: '',
            list_image: [],
            request: [],
            services_id: '',
            services: [],
            time: '',
            work_item_id: [],
            list_work_item: [],
            list_employee_id: [],
            isLoading: false,
            work_id: 0,
            employee_id: 0,
            status: 0,
            request_customer_id: parseInt(props.match.params.id),
            price: '',
            isshow: true
        }
    }

    componentWillMount() {
        this.getRequestById(),
            this.getAllServices(),
            this.getAllWork()
    }

    getRequestById() {
        let { id } = this.props.match.params; //api lấy thông tin từ id
        makeRequest('get', '/customer/getRequest', { id })
            .then(result => {
                if (result.signal) {
                    let { requrestCustomer, list_employee_id } = result.data;
                    let { id, name, mobile, address, image, services_id, work_item_id, time, status, price } = requrestCustomer;
                    this.setState({
                        id,
                        name,
                        mobile,
                        address,
                        list_image: image,
                        services_id,
                        work_item_id,
                        time,
                        isLoading: true,
                        list_employee_id,
                        status,
                        price
                    })
                } else {
                    this.props.history.push('/customer/request/list')
                }
            }).catch(err => console.log(err))
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

    getAllWork() {
        makeRequest('get', '/work/getAllWork')
            .then(result => {
                if (result.signal) {
                    let work = result.data
                    let list_work_item = work.work.map(item => {
                        return {
                            id: item.id,
                            title: item.name,
                            isCheck: false,
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

    handleInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    onUpdate = () => {
        let { id, name, mobile, address, list_image, services_id, work_item_id, time, list_employee_id, request_customer_id, price } = this.state;
        if (!price) {
            return showErrorMessage('Bạn chưa nhập báo giá!')
        }
        makeRequest('post', '/customer/updateRequest', {
            id, name, mobile, address,
            image: list_image,
            services_id, work_item_id, time, list_employee_id, request_customer_id, price
        })
            .then(res => {
                if (res.signal) {
                    showSuccessMessage('Cập nhật thành công!')
                    this.props.history.push('/work/request/list')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    onAction = () => {
        let { id } = this.state
        makeRequest('post', '/customer/actionRequest', { id })
            .then(result => {
                if (result.signal) {
                    this.setState({
                        status: 1
                    })
                    showSuccessMessage('Duyệt yêu cầu thành công')
                } else {
                    showErrorMessage(result.message)
                }
            })

    }

    updateListImage = (list_image) => {
        this.setState({
            list_image
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

    handleDate = (date) => {
        this.setState({
            time: date
        })
    }

    renderServices = () => {
        let { services } = this.state;
        return services.map((item, idx) => {
            return <option value={item.id} key={idx}>{item.name}</option>
        })
    }

    renderWork = () => {
        let { list_work_item, work_item_id, status } = this.state

        let checkWork = list_work_item.map((item, idx) => {
            if (work_item_id.indexOf(item.id) > -1) { //kiểm tra vị trí phần tử trong mảng
                item.isCheck = true
            }
            return <Checkbox item={item} key={idx} index={idx} status={status} onChange={this.onChangeCheckbox} onUpdate={this.onCreate} />
        });
        return (
            <div>
                {checkWork}
                <br />
                {(status == 0) && <button className="btn btn-warning col-md-1" type="button" onClick={this.onAction} style={{ width: 'auto' }}>Duyệt yêu cầu</button>}
                {(status == 1) && <button className="btn btn-warning col-md-1" type="button" style={{ width: 'auto' }}>Đã duyệt</button>}
            </div>
        );
    }



    onCheck = (employee_id) => {
        let { work_id, list_employee_id, work_item_id, } = this.state;
        let index = work_item_id.indexOf(work_id);
        list_employee_id[index] = employee_id
        this.setState({
            list_employee_id,
            employee_id
        })
    }


    onCreate = (id) => {
        let { list_employee_id, work_item_id } = this.state;
        let index = work_item_id.indexOf(id);
        let employee_id = list_employee_id[index]
        this.setState({
            isShowModal: true,
            work_id: id,
            employee_id
        })
    }

    onChangeCheckbox = (isCheck, id) => {
        let { work_item_id, list_work_item, list_employee_id } = this.state;
        if (isCheck) {
            list_work_item.map(item => {
                if (item.id == id) {
                    item.isCheck = isCheck
                }
                return item;
            })
            work_item_id.push(id);
            list_employee_id[work_item_id.length - 1] = 0;

            this.setState({
                work_item_id,
                list_work_item,
                list_employee_id
            })
        } else {
            list_work_item.map(item => {
                if (item.id == id) {
                    item.isCheck = isCheck
                }
                return item;
            })
            let index = work_item_id.indexOf(id);
            list_employee_id.splice(index, 1);
            work_item_id = work_item_id.filter(item => item != id)
            this.setState({
                work_item_id,
                list_work_item,
                list_employee_id
            })
        }
    }

    hideModal = () => {
        this.setState({
            isShowModal: false
        })
    }


    render() {
        let { name, mobile, address, list_image, services_id, time, isLoading, status, price } = this.state;
        time = new Date(time);
        return (
            <div>
                {isLoading && (
                    <Fragment>
                        <PageHeader
                            title="Chi tiết yêu cầu"
                            breadcrumb={[
                                { title: 'Danh sách yêu cầu', link: '/customer/request/list' },
                                { title: 'Chi tiết', link: '' }
                            ]}
                        />

                        <div className="content">
                            <div className="panel panel-flat">
                                <div className="panel-body">
                                    <form className="form-horizontal" >
                                        <fieldset className="content-group">
                                            <div className="form-group">

                                                <div className="form-group">
                                                    <label className="control-label fontBold">Tên khách hàng: <span className="text-danger">*</span></label>

                                                    <InputGroup
                                                        type="text"
                                                        name="name"
                                                        value={name}
                                                        icon="icon-user"
                                                        changeInput={this.handleInput}
                                                        required
                                                        status={status}
                                                    />

                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label fontBold">Số điện thoại: <span className="text-danger">*</span></label>

                                                    <InputGroup
                                                        type="number"
                                                        name="mobile"
                                                        value={mobile}
                                                        icon="icon-mobile2"
                                                        changeInput={this.handleInput}
                                                        required
                                                        status={status}
                                                    />

                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label fontBold">Địa chỉ: <span className="text-danger">*</span></label>

                                                    <InputGroup
                                                        type="text"
                                                        name="address"
                                                        value={address}
                                                        icon=" icon-location3"
                                                        changeInput={this.handleInput}
                                                        required
                                                        status={status}
                                                    />

                                                </div>

                                                <ButtonMultipleUpload title="Ảnh công việc" value={list_image} updateListImage={this.updateListImage} status={status} />

                                                <div className="form-group">
                                                    <label className="control-label fontBold">Chọn nhóm dịch vụ <span className="text-danger">*</span></label>

                                                    <div className="input-group">
                                                        <div className="input-group-addon">
                                                            <i className="icon-clipboard2"></i>
                                                        </div>

                                                        {(status != 0) && (
                                                            <select name="services_id" className="form-control" value={services_id} onChange={this.onHandle} disabled>
                                                                {this.renderServices()}
                                                            </select>
                                                        )}
                                                        {(status == 0) && (
                                                            <select name="services_id" className="form-control" value={services_id} onChange={this.onHandle} >
                                                                {this.renderServices()}
                                                            </select>
                                                        )}
                                                    </div>

                                                </div>

                                                <div className="form-group">
                                                    <label className="control-label fontBold">Chọn công việc <span className="text-danger">*</span></label>
                                                    {this.renderWork()}
                                                </div>

                                                <br />

                                                {(status != 0) && (
                                                    <div className="form-group">
                                                        <label className="control-label fontBold">Báo giá: <span className="text-danger">*</span></label>

                                                        <InputGroupPrice
                                                            type="text"
                                                            name="price"
                                                            value={price}
                                                            icon="icon-coin-dollar"
                                                            changeInput={this.handleInput}
                                                            required
                                                            status={status}
                                                        />

                                                    </div>
                                                )}


                                                <div className="form-group">

                                                    <label className="control-label col-lg-2">Ngày bắt đầu<span className="text-danger">(*)</span></label>
                                                    {(status != 0) && (
                                                        <div className="col-lg-10">
                                                            <DateTimePicker
                                                                onChange={this.handleDate}
                                                                value={time}
                                                                disabled
                                                            />
                                                        </div>
                                                    )}

                                                    {(status == 0) && (
                                                        <div className="col-lg-10">
                                                            <DateTimePicker
                                                                onChange={this.handleDate}
                                                                value={time}
                                                            />
                                                        </div>
                                                    )}

                                                </div>

                                                <br />

                                                <div className="col-md-10">
                                                    {(status == 0 || status == 1 || status == 2) && (
                                                        <button className="btn bg-blue col-md-1" type="button" onClick={this.onUpdate} style={{ width: 'auto' }}>
                                                            <i className="icon-checkmark4 position-left"></i>Cập Nhật</button>
                                                    )}
                                                    <Link to={`/work/request/list`} className="btn btn-danger col-md-1" style={{ width: 'auto', marginLeft: 10 }}>
                                                        <i className=" icon-rotate-ccw2 position-left"></i>Quay Lại</Link>
                                                </div>


                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                                <WorkOrder
                                    isShow={this.state.isShowModal}
                                    hideModal={this.hideModal}
                                    onCheck={this.onCheck}
                                    employee_id={this.state.employee_id}
                                    params={this.props.match.params}
                                />
                            </div>

                        </div>
                    </Fragment>
                )}
            </div>

        );
    }
}

export default RequestDetail;
