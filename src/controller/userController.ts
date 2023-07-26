import { Request, Response, NextFunction, RequestHandler } from 'express';
import { response } from '../module/responseObject';
import { noteModel, NoteModel } from '../models/note';
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';

// export class UserController {
//   async test() {
//     console.log('test');

//   }
// }
// const uc = new UserController();
// uc.test()

export const addNewNote: RequestHandler = async (req, res, next) => {
  try {
    if (!req.body.heading) {
      throw new Error('Failed To Add a New Note 🙁!');
    }

    const result = new noteModel(req.body);

    if (!result) {
      throw new Error('Failed To Add a New Note 🙁!');
    }

    const newNote = await result.save();

    if (newNote) {
      const note = await noteModel.findOne({ _id: newNote.id });
      return res
        .status(200)
        .send(response({ note }, 'Note Added Successfully ✅!', true));
    }
  } catch (error: any) {
    next(error);
  }
};

export const getAllNotes: RequestHandler = async (req, res, next) => {
  try {
    const result = await noteModel.find();

    if (!result) {
      throw new Error('Failed To Fetch The Notes 🙁!');
    }

    return res
      .status(200)
      .send(response(result, 'Here are all the Notes 📖!', true));
  } catch (error: any) {
    next(error);
  }
};

export const editNote: RequestHandler = async (req, res, next) => {
  try {
    const noteID = req.params.id;
    const updatedData = req.body;
    if (!noteID) {
      throw new Error('Note Not Found 🙁!');
    }

    const result = await noteModel.findByIdAndUpdate(noteID, updatedData, {
      new: true,
      runValidators: true,
    });

    if (result) {
      return res
        .status(StatusCodes.OK)
        .send(response(result, 'Note has been Updated ✅!', true));
    } else {
      throw new Error("Couldn't Update The Note 🙁!");
    }
  } catch (error: any) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  try {
    const noteID = req.params.id;
    if (!noteID) {
      throw new Error('Note Not Found 🙁!');
    }

    const result = await noteModel.findByIdAndUpdate(
      { _id: noteID },
      { $set: { isDeleted: true } },
      {
        new: true,
        runValidators: true,
      }
    );
    if (result) {
      return res
        .status(StatusCodes.OK)
        .send(response(result, 'Note has been Deleted Successfuly 🗑️!', true));
    } else {
      throw new Error("Couldn't Delete The Note 🙁!");
    }
  } catch (error: any) {
    next(error);
  }
};
