import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import clsx from "clsx";
import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "header" | "footer";
}

const Logo: React.FC<LogoProps> = ({
  size = "md",
  className = "",
  variant = "header",
}) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const iconSize = {
    sm: 26,
    md: 32,
    lg: 40,
  };

  const textColor = variant === "footer" ? "text-white" : "text-gray-900";

  return (
    <div
      className={clsx("flex items-center gap-2", className)}
      aria-label="llms.txt logo"
    >
      {/* Icon with overlay */}
      <span className="relative inline-flex items-center justify-center">
        <HiOutlineDocumentChartBar
          size={iconSize[size]}
          className="text-white bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-pink-500 p-1.5 rounded-md shadow-md"
        />
      </span>

      {/* Logo Text */}
      <span
        className={clsx(
          "font-mono font-bold tracking-tight",
          sizeClasses[size],
          textColor
        )}
        style={{ letterSpacing: "-0.02em" }}
      >
        llms
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-indigo-500">
          .
        </span>
        txt
      </span>
    </div>
  );
};

export default Logo;
