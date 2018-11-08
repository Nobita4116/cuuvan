import { Router } from 'express'
import { EmployeeController } from '../controllers/admin'
import { isAuth, isCanPost } from '../middlewares/auth'


const router = new Router()


router.get('/getEmployeeType', EmployeeController.getEmployeeType)

router.get('/searchEmployee', EmployeeController.getListEmployee)

router.get('/getEmployeeById', EmployeeController.getEmployeeById)

router.get('/getAllWage', EmployeeController.getAllWage)

router.get('/getEdit', EmployeeController.getEmployeeEdit)

router.get('/getWage', EmployeeController.getWage)

router.get('/getProgress', EmployeeController.getProgress)

router.get('/getWageHistory', EmployeeController.getWageHistory)

router.post('/createEmployee', EmployeeController.createEmployee)

router.post('/createWage', EmployeeController.createWage)

router.post('/updateEmployee', EmployeeController.updateEmployee)

router.post('/updateWage', EmployeeController.updateWage)

router.post('/deleteEmployee', EmployeeController.deleteEmployee)

router.post('/deleteWage', EmployeeController.deleteWage)

router.post('/active', EmployeeController.activeEmployee)






export default router