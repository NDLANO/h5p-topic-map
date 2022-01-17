import * as React from "react";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { DialogWindow } from "../Dialog-Window/DialogWindow";
import { TopicMapItem } from "../TopicMapItem/TopicMapItem";
import styles from "./Grid.module.scss";

export type GridProps = {
  items: Array<TopicMapItemType>;
};

export const Grid: React.FC<GridProps> = ({ items }) => {
  const [isDialogueShown, setIsDialogueShown] = React.useState<boolean>(false);

  const [editedItem, setEditedItem] = React.useState<TopicMapItemType | null>(
    null,
  );

  const openItemDialogueWindow = React.useCallback(
    (selectedItem: string): void => {
      setIsDialogueShown(true);
      setEditedItem(items.filter(item => item.id === selectedItem)[0]);
    },
    [items],
  );

  const closeItemDialogueWindow = (): void => {
    setIsDialogueShown(false);
    setEditedItem(null);
  };

  const children = React.useMemo(() => {
    return items.map(item => (
      <div
        key={item.id}
        className={styles.itemWrapper}
        style={{
          left: `${item.xPercentagePosition}%`,
          top: `${item.yPercentagePosition}%`,
          height: `${item.heightPercentage}%`,
          width: `${item.widthPercentage}%`,
        }}
      >
        <TopicMapItem
          id={item.id}
          backgroundImage={item.backgroundImage}
          title={item.label}
          editAction={openItemDialogueWindow}
        />
      </div>
    ));
  }, [items, openItemDialogueWindow]);

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.grid}>{children}</div>
      <DialogWindow
        title={editedItem?.label}
        notes={editedItem?.dialog?.text}
        open={isDialogueShown}
        onOpenChange={closeItemDialogueWindow}
      />
    </div>
  );
};
