import { Router } from 'express';
import { createStory, getStories, updateStory, deleteStory } from '../controllers/stories.js';

const router = Router();

router.post('/stories', createStory);
router.get('/stories', getStories);
router.put('/stories/:id', updateStory);
router.delete('/stories/:id', deleteStory);

export default router;
