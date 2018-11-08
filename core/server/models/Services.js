import { DataTypes } from 'sequelize';
import _ from 'lodash';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';

export default class Services extends BaseModel {
    static getServicesById(id) {
        return this.findOne({
            where: {
                id,
                del: 0
            }
        })
    }

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
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
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
    tableName: 'services',
};
Services.init(attributes, { ...options, sequelize });