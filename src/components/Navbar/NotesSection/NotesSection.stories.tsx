import * as React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { NotesSection } from './NotesSection';

export default {
  title: 'Molecules/Navbar/Notes Section',
  component: NotesSection,
} satisfies Meta<typeof NotesSection>;

const Template: StoryFn<typeof NotesSection> = (args) => (
  <NotesSection {...args} />
);

export const Notes = Template.bind({});
Notes.args = {
  handlePrint: () => { },
  confirmSubmitAll: () => { },
  confirmDeletion: () => { },
};
