import { ConfigurationBase, ConfigurationOptions, DefaultConfiguration } from "@lindorm-io/koa-config";

export interface IConfigurationData extends DefaultConfiguration {
  SERVER_PORT: number;
  HOST: string;

  // Auth
  BASIC_AUTH_USERNAME: string;
  BASIC_AUTH_PASSWORD: string;

  // Auth Tokens
  AUTH_JWT_ISSUER: string;
  AUTH_WEB_KEY_HOST: string;

  // Infrastructure
  REDIS_PORT: number;

  MONGO_INITDB_ROOT_USERNAME: string;
  MONGO_INITDB_ROOT_PASSWORD: string;
  MONGO_HOST: string;
  MONGO_EXPOSE_PORT: number;
  MONGO_DB_NAME: string;
}

export class ConfigHandler extends ConfigurationBase<IConfigurationData> {
  public constructor(options: ConfigurationOptions<IConfigurationData>) {
    super(options);
  }
}
