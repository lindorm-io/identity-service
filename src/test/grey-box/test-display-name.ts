import { DisplayName } from "../../entity";

export const getTestDisplayName = (): DisplayName =>
  new DisplayName({
    name: "displayName",
    numbers: [1234],
  });
