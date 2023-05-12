import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { DialogNote } from './DialogNote';

export default {
  title: 'Molecules/Dialog Content/Dialog Notes',
  component: DialogNote,
} satisfies Meta<typeof DialogNote>;

const Template: StoryFn<typeof DialogNote> = (args) => (
  <div style={{ height: '80vh', width: '80vw' }}>
    <DialogNote {...args} />
  </div>
);

export const DialogNoteSimple = Template.bind({});
DialogNoteSimple.args = {
  maxLength: 150,
  id: 'myId',
};
