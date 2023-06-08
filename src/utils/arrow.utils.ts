import { useL10n } from '../hooks/useLocalization';
import { ArrowItemType } from '../types/ArrowItemType';
import { ArrowType } from '../types/ArrowType';
import { TopicMapItemType } from '../types/TopicMapItemType';

export const findItem = (
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

  const directionalLabel = useL10n('directionalArrowDescriptiveText');
  const biDirectionalLabel = useL10n('biDirectionalArrowDescriptiveText');

  if (arrowType === ArrowType.Directional) {
    return directionalLabel.replace('@startItem', startItem.label).replace('@endItem', endItem.label);
  }

  return biDirectionalLabel.replace('@startItem', startItem.label).replace('@endItem', endItem.label);
};
