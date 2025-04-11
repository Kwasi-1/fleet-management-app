import DeliveryStopsTable from "../components/logistics/booking/DeliveryTrips";
import Layout from "../layouts/Layout";

function Booking() {
  return (
    <div>
      <Layout
        title="Delivery Stops"
        components={{ Overview: <DeliveryStopsTable /> }}
        showDashboard={false}
      />
    </div>
  );
}
export default Booking;
