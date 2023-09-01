import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { Navbar, NavbarProps } from './Navbar';

export default {
  title: 'Molecules/Navbar/Navbar',
  component: Navbar,
} satisfies Meta<typeof Navbar>;

const defaultArgs: NavbarProps = {
  navbarTitle: 'National romanticism',
  params: {},
  toggleIPhoneFullscreen: () => null,
  isIPhoneFullscreenActive: false,
};

export const NavBar: StoryFn<typeof Navbar> = () => {
  const args: NavbarProps = {
    ...defaultArgs,
    params: {
      topicMap: {
        topicMapItems: [
          {
            id: 'myId',
            topicImage: {
              path: 'https://images.unsplash.com/photo-1569587112025-0d460e81a126?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2370&q=80',
              alt: '',
            },
            label: 'Sheep in the distance',
            description: '',
            widthPercentage: 50,
            heightPercentage: 25,
            xPercentagePosition: 3,
            yPercentagePosition: 5,
            dialog: {
              text: 'Dialog text',
              hasNote: true,
              showAddLinks: false,
            },
          },
          {
            id: '2',
            topicImage: {
              path: 'https://images.unsplash.com/photo-1533415648777-407b626eb0fa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=987&q=80',
              alt: '',
            },
            label: 'Sheep close up',
            description: '',
            widthPercentage: 30,
            heightPercentage: 60,
            xPercentagePosition: 50,
            yPercentagePosition: 30,
            dialog: {
              text: 'Dialog text',
              hasNote: true,
              showAddLinks: false,
            },
          },
          {
            id: '3',
            topicImage: {
              path: '',
              alt: '',
            },
            label: 'Sheeps everywhere',
            description: '',
            widthPercentage: 10,
            heightPercentage: 10,
            xPercentagePosition: 20,
            yPercentagePosition: 40,
            dialog: {
              text: 'Dialog text',
              hasNote: true,
              showAddLinks: false,
            },
          },
          {
            id: '4',
            topicImage: {
              path: '',
              alt: '',
            },
            label: 'Sheeps everywhere',
            description: '',
            widthPercentage: 10,
            heightPercentage: 10,
            xPercentagePosition: 20,
            yPercentagePosition: 40,
            dialog: {
              text: 'Dialog text',
              hasNote: true,
              showAddLinks: false,
            },
          },
          {
            id: '5',
            topicImage: {
              path: '',
              alt: '',
            },
            label: 'Sheeps everywhere',
            description: '',
            widthPercentage: 10,
            heightPercentage: 10,
            xPercentagePosition: 20,
            yPercentagePosition: 40,
            dialog: {
              text: 'Dialog text',
              hasNote: true,
              showAddLinks: false,
            },
          },
          {
            id: '6',
            topicImage: {
              path: '',
              alt: '',
            },
            label: 'Sheeps everywhere',
            description: '',
            widthPercentage: 10,
            heightPercentage: 10,
            xPercentagePosition: 20,
            yPercentagePosition: 40,
            dialog: {
              text: 'Dialog text',
              hasNote: true,
              showAddLinks: false,
            },
          },
          {
            id: '7',
            topicImage: {
              path: '',
              alt: '',
            },
            label: 'Sheeps everywhere',
            description: '',
            widthPercentage: 10,
            heightPercentage: 10,
            xPercentagePosition: 20,
            yPercentagePosition: 40,
            dialog: {
              text: 'Dialog text',
              hasNote: true,
              showAddLinks: false,
            },
          },
          {
            id: '8',
            topicImage: {
              path: '',
              alt: '',
            },
            label: 'Sheeps everywhere',
            description: '',
            widthPercentage: 10,
            heightPercentage: 10,
            xPercentagePosition: 20,
            yPercentagePosition: 40,
            dialog: {
              text: 'Dialog text',
              hasNote: true,
              showAddLinks: false,
            },
          },
          {
            id: '9',
            topicImage: {
              path: '',
              alt: '',
            },
            label: 'Sheeps everywhere',
            description: '',
            widthPercentage: 10,
            heightPercentage: 10,
            xPercentagePosition: 20,
            yPercentagePosition: 40,
            dialog: {
              text: 'Dialog text',
              hasNote: true,
              showAddLinks: false,
            },
          },
          {
            id: '10',
            topicImage: {
              path: '',
              alt: '',
            },
            label: 'Sheeps everywhere',
            description: '',
            widthPercentage: 10,
            heightPercentage: 10,
            xPercentagePosition: 20,
            yPercentagePosition: 40,
            dialog: {
              text: 'Dialog text',
              hasNote: true,
              showAddLinks: false,
            },
          },
          {
            id: '11',
            topicImage: {
              path: '',
              alt: '',
            },
            label: 'Sheeps everywhere',
            description: '',
            widthPercentage: 10,
            heightPercentage: 10,
            xPercentagePosition: 20,
            yPercentagePosition: 40,
            dialog: {
              text: 'Dialog text',
              hasNote: true,
              showAddLinks: false,
            },
          },
          {
            id: '12',
            topicImage: {
              path: '',
              alt: '',
            },
            label: 'Sheeps everywhere',
            description: '',
            widthPercentage: 10,
            heightPercentage: 10,
            xPercentagePosition: 20,
            yPercentagePosition: 40,
            dialog: {
              text: 'Dialog text',
              hasNote: true,
              showAddLinks: false,
            },
          },
          {
            id: '13',
            topicImage: {
              path: '',
              alt: '',
            },
            label: 'Sheeps everywhere',
            description: '',
            widthPercentage: 10,
            heightPercentage: 10,
            xPercentagePosition: 20,
            yPercentagePosition: 40,
            dialog: {
              text: 'Dialog text',
              hasNote: false,
              showAddLinks: false,
            },
          },
        ],
      },
    },
  };

  return <Navbar {...args} />;
};
