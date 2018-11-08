import React, { Component } from 'react';
import InputGroup from '../Common/InputGroupV3'
import { makeRequest } from '../../../libs/request'
import { Link } from 'react-router-dom'
import PageHeader from '../Common/PageHeader'
import { showSuccessMessage } from '../../actions/notification';

class UpdateCustomer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            mobile: '',
            address: '',
        }
    }
    componentWillMount() {
        let { id } = this.props.match.params; //api lấy thông tin từ id
        makeRequest('get', '/customer/getCustomer', { id })
            .then(result => {
                if (result.signal) {
                    let { id, name, mobile, address } = result.data;
                    this.setState({
                        id,
                        name,
                        mobile,
                        address
                    })
                } else {
                    this.props.history.push('/customer/list')
                }
            })
    }

    handleInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    onUpdate = () => {
        let { id, name, mobile, address } = this.state;
        makeRequest('post', '/customer/updateCustomer', {
            id, name, mobile, address
        })
            .then(res => {
                if (res.signal) {
                    showSuccessMessage('Cập nhật khách hàng thành công!')
                    this.props.history.push('/customer/list')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        let { name, mobile, address } = this.state;
        return (
            <div>
                <PageHeader
                    title="Cập nhật khách hàng"
                    breadcrumb={[
                        { title: 'Danh sách khách hàng', link: '/customer/list' },
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
                                            <label className="control-label fontBold">Tên dịch vụ: <span className="text-danger">*</span></label>

                                            <InputGroup
                                                type="text"
                                                name="name"
                                                value={name}
                                                icon="icon-user"
                                                changeInput={this.handleInput}
                                                required />

                                        </div>

                                        <div className="form-group">
                                            <label className="control-label fontBold">Số điện thoại: <span className="text-danger">*</span></label>

                                            <InputGroup
                                                type="number"
                                                name="mobile"
                                                value={mobile}
                                                icon="icon-mobile2"
                                                changeInput={this.handleInput}
                                                required />

                                        </div>

                                        <div className="form-group">
                                            <label className="control-label fontBold">Địa chỉ: <span className="text-danger">*</span></label>

                                            <InputGroup
                                                type="text"
                                                name="address"
                                                value={address}
                                                icon=" icon-location3"
                                                changeInput={this.handleInput}
                                                required />

                                        </div>

                                        <div className="col-md-10">
                                            <button className="btn bg-blue col-md-1" type="button" onClick={this.onUpdate} style={{ width: 'auto' }} >
                                                <i className="icon-checkmark4 position-left"></i>Cập Nhật</button>
                                            <Link to={`/customer/list/`} className="btn btn-danger col-md-1" style={{ marginLeft: 5 }}>
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