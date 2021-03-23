import MockDate from "mockdate";
import { DisplayName } from "../../entity";
import { getTestRepository, inMemoryStore } from "../../test/grey-box";
import { removeDisplayNameNumber } from "./remove-display-name-number";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "be3a62d1-24a0-401c-96dd-3aff95356811"),
}));

MockDate.set("2020-01-01 08:00:00.000");

describe("removeDisplayNameNumber", () => {
  let ctx: any;

  beforeEach(async () => {
    ctx = {
      repository: await getTestRepository(),
    };

    await ctx.repository.displayName.create(new DisplayName({ name: "mockName", numbers: [1111, 2222, 3333, 4444] }));
  });

  test("should return a display name", async () => {
    await expect(removeDisplayNameNumber(ctx)({ name: "mockName", number: 1111 })).resolves.toBe(undefined);

    expect(inMemoryStore).toMatchSnapshot();
  });
});
