interface IProgressProps {
  size?: number;
  color?: string;
  currentIndex: number;
  total: number;
}

export const Progress = ({ currentIndex, total, color = "blue", size = 2 }: IProgressProps) => {
  return (
    <div
      className={`bg-${color}-600 h-${size} rounded-full transition-all duration-300`}
      style={{
        width: `${((currentIndex + 1) / total) * 100}%`,
      }}
    ></div>
  );
};
