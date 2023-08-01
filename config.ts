import 'dotenv/config';
import { Secret } from 'jsonwebtoken';

interface IConfig {
  JWT_SECRET: Secret;
  expiresIn: string;
}

const config: IConfig = {
  JWT_SECRET: process.env.JWT_SECRET as Secret,
  expiresIn: process.env.EXPIRES_IN as string,
};

export default config;
