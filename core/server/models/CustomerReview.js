import { DataTypes } from 'sequelize';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';

/**
 * Define CustomerRivew Model
 * 
 * @export
 * @class CustomerRivew
 * @extends {BaseModel}
 * 
 */

export default class CustomerRivew extends BaseModel {

}

const attributes = {
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    del: {
        type: DataTypes.INTEGER(1)
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
    tableName: 'customer_review'
};

CustomerRivew.init(attributes, { ...options, sequelize });