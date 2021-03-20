import Joi from "@hapi/joi";
import { IKoaIdentityContext } from "../../../typing";
import { getDisplayNameString } from "../../../support";

export interface IGetPublicInformationOptions {
  identityId: string;
}

export interface IGetPublicInformationData {
  displayName: string;
  gravatar: string;
}

const schema = Joi.object({
  identityId: Joi.string().guid().required(),
});

export const getPublicInformation = (ctx: IKoaIdentityContext) => async (
  options: IGetPublicInformationOptions,
): Promise<IGetPublicInformationData> => {
  await schema.validateAsync(options);

  const { logger, repository } = ctx;
  const { identityId } = options;

  const identity = await repository.identity.find({ id: identityId });
  const displayName = getDisplayNameString(identity.displayName);

  logger.debug("requesting public information", {
    identityId,
    displayName,
    gravatar: identity.gravatar,
  });

  return {
    displayName,
    gravatar: identity.gravatar,
  };
};
