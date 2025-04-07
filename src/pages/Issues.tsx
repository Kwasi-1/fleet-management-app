import IssuesTable from "../components/fleet_management/vehicle/IssuesTable";
import Layout from "../layouts/Layout";

const Issues = () => {
  return (
    <Layout
      title="Issues"
      components={{ Overview: <IssuesTable /> }}
      showDashboard={false}
    />
  );
};

export default Issues;
