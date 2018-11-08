import { DataTypes } from 'sequelize';
import _ from 'lodash';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';

/**
 * Define Products Model
 * 
 * @export
 * @class Products
 * @extends {BaseModel}
 */
export default class UserRoles extends BaseModel {

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
    role_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true
    },
    userid: {
        type: DataTypes.INTEGER(10),
        allowNull: true
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

/**
 * Options model
 */
const options = {
    tableName: 'user_roles'
};

/**
 * Init Model
 */
UserRoles.init(attributes, { ...options, sequelize });