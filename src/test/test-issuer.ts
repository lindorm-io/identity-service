import { Identity } from "../entity";
import { Keystore } from "@lindorm-io/key-pair";
import { Scope } from "../enum";
import { TokenIssuer } from "@lindorm-io/jwt";
import { config } from "../config";
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
    permission: "user",
    scope: scope,
    subject: identity.id,
  });
  return token;
};
