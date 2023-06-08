import { useL10n } from '../hooks/useLocalization';
import { NoteButtonIconState } from '../types/NoteButtonIconState';

export const getNoteStateText = (state: NoteButtonIconState): string => {
  switch (state) {
    case NoteButtonIconState.Done:
      return useL10n('noteStatusDoneDescriptiveText');
    case NoteButtonIconState.Notes:
    case NoteButtonIconState.Text:
      return useL10n('noteStatusStartedDescriptiveText');
    case NoteButtonIconState.Default:
    case NoteButtonIconState.None:
      return useL10n('noteStatusDefaultDescriptiveText');
  }
};
