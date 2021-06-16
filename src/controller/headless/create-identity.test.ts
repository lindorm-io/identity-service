import { headlessCreateIdentity } from "./create-identity";
import { logger } from "../../test";

describe("headlessCreateIdentity", () => {
  let ctx: any;

  beforeEach(() => {
    ctx = {
      logger,
      repository: {
        identityRepository: {
          findOrCreate: async () => ({
            created: new Date("2020-01-01T08:00:00.000Z"),
            updated: new Date("2020-02-01T08:00:00.000Z"),
          }),
        },
      },
      request: {
        body: { identityId: "identityId" },
      },
    };
  });

  test("should findOrCreate entity", async () => {
    await expect(headlessCreateIdentity(ctx)).resolves.toStrictEqual({
      body: {
        created: new Date("2020-01-01T08:00:00.000Z"),
        updated: new Date("2020-02-01T08:00:00.000Z"),
      },
      status: 201,
    });
  });
});
