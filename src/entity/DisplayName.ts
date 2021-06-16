import Joi from "joi";
import { DisplayNameEvent } from "../enum";
import { LindormError } from "@lindorm-io/errors";
import { includes, remove } from "lodash";
import {
  EntityAttributes,
  EntityCreationError,
  EntityOptions,
  JOI_ENTITY_BASE,
  LindormEntity,
} from "@lindorm-io/entity";

export interface DisplayNameAttributes extends EntityAttributes {
  name: string;
  numbers: Array<number>;
}

export interface DisplayNameOptions extends EntityOptions {
  name: string;
  numbers?: Array<number>;
}

const schema = Joi.object({
  ...JOI_ENTITY_BASE,

  name: Joi.string().required(),
  numbers: Joi.array().items(Joi.number()).required(),
});

export class DisplayName extends LindormEntity<DisplayNameAttributes> {
  public readonly name: string;
  public readonly numbers: Array<number>;

  public constructor(options: DisplayNameOptions) {
    super(options);

    this.name = options.name;
    this.numbers = options.numbers || [];
  }

  public add(number: number): void {
    if (includes(this.numbers, number)) {
      throw new LindormError("Number already exists for this DisplayName");
    }

    this.numbers.push(number);
    this.addEvent(DisplayNameEvent.NUMBER_ADDED, { number });
  }

  public remove(number: number): void {
    remove(this.numbers, number);

    this.addEvent(DisplayNameEvent.NUMBER_REMOVED, { number });
  }

  public exists(number: number): boolean {
    return includes(this.numbers, number);
  }

  public create(): void {
    for (const evt of this.events) {
      if (evt.name !== DisplayNameEvent.CREATED) continue;
      throw new EntityCreationError("DisplayName");
    }

    const { events, ...rest } = this.toJSON();
    this.addEvent(DisplayNameEvent.CREATED, rest);
  }

  public getKey(): string {
    return this.id;
  }

  public async schemaValidation(): Promise<void> {
    await schema.validateAsync(this.toJSON());
  }

  public toJSON(): DisplayNameAttributes {
    return {
      ...this.defaultJSON(),

      name: this.name,
      numbers: this.numbers,
    };
  }
}
