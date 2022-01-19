import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { DialogVideo } from "./DialogVideo";

export default {
  title: "Molecules/Dialog Content/Dialog Video",
  component: DialogVideo,
} as unknown as ComponentMeta<typeof DialogVideo>;

const Template: ComponentStory<typeof DialogVideo> = args => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <DialogVideo {...args} />
);

export const SimpleVideo = Template.bind({});
SimpleVideo.args = {
  video: { path: "https://www.w3schools.com/html/mov_bbb.mp4" },
};
