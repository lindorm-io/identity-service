import { DisplayName } from "../../entity";

export const getGreyBoxDisplayName = () =>
  new DisplayName({
    name: "displayName",
    numbers: [1234],
  });
