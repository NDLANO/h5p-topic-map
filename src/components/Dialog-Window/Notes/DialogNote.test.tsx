import * as React from 'react';
import { render } from '@testing-library/react';
import { DialogNote } from './DialogNote';

describe(DialogNote.name, () => {
  it('should render', () => {
    const dialogNote = render(<DialogNote maxLength={0} id="item1" />).container;
    expect(dialogNote.querySelector('form')).toBeTruthy();
  });

  it('Should have correct word and character counts', () => {
    const { getByTestId } = render(<DialogNote maxLength={10} id="item1" />);
    expect(getByTestId('testId-note-wordCount_item1').textContent).toBe(
      '0 / 10 [Missing translation: dialogWordsLabel]',
    );
  });
});
