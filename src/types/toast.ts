export type Toast = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

/* mmmm toast */

export type ToastContextValue = {
  toasts: Toast[];
  addToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
};
