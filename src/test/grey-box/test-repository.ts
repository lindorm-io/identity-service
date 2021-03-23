import { DisplayNameRepository, IdentityRepository } from "../../infrastructure";
import { winston } from "../../logger";
import { getTestMongo } from "./test-mongo";

export interface IGetGreyBoxRepository {
  displayName: DisplayNameRepository;
  identity: IdentityRepository;
}

export const getTestRepository = async (): Promise<IGetGreyBoxRepository> => {
  const mongo = await getTestMongo();

  const db = mongo.getDatabase();
  const logger = winston;

  return {
    displayName: new DisplayNameRepository({ db, logger }),
    identity: new IdentityRepository({ db, logger }),
  };
};
