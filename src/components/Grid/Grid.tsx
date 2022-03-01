import * as React from "react";
import { useState } from "react";
import { Xwrapper } from "react-xarrows";
import { ArrowItemType } from "../../types/ArrowItemType";
import { CommonItemType } from "../../types/CommonItemType";
import { Image } from "../../types/H5P/Image";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { UserData } from "../../types/UserData";
import { Arrow } from "../Arrow/Arrow";
import { DialogWindow } from "../Dialog-Window/DialogWindow";
import { TopicMapItem } from "../TopicMapItem/TopicMapItem";
import styles from "./Grid.module.scss";

export type GridProps = {
  items: Array<TopicMapItemType>;
  arrowItems: Array<ArrowItemType>;
  backgroundImage: Image | undefined;
  setUserDataCopy: React.Dispatch<React.SetStateAction<UserData>>;
  userDataCopy: UserData;
};

export const Grid: React.FC<GridProps> = ({
  items,
  arrowItems,
  backgroundImage,
  setUserDataCopy,
  userDataCopy,
}) => {
  const [itemShowingDialog, setItemShowingDialog] =
    useState<CommonItemType | null>(null);

  const arrows = React.useMemo(() => {
    const onClick = (item: ArrowItemType): void => {
      setItemShowingDialog(item);
    };

    return arrowItems.map(item => (
      <Arrow key={item.id} item={item} onClick={() => onClick(item)} />
    ));
  }, [arrowItems]);

  const children = React.useMemo(
    () =>
      items.map(item => (
        <div
          key={item.id}
          id={item.id}
          className={styles.itemWrapper}
          style={{
            left: `${item.xPercentagePosition}%`,
            top: `${item.yPercentagePosition}%`,
            height: `${item.heightPercentage}%`,
            width: `${item.widthPercentage}%`,
          }}
        >
          <TopicMapItem
            item={item}
            onClick={() => setItemShowingDialog(item)}
            userDataCopy={userDataCopy}
          />
        </div>
      )),
    [items, userDataCopy],
  );

  const bgImageStyle: string | undefined = backgroundImage?.path
    ? `url(${backgroundImage.path})`
    : undefined;

  return (
    <Xwrapper>
      <div
        className={styles.gridWrapper}
        style={{ backgroundImage: bgImageStyle }}
      >
        <div className={styles.grid}>
          {arrows}
          {children}
          {itemShowingDialog?.dialog ? (
            <DialogWindow
              item={itemShowingDialog}
              open={!!itemShowingDialog}
              onOpenChange={() => setItemShowingDialog(null)}
              setUserDataCopy={setUserDataCopy}
              userDataCopy={userDataCopy}
            />
          ) : null}
        </div>
      </div>
    </Xwrapper>
  );
};
