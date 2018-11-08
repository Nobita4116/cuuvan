'use strict';

import _ from 'lodash';
import { User as Users, Employee, Customer } from '../../models';
import { encrypt, decrypt } from '../common/encryption';
import {
    generateRandomString
} from '../../utils/random'

const TAKI_KEY_SESSION_AUTH = 'auth_identity';
const TAKI_KEY_COOKIES_AUTH = 'taki-auth';

const CUUVAN_KEY_COOKIES_AUTH = 'cuuvan-auth';

const TAKI_COOKIES_LIFETIME = 30 * 24 * 3600 * 1000;

let is_authenticated = false;

let self = module.exports = {
    authenticate: async (req, res, credentials) => {
        let user_instance = await Users.getUserByEmail(credentials.email);
        if (!user_instance || !user_instance.id) {
            throw new Error('Tài khoản không tồn tại.');
        }

        if (!user_instance.status)
            throw new Error('Tài khoản chưa kích hoạt');

        if (!user_instance.password || !user_instance.checkPassword(credentials.password)) {
            throw new Error('Mật khẩu không đúng, vui lòng thử lại.');
        }

        let token = generateRandomString(32)
        let userUpdate = await user_instance.update({ token })
        self.setCookies(res, TAKI_KEY_COOKIES_AUTH, JSON.stringify(_.pick(userUpdate, ['id', 'email', 'token'])));
        self.setIdentity(req, userUpdate);
        return true;
    },

    authenticateEmployee: async (req, res, credentials) => {
        let employee_instance = await Employee.getEmployeeByMobile(credentials.mobile)

        if (!employee_instance || !employee_instance.id)
            throw new Error('Tài khoản không tồn tại.')

        if (!employee_instance.status)
            throw new Error('Tài khoản chưa kích hoạt')

        if (!employee_instance.password || !employee_instance.checkPassword(credentials.password))
            throw new Error('Mật khẩu không đúng, vui lòng thử lại.')

        let token = generateRandomString(32)
        let employeeUpdate = await employee_instance.update({ token })

        return employeeUpdate;
    },

    authenticateCustomer: async (req, res, credentials) => {
        let customer_instance = await Customer.getCustomerByMobile(credentials.mobile)

        if (!customer_instance || !customer_instance.id)
            throw new Error('Tài khoản không tồn tại.')

        if (!customer_instance.password || !customer_instance.checkPassword(credentials.password))
            throw new Error('Mật khẩu không đúng, vui lòng thử lại.')

        let token = generateRandomString(32)
        let customerUpdate = await customer_instance.update({ token })

        return customerUpdate;
    },

    loginUser: (req, res, users) => {
        self.setCookies(res, TAKI_KEY_COOKIES_AUTH, JSON.stringify(_.pick(users, ['id', 'email', 'token'])));
        self.setIdentity(req, users);
    },

    setCookies: (res, key, data, lifeTime = TAKI_COOKIES_LIFETIME, path = '/', httpOnly = true) => {
        let dataEncrypt = encrypt(data);
        res.cookies.set(key, dataEncrypt, { maxAge: lifeTime, httpOnly: httpOnly });
    },

    setIdentity(req, user) {
        req.session[TAKI_KEY_SESSION_AUTH] = _.pick(user, ['id', 'email', 'token']);
    },

    async checkTokenAuth(req, res, dataIdentity) {
        if (!dataIdentity['token'] || !dataIdentity['id']) {
            self.logout(req, res)
            return false
        }

        let user_auth = await Users.getUserById(dataIdentity['id'])
        if (!user_auth) {
            self.logout(req, res)
            return false
        }

        if (user_auth.token != dataIdentity['token']) {
            self.logout(req, res)
            return false
        } else {
            return true
        }
    },

    async isAuthenticate(req, res) {
        let dataIdentity = req.session[TAKI_KEY_SESSION_AUTH] || ''
        let dataCookies = res.cookies.get(TAKI_KEY_COOKIES_AUTH) || ''

        if (dataIdentity) {
            let isCheck = await self.checkTokenAuth(req, res, dataIdentity)
            if (isCheck) {
                if (!dataCookies) {
                    self.setCookies(res, TAKI_KEY_COOKIES_AUTH, JSON.stringify(dataIdentity))
                }
                return true
            } else {
                return false
            }

        } else {
            if (!dataCookies)
                return false
            else {
                let dataUser = JSON.parse(decrypt(dataCookies))
                let isCheck = await self.checkTokenAuth(req, res, dataUser)
                if (isCheck) {
                    self.setIdentity(req, dataUser)
                    return true
                } else {
                    return false
                }
            }
        }
    },

    getUserCurrent(req) {
        return new Promise((resolve, reject) => {
            let dataIdentity = req.session[TAKI_KEY_SESSION_AUTH] || '';
            if (!dataIdentity || !dataIdentity.id) {
                resolve(false);
            }

            return Users.getUserById(dataIdentity.id).then(users => resolve(users))
                .catch(err => reject(err));
        });

    },

    removeCookies(res) {
        res.clearCookie(TAKI_KEY_COOKIES_AUTH);
    },

    logout(req, res) {
        self.removeCookies(res);
        req.session.destroy();
    }
}