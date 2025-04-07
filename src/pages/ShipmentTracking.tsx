import ShipmentTrackingTable from "../components/logistics/tracking/ShipmentTrackingTable";
import Layout from "../layouts/Layout";

const ShipmentTracking = () => {
  return (
    <Layout
      title="Tracking On time"
      components={{ Overview: <ShipmentTrackingTable /> }}
    />
  );
};

export default ShipmentTracking;
