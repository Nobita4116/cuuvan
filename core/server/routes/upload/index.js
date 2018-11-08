import {Router} from 'express';
import {
    UploadController
} from '../../controllers/content';

const router = new Router();

router.post('/file', UploadController.uploadFile);

// router.post('/urlFile', UploadController.uploadUrl);

export default router;