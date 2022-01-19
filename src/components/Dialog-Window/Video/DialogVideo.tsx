import * as React from "react";

export type DialogVideoProps = {
  video: { path: string };
};

export const DialogVideo: React.FC<DialogVideoProps> = ({ video }) => {
  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video controls>
      <source src={video?.path} />
    </video>
  );
};
