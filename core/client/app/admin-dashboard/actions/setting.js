'use strict';

import {makeRequest} from '../../libs/request'

export const addMenu = (menu) => {
    return {
        type: 'ADD_MENU',
        data: menu
    }
}

export const changeMenu = (menu) => {
    return {
        type: 'CHANGE_MENU',
        data: menu
    }
}

export const doAddNewMenu = (data) => {
    return (dispatch, getState) => {
        let {navigations} = getState();
        let {currentApp} = navigations;
        
        makeRequest('post', '/admin/' + currentApp + '/menus', data)
            .then(result => {
                dispatch(addMenu(result));
            })
            .catch(err => {
                console.log(err);
            });
    }
}