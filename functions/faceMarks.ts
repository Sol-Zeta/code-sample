interface IFaceCoordinates {
  x: number;
  y: number;
}

export const calculateRotation = (
  leftEye: IFaceCoordinates,
  rightEye: IFaceCoordinates
) => {
  if (leftEye && rightEye) {
    const height = leftEye.y - rightEye.y;
    const distance = rightEye.x - leftEye.x;
    return (Math.atan(height / distance) * 180) / 3.1416;
  }
};

export const calculateHatRotation = (
  leftHead: IFaceCoordinates,
  rightHead: IFaceCoordinates
) => {
  if (leftHead && rightHead) {
    const height = leftHead.y - rightHead.y;
    const distance = rightHead.x - leftHead.x;
    return (Math.atan(height / distance) * 180) / 3.1416;
  }
};
