import React from "react";

function useEscapeKey(callback) {
  if (typeof callback != "function") {
    throw new Error("callback has to be a function");
  }

  React.useEffect(() => {
    function handleEscape(e) {
      if (e.key === "Escape") {
        callback();
      }
    }

    window.addEventListener("keydown", handleEscape);

    () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);
}

export default useEscapeKey;
