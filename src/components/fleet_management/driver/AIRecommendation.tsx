import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Legend, Title, Tooltip);

// Gauge Chart Component
const GaugeChart = ({ score }: { score: number }) => {
  const data = {
    labels: ["Approved", "Remaining"],
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ["#F94144", "#E5E7EB"],
        borderWidth: 0,
        cutout: "80%",
        circumference: 180,
        rotation: 270,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: true } },
  };

  return (
    <div className="relative w-40 h-24 mx-auto">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
        <span className="text-xs mb-0 font-semibold">AI Score</span>
        <span className="text-3xl font-bold">{score}</span>
      </div>
    </div>
  );
};

// AI Recommendation Component
const AIRecommendation = () => {
  const aiScore = 41; // Example AI Score

  return (
    <div className="bg-[#e0e6e930] p-4 rounded-xl border border-[#e0e6e930]">
      <GaugeChart score={aiScore} />
      <p className="text-xs text-gray-400 text-center mt-2">
        20% of similar scores have been approved
      </p>
      <p className="text-sm font-semibold text-red-500 text-center">
        AI Recommendation: Reject
      </p>
    </div>
  );
};

export default AIRecommendation;
