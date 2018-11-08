'use strict';
import {isAuthenticate, getUserCurrent} from '../libs/auth/auth';
import {ResponseError} from '../controllers/BaseReponse';

const publicResources = [
    'login', 'logout'
];
export const authMiddeware = (req, res, next) => {
    if (publicResources.indexOf(req.path.split('/')[1]) >= 0) return next();
    if (!req.session.isAuthenticated) {
        return res.redirect('/login');
    }
    next();
}

export const authLogin = async(req, res, next) => {
    let is_auth = await isAuthenticate(req, res)
    if (is_auth) {
        return res.redirect('/dashboard');
    } else {
        next();
    }
}

export const isAuth = async(req, res, next) => {
    let is_auth = await isAuthenticate(req, res)
    if (!is_auth) {
        return res.redirect('/login');
    } else {
        next();
    }
}

export const isAuthSite = async(req, res, next) => {
    let is_auth = await isAuthenticate(req, res)
    if (!is_auth) {
        return res.redirect('/login');
    } else {
        next();
    }
}

export const isCanPost = async(req, res, next) => {
    let is_auth = await isAuthenticate(req, res)
    if (!is_auth) {
        return res.send({
            signal: 0,
            message: 'Tài khoản đã hết hạn đăng nhập. Vui lòng đăng nhập lại tài khoản',
            logout: 1
        });
    } else {
        next();
    }
}