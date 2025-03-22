import { useState, useEffect } from "react";

interface Location {
  lat: number;
  lng: number;
}

interface GeolocationProps {
  onLocationFound: (location: Location) => void;
}

const Geolocation = ({ onLocationFound }: GeolocationProps) => {
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation not supported by this browser.");
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      if (latitude && longitude) {
        const currentLocation = { lat: latitude, lng: longitude };
        setLocation(currentLocation);
        onLocationFound(currentLocation);
      }
    };

    const onError = (error: GeolocationPositionError) => {
      console.error("Geolocation error:", error.message);
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, [onLocationFound]);

  return null; // No UI, purely for logic
};

export default Geolocation;
