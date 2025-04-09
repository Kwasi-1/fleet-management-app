import { MouseEvent, ReactNode, useEffect } from "react";

interface DialogWrapperProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function DialogWrapper({
  open,
  onClose,
  title,
  children,
  className = "",
}: DialogWrapperProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "backdrop") {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      id="backdrop"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        className={`bg-white rounded-xl p-6 w-full h-[90%] max-w-2xl shadow-xl ${className}`}
      >
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        <button
          className="fixed top-4 right-4 text-white text-lg hover:text-gray-300 font-bold bg-gray400 px-3 py-1 rounded-full transition duration-200"
          onClick={onClose}
        >
          ✕
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}
