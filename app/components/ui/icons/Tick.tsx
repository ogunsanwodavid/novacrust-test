type TickProps = {
  size: string;
  stroke?: string;
};

const Tick = ({ size, stroke }: TickProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 16 16"
  >
    <path
      fill="none"
      stroke={stroke || "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="m2.75 8.75l3.5 3.5l7-7.5"
    />
  </svg>
);

export default Tick;
