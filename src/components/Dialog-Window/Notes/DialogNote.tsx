import * as React from 'react';
import { useContentId } from '../../../hooks/useContentId';
import { useL10n } from '../../../hooks/useLocalization';
import { useLocalStorageUserData } from '../../../hooks/useLocalStorageUserData';
import { useSendXAPIEvent } from '../../../hooks/useSendXAPIEvent';
import styles from './DialogNote.module.scss';

export type NoteProps = {
  maxLength: number;
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

  const [note, setNote] = React.useState(
    userData[contentId]?.dialogs[id]?.note ?? '',
  );
  const [dynamicSavingText, setDynamicSavingText] = React.useState('');
  const [savingTextTimeout, setSavingTextTimeout] = React.useState<number>();
  const [noteDone, setMarkedAsDone] = React.useState(
    userData[contentId]?.dialogs[id]?.noteDone ?? false,
  );
  const [wordCount, setWordCount] = React.useState(0);
  const [maxWordCount, setMaxWordCount] = React.useState<number | undefined>();

  const savingTextLabel = useL10n('dialogNoteSaving');
  const savedTextLabel = useL10n('dialogNoteSaved');
  const wordLimitExceededTextLabel = useL10n('dialogNoteLimitExceeded');
  const doneTextLabel = useL10n('dialogNoteMarkAsDone');
  const placeholderText = useL10n('dialogNotePlaceholder');
  const wordTextLabel = useL10n('dialogWordsLabel');
  const wordNoteLabel = useL10n('dialogNoteLabel');

  const { sendXAPIEvent } = useSendXAPIEvent();

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
    setDynamicSavingText(savingTextLabel);
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
          `${
            maxWordCount ? `${wordLimitExceededTextLabel} - ` : ''
          } ${savedTextLabel} ${localTime}`,
        );

        sendXAPIEvent('answered', {
          itemId: id,
          note,
        });
      }, 650),
    );
  };

  const countWords = React.useCallback((): void => {
    const count = note.split(/\s/).filter((word) => word.length > 0).length;
    setWordCount(count);

    // TODO: Enforce max length when pasting in text,
    // perhaps by removing all words past the max length mark.
    const tooManyWords = count > maxLength;
    if (tooManyWords) {
      setMaxWordCount(count);
    }
    else {
      setMaxWordCount(undefined);
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
    countWords();
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
    countWords,
    contentId,
  ]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setSavingText();
    setNote(e.target.value);
    setUserData(userData);
  };

  return (
    <form>
      <label htmlFor="note">
        <div className={styles.topGroup}>
          {!smallScreen && <p className={styles.noteLabel}>{wordNoteLabel}</p>}
          <p className={styles.dynamicSavingText}>{dynamicSavingText}</p>
        </div>
        <div
          className={`${styles.textAreaWrapper} ${
            maxWordCount ? styles.maxWords : ''
          }`}
        >
          <textarea
            className={styles.textArea}
            id="note"
            placeholder={placeholderText}
            onChange={(event) => onChange(event)}
            defaultValue={note}
          />
          <div className={styles.bottomGroup}>
            <div className={styles.markAsDoneCheckbox}>
              <label htmlFor="note-done-checkbox">
                <input
                  id="note-done-checkbox"
                  type="checkbox"
                  checked={noteDone}
                  onChange={handleNoteDone}
                />
                {doneTextLabel}
              </label>
            </div>
            <div
              data-testid="wordCount"
              className={`${styles.wordCounter} ${
                maxWordCount ? styles.redText : ''
              }`}
            >
              {wordCount} / {maxLength} {wordTextLabel}
            </div>
          </div>
        </div>
      </label>
    </form>
  );
};
