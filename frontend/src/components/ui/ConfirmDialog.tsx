import { useEffect, useRef } from "react";
import { Button } from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastActionRef = useRef<"confirm" | "cancel" | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }
  }, [open]);

  const handleClose = () => {
    const action = lastActionRef.current;
    lastActionRef.current = null;
    if (action === "confirm") {
      onConfirm();
    } else {
      onCancel();
    }
  };

  const handleCancelClick = () => {
    lastActionRef.current = "cancel";
    dialogRef.current?.close();
  };

  const handleConfirmClick = () => {
    lastActionRef.current = "confirm";
    dialogRef.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className="rounded-card p-6 shadow-sm backdrop:bg-black/40"
      onClose={handleClose}
    >
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="mb-4">{message}</p>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={handleCancelClick}>
          {cancelLabel}
        </Button>
        <Button type="button" variant="danger" onClick={handleConfirmClick}>
          {confirmLabel}
        </Button>
      </div>
    </dialog>
  );
};
