import { MidWork } from '../../models/middle'
import { ResponseError, ResponseSuccess } from '../BaseReponse'

class WorkController {

    createWork(req, res) {
        let dataBody = req.body
        MidWork.createWork(dataBody)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }


    getAllWork = async (req, res) => {
        let dataQuery = req.query
        let { limit, page } = dataQuery
        limit = limit || 20
        page = page || 1

        try {
            let result = await MidWork.getAllWork(dataQuery, parseInt(page), parseInt(limit))

            let [work, total] = result
            ResponseSuccess(res, {
                work,
                total,
                number_page: Math.ceil(total / limit)
            })

        } catch (err) {
            ResponseError(res, err)
        }
    }

    removeWork(req, res) {
        let dataBody = req.body;
        let { id } = dataBody;
        id = parseInt(id);
        if (!id) return ResponseError(res, "Require params");
        MidWork.removeWork(id)
            .then(work => {
                return ResponseSuccess(res, work)
            })
            .catch(err => {
                return ResponseError(res, err.message);
            })
    }

    updateWork(req, res) {
        let dataBody = req.body;
        let { id } = dataBody;
        id = parseInt(id)
        if (!id) return ResponseError(res, "Require params");
        MidWork.updateWork(dataBody)
            .then(work => {
                return ResponseSuccess(res, work)
            })
            .catch(err => {
                return ResponseError(res, err.message);
            })
    }

    getWorkById(req, res) {
        let dataQuery = req.query
        let { id } = dataQuery
        id = parseInt(id)
        if (!id) {
            return ResponseError('Require Params')
        }
        MidWork.getWorkById(id)
            .then(work => {
                ResponseSuccess(res, work)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

    getWorkOrder(req, res) {
        let dataQuery = req.query
        MidWork.getWorkOrder(dataQuery)
            .then(result => {
                ResponseSuccess(res, result)
            })
            .catch(err => {
                ResponseError(res, err)
            })
    }

}
export default new WorkController()