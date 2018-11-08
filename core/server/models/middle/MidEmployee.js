import { Op } from 'sequelize'
import { DATA_APP_DEFINED } from '../../config/constants'
import { addDay, getTimestamp, unixToTime, convertTimeDate } from '../../libs/common/timezone'
import _ from 'lodash'
import Employee from '../Employee'
import EmployeeType from '../EmployeeType'
import Progress from '../Progress'
import Wage from '../Wage'
import { validateEmail } from '../../utils/validate'
import WorkOrder from '../WorkOrder';

class MidEmployee {
    getEmployeeType = () => {
        return EmployeeType.findAll()
    }

    getListEmployee = async (dataSearch = {}, page = 1, limit = 20) => {
        let condition = { del: 0 }
        if (dataSearch.name) {
            condition.name = {
                [Op.like]: `%${dataSearch.name}%`
            }
        }

        if (dataSearch.services_id) {
            condition.services_id = dataSearch.services_id
        }

        if (dataSearch.type) {
            condition.type_employee = {
                [Op.like]: `%${dataSearch.type}%`
            }
        }

        return Employee.findAll({
            where: condition,
            order: [
                ['createdAt', 'DESC']
            ],
            limit,
            offset: (page - 1) * limit
        })
    }

    countListEmployee = async (dataSearch = {}) => {
        let condition = { del: 0 }
        if (dataSearch.name) {
            condition.name = {
                [Op.like]: `%${dataSearch.name}%`
            }
        }

        if (dataSearch.services_id) {
            condition.services_id = dataSearch.services_id
        }

        if (dataSearch.type_employee) {
            condition.type_employee = {
                [Op.like]: `%${dataSearch.type_employee}%`
            }
        }

        return Employee.count({
            where: condition
        })
    }

    getListWage = async (dataSearch = {}, page = 1, limit = 20) => {
        let condition = {
            del: 0,
            history: 0
        }

        if (dataSearch.employee_id) {
            condition.employee_id = dataSearch.employee_id
        }

        if (dataSearch.type) {
            condition.employee_type = {
                [Op.like]: `%${dataSearch.type}%`
            }
        }

        return Wage.findAll({
            where: condition,
            order: [
                ['createdAt', 'DESC']
            ],
            limit,
            offset: (page - 1) * limit
        })
    }

    getEmployeeById = async (id) => {
        let employee = await Employee.findOne({
            where: {
                del: 0,
                id
            }
        })
        return employee
    }

    countListWage = async (dataSearch = {}) => {
        let condition = { del: 0 }
        if (dataSearch.employee_id) {
            condition.employee_id = dataSearch.employee_id
        }

        if (dataSearch.employee_type) {
            condition.employee_type = {
                [Op.like]: `%${dataSearch.employee_type}%`
            }
        }
        dataSearch.history = 0;

        return Wage.count({
            where: condition
        })
    }

    getListProgress = async (dataSearch = {}, page = 1, limit = 20) => {
        let condition = { del: 0 }
        if (dataSearch.name) {
            condition.name = {
                [Op.like]: `%${dataSearch.name}%`
            }
        }

        if (dataSearch.services_id) {
            condition.services_id = dataSearch.services_id
        }

        if (dataSearch.type) {
            condition.type_employee = {
                [Op.like]: `%${dataSearch.type}%`
            }
        }

        return Progress.findAll({
            where: condition,
            order: [
                ['createdAt', 'DESC']
            ],
            limit,
            offset: (page - 1) * limit
        })
    }

    countListProgress = async (dataSearch = {}) => {
        let condition = { del: 0 }
        if (dataSearch.name) {
            condition.name = {
                [Op.like]: `%${dataSearch.name}%`
            }
        }

        if (dataSearch.services_id) {
            condition.services_id = dataSearch.services_id
        }

        if (dataSearch.type_employee) {
            condition.type_employee = {
                [Op.like]: `%${dataSearch.type_employee}%`
            }
        }

        return Progress.count({
            where: condition
        })
    }


