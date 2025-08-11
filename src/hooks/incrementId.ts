export enum IdKey {
  marqueeKey
}
const idMap = new Map<IdKey, number>();

export const useIncrementId = (key: IdKey) => {
  return {
    getId: () => {
      const id = (idMap.get(key) ?? 0) + 1;
      idMap.set(key, id)
      return id;
    }
  }
}
