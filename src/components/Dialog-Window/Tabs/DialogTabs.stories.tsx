import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DialogTabs } from "./DialogTabs";

export default {
  title: "Molecules/Dialog Content/Dialog Tabs",
  component: DialogTabs,
} as ComponentMeta<typeof DialogTabs>;

const Template: ComponentStory<typeof DialogTabs> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <DialogTabs {...args} />
);

export const Tabs = Template.bind({});
Tabs.args = {
  tabContents: [
    { title: "Text", content: <h1>Content for text goes here!</h1> },
    { title: "Video", content: <h1>Content for video goes here!</h1> },
    { title: "Resources", content: <h1>Content for resources goes here!</h1> },
    { title: "Sound", content: <h1>Content for sound goes here!</h1> },
  ],
};
