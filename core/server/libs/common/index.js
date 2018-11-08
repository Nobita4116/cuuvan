'use strict';

import path from 'path';

import {DATA_APPLICATION_DEFINED} from '../../config/constants';

function getConstantApp(key) {
    return DATA_APPLICATION_DEFINED[key] || '';
}

function getContentPath(type) {
    return path.join(__dirname, '../../../../' + getConstantApp('contentPath'), type + '/');
}

function getOptionSetting(setting, option) {
    return setting[option] || '';
}

function getChildMenu(listMenu, menuChildId) {
    return listMenu.filter((o) => {
        return menuChildId.indexOf(o.id) >= 0;
    });
}

function buildChildMenu(listMenu, menuChildId) {
    let main = getChildMenu(listMenu, menuChildId);

    let mainChildren = main.map( (item) => {
        let listId = item.menu_child ? JSON.parse(item.menu_child) : [];
        if (listId.length) {
            let child = getChildMenu(listMenu, listId);
            item.children = child.map(item_child => {
                item_child.children = [];
                return item_child;
            });
            // item.children = buildChildMenu(listMenu, listId);
            return item;
        } else {
            item.children = [];
            return item;
        }
    });

    return mainChildren;
}

module.exports = {getConstantApp, getContentPath, getOptionSetting, buildChildMenu}