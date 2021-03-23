import { BEARER_AUTH_MW_OPTIONS } from "../../config";
import { DisplayNameRepository, IdentityRepository } from "../../infrastructure";
import { Keystore } from "@lindorm-io/key-pair";
import { TokenIssuer } from "@lindorm-io/jwt";
import { getTestKeyPairEC } from "./test-key-pair";
import { getTestRepository } from "./test-repository";
import { inMemoryKeys } from "./in-memory";
import { winston } from "../../logger";

export let TEST_DISPLAY_NAME_REPOSITORY: DisplayNameRepository;
export let TEST_IDENTITY_REPOSITORY: IdentityRepository;

export let TEST_TOKEN_ISSUER: TokenIssuer;

export const setupIntegration = async (): Promise<void> => {
  const { displayName, identity } = await getTestRepository();

  const keyPairEC = getTestKeyPairEC();

  TEST_DISPLAY_NAME_REPOSITORY = displayName;
  TEST_IDENTITY_REPOSITORY = identity;

  inMemoryKeys.push(keyPairEC);

  TEST_TOKEN_ISSUER = new TokenIssuer({
    issuer: BEARER_AUTH_MW_OPTIONS.issuer,
    keystore: new Keystore({ keys: inMemoryKeys }),
    logger: winston,
  });
};
