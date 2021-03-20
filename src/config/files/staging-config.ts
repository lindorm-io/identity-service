import { IConfigurationData } from "../ConfigHandler";

export const stagingConfig: IConfigurationData = {
  NODE_ENVIRONMENT: process.env.NODE_ENV,
  SERVER_PORT: 3000,
  HOST: "https://staging.identity.lindorm.io/",

  BASIC_AUTH_USERNAME: null,
  BASIC_AUTH_PASSWORD: null,

  JWT_ISSUER: "https://staging.lindorm.io/",

  WEB_KEY_HOST: process.env.JWKS_HOST,
  WEB_KEY_PATH: process.env.JWKS_PATH,

  MONGO_INITDB_ROOT_USERNAME: "root",
  MONGO_INITDB_ROOT_PASSWORD: "password",
  MONGO_HOST: "localhost",
  MONGO_EXPOSE_PORT: 27017,
  MONGO_DB_NAME: "identity",
};
