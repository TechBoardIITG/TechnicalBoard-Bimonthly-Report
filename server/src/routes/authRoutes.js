import express from 'express';
import { authController } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', authController.login);
router.post('/change-password', authController.changePassword);
router.get('/me', authController.getMe);
router.get('/users', authController.getUsers);

export default router;
