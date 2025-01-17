import React, { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;  
  maxLength?: number;
}

const Input: React.FC<InputProps> = ({ label, type, name, value, onChange, required, className, maxLength }) => {
  const [showPassword, setShowPassword] = useState(type === 'password');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`mb-4 relative ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          required={required}
          maxLength={maxLength}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
          >
            {showPassword ? <BsEyeSlash className="h-5 w-5" /> : <BsEye className="h-5 w-5" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
