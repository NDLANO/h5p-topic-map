import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { DialogExternalResources } from './ExternalResources';

export default {
  title: 'molecules/Dialog Content/Dialog External Resources',
  component: DialogExternalResources,
} satisfies Meta<typeof DialogExternalResources>;

const Template: StoryFn<typeof DialogExternalResources> = (args) => (
  <div style={{ height: '2000px', width: '1000px' }}>
    <DialogExternalResources {...args} />
  </div>
);

export const ExternalResource = Template.bind({});

ExternalResource.args = {
  url: 'https://www.ndla.no',
  label: 'External example',
};
