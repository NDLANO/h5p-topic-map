import { ArrowItemType } from '../types/ArrowItemType';
import { ArrowType } from '../types/ArrowType';
import { TopicMapItemType } from '../types/TopicMapItemType';
import { TranslationKey } from '../types/TranslationKey';

const findItem = (
  id: string,
  items: Array<TopicMapItemType>,
): TopicMapItemType | null => {
  if (!id) {
    return null;
  }

  return items.find((item) => item.id === id) ?? null;
};

export const getDescriptiveText = (
  arrowItem: ArrowItemType,
  items: Array<TopicMapItemType>,
  t: (
    key: TranslationKey,
    values?: Record<string, string | number>,
  ) => string,
): string => {
  const { startElementId, endElementId, arrowType } = arrowItem;

  const startItem = findItem(startElementId, items);
  const endItem = findItem(endElementId, items);

  if (!startItem) {
    throw new Error('Start item not found');
  }
  if (!endItem) {
    throw new Error('End item not found');
  }

  const itemLabels = {
    startItem: startItem.label,
    endItem: endItem.label,
  };

  if (arrowType === ArrowType.Directional) {
    return t('directionalArrowDescriptiveText', itemLabels);
  }

  return t('biDirectionalArrowDescriptiveText', itemLabels);
};
