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
router.route('/AdminLogout').post(verifyjwt ,LogoutAdmin);
router.route('/createPost').post(verifyjwt,upload.single('Image') , createPost);
router.route('/Posts/Delete/:postId').delete(  deletePost);
router.route('/Posts/deleteAll').delete(verifyjwt , deleteAllPost);
router.route('/Posts/Update/:postId').patch(upload.single('Image'),verifyjwt , updatePost);

export default router