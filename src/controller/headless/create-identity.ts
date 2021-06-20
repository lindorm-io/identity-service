import { Controller, ControllerResponse, HttpStatus } from "@lindorm-io/koa";
import { IdentityContext } from "../../typing";

interface RequestBody {
  identityId: string;
}

type ResponseBody = Record<string, never>;

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

  await identityRepository.findOrCreate({ id: identityId });

  return {
    body: {},
    status: HttpStatus.Success.CREATED,
  };
};
