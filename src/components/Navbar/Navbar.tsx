import * as React from "react";
import { Trigger, Content, Tabs, TabsList } from "@radix-ui/react-tabs";
import { useReactToPrint } from "react-to-print";
import { useL10n } from "../../hooks/useLocalization";
import { HelpSection } from "./HelpSection/HelpSection";
import { NotesSection } from "./NotesSection/NotesSection";
import { NotesList } from "./NotesSection/NotesList/NotesList";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { getUserData, setUserData } from "../../hooks/useLocalStorage";
import styles from "./Navbar.module.scss";
import { DialogWindow } from "../Dialog-Window/DialogWindow";

export type NavbarProps = {
  navbarTitle: string;
  topicMapItems: TopicMapItemType[];
};

export const Navbar: React.FC<NavbarProps> = ({
  navbarTitle,
  topicMapItems,
}) => {
  const navbarAriaLabel = useL10n("navbarTabsListAriaLabel");
  const topicMapSectionLabel = useL10n("navbarTopicMapSectionLabel");
  const notesSectionLabel = useL10n("navbarNotesSectionLabel");
  const helpSectionLabel = useL10n("navbarHelpSectionLabel");
  const deleteAllNotesText = useL10n("deleteNotesConfirmationWindowLabel");
  const deleteAllNotesConfirmText = useL10n("deleteNotesConfirmLabel");
  const deleteAllNotesDenyText = useL10n("deleteNotesDenyLabel");
  const userData = getUserData();

  let navbarTitleForPrint = "";
  const updateNavbarTitleForPrint = (): void => {
    navbarTitleForPrint = navbarTitleForPrint ? "" : navbarTitle;
  };

  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: navbarTitle,
    onBeforeGetContent: updateNavbarTitleForPrint,
    onAfterPrint: updateNavbarTitleForPrint,
  });

  const [isNotesSectionShown, setIsNotesSectionIsShown] =
    React.useState<boolean>(false);

  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    React.useState<boolean>(false);

  const [isHamburgerOpen, setIsHamburgerOpen] = React.useState<boolean>(false);

  const deleteAllNotes = (): void => {
    topicMapItems.forEach(item => {
      if (item.id in userData) {
        userData[item.id].note = undefined;
        userData[item.id].noteCompleted = undefined;
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

  const notesSection = (
    <div
      className={styles.notesList}
      ref={componentRef}
      title={navbarTitleForPrint}
    >
      {isNotesSectionShown && (
        <div>
          <NotesList topicMapItems={topicMapItems} navbarTitle={navbarTitle} />
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className={styles.mainBody}>
        <button className={styles.navbarTitle} type="button">
          {navbarTitle}
        </button>
        <button
          type="button"
          className={styles.hamburgerButton}
          onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}
        >
          <svg
            className={styles.hamburgerButtonSvg}
            xmlns="http://www.w3.org/2000/svg"
            width={`${isHamburgerOpen ? "12" : "18"}`}
            height="12"
            viewBox={`${isHamburgerOpen ? "0 0 12 12" : "0 0 18 12"}`}
            fill="none"
          >
            <path
              fill="#fff"
              d={
                isHamburgerOpen
                  ? "M11.8337 1.34199L10.6587 0.166992L6.00033 4.82533L1.34199 0.166992L0.166992 1.34199L4.82533 6.00033L0.166992 10.6587L1.34199 11.8337L6.00033 7.17533L10.6587 11.8337L11.8337 10.6587L7.17533 6.00033L11.8337 1.34199Z"
                  : "M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z"
              }
            />
          </svg>
        </button>
        <Tabs defaultValue={topicMapSectionLabel}>
          <TabsList
            className={`${styles.sectionsMenu} ${
              !isHamburgerOpen && styles.hidden
            }`}
            aria-label={navbarAriaLabel}
          >
            <Trigger
              className={styles.sectionTitle}
              key={topicMapSectionLabel}
              value={topicMapSectionLabel}
              aria-label={topicMapSectionLabel}
            >
              {topicMapSectionLabel}
            </Trigger>
            <Trigger
              className={styles.sectionTitle}
              key={notesSectionLabel}
              value={notesSectionLabel}
              aria-label={notesSectionLabel}
            >
              {notesSectionLabel}
            </Trigger>
            <Trigger
              className={styles.sectionTitle}
              key={helpSectionLabel}
              value={helpSectionLabel}
              aria-label={helpSectionLabel}
            >
              {helpSectionLabel}
            </Trigger>
            {/* <Trigger
            className={styles.sectionTitle}
            key="▰▰▰▰▱▱▱▱▱▱ 40%"
            value="▰▰▰▰▱▱▱▱▱▱ 40%"
            aria-label="Progress bar"
          >
            ▰▰▰▰▱▱▱▱▱▱ 40%
          </Trigger>
          */}
          </TabsList>
          <Content
            className={styles.sectionContent}
            key={topicMapSectionLabel}
            value={topicMapSectionLabel}
          >
            <div />
          </Content>
          <Content
            className={styles.sectionContent}
            key={notesSectionLabel}
            value={notesSectionLabel}
          >
            <NotesSection
              setVisibility={setIsNotesSectionIsShown}
              setDeleteConfirmationVisibility={setIsDeleteConfirmationVisible}
              handlePrint={handlePrint}
            />
          </Content>
          <Content
            className={styles.sectionContent}
            key={helpSectionLabel}
            value={helpSectionLabel}
          >
            <HelpSection />
          </Content>
          {/* <Content
          className={styles.sectionContent}
          key="▰▰▰▰▱▱▱▱▱▱ 40%"
          value="▰▰▰▰▱▱▱▱▱▱ 40%"
        >
          <h3>Progress bar section</h3>
        </Content> */}
        </Tabs>
      </div>
      {notesSection}
      {deleteConfirmation}
    </>
  );
};
