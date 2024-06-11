import { Router } from 'express';
import passport from 'passport';
import {
  googleAuthCallback,
  refreshToken,
  logout,
  login,
  getUsers,
} from '../controllers/google.js';

const router = Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), googleAuthCallback);

router.post('/refresh-token', refreshToken);

router.get('/logout', logout);
router.post('/login', login);

router.get('/users', getUsers);



export default router;