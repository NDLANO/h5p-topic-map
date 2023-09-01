import { Meta, StoryObj } from '@storybook/react';
import { NotesSection } from './NotesSection';

export default {
  title: 'Molecules/Navbar/Notes Section',
  component: NotesSection,
} satisfies Meta<typeof NotesSection>;

type Story = StoryObj<typeof NotesSection>;

export const Notes: Story = {
  args: {
    confirmSubmitAll: () => {},
    confirmDeletion: () => {},
    notesOpen: false,
    setNotesOpen: () => {},
    navbarTitle: 'Navbar Title',
    allItems: [],
  },
};
