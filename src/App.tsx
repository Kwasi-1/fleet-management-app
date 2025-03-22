import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Fleet from "./pages/Fleet";
import SideBar from "./components/fleet_management/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <ShowSidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/fleet" element={<Fleet/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

const ShowSidebar = () => {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  return !isLanding ? (
    <>
      <SideBar />
    </>
  ) : null;
};
export default App;
