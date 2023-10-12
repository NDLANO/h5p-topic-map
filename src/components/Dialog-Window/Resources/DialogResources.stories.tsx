import { Meta, StoryObj } from '@storybook/react';
import { DialogResources } from './DialogResources';

export default {
  title: 'Molecules/Dialog Content/Dialog Resources',
  component: DialogResources,
} satisfies Meta<typeof DialogResources>;

type Story = StoryObj<typeof DialogResources>;

export const ResourcesDialog: Story = {
  args: {
    relevantLinks: [
      { id: 'link-1', label: 'NDLA', url: 'www.ndla.com' },
      { id: 'link-2', label: 'H5P', url: 'www.h5p.com' },
    ],
    id: 'myId',
  },
};
