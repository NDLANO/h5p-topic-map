
import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DialogNote } from './DialogNote';

export default {
  title: 'Molecules/Dialog Content/Dialog Notes',
  component: DialogNote,
} as ComponentMeta<typeof DialogNote>;

const Template: ComponentStory<typeof DialogNote> = (args) => (
  <div style={{ height: '80vh', width: '80vw' }}>
    <DialogNote {...args} />
  </div>
);

export const DialogNoteSimple = Template.bind({});
DialogNoteSimple.args = {
  maxLength: 150,
  id: 'myId',
};
