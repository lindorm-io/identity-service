import { cacheKeystoreMiddleware } from "@lindorm-io/koa-keystore";
import { AUTH_KEYSTORE_NAME } from "../constant";

export const authKeystoreMiddleware = cacheKeystoreMiddleware({
  keystoreName: AUTH_KEYSTORE_NAME,
});
