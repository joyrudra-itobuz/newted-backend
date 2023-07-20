import { Request, Response, NextFunction, RequestHandler } from "express";
import { response } from "../module/responseObject";
import { noteModel, NoteModel } from "../models/note";

export const addNewNote: RequestHandler = async (req, res, next) => {
  if (!req.body.heading) {
    return res
      .status(404)
      .send(response(null, "Failed To Add a New Note 🙁!", false));
  }

  const result = new noteModel(req.body);

  if (!result) {
    return res
      .status(404)
      .send(response(null, "Failed To Add a New Note 🙁!", false));
  }

  const newNote = await result.save();

  if (newNote) {
    const note = await noteModel.findOne({ _id: newNote.id });
    return res
      .status(200)
      .send(response(note, "Note Added Successfully ✅!", true));
  }
};

export const getAllNotes: RequestHandler = async (req, res, next) => {
  const result = await noteModel.find();

  if (!result) {
    return res
      .status(404)
      .send(response(null, "Failed To Fetch The Notes 🙁!", false));
  }

  return res
    .status(200)
    .send(response(result, "Here are all the Notes 📖!", true));
};
