import React from "react";

import styles from "./ToastShelf.module.css";

function ToastShelf({ toasts }) {
  return (
    <ol className={styles.wrapper}>
      {Object.entries(toasts).map(([key, toast]) => {
        return (
          <li key={key} className={styles.toastWrapper}>
            {toast}
          </li>
        );
      })}
    </ol>
  );
}

export default React.memo(ToastShelf);
