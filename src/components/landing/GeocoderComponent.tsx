import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface GeocoderComponentProps {
  mapRef: React.RefObject<mapboxgl.Map>;
  businesses: { name: string; location: { lng: number; lat: number } }[];
  geocoderContainerRef: React.RefObject<HTMLDivElement>;
}

const GeocoderComponent: React.FC<GeocoderComponentProps> = ({ mapRef, businesses, geocoderContainerRef }) => {
  useEffect(() => {
    if (!mapRef.current || !geocoderContainerRef.current) return;

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: "Search for businesses...",
      localGeocoder: (query) => {
        return businesses
          .filter((business) =>
            business.name.toLowerCase().includes(query.toLowerCase())
          )
          .map((business) => ({
            text: business.name,
            place_name: business.name,
            center: [business.location.lng, business.location.lat],
            properties: { name: business.name },
          }));
      },
    });

    geocoder.on("result", (event) => {
      const coords = event.result.center;
      mapRef.current.flyTo({ center: coords, zoom: 17.5 });
    });

    geocoderContainerRef.current.appendChild(geocoder.onAdd(mapRef.current));

    return () => {
      geocoder.onRemove(); // ✅ Properly remove the geocoder
    };
  }, [mapRef, businesses]);

  return (
    <div
      ref={geocoderContainerRef}
      style={{
        position: "absolute",
        top: "1.4vw",
        right: "10vw",
        zIndex: 5,
      }}
    />
  );
};

export default GeocoderComponent;
