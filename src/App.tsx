import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Fleet from "./pages/Fleet";
import SideBar from "./components/fleet_management/Sidebar";

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
        </Routes>
      </div>
    </div>
  );
}

export default App;
