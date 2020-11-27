import { IKoaIdentityContext } from "../typing";
import { TPromise } from "@lindorm-io/core";
import { DisplayNameRepository, IdentityRepository } from "../infrastructure";

export const repositoryMiddleware = async (ctx: IKoaIdentityContext, next: TPromise<void>): Promise<void> => {
  const start = Date.now();

  const { logger, mongo } = ctx;
  const db = await mongo.getDatabase();

  ctx.repository = {
    displayName: new DisplayNameRepository({ db, logger }),
    identity: new IdentityRepository({ db, logger }),
  };

  logger.debug("repositories connected");

  ctx.metrics = {
    ...(ctx.metrics || {}),
    repository: Date.now() - start,
  };

  await next();
};
