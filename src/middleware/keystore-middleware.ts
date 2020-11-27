import { NodeEnvironment, TPromise } from "@lindorm-io/core";
import { WEB_KEY_MW_OPTIONS, NODE_ENVIRONMENT } from "../config";
import { inMemoryKeys } from "../test";
import { IWebKeyMiddlewareOptions, webKeyMiddleware } from "@lindorm-io/koa-jwt";
import { winston } from "../logger";

export const getWebKeyMiddleware = (): TPromise<void> => {
  const isTest = NODE_ENVIRONMENT === NodeEnvironment.TEST;
  const options: IWebKeyMiddlewareOptions = {
    ...WEB_KEY_MW_OPTIONS,
    logger: winston,
  };

  return webKeyMiddleware({
    ...options,
    inMemoryKeys: isTest ? inMemoryKeys : [],
  });
};
