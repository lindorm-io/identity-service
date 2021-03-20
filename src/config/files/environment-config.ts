import dotenv from "dotenv";
import { IConfigurationData } from "../ConfigHandler";

dotenv.config();

export const environmentConfig: IConfigurationData = {
  NODE_ENVIRONMENT: process.env.NODE_ENV,
  SERVER_PORT: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT, 10) : null,
  HOST: process.env.HOST,

  BASIC_AUTH_USERNAME: process.env.BASIC_AUTH_USERNAME,
  BASIC_AUTH_PASSWORD: process.env.BASIC_AUTH_PASSWORD,

  JWT_ISSUER: process.env.JWT_ISSUER,

  WEB_KEY_HOST: process.env.WEB_KEY_HOST,
  WEB_KEY_PATH: process.env.WEB_KEY_PATH,

  MONGO_INITDB_ROOT_USERNAME: process.env.MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD: process.env.MONGO_INITDB_ROOT_PASSWORD,
  MONGO_HOST: process.env.MONGO_HOST,
  MONGO_EXPOSE_PORT: process.env.MONGO_EXPOSE_PORT ? parseInt(process.env.MONGO_EXPOSE_PORT, 10) : null,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME,
};
