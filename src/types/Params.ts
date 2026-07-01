import type { H5PImage } from 'h5p-types';
import type { GridDimensions } from '../components/Grid/Grid';
import type { ArrowItemType } from './ArrowItemType';
import type { ColorTheme } from './ColorTheme';
import type { TopicMapItemType } from './TopicMapItemType';
import type { Translations } from './Translations';

export type Params = Readonly<{
  behaviour?: unknown;

  topicMap?: {
    topicMapItems?: Array<TopicMapItemType>;
    arrowItems?: Array<ArrowItemType>;

    gridBackgroundImage?: H5PImage;
    colorTheme?: ColorTheme;
    grid?: GridDimensions;
  };

  l10n?: Translations;
}>;
