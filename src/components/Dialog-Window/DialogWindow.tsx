import {
  Close as DialogClose,
  Content as DialogContent,
  Description as DialogDescription,
  Overlay as DialogOverlay,
  Title as DialogTitle,
} from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
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
    <DialogContent aria-modal="true" className="dialogContentSmallScreen">
      <DialogDescription className="visuallyHidden" aria-hidden="true" />
      <div className="contentWrapperSmallScreen">
        <DialogTitle className="dialogTitle">{item.label}</DialogTitle>
        {!noTabItems && <DialogTabs item={item} />}
        {noTabItems && hasNote && (
          <div className="noteWrapper fullWidth">
            <DialogNote
              maxLength={item.dialog.maxLength}
              id={item.id}
            />
          </div>
        )}
      </div>
      <DialogClose className="closeButton" aria-label={ariaLabel}>
        <Cross2Icon />
      </DialogClose>
    </DialogContent>
  ) : (
    <DialogContent aria-modal="true" className="dialogContent">
      <DialogDescription className="visuallyHidden" aria-hidden="true" />
      <div className="contentWrapper">
        <DialogTitle className="dialogTitle">{item.label}</DialogTitle>
        {!noTabItems && <DialogTabs item={item} />}
      </div>
      <DialogClose className="closeButton" aria-label={ariaLabel}>
        <Cross2Icon />
      </DialogClose>
    </DialogContent>
  );

  if (hasNote && !smallScreen) {
    content = (
      <DialogContent
        aria-modal="true"
        className={noTabItems ? 'dialogContent' : 'dialogContentWide'}
      >
        <DialogDescription className="visuallyHidden" aria-hidden="true" />
        <div className="contentWrapper">
          <DialogTitle className="dialogTitle">{item.label}</DialogTitle>
          {!noTabItems && (
            <div className="tabWrapper">
              <DialogTabs item={item} />
            </div>
          )}
          <div
            className={`noteWrapper ${noTabItems ? 'fullWidth' : ''
            }`}
          >
            <DialogNote
              maxLength={item.dialog.maxLength}
              id={item.id}
            />
          </div>
        </div>
        <DialogClose className="closeButton" aria-label={ariaLabel}>
          <Cross2Icon />
        </DialogClose>
      </DialogContent>
    );
  }

  return (
    <div ref={forwardedRef}>
      <DialogOverlay className="overlay" />
      {content}
    </div>
  );
});
