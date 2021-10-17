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
  //tabs: "Tabs",
};
