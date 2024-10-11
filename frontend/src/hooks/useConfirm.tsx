import { useState } from "react";
import Dialog from "../components/ui/dialog/dialog";

interface ConfirmPromise {
  resolve: (value: boolean) => void;
}

type UseConfirmReturn = [
  (message: string) => Promise<boolean>,
  () => JSX.Element
];

export const useConfirm = (): UseConfirmReturn => {
  const [promise, setPromise] = useState<ConfirmPromise | null>(null);
  const [message, setMessage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const confirm = (message: string, description?: string): Promise<boolean> => {
    setMessage(message);

    if (description) {
      setDescription(description);
    }

    setOpen(true);
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleConfirm = (): void => {
    promise?.resolve(true);
    setOpen(false);
  };

  const handleCancel = (): void => {
    promise?.resolve(false);
    setOpen(false);
  };

  const ConfirmationDialog = (): JSX.Element => (
    <Dialog
      open={open}
      onClose={handleCancel}
      onConfirm={handleConfirm}
      title={message}
    >
      {description}
    </Dialog>
  );

  return [confirm, ConfirmationDialog];
};
