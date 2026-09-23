import * as React from 'react';
import { useState } from 'react';
import { useContentId } from '../../hooks/useContentId';
import { useH5PInstance } from '../../hooks/useH5PInstance';
import { useLocalStorageUserData } from '../../hooks/useLocalStorageUserData';
import { useTranslation } from '../../hooks/useTranslation';
import { CommonItemType } from '../../types/CommonItemType';
import { Params } from '../../types/Params';
import { exportAllUserData } from '../../utils/user-data.utils';
import { FullscreenButton } from '../FullscreenButton/FullscreenButton';
import { Grid } from '../Grid/Grid';
import { NotesSection } from './NotesSection/NotesSection';
import './Content.scss';
import { H5P } from '../../h5p/H5P.util';

export type ContentProps = {
  navbarTitle: string;
  params: Params;
};

export const Content: React.FC<ContentProps> = ({
  navbarTitle,
  params,
}) => {
  const contentId = useContentId();
  const h5pInstance = useH5PInstance();
  const { t } = useTranslation();
  const [userData, setUserData] = useLocalStorageUserData();
  const [notesOpen, setNotesOpen] = useState(false);
  const fullScreenSupported = h5pInstance?.isRoot() && H5P.fullscreenSupported;

  const [progressBarValue, setProgressBarValue] = useState(0);
  const [progressPercentage, setProgressPercentage] =
    useState(progressBarValue);

  const allItems = React.useMemo(
    () =>
      ((params.topicMap?.topicMapItems ?? []) as CommonItemType[]).concat(
        (params.topicMap?.arrowItems ?? []) as CommonItemType[],
      ),
    [params.topicMap?.arrowItems, params.topicMap?.topicMapItems],
  );

  const totalNotesToComplete = React.useMemo(
    () => allItems.filter((item) => item.dialog?.hasNote).length,
    [allItems],
  );
  const hasNotes = totalNotesToComplete > 0;

  const navbarRef = React.useRef<HTMLDivElement>(null);

  const navbarHeight = navbarRef.current?.getBoundingClientRect().height ?? 0;

  React.useEffect(() => {
    const newProgressBarValue = allItems.filter(
      (item) =>
        item.dialog?.hasNote && userData[contentId]?.dialogs[item.id]?.noteDone,
    ).length;

    setProgressBarValue(newProgressBarValue);
    setProgressPercentage(
      Math.round((newProgressBarValue / totalNotesToComplete) * 100),
    );
  }, [allItems, contentId, totalNotesToComplete, userData]);

  const deleteAllNotes = (): void => {
    if (!userData[contentId]) {
      return;
    }

    const contentUserData = userData[contentId];
    const updatedDialogs = { ...contentUserData.dialogs };

    allItems.forEach((item) => {
      if (updatedDialogs[item.id]) {
        updatedDialogs[item.id] = {
          ...updatedDialogs[item.id],
          note: undefined,
          noteDone: undefined,
        };
      }
    });

    setUserData({
      ...userData,
      [contentId]: {
        ...contentUserData,
        dialogs: updatedDialogs,
      },
    });
  };

  const submitAllNotes = (): void => {
    if (!h5pInstance) {
      return;
    }

    exportAllUserData(contentId, h5pInstance);
  };

  const handleCopy = (): void => {
    const itemsText = allItems.map((item): string => {
      const itemHasNote = item.dialog?.hasNote;
      const noteFilledIn = userData[contentId]?.dialogs?.[item.id]?.note;
      const noteMissing = t('navbarNotesMissingNoteLabel');

      if (itemHasNote) {
        if (noteFilledIn) {
          return `${item.label}\n${noteFilledIn}`;
        }
        return `${item.label}\n${noteMissing}`;
      }
      return '';
    });

    const cleanedText = itemsText.filter(Boolean).join('\n\n');
    navigator.clipboard.writeText(cleanedText);
  };

  const progressBar = (
    <div className="h5p-topic-map-navigation-bar-progress-bar">
      <div
        className="h5p-topic-map-navigation-bar-progress-bar-percentage"
        aria-hidden="true"
      >{`${progressPercentage}%`}</div>
      <progress
        className="h5p-topic-map-navigation-bar-progress-bar-progress"
        aria-label={t('progressBarDescriptiveText', {
          markedNotes: progressBarValue,
          totalNotes: totalNotesToComplete,
        })}
        value={progressPercentage}
        max={100}
      />
    </div>
  );

  return (
    <>
      <div
        className="h5p-topic-map-content"
        style={{
          // @ts-expect-error Custom properties are allowed
          '--h5p-tm-navbar-height': `${navbarHeight}px`,
        }}
      >
        <div className="h5p-topic-map-navigation-bar" ref={navbarRef}>
          <div className="h5p-topic-map-navigation-bar-title">
            {navbarTitle}
          </div>
          {hasNotes && (
            <div className="h5p-topic-map-navigation-bar-sections-menu">
              <NotesSection
                confirmSubmitAll={submitAllNotes}
                confirmDeletion={deleteAllNotes}
                onCopy={handleCopy}
                notesOpen={notesOpen}
                setNotesOpen={setNotesOpen}
                navbarTitle={navbarTitle}
                allItems={allItems}
              />
              {progressBar}
            </div>
          )}
          {fullScreenSupported &&
            <FullscreenButton/>
          }
        </div>

        <Grid
          items={params.topicMap?.topicMapItems ?? []}
          arrowItems={params.topicMap?.arrowItems ?? []}
          backgroundImage={params.topicMap?.gridBackgroundImage}
          grid={params.topicMap?.grid}
        />
      </div>
    </>
  );
};
