"use client";

import createClientMutation from "@/api/@mutation/create-client-mutation/create-client-mutation";
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
import { useQueryClient } from "@tanstack/react-query";
import { notify } from "@/components/shared/toaster/toaster";
import updateClientMutation from "@/api/@mutation/update-client-mutation/update-client-mutation";
import PhoneInput from "react-phone-input-2";

interface ClientsModalAddEditProps {
  onClose: () => void;
  isAddMode: boolean;
  detailClient?: ClientInterface;
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
  detailClient,
  isAddMode,
}: ClientsModalAddEditProps) => {
  const titleModal = isAddMode ? "Create client" : "Update client";
  const [currentStep, setCurrentStep] = useState(0);

  const queryClient = useQueryClient();

  const {
    control,
    formState: { isDirty, isValid },
    trigger,
    handleSubmit,
  } = useForm<ClientInterface>({
    mode: "onChange",
    defaultValues: detailClient,
  });

  const { mutate: createClient } = createClientMutation();

  const { mutate: updateClient } = updateClientMutation();

  const handleClickContinue = () => {
    setCurrentStep(currentStep + 1);
    trigger();
  };

  const handleClickBack = () => {
    setCurrentStep(currentStep - 1);
    trigger();
  };

  const handleSubmitModal = (data: ClientInterface) => {
    const payload: ClientInterface = {
      ...data,
      email: data.email.toLocaleLowerCase(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phoneNumber: data.phoneNumber.length > 0 ? data.phoneNumber : "+62",
    };

    if (isAddMode) {
      createClient(payload, {
        onSuccess: () => {
          queryClient.resetQueries({ queryKey: ["useGetClientsQuery"] });

          notify("Successfully created");
          onClose();
        },
        onError: () => {
          notify("Something went wrong, please try again");
        },
      });

      return;
    }

    updateClient(payload, {
      onSuccess: () => {
        queryClient.resetQueries({ queryKey: ["useGetClientsQuery"] });

        notify("Successfully updated");
        onClose();
      },
      onError: () => {
        notify("Something went wrong, please try again");
      },
    });
  };

  const isDisabled = (!isDirty || !isValid) && isAddMode;

  const footerPersonalDetails = (
    <div
      className={twMerge(
        "flex items-center p-4 md:p-5 border-gray-200 rounded-b",
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
        label={currentStep === 0 ? "Continue" : titleModal}
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
      title={titleModal}
      content={
        <div className='flex flex-col gap-3'>
          <Stepper steps={steps} currentStep={currentStep} />

          {currentStep === 0 ? (
            <div className='flex flex-col gap-2 mt-2'>
              <div className='flex flex-col gap-1'>
                <label
                  className='text-[12px] text-neutral-400'
                  htmlFor='firstName'
                >
                  First name
                </label>
                <Controller
                  name='firstName'
                  control={control}
                  defaultValue={detailClient?.firstName || ""}
                  rules={{
                    required: "This field is required",
                    validate: personalDetailsValidation.firstName,
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
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
                <label
                  className='text-[12px] text-neutral-400'
                  htmlFor='lastName'
                >
                  Last name
                </label>
                <Controller
                  name='lastName'
                  control={control}
                  defaultValue={detailClient?.lastName || ""}
                  rules={{
                    required: "This field is required",
                    validate: personalDetailsValidation.lastName,
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
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
          ) : null}

          {currentStep === 1 ? (
            <div className='flex flex-col gap-2 mt-2'>
              <div className='flex flex-col gap-1'>
                <label className='text-[12px] text-neutral-400' htmlFor='email'>
                  Email
                </label>
                <Controller
                  name='email'
                  control={control}
                  defaultValue={detailClient?.email || ""}
                  rules={{
                    required: "This field is required",
                    validate: contactlDetailsValidation.email,
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
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
                <label
                  className='text-[12px] text-neutral-400'
                  htmlFor='phoneNumber'
                >
                  Phone number
                </label>
                <Controller
                  name='phoneNumber'
                  control={control}
                  defaultValue={detailClient?.phoneNumber || ""}
                  render={({ field: { value, onChange } }) => (
                    <PhoneInput
                      onChange={(_, __, ___, formattedValue) =>
                        onChange(formattedValue)
                      }
                      value={value}
                      country='id'
                      autoFormat
                      inputProps={{
                        id: "phoneNumber",
                      }}
                    />
                  )}
                />
              </div>
            </div>
          ) : null}
        </div>
      }
      onClose={onClose}
      customFooter={footerPersonalDetails}
    />
  );
};

export default ClientsModalAddEdit;
