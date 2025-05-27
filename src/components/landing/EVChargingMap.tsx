import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapPin, Zap, Clock, DollarSign, Navigation, X } from "lucide-react";

// Set your Mapbox access token here
mapboxgl.accessToken =
  "pk.eyJ1Ijoia3dhc2ktMSIsImEiOiJjbThkNG15anAyYXF2MmtzOGJneW55cmVnIn0.uRUn_veAFyZ8u1CxkRGnWg";

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

const EVChargingMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [nearbyStations, setNearbyStations] = useState<EVStation[]>([]);
  const [selectedStation, setSelectedStation] = useState<EVStation | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentRoute, setCurrentRoute] = useState<RouteInfo | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);

  // Mock data generator
  const generateMockStations = (
    centerLng: number,
    centerLat: number,
    count: number = 15
  ): EVStation[] => {
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
  };

  // Get user location
  const getUserLocation = (): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        // Fallback to a default location (San Francisco)
        resolve([-122.4194, 37.7749]);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.longitude, position.coords.latitude]);
        },
        () => {
          // Fallback to a default location
          resolve([-122.4194, 37.7749]);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    });
  };

  const pendingRouteRequest = useRef<AbortController | null>(null);

  // Modify your getRoute function to support cancellation
  const getRoute = async (
    start: [number, number],
    end: [number, number]
  ): Promise<RouteInfo | null> => {
    try {
      setRouteLoading(true);

      // Cancel any pending request
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
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error fetching route:", error);
      }
      return null;
    } finally {
      pendingRouteRequest.current = null;
      setRouteLoading(false);
    }
  };

  // Add route to map
  const addRouteToMap = (routeGeometry: any) => {
    if (!map.current) return;

    // Remove existing route if any
    if (map.current.getSource("route")) {
      map.current.removeLayer("route");
      map.current.removeSource("route");
    }

    // Add route source and layer
    map.current.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: routeGeometry,
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
        "line-color": "#3B82F6",
        "line-width": 5,
        "line-opacity": 0.75,
      },
    });
  };

  // Clear route from map
  const clearRoute = () => {
    if (!map.current) return;

    if (map.current.getSource("route")) {
      map.current.removeLayer("route");
      map.current.removeSource("route");
    }
    setCurrentRoute(null);
    setIsNavigating(false);
  };

  // Handle navigation to station
  const handleNavigateToStation = async () => {
    if (!selectedStation || !userLocation) return;

    const route = await getRoute(userLocation, selectedStation.coordinates);
    if (route) {
      setCurrentRoute(route);
      setIsNavigating(true);
      addRouteToMap(route.geometry);

      // Fit map to show both user location and destination
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend(userLocation);
      bounds.extend(selectedStation.coordinates);

      map.current?.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
      });
    }
  };

  // Format distance
  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    }
    return `${(meters / 1000).toFixed(1)} km`;
  };

  // Format duration
  const formatDuration = (seconds: number): string => {
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Initialize map and load stations
  useEffect(() => {
    const initializeMap = async () => {
      try {
        // Check if Mapbox token is set
        if (
          !mapboxgl.accessToken ||
          mapboxgl.accessToken === "YOUR_MAPBOX_ACCESS_TOKEN"
        ) {
          setError(
            "Mapbox access token is not set. Please add your Mapbox token."
          );
          setLoading(false);
          return;
        }

        console.log("Getting user location...");
        const location = await getUserLocation();
        console.log("User location:", location);
        setUserLocation(location);

        // Generate mock stations around user location
        const stations = generateMockStations(location[0], location[1]);
        console.log("Generated stations:", stations.length);
        setNearbyStations(stations);

        if (mapContainer.current && !map.current) {
          console.log("Initializing Mapbox...");
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/light-v11",
            center: location,
            zoom: 13,
          });

          map.current.on("load", () => {
            console.log("Map loaded successfully");
            // Add user location marker
            new mapboxgl.Marker({ color: "#3B82F6" })
              .setLngLat(location)
              .setPopup(
                new mapboxgl.Popup().setHTML(
                  '<div class="font-semibold">Your Location</div>'
                )
              )
              .addTo(map.current!);

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

              const marker = new mapboxgl.Marker(el)
                .setLngLat(station.coordinates)
                .addTo(map.current!);

              el.addEventListener("click", () => {
                setSelectedStation(station);
                map.current!.flyTo({
                  center: station.coordinates,
                  zoom: 15,
                });
              });
            });

            setLoading(false);
          });

          map.current.on("error", (e) => {
            console.error("Map error:", e);
            setError(
              "Failed to load map. Please check your Mapbox token and internet connection."
            );
            setLoading(false);
          });
        }
      } catch (error) {
        console.error("Error initializing map:", error);
        setError("Failed to initialize map: " + (error as Error).message);
        setLoading(false);
      }
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Map Error
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="text-left bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Quick fixes:</h3>
            <ul className="text-sm space-y-1">
              <li>• Add your Mapbox access token</li>
              <li>• Import mapbox-gl CSS</li>
              <li>• Check internet connection</li>
              <li>• Check browser console for details</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      {/* Map container */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* Navigation info panel */}
      {isNavigating && currentRoute && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 flex items-center gap-4">
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

      {/* Station list panel */}
      <div className="absolute top-4 left-4 w-80 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 text-green-600" />
            Nearby EV Stations ({nearbyStations.length})
          </h2>
        </div>
        <div className="p-2">
          {nearbyStations.map((station) => (
            <div
              key={station.id}
              className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                selectedStation?.id === station.id
                  ? "bg-blue-50 border border-blue-200"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => {
                setSelectedStation(station);

                // If we're navigating, clear current route first
                if (isNavigating) {
                  clearRoute();
                }

                map.current?.flyTo({
                  center: station.coordinates,
                  zoom: 15,
                });

                // If we were navigating, start new route after animation
                if (isNavigating && userLocation) {
                  map.current?.once("moveend", async () => {
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
              <div className="font-medium text-gray-900">{station.name}</div>
              <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
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
                  {station.availableChargers}/{station.totalChargers} available
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
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 md:right-auto md:w-96">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold">{selectedStation.name}</h3>
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
                {selectedStation.availableChargers} of
                {selectedStation.totalChargers} chargers available
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{selectedStation.operatingHours}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">
                ${selectedStation.pricePerKwh} per kWh
              </span>
            </div>

            <div className="pt-2 border-t">
              <div className="text-sm text-gray-600 mb-1">Charger Types:</div>
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
              <button
                onClick={handleNavigateToStation}
                disabled={routeLoading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {routeLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Loading Route...
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4" />
                    {isNavigating ? "Update Route" : "Navigate to Station"}
                  </>
                )}
              </button>
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

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
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
    </div>
  );
};

export default EVChargingMap;
