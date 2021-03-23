import MockDate from "mockdate";
import request from "supertest";
import { Identity } from "../../entity";
import { Scope } from "@lindorm-io/jwt";
import { koa } from "../../server/koa";
import {
  generateAccessToken,
  getTestIdentity,
  resetStore,
  setupIntegration,
  TEST_IDENTITY_REPOSITORY,
} from "../grey-box";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "e3926ddb-ecaf-4f66-855a-d143af54953c"),
}));
jest.mock("@lindorm-io/core", () => ({
  ...jest.requireActual("@lindorm-io/core"),
  getRandomNumber: () => "1234",
}));

MockDate.set("2020-01-01 08:00:00.000");

describe("/private", () => {
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
      Scope.EDIT,
      Scope.OPENID,
      Scope.ADDRESS,
      Scope.BIRTH_DATE,
      Scope.PROFILE,
      Scope.ZONE_INFO,
    ]);
  });

  afterEach(resetStore);

  test.only("PATCH /:id - should update", async () => {
    await request(koa.callback())
      .patch(`/private/${identity.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .send({
        givenName: "new-givenName",
        middleName: "new-middleName",
      })
      .expect(204);

    await expect(TEST_IDENTITY_REPOSITORY.find({ id: identity.id })).resolves.toMatchSnapshot();
  });

  test("DELETE /:id - should delete", async () => {
    await request(koa.callback())
      .delete(`/private/${identity.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .expect(202);

    await expect(TEST_IDENTITY_REPOSITORY.find({ id: identity.id })).rejects.toMatchSnapshot();
  });

  test("PATCH /:id/address", async () => {
    await request(koa.callback())
      .patch(`/private/${identity.id}/address`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .send({
        country: "new-country",
        locality: "new-locality",
        postalCode: "new-postalCode",
        region: "new-region",
        streetAddress: "new-streetAddress",
      })
      .expect(204);

    await expect(TEST_IDENTITY_REPOSITORY.find({ id: identity.id })).resolves.toMatchSnapshot();
  });

  test("PATCH /:id/display-name", async () => {
    await request(koa.callback())
      .patch(`/private/${identity.id}/display-name`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .send({
        displayName: "new-displayName",
      })
      .expect(204);

    await expect(TEST_IDENTITY_REPOSITORY.find({ id: identity.id })).resolves.toMatchSnapshot();
  });

  test("PATCH /:id/username", async () => {
    await request(koa.callback())
      .patch(`/private/${identity.id}/username`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .send({
        username: "new-username",
      })
      .expect(204);

    await expect(TEST_IDENTITY_REPOSITORY.find({ id: identity.id })).resolves.toMatchSnapshot();
  });
});
