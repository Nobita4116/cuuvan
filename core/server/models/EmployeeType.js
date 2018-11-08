import { DataTypes } from 'sequelize';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';

/**
 * Define EmployeeType Model
 * 
 * @export
 * @class EmployeeType
 * @extends {BaseModel}
 * 
 */

export default class EmployeeType extends BaseModel {

}

const attributes = {
    id: {
        type: DataTypes.INTEGER(1).UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(25),
        allowNull: false
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

const options = {
    tableName: 'employee_type'
};

EmployeeType.init(attributes, { ...options, sequelize });