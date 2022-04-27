import { images } from "../assetsRoutes";

// The keys of this object are in spanish to match the names of the API response

const imageNames = {
  tomate: images.tomato,
  cebolla: images.onion,
  pimiento: images.pepper,
  lechuga: images.lettuce,
  zanahoria: images.carrot,
  pepino: images.cucumber,
  default: images.default,
};

export const findImageByName = (name: string) => {
  const product = name?.split(" ")[0].toLowerCase();
  return imageNames[product] || imageNames["default"];
};
