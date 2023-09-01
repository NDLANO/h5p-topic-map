import { Meta, StoryObj } from '@storybook/react';
import { DialogExternalResources } from './ExternalResources';

export default {
  title: 'molecules/Dialog Content/Dialog External Resources',
  component: DialogExternalResources,
  render: (args) => (
    <div style={{ height: '2000px', width: '1000px' }}>
      <DialogExternalResources {...args} />
    </div>
  ),
} satisfies Meta<typeof DialogExternalResources>;

type Story = StoryObj<typeof DialogExternalResources>;

export const ExternalResource: Story = {
  args: {
    url: 'https://www.ndla.no',
    label: 'External example',
  },
};
