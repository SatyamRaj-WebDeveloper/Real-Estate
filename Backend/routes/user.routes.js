import {
    loginUser,
    registerUser,
    logout ,
    Book,
    AddtoWishlist,
    deleteItemfromWishlist,
    usersWishlist
} from '../controllers/user.controller.js';
import {verifyjwtuser} from '../middlewares/auth.middleware.js'
import Router from 'express'
import {upload} from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/registerUser').post( upload.single("Image"),registerUser)
router.route('/login').post(loginUser)
router.route('/Book/:plotId').post(verifyjwtuser , Book )
router.route('/logout').post(logout)
router.route('/AddingtoWishlist/:postId').post(verifyjwtuser , AddtoWishlist)
router.route('/removefromwshlist/:postId').post(verifyjwtuser ,deleteItemfromWishlist )
router.route("/Wishlist").get(verifyjwtuser , usersWishlist)
export default router