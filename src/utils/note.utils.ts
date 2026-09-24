import { NoteButtonIconState } from '../types/NoteButtonIconState';
import { TranslationKey } from '../types/TranslationKey';

export const getNoteStateText = (
  state: NoteButtonIconState, 
  t: (key: TranslationKey) => string,
): string => {
  // Prepend punctuation to force a reading pause before screen readers announce the note status text.
  switch (state) {
    case NoteButtonIconState.Done:
      return `. ${t('noteStatusDoneDescriptiveText')}`;
    case NoteButtonIconState.Notes:
    case NoteButtonIconState.Text:
      return `. ${t('noteStatusStartedDescriptiveText')}`;
    case NoteButtonIconState.Default:
      return `. ${t('noteStatusDefaultDescriptiveText')}`;
    case NoteButtonIconState.None:
      return '';
  }
};
