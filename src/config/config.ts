import dotenv from "dotenv";
import { Audience } from "../enum";
import { ConfigHandler } from "./ConfigHandler";
import { MongoConnectionType } from "@lindorm-io/mongo";
import { NodeEnvironment } from "@lindorm-io/koa-config";
import { developmentConfig, environmentConfig, productionConfig, stagingConfig, testConfig } from "./files";

if (!process.env.NODE_ENV) dotenv.config();

const handler = new ConfigHandler({
  productionConfig,
  stagingConfig,
  developmentConfig,
  environmentConfig,
  testConfig,
});

export const { NODE_ENVIRONMENT } = environmentConfig;
const config = handler.get(process.env.NODE_ENV);

export const SERVER_PORT = config.SERVER_PORT;
export const HOST = config.HOST;

export const IS_TEST = NODE_ENVIRONMENT === NodeEnvironment.TEST;

export const BASIC_AUTH_MW_OPTIONS = {
  clients: [{ username: config.BASIC_AUTH_USERNAME, password: config.BASIC_AUTH_PASSWORD }],
};

export const BEARER_AUTH_MW_OPTIONS = {
  audience: Audience.ACCESS,
  issuer: config.JWT_ISSUER,
};

export const TOKEN_ISSUER_MW_OPTIONS = {
  issuer: config.JWT_ISSUER,
};

export const WEB_KEY_MW_OPTIONS = {
  host: config.WEB_KEY_HOST,
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
