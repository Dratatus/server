import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/tasks.js';

const router = Router();

router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
