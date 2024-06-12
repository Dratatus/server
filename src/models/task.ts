import mongoose, { Schema, Document } from 'mongoose';

export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Todo' | 'Doing' | 'Done';

export interface ITask extends Document {
  id: number; 
  name: string;
  description: string;
  priority: TaskPriority;
  storyId: number;
  estimatedTime: number;
  status: TaskStatus;
  creationDate: Date;
  startDate?: Date;
  endDate?: Date;
  assignedUserId?: number;
}

const TaskSchema: Schema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  storyId: { type: Number, required: true, ref: 'ProjectStory' },
  estimatedTime: { type: Number, required: true },
  status: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  startDate: { type: Date },
  endDate: { type: Date },
  assignedUserId: { type: Number, ref: 'User' }
});

export default mongoose.model<ITask>('Task', TaskSchema);
