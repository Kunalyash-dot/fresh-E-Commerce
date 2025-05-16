 import express from 'express';
import { loginUserController, logoutUserController, refreshTokenController, registerUserController, updateAvatarController, updateUserController, userDetailsController } from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';


 const router = express.Router();

router.post('/register',registerUserController);
router.post('/login',loginUserController);
router.get('/logout',auth,logoutUserController);
router.put('/update-avatar',auth,upload.single('avatar'),updateAvatarController);
router.put('/update-user',auth,updateUserController);
router.post('/refresh-token',refreshTokenController);
router.get('/user-details',auth,userDetailsController);
// router.get('/get-all-users',auth,getAllUsersController);

export default router;