    createEmployee = async (data) => {
        let employee = await this.getEmployeeByMobile(data.mobile)
        if (employee)
            throw new Error('Sai số điện thoại')

        let dataEmployee = Object.assign(data, {
            del: 0,
            status: 0
        })

        let employeeNew = await Employee.create(dataEmployee) // dataEmployee laf 1 object
        return employeeNew
    }

    createWage = async (data) => {
        let dataWage = {
            employee_id: data.employee_id,
            wage: data.wage,
            employee_type: data.employee_type,
            time: data.time,
            del: 0,
            history: 0
        }
        return Wage.create(dataWage)
    }

    getEmployeeById = async (id) => {
        return Employee.findOne({
            where: {
                del: 0,
                id
            }
        })
    }

    getWageById = async (id) => {
        return Wage.findOne({
            where: {
                del: 0,
                id,
                history: 0
            }
        })
    }

    getEmployeeByMobile = async (mobile) => {
        return Employee.findOne({
            where: {
                del: 0,
                mobile
            }
        })
    }

    updateEmployee = async (data) => {
        if (!data.id)
            throw new Error('Require params')

        let employee = await this.getEmployeeById(data.id)

        employee.setPassword(employee.password)
        data.password = employee.password

        if (!employee)
            throw new Error('Employee not exist')

        let dataUpdate = _.omit(data, ['id'])
        return employee.update(dataUpdate)
    }

    updateWage = async (data) => {
        if (!data.id) {
            throw new Error('Require params')
        }
        let wage = await this.getWageById(data.id)
        if (!wage) {
            throw new Error('wage not exist')
        }
        data = _.omit(data, ['id'])
        let p_work = [
            this.createWage(data),
            wage.update({
                history: 1
            })
        ]
        await Promise.all(p_work);
        return 'Success'

    }

    deleteEmployee = async (id) => {
        if (!id)
            throw new Error('Require params')

        let employee = await this.getEmployeeById(id)
        if (!employee)
            throw new Error('Employee not exist')

        employee.update({
            del: 1
        }).then(() => { })

    }

    deleteWage = async (id) => {
        if (!id)
            throw new Error('Require params')

        let wage = await Wage.findOne({
            where: {
                id,
                del: 0
            }
        })
        if (!wage)
            throw new Error('Employee not exist')

        wage.update({
            del: 1
        }).then(() => { })

    }

    activeEmployee = async (id) => {
        if (!id)
            throw new Error('Require params')

        let employee = await this.getEmployeeById(id)
        if (!employee)
            throw new Error('Employee not exist')

        employee.update({
            status: 1
        }).then(() => { })
    }

    endWorkOrder = async (id) => {
        let work = await WorkOrder.findOne({
            where: {
                id,
                del: 0
            }
        })
        if (!work) {
            throw new Error('work not exist')
        }
        return work.update({
            status: 3
        })
    }

    async EmployeeUpstatus(id, employee_progress) {
        let employee = await this.getProgressById(id)
        if (!employee) {
            throw new Error('Employee not exist')
        }
        return employee.update({ employee_progress })

    }

    async EmployeeProgress(data) {
        let dataProgress = {
            request_customer_id: data.request_customer_id,
            employee_id: data.employee_id,
            customer_id: data.customer_id,
            description: data.description,
            image: data.image,
            employee_progress: data.employee_progress,
            customer_rate: data.customer_rate,
            del: 0
        }
        return Progress.create(dataProgress)
    }

    async getWageHistory(employee_id) {
        let history = await Wage.findAll({
            where: {
                employee_id,
                del: 0,
            }
        })
        return history
    }

    getProgressById = async (id) => {
        return Progress.findOne({
            where: {
                id,
                del: 0
            }
        })
    }



}

export default new MidEmployee()