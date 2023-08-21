import { Close, Content, Overlay, Root, Title, Trigger } from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import * as React from 'react';
import { FC, ReactNode } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import styles from './ConfirmWindow.module.scss';

export type ConfirmWindowProps = {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  confirmWindow: {
    confirmAction: () => void;
    denyAction: () => void;
    confirmText: string;
    denyText: string;
  };
  button: {
    onClick: () => void;
    className: string;
    label: string;
  };
} & { children?: ReactNode };

export const ConfirmWindow: FC<ConfirmWindowProps> = ({
  title,
  open,
  onOpenChange,
  confirmWindow,
  button,
  children,
}) => {
  const { t } = useTranslation();
  const ariaLabel = t('closeDialog');

  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Overlay className={styles.overlay} />
      <Trigger asChild>
        <button type="button" className={button.className} onClick={button.onClick}>
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
            onClick={confirmWindow.confirmAction}
          >
            {confirmWindow.confirmText}
          </button>
          <button
            type="button"
            className={styles.denyButton}
            onClick={confirmWindow.denyAction}
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
