const linkRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

export const normalizeLinkPath = (linkPath: string): string => {
  const pathAlreadyAbsolute =
    linkPath.startsWith('http://') || linkPath.startsWith('https://');

  return pathAlreadyAbsolute ? linkPath : `https://${linkPath}`;
};

export const createLinksFromString = (text: string | null | undefined) => {
  if (!text) {
    return '';
  }
  return text.replace(linkRegex, (url) => {
    const normalizedUrl = normalizeLinkPath(url);
    return `<a href="${normalizedUrl}" target="_blank" rel="noreferrer noopener">${url}</a>`;
  });
};

// This function replaces '<' and '>' characters with their HTML entities.
export const replaceCharacters = (text: string | undefined) => {
  return text?.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};