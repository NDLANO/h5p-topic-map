import { Close, Content, Description, Overlay, Portal, Root, Title, Trigger } from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as React from 'react';
import { FC, ReactNode } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import './ConfirmWindow.scss';
import { useH5PInstance } from '../../hooks/useH5PInstance';

export type ConfirmWindowProps = {
  title: string;
  confirmWindow: {
    confirmAction: () => void;
    confirmText: string;
    denyText: string;
  };
  button: {
    className: string;
    label: string;
  };
} & { children?: ReactNode };

export const ConfirmWindow: FC<ConfirmWindowProps> = ({
  title,
  confirmWindow,
  button,
  children,
}) => {
  const { t } = useTranslation();
  const h5pInstance = useH5PInstance();
  const ariaLabel = t('closeDialog');

  const [windowOpen, setWindowOpen] = React.useState(false);

  const handleConfirm = () => {
    confirmWindow.confirmAction();
    setWindowOpen(false);
  };

  return (
    <Root open={windowOpen} onOpenChange={setWindowOpen}>
      <Trigger asChild>
        <button type="button" className={button.className} onClick={() => setWindowOpen(true)}>
          {button.label}
        </button>
      </Trigger>
      <Portal container={h5pInstance?.containerElement}>
        <Overlay className="overlay" />
        <Content aria-modal="true" className="confirmWindowContent">
          <Description className="visuallyHidden" aria-hidden="true" />
          <div className="contentWrapper">
            <Title className="dialogTitle">{title}</Title>
            {children}
            <div className="confirmationButtons">
              <button
                type="button"
                className="confirmButton"
                onClick={handleConfirm}
              >
                {confirmWindow.confirmText}
              </button>
              <button
                type="button"
                className="denyButton"
                onClick={() => setWindowOpen(false)}
              >
                {confirmWindow.denyText}
              </button>
            </div>
          </div>
          <Close className="closeButton" aria-label={ariaLabel}>
            <Cross2Icon />
          </Close>
        </Content>
      </Portal>
    </Root>
  );
};
