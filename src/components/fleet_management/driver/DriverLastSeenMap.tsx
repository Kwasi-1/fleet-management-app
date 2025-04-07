import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocation } from "react-router-dom";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

const DriverLastSeenMap = ({ lastSeenLocation }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const location = useLocation();

  const isDriverDetailsPage = location.pathname.includes("driver_info");

  useEffect(() => {
    if (!lastSeenLocation) return;
    if (map.current) return; // Prevent re-initialization

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: lastSeenLocation, // Center map at last seen location
      zoom: 14.4,
    });

    // Add Last Seen Marker
    new mapboxgl.Marker({ color: "red" })
      .setLngLat(lastSeenLocation)
      .setPopup(new mapboxgl.Popup().setText("Last Seen Here"))
      .addTo(map.current);

    return () => {
      if (map.current) map.current.remove();
    };
  }, [lastSeenLocation]);

  return (
    <div
      ref={mapContainer}
      className={`w-full rounded-md border ${
        isDriverDetailsPage ? "h-[380px]" : "h-[440px]"
      }`}
      style={{ minHeight: "250px" }}
    />
  );
};

export default DriverLastSeenMap;
