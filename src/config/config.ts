import dotenv from "dotenv";
import { Audience } from "../enum";
import { ConfigHandler } from "./ConfigHandler";
import { MongoConnectionType } from "@lindorm-io/mongo";
import { developmentConfig, environmentConfig, productionConfig, stagingConfig, testConfig } from "./files";

dotenv.config();

const handler = new ConfigHandler({
  productionConfig,
  stagingConfig,
  developmentConfig,
  environmentConfig,
  testConfig,
});

const config = handler.get(process.env.NODE_ENV);

export const NODE_ENVIRONMENT = config.NODE_ENVIRONMENT;
export const SERVER_PORT = config.SERVER_PORT;

export const BASIC_AUTH_MW_OPTIONS = {
  username: config.BASIC_AUTH_USERNAME,
  password: config.BASIC_AUTH_PASSWORD,
};

export const TOKEN_ISSUER_MW_OPTIONS = {
  issuer: config.JWT_ISSUER,
};

export const BEARER_TOKEN_MW_OPTIONS = {
  audience: Audience.ACCESS,
  issuer: config.JWT_ISSUER,
};

export const WEB_KEY_MW_OPTIONS = {
  host: config.WEB_KEY_HOST,
  path: config.WEB_KEY_PATH,
};

export const MONGO_CONNECTION_OPTIONS = {
  type: MongoConnectionType.STORAGE,
  auth: {
    user: config.MONGO_INITDB_ROOT_USERNAME,
    password: config.MONGO_INITDB_ROOT_PASSWORD,
  },
  url: {
    host: config.MONGO_HOST,
    port: config.MONGO_EXPOSE_PORT,
  },
  databaseName: config.MONGO_DB_NAME,
};
