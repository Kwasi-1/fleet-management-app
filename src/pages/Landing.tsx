import { useLocation, useNavigate } from "react-router-dom";
import MapComponent from "../components/landing/MapComponent";
import { useEffect } from "react";

function Landing() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  // Get coordinates from URL params
  const pickupParam = searchParams.get("pickup");
  const destinationParam = searchParams.get("destination");

  useEffect(() => {
    if (pickupParam && destinationParam) {
      try {
        const pickup = JSON.parse(pickupParam) as [number, number];
        const destination = JSON.parse(destinationParam) as [number, number];

        navigate(location.pathname, {
          state: {
            shipmentCoordinates: {
              pickup,
              destination,
            },
          },
          replace: true,
        });
      } catch (e) {
        console.error("Error parsing coordinates", e);
      }
    }
  }, [pickupParam, destinationParam, navigate, location.pathname]);

  return (
    <div className="flex-1">
      <MapComponent />
    </div>
  );
}

export default Landing;
