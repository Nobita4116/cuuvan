import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import randomize from 'randomatic';
import _ from 'lodash';

import { sequelize } from '../connections';
import BaseModel from './BaseModel';
import {
    UserRoles
} from '../models'


const CACHE_KEY_USER_BY_ID = 'u:id:';
const CACHE_KEY_USER_BY_MOBILE = 'u:mb:';


/**
 * Define Customer Model
 * 
 * @export
 * @class Customer
 * @extends {BaseModel}
 */

export default class Customer extends BaseModel {

    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }

    setPassword(password) {
        this.password = bcrypt.hashSync(password, 10);
    }

    hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    /**
     * Get user by MOBILE
     * 
     * @static
     * @param {any} mobile 
     * @param {any} [attributes=null] 
     * @returns 
     * @memberof Customer
     */
    static getCustomerByMobile(mobile, attributes = null) {
        return this.findOne({ where: { mobile, del: 0 }, attributes }, CACHE_KEY_USER_BY_MOBILE + mobile);
    }

    static getCustomerById(id) {
        return this.findOne({
            where: {
                id,
                del: 0
            }
        })
    }
}


const beforeCreate = (customer) => {
    if (customer.password) {
        customer.setPassword(customer.password)
    }
}


const hooks = {
    beforeCreate
}


const attributes = {
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    mobile: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    del: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
};

const options = {
    tableName: 'customer',
};
Customer.init(attributes, { ...options, sequelize });