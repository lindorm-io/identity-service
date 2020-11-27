import MockDate from "mockdate";
import request from "supertest";
import { Audience } from "../../enum";
import { Identity } from "../../entity";
import { Permission, Scope } from "@lindorm-io/jwt";
import { inMemoryStore, setupIntegration, TEST_IDENTITY, TEST_IDENTITY_REPOSITORY, TEST_ISSUER } from "../grey-box";
import { koa } from "../../server/koa";

jest.mock("uuid", () => ({
  v4: jest.fn(() => "e3926ddb-ecaf-4f66-855a-d143af54953c"),
}));

MockDate.set("2020-01-01 08:00:00.000");

describe("/identity", () => {
  let accessToken: string;

  beforeAll(async () => {
    await setupIntegration();
    koa.load();

    ({ token: accessToken } = TEST_ISSUER.sign({
      audience: Audience.ACCESS,
      expiry: "2 minutes",
      permission: Permission.ADMIN,
      scope: [Scope.DEFAULT, Scope.EDIT, Scope.OPENID].join(" "),
      subject: TEST_IDENTITY.id,
    }));
  });

  test("GET /:id - should return identity information", async () => {
    const response = await request(koa.callback())
      .get(`/identity/${TEST_IDENTITY.id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .expect(200);

    expect(response.body).toMatchSnapshot();
    expect(inMemoryStore).toMatchSnapshot();
  });

  test("PATCH /:id - should update", async () => {
    const id = "0d573da5-97d7-44b1-8aee-9951e177d0b2";
    await TEST_IDENTITY_REPOSITORY.create(new Identity({ id }));

    await request(koa.callback())
      .patch(`/identity/${id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .send({
        givenName: "new-givenName",
        middleName: "new-middleName",
      })
      .expect(204);

    await expect(TEST_IDENTITY_REPOSITORY.find({ id })).resolves.toMatchSnapshot();
  });

  test("DELETE /:id - should delete", async () => {
    const id = "91768368-7e70-4cee-a031-deb78e0faebc";
    await TEST_IDENTITY_REPOSITORY.create(new Identity({ id }));

    await request(koa.callback())
      .delete(`/identity/${id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .expect(202);

    await expect(TEST_IDENTITY_REPOSITORY.find({ id })).rejects.toMatchSnapshot();
  });

  test("PATCH /:id/address", async () => {
    const id = "c8909659-a490-4d6c-88d3-6a01712b7c64";
    await TEST_IDENTITY_REPOSITORY.create(new Identity({ id }));

    await request(koa.callback())
      .patch(`/identity/${id}/address`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .send({
        country: "country",
        locality: "locality",
        postalCode: "postalCode",
        region: "region",
        streetAddress: "streetAddress",
      })
      .expect(204);

    await expect(TEST_IDENTITY_REPOSITORY.find({ id })).resolves.toMatchSnapshot();
  });

  test("PATCH /:id/display-name", async () => {
    const id = "b2b2c123-efa5-442a-9ece-5fd81f8c64d9";
    await TEST_IDENTITY_REPOSITORY.create(new Identity({ id }));

    await request(koa.callback())
      .patch(`/identity/${id}/display-name`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .send({
        displayName: "displayName",
      })
      .expect(204);

    await expect(TEST_IDENTITY_REPOSITORY.find({ id })).resolves.toStrictEqual(
      expect.objectContaining({
        displayName: { name: "displayName", number: expect.any(Number) },
      }),
    );
  });

  test("PATCH /:id/username", async () => {
    const id = "9318e77b-10bf-413a-89be-ca36056b8723";
    await TEST_IDENTITY_REPOSITORY.create(new Identity({ id }));

    await request(koa.callback())
      .patch(`/identity/${id}/username`)
      .set("Authorization", `Bearer ${accessToken}`)
      .set("X-Client-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .set("X-Correlation-ID", "5c63ca22-6617-45eb-9005-7c897a25d375")
      .send({
        username: "new-username",
      })
      .expect(204);

    await expect(TEST_IDENTITY_REPOSITORY.find({ id })).resolves.toMatchSnapshot();
  });
});
