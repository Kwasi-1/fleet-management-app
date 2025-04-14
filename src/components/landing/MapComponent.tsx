// MapComponent.tsx
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import BusinessLayer from "./BusinessLayer";
import GeocoderComponent from "./GeocoderComponent";
import DeliveryInfo from "./DeliveryInfo";
import Navbar from "./Navbar";
import { dummy_data } from "../../db";

const INITIAL_CENTER: [number, number] = [
  -0.16912933535458255, 5.678395107981338,
];
const INITIAL_ZOOM = 17.12;

interface Business {
  name: string;
  location: {
    lng: number;
    lat: number;
  };
}

interface MapComponentProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  showRoute?: {
    pickup: [number, number];
    destination: [number, number];
  };
  hideNavbar?: boolean;
  hideDeliveryInfo?: boolean;
}

const MapComponent = ({
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  showRoute,
  hideNavbar = false,
  hideDeliveryInfo = false,
}: MapComponentProps) => {
  const mapRef = useRef<mapboxgl.Map>(null!);
  const mapContainerRef = useRef<HTMLDivElement>(null!);
  const geocoderContainerRef = useRef<HTMLDivElement>(null!);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [showGeocoder, setShowGeocoder] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: isDarkMode
        ? "mapbox://styles/mapbox/dark-v11"
        : "mapbox://styles/mapbox/light-v11",
      center: initialCenter,
      zoom: initialZoom,
      pitch: showRoute ? 0 : 60, // Less pitch for route view
      bearing: showRoute ? 0 : -20, // Straight bearing for route view
      antialias: true,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    mapRef.current.on("load", () => {
      if (!mapRef.current) return;

      // Add 3D buildings only if not showing route
      if (!showRoute) {
        mapRef.current.addLayer({
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",
            "fill-extrusion-height": [
              "interpolate",
              ["linear"],
              ["zoom"],
              15,
              0,
              16,
              ["get", "height"],
            ],
            "fill-extrusion-base": [
              "case",
              ["has", "min_height"],
              ["get", "min_height"],
              0,
            ],
            "fill-extrusion-opacity": 0.6,
          },
        });
      }

      // Add route if specified
      if (showRoute) {
        addRouteToMap(showRoute.pickup, showRoute.destination);
      }

      const data = { ...dummy_data["foundry-ecosytem"] };
      setBusinesses([
        ...data.wholesalers,
        ...data.microfinance,
        ...data.market_businesses,
      ]);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [isDarkMode, showRoute]);

  const addRouteToMap = (
    pickup: [number, number],
    destination: [number, number]
  ) => {
    if (!mapRef.current) return;

    // Add markers
    new mapboxgl.Marker({ color: "#3b82f6" })
      .setLngLat(pickup)
      .setPopup(new mapboxgl.Popup().setHTML("<h3>Pickup Location</h3>"))
      .addTo(mapRef.current);

    new mapboxgl.Marker({ color: "#ef4444" })
      .setLngLat(destination)
      .setPopup(new mapboxgl.Popup().setHTML("<h3>Destination</h3>"))
      .addTo(mapRef.current);

    // Add route line
    mapRef.current.addSource("route", {
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

    mapRef.current.addLayer({
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

    // Fit bounds to show both points
    const bounds = new mapboxgl.LngLatBounds();
    bounds.extend(pickup);
    bounds.extend(destination);
    mapRef.current.fitBounds(bounds, { padding: 50 });
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "dark bg-black/80 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      {!hideNavbar && (
        <Navbar
          onSearchClick={() => setShowGeocoder(!showGeocoder)}
          onToggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
      )}

      {showGeocoder && !hideNavbar && (
        <GeocoderComponent
          mapRef={mapRef}
          businesses={businesses}
          geocoderContainerRef={geocoderContainerRef}
          styleProps="absolute top-[1.4vw] right-[10vw] z-100"
        />
      )}

      <div
        className={`${
          hideNavbar ? "h-screen" : "h-[65vh] md:h-[75vh]"
        } mx-5 md:mx-10 relative`}
      >
        <BusinessLayer mapRef={mapRef} businesses={businesses} />
        <div
          id="map-container"
          ref={mapContainerRef}
          className={`${
            hideNavbar ? "h-full" : "h-[65vh] md:h-[75vh]"
          } rounded-xl border`}
        />
      </div>

      {!hideDeliveryInfo && <DeliveryInfo />}
    </div>
  );
};

export default MapComponent;
