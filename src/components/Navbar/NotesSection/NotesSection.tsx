import { ArrowLeftIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import { H5PIntegration } from '../../../h5p/H5P.util';
import { useSizeClassNames } from '../../../hooks/useSizeClassNames';
import { useTranslation } from '../../../hooks/useTranslation';
import { ConfirmWindow } from '../../ConfirmWindow/ConfirmWindow';
import styles from './NotesSection.module.scss';

export type NotesSectionProps = {
  setDeleteConfirmationVisibility: (isVisible: boolean) => void;
  setSubmitAllConfirmationVisibility: (isVisible: boolean) => void;
  handlePrint: () => void;
  goToTopicMap: () => void;
  isSubmitAllConfirmationVisible: boolean;
  isDeleteConfirmationVisible: boolean;
  confirmSubmitAll: () => void;
  confirmDeletion: () => void;
  denySubmitAll: () => void;
  denyDeletion: () => void;
};

export const NotesSection: React.FC<NotesSectionProps> = ({
  setDeleteConfirmationVisibility,
  setSubmitAllConfirmationVisibility,
  handlePrint,
  goToTopicMap,
  isSubmitAllConfirmationVisible,
  isDeleteConfirmationVisible,
  confirmSubmitAll,
  confirmDeletion,
  denySubmitAll,
  denyDeletion,
}) => {
  const { t } = useTranslation();

  const printText = t('navbarNotesSectionPrintLabel');
  const exportAllUserDataText = t('navbarNotesSectionSubmitAllLabel');
  const deleteText = t('navbarNotesSectionDeleteLabel');

  const sizeClassNames = useSizeClassNames(styles);

  return (
    <div className={`${styles.mainBody} ${sizeClassNames}`}>
      <div className={styles.mainBodyContent}>
        <div className={styles.mainBodyTitle}>
          <button
            type="button"
            onClick={goToTopicMap}
            className={styles.backArrow}
            aria-label={t('goToTopicMapLabel')}
          >
            <ArrowLeftIcon width={22} height={22} />
          </button>
          <p>{t('navbarNotesSectionTitle')}</p>
        </div>
        <div className={styles.mainBodyTextWrapper}>
          <div className={styles.mainBodyText}>
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
              <ConfirmWindow
                title={t('submitDataConfirmationWindowLabel')}
                open={isSubmitAllConfirmationVisible}
                onOpenChange={(isOpen) => {
                  if (!isOpen) denySubmitAll();
                }}
                confirmWindow={{
                  confirmAction: confirmSubmitAll,
                  denyAction: denySubmitAll,
                  confirmText: t('submitDataConfirmLabel'),
                  denyText: t('submitDataDenyLabel'),
                }}
                button={{
                  className: styles.mainBodyButton,
                  label: exportAllUserDataText,
                  onClick: () => setSubmitAllConfirmationVisibility(true),
                }}
              />
            ) : null}
            <ConfirmWindow
              title={t('deleteNotesConfirmationWindowLabel')}
              open={isDeleteConfirmationVisible}
              onOpenChange={(isOpen) => {
                if (!isOpen) denyDeletion();
              }}
              confirmWindow={{
                confirmAction: confirmDeletion,
                denyAction: denyDeletion,
                confirmText: t('deleteNotesConfirmLabel'),
                denyText: t('deleteNotesDenyLabel'),
              }}
              button={{
                className: styles.mainBodyButton,
                label: deleteText,
                onClick: () => setDeleteConfirmationVisibility(true),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
