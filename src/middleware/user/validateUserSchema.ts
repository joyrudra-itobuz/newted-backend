import { NextFunction, RequestHandler, Response, Request } from 'express';
import { userSchema } from '../../validators/userSchema';
import { StatusCodes } from 'http-status-codes';
import { response } from '../../module/responseObject';
import { IUser } from '../../models/user';

export interface IExistingUserRequest extends Request {
  existingUser: IUser | null;
}

export const validateUserSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send(
        response(null, `Improper Arguments ${error.details[0].message}`, false)
      );
  }

  next();
};
