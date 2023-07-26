import 'dotenv/config';
import { Secret } from 'jsonwebtoken';

interface IConfig {
  JWT_SECRET: Secret;
}

const config: IConfig = {
  JWT_SECRET: process.env.JWT_SECRET as Secret,
};

export default config;
