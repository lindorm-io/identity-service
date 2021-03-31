import MockDate from "mockdate";
import request from "supertest";
import { Audience } from "../../enum";
import { Identity } from "../../entity";
import { Permission, Scope } from "@lindorm-io/jwt";
import { koa } from "../../server/koa";
import {
  generateAccessToken,
  getTestIdentity,
  inMemoryStore,
  resetStore,
  setupIntegration,
  TEST_IDENTITY_REPOSITORY,
  TEST_AUTH_TOKEN_ISSUER,
} from "../grey-box";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "e3926ddb-ecaf-4f66-855a-d143af54953c"),
}));

MockDate.set("2020-01-01 08:00:00.000");

describe("/open-id", () => {
  let accessToken: string;
  let identity: Identity;

  beforeAll(async () => {
    await setupIntegration();
    koa.load();
  });

  beforeEach(async () => {
    identity = await TEST_IDENTITY_REPOSITORY.create(getTestIdentity());
    accessToken = generateAccessToken(identity, [
      Scope.DEFAULT,
      Scope.OPENID,
      Scope.ADDRESS,
      Scope.BIRTH_DATE,
      Scope.PROFILE,
      Scope.ZONE_INFO,
    ]);
  });

  afterEach(resetStore);

  test("GET /open-id - should return identity information", async () => {
    const response = await request(koa.callback())
      .get(`/open-id`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .expect(200);

    expect(response.body).toMatchSnapshot();
    expect(inMemoryStore).toMatchSnapshot();
  });

  test("GET /open-id/:id - should return identity information for a specific identity", async () => {
    const response = await request(koa.callback())
      .get(`/open-id/${identity.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .expect(200);

    expect(response.body).toMatchSnapshot();
    expect(inMemoryStore).toMatchSnapshot();
  });

  test("GET /open-id/:id - should throw error on wrong scope", async () => {
    ({ token: accessToken } = TEST_AUTH_TOKEN_ISSUER.sign({
      audience: Audience.ACCESS,
      expiry: "2 minutes",
      permission: Permission.ADMIN,
      scope: ["wrong"],
      subject: identity.id,
    }));

    const response = await request(koa.callback())
      .get(`/open-id/${identity.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .expect(409);

    expect(response.body).toMatchSnapshot();
  });
});
