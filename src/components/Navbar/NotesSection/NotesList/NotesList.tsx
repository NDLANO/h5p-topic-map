import * as React from 'react';
import { useContentId } from '../../../../hooks/useContentId';
import { useL10n } from '../../../../hooks/useLocalization';
import { useLocalStorageUserData } from '../../../../hooks/useLocalStorageUserData';
import { CommonItemType } from '../../../../types/CommonItemType';
import { NoteButtonIconState } from '../../../../types/NoteButtonIconState';
import { NoteButton } from '../../../NoteButton/NoteButton';
import styles from './NotesList.module.scss';

export type NotesListProps = {
  topicMapItems: CommonItemType[];
  navbarTitle: string;
};

export const NotesList: React.FC<NotesListProps> = ({
  topicMapItems,
  navbarTitle,
}) => {
  const contentId = useContentId();
  const [userData] = useLocalStorageUserData();
  const noItemsInListText = useL10n('navbarNotesEmptyListLabel');
  const missingNoteText = useL10n('navbarNotesMissingNoteLabel');

  const userDataEntries = topicMapItems.map((item) => {
    const dialogData = userData[contentId]?.dialogs?.[item.id];

    const doesNoteExist = dialogData?.note;
    const isNoteDone = doesNoteExist && dialogData.noteDone;

    return (
      item.dialog?.hasNote && (
        <React.Fragment key={item.id}>
          <div className={styles.mainBodyListElementWrapper}>
            <div className={styles.pageBreak} />
            <div className={styles.mainBodyListElement}>
              <div className={styles.mainBodyButton}>
                <NoteButton
                  backgroundColor="var(--theme-color-2)"
                  borderColor="var(--theme-color-3)"
                  iconColor="#ffffff"
                  buttonState={
                    doesNoteExist && isNoteDone
                      ? NoteButtonIconState.Done
                      : NoteButtonIconState.Default
                  }
                  strokeWidth={undefined}
                />
              </div>
              <div className={styles.mainBodyList}>
                <p className={styles.mainBodyListElementHeader}>{item.label}</p>
                <p>
                  {doesNoteExist
                    ? userData[contentId]?.dialogs[item.id].note
                    : missingNoteText}
                </p>
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    );
  });

  return (
    <div className={styles.mainBody}>
      <div className={styles.mainBodyContent}>
        <div className={styles.mainBodyHeaderForPrint}>
          <p>{navbarTitle}</p>
        </div>
        {userDataEntries || noItemsInListText}
      </div>
    </div>
  );
};
