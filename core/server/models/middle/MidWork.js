import Work from '../Work'
import WorkOrder from '../WorkOrder'
import { Op } from 'sequelize'
import Progress from '../Progress'


class MidWork {

    createWork(data) {
        let dataWork = {
            name: data.name,
            description: data.description,
            quantity: data.quantity,
            unit: data.unit,
            services_id: data.services_id,
            del: 0
        };
        return Work.create(dataWork)
    }

    getAllWork = async (dataSearch, page = 1, limit = 20) => {
        let condition = {
            del: 0,
        }

        if (dataSearch.name) {
            condition.name = {
                [Op.like]: `%${dataSearch.name}%`
            }
        }

        let result = await Promise.all([
            Work.findAll({
                where: condition,
                order: [
                    ['createdAt', 'DESC']
                ],
                limit,
                offset: (page - 1) * limit
            }),
            Work.count({
                where: condition
            })
        ])

        return result
    }

    async removeWork(id) {
        let work = await Work.getWorkById(id)
        if (!work) {
            throw new Error('work not exist')
        }
        return work.update({ del: 1 })
    }

    async updateWork(data) {
        let work = await Work.getWorkById(data.id)
        if (!work) {
            throw new Error('work  not exist')
        }
        return work.update(data)
    }

    getWorkById = (id) => {
        return Work.findOne({
            where: {
                id,
                del: 0
            },
        })
    }

    getWorkOrder = () => {
        return WorkOrder.findAll({
            where: {
                del: 0
            }
        })
    }

    async getWorkForEmployee(employee_id) {
        return WorkOrder.getWorkByEmplyee(employee_id)
    }

    async getRateByEmployee(employee_id){
        return Progress.getRateByEmployee(employee_id)
    }

}
export default new MidWork()