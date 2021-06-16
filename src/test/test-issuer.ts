import { Permission, Scope, TokenIssuer } from "@lindorm-io/jwt";
import { Identity } from "../entity";
import { config } from "../config";
import { Keystore } from "@lindorm-io/key-pair";
import { getTestKeyPairEC } from "./test-key-pair";
import { logger } from "./test-logger";

export const generateAccessToken = (identity: Identity, scope: Array<Scope>): string => {
  const issuer = new TokenIssuer({
    issuer: config.AUTH_JWT_ISSUER,
    keystore: new Keystore({ keys: [getTestKeyPairEC()] }),
    logger,
  });

  const { token } = issuer.sign({
    audience: "access",
    expiry: "2 minutes",
    permission: Permission.ADMIN,
    scope: scope,
    subject: identity.id,
  });
  return token;
};
