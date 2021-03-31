import { AUTH_KEYSTORE_NAME } from "../../constant";
import { KeyPairCache } from "@lindorm-io/koa-keystore";
import { getTestRedis } from "./test-redis";
import { winston } from "../../logger";

export interface IGetGreyBoxCache {
  keyPair: {
    auth: KeyPairCache;
  };
}

export const getTestCache = async (): Promise<IGetGreyBoxCache> => {
  const redis = await getTestRedis();

  const client = redis.getClient();
  const logger = winston;

  return {
    keyPair: {
      auth: new KeyPairCache({ client, logger, keystoreName: AUTH_KEYSTORE_NAME }),
    },
  };
};
