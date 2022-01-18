import * as React from "react";
import { useState } from "react";
import { ArrowDirection } from "../../types/ArrowDirection";
import { ArrowType } from "../../types/ArrowType";
import { Position } from "../../types/Position";
import { DialogWindow } from "../Dialog-Window/DialogWindow";
import styles from "./Arrow.module.scss";
import { ArrowBody, ArrowHead, MirroredArrowHead } from "./ArrowParts";
import { ArrowButton } from "./Button";
import { ButtonIconState, findDirection, getButtonIconState } from "./Utils";

export type ArrowProps = {
  start: Position;
  end: Position;
  arrowColor: string;
  circleColor: string;
  iconColor: string;
  type: ArrowType;
  notes: string;
  completed: boolean;
};

export const Arrow: React.FC<ArrowProps> = ({
  start,
  end,
  arrowColor,
  circleColor,
  iconColor,
  type,
  notes,
  completed,
}) => {
  const [isDialogueShown, setIsDialogueShown] = React.useState<boolean>(false);

  // find angle and direction of arrow
  let angle = Math.atan2(start.y - end.y, end.x - start.x) * (180 / Math.PI);
  if (angle < 0) angle = 360 + angle;
  const direction = findDirection(angle);

  let classNames = `${styles.arrow} `;
  let length;

  switch (direction) {
    case ArrowDirection.Up:
      length = { width: Math.abs(end.y - start.y) };
      classNames += styles.pointUp;
      break;
    case ArrowDirection.Down:
      length = { width: Math.abs(end.y - start.y) };
      classNames += styles.pointDown;
      break;
    case ArrowDirection.Left:
      length = { width: Math.abs(end.x - start.x) };
      classNames += styles.pointLeft;
      break;
    case ArrowDirection.Right:
      length = { width: Math.abs(end.x - start.x) };
      classNames += styles.pointRight;
      break;
  }

  const [buttonState, setButtonState] = useState(
    getButtonIconState(completed, notes),
  );

  React.useEffect(() => {
    setButtonState(getButtonIconState(completed, notes));
  }, [completed, notes]);

  if (buttonState === ButtonIconState.Empty)
    classNames += ` ${styles.emptyArrow}`;
  else classNames += ` ${styles.filledArrow}`;

  const button = (
    <button type="button">
      <ArrowButton
        arrowColor={arrowColor}
        circleColor={circleColor}
        iconColor={iconColor}
        type={type}
        direction={direction}
        buttonState={buttonState}
      />
    </button>
  );

  let arrow;
  switch (type) {
    case ArrowType.NonDirectional:
      arrow = (
        <div data-testid="ndArrow" className={classNames} style={length}>
          <ArrowBody arrowColor={arrowColor} />
          {button}
        </div>
      );
      break;
    case ArrowType.BiDirectional:
      arrow = (
        <div data-testid="bdArrow" className={classNames} style={length}>
          <MirroredArrowHead arrowColor={arrowColor} />
          <ArrowBody arrowColor={arrowColor} />
          <ArrowHead arrowColor={arrowColor} />
          {button}
        </div>
      );
      break;
    case ArrowType.Directional:
      arrow = (
        <div data-testid="dArrow" className={classNames} style={length}>
          <ArrowBody arrowColor={arrowColor} />
          <ArrowHead arrowColor={arrowColor} />
          {button}
        </div>
      );
  }

  // apply shadow around arrow
  arrow = (
    <>
      <div
        className={styles.shadow}
        onKeyDown={e =>
          ["Space", "Enter"].includes(e.code) && setIsDialogueShown
        }
        onClick={() => setIsDialogueShown(true)}
        role="button"
        tabIndex={0}
      >
        {arrow}
      </div>
      <DialogWindow
        title=""
        notes={notes}
        open={isDialogueShown}
        onOpenChange={setIsDialogueShown}
      />
    </>
  );

  return arrow;
};
