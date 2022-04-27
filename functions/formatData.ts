interface IData {
  name?: string;
  description?: string;
  price?: string;
  active?: boolean;
}

export const formatData = (data: IData) => {
  const formatedData = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      if (key === "price") {
        formatedData[key] = Number(data[key]);
      } else if (key === "active") {
        formatedData[key] = data[key].toString();
      } else {
        formatedData[key] = data[key];
      }
    }
  }
  return formatedData;
};
