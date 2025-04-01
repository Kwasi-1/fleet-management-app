import IssuesTable from "../components/vehicle/IssuesTable";
import Layout from "../layouts/Layout";

const tabs = ["Issues", "Faults", "Recalls"];

const components = {
  Issues: <IssuesTable />,

  Faults: <p>Replacement Analysis content here</p>,
  Recalls: <p>Replacement Analysis content here</p>,
};

const Issues = () => {
  return (
    <Layout
      title="Issues"
      tabs={tabs}
      components={components}
      showDashboard={false}
    />
  );
};

export default Issues;
