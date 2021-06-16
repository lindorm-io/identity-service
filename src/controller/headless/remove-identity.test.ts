import { headlessRemoveIdentity } from "./remove-identity";
import { logger } from "../../test";

describe("identityRemove", () => {
  let ctx: any;
  let removeNumber: any;

  beforeEach(() => {
    removeNumber = jest.fn();
    ctx = {
      logger,
      entity: {
        identity: {
          displayName: {
            name: undefined,
            number: undefined,
          },
        },
      },
      repository: {
        displayNameRepository: {
          find: async () => ({ remove: removeNumber }),
          update: jest.fn(),
        },
        identityRepository: {
          remove: jest.fn(),
        },
      },
    };
  });

  test("should remove identity from repository", async () => {
    await expect(headlessRemoveIdentity(ctx)).resolves.toStrictEqual({
      body: {},
      status: 204,
    });

    expect(ctx.repository.identityRepository.remove).toHaveBeenCalled();
  });

  test("should remove display name number from repository", async () => {
    ctx.entity.identity.displayName.name = "name";
    ctx.entity.identity.displayName.number = 1234;

    await expect(headlessRemoveIdentity(ctx)).resolves.toStrictEqual({
      body: {},
      status: 204,
    });

    expect(removeNumber).toHaveBeenCalledWith(1234);
    expect(ctx.repository.displayNameRepository.update).toHaveBeenCalled();
  });
});
