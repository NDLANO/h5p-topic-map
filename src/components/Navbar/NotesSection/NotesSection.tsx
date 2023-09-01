import * as React from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { H5PIntegration } from '../../../h5p/H5P.util';
import { useSizeClassNames } from '../../../hooks/useSizeClassNames';
import { useTranslation } from '../../../hooks/useTranslation';
import { ConfirmWindow } from '../../ConfirmWindow/ConfirmWindow';
import { Close, Content, Overlay, Portal, Root, Title, Trigger } from '@radix-ui/react-dialog';
import { useH5PInstance } from '../../../hooks/useH5PInstance';
import { NotesList } from './NotesList/NotesList';
import { CommonItemType } from '../../../types/CommonItemType';
import { useReactToPrint } from 'react-to-print';
import styles from './NotesSection.module.scss';

export type NotesSectionProps = {
  confirmSubmitAll: () => void;
  confirmDeletion: () => void;
  notesOpen: boolean;
  setNotesOpen: (open: boolean) => void;
  navbarTitle: string;
  allItems: CommonItemType[];
};

export const NotesSection: React.FC<NotesSectionProps> = ({
  confirmSubmitAll,
  confirmDeletion,
  notesOpen,
  setNotesOpen,
  navbarTitle,
  allItems,
}) => {
  const { t } = useTranslation();
  const h5pInstance = useH5PInstance();

  const printText = t('navbarNotesSectionPrintLabel');
  const exportAllUserDataText = t('navbarNotesSectionSubmitAllLabel');
  const deleteText = t('navbarNotesSectionDeleteLabel');

  const sizeClassNames = useSizeClassNames(styles);

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

  const exportAllButtonAndWindow = (
    <ConfirmWindow
      title={t('submitDataConfirmationWindowLabel')}
      confirmWindow={{
        confirmAction: confirmSubmitAll,
        confirmText: t('submitDataConfirmLabel'),
        denyText: t('submitDataDenyLabel'),
      }}
      button={{
        className: styles.mainBodyButton,
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
        className: styles.mainBodyButton,
        label: deleteText,
      }}
    />
  );

  return (
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
            <div className={`${styles.mainBody} ${sizeClassNames}`}>
              <Title asChild>
                <p className={styles.mainBodyTitle}>
                  {t('navbarNotesSectionTitle')}
                </p>
              </Title>
              <div className={styles.mainBodyTextWrapper}>
                {t('navbarNotesSectionBody')}
              </div>
              <div className={styles.mainBodyButtons}>
                <button
                  className={styles.mainBodyButton}
                  type="button"
                  aria-label={printText}
                  onClick={handlePrint}
                >
                  {printText}
                </button>
                {H5PIntegration.reportingIsEnabled ? (
                  exportAllButtonAndWindow
                ) : null}
                {deleteButtonAndWindow}
              </div>
            </div>
            <div
              className={styles.notesList}
              ref={notesListRef}
              title={navbarTitleForPrint}
            >
              <NotesList topicMapItems={allItems} navbarTitle={navbarTitle} />
            </div>
          </div>
          <Close className={styles.closeButton} aria-label={t('closeDialog')}>
            <Cross2Icon />
          </Close>
        </Content>
      </Portal>
    </Root>
  );
};
