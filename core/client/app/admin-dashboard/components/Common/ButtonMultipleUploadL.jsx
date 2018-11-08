import React, { Component } from 'react';
import { makeRequest } from '../../../libs/request'

class ButtonMultipleUploadL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listImage: this.props.value || []
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.value != this.props.value) {
            this.setState({
                listImage: nextProps.value
            })
        }
    }

    handleUpload = (e) => {
        let file = e.target.files[0]
        var formData = new FormData()
        formData.append('file', file)

        makeRequest('post', '/upload/file', formData, {
            'Content-Type': 'multipart/form-data'
        }).then(result => {
            if (result.signal) {
                let data = result.data;
                let { listImage } = this.state;
                listImage = listImage.concat(data)
                this.setState({
                    listImage
                })
                this.props.updateListImage(listImage);
            } else {
                console.log(result.message)
            }
        }).catch(err => console.log(err))
    }

    renderImage = () => {
        let { listImage } = this.state;
        let { status } = this.props
        if (!listImage.length) return '';
        return listImage.map((item, index) => {
            return (
                <div className="form-group in-block" key={`image-${index}`} >
                    <div style={{ marginLeft: 10 }}><img src={item.url} width="268" alt="" multiple /></div> <br />
                    <span className="btn btn-danger" onClick={this.removeImage.bind(this, index)}>Xóa ảnh</span>
                </div>
            )
        })
    }

    removeImage = (idx) => {
        let { listImage } = this.state;
        listImage = listImage.filter((item, index) => index != idx);
        this.setState({
            listImage
        })
        this.props.updateListImage(listImage);
    }

    render() {
        let { title, status } = this.props;
        return (
            <div>

                <div className="form-group">
                    < label className="control-label fontBold display-block">{title}: <span className="text-danger">*</span></label>
                    <div className="uploader" style={{ width: '100px' }}>
                        <input type="file" className="file-styled" onChange={this.handleUpload.bind(this)} multiple />
                        <span className="action btn bg-pink-400" style={{ userSelect: "none" }}>Chọn ảnh</span>
                    </div>
                    <span className="help-block">Accepted formats: png, jpg. Max file size 20Mb</span>
                    {this.renderImage()}
                </div >

            </div>
        );
    }
}

export default ButtonMultipleUploadL;
