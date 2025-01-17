import React from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Link} from 'react-router-dom';
import PhoneInput from './PhoneInput';
import ReCAPTCHA from 'react-google-recaptcha';
import useRecaptcha from '../../hooks/useRecaptcha';
import useFetchCountries from '../../hooks/useFetchCountries';
import { useRegisterFormHandler } from '../../hooks/useRegisterFormHandler';
import { useMap } from '../../hooks/useMap';
import { Autocomplete, GoogleMap, Marker } from '@react-google-maps/api';



const mapContainerStyle = {
  width: '100%',
  height: '400px',
};
const center = {
  lat: 7.2905715, 
  lng: 80.6337262,
};
const RegisterForm: React.FC = () => {
  const countries = useFetchCountries();
 const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();
 const { formData, errors, handleChange, handleSubmit,
   setFormData,
   showMap,
  } = useRegisterFormHandler(
  {
    id: "",
    companyName: "",
    companyAddress: "",
    companyContact: "+1",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    ageConfirmed: false,
    captcha: "",
    role: "Admin",
  },
  recaptchaRef,
  capchaToken
);

const { isLoaded, loadError,
  markerPosition,onAutocompleteLoad, onPlaceChanged
 } = useMap(formData,center);

  
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
<form    onSubmit={handleSubmit}
  className="bg-white shadow-md rounded-lg p-3 md:p-8 w-full max-w-md"
>

        <h1 className="text-2xl font-bold text-center mb-6">Register </h1>

        <Input
          label="Company Name"
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />
 {errors.companyName && <p>{errors.companyName}</p>}

   <Autocomplete
        onLoad={onAutocompleteLoad}
        onPlaceChanged={onPlaceChanged}
      > 
        <Input
          label="Company Address"
          type="text"
          name="companyAddress"
          value={formData.companyAddress}
          onChange={handleChange}
          required
        />
      </Autocomplete>
      {errors.companyAddress && <p className="text-red-500 text-sm">{errors.companyAddress}</p>}

       {showMap && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={markerPosition}
        >
          <Marker position={markerPosition} />
        </GoogleMap>
      )}
      
      <PhoneInput
  companyContact={formData.companyContact}
  phoneNumber={formData.phoneNumber}
  countries={countries}
  onCompanyContactChange={(value) => setFormData({ ...formData, companyContact: value })}
  onPhoneNumberChange={(e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10); 
    setFormData({ ...formData, phoneNumber: value });
  }}
/>
{errors.companyContact && <p className="text-red-500 text-sm">{errors.companyContact}</p>}
{errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}


        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
 {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
     
        />
{errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

<div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="ageConfirmed"
            checked={formData.ageConfirmed}
            onChange={handleChange}
            className="mr-2"
            required
          />
          <label htmlFor="ageConfirmed" className="text-gray-700">
            I confirm that I am above the age of 18.
          </label>
        </div>
        {errors.ageConfirmed && <p className="text-red-500 text-sm">{errors.ageConfirmed}</p>}

    <div className="mb-4 flex flex-col justify-center">
  <div
    className="captcha-container"
    style={{
      width: 'auto', 
      transformOrigin: 'center', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <ReCAPTCHA
      sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY}
      ref={recaptchaRef}
        onChange={handleRecaptcha}
    />
  </div>

</div>

        <div className="text-center text-sm text-gray-600 mb-4">
          By creating an account, you accept our{' '}
          <a href="/terms" className="text-blue-600">
            terms and conditions
          </a>
          .
        </div>

<div className='items-center flex justify-center'>
        <Button  disabled={!capchaToken} label="Create Account" type="submit" />
        </div>

        <div className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-blue-600">
            Log In
          </Link>
          .
        </div>
      </form>

  );
};

export default RegisterForm;
