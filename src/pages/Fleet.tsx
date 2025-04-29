import OverallBreakdown from "../components/fleet_management/overview/OverviewBreadown";
import LoanStats from "../components/fleet_management/overview/LoanStats";
import DateFilter from "../components/fleet_management/DateFilter";
import Alerts from "../components/fleet_management/overview/Alerts";
import ShipmentOverview from "../components/fleet_management/overview/ShipmentOverview";

const Fleet = () => {
  return (
    <div className=" p-6 min-h-screen font-sans">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Fleet Management</h1>
        <DateFilter />
      </div>

      <div className="flex gap-4 mt-4 h-full">
        <OverallBreakdown />
        <LoanStats />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mt-4">
        <div className="col-span-5">
          <ShipmentOverview />
        </div>
        <div className=" col-span-2 flex flex-col gap-4">
          <Alerts />
        </div>
      </div>
    </div>
  );
};

export default Fleet;
