import { KoaApp } from "@lindorm-io/koa";
import { authJwksCacheWorker } from "../worker";
import { cacheKeysMiddleware, keystoreMiddleware } from "@lindorm-io/koa-keystore";
import { config, IS_TEST } from "../config";
import { headlessRoute, identityRoute } from "../route";
import { winston } from "../logger";
import {
  displayNameRepositoryMiddleware,
  identityRepositoryMiddleware,
  keyPairCacheMiddleware,
  mongoMiddleware,
  redisMiddleware,
  tokenIssuerMiddleware,
} from "../middleware";

export const koa = new KoaApp({
  logger: winston,
  port: config.SERVER_PORT,
});

// mongo
koa.addMiddleware(mongoMiddleware);
koa.addMiddleware(displayNameRepositoryMiddleware);
koa.addMiddleware(identityRepositoryMiddleware);

// redis
koa.addMiddleware(redisMiddleware);
koa.addMiddleware(keyPairCacheMiddleware);

// jwt
koa.addMiddleware(cacheKeysMiddleware);
koa.addMiddleware(keystoreMiddleware);
koa.addMiddleware(tokenIssuerMiddleware);

// routes
koa.addRoute("/headless", headlessRoute);
koa.addRoute("/identity", identityRoute);

// workers
if (!IS_TEST) {
  koa.addWorker(authJwksCacheWorker);
}
