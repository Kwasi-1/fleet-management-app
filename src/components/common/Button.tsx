import { Icon } from "@iconify/react";
import { ReactNode } from "react";

interface ReusableButtonProps {
  onClick: () => void;
  icon?: string;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  onClick,
  icon,
  children,
  className = "",
  disabled = false,
}: ReusableButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`justify-center rounded-md text-[12.5px] ring-offset-white transition-colors focus-visible:outline-none disabled:pointer-events-none dark:bg-[#619B7D] dark:text-black hover:opacity-90 hover:dark:bg-[#619B7D]/80 disabled:dark:bg-[#619B7D]/50 disabled:bg-gray-300 disabled:text-gray-500 h-10 px-4 py-2 flex items-center gap-1 bg-primary-green text-black font-medium ${className}`}
    >
      {icon && <Icon icon={icon} className="text-xl" />}
      {children}
    </button>
  );
}
