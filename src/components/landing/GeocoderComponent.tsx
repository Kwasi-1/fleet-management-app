import { useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import MapboxGeocoder, { Result } from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface Business {
  name: string;
  location: { lng: number; lat: number };
}

interface GeocoderComponentProps {
  mapRef: React.RefObject<Map>;
  businesses: Business[];
  geocoderContainerRef: React.RefObject<HTMLDivElement>;
}

const GeocoderComponent: React.FC<GeocoderComponentProps> = ({
  mapRef,
  businesses,
  geocoderContainerRef,
}) => {
  useEffect(() => {
    if (!mapRef.current || !geocoderContainerRef.current) return;

    // Ensure Mapbox token is set
    if (!mapboxgl.accessToken) {
      console.error("Mapbox access token is not set.");
      return;
    }

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: "Search for businesses...",
      localGeocoder: (query: string) => {
        // Filter businesses based on query
        return businesses
          .filter((business) =>
            business.name.toLowerCase().includes(query.toLowerCase())
          )
          .map((business) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [business.location.lng, business.location.lat],
            },
            properties: {
              title: business.name,
            },
            place_name: business.name,
            text: business.name,
            center: [business.location.lng, business.location.lat],
          })) as GeoJSON.Feature<GeoJSON.Point>[];
      },
    });

    // Event Listener for Geocoder Result
    geocoder.on("result", (event: { result: Result }) => {
      const coords = event.result.center;
      if (coords && mapRef.current) {
        mapRef.current.flyTo({ center: coords, zoom: 17.5 });
      }
    });

    // Append Geocoder to Container
    geocoderContainerRef.current.appendChild(geocoder.onAdd(mapRef.current)!);

    // Cleanup on Unmount
    return () => {
      geocoder.onRemove();
    };
  }, [mapRef, businesses, geocoderContainerRef]);

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
