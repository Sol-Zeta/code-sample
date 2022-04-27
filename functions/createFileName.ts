export const createFileName = (types: string[]) => {
  const date = new Date().toLocaleDateString();
  const allTypes = types.length ? `_${types.join("_")}` : "";
  return `spotaroom${allTypes}_${date}.json`;
};
