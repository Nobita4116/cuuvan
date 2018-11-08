import React, { Component } from 'react';
import SkyModal from '../../../common/Modal/SkyModal'
import InputGroup from '../Common/InputGroupV3'
import ButtonUpload from '../Common/ButtonUpload'
import { makeRequest } from '../../../libs/request'
import { Link } from 'react-router-dom'
import PageHeader from '../Common/PageHeader'

class UpdateSerives extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            image: '',
            description: '',
        }
    }
    componentWillMount() {
        let { id } = this.props.match.params; //api lấy thông tin từ id
        makeRequest('get', '/services/getServices', { id })
            .then(result => {
                if (result.signal) {
                    let { id, name, image, description } = result.data;
                    this.setState({
                        id,
                        name,
                        image,
                        description
                    })
                } else {
                    this.props.history.push('/services/list')
                }
            })
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

    onUpdate = () => {
        let { id, name, description, image } = this.state;
        makeRequest('post', '/services/updateServices', {
            id, name, description, image
        })
            .then(res => {
                if (res.signal) {
                    this.props.history.push('/services/list')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        let { image, name, description } = this.state;
        return (
            <div>
                <PageHeader
                    title="Cập nhật dịch vụ"
                    breadcrumb={[
                        { title: 'Danh sách dịch vụ', link: '/services/list' },
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

                                            <ButtonUpload title="Ảnh dịch vụ" uploadSuccess={this.uploadSuccess} />
                                            {image && (
                                                <div className="form-group">

                                                    <div className="row"><img src={image} width="186" alt="" /></div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label fontBold">Tên dịch vụ: <span className="text-danger">*</span></label>

                                            <InputGroup
                                                type="text"
                                                name="name"
                                                value={name}
                                                icon="icon-pen2"
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

                                        <div className="form-group col-md-12">
                                            <button className="btn bg-blue col-md-1" type="button" onClick={this.onUpdate} style={{ width: 'auto' }} >
                                                <i className="icon-checkmark4 position-left"></i>Cập nhật</button>
                                            <Link to={`/services/list/`} className="btn btn-danger col-md-1" style={{ marginLeft: 10, width: 'auto' }}>
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