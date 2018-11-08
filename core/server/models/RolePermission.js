import { DataTypes } from 'sequelize';
import _ from 'lodash';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';
import {parseArr, setArr} from '../libs/common/db_parse'

/**
 * Define Products Model
 * 
 * @export
 * @class Products
 * @extends {BaseModel}
 */
export default class RolePermission extends BaseModel {

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
    permission_id: {
        type: DataTypes.TEXT,
        allowNull: true,
        get: function () {
            return parseArr(this.getDataValue('permission_id', []))
        },
        set: function (val) {
            this.setDataValue('permission_id', setArr(val));
        }
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
    tableName: 'role_permissions'
};

/**
 * Init Model
 */
RolePermission.init(attributes, { ...options, sequelize });