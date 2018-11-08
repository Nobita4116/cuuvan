'use strict';

import {makeRequest} from '../../libs/request'

export const do_query = (name, params) => {
    if (!self.hasOwnProperty(name)) return null

    return self[name](params)
}

let self = module.exports = {
    do_query
}