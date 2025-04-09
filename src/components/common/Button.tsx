import { Icon } from "@iconify/react";
import { ReactNode } from "react";

interface ReusableButtonProps {
  onClick: () => void;
  icon?: string;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  outline?: boolean;
}

export default function Button({
  onClick,
  icon,
  children,
  className = "",
  disabled = false,
  outline = false,
}: ReusableButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`justify-center rounded-md text-[12.5px] ring-offset-white transition focus-visible:outline-none disabled:pointer-events-none  disabled:text-gray-500 h-10 px-4 py-2 flex items-center gap-1 bg-primary-green text-black font-medium duation-300 ${
        outline
          ? "border bg-gray-100 border-gray-200 text-gray-500 hover:text-gray-400 hover:bg-gray-50 text-sm disabled:bg-gray-100/50 disabled:border-gray-200/50 disabled:text-gray-500/50"
          : "bg-[#619B7D] dark:text-black hover:opacity-90 hover:bg-[#619B7D]/80 disabled:bg-[#619B7D]/50 "
      } ${className}`}
    >
      {icon && <Icon icon={icon} className="text-xl" />}
      {children}
    </button>
  );
}
