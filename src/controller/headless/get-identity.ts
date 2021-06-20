import Joi from "joi";
import { Controller, ControllerResponse, HttpStatus } from "@lindorm-io/koa";
import { IdentityClaims, IdentityContext } from "../../typing";
import { JOI_GUID } from "../../constant";
import { getDisplayName } from "../../util";

export const headlessGetIdentitySchema = Joi.object({
  id: JOI_GUID.required(),
});

export const headlessGetIdentity: Controller<IdentityContext<unknown>> = async (
  ctx,
): Promise<ControllerResponse<Partial<IdentityClaims>>> => {
  const {
    entity: { identity },
    logger,
  } = ctx;

  const { id, events, version, displayName, ...rest } = identity.toJSON();

  logger.info("identity data resolved", {
    displayName,
    ...rest,
  });

  return {
    body: {
      displayName: getDisplayName(displayName),
      ...rest,
    },
    status: HttpStatus.Success.OK,
  };
};
