import { Router } from 'express'
import { CustomerController, UserController } from '../controllers/admin'
import { isAuth, isCanPost } from '../middlewares/auth'

const router = new Router()

router.get('/getAllCustomer', isCanPost, CustomerController.getAllCustomer)

router.get('/getAllRequest', isCanPost, CustomerController.getAllRequest)

router.get('/getCustomer', isCanPost, CustomerController.getCustomer)

router.get('/getRequest', isCanPost, CustomerController.getRequest)

router.get('/getProgressByRequestId', isCanPost, CustomerController.getProgressByRequestId)

router.post('/actionRequest', CustomerController.actionRequest)

router.post('/removeCustomer', isCanPost, CustomerController.removeCustomer)

router.post('/removeRequest', isCanPost, CustomerController.removeRequest)

router.post('/updateCustomer', isCanPost, CustomerController.updateCustomer)

router.post('/updateRequest', isCanPost, CustomerController.updateRequest)

router.post('/createCustomer', isCanPost, CustomerController.createCustomer)

router.post('/createRequest', isCanPost, CustomerController.createRequest)

export default router