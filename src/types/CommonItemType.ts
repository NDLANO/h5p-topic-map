import type { H5PImage } from 'h5p-types';
import type { H5PText } from './H5PText';
import { DialogContent } from './DialogContent';

export type CommonItemType = {
  id: string;
  label: string;

  description?: H5PText;
  topicImage?: H5PImage;
  topicImageAltText?: string;

  dialog?: DialogContent;

  index?: number;
};
