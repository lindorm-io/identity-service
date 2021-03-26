import MockDate from "mockdate";
import { Identity } from "../../entity";
import { ensureIdentityExists } from "./ensure-identity-exists";
import { getTestRepository, inMemoryStore, resetStore } from "../../test";
import { Scope } from "@lindorm-io/jwt";
import { winston } from "../../logger";

MockDate.set("2020-01-01 08:00:00.000");

describe("ensureIdentityExists", () => {
  let ctx: any;

  beforeEach(async () => {
    ctx = {
      logger: winston,
      repository: await getTestRepository(),
      token: { bearer: { scope: [Scope.DEFAULT, Scope.EDIT] } },
    };
  });

  afterEach(resetStore);

  test("should create an identity and return dates", async () => {
    const options = {
      identityId: "f9262c5b-9c8f-4e6d-8b99-55a43a3c5947",
    };

    await expect(ensureIdentityExists(ctx)(options)).resolves.toMatchSnapshot();

    expect(inMemoryStore).toMatchSnapshot();
  });

  test("should find an identity and return dates", async () => {
    const options = {
      identityId: "81961dc3-1c77-4613-b6e1-0960a6fa3293",
    };

    await ctx.repository.identity.create(
      new Identity({
        id: "81961dc3-1c77-4613-b6e1-0960a6fa3293",
        givenName: "exists",
      }),
    );

    await expect(ensureIdentityExists(ctx)(options)).resolves.toMatchSnapshot();

    expect(inMemoryStore).toMatchSnapshot();
  });
});
