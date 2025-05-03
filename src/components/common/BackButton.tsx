import { Icon } from "@iconify/react/dist/iconify.js";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        className="flex col-span-full items-center h-fit gap-2 text-[#619B7D] text-[1rem] mb-4 hover:underline tracking-tighter"
        onClick={() => navigate(-1)}
      >
        <Icon icon={"hugeicons:arrow-turn-backward"} />
        <p>Back</p>
      </button>
    </div>
  );
}
export default BackButton;
