import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tab } from "./tab";
//import { Notes } from "./DialogNotes";
export default {
  title: "DialogContent/DialogTabs",
  component: Tab,
} as ComponentMeta<typeof Tab>;

const Template: ComponentStory<typeof Tab> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Tab {...args} />
);

export const TabSingular = Template.bind({});
TabSingular.args = {
  tabContents: [
    { title: "Text", content: <h1>Content for text goes here!</h1> },
    { title: "Video", content: <h1>Content for video goes here!</h1> },
    { title: "Resources", content: <h1>Content for resources goes here!</h1> },
  ],
};
