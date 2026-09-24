import {
  Close as DialogClose,
  Content as DialogContent,
  Description as DialogDescription,
  Overlay as DialogOverlay,
  Title as DialogTitle,
} from '@radix-ui/react-dialog';
import * as React from 'react';
import { FC } from 'react';
import { useMedia } from 'react-use';
import { useTranslation } from '../../hooks/useTranslation';
import { CommonItemType } from '../../types/CommonItemType';
import './DialogWindow.scss';
import { DialogNote } from './Notes/DialogNote';
import { DialogTabs } from './Tabs/DialogTabs';

export type DialogWindowProps = {
  item: CommonItemType;
};

export const DialogWindow: FC<DialogWindowProps> = React.forwardRef<HTMLDivElement, DialogWindowProps>((
  { item }, forwardedRef
) => {
  const { t } = useTranslation();
  const smallScreen = useMedia('(max-width: 768px)');

  const ariaLabel = t('closeDialog');

  if (!item.dialog) {
    return null;
  }

  const noTabItems =
    !item.description &&
    !item.topicImage &&
    !item.dialog.audio?.audioFile &&
    (!item.dialog.links ||
      item.dialog.links?.filter((link) => Boolean(link.url)).length === 0) &&
    !item.dialog.showAddLinks &&
    !item.dialog.text &&
    !item.dialog.video;

  const hasNote = item.dialog?.hasNote;

  let content = smallScreen ? (
    <DialogContent aria-modal="true" className="h5p-topic-map-dialog-content small-screen">
      <DialogDescription className="h5p-topic-map-visually-hidden" aria-hidden="true" />
      <div className="h5p-topic-map-modal-wrapper small-screen">
        <DialogTitle className="h5p-topic-map-modal-title">{item.label}</DialogTitle>
        {!noTabItems && <DialogTabs item={item} />}
        {noTabItems && hasNote && (
          <div className="h5p-topic-map-dialog-note-wrapper full-width">
            <DialogNote
              maxLength={item.dialog.maxLength}
              id={item.id}
            />
          </div>
        )}
      </div>
      <DialogClose className="h5p-topic-map-modal-close-button" aria-label={ariaLabel}>
      </DialogClose>
    </DialogContent>
  ) : (
    <DialogContent aria-modal="true" className="h5p-topic-map-dialog-content">
      <DialogDescription className="h5p-topic-map-visually-hidden" aria-hidden="true" />
      <div className="h5p-topic-map-modal-wrapper">
        <DialogTitle className="h5p-topic-map-modal-title">{item.label}</DialogTitle>
        {!noTabItems && <DialogTabs item={item} />}
      </div>
      <DialogClose className="h5p-topic-map-modal-close-button" aria-label={ariaLabel}>
      </DialogClose>
    </DialogContent>
  );

  if (hasNote && !smallScreen) {
    content = (
      <DialogContent
        aria-modal="true"
        className={`h5p-topic-map-dialog-content ${noTabItems ? '' : 'wide'}`}
      >
        <DialogDescription className="h5p-topic-map-visually-hidden" aria-hidden="true" />
        <div className="h5p-topic-map-modal-wrapper">
          <DialogTitle className="h5p-topic-map-modal-title">{item.label}</DialogTitle>
          {!noTabItems && (
            <div className="h5p-topic-map-dialog-tab-wrapper">
              <DialogTabs item={item} />
            </div>
          )}
          <div
            className={
              `h5p-topic-map-dialog-note-wrapper ${noTabItems ? 'full-width' : ''}`
            }
          >
            <DialogNote
              maxLength={item.dialog.maxLength}
              id={item.id}
            />
          </div>
        </div>
        <DialogClose className="h5p-topic-map-modal-close-button" aria-label={ariaLabel}>
        </DialogClose>
      </DialogContent>
    );
  }

  return (
    <div ref={forwardedRef}>
      <DialogOverlay className="h5p-topic-map-modal-overlay" />
      {content}
    </div>
  );
});
