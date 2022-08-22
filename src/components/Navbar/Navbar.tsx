import ProgressBar from "@ramonak/react-progress-bar";
import * as React from "react";
import { useState } from "react";
import type { FullScreenHandle } from "react-full-screen";
import { useReactToPrint } from "react-to-print";
import type { IH5PContentType } from "h5p-types";
import { useContentId } from "../../hooks/useContentId";
import { useH5PInstance } from "../../hooks/useH5PInstance";
import { useL10n } from "../../hooks/useLocalization";
import { useLocalStorageUserData } from "../../hooks/useLocalStorageUserData";
import { useSizeClassNames } from "../../hooks/useSizeClassNames";
import { CommonItemType } from "../../types/CommonItemType";
import { NavbarSections } from "../../types/NavbarSections";
import { Params } from "../../types/Params";
import { exportAllUserData } from "../../utils/user-data.utils";
import { DialogWindow } from "../Dialog-Window/DialogWindow";
import { FullscreenButton } from "../FullscreenButton/FullscreenButton";
import { Grid } from "../Grid/Grid";
import { HamburgerCloseIcon, HamburgerIcon } from "../Icons/Icons";
import { HelpSection } from "./HelpSection/HelpSection";
import styles from "./Navbar.module.scss";
import { NotesList } from "./NotesSection/NotesList/NotesList";
import { NotesSection } from "./NotesSection/NotesSection";
import { H5P } from "../../h5p/H5P.util";

export type NavbarProps = {
  navbarTitle: string;
  params: Params;
  fullscreenHandle: FullScreenHandle;
  toggleIPhoneFullscreen: () => void;
  isIPhoneFullscreenActive: boolean;
  instance: IH5PContentType;
};

