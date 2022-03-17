import * as React from "react";
import { FC, MouseEventHandler } from "react";
import { ArrowItemType } from "../../types/ArrowItemType";
import { ArrowType } from "../../types/ArrowType";
import { NoteButtonIconState } from "../../types/NoteButtonIconState";
import { Position } from "../../types/Position";
import { UserData } from "../../types/UserData";
import { GridDimensions } from "../Grid/Grid";
import { NoteButton } from "../NoteButton/NoteButton";
import styles from "./Arrow.module.scss";

export type ArrowNoteButtonProps = {
  buttonState: NoteButtonIconState;
  element: HTMLDivElement | null;
  position: Position;
};


// const buttonForState = (buttonState: NoteButtonIconState): string => {
//   switch (buttonState) {
//     case NoteButtonIconState.Default:
//       return "default";
//     case NoteButtonIconState.Notes:
//       return "notes";
//     case NoteButtonIconState.Text:
//       return "text";
//     case NoteButtonIconState.Done:
//       return "done";
//   }
// };

export const ArrowNoteButton: FC<ArrowNoteButtonProps> = ({buttonState, element, position}) => {

  const buttonElement = React.useRef<HTMLDivElement>(null);

  const [offsetX, setOffsetX] = React.useState(0);
  const [offsetY, setOffsetY] = React.useState(0);

  React.useEffect(() => {
    console.info("setting offsets", buttonElement);
    if(buttonElement.current) {
      // const rect = buttonElement.current.getBoundingClientRect();
      console.info(buttonElement.current.clientWidth);
      console.info(buttonElement.current.clientHeight);
      setOffsetX(buttonElement.current.clientWidth/2);
      setOffsetY(buttonElement.current.clientHeight/2);
    }
  }, [buttonElement.current]);

  return (
    <div
      style={{
        position: "absolute",
        top: position.y - offsetY,
        left: position.x - offsetX,
      }}
    >
      {buttonState !== NoteButtonIconState.None &&
        <div ref={buttonElement}>
          <NoteButton backgroundColor="var(--theme-color-3)" borderColor="white" iconColor="white" 
              buttonState={buttonState} />
        </div>
      }
    </div>
  );
};
