import * as React from 'react';
import { NoteButtonIconState } from '../../types/NoteButtonIconState';
import './IconCircle.scss';

type IconCircleProps = {
  buttonState: NoteButtonIconState;
  strokeWidth: number | undefined;
};

export const IconCircle: React.FC<IconCircleProps> = ({
  buttonState,
  strokeWidth,
}): React.ReactElement => {
  let iconClass = 'h5p-topic-map-icon-circle-edit';
  if (buttonState === NoteButtonIconState.Done) {
    iconClass = 'h5p-topic-map-icon-circle-done';
  }
  else if (buttonState === NoteButtonIconState.Notes || buttonState === NoteButtonIconState.Text) {
    iconClass = 'h5p-topic-map-icon-circle-note';
  }

  const className = `h5p-topic-map-icon-circle ${iconClass}`;

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        '--font-factor': strokeWidth ? strokeWidth / 8 : undefined,
      } as React.CSSProperties}
    />
  );
};
