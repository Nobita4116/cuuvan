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
export default class Permissions extends BaseModel {

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
    object: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null
    },
    action: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null
    },
    status: {
        type: DataTypes.TINYINT(1),
        allowNull: true
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
    tableName: 'permissions'
};

/**
 * Init Model
 */
Permissions.init(attributes, { ...options, sequelize });