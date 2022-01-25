import type { CommonItemType } from "./CommonItemType";

export type TopicMapItemType = CommonItemType & {
  /**
   * The item's label. It is used both in the card preview of the item,
   * and as title for the dialog.
   *
   * Arrow labels are generated by their to and from TopicMapItems,
   * and therefore arrows do not have their own customizable labels.
   */
  label: string;
};
