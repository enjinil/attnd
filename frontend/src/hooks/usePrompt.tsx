import { useState } from "react";
import Dialog from "../components/ui/dialog/dialog";
import { Input } from "../components/ui/form/input";
import { FormProvider, useForm } from "react-hook-form";

interface PromptPromise {
  resolve: (value: string | null) => void;
}

type UsePromptReturn = [
  (message: string, defaultValue?: string) => Promise<string | null>,
  () => JSX.Element
];

export const usePrompt = (): UsePromptReturn => {
  const [promise, setPromise] = useState<PromptPromise | null>(null);
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm({ defaultValues: { value: "" } });

  const prompt = (
    message: string,
    defaultValue: string = ""
  ): Promise<string | null> => {
    setMessage(message);
    setOpen(true);
    form.setValue("value", defaultValue);
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleConfirm = (): void => {
    promise?.resolve(form.getValues().value);
    setOpen(false);
  };

  const handleCancel = (): void => {
    promise?.resolve(null);
    setOpen(false);
  };

  const PromptDialog = (): JSX.Element => (
    <Dialog
      open={open}
      onClose={handleCancel}
      onConfirm={handleConfirm}
      title={message}
      cancelText="Cancel"
      confirmText="OK"
    >
      <FormProvider {...form}>
        <form onSubmit={handleConfirm}>
          <Input type="text" name="value" className="mt-2" />
        </form>
      </FormProvider>
    </Dialog>
  );

  return [prompt, PromptDialog];
};
