'use strict';
import { isAuthenticate, authenticate, getUserCurrent, authenticateEmployee, authenticateCustomer } from '../../libs/auth/auth';
import { validateEmail } from '../../libs/common/validate';
import { ResponseError, ResponseSuccess } from '../BaseReponse';
import { MidUser, MidAgency, MidCustomer, MidEmployee, MidWork } from '../../models/middle';
import path, { resolve } from 'path';
import Users from '../../models/User';
import { isBuffer } from 'util';

class LoginController {
    loadForm(req, res) {
        return res.render('login')
    }

    checkLogin(req, res) {
        if (isAuthenticate(req, res)) {
            return res.redirect('/dashboard');
        } else {
            return res.redirect('/login');
        }
    }

    postLogin(req, res) {
        let dataPost = req.body,
            email = dataPost.email || '',
            password = dataPost.password || '';

        email = email.trim();
        password = password.trim();

        if (!email || !password) {
            return ResponseError(res, 'Require params');
        }

        authenticate(req, res, { email, password })
            .then(ins => {
                return ResponseSuccess(res, ins);
            })
            .catch(err => {
                return ResponseError(res, err.message);
            });
    }

    EmployeeLogin(req, res) {
        let dataPost = req.body
        let mobile = dataPost.mobile
        let password = dataPost.password

        mobile = mobile.trim()
        password = password.trim()

        if (!mobile || !password) {
            return ResponseError(res, 'Require params')
        }

        authenticateEmployee(req, res, { mobile, password })
            .then(result => {
                return ResponseSuccess(res, result)
            })
            .catch(err => {
                return ResponseError(res, err.message)
            })
    }

    EmployeeUpstatus(req, res) {
        let dataBody = req.body
        let { id, employee_progress } = dataBody
        if (!id) {
            throw new Error('Require Params')
        }
        MidEmployee.EmployeeUpstatus(id, employee_progress)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    EmployeeProgress(req, res) {
        let dataBody = req.body
        MidEmployee.EmployeeProgress(dataBody)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    CustomerLogin(req, res) {
        let dataPost = req.body
        let mobile = dataPost.mobile
        let password = dataPost.password

        mobile = mobile.trim()
        password = password.trim()

        if (!mobile || !password) {
            return ResponseError(res, 'Require params')
        }

        authenticateCustomer(req, res, { mobile, password })
            .then(result => {
                return ResponseSuccess(res, result)
            })
            .catch(err => {
                return ResponseError(res, err)
            })
    }

    CustomerCreate(req, res) {
        let dataBody = req.body
        MidCustomer.CustomerCreate(dataBody)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    CustomerRequest(req, res) {
        let dataBody = req.body
        MidCustomer.CustomerRequest(dataBody)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(err)
            })
    }

    CustomerCancel(req, res) {
        let dataBody = req.body;
        let { id } = dataBody;
        if (!id) return ResponseError(res, "Require params")
        MidCustomer.CustomerCancel(id)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    CustomerOk(req, res) {
        let dataBody = req.body
        let { id } = dataBody
        if (!id) {
            throw new Error('Require params')
        }
        MidCustomer.CustomerOk(id)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    CustomerRate(req, res) {
        let dataBody = req.body
        let { id, customer_rate } = dataBody
        if (!id) {
            throw new Error('Require Params')
        }

        MidCustomer.CustomerRate(id, customer_rate)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    endWorkOrder = async (req, res) => {
        let dataBody = req.body
        let { id } = dataBody
        if (!id) {
            throw new Error('Require params')
        }
        try {
            let work = await MidEmployee.endWorkOrder(id)
            ResponseSuccess(res, work)
        } catch (err) {
            ResponseError(res, err)
        }
    }


    UpdateCustomer(req, res) {
        let dataBody = req.body
        MidCustomer.UpdateCustomer(dataBody)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    postRegister(req, res) {
        let dataPost = req.body
        MidAgency.registerAgency(dataPost)
            .then(ins => {
                return ResponseSuccess(res, ins);
            })
            .catch(err => {
                return ResponseError(res, err);
            });
    }

    forgotPassword(req, res) {
        let dataPost = req.body,
            email = dataPost.email || ''
        email = email.trim()
        if (!email) {
            return ResponseError(res, 'Require params')
        }

        MidUser.forgotPassword(email)
            .then(ins => {
                return ResponseSuccess(res, ins)
            })
            .catch(err => {
                return ResponseError(res, err)
            });
    }

    resetPassword(req, res) {
        let dataPost = req.body
        MidUser.resetPassword(dataPost)
            .then(ins => {
                return ResponseSuccess(res, ins)
            })
            .catch(err => {
                return ResponseError(res, err)
            });
    }

    checkCodeForgot(req, res) {
        let { code } = req.body
        if (!code) {
            return ResponseError(res, 'Require params')
        }

        MidUser.getCodeForgot(code)
            .then(ins => {
                if (!ins) {
                    return ResponseError(res, 'Code invalid')
                } else {
                    return ResponseSuccess(res, ins)
                }
            })
            .catch(err => {
                return ResponseError(res, err)
            });
    }

    changeAccount(req, res) {
        let dataPost = req.body,
            fullname = dataPost.fullname || '',
            mobile = dataPost.mobile || '',
            avatar = dataPost.avatar || ''

        fullname = fullname.trim()
        mobile = mobile.trim()
        avatar = avatar.trim()

        if (!dataPost) {
            return ResponseError(res, 'Require params')
        }
        getUserCurrent(req)
            .then(users => {
                MidUser.changeAccount(fullname, mobile, avatar, users)
                    .then(ins => {
                        return ResponseSuccess(res, ins)
                    })
                    .catch(err => {
                        return ResponseError(res, err)
                    });
            }
            )
    }

    getWorkForEmployee(req, res) {
        let dataQuery = req.query
        let { employee_id } = dataQuery
        if (!employee_id) {
            throw new Error('Require Params')
        }
        MidWork.getWorkForEmployee(employee_id)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getRateByEmployee(req, res) {
        let dataQuery = req.query
        let { employee_id } = dataQuery
        if (!employee_id) {
            throw new Error('Require Params')
        }
        MidWork.getRateByEmployee(employee_id)
            .then(result => {
                ResponseSuccess(res, result)
            }).catch(err => {
                ResponseError(res, err)
            })
    }

    getProgressByCustomer = async (req, res) => {
        let dataQuery = req.query
        let {customer_id} = dataQuery
        if(!customer_id) {
            throw new Error('Require Params')
        }
        try{
            let progress = await MidCustomer.getProgressByCustomer(customer_id)
            ResponseSuccess(res, progress)
        }catch (err) {
            ResponseError(res, err)
        }
    }
}

export default new LoginController