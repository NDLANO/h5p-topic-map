import {
  Close,
  Content,
  Description,
  Overlay,
  Root,
  Title,
} from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as React from "react";
import { useL10n } from "../../hooks/useLocalization";
import styles from "./DialogWindow.module.scss";

export type DialogWindowProps = {
  title: string | undefined;
  notes: string | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const DialogWindow: React.FC<DialogWindowProps> = ({
  title,
  notes,
  open,
  onOpenChange,
}): JSX.Element => {
  const ariaLabel = useL10n("closeDialog");

  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Overlay className={styles.overlay} />
      <Content className={styles.dialogContent}>
        <Title className={styles.dialogTitle}>{title}</Title>
        <Description>{notes}</Description>
        <Close className={styles.closeButton} aria-label={ariaLabel}>
          <Cross2Icon />
        </Close>
      </Content>
    </Root>
  );
};
