import { CorporateAdmin, FormErrors } from "../types";

export const validateForm = (formData: CorporateAdmin): Partial<Record<keyof CorporateAdmin, string>> => {
  const errors: FormErrors = {};

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/;
  const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!formData.companyName.trim()) errors.companyName = "Company name is required.";

  if (!formData.companyAddress.trim()) {
    errors.companyAddress = "Company address is required.";
  }else if(!addressRegex.test(formData.companyAddress)) {
      errors.companyAddress = "Please enter a valid company address.";
  }

  if (!formData.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required.";
  } else if (!phoneRegex.test(formData.phoneNumber)) {
    errors.phoneNumber = "Phone number must be 10 digits.";
  }
  
  if (!formData.email.trim()){
    errors.email = "Email is required.";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Invalid email format (e.g, test@example.com).";
  }

  if (!formData.ageConfirmed) errors.ageConfirmed = "You must confirm your age.";

  if (!formData.password.trim()) {
    errors.password = "Password is required.";
  }  else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }else if (formData.password.length > 8) {
    errors.password = "Password must not exceed 8 characters.";
  } else if (!passwordRegex.test(formData.password)) {
    errors.password = "Password must include uppercase, lowercase, number, and special character.";
  }
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.  Please enter the same password in both fields";
  }


  return errors;
};
