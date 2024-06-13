import express from 'express';
import { registerUser, loginUser } from '../services/authService.js';
import { logout } from '../controllers/login.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);

export default router;