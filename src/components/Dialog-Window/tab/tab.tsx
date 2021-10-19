import * as React from "react";
import { Root, List, Trigger, Content } from "@radix-ui/react-tabs";
import { styled } from "@stitches/react";
import styles from "./tab.module.scss";

export type TabProps = {
  tabContents: { title: string; content: JSX.Element }[];
};

const StyledTabs = styled(Root, {
  display: "flex",
  flexDirection: "column",
});

const StyledTrigger = styled(Trigger, {
  all: "unset",
  fontFamily: "inherit",
  backgroundColor: "white",
  padding: "0 20px",
  height: 45,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  lineHeight: 1,
  color: "black",
  userSelect: "none",
  cursor: "pointer",
  "&:first-child": { borderTopLeftRadius: 6 },
  "&:last-child": { borderTopRightRadius: 6 },
  '&[data-state="active"]': {
    fontWeight: 800,
    boxShadow: "inset 0 -1px 0 0 #59A0FF, 0 1px 0 0 #59A0FF",
  },
  "&:focus": { position: "relative" },
});

export const Tab: React.FC<TabProps> = ({ tabContents }): JSX.Element => {
  return (
    <StyledTabs defaultValue="tab1" orientation="vertical">
      <List className={styles.list} aria-label="tabs example">
        {tabContents.map(el => (
          <StyledTrigger value={el.title}> {el.title} </StyledTrigger>
        ))}
      </List>
      {tabContents.map(el => (
        <Content value={el.title}> {el.content} </Content>
      ))}
    </StyledTabs>
  );
};
