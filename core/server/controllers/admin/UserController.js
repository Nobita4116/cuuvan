'use strict';

import {
    getUserCurrent,
    logout,
    loginUser
} from '../../libs/auth/auth';
import {
    MidUser
} from '../../models/middle';
import {
    getConstantApp
} from '../../libs/common';
import {
    ResponseError,
    ResponseSuccess
} from '../BaseReponse';
import {
    DATA_APPLICATION_DEFINED as dataConstant
} from '../../config/constants';
import {
    hashKey
} from '../../libs/common/encryption';
import {
    validateMobile
} from '../../libs/common/validate';

class UserController {
    loadForm(req, res) {
        getUserCurrent(req, res).then(users => {

            let preloadState = {
                users: {
                    profile: users
                }
            };
            return res.render('main', {
                preloadState
            });
        });
    }

    loadFormError(req, res) {
        getUserCurrent(req, res).then(users => {
            let preloadState = {
                users: {
                    profile: users
                }
            };
            return res.render('main', {
                preloadState
            });
        });
    }

    userLogout(req, res) {
        logout(req, res);
        res.redirect('/admin/login');
    }

    changePassword(req, res) {
        let password = req.body.password;
        let oldPassword = req.body.old_password;
        if (!password || !oldPassword)
            return ResponseError(res, 'Require params');

        getUserCurrent(req, res).then((user) => {
            if (!user.checkPassword(oldPassword)) {
                return ResponseError(res, 'M?t kh?u kh�ng d�ng!');
            } else {
                user.updatePassword(password).then((users) => {
                    return ResponseSuccess(res, users);
                }).catch(err => {
                    return ResponseError(res, err.message);
                });
            }
        }).catch(err => {
            console.log(err);
            ResponseError(res, err.message);
        });
    }

    changeUserInfo(req, res) {
        let name = req.body.name;
        let mobile = req.body.mobile;
        if (!name)
            return ResponseError(res, 'Require params');

        if (mobile && !validateMobile(mobile)) {
            return ResponseError(res, 'S? di?n tho?i kh�ng d�ng d?nh d?ng');
        }

        let dataUpdate = {
            fullname: name,
            mobile: mobile
        }

        getUserCurrent(req, res).then((user) => {
            user.update(dataUpdate).then((users) => {
                return ResponseSuccess(res, users);
            }).catch(err => {
                return ResponseError(res, err.message);
            });
        }).catch(err => {
            ResponseError(res, err.message);
        });
    }

    createNewUser(req, res) {
        let dataPost = req.body;
        let {
            email,
            password,
            name
        } = dataPost;

        if (!email || !password || !name) {
            return ResponseError(res, 'Require params');
        }

        getUserCurrent(req, res)
            .then(users => {
                return MidUser.addNewUser({
                    email,
                    password,
                    name,
                    user_admin: users.id
                });
            })
            .then(ins => {
                return ResponseSuccess(res, ins);
            })
            .catch(err => {
                return ResponseError(res, err);
            });
    }

    phanQuyenUser = async (req, res) => {
        let dataBody = req.body
        let { token } = dataBody
        if (!token) {
            throw new Error('Require params')
        }
        try {
            let result = MidUser.phanQuyenUser(token)
            ResponseSuccess(res, result)
        } catch (err) {
            ResponseError(res, err)
        }
    }
};

export default new UserController();