import MockDate from "mockdate";
import request from "supertest";
import { generateAccessToken, getTestIdentity, resetAll, setupIntegration, TEST_IDENTITY_REPOSITORY } from "../test";
import { koa } from "../server/koa";
import { Scope } from "@lindorm-io/jwt";

MockDate.set("2021-01-01T08:00:00.000Z");

describe("/identity", () => {
  beforeAll(setupIntegration);
  afterAll(resetAll);

  test("GET /", async () => {
    const identity = await TEST_IDENTITY_REPOSITORY.create(getTestIdentity());
    const accessToken = generateAccessToken(identity, [
      Scope.DEFAULT,
      Scope.EDIT,
      Scope.OPENID,
      Scope.FAMILY_NAME,
      Scope.GIVEN_NAME,
      Scope.MIDDLE_NAME,
    ]);

    const response = await request(koa.callback())
      .get("/identity")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body).toStrictEqual({
      display_name: "displayName#1234",
      family_name: "familyName",
      given_name: "givenName",
      gravatar: "https://gravatar.url/",
      middle_name: "middleName",
    });
  });

  test("PATCH /", async () => {
    const identity = await TEST_IDENTITY_REPOSITORY.create(getTestIdentity());
    const accessToken = generateAccessToken(identity, [
      Scope.DEFAULT,
      Scope.EDIT,
      Scope.OPENID,
      Scope.FAMILY_NAME,
      Scope.GIVEN_NAME,
      Scope.MIDDLE_NAME,
    ]);

    const response = await request(koa.callback())
      .patch("/identity")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        familyName: "new-familyName",
        givenName: "new-givenName",
        middleName: "new-middleName",
      })
      .expect(204);

    expect(response.body).toStrictEqual({});
  });
});
