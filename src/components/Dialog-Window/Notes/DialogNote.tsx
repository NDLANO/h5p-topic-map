import * as React from 'react';
import { useContentId } from '../../../hooks/useContentId';
import { useLocalStorageUserData } from '../../../hooks/useLocalStorageUserData';
import { useSendXAPIEvent } from '../../../hooks/useSendXAPIEvent';
import { useTranslation } from '../../../hooks/useTranslation';
import { useH5PInstance } from '../../../hooks/useH5PInstance';
import { createLinksFromString } from '../../../utils/link.utils';
import './DialogNote.scss';

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
  const h5pInstance = useH5PInstance();
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
  const characterCountText = t('noteCharacterCountDescriptiveText', {
    count: characterCount,
    max: maxLength ?? '',
  }); // We only show this text when `maxLength` is set.

  const { sendXAPIEvent } = useSendXAPIEvent();

  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);
  const mirroredTextareaRef = React.useRef<HTMLDivElement>(null);
  const mirroredTextareaWrapperRef = React.useRef<HTMLDivElement>(null);

  const noteTextareaID = `note-textarea_${id}`;
  const noteCheckboxID = `note-checkbox_${id}`;
  const noteTextareaDescriptionID = `note-textarea-description_${id}`;
  const textareaDescription = t('noteTextareaDescriptiveText', {
    max: maxLength ?? '',
  });

  const handleNoteDone = (): void => {
    const done = !noteDone;
    const contentUserData = userData[contentId] ?? { dialogs: {} };

    setMarkedAsDone(done);
    setUserData({
      ...userData,
      [contentId]: {
        ...contentUserData,
        dialogs: {
          ...contentUserData.dialogs,
          [id]: {
            ...contentUserData.dialogs[id],
            noteDone: done,
          },
        },
      },
    });

    sendXAPIEvent('completed', {
      itemId: id,
      note,
      completed: done,
    });
  };

  const setSavingText = (): void => {
    setDynamicSavingText(t('dialogNoteSaving'));

    // Cancel any pending save from a previous keystroke so the timeout —
    // and the xAPI 'answered' event it fires — only runs once the user
    // stops typing.
    if (savingTextTimeout !== undefined) {
      window.clearTimeout(savingTextTimeout);
    }

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

  const handleSetUserData = (note: string): void => {
    const contentUserData = userData[contentId] ?? { dialogs: {} };

    setUserData({
      ...userData,
      [contentId]: {
        ...contentUserData,
        dialogs: {
          ...contentUserData.dialogs,
          [id]: {
            ...contentUserData.dialogs[id],
            note,
          },
        },
      },
    });
  };

  const resizeMirroredTextarea = React.useCallback((): void => {
    if (!textAreaRef.current || !mirroredTextareaWrapperRef.current || !mirroredTextareaRef.current) {
      return;
    }
    const textArea = textAreaRef.current;
    const mirroredTextarea = mirroredTextareaRef.current;
    const mirroredTextareaWrapper = mirroredTextareaWrapperRef.current;

    mirroredTextarea.style.height = `${textArea.scrollHeight}px`;
    mirroredTextareaWrapper.style.width = `${textArea.clientWidth}px`;
    mirroredTextareaWrapper.style.height = `${textArea.clientHeight}px`;
  }, []);

  const updateMirroredTextarea = (): void => {
    if (!textAreaRef.current || !mirroredTextareaRef.current) {
      return;
    }
    const textArea = textAreaRef.current;
    const mirroredTextarea = mirroredTextareaRef.current;

    mirroredTextarea.innerHTML = createLinksFromString(textArea.value);

    resizeMirroredTextarea();
  };

  const onChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = target.value;

    updateMirroredTextarea();
    setSavingText();
    setNote(newValue);
    handleSetUserData(newValue);

    if (maxLength) {
      countCharacters();
    }
  };

  const onScroll = (): void => {
    if (!textAreaRef.current || !mirroredTextareaWrapperRef.current) {
      return;
    }
    const textArea = textAreaRef.current;
    const mirroredTextareaWrapper = mirroredTextareaWrapperRef.current;

    mirroredTextareaWrapper.scrollTop = textArea.scrollTop;
    mirroredTextareaWrapper.scrollLeft = textArea.scrollLeft;
  };

  // Runs once on mount: the mirror needs to be synced after the textarea
  // first renders. `textAreaRef` is stable across renders, so it is not
  // a dependency.
  React.useEffect(() => {
    if (textAreaRef.current) {
      updateMirroredTextarea();
    }
  }, []);

  // Single stable 'resize' subscription; the listener identity never
  // changes, so it can be cleaned up reliably.
  const handleResize = React.useCallback((): void => {
    window.requestAnimationFrame(resizeMirroredTextarea);
  }, [resizeMirroredTextarea]);

  React.useEffect(() => {
    if (!h5pInstance) {
      return undefined;
    }
    h5pInstance.on('resize', handleResize);
    return () => {
      h5pInstance.off('resize', handleResize);
    };
  }, [handleResize, h5pInstance]);

  return (
    <form>
      <div className="topGroup">
        <label htmlFor={noteTextareaID}>
          <p className={!smallScreen ? 'noteLabel' : 'visuallyHidden'}>{t('dialogNoteLabel')}</p>
        </label>
        <p className="dynamicSavingText">{dynamicSavingText}</p>
      </div>
      <div className={`textAreaWrapper ${maxLengthExceeded ? 'lengthExceeded' : ''}`}>
        <textarea
          className="textArea"
          id={noteTextareaID}
          ref={textAreaRef}
          aria-describedby={maxLength ? noteTextareaDescriptionID : undefined}
          placeholder={t('dialogNotePlaceholder')}
          onChange={(event) => onChange(event)}
          onScroll={onScroll}
          defaultValue={note}
          maxLength={maxLength}
        />
        <div
          ref={mirroredTextareaWrapperRef}
          className="textareaMirrorWrapper"
        >
          <div
            ref={mirroredTextareaRef}
            className="textareaMirror"
          />
        </div>
        {maxLength && (
          <span id={noteTextareaDescriptionID} className="visuallyHidden">{textareaDescription}</span>
        )}
        <div className="bottomGroup">
          <div className="markAsDoneCheckbox">
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
            <div className={`counter ${maxLengthExceeded ? 'redText' : ''}`}>
              <span data-testid={`testId-note-characterCount_${id}`} aria-hidden="true">{characterCount}</span>
              <span aria-hidden="true"> / </span>
              <span data-testid={`testId-note-maximum_${id}`} aria-hidden="true">{maxLength}</span>
              <span className="visuallyHidden">{characterCountText}</span>
            </div>
          )}
        </div>
        <div aria-live="polite" className="visuallyHidden">
          {maxLengthExceeded ? t('dialogNoteLimitExceeded') : ''}
        </div>
      </div>
    </form>
  );
};
