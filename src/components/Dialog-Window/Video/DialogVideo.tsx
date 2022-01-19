/* eslint-disable jsx-a11y/media-has-caption */
import * as React from "react";
import styles from "./DialogVideo.module.scss";

export type DialogVideoProps = {
  video: { path: string };
  description: string;
};

export const DialogVideo: React.FC<DialogVideoProps> = ({
  video,
  description,
}) => {
  return (
    <>
      <video controls>
        <source src={video?.path} />
      </video>
      <p className={styles.description}>{description}</p>
    </>
  );
};
