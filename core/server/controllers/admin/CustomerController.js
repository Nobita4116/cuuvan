import { MidCustomer } from '../../models/middle'
import { ResponseError, ResponseSuccess } from '../BaseReponse'

class CustomerController {

    createCustomer(req, res) {
        let dataBody = req.body
        MidCustomer.createCustomer(dataBody)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getAllCustomer = async (req, res) => {
        let dataQuery = req.query
        let { limit, page } = dataQuery
        limit = limit || 20
        page = page || 1

        try {
            let result = await MidCustomer.getAllCustomer(dataQuery, parseInt(page), parseInt(limit))

            let [customer, total] = result
            ResponseSuccess(res, {
                customer,
                total,
                number_page: Math.ceil(total / limit)
            })

        } catch (err) {
            ResponseError(res, err)
        }
    }

    getAllRequest = async (req, res) => {
        let dataQuery = req.query
        let { limit, page } = dataQuery
        limit = limit || 20
        page = page || 1

        try {
            let result = await MidCustomer.getAllRequest(dataQuery, parseInt(page), parseInt(limit))

            let [request, total] = result
            ResponseSuccess(res, {
                request,
                total,
                number_page: Math.ceil(total / limit)
            })

        } catch (err) {
            ResponseError(res, err)
        }
    }

    getCustomer(req, res) {
        let dataQuerry = req.query;
        let { id } = dataQuerry;
        id = parseInt(id);
        if (!id) {
            return ResponseError(res, 'Require params')
        }
        MidCustomer.getCustomer(id)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getRequest(req, res) {
        let dataQuerry = req.query
        let { id } = dataQuerry
        id = parseInt(id);
        if (!id) {
            return ResponseError(res, "request param")
        }
        MidCustomer.getRequest(id)
            .then(request => {
                ResponseSuccess(res, request)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getProgressByRequestId = async (req, res) => {
        let dataQuerry = req.query
        let {request_customer_id} = dataQuerry
        if(!request_customer_id){
            throw new Error('Request Params')
        }
        try{
            let progress = await MidCustomer.getProgressByRequestId(request_customer_id)
            ResponseSuccess(res, progress)
        }catch(err){
            ResponseError(res, err)
        }
    }

    removeCustomer(req, res) {
        let dataBody = req.body;
        let { id } = dataBody;
        if (!id) return ResponseError(res, "Require params");
        MidCustomer.removeCustomer(id)
            .then(result => {
                return ResponseSuccess(res, result)
            })
            .catch(err => {
                return ResponseError(res, err.message);
            })
    }

    removeRequest(req, res) {
        let dataBody = req.body
        let { id } = dataBody
        if (!id) {
            return ResponseError(res, "require params")
        }
        MidCustomer.removeRequest(dataBody)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    updateCustomer(req, res) {
        let dataBody = req.body;
        let { id } = dataBody;
        if (!id) return ResponseError(res, "Require params");
        MidCustomer.updateCustomer(dataBody)
            .then(result => {
                return ResponseSuccess(res, result)
            })
            .catch(err => {
                return ResponseError(res, err.message);
            })
    }

    updateRequest(req, res) {
        let dataBody = req.body;
        let { id } = dataBody;
        if (!id) return ResponseError(res, "Require params");
        MidCustomer.updateRequest(dataBody)
            .then(result => {
                return ResponseSuccess(res, result)
            })
            .catch(err => {
                return ResponseError(res, err.message);
            })
    }

    createRequest(req, res) {
        let dataBody = req.body
        MidCustomer.createRequest(dataBody)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    actionRequest = async (req, res) => {
        let dataBody = req.body
        let { id } = dataBody
        if (!id) {
            throw new Error('Require Params')
        }
        try {
            let action = await MidCustomer.actionRequest(id)
            ResponseSuccess(res, action)
        } catch (err) {
            ResponseError(res, err)
        }
    }

}
export default new CustomerController()