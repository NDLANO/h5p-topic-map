import { ArrowLeftIcon } from '@radix-ui/react-icons';
import * as React from 'react';
import { H5PIntegration } from '../../../h5p/H5P.util';
import { useL10n } from '../../../hooks/useLocalization';
import { useSizeClassNames } from '../../../hooks/useSizeClassNames';
import styles from './NotesSection.module.scss';

export type NotesSectionProps = {
  setDeleteConfirmationVisibility: (isVisible: boolean) => void;
  setSubmitAllConfirmationVisibility: (isVisible: boolean) => void;
  handlePrint: () => void;
  goToTopicMap: () => void;
};

export const NotesSection: React.FC<NotesSectionProps> = ({
  setDeleteConfirmationVisibility,
  setSubmitAllConfirmationVisibility,
  handlePrint,
  goToTopicMap,
}) => {
  const mainBodyTitle = useL10n('navbarNotesSectionTitle');
  const mainBodyText = useL10n('navbarNotesSectionBody');
  const printText = useL10n('navbarNotesSectionPrintLabel');
  const exportAllUserDataText = useL10n('navbarNotesSectionSubmitAllLabel');
  const deleteText = useL10n('navbarNotesSectionDeleteLabel');
  const goToTopicMapLabel = useL10n('goToTopicMapLabel');

  const sizeClassNames = useSizeClassNames(styles);

  return (
    <div className={`${styles.mainBody} ${sizeClassNames}`}>
      <div className={styles.mainBodyContent}>
        <div className={styles.mainBodyTitle}>
          <button
            type="button"
            onClick={goToTopicMap}
            className={styles.backArrow}
            aria-label={goToTopicMapLabel}
          >
            <ArrowLeftIcon width={22} height={22} />
          </button>
          <p>{mainBodyTitle}</p>
        </div>
        <div className={styles.mainBodyTextWrapper}>
          <div className={styles.mainBodyText}>{mainBodyText}</div>
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
              <button
                className={styles.mainBodyButton}
                type="button"
                aria-label={exportAllUserDataText}
                onClick={() => setSubmitAllConfirmationVisibility(true)}
              >
                {exportAllUserDataText}
              </button>
            ) : null}
            <button
              className={styles.mainBodyButton}
              type="button"
              aria-label={deleteText}
              onClick={() => setDeleteConfirmationVisibility(true)}
            >
              {deleteText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
