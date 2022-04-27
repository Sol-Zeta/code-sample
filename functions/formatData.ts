// TODO: add interface


export const formatData = (data: any) => {
  const formatedData: any = {};
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
