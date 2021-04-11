import classNames from "classnames";
import React, { useState } from "react";

import { ArcadeButton } from "./components/ArcadeButton";

import styles from "./Home.module.scss";

export const Home = () => {
  const [count, setCount] = useState(0);
  const buttonPressed = () => {
    setCount((old) => old + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Press Me</div>

      <div className={styles.robotContainer}>
        <div className={styles.robot}>

          <ArcadeButton onClick={buttonPressed} className={styles["arcade-button"]} />

          <div className={styles["top-box"]} />

          <div className={styles["front-box"]}>
            <div className={styles.face}>
              <div className={styles.eyes}>
                <div className={styles.facialComponentContainer}>
                  <div className={classNames(styles.eye, styles.leftEye)} />

                  <div className={classNames(styles.eye, styles.rightEye)} />

                  <div className={styles.mouth} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.speechBubble}>You cliked on me {count} times!</div>
        </div>
      </div>
    </div>
  );
};
