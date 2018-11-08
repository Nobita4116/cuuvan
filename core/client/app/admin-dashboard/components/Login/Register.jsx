import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { translate } from 'react-i18next';
class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
          email: "",
          password: "",
          error: "",
          enable: true
      };
    } 

    componentDidMount() {
        console.log('2222222222222');
    }

    onChangeEmail(e) {
      this.setState({email: e.target.value});
    }

    onChangePassword(e) {
      this.setState({password: e.target.value});
    }

    onLogIn(e) {
      e.preventDefault();
      const {t} = this.props;  
    }

    render() {
        const {t} = this.props;
        let {error, enable} = this.state;
        return (
            <div>
              <form action="#">
                <div className="panel panel-body login-form">
                  <div className="text-center">
                    <div className="icon-object border-slate-300 text-slate-300"><i className="icon-reading"></i></div>
                    <h5 className="content-group">{t('login.header')}</h5>
                  </div>
                  <div className="form-group has-feedback has-feedback-left">
                    <p>Email</p>
                    <input type="text" className="form-control" placeholder={t('login.enter_email')} value={this.state.email} onChange={this.onChangeEmail.bind(this)}/>
                    <div className="form-control-feedback">
                      <i className="icon-envelop4 text-muted"></i>
                    </div>
                  </div>
                  <div className="form-group has-feedback has-feedback-left">
                    <p>Password</p>
                    <input type="password" className="form-control" placeholder={t('login.enter_pass')} value={this.state.password} onChange={this.onChangePassword.bind(this)}/>
                    <div className="form-control-feedback">
                      <i className="icon-lock2 text-muted"></i>
                    </div>
                  </div>
                  {error ? (
                    <div className="form-group has-error has-feedback">
                      <span className="help-block">{error}</span>
                    </div>
                  ) : ''}
                  <div className="text-right marginB10">
                    <a href="/forgotpassword">{t('login.forgot_pass')}</a>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block" disabled={!enable} onClick = {this.onLogIn.bind(this)}>{t('login.login')} <i className="icon-arrow-right14 position-right"></i></button>
                  </div>
                  <div className="content-divider text-muted form-group"><span>{t('login.confirm_register')}</span></div>
                  <div className="form-group">
                    <Link to="login"><button type="button" className="btn btn-default btn-block">Đăng nhập</button></Link>
                  </div>
                </div>
              </form>

            </div>
        )
    }
}
export default translate('dashboard')(Register);

