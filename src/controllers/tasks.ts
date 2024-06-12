import { Request, Response } from 'express';
import Task from '../models/task.js';

export const createTask = async (req: Request, res: Response) => {
    try {
        const taskData = {
            ...req.body,
            id: new Date().getTime(),
        };
        const task = new Task(taskData);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await Task.find().lean();
        res.status(200).json(tasks);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

export const updateTask = async (req: Request, res: Response) => {
    try {
        const updateData = {
            ...req.body,
        };
        const task = await Task.findOneAndUpdate({ id: req.params.id }, updateData, { new: true }).lean();
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};


export const deleteTask = async (req: Request, res: Response) => {
    try {
        const task = await Task.findOneAndDelete({ id: req.params.id });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};
