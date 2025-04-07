import Layout from "../layouts/Layout";
import ServiceHistoryTable from "../components/fleet_management/service/ServiceHistoryTable";

const Service = () => {
  return (
    <Layout
      title="Service"
      components={{ Overview: <ServiceHistoryTable /> }}
    />
  );
};

export default Service;
