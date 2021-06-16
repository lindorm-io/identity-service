import { DisplayName, Identity } from "../entity";
import { DisplayNameRepository, IdentityRepository } from "../infrastructure";
import { IssuerVerifyData, TokenIssuer } from "@lindorm-io/jwt";
import { KeyPair, Keystore } from "@lindorm-io/key-pair";
import { KeyPairCache } from "@lindorm-io/koa-keystore";
import { KoaContext } from "@lindorm-io/koa";
import { MongoConnection } from "@lindorm-io/mongo";
import { RedisConnection } from "@lindorm-io/redis";

export interface IdentityContext<Body = Record<string, any>> extends KoaContext<Body> {
  cache: {
    keyPairCache: KeyPairCache;
  };
  client: {
    mongo: MongoConnection;
    redis: RedisConnection;
  };
  entity: {
    displayName: DisplayName;
    identity: Identity;
  };
  jwt: TokenIssuer;
  keys: Array<KeyPair>;
  keystore: Keystore;
  repository: {
    displayNameRepository: DisplayNameRepository;
    identityRepository: IdentityRepository;
  };
  token: {
    bearerToken: IssuerVerifyData<unknown>;
  };
}
