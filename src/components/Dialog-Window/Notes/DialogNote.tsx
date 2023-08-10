import * as React from 'react';
import { useContentId } from '../../../hooks/useContentId';
import { useLocalStorageUserData } from '../../../hooks/useLocalStorageUserData';
import { useSendXAPIEvent } from '../../../hooks/useSendXAPIEvent';
import { useTranslation } from '../../../hooks/useTranslation';
import { useAriaLive } from '../../../hooks/useAriaLive';
import styles from './DialogNote.module.scss';

export type NoteProps = {
  maxLength: number | undefined;
  id: string;
  smallScreen?: boolean;
};

export const DialogNote: React.FC<NoteProps> = ({
  maxLength,
  id,
  smallScreen,
}) => {
  const contentId = useContentId();
  const [userData, setUserData] = useLocalStorageUserData();
  const { t } = useTranslation();
  const { ariaLiveText, setAriaLiveText } = useAriaLive();

  const [note, setNote] = React.useState(
    userData[contentId]?.dialogs[id]?.note ?? '',
  );
  const [dynamicSavingText, setDynamicSavingText] = React.useState('');
  const [savingTextTimeout, setSavingTextTimeout] = React.useState<number>();
  const [noteDone, setMarkedAsDone] = React.useState(
    userData[contentId]?.dialogs[id]?.noteDone ?? false,
  );
  const [characterCount, setCharacterCount] = React.useState(0);
  const [maxLengthExceeded, setMaxLengthExceeded] = React.useState<number | undefined>();

  const { sendXAPIEvent } = useSendXAPIEvent();

  const noteTextareaID = `note-textarea_${id}`;
  const noteCheckboxID = `note-checkbox_${id}`;

  const handleNoteDone = (): void => {
    if (!userData[contentId]) {
      userData[contentId] = { dialogs: {} };
    }

    if (!userData[contentId]?.dialogs[id]) {
      userData[contentId].dialogs[id] = {};
    }

    userData[contentId].dialogs[id].noteDone = !noteDone;

    setMarkedAsDone(!noteDone);
    setUserData(userData);

    sendXAPIEvent('completed', {
      itemId: id,
      note,
      completed: userData[contentId]?.dialogs[id].noteDone ?? false,
    });
  };

  const setSavingText = (): void => {
    setDynamicSavingText(t('dialogNoteSaving'));
    setSavingTextTimeout(
      window.setTimeout(() => {
        const timestamp = new Date();
        const localTime = timestamp.toLocaleTimeString(
          window.navigator.language,
          {
            hour: '2-digit',
            minute: '2-digit',
          },
        );
        setDynamicSavingText(
          `${maxLengthExceeded ? `${t('dialogNoteLimitExceeded')} - ` : ''} ${t(
            'dialogNoteSaved',
          )} ${localTime}`,
        );

        sendXAPIEvent('answered', {
          itemId: id,
          note,
        });
      }, 650),
    );
  };

  const countCharacters = React.useCallback((): void => {
    const count = note.valueOf().length;
    setCharacterCount(count);

    if (!maxLength) return;
    const countOverMaxLength = count > maxLength;

    if (countOverMaxLength) {
      setMaxLengthExceeded(count);
      if (ariaLiveText !== t('dialogNoteLimitExceeded')) {
        setAriaLiveText(t('dialogNoteLimitExceeded'));
      }
    }
    else {
      setMaxLengthExceeded(undefined);
      if (ariaLiveText !== '') {
        setAriaLiveText('');
      }
    }
  }, [maxLength, note, savingTextTimeout]);

  React.useEffect(() => {
    // TODO: If this becomes laggy, add a debounce-timer to avoid saving more often than, say, every 100ms.

    if (!userData[contentId]) {
      userData[contentId] = { dialogs: {} };
    }
    if (!userData[contentId]?.dialogs[id]) {
      userData[contentId].dialogs[id] = {};
    }

    userData[contentId].dialogs[id].note = note;

    if (maxLength) {
      countCharacters();
    }
    // ensure there's no memory leak on component unmount during timeout
    return () => {
      if (savingTextTimeout != null) clearTimeout(savingTextTimeout);
    };
  }, [
    userData,
    id,
    note,
    setUserData,
    savingTextTimeout,
    countCharacters,
    contentId,
  ]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setSavingText();
    setNote(e.target.value);
    setUserData(userData);
  };

  return (
    <form>
      <label htmlFor={noteTextareaID}>
        <div className={styles.topGroup}>
          {!smallScreen && (
            <p className={styles.noteLabel}>{t('dialogNoteLabel')}</p>
          )}
          <p className={styles.dynamicSavingText}>{dynamicSavingText}</p>
        </div>
        <div className={`${styles.textAreaWrapper} ${maxLengthExceeded ? styles.lengthExceeded : ''}`}>
          <textarea
            className={styles.textArea}
            id={noteTextareaID}
            placeholder={t('dialogNotePlaceholder')}
            onChange={(event) => onChange(event)}
            defaultValue={note}
            maxLength={maxLength}
          />
          <div className={styles.bottomGroup}>
            <div className={styles.markAsDoneCheckbox}>
              <label htmlFor={noteCheckboxID}>
                <input
                  id={noteCheckboxID}
                  type="checkbox"
                  checked={noteDone}
                  onChange={handleNoteDone}
                />
                {t('dialogNoteMarkAsDone')}
              </label>
            </div>
            {maxLength && (
              <div className={`${styles.counter} ${maxLengthExceeded ? styles.redText : ''}`}>
                <span data-testid={`testId-note-characterCount_${id}`}>{characterCount}</span>
                <span> / </span>
                <span data-testid={`testId-note-maximum_${id}`}>{maxLength}</span>
              </div>
            )}
          </div>
        </div>
      </label>
    </form>
  );
};
