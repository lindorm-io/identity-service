import { keyPairCacheMiddleware } from "@lindorm-io/koa-keystore";
import { AUTH_KEYSTORE_NAME } from "../constant";

export const authKeyPairCacheMiddleware = keyPairCacheMiddleware({
  keystoreName: AUTH_KEYSTORE_NAME,
});
