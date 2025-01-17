
import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  to?: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: any; 
}

const Button: React.FC<ButtonProps> = ({ label, onClick, to, type = 'button', className, disabled  }) => {
  if (to) {
    return (
      <Link
        to={to}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-300"
      >
        {label}
      </Link>
    );
  }

  return (
    <button
    type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition duration-300${className}`}
    >
      {label}
    </button>
  );
};



export default Button;
