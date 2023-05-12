
import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Grid, GridProps } from './Grid';
import { ArrowType } from '../../types/ArrowType';

export default {
  title: 'Organisms/Grid',
  component: Grid,
} as ComponentMeta<typeof Grid>;

const defaultArgs: GridProps = {
  items: [],
  arrowItems: [],
  backgroundImage: undefined,
};

export const WithItems: ComponentStory<typeof Grid> = () => {
  const args: GridProps = {
    ...defaultArgs,
    items: [
      {
        id: '1',
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
        description: 'Sheep looking right at you.',
        widthPercentage: 30,
        heightPercentage: 60,
        xPercentagePosition: 50,
        yPercentagePosition: 30,
        dialog: {
          text: 'Dialog text',
          hasNote: false,
          showAddLinks: false,
        },
      },
      {
        id: '3',
        topicImage: {
          path: '',
          alt: '',
        },
        label: '',
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
    ],
    arrowItems: [
      {
        arrowType: ArrowType.BiDirectional,
        startElementId: '1',
        endElementId: '2',
        id: 'arrow-1',
        label: 'Sheep in the distance ⟶ Sheep close up',
        dialog: {
          text: 'Dialog text',
          hasNote: true,
          showAddLinks: false,
        },
        startPosition: { x: 0, y: 0 },
        endPosition: { x: 0, y: 0 },
        breakpoints: [],
        relativeBreakpoints: [],
      },
      {
        arrowType: ArrowType.Directional,
        startElementId: '3',
        endElementId: '2',
        id: 'arrow-2',
        label: 'Sheep in the distance ⟶ Sheep close up',
        dialog: {
          text: 'Dialog text',
          hasNote: false,
          showAddLinks: false,
        },
        startPosition: { x: 0, y: 0 },
        endPosition: { x: 0, y: 0 },
        breakpoints: [],
        relativeBreakpoints: [],
      },
    ],
  };
  return <Grid {...args} />;
};

export const WithBackgroundImage: ComponentStory<typeof Grid> = () => {
  const args: GridProps = {
    ...defaultArgs,
    items: [
      {
        id: '1',
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
        description: 'Sheep looking right at you.',
        widthPercentage: 30,
        heightPercentage: 60,
        xPercentagePosition: 50,
        yPercentagePosition: 30,
        dialog: {
          text: 'Dialog text',
          hasNote: false,
          showAddLinks: false,
        },
      },
      {
        id: '3',
        topicImage: {
          path: '',
          alt: '',
        },
        label: '',
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
    ],
    arrowItems: [
      {
        arrowType: ArrowType.BiDirectional,
        startElementId: '1',
        endElementId: '2',
        id: 'arrow-1',
        label: 'Sheep in the distance ⟶ Sheep close up',
        dialog: {
          text: 'Dialog text',
          hasNote: true,
          showAddLinks: false,
        },
        startPosition: { x: 0, y: 0 },
        endPosition: { x: 0, y: 0 },
        breakpoints: [],
        relativeBreakpoints: [],
      },
      {
        arrowType: ArrowType.Directional,
        startElementId: '3',
        endElementId: '2',
        id: 'arrow-2',
        label: 'Sheep in the distance ⟶ Sheep close up',
        dialog: {
          text: 'Dialog text',
          hasNote: false,
          showAddLinks: false,
        },
        startPosition: { x: 0, y: 0 },
        endPosition: { x: 0, y: 0 },
        breakpoints: [],
        relativeBreakpoints: [],
      },
    ],
    backgroundImage: {
      path: 'https://images.unsplash.com/photo-1516616370751-86d6bd8b0651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
      alt: 'Mountains Changtse, Nuptse, and Mt. Everest in sunset',
      copyright: {
        author: 'howling red',
        license: 'Unsplash License',
        source: 'https://unsplash.com/photos/zATDM3xbOBI',
        title: 'snow-covered mountains during daytime',
        version: '1',
        year: '2018',
      },
    },
  };
  return <Grid {...args} />;
};

export const WithoutItems: ComponentStory<typeof Grid> = () => {
  const args: GridProps = { ...defaultArgs };
  return <Grid {...args} />;
};
