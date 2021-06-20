import MockDate from "mockdate";
import request from "supertest";
import { baseHash } from "@lindorm-io/core";
import { koa } from "../server/koa";
import {
  getTestDisplayName,
  getTestIdentity,
  resetAll,
  setupIntegration,
  TEST_DISPLAY_NAME_REPOSITORY,
  TEST_IDENTITY_REPOSITORY,
} from "../test";

MockDate.set("2021-01-01T08:00:00.000Z");

const basicAuth = baseHash("secret:secret");

describe("/headless", () => {
  beforeAll(setupIntegration);
  afterAll(resetAll);

  test("POST /identity", async () => {
    const response = await request(koa.callback())
      .post("/headless/identity")
      .set("Authorization", `Basic ${basicAuth}`)
      .send({
        identityId: "ac217067-ca5d-42ca-a836-5d2eb5b18b69",
      })
      .expect(201);

    expect(response.body).toStrictEqual({});
  });

  test("GET /identity/:id", async () => {
    const identity = await TEST_IDENTITY_REPOSITORY.create(getTestIdentity());

    const response = await request(koa.callback())
      .get(`/headless/identity/${identity.id}`)
      .set("Authorization", `Basic ${basicAuth}`)
      .expect(200);

    expect(response.body).toStrictEqual({
      address: {
        country: "country",
        locality: "locality",
        postal_code: "postalCode",
        region: "region",
        street_address: "streetAddress",
      },
      birth_date: "2000-01-01",
      created: "2021-01-01T08:00:00.000Z",
      display_name: "displayName#1234",
      family_name: "familyName",
      gender: "gender",
      given_name: "givenName",
      gravatar: "https://gravatar.url/",
      locale: "sv-SE",
      middle_name: "middleName",
      nickname: "nickname",
      phone_number: "+46700000000",
      phone_number_verified: false,
      picture: "https://picture.url/",
      preferred_username: "preferredUsername",
      profile: "https://profile.url/",
      updated: "2021-01-01T08:00:00.000Z",
      website: "https://website.url/",
      zone_info: "Europe/Stockholm",
    });
  });

  test("DELETE /identity/:id", async () => {
    const identity = await TEST_IDENTITY_REPOSITORY.create(getTestIdentity());
    await TEST_DISPLAY_NAME_REPOSITORY.create(getTestDisplayName());

    const response = await request(koa.callback())
      .delete(`/headless/identity/${identity.id}`)
      .set("Authorization", `Basic ${basicAuth}`)
      .expect(204);

    expect(response.body).toStrictEqual({});
  });
});
