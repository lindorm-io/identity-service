import { KeyPairCache } from "@lindorm-io/koa-keystore";
import { getTestRedis } from "./test-redis";
import { winston } from "../logger";

export const getTestCache = async (): Promise<{
  keyPairCache: KeyPairCache;
}> => {
  const redis = await getTestRedis();

  const client = redis.client();
  const logger = winston;

  return {
    keyPairCache: new KeyPairCache({ client, logger }),
  };
};
