import { render } from '@testing-library/react';
import * as React from 'react';
import { DialogTabs } from './DialogTabs';

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  },
});

describe(DialogTabs.name, () => {
  it('should have rendered.', () => {
    const item = {
      id: 'testid',
      label: 'Test label',
      description: {
        params: {
          text: 'Testing'
        }
      },
      dialog: {
        hasNote: true,
        text: {
          params: {
            text: 'Dialog test'
          }
        },
        showAddLinks: false,
      },
    };
    const tabs = render(<DialogTabs item={item} />).container;

    expect(tabs.querySelector('div')).toBeTruthy();
  });
});
