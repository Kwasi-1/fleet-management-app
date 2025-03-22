import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { MutableRefObject } from "react";

interface DirectionsProps {
  mapRef: MutableRefObject<mapboxgl.Map | null>;
  start: [number, number];
  end: [number, number];
}

const Directions = ({ mapRef, start, end }: DirectionsProps) => {
  useEffect(() => {
    if (!mapRef.current || !start || !end) return;
    if (!mapboxgl.accessToken) {
      console.error("Mapbox access token is missing.");
      return;
    }

    const map = mapRef.current;
    const routeLayerId = "route-layer";
    const routeSourceId = "route-source";

    const fetchRoute = async () => {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        const route = data.routes[0]?.geometry;

        if (!route) {
          console.error("No route found.");
          return;
        }

        // Remove existing route if it exists
        if (map.getSource(routeSourceId)) {
          (map.getSource(routeSourceId) as mapboxgl.GeoJSONSource).setData({
            type: "FeatureCollection",
            features: [{ type: "Feature", geometry: route }],
          });
        } else {
          // Add the route source
          map.addSource(routeSourceId, {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [{ type: "Feature", geometry: route }],
            },
          });

          // Add the route layer
          map.addLayer({
            id: routeLayerId,
            type: "line",
            source: routeSourceId,
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#007AFF",
              "line-width": 4,
              "line-opacity": 0.8,
            },
          });
        }
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();

    return () => {
      if (map.getLayer(routeLayerId)) map.removeLayer(routeLayerId);
      if (map.getSource(routeSourceId)) map.removeSource(routeSourceId);
    };
  }, [mapRef, start, end]);

  return null; // No UI needed, just modifies the map
};

export default Directions;
