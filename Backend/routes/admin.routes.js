import Router from 'express';
import {
    regitserAsAdmin,
    LoginAdmin,
    verifyCode ,
    LogoutAdmin ,
    createPost,
    deletePost,
    deleteAllPost,
    updatePost,
    approverequest,
    rejectRequest,
    getCurrentUser,
    getPosts
} from '../controllers/admin.controllere.js';
import {upload} from '../middlewares/multer.middleware.js';
import {verifyjwt} from '../middlewares/auth.middleware.js';

const router = Router()

router.route('/registerasAdmin').post(upload.single('Image'),regitserAsAdmin);
router.route('/AdminLogin').post(LoginAdmin);
router.route('/AdminUser').get(verifyjwt , getCurrentUser)
router.route('/AdminLogin/verifyCode').post(verifyCode)
router.route('/AdminLogout').post(verifyjwt ,LogoutAdmin);
router.route('/createPost').post(verifyjwt,upload.single('Image') , createPost);
router.route('/Posts/Delete/:postId').delete( deletePost);
router.route('/Posts/deleteAll').delete(verifyjwt , deleteAllPost);
router.route('/Posts/Update/:postId').patch(upload.single('Image'),verifyjwt , updatePost);
router.route('/approve-request/:requestId').post(approverequest)
router.route('/reject-request/:requestId').post(rejectRequest)
router.route('/UserPost/:userId').get(verifyjwt ,getPosts)
export default router