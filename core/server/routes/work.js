import { Router } from 'express'
import { WorkController } from '../controllers/admin'
import { isAuth, isCanPost } from '../middlewares/auth'

const router = new Router()

router.post('/createWork', isCanPost, WorkController.createWork)

router.get('/getAllWork', isCanPost, WorkController.getAllWork)

router.post('/removeWork', isCanPost, WorkController.removeWork)

router.post('/updateWork', isCanPost, WorkController.updateWork)

router.get('/getWorkById', isCanPost, WorkController.getWorkById)

router.get('/getWorkOrder', isCanPost, WorkController.getWorkOrder)

export default router