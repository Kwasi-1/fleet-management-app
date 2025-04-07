
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Legend, Title, Tooltip);

const GaugeChart = ({
  backgroundColor = ["#10B981", "#E5E7EB"],
  values = [50, 50],
}) => {
  const data = {
    labels: ["Active", "Inactive"], // Added labels to prevent Chart.js errors
    datasets: [
      {
        data: values, // Ensure it's always an array with two values
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
    plugins: {
      legend: { display: false }, // Hides legend since labels aren't shown
      tooltip: { enabled: true }, // Enables tooltips for better UX
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default GaugeChart;
