import { Cross2Icon } from '@radix-ui/react-icons';
import * as React from 'react';
import { H5PIntegration } from '../../../h5p/H5P.util';
import { useSizeClassNames } from '../../../hooks/useSizeClassNames';
import { useTranslation } from '../../../hooks/useTranslation';
import { ConfirmWindow } from '../../ConfirmWindow/ConfirmWindow';
import { Close, Title } from '@radix-ui/react-dialog';
import styles from './NotesSection.module.scss';

export type NotesSectionProps = {
  handlePrint: () => void;
  confirmSubmitAll: () => void;
  confirmDeletion: () => void;
};

export const NotesSection: React.FC<NotesSectionProps> = ({
  handlePrint,
  confirmSubmitAll,
  confirmDeletion,
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
          <Close asChild>
            <button
              type="button"
              className={styles.closeButton}
              aria-label={t('closeDialog')}
            >
              <Cross2Icon />
            </button>
          </Close>
          <Title asChild>
            <p>{t('navbarNotesSectionTitle')}</p>
          </Title>
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
            ) : null}
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
          </div>
        </div>
      </div>
    </div>
  );
};
