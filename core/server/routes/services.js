import { Router } from 'express'
import { ServicesController } from '../controllers/admin'
import { isAuth, isCanPost } from '../middlewares/auth'

const router = new Router()

router.post('/createServices', isCanPost, ServicesController.createServices)

router.get('/getAllServices', isCanPost, ServicesController.getAllServices)

router.get('/getServices', isCanPost, ServicesController.getServices)

router.post('/removeServices', isCanPost, ServicesController.removeServices)

router.post('/updateServices', isCanPost, ServicesController.updateServices)

export default router