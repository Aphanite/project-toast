import React from "react";
import Toast from "../Toast";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  function addToast(variantOption, message) {
    const toastId = crypto.randomUUID();
    const newToast = (
      <Toast id={toastId} variant={variantOption}>
        {message}
      </Toast>
    );

    setToasts((currentToasts) => {
      return [...currentToasts, newToast];
    });
  }

  function dismissToast(id) {
    setToasts((currentToasts) => {
      return currentToasts.filter((toast) => toast.props.id != id);
    });
  }

  const value = React.useMemo(() => {
    return { toasts, addToast, dismissToast };
  }, [toasts]);

  React.useEffect(() => {
    function dismissAllOnEsc(e) {
      if (e.key === "Escape") {
        console.log("Dismiss all!");
        setToasts([]);
      }
    }

    window.addEventListener("keydown", dismissAllOnEsc);

    () => {
      window.removeEventListener("keydown", dismissAllOnEsc);
    };
  }, []);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
