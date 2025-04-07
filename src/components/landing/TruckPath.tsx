import { useEffect } from "react";
import mapboxgl from "mapbox-gl";

interface Props {
  map: mapboxgl.Map;
  truck: { id: number; path: [number, number][] };
}

const TruckPath: React.FC<Props> = ({ map, truck }) => {
  useEffect(() => {
    if (!map.getSource(`path-${truck.id}`)) {
      map.addSource(`path-${truck.id}`, {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] },
      });

      map.addLayer({
        id: `path-layer-${truck.id}`,
        type: "line",
        source: `path-${truck.id}`,
        paint: { "line-color": "#00ff00", "line-width": 2 },
      });
    }

    const source = map.getSource(`path-${truck.id}`) as mapboxgl.GeoJSONSource;
    source.setData({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: { type: "LineString", coordinates: truck.path },
        },
      ],
    });
  }, [truck.path, map]);

  return null;
};

export default TruckPath;
