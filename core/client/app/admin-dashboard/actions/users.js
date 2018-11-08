'use strict';

import {makeRequest} from '../../libs/request';
import {showErrorMessage} from './notification';

export const updateUser = (data) => {
    return {
        type: 'UPDATE_USER_PROFILE',
        data: data
    }
}

export const changePassword = (data) => {
    return makeRequest('post', '/agency/changePassword', data);
}

export const updateInfo = (data) => {
    return makeRequest('post', '/agency/update', data);
}