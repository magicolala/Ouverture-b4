import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";

type ToastTone = "success" | "error" | "warning" | "info";

export interface ToastOptions {
  title: string;
  description?: string;
  tone?: ToastTone;
  duration?: number;
}

interface ToastItem extends Required<ToastOptions> {
  id: number;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => number;
  success: (title: string, description?: string) => number;
  error: (title: string, description?: string) => number;
  warning: (title: string, description?: string) => number;
  info: (title: string, description?: string) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 4000;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextIdRef = useRef(1);
  const timersRef = useRef<Map<number, number>>(new Map());

  const dismiss = useCallback((id: number) => {
    const timeout = timersRef.current.get(id);
    if (timeout) {
      window.clearTimeout(timeout);
      timersRef.current.delete(id);
    }
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = nextIdRef.current++;
      const item: ToastItem = {
        id,
        title: options.title,
        description: options.description ?? "",
        tone: options.tone ?? "info",
        duration: options.duration ?? DEFAULT_DURATION,
      };

      setToasts((current) => [...current, item]);

      if (item.duration > 0) {
        const timeout = window.setTimeout(() => dismiss(id), item.duration);
        timersRef.current.set(id, timeout);
      }

      return id;
    },
    [dismiss]
  );

  const value = useMemo(
    () => ({
      toast,
      success: (title, description) =>
        toast({ title, description, tone: "success" }),
      error: (title, description) =>
        toast({ title, description, tone: "error", duration: 6000 }),
      warning: (title, description) =>
        toast({ title, description, tone: "warning" }),
      info: (title, description) =>
        toast({ title, description, tone: "info" }),
      dismiss,
    }),
    [toast, dismiss]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-viewport">
        {toasts.map((item) => (
          <div key={item.id} className={`toast-card toast-${item.tone}`}>
            <div className="toast-icon">
              {item.tone === "success" && <CheckCircle2 size={20} />}
              {item.tone === "error" && <AlertCircle size={20} />}
              {item.tone === "warning" && <AlertTriangle size={20} />}
              {item.tone === "info" && <Info size={20} />}
            </div>
            <div className="toast-content">
              <div className="toast-title">{item.title}</div>
              {item.description && (
                <div className="toast-description">{item.description}</div>
              )}
            </div>
            <button className="toast-close" onClick={() => dismiss(item.id)}>
              <X size={18} />
            </button>
            {item.duration > 0 && (
              <div
                className="toast-progress"
                style={{ animationDuration: `${item.duration}ms` }}
              />
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