export const Navbar: React.FC<NavbarProps> = ({
  navbarTitle,
  params,
  fullscreenHandle,
  toggleIPhoneFullscreen,
  isIPhoneFullscreenActive,
  instance,
}) => {
  const contentId = useContentId();
  const h5pInstance = useH5PInstance();

  const [userData, setUserData] = useLocalStorageUserData();

  const navbarAriaLabel = useL10n("navbarTabsListAriaLabel");
  const notesSectionLabel = useL10n("navbarNotesSectionLabel");
  const helpSectionLabel = useL10n("navbarHelpSectionLabel");
  const progressPercentageLabel = useL10n("progressPercentageLabel");
  const deleteAllNotesText = useL10n("deleteNotesConfirmationWindowLabel");
  const deleteAllNotesConfirmText = useL10n("deleteNotesConfirmLabel");
  const deleteAllNotesDenyText = useL10n("deleteNotesDenyLabel");
  const submitAllDataText = useL10n("submitDataConfirmationWindowLabel");
  const submitAllDataConfirmText = useL10n("submitDataConfirmLabel");
  const submitAllDataDenyText = useL10n("submitDataDenyLabel");

  const [currentSection, setCurrentSection] = useState(NavbarSections.TopicMap);

  const [progressBarValue, setProgressBarValue] = useState(0);
  const [progressPercentage, setProgressPercentage] =
    useState(progressBarValue);

  const [sectionMaxHeight, setSectionMaxHeight] = useState(0);
  const [notesListMaxHeight, setNotesListMaxHeight] = useState(0);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);
  const [isSubmitAllConfirmationVisible, setIsSubmitAllConfirmationVisible] =
    useState(false);

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const sizeClassNames = useSizeClassNames(styles);

  const allItems = React.useMemo(
    () =>
      ((params.topicMap?.topicMapItems ?? []) as CommonItemType[]).concat(
        (params.topicMap?.arrowItems ?? []) as CommonItemType[],
      ),
    [params.topicMap?.arrowItems, params.topicMap?.topicMapItems],
  );

  const totalNotesToComplete = React.useMemo(
    () => allItems.filter(item => item.dialog?.hasNote).length,
    [allItems],
  );
  const hasNotes = totalNotesToComplete > 0;

  const gridRef = React.useRef<HTMLDivElement>(null);
  const navbarRef = React.useRef<HTMLDivElement>(null);
  const notesSectionRef = React.useRef<HTMLDivElement>(null);

  const navbarHeight = navbarRef.current?.getBoundingClientRect().height ?? 0;
  const notesSectionHeight =
    notesSectionRef.current?.getBoundingClientRect().height ?? 0;

  /*
   * React supplies useResizeObserver hook, but H5P may trigger `resize` not
   * only when the window resizes
   */
  instance.on("resize", () => {
    window.requestAnimationFrame(() => {
      if (!gridRef.current) {
        return;
      }

      const contentRect = gridRef.current.getBoundingClientRect();
      if (currentSection === NavbarSections.TopicMap) {
        setSectionMaxHeight(0);
      } else if (contentRect.height > 0) {
        if (H5P.isFullscreen && contentRect.height <= window.innerHeight) {
          setSectionMaxHeight(window.innerHeight - navbarHeight);
        } else {
          setSectionMaxHeight(contentRect.height);
        }
      }
    });
  });

  React.useEffect(() => {
    if (currentSection === NavbarSections.TopicMap) {
      setSectionMaxHeight(0);
    } else {
      const initialHeight =
        gridRef.current?.getBoundingClientRect().height ?? 0;
      if (initialHeight > 0) {
        if (H5P.isFullscreen && initialHeight <= window.innerHeight) {
          setSectionMaxHeight(window.innerHeight - navbarHeight);
        } else {
          setSectionMaxHeight(initialHeight);
        }
      }
    }
  }, [currentSection, navbarHeight]);

  React.useEffect(() => {
    if (currentSection === NavbarSections.Notes) {
      if (H5P.isFullscreen) {
        setNotesListMaxHeight(
          window.innerHeight - navbarHeight - notesSectionHeight,
        );
      } else {
        setNotesListMaxHeight(sectionMaxHeight - notesSectionHeight);
      }
    }
  }, [currentSection, navbarHeight, notesSectionHeight, sectionMaxHeight]);

  React.useEffect(() => {
    const newProgressBarValue = allItems.filter(
      item =>
        item.dialog?.hasNote && userData[contentId]?.dialogs[item.id]?.noteDone,
    ).length;

    setProgressBarValue(newProgressBarValue);
    setProgressPercentage(
      Math.round((newProgressBarValue / totalNotesToComplete) * 100),
    );
  }, [allItems, contentId, totalNotesToComplete, userData]);

  let navbarTitleForPrint = "";
  const updateNavbarTitleForPrint = (): void => {
    navbarTitleForPrint = navbarTitleForPrint ? "" : navbarTitle;
  };
  const notesListRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => notesListRef.current,
    documentTitle: navbarTitle,
    onBeforeGetContent: updateNavbarTitleForPrint,
    onAfterPrint: updateNavbarTitleForPrint,
  });

  const deleteAllNotes = (): void => {
    allItems.forEach(item => {
      if (userData[contentId]?.dialogs?.[item.id]) {
        userData[contentId].dialogs[item.id].note = undefined;
        userData[contentId].dialogs[item.id].noteDone = undefined;
      }
    });
    setUserData(userData);
    setIsDeleteConfirmationVisible(false);
  };

  const confirmDeletion = (): void => {
    deleteAllNotes();
    setIsDeleteConfirmationVisible(false);
  };

  const denyDeletion = (): void => {
    setIsDeleteConfirmationVisible(false);
  };

  const submitAllNotes = (): void => {
    if (!h5pInstance) {
      return;
    }

    exportAllUserData(contentId, h5pInstance);
    setIsSubmitAllConfirmationVisible(false);
  };

  const confirmSubmitAll = (): void => {
    submitAllNotes();
    setIsSubmitAllConfirmationVisible(false);
  };

  const denySubmitAll = (): void => {
    setIsSubmitAllConfirmationVisible(false);
  };

  const fakeItem = {
    id: "id",
    label: deleteAllNotesText,
  };

  const deleteConfirmation = (
    <DialogWindow
      item={fakeItem}
      open={isDeleteConfirmationVisible}
      onOpenChange={isOpen => {
        if (!isOpen) denyDeletion();
      }}
      confirmWindow={{
        confirmAction: confirmDeletion,
        denyAction: denyDeletion,
        confirmText: deleteAllNotesConfirmText,
        denyText: deleteAllNotesDenyText,
      }}
    />
  );

  const submitAllConfirmation = (
    <DialogWindow
      item={{ id: "", label: submitAllDataText }}
      open={isSubmitAllConfirmationVisible}
      onOpenChange={isOpen => {
        if (!isOpen) denySubmitAll();
      }}
      confirmWindow={{
        confirmAction: confirmSubmitAll,
        denyAction: denySubmitAll,
        confirmText: submitAllDataConfirmText,
        denyText: submitAllDataDenyText,
      }}
    />
  );

  const goToTopicMap = (): void => setCurrentSection(NavbarSections.TopicMap);

  const notesSection = (
    <>
      <div ref={notesSectionRef}>
        <NotesSection
          setSubmitAllConfirmationVisibility={setIsSubmitAllConfirmationVisible}
          setDeleteConfirmationVisibility={setIsDeleteConfirmationVisible}
          handlePrint={handlePrint}
          goToTopicMap={goToTopicMap}
        />
      </div>
      <div
        className={styles.notesList}
        ref={notesListRef}
        title={navbarTitleForPrint}
        style={{
          minHeight: notesListMaxHeight,
          maxHeight: notesListMaxHeight,
        }}
      >
        <NotesList topicMapItems={allItems} navbarTitle={navbarTitle} />
      </div>
    </>
  );

  const progressBar = (
    <>
      <div
        className={styles.progressPercentage}
        aria-label={progressPercentageLabel}
      >{`${progressPercentage}%`}</div>
      <ProgressBar
        className={styles.progressBar}
        completed={progressPercentage}
        baseBgColor="var(--theme-color-1)"
        bgColor="var(--theme-color-4)"
        isLabelVisible={false}
      />
    </>
  );

  const sectionsMenu = (
    <>
      {hasNotes && (
        <button
          className={`${styles.sectionTitle} ${
            currentSection === NavbarSections.Notes && styles.active
          }`}
          type="button"
          onClick={() => setCurrentSection(NavbarSections.Notes)}
        >
          {notesSectionLabel}
        </button>
      )}

      <button
        className={`${styles.sectionTitle} ${
          currentSection === NavbarSections.Help && styles.active
        }`}
        type="button"
        onClick={() => setCurrentSection(NavbarSections.Help)}
      >
        {helpSectionLabel}
      </button>

      {hasNotes && (
        <div className={styles.progressBarWrapper}>{progressBar}</div>
      )}

      <div className={styles.fullscreenButtonNotMobile}>
        <FullscreenButton
          toggleIOSFullscreen={toggleIPhoneFullscreen}
          isIOSFullscreenActive={isIPhoneFullscreenActive}
        />
      </div>
    </>
  );

  const navButtonsMobile = (
    <div className={styles.navButtonsMobile}>
      <button
        type="button"
        className={styles.hamburgerButton}
        onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
      >
        {isHamburgerOpen ? (
          <HamburgerCloseIcon
            iconColor="#fff"
            width={undefined}
            height={undefined}
          />
        ) : (
          <HamburgerIcon
            iconColor="#fff"
            width={undefined}
            height={undefined}
          />
        )}
      </button>
      <div className={styles.fullscreenButtonMobile}>
        <FullscreenButton
          toggleIOSFullscreen={toggleIPhoneFullscreen}
          isIOSFullscreenActive={isIPhoneFullscreenActive}
        />
      </div>
    </div>
  );

  return (
    <>
      <div
        aria-label={navbarAriaLabel}
        className={sizeClassNames}
        style={{
          // @ts-expect-error Custom properties are allowed
          "--h5p-tm-navbar-height": `${navbarHeight}px`,
        }}
      >
        <div ref={navbarRef}>
          <div className={styles.navbarWrapper}>
            <button
              type="button"
              className={styles.navbarTitle}
              onClick={goToTopicMap}
            >
              {navbarTitle}
            </button>
            <div className={styles.sectionsMenuNotMobile}>{sectionsMenu}</div>
            {navButtonsMobile}
          </div>
        </div>

        <div className={styles.sectionsWrapper}>
          <div ref={gridRef}>
            <Grid
              items={params.topicMap?.topicMapItems ?? []}
              arrowItems={params.topicMap?.arrowItems ?? []}
              backgroundImage={params.topicMap?.gridBackgroundImage}
              grid={params.topicMap?.grid}
              fullscreenHandle={fullscreenHandle}
            />
          </div>
          {isHamburgerOpen && (
            <div className={styles.sectionsMenuMobile}>{sectionsMenu}</div>
          )}
          <div className={styles.sectionContentWrapper}>
            {currentSection === NavbarSections.Notes && notesSection}
            {currentSection === NavbarSections.Help && (
              <div
                className={styles.helpSectionWrapper}
                style={{
                  maxHeight: sectionMaxHeight,
                  minHeight: sectionMaxHeight,
                }}
              >
                <HelpSection goToTopicMap={goToTopicMap} />
              </div>
            )}
          </div>
        </div>
      </div>
      {deleteConfirmation}
      {submitAllConfirmation}
    </>
  );
};
