import Services from '../Services'


class MidServices {

    createServices(data) {
        let dataServices = {
            name: data.name,
            description: data.description,
            iamge: data.iamge,
            del: 0
        };
        return Services.create(dataServices)
    }

    getAllServices = () => {
        return Services.findAll({
            where: {
                del: 0
            }
        })
    }

    getServices = (id) => {
        return Services.findOne({
            where: {
                del: 0,
                id
            }
        })
    }

    async removeServices(id) {
        let services = await Services.getServicesById(id)
        if (!services) {
            throw new Error('service not exist')
        }
        return services.update({ del: 1 })
    }

    async updateServices(data) {
        let services = await Services.getServicesById(data.id)
        if (!services) {
            throw new Error('services not exist')
        }
        return services.update(data)
    }

}
export default new MidServices()