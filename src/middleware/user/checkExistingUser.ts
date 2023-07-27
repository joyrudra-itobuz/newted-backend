import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../../models/user';
import { IExistingUserRequest } from '../../middleware/user/validateUserSchema';

export const checkExistingUser: any = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;

    /* Check if the username already exists in the database */
    const existingUser: IUser | null = await User.findOne({ username });

    req.existingUser = existingUser;
    next();
  } catch (err: any) {
    next(err);
  }
};
