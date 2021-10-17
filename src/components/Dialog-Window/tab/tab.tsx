import * as React from "react";
import {Root, List, Trigger, Content} from '@radix-ui/react-tabs';
import { styled } from '@stitches/react';
import styles from "./tab.module.scss";

export type TabProps = {
  titles: string[];
};

const StyledTabs = styled(Root, {
  display: 'flex',
  flexDirection: 'column',
  width: 300,
  boxShadow: `0 2px 10px black`,
});

const StyledTrigger = styled(Trigger, {
  all: 'unset',
  fontFamily: 'inherit',
  backgroundColor: 'white',
  padding: '0 20px',
  height: 45,
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 15,
  lineHeight: 1,
  color: "Darkblue",
  userSelect: 'none',
  '&:first-child': { borderTopLeftRadius: 6 },
  '&:last-child': { borderTopRightRadius: 6 },
  '&:hover': { color: "Purple" },
  '&[data-state="active"]': {
    color: "Violet",
    boxShadow: 'inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor',
  },
  '&:focus': { position: 'relative', boxShadow: `0 0 0 2px black` },
});

export const Tab: React.FC<TabProps> = ({ titles }): JSX.Element => {
  return (
 <StyledTabs defaultValue="tab1" orientation="vertical">
    <List className={styles.list} aria-label="tabs example">
        <StyledTrigger  value="tab1">Tab 1</StyledTrigger>
        <StyledTrigger  value="tab2">Tab 2</StyledTrigger>
    </List>
  </StyledTabs>
  );
};

