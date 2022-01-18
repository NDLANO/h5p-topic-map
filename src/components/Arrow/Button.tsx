/* eslint-disable react/destructuring-assignment */
import * as React from "react";
import { ArrowDirection } from "../../types/ArrowDirection";
import { ArrowType } from "../../types/ArrowType";
import styles from "./Button.module.scss";
import { CompletedIcon, EditIcon, NoteIcon } from "./Icons";
import { ButtonIconState } from "./Utils";

const renderIcon = (state: ButtonIconState, iconColor: string): JSX.Element => {
  switch (state) {
    case ButtonIconState.Completed:
      return <CompletedIcon iconColor={iconColor} />;
    case ButtonIconState.Notes:
      return <NoteIcon iconColor={iconColor} />;
    default:
      return <EditIcon iconColor={iconColor} />;
  }
};

export function clickArrow(): void {
  // TODO
}

interface ArrowButtonProps {
  arrowColor: string;
  circleColor: string;
  iconColor: string;
  type: ArrowType;
  direction: ArrowDirection;
  buttonState: ButtonIconState;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  arrowColor,
  circleColor,
  iconColor,
  type,
  direction,
  buttonState,
}): JSX.Element => {
  let classNames = `${styles.button}`;

  if (type === ArrowType.Directional)
    classNames += ` ${styles.buttonDirectional}`;
  else classNames += ` ${styles.buttonNonDirectional}`;

  const directionClasses = {
    [ArrowDirection.Up]: styles.buttonUp,
    [ArrowDirection.Down]: styles.buttonDown,
    [ArrowDirection.Left]: styles.buttonLeft,
    [ArrowDirection.Right]: styles.buttonRight,
  };

  classNames += ` ${directionClasses[direction]}`;

  return (
    <svg
      data-testid="svgBtn"
      className={classNames}
      viewBox="0 0 12 12"
      preserveAspectRatio="xMaxYMid"
    >
      <circle
        stroke={arrowColor}
        fill={circleColor}
        className={`${styles.buttonCircle}`}
        cx="6"
        cy="6"
        r="4px"
      />

      <svg viewBox="-9 -9 30 30">{renderIcon(buttonState, iconColor)}</svg>

      <circle
        fill="transparent"
        className={styles.buttonCircle}
        style={{ cursor: "pointer" }}
        onClick={clickArrow}
        cx="6"
        cy="6"
        r="4px"
      />
    </svg>
  );
};
