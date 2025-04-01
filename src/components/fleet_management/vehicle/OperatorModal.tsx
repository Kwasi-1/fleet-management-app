import { useState, useRef, useEffect } from "react";

const operators = [
  "Jacob Silva",
  "Carlos Garcia",
  "John Doe",
  "Emily Brown",
  "Unassigned",
];

const OperatorModal = ({
  isOpen,
  onClose,
  onAssign,
  triggerRef, // New prop to track the button that opened the modal
  selectedOperator = null, // Optional prop to track current selection
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOp, setSelectedOp] = useState(selectedOperator);
  const modalRef = useRef(null);

  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && triggerRef && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      setModalPosition({
        top: triggerRect.bottom + window.scrollY,
        left: triggerRect.left + window.scrollX,
      });
    }
  }, [isOpen, triggerRef]);

  const filteredOperators = operators.filter((op) =>
    op.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") {
      onClose();
    }
  };

  const handleAssign = () => {
    if (selectedOp) {
      onAssign(selectedOp);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="backdrop"
      className="fixed inset-0 z-50"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="absolute bg-white rounded-lg shadow-lgborder w-[300px] -ml-[5%]"
        style={{
          top: `${modalPosition.top}px`,
          left: `${modalPosition.left}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="text"
          placeholder="Search operator..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border-[3px] border-black rounded-lg mb-2 appearance-none focus:outline-none text-sm"
        />
        <ul className="max-h-40 overflow-auto px-3 mb-2">
          {filteredOperators.map((op) => (
            <div
              // className=" bg-red-50 mb-1"
              className={`flex justify-between items-center rounded-lg mb-1 p-2 hover:bg-gray-100 cursor-pointer text-[13px] ${
                selectedOp === op ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedOp(op)}
              key={op}
            >
              <li key={op}>{op}</li>
              <button
                onClick={handleAssign}
                disabled={!selectedOp}
                className={`wfull p-[6px] px-2 text-[11px] rounded-lg ${
                  selectedOp
                    ? "bg-[#619B7D] text-white hover:bg-[#4a7c63]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Assign
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OperatorModal;
