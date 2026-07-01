import { render } from '@testing-library/react';
import * as React from 'react';
import { DialogExternalResources } from './ExternalResources';

describe(DialogExternalResources.name, () => {
  it('Should have rendered', () => {
    const resource = render(
      <DialogExternalResources url="https://example.com" label="Example" />,
    ).container;

    expect(resource.querySelector('iframe')).toBeTruthy();
  });
});
