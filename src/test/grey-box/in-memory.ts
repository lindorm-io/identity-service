import { TObject } from "@lindorm-io/core";
import { KeyPair } from "@lindorm-io/key-pair";

export let inMemoryKeys: Array<KeyPair> = [];
export let inMemoryStore: TObject<any> = {};

export const resetKeys = (): void => {
  inMemoryKeys = [];
};

export const resetStore = (): void => {
  inMemoryStore = {};
};
