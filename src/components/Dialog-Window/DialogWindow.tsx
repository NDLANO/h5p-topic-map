import * as React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./DialogWindow.module.scss";

export type DialogWindowProps = {
  title: string;
  notes: string;
};

const DialogRoot = ({ children, ...props }: any): JSX.Element => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Dialog.Root {...props}>
      <Dialog.Overlay className={styles.overlay} />
      {children}
    </Dialog.Root>
  );
};

export const DialogWindow: React.FC<DialogWindowProps> = ({
  title,
  notes,
}): JSX.Element => {
  return (
    <DialogRoot>
      <Dialog.Trigger asChild>
        <button type="button">Open Dialog</button>
      </Dialog.Trigger>
    </DialogRoot>
  );
};
