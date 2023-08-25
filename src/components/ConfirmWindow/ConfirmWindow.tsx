import { Close, Content, Overlay, Root, Title, Trigger } from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as React from 'react';
import { FC, ReactNode } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import styles from './ConfirmWindow.module.scss';

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
  const ariaLabel = t('closeDialog');

  const [windowOpen, setWindowOpen] = React.useState(false);

  const handleConfirm = () => {
    confirmWindow.confirmAction();
    setWindowOpen(false);
  };

  return (
    <Root open={windowOpen} onOpenChange={setWindowOpen}>
      <Overlay className={styles.overlay} />
      <Trigger asChild>
        <button type="button" className={button.className} onClick={() => setWindowOpen(true)}>
          {button.label}
        </button>
      </Trigger>
      <Content className={styles.confirmWindowContent}>
        <Title className={styles.dialogTitle}>{title}</Title>
        {children}
        <div className={styles.confirmationButtons}>
          <button
            type="button"
            className={styles.confirmButton}
            onClick={handleConfirm}
          >
            {confirmWindow.confirmText}
          </button>
          <button
            type="button"
            className={styles.denyButton}
            onClick={() => setWindowOpen(false)}
          >
            {confirmWindow.denyText}
          </button>
        </div>
        <Close className={styles.closeButton} aria-label={ariaLabel}>
          <Cross2Icon />
        </Close>
      </Content>
    </Root>
  );
};
