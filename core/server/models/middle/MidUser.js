'use strict';
import Users from '../User';
import {
    validateEmail
} from '../../libs/common/validate';
import {
    generateRandomString
} from '../../utils/random'
import {
    sendMailForgot
} from '../../libs/common/mail'

class MidUser {
    async checkPassword(email, password) {
        let user = await Users.getUserByEmail(email);
        if (!user) {
            throw new Error('Email incorrect!');
        }

        if (!user.checkPassword(password)) {
            throw new Error('Password incorrect!');
        }

        return true;
    }

    async checkEmail(email) {
        let user = await Users.getUserByEmail(email);
        if (!user) {
            throw new Error('Email incorrect!');
        }
        return true;
    }

    changeAccount(fullname, mobile, avatar, user) {
        return new Promise((resolve, reject) => {
            user.update({
                fullname,
                mobile,
                avatar
            })
                .then(ins => resolve(ins))
                .catch(err => reject(err));
        });
    }

    getUserByEmail(email) {
        return Users.getUserByEmail(email);
    }

    createUser(data) {
        return Users.create(data);
    }

    async registerUser(data) {
        let {
            email,
            password,
            fullname
        } = data

        if (!validateEmail(email)) {
            throw new Error('Email không đúng định dạng');
        }

        let users = await Users.getUserByEmail(email);
        if (users) {
            throw new Error('Email đã được sử dụng!');
        }

        let dataReg = Object.assign(data, {
            status: 0,
            is_add: 0
        })

        return Users.create(dataReg)
    }

    phanQuyenUser = (token) => {
        let result = Users.findOne({
            where: {
                del: 0,
                token
            }
        })
        return result
    }
}

export default new MidUser()