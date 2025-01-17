import React, { useState } from 'react';
import RegisterForm from '../../components/auth/RegisterForm';
import EmployeeForm from '../../components/auth/EmployeeForm';

const Register: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  const handleToggle = (selection: boolean) => {
    setIsAdmin(selection);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 md:p-8 w-full max-w-md">
        <div className="mb-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-8">
          <div
            onClick={() => handleToggle(true)}
            className={`cursor-pointer flex items-center space-x-2 ${isAdmin ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <div
              className={`w-6 h-6 sm:w-6 sm:h-6 rounded-full border-4 ${isAdmin ? 'border-blue-600 bg-blue-600' : 'border-gray-400 bg-transparent'}`}
            ></div>
            <span className="text-base sm:text-lg font-medium">Corporate Admin</span>
          </div>
          <div
            onClick={() => handleToggle(false)}
            className={`cursor-pointer flex items-center space-x-2 ${!isAdmin ? 'text-blue-600' : 'text-gray-400'}`}
          >
            <div
              className={`w-6 h-6 sm:w-6 sm:h-6 rounded-full border-4 ${!isAdmin ? 'border-blue-600 bg-blue-600' : 'border-gray-400 bg-transparent'}`}
            ></div>
            <span className="text-base sm:text-lg font-medium">Employee</span>
          </div>
        </div>
        {isAdmin ? <RegisterForm /> : <EmployeeForm />}
      </div>
    </div>
  );
};

export default Register;
