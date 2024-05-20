import { Router, Request, Response } from 'express';
import passport from 'passport';
import { IUser } from '../models/users.js';
import { User } from '../models/users.js';
import { generateToken, generateRefreshToken } from '../services/GoogleAuthService.js';

const router = Router();
const refreshTokens: { [key: string]: string } = {};

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req: Request, res: Response) => {
  const user = req.user as IUser;
  const token = generateToken(user);
  const refreshToken = generateRefreshToken(user);
  const googleToken = req.authInfo;
  refreshTokens[refreshToken] = user.passwords.email;

  res.redirect(`http://localhost:5173/login?token=${token}&refreshToken=${refreshToken}&googleToken=${googleToken}`);
});

router.post('/refresh-token', async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const email = refreshTokens[refreshToken];
  if (email) {
    const user = await User.findOne({ 'passwords.email': email });
    if (user) {
      const newToken = generateToken(user);
      res.json({ token: newToken });
    } else {
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  } else {
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;
