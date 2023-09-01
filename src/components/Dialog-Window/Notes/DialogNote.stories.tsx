import { Meta, StoryObj } from '@storybook/react';
import { DialogNote } from './DialogNote';

export default {
  title: 'Molecules/Dialog Content/Dialog Notes',
  component: DialogNote,
  render: (args) => (
    <div style={{ height: '80vh', width: '80vw' }}>
      <DialogNote {...args} />
    </div>
  ),
} satisfies Meta<typeof DialogNote>;

type Story = StoryObj<typeof DialogNote>;

export const DialogNoteSimple: Story = {
  args: {
    maxLength: 150,
    id: 'myId',
  },
};
