import { IIdentityDisplayName } from "../../entity";
import { IKoaIdentityContext } from "../../typing";
import { findRandomNumber } from "./find-random-number";

export const getDisplayNameObject = (ctx: IKoaIdentityContext) => async (
  displayName: string,
): Promise<IIdentityDisplayName> => {
  const { repository } = ctx;

  const entity = await repository.displayName.findOrCreate({ name: displayName });
  const number = await findRandomNumber({ array: entity.numbers });

  entity.add(number);

  await repository.displayName.update(entity);

  return {
    name: displayName,
    number,
  };
};

export const getDisplayNameString = (displayName: IIdentityDisplayName): string => {
  if (!displayName?.name || !displayName?.number) return null;

  return `${displayName.name}#${displayName.number.toString().padStart(4, "0")}`;
};
