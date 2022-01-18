import * as React from "react";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { TopicMapItem } from "../TopicMapItem/TopicMapItem";
import styles from "./Grid.module.scss";

export type GridProps = {
  items: Array<TopicMapItemType>;
};

export const Grid: React.FC<GridProps> = ({ items }) => {
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
          dialog={item.dialog}
          backgroundImage={item.backgroundImage}
          title={item.label}
        />
      </div>
    ));
  }, [items]);

  return (
    <div className={styles.gridWrapper}>
      <div className={styles.grid}>{children}</div>
    </div>
  );
};
