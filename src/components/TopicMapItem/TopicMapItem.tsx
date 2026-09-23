import * as React from 'react';
import { FC } from 'react';
import { useContentId } from '../../hooks/useContentId';
import { useLocalStorageUserData } from '../../hooks/useLocalStorageUserData';
import { NoteButtonIconState } from '../../types/NoteButtonIconState';
import { TopicMapItemType } from '../../types/TopicMapItemType';
import { IconCircle } from '../IconCircle/IconCircle';
import './TopicMapItem.scss';
import { getNoteStateText } from '../../utils/note.utils';
import { useTranslation } from '../../hooks/useTranslation';
import { Portal as DialogPortal, Root as DialogRoot, Trigger as DialogTrigger } from '@radix-ui/react-dialog';
import { DialogWindow } from '../Dialog-Window/DialogWindow';
import { useH5PInstance } from '../../hooks/useH5PInstance';

export type TopicMapItemProps = {
  item: TopicMapItemType;
  strokeWidth: number;
};

export const TopicMapItem: FC<TopicMapItemProps> = ({
  item,
  strokeWidth,
}) => {
  const { t } = useTranslation();
  const h5pInstance = useH5PInstance();
  const contentId = useContentId();
  const [userData] = useLocalStorageUserData();

  const [dialogOpen, setDialogOpen] = React.useState(false);

  let btnState: NoteButtonIconState = NoteButtonIconState.Default;
  if (item.dialog?.hasNote) {
    const dialogData = userData[contentId]?.dialogs[item.id];

    switch (true) {
      case dialogData?.noteDone:
        btnState = NoteButtonIconState.Done;
        break;
      case dialogData?.note && dialogData?.note?.length > 0:
        btnState = NoteButtonIconState.Notes;
        break;
      default:
        btnState = NoteButtonIconState.Default;
    }
  }

  return (
    <div className="topicMapItemContainer">
      <DialogRoot open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="topicMapItem"
            onClick={() => setDialogOpen(true)}
          >
            {item.topicImage?.path && (
              <img
                className="image"
                src={item.topicImage.path}
                alt={item.topicImageAltText ?? ''}
                width={item.topicImage.width}
                height={item.topicImage.height}
              />
            )}

            <div
              className={`inner ${item.topicImage?.path ? '' : 'noImage'} ${item.dialog?.hasNote ? 'withNote' : ''}`}
              style={{ paddingTop: strokeWidth * 0.66 }}
            >
              <div className="label">{item.label}</div>
              {item.description && (
                <div className="description">{item.description}</div>
              )}
              {item.dialog?.hasNote && <span className="visuallyHidden">{getNoteStateText(btnState, t)}</span>}
            </div>
          </button>
        </DialogTrigger>

        {item.dialog?.hasNote ? (
          <div className="topicMapItemIconEdit">
            <div className="icon">
              <IconCircle
                buttonState={btnState}
                strokeWidth={strokeWidth}
              />
            </div>
          </div>
        ) : (
          ''
        )}
        <DialogPortal container={h5pInstance?.containerElement}>
          <DialogWindow item={item} />
        </DialogPortal>
      </DialogRoot>
    </div>
  );
};
