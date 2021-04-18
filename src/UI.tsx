import React, { useEffect, useState } from "react";

import Events from "./Events";

import styles from "./modal.module.scss";

const UI = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handle = (e: CustomEvent) => {
      if (e.detail === "click") {
        setCount((old) => old + 1);
      }
    };
    window.addEventListener(Events.STAT, handle);

    return () => {
      window.removeEventListener(Events.STAT, handle);
    };
  }, []);

  return <div className={styles.modalContainer}>
    <div className={styles.modal}>
      <div>Total Count: {count}</div>
    </div>
  </div>;
};

export default UI;
