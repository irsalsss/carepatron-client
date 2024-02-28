import { FC, ReactNode, useMemo } from "react";
import { twMerge } from "tailwind-merge";

enum ButtonTypeEnum {
  "primary" = "primary",
  "secondary" = "secondary",
}

enum ButtonSizeEnum {
  "small" = "small",
  "medium" = "medium",
  "big" = "big",
}

export interface ButtonProps {
  type?: keyof typeof ButtonTypeEnum;
  size?: keyof typeof ButtonSizeEnum;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  testid?: string;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    type = "primary",
    size = "big",
    label,
    icon,
    disabled,
    testid,
    className,
    onClick,
  } = props;

  /**
   * render button color based on type props
   */
  const buttonColor = useMemo(() => {
    switch (type) {
      case "secondary":
        return "bg-blue-B200 text-button hover:bg-blue-B100 disabled:bg-neutral-N200 disabled:text-disabled";
      default:
        return "bg-blue-B700 text-white hover:bg-blue-B600 disabled:bg-neutral-N200 disabled:text-disabled";
    }
  }, [type]);

  /**
   * render button size based on size props
   */
  const buttonSize = useMemo(() => {
    if (size === "small") return "py-2";
    if (size === "medium") return "py-3";
    return "py-4";
  }, [size]);

  /**
   *  render svg size based on size props
   */
  const svgSize = useMemo(() => {
    if (size === "small") return "w-4 h-4";
    if (size === "medium") return "w-5 h-5";
    return "w-6 h-6";
  }, [size]);

  /**
   * render icon based on icon props
   */
  const svgIcon = useMemo(() => {
    return icon ? <div className={twMerge("mr-3", svgSize)}>{icon}</div> : null;
  }, [icon, svgSize]);

  return (
    <button
      className={twMerge(
        "flex justify-center rounded-xl px-6 text-sm font-bold",
        buttonSize,
        buttonColor,
        className
      )}
      disabled={disabled}
      data-testid={testid}
      onClick={onClick}
    >
      {svgIcon}
      {label}
    </button>
  );
};

export default Button;
