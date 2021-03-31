import { KoaApp } from "@lindorm-io/koa";
import { config, IS_TEST } from "../config";
import { headless, openId, privateRoute, publicRoute } from "../route";
import { winston } from "../logger";
import { authJwksCacheWorker } from "../worker";
import {
  authKeyPairCacheMiddleware,
  authKeystoreMiddleware,
  authTokenIssuerMiddleware,
  mongoMiddleware,
  redisMiddleware,
  repositoryMiddleware,
} from "../middleware";

export const koa = new KoaApp({
  logger: winston,
  port: config.SERVER_PORT,
});

// mongo
koa.addMiddleware(mongoMiddleware);
koa.addMiddleware(repositoryMiddleware);

// redis
koa.addMiddleware(redisMiddleware);
koa.addMiddleware(authKeyPairCacheMiddleware);

// auth tokens
koa.addMiddleware(authKeystoreMiddleware);
koa.addMiddleware(authTokenIssuerMiddleware);

// routes
koa.addRoute("/headless", headless);
koa.addRoute("/open-id", openId);
koa.addRoute("/private", privateRoute);
koa.addRoute("/public", publicRoute);

// workers
if (!IS_TEST) {
  koa.addWorker(authJwksCacheWorker);
}
