import { isString } from "lodash";
import { IdentityDisplayName } from "../entity";

export const getDisplayName = (displayName: IdentityDisplayName): string =>
  isString(displayName.name) ? `${displayName.name}#${displayName.number.toString().padStart(4, "0")}` : null;
