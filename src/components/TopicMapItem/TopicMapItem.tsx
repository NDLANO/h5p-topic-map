import * as React from "react";
import type { Image } from "../../types/Image";
import styles from "./TopicMapItem.module.scss";

export type TopicMapItemProps = {
  id: string;
  backgroundImage: Image | undefined;
  title: string;
  editAction: (itemId: string) => void; // React.MouseEventHandler;
};

export const TopicMapItem: React.FC<TopicMapItemProps> = ({
  id,
  backgroundImage,
  title,
  editAction,
}) => {
  return (
    <button
      type="button"
      className={styles.topicMapItem}
      onClick={() => editAction(id)}
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
  );
};
