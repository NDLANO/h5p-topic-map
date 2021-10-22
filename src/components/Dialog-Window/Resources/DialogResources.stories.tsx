import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { DialogResources } from "./DialogResources";

export default {
  title: "Molecules/Dialog Content/Dialog Resources",
  component: DialogResources,
} as unknown as ComponentMeta<typeof DialogResources>;

const Template: ComponentStory<typeof DialogResources> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <DialogResources {...args} />
);

export const ResourcesDialog = Template.bind({});
