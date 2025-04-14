// Landing.tsx
import { useLocation } from "react-router-dom";
import MapComponent from "../components/landing/MapComponent";

function Landing() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Get coordinates from URL params
  const pickupParam = searchParams.get("pickup");
  const destinationParam = searchParams.get("destination");

  let routeProps = undefined;

  if (pickupParam && destinationParam) {
    try {
      const pickup = JSON.parse(pickupParam) as [number, number];
      const destination = JSON.parse(destinationParam) as [number, number];

      routeProps = {
        pickup,
        destination,
      };
    } catch (e) {
      console.error("Error parsing coordinates", e);
    }
  }

  return (
    <div className="flex-1">
      <MapComponent
        showRoute={routeProps}
        initialCenter={routeProps?.pickup}
        initialZoom={routeProps ? 12 : 17.12}
      />
    </div>
  );
}

export default Landing;
