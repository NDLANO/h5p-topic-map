/* eslint-disable no-unused-expressions */
import { Content, List, Root, Trigger } from '@radix-ui/react-tabs';
import * as React from 'react';
import { useMedia } from 'react-use';
import { useL10n } from '../../../hooks/useLocalization';
import { CommonItemType } from '../../../types/CommonItemType';
import { DialogAudio } from '../Audio/DialogAudio';
import { DialogNote } from '../Notes/DialogNote';
import { DialogResources } from '../Resources/DialogResources';
import { DialogText } from '../Text/DialogText';
import { DialogVideo } from '../Video/DialogVideo';
import styles from './DialogTabs.module.scss';

export type TabProps = {
  item: CommonItemType;
};

type Translation = {
  audio: string;
  video: string;
  links: string;
  text: string;
};

const defaultTabValue = (item: CommonItemType) => {
  const { description, topicImage, dialog } = item;
  switch (true) {
    case dialog?.text !== '' || topicImage !== undefined || description !== '':
      return 'Text';
    case (dialog?.links &&
      dialog?.links?.filter((link) => Boolean(link.url)).length > 0) ||
      dialog?.showAddLinks:
      return 'Resources';
    case dialog?.video !== undefined:
      return 'Video';
    case dialog?.audio?.audioFile !== undefined:
      return 'Audio';
    default:
      return '';
  }
};

const tabLabelItems = (
  item: CommonItemType,
  translation: Translation,
): JSX.Element[] => {
  const { description, topicImage, dialog } = item;
  const items = [];

  const showTextTab = dialog?.text || topicImage || description;
  const showLinksTab =
    (dialog?.links &&
      dialog?.links?.filter((link) => Boolean(link.url)).length > 0) ||
    dialog?.showAddLinks;

  showTextTab
    ? items.push(
      <Trigger key="Text" value="Text" className={styles.trigger}>
        {translation.text}
      </Trigger>,
    )
    : null;
  showLinksTab
    ? items.push(
      <Trigger key="links" className={styles.trigger} value="Resources">
        {translation.links}
      </Trigger>,
    )
    : null;
  dialog?.video?.[0]?.path
    ? items.push(
      <Trigger key="video" className={styles.trigger} value="Video">
        {translation.video}
      </Trigger>,
    )
    : null;
  dialog?.audio?.audioFile?.[0]?.path
    ? items.push(
      <Trigger key="audio" className={styles.trigger} value="Audio">
        {translation.audio}
      </Trigger>,
    )
    : null;
  return items;
};

const tabItems = (item: CommonItemType): JSX.Element[] => {
  const { id, description, topicImage, topicImageAltText, dialog } = item;
  const items: JSX.Element[] = [];

  const showTextTab = dialog?.text || topicImage || description;
  const showLinksTab =
    (dialog?.links &&
      dialog?.links?.filter((link) => Boolean(link.url)).length > 0) ||
    dialog?.showAddLinks;

  showTextTab
    ? items.push(
      <Content key="text" value="Text">
        <DialogText
          topicImage={topicImage}
          topicImageAltText={topicImageAltText}
          introduction={description}
          bodyText={dialog?.text}
        />
      </Content>,
    )
    : null;
  showLinksTab
    ? items.push(
      <Content key="links" value="Resources">
        <DialogResources
          relevantLinks={dialog.links}
          showAddLinks={dialog.showAddLinks}
          id={id}
        />
      </Content>,
    )
    : null;
  dialog?.video?.[0]?.path
    ? items.push(
      <Content key="video" value="Video">
        <DialogVideo sources={dialog.video} />
      </Content>,
    )
    : null;
  dialog?.audio?.audioFile?.[0]?.path
    ? items.push(
      <Content key="audio" value="Audio">
        <DialogAudio
          audioTrack={dialog.audio.audioFile[0]}
          subtext={dialog.audio.subtext}
        />
      </Content>,
    )
    : null;
  return items;
};

export const DialogTabs: React.FC<TabProps> = ({ item }) => {
  const translation: Translation = {
    audio: useL10n('copyrightAudio'),
    video: useL10n('copyrightVideo'),
    links: useL10n('dialogResourcesLabel'),
    text: useL10n('dialogTextLabel'),
  };

  const listAriaLabel = useL10n('dialogTabListAriaLabel');
  const noteLabel = useL10n('dialogNoteLabel');
  const smallScreen = useMedia('(max-width: 768px)');

  const hasNote = item.dialog?.hasNote;

  // Only show tabs if there is more than one item to choose from
  const tabItemslength = tabItems(item).length;
  const showTabs = tabItemslength + (hasNote && smallScreen ? 1 : 0) > 1;

  return (
    <Root
      className={styles.tabs}
      defaultValue={defaultTabValue(item)}
      orientation="vertical"
    >
      <List className={showTabs ? styles.list : ''} aria-label={listAriaLabel}>
        {showTabs && tabLabelItems(item, translation)}
        {smallScreen && hasNote ? (
          <Trigger key="notes" className={styles.trigger} value="notes">
            {noteLabel}
          </Trigger>
        ) : null}
      </List>
      <div
        className={`${styles.tabItemWrapper} ${
          !showTabs ? styles.marginTop : ''
        }`}
      >
        {tabItems(item)}
        {smallScreen && hasNote ? (
          <Content key="notes" value="notes" className={styles.noteWrapper}>
            <DialogNote
              maxLength={item.dialog?.maxWordCount ?? 160}
              id={item.id}
              smallScreen
            />
          </Content>
        ) : null}
      </div>
    </Root>
  );
};
