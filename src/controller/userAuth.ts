import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import { StatusCodes } from 'http-status-codes';
import { response } from '../module/responseObject';
import config from '../../config';

const JWT_SECRET = config.JWT_SECRET;

export const userSignUp: RequestHandler = async (req, res, next) => {
  try {
    const { username, password, email, phoneNumber } = req.body;

    /* Check if the username already exists in the database */
    const existingUser: IUser | null = await User.findOne({ username });

    if (existingUser) {
      throw new Error('You already have an account');
    }

    /* Create a new user */
    const newUser: IUser = new User({ username, password, email });

    await newUser.save();

    /* Create a JWT token and send it in the response */
    const token: string = jwt.sign({ userId: newUser._id }, JWT_SECRET);

    res
      .status(StatusCodes.OK)
      .send(response({ token }, 'New User Added Successfully!', true));
  } catch (error) {
    next(error);
  }
};
