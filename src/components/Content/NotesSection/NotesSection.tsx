import * as React from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { H5PIntegration } from '../../../h5p/H5P.util';
import { useTranslation } from '../../../hooks/useTranslation';
import { ConfirmWindow } from '../../ConfirmWindow/ConfirmWindow';
import {
  Close as DialogClose,
  Content as DialogContent,
  Description as DialogDescription,
  Overlay as DialogOverlay,
  Portal as DialogPortal,
  Root as DialogRoot,
  Title as DialogTitle,
  Trigger as DialogTrigger,
} from '@radix-ui/react-dialog';
import { useH5PInstance } from '../../../hooks/useH5PInstance';
import { NotesList } from './NotesList/NotesList';
import { CommonItemType } from '../../../types/CommonItemType';
import { useReactToPrint } from 'react-to-print';
import './NotesSection.scss';

export type NotesSectionProps = {
  confirmSubmitAll: () => void;
  confirmDeletion: () => void;
  onCopy: () => void;
  notesOpen: boolean;
  setNotesOpen: (open: boolean) => void;
  navbarTitle: string;
  allItems: CommonItemType[];
};

export const NotesSection: React.FC<NotesSectionProps> = ({
  confirmSubmitAll,
  confirmDeletion,
  onCopy,
  notesOpen,
  setNotesOpen,
  navbarTitle,
  allItems,
}) => {
  const { t } = useTranslation();
  const h5pInstance = useH5PInstance();

  const printText = t('navbarNotesSectionPrintLabel');
  const copyText = t('navbarNotesSectionCopyLabel');
  const exportAllUserDataText = t('navbarNotesSectionSubmitAllLabel');
  const deleteText = t('navbarNotesSectionDeleteLabel');

  let navbarTitleForPrint = '';
  const updateNavbarTitleForPrint = (): Promise<void> => {
    navbarTitleForPrint = navbarTitleForPrint ? '' : navbarTitle;
    return Promise.resolve();
  };
  const notesListRef = React.useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: notesListRef,
    documentTitle: navbarTitle,
    onBeforePrint: updateNavbarTitleForPrint,
    onAfterPrint: updateNavbarTitleForPrint,
  });

  const exportAllButtonAndWindow = (
    <ConfirmWindow
      title={t('submitDataConfirmationWindowLabel')}
      confirmWindow={{
        confirmAction: confirmSubmitAll,
        confirmText: t('submitDataConfirmLabel'),
        denyText: t('submitDataDenyLabel'),
      }}
      button={{
        className: 'mainBodyButton',
        label: exportAllUserDataText,
      }}
    />
  );

  const deleteButtonAndWindow = (
    <ConfirmWindow
      title={t('deleteNotesConfirmationWindowLabel')}
      confirmWindow={{
        confirmAction: confirmDeletion,
        confirmText: t('deleteNotesConfirmLabel'),
        denyText: t('deleteNotesDenyLabel'),
      }}
      button={{
        className: 'mainBodyButton',
        label: deleteText,
      }}
    />
  );

  // Only show the copy button if the browser supports it.
  // Available only in secure contexts (HTTPS), in some or all supporting browsers.
  const showCopyButton = 'clipboard' in navigator;

  return (
    <DialogRoot open={notesOpen} onOpenChange={setNotesOpen}>
      <DialogTrigger asChild>
        <button
          className={`h5p-topic-map-navigation-bar-notes-button ${notesOpen && 'active'}`}
          type="button"
          onClick={() => setNotesOpen(true)}
        >
          {t('navbarNotesSectionLabel')}
        </button>
      </DialogTrigger>
      <DialogPortal container={h5pInstance?.containerElement}>
        <DialogOverlay className="overlay" />
        <DialogContent aria-modal="true" className="notesDialogContent">
          <div className="contentWrapper">
            <div className="mainBody">
              <DialogTitle asChild>
                <p className="mainBodyTitle">
                  {t('navbarNotesSectionTitle')}
                </p>
              </DialogTitle>
              <DialogDescription className="mainBodyTextWrapper">
                {t('navbarNotesSectionBody')}
              </DialogDescription>
              <div className="mainBodyButtons">
                <button
                  className="mainBodyButton"
                  type="button"
                  onClick={handlePrint}
                >
                  {printText}
                </button>
                {showCopyButton && (
                  <button
                    className="mainBodyButton"
                    type="button"
                    onClick={onCopy}
                  >
                    {copyText}
                  </button>
                )}
                {H5PIntegration?.reportingIsEnabled ? (
                  exportAllButtonAndWindow
                ) : null}
                {deleteButtonAndWindow}
              </div>
            </div>
            <div
              className="notesList"
              ref={notesListRef}
              title={navbarTitleForPrint}
            >
              <NotesList topicMapItems={allItems} navbarTitle={navbarTitle} />
            </div>
          </div>
          <DialogClose className="closeButton" aria-label={t('closeDialog')}>
            <Cross2Icon />
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};
