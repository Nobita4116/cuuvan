import React, { Component } from 'react';
import PageHeader from '../Common/PageHeader'
import InputGroup from '../Common/InputGroup'
import { makeRequest } from '../../../libs/request'
import ButtonUpload from '../Common/ButtonUpload'
import { showErrorMessage, showSuccessMessage } from '../../actions/notification'

class createServices extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            image: ''
        }
    }

    handleInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }


    uploadSuccess = (data) => {
        this.setState({
            image: data.url
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        let { name, description, image } = this.state
        if (!name || !description || !image ) {
            return showErrorMessage('Vui lòng nhập đủ thông tin')
        }

        makeRequest('post', '/services/createServices', { name, description, image })
            .then(result => {
                if (result.signal) {
                    showSuccessMessage('Thêm dịch vụ thành công')
                    this.props.history.push('/services/list')
                } else {
                    showErrorMessage(result.message)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        let { image } = this.state
        return (
            <div>
                <PageHeader
                    title="Tạo dịch vụ"
                    breadcrumb={[
                        { title: 'Dịch vụ', link: '/services/list' },
                        { title: 'Tạo mới', link: '' }
                    ]}
                />

                <div className="content">
                    <div className="panel panel-white">
                        <form className="form-horizonal" action="#" onSubmit={this.submitForm}>
                            <fieldset className="panel-body pb-10">

                                <div className="form-group">
                                    <label className="control-label fontBold">Tên dịch vụ: <span className="text-danger">*</span></label>

                                    <InputGroup
                                        name="name"
                                        placeholder="Tên dịch vụ"
                                        icon="icon-pen2"
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

                                <ButtonUpload title="Upload ảnh dịch vụ" uploadSuccess={this.uploadSuccess} />
                                {image && (
                                    <div className="form-group">
                                        <div className="row"><img src={image} width="96" alt="" /></div>
                                    </div>
                                )}



                                <div className="form-group">
                                    <button type="submit" className="btn bg-blue">
                                        <i className="icon-envelop2 position-left"></i>
                                        Tạo dịch vụ
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

export default createServices;