import { RequestHandler } from 'express';
import { userSchema } from '../../validators/userSchema';
import { response } from '../../module/responseObject';
import { StatusCodes } from 'http-status-codes';

export const validateUserSchema: RequestHandler = (req, res, next) => {
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
