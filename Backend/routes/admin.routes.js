import Router from 'express';
import {
    regitserAsAdmin,
    LoginAdmin,
    verifyCode ,
    LogoutAdmin ,
    createPost,
    deletePost,
    deleteAllPost,
    updatePost
} from '../controllers/admin.controllere.js';
import {upload} from '../middlewares/multer.middleware.js';
import {verifyjwt} from '../middlewares/auth.middleware.js';

const router = Router()

router.route('/registerasAdmin').post(upload.single('avatar'),regitserAsAdmin);
router.route('/AdminLogin').post(LoginAdmin);
router.route('/AdminLogin/verifyCode').post(verifyCode)
router.route('/AdminLogout').post(LogoutAdmin);
router.route('/cratePost').post(verifyjwt , createPost);
router.route('/Posts/Delete').delete(verifyjwt , deletePost);
router.route('/Posts/deleteAll').delete(verifyjwt , deleteAllPost);
router.route('/Posts/Update').patch(upload.single('Image'),verifyjwt , updatePost);

export default router