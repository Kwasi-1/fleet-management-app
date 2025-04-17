import { useRef, useEffect, useState, RefObject } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import BusinessLayer from "./BusinessLayer";
import GeocoderComponent from "./GeocoderComponent";
import DeliveryInfo from "./DeliveryInfo";
import Navbar from "./Navbar";
import { dummy_data } from "../../db";
import { useLocation } from "react-router-dom";
import ShipmentNotificationCard from "./ShipmentNotificationCard";

// Set Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

const INITIAL_CENTER: [number, number] = [
  -0.16912933535458255, 5.678395107981338,
];
const INITIAL_ZOOM = 17.12;

interface RouteData {
  coordinates: [number, number][];
  distance: number;
  duration: number;
}

interface Business {
  name: string;
  location: {
    lng: number;
    lat: number;
  };
}

interface ShipmentCoordinates {
  pickup: [number, number];
  destination: [number, number];
}

interface ShipmentDetails {
  id: string;
  status: string;
  pickup: string;
  destination: string;
  customerName: string;
  rate: string;
  weight: string;
}

const useNonNullableRef = <T,>(initialValue: T) => {
  const ref = useRef<T>(initialValue);
  return ref as RefObject<T>;
};

const MapComponent = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useNonNullableRef<HTMLDivElement>(null!);
  const geocoderContainerRef = useNonNullableRef<HTMLDivElement>(null!);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [showGeocoder, setShowGeocoder] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const location = useLocation();

  const [routeData, setRouteData] = useState<RouteData | null>(null);

  const getOptimalRoute = async (
    pickup: [number, number],
    destination: [number, number]
  ) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup[0]},${pickup[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      return {
        coordinates: data.routes[0].geometry.coordinates,
        distance: data.routes[0].distance,
        duration: data.routes[0].duration,
      };
    } catch (error) {
      console.error("Error fetching route:", error);
      return null;
    }
  };

  const [shipmentData, setShipmentData] = useState<{
    coordinates: ShipmentCoordinates | null;
    details: ShipmentDetails | null;
  }>({ coordinates: null, details: null });

  const handleShipmentSelect = (shipment: {
    coordinates: ShipmentCoordinates;
    details: ShipmentDetails;
  }) => {
    setShipmentData({
      coordinates: shipment.coordinates,
      details: shipment.details,
    });
  };

  // Handle location state changes
  useEffect(() => {
    if (location.state) {
      setShipmentData({
        coordinates: location.state.shipmentCoordinates,
        details: location.state.shipmentDetails,
      });
    }
  }, [location.state]);

  // Helper function to fit map to both points
  const fitMapToPoints = (
    pickup: [number, number],
    destination: [number, number]
  ) => {
    if (!mapRef.current) return;

    const bounds = new mapboxgl.LngLatBounds()
      .extend(pickup)
      .extend(destination);

    const padding = {
      top: 100,
      bottom: 100,
      left: 100,
      right: 100,
    };

    mapRef.current.fitBounds(bounds, {
      padding: padding,
      maxZoom: 15,
      pitch: 60,
      bearing: -20,
    });
  };

  // Helper function to add shipment markers and route
  const addShipmentMarkersAndRoute = async () => {
    if (!mapRef.current || !shipmentData.coordinates) return;

    const { pickup, destination } = shipmentData.coordinates;

    // Get optimal route
    const optimalRoute = await getOptimalRoute(pickup, destination);
    if (!optimalRoute) return;

    setRouteData(optimalRoute);

    // Clear existing markers and route
    document
      .querySelectorAll(".mapboxgl-marker")
      .forEach((marker) => marker.remove());
    if (mapRef.current.getLayer("route")) mapRef.current.removeLayer("route");
    if (mapRef.current.getSource("route")) mapRef.current.removeSource("route");

    // Add markers
    new mapboxgl.Marker({ color: "blue" })
      .setLngLat(pickup)
      .setPopup(
        new mapboxgl.Popup().setText(
          `Pickup: ${shipmentData.details?.pickup || ""}`
        )
      )
      .addTo(mapRef.current);

    new mapboxgl.Marker({ color: "black" })
      .setLngLat(destination)
      .setPopup(
        new mapboxgl.Popup().setText(
          `Destination: ${shipmentData.details?.destination || ""}`
        )
      )
      .addTo(mapRef.current);

    // Add route layer
    mapRef.current.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: optimalRoute.coordinates,
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
        "line-opacity": 0.75,
      },
    });

    // Fit map to show the entire route
    const bounds = optimalRoute.coordinates.reduce((bounds, coord) => {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(optimalRoute.coordinates[0], optimalRoute.coordinates[0]));

    mapRef.current.fitBounds(bounds, {
      padding: { top: 100, bottom: 100, left: 100, right: 100 },
      maxZoom: 15,
      pitch: 60,
      bearing: -20,
    });
  };

  // Modified useEffect for handling shipment data changes
  useEffect(() => {
    if (shipmentData.coordinates && mapRef.current?.loaded()) {
      addShipmentMarkersAndRoute();
    }
  }, [shipmentData.coordinates]);

  // Initialize and manage the map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize the map if it doesn't exist
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: isDarkMode
          ? "mapbox://styles/mapbox/dark-v11"
          : "mapbox://styles/mapbox/light-v11",
        pitch: 60,
        bearing: -20,
        antialias: true,
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM,
      });

      mapRef.current.addControl(new mapboxgl.NavigationControl());

      mapRef.current.on("load", () => {
        if (!mapRef.current) return;

        // Add 3D buildings layer
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

        // Load business data
        const data = { ...dummy_data["foundry-ecosytem"] };
        setBusinesses([
          ...data.wholesalers,
          ...data.microfinance,
          ...data.market_businesses,
        ]);

        // Add shipment markers and route if coordinates exist
        if (shipmentData.coordinates) {
          addShipmentMarkersAndRoute();
        }
      });
    } else {
      // If map already exists, just update its style and position
      mapRef.current.setStyle(
        isDarkMode
          ? "mapbox://styles/mapbox/dark-v11"
          : "mapbox://styles/mapbox/light-v11"
      );

      if (shipmentData.coordinates) {
        // Remove existing route layer if it exists
        if (mapRef.current.getLayer("route")) {
          mapRef.current.removeLayer("route");
        }
        if (mapRef.current.getSource("route")) {
          mapRef.current.removeSource("route");
        }

        addShipmentMarkersAndRoute();
      } else {
        // If no coordinates, reset to initial view
        mapRef.current.flyTo({
          center: INITIAL_CENTER,
          zoom: INITIAL_ZOOM,
          essential: true,
          pitch: 60,
          bearing: -20,
        });
      }
    }

    return () => {
      // Cleanup on unmount
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isDarkMode, shipmentData.coordinates]);

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

  const isMap = location.pathname === "/map";

  return (
    <div
      className={`min-h-screen md:h-screen  h-screen w-screen overflow-hidden ${
        isDarkMode ? "dark bg-black/80 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      <Navbar
        onSearchClick={() => setShowGeocoder(!showGeocoder)}
        onToggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />
      {showGeocoder && (
        <GeocoderComponent
          mapRef={mapRef as RefObject<mapboxgl.Map>}
          businesses={businesses}
          geocoderContainerRef={geocoderContainerRef}
          styleProps={`absolute ${
            isMap ? "top-[0.5vw]" : "top-[1.4vw]"
          } right-[10vw] z-100`}
        />
      )}
      <div
        className={` ${
          isMap
            ? "mx-0 md:mx-0 h-[92vh]"
            : "mx-5 md:mx-10 h-[65vh] md:h-[75vh] "
        } relative overflow-hidden`}
      >
        <BusinessLayer
          mapRef={mapRef as RefObject<mapboxgl.Map>}
          businesses={businesses}
        />
        <div
          id="map-container"
          ref={mapContainerRef}
          className={` ${
            isMap ? "h-full border-t" : "h-[65vh] md:h-[75vh] rounded-xl border"
          } border-gray-200`}
        />
      </div>
      {shipmentData.details && (
        <DeliveryInfo shipmentData={{ details: shipmentData.details }} />
      )}
      <ShipmentNotificationCard onShipmentSelect={handleShipmentSelect} />
    </div>
  );
};

export default MapComponent;
