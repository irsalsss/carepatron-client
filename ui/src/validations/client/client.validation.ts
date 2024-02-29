import { Validator } from "@/interfaces/shared/validator";

const generalValidation = (value: string, maxLength?: number) => {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = maxLength ?? 15;

  if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
    return `Should be at-least ${MIN_LENGTH} - ${MAX_LENGTH} characters`;
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
  email: (value: string) => {
    if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(value)) {
      return 'Invalid email address'
    }
  
    return true;
  },
  phoneNumber: (value: string) => {
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 15;

    if (value.length < MIN_LENGTH || value.length > MAX_LENGTH) {
      return `Should be at-least ${MIN_LENGTH} - ${MAX_LENGTH} characters`;
    }

    if (!(/^[0-9]+$/).test(value)) {
      return 'Please enter a number'
    }
  
    return true;
  },
};
