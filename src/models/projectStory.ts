import mongoose, { Schema, Document } from 'mongoose';

export type Priority = 'low' | 'medium' | 'high';
export type StoryState = 'todo' | 'doing' | 'done';

export interface IProjectStory extends Document {
  id: number; 
  name: string;
  description: string;
  priority: Priority;
  projectId: number;
  creationDate: Date;
  state: StoryState;
  ownerId: number;
}

const ProjectStorySchema: Schema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  projectId: { type: Number, required: true, ref: 'Project' },
  creationDate: { type: Date, default: Date.now },
  state: { type: String, required: true },
  ownerId: { type: Number, required: true, ref: 'User' }
});

export default mongoose.model<IProjectStory>('ProjectStory', ProjectStorySchema);