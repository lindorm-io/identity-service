import { Algorithm, KeyPair, Keystore, KeyType } from "@lindorm-io/key-pair";
import { BEARER_TOKEN_MW_OPTIONS } from "../../config";
import { DisplayName, Identity } from "../../entity";
import { DisplayNameRepository, IdentityRepository } from "../../infrastructure";
import { TokenIssuer } from "@lindorm-io/jwt";
import { getGreyBoxRepository } from "./mongo";
import { inMemoryKeys } from "./in-memory";
import { winston } from "../../logger";

export let TEST_DISPLAY_NAME_REPOSITORY: DisplayNameRepository;
export let TEST_IDENTITY_REPOSITORY: IdentityRepository;

export let TEST_IDENTITY: Identity;
export let TEST_DISPLAY_NAME: DisplayName;

export let TEST_ISSUER: TokenIssuer;

export const setupIntegration = async (): Promise<void> => {
  const { displayName, identity } = await getGreyBoxRepository();

  TEST_DISPLAY_NAME_REPOSITORY = displayName;
  TEST_IDENTITY_REPOSITORY = identity;

  TEST_DISPLAY_NAME = new DisplayName({
    name: "displayName",
    numbers: [1234],
  });

  TEST_IDENTITY = new Identity({
    address: {
      country: "country",
      locality: "locality",
      postalCode: "postalCode",
      region: "region",
      streetAddress: "streetAddress",
    },
    birthDate: "2000-01-01",
    displayName: {
      name: "displayName",
      number: 1234,
    },
    familyName: "familyName",
    gender: "gender",
    givenName: "givenName",
    gravatar: "https://gravatar.url/",
    locale: "sv-SE",
    middleName: "middleName",
    nickname: "nickname",
    phoneNumber: "+46700000000",
    phoneNumberVerified: true,
    picture: "https://picture.url/",
    preferredUsername: "preferredUsername",
    profile: "https://profile.url/",
    username: "username",
    website: "https://website.url/",
    zoneInfo: "Europe/Stockholm",
  });

  await TEST_DISPLAY_NAME_REPOSITORY.create(TEST_DISPLAY_NAME);
  await TEST_IDENTITY_REPOSITORY.create(TEST_IDENTITY);

  inMemoryKeys.push(
    new KeyPair({
      algorithm: Algorithm.ES512,
      privateKey:
        "-----BEGIN PRIVATE KEY-----\n" +
        "MIHuAgEAMBAGByqGSM49AgEGBSuBBAAjBIHWMIHTAgEBBEIBGma7xGZpaAngFXf3\n" +
        "mJF3IxZfDpI+6wU564K+eehxX104v6dZetjSfMx0rvsYX/s6cO2P3GE7R95VxWEk\n" +
        "+f4EX0qhgYkDgYYABAB8cBfDwCi41G4kVW4V3Y86nIMMCypYzfO8gYjpS091lxkM\n" +
        "goTRS3LM1p65KQfwBolrWIdVrbbOILASf06fQsHw5gEt4snVuMBO+LS6pesX9vA8\n" +
        "QT1LjX75Xq2InnLY1VToeNmxkuM+oDZgqHOYwzfUhu+zZaA5AuEkqPi47TA9iCSY\n" +
        "VQ==\n" +
        "-----END PRIVATE KEY-----\n",
      publicKey:
        "-----BEGIN PUBLIC KEY-----\n" +
        "MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQAfHAXw8AouNRuJFVuFd2POpyDDAsq\n" +
        "WM3zvIGI6UtPdZcZDIKE0UtyzNaeuSkH8AaJa1iHVa22ziCwEn9On0LB8OYBLeLJ\n" +
        "1bjATvi0uqXrF/bwPEE9S41++V6tiJ5y2NVU6HjZsZLjPqA2YKhzmMM31Ibvs2Wg\n" +
        "OQLhJKj4uO0wPYgkmFU=\n" +
        "-----END PUBLIC KEY-----\n",
      type: KeyType.EC,
    }),
  );

  TEST_ISSUER = new TokenIssuer({
    issuer: BEARER_TOKEN_MW_OPTIONS.issuer,
    keystore: new Keystore({
      keys: inMemoryKeys,
    }),
    logger: winston,
  });
};
