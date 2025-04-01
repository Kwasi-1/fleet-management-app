import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

export default function ShipmentMap({ pickup, destination }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: pickup,
      zoom: 4,
    });

    // Add Pickup Marker
    new mapboxgl.Marker({ color: "blue" })
      .setLngLat(pickup)
      .setPopup(new mapboxgl.Popup().setText("Pickup"))
      .addTo(map.current);

    // Add Destination Marker
    new mapboxgl.Marker({ color: "black" })
      .setLngLat(destination)
      .setPopup(new mapboxgl.Popup().setText("Dropoff"))
      .addTo(map.current);

    // Draw Route Line
    map.current.on("load", () => {
      map.current.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [pickup, destination],
          },
        },
      });

      map.current.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#619B7D",
          "line-width": 4,
        },
      });
    });

    return () => {
      if (map.current) map.current.remove();
    };
  }, [pickup, destination]);

  return (
    <div
      ref={mapContainer}
      className="w-full h-[200px] rounded-md border"
      style={{ minHeight: "200px" }}
    />
  );
}
