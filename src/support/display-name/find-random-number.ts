import { getRandomNumber } from "@lindorm-io/core";
import { includes } from "lodash";

export interface IFindRandomNumberOptions {
  array: Array<number>;
  maximumTries?: number;
}

export const findRandomNumber = async (options: IFindRandomNumberOptions): Promise<number> => {
  const { array, maximumTries = 100 } = options;

  let tries = 0;
  let numberIsUnique = false;

  while (!numberIsUnique && tries <= maximumTries) {
    tries += 1;

    const string = await getRandomNumber(4);
    const number = parseInt(string, 10);

    numberIsUnique = !includes(array, number);

    if (numberIsUnique) {
      return number;
    }
  }

  throw new Error("Unable to find a random value");
};
