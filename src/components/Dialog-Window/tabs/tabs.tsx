/* eslint-disable react/no-array-index-key */
import * as React from "react";
import { Root, List, Trigger, Content } from "@radix-ui/react-tabs";
import styles from "./tabs.module.scss";

export type TabProps = {
  tabContents: { title: string; content: JSX.Element }[];
};

export const Tabs: React.FC<TabProps> = ({ tabContents }) => {
  return (
    <Root className={styles.tabs} defaultValue={tabContents[0].title} orientation="vertical">
      <List className={styles.list} aria-label="tabs example">
        {tabContents.map((el, i) => (
          <Trigger key={i} className={styles.trigger} value={el.title}>
            {el.title}
          </Trigger>
        ))}
      </List>
      {tabContents.map((el, i) => (
        <Content key={i} value={el.title}> {el.content} </Content>
      ))}
    </Root>
  );
};
