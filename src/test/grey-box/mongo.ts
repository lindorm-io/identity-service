import { DisplayNameRepository } from "../../infrastructure/display-name";
import { IdentityRepository } from "../../infrastructure/identity";
import { MONGO_CONNECTION_OPTIONS } from "../../config";
import { MongoConnection, MongoConnectionType } from "@lindorm-io/mongo";
import { inMemoryStore } from "./in-memory";
import { winston } from "../../logger";

export interface IGetGreyBoxRepository {
  displayName: DisplayNameRepository;
  identity: IdentityRepository;
}

export const getGreyBoxRepository = async (): Promise<IGetGreyBoxRepository> => {
  const mongo = new MongoConnection({
    ...MONGO_CONNECTION_OPTIONS,
    type: MongoConnectionType.MEMORY,
    inMemoryStore,
  });

  await mongo.connect();

  return {
    displayName: new DisplayNameRepository({
      db: mongo.getDatabase(),
      logger: winston,
    }),
    identity: new IdentityRepository({
      db: mongo.getDatabase(),
      logger: winston,
    }),
  };
};
