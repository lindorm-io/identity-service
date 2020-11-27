import { IConfigurationData } from "../ConfigHandler";

export const testConfig: IConfigurationData = {
  NODE_ENVIRONMENT: process.env.NODE_ENV,
  SERVER_PORT: 3001,
  HOST: "http://localhost/",

  BASIC_AUTH_USERNAME: "basic_auth_username",
  BASIC_AUTH_PASSWORD: "basic_auth_password",

  JWT_ISSUER: "https://test.lindorm.io/",

  WEB_KEY_HOST: "https://test.lindorm.io",
  WEB_KEY_PATH: "/.well-known/jwks",

  MONGO_INITDB_ROOT_USERNAME: "root",
  MONGO_INITDB_ROOT_PASSWORD: "password",
  MONGO_HOST: "localhost",
  MONGO_EXPOSE_PORT: 27017,
  MONGO_DB_NAME: "identity",
};
