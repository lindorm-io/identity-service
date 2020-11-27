import { IKoaIdentityContext } from "../../typing";
import { IIdentityDisplayName } from "../../entity";

export const removeDisplayNameNumber = (ctx: IKoaIdentityContext) => async (
  options: IIdentityDisplayName,
): Promise<void> => {
  const { repository } = ctx;
  const { name, number } = options;

  const entity = await repository.displayName.find({ name });
  entity.remove(number);

  await repository.displayName.update(entity);
};
