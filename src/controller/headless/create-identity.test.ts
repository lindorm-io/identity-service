import { headlessCreateIdentity } from "./create-identity";
import { logger } from "../../test";

describe("headlessCreateIdentity", () => {
  let ctx: any;

  beforeEach(() => {
    ctx = {
      logger,
      repository: {
        identityRepository: {
          findOrCreate: async (): Promise<void> => undefined,
        },
      },
      request: {
        body: { identityId: "identityId" },
      },
    };
  });

  test("should findOrCreate entity", async () => {
    await expect(headlessCreateIdentity(ctx)).resolves.toStrictEqual({
      body: {},
      status: 201,
    });
  });
});
