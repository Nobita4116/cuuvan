import React, { Component } from 'react';
import {makeRequest} from '../../../libs/request'

class ButtonUpload extends Component {
    constructor(props) {
        super(props)
    }

    handleUpload = (e) => {
        let file = e.target.files[0]
        var formData = new FormData()
        formData.append('file', file)

        makeRequest('post', '/upload/file', formData, {
            'Content-Type': 'multipart/form-data'
        }).then(result => {
            if(result.signal){
                let {url} = result.data
                this.props.uploadSuccess({url})
            }
        })
    }

    render() {
        let {title} = this.props
        return (
            <div className="form-group">
                <label className="control-label fontBold display-block">{title}: <span className="text-danger">*</span></label>
                <div className="uploader" style={{width: '100px'}}>
                    <input type="file" className="file-styled" onChange={this.handleUpload}/>
                    <span className="action btn bg-pink-400" style={{userSelect: "none"}}>Chọn ảnh</span>
                </div>
                <span className="help-block">Accepted formats: png, jpg. Max file size 20Mb</span>
            </div>
        );
    }
}

export default ButtonUpload;