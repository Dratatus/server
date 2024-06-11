import { Router } from 'express';
import { createProject, getProjects, updateProject, deleteProject } from '../controllers/projects.js';

const router = Router();

router.post('/projects', createProject);
router.get('/projects', getProjects);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);

export default router;
