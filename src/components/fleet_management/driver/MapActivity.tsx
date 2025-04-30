import DriverLastSeenMap from "./DriverLastSeenMap";
import { styles } from "@/lib/styles";

const MapActivity = () => {
  const lastSeenLocation: [number, number] = [3.3792, 6.5244];

  return (
    <div
      className={`${styles.cardSmall}  p-4 rounded-xl border border-[#e0e6e950] h-full`}
    >
      <h3 className="text-[17px] font-semibold">Address and Activity</h3>
      <div className="mt-2 bg-gray-200/50 h-fit rounded-xl overflow-hidden">
        <DriverLastSeenMap lastSeenLocation={lastSeenLocation} />
      </div>
    </div>
  );
};

export default MapActivity;
