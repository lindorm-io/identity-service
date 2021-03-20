import { IConfigurationData } from "../ConfigHandler";

export const stagingConfig: IConfigurationData = {
  NODE_ENVIRONMENT: process.env.NODE_ENV,
  SERVER_PORT: 3000,
  HOST: "https://staging.identity.lindorm.io",

  BASIC_AUTH_USERNAME: null,
  BASIC_AUTH_PASSWORD: null,

  JWT_ISSUER: "https://staging.authentication.lindorm.io",

  WEB_KEY_HOST: "https://staging.authentication.lindorm.io",

  MONGO_INITDB_ROOT_USERNAME: null,
  MONGO_INITDB_ROOT_PASSWORD: null,
  MONGO_HOST: null,
  MONGO_EXPOSE_PORT: 27017,
  MONGO_DB_NAME: "identity",
};
