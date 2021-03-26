import { Audience } from "../../enum";
import { Permission, Scope } from "@lindorm-io/jwt";
import { TEST_TOKEN_ISSUER } from "./setup-integration";
import { Identity } from "../../entity";

export const generateAccessToken = (identity: Identity, scope: Array<Scope>): string => {
  const { token } = TEST_TOKEN_ISSUER.sign({
    audience: Audience.ACCESS,
    expiry: "2 minutes",
    permission: Permission.ADMIN,
    scope: scope,
    subject: identity.id,
  });
  return token;
};
