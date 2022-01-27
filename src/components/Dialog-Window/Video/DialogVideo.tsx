/* eslint-disable jsx-a11y/media-has-caption */
import * as React from "react";
import { useL10n } from "../../../hooks/useLocalization";
import { Video } from "../../../types/H5P/Video";
import { formatCopyright } from "../../../utils/dialog.utils";
import styles from "./DialogVideo.module.scss";

export type DialogVideoProps = {
  video: Video;
};

export const DialogVideo: React.FC<DialogVideoProps> = ({ video }) => {
  const copyrightTitle = useL10n("copyrightVideo");

  return (
    <div className={styles.dialogVideo}>
      <video controls>
        <source src={video?.path} />
      </video>

      {video.copyright ? (
        <p className={styles.copyright}>
          {formatCopyright(copyrightTitle, video.copyright)}
        </p>
      ) : null}
    </div>
  );
};
