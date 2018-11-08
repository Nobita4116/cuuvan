import Customer from '../Customer'
import RequestCustomer from '../RequestCustomer'
import WorkOrder from '../WorkOrder'
import { Op } from 'sequelize'
import { error } from 'util';
import _ from 'lodash'
import Progress from '../Progress';
import { showSuccessMessage, showErrorMessage } from '../../../client/app/admin-dashboard/actions/notification';


class MidCustomer {

    async createCustomer(data) {
        let check = await Customer.findOne({
            where: {
                mobile: data.mobile,
                del: 0
            }
        })

        if (check) {
            throw new Error('đã tồn tại số điện thoại này!')
        }
        return Customer.create(data)
    }

    getAllCustomer = async (dataSearch, page = 1, limit = 20) => {
        let condition = {
            del: 0,
        }

        if (dataSearch.name) {
            condition.name = {
                [Op.like]: `%${dataSearch.name}%`
            }
        }

        if (dataSearch.mobile) {
            condition.mobile = {
                [Op.like]: `%${dataSearch.mobile}%`
            }
        }

        let result = await Promise.all([
            Customer.findAll({
                where: condition,
                order: [
                    ['createdAt', 'DESC']
                ],
                limit,
                offset: (page - 1) * limit
            }),
            Customer.count({
                where: condition
            })
        ])

        return result
    }


    getAllRequest = async (dataSearch, page = 1, limit = 20) => {
        let condition = {
            del: 0,
        }

        if (dataSearch.name) {
            condition.name = {
                [Op.like]: `%${dataSearch.name}%`
            }
        }

        if (dataSearch.mobile) {
            condition.mobile = {
                [Op.like]: `%${dataSearch.mobile}%`
            }
        }

        if (dataSearch.status) {
            condition.status = dataSearch.status
        }

        if (dataSearch.services_id) {
            condition.services_id = dataSearch.services_id
        }

        let result = await Promise.all([
            RequestCustomer.findAll({
                where: condition,
                order: [
                    ['createdAt', 'DESC']
                ],
                limit,
                offset: (page - 1) * limit
            }),
            RequestCustomer.count({
                where: condition
            })
        ])

        return result
    }


    getCustomer = (id) => {
        return Customer.getCustomerById(id)
    }

    getRequest = async (id) => {
        let requrestCustomer = await RequestCustomer.getRequestById(id)
        if (requrestCustomer) {
            let work_item_id = requrestCustomer.work_item_id;
            let list = work_item_id.map(async (item) => {
                let employee_id = await WorkOrder.findOne({
                    where: {
                        request_customer_id: id,
                        work_item_id: item,
                        del: 0
                    }
                })
                if (employee_id) return employee_id.employee_id;
                return 0
            })
            let list_employee_id = await Promise.all(list)
            return {
                requrestCustomer,
                list_employee_id
            }
        } else {
            return {
                requrestCustomer,
                list_employee_id: []
            }
        }
    }

    getProgressByRequestId = async (request_customer_id) => {
        let progress = await Progress.findAll({
            where: {
                del: 0,
                request_customer_id
            }
        })
        return progress
    }

    async removeCustomer(id) {
        let customer = await Customer.getCustomerById(id)
        if (!customer) {
            throw new Error('customer not exist')
        }
        return customer.update({ del: 1 })
    }

    async removeRequest(id) {
        let request = await RequestCustomer.getRequestById(id)
        if (!request) {
            throw new Error('request not exist')
        }
        return request.update({ del: 1 })
    }

    async updateCustomer(data) {
        let customer = await Customer.getCustomerById(data.id)
        if (!customer) {
            throw new Error('customer not exist')
        }
        return customer.update(data)
    }

