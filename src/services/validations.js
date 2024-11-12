export const getRequiredMessage = (fieldName) => `${fieldName} is required`;

export const EmailValidation = {
  required: getRequiredMessage("Email"),
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Email is not valid",
  },
};

const PasswordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const PasswordValidation = (fieldName) => {
  return {
    required: getRequiredMessage(fieldName),
    pattern: {
      value: PasswordRegEx,
      message:
        "At least 6 characters: UPPER/lowercase, numbers and special characters",
    },
  };
};
