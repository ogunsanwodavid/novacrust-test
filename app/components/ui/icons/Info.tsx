type InfoProps = {
  size: string;
  fill?: string;
  stroke?: string;
};

const Info = ({ size, fill, stroke }: InfoProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill={fill || "currentColor"}
  >
    <g fill="none" stroke={stroke || "currentCOlor"}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 14h1v9h1m12-7a13 13 0 1 1-26 0a13 13 0 0 1 26 0Z"
      />
      <path
        fill={fill || "currentColor"}
        d="M17 9.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z"
      />
    </g>
  </svg>
);

export default Info;
