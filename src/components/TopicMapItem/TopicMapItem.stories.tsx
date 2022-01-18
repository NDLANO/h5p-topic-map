/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { TopicMapItem, TopicMapItemProps } from "./TopicMapItem";

export default {
  title: "Molecules/TopicMapItem",
  component: TopicMapItem,
} as ComponentMeta<typeof TopicMapItem>;

const defaultArgs: TopicMapItemProps = {
  backgroundImage: {
    alt: "",
    path: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2146&q=80",
  },
  title: "Title",
};

export const NoContainer: ComponentStory<typeof TopicMapItem> = () => {
  const args: TopicMapItemProps = { ...defaultArgs };
  return <TopicMapItem {...args} />;
};

export const Square: ComponentStory<typeof TopicMapItem> = () => {
  const args: TopicMapItemProps = { ...defaultArgs };
  return (
    <div
      style={{
        height: "min(95vw, 95vh)",
        width: "min(95vw, 95vh)",
      }}
    >
      <TopicMapItem {...args} />
    </div>
  );
};

export const Wide: ComponentStory<typeof TopicMapItem> = () => {
  const args: TopicMapItemProps = { ...defaultArgs };
  return (
    <div
      style={{
        height: "min(40vw, 40vh)",
        width: "min(95vw, 95vh)",
      }}
    >
      <TopicMapItem {...args} />
    </div>
  );
};

export const Tall: ComponentStory<typeof TopicMapItem> = () => {
  const args: TopicMapItemProps = { ...defaultArgs };
  return (
    <div
      style={{
        height: "min(95vw, 95vh)",
        width: "min(40vw, 40vh)",
      }}
    >
      <TopicMapItem {...args} />
    </div>
  );
};
