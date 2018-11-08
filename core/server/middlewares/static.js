'use strict';

import express from 'express';
import path from 'path';
import {getConstantApp} from '../libs/common';

export const initStaticAdmin = () => {
    return function setStatic(req, res, next) {
        return express.static(path.join(getConstantApp('rootPath'), 'public'))(req, res, next);
    }
}

export const initStaticUpload = () => {
    return function setStatic(req, res, next) {
        return express.static(path.join(getConstantApp('rootPath'), 'content/uploads'))(req, res, next);
    }
}

