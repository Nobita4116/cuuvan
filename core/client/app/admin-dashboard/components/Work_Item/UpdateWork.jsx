import React, { Component } from 'react';
import InputGroup from '../Common/InputGroupV3'
import { makeRequest } from '../../../libs/request'
import { Link } from 'react-router-dom'
import PageHeader from '../Common/PageHeader'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'

class UpdateSerives extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            description: '',
            quantity: '',
            unit: '',
            services: [],
            services_id: '',
        }
    }
    componentWillMount() {
        this.getWorkById(),
            this.getAllServices()

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

    getWorkById() {
        let { id } = this.props.match.params; //api lấy thông tin từ id
        makeRequest('get', '/work/getWorkById', { id })
            .then(result => {
                if (result.signal) {
                    let { id, name, description, quantity, unit, services_id } = result.data;
                    this.setState({
                        id,
                        name,
                        description,
                        quantity,
                        unit,
                        services_id
                    })
                } else {
                    this.props.history.push('/work_item/list')
                }
            })
    }

    handleInput = (key, value) => {
        this.setState({
            [key]: value
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

    onUpdate = () => {
        let { id, name, description, quantity, unit, services_id } = this.state;
        makeRequest('post', '/work/updateWork', {
            id, name, description, quantity, unit, services_id
        })
            .then(res => {
                if (res.signal) {
                    showSuccessMessage('Cập nhật thành công!')
                    this.props.history.push('/work_item/list')
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
        let { name, description, quantity, unit, services_id } = this.state;
        return (
            <div>
                <PageHeader
                    title="Cập nhật hạng mục công việc"
                    breadcrumb={[
                        { title: 'Danh sách hạng mục công việc', link: '/work/list' },
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
                                            <label className="control-label fontBold">Tên hạng mục: <span className="text-danger">*</span></label>

                                            <InputGroup
                                                type="text"
                                                name="name"
                                                value={name}
                                                icon="icon-wordpress"
                                                changeInput={this.handleInput}
                                                required />

                                        </div>

                                        <div className="form-group">
                                            <label className="control-label fontBold">Mô tả: <span className="text-danger">*</span></label>

                                            <InputGroup
                                                type="text"
                                                name="description"
                                                value={description}
                                                icon="icon-comments"
                                                changeInput={this.handleInput}
                                                required />

                                        </div>

                                        <div className="form-group">
                                            <label className="control-label fontBold">Số lượng: <span className="text-danger">*</span></label>

                                            <InputGroup
                                                type="number"
                                                name="quantity"
                                                value={quantity}
                                                icon="icon-coin-dollar"
                                                changeInput={this.handleInput}
                                                required />

                                        </div>

                                        <div className="form-group">
                                            <label className="control-label fontBold">Đơn vị tính <span className="text-danger">*</span></label>

                                            <InputGroup
                                                type="text"
                                                name="unit"
                                                value={unit}
                                                icon="icon-law"
                                                changeInput={this.handleInput}
                                                required />

                                        </div>

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

                                        <div className="col-md-10">
                                            <button className="btn bg-blue col-md-1" type="button" onClick={this.onUpdate} style={{ width: 'auto' }}>
                                                <i className="icon-checkmark4 position-left"></i>Cập Nhật</button>
                                            <Link to={`/work_item/list/`} className="btn btn-danger col-md-1" style={{ marginLeft: 10, width: 'auto' }}>
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

export default UpdateSerives;