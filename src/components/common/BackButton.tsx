import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

const BackButton = ({ page }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <button
      className="text-sm border rounded-lg p-2 flex items-center gap-1 text-gray-400 hover:text-gray-600 hover:border-gray-300 transition duration-300 mb-1"
      onClick={handleBackClick}
    >
      <Icon icon="weui:back-outlined" className="text-sm" />
      Back
    </button>
  );
};

export default BackButton;
