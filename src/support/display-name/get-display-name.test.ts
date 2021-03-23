import MockDate from "mockdate";
import { getDisplayNameObject, getDisplayNameString } from "./get-display-name";
import { getTestRepository, inMemoryStore } from "../../test/grey-box";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "be3a62d1-24a0-401c-96dd-3aff95356811"),
}));
jest.mock("./find-random-number", () => ({
  findRandomNumber: jest.fn(() => 1),
}));

MockDate.set("2020-01-01 08:00:00.000");

describe("getDisplayName", () => {
  let ctx: any;

  beforeEach(async () => {
    ctx = {
      repository: await getTestRepository(),
    };
  });

  test("should return a display name object", async () => {
    await expect(getDisplayNameObject(ctx)("display-name")).resolves.toStrictEqual({ name: "display-name", number: 1 });

    expect(inMemoryStore).toMatchSnapshot();
  });

  test("should return a display name string", async () => {
    expect(getDisplayNameString({ name: "display-name", number: 1 })).toBe("display-name#0001");
  });
});
