import Button from '../../components/ui/Button'

const CreateAccount = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* Logo and Company Name */}
      <div className="text-center mb-8">
        <img src="/logo.png" alt="Eventurelly Logo" className="w-24 h-24 mx-auto" />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Eventurelly</h1>
      </div>

      {/* Welcome Message */}
      <h2 className="text-center text-xl font-medium text-gray-700 mb-6">Welcome to Eventurelly!!!</h2>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Button label="Register"  to="/register" />
        <Button label="Log In" to="/sign-in" />
      </div>
    </div>
  )
}

export default CreateAccount;