import { Request, Response, NextFunction, RequestHandler } from "express";
import { response } from "../module/responseObject";
import { noteModel, NoteModel } from "../models/note";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";

export const addNewNote: RequestHandler = async (req, res, next) => {
  if (!req.body.heading) {
    return res
      .status(404)
      .send(response(null, "Failed To Add a New Note 🙁!", false));
  }

  try {
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
  } catch (error: any) {
    return next(error);
  }
};

export const getAllNotes: RequestHandler = async (req, res, next) => {
  try {
    const result = await noteModel.find();

    if (!result) {
      return res
        .status(404)
        .send(response(null, "Failed To Fetch The Notes 🙁!", false));
    }

    return res
      .status(200)
      .send(response(result, "Here are all the Notes 📖!", true));
  } catch (error: any) {
    return next(error);
  }
};

export const editNote: RequestHandler = async (req, res, next) => {
  const noteID = req.body._id;
  const updatedData = req.body;

  if (!noteID) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .send(response(null, "Note Not Found 🙁!", false));
  }
  try {
    const result = await noteModel.findByIdAndUpdate(noteID, updatedData, {
      new: true,
      runValidators: true,
    });

    if (result) {
      return res
        .status(StatusCodes.OK)
        .send(response(result, "Note has been Updated ✅!", true));
    } else {
      throw new Error("Couldn't Update The Note 🙁!");
    }
  } catch (error) {
    return next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {};
