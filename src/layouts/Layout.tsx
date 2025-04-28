import { useState, useEffect, ReactNode } from "react";
import Dashboard from "./Dashboard";

interface LayoutProps {
  title: string;
  tabs?: string[];
  components?: Record<string, ReactNode>;
  showDashboard?: boolean;
  dashboardData?: Record<string, any>;
  defaultDashboardData?: any;
}

const Layout: React.FC<LayoutProps> = ({
  title,
  tabs = [],
  components = {},
  showDashboard = false,
  dashboardData = {},
  defaultDashboardData = null,
}) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0] || "default");
  const [currentDashboardData, setCurrentDashboardData] =
    useState<any>(defaultDashboardData);

  // Update dashboard data when activeTab changes
  useEffect(() => {
    if (dashboardData[activeTab]) {
      setCurrentDashboardData(dashboardData[activeTab]);
    }
  }, [activeTab, dashboardData]);

  return (
    <div className="px-6 h-screen">
      {/* Header */}
      <div className="flex justify-between items-center py-5">
        <h1 className="font-semibold text-2xl">{title}</h1>
      </div>

      {/* Show Dashboard If Applicable */}
      {showDashboard && currentDashboardData && (
        <div className="mb-4">
          <Dashboard stats={currentDashboardData} />
        </div>
      )}

      {/* Conditional Tabs or No Tabs */}
      <div className="bg-gray-200/30 h-full rounded-t-xl border border-[#e0e6e930]">
        {tabs.length > 0 ? (
          <>
            <nav className="flex px-5">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 text-gray-500 border-t-2 transition-colors duration-200 text-xs ${
                    activeTab === tab
                      ? "text-green-600 font-medium border-green-600"
                      : "border-transparent hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
            <div className="px-4">
              {components[activeTab] || <p>No content available</p>}
            </div>
          </>
        ) : (
          // Render first component if no tabs
          <div className="px-4">
            {Object.values(components)[0] || <p>No content available</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
