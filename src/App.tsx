import "./index.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Fleet from "./pages/Fleet";
import SideBar from "./components/common/Sidebar";
import Shipment from "./pages/Shipment";
import DriverDetails from "./pages/DriverDetails";
import VehicleDetails from "./pages/VehicleDetails";
import Issues from "./pages/Issues";
import Reminders from "./pages/Reminders";
import Fuel from "./pages/Fuel";
import Service from "./pages/Service";
import OrderManagement from "./pages/OrderManagement";
import Locations from "./pages/Locations";
import OrderEntry from "./pages/OrderEntry";
import Drivers from "./pages/Drivers";
import Vehicles from "./pages/Vehicles";
import Invoice from "./pages/Invoice";
import ShipmentTracking from "./pages/ShipmentTracking";
import ReminderDetails from "./pages/ReminderDetails";
import OrderDetails from "./pages/OrderDetails";
import Booking from "./pages/Booking";
import FullPageMap from "./pages/FullPageMap";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isLanding = location.pathname === "/" || location.pathname === "/map";

  return (
    <div className="flex">
      {!isLanding && <SideBar />}
      <div className={!isLanding ? "w-[85%] ml-[15%]" : "w-full"}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/logistics" element={<ShipmentTracking />} />
          <Route path="/logistics/shipment" element={<Shipment />} />
          <Route path="/logistics/booking" element={<Booking />} />
          <Route path="/map" element={<FullPageMap />} />
          <Route path="/fleet/drivers" element={<Drivers />} />
          <Route
            path="/fleet/drivers/driver_info"
            element={<DriverDetails />}
          />
          <Route path="/fleet/vehicle" element={<Vehicles />} />
          <Route path="/fleet/vehicle/info" element={<VehicleDetails />} />
          <Route path="/order_management/order" element={<OrderDetails />} />
          <Route path="/fleet/issues" element={<Issues />} />
          <Route path="/fleet/reminders" element={<Reminders />} />
          <Route path="/fleet/reminders/info" element={<ReminderDetails />} />
          <Route path="/fleet/service" element={<Service />} />
          <Route path="/fleet/fuel" element={<Fuel />} />
          <Route path="/order_management" element={<OrderManagement />} />
          <Route path="/locations" element={<Locations />} />
          <Route
            path="/order_management/order_entry"
            element={<OrderEntry />}
          />
          <Route path="/invoices" element={<Invoice />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
