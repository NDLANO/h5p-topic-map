import * as React from 'react';
import { H5P, H5PIntegration } from '../../../h5p/H5P.util';
import { useTranslation } from '../../../hooks/useTranslation';
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
import { H5PButton } from './H5PButton';
import { CommonItemType } from '../../../types/CommonItemType';
import { useReactToPrint } from 'react-to-print';
import './NotesSection.css';

// The H5P dialog falls back to a generic core body string whenever dialogText
// is falsy, so a single space renders a blank body instead of that fallback.
const BLANK_BODY = ' ';

type NotesSectionProps = {
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

  const showConfirmDialog = ({
    headerText,
    confirmText,
    cancelText,
    onConfirm,
  }: {
    headerText: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
  }): void => {
    const containerElement = h5pInstance?.containerElement;
    if (!containerElement || !H5P?.ConfirmationDialog) {
      return;
    }

    const dialog = new H5P.ConfirmationDialog({
      instance: h5pInstance,
      headerText,
      dialogText: BLANK_BODY,
      confirmText,
      cancelText,
      theme: true,
    }).appendTo(containerElement);

    // The notes dialog is hidden while the confirmation dialog is shown, then
    // re-opened once the user confirms or cancels.
    dialog.on('confirmed', () => {
      onConfirm();
      setNotesOpen(true);
    });

    dialog.on('canceled', () => {
      setNotesOpen(true);
    });

    setNotesOpen(false);
    dialog.show();
  };

  // Only show copy button if the browser supports it (secure contexts only, in some or all supporting browsers).
  const showCopyButton = 'clipboard' in navigator;

  return (
    <DialogRoot open={notesOpen} onOpenChange={setNotesOpen}>
      <DialogTrigger asChild>
        <button
          className={`h5p-topic-map-navigation-bar-notes-button ${notesOpen
            ? 'active'
            : ''}`}
          type="button"
          onClick={() => setNotesOpen(true)}
        >
          {t('navbarNotesSectionLabel')}
        </button>
      </DialogTrigger>
      <DialogPortal container={h5pInstance?.containerElement}>
        <DialogOverlay className="h5p-topic-map-modal-overlay" />
        <DialogContent aria-modal="true" className="h5p-topic-map-notes-section-dialog">
          <div className="h5p-topic-map-modal-wrapper">
            <div className="h5p-topic-map-notes-section-main-body">
              <DialogTitle asChild>
                <p className="h5p-topic-map-notes-section-main-body-title">
                  {t('navbarNotesSectionTitle')}
                </p>
              </DialogTitle>
              <DialogDescription className="h5p-topic-map-notes-section-main-body-text">
                {t('navbarNotesSectionBody')}
              </DialogDescription>
              <div className="h5p-topic-map-notes-section-main-body-buttons">
                <H5PButton icon={'print'} label={printText} onClick={handlePrint} />
                {showCopyButton && <H5PButton icon={'copy'} label={copyText} onClick={onCopy} />}
                {H5PIntegration?.reportingIsEnabled && (
                  <H5PButton
                    icon={'show-results'}
                    label={exportAllUserDataText}
                    onClick={() => showConfirmDialog({
                      headerText: t('submitDataConfirmationWindowLabel'),
                      confirmText: t('submitDataConfirmLabel'),
                      cancelText: t('submitDataDenyLabel'),
                      onConfirm: confirmSubmitAll,
                    })}
                  />
                )}
                <H5PButton
                  icon={'delete'}
                  label={deleteText}
                  onClick={() => showConfirmDialog({
                    headerText: t('deleteNotesConfirmationWindowLabel'),
                    confirmText: t('deleteNotesConfirmLabel'),
                    cancelText: t('deleteNotesDenyLabel'),
                    onConfirm: confirmDeletion,
                  })}
                />
              </div>
            </div>
            <div
              className="h5p-topic-map-notes-section-list"
              ref={notesListRef}
              title={navbarTitleForPrint}
            >
              <NotesList topicMapItems={allItems} navbarTitle={navbarTitle} />
            </div>
          </div>
          <DialogClose className="h5p-topic-map-modal-close-button" aria-label={t('closeDialog')}>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};
