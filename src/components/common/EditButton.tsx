import { Icon } from "@iconify/react/dist/iconify.js";

function EditButton({ onButtonClick }: { onButtonClick: () => void }) {
  return (
    <button
      className="justify-center rounded-md text-[12.5px] ring-offset-white transition focus-visible:outline-none disabled:pointer-events-none  disabled:text-gray-500 h-10 px-4 py-2 flex items-center gap-1 bg-primary-green font-medium duation-300 hover:bg-[#619B7D]/80 bg-[#619B7D] text-black hover:opacity-90 disabled:bg-[#619B7D]/50"
      onClick={onButtonClick}
    >
      <Icon icon="tabler:edit" className="text-xl" />
      Edit
    </button>
  );
}
export default EditButton;
