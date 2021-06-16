import { DisplayNameRepository, IdentityRepository } from "../infrastructure";
import { getTestCache } from "./test-cache";
import { getTestKeyPairEC } from "./test-key-pair";
import { getTestRepository } from "./test-repository";

export let TEST_DISPLAY_NAME_REPOSITORY: DisplayNameRepository;
export let TEST_IDENTITY_REPOSITORY: IdentityRepository;

export const setupIntegration = async (): Promise<void> => {
  const { displayNameRepository, identityRepository } = await getTestRepository();
  const { keyPairCache } = await getTestCache();

  const keyPairEC = getTestKeyPairEC();

  TEST_DISPLAY_NAME_REPOSITORY = displayNameRepository;
  TEST_IDENTITY_REPOSITORY = identityRepository;

  await keyPairCache.create(keyPairEC);
};
