import { ColorTheme } from "../ColorTheme";
import { Image } from "./Image";
import { TopicMapItemType } from "../TopicMapItemType";
import { Translations } from "../Translations";

export type Params = Readonly<{
  behaviour?: unknown;

  topicMap?: {
    topicMapItems?: Array<TopicMapItemType> | undefined;
    appearance?: {
      backgroundImage?: Image;
      colorTheme?: ColorTheme;
    };
  };

  l10n?: Translations;
}>;
