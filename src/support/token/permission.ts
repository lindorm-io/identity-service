import { IKoaIdentityContext } from "../../typing";
import { InvalidPermissionError } from "../../error";
import { isAdmin, isScope, Scope } from "@lindorm-io/jwt";

export const assertAccountPermission = (ctx: IKoaIdentityContext) => async (identityId: string): Promise<void> => {
  const {
    token: {
      bearer: { permission, scope, subject },
    },
  } = ctx;

  if (isAdmin(permission)) {
    return;
  }

  if (subject !== identityId) {
    throw new InvalidPermissionError();
  }

  if (!isScope(scope, Scope.DEFAULT)) {
    throw new InvalidPermissionError();
  }
};
