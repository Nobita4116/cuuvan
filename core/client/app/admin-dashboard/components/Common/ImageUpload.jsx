import React, { Component } from 'react';
import {makeRequest} from '../../../libs/request'

class ImageUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            listImage: []
        }
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
                let {listImage} = this.state
                listImage = listImage.concat([url])
                this.setState({
                    listImage
                })
                this.props.uploadSuccess(listImage)
            }
        })
    }

    removeImage(idx) {
        let {listImage} = this.state
        listImage = listImage.filter((img, index) => {
            return index != idx
        })

        this.setState({
            listImage
        })

        this.props.uploadSuccess(listImage)
    }

    renderThumbnail = (source) => source.map((item, idx) =>
        <li key={`image_${item}`}>
            <a href="#"><img className="thumbnail-quote" src={`${item}`} alt=""/></a>
            <div className="last-down" onClick={this.removeImage.bind(this, idx)}>
                <div><span className="fa fa-trash icon"></span></div>
                Remove
            </div>
        </li>
    )

    render() {
        return (
            <div className="side-a">
                <div className="ipn-file">
                    <input accept="image/*" name="file" id="file" type="file" onChange={this.handleUpload} className="inputfile" data-multiple-caption="{count} files selected" multiple={false} />
                    <label htmlFor="file">
                        <span>Chọn ảnh</span>
                    </label>
                </div>
                {(this.state.listImage.length) ? <ul className="list-inline list-img list-download">{this.renderThumbnail(this.state.listImage)}</ul> : null}
            </div>
        );
    }
}

export default ImageUpload;