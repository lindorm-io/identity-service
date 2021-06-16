import { DisplayName } from "../entity";

export const getTestDisplayName = (): DisplayName =>
  new DisplayName({
    name: "displayName",
    numbers: [1234, 2345, 3456, 4567, 5678, 6789],
  });
