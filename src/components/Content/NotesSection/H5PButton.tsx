import * as React from 'react';
import { H5P } from '../../../h5p/H5P.util';

type H5PButtonProps = {
  icon?: string;
  label: string;
  onClick: () => void;
};

// H5P.Components.Button is an imperative factory that returns a raw DOM element,
// so it is mounted into React through a container ref. The click handler is read
// from a ref so the element is created once per label and never torn down on render.
export const H5PButton: React.FC<H5PButtonProps> = ({ icon, label, onClick }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const onClickRef = React.useRef(onClick);
  onClickRef.current = onClick;

  React.useEffect(() => {
    const createButton = H5P?.Components?.Button;
    const container = containerRef.current;
    if (!createButton || !container) {
      return;
    }

    const button = createButton({
      icon,
      label,
      onClick: () => onClickRef.current(),
    });
    container.appendChild(button);

    return () => button.remove();
  }, [label]);

  return <div ref={containerRef} />;
};
