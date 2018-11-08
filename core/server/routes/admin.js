import { Router } from 'express';
import { LoginController, UserController } from '../controllers/admin';
import { authLogin, isAuth } from '../middlewares/auth';
const router = new Router();

router.get('/', LoginController.checkLogin);

router.get('/login', authLogin, LoginController.loadForm);

router.post('/login', LoginController.postLogin);

router.get('/logout', UserController.userLogout);

router.get('/*', isAuth, UserController.loadForm)

router.post('/phanQuyenUser', UserController.phanQuyenUser)

export default router;
