import { useState, useEffect } from 'react';
import { getCountries, getCountryCallingCode } from 'libphonenumber-js';

const useFetchCountries = () => {
  const [countries, setCountries] = useState<{ value: string }[]>([]);

  useEffect(() => {
    const fetchCountries = () => {
      const countryCodesSet = new Set<string>();
      getCountries().forEach((country) => {
        const countryCallingCode = getCountryCallingCode(country);
        countryCodesSet.add(`+${countryCallingCode}`);
      });

      const uniqueCountryCodes = Array.from(countryCodesSet).map((code) => ({
        value: code,
      }));

      setCountries(uniqueCountryCodes);
    };

    fetchCountries();
  }, []);

  return countries;
};

export default useFetchCountries;
