import MockDate from "mockdate";
import request from "supertest";
import { koa } from "../../server/koa";
import { inMemoryStore, setupIntegration, TEST_IDENTITY } from "../grey-box";
import { baseHash } from "@lindorm-io/core";
import { Scope } from "@lindorm-io/jwt";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "e3926ddb-ecaf-4f66-855a-d143af54953c"),
}));

MockDate.set("2020-01-01 08:00:00.000");

const basicAuth = baseHash("basic_auth_username:basic_auth_password");

describe("/headless", () => {
  beforeAll(async () => {
    await setupIntegration();
    koa.load();
  });

  test("GET /:id - should return identity information", async () => {
    const response = await request(koa.callback())
      .get(`/headless/${TEST_IDENTITY.id}`)
      .set("Authorization", `Basic ${basicAuth}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set(
        "X-Open-ID-Scope",
        [Scope.DEFAULT, Scope.OPENID, Scope.GIVEN_NAME, Scope.MIDDLE_NAME, Scope.FAMILY_NAME].join(" "),
      )
      .expect(200);

    expect(response.body).toMatchSnapshot();
    expect(inMemoryStore).toMatchSnapshot();
  });

  test("POST /:id - should create", async () => {
    const response = await request(koa.callback())
      .post("/headless/0f9c57ad-e382-4a8b-b926-093c3a40f3f3")
      .set("Authorization", `Basic ${basicAuth}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .expect(201);

    expect(response.body).toMatchSnapshot();
    expect(inMemoryStore).toMatchSnapshot();
  });

  test("POST /:id - should find", async () => {
    const response = await request(koa.callback())
      .post(`/headless/${TEST_IDENTITY.id}`)
      .set("Authorization", `Basic ${basicAuth}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .expect(201);

    expect(response.body).toMatchSnapshot();
    expect(inMemoryStore).toMatchSnapshot();
  });
});
