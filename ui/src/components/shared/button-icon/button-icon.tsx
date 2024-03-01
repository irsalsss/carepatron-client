import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonIconProps {
  children: ReactNode;
  onClick: () => void;
  label: string;
  className?: string;
}

const ButtonIcon = ({
  className,
  label,
  children,
  onClick,
}: ButtonIconProps) => {
  return (
    <button
      role='button'
      onClick={onClick}
      className={twMerge(
        "rounded-[8px] p-1 shrink-0 hover:bg-neutral-300",
        className
      )}
    >
      <span className='sr-only'>{label}</span>
      {children}
    </button>
  );
};

export default ButtonIcon;
