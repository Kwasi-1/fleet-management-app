// index.js or App.js
import "./index.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Fleet from "./pages/Fleet";
import SideBar from "./components/common/Sidebar";
import Shipment from "./pages/Shipment";
import DriverDetails from "./pages/DriverDetails";
import VehicleDetails from "./pages/VehicleDetails";
import CreateShipment from "./pages/CreateShipment";
import Issues from "./pages/Issues";
import Reminders from "./pages/Reminders";
import Fuel from "./pages/Fuel";
import Service from "./pages/Service";
import OrderManagement from "./pages/OrderManagement";
import Locations from "./pages/Locations";
import OrderEntry from "./pages/OrderEntry";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className="flex">
      {!isLanding && <SideBar />}
      <div className={!isLanding ? "w-[85%] ml-[15%]" : "w-full"}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/logistics/shipment" element={<Shipment />} />
          <Route path="/fleet/drivers" element={<DriverDetails />} />
          <Route path="/fleet/vehicle" element={<VehicleDetails />} />
          <Route path="/logistics/shipment/add" element={<CreateShipment />} />
          <Route path="/fleet/issues" element={<Issues />} />
          <Route path="/fleet/reminders" element={<Reminders />} />
          <Route path="/fleet/service" element={<Service />} />
          <Route path="/fleet/fuel" element={<Fuel />} />
          <Route path="/order_management" element={<OrderManagement />} />
          <Route path="/locations" element={<Locations />} />
          <Route
            path="/order_management/order_entry"
            element={<OrderEntry />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
