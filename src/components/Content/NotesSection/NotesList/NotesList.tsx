import * as React from 'react';
import { useContentId } from '../../../../hooks/useContentId';
import { useLocalStorageUserData } from '../../../../hooks/useLocalStorageUserData';
import { useTranslation } from '../../../../hooks/useTranslation';
import { CommonItemType } from '../../../../types/CommonItemType';
import { NoteButtonIconState } from '../../../../types/NoteButtonIconState';
import { IconCircle } from '../../../IconCircle/IconCircle';
import { createLinksFromString } from '../../../../utils/link.utils';
import './NotesList.scss';

type NotesListProps = {
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
          <div className="h5p-topic-map-notes-list-element-wrapper">
            <div className="h5p-topic-map-notes-list-page-break" />
            <div className="h5p-topic-map-notes-list-element">
              <IconCircle
                buttonState={
                  doesNoteExist && isNoteDone
                    ? NoteButtonIconState.Done
                    : NoteButtonIconState.Default
                }
                strokeWidth={undefined}
              />
              <div>
                <p className="h5p-topic-map-notes-list-element-header">{item.label}</p>
                <div
                  className="h5p-topic-map-notes-list-element-content"
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
    <div className="h5p-topic-map-notes-list">
      <div className="h5p-topic-map-notes-list-content">
        <div className="h5p-topic-map-notes-list-header-for-print">
          <p>{navbarTitle}</p>
        </div>
        {userDataEntries}
      </div>
    </div>
  );
};
