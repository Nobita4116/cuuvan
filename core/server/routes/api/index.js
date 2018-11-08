'use strict';
import {Router} from 'express';
import {LoginController} from '../../controllers/admin';

const router = new Router();

router.post('/employee/login', LoginController.EmployeeLogin);

router.post('/employee/upStatus', LoginController.EmployeeUpstatus)

router.post('/employee/progress', LoginController.EmployeeProgress)

router.get('/employee/getWork', LoginController.getWorkForEmployee)

router.get('/employee/getRate', LoginController.getRateByEmployee)

router.post('/employee/endWorkOrder', LoginController.endWorkOrder)

router.post('/customer/login', LoginController.CustomerLogin)

router.post('/customer/create', LoginController.CustomerCreate)

router.post('/customer/update' , LoginController.UpdateCustomer)

router.post('/customer/request', LoginController.CustomerRequest)

router.post('/customer/cancel', LoginController.CustomerCancel)

router.post('/customer/ok', LoginController.CustomerOk)

router.post('/customer/rate', LoginController.CustomerRate)

router.get('/customer/getProgress', LoginController.getProgressByCustomer)



export default router;