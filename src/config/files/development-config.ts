import { IConfigurationData } from "../ConfigHandler";

export const developmentConfig: IConfigurationData = {
  NODE_ENVIRONMENT: process.env.NODE_ENV,
  SERVER_PORT: 3002,
  HOST: "http://localhost/",

  BASIC_AUTH_USERNAME: "username",
  BASIC_AUTH_PASSWORD: "password",

  JWT_ISSUER: "https://dev.lindorm.io/",

  WEB_KEY_HOST: "http://localhost:3001",
  WEB_KEY_PATH: "/.well-known/jwks.json",

  MONGO_INITDB_ROOT_USERNAME: "root",
  MONGO_INITDB_ROOT_PASSWORD: "example",
  MONGO_HOST: "localhost",
  MONGO_EXPOSE_PORT: 27017,
  MONGO_DB_NAME: "identity",
};
