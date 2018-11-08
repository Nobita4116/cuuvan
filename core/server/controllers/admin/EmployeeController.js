'use strict';

import {
    MidEmployee,

} from '../../models/middle'

import {
    ResponseError,
    ResponseSuccess
} from '../BaseReponse'
import { isBuffer } from 'util';


class EmployeeController {
    getEmployeeType(req, res) {
        MidEmployee.getEmployeeType()
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getListEmployee = async (req, res) => {
        let dataQuery = req.query
        let { limit, page } = dataQuery
        limit = limit || 20
        page = page || 1

        try {
            let [listEmployee, total] = await Promise.all([
                MidEmployee.getListEmployee(dataQuery, parseInt(page), parseInt(limit)),
                MidEmployee.countListEmployee(dataQuery)
            ])

            ResponseSuccess(res, {
                listEmployee,
                total,
                number_page: Math.ceil(total / limit)
            })
        } catch (err) {
            ResponseError(res, err)
        }
    }

    getEmployeeById = async (req, res) => {
        let dataQuery = req.query
        let { id } = dataQuery
        if (!id) {
            throw new Error('Require Params')
        }
        try {
            let result = await MidEmployee.getEmployeeById(id)
            ResponseSuccess(res, result)
        } catch (err) {
            ResponseError(res, err)
        }
    }

    getAllWage = async (req, res) => {
        let dataQuery = req.query
        let { limit, page } = dataQuery
        limit = limit || 20
        page = page || 1

        try {
            let [listWage, total] = await Promise.all([
                MidEmployee.getListWage(dataQuery, parseInt(page), parseInt(limit)),
                MidEmployee.countListWage(dataQuery)
            ])

            ResponseSuccess(res, {
                listWage,
                total,
                number_page: Math.ceil(total / limit)
            })
        } catch (err) {
            ResponseError(res, err)
        }
    }


    getProgress = async (req, res) => {
        let dataQuery = req.query
        let { limit, page } = dataQuery
        limit = limit || 20
        page = page || 1

        try {
            let [listProgress, total] = await Promise.all([
                MidEmployee.getListProgress(dataQuery, parseInt(page), parseInt(limit)),
                MidEmployee.countListProgress(dataQuery)
            ])

            ResponseSuccess(res, {
                listProgress,
                total,
                number_page: Math.ceil(total / limit)
            })
        } catch (err) {
            ResponseError(res, err)
        }
    }

    getWageHistory = async (req, res) => {
        let dataQuery = req.query
        let { employee_id } = dataQuery
        if (!employee_id) {
            throw new Error('Require Params')
        }
        employee_id = parseInt(employee_id)
        try {
            let history = await MidEmployee.getWageHistory(employee_id)
            ResponseSuccess(res, history)
        } catch (err) {
            ResponseError(res, err)
        }
    }

    createEmployee = async (req, res) => {
        let dataBody = req.body
        try {
            let employee = await MidEmployee.createEmployee(dataBody)
            ResponseSuccess(res, employee)
        } catch (err) {
            ResponseError(res, err)
        }
    }

    createWage = async (req, res) => {
        let dataBody = req.body
        try {
            let wage = await MidEmployee.createWage(dataBody)
            ResponseSuccess(res, wage)
        } catch (err) {
            ResponseError(res, err)
        }
    }


    getEmployeeEdit(req, res) {
        let { id } = req.query
        if (!id) {
            return ResponseError(res, 'Require params')
        }

        id = parseInt(id)

        MidEmployee.getEmployeeById(id)
            .then(result => {
                if (!result) {
                    ResponseError(res, 'Thợ không tồn tại')
                } else {
                    ResponseSuccess(res, result)
                }
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getWage(req, res) {
        let { id } = req.query
        if (!id) {
            return ResponseError(res, 'Require params')
        }

        id = parseInt(id)

        MidEmployee.getWageById(id)
            .then(result => {
                if (!result) {
                    ResponseError(res, 'Thợ không tồn tại')
                } else {
                    ResponseSuccess(res, result)
                }
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    updateEmployee = async (req, res) => {
        let dataBody = req.body
        try {
            let employee = await MidEmployee.updateEmployee(dataBody)
            ResponseSuccess(res, employee)
        } catch (err) {
            ResponseError(res, err)
        }
    }

    updateWage = async (req, res) => {
        let dataBody = req.body
        try {
            let wage = await MidEmployee.updateWage(dataBody)
            ResponseSuccess(res, wage)
        } catch (err) {
            ResponseError(res, err)
        }
    }

    deleteEmployee = async (req, res) => {
        let { id } = req.body
        try {
            let employee = await MidEmployee.deleteEmployee(id)
            ResponseSuccess(res, employee)
        } catch (err) {
            ResponseError(res, err)
        }
    }

    deleteWage = async (req, res) => {
        let { id } = req.body
        try {
            let wage = await MidEmployee.deleteWage(id)
            ResponseSuccess(res, wage)
        } catch (err) {
            ResponseError(res, err)
        }
    }

    activeEmployee = async (req, res) => {
        let { id } = req.body
        try {
            let employee = await MidEmployee.activeEmployee(id)
            ResponseSuccess(res, employee)
        } catch (err) {
            ResponseError(res, err)
        }
    }

}

export default new EmployeeController