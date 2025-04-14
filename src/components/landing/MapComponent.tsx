import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import BusinessLayer from "./BusinessLayer";
import GeocoderComponent from "./GeocoderComponent";
// import TruckSimulation from "./TruckSimulation";
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

const MapComponent = () => {
  const mapRef = useRef<mapboxgl.Map>(null!); // Note the non-null assertion
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
      pitch: 60,
      bearing: -20,
      antialias: true,
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    mapRef.current.on("load", () => {
      if (!mapRef.current) return;

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
  }, [isDarkMode]);

  return (
    <div
      className={`min-h-screen ${
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
          mapRef={mapRef}
          businesses={businesses}
          geocoderContainerRef={geocoderContainerRef}
          styleProps="absolute top-[1.4vw] right-[10vw] z-100"
        />
      )}

      <div className="h-[65vh] md:h-[75vh] mx-5 md:mx-10  relative">
        <BusinessLayer mapRef={mapRef} businesses={businesses} />
        {/* <TruckSimulation mapRef={mapRef} /> */}
        <div
          id="map-container"
          ref={mapContainerRef}
          className=" h-[65vh] md:h-[75vh] rounded-xl border"
        />
      </div>

      <DeliveryInfo />
    </div>
  );
};

export default MapComponent;
