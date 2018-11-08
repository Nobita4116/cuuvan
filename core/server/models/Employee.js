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
 * Define Employee Model
 * 
 * @export
 * @class Employee
 * @extends {BaseModel}
 */

export default class Employee extends BaseModel {

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
     * @memberof Employee
     */
    static getEmployeeByMobile(mobile, attributes = null) {
        return this.findOne({ where: { mobile, del: 0 }, attributes }, CACHE_KEY_USER_BY_MOBILE + mobile);
    }
}

const beforeCreate = (employee) => {
    if (employee.password) {
        employee.setPassword(employee.password)
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
        allowNull: false
    },
    mobile: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: null
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    services_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    type_employee: {
        type: DataTypes.TINYINT(1),
        allowNull: true
    },
    status: {
        type: DataTypes.TINYINT(1),
        allowNull: true
    },
    del: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
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
    password: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    }

};

const options = {
    tableName: 'employee',
    hooks
};

Employee.init(attributes, {
    ...options,
    sequelize
});