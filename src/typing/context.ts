import { DisplayNameRepository } from "../infrastructure/display-name";
import { IKoaAppContext } from "@lindorm-io/koa";
import { ITokenIssuerVerifyData, TokenIssuer } from "@lindorm-io/jwt";
import { IdentityRepository } from "../infrastructure/identity";
import { Keystore } from "@lindorm-io/key-pair";
import { MongoConnection } from "@lindorm-io/mongo";

export interface IKoaIdentityContext extends IKoaAppContext {
  issuer: {
    tokenIssuer: TokenIssuer;
  };
  keystore: Keystore;
  mongo: MongoConnection;
  repository: {
    displayName: DisplayNameRepository;
    identity: IdentityRepository;
  };
  token: {
    bearer: ITokenIssuerVerifyData;
  };
}
