import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

const truckRoute = [
  [-0.187, 5.6037],
  [-0.190, 5.6050],
  [-0.195, 5.6070],
  [-0.200, 5.6090],
  [-0.205, 5.6105],
  [-0.210, 5.6120],
  [-0.215, 5.6140],
  [-0.220, 5.6160],
];

import { MutableRefObject } from "react";

interface TruckSimulationProps {
  mapRef: MutableRefObject<mapboxgl.Map | null>;
}

const TruckSimulation = ({ mapRef }: TruckSimulationProps) => {
  const [truckIndex, setTruckIndex] = useState(0);

  useEffect(() => {
    if (!mapRef.current) return; // Ensure mapRef is assigned

    const map = mapRef.current;

    // Ensure the map is fully loaded
    if (!map.isStyleLoaded()) {
      const waitForLoad = () => {
        if (map.isStyleLoaded()) {
          setupTruckSimulation();
        } else {
          setTimeout(waitForLoad, 500); // Retry after 500ms
        }
      };
      waitForLoad();
    } else {
      setupTruckSimulation();
    }

    function setupTruckSimulation() {
      const truckMarker = new mapboxgl.Marker({ color: "red" })
        .setLngLat(truckRoute[0])
        .addTo(map);

      let interval = setInterval(() => {
        setTruckIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % truckRoute.length;

          truckMarker.setLngLat(truckRoute[nextIndex]); // Move truck
          map.flyTo({ center: truckRoute[nextIndex], zoom: 14 });

          return nextIndex;
        });
      }, 2000);

      return () => {
        clearInterval(interval);
        truckMarker.remove();
      };
    }
  }, [mapRef]);

  return null;
};

export default TruckSimulation;
