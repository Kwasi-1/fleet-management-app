import DriverTable from "../components/fleet_management/driver/DriverTable";

function DriverDetails() {
  return (
    <div className="px-8 h-screen">
      <h1 className="py-5 font-semibold text-2xl">Drivers</h1>
      <div className="mt4 bg-gray-200/30 h-full rounded-t-xl border border-[#e0e6e930]">
        <DriverTable />
      </div>
    </div>
  );
}
export default DriverDetails;
