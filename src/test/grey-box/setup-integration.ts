import { DisplayNameRepository, IdentityRepository } from "../../infrastructure";
import { KeyPairCache } from "@lindorm-io/koa-keystore";
import { TokenIssuer } from "@lindorm-io/jwt";
import { getTestAuthIssuer } from "./test-issuer";
import { getTestCache } from "./test-cache";
import { getTestKeyPairEC } from "./test-key-pair";
import { getTestRepository } from "./test-repository";

export let TEST_DISPLAY_NAME_REPOSITORY: DisplayNameRepository;
export let TEST_IDENTITY_REPOSITORY: IdentityRepository;

export let TEST_AUTH_KEY_PAIR_CACHE: KeyPairCache;

export let TEST_AUTH_TOKEN_ISSUER: TokenIssuer;

export const setupIntegration = async (): Promise<void> => {
  const { displayName, identity } = await getTestRepository();
  const {
    keyPair: { auth: authKeyPairCache },
  } = await getTestCache();

  const keyPairEC = getTestKeyPairEC();

  TEST_DISPLAY_NAME_REPOSITORY = displayName;
  TEST_IDENTITY_REPOSITORY = identity;

  TEST_AUTH_KEY_PAIR_CACHE = authKeyPairCache;

  TEST_AUTH_TOKEN_ISSUER = getTestAuthIssuer();

  await TEST_AUTH_KEY_PAIR_CACHE.create(keyPairEC);
};
