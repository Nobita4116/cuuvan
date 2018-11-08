import React, {Component} from 'react';
import {makeRequest} from '../../libs/request';
import _ from 'lodash';
import DropzoneComponent from 'react-dropzone-component';

class Media extends Component {
    constructor(props) {
        super(props);
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
            postUrl: "https://s1.skycdn.io/upload"
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = () => console.log('Hello!');

        this.removedfile = file => console.log('removing...', file);

        this.dropzone = null;
    }

    handleResponseSuccess(file, response, err) {
        if (response.data) {
            let data = response.data;
            let url = `https://s1.skycdn.io/${data.src}`;

            let dataUpload = {
                filename: file.name ? file.name : data.filename,
                size: data.filesize,
                mimetype: data.mimetype,
                url
            }

            makeRequest('post', '/'+ this.props.currentApp +'/upload/urlFile', dataUpload)
            .then(result => {
                if (result.signal) {
                    console.log(result.data);
                    this.props.uploadSuccess(result.data);
                } else {
                    console.log(result.message);
                    this.props.uploadFail(result.message);
                }
            }).catch(err => {
                console.log(err);
                this.props.uploadFail(err);
            });
        } else {
            this.props.uploadFail(response.message);
        }
    }

    render() {
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
            <div className="row">
                <div className="col-xs-12 col-sm-12">
                    <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
                </div>
            </div>
        );
    }

}

export default Media;