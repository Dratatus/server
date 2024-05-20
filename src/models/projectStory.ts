import mongoose, { Schema, Document } from 'mongoose';

export type Priority = 'low' | 'medium' | 'high';
export type StoryState = 'todo' | 'doing' | 'done';

export interface IProjectStory extends Document {
  name: string;
  description: string;
  priority: Priority;
  projectId: mongoose.Types.ObjectId;
  creationDate: Date;
  state: StoryState;
  ownerId: mongoose.Types.ObjectId;
}

const ProjectStorySchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, required: true },
  projectId: { type: mongoose.Types.ObjectId, required: true, ref: 'Project' },
  creationDate: { type: Date, default: Date.now },
  state: { type: String, required: true },
  ownerId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

export default mongoose.model<IProjectStory>('ProjectStory', ProjectStorySchema);
