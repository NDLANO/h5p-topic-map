import { ComponentMeta, ComponentStory } from '@storybook/react';
import type { Video } from 'h5p-types';
import * as React from 'react';
import { DialogVideo } from './DialogVideo';

export default {
  title: 'Molecules/Dialog Content/Dialog Video',
  component: DialogVideo,
} as unknown as ComponentMeta<typeof DialogVideo>;

const Template: ComponentStory<typeof DialogVideo> = (args) => (
  
  <DialogVideo {...args} />
);

const video: Video = {
  path: 'https://player.vimeo.com/video/224857514?title=0&portrait=0&byline=0&autoplay=1&loop=1&transparent=1',
  copyright: {
    title: 'Jellyfish',
    author: 'lucdecleir',
    source:
      'https://pixabay.com/videos/jellyfish-tank-water-life-marine-10480/',
    license: 'Pixabay License',
    version: '1',
    year: '2017',
  },
};

export const SimpleVideo = Template.bind({});
SimpleVideo.args = {
  sources: [video],
};
