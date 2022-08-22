import type { Image } from "h5p-types";
import * as React from "react";
import { useState } from "react";
import { ArrowItemType } from "../../types/ArrowItemType";
import { CommonItemType } from "../../types/CommonItemType";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { Arrow } from "../Arrow/Arrow";
import { DialogWindow } from "../Dialog-Window/DialogWindow";
import { TopicMapItem } from "../TopicMapItem/TopicMapItem";
import styles from "./Grid.module.scss";
import { H5P } from "../../h5p/H5P.util";

export type GridProps = {
  items: Array<TopicMapItemType>;
  arrowItems: Array<ArrowItemType>;
  backgroundImage: Image | undefined;
  grid?: GridDimensions;
};

export type GridDimensions = {
  numberOfColumns: number;
  numberOfRows: number;
};

export const Grid: React.FC<GridProps> = ({
  items,
  arrowItems,
  backgroundImage,
  grid,
}) => {
  const gridContainerRef = React.createRef<HTMLDivElement>();
  const [itemShowingDialog, setItemShowingDialog] =
    useState<CommonItemType | null>(null);

  const isArrow = (
    item: ArrowItemType | TopicMapItemType,
  ): item is ArrowItemType => (item as ArrowItemType).arrowType != null;

  const getFirstArrowPosition = (
    arrow: ArrowItemType,
    xORy: "x" | "y",
  ): number => {
    return arrow.startPosition?.[xORy] < arrow.endPosition?.[xORy]
      ? arrow.startPosition?.[xORy]
      : arrow.endPosition?.[xORy];
  };

  const sortItems = (a: TopicMapItemType, b: TopicMapItemType): number => {
    // Sort after index first
    if (a.index != null && b.index != null) {
      return a.index < b.index ? -1 : 1;
    }
    if (a.index != null && b.index == null) {
      return -1;
    }
    if (a.index == null && b.index != null) {
      return 1;
    }
    // Then sort after position
    if (a.xPercentagePosition === b.xPercentagePosition) {
      return a.yPercentagePosition < b.yPercentagePosition ? -1 : 1;
    }

    return a.xPercentagePosition < b.xPercentagePosition ? -1 : 1;
  };

  const sortArrowItems = React.useCallback(
    (a: ArrowItemType, b: ArrowItemType): number => {
      const arrowAx = getFirstArrowPosition(a, "x");
      const arrowBx = getFirstArrowPosition(b, "x");
      const arrowAy = getFirstArrowPosition(a, "y");
      const arrowBy = getFirstArrowPosition(b, "y");

      if (arrowAx === arrowBx) {
        return arrowAy < arrowBy ? 1 : -1;
      }

      return arrowAx < arrowBx ? 1 : -1;
    },
    [],
  );

  const addArrow = (
    array: Array<ArrowItemType | TopicMapItemType>,
    index: number,
    newItem: ArrowItemType,
  ): Array<ArrowItemType | TopicMapItemType> => {
    return [...array.slice(0, index), newItem, ...array.slice(index)];
  };

  const allMapItems = React.useMemo(() => {
    const onClick = (item: ArrowItemType): void => {
      setItemShowingDialog(item);
    };

    const sortedItems = items.concat().sort((a, b) => sortItems(a, b));
    let allItems: Array<TopicMapItemType | ArrowItemType> = sortedItems;

    arrowItems
      .concat()
      .sort((a, b) => sortArrowItems(a, b))
      .forEach(arrowItem => {
        allItems.forEach((mapItem, index) => {
          if (mapItem.id === arrowItem.startElementId) {
            allItems = addArrow(allItems, index + 1, arrowItem);
          }
        });
      });

    return allItems.map(item => {
      if (isArrow(item)) {
        return (
          <Arrow
            key={item.id}
            item={item}
            grid={grid}
            onClick={() => onClick(item)}
            onTouchStart={() => onClick(item)}
            onKeyUp={event => {
              if (event.key === "Enter" || event.code === "Space")
                onClick(item);
            }}
            dialogIsOpen={itemShowingDialog === item}
          />
        );
      }

      return (
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
            grid={grid}
            gridRef={gridContainerRef}
          />
        </div>
      );
    });

    // We want to update re-render the elements whenever `itemShowingDialog` changes (i.e. the dialog window is closed).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    arrowItems,
    grid,
    items,
    sortArrowItems,
    itemShowingDialog,
    gridContainerRef,
  ]);

  const bgImageStyle: string | undefined = backgroundImage?.path
    ? `url(${backgroundImage.path})`
    : undefined;

  const gridWrapperClasses = React.useMemo(
    () =>
      [
        styles.gridWrapper,
        H5P.isFullscreen ? styles.gridWrapperFullscreen : undefined,
      ]
        .filter(Boolean)
        .join(" "),
    [],
  );

  return (
    <div
      className={gridWrapperClasses}
      style={{
        backgroundImage: bgImageStyle,
      }}
    >
      <div className={styles.grid} ref={gridContainerRef}>
        {allMapItems}
        {itemShowingDialog?.dialog ? (
          <DialogWindow
            item={itemShowingDialog}
            open={!!itemShowingDialog}
            onOpenChange={() => setItemShowingDialog(null)}
          />
        ) : null}
      </div>
    </div>
  );
};
