import DriverTable from "../components/fleet_management/driver/DriverTable";
import Layout from "../layouts/Layout";

const Drivers = () => {
  return <Layout title="Drivers" components={{ Overview: <DriverTable /> }} />;
};

export default Drivers;
