import { tokenIssuerMiddleware as _tokenIssuerMiddleware } from "@lindorm-io/koa-jwt";
import { config } from "../config";

export const tokenIssuerMiddleware = _tokenIssuerMiddleware({
  issuer: config.AUTH_JWT_ISSUER,
});
