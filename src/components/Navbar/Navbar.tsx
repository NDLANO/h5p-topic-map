import * as React from 'react';
import { useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useContentId } from '../../hooks/useContentId';
import { useH5PInstance } from '../../hooks/useH5PInstance';
import { useLocalStorageUserData } from '../../hooks/useLocalStorageUserData';
import { useSizeClassNames } from '../../hooks/useSizeClassNames';
import { useTranslation } from '../../hooks/useTranslation';
import { CommonItemType } from '../../types/CommonItemType';
import { Params } from '../../types/Params';
import { exportAllUserData } from '../../utils/user-data.utils';
import { FullscreenButton } from '../FullscreenButton/FullscreenButton';
import { Grid } from '../Grid/Grid';
import { NotesList } from './NotesSection/NotesList/NotesList';
import { NotesSection } from './NotesSection/NotesSection';
import { Close, Content, Overlay, Portal, Root, Trigger } from '@radix-ui/react-dialog';
import styles from './Navbar.module.scss';
import { Cross2Icon } from '@radix-ui/react-icons';

export type NavbarProps = {
  navbarTitle: string;
  params: Params;
  toggleIPhoneFullscreen: () => void;
  isIPhoneFullscreenActive: boolean;
};

export const Navbar: React.FC<NavbarProps> = ({
  navbarTitle,
  params,
  toggleIPhoneFullscreen,
  isIPhoneFullscreenActive,
}) => {
  const contentId = useContentId();
  const h5pInstance = useH5PInstance();
  const { t } = useTranslation();
  const [userData, setUserData] = useLocalStorageUserData();
  const [notesOpen, setNotesOpen] = useState(false);

  const [progressBarValue, setProgressBarValue] = useState(0);
  const [progressPercentage, setProgressPercentage] =
    useState(progressBarValue);

  const sizeClassNames = useSizeClassNames(styles);

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

  const gridRef = React.useRef<HTMLDivElement>(null);
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

  let navbarTitleForPrint = '';
  const updateNavbarTitleForPrint = (): void => {
    navbarTitleForPrint = navbarTitleForPrint ? '' : navbarTitle;
  };
  const notesListRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => notesListRef.current,
    documentTitle: navbarTitle,
    onBeforeGetContent: updateNavbarTitleForPrint,
    onAfterPrint: updateNavbarTitleForPrint,
  });

  const deleteAllNotes = (): void => {
    allItems.forEach((item) => {
      if (userData[contentId]?.dialogs?.[item.id]) {
        userData[contentId].dialogs[item.id].note = undefined;
        userData[contentId].dialogs[item.id].noteDone = undefined;
      }
    });
    setUserData(userData);
  };

  const submitAllNotes = (): void => {
    if (!h5pInstance) {
      return;
    }

    exportAllUserData(contentId, h5pInstance);
  };

  const notesSection = (
    <Root open={notesOpen} onOpenChange={setNotesOpen}>
      <Trigger asChild>
        <button
          className={`${styles.sectionTitle} ${notesOpen && styles.active
          }`}
          type="button"
          onClick={() => setNotesOpen(true)}
        >
          {t('navbarNotesSectionLabel')}
        </button>
      </Trigger>
      <Portal container={h5pInstance?.containerElement}>
        <Overlay className={styles.overlay} />
        <Content className={styles.dialogContent}>
          <div className={styles.contentWrapper}>
            <NotesSection
              handlePrint={handlePrint}
              confirmSubmitAll={submitAllNotes}
              confirmDeletion={deleteAllNotes}
            />
            <div
              className={styles.notesList}
              ref={notesListRef}
              title={navbarTitleForPrint}
            >
              <NotesList topicMapItems={allItems} navbarTitle={navbarTitle} />
            </div>
          </div>
          <Close asChild>
            <button
              type="button"
              className={styles.closeButton}
              aria-label={t('closeDialog')}
            >
              <Cross2Icon />
            </button>
          </Close>
        </Content>
      </Portal>
    </Root>
  );

  const progressBar = (
    <div className={styles.progressBarWrapper}>
      <div
        className={styles.progressPercentage}
        aria-hidden="true"
      >{`${progressPercentage}%`}</div>
      <progress
        className={styles.progress}
        aria-label={t('progressBarDescriptiveText').replace('@markedNotes', `${progressBarValue}`).replace('@totalNotes', `${totalNotesToComplete}`)}
        value={progressPercentage}
        aria-valuemin={0}
        aria-valuenow={progressPercentage}
        aria-valuemax={100}
        max={100}
      >
        <div className={styles.progressBar}>
          <span style={{ width: `${progressPercentage}%` }}>
            <span className={styles.visuallyHidden}>{progressPercentage}%</span>
          </span>
        </div>
      </progress>
    </div>
  );

  return (
    <>
      <div
        aria-label={t('navbarTabsListAriaLabel')}
        className={sizeClassNames}
        style={{
          // @ts-expect-error Custom properties are allowed
          '--h5p-tm-navbar-height': `${navbarHeight}px`,
        }}
      >
        <div ref={navbarRef}>
          <div className={styles.navbarWrapper}>
            <div className={styles.navbarTitle}>
              {navbarTitle}
            </div>
            {hasNotes && (
              <div className={styles.sectionsMenu}>
                {notesSection}
                {progressBar}
              </div>
            )}
            <div className={styles.fullscreenButton}>
              <FullscreenButton
                toggleIOSFullscreen={toggleIPhoneFullscreen}
                isIOSFullscreenActive={isIPhoneFullscreenActive}
              />
            </div>
          </div>
        </div>

        <div className={styles.sectionsWrapper}>
          <div ref={gridRef}>
            <Grid
              items={params.topicMap?.topicMapItems ?? []}
              arrowItems={params.topicMap?.arrowItems ?? []}
              backgroundImage={params.topicMap?.gridBackgroundImage}
              grid={params.topicMap?.grid}
            />
          </div>
        </div>
      </div>
    </>
  );
};
