import MockDate from "mockdate";
import { getTestIdentity, getTestRepository, resetStore } from "../../../test";
import { getOpenIdInformation } from "./get-open-id-information";
import { winston } from "../../../logger";
import { Identity } from "../../../entity";
import { Scope } from "@lindorm-io/jwt";

jest.mock("../../../support", () => ({
  assertAccountPermission: jest.fn(() => () => undefined),
  getDisplayNameString: jest.fn(() => "display-name-string"),
  getOpenIdClaims: jest.fn(() => ({
    openId: "mock-open-id-data",
  })),
}));

MockDate.set("2020-01-01 08:00:00.000");

describe("getOpenIdInformation", () => {
  let identity: Identity;
  let options: any;
  let ctx: any;

  beforeEach(async () => {
    ctx = {
      logger: winston,
      repository: await getTestRepository(),
      token: { bearer: { scope: [Scope.DEFAULT, Scope.OPENID, Scope.EMAIL, Scope.PROFILE] } },
    };

    identity = await ctx.repository.identity.create(getTestIdentity());

    options = {
      identityId: identity.id,
    };
  });

  afterEach(resetStore);

  test("should return identity information", async () => {
    await expect(getOpenIdInformation(ctx)(options)).resolves.toMatchSnapshot();
  });
});
