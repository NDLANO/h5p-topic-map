export const normalizeLinkPath = (linkPath: string): string => {
  const pathAlreadyAbsolute =
    linkPath.startsWith('http://') || linkPath.startsWith('https://');

  if (pathAlreadyAbsolute) {
    return linkPath;
  }

  return `https://${linkPath}`;
};

export const createLinksFromString = (text: string | null | undefined) => {
  if (!text) {
    return '';
  }
  const regex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  const newText = text.replace(regex, (url) => {
    const normalizedUrl = normalizeLinkPath(url);
    return `<a href="${normalizedUrl}" target="_blank" rel="noreferrer noopener">${url}</a>`;
  });
  return newText;
};