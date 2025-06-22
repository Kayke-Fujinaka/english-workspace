import { LuLoader } from "react-icons/lu";

interface ILoaderProps {
  size?: number;
  color?: string;
  className?: string;
}

export const Loader = ({ size = 8, color = "gray", className }: ILoaderProps) => {
  return (
    <LuLoader
      className={`text-${color}-400 w-${size} h-${size} mx-auto animate-spin ${className}`}
    />
  );
};
