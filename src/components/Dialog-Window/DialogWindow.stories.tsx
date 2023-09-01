import { Meta } from '@storybook/react';
import { TopicMapItemType } from '../../types/TopicMapItemType';
import { DialogWindow } from './DialogWindow';

export default {
  title: 'Organisms/DialogWindow',
  component: DialogWindow,
} satisfies Meta<typeof DialogWindow>;

const item: TopicMapItemType = {
  id: '1',
  topicImage: {
    path: 'https://images.unsplash.com/photo-1569587112025-0d460e81a126?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80',
    alt: '',
    copyright: { license: 'U' },
  },
  label: 'Sheep in the distance',
  description: 'Description for storybooks!',
  widthPercentage: 50,
  heightPercentage: 25,
  xPercentagePosition: 3,
  yPercentagePosition: 5,
  dialog: {
    showAddLinks: false,
    hasNote: false,
    text: 'Den franske revolusjon var en periode med store sosiale og politiske omveltningene i Frankrike i perioden 1789-1799. Året 1789 markerer det første viktige vendepunktet under revolusjonen. 14. juli dette året brøt det ut masseopprør i Paris og fengselet Bastillen ble stormet.',
  },
};

export const DialogWindowSimple = {
  args: {
    item,
  },
};

export const DialogWindowLong = {
  args: {
    item: {
      ...item,
      dialog: {
        ...item.dialog,
        hasNote: false,
        showAddLinks: false,
        text: `You don't want to kill all your dark areas they are very important. I really recommend you use odorless thinner or your spouse is gonna run you right out into the yard and you'll be working by yourself. There we go. There's nothing wrong with having a tree as a friend.

    You can create anything that makes you happy. If we're going to have animals around we all have to be concerned about them and take care of them. Just use the old one inch brush. We spend so much of our life looking - but never seeing. Here we're limited by the time we have.`,
      },
    },
  },
};

export const DialogWindowTabs = {
  args: {
    item: {
      ...item,
      dialog: {
        ...item.dialog,
        hasNote: false,
        links: [
          { id: 'link-1', label: 'Google', url: 'www.google.com' },
          { id: 'link-2', label: 'YouTube', url: 'www.youtube.com' },
        ],
        showAddLinks: true,
      },
    },
  },
};

export const DialogWindowWithNote = {
  args: {
    item: {
      ...item,
      dialog: {
        ...item.dialog,
        hasNote: true,
        showAddLinks: false,
      },
    },
  },
};

export const DialogWindowWithOnlyNote = {
  args: {
    item: {
      ...item,
      id: '2',
      description: '',
      topicImage: undefined,
      dialog: {
        ...item.dialog,
        hasNote: true,
        text: '',
        showAddLinks: false,
      },
    },
  },
};
