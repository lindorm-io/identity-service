import MockDate from "mockdate";
import request from "supertest";
import { Audience } from "../../enum";
import { Identity } from "../../entity";
import { Permission, Scope } from "@lindorm-io/jwt";
import {
  getGreyBoxIdentity,
  inMemoryStore,
  setupIntegration,
  TEST_IDENTITY_REPOSITORY,
  TEST_ISSUER,
} from "../grey-box";
import { koa } from "../../server/koa";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "e3926ddb-ecaf-4f66-855a-d143af54953c"),
}));

MockDate.set("2020-01-01 08:00:00.000");

describe("/public", () => {
  let accessToken: string;
  let identity: Identity;

  beforeAll(async () => {
    await setupIntegration();
    koa.load();
  });

  beforeEach(async () => {
    identity = getGreyBoxIdentity();
    await TEST_IDENTITY_REPOSITORY.create(identity);

    ({ token: accessToken } = TEST_ISSUER.sign({
      audience: Audience.ACCESS,
      expiry: "2 minutes",
      permission: Permission.ADMIN,
      scope: [Scope.DEFAULT, Scope.OPENID, Scope.ADDRESS, Scope.BIRTH_DATE, Scope.PROFILE, Scope.ZONE_INFO].join(" "),
      subject: identity.id,
    }));
  });

  test("GET /:id - should return public identity information", async () => {
    const response = await request(koa.callback())
      .get(`/public/${identity.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .expect(200);

    expect(response.body).toMatchSnapshot();
    expect(inMemoryStore).toMatchSnapshot();
  });
});
