import * as React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  Root,
  Content,
  Title,
  Close,
  Overlay,
  Description,
} from "@radix-ui/react-dialog";
import styles from "./DialogWindow.module.scss";

export type DialogWindowProps = {
  title: string | undefined;
  notes: string | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

// TODO: Translate
const ariaLabel = "Close";

export const DialogWindow: React.FC<DialogWindowProps> = ({
  title,
  notes,
  open,
  onOpenChange,
}): JSX.Element => {
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
