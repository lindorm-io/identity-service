import MockDate from "mockdate";
import { Identity } from "../../../entity";
import { Scope } from "@lindorm-io/jwt";
import { changeDisplayName } from "./change-display-name";
import { getGreyBoxRepository, inMemoryStore, resetStore } from "../../../test";
import { removeDisplayNameNumber } from "../../../support";
import { winston } from "../../../logger";

jest.mock("../../../support", () => ({
  assertAccountPermission: jest.fn(() => () => undefined),
  getDisplayNameObject: jest.fn(() => (name: string) => ({
    name,
    number: 9999,
  })),
  removeDisplayNameNumber: jest.fn(() => () => undefined),
}));

MockDate.set("2020-01-01 08:00:00.000");

describe("changeDisplayName", () => {
  let ctx: any;

  beforeEach(async () => {
    ctx = {
      logger: winston,
      repository: await getGreyBoxRepository(),
      token: { bearer: { scope: [Scope.DEFAULT, Scope.EDIT].join(" ") } },
    };
  });

  afterEach(resetStore);

  test("should add new display name", async () => {
    await ctx.repository.identity.create(
      new Identity({
        id: "fd4e3548-1279-4065-9671-74c3bbea0c25",
      }),
    );

    const options = {
      identityId: "fd4e3548-1279-4065-9671-74c3bbea0c25",
      displayName: "newName",
    };

    await expect(changeDisplayName(ctx)(options)).resolves.toBe(undefined);

    expect(inMemoryStore).toMatchSnapshot();
    expect(removeDisplayNameNumber).not.toHaveBeenCalled();
  });

  test("should change existing display name", async () => {
    await ctx.repository.identity.create(
      new Identity({
        id: "fd4e3548-1279-4065-9671-74c3bbea0c25",
        displayName: {
          name: "displayName",
          number: 1111,
        },
      }),
    );

    const options = {
      identityId: "fd4e3548-1279-4065-9671-74c3bbea0c25",
      displayName: "newName",
    };

    await expect(changeDisplayName(ctx)(options)).resolves.toBe(undefined);

    expect(inMemoryStore).toMatchSnapshot();
    expect(removeDisplayNameNumber).toHaveBeenCalled();
  });
});
