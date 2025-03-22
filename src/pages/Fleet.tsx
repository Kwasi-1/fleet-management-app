import OverallBreakdown from "../components/fleet_management/OverviewBreadown";
import LoanStats from "../components/fleet_management/LoanStats";
import OpenApplications from "../components/fleet_management/OpenApplications";
import OpenApplicationsChart from "../components/fleet_management/OpenApplicationChart";
import LimitVsAgeChart from "../components/fleet_management/LimitVsAgeChart";
import DateFilter from "../components/fleet_management/DateFilter";


const Fleet = () => {
  return (
    <div className=" p-6 min-h-screen font-sans">
    <div className="flex justify-between items-center">
  
   <h1 className="text-xl font-semibold">Fleet Management</h1>
      
      
   {/* Date Filter */}
   <DateFilter />
   </div>

   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
     <OverallBreakdown />
     <div className="col-span-2 h-full">
     <LoanStats />
     </div>
   </div>

   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
     <OpenApplications />
     <div className="flex flex-col gap-4">
     <OpenApplicationsChart />
     <LimitVsAgeChart />
   </div>
        
   </div>

      
    </div>
  );
};

export default Fleet;
