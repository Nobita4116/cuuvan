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
const CACHE_KEY_USER_BY_EMAIL = 'u:e:';
const CACHE_KEY_USER_BY_USERNAME = 'u:un:';

/**
 * Define User Model
 * 
 * @export
 * @class User
 * @extends {BaseModel}
 */
export default class User extends BaseModel {

    static association() {
        User.hasOne(UserRoles, {as: 'user_role', foreignKey: 'userid', hooks: true, onDelete: 'CASCADE', onUpdate : 'NO ACTION'});
    }

    /**
     * Check password
     * 
     * @param {String} password 
     * @returns {Boolean}
     * @memberof User
     */
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password);// giải mã hóa
    }

    /**
     * Set password
     * 
     * @param {any} password 
     * @memberof User
     */
    setPassword(password) {
        this.password = bcrypt.hashSync(password, 10);// mã hóa password
    }

    hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    /**
     * Get user by id
     * 
     * @static
     * @param {any} id 
     * @param {any} [attributes=null] 
     * @returns 
     * @memberof User
     */
    static getUserById(id, attributes = null) {
        return this.findOne({where: {id, del: 0}, attributes}, CACHE_KEY_USER_BY_ID + id);
    }

    /**
     * Get user by email
     * 
     * @static
     * @param {String} email 
     * @param {Array} attributes 
     * @returns 
     * @memberof User
     */
    static getUserByEmail(email, attributes = null) {
        return this.findOne({where: {email}, attributes}, CACHE_KEY_USER_BY_EMAIL + email);
    }
}

/**
 * Hook before create
 * @param {User} user 
 */
const beforeCreate = (user) => {
    if (user.password) {
        user.setPassword(user.password);
    }
    if (!user.name && user.email) user.name = user.email;
};

/**
 * Hooks option
 */
const hooks = {
    beforeCreate
}

/**
 * Attributes model
 */
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
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
        validate: {
            isEmail: true
        }
    },
    mobile: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    token: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    status: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: 0
    },
    del: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
};

const indexes = [
    {
        name: 'uniqid',
        unique: true,
        fields: ['uniqid']
    }
];

/**
 * Options model
 */
const options = {
    tableName: 'user',
    hooks,
    indexes
};

/**
 * Init Model
 */
User.init(attributes, { ...options, sequelize });