import {
  Close as DialogClose,
  Content as DialogContent,
  Description as DialogDescription,
  Overlay as DialogOverlay,
  Portal as DialogPortal,
  Root as DialogRoot,
  Title as DialogTitle,
  Trigger as DialogTrigger,
} from '@radix-ui/react-dialog';
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
    <DialogRoot open={windowOpen} onOpenChange={setWindowOpen}>
      <DialogTrigger asChild>
        <button type="button" className={button.className} onClick={() => setWindowOpen(true)}>
          {button.label}
        </button>
      </DialogTrigger>
      <DialogPortal container={h5pInstance?.containerElement}>
        <DialogOverlay className="overlay" />
        <DialogContent aria-modal="true" className="confirmWindowContent">
          <DialogDescription className="visuallyHidden" aria-hidden="true" />
          <div className="contentWrapper">
            <DialogTitle className="dialogTitle">{title}</DialogTitle>
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
          <DialogClose className="closeButton" aria-label={ariaLabel}>
            <Cross2Icon />
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};
