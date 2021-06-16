import Joi from "joi";
import { Controller, ControllerResponse, HttpStatus } from "@lindorm-io/koa";
import { IdentityContext } from "../../typing";
import { JOI_GUID } from "../../constant";

type ResponseBody = Record<string, never>;

export const headlessRemoveIdentitySchema = Joi.object({
  id: JOI_GUID.required(),
});

export const headlessRemoveIdentity: Controller<IdentityContext<unknown>> = async (
  ctx,
): Promise<ControllerResponse<ResponseBody>> => {
  const {
    entity: { identity },
    logger,
    repository: { displayNameRepository, identityRepository },
  } = ctx;

  if (identity.displayName.name) {
    const displayName = await displayNameRepository.find({ name: identity.displayName.name });

    displayName.remove(identity.displayName.number);

    await displayNameRepository.update(displayName);
  }

  await identityRepository.remove(identity);

  logger.info("identity data resolved", {
    id: identity.id,
  });

  return {
    body: {},
    status: HttpStatus.Success.NO_CONTENT,
  };
};
