import { DisplayNameRepository, IdentityRepository } from "../infrastructure";
import { winston } from "../logger";
import { getTestMongo } from "./test-mongo";

export const getTestRepository = async (): Promise<{
  displayNameRepository: DisplayNameRepository;
  identityRepository: IdentityRepository;
}> => {
  const mongo = await getTestMongo();

  const db = mongo.database();
  const logger = winston;

  return {
    displayNameRepository: new DisplayNameRepository({ db, logger }),
    identityRepository: new IdentityRepository({ db, logger }),
  };
};
