import {
    loginUser,
    registerUser,
    logout ,
} from '../controllers/user.controller.js';

import Router from 'express'
import {upload} from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/registerUser').post( upload.single("Image"),registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(logout)

export default router