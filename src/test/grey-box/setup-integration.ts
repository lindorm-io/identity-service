import { BEARER_TOKEN_MW_OPTIONS } from "../../config";
import { DisplayNameRepository, IdentityRepository } from "../../infrastructure";
import { Keystore } from "@lindorm-io/key-pair";
import { TEST_KEY_PAIR_EC } from "./key-pair";
import { TokenIssuer } from "@lindorm-io/jwt";
import { getGreyBoxRepository } from "./mongo";
import { inMemoryKeys } from "./in-memory";
import { winston } from "../../logger";

export let TEST_DISPLAY_NAME_REPOSITORY: DisplayNameRepository;
export let TEST_IDENTITY_REPOSITORY: IdentityRepository;

export let TEST_ISSUER: TokenIssuer;

export const setupIntegration = async (): Promise<void> => {
  const { displayName, identity } = await getGreyBoxRepository();

  TEST_DISPLAY_NAME_REPOSITORY = displayName;
  TEST_IDENTITY_REPOSITORY = identity;

  inMemoryKeys.push(TEST_KEY_PAIR_EC);

  TEST_ISSUER = new TokenIssuer({
    issuer: BEARER_TOKEN_MW_OPTIONS.issuer,
    keystore: new Keystore({
      keys: inMemoryKeys,
    }),
    logger: winston,
  });
};
