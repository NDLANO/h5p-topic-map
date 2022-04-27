import { Cross2Icon } from "@radix-ui/react-icons";
import * as React from "react";
import { useEffectOnce } from "react-use";
import { H5P } from "../../../h5p/H5P.util";
import { useContentId } from "../../../hooks/useContentId";
import { useL10n } from "../../../hooks/useLocalization";
import { useLocalStorageUserData } from "../../../hooks/useLocalStorageUserData";
import { Link } from "../../../types/Link";
import styles from "./DialogResources.module.scss";

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
  const [userData, setUserData] = useLocalStorageUserData(contentId);
  const [link, setLink] = React.useState("");
  const [customLinks, setCustomLinks] = React.useState<Array<JSX.Element>>([]);
  const inputFieldRef = React.useRef<HTMLInputElement>(null);

  const relevantLinkLabel = useL10n("dialogResourcesRelevantLinks");
  const customLinkLabel = useL10n("dialogResourcesCustomLinks");
  const addLinkLabel = useL10n("dialogResourcesAdd");

  const removeCustomLink = (linkToRemove: string): void => {
    userData.dialogs[id].links = userData.dialogs[id].links?.filter(
      (item: Link) => item.id !== linkToRemove,
    );

    setUserData(userData);
    // we can disable this check since this function will not be called before the page is rendered
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    populateCustomLinks();
  };

  const normalizeLinkPath = (linkPath: string): string => {
    const pathAlreadyAbsolute =
      linkPath.startsWith("http://") || linkPath.startsWith("https://");

    if (pathAlreadyAbsolute) {
      return linkPath;
    }

    return `https://${linkPath}`;
  };

  const getRootUrl = (linkPath: string): string => {
    const normalizedLink = normalizeLinkPath(linkPath);
    const url = new URL(normalizedLink);

    let rootUrl = url.hostname;
    if (rootUrl.startsWith("www.")) {
      rootUrl = rootUrl.replace("www.", "");
    }
    return rootUrl;
  };

  const relevantItems =
    relevantLinks != null
      ? relevantLinks.map((item: Link) =>
          item.url ? (
            <li key={item.id} className={styles.li}>
              <a
                href={normalizeLinkPath(item.url)}
                target="_blank"
                rel="noreferrer noopener"
              >
                {item.label} ({getRootUrl(item.url)})
              </a>
            </li>
          ) : null,
        )
      : null;

  // extract the generation of custom links list to separate function
  const populateCustomLinks = (): void => {
    const { links } = userData.dialogs[id] ?? {};
    if (!links) {
      return;
    }

    const updatedLinks = links.map(item => (
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
          onClick={() => removeCustomLink(item.id)}
        >
          <Cross2Icon />
        </button>
      </li>
    ));

    setCustomLinks(updatedLinks);
  };

  const saveCustomLink = (newLink: string): void => {
    const tempNewLink: Link = {
      id: H5P.createUUID(),
      url: newLink,
      label: newLink,
    };

    if (!userData.dialogs[id]) {
      userData.dialogs[id] = {};
    }

    const dialogData = userData.dialogs[id];
    if (!dialogData.links) {
      dialogData.links = [];
    }

    dialogData.links.push(tempNewLink);

    setUserData(userData);
    populateCustomLinks();
  };

  const updateCustomList = (): void => {
    if (link.length < 3) {
      return;
    }

    saveCustomLink(link);
    setLink("");

    if (inputFieldRef.current != null) {
      inputFieldRef.current.value = "";
    }
  };

  // build a list of custom links for the first render
  useEffectOnce(() => {
    populateCustomLinks();
  });

  return (
    <form
      onSubmit={event => {
        updateCustomList();
        event.preventDefault();
      }}
    >
      {relevantItems ? (
        <>
          <p>{relevantLinkLabel}:</p>
          <ul className={styles.ul}>{relevantItems}</ul>
        </>
      ) : null}
      {showAddLinks ? (
        <>
          <p>{customLinkLabel}:</p>
          <ul className={styles.ul}>{customLinks}</ul>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              placeholder="www.example.com"
              onChange={e => setLink(e.target.value)}
              ref={inputFieldRef}
            />
            <button
              className={styles.inputButton}
              type="button"
              onClick={() => updateCustomList()}
            >
              {addLinkLabel}
            </button>
          </div>
        </>
      ) : null}
    </form>
  );
};
