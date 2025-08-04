// Email validation utility functions

export const validateEmail = (
  email: string
): { isValid: boolean; error?: string } => {
  if (!email) {
    return { isValid: false, error: "Email is required" };
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  // Check for common disposable email domains
  const disposableDomains = [
    "tempmail.org",
    "guerrillamail.com",
    "10minutemail.com",
    "mailinator.com",
    "yopmail.com",
    "throwaway.email",
    "temp-mail.org",
    "fakeinbox.com",
  ];

  const domain = email.split("@")[1]?.toLowerCase();
  if (disposableDomains.includes(domain)) {
    return {
      isValid: false,
      error: "Please use a valid email address (no temporary emails)",
    };
  }

  // Check length
  if (email.length > 254) {
    return { isValid: false, error: "Email address is too long" };
  }

  return { isValid: true };
};

export const validatePassword = (
  password: string
): { isValid: boolean; error?: string } => {
  if (!password) {
    return { isValid: false, error: "Password is required" };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      error: "Password must be at least 6 characters long",
    };
  }

  if (password.length > 128) {
    return { isValid: false, error: "Password is too long" };
  }

  return { isValid: true };
};
