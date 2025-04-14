import { useLocation } from "react-router-dom";
import MapComponent from "../components/landing/MapComponent";

function Landing() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const pickupParam = searchParams.get("pickup");
  const destinationParam = searchParams.get("destination");

  let showRoute = undefined;

  if (pickupParam && destinationParam) {
    try {
      const pickup = JSON.parse(pickupParam) as [number, number];
      const destination = JSON.parse(destinationParam) as [number, number];

      showRoute = {
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
        showRoute={showRoute}
        initialCenter={showRoute?.pickup}
        initialZoom={showRoute && 12}
      />
    </div>
  );
}

export default Landing;
