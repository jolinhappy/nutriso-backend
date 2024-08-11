import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/user/:userId', userController.getUserProfile);
router.post('/user/create', userController.createUser);
router.post('/user/login', userController.loginUser);
router.post('/user/logout', userController.logoutUser);

export default router;
