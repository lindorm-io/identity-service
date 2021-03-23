import { DisplayNameEvent } from "../enum";
import { EntityBase, EntityCreationError, IEntity, IEntityBaseOptions } from "@lindorm-io/entity";
import { includes } from "lodash";

export interface IDisplayName extends IEntity {
  name: string;
  numbers: Array<number>;
}

export interface IDisplayNameOptions extends IEntityBaseOptions {
  name: string;
  numbers?: Array<number>;
}

export class DisplayName extends EntityBase {
  private _name: string;
  private _numbers: Array<number>;

  constructor(options: IDisplayNameOptions) {
    super(options);
    this._name = options.name;
    this._numbers = options.numbers || [];
  }

  public get name(): string {
    return this._name;
  }

  public get numbers(): Array<number> {
    return this._numbers;
  }

  public add(number: number): void {
    if (includes(this._numbers, number)) {
      throw new Error("Number already exists for this DisplayName");
    }

    this._numbers.push(number);
    this.addEvent(DisplayNameEvent.NUMBER_ADDED, { number });
  }

  public remove(number: number): void {
    const array: Array<number> = [];

    for (const item of this._numbers) {
      if (item === number) continue;
      array.push(item);
    }

    this._numbers = array;
    this.addEvent(DisplayNameEvent.NUMBER_REMOVED, { number });
  }

  public create(): void {
    for (const evt of this._events) {
      if (evt.name !== DisplayNameEvent.CREATED) continue;
      throw new EntityCreationError("DisplayName");
    }

    this.addEvent(DisplayNameEvent.CREATED, {
      name: this._name,
      numbers: this._numbers,
    });
  }
}
