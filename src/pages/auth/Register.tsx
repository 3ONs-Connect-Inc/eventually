
import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';

const Register: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-50 px-4">
      <RegisterForm />
    </div>
  );
};

export default Register;

