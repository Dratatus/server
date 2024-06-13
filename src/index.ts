import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import './services/GoogleAuthService.js';
import connectDB from './DB/connect.js';
import ProjectRoutes from "./routes/project.js"
import GoogleRoutes from "./routes/google.js"
import StoryRoutes from './routes/stories.js';
import TaskRoutes from './routes/tasks.js';
import AuthRoutes from './routes/auth.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-secret-key';

connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', ProjectRoutes, StoryRoutes, TaskRoutes);
app.use('/api/auth', GoogleRoutes);
app.use('/api', AuthRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
