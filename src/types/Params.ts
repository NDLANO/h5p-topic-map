import type { Image } from 'h5p-types';
import { GridDimensions } from '../components/Grid/Grid';
import { ArrowItemType } from './ArrowItemType';
import { ColorTheme } from './ColorTheme';
import { TopicMapItemType } from './TopicMapItemType';
import { Translations } from './Translations';

export type Params = Readonly<{
  behaviour?: unknown;

  topicMap?: {
    topicMapItems?: Array<TopicMapItemType>;
    arrowItems?: Array<ArrowItemType>;

    gridBackgroundImage?: Image;
    colorTheme?: ColorTheme;
    grid?: GridDimensions;
  };

  l10n?: Translations;
}>;
