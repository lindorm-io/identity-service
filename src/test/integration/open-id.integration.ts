import MockDate from "mockdate";
import request from "supertest";
import { Audience } from "../../enum";
import { Permission, Scope } from "@lindorm-io/jwt";
import { inMemoryStore, setupIntegration, TEST_IDENTITY, TEST_ISSUER } from "../grey-box";
import { koa } from "../../server/koa";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "e3926ddb-ecaf-4f66-855a-d143af54953c"),
}));

MockDate.set("2020-01-01 08:00:00.000");

describe("/open-id", () => {
  let accessToken: string;

  beforeAll(async () => {
    await setupIntegration();
    koa.load();

    ({ token: accessToken } = TEST_ISSUER.sign({
      audience: Audience.ACCESS,
      expiry: "2 minutes",
      permission: Permission.ADMIN,
      scope: [Scope.DEFAULT, Scope.OPENID, Scope.ADDRESS, Scope.BIRTH_DATE, Scope.PROFILE, Scope.ZONE_INFO].join(" "),
      subject: TEST_IDENTITY.id,
    }));
  });

  test("GET /open-id/:id - should return identity information", async () => {
    const response = await request(koa.callback())
      .get(`/open-id/${TEST_IDENTITY.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .expect(200);

    expect(response.body).toMatchSnapshot();
    expect(inMemoryStore).toMatchSnapshot();
  });

  test("GET /open-id/:id - should throw error on wrong scope", async () => {
    ({ token: accessToken } = TEST_ISSUER.sign({
      audience: Audience.ACCESS,
      expiry: "2 minutes",
      permission: Permission.ADMIN,
      scope: ["wrong"].join(" "),
      subject: TEST_IDENTITY.id,
    }));

    const response = await request(koa.callback())
      .get(`/open-id/${TEST_IDENTITY.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .expect(409);

    expect(response.body).toMatchSnapshot();
  });
});
