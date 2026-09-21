import { Cross2Icon } from '@radix-ui/react-icons';
import * as React from 'react';
import { H5P } from '../../../h5p/H5P.util';
import { useContentId } from '../../../hooks/useContentId';
import { useLocalStorageUserData } from '../../../hooks/useLocalStorageUserData';
import { useTranslation } from '../../../hooks/useTranslation';
import { Link } from '../../../types/Link';
import { normalizeLinkPath } from '../../../utils/link.utils';
import * as styles from './DialogResources.module.scss';

export type DialogResourceProps = {
  relevantLinks: Link[] | undefined;
  showAddLinks: boolean;
  id: string;
};

export const DialogResources: React.FC<DialogResourceProps> = ({
  relevantLinks,
  showAddLinks,
  id,
}) => {
  const contentId = useContentId();
  const [userData, setUserData] = useLocalStorageUserData();
  const [link, setLink] = React.useState('');
  const [customLinks, setCustomLinks] = React.useState<Link[]>(
    () => userData[contentId]?.dialogs[id]?.links ?? [],
  );
  const inputFieldRef = React.useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const updateDialogLinks = (updatedLinks: Link[]): void => {
    const contentUserData = userData[contentId] ?? { dialogs: {} };

    setCustomLinks(updatedLinks);
    setUserData({
      ...userData,
      [contentId]: {
        ...contentUserData,
        dialogs: {
          ...contentUserData.dialogs,
          [id]: {
            ...contentUserData.dialogs[id],
            links: updatedLinks,
          },
        },
      },
    });
  };

  const removeCustomLink = (linkToRemove: string): void => {
    const updatedLinks =
      userData[contentId]?.dialogs[id]?.links?.filter(
        (item: Link) => item.id !== linkToRemove,
      ) ?? [];

    updateDialogLinks(updatedLinks);
  };

  const getRootUrl = (linkPath: string): string => {
    const normalizedLink = normalizeLinkPath(linkPath);
    if (!URL.canParse(normalizedLink)) {
      return '';
    }

    let rootUrl = new URL(normalizedLink).hostname;
    if (rootUrl.startsWith('www.')) {
      rootUrl = rootUrl.replace('www.', '');
    }
    return rootUrl;
  };

  const relevantItems =
    relevantLinks != null
      ? relevantLinks.map((item: Link) => {
          const rootUrl = item.url ? getRootUrl(item.url) : '';
          if (!item.url || !rootUrl) {
            return null;
          }
          return (
            <li key={item.id} className={styles.li}>
              <a
                href={normalizeLinkPath(item.url)}
                target="_blank"
                rel="noreferrer noopener"
              >
                {item.label} ({rootUrl})
              </a>
            </li>
          );
        })
      : null;

  const saveCustomLink = (newLink: string): void => {
    const tempNewLink: Link = {
      id: H5P!.createUUID(),
      url: newLink,
      label: newLink,
    };

    const updatedLinks = [
      ...(userData[contentId]?.dialogs[id]?.links ?? []),
      tempNewLink,
    ];

    updateDialogLinks(updatedLinks);
  };

  const updateCustomList = (): void => {
    if (link.length < 3) {
      return;
    }

    saveCustomLink(link);
    setLink('');

    if (inputFieldRef.current != null) {
      inputFieldRef.current.value = '';
    }
  };

  return (
    <form
      onSubmit={(event) => {
        updateCustomList();
        event.preventDefault();
      }}
    >
      {relevantItems ? (
        <>
          <p>{t('dialogResourcesRelevantLinks')}:</p>
          <ul className={styles.ul}>{relevantItems}</ul>
        </>
      ) : null}
      {showAddLinks ? (
        <>
          <p>{t('dialogResourcesCustomLinks')}:</p>
          <ul className={styles.ul}>
            {customLinks.map((item: Link) => (
              <li key={item.id} className={styles.li}>
                <a
                  href={normalizeLinkPath(item.url)}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {item.url}
                </a>
                <button
                  className={styles.removeButton}
                  type="button"
                  aria-label={t('dialogResourcesRemoveLink').replace(
                    '@url',
                    item.url,
                  )}
                  onClick={() => removeCustomLink(item.id)}
                >
                  <Cross2Icon />
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              aria-label={t('dialogResourcesUrlLabel')}
              placeholder="www.example.com"
              onChange={(e) => setLink(e.target.value)}
              ref={inputFieldRef}
            />
            <button
              className={styles.inputButton}
              type="button"
              onClick={() => updateCustomList()}
            >
              {t('dialogResourcesAdd')}
            </button>
          </div>
        </>
      ) : null}
    </form>
  );
};
