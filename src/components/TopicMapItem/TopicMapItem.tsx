import * as React from "react";
import type { Image } from "../../types/Image";
import { DialogWindow } from "../Dialog-Window/DialogWindow";
import styles from "./TopicMapItem.module.scss";

export type TopicMapItemProps = {
  backgroundImage: Image | undefined;
  title: string;
  dialog?: {
    links?: Array<string>;
    video?: unknown;
    text?: string;
  };
};

export const TopicMapItem: React.FC<TopicMapItemProps> = ({
  dialog,
  backgroundImage,
  title,
}) => {
  const [isDialogueShown, setIsDialogueShown] = React.useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        className={styles.topicMapItem}
        onClick={() => setIsDialogueShown(true)}
      >
        {backgroundImage?.path && (
          <img
            className={styles.bgImage}
            src={backgroundImage.path}
            alt={backgroundImage.alt ?? ""}
          />
        )}
        <div className={styles.title}>{title}</div>
      </button>
      <DialogWindow
        title={title}
        notes={dialog?.text}
        open={isDialogueShown}
        onOpenChange={setIsDialogueShown}
      />
    </>
  );
};
