import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MutableRefObject } from "react";

const truckRoute: [number, number][] = [
  [-0.187, 5.6037],
  [-0.19, 5.605],
  [-0.195, 5.607],
  [-0.2, 5.609],
  [-0.205, 5.6105],
  [-0.21, 5.612],
  [-0.215, 5.614],
  [-0.22, 5.616],
];

interface TruckSimulationProps {
  mapRef: MutableRefObject<mapboxgl.Map | null>;
}

const TruckSimulation = ({ mapRef }: TruckSimulationProps) => {
  const [truckIndex, setTruckIndex] = useState(0);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    let truckMarker: mapboxgl.Marker | null = null;
    let interval: NodeJS.Timeout | null = null;

    // Function to safely stop the interval
    const clearTruckInterval = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    // Function to initiate the simulation
    const setupTruckSimulation = () => {
      if (truckMarker) truckMarker.remove(); // Clean up old marker if any

      truckMarker = new mapboxgl.Marker({ color: "red" })
        .setLngLat(truckRoute[0])
        .addTo(map);

      interval = setInterval(() => {
        setTruckIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % truckRoute.length;

          // Move truck to the next position
          if (truckMarker) {
            truckMarker.setLngLat(truckRoute[nextIndex]);
            map.easeTo({
              center: truckRoute[nextIndex],
              zoom: 14,
              speed: 0.5,
              curve: 1,
            });
          }
          return nextIndex;
        });
      }, 2000);
    };

    // Function to wait for the map to load before starting
    const waitForMapLoad = () => {
      if (map.isStyleLoaded()) {
        setupTruckSimulation();
      } else {
        const timeout = setTimeout(waitForMapLoad, 500);
        return () => clearTimeout(timeout);
      }
    };

    waitForMapLoad(); // Start waiting for map load

    return () => {
      clearTruckInterval();
      if (truckMarker) truckMarker.remove();
    };
  }, [mapRef]);

  return null;
};

export default TruckSimulation;
