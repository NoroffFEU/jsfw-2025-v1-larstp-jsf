import { useState, useRef, type ReactNode } from "react";
import type { Toast, ToastContextValue } from "../types/toast";
import { ToastContext } from "./toast-context";

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const addToast: ToastContextValue["addToast"] = (
    message,
    type = "success",
  ) => {
    const id = (++idRef.current).toString();
    const newToast: Toast = { id, message, type };

    setToasts((current) => [...current, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast: ToastContextValue["removeToast"] = (id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  };

  const value: ToastContextValue = {
    toasts,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}
