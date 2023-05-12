import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { DialogResources } from './DialogResources';

export default {
  title: 'Molecules/Dialog Content/Dialog Resources',
  component: DialogResources,
} satisfies Meta<typeof DialogResources>;

const Template: StoryFn<typeof DialogResources> = (args) => (
  
  <DialogResources {...args} />
);

export const ResourcesDialog = Template.bind({});
ResourcesDialog.args = {
  relevantLinks: [
    { id: 'link-1', label: 'NDLA', url: 'www.ndla.com' },
    { id: 'link-2', label: 'H5P', url: 'www.h5p.com' },
  ],
  id: 'myId',
};
