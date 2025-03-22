/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Legend, Title, Tooltip);

const GaugeChart = ({ backgroundColor, values }) => {
  const data = {
    labels: [],
    datasets: [
      {
        data: [values[0], values[1]], // Closed percentage and gap percentage
        backgroundColor: backgroundColor,
        borderWidth: 0,
        cutout: "83%",
        circumference: 180,
        rotation: 270,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
  };

  return <Doughnut data={data} options={options} />;
};

export default GaugeChart;
