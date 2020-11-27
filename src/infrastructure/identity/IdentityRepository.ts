import { IIdentity, Identity } from "../../entity";
import { IRepository, IRepositoryOptions, RepositoryBase } from "@lindorm-io/mongo";
import { MongoCollection } from "../../enum";
import { indices } from "./indices";
import { schema } from "./schema";

export interface IIdentityFilter {
  id?: string;
  displayName?: string;
  username?: string;
}

export interface IIdentityRepository extends IRepository<Identity> {
  create(entity: Identity): Promise<Identity>;
  update(entity: Identity): Promise<Identity>;
  find(filter: IIdentityFilter): Promise<Identity>;
  findMany(filter: IIdentityFilter): Promise<Array<Identity>>;
  findOrCreate(filter: IIdentityFilter): Promise<Identity>;
  remove(entity: Identity): Promise<void>;
}

export class IdentityRepository extends RepositoryBase<Identity> implements IIdentityRepository {
  constructor(options: IRepositoryOptions) {
    super({
      collectionName: MongoCollection.IDENTITY,
      db: options.db,
      logger: options.logger,
      indices,
      schema,
    });
  }

  protected createEntity(data: IIdentity): Identity {
    return new Identity(data);
  }

  protected getEntityJSON(entity: Identity): IIdentity {
    return {
      id: entity.id,
      version: entity.version,
      created: entity.created,
      updated: entity.updated,
      events: entity.events,

      address: entity.address,
      birthDate: entity.birthDate,
      displayName: entity.displayName,
      familyName: entity.familyName,
      gender: entity.gender,
      givenName: entity.givenName,
      gravatar: entity.gravatar,
      locale: entity.locale,
      middleName: entity.middleName,
      nickname: entity.nickname,
      phoneNumber: entity.phoneNumber,
      phoneNumberVerified: entity.phoneNumberVerified,
      picture: entity.picture,
      preferredUsername: entity.preferredUsername,
      profile: entity.profile,
      username: entity.username,
      website: entity.website,
      zoneInfo: entity.zoneInfo,
    };
  }

  public async create(entity: Identity): Promise<Identity> {
    return super.create(entity);
  }

  public async update(entity: Identity): Promise<Identity> {
    return super.update(entity);
  }

  public async find(filter: IIdentityFilter): Promise<Identity> {
    return super.find(filter);
  }

  public async findMany(filter: IIdentityFilter): Promise<Array<Identity>> {
    return super.findMany(filter);
  }

  public async findOrCreate(filter: IIdentityFilter): Promise<Identity> {
    return super.findOrCreate(filter);
  }

  public async remove(entity: Identity): Promise<void> {
    await super.remove(entity);
  }
}
