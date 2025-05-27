/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState, RefObject, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import BusinessLayer from "./BusinessLayer";
import GeocoderComponent from "./GeocoderComponent";
import DeliveryInfo from "./DeliveryInfo";
import Navbar from "./Navbar";
import { dummy_data } from "../../db";
import { useLocation } from "react-router-dom";
import ShipmentNotificationCard from "./ShipmentNotificationCard";
import { Zap, MapPin, Clock, DollarSign, Navigation, X } from "lucide-react";
import Button from "../common/Button";

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

interface EVStation {
  id: string;
  name: string;
  coordinates: [number, number];
  address: string;
  chargerTypes: string[];
  availableChargers: number;
  totalChargers: number;
  pricePerKwh: number;
  operatingHours: string;
}

interface RouteInfo {
  distance: number;
  duration: number;
  geometry: any;
}

interface ShipmentData {
  coordinates: ShipmentCoordinates | null;
  details: ShipmentDetails | null;
}

const useNonNullableRef = <T,>(initialValue: T): RefObject<T> => {
  const ref = useRef<T>(initialValue);
  return ref as RefObject<T>;
};

const MapComponent: React.FC = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useNonNullableRef<HTMLDivElement>(null!);
  const geocoderContainerRef = useNonNullableRef<HTMLDivElement>(null!);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [showGeocoder, setShowGeocoder] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const location = useLocation();

  // Removed unused routeData state
  const [isShipmentClick, setIsShipmentClick] = useState<boolean>(false);
  const [shipmentData, setShipmentData] = useState<ShipmentData>({
    coordinates: null,
    details: null,
  });

  // EV Charging Map State
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [nearbyStations, setNearbyStations] = useState<EVStation[]>([]);
  const [selectedStation, setSelectedStation] = useState<EVStation | null>(
    null
  );
  const [currentRoute, setCurrentRoute] = useState<RouteInfo | null>(null);
  const [isNavigating, setIsNavigating] = useState<boolean>(false);
  const [routeLoading, setRouteLoading] = useState<boolean>(false);
  const [showEVStations, setShowEVStations] = useState<boolean>(false);
  const pendingRouteRequest = useRef<AbortController | null>(null);

  // Memoized function to get optimal route
  const getOptimalRoute = useCallback(
    async (
      pickup: [number, number],
      destination: [number, number]
    ): Promise<RouteData | null> => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup[0]},${pickup[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
        );
        const data = await response.json();

        if (data.routes && data.routes[0]) {
          return {
            coordinates: data.routes[0].geometry.coordinates,
            distance: data.routes[0].distance,
            duration: data.routes[0].duration,
          };
        }
        return null;
      } catch (error) {
        console.error("Error fetching route:", error);
        return null;
      }
    },
    []
  );

  // Generate mock EV stations
  const generateMockStations = useCallback(
    (centerLng: number, centerLat: number, count: number = 15): EVStation[] => {
      const stations: EVStation[] = [];
      const radius = 0.02; // ~2km radius for demo

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * 2 * Math.PI;
        const distance = Math.random() * radius;

        const lng =
          centerLng + distance * Math.cos(angle) + (Math.random() - 0.5) * 0.01;
        const lat =
          centerLat + distance * Math.sin(angle) + (Math.random() - 0.5) * 0.01;

        stations.push({
          id: `station-${i}`,
          name: `${
            ["SuperCharge", "PowerUp", "QuickVolt", "EcoCharge", "RapidEV"][
              Math.floor(Math.random() * 5)
            ]
          } Station`,
          coordinates: [lng, lat],
          address: `${Math.floor(Math.random() * 9999)} ${
            ["Main St", "Oak Ave", "Park Blvd", "First St"][
              Math.floor(Math.random() * 4)
            ]
          }`,
          chargerTypes:
            Math.random() > 0.5
              ? ["Type 2", "CCS"]
              : ["Type 2", "CCS", "CHAdeMO"],
          availableChargers: Math.floor(Math.random() * 4) + 1,
          totalChargers: Math.floor(Math.random() * 4) + 4,
          pricePerKwh: Number((Math.random() * 0.4 + 0.25).toFixed(2)),
          operatingHours: Math.random() > 0.3 ? "24/7" : "6:00 AM - 10:00 PM",
        });
      }

      return stations;
    },
    []
  );

  // Get user location
  const getUserLocation = useCallback((): Promise<[number, number]> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(INITIAL_CENTER);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.longitude, position.coords.latitude]);
        },
        () => {
          resolve(INITIAL_CENTER);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    });
  }, []);

  // Get route to EV station
  const getRoute = useCallback(
    async (
      start: [number, number],
      end: [number, number]
    ): Promise<RouteInfo | null> => {
      try {
        setRouteLoading(true);

        if (pendingRouteRequest.current) {
          pendingRouteRequest.current.abort();
        }

        const controller = new AbortController();
        pendingRouteRequest.current = controller;

        const query = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
          { method: "GET", signal: controller.signal }
        );

        const json = await query.json();

        if (json.routes && json.routes.length > 0) {
          const route = json.routes[0];
          return {
            distance: route.distance,
            duration: route.duration,
            geometry: route.geometry,
          };
        }
        return null;
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching route:", error);
        }
        return null;
      } finally {
        pendingRouteRequest.current = null;
        setRouteLoading(false);
      }
    },
    []
  );

  // Add route to map
  const addRouteToMap = useCallback((routeGeometry: any) => {
    if (!mapRef.current) return;

    if (mapRef.current.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }

    mapRef.current.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: routeGeometry,
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
        "line-color": "#3B82F6",
        "line-width": 5,
        "line-opacity": 0.75,
      },
    });
  }, []);

  // Clear route from map
  const clearRoute = useCallback(() => {
    if (!mapRef.current) return;

    if (mapRef.current.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }
    setCurrentRoute(null);
    setIsNavigating(false);
  }, []);

  // Handle navigation to EV station
  const handleNavigateToStation = useCallback(async () => {
    if (!selectedStation || !userLocation) return;

    const route = await getRoute(userLocation, selectedStation.coordinates);
    if (route) {
      setCurrentRoute(route);
      setIsNavigating(true);
      addRouteToMap(route.geometry);

      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend(userLocation);
      bounds.extend(selectedStation.coordinates);

      mapRef.current?.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
      });
    }
  }, [selectedStation, userLocation, getRoute, addRouteToMap]);

  // Format distance
  const formatDistance = useCallback((meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    }
    return `${(meters / 1000).toFixed(1)} km`;
  }, []);

  // Format duration
  const formatDuration = useCallback((seconds: number): string => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }, []);

  // Handle shipment selection
  const handleShipmentSelect = useCallback(
    (shipment: {
      coordinates: ShipmentCoordinates;
      details: ShipmentDetails;
    }) => {
      setShipmentData({
        coordinates: shipment.coordinates,
        details: shipment.details,
      });
      setIsShipmentClick(true);
    },
    []
  );

  // Handle location state changes
  useEffect(() => {
    if (location.state) {
      setShipmentData({
        coordinates: location.state.shipmentCoordinates || null,
        details: location.state.shipmentDetails || null,
      });
    }
  }, [location.state]);

  // Updated clearMarkersAndRoute function
  const clearMarkersAndRoute = useCallback(() => {
    if (!mapRef.current) return;

    // Clear existing markers (except user location and EV stations)
    document
      .querySelectorAll(".mapboxgl-marker:not(.ev-marker)")
      .forEach((marker) => marker.remove());

    // Clear existing route
    if (mapRef.current.getLayer("route")) mapRef.current.removeLayer("route");
    if (mapRef.current.getSource("route")) mapRef.current.removeSource("route");
  }, []);

  // Updated addShipmentMarkersAndRoute with proper dependencies
  const addShipmentMarkersAndRoute = useCallback(async () => {
    if (!mapRef.current || !shipmentData.coordinates || !shipmentData.details)
      return;

    await clearMarkersAndRoute(); // Wait for cleanup to complete

    const { pickup, destination } = shipmentData.coordinates;

    // Get optimal route
    const optimalRoute = await getOptimalRoute(pickup, destination);
    if (!optimalRoute) return;

    // setRouteData(optimalRoute); // Removed unused state update

    // Add markers with proper details from shipmentData
    new mapboxgl.Marker({ color: "blue" })
      .setLngLat(pickup)
      .setPopup(
        new mapboxgl.Popup().setText(`Pickup: ${shipmentData.details.pickup}`)
      )
      .addTo(mapRef.current);

    new mapboxgl.Marker({ color: "black" })
      .setLngLat(destination)
      .setPopup(
        new mapboxgl.Popup().setText(
          `Destination: ${shipmentData.details.destination}`
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
  }, [shipmentData, getOptimalRoute, clearMarkersAndRoute]);

  // Initialize and manage the map - runs only once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map immediately with hardcoded center
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

    // Get user location and update map
    const updateUserLocation = async () => {
      const location = await getUserLocation();
      setUserLocation(location);

      // If we got a different location than our initial center, update the map
      if (
        location[0] !== INITIAL_CENTER[0] ||
        location[1] !== INITIAL_CENTER[1]
      ) {
        mapRef.current?.flyTo({
          center: location,
          zoom: INITIAL_ZOOM,
          essential: true,
        });
      }
    };

    mapRef.current.on("load", async () => {
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

      // Get user location and add EV stations
      const location = await getUserLocation();
      setUserLocation(location);
      const stations = generateMockStations(location[0], location[1]);
      setNearbyStations(stations);

      // Add user location marker
      new mapboxgl.Marker({ color: "#3B82F6" })
        .setLngLat(location)
        .setPopup(
          new mapboxgl.Popup().setHTML(
            '<div class="font-semibold">Your Location</div>'
          )
        )
        .addTo(mapRef.current);

      // Add EV station markers
      stations.forEach((station) => {
        const el = document.createElement("div");
        el.className = "ev-marker";
        el.innerHTML = "⚡";
        el.style.cssText = `
          background: #10B981;
          color: white;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        `;

        new mapboxgl.Marker(el)
          .setLngLat(station.coordinates)
          .addTo(mapRef.current!);

        el.addEventListener("click", () => {
          setSelectedStation(station);
          setShowEVStations(true);

          if (userLocation) {
            mapRef.current?.flyTo({
              center: userLocation,
              zoom: 13,
            });
          }
        });
      });
    });

    // Start getting user location after map is initialized
    updateUserLocation();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isDarkMode, mapContainerRef, generateMockStations, getUserLocation]);

  // Handle theme changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(
        isDarkMode
          ? "mapbox://styles/mapbox/dark-v11"
          : "mapbox://styles/mapbox/light-v11"
      );
    }
  }, [isDarkMode]);

  // Updated shipment data effect
  useEffect(() => {
    if (!mapRef.current) return;

    const handleMapLoad = () => {
      if (shipmentData.coordinates) {
        addShipmentMarkersAndRoute();
      } else {
        mapRef.current?.flyTo({
          center: userLocation || INITIAL_CENTER,
          zoom: INITIAL_ZOOM,
          essential: true,
          pitch: 60,
          bearing: -20,
        });
      }
    };

    if (mapRef.current.loaded()) {
      handleMapLoad();
    } else {
      mapRef.current.once("load", handleMapLoad);
    }
  }, [shipmentData, addShipmentMarkersAndRoute, userLocation]);

  // Toggle EV stations visibility
  // const toggleEVStations = useCallback(() => {
  //   setShowEVStations(!showEVStations);
  //   if (!showEVStations && userLocation) {
  //     mapRef.current?.flyTo({
  //       center: userLocation,
  //       zoom: 13,
  //     });
  //   }
  // }, [showEVStations, userLocation]);

  // Add EV stations search term to geocoder
  const addEVSearchTerm = useCallback(() => {
    if (!geocoderContainerRef.current) return;

    const button = document.createElement("button");
    button.className = "mapboxgl-ctrl-geocoder--button";
    button.innerHTML = "EV Stops Near Me";
    button.onclick = () => {
      setShowEVStations(true);
      if (userLocation) {
        mapRef.current?.flyTo({
          center: userLocation,
          zoom: 13,
        });
      }
      if (nearbyStations.length > 0) {
        setSelectedStation(nearbyStations[0]);
      }
    };

    const existingButton = geocoderContainerRef.current.querySelector(
      ".mapboxgl-ctrl-geocoder--button"
    );
    if (existingButton) {
      geocoderContainerRef.current.replaceChild(button, existingButton);
    } else {
      geocoderContainerRef.current.appendChild(button);
    }
  }, [geocoderContainerRef, userLocation, nearbyStations]);

  useEffect(() => {
    if (showGeocoder) {
      addEVSearchTerm();
    }
  }, [showGeocoder, addEVSearchTerm]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", newTheme ? "dark" : "light");
      }
      return newTheme;
    });
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [isDarkMode]);

  const isMap = location.pathname === "/map";

  return (
    <div
      className={`min-h-screen md:h-screen h-screen w-screen overflow-hidden ${
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
        className={`${
          isMap ? "mx-0 md:mx-0 h-[92vh]" : "mx-5 md:mx-0 h-[65vh] md:h-[92vh]"
        } relative overflow-hidden`}
      >
        {/* Top section (map) - takes remaining height */}
        <BusinessLayer
          mapRef={mapRef as RefObject<mapboxgl.Map>}
          businesses={businesses}
        />
        <div
          id="map-container"
          ref={mapContainerRef}
          className={`${
            isMap
              ? "h-full border-t"
              : "h-[65vh] md:h-[92vh] rounded-xl md:rounded-none border"
          } border-gray-200`}
        />
        {/* EV Stations UI Elements */}
        {showEVStations && (
          <>
            {/* Station list panel - now on the left side */}
            <div className="absolute top-0 left-0 w-80 h-[calc(92vh-300px)] bg-white shadow-lg z-10">
              <div className="p-4 border-b sticky top-0 bg-white z-20">
                <h2 className="text-base font-semibold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  Nearby EV Stations ({nearbyStations.length})
                </h2>
              </div>
              <div className="p-2 h-[calc(100%-56px)] overflow-y-auto">
                {nearbyStations.map((station) => (
                  <div
                    key={station.id}
                    className={`p-3 rounded-lg mb-1 cursor-pointer transition-colors ${
                      selectedStation?.id === station.id
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      setSelectedStation(station);
                      if (isNavigating) {
                        clearRoute();
                      }
                      mapRef.current?.flyTo({
                        center: station.coordinates,
                        zoom: 15,
                        // pitch: 40,
                        // bearing: -20,
                      });
                      if (isNavigating && userLocation) {
                        mapRef.current?.once("moveend", async () => {
                          const route = await getRoute(
                            userLocation,
                            station.coordinates
                          );
                          if (route) {
                            setCurrentRoute(route);
                            addRouteToMap(route.geometry);
                            setIsNavigating(true);
                          }
                        });
                      }
                    }}
                  >
                    <div className="font-medium text-sm text-gray-900">
                      {station.name}
                    </div>
                    <div className="text-[13px] text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {station.address}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs">
                      <span className="flex items-center gap-1">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            station.availableChargers > 0
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        {station.availableChargers}/{station.totalChargers}{" "}
                        available
                      </span>
                      <span className="text-gray-500">
                        ${station.pricePerKwh}/kWh
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected station details */}
            {selectedStation && (
              <div className="absolute bottom-0 left-0 right-4 bg-white shadow-lg p-4 h-[300px] md:right-auto md:w-80 border-t z-60">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-base font-semibold">
                    {selectedStation.name}
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedStation(null);
                      clearRoute();
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{selectedStation.address}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        selectedStation.availableChargers > 0
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-sm">
                      {selectedStation.availableChargers} of{" "}
                      {selectedStation.totalChargers} chargers available
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">
                      {selectedStation.operatingHours}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">
                      ${selectedStation.pricePerKwh} per kWh
                    </span>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="text-sm text-gray-600 mb-1">
                      Charger Types:
                    </div>
                    <div className="flex gap-2">
                      {selectedStation.chargerTypes.map((type) => (
                        <span
                          key={type}
                          className="px-2 py-1 bg-gray-100 rounded text-xs"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleNavigateToStation}
                      disabled={routeLoading}
                      className="flex-1 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {routeLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Loading Route...
                        </>
                      ) : (
                        <>
                          <Navigation className="w-4 h-4" />
                          {isNavigating
                            ? "Update Route"
                            : "Navigate to Station"}
                        </>
                      )}
                    </Button>
                    {isNavigating && (
                      <button
                        onClick={clearRoute}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation info panel */}
            {isNavigating && currentRoute && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 flex items-center gap-4 z-10">
                <div className="flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      {formatDistance(currentRoute.distance)} •{" "}
                      {formatDuration(currentRoute.duration)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Navigating to {selectedStation?.name}
                    </div>
                  </div>
                </div>
                <button
                  onClick={clearRoute}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-10">
              <div className="text-sm font-medium mb-2">Legend</div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <span>Your Location</span>
              </div>
              <div className="flex items-center gap-2 text-xs mt-1">
                <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">
                  ⚡
                </div>
                <span>EV Charging Station</span>
              </div>
              {isNavigating && (
                <div className="flex items-center gap-2 text-xs mt-1">
                  <div className="w-4 h-1 bg-blue-600 rounded"></div>
                  <span>Navigation Route</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {!showEVStations && (
        <>
          {shipmentData.details ? (
            <DeliveryInfo
              shipmentData={{ details: shipmentData.details }}
              isShipment={isShipmentClick}
            />
          ) : (
            <DeliveryInfo isShipment={isShipmentClick} />
          )}

          {!isMap && (
            <ShipmentNotificationCard onShipmentSelect={handleShipmentSelect} />
          )}
        </>
      )}
    </div>
  );
};

export default MapComponent;
