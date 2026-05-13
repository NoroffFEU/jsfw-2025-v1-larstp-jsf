import { useToast } from "../../hooks/useToast";
import type { Toast } from "../../types/toast";

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed z-50 space-y-2 bottom-4 right-4">
      {toasts.map((toast: Toast) => (
        <div
          key={toast.id}
          className={`px-4 py-3 rounded-lg shadow-lg text-white font-medium max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-300 ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"  /* just ugly stand-in colours for now */ 
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <p>{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-lg font-bold text-white hover:opacity-80"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
