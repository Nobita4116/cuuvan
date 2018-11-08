import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {makeRequest} from '../../../libs/request';
import {showErrorMessage, showSuccessMessage} from '../../actions/notification';
import _ from 'lodash';
import DropzoneComponent from 'react-dropzone-component';
const URL_UPLOAD = 'https://skycdn.io/';

class Media extends Component {
    constructor(props) {
        super(props);
        let {navigations} = props;
        this.state = {
            listImage: []
        }
        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif",
            params: {
                appkey: "UT1MtOGb0XxsUP6P5YIfqbdYvnBzqJ4ghjrhGtuj4a0tURuS9VPf2ndiLATSNJCg",
                uid: 1,
                secret_key: "UT1MtOGb0XxsUP6P5YIfqbdYvnBzqJ4ghjrhGtuj4a0tURuS9VPf2ndiLATSNJCg"
            }
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            // postUrl: `/${navigations.currentApp}/upload/file`
            postUrl: URL_UPLOAD + "upload"
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = () => console.log('Hello!');

        this.removedfile = file => console.log('removing...', file);

        this.dropzone = null;
    }

    componentWillMount() {
        let {navigations} = this.props;
        let {currentApp} = navigations;
        
        this.getMedia(currentApp);
    }

    getMedia(currentApp) {
        makeRequest('get', '/admin/'+ currentApp +'/getMedia')
            .then(result => {
                if (result.signal) {
                    this.setState({
                        listImage: result.data
                    });
                } else {
                    showErrorMessage(result.message);
                }
            }).catch(err => {
                showErrorMessage(err);
            });
    }

    renderAllImage() {
        let {listImage} = this.state;
        let classStr = "col-xs-6 col-lg-2 col-md-2 col-sm-4";
        let content = listImage.map((item, idx) => {
            // let thumbnail = item.url.replace('.', '-150x150.');
            let thumbnail = item.url + '?h=100';
            return (
                <div className={classStr} key={`img-${idx}`}>
                    <div className="thumbnail">
                        <div className="thumb">
                            <img src={thumbnail} alt="" style={{height: '100px'}}/>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="mt-10">
                {content}
            </div>
        );
    }

    handleResponseSuccess(file, response, err) {
        if (response.data) {
            let data = response.data;
            let url = URL_UPLOAD + data.src;

            let {listImage} = this.state;
            listImage.push({url});
            this.setState({
                listImage
            });

            let dataUpload = {
                filename: file.name ? file.name : data.filename,
                size: data.filesize,
                mimetype: data.mimetype,
                url
            }

            makeRequest('post', '/'+ this.props.navigations.currentApp +'/upload/urlFile', dataUpload)
            .then(result => {
                if (result.signal) {
                    console.log(result.data);
                } else {
                    console.log(result.message);
                }
            }).catch(err => {
                console.log(err);
            });
        } else {
            showErrorMessage(response.message);
        }
    }

    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            addedfile: this.callback,
            success: this.handleResponseSuccess.bind(this),
            removedfile: this.removedfile
        }
        return(
            <div className="row">
                <div className="col-xs-12 col-sm-12">
                    <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
                
                    {this.renderAllImage()}
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    let {navigations} = state;
    return {
        navigations
    };
}

export default translate('translations')(connect(mapStateToProps)(Media));