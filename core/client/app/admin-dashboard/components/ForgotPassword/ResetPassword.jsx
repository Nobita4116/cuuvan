import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom'
import InputForm from '../Common/InputForm'
import { makeRequest } from '../../../libs/request';

class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            error: '',
            confirm_password: '',
            error_request: '',
            success: false,
            loading: true
        }
    }

    componentWillMount() {
        let {match} = this.props
        let {code} = match.params

        if (!code) {
            return this.setState({
                loading: false,
                error: 'The link you requested invalid.'
            })
        }

        makeRequest('post', '/checkReset', {code})
            .then(result => {
                if (result.signal) {
                    this.setState({
                        loading: false
                    })
                } else {
                    this.setState({
                        error: 'The link you requested invalid.',
                        loading: false
                    })
                }
            })
            .catch(err => {
                console.log(err)
                this.setState({
                    error: 'The link you requested invalid.',
                    loading: false
                })
            })
    }

    changeInput = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    submitReset = (e) => {
        e.preventDefault()
        let {confirm_password, password} = this.state
        if (!password)
            this.setState({
                error_request: 'Vui lòng nhập mật khẩu mới'
            })

        if (!confirm_password)
            this.setState({
                error_request: 'Vui lòng nhập mật khẩu xác nhận'
            })

        if (confirm_password != password)
            this.setState({
                error_request: 'Mật khẩu xác nhận không đúng'
            })

        let {code} = this.props.match.params
        makeRequest('post', '/resetPassword', {code, password})
            .then(result => {
                if (result.signal) {
                    this.setState({
                        success: true
                    })
                } else {
                    this.setState({
                        error_request: result.message
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let {password, confirm_password, success, error, loading, error_request} = this.state
        return (
            <div className="panel login-form">
                
                {(success && !loading) && (
                    <div className="panel-body">
                        <div className="text-center">
                            <div className="icon-object border-success text-success"><i className="icon-checkmark3" /></div>
                            <h5 className="content-group-lg">Đổi mật khẩu thành công. Bạn có thể sử dụng mật khẩu mới để đăng nhập hệ thống ngay bây giờ</h5>
                            <Link to="/login" className="btn bg-success-400">Quay lại đăng nhập</Link>
                        </div>
                    </div>
                )}

                {(error && !loading) && (
                    <div className="panel-body">
                        <div className="text-center">
                            <div className="icon-object border-warning text-warning"><i className="icon-warning22" /></div>
                            <h5 className="content-group-lg text-warning">Yêu cầu lấy lại mật khẩu của bạn hết hạn hoặc không hợp lệ</h5>
                            <Link to="/forgot-password" className="btn bg-success-400">Thực hiện lại</Link>
                        </div>
                    </div>
                )}

                {(!error && !loading && !success) && (
                    <div className="panel-body">
                        <div className="text-center">
                            <div className="icon-object border-slate-300 text-slate-300">
                                <i className="icon-reading"></i>
                            </div>
                            <h5 className="content-group">Thiết lập mật khẩu mới</h5>
                        </div>
                        <form onSubmit={this.submitReset.bind(this)}>
                            <div className="form-group has-feedback has-feedback-left">
                                {/* <label className="control-label fontBold">Mật khẩu mới</label> */}
                                <InputForm 
                                    placeholder="Nhập mật khẩu mới"
                                    name="password"
                                    required
                                    changeInput={this.changeInput}
                                />
                                <div className="form-control-feedback">
                                    <i className="icon-lock2 text-muted"></i>
                                </div>
                            </div>
                            <div className="form-group has-feedback has-feedback-left">
                                {/* <label className="control-label fontBold">Xác nhận mật khẩu</label> */}
                                <InputForm 
                                    placeholder="Xác nhận mật khẩu mới"
                                    name="confirm_password"
                                    required
                                    changeInput={this.changeInput}
                                />
                                <div className="form-control-feedback">
                                    <i className="icon-lock2 text-muted"></i>
                                </div>
                            </div>
                            {error_request && (
                                <div className="form-group has-error has-feedback">
                                    <span className="help-block">{error_request}</span>
                                </div>
                            )}
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block" >Đặt lại mật khẩu</button>
                            </div>
                        </form>
                    </div>
                )}

            </div>
        );
    }
}

export default ResetPassword;