// Centralized password validation rules
export const PASSWORD_REQUIREMENTS = [
  {
    label: "One uppercase letter",
    pattern: /[A-Z]/,
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    label: "One lowercase letter",
    pattern: /[a-z]/,
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    label: "One digit",
    pattern: /[0-9]/,
    test: (password: string) => /[0-9]/.test(password),
  },
  {
    label: "At least 8 characters",
    pattern: /.{8,}/,
    test: (password: string) => password.length >= 8,
  },
  {
    label: "One uppercase, lowercase, and digits",
    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).+$/,
    test: (password: string) =>
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password),
  },
  {
    label: "One special character",
    pattern: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    test: (password: string) =>
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  },
];
