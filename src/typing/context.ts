import { DisplayNameRepository, IdentityRepository } from "../infrastructure";
import { IKoaAppContext } from "@lindorm-io/koa";
import { ITokenIssuerVerifyData, TokenIssuer } from "@lindorm-io/jwt";
import { Keystore } from "@lindorm-io/key-pair";
import { MongoConnection } from "@lindorm-io/mongo";
import { KeyPairCache } from "@lindorm-io/koa-keystore";
import { RedisConnection } from "@lindorm-io/redis";

export interface IKoaIdentityContext extends IKoaAppContext {
  cache: {
    keyPair: {
      auth: KeyPairCache;
    };
  };
  issuer: {
    auth: TokenIssuer;
  };
  keystore: {
    auth: Keystore;
  };
  mongo: MongoConnection;
  redis: RedisConnection;
  repository: {
    displayName: DisplayNameRepository;
    identity: IdentityRepository;
  };
  token: {
    bearer: ITokenIssuerVerifyData;
  };
}
