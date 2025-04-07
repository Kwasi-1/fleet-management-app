import { useEffect } from "react";
import { MutableRefObject } from "react";
import { transformDummyData } from "./dataUtils";

interface Business {
  name: string;
  type: "wholesaler" | "microfinance" | "market_business";
  location: {
    lat: number;
    lng: number;
  };
}

interface BusinessLayerProps {
  mapRef: MutableRefObject<any>;
  businesses: Business[];
}

const BusinessLayer = ({ mapRef, businesses }: BusinessLayerProps) => {
  useEffect(() => {
    if (!mapRef.current || businesses.length === 0) return;

    // Define Mapbox icons for each business type
    const getIcon = (type: string) => {
      switch (type) {
        case "wholesaler":
          return "commercial"; // Mapbox Maki icon
        case "microfinance":
          return "bank"; // Mapbox Maki icon
        case "market_business":
          return "shop"; // Mapbox Maki icon
        default:
          return "marker";
      }
    };

    // Define marker colors
    const getColor = (type: string) => {
      switch (type) {
        case "wholesaler":
          return "#3b82f6"; // Blue
        case "microfinance":
          return "#10b981"; // Green
        case "market_business":
          return "#f97316"; // Orange
        default:
          return "#ccc"; // Default gray
      }
    };

    // Convert business data to GeoJSON
    const geojsonData = {
      type: "FeatureCollection",
      features: businesses.map((business) => ({
        type: "Feature",
        properties: {
          name: business.name,
          icon: getIcon(business.type),
          color: getColor(business.type),
        },
        geometry: {
          type: "Point",
          coordinates: [business.location.lng, business.location.lat],
        },
      })),
    };

    // Check if source exists, then update or add it
    if (mapRef.current.getSource("businesses")) {
      mapRef.current.getSource("businesses").setData(geojsonData);
    } else {
      mapRef.current.addSource("businesses", {
        type: "geojson",
        data: geojsonData,
      });

      // Add Symbol Layer
      mapRef.current.addLayer({
        id: "business-icons",
        type: "symbol",
        source: "businesses",
        layout: {
          "icon-image": ["get", "icon"],
          "icon-size": 2,
          "text-field": ["get", "name"],
          "text-offset": [0, 1.5],
          "text-anchor": "top",
          "text-size": 14,
        },
        paint: {
          "text-color": "#ffffff",
          "text-halo-color": "#000000",
          "text-halo-width": 1,
        },
      });

      // Add Circle Layer for color coding
      mapRef.current.addLayer({
        id: "business-circles",
        type: "circle",
        source: "businesses",
        paint: {
          "circle-color": ["get", "color"],
          "circle-radius": 10,
          "circle-opacity": 0.8,
        },
      });
    }
  }, [mapRef, businesses]);

  return null;
};

export default BusinessLayer;
