import Joi from 'joi';
import { REG_EX } from '../helper/constants';

export const userSchema = Joi.object({
  username: Joi.string().pattern(REG_EX.usernameFormat).required(),
  password: Joi.string().required(),
  email: Joi.string().pattern(REG_EX.emailFormat).required(),
  phoneNumber: Joi.string().pattern(REG_EX.phoneNumberRegex).optional(),
});
