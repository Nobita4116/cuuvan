import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import {request} from '../../../libs';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      disabled: false
    };
  }

  componentDidMount() {
    this
      .inputEmail
      .focus();
  }

  onChangeInput(key, e) {
    let value = e.target.value;
    this.setState({
      [key]: value.trim()
    });
  }

  showError(message) {
    this.setState({error: message, disabled: false});
  }

  submitLogin(e) {
    e.preventDefault();
    let {email, password} = this.state;

    this.setState({error: '', disabled: true});

    if (!email) {
      this.showError('Vui lòng nhập email');
      return;
    }

    if (!password) {
      this.showError('Vui lòng nhập mật khẩu');
      return;
    }

    request
      .makeRequest('post', '/login', {email, password})
      .then(data => {
        if (data.signal) {
          window.location.href = '/dashboard';
        } else {
          this.showError(data.message);
          
        }
      })
      .catch(err => {
        this.showError('Something went wrong!');
      });
  }

  render() {
    let {error, disabled, email, password} = this.state;
    return (
      <div>
        <form action="#">
          <div className="panel panel-body login-form">
            <div className="text-center">
              <div className="icon-object border-slate-300 text-slate-300">
                <i className="icon-reading"></i>
              </div>
              <h5 className="content-group">Đăng nhập</h5>
            </div>
            <div className="form-group has-feedback has-feedback-left" style={{paddingTop: '0px'}}>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập email"
                value={email}
                required
                onChange={this
                .onChangeInput
                .bind(this, 'email')}
                ref={(input) => {
                this.inputEmail = input;
              }}/>
              <div className="form-control-feedback">
                <i className="icon-envelop4 text-muted"></i>
              </div>
            </div>
            <div className="form-group has-feedback has-feedback-left" style={{paddingTop: '0px'}}>
              <input
                type="password"
                className="form-control"
                placeholder="Nhập mật khẩu"
                required
                value={password}
                onChange={this
                .onChangeInput
                .bind(this, 'password')}/>
              <div className="form-control-feedback">
                <i className="icon-lock2 text-muted"></i>
              </div>
            </div>
            {error
              ? (
                <div className="form-group has-error has-feedback">
                  <span className="help-block">{error}</span>
                </div>
              )
              : ''}
            <div className="text-right marginB10">
              <Link to="/forgot-password">Quên mật khẩu?</Link>
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={disabled}
                onClick={this
                .submitLogin
                .bind(this)}>Đăng nhập
                <i className="icon-arrow-right14 position-right"></i>
              </button>
            </div>

          </div>
        </form>

      </div>
    )
  }
}
export default Login;
