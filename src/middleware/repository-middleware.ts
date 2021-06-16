import { DisplayNameRepository, IdentityRepository } from "../infrastructure";
import { repositoryMiddleware } from "@lindorm-io/koa-mongo";

export const displayNameRepositoryMiddleware = repositoryMiddleware(DisplayNameRepository);

export const identityRepositoryMiddleware = repositoryMiddleware(IdentityRepository);
