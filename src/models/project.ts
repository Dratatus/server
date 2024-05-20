import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  desc: string;
}

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true }
});

export default mongoose.model<IProject>('Project', ProjectSchema);
