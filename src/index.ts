import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import routes from './routes/routes.js';
import './services/GoogleAuthService.js';
import connectDB from './DB/connect.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key';

// Połączenie z bazą danych
connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
