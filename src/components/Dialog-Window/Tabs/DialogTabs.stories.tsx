import { Meta, StoryObj } from '@storybook/react';
import { DialogTabs } from './DialogTabs';

export default {
  title: 'Molecules/Dialog Content/Dialog Tabs',
  component: DialogTabs,
} satisfies Meta<typeof DialogTabs>;

type Story = StoryObj<typeof DialogTabs>;

const item = {
  id: 'storybookid',
  label: 'Just another label',
  description: `<p>Den franske revolusjon var en periode med store sosiale og politiske
  omveltningene i Frankrike i perioden 1789-1799. Året 1789 markerer det
  første viktige vendepunktet under revolusjonen. 14. juli dette året brøt
  det ut masseopprør i Paris og fengselet Bastillen ble stormet.<p>`,
  topicImage: {
    path: 'https://images.unsplash.com/photo-1557657043-23eec69b89c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80',
    alt: 'White seal on soil',
    copyright: {
      author: 'Amy Asher',
      license: 'Unsplash License',
      source: 'https://unsplash.com/photos/giZJHm2m9yY',
      title: 'White seal on soil',
      version: '1',
      year: '2019',
    },
  },
  dialog: {
    hasNote: true,
    text: '<p>Text text for testing Text text test. This is a body<p>',
    links: [
      { id: 'link-1', label: 'YouTube', url: 'www.youtube.com' },
      { id: 'link-2', label: 'NDLA', url: 'www.ndla.com' },
    ],
    showAddLinks: true,
    video: [
      {
        path: 'https://player.vimeo.com/video/224857514?title=0&portrait=0&byline=0&autoplay=1&loop=1&transparent=1',
      },
    ],
    audio: {
      audioFile: [{ path: 'https://bigsoundbank.com/UPLOAD/mp3/0001.mp3' }],
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
  },
};

export const Tabs: Story = {
  args: { item },
};

const itemWithOnlyImage = {
  id: 'storybookid',
  label: 'Just another label',
  topicImage: {
    path: 'https://images.unsplash.com/photo-1557657043-23eec69b89c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80',
    alt: 'White seal on soil',
    copyright: {
      author: 'Amy Asher',
      license: 'Unsplash License',
      source: 'https://unsplash.com/photos/giZJHm2m9yY',
      title: 'White seal on soil',
      version: '1',
      year: '2019',
    },
  },
  dialog: {
    hasNote: true,
    links: [
      { id: 'link-3', label: 'YouTube', url: 'www.youtube.com' },
      { id: 'link-4', label: 'NDLA', url: 'www.ndla.com' },
    ],
    showAddLinks: true,
    video: [
      {
        path: 'https://player.vimeo.com/video/224857514?title=0&portrait=0&byline=0&autoplay=1&loop=1&transparent=1',
      },
    ],
    audio: {
      audioFile: [{ path: 'https://bigsoundbank.com/UPLOAD/mp3/0001.mp3' }],
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
  },
};

export const TabsWithOnlyImage: Story = {
  args: {
    item: {
      ...itemWithOnlyImage,
    },
  },
};

const itemWithoutImage = {
  id: 'storybookid',
  label: 'Just another label',
  description: `<p>Den franske revolusjon var en periode med store sosiale og politiske
  omveltningene i Frankrike i perioden 1789-1799. Året 1789 markerer det
  første viktige vendepunktet under revolusjonen. 14. juli dette året brøt
  det ut masseopprør i Paris og fengselet Bastillen ble stormet. <p>`,
  dialog: {
    hasNote: true,
    links: [
      { id: 'link-5', label: 'YouTube', url: 'www.youtube.com' },
      { id: 'link-6', label: 'NDLA', url: 'www.ndla.com' },
    ],
    showAddLinks: false,
    text: '<p>Body text from storybook.<p>',
    video: [
      {
        path: 'https://player.vimeo.com/video/224857514?title=0&portrait=0&byline=0&autoplay=1&loop=1&transparent=1',
      },
    ],
    audio: {
      audioFile: [{ path: 'https://bigsoundbank.com/UPLOAD/mp3/0001.mp3' }],
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
  },
};

export const TabsWithoutImage: Story = {
  args: {
    item: {
      ...itemWithoutImage,
    },
  },
};
