import React, {Component} from 'react';
import {showSuccessMessage, showErrorMessage} from '../../../actions/notification';
import DropzoneComponent from 'react-dropzone-component';
import SkyModal from '../../../../common/Modal/SkyModal';
import _ from 'lodash';

class CustomLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listImage: [],
            url: ''
        }

        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif",
            maxFiles: 1
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: `/admin/upload/file`
        };

        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        this.callback = () => console.log('Hello!');

        this.removedfile = file => console.log('removing...', file);

        this.dropzone = null;
    }

    componentWillReceiveProps(nextProps, nextState) {
        if(nextProps.typeModal && nextProps.typeModal != this.props.typeModal) {
            this.setState({
                url:''
            })
        }
    }

    handleResponseSuccess(file, response, err) {
        if (response.data) {
            let data = response.data;
            let url = data.url;

            let dataUpload = {
                filename: file.name ? file.name : data.filename,
                size: data.size,
                url
            }

            this.props.clickImage({url})

        } else {
            showErrorMessage(response.message);
        }
    }

    selectImage(image, e) {
        e.preventDefault();
        this.props.clickImage(image);
    }

    insertUrl() {
        let {url} = this.state
        if (url) {
            this.props.clickImage({url})
        }
    }

    onChangeUrl(e) {
        this.setState({
            url: e.target.value
        })
    }

    render() {
        let {listImage, listAudio, listVideo} = this.state;
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        const eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            addedfile: this.callback,
            success: this.handleResponseSuccess.bind(this),
            removedfile: this.removedfile
        }

        return(
            <SkyModal
                isShow={this.props.isShowModal}
                title='Upload Image'
                handleHide={this.props.hideModal}
                hasButtonCancel={true}
                hasButtonAction={false}
                textAction='Select'
                size='lg'
            >
                <div className="content">
                    <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
                    <div className="text-center mt-10">Or Insert From Link</div>
                    <div className="form-group">
                        <div className="col-lg-10">
                            <input type="text" className="form-control" placeholder="Enter link to insert" name="additional_link" value={this.state.url} onChange={this.onChangeUrl.bind(this)}/>
                        </div>
                        <div className="col-lg-2"><button type="button" className="btn btn-info" onClick={this.insertUrl.bind(this)}>Insert</button></div>
                    </div>
                </div>

            </SkyModal>
        );
    }
}

export default CustomLink
