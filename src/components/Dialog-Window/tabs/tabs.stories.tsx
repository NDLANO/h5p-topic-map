import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tabs } from "./tabs";
//import { Notes } from "./DialogNotes";
export default {
  title: "DialogContent/DialogTabs",
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Tabs {...args} />
);

export const TabSingular = Template.bind({});
TabSingular.args = {
  tabContents: [
    { title: "Text", content: <h1>Content for text goes here!</h1> },
    { title: "Video", content: <h1>Content for video goes here!</h1> },
    { title: "Resources", content: <h1>Content for resources goes here!</h1> },
    { title: "Sound", content: <h1>Content for sound goes here!</h1> },
  ],
};
