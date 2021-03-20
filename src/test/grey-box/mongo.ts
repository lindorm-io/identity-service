import { DisplayNameRepository, IdentityRepository } from "../../infrastructure";
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

  const logger = winston;
  const db = mongo.getDatabase();

  return {
    displayName: new DisplayNameRepository({ db, logger }),
    identity: new IdentityRepository({ db, logger }),
  };
};
