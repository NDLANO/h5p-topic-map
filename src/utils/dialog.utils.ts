import type { Copyright } from 'h5p-types';

export const formatCopyright = (
  copyrightTitle: string,
  { author, title, license }: Copyright,
): string => {
  const showTitleAuthorDivider = title && author;

  return `${copyrightTitle}: ${title ?? ''} ${
    showTitleAuthorDivider ? '/' : ''
  } ${author ? ` ${author}` : ''} (${license})`;
};
