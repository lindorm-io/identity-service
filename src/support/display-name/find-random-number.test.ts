import { findRandomNumber } from "./find-random-number";
import { getRandomNumber } from "@lindorm-io/core";

jest.mock("@lindorm-io/core", () => ({
  getRandomNumber: jest.fn(() => "1111"),
}));

describe("findRandomNumber", () => {
  test("should quickly find a random number with an empty array", async () => {
    await expect(findRandomNumber({ array: [] })).resolves.toBe(1111);
  });

  test("should eventually find a random number when numbers already exists in array", async () => {
    getRandomNumber
      // @ts-ignore
      .mockImplementationOnce(() => "1111")
      .mockImplementationOnce(() => "2222")
      .mockImplementationOnce(() => "3333")
      .mockImplementationOnce(() => "4444")
      .mockImplementationOnce(() => "5555")
      .mockImplementationOnce(() => "6666")
      .mockImplementationOnce(() => "7777")
      .mockImplementationOnce(() => "8888")
      .mockImplementationOnce(() => "9999")
      .mockImplementationOnce(() => "1234");

    await expect(findRandomNumber({ array: [1111, 2222, 3333, 4444, 5555, 6666, 7777, 8888, 9999] })).resolves.toBe(
      1234,
    );
  });

  test("should parse string number to int correctly", async () => {
    getRandomNumber
      // @ts-ignore
      .mockImplementationOnce(() => "0001");

    await expect(findRandomNumber({ array: [] })).resolves.toBe(1);
  });

  test("should throw error if number could not be found", async () => {
    getRandomNumber
      // @ts-ignore
      .mockImplementationOnce(() => "1111")
      .mockImplementationOnce(() => "2222")
      .mockImplementationOnce(() => "3333")
      .mockImplementationOnce(() => "4444");

    await expect(findRandomNumber({ array: [1111, 2222, 3333, 4444], maximumTries: 3 })).rejects.toMatchSnapshot();
  });
});
