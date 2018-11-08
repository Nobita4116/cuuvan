import { MidServices } from '../../models/middle'
import { ResponseError, ResponseSuccess } from '../BaseReponse'

class ServicesController {

    createServices(req, res) {
        let dataBody = req.body
        MidServices.createServices(dataBody)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getAllServices(req, res) {
        MidServices.getAllServices()
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getServices(req, res) {
        let dataQuerry = req.query ;
        let { id } = dataQuerry ;
        id = parseInt(id) ;
        if(!id) {
            return ResponseError(res, 'Require params')
        }
        MidServices.getServices(id)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    removeServices(req, res) {
        let dataBody = req.body;
        let { id } = dataBody;
        if (!id) return ResponseError(res, "Require params");
        MidServices.removeServices(id)
            .then(services => {
                return ResponseSuccess(res, services)
            })
            .catch(err => {
                return ResponseError(res, err.message);
            })
    }

    updateServices(req, res) {
        let dataBody = req.body;
        let { id } = dataBody;
        if (!id) return ResponseError(res, "Require params");
        MidServices.updateServices(dataBody)
            .then(services => {
                return ResponseSuccess(res, services)
            })
            .catch(err => {
                return ResponseError(res, err.message);
            })
    }

}
export default new ServicesController()