import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface Business {
  name: string;
  location: {
    lng: number;
    lat: number;
  };
}

interface GeocoderComponentProps {
  mapRef: React.RefObject<mapboxgl.Map>;
  businesses: Business[];
  geocoderContainerRef: React.RefObject<HTMLDivElement>;
  styleProps?: string;
}

const GeocoderComponent = ({
  mapRef,
  businesses,
  geocoderContainerRef,
  styleProps,
}: GeocoderComponentProps) => {
  useEffect(() => {
    if (!mapRef.current || !geocoderContainerRef.current) return;

    // Use type assertion to bypass the type checking for MapboxGeocoder options
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken || "",
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: "Search for businesses...",
      localGeocoder: (query: string) => {
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

    geocoder.on("result", (event: { result: { center: [number, number] } }) => {
      const coords = event.result.center;
      mapRef.current?.flyTo({ center: coords, zoom: 17.5 });
    });

    geocoderContainerRef.current.appendChild(geocoder.onAdd(mapRef.current));

    return () => {
      geocoder.onRemove();
    };
  }, [mapRef, businesses, geocoderContainerRef]);

  return <div ref={geocoderContainerRef} className={styleProps} />;
};

export default GeocoderComponent;
