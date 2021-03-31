import { Keystore } from "@lindorm-io/key-pair";
import { TokenIssuer } from "@lindorm-io/jwt";
import { config } from "../../config";
import { getTestKeyPairEC } from "./test-key-pair";
import { logger } from "./test-logger";

export const getTestAuthIssuer = (): TokenIssuer =>
  new TokenIssuer({
    issuer: config.AUTH_JWT_ISSUER,
    keystore: new Keystore({ keys: [getTestKeyPairEC()] }),
    // @ts-ignore
    logger,
  });
