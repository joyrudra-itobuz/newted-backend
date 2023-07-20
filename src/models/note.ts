import mongoose, { Document } from "mongoose";

export interface NoteModel extends Document {
  heading: string;
  body?: string;
  createdAt: Date;
  updatedAt: Date;
}

const Schema = new mongoose.Schema(
  {
    heading: { type: String, require: true },
    body: { type: String },
  },
  {
    timestamps: true,
  }
);

export const noteModel = mongoose.model<NoteModel>("Notes", Schema);
