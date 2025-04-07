import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import TruckMarker from "./TruckMarker";
import TruckPath from "./TruckPath";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

interface Truck {
  id: number;
  name: string;
  coordinates: [number, number];
  path: [number, number][];
}

const MapComponent: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [trucks, setTrucks] = useState<Truck[]>([
    { id: 1, name: "Truck 1", coordinates: [-74.006, 40.7128], path: [] },
    { id: 2, name: "Truck 2", coordinates: [-73.9, 40.73], path: [] },
  ]);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-74.006, 40.7128],
      zoom: 10,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-left");

    return () => mapRef.current?.remove();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks((prevTrucks) =>
        prevTrucks.map((truck) => {
          const newCoords: [number, number] = [
            truck.coordinates[0] + (Math.random() - 0.5) * 0.02,
            truck.coordinates[1] + (Math.random() - 0.5) * 0.02,
          ];
          return {
            ...truck,
            coordinates: newCoords,
            path: [...truck.path, newCoords],
          };
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "100vh", position: "relative" }}
      className="h-"
    >
      {mapRef.current &&
        trucks.map((truck) => (
          <>
            {mapRef.current && (
              <TruckMarker
                key={`marker-${truck.id}`}
                map={mapRef.current}
                truck={truck}
              />
            )}
            {mapRef.current && (
              <TruckPath
                key={`path-${truck.id}`}
                map={mapRef.current}
                truck={truck}
              />
            )}
          </>
        ))}
    </div>
  );
};

export default MapComponent;
