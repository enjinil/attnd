import { ReactNode, useEffect } from "react";
import { Button } from "../button";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
}

const Dialog = ({
  open,
  onClose,
  title = "Confirmation",
  children,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: DialogProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-lg shadow-lg min-w-[300px] max-w-md w-full mx-4">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          <div className="mb-6 text-gray-600">{children}</div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
