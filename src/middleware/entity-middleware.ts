import { DisplayName, Identity } from "../entity";
import { DisplayNameRepository, IdentityRepository } from "../infrastructure";
import { repositoryEntityMiddleware } from "@lindorm-io/koa-mongo";

export const displayNameEntityMiddleware = repositoryEntityMiddleware(DisplayName, DisplayNameRepository);

export const identityEntityMiddleware = repositoryEntityMiddleware(Identity, IdentityRepository);
