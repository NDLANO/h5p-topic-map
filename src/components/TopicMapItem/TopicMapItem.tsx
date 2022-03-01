import * as React from "react";
import { FC, MouseEventHandler } from "react";
import { useAppWidth } from "../../hooks/useAppWidth";
import { BreakpointSize } from "../../types/BreakpointSize";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { NoteButton } from "../NoteButton/NoteButton";
import styles from "./TopicMapItem.module.scss";
import { NoteButtonIconState } from "../../types/NoteButtonIconState";
import { UserData } from "../../types/UserData";

export type TopicMapItemProps = {
  item: TopicMapItemType;
  onClick: MouseEventHandler;
  userDataCopy: UserData;
};

const sizeClassname = {
  [BreakpointSize.Large]: styles.large,
  [BreakpointSize.Medium]: styles.medium,
  [BreakpointSize.Small]: styles.small,
  [BreakpointSize.XSmall]: styles.xSmall,
};

export const TopicMapItem: FC<TopicMapItemProps> = ({
  item,
  onClick,
  userDataCopy,
}) => {
  const appWidth = useAppWidth();

  const className = React.useMemo(
    () => [styles.topicMapItem, sizeClassname[appWidth]].join(" "),
    [appWidth],
  );

  let btnState: NoteButtonIconState = NoteButtonIconState.Default;
  if (item.dialog?.hasNote) {
    switch (true) {
      case userDataCopy[item.id]?.noteCompleted:
        btnState = NoteButtonIconState.Completed;
        break;
      case userDataCopy[item.id]?.note &&
        userDataCopy[item.id]?.note?.length !== 0:
        btnState = NoteButtonIconState.Notes;
        break;
      default:
        btnState = NoteButtonIconState.Default;
    }
  }

  return (
    <button type="button" className={className} onClick={onClick}>
      {item.topicImage?.path && (
        <img
          className={styles.image}
          src={item.topicImage.path}
          alt={item.topicImage.alt ?? ""}
          width={item.topicImage.width}
          height={item.topicImage.height}
        />
      )}

      <div
        className={`${styles.inner} ${
          item.topicImage?.path ? "" : styles.noImage
        } ${item.dialog?.hasNote ? styles.withNote : ""}`}
      >
        {item.dialog?.hasNote ? (
          <div
            className={`${styles.icon} ${
              item.topicImage?.path ? "" : styles.withoutImage
            }`}
          >
            <NoteButton
              backgroundColor="var(--theme-color-3)"
              borderColor="white"
              iconColor="white"
              buttonState={btnState}
            />
          </div>
        ) : null}
        <div
          className={styles.label}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: item.label }}
        />
        {item.description && (
          <div
            className={styles.description}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        )}
      </div>
    </button>
  );
};
