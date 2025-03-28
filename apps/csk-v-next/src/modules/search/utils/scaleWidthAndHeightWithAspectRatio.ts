const scaleWidthAndHeightWithAspectRatio = ({
  width,
  height,
  maxWidth,
}: {
  width: number;
  height: number;
  maxWidth: number;
}) => ({
  width: maxWidth,
  height: maxWidth / (width / height), // where aspectRatio = width / height
});

export default scaleWidthAndHeightWithAspectRatio;
