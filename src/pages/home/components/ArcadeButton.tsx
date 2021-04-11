import classNames from "classnames";
import React, { useState } from "react";

import ButtonIdle from "../../../assets/button.svg";
import ButtonPressed from "../../../assets/button_pressed.svg";

import styles from "./ArcadeButton.module.scss";

export const ArcadeButton = ({ className, onClick, ...props }: React.HTMLProps<HTMLButtonElement>) => {
  const [pressed, setPressed] = useState(false);
  const ButtonComponent = pressed ? ButtonPressed : ButtonIdle;
  return (
    <button
      {...props}
      className={classNames(className, styles.button)}
      type="button"
      onMouseDown={() => setPressed(true)}
      onMouseUp={(e) => {
        setPressed(false);
        onClick(e);
      }}
    >
      <ButtonComponent height={120} />
    </button>
  );
};
