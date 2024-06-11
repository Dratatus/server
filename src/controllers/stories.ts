import { Request, Response } from 'express';
import ProjectStory from '../models/projectStory.js';

export const createStory = async (req: Request, res: Response) => {
    try {
        const story = new ProjectStory(req.body);
        await story.save();
        res.status(201).json(story);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getStories = async (req: Request, res: Response) => {
    try {
        const stories = await ProjectStory.find();
        res.status(200).json(stories);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

export const updateStory = async (req: Request, res: Response) => {
    try {
        const story = await ProjectStory.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }
        res.status(200).json(story);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

export const deleteStory = async (req: Request, res: Response) => {
    try {
        const story = await ProjectStory.findOneAndDelete({ id: req.params.id });
        if (!story) {
            return res.status(404).json({ error: 'Story not found' });
        }
        res.status(200).json({ message: 'Story deleted successfully' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};
