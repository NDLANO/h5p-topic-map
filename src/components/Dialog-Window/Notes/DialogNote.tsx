import * as React from 'react';
import { useContentId } from '../../../hooks/useContentId';
import { useLocalStorageUserData } from '../../../hooks/useLocalStorageUserData';
import { useSendXAPIEvent } from '../../../hooks/useSendXAPIEvent';
import { useTranslation } from '../../../hooks/useTranslation';
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

  const [note, setNote] = React.useState(
    userData[contentId]?.dialogs[id]?.note ?? '',
  );
  const [dynamicSavingText, setDynamicSavingText] = React.useState('');
  const [savingTextTimeout, setSavingTextTimeout] = React.useState<number>();
  const [noteDone, setMarkedAsDone] = React.useState(
    userData[contentId]?.dialogs[id]?.noteDone ?? false,
  );
  const [characterCount, setCharacterCount] = React.useState(0);
  const maxLengthExceeded = maxLength ? characterCount > maxLength : false;
  const characterCountText =
    t('noteCharacterCountDescriptiveText')
      .replace('@count', characterCount.toString())
      .replace('@max', maxLength?.toString() ?? ''); // We only show this text when `maxLength` is set.

  const { sendXAPIEvent } = useSendXAPIEvent();

  const noteTextareaID = `note-textarea_${id}`;
  const noteCheckboxID = `note-checkbox_${id}`;
  const noteTextareaDescriptionID = `note-textarea-description_${id}`;
  const textareaDescription = t('noteTextareaDescriptiveText').replace('@max', maxLength?.toString() ?? '');

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
        setDynamicSavingText(`${t('dialogNoteSaved')} ${localTime}`);

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
  }, [maxLength, note, savingTextTimeout]);

  React.useEffect(() => {
    // TODO: If this becomes laggy, add a debounce-timer to avoid saving more often than, say, every 100ms.

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

  const handleSetUserData = (note: string): void => {
    if (!userData[contentId]) {
      userData[contentId] = { dialogs: {} };
    }
    if (!userData[contentId]?.dialogs[id]) {
      userData[contentId].dialogs[id] = {};
    }

    userData[contentId].dialogs[id].note = note;
    setUserData(userData);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setSavingText();
    setNote(e.target.value);
    handleSetUserData(e.target.value);
  };

  return (
    <form>
      <div className={styles.topGroup}>
        <label htmlFor={noteTextareaID}>
          <p className={!smallScreen ? styles.noteLabel : styles.visuallyHidden}>{t('dialogNoteLabel')}</p>
        </label>
        <p className={styles.dynamicSavingText}>{dynamicSavingText}</p>
      </div>
      <div className={`${styles.textAreaWrapper} ${maxLengthExceeded ? styles.lengthExceeded : ''}`}>
        <textarea
          className={styles.textArea}
          id={noteTextareaID}
          aria-describedby={maxLength ? noteTextareaDescriptionID : undefined}
          placeholder={t('dialogNotePlaceholder')}
          onChange={(event) => onChange(event)}
          defaultValue={note}
          maxLength={maxLength}
        />
        {maxLength && (
          <span id={noteTextareaDescriptionID} className={styles.visuallyHidden}>{textareaDescription}</span>
        )}
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
              <span data-testid={`testId-note-characterCount_${id}`} aria-hidden="true">{characterCount}</span>
              <span aria-hidden="true"> / </span>
              <span data-testid={`testId-note-maximum_${id}`} aria-hidden="true">{maxLength}</span>
              <span className={styles.visuallyHidden}>{characterCountText}</span>
            </div>
          )}
        </div>
        <div aria-live="polite" className={styles.visuallyHidden}>
          {maxLengthExceeded ? t('dialogNoteLimitExceeded') : ''}
        </div>
      </div>
    </form>
  );
};
