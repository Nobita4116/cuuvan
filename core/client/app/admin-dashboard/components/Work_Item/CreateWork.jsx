import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import InputGroup from '../Common/InputGroup'
import { makeRequest } from '../../../libs/request'
import ButtonUpload from '../Common/ButtonMultipleUpload'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'

class CreateWork extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            quantity: '',
            unit: '',
            services_id: '',
            services: [],
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
        let { name, description, quantity, unit, services_id } = this.state
        if (!name || !description || !quantity || !unit || !services_id) {
            return showErrorMessage('Vui lòng nhập đủ thông tin')
        }

        makeRequest('post', '/work/createWork', { name, description, quantity, unit, services_id })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage('Thêm dịch vụ thành công')
                    this.props.history.push('/work/list')
                } else {
                    showErrorMessage(result.message)
                }
            })
            .catch(err => {
                console.log(err)
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
                    title="Tạo hạng mục công việc"
                    breadcrumb={[
                        { title: 'Hạng mục công việc', link: '/work/create' },
                        { title: 'Tạo mới', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <form className="form-horizonal" action="#" onSubmit={this.submitForm}>
                            <fieldset className="panel-body pb-10">

                                <div className="form-group">
                                    <label className="control-label fontBold">Tên hạng mục: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="name"
                                        placeholder="Tên hạng mục"
                                        icon="icon-wordpress"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Mô tả: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="description"
                                        placeholder="Nhập mô tả"
                                        icon="icon-comments"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Số lượng <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="quantity"
                                        type="number"
                                        placeholder="Nhập số lượng"
                                        icon="icon-coin-dollar"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Đơn vị tính: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="unit"
                                        placeholder="Nhập đơn vị tính"
                                        icon="icon-law"
                                        changeInput={this.handleInput}
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="control-label fontBold">Chọn dịch vụ <span className="text-danger">*</span></label>

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
                                    <button type="submit" className="btn bg-blue">
                                        <i className="icon-envelop2 position-left"></i>
                                        Tạo mới
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

export default CreateWork;