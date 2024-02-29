import { Validator } from "@/interfaces/shared/validator";

const generalValidation = (value: string, maxLength?: number) => {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = maxLength ?? 15;

  if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
    return `Should be at-least 3 - ${MAX_LENGTH} characters`;
  }

  return true;
};

export const personalDetailsValidation: Validator<{
  firstName: string;
  lastName: string;
}> = {
  firstName: (value) => generalValidation(value, 15),
  lastName: (value) => generalValidation(value, 15),
};

export const contactlDetailsValidation: Validator<{
  email: string;
  phoneNumber: string;
}> = {
  email: (value) => generalValidation(value, 15),
  phoneNumber: (value) => generalValidation(value, 15),
};
