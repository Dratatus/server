import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { IUser } from '../models/users.js';
import { User } from '../models/users.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const CALLBACK_URL = process.env.CALLBACK_URL;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ 'passwords.email': profile.emails?.[0].value });

        if (!user) {
            user = new User({
                id: profile.id,
                firstName: profile.name?.givenName || '',
                lastName: profile.name?.familyName || '',
                role: 'Developer',
                passwords: { email: profile.emails?.[0].value || '', password: '' },
                avatar: profile.photos?.[0].value || '',
            });

            await user.save();
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj: IUser, done) => {
    done(null, obj);
});

export const generateToken = (user: IUser): string => {
    return jwt.sign(
        {
            id: user.id,
            email: user.passwords.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar
        },
        process.env.JWT_SECRET || '',
        { expiresIn: process.env.JWT_EXPIRATION || '1h' }
    );
};

export const generateRefreshToken = (user: IUser): string => {
    return jwt.sign(
        {
            id: user.id,
            email: user.passwords.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar
        },
        process.env.JWT_SECRET || '',
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION || '7d' }
    );
};
