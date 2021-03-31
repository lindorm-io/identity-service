import { IConfigurationData } from "../ConfigHandler";

export const testConfig: IConfigurationData = {
  NODE_ENVIRONMENT: process.env.NODE_ENV,
  SERVER_PORT: 3000,
  HOST: "https://test.identity.lindorm.io",

  BASIC_AUTH_USERNAME: "secret",
  BASIC_AUTH_PASSWORD: "secret",

  AUTH_JWT_ISSUER: "https://test.authentication.lindorm.io",
  AUTH_WEB_KEY_HOST: "https://test.authentication.lindorm.io",

  REDIS_PORT: 6379,

  MONGO_INITDB_ROOT_USERNAME: "root",
  MONGO_INITDB_ROOT_PASSWORD: "example",
  MONGO_HOST: "localhost",
  MONGO_EXPOSE_PORT: 27017,
  MONGO_DB_NAME: "identity",
};
