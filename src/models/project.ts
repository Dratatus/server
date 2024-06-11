import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  id: number;
  name: string;
  desc: string;
}

const ProjectSchema: Schema = new Schema({

  id: { type: Number, required: true },
  name: { type: String, required: true },
  desc: { type: String, required: true }
});

export default mongoose.model<IProject>('Project', ProjectSchema);
