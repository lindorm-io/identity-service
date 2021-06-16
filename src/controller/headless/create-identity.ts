import Joi from "joi";
import { Controller, ControllerResponse, HttpStatus } from "@lindorm-io/koa";
import { IdentityContext } from "../../typing";
import { JOI_GUID } from "../../constant";

interface RequestBody {
  identityId: string;
}

interface ResponseBody {
  created: Date;
  updated: Date;
}

export const headlessCreateIdentitySchema = Joi.object({
  identityId: JOI_GUID.required(),
});

export const headlessCreateIdentity: Controller<IdentityContext<RequestBody>> = async (
  ctx,
): Promise<ControllerResponse<ResponseBody>> => {
  const {
    logger,
    repository: { identityRepository },
    request: {
      body: { identityId },
    },
  } = ctx;

  logger.debug("create identity requested", {
    identityId,
  });

  const identity = await identityRepository.findOrCreate({ id: identityId });

  return {
    body: {
      created: identity.created,
      updated: identity.updated,
    },
    status: HttpStatus.Success.CREATED,
  };
};
