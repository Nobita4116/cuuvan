import { sequelize } from '../connections';
import BaseModel from './BaseModel';
import { DataTypes } from 'sequelize';
import { WorkItem, CustomerReview } from './'




export default class Progress extends BaseModel {

    static association() {
        Progress.belongsTo(CustomerReview, { as: 'customer_review', foreignKey: 'customer_review_id' });
        Progress.belongsTo(WorkItem, { as: 'work_item', foreignKey: 'work_item_id' })
    }

    static getRateByEmployee(employee_id) {
        return this.findAll({
            where: {
                employee_id,
                del: 0
            },
            include: ['customer_review', 'work_item']
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
    work_item_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    employee_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    request_customer_id: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null
    },
    employee_progress: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
        defaultValue: null
    },
    customer_review_id: {
        type: DataTypes.TINYINT(1),
        allowNull: true
    },
    time: {
        type: DataTypes.DATE,
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
    tableName: 'employee_progress',
};
Progress.init(attributes, { ...options, sequelize });