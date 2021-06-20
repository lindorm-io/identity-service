import { Controller, ControllerResponse, HttpStatus } from "@lindorm-io/koa";
import { IdentityClaims, IdentityContext } from "../../typing";
import { getDisplayName } from "../../util";

export const headlessGetIdentity: Controller<IdentityContext<never>> = async (
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
