import { Meta, StoryObj } from '@storybook/react';
import { DialogAudio } from './DialogAudio';

export default {
  title: 'Molecules/Dialog Content/Dialog Audio',
  component: DialogAudio,
} satisfies Meta<typeof DialogAudio>;

type Story = StoryObj<typeof DialogAudio>;

export const Audio: Story = {
  args: {
    audioTrack: { path: 'https://bigsoundbank.com/UPLOAD/mp3/0001.mp3' },
    subtext: `
        <b>
          Den franske revolusjon var en periode med store sosiale og politiske
          omveltningene i Frankrike i perioden 1789-1799. Året 1789 markerer det
          første viktige vendepunktet under revolusjonen. 14. juli dette året brøt
          det ut masseopprør i Paris og fengselet Bastillen ble stormet.
        </b>
        <br />
        <p>
          Perioden 1787-1789 kalles gjerne førrevolusjonen, men langsiktige
          årsaker til revolusjonen strekker seg naturligvis mye lenger tilbake i
          tid. De viktigste politiske, sosiale og administrative omveltninger
          skjedde i perioden 1789-1794.
        </p>
      `,
  },
};

export const AudioWithCopyright = {
  args: {
    audioTrack: {
      path: 'https://bigsoundbank.com/UPLOAD/mp3/0001.mp3',
      copyright: {
        author: 'Author',
        title: 'Title',
        license: 'CC BY',
        source: 'https://bigsoundbank.com/UPLOAD/mp3/0001.mp3',
        version: '1',
        year: '2000',
      },
    },
    subtext: `
        <b>
          Den franske revolusjon var en periode med store sosiale og politiske
          omveltningene i Frankrike i perioden 1789-1799. Året 1789 markerer det
          første viktige vendepunktet under revolusjonen. 14. juli dette året brøt
          det ut masseopprør i Paris og fengselet Bastillen ble stormet.
        </b>
        <br />
        <p>
          Perioden 1787-1789 kalles gjerne førrevolusjonen, men langsiktige
          årsaker til revolusjonen strekker seg naturligvis mye lenger tilbake i
          tid. De viktigste politiske, sosiale og administrative omveltninger
          skjedde i perioden 1789-1794.
        </p>
      `,
  },
};
