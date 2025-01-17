
export interface CorporateAdmin {
  id: string;
    companyName: string;
    companyAddress: string;
    companyContact: string;
    phoneNumber: string;
    email: string;
    password: string;
    confirmPassword: string;
    ageConfirmed: boolean;
    captcha: string;
    role: "Admin" | "Employee" | "User";
  }
  
  export type FormErrors = Partial<Record<keyof CorporateAdmin, string>>;

