type ToastVariant = "success" | "error";

interface ToastProps {
  message: string;
  variant: ToastVariant;
  onDismiss: () => void;
}

const variantClasses: Record<ToastVariant, string> = {
  success: "bg-primary text-white",
  error: "bg-danger text-white",
};

export const Toast = ({ message, variant, onDismiss }: ToastProps) => {
  return (
    <div
      className={`flex items-center justify-between gap-4 p-3 rounded-lg shadow-sm min-w-64 ${variantClasses[variant]}`}
    >
      <span>{message}</span>
      <button
        type="button"
        aria-label="Dismiss notification"
        className="cursor-pointer font-bold focus:ring-2 focus:ring-white rounded"
        onClick={onDismiss}
      >
        ×
      </button>
    </div>
  );
};
