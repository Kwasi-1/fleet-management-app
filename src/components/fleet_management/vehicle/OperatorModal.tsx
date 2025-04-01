import { useState, useRef, useEffect, MutableRefObject } from "react";

// Define the types for props
interface OperatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (operator: string) => void;
  triggerRef: MutableRefObject<HTMLElement | null>; // Ref to the button triggering the modal
  selectedOperator?: string | null; // Optional prop to track current selection
}

const operators = [
  "Jacob Silva",
  "Carlos Garcia",
  "John Doe",
  "Emily Brown",
  "Unassigned",
];

const OperatorModal: React.FC<OperatorModalProps> = ({
  isOpen,
  onClose,
  onAssign,
  triggerRef,
  selectedOperator = null,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOp, setSelectedOp] = useState<string | null>(selectedOperator);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [modalPosition, setModalPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0,
  });

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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "backdrop") {
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
        className="absolute bg-white rounded-lg shadow-lg border w-[300px] -ml-[5%]"
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
              className={`flex justify-between items-center rounded-lg mb-1 p-2 hover:bg-gray-100 cursor-pointer text-[13px] ${
                selectedOp === op ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedOp(op)}
              key={op}
            >
              <li>{op}</li>
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
