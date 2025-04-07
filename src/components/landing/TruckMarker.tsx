import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

interface Props {
  map: mapboxgl.Map;
  truck: { id: number; name: string; coordinates: [number, number] };
}

const TruckMarker: React.FC<Props> = ({ map, truck }) => {
  useEffect(() => {
    const marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat(truck.coordinates)
      .setPopup(new mapboxgl.Popup().setText(truck.name))
      .addTo(map);

    return () => marker.remove();
  }, [truck.coordinates, map]);

  return null;
};

export default TruckMarker;
