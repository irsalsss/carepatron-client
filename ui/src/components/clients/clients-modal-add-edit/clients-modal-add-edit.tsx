"use client";

import Button from "@/components/shared/button/button";
import Input from "@/components/shared/input/input";
import Modal from "@/components/shared/modal/modal";
import Stepper from "@/components/shared/stepper/stepper";
import ClientInterface from "@/interfaces/client/client.interface";
import {
  contactlDetailsValidation,
  personalDetailsValidation,
} from "@/validations/client/client.validation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface ClientsModalAddEditProps {
  onClose: () => void;
  onSubmit: () => void;
}

const steps = [
  {
    value: "personal_details",
    label: "Personal details",
  },
  {
    value: "contact_details",
    label: "Contact details",
  },
];

const ClientsModalAddEdit = ({
  onClose,
  onSubmit,
}: ClientsModalAddEditProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    control,
    formState: { isDirty, isValid },
    // trigger,
    handleSubmit,
  } = useForm<ClientInterface>({
    mode: "onChange",
    // defaultValues: detailClient,
  });

  const handleClickContinue = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleClickBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmitModal = (data: ClientInterface) => {
    console.log("data::: ", data);
  };

  const isDisabled = !isDirty || !isValid;

  const contentPersonalDetails = (
    <div className='flex flex-col gap-2 mt-2'>
      <div className='flex flex-col gap-1'>
        <label className='text-[12px] text-neutral-400' htmlFor='firstName'>
          First name
        </label>
        <Controller
          name='firstName'
          control={control}
          // defaultValue={detailClient?.firstName || ""}
          rules={{
            required: "This field is required",
            validate: personalDetailsValidation.firstName,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              id='firstName'
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-[12px] text-neutral-400' htmlFor='lastName'>
          Last name
        </label>
        <Controller
          name='lastName'
          control={control}
          // defaultValue={detailClient?.lastName || ""}
          rules={{
            required: "This field is required",
            validate: personalDetailsValidation.lastName,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              id='lastName'
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>
    </div>
  );

  const contentContactDetails = (
    <div className='flex flex-col gap-2 mt-2'>
      <div className='flex flex-col gap-1'>
        <label className='text-[12px] text-neutral-400' htmlFor='email'>
          Email
        </label>
        <Controller
          name='email'
          control={control}
          // defaultValue={detailClient?.email || ""}
          rules={{
            required: currentStep === 0 ? false : "This field is required",
            validate: contactlDetailsValidation.email,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              id='email'
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-[12px] text-neutral-400' htmlFor='phoneNumber'>
          Phone number
        </label>
        <Controller
          name='phoneNumber'
          control={control}
          // defaultValue={detailClient?.phoneNumber || ""}
          rules={{
            required: currentStep === 0 ? false : "This field is required",
            validate: contactlDetailsValidation.phoneNumber,
          }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <Input
              id='phoneNumber'
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
      </div>
    </div>
  );

  const footerPersonalDetails = (
    <div
      className={twMerge(
        "flex items-center p-4 md:p-5 border-gray-200 rounded-b dark:border-gray-600",
        currentStep === 0 ? "justify-end" : "justify-between"
      )}
    >
      {currentStep !== 0 ? (
        <Button
          icon={<ArrowLeftIcon className='w-5 h-5' />}
          label='Back'
          type='text-button'
          onClick={handleClickBack}
        />
      ) : null}

      <Button
        disabled={isDisabled}
        label={currentStep === 0 ? "Continue" : "Create client"}
        onClick={
          currentStep === 0
            ? handleClickContinue
            : handleSubmit(handleSubmitModal)
        }
      />
    </div>
  );

  return (
    <Modal
      title='Create new client'
      content={
        <div className='flex flex-col gap-3'>
          <Stepper steps={steps} currentStep={currentStep} />

          {currentStep === 0 ? contentPersonalDetails : null}
          {currentStep === 1 ? contentContactDetails : null}
        </div>
      }
      onClose={onClose}
      onSubmit={onSubmit}
      customFooter={footerPersonalDetails}
    />
  );
};

export default ClientsModalAddEdit;
