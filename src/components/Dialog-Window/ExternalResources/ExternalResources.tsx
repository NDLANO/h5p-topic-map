import * as React from 'react';
import './ExternalResources.scss';

export type DialogExternalResourcesProps = {
  url: string;
  label: string;
};

export const DialogExternalResources: React.FC<
  DialogExternalResourcesProps
> = ({ url, label }) => {
  return (
    <iframe
      className="h5p-topic-map-dialog-external-resource"
      src={url}
      title={label}
    />
  );
};
