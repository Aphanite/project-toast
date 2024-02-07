import React from "react";
import Toast from "../Toast";
import useEscapeKey from "../../hooks/use-escape-key.hook";

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

  useEscapeKey(() => {
    console.log("Dismiss all!");
    setToasts([]);
  });

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
