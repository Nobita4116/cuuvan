import { DataTypes } from 'sequelize';
import _ from 'lodash';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';
import { parseArr, setArr } from '../libs/common/db_parse'
import WorkOrder from './WorkOrder'

export default class RequestCustomer extends BaseModel {

    static getRequestById(id) {
        return this.findOne({
            where: {
                del: 0,
                id
            },
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
    image: {
        type: DataTypes.TEXT,
        allowNull: true,
        get: function () {
            return parseArr(this.getDataValue('image'), []) // biến chuối thành mảng
        },
        set: function (val) {
            this.setDataValue('image', setArr(val)); // trả về chuỗi
        }
    },
    services_id: {
        type: DataTypes.INTEGER(255),
        allowNull: true,
        defaultValue: null
    },
    work_item_id: {
        type: DataTypes.TEXT,
        allowNull: true,
        get: function () {
            return parseArr(this.getDataValue('work_item_id', [])) // biến chuối thành mảng
        },
        set: function (val) {
            this.setDataValue('work_item_id', setArr(val)); // trả về chuỗi
        }
    },
    time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0
    },
    price: {
        type: DataTypes.INTEGER(255),
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
    }
};

const options = {
    tableName: 'request_customer',
};
RequestCustomer.init(attributes, { ...options, sequelize });