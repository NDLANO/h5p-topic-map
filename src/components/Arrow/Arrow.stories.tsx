/* eslint-disable react/jsx-props-no-spreading */
import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { ArrowType } from "../../types/ArrowType";
import { Arrow } from "./Arrow";

const blue = "#59A0FF";
const white = "#FFFFFF";
const black = "#3E3E3E";

export default {
  title: "Organisms/Arrow",
  component: Arrow,
  argTypes: {
    type: {
      // prettier-ignore
      // prettier removes the button titles.
      options: {"Directional": ArrowType.Directional, "BiDirectional": ArrowType.BiDirectional, "NonDirectional": ArrowType.NonDirectional},
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Arrow>;

const Template: ComponentStory<typeof Arrow> = args => <Arrow {...args} />;

export const RightDirectionalEmptyArrow = Template.bind({});
RightDirectionalEmptyArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 100,
    y: 0,
  },
  arrowColor: blue,
  circleColor: white,
  iconColor: black,
  type: ArrowType.Directional,
  notes: "Test note 1",
  completed: false,
};

export const LeftDirectionalCompletedArrow = Template.bind({});
LeftDirectionalCompletedArrow.args = {
  start: {
    x: 100,
    y: 0,
  },
  end: {
    x: 0,
    y: 0,
  },
  arrowColor: blue,
  circleColor: white,
  iconColor: black,
  type: ArrowType.Directional,
  notes: "This note is completed",
  completed: true,
};

export const BidirectionalHorizontalEmptyArrow = Template.bind({});
BidirectionalHorizontalEmptyArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 100,
    y: 0,
  },
  arrowColor: blue,
  circleColor: white,
  iconColor: black,
  type: ArrowType.BiDirectional,
  notes: "Test note 2",
  completed: false,
};

export const UpDirectionalEditedArrow = Template.bind({});
UpDirectionalEditedArrow.args = {
  start: {
    x: 0,
    y: 100,
  },
  end: {
    x: 0,
    y: 0,
  },
  arrowColor: blue,
  circleColor: white,
  iconColor: black,
  type: ArrowType.Directional,
  notes: "This note is started, but not marked complete",
  completed: false,
};

export const NonDirectionalVerticalEmptyArrow = Template.bind({});
NonDirectionalVerticalEmptyArrow.args = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 0,
    y: 100,
  },
  arrowColor: blue,
  circleColor: white,
  iconColor: black,
  type: ArrowType.NonDirectional,
  notes: "",
  completed: false,
};