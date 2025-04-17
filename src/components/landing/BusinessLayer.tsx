import { useEffect } from "react";
// @ts-ignore
import { MapRef } from "react-map-gl";
import { FeatureCollection, Point } from "geojson";

interface Business {
  name: string;
  location: {
    lng: number;
    lat: number;
  };
}

interface BusinessLayerProps {
  mapRef: React.RefObject<MapRef>;
  businesses: Business[];
  isDarkMode?: boolean;
}

const BusinessLayer = ({
  mapRef,
  businesses,
  isDarkMode = false,
}: BusinessLayerProps) => {
  useEffect(() => {
    if (!mapRef.current || businesses.length === 0) return;

    const geojsonData: FeatureCollection<Point> = {
      type: "FeatureCollection",
      features: businesses.map((business) => ({
        type: "Feature",
        properties: {
          name: business.name,
          icon: "shop",
          // Add property for dark mode
          isDarkMode,
        },
        geometry: {
          type: "Point",
          coordinates: [business.location.lng, business.location.lat],
        },
      })),
    };

    // Add or update source
    if (mapRef.current.getSource("businesses")) {
      (
        mapRef.current.getSource("businesses") as mapboxgl.GeoJSONSource
      ).setData(geojsonData);
    } else {
      mapRef.current.addSource("businesses", {
        type: "geojson",
        data: geojsonData,
      });

      // Load custom image for marker
      mapRef.current.loadImage(
        "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        (error: Error | null, image: HTMLImageElement | undefined) => {
          if (error) throw error;
          if (!mapRef.current?.hasImage("custom-marker")) {
            mapRef.current?.addImage("custom-marker", image!);
          }
        }
      );
    }

    // Remove existing layer if it exists
    if (mapRef.current.getLayer("business-icons")) {
      mapRef.current.removeLayer("business-icons");
    }

    // Add layer with theme-aware styling
    mapRef.current.addLayer({
      id: "business-icons",
      type: "symbol",
      source: "businesses",
      layout: {
        "icon-image": "shop",
        "icon-size": isDarkMode ? 2.2 : 2.2,
        "text-field": ["get", "name"],
        "text-offset": [0, 1.5],
        "text-anchor": "top",
        "text-size": 12,
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      },
      paint: {
        "text-color": isDarkMode ? "#ffffff" : "#333333",
        "text-halo-color": isDarkMode ? "#000000" : "#ffffff",
        "text-halo-width": 1,
        "text-halo-blur": 0.5,
      },
    });

    // Update layer when theme changes
    if (mapRef.current.getLayer("business-icons")) {
      mapRef.current.setPaintProperty(
        "business-icons",
        "text-color",
        isDarkMode ? "#ffffff" : "#333333"
      );
      mapRef.current.setPaintProperty(
        "business-icons",
        "text-halo-color",
        isDarkMode ? "#000000" : "#ffffff"
      );
      mapRef.current.setLayoutProperty(
        "business-icons",
        "icon-image",
        isDarkMode ? "shop" : "shop"
      );
      mapRef.current.setLayoutProperty(
        "business-icons",
        "icon-size",
        isDarkMode ? 2.2 : 2.2
      );
    }
  }, [mapRef, businesses, isDarkMode]);

  return null;
};

export default BusinessLayer;
