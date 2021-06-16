import { DisplayName, Identity } from "../entity";
import { DisplayNameRepository, IdentityRepository } from "../infrastructure";
import { IdentityContext } from "../typing";
import { Middleware } from "@lindorm-io/koa";
import { repositoryEntityMiddleware } from "@lindorm-io/koa-mongo";

export const displayNameEntityMiddleware = (path: string): Middleware<IdentityContext> =>
  repositoryEntityMiddleware(path, DisplayName, DisplayNameRepository);

export const identityEntityMiddleware = (path: string): Middleware<IdentityContext> =>
  repositoryEntityMiddleware(path, Identity, IdentityRepository);
