import { KeyPair } from "@lindorm-io/key-pair";

export let inMemoryKeys: Array<KeyPair> = [];
export let inMemoryStore: Record<string, any> = {};

export const resetKeys = (): void => {
  inMemoryKeys = [];
};

export const resetStore = (): void => {
  inMemoryStore = {};
};
