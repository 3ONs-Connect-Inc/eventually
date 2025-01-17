import { useState } from "react";
import { useLoadScript } from "@react-google-maps/api";


const libraries: ("places")[] = ['places'];
export const useMap = (defaultFormData: any, initialCenter: { lat: number; lng: number }) => {
  const [markerPosition, setMarkerPosition] = useState(initialCenter);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [formData, setFormData] = useState(defaultFormData);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onAutocompleteLoad = (auto: google.maps.places.Autocomplete) => setAutocomplete(auto);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setMarkerPosition({ lat, lng });
        setFormData((prev: any) => ({
          ...prev,
          companyAddress: place.formatted_address || '',
        }));
      }
    }
  };

  return { isLoaded, formData,loadError, autocomplete, markerPosition, setMarkerPosition, onAutocompleteLoad, onPlaceChanged };
};
