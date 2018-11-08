import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import InputGroup from '../Common/InputGroup'
import { makeRequest } from '../../../libs/request'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'

class CreateCustomer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            mobile: '',
            address: '',
        }
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
        let { name, mobile, address } = this.state
        if (!name || !mobile || !address ) {
            return showErrorMessage('Vui lòng nhập đủ thông tin')
        }

        makeRequest('post', '/customer/createCustomer', { name, mobile, address })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage('Thêm khách hàng thành công')
                    this.props.history.push('/customer/list')
                } else {
                    showErrorMessage(result.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
            <div>
                <PageHeader
                    title="Thêm khách hàng"
                    breadcrumb={[
                        { title: 'Danh sách khách hàng', link: '/customer/list' },
                        { title: 'Tạo mới', link: '' }
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


                                <div className="form-group">
                                    <button type="submit" className="btn bg-blue">
                                        <i className="icon-envelop2 position-left"></i>
                                        Thêm khách hàng
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

export default CreateCustomer;