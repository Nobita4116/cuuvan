import { DataTypes } from 'sequelize';
import _ from 'lodash';
import { sequelize } from '../connections';
import BaseModel from './BaseModel';
import { WorkItem, RequestCustomer } from './'

export default class WorkOrder extends BaseModel {

    static association() {
        WorkOrder.belongsTo(WorkItem, { as: 'work_item', foreignKey: 'work_item_id' })
        WorkOrder.belongsTo(RequestCustomer, { as: 'request_customer', foreignKey: 'request_customer_id' })
    }

    static getWorkByEmplyee(employee_id) {
        return this.findAll({
            where: {
                employee_id,
                del: 0
            },
            include: ['work_item', 'request_customer']
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
    request_customer_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    employee_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    work_item_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    status: {
        type: DataTypes.TINYINT(1),
        allowNull: true,
        defaultValue: 0
    },
    price: {
        type: DataTypes.INTEGER(255),
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
    tableName: 'work_order',
};
WorkOrder.init(attributes, { ...options, sequelize });