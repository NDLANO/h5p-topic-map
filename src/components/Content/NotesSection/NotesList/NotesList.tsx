import * as React from 'react';
import { useContentId } from '../../../../hooks/useContentId';
import { useLocalStorageUserData } from '../../../../hooks/useLocalStorageUserData';
import { useTranslation } from '../../../../hooks/useTranslation';
import { CommonItemType } from '../../../../types/CommonItemType';
import { NoteButtonIconState } from '../../../../types/NoteButtonIconState';
import { IconCircle } from '../../../IconCircle/IconCircle';
import { createLinksFromString } from '../../../../utils/link.utils';
import './NotesList.scss';

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
  const { t } = useTranslation();

  const userDataEntries = topicMapItems.map((item) => {
    const dialogData = userData[contentId]?.dialogs?.[item.id];

    const doesNoteExist = dialogData?.note;
    const isNoteDone = doesNoteExist && dialogData.noteDone;
    const noteContent = doesNoteExist
      ? createLinksFromString(dialogData.note)
      : t('navbarNotesMissingNoteLabel');

    return (
      item.dialog?.hasNote && (
        <React.Fragment key={item.id}>
          <div className="mainBodyListElementWrapper">
            <div className="pageBreak" />
            <div className="mainBodyListElement">
              <IconCircle
                buttonState={
                  doesNoteExist && isNoteDone
                    ? NoteButtonIconState.Done
                    : NoteButtonIconState.Default
                }
                strokeWidth={undefined}
              />
              <div>
                <p className="mainBodyListElementHeader">{item.label}</p>
                <div
                  className="mainBodyListElementContent"
                  dangerouslySetInnerHTML={{ __html: noteContent }}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      )
    );
  });

  return (
    <div className="notesListMainBody">
      <div className="mainBodyContent">
        <div className="mainBodyHeaderForPrint">
          <p>{navbarTitle}</p>
        </div>
        {userDataEntries}
      </div>
    </div>
  );
};
