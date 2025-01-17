import React, { useState, useEffect, useRef } from 'react';

interface PhoneInputProps {
  companyContact: string;
  phoneNumber: string;
  countries: { value: string }[];
  onCompanyContactChange: (value: string) => void;
  onPhoneNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  companyContact,
  phoneNumber,
  countries,
  onCompanyContactChange,
  onPhoneNumberChange,
}) => {
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-digit characters and limit length to a reasonable number for country codes
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    onCompanyContactChange(value);
    setShowSuggestions(true);
  
    const filtered = countries.filter((country) =>
      country.value.startsWith(value)
    );
    setFilteredCountries(filtered);
  };
  

  const handleSuggestionClick = (value: string) => {
    onCompanyContactChange(value);
    setShowSuggestions(false);
  };

  return (
    <div className="mb-4" ref={inputRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
      </label>
      <div className="flex">
        <input
          type="text"
          value={companyContact}
          onChange={handleCountryCodeChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Enter country code"
          className="w-1/4 px-3 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={onPhoneNumberChange}
          placeholder="Enter phone number"
          maxLength={10}
          className="w-3/4 px-3 py-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
      </div>
      {showSuggestions && filteredCountries.length > 0 && (
        <ul className="border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto">
          {filteredCountries.map((country, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(country.value)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
            >
              {country.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PhoneInput;
