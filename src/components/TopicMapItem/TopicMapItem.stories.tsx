import { Meta, StoryObj } from '@storybook/react';
import { TopicMapItemType } from '../../types/TopicMapItemType';
import { TopicMapItem, TopicMapItemProps } from './TopicMapItem';

const item: TopicMapItemType = {
  id: '1',
  topicImage: {
    path: 'https://images.unsplash.com/photo-1569587112025-0d460e81a126?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80',
    alt: '',
  },
  label: 'Sheep in the distance',
  description: '',
  widthPercentage: 50,
  heightPercentage: 25,
  xPercentagePosition: 3,
  yPercentagePosition: 5,
  dialog: {
    text: 'Dialog text',
    hasNote: true,
    showAddLinks: false,
  },
};

const defaultArgs: TopicMapItemProps = {
  item,
};

export default {
  title: 'Molecules/TopicMapItem',
  component: TopicMapItem,
  args: defaultArgs,
} satisfies Meta<typeof TopicMapItem>;

type Story = StoryObj<typeof TopicMapItem>;

export const NoContainer: Story = {};

export const Square: Story = {
  render: (args) => (
    <div
      style={{
        height: 'min(95vw, 95vh)',
        width: 'min(95vw, 95vh)',
      }}
    >
      <TopicMapItem {...args} />
    </div>
  ),
};

export const Wide: Story = {
  render: (args) => (
    <div
      style={{
        height: 'min(40vw, 40vh)',
        width: 'min(95vw, 95vh)',
      }}
    >
      <TopicMapItem {...args} />
    </div>
  ),
};

export const Tall: Story = {
  render: (args) => (
    <div
      style={{
        height: 'min(95vw, 95vh)',
        width: 'min(40vw, 40vh)',
      }}
    >
      <TopicMapItem {...args} />
    </div>
  ),
};
