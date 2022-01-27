/* eslint-disable jsx-a11y/media-has-caption */
import * as React from "react";
import { useL10n } from "../../../hooks/useLocalization";
import { Audio } from "../../../types/H5P/Audio";
import { formatCopyright } from "../../../utils/dialog.utils";
import styles from "./DialogAudio.module.scss";

export type DialogAudioProps = {
  audioTrack: Audio;
  subtext?: string;
};

export const DialogAudio: React.FC<DialogAudioProps> = ({
  audioTrack,
  subtext,
}) => {
  const copyrightTitle = useL10n("copyrightAudio");

  return (
    <>
      <audio className={styles.audioPlayer} src={audioTrack.path} controls />

      {audioTrack.copyright ? (
        <p className={styles.copyright}>
          {formatCopyright(copyrightTitle, audioTrack.copyright)}
        </p>
      ) : null}

      {subtext ? (
        <div
          className={styles.subtext}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: subtext }}
        />
      ) : null}
    </>
  );
};
