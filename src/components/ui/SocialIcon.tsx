import Link from "next/link";
import React from "react";

interface SocialIconProps {
  size: "sm" | "md" | "lg";
  className?: string;
  color?: string;
  link?: string
  path: string
}

const sizeVariants: Record<"sm" | "md" | "lg", string> = {
  md: "w-4 h-4",
  lg: "w-7 h-7",
  sm: "w-2 h-2",
};

export const SocialIcon: React.FC<SocialIconProps> = ({ size, className, color , link = '#', path }) => {
  return (
    <Link href={link} target="_blank">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 50 50"
        strokeWidth="2"
        stroke={`${color} || 'white' `}
        className={`
        p-1 rounded-md cursor-pointer
          ${sizeVariants[size]} 
          ${className}
        `}
      >
        <path d={path}></path>
      </svg>
    </Link>
  );
}