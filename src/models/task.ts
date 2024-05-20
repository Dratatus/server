import mongoose, { Schema, Document } from 'mongoose';

export type TaskPriority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'Todo' | 'Doing' | 'Done';

export interface ITask extends Document {
  name: string;
  description: string;
  priority: TaskPriority;
  storyId: mongoose.Types.ObjectId;
  estimatedTime: number;
  status: TaskStatus;
  creationDate: Date;
  startDate?: Date;
  endDate?: Date;
  assignedUserId?: mongoose.Types.ObjectId;
}

const TaskSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  storyId: { type: mongoose.Types.ObjectId, required: true, ref: 'ProjectStory' },
  estimatedTime: { type: Number, required: true },
  status: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  startDate: { type: Date },
  endDate: { type: Date },
  assignedUserId: { type: mongoose.Types.ObjectId, ref: 'User' }
});

export default mongoose.model<ITask>('Task', TaskSchema);
