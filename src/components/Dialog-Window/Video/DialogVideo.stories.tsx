import { Meta, StoryObj } from '@storybook/react';
import type { H5PVideo } from 'h5p-types';
import { DialogVideo } from './DialogVideo';

export default {
  title: 'Molecules/Dialog Content/Dialog Video',
  component: DialogVideo,
} satisfies Meta<typeof DialogVideo>;

type Story = StoryObj<typeof DialogVideo>;

const video: H5PVideo = {
  path: 'https://player.vimeo.com/video/224857514?title=0&portrait=0&byline=0&autoplay=1&loop=1&transparent=1',
  copyright: {
    title: 'Jellyfish',
    author: 'lucdecleir',
    source: 'https://pixabay.com/videos/jellyfish-tank-water-life-marine-10480/',
    license: 'Pixabay License',
    version: '1',
    year: '2017',
  },
};

export const SimpleVideo: Story = {
  args: {
    sources: [video],
  },
};
