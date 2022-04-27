const convertTime = (millis: number) => {
  if (typeof millis === "number") {
    const minutes = Math.floor(millis / 1000 / 60);
    const seconds = Math.floor((millis / 1000) % 60);
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`;
  } else {
    return "00:00";
  }
};

export default convertTime;
