type ArrowLeftProps = {
  size: string;
  fill?: string;
};

const ArrowLeft = ({ size, fill }: ArrowLeftProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 20 20"
  >
    <path
      fill={fill || "currentColor"}
      d="m3.828 9l6.071-6.071l-1.414-1.414L0 10l.707.707l7.778 7.778l1.414-1.414L3.828 11H20V9H3.828z"
    />
  </svg>
);

export default ArrowLeft;
