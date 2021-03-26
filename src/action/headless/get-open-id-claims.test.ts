import MockDate from "mockdate";
import { Identity } from "../../entity";
import { getOpenIdClaims } from "./get-open-id-claims";
import { getTestIdentity, getTestRepository, inMemoryStore, resetStore } from "../../test";
import { Scope } from "@lindorm-io/jwt";
import { winston } from "../../logger";

jest.mock("../../support", () => ({
  getDisplayNameString: jest.fn(() => "display-name-string"),
  getOpenIdClaims: jest.fn(() => ({
    openId: "mock-open-id-data",
  })),
}));

MockDate.set("2020-01-01 08:00:00.000");

describe("getOpenIdClaims", () => {
  let identity: Identity;
  let options: any;
  let ctx: any;

  beforeEach(async () => {
    ctx = {
      logger: winston,
      repository: await getTestRepository(),
    };

    identity = await ctx.repository.identity.create(getTestIdentity());

    options = {
      identityId: identity.id,
      scope: [Scope.DEFAULT, Scope.OPENID, Scope.PREFERRED_USERNAME, Scope.EMAIL],
    };
  });

  afterEach(resetStore);

  test("should create an identity and return dates", async () => {
    await expect(getOpenIdClaims(ctx)(options)).resolves.toMatchSnapshot();

    expect(inMemoryStore).toMatchSnapshot();
  });
});
