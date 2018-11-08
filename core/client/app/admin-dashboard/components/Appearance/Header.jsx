import React, {Component} from 'react';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import {makeRequest} from '../../../libs/request';
import {showErrorMessage, showSuccessMessage} from '../../actions/notification';
import ModalMedia from './BoxMenu/ModalMedia';
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image_header: '',
            isShowModal: false
        }
    }

    componentWillMount() {
        let {navigations} = this.props;
        let {currentApp} = navigations;
        
        this.getHeader(currentApp);
    }

    getHeader(currentApp) {
        makeRequest('get', '/admin/'+ currentApp +'/getHeader')
            .then(result => {
                if (result.signal) {
                    let data = result.data;
                    if (data && data.option_value) {
                        this.setState({
                            image_header: data.option_value
                        });
                    }
                } else {
                    showErrorMessage(result.message);
                }
            }).catch(err => {
                showErrorMessage(err);
            });
    }

    clickImage(image) {
        let {navigations} = this.props;
        let {currentApp} = navigations;
        makeRequest('post', '/admin/'+ currentApp +'/setHeader', {
            image: image.url
        })
        .then(result => {
            if (result.signal) {
                this.setState({
                    image_header: image.url,
                    isShowModal: false
                });

            } else {
                console.log(result.message);
                showErrorMessage(result.message);
            }
        }).catch(err => {
            console.log(err);
            showErrorMessage(err);
        });
    }

    showModal() {
        this.setState({
            isShowModal: true
        });
    }

    hideModal() {
        this.setState({
            isShowModal: false
        });
    }

    render() {
        let {navigations} = this.props;
        let {currentApp} = navigations;
        let {isShowModal, image_header} = this.state;
        return(
            <div className="panel panel-flat">
                <div className="panel-body">
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            {image_header ? (
                                <div className="profile-cover">
                                    <div className="profile-cover-img" style={{backgroundImage: `url(${image_header})`}}></div>
                                    <div className="mt-15 text-center"><button className="btn bg-success-400" onClick={this.showModal.bind(this)}>Add new image</button></div>
                                </div>
                            ) : (
                                <div className="text-center">
									<div className="icon-object border-success text-success"><i className="icon-image2"></i></div>
									<h5 className="text-semibold">No image set to header image</h5>
									<button className="btn bg-success-400" onClick={this.showModal.bind(this)}>Add new image</button>
								</div>
                            )}
                           
                        </div>
                    </div>
                </div>

                <ModalMedia 
                    clickImage={this.clickImage.bind(this)}
                    currentApp={currentApp}
                    isShowModal={isShowModal}
                    hideModal={this.hideModal.bind(this)}
                />

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

export default translate('translations')(connect(mapStateToProps)(Header));