import type { H5PCopyright } from 'h5p-types';
import { CommonItemType } from '../types/CommonItemType';

export const dialogHasContent = (item: CommonItemType): boolean => {
  if (!item.dialog) {
    return false;
  }

  if (item.dialog.hasNote) {
    return true;
  }

  const hasLinks = (
    item.dialog.links?.filter((link) => Boolean(link.url)) ??
    []
  ).length > 0;

  return Boolean(
    item.description ||
    item.topicImage ||
    item.dialog.audio?.audioFile ||
    hasLinks ||
    item.dialog.showAddLinks ||
    item.dialog.text ||
    item.dialog.video,
  );
};

export const formatCopyright = (
  copyrightTitle: string,
  { author, title, license }: H5PCopyright,
): string => {
  const showTitleAuthorDivider = title && author;

  return `${copyrightTitle}: ${title ?? ''} ${
    showTitleAuthorDivider ? '/' : ''
  } ${author ? ` ${author}` : ''} (${license})`;
};
