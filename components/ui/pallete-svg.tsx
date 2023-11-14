export const PaletteSVG = ({ colors }: { colors: string[] }) => {
  const numColors = colors.length;
  const stripWidth = 40 / numColors; // Assuming the SVG width is 100

  return (
    <svg width="40" height="40" className="rounded-sm">
      {colors.map((color, index) => (
        <rect
          key={index}
          x={stripWidth * index}
          y="0"
          width={stripWidth}
          height="40"
          fill={color}
        />
      ))}
    </svg>
  );
};
