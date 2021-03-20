import { IIndex } from "@lindorm-io/mongo";

export const indices: Array<IIndex> = [
  {
    index: { id: 1 },
    options: { unique: true },
  },
  {
    index: { displayName: 1 },
    options: {
      partialFilterExpression: {
        displayName: {
          $exists: true,
          $gt: "0",
          $type: "string",
        },
      },
      unique: true,
    },
  },
  {
    index: { username: 1 },
    options: {
      partialFilterExpression: {
        username: {
          $exists: true,
          $gt: "0",
          $type: "string",
        },
      },
      unique: true,
    },
  },
];
