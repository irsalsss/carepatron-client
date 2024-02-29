"use client";

import { CheckCircledIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";

interface StepperProps {
  steps: {
    value: string;
    label: string;
  }[];
  currentStep: number;
}

const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <ol className='flex items-center w-full text-sm font-medium text-center sm:text-base gap-6 justify-between'>
      {steps.map((step, index) => {
        const isActiveInLastIndex = index + 1 !== steps.length;

        return (
          <>
            <li
              key={step.value}
              className={twMerge(
                "flex items-center gap-6",
                currentStep < index && "text-gray-500"
              )}
            >
              <div className='flex gap-2 items-center'>
                {currentStep > index ? (
                  <CheckCircledIcon className='text-green-500 w-6 h-6' />
                ) : (
                  <div
                    className={twMerge(
                      "rounded-full h-6 w-6 flex items-center justify-center text-white shrink-0 text-sm",
                      currentStep === index ? "bg-blue-600" : "bg-neutral-400"
                    )}
                  >
                    {index + 1}
                  </div>
                )}

                <span className='shrink-0'>{step.label}</span>
              </div>
            </li>

            {isActiveInLastIndex ? (
              <div className='w-max min-w-[20px] h-[2px] bg-neutral-300 grow' />
            ) : null}
          </>
        );
      })}
    </ol>
  );
};

export default Stepper;
