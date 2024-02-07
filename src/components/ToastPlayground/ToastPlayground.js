import React from "react";

import Button from "../Button";
import Toast from "../Toast";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf/ToastShelf";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const defaultMessage = "";
  const defaultVariant = "notice";

  const [message, setMessage] = React.useState(defaultMessage);
  const [variantOption, setVariantOption] = React.useState(defaultVariant);
  const [toasts, setToasts] = React.useState({});

  function submitForm(event) {
    event.preventDefault();

    // take stuff from form and make a Toast
    const toastKey = crypto.randomUUID();
    const newToast = (
      <Toast
        variant={variantOption}
        closeToast={() => {
          setToasts((currentToasts) => {
            const newToasts = { ...currentToasts };
            delete newToasts[toastKey];
            return newToasts;
          });
        }}
      >
        {message}
      </Toast>
    );

    // add Toast to shelf
    setToasts((currentToasts) => {
      return { ...currentToasts, [toastKey]: newToast };
    });

    // clear form
    setMessage(defaultMessage);
    setVariantOption(defaultVariant);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} />

      <form className={styles.controlsWrapper} onSubmit={submitForm}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((option) => (
              <label htmlFor={`variant-${option}`} key={option}>
                <input
                  id={`variant-${option}`}
                  type="radio"
                  name={option}
                  value={option}
                  checked={option === variantOption}
                  onChange={(e) => setVariantOption(e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button onClick={() => console.log("clicked")}>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
