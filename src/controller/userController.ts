import { Request, Response, NextFunction, RequestHandler } from 'express';
import { response } from '../module/responseObject';
import { noteModel, NoteModel } from '../models/note';
import User, { IUser } from '../models/user';
import { IExistingUserRequest } from '../middleware/user/validateUserSchema';
import jwt from 'jsonwebtoken';
import { StatusCodes } from '../helper/constants';
import config from '../../config';
import { string } from 'joi';

const JWT_SECRET = config.JWT_SECRET;

function generateToken(id: string) {
  return jwt.sign({ userId: id }, JWT_SECRET);
}

export class UserController {
  async userSignUp(
    req: Request | IExistingUserRequest | any,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { existingUser } = req;

      console.log(existingUser);

      const { username, password, email, phoneNumber } = req.body;

      /* Check if the username already exists in the database */

      if (existingUser) {
        throw new Error('You already have an account');
      }

      /* Create a new user */
      const newUser: IUser = new User({ username, password, email });

      await newUser.save();

      /* Create a JWT token and send it in the response */
      const token: string = generateToken(newUser._id);

      console.log(token);

      res
        .status(StatusCodes.OK)
        .send(response({ token }, 'New User Added Successfully!', true));
    } catch (error) {
      next(error);
    }
  }

  async userSignIn(req: Response | any, res: Response, next: NextFunction) {
    try {
      const { existingUser } = req;

      if (!existingUser) {
        throw new Error(`You don't have an account! Please Create One.`);
      }

      console.log(existingUser._id);

      const token: string = generateToken(existingUser._id);

      res
        .status(StatusCodes.OK)
        .send(response({ token }, 'Welcome Back To Nowted 👋🏻😄!', true));
    } catch (error) {
      next(error);
    }
  }

  async addNewNote(req: Request, res: Response, next: NextFunction) {
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
  }

  async getAllNotes(req: Request, res: Response, next: NextFunction) {
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
  }

  async editNote(req: Request, res: Response, next: NextFunction) {
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
  }
  async deleteNote(req: Request, res: Response, next: NextFunction) {
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
          .send(
            response(result, 'Note has been Deleted Successfuly 🗑️!', true)
          );
      } else {
        throw new Error("Couldn't Delete The Note 🙁!");
      }
    } catch (error: any) {
      next(error);
    }
  }
}
