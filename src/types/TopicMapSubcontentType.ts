import { H5PNewRunnableLibraryParam } from "h5p-types";
import type { CommonItemType } from "./CommonItemType";

export type TopicMapSubcontentType = CommonItemType & {
  subcontent: H5PNewRunnableLibraryParam;
} & {
  /** The x position as a percentage of the container's width */
  xPercentagePosition: number;

  /** The y position as a percentage of the container's height */
  yPercentagePosition: number;

  /** The width as a percentage of the container's width */
  widthPercentage: number;

  /** The height as a percentage of the container's height */
  heightPercentage: number;
};
