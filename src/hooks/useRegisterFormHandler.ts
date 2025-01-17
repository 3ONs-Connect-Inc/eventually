import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "./redux";
import { validateForm } from "../utils/validateForm";
import { auth, db } from "../firebase/config";
import { addAdmin } from "../redux/slices/adminSlice";
import bcrypt from 'bcryptjs';

export const useRegisterFormHandler = (defaultFormData: any, recaptchaRef: any, capchaToken: string | null) => {
  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 const [showMap, setShowMap] = useState(false);

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
  
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'companyAddress' && value) {
      setShowMap(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  
    if (!capchaToken) {
      toast.error("Please complete the captcha.");
      return;
    }
  
    try {
        // Encrypt the password using bcryptjs
        const hashedPassword = await bcrypt.hash(formData.password, 8);
  
        // Create the user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
  
        if (formData.role === "Admin") {
          const adminData = {
            id: userCredential.user.uid, 
            companyName: formData.companyName,
            companyAddress: formData.companyAddress,
            companyContact: formData.companyContact,
            phoneNumber: formData.phoneNumber,
            email: formData.email,
            password: hashedPassword, 
            role: formData.role,
            timestamp: serverTimestamp(),
          };
  
          // Save admin data to Firestore
          const adminRef = doc(db, "admin", userCredential.user.uid); 
          await setDoc(adminRef, adminData); 
  
          // Dispatch to Redux
          dispatch(addAdmin(adminData));
        }
  
        toast.success("Registration successful");
        recaptchaRef.current?.reset();
        navigate("/2fa-user-authentication");
    } catch (error: any) {
        if (error.code === "auth/email-already-in-use") {
          toast.error("The email address is already in use by another account.");
        } else {
          toast.error(`Registration failed: ${error.message}`);
        }
      }
    };
  

  return { showMap, setShowMap, formData, errors, handleChange, handleSubmit, setFormData, setErrors };
};
