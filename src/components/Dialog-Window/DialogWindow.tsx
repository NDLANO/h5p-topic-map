import { Close, Content, Description, Overlay, Title } from '@radix-ui/react-dialog';
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
    <Content aria-modal="true" className="dialogContentSmallScreen">
      <Description className="visuallyHidden" aria-hidden="true" />
      <div className="contentWrapperSmallScreen">
        <Title className="dialogTitle">{item.label}</Title>
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
      <Close className="closeButton" aria-label={ariaLabel}>
        <Cross2Icon />
      </Close>
    </Content>
  ) : (
    <Content aria-modal="true" className="dialogContent">
      <Description className="visuallyHidden" aria-hidden="true" />
      <div className="contentWrapper">
        <Title className="dialogTitle">{item.label}</Title>
        {!noTabItems && <DialogTabs item={item} />}
      </div>
      <Close className="closeButton" aria-label={ariaLabel}>
        <Cross2Icon />
      </Close>
    </Content>
  );

  if (hasNote && !smallScreen) {
    content = (
      <Content
        aria-modal="true"
        className={noTabItems ? 'dialogContent' : 'dialogContentWide'}
      >
        <Description className="visuallyHidden" aria-hidden="true" />
        <div className="contentWrapper">
          <Title className="dialogTitle">{item.label}</Title>
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
        <Close className="closeButton" aria-label={ariaLabel}>
          <Cross2Icon />
        </Close>
      </Content>
    );
  }

  return (
    <div ref={forwardedRef}>
      <Overlay className="overlay" />
      {content}
    </div>
  );
});
