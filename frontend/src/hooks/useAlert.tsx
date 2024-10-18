import { useState } from "react";
import Dialog from "../components/ui/dialog/dialog";

interface AlertPromise {
  resolve: (value: boolean) => void;
}

type UseAlertReturn = [
  (message: string) => Promise<boolean>,
  () => JSX.Element
];

export const useAlert = (): UseAlertReturn => {
  const [promise, setPromise] = useState<AlertPromise | null>(null);
  const [message, setMessage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const alert = (message: string, description?: string): Promise<boolean> => {
    setMessage(message);

    if (description) {
      setDescription(description);
    }

    setOpen(true);
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = (): void => {
    promise?.resolve(true);
    setOpen(false);
  };

  const AlertDialog = (): JSX.Element => (
    <Dialog
      open={open}
      onClose={handleClose}
      cancelText="Close"
      title={message}
    >
      {description}
    </Dialog>
  );

  return [alert, AlertDialog];
};
