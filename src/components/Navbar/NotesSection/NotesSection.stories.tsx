import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NotesSection } from './NotesSection';

export default {
  title: 'Molecules/Navbar/Notes Section',
  component: NotesSection,
} as ComponentMeta<typeof NotesSection>;

const Template: ComponentStory<typeof NotesSection> = (args) => (
  
  <NotesSection {...args} />
);

export const Notes = Template.bind({});
Notes.args = {
  setDeleteConfirmationVisibility: () => null,
};
