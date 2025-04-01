import LocationsTable from "../components/locations/LocationsTable";
import Layout from "../layouts/Layout";

function locations() {
  return (
    <div>
      <Layout
        title="Locations"
        components={{ Overview: <LocationsTable /> }}
        showDashboard={false}
      />
    </div>
  );
}
export default locations;