    async updateRequest(data) {
        let request = await RequestCustomer.getRequestById(data.id)
        if (!request) {
            throw new Error('request not exist')
        }
        await request.update(data);
        let { work_item_id, list_employee_id, request_customer_id } = data;
        let Work = work_item_id.map(async (item, index) => {
            let work_order = await WorkOrder.findOne({
                where: {
                    work_item_id: item,
                    request_customer_id,
                    del: 0
                }
            })
            if (work_order) {
                let employee_id = list_employee_id[index] || 0;
                if (!employee_id) {
                    await work_order.update({
                        del: 1
                    })
                } else {
                    await work_order.update({
                        employee_id: list_employee_id[index] || 0
                    })
                }

            } else {
                let employee_id = list_employee_id[index] || 0;
                if (employee_id) {
                    let workOrderCreate = {
                        request_customer_id,
                        employee_id,
                        work_item_id: item,
                        status: 0,
                        del: 0
                    }
                    await WorkOrder.create(workOrderCreate)
                }
            }
        })
        Promise.all(Work)
        return request;
    }


    async createRequest(data) {

        let check = await RequestCustomer.findOne({
            where: {
                del: 0,
                mobile: data.mobile,
                status: 0
            }
        })

        if (check) {
            throw new Error('Đã tồn tại yêu cầu này!')  
        }

        let requestCustomer = await RequestCustomer.create(data);

        let customer = await Customer.findOne({
            where: {
                del: 0,
                mobile: requestCustomer.mobile
            }
        })

        if (!customer) {
            let customerCreate = {
                name: requestCustomer.name,
                mobile: requestCustomer.mobile,
                address: requestCustomer.address
            }
            return Customer.create(customerCreate);
        }

        return requestCustomer

    }

    async CustomerCancel(id) {
        let cancel = await RequestCustomer.getRequestById(id)
        if (!cancel) {
            throw new Error('cancel not exist')
        }
        return cancel.update({ status: 5 })
    }

    async CustomerOk(id) {
        let success = await RequestCustomer.getRequestById(id)
        if (!success) {
            throw new Error('success not exist')
        }

        let status = success.status
        if (status != 2) {
            throw new Error('trạng thái yêu cầu không hợp lệ')
        } else {
            return success.update({ status: 3 })
        }

    }

    async CustomerRate(id, customer_rate) {
        let rate = await this.getProgressById(id)
        if (!rate) {
            throw new Error('rate not exist')
        }
        return rate.update({ customer_rate })
    }

    getProgressById = async (id) => {
        return Progress.findOne({
            where: {
                id,
                del: 0
            }
        })
    }

    CustomerCreate = async (data) => {
        let customer = await Customer.findOne({
            where: {
                mobile: data.mobile,
                del: 0
            }
        })
        if (customer) {
            throw new Error('Số điện thoại đã được đăng ký')
        }
        if (!data.name || !data.mobile || !data.password || !data.address) {
            throw new Error('Vui lòng nhập đủ thông tin yêu cầu')
        }

        data = Object.assign(data, {
            del: 0,
        })

        return Customer.create(data)
    }

    UpdateCustomer = async (data) => {
        if (!data.token) {
            throw new Error('Require Params')
        }
        let customer = await this.getCustomerByToken(data.token)

        if (!customer) {
            throw new Error('Customer not exist')
        }

        let dataUpdate = _.omit(data, ['id'])
        return customer.update(dataUpdate)
    }

    getProgressByCustomer = async (customer_id) => {
        let progress = await Progress.findAll({
            where: {
                customer_id,
                del: 0
            }
        })
        return progress
    }

    CustomerRequest = async (data) => {
        if (!data.token) {
            throw new Error('Request  Params')
        }

        let request = await this.getCustomerByToken(data.token)

        if (!request) {
            throw new Error('Request not exist')
        } else {
            data.name = request.name,
                data.address = request.address,
                data.mobile = request.mobile
        }

        if (!data.image || !data.services_id || !data.work_item_id || !data.time) {
            throw new Error('Vui lòng nhập đủ thông tin yêu cầu')
        }

        data = Object.assign(data, {
            del: 0,
            status: 0
        })

        return RequestCustomer.create(data)
    }

    getCustomerByToken = (token) => {
        return Customer.findOne({
            where: {
                token,
                del: 0
            }
        })
    }

    actionRequest = async (id) => {
        let action = await RequestCustomer.findOne({
            where: {
                del: 0,
                id,
            }
        })
        return action.update({ status: 1 })
    }

}
export default new MidCustomer()