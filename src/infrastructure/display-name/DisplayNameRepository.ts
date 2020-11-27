import { IDisplayName, DisplayName } from "../../entity";
import { IRepository, IRepositoryOptions, RepositoryBase } from "@lindorm-io/mongo";
import { MongoCollection } from "../../enum";
import { indices } from "./indices";
import { schema } from "./schema";

export interface IDisplayNameFilter {
  name?: string;
}

export interface IDisplayNameRepository extends IRepository<DisplayName> {
  create(entity: DisplayName): Promise<DisplayName>;
  update(entity: DisplayName): Promise<DisplayName>;
  find(filter: IDisplayNameFilter): Promise<DisplayName>;
  findMany(filter: IDisplayNameFilter): Promise<Array<DisplayName>>;
  findOrCreate(filter: IDisplayNameFilter): Promise<DisplayName>;
  remove(entity: DisplayName): Promise<void>;
}

export class DisplayNameRepository extends RepositoryBase<DisplayName> implements IDisplayNameRepository {
  constructor(options: IRepositoryOptions) {
    super({
      collectionName: MongoCollection.DISPLAY_NAME,
      db: options.db,
      logger: options.logger,
      indices,
      schema,
    });
  }

  protected createEntity(data: IDisplayName): DisplayName {
    return new DisplayName(data);
  }

  protected getEntityJSON(entity: DisplayName): IDisplayName {
    return {
      id: entity.id,
      version: entity.version,
      created: entity.created,
      updated: entity.updated,
      events: entity.events,

      name: entity.name,
      numbers: entity.numbers,
    };
  }

  public async create(entity: DisplayName): Promise<DisplayName> {
    return super.create(entity);
  }

  public async update(entity: DisplayName): Promise<DisplayName> {
    return super.update(entity);
  }

  public async find(filter: IDisplayNameFilter): Promise<DisplayName> {
    return super.find(filter);
  }

  public async findMany(filter: IDisplayNameFilter): Promise<Array<DisplayName>> {
    return super.findMany(filter);
  }

  public async findOrCreate(filter: IDisplayNameFilter): Promise<DisplayName> {
    return super.findOrCreate(filter);
  }

  public async remove(entity: DisplayName): Promise<void> {
    await super.remove(entity);
  }
}
