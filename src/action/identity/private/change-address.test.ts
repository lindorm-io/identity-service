import MockDate from "mockdate";
import { Identity } from "../../../entity";
import { changeAddress } from "./change-address";
import { getTestRepository, inMemoryStore, resetStore } from "../../../test";
import { Scope } from "@lindorm-io/jwt";
import { winston } from "../../../logger";

jest.mock("../../../support", () => ({
  assertAccountPermission: jest.fn(() => () => undefined),
}));

MockDate.set("2020-01-01 08:00:00.000");

describe("changeAddress", () => {
  let ctx: any;

  beforeEach(async () => {
    ctx = {
      logger: winston,
      repository: await getTestRepository(),
      token: { bearer: { scope: [Scope.DEFAULT, Scope.EDIT].join(" ") } },
    };

    await ctx.repository.identity.create(
      new Identity({
        id: "fd4e3548-1279-4065-9671-74c3bbea0c25",
      }),
    );
  });

  afterEach(resetStore);

  test("should change address", async () => {
    await expect(
      changeAddress(ctx)({
        identityId: "fd4e3548-1279-4065-9671-74c3bbea0c25",
        country: "country",
        locality: "locality",
        postalCode: "postalCode",
        region: "region",
        streetAddress: "streetAddress",
      }),
    ).resolves.toBe(undefined);

    expect(inMemoryStore).toMatchSnapshot();
  });
});
