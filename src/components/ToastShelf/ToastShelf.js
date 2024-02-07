import React from "react";

import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider/";

function ToastShelf() {
  const { toasts } = React.useContext(ToastContext);
  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {toasts.map((toast) => {
        return (
          <li key={toast.props.id} className={styles.toastWrapper}>
            {toast}
          </li>
        );
      })}
    </ol>
  );
}

export default React.memo(ToastShelf);
