import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {makeRequest} from '../../../libs/request'
import {showErrorMessage, showSuccessMessage} from '../../actions/notification'

class index extends Component {
    constructor(props) {
      super(props);
      this.state = {
          email: "",
          error: "",
          enable: true,
          success: false
      };
    } 

    onChangeEmail(e) {
      this.setState({email: e.target.value});
    }

    onLogIn(e) {
        e.preventDefault();
        let {email} = this.state;
        if(!email) {
            this.setState({error: "Vui lòng nhập email", enable: true});
            return;
        }

        makeRequest('post', '/forgotpassword', {email})
            .then(result => {
                if(result.signal){
                    this.setState({
                        success: true,
                        error: ''
                    })
                } else {
                    this.setState({
                        error: result.message,
                        enable: true
                    })
                }
            })
    }

    render() {
        let {error, enable, success, email} = this.state;

        if (success) {
            return (
                <div className="panel panel-body login-form">
                    <div className="text-center">
                        <div className="icon-object border-warning text-warning"><i className="icon-spinner11"></i></div>
                        <div className="form-group has-success has-feedback">
                            <span className="help-block">
                            Hệ thống đã gửi email lấy lại mật khẩu vào email <strong>{email}</strong> của bạn.
                            </span>
                            <span className="help-block">Vui lòng kiểm tra email và thực hiện theo hướng dẫn trong mail</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <Link to="/login"><button type="button" className="btn btn-primary btn-block">Đăng nhập</button></Link>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <form action="#">
                        <div className="panel panel-body login-form">
                            <div className="text-center">
                                <div className="icon-object border-warning text-warning"><i className="icon-spinner11"></i></div>
                                <h5 className="content-group">Quên mật khẩu </h5>
                            </div>
                            <div className="form-group has-feedback has-feedback-left">
                                <input type="text" className="form-control" placeholder="Nhập email" value={email} onChange={this.onChangeEmail.bind(this)} />
                                <div className="form-control-feedback">
                                    <i className="icon-envelop2 text-muted"></i>
                                </div>
                            </div>
                            {error ? (
                                <div className="form-group has-error has-feedback">
                                    <span className="help-block">{error}</span>
                                </div>
                            ) : ''}
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block" onClick={this.onLogIn.bind(this)}>Tiếp tục</button>
                            </div>
                            <div className="content-divider text-muted form-group"></div>
                            <div className="form-group">
                                <Link to="/login"><button type="button" className="btn btn-default btn-block">Đăng nhập</button></Link>
                            </div>
                        </div>
                    </form>
                </div>
            );  
        }
    }
}
export default index;

