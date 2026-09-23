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
        <DialogOverlay className="h5p-topic-map-modal-overlay h5p-topic-map-confirm-window-overlay" />
        <DialogContent aria-modal="true" className="h5p-topic-map-confirm-window-content">
          <DialogDescription className="h5p-topic-map-visually-hidden" aria-hidden="true" />
          <div className="h5p-topic-map-modal-wrapper">
            <DialogTitle className="h5p-topic-map-modal-title">{title}</DialogTitle>
            {children}
            <div className="h5p-topic-map-confirmation-buttons">
              <button
                type="button"
                className="h5p-topic-map-confirm-button"
                onClick={handleConfirm}
              >
                {confirmWindow.confirmText}
              </button>
              <button
                type="button"
                className="h5p-topic-map-deny-button"
                onClick={() => setWindowOpen(false)}
              >
                {confirmWindow.denyText}
              </button>
            </div>
          </div>
          <DialogClose className="h5p-topic-map-modal-close-button" aria-label={ariaLabel}>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
};
