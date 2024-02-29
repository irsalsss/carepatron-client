"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  icon?: ReactNode;
  error?: string;
  className?: string;
}

const Input = (inputProps: InputProps) => {
  const { icon, error, className, ...props } = inputProps;

  return (
    <div className='relative flex gap-1 flex-col'>
      {icon ? (
        <div className='absolute z-10 h-5 w-5 right-4 top-[14px]'>{icon}</div>
      ) : null}

      <input
        className={twMerge(
          "text-sm sm:text-base relative w-full border rounded placeholder-gray-400 focus:border-indigo-400 focus:outline-none",
          icon ? "py-3 pr-10 pl-4" : "px-4 py-3",
          error && "border-red-500",
          className
        )}
        {...props}
      />

      {error ? <span className='text-red-500 text-sm'>{error}</span> : null}
    </div>
  );
};

export default Input;
