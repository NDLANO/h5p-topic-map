import { Content, List, Root, Trigger } from '@radix-ui/react-tabs';
import * as React from 'react';
import { useMedia } from 'react-use';
import { useTranslation } from '../../../hooks/useTranslation';
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

const useItemInfo = (item: CommonItemType): {
  hasText: boolean;
  hasLinks: boolean;
  hasVideo: boolean;
  hasAudio: boolean;
  showNote: boolean;
  showTabs: boolean;
} => {
  const { description, topicImage, dialog } = item;

  const smallScreen = useMedia('(max-width: 768px)');
  const hasNote = (item.dialog?.hasNote && smallScreen) ?? false;
  const showNote = hasNote && smallScreen;

  const hasText = !!(dialog?.text || topicImage || description);
  const hasLinks =
    !!((dialog?.links &&
      dialog?.links?.filter((link) => Boolean(link.url)).length > 0) ||
      dialog?.showAddLinks);
  const hasVideo = !!(dialog?.video?.[0]?.path);
  const hasAudio = !!(dialog?.audio?.audioFile?.[0]?.path);

  let content = 0;
  if (hasText) {
    content++;
  }
  if (hasLinks) {
    content++;
  }
  if (hasVideo) {
    content++;
  }
  if (hasAudio) {
    content++;
  }
  if (showNote) {
    content++;
  }

  // Only show tabs if there is more than one item to choose from
  const showTabs = content > 1;

  return {
    hasText,
    hasLinks,
    hasVideo,
    hasAudio,
    showNote,
    showTabs,
  };
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
  const { hasText, hasLinks, hasVideo, hasAudio } = useItemInfo(item);
  const items = [];

  hasText
    ? items.push(
      <Trigger key="Text" value="Text" className={styles.trigger}>
        {translation.text}
      </Trigger>,
    )
    : null;
  hasLinks
    ? items.push(
      <Trigger key="links" className={styles.trigger} value="Resources">
        {translation.links}
      </Trigger>,
    )
    : null;
  hasVideo
    ? items.push(
      <Trigger key="video" className={styles.trigger} value="Video">
        {translation.video}
      </Trigger>,
    )
    : null;
  hasAudio
    ? items.push(
      <Trigger key="audio" className={styles.trigger} value="Audio">
        {translation.audio}
      </Trigger>,
    )
    : null;
  return items;
};

const dialogContent = (item: CommonItemType): JSX.Element[] => {
  const { id, description, topicImage, topicImageAltText, dialog } = item;
  const { hasText, hasLinks, hasVideo, hasAudio, showTabs } = useItemInfo(item);
  const items: JSX.Element[] = [];

  // Dialog text
  if (hasText) {
    const dialogText = (
      <DialogText
        topicImage={topicImage}
        topicImageAltText={topicImageAltText}
        introduction={description}
        bodyText={dialog?.text}
      />
    );
    items.push(showTabs ? (
      <Content key="text" value="Text">
        {dialogText}
      </Content>) : (
      dialogText
    ));
  }

  // Dialog links
  if (hasLinks && dialog) {
    const dialogLinks = (
      <DialogResources
        relevantLinks={dialog.links}
        showAddLinks={dialog.showAddLinks}
        id={id}
      />
    );
    items.push(showTabs ? (
      <Content key="links" value="Resources">
        {dialogLinks}
      </Content>) : (
      dialogLinks
    ));
  }

  // Dialog video
  if (hasVideo && dialog?.video) {
    const dialogVideo = (
      <DialogVideo sources={dialog.video} />
    );
    items.push(showTabs ? (
      <Content key="video" value="Video">
        {dialogVideo}
      </Content>) : (
      dialogVideo
    ));
  }

  // Dialog audio
  if (hasAudio && dialog?.audio?.audioFile) {
    const dialogAudio = (
      <DialogAudio
        audioTrack={dialog.audio.audioFile[0]}
        subtext={dialog.audio.subtext}
      />
    );
    items.push(showTabs ? (
      <Content key="audio" value="Audio">
        {dialogAudio}
      </Content>) : (
      dialogAudio
    ));
  }
  return items;
};

export const DialogTabs: React.FC<TabProps> = ({ item }) => {
  const { t } = useTranslation();
  const { showNote, showTabs } = useItemInfo(item);

  const translation: Translation = {
    audio: t('copyrightAudio'),
    video: t('copyrightVideo'),
    links: t('dialogResourcesLabel'),
    text: t('dialogTextLabel'),
  };

  const dialogNote = (
    <DialogNote
      maxLength={item.dialog?.maxWordCount ?? 160}
      id={item.id}
      smallScreen
    />
  );

  return (
    <Root
      className={styles.tabs}
      defaultValue={defaultTabValue(item)}
      orientation="horizontal"
    >
      {showTabs ? (
        <List
          className={showTabs ? styles.list : ''}
          aria-label={t('dialogTabListAriaLabel')}
        >
          {showTabs && tabLabelItems(item, translation)}
          {showNote ? (
            <Trigger key="notes" className={styles.trigger} value="notes">
              {t('dialogNoteLabel')}
            </Trigger>
          ) : null}
        </List>
      ) : null}
      <div
        className={`${styles.tabItemWrapper} ${!showTabs ? styles.marginTop : ''
        }`}
      >
        {dialogContent(item)}
        {showNote ? (showTabs ? (
          <Content key="notes" value="notes" className={styles.noteWrapper}>
            {dialogNote}
          </Content>) : (
          dialogNote
        )) : null}
      </div>
    </Root>
  );
};
