import { DataTypes } from 'sequelize';
import _ from 'lodash';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';

export default class Wage extends BaseModel {


}

const attributes = {
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    employee_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    wage: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    employee_type: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: null
    },
    history: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: 0
    },
    time: {
        type: DataTypes.DATE,
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

const options = {
    tableName: 'employee_wage',
};
Wage.init(attributes, { ...options, sequelize });