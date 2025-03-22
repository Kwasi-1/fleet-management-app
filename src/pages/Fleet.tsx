import OverallBreakdown from "../components/fleet_management/OverviewBreadown";
import LoanStats from "../components/fleet_management/LoanStats";
import OpenApplications from "../components/fleet_management/OpenApplications";
import DateFilter from "../components/fleet_management/DateFilter";
import OrderAmount from "../components/fleet_management/OrderAmounts";


const Fleet = () => {
  return (
    <div className=" p-6 min-h-screen font-sans">
      <div className="flex justify-between items-center">
  
      <h1 className="text-2xl font-semibold">Fleet Management</h1>
      
      
      {/* Date Filter */}
      <DateFilter />
      </div>

      <div className="flex gap-4 mt-4">
        <OverallBreakdown />
        <div className="flex-1 h-full">
        <LoanStats />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mt-4">
        <OpenApplications />
        <div className=" col-span-2 flex flex-col gap-4">
        <OrderAmount/>
      </div>
        
      </div>

      
    </div>
  );
};

export default Fleet;